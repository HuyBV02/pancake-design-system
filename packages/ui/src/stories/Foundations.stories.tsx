import type { Meta, StoryObj } from '@storybook/react-vite';
import { byFigmaName } from '@pancake/tokens';
import { Text } from '../components/Text';
import type { TextVariant } from '../components/Text';
import { Section, Row, Card } from './helpers';

const meta: Meta = { title: 'Foundations', parameters: { layout: 'padded' } };
export default meta;

const all = Object.entries(byFigmaName as Record<string, string>);
const cssName = (n: string) => `--pk-${n.replace(/\//g, '-')}`;

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ width: 196, display: 'flex', gap: 'var(--pk-space-100)', alignItems: 'center' }}>
      <div
        style={{
          width: 40, height: 40, flexShrink: 0, borderRadius: 'var(--pk-radius-md)', background: `var(${cssName(name)})`,
          border: 'var(--pk-border-width-default) solid var(--pk-border-subtlest)',
        }}
      />
      <div style={{ minWidth: 0 }}>
        <Text variant="footnote-12-medium" as="div" style={{ wordBreak: 'break-all' }}>{name}</Text>
        <Text variant="footnote-12-system-monospace" tone="subtlest" as="div">{value}</Text>
      </div>
    </div>
  );
}

const GROUPS: Array<[string, string, string]> = [
  ['Chữ — text/*', 'text/', 'Màu chữ theo vai trò. Không dùng primitive trực tiếp.'],
  ['Icon — icon/*', 'icon/', 'Icon trong nút/link dùng cùng token với chữ (QĐ #20).'],
  ['Bề mặt — surface/*', 'surface/', 'Nền trang, card, lớp nổi.'],
  ['Nền tương tác — bg/*', 'bg/', '<vai trò>-<bold|subtle|subtlest>/<rest|hover|pressed|disabled>'],
  ['Viền — border/*', 'border/', ''],
  ['Tag & biểu đồ — accent/*, chart/*', 'accent/', '11 màu tag × 5 nấc'],
];

export const MauSemantic: StoryObj = {
  name: 'Màu · Semantic',
  render: () => (
    <div>
      {GROUPS.map(([title, prefix, note]) => (
        <Section key={prefix} title={title} note={note}>
          <Row gap="var(--pk-space-200)">
            {all
              .filter(([n]) => n.startsWith(prefix) || (prefix === 'accent/' && n.startsWith('chart/')) || (prefix === 'surface/' && n.startsWith('overlay/')))
              .map(([n, v]) => <Swatch key={n} name={n} value={v} />)}
          </Row>
        </Section>
      ))}
    </div>
  ),
};

const PRIM = ['gray', 'blue', 'crimson', 'slate', 'beige', 'teal', 'red', 'volcano', 'orange', 'gold', 'yellow', 'lime', 'green', 'cyan', 'sky', 'geekblue', 'purple', 'magenta'];
export const MauPrimitive: StoryObj = {
  name: 'Màu · Primitives',
  render: () => (
    <Section title="Primitives" note="Màu gốc — chỉ để Semantic tham chiếu. Code màn hình không dùng trực tiếp (trừ tag/chart).">
      {PRIM.map((p) => (
        <Row key={p} gap="var(--pk-space-050)" style={{ marginBottom: 'var(--pk-space-150)' }}>
          <Text variant="footnote-12-medium" tone="subtle" style={{ width: 72 }}>{p}</Text>
          {all.filter(([n]) => n.startsWith(p + '/')).map(([n, v]) => (
            <div key={n} title={`${n} ${v}`} style={{ width: 64 }}>
              <div style={{ height: 36, borderRadius: 'var(--pk-radius-sm)', background: v, border: 'var(--pk-border-width-default) solid var(--pk-border-subtlest)' }} />
              <Text variant="dense-10-regular" tone="subtlest" as="div">{n.split('/')[1]} · {v}</Text>
            </div>
          ))}
        </Row>
      ))}
    </Section>
  ),
};

