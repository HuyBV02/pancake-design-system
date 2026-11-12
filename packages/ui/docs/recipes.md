# Recipes — khung code cho màn hay gặp (tự sinh từ app mẫu, KHÔNG sửa tay)

Mọi đoạn dưới đây đã chạy, qua type-check và `@pancake/lint`. Chép rồi đổi dữ liệu / chữ theo requirement; giữ nguyên cấu trúc và token.
Import trong recipe dùng đường dẫn tương đối của app mẫu — đổi cho khớp repo.

## Mục lục
1. Khung app · 2. Trạng thái dữ liệu · 3. Trang cài đặt có bảng · 4. Modal form · 5. Xác nhận xoá · 6. Drawer cài đặt · 7. Danh sách hội thoại + chat · 8. Component tạm (ds-local) · 9. Playground · 10. Ví dụ đầy đủ: #3416 Lọc hội thoại

### 1. Khung app
_File mẫu: `examples/pancake-app-starter/src/recipes/AppShell.tsx`_

RECIPE · Khung app Pancake Web
Khi nào dùng: mọi màn chính có top nav + menu trái + vùng nội dung.
Spec: top nav 56 `surface/inverse` · menu trái 280, mục 42 bo 8, đang chọn `bg/item/selected` · nội dung nền `surface/canvas`.

```tsx
/**
 * RECIPE · Khung app Pancake Web
 * Khi nào dùng: mọi màn chính có top nav + menu trái + vùng nội dung.
 * Spec: top nav 56 `surface/inverse` · menu trái 280, mục 42 bo 8, đang chọn `bg/item/selected` · nội dung nền `surface/canvas`.
 */
import type { ReactNode } from 'react';
import { ChatCircle, ChartBar, Gear, House, Stack, Bell } from '@phosphor-icons/react';
import { Badge, Button, Icon, Text } from '@pancake/ui';
import { Avatar } from '../components/ds-local';

const MENU = [
  { key: 'home', label: 'Tổng quan', icon: House },
  { key: 'inbox', label: 'Hội thoại', icon: ChatCircle, count: 12 },
  { key: 'merge', label: 'Gộp trang', icon: Stack },
  { key: 'stats', label: 'Thống kê', icon: ChartBar },
  { key: 'settings', label: 'Cài đặt', icon: Gear },
];

export function AppShell({ active = 'settings', children }: { active?: string; children: ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: '56px 1fr', minHeight: '100vh', background: 'var(--pk-surface-canvas)' }}>
      <header
        style={{
          background: 'var(--pk-surface-inverse)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 var(--pk-space-300)',
        }}
      >
        <Text variant="title-16-medium" tone="inverse">Pancake</Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--pk-space-200)' }}>
          <Badge count={3} size="sm">
            <Icon as={Bell} tone="inverse" />
          </Badge>
          <Avatar size={32}>LA</Avatar>
        </div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 0 }}>
        <nav
          style={{
            background: 'var(--pk-surface-default)', borderRight: 'var(--pk-border-width-default) solid var(--pk-border-subtlest)',
            padding: 'var(--pk-space-200) var(--pk-space-150)', display: 'grid', alignContent: 'start', gap: 'var(--pk-space-050)',
          }}
        >
          {MENU.map((m) => (
            <Button
              key={m.key}
              variant="text"
              icon={<m.icon weight={m.key === active ? 'fill' : 'regular'} />}
              style={{
                justifyContent: 'flex-start', height: 42,
                background: m.key === active ? 'var(--pk-bg-item-selected)' : undefined,
                color: m.key === active ? 'var(--pk-text-default)' : undefined,
              }}
            >
              <span style={{ flex: 1, textAlign: 'left' }}>{m.label}</span>
              {m.count ? <Badge count={m.count} size="sm" /> : null}
            </Button>
          ))}
        </nav>
        <main style={{ minWidth: 0, overflow: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}
```

### 2. Trạng thái dữ liệu (tải / lỗi / trống)
_File mẫu: `examples/pancake-app-starter/src/recipes/DataState.tsx`_

RECIPE · Trạng thái của một khối dữ liệu: đang tải / lỗi / trống / có dữ liệu
Khi nào dùng: bọc mọi danh sách, bảng, khối số liệu lấy từ API.

