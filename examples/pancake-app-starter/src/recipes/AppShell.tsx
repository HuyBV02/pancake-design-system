/**
 * RECIPE · Khung app Pancake Web
 * Khi nào dùng: mọi màn chính có top nav + menu trái + vùng nội dung.
 * Spec: top nav 56 `surface/inverse` · menu trái 280, mục 42 bo 8, đang chọn `bg/item/selected` · nội dung nền `surface/canvas`.
 */
import type { ReactNode } from 'react';
import { ChatCircle, ChartBar, Gear, House, Stack, Bell } from '@phosphor-icons/react';
import { Badge, Button, Icon, Text } from '@pancake/ui';
import { Avatar } from '../components/ds-local';

const MENU = [
  { key: 'home', label: 'Tổng quan', icon: House },
  { key: 'inbox', label: 'Hội thoại', icon: ChatCircle, count: 12 },
  { key: 'merge', label: 'Gộp trang', icon: Stack },
  { key: 'stats', label: 'Thống kê', icon: ChartBar },
  { key: 'settings', label: 'Cài đặt', icon: Gear },
];

export function AppShell({ active = 'settings', children }: { active?: string; children: ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: '56px 1fr', minHeight: '100vh', background: 'var(--pk-surface-canvas)' }}>
      <header
        style={{
          background: 'var(--pk-surface-inverse)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 var(--pk-space-300)',
        }}
      >
        <Text variant="title-16-medium" tone="inverse">Pancake</Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--pk-space-200)' }}>
          <Badge count={3} size="sm">
            <Icon as={Bell} tone="inverse" />
          </Badge>
          <Avatar size={32}>LA</Avatar>
        </div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 0 }}>
        <nav
          style={{
            background: 'var(--pk-surface-default)', borderRight: 'var(--pk-border-width-default) solid var(--pk-border-subtlest)',
            padding: 'var(--pk-space-200) var(--pk-space-150)', display: 'grid', alignContent: 'start', gap: 'var(--pk-space-050)',
          }}
        >
          {MENU.map((m) => (
            <Button
              key={m.key}
              variant="text"
              icon={<m.icon weight={m.key === active ? 'fill' : 'regular'} />}
              style={{
                justifyContent: 'flex-start', height: 42,
                background: m.key === active ? 'var(--pk-bg-item-selected)' : undefined,
                color: m.key === active ? 'var(--pk-text-default)' : undefined,
              }}
            >
              <span style={{ flex: 1, textAlign: 'left' }}>{m.label}</span>
              {m.count ? <Badge count={m.count} size="sm" /> : null}
            </Button>
          ))}
        </nav>
        <main style={{ minWidth: 0, overflow: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}
