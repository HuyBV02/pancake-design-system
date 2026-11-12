import type { ReactNode } from 'react';
import { cx } from '../utils';

export interface KbdProps {
  /** sm 18 (dropdown, menu, dòng danh sách) · md 22 (trang cài đặt phím tắt) */
  size?: 'sm' | 'md';
  children: ReactNode;
  className?: string;
}

/** Một phím (keycap): nền trắng, viền mảnh, chữ text/subtlest. Component `Kbd/Key` trong DS_AI. */
export function Kbd({ size = 'sm', children, className }: KbdProps) {
  return <kbd className={cx('pk-kbd', `pk-kbd--${size}`, className)}>{children}</kbd>;
}

export interface ShortcutProps {
  /** Tối đa 3 phím, vd. ['⌘', '⇧', 'K']. macOS dùng ký hiệu; Windows ghi Ctrl / Alt / Shift. */
  keys: ReactNode[];
  size?: 'sm' | 'md';
  className?: string;
}

/** Tổ hợp phím tắt, các phím cách nhau space/025 (2px). Component `Kbd/Shortcut` trong DS_AI. */
export function Shortcut({ keys, size = 'sm', className }: ShortcutProps) {
  return (
    <span className={cx('pk-shortcut', className)}>
      {keys.slice(0, 3).map((k, i) => (
        <Kbd key={i} size={size}>
          {k}
        </Kbd>
      ))}
    </span>
  );
}
