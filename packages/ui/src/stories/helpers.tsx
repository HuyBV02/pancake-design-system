import type { CSSProperties, ReactNode } from 'react';
import { Text } from '../components/Text';

/** Khung trình bày trong Storybook — chỉ dùng token. */
export function Section({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 'var(--pk-space-500)' }}>
      <Text variant="h4-medium" as="h2">{title}</Text>
      {note && (
        <Text variant="body-14-regular" tone="subtlest" as="p" style={{ marginTop: 'var(--pk-space-050)' }}>
          {note}
        </Text>
      )}
      <div style={{ marginTop: 'var(--pk-space-200)' }}>{children}</div>
    </section>
  );
}

export function Row({ children, gap = 'var(--pk-space-150)', align = 'center', style }: { children: ReactNode; gap?: string; align?: CSSProperties['alignItems']; style?: CSSProperties }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap, alignItems: align, ...style }}>{children}</div>;
}

export function Label({ children, width = 160 }: { children: ReactNode; width?: number }) {
  return (
    <Text variant="footnote-12-medium" tone="subtlest" style={{ width, flexShrink: 0 }}>
      {children}
    </Text>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: 'var(--pk-surface-default)',
        border: 'var(--pk-border-width-default) solid var(--pk-border-subtlest)',
        borderRadius: 'var(--pk-radius-xl)',
        padding: 'var(--pk-space-300)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
