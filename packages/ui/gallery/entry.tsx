/**
 * Sinh trang gallery tĩnh (không JS) từ chính các story — để xem online / gửi team.
 * Chạy: npm run gallery (ở packages/ui)
 */
import { renderToString } from 'react-dom/server';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type { ReactElement } from 'react';
import { PancakeProvider } from '../src/PancakeProvider';

type Mod = { default: { title: string; id?: string; component?: unknown; args?: Record<string, unknown>; parameters?: { layout?: string } }; [k: string]: unknown };
const mods = import.meta.glob<Mod>('../src/stories/*.stories.tsx', { eager: true });
const raws = import.meta.glob<string>('../src/stories/*.stories.tsx', { eager: true, query: '?raw', import: 'default' });

const ORDER = ['Giới thiệu', 'Foundations', 'Components/Button', 'Components/Nhập liệu & Điều hướng', 'Components/Hiển thị', 'Components/Phản hồi & Lớp nổi', 'Patterns/Cài đặt · Thẻ hội thoại'];

export function render() {
  const cache = createCache();
  const sections: Array<{ id: string; group: string; name: string; html: string; full: boolean }> = [];
  const metas = Object.entries(mods).sort(([, a], [, b]) => ORDER.indexOf(a.default.title) - ORDER.indexOf(b.default.title));
  for (const [path, mod] of metas) {
    const meta = mod.default;
    const order = [...raws[path].matchAll(/export const (\w+)/g)].map((m) => m[1]);
    for (const key of order) {
      const story = mod[key];
      if (key === 'default' || !story || typeof story !== 'object') continue;
      const s = story as { name?: string; render?: (args: unknown) => ReactElement; args?: Record<string, unknown> };
      const args = { ...meta.args, ...s.args };
      const C = meta.component as ((p: Record<string, unknown>) => ReactElement) | undefined;
      if (!s.render && !C) continue;
      const Comp = C as (p: Record<string, unknown>) => ReactElement;
      const Wrapped = () => (s.render ? s.render(args) : <Comp {...args} />);
      const html = renderToString(
        <StyleProvider cache={cache}>
          <PancakeProvider>
            <Wrapped />
          </PancakeProvider>
        </StyleProvider>,
      );
      const id = (meta.id ?? meta.title).toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + key.toLowerCase();
      sections.push({ id, group: meta.title, name: s.name ?? key, html, full: meta.parameters?.layout === 'fullscreen' });
    }
  }
  return { sections, css: extractStyle(cache) };
}
