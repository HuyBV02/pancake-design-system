/**
 * Component tạm cho phần DS_AI CHƯA CÓ — nơi duy nhất được import antd trực tiếp.
 * Mỗi component chỉ dùng token Pancake. Khi Designer bổ sung vào Figma + @pancake/ui → xoá file này, đổi import.
 */
import type { CSSProperties, ReactNode } from 'react';
import { Avatar as AntAvatar, Drawer as AntDrawer } from 'antd';
import type { AvatarProps as AntAvatarProps, DrawerProps as AntDrawerProps } from 'antd';
import { Text } from '@pancake/ui';

// TODO(DS): chờ component Avatar trong DS_AI
export function Avatar({ size = 40, ...rest }: Omit<AntAvatarProps, 'size' | 'shape'> & { size?: 24 | 32 | 40 | 48 }) {
  return (
    <AntAvatar
      {...rest}
      size={size}
      style={{ background: 'var(--pk-bg-neutral-rest)', color: 'var(--pk-text-control)', flexShrink: 0, ...rest.style }}
    />
  );
}

// TODO(DS): chờ component Card trong DS_AI
export function Card({ title, extra, children, style }: { title?: ReactNode; extra?: ReactNode; children: ReactNode; style?: CSSProperties }) {
  return (
    <section
      style={{
        background: 'var(--pk-surface-default)',
        border: 'var(--pk-border-width-default) solid var(--pk-border-subtlest)',
        borderRadius: 'var(--pk-radius-xl)',
        padding: 'var(--pk-space-300)',
        display: 'grid',
        gap: 'var(--pk-space-200)',
        ...style,
      }}
    >
      {(title || extra) && (
        <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--pk-space-200)' }}>
          {typeof title === 'string' ? <Text variant="title-16-medium" as="h3">{title}</Text> : title}
          {extra}
        </header>
      )}
      {children}
    </section>
  );
}

// TODO(DS): chờ component Drawer trong DS_AI — rộng 760, header Title 16 Medium
export function Drawer({ width = 760, ...rest }: AntDrawerProps) {
  return <AntDrawer {...rest} size={width} />;
}
