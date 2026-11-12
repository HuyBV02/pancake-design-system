/**
 * #3416 Lọc hội thoại theo nguồn — playground (dựng theo skill pancake-ui-dev, chế độ "lên design").
 * Requirement: lọc danh sách hội thoại theo 1 hoặc nhiều kênh nguồn, kết hợp với Tất cả / Chưa đọc / Chưa trả lời;
 * thấy rõ bộ lọc đang áp dụng và bỏ nhanh; có trạng thái không có kết quả và đang tải.
 */
import { useMemo, useState, type ComponentType } from 'react';
import {
  ChatCircleDots, FacebookLogo, Funnel, InstagramLogo, MagnifyingGlass, Storefront, TiktokLogo, WhatsappLogo, type IconProps,
} from '@phosphor-icons/react';
import { Button, Checkbox, Dropdown, Empty, Icon, Input, Segmented, Skeleton, Tag, Text } from '@pancake/ui';
import { AppShell } from '../recipes/AppShell';
import { ChatBubble, ConversationItem, type Conversation } from '../recipes/ConversationList';
import type { PlaygroundPage } from './Playground';

type ChannelKey = 'facebook' | 'instagram' | 'tiktok' | 'whatsapp' | 'zalo' | 'shopee';
const CHANNELS: Array<{ key: ChannelKey; label: string; icon: ComponentType<IconProps> }> = [
  { key: 'facebook', label: 'Facebook', icon: FacebookLogo },
  { key: 'instagram', label: 'Instagram', icon: InstagramLogo },
  { key: 'tiktok', label: 'TikTok', icon: TiktokLogo },
  { key: 'whatsapp', label: 'WhatsApp', icon: WhatsappLogo },
  { key: 'zalo', label: 'Zalo OA', icon: ChatCircleDots }, // TODO(DS): dùng icon kênh Icon/Ecom của DS khi có bản code
  { key: 'shopee', label: 'Shopee', icon: Storefront }, // TODO(DS): như trên
];
const iconOf = (k: ChannelKey) => CHANNELS.find((c) => c.key === k)!.icon;

type Row = Conversation & { source: ChannelKey; replied: boolean };
const DATA: Row[] = [
  { id: '1', name: 'Nguyễn Thu Hà', preview: 'Shop ơi váy này còn size M không ạ?', time: '09:42', unread: 2, source: 'facebook', replied: false, channel: iconOf('facebook'), tags: [{ label: 'Hỏi giá', color: 'blue' }] },
  { id: '2', name: 'Trần Minh Khoa', preview: 'Mình chuyển khoản rồi nhé', time: '09:15', unread: 0, source: 'zalo', replied: true, channel: iconOf('zalo'), tags: [{ label: 'Đã chốt đơn', color: 'green' }] },
  { id: '3', name: 'Lê Phương Anh', preview: 'Đơn #DH20451 khi nào giao vậy shop?', time: '08:57', unread: 1, source: 'shopee', replied: false, channel: iconOf('shopee') },
  { id: '4', name: 'Phạm Quốc Đại', preview: 'Cho mình xin bảng giá sỉ', time: 'Hôm qua', unread: 0, source: 'instagram', replied: false, channel: iconOf('instagram'), tags: [{ label: 'Khách sỉ', color: 'purple' }] },
  { id: '5', name: 'Hoàng Bích Thuỷ', preview: 'Ok shop, cảm ơn nhiều', time: 'Hôm qua', unread: 0, source: 'facebook', replied: true, channel: iconOf('facebook') },
  { id: '6', name: 'Đỗ Anh Quân', preview: 'Áo bị lỗi đường may, đổi giúp mình', time: '12/11', unread: 3, source: 'tiktok', replied: false, channel: iconOf('tiktok'), tags: [{ label: 'Khiếu nại', color: 'red' }] },
  { id: '7', name: 'Vũ Thanh Tú', preview: 'Hello, ship quốc tế được không?', time: '11/11', unread: 0, source: 'whatsapp', replied: true, channel: iconOf('whatsapp') },
];

type Mode = 'all' | 'unread' | 'unreplied';

function SourceFilter({ value, onChange }: { value: ChannelKey[]; onChange: (v: ChannelKey[]) => void }) {
  const [open, setOpen] = useState(false);
  const toggle = (k: ChannelKey) => onChange(value.includes(k) ? value.filter((x) => x !== k) : [...value, k]);
  return (
    <Dropdown
      open={open}
      onOpenChange={(o, info) => info.source === 'trigger' && setOpen(o)}
      trigger={['click']}
      menu={{
        items: [
          { type: 'group', label: 'Nguồn hội thoại', children: CHANNELS.map((c) => ({
            key: c.key,
            label: (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--pk-space-100)' }}>
                <Checkbox checked={value.includes(c.key)} />
                <Icon as={c.icon} tone="subtle" />
                {c.label}
              </span>
            ),
          })) },
          { type: 'divider' },
          { key: 'clear', label: 'Bỏ chọn tất cả', disabled: value.length === 0 },
        ],
        onClick: ({ key }) => (key === 'clear' ? onChange([]) : toggle(key as ChannelKey)),
      }}
    >
      <Button variant="tertiary-gray" icon={<Funnel />} aria-label="Lọc theo nguồn">
        {value.length ? `Nguồn (${value.length})` : 'Nguồn'}
      </Button>
    </Dropdown>
  );
}

