import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaretDown, Plus, Trash, PaperPlaneTilt, DotsThree } from '@phosphor-icons/react';
import { Button } from '../components/Button';
import type { ButtonVariant } from '../components/Button';
import { Section, Row, Label } from './helpers';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Lưu thay đổi', variant: 'primary', size: 'm', negative: false, disabled: false, loading: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary-blue', 'secondary-gray', 'tertiary-blue', 'tertiary-gray', 'text', 'link'] },
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

const VARIANTS: Array<[ButtonVariant, string]> = [
  ['primary', 'Primary — mỗi màn 1 nút'],
  ['secondary-blue', 'Secondary Blue — hành động phụ cùng hướng'],
  ['secondary-gray', 'Secondary Gray — Huỷ, Quay lại'],
  ['tertiary-blue', 'Tertiary Blue'],
  ['tertiary-gray', 'Tertiary Gray'],
  ['text', 'Text'],
  ['link', 'Link'],
];

export const TatCaKieu: Story = {
  name: 'Tất cả kiểu × trạng thái',
  render: () => (
    <Section title="7 kiểu × Thường / Negative / Vô hiệu" note="Rê chuột và nhấn giữ để xem hover / pressed / vòng focus (Tab).">
      {VARIANTS.map(([v, label]) => (
        <Row key={v} style={{ marginBottom: 'var(--pk-space-200)' }}>
          <Label width={260}>{label}</Label>
          <Button variant={v}>Lưu thay đổi</Button>
          <Button variant={v} icon={<Plus />}>Thêm thẻ</Button>
          <Button variant={v} icon={<DotsThree />} aria-label="Thêm" />
          <Button variant={v} negative icon={<Trash />}>Xoá</Button>
          <Button variant={v} disabled>Lưu thay đổi</Button>
        </Row>
      ))}
    </Section>
  ),
};

export const KichCo: Story = {
  name: 'Kích cỡ S · M · L',
  render: () => (
    <Section title="S 24 · M 32 (mặc định) · L 40" note="S: bo 6, icon 18 · M: bo 8, icon 20 · L: bo 8, chữ Title 16, icon 20">
      {(['s', 'm', 'l'] as const).map((s) => (
        <Row key={s} style={{ marginBottom: 'var(--pk-space-200)' }}>
          <Label>Size {s.toUpperCase()}</Label>
          <Button size={s} variant="primary" icon={<PaperPlaneTilt />}>Gửi tin</Button>
          <Button size={s} variant="secondary-gray">Huỷ</Button>
          <Button size={s} variant="tertiary-gray" icon={<CaretDown />} iconPlacement="end">Lọc theo nguồn</Button>
          <Button size={s} variant="text" icon={<DotsThree />} aria-label="Thêm" />
        </Row>
      ))}
    </Section>
  ),
};

export const ChanModal: Story = {
  name: 'Cặp nút cuối modal',
  render: () => (
    <Row gap="var(--pk-space-100)">
      <Button variant="secondary-gray">Huỷ</Button>
      <Button variant="primary">Lưu</Button>
      <span style={{ width: 'var(--pk-space-400)' }} />
      <Button variant="secondary-gray">Huỷ</Button>
      <Button variant="primary" negative>Xoá thẻ</Button>
    </Row>
  ),
};
