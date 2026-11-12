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
