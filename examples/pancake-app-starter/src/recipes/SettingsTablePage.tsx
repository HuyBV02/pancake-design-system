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