function InboxScreen({ initialSources = [], initialMode = 'all', initialQuery = '', loading = false }: {
  initialSources?: ChannelKey[]; initialMode?: Mode; initialQuery?: string; loading?: boolean;
}) {
  const [sources, setSources] = useState<ChannelKey[]>(initialSources);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [q, setQ] = useState(initialQuery);
  const [selected, setSelected] = useState('1');

  const rows = useMemo(
    () =>
      DATA.filter((r) => (sources.length ? sources.includes(r.source) : true))
        .filter((r) => (mode === 'unread' ? r.unread > 0 : mode === 'unreplied' ? !r.replied : true))
        .filter((r) => r.name.toLowerCase().includes(q.trim().toLowerCase())),
    [sources, mode, q],
  );
  const active = loading ? undefined : rows.find((r) => r.id === selected) ?? rows[0];
  const hasFilter = sources.length > 0 || mode !== 'all' || q.trim() !== '';

  return (
    <AppShell active="inbox">
      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', height: 'calc(100vh - 56px)' }}>
        <section style={{ background: 'var(--pk-surface-default)', borderRight: 'var(--pk-border-width-default) solid var(--pk-border-subtlest)', display: 'grid', gridTemplateRows: 'auto 1fr', minHeight: 0 }}>
          <div style={{ padding: 'var(--pk-space-200)', display: 'grid', gap: 'var(--pk-space-150)' }}>
            <div style={{ display: 'flex', gap: 'var(--pk-space-100)' }}>
              <Input allowClear placeholder="Tìm tên hoặc số điện thoại" prefix={<Icon as={MagnifyingGlass} tone="subtle" />} value={q} onChange={(e) => setQ(e.target.value)} />
              <SourceFilter value={sources} onChange={setSources} />
            </div>
            <Segmented block value={mode} onChange={(v) => setMode(v as Mode)} options={[
              { value: 'all', label: 'Tất cả' }, { value: 'unread', label: 'Chưa đọc' }, { value: 'unreplied', label: 'Chưa trả lời' },
            ]} />
            {sources.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--pk-space-100)' }}>
                {sources.map((k) => {
                  const c = CHANNELS.find((x) => x.key === k)!;
                  return (
                    <Tag key={k} closable onClose={() => setSources(sources.filter((x) => x !== k))} icon={<c.icon />}>
                      {c.label}
                    </Tag>
                  );
                })}
                <Button variant="link" size="s" onClick={() => setSources([])}>Xoá lọc</Button>
              </div>
            )}
          </div>
          <div style={{ overflow: 'auto', padding: '0 var(--pk-space-100) var(--pk-space-100)' }}>
            {loading ? (
              <div style={{ padding: 'var(--pk-space-200)', display: 'grid', gap: 'var(--pk-space-300)' }}>
                {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} active avatar paragraph={{ rows: 1 }} title={false} />)}
              </div>
            ) : rows.length === 0 ? (
              <Empty description={hasFilter ? 'Không có hội thoại khớp bộ lọc' : 'Chưa có hội thoại nào'} style={{ paddingTop: 'var(--pk-space-600)' }}>
                {hasFilter && sources.length === 0 && <Button variant="secondary-gray" onClick={() => { setSources([]); setMode('all'); setQ(''); }}>Xoá bộ lọc</Button>}
              </Empty>
            ) : (
              rows.map((r) => <ConversationItem key={r.id} c={r} selected={r.id === selected} onSelect={() => setSelected(r.id)} />)
            )}
          </div>
        </section>
        <section className="pk-chat">
          {active ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--pk-space-100)', marginBottom: 'var(--pk-space-200)' }}>
                <Icon as={active.channel} tone="subtle" />
                <Text variant="title-16-medium">{active.name}</Text>
              </div>
              <ChatBubble side="in" text={active.preview} time={active.time} />
              <ChatBubble side="out" text="Dạ shop kiểm tra và báo lại mình ngay ạ." time={active.time} />
            </>
          ) : (
            !loading && <Empty description="Chọn một hội thoại để xem tin nhắn" style={{ marginTop: 'var(--pk-space-800)' }} />
          )}
        </section>
      </div>
    </AppShell>
  );
}

export const LocHoiThoaiPlayground: PlaygroundPage = {
  slug: '3416-loc-hoi-thoai',
  issue: '3416',
  title: 'Lọc hội thoại theo nguồn',
  states: {
    'Mặc định': () => <InboxScreen />,
    'Đang lọc 2 nguồn': () => <InboxScreen initialSources={['facebook', 'shopee']} />,
    'Không có kết quả': () => <InboxScreen initialSources={['whatsapp']} initialMode="unread" />,
    'Đang tải': () => <InboxScreen loading />,
  },
};