```tsx
/**
 * RECIPE · Trạng thái của một khối dữ liệu: đang tải / lỗi / trống / có dữ liệu
 * Khi nào dùng: bọc mọi danh sách, bảng, khối số liệu lấy từ API.
 */
import type { ReactNode } from 'react';
import { ArrowClockwise } from '@phosphor-icons/react';
import { Alert, Button, Empty, Skeleton } from '@pancake/ui';

export type LoadState = 'loading' | 'error' | 'ready';

export function DataState({
  state, isEmpty, emptyText, emptyAction, onRetry, rows = 4, children,
}: {
  state: LoadState;
  isEmpty: boolean;
  /** Chữ trống đúng ngữ cảnh, vd. "Chưa có thẻ hội thoại nào" */
  emptyText: string;
  /** Nút tạo mới khi trống (nếu người dùng có quyền) */
  emptyAction?: ReactNode;
  onRetry?: () => void;
  rows?: number;
  children: ReactNode;
}) {
  if (state === 'loading') return <Skeleton active paragraph={{ rows }} title={false} />;
  if (state === 'error')
    return (
      <Alert
        type="error"
        title="Không tải được dữ liệu. Kiểm tra kết nối rồi thử lại."
        action={onRetry && <Button size="s" variant="secondary-gray" icon={<ArrowClockwise />} onClick={onRetry}>Thử lại</Button>}
      />
    );
  if (isEmpty)
    return (
      <Empty description={emptyText} style={{ padding: 'var(--pk-space-500) 0' }}>
        {emptyAction}
      </Empty>
    );
  return <>{children}</>;
}
```

### 3. Trang cài đặt có bảng
_File mẫu: `examples/pancake-app-starter/src/recipes/SettingsTablePage.tsx`_

RECIPE · Trang cài đặt có bảng (danh sách + thêm / sửa / xoá)
Khi nào dùng: Thẻ hội thoại, Mẫu trả lời nhanh, Nhân viên, Mẫu WhatsApp…
Cấu trúc: tiêu đề trang (h4) + Tabs → Card (tiêu đề title-16 + mô tả + 1 nút primary) → thanh công cụ → Table trong DataState.

