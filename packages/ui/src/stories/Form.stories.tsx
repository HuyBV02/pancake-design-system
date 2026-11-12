import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Tabs, Dropdown } from 'antd';
import { MagnifyingGlass, Users, CaretDown, ListBullets, SquaresFour, Rows, PencilSimple, Copy, Trash } from '@phosphor-icons/react';
import { Switch, Segmented } from '../components/Controls';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Shortcut } from '../components/Kbd';
import { Section, Row, Label, Card } from './helpers';

const meta: Meta = { id: 'components-nhap-lieu', title: 'Components/Nhập liệu & Điều hướng' };
export default meta;

export const InputSelect: StoryObj = {
  name: 'Input · Select · Form',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Section title="Trạng thái input" note="Viền: rest border/default · hover & focus border/focus + vòng focus/brand · lỗi border/danger/rest">
        {(['small', 'middle', 'large'] as const).map((s) => (
          <Row key={s} style={{ marginBottom: 'var(--pk-space-150)' }}>
            <Label>Size {s === 'small' ? 'S 24' : s === 'middle' ? 'M 32' : 'L 40'}</Label>
            <Input size={s} placeholder="Tìm khách hàng" prefix={<Icon as={MagnifyingGlass} tone="subtle" />} style={{ width: 240 }} />
            <Select size={s} placeholder="Chọn trang" style={{ width: 200 }} options={[{ value: 'a', label: 'Pancake Shop' }, { value: 'b', label: 'Pancake Store HN' }]} />
          </Row>
        ))}
        <Row>
          <Label>Lỗi / Vô hiệu</Label>
          <Input status="error" defaultValue="0912 345" style={{ width: 240 }} />
          <Input disabled defaultValue="Không sửa được" style={{ width: 200 }} />
        </Row>
      </Section>
      <Section title="Form" note="Label Body 14 text/subtle → 8 → input → 4 → helper / lỗi. Dấu * dùng text/danger.">
        <Card>
          <Form layout="vertical" requiredMark style={{ maxWidth: 480 }} initialValues={{ staff: ['lan', 'minh'], min: 3 }}>
            <Form.Item label="Tên thẻ" name="name" required help="Tối đa 30 ký tự" rules={[{ required: true }]}>
              <Input placeholder="VD: Khách VIP" />
            </Form.Item>
            <Form.Item label="Nhân viên phụ trách" name="staff">
              <Select mode="multiple" placeholder="Chọn nhân viên" prefix={<Icon as={Users} tone="subtle" />}
                options={[{ value: 'lan', label: 'Lan Anh' }, { value: 'minh', label: 'Quang Minh' }, { value: 'tu', label: 'Tú' }]} />
            </Form.Item>
            <Form.Item label="Số đơn tối thiểu" name="min">
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item label="Áp dụng từ ngày" name="date">
              <DatePicker placeholder="Chọn ngày" format="DD/MM/YYYY" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Ghi chú" name="note">
              <Input.TextArea rows={3} placeholder="Nhập ghi chú cho nhân viên" />
            </Form.Item>
          </Form>
        </Card>
      </Section>
    </div>
  ),
};

export const ChonLua: StoryObj = {
  name: 'Checkbox · Radio · Switch',
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <div>
        <Section title="Checkbox" note="Đã chọn = nền bg/brand-subtlest + viền border/focus + dấu blue/600 (bản _Checkbox base mới).">
          <Checkbox.Group defaultValue={['fb', 'zalo']} options={[
            { label: 'Facebook', value: 'fb' }, { label: 'Zalo OA', value: 'zalo' }, { label: 'Instagram', value: 'ig' }, { label: 'Shopee (chưa kết nối)', value: 'sp', disabled: true },
          ]} />
          <div style={{ marginTop: 'var(--pk-space-150)' }}><Checkbox indeterminate>Chọn tất cả</Checkbox></div>
        </Section>
        <Section title="Radio">
          <Radio.Group defaultValue="all" options={[
            { label: 'Tất cả hội thoại', value: 'all' }, { label: 'Chưa đọc', value: 'unread' }, { label: 'Chưa trả lời', value: 'unreplied' },
          ]} />
        </Section>
        <Section title="Switch" note="40×22 · không có cỡ small, không icon (QĐ #10).">
          <Row>
            <Switch checked={on} onChange={setOn} /> <Label>{on ? 'Đang bật' : 'Đang tắt'}</Label>
            <Switch defaultChecked disabled /> <Switch disabled /> <Switch loading defaultChecked />
          </Row>
        </Section>
      </div>
    );
  },
};

export const DieuHuong: StoryObj = {
  name: 'Segmented · Tabs · Dropdown',
  render: () => (
    <div>
      <Section title="Segmented" note="Đổi chế độ xem trong cùng 1 khối. S 26 · M 34 · L 40.">
        {(['s', 'm', 'l'] as const).map((s) => (
          <Row key={s} style={{ marginBottom: 'var(--pk-space-150)' }}>
            <Label>Size {s.toUpperCase()}</Label>
            <Segmented size={s} options={['Ngày', 'Tuần', 'Tháng']} defaultValue="Tuần" />
            <Segmented size={s} options={[
              { value: 'list', icon: <ListBullets />, label: 'Danh sách' },
              { value: 'grid', icon: <SquaresFour />, label: 'Lưới' },
              { value: 'rows', icon: <Rows />, label: 'Gọn' },
            ]} />
          </Row>
        ))}
      </Section>
      <Section title="Tabs" note="Chuyển giữa các trang con. Gạch chọn 2px blue/600, cách tab 20.">
        <Tabs defaultActiveKey="2" items={[
          { key: '1', label: 'Cài đặt chung' }, { key: '2', label: 'Thẻ hội thoại' }, { key: '3', label: 'Trả lời nhanh' }, { key: '4', label: 'Phân quyền' }, { key: '5', label: 'Lịch sử', disabled: true },
        ]} />
      </Section>
      <Section title="Dropdown" note="Panel rộng 210, bo 12, item 32 bo 6. Phím tắt dùng <Shortcut size='sm'>.">
        <Dropdown trigger={['click']} menu={{
          items: [
            { key: 'edit', icon: <PencilSimple size={20} />, label: 'Sửa thẻ', extra: <Shortcut keys={['⌘', 'E']} /> },
            { key: 'copy', icon: <Copy size={20} />, label: 'Nhân bản', extra: <Shortcut keys={['⌘', 'D']} /> },
            { type: 'divider' },
            { key: 'del', icon: <Trash size={20} />, label: 'Xoá thẻ', danger: true },
          ],
        }}>
          <Button variant="tertiary-gray" icon={<CaretDown />} iconPlacement="end">Thao tác</Button>
        </Dropdown>
      </Section>
    </div>
  ),
};