const TYPE: Array<[TextVariant, string]> = [
  ['h0-light', 'Số liệu hero'], ['h0-bold', ''], ['h1-regular', 'Tiêu đề trang marketing'], ['h1-medium', ''], ['h1-bold', ''],
  ['h2-regular', 'Tiêu đề lớn, KPI'], ['h2-medium', ''], ['h2-bold', ''], ['h3-regular', 'Giá gói, tiêu đề màn lớn'], ['h3-medium', ''], ['h3-bold', ''],
  ['h4-regular', 'Tiêu đề trang cài đặt'], ['h4-medium', ''], ['h4-bold', ''], ['title-16-regular', 'Tiêu đề modal, card; nhãn nút L'], ['title-16-medium', ''], ['title-16-bold', ''],
  ['body-14-regular', 'Mặc định cho mọi nội dung'], ['body-14-medium', 'Nhãn nút S/M'], ['body-14-bold', ''], ['body-14-regular-underline', ''], ['body-14-regular-strikethrough', 'Giá gạch'], ['body-14-code', 'Code, API key'],
  ['footnote-12-regular', 'Mô tả phụ, meta'], ['footnote-12-medium', ''], ['footnote-12-bold', ''], ['footnote-12-system-monospace', 'Mã ngắn, số đơn'],
  ['dense-13-regular', 'Ngoại lệ QĐ #26 — dòng hội thoại'], ['dense-13-medium', ''], ['dense-11-regular', 'Giờ trong bong bóng'], ['dense-11-medium', ''], ['dense-10-regular', 'Tag mini, badge số'], ['dense-10-medium', ''],
];
export const Typography: StoryObj = {
  render: () => (
    <Section title="Typography · Roboto" note="33 text style trong DS_AI. Dùng <Text variant=…> thay vì tự đặt font-size.">
      {TYPE.map(([v, use]) => (
        <Row key={v} align="baseline" style={{ padding: 'var(--pk-space-100) 0', borderBottom: 'var(--pk-border-width-default) solid var(--pk-border-subtlest)' }}>
          <Text variant="footnote-12-system-monospace" tone="subtlest" style={{ width: 260 }}>{v}</Text>
          <Text variant={v} style={{ flex: 1 }}>Quản lý hội thoại đa kênh</Text>
          <Text variant="footnote-12-regular" tone="subtlest" style={{ width: 240 }}>{use}</Text>
        </Row>
      ))}
    </Section>
  ),
};

export const KichThuoc: StoryObj = {
  name: 'Khoảng cách · Bo góc · Bóng',
  render: () => (
    <div>
      <Section title="Khoảng cách — space/*" note="Chỉ dùng giá trị trong thang. space/100 = 8px.">
        {all.filter(([n]) => n.startsWith('space/')).map(([n, v]) => (
          <Row key={n} style={{ marginBottom: 'var(--pk-space-050)' }}>
            <Text variant="footnote-12-system-monospace" tone="subtle" style={{ width: 120 }}>{n}</Text>
            <div style={{ width: v, height: 16, background: 'var(--pk-bg-brand-subtle-pressed)', borderRadius: 'var(--pk-radius-xxs)' }} />
            <Text variant="footnote-12-regular" tone="subtlest">{v}</Text>
          </Row>
        ))}
      </Section>
      <Section title="Bo góc — radius/*" note="24 → 6 · 32/40 → 8 · panel/card → 12 · modal/card gói → 16 · pill 999">
        <Row gap="var(--pk-space-300)">
          {all.filter(([n]) => n.startsWith('radius/')).map(([n, v]) => (
            <div key={n} style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: v, background: 'var(--pk-bg-brand-subtlest)', border: 'var(--pk-border-width-indicator) solid var(--pk-border-focus)' }} />
              <Text variant="footnote-12-medium" as="div">{n}</Text>
              <Text variant="footnote-12-regular" tone="subtlest" as="div">{v}</Text>
            </div>
          ))}
        </Row>
      </Section>
      <Section title="Elevation & Focus">
        <Row gap="var(--pk-space-400)" style={{ background: 'var(--pk-surface-canvas)', padding: 'var(--pk-space-400)', borderRadius: 'var(--pk-radius-xl)' }}>
          {['elevation/raised', 'elevation/overlay', 'elevation/selected', 'elevation/button-primary', 'focus/brand', 'focus/danger', 'focus/neutral', 'focus/control'].map((n) => (
            <Card key={n} style={{ width: 168, boxShadow: `var(${cssName(n)})`, border: 'none', padding: 'var(--pk-space-200)' }}>
              <Text variant="footnote-12-medium">{n}</Text>
            </Card>
          ))}
        </Row>
      </Section>
    </div>
  ),
};