```tsx
/**
 * RECIPE · Trang cài đặt có bảng (danh sách + thêm / sửa / xoá)
 * Khi nào dùng: Thẻ hội thoại, Mẫu trả lời nhanh, Nhân viên, Mẫu WhatsApp…
 * Cấu trúc: tiêu đề trang (h4) + Tabs → Card (tiêu đề title-16 + mô tả + 1 nút primary) → thanh công cụ → Table trong DataState.
 */
import { useMemo, useState } from 'react';
import { MagnifyingGlass, PencilSimple, Plus, Trash } from '@phosphor-icons/react';
import { App, Button, Icon, Input, Segmented, Switch, Table, Tabs, Tag, Text, Tooltip } from '@pancake/ui';
import type { TableProps, TagColor } from '@pancake/ui';
import { Card } from '../components/ds-local';
import { DataState, type LoadState } from './DataState';
import { TagFormModal, type TagFormValues } from './FormModal';
import { useConfirmDelete } from './useConfirmDelete';

export interface TagRow { key: string; name: string; color: TagColor; count: number; auto: boolean }

export function SettingsTablePage({ initial, state = 'ready' }: { initial: TagRow[]; state?: LoadState }) {
  const { message } = App.useApp();
  const confirmDelete = useConfirmDelete();
  const [rows, setRows] = useState(initial);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState<TagRow | null | 'new'>(null);

  const shown = useMemo(
    () => rows.filter((r) => r.name.toLowerCase().includes(q.trim().toLowerCase()) && (filter === 'all' || (filter === 'ai') === r.auto)),
    [rows, q, filter],
  );

  const save = (v: TagFormValues) => {
    if (editing === 'new') setRows((all) => [...all, { key: String(Date.now()), count: 0, auto: false, ...v }]);
    else if (editing) setRows((all) => all.map((r) => (r.key === editing.key ? { ...r, ...v } : r)));
    message.success(editing === 'new' ? 'Đã thêm thẻ' : 'Đã lưu thẻ');
    setEditing(null);
  };

  const columns: TableProps<TagRow>['columns'] = [
    { title: 'Tên thẻ', dataIndex: 'name', render: (_, r) => <Tag color={r.color}>{r.name}</Tag> },
    { title: 'Số hội thoại', dataIndex: 'count', align: 'right', width: 160, render: (v: number) => v.toLocaleString('vi-VN') },
    {
      title: 'Tự gắn bằng AI', dataIndex: 'auto', width: 180,
      render: (v: boolean, r) => <Switch checked={v} onChange={(c) => setRows((all) => all.map((x) => (x.key === r.key ? { ...x, auto: c } : x)))} />,
    },
    {
      key: 'actions', width: 96, align: 'right',
      render: (_, r) => (
        <span style={{ display: 'inline-flex', gap: 'var(--pk-space-050)' }}>
          <Tooltip title="Sửa thẻ"><Button variant="text" size="s" icon={<PencilSimple />} aria-label="Sửa thẻ" onClick={() => setEditing(r)} /></Tooltip>
          <Tooltip title="Xoá thẻ">
            <Button variant="text" size="s" negative icon={<Trash />} aria-label="Xoá thẻ"
              onClick={() => confirmDelete({
                title: `Xoá thẻ "${r.name}"?`,
                content: `Thẻ sẽ bị gỡ khỏi ${r.count.toLocaleString('vi-VN')} hội thoại. Không thể hoàn tác.`,
                okText: 'Xoá thẻ',
                onOk: () => { setRows((all) => all.filter((x) => x.key !== r.key)); message.success('Đã xoá thẻ'); },
              })} />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: 'var(--pk-space-400)', display: 'grid', gap: 'var(--pk-space-200)', maxWidth: 1216, margin: '0 auto' }}>
      <div>
        <Text variant="h4-medium">Cài đặt trang</Text>
        <Tabs defaultActiveKey="tags" items={[
          { key: 'general', label: 'Cài đặt chung' }, { key: 'tags', label: 'Thẻ hội thoại' }, { key: 'reply', label: 'Trả lời nhanh' }, { key: 'perm', label: 'Phân quyền' },
        ]} />
      </div>
      <Card
        title={
          <div>
            <Text variant="title-16-medium" as="h3">Thẻ hội thoại</Text>
            <Text tone="subtlest" as="p">Phân loại khách để lọc hội thoại nhanh hơn.</Text>
          </div>
        }
        extra={<Button variant="primary" icon={<Plus />} onClick={() => setEditing('new')}>Thêm thẻ</Button>}
      >
        <div style={{ display: 'flex', gap: 'var(--pk-space-150)', alignItems: 'center' }}>
          <Input allowClear placeholder="Tìm thẻ" prefix={<Icon as={MagnifyingGlass} tone="subtle" />} style={{ width: 280 }} value={q} onChange={(e) => setQ(e.target.value)} />
          <Segmented value={filter} onChange={(v) => setFilter(String(v))} options={[{ value: 'all', label: 'Tất cả' }, { value: 'ai', label: 'Đang bật AI' }, { value: 'manual', label: 'Tắt AI' }]} />
        </div>
        <DataState
          state={state}
          isEmpty={shown.length === 0}
          emptyText={q ? `Không tìm thấy thẻ “${q}”` : 'Chưa có thẻ hội thoại nào'}
          emptyAction={!q && <Button variant="tertiary-blue" dashed icon={<Plus />} onClick={() => setEditing('new')}>Thêm thẻ</Button>}
        >
          <Table<TagRow> rowKey="key" columns={columns} dataSource={shown} pagination={shown.length > 20 ? { pageSize: 20 } : false} rowSelection={{}} />
        </DataState>
      </Card>
      <TagFormModal open={editing !== null} initial={editing && editing !== 'new' ? editing : undefined} onCancel={() => setEditing(null)} onSubmit={save} />
    </div>
  );
}
```

### 4. Modal form
_File mẫu: `examples/pancake-app-starter/src/recipes/FormModal.tsx`_

RECIPE · Modal form ngắn (thêm / sửa)
Khi nào dùng: tạo / sửa 1 đối tượng có ≤ 5 trường. Nhiều hơn → trang riêng hoặc Drawer.
Spec: width="confirm" (500) · Form dọc · footer: Huỷ (secondary-gray) + 1 primary bắt đầu bằng động từ.

