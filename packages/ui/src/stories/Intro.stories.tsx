import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Text } from '../components/Text';
import { Tag } from '../components/Tag';
import { Card, Section } from './helpers';

const meta: Meta = { id: 'gioi-thieu', title: 'Giới thiệu', parameters: { layout: 'padded' } };
export default meta;

function Code({ children }: { children: ReactNode }) {
  return (
    <pre style={{
      margin: 'var(--pk-space-100) 0 0', padding: 'var(--pk-space-200)', background: 'var(--pk-surface-inverse)', color: 'var(--pk-tooltip-dark-text)',
      borderRadius: 'var(--pk-radius-md)', font: 'var(--pk-typography-body-14-code)', overflowX: 'auto',
    }}>{children}</pre>
  );
}

export const GioiThieu: StoryObj = {
  name: 'Bắt đầu',
  render: () => (
    <div style={{ maxWidth: 880 }}>
      <Text variant="h3-medium">Pancake Web Design System · code</Text>
      <Text tone="subtle" as="p" style={{ marginTop: 'var(--pk-space-100)' }}>
        Một nguồn token chung cho Figma và code (DS_AI v1.3 — <code>aScl8gFsM1pWrd0atTwyJM</code>) và thư viện component React dựng trên antd v6.
      </Text>
      <div style={{ display: 'flex', gap: 'var(--pk-space-100)', margin: 'var(--pk-space-200) 0 var(--pk-space-500)' }}>
        <Tag color="blue" bordered>Primitives 158</Tag><Tag color="blue" bordered>Semantic 174</Tag>
        <Tag color="blue" bordered>Component Token 74</Tag><Tag color="blue" bordered>Dimension 91</Tag>
        <Tag color="purple" bordered>33 text style</Tag><Tag color="purple" bordered>13 effect</Tag>
      </div>

      <Section title="1 · Cài và bọc app">
        <Card>
          <Code>{`npm i @pancake/ui @pancake/tokens antd react react-dom

// main.tsx
import '@pancake/ui/styles.css';
import { PancakeProvider } from '@pancake/ui';

<PancakeProvider locale="vi">
  <App />
</PancakeProvider>`}</Code>
        </Card>
      </Section>

      <Section title="2 · Dựng màn bằng component Pancake" note="Chỉ import từ @pancake/ui. Không import thẳng từ antd trong code màn hình.">
        <Card>
          <Code>{`import { Button, Tag, Text, Icon, Input, Table } from '@pancake/ui';
import { Plus, MagnifyingGlass } from '@phosphor-icons/react';

<Text variant="h4-medium">Thẻ hội thoại</Text>
<Input prefix={<Icon as={MagnifyingGlass} tone="subtle" />} placeholder="Tìm thẻ" />
<Button variant="primary" icon={<Plus />}>Thêm thẻ</Button>
<Button variant="secondary-gray">Huỷ</Button>
<Tag color="gold" bordered>Còn 3 ngày</Tag>`}</Code>
        </Card>
      </Section>

      <Section title="3 · Màu, khoảng cách, chữ: luôn qua token" note="Ba cách tương đương — chọn theo stack của dự án.">
        <Card>
          <Code>{`/* CSS */
.panel { background: var(--pk-surface-default); padding: var(--pk-space-300);
         border-radius: var(--pk-radius-xl); box-shadow: var(--pk-elevation-raised); }

// JS / inline style
import { cssVar } from '@pancake/tokens';
<div style={{ color: cssVar.text.subtle, gap: cssVar.space['150'] }} />

// Tailwind v4: @import '@pancake/tokens/dist/tailwind/theme.css'
<div className="bg-surface-default p-300 rounded-xl text-text-subtle" />`}</Code>
        </Card>
      </Section>

      <Section title="4 · Khi Designer đổi token trên Figma">
        <Card>
          <Code>{`cd packages/tokens
FIGMA_TOKEN=xxx node scripts/pull-figma.mjs   # kéo Variables mới (Figma Enterprise)
npm run build                                  # sinh lại CSS / JS / Tailwind
# Không có Enterprise: chạy scripts/figma-plugin-export.js trong Figma rồi dán vào figma-export/*.txt`}</Code>
        </Card>
      </Section>

      <Section title="Quy tắc">
        <Card>
          {[
            'Mỗi màn chỉ 1 nút primary. Huỷ / Quay lại dùng secondary-gray.',
            'Không gõ mã hex, px tự đặt, font-size tự đặt. Thiếu token → báo Designer thêm vào Figma trước.',
            'Icon: Phosphor (Regular), cỡ 20 trong UI thường. Icon trong nút dùng cùng màu chữ.',
            'Đủ trạng thái: mặc định, hover, pressed, focus, disabled, lỗi, trống, đang tải.',
            'Cỡ 13 / 11 / 10 (Dense) chỉ dùng trong vùng mật độ cao: dòng hội thoại, khung chat, tag mini.',
            'Component chưa có trong DS (Avatar, Drawer, Pagination, Card…) → dựng bằng token, ghi chú để Designer bổ sung.',
          ].map((r) => (
            <Text key={r} as="p" style={{ padding: 'var(--pk-space-075) 0' }}>• {r}</Text>
          ))}
        </Card>
      </Section>
    </div>
  ),
};
