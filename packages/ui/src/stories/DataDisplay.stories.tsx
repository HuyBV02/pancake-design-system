import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../components/Tag';
import type { TagColor } from '../components/Tag';
import { Badge } from '../components/Badge';
import { Kbd, Shortcut } from '../components/Kbd';
import { Section, Row, Label } from './helpers';

const meta: Meta = { id: 'components-hien-thi', title: 'Components/Hiển thị' };
export default meta;

const COLORS: TagColor[] = ['neutral', 'blue', 'cyan', 'geekblue', 'purple', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'new'];

export const Tags: StoryObj = {
  name: 'Tag',
  render: () => (
    <Section title="Tag" note="Cao 24 · bo tròn · Body 14. Có viền → chữ text-strong. Solid → cao 22, chữ 12, nền đậm.">
      {(['Thường', 'Có viền', 'Solid', 'Chấm + đóng'] as const).map((kind) => (
        <Row key={kind} gap="var(--pk-space-100)" style={{ marginBottom: 'var(--pk-space-150)' }}>
          <Label width={120}>{kind}</Label>
          {COLORS.map((c) => (
            <Tag key={c} color={c} bordered={kind === 'Có viền'} solid={kind === 'Solid'} dot={kind === 'Chấm + đóng'} closable={kind === 'Chấm + đóng'}>
              {c === 'new' ? 'Mới' : c}
            </Tag>
          ))}
        </Row>
      ))}
      <Row gap="var(--pk-space-100)">
        <Label width={120}>Thời hạn gói</Label>
        <Tag color="green" bordered>Còn 30 ngày</Tag>
        <Tag color="gold" bordered>Còn 5 ngày</Tag>
        <Tag color="red" bordered>Hết hạn hôm nay</Tag>
      </Row>
    </Section>
  ),
};

export const Badges: StoryObj = {
  name: 'Badge',
  render: () => (
    <Section title="Badge" note="Đếm chưa đọc: bg/indicator/danger. Chấm trạng thái 6×6 cách chữ 8.">
      <Row gap="var(--pk-space-400)">
        {(['danger', 'info', 'success', 'neutral'] as const).map((t) => (
          <Badge key={t} tone={t} count={t === 'danger' ? 12 : 5}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--pk-radius-md)', background: 'var(--pk-bg-neutral-rest)' }} />
          </Badge>
        ))}
        <Badge tone="danger" size="sm" count={99} overflowCount={99} />
      </Row>
      <Row gap="var(--pk-space-300)" style={{ marginTop: 'var(--pk-space-200)' }}>
        <Badge tone="success" text="Đã kết nối" />
        <Badge tone="warning" text="Sắp hết hạn" />
        <Badge tone="danger" text="Mất kết nối" />
        <Badge tone="neutral" text="Tạm dừng" />
      </Row>
    </Section>
  ),
};

export const PhimTat: StoryObj = {
  name: 'Kbd · Phím tắt',
  render: () => (
    <Section title="Kbd / Shortcut" note="Mỗi phím 1 ô viền mảnh nền trắng. sm 18 trong dropdown/menu · md 22 ở trang cài đặt.">
      <Row style={{ marginBottom: 'var(--pk-space-150)' }}><Label>sm · macOS</Label><Shortcut keys={['⌘', '⇧', 'K']} /><Kbd>Esc</Kbd><Kbd>↵</Kbd></Row>
      <Row><Label>md · Windows</Label><Shortcut size="md" keys={['Ctrl', 'Shift', 'K']} /><Kbd size="md">/</Kbd></Row>
    </Section>
  ),
};