```tsx
/**
 * RECIPE · Modal form ngắn (thêm / sửa)
 * Khi nào dùng: tạo / sửa 1 đối tượng có ≤ 5 trường. Nhiều hơn → trang riêng hoặc Drawer.
 * Spec: width="confirm" (500) · Form dọc · footer: Huỷ (secondary-gray) + 1 primary bắt đầu bằng động từ.
 */
import { useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Tag } from '@pancake/ui';
import type { TagColor } from '@pancake/ui';

export interface TagFormValues { name: string; color: TagColor }
const COLORS: TagColor[] = ['blue', 'cyan', 'geekblue', 'purple', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green'];

export function TagFormModal({ open, initial, onCancel, onSubmit }: {
  open: boolean; initial?: TagFormValues; onCancel: () => void; onSubmit: (v: TagFormValues) => void;
}) {
  const [form] = Form.useForm<TagFormValues>();
  useEffect(() => {
    if (open) form.setFieldsValue(initial ?? { name: '', color: 'blue' });
  }, [open, initial, form]);
  const isEdit = Boolean(initial);
  return (
    <Modal
      open={open}
      width="confirm"
      title={isEdit ? 'Sửa thẻ hội thoại' : 'Thêm thẻ hội thoại'}
      onCancel={onCancel}
      destroyOnHidden
      footer={[
        <Button key="cancel" variant="secondary-gray" onClick={onCancel}>Huỷ</Button>,
        <Button key="ok" variant="primary" onClick={() => form.submit()}>{isEdit ? 'Lưu' : 'Thêm thẻ'}</Button>,
      ]}
    >
      <Form form={form} layout="vertical" requiredMark onFinish={onSubmit}>
        <Form.Item label="Tên thẻ" name="name" rules={[{ required: true, whitespace: true, message: 'Nhập tên thẻ' }]}>
          <Input placeholder="VD: Khách quay lại" maxLength={30} showCount />
        </Form.Item>
        <Form.Item label="Màu thẻ" name="color">
          <Select options={COLORS.map((c) => ({ value: c, label: <Tag color={c}>{c}</Tag> }))} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
```

### 5. Xác nhận xoá
_File mẫu: `examples/pancake-app-starter/src/recipes/useConfirmDelete.tsx`_

RECIPE · Xác nhận xoá
Tiêu đề = câu hỏi có tên đối tượng · nội dung = hệ quả + "Không thể hoàn tác." · nút "Xoá …" negative + "Huỷ".

```tsx
/**
 * RECIPE · Xác nhận xoá
 * Tiêu đề = câu hỏi có tên đối tượng · nội dung = hệ quả + "Không thể hoàn tác." · nút "Xoá …" negative + "Huỷ".
 */
import { App } from '@pancake/ui';

export function useConfirmDelete() {
  const { modal } = App.useApp();
  return ({ title, content, okText = 'Xoá', onOk }: { title: string; content: string; okText?: string; onOk: () => void | Promise<void> }) =>
    modal.confirm({
      title,
      content,
      okText,
      cancelText: 'Huỷ',
      okButtonProps: { danger: true },
      centered: true,
      width: 500,
      onOk,
    });
}
```

### 6. Drawer cài đặt nhiều mục
_File mẫu: `examples/pancake-app-starter/src/recipes/SettingsDrawer.tsx`_

