import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { App, Popconfirm, Popover, Progress, Skeleton, Spin, Tooltip } from 'antd';
import { Info } from '@phosphor-icons/react';
import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Modal, Empty } from '../components/Controls';
import { Input } from 'antd';
import { Text } from '../components/Text';
import { Shortcut } from '../components/Kbd';
import { Section, Row, Label } from './helpers';

const meta: Meta = { id: 'components-phan-hoi', title: 'Components/Phản hồi & Lớp nổi' };
export default meta;

export const Alerts: StoryObj = {
  name: 'Alert',
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Section title="Alert gọn (compact)" note="Cao 32 · bo 8 · padding 4/8 · icon 20. Dùng trong drawer / form.">
        <div style={{ display: 'grid', gap: 'var(--pk-space-100)' }}>
          <Alert type="info" title="Tin nhắn sẽ được gửi sau 5 phút nếu khách chưa phản hồi." />
          <Alert type="success" title="Đã kết nối trang Pancake Shop." />
          <Alert type="warning" title="Trang sắp hết hạn token, hãy kết nối lại." closable />
          <Alert type="error" title="Không gửi được tin. Kiểm tra kết nối mạng." />
        </div>
      </Section>
      <Section title="Alert đầy đủ" note="Padding 20/24 · tiêu đề Title 16 · mô tả Body 14.">
        <Alert compact={false} type="warning" title="Gói Pro hết hạn sau 3 ngày" description="Gia hạn trước 15/11/2026 để không gián đoạn trả lời khách trên 6 trang đang kết nối." />
      </Section>
    </div>
  ),
};

function MessageDemo() {
  const { message, notification, modal } = App.useApp();
  return (
    <Row>
      <Button variant="secondary-gray" onClick={() => message.success('Đã lưu thẻ hội thoại')}>Message thành công</Button>
      <Button variant="secondary-gray" onClick={() => message.error('Không lưu được, thử lại sau')}>Message lỗi</Button>
      <Button variant="secondary-gray" onClick={() => notification.warning({ title: 'Mất kết nối', description: 'Đang thử kết nối lại với máy chủ…' })}>Notification</Button>
      <Button variant="tertiary-blue" negative onClick={() => modal.confirm({
        title: 'Xoá thẻ "Khách VIP"?', content: 'Thẻ sẽ bị gỡ khỏi 128 hội thoại. Không thể hoàn tác.',
        okText: 'Xoá thẻ', cancelText: 'Huỷ', okButtonProps: { danger: true }, width: 500, centered: true,
      })}>Hộp xác nhận xoá</Button>
    </Row>
  );
}
export const MessageNotification: StoryObj = { name: 'Message · Notification · Confirm', render: () => <Section title="Dùng App.useApp()" note="message (toast) báo kết quả thao tác · notification báo sự kiện · modal.confirm cho xác nhận nhanh."><MessageDemo /></Section> };

export const ModalNoiDung: StoryObj = {
  name: 'Modal nội dung',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Section title="Modal md 883 · bo 16" note="Footer: Secondary Gray “Huỷ” + 1 Primary.">
        <Button variant="primary" onClick={() => setOpen(true)}>Mở modal</Button>
        <Modal open={open} onCancel={() => setOpen(false)} title="Thêm mẫu trả lời nhanh" width="md"
          footer={[<Button key="c" variant="secondary-gray" onClick={() => setOpen(false)}>Huỷ</Button>, <Button key="o" variant="primary" onClick={() => setOpen(false)}>Lưu mẫu</Button>]}>
          <div style={{ display: 'grid', gap: 'var(--pk-space-200)', padding: 'var(--pk-space-100) 0' }}>
            <Input placeholder="Phím tắt, VD: /chao" />
            <Input.TextArea rows={5} placeholder="Nội dung trả lời" />
          </div>
        </Modal>
      </Section>
    );
  },
};

export const LopNoi: StoryObj = {
  name: 'Tooltip · Popover · Popconfirm',
  render: () => (
    <Section title="Lớp nổi" note="surface/overlay + elevation/overlay; tooltip tối dùng surface/inverse.">
      <Row gap="var(--pk-space-300)">
        <Tooltip title="Gửi tin">
          <Button variant="secondary-gray">Tooltip</Button>
        </Tooltip>
        <Tooltip title={<span>Tìm hội thoại <Shortcut keys={['⌘', 'K']} /></span>}>
          <Button variant="secondary-gray">Tooltip + phím tắt</Button>
        </Tooltip>
        <Popover title="Thông tin khách" content={<Text tone="subtle">Đã mua 4 đơn · Lần cuối 02/11/2026</Text>}>
          <Button variant="secondary-gray" icon={<Info />}>Popover</Button>
        </Popover>
        <Popconfirm title="Gỡ thẻ khỏi hội thoại?" okText="Gỡ" cancelText="Huỷ">
          <Button variant="tertiary-gray">Popconfirm</Button>
        </Popconfirm>
      </Row>
    </Section>
  ),
};

export const TrangThaiTai: StoryObj = {
  name: 'Progress · Spin · Skeleton · Empty',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Section title="Progress">
        <Row style={{ marginBottom: 'var(--pk-space-100)' }}><Label>Thông tin</Label><Progress percent={45} style={{ width: 320 }} /></Row>
        <Row style={{ marginBottom: 'var(--pk-space-100)' }}><Label>Thành công</Label><Progress percent={100} status="success" style={{ width: 320 }} /></Row>
        <Row><Label>Lỗi</Label><Progress percent={70} status="exception" style={{ width: 320 }} /></Row>
        <Row style={{ marginTop: 'var(--pk-space-150)' }}><Progress type="circle" percent={72} size={64} /><Progress type="circle" percent={100} size={48} status="success" /></Row>
      </Section>
      <Section title="Spin · Skeleton">
        <Row gap="var(--pk-space-500)" align="flex-start"><Spin size="large" /><Skeleton active avatar paragraph={{ rows: 2 }} style={{ width: 400 }} /></Row>
      </Section>
      <Section title="Empty" note="Màn sản phẩm dùng minh hoạ Empty states trong DS_AI (48 loại) — đặt ảnh qua prop image.">
        <Empty description="Chưa có thẻ hội thoại nào" />
      </Section>
    </div>
  ),
};
