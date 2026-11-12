/**
 * Playground — nơi "lên design" ngay trong code (chỉ bật khi dev: import.meta.env.DEV).
 * Mỗi màn = 1 file trong src/playground/, đăng ký vào PAGES. Mỗi trạng thái = 1 mục trong `states`.
 * Mở: http://localhost:5173/playground/<slug>?state=<tên trạng thái>
 */
import { useEffect, useState, type ComponentType } from 'react';
import { Segmented, Text } from '@pancake/ui';
import { LocHoiThoaiPlayground } from './3416-loc-hoi-thoai';
import { TheHoiThoaiPlayground } from './the-hoi-thoai';
import { StickerPopoverPlayground } from './figma-exact/3066-sticker-popover';

export interface PlaygroundPage {
  slug: string;
  issue?: string;
  title: string;
  states: Record<string, ComponentType>;
}

export const PAGES: PlaygroundPage[] = [LocHoiThoaiPlayground, TheHoiThoaiPlayground, StickerPopoverPlayground];

export function Playground() {
  const slug = location.pathname.replace(/^\/playground\/?/, '');
  const page = PAGES.find((p) => p.slug === slug);
  const params = new URLSearchParams(location.search);
  const names = page ? Object.keys(page.states) : [];
  const [state, setState] = useState(params.get('state') ?? names[0]);
  useEffect(() => {
    if (!page) return;
    const url = new URL(location.href);
    url.searchParams.set('state', state);
    history.replaceState(null, '', url);
  }, [state, page]);

  if (!page)
    return (
      <div style={{ padding: 'var(--pk-space-500)', display: 'grid', gap: 'var(--pk-space-150)' }}>
        <Text variant="h4-medium">Playground</Text>
        {PAGES.map((p) => (
          <a key={p.slug} href={`/playground/${p.slug}`} style={{ color: 'var(--pk-text-brand-rest)' }}>
            {p.issue ? `#${p.issue} ` : ''}{p.title}
          </a>
        ))}
      </div>
    );

  const Screen = page.states[state] ?? page.states[names[0]];
  return (
    <div>
      <div
        data-playground-bar
        style={{
          position: 'fixed', zIndex: 1000, right: 'var(--pk-space-200)', bottom: 'var(--pk-space-200)', display: 'flex', alignItems: 'center',
          gap: 'var(--pk-space-150)', padding: 'var(--pk-space-100) var(--pk-space-150)', background: 'var(--pk-surface-overlay)',
          borderRadius: 'var(--pk-radius-xl)', boxShadow: 'var(--pk-elevation-overlay)',
        }}
      >
        <Text variant="footnote-12-medium" tone="subtlest">{page.issue ? `#${page.issue} · ` : ''}Trạng thái</Text>
        <Segmented size="s" value={state} onChange={(v) => setState(String(v))} options={names} />
      </div>
      <Screen />
    </div>
  );
}