RECIPE · Drawer cài đặt nhiều mục (QĐ #19)
Khi nào dùng: cài đặt có ≥ 3 nhóm mục mở từ màn đang làm việc.
Spec: rộng 760 · cột trái 200 nền `surface/sunken` · nội dung trắng · divider chỉ giữa 2 vùng lớn (QĐ #31) · footer Huỷ + Lưu.

```tsx
/**
 * RECIPE · Drawer cài đặt nhiều mục (QĐ #19)
 * Khi nào dùng: cài đặt có ≥ 3 nhóm mục mở từ màn đang làm việc.
 * Spec: rộng 760 · cột trái 200 nền `surface/sunken` · nội dung trắng · divider chỉ giữa 2 vùng lớn (QĐ #31) · footer Huỷ + Lưu.
 */
import { useState } from 'react';
import { Button, Form, Input, Select, Switch, Text } from '@pancake/ui';
import { Drawer } from '../components/ds-local';

const SECTIONS = [
  { key: 'general', label: 'Chung' },
  { key: 'notify', label: 'Thông báo' },
  { key: 'reply', label: 'Trả lời tự động' },
];

export function SettingsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState('general');
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Cài đặt trang"
      styles={{ body: { padding: 0, display: 'grid', gridTemplateColumns: '200px 1fr' } }}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--pk-space-100)' }}>
          <Button variant="secondary-gray" onClick={onClose}>Huỷ</Button>
          <Button variant="primary" onClick={onClose}>Lưu</Button>
        </div>
      }
    >
      <nav style={{ background: 'var(--pk-surface-sunken)', padding: 'var(--pk-space-150)', display: 'grid', alignContent: 'start', gap: 'var(--pk-space-050)' }}>
        {SECTIONS.map((s) => (
          <Button key={s.key} variant="text" onClick={() => setActive(s.key)}
            style={{ justifyContent: 'flex-start', background: s.key === active ? 'var(--pk-bg-item-selected)' : undefined }}>
            {s.label}
          </Button>
        ))}
      </nav>
      <div style={{ padding: 'var(--pk-space-300)', display: 'grid', gap: 'var(--pk-space-300)', alignContent: 'start' }}>
        <Form layout="vertical" requiredMark>
          <Form.Item label="Tên hiển thị" name="name" initialValue="Pancake Shop"><Input /></Form.Item>
          <Form.Item label="Ngôn ngữ trả lời" name="lang" initialValue="vi">
            <Select options={[{ value: 'vi', label: 'Tiếng Việt' }, { value: 'en', label: 'English' }]} />
          </Form.Item>
        </Form>
        <div style={{ height: 'var(--pk-border-width-default)', background: 'var(--pk-border-subtlest)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--pk-space-200)' }}>
          <div>
            <Text variant="body-14-medium" as="div">Ẩn bình luận có số điện thoại</Text>
            <Text tone="subtlest" as="div">Khách khác không thấy số của người bình luận.</Text>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </Drawer>
  );
}
```

### 7. Danh sách hội thoại + bong bóng chat
_File mẫu: `examples/pancake-app-starter/src/recipes/ConversationList.tsx`_

RECIPE · Danh sách hội thoại (vùng mật độ cao) + bong bóng chat
Khi nào dùng: cột trái màn Hội thoại, danh sách tin nhắn, mọi list dày dùng cả ngày.
Spec: cột ~400 · dòng 72 · chữ dense-13 (tên Medium, preview Regular subtlest) · giờ dense-11 · chưa đọc = Badge đỏ + tên Medium
      · đang chọn bg/item/selected · hover bg/item/hover · tag mini cỡ dense-10.

```tsx
/**
 * RECIPE · Danh sách hội thoại (vùng mật độ cao) + bong bóng chat
 * Khi nào dùng: cột trái màn Hội thoại, danh sách tin nhắn, mọi list dày dùng cả ngày.
 * Spec: cột ~400 · dòng 72 · chữ dense-13 (tên Medium, preview Regular subtlest) · giờ dense-11 · chưa đọc = Badge đỏ + tên Medium
 *       · đang chọn bg/item/selected · hover bg/item/hover · tag mini cỡ dense-10.
 */
import type { ComponentType } from 'react';
import type { IconProps } from '@phosphor-icons/react';
import { Badge, Icon, Text } from '@pancake/ui';
import { Avatar } from '../components/ds-local';
import './conversation.css';

export interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
  channel: ComponentType<IconProps>;
  tags?: Array<{ label: string; color: 'blue' | 'gold' | 'green' | 'red' | 'purple' | 'volcano' }>;
}

export function ConversationItem({ c, selected, onSelect }: { c: Conversation; selected?: boolean; onSelect?: () => void }) {
  return (
    <button type="button" className={`pk-conv${selected ? ' is-selected' : ''}`} onClick={onSelect} aria-current={selected || undefined}>
      <span className="pk-conv__avatar">
        <Avatar size={40}>{c.name.slice(0, 1)}</Avatar>
        <span className="pk-conv__channel"><Icon as={c.channel} size="sm" tone="subtle" /></span>
      </span>
      <span className="pk-conv__body">
        <span className="pk-conv__row">
          <Text variant={c.unread ? 'dense-13-medium' : 'dense-13-regular'} className="pk-ellipsis">{c.name}</Text>
          <Text variant="dense-11-regular" tone="subtlest" style={{ whiteSpace: 'nowrap' }}>{c.time}</Text>
        </span>
        <span className="pk-conv__row">
          <Text variant="dense-13-regular" tone={c.unread ? 'default' : 'subtlest'} className="pk-ellipsis">{c.preview}</Text>
          {c.unread > 0 && <Badge count={c.unread} size="sm" />}
        </span>
        {c.tags?.length ? (
          <span className="pk-conv__tags">
            {c.tags.map((t) => (
              <span key={t.label} className={`pk-tag-mini pk-tag-mini--${t.color}`}>{t.label}</span>
            ))}
          </span>
        ) : null}
      </span>
    </button>
  );
}

export function ChatBubble({ side, text, time }: { side: 'in' | 'out'; text: string; time: string }) {
  return (
    <div className={`pk-bubble pk-bubble--${side}`}>
      <Text variant="body-14-regular" as="p">{text}</Text>
      <Text variant="dense-11-regular" tone="subtlest" as="span" className="pk-bubble__time">{time}</Text>
    </div>
  );
}
```

#### CSS đi kèm
```css
/* Danh sách hội thoại + bong bóng chat — chỉ dùng token --pk-*. */
.pk-conv {
  display: flex;
  gap: var(--pk-space-150);
  align-items: flex-start;
  width: 100%;
  min-height: 72px;
  padding: var(--pk-space-150) var(--pk-space-200);
  border: 0;
  border-radius: var(--pk-radius-md);
  background: transparent;
  text-align: left;
  cursor: pointer;
}
.pk-conv:hover { background: var(--pk-bg-item-hover); }
.pk-conv.is-selected { background: var(--pk-bg-item-selected); }
.pk-conv:focus-visible { outline: none; box-shadow: var(--pk-focus-brand); }
.pk-conv__avatar { position: relative; flex-shrink: 0; }
.pk-conv__channel {
  position: absolute; right: calc(var(--pk-space-050) * -1); bottom: calc(var(--pk-space-050) * -1);
  display: grid; place-items: center; width: var(--pk-size-icon-lg); height: var(--pk-size-icon-lg);
  border-radius: var(--pk-radius-rounded); background: var(--pk-surface-default);
  border: var(--pk-border-width-default) solid var(--pk-border-inverse);
}
.pk-conv__body { flex: 1; min-width: 0; display: grid; gap: var(--pk-space-025); }
.pk-conv__row { display: flex; align-items: center; justify-content: space-between; gap: var(--pk-space-100); min-width: 0; }
.pk-conv__tags { display: flex; flex-wrap: wrap; gap: var(--pk-space-050); margin-top: var(--pk-space-025); }
.pk-ellipsis { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; min-width: 0; }

/* Tag mini — vùng mật độ cao (Tag/Mini trong DS_AI): cao 18, chữ Dense 10 */
.pk-tag-mini {
  display: inline-flex; align-items: center; height: var(--pk-size-kbd-sm); padding: 0 var(--pk-space-075);
  border-radius: var(--pk-radius-xs); font: var(--pk-typography-dense-10-medium);
}
.pk-tag-mini--blue { background: var(--pk-accent-blue-bg); color: var(--pk-accent-blue-text); }
.pk-tag-mini--gold { background: var(--pk-accent-gold-bg); color: var(--pk-accent-gold-text); }
.pk-tag-mini--green { background: var(--pk-accent-green-bg); color: var(--pk-accent-green-text); }
.pk-tag-mini--red { background: var(--pk-accent-red-bg); color: var(--pk-accent-red-text); }
.pk-tag-mini--purple { background: var(--pk-accent-purple-bg); color: var(--pk-accent-purple-text); }
.pk-tag-mini--volcano { background: var(--pk-accent-volcano-bg); color: var(--pk-accent-volcano-text); }

/* Khung chat */
.pk-chat { background: var(--pk-chat-bg); padding: var(--pk-space-300); display: grid; gap: var(--pk-space-100); align-content: start; }
.pk-bubble { max-width: 70%; padding: var(--pk-space-100) var(--pk-space-150); border-radius: var(--pk-radius-xl); display: grid; gap: var(--pk-space-025); }
.pk-bubble p { margin: 0; }
.pk-bubble--in { justify-self: start; background: var(--pk-chat-bubble-incoming); border-bottom-left-radius: var(--pk-radius-xs); }
.pk-bubble--out { justify-self: end; background: var(--pk-chat-bubble-outgoing); border-bottom-right-radius: var(--pk-radius-xs); }
.pk-bubble__time { justify-self: end; }
```

### 8. Component tạm cho phần DS chưa có (src/components/ds-local)
_File mẫu: `examples/pancake-app-starter/src/components/ds-local/index.tsx`_

Component tạm cho phần DS_AI CHƯA CÓ — nơi duy nhất được import antd trực tiếp.
Mỗi component chỉ dùng token Pancake. Khi Designer bổ sung vào Figma + @pancake/ui → xoá file này, đổi import.

```tsx
/**
 * Component tạm cho phần DS_AI CHƯA CÓ — nơi duy nhất được import antd trực tiếp.
 * Mỗi component chỉ dùng token Pancake. Khi Designer bổ sung vào Figma + @pancake/ui → xoá file này, đổi import.
 */
import type { CSSProperties, ReactNode } from 'react';
import { Avatar as AntAvatar, Drawer as AntDrawer } from 'antd';
import type { AvatarProps as AntAvatarProps, DrawerProps as AntDrawerProps } from 'antd';
import { Text } from '@pancake/ui';

// TODO(DS): chờ component Avatar trong DS_AI
export function Avatar({ size = 40, ...rest }: Omit<AntAvatarProps, 'size' | 'shape'> & { size?: 24 | 32 | 40 | 48 }) {
  return (
    <AntAvatar
      {...rest}
      size={size}
      style={{ background: 'var(--pk-bg-neutral-rest)', color: 'var(--pk-text-control)', flexShrink: 0, ...rest.style }}
    />
  );
}

// TODO(DS): chờ component Card trong DS_AI
export function Card({ title, extra, children, style }: { title?: ReactNode; extra?: ReactNode; children: ReactNode; style?: CSSProperties }) {
  return (
    <section
      style={{
        background: 'var(--pk-surface-default)',
        border: 'var(--pk-border-width-default) solid var(--pk-border-subtlest)',
        borderRadius: 'var(--pk-radius-xl)',
        padding: 'var(--pk-space-300)',
        display: 'grid',
        gap: 'var(--pk-space-200)',
        ...style,
      }}
    >
      {(title || extra) && (
        <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--pk-space-200)' }}>
          {typeof title === 'string' ? <Text variant="title-16-medium" as="h3">{title}</Text> : title}
          {extra}
        </header>
      )}
      {children}
    </section>
  );
}

// TODO(DS): chờ component Drawer trong DS_AI — rộng 760, header Title 16 Medium
export function Drawer({ width = 760, ...rest }: AntDrawerProps) {
  return <AntDrawer {...rest} size={width} />;
}
```

### 9. Playground — lên design trong code
_File mẫu: `examples/pancake-app-starter/src/playground/Playground.tsx`_

Playground — nơi "lên design" ngay trong code (chỉ bật khi dev: import.meta.env.DEV).
Mỗi màn = 1 file trong src/playground/, đăng ký vào PAGES. Mỗi trạng thái = 1 mục trong `states`.
Mở: http://localhost:5173/playground/<slug>?state=<tên trạng thái>

```tsx
/**
 * Playground — nơi "lên design" ngay trong code (chỉ bật khi dev: import.meta.env.DEV).
 * Mỗi màn = 1 file trong src/playground/, đăng ký vào PAGES. Mỗi trạng thái = 1 mục trong `states`.
 * Mở: http://localhost:5173/playground/<slug>?state=<tên trạng thái>
 */
import { useEffect, useState, type ComponentType } from 'react';
import { Segmented, Text } from '@pancake/ui';
import { LocHoiThoaiPlayground } from './3416-loc-hoi-thoai';
import { TheHoiThoaiPlayground } from './the-hoi-thoai';
import { StickerPopoverPlayground } from './figma-exact/3066-sticker-popover';

export interface PlaygroundPage {
  slug: string;
  issue?: string;
  title: string;
  states: Record<string, ComponentType>;
}

export const PAGES: PlaygroundPage[] = [LocHoiThoaiPlayground, TheHoiThoaiPlayground, StickerPopoverPlayground];

export function Playground() {
  const slug = location.pathname.replace(/^\/playground\/?/, '');
  const page = PAGES.find((p) => p.slug === slug);
  const params = new URLSearchParams(location.search);
  const names = page ? Object.keys(page.states) : [];
  const [state, setState] = useState(params.get('state') ?? names[0]);
  useEffect(() => {
    if (!page) return;
    const url = new URL(location.href);
    url.searchParams.set('state', state);
    history.replaceState(null, '', url);
  }, [state, page]);

  if (!page)
    return (
      <div style={{ padding: 'var(--pk-space-500)', display: 'grid', gap: 'var(--pk-space-150)' }}>
        <Text variant="h4-medium">Playground</Text>
        {PAGES.map((p) => (
          <a key={p.slug} href={`/playground/${p.slug}`} style={{ color: 'var(--pk-text-brand-rest)' }}>
            {p.issue ? `#${p.issue} ` : ''}{p.title}
          </a>
        ))}
      </div>
    );

  const Screen = page.states[state] ?? page.states[names[0]];
  return (
    <div>
      <div
        data-playground-bar
        style={{
          position: 'fixed', zIndex: 1000, right: 'var(--pk-space-200)', bottom: 'var(--pk-space-200)', display: 'flex', alignItems: 'center',
          gap: 'var(--pk-space-150)', padding: 'var(--pk-space-100) var(--pk-space-150)', background: 'var(--pk-surface-overlay)',
          borderRadius: 'var(--pk-radius-xl)', boxShadow: 'var(--pk-elevation-overlay)',
        }}
      >
        <Text variant="footnote-12-medium" tone="subtlest">{page.issue ? `#${page.issue} · ` : ''}Trạng thái</Text>
        <Segmented size="s" value={state} onChange={(v) => setState(String(v))} options={names} />
      </div>
      <Screen />
    </div>
  );
}
```

Đăng màn mới vào playground:
```tsx
import { AppShell } from '../recipes/AppShell';
import { SettingsTablePage, type TagRow } from '../recipes/SettingsTablePage';
import type { PlaygroundPage } from './Playground';

