import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Form, Input, Select, Table, Tabs, App } from 'antd';
import type { TableProps } from 'antd';
import { MagnifyingGlass, Plus, PencilSimple, Trash, DotsSixVertical } from '@phosphor-icons/react';
import { Button } from '../components/Button';
import { Tag } from '../components/Tag';
import type { TagColor } from '../components/Tag';
import { Text } from '../components/Text';
import { Icon } from '../components/Icon';
import { Switch, Modal, Segmented, Empty } from '../components/Controls';
import { Alert } from '../components/Alert';

const meta: Meta = {
  id: 'patterns-the-hoi-thoai',
  title: 'Patterns/Cài đặt · Thẻ hội thoại',
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Màn mẫu dựng 100% bằng @pancake/ui + token — minh hoạ cách “lên design” ngay trong code, không qua Figma.' } },
  },
};
export default meta;

interface Row { key: string; name: string; color: TagColor; count: number; auto: boolean; staff: string }
const DATA: Row[] = [
  { key: '1', name: 'Khách VIP', color: 'gold', count: 128, auto: true, staff: 'Lan Anh' },
  { key: '2', name: 'Đã chốt đơn', color: 'green', count: 2045, auto: true, staff: 'Tất cả' },
  { key: '3', name: 'Cần gọi lại', color: 'volcano', count: 37, auto: false, staff: 'Quang Minh' },
  { key: '4', name: 'Hỏi giá', color: 'blue', count: 512, auto: true, staff: 'Tất cả' },
  { key: '5', name: 'Khiếu nại', color: 'red', count: 9, auto: false, staff: 'Tú' },
  { key: '6', name: 'Khách sỉ', color: 'purple', count: 64, auto: false, staff: 'Lan Anh' },
];
const COLOR_OPTIONS: TagColor[] = ['blue', 'cyan', 'geekblue', 'purple', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green'];

function SettingsTags({ empty = false }: { empty?: boolean }) {
  const { message, modal } = App.useApp();
  const [rows, setRows] = useState<Row[]>(empty ? [] : DATA);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const shown = useMemo(() => rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase())), [rows, q]);

  const columns: TableProps<Row>['columns'] = [
    { key: 'drag', width: 40, render: () => <Icon as={DotsSixVertical} tone="subtlest" /> },
    { title: 'Tên thẻ', dataIndex: 'name', render: (_, r) => <Tag color={r.color}>{r.name}</Tag> },
    { title: 'Số hội thoại', dataIndex: 'count', align: 'right', width: 140, render: (v: number) => <Text>{v.toLocaleString('vi-VN')}</Text> },
    { title: 'Phụ trách', dataIndex: 'staff', width: 180, render: (v: string) => <Text tone="subtle">{v}</Text> },
    {
      title: 'Tự gắn bằng AI', dataIndex: 'auto', width: 160,
      render: (v: boolean, r) => <Switch checked={v} onChange={(c) => setRows((all) => all.map((x) => (x.key === r.key ? { ...x, auto: c } : x)))} />,
    },
    {
      key: 'act', width: 96, align: 'right',
      render: (_, r) => (
        <span style={{ display: 'inline-flex', gap: 'var(--pk-space-050)' }}>
          <Button variant="text" size="s" icon={<PencilSimple />} aria-label="Sửa thẻ" />
          <Button variant="text" size="s" negative icon={<Trash />} aria-label="Xoá thẻ"
            onClick={() => modal.confirm({
              title: `Xoá thẻ "${r.name}"?`, content: `Thẻ sẽ bị gỡ khỏi ${r.count.toLocaleString('vi-VN')} hội thoại. Không thể hoàn tác.`,
              okText: 'Xoá thẻ', cancelText: 'Huỷ', okButtonProps: { danger: true }, centered: true, width: 500,
              onOk: () => { setRows((all) => all.filter((x) => x.key !== r.key)); message.success('Đã xoá thẻ'); },
            })} />
        </span>
      ),
    },
  ];

  return (
    <div style={{ minHeight: 960, background: 'var(--pk-surface-canvas)', padding: 'var(--pk-space-300)' }}>
      <div style={{ maxWidth: 1392, margin: '0 auto', display: 'grid', gap: 'var(--pk-space-200)' }}>
        <div>
          <Text variant="h4-medium">Cài đặt trang</Text>
          <Tabs defaultActiveKey="tags" style={{ marginTop: 'var(--pk-space-100)' }} items={[
            { key: 'general', label: 'Cài đặt chung' }, { key: 'tags', label: 'Thẻ hội thoại' }, { key: 'reply', label: 'Trả lời nhanh' },
            { key: 'ai', label: 'Trợ lý AI' }, { key: 'perm', label: 'Phân quyền' },
          ]} />
        </div>

        <div style={{ background: 'var(--pk-surface-default)', borderRadius: 'var(--pk-radius-xl)', border: 'var(--pk-border-width-default) solid var(--pk-border-subtlest)', padding: 'var(--pk-space-300)', display: 'grid', gap: 'var(--pk-space-200)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--pk-space-200)' }}>
            <div>
              <Text variant="title-16-medium" as="h3">Thẻ hội thoại</Text>
              <Text tone="subtlest" as="p" style={{ marginTop: 'var(--pk-space-050)' }}>Gắn thẻ để phân loại khách và lọc hội thoại nhanh hơn.</Text>
            </div>
            <Button variant="primary" icon={<Plus />} onClick={() => setOpen(true)}>Thêm thẻ</Button>
          </div>

          <Alert type="info" title="AI sẽ tự gắn thẻ dựa trên nội dung tin nhắn với các thẻ đang bật “Tự gắn bằng AI”." />

          <div style={{ display: 'flex', gap: 'var(--pk-space-150)', alignItems: 'center' }}>
            <Input allowClear placeholder="Tìm thẻ" prefix={<Icon as={MagnifyingGlass} tone="subtle" />} style={{ width: 280 }} value={q} onChange={(e) => setQ(e.target.value)} />
            <Segmented options={['Tất cả', 'Đang bật AI', 'Tắt AI']} defaultValue="Tất cả" />
          </div>

          <Table<Row>
            columns={columns}
            dataSource={shown}
            pagination={false}
            rowSelection={{}}
            locale={{ emptyText: <Empty description={q ? `Không tìm thấy thẻ “${q}”` : 'Chưa có thẻ hội thoại nào'} /> }}
          />
        </div>
      </div>

      <Modal open={open} width="confirm" title="Thêm thẻ hội thoại" onCancel={() => setOpen(false)}
        footer={[
          <Button key="c" variant="secondary-gray" onClick={() => setOpen(false)}>Huỷ</Button>,
          <Button key="o" variant="primary" onClick={() => form.submit()}>Thêm thẻ</Button>,
        ]}>
        <Form form={form} layout="vertical" requiredMark onFinish={(v: { name: string; color: TagColor }) => {
          setRows((all) => [...all, { key: String(Date.now()), name: v.name, color: v.color, count: 0, auto: false, staff: 'Tất cả' }]);
          setOpen(false); form.resetFields(); message.success('Đã thêm thẻ');
        }}>
          <Form.Item label="Tên thẻ" name="name" rules={[{ required: true, message: 'Nhập tên thẻ' }]}>
            <Input placeholder="VD: Khách quay lại" maxLength={30} showCount />
          </Form.Item>
          <Form.Item label="Màu thẻ" name="color" initialValue="blue">
            <Select options={COLOR_OPTIONS.map((c) => ({ value: c, label: <Tag color={c}>{c}</Tag> }))} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export const CoDuLieu: StoryObj = { name: 'Có dữ liệu', render: () => <SettingsTags /> };
export const Trong: StoryObj = { name: 'Trống', render: () => <SettingsTags empty /> };
