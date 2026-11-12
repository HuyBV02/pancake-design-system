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