const DATA: TagRow[] = [
  { key: '1', name: 'Khách VIP', color: 'gold', count: 128, auto: true },
  { key: '2', name: 'Đã chốt đơn', color: 'green', count: 2045, auto: true },
  { key: '3', name: 'Cần gọi lại', color: 'volcano', count: 37, auto: false },
  { key: '4', name: 'Hỏi giá', color: 'blue', count: 512, auto: true },
  { key: '5', name: 'Khiếu nại', color: 'red', count: 9, auto: false },
];

export const TheHoiThoaiPlayground: PlaygroundPage = {
  slug: 'the-hoi-thoai',
  title: 'Cài đặt · Thẻ hội thoại (recipe)',
  states: {
    'Có dữ liệu': () => <AppShell><SettingsTablePage initial={DATA} /></AppShell>,
    'Trống': () => <AppShell><SettingsTablePage initial={[]} /></AppShell>,
    'Đang tải': () => <AppShell><SettingsTablePage initial={[]} state="loading" /></AppShell>,
    'Lỗi': () => <AppShell><SettingsTablePage initial={[]} state="error" /></AppShell>,
  },
};
```

Route chỉ bật khi dev (`src/App.tsx`):
```tsx
import { Playground } from './playground/Playground';
import { AppShell } from './recipes/AppShell';
import { SettingsTablePage } from './recipes/SettingsTablePage';

export function App() {
  if (import.meta.env.DEV && location.pathname.startsWith('/playground')) return <Playground />;
  return (
    <AppShell>
      <SettingsTablePage initial={[]} />
    </AppShell>
  );
}
```

### 10. Ví dụ đầy đủ — #3416 Lọc hội thoại theo nguồn (4 trạng thái)
_File mẫu: `examples/pancake-app-starter/src/playground/3416-loc-hoi-thoai.tsx`_

#3416 Lọc hội thoại theo nguồn — playground (dựng theo skill pancake-ui-dev, chế độ "lên design").
Requirement: lọc danh sách hội thoại theo 1 hoặc nhiều kênh nguồn, kết hợp với Tất cả / Chưa đọc / Chưa trả lời;
thấy rõ bộ lọc đang áp dụng và bỏ nhanh; có trạng thái không có kết quả và đang tải.

```tsx
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
```
