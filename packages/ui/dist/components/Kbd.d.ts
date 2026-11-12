import type { ReactNode } from 'react';
export interface KbdProps {
    /** sm 18 (dropdown, menu, dòng danh sách) · md 22 (trang cài đặt phím tắt) */
    size?: 'sm' | 'md';
    children: ReactNode;
    className?: string;
}
/** Một phím (keycap): nền trắng, viền mảnh, chữ text/subtlest. Component `Kbd/Key` trong DS_AI. */
export declare function Kbd({ size, children, className }: KbdProps): import("react").JSX.Element;
export interface ShortcutProps {
    /** Tối đa 3 phím, vd. ['⌘', '⇧', 'K']. macOS dùng ký hiệu; Windows ghi Ctrl / Alt / Shift. */
    keys: ReactNode[];
    size?: 'sm' | 'md';
    className?: string;
}
/** Tổ hợp phím tắt, các phím cách nhau space/025 (2px). Component `Kbd/Shortcut` trong DS_AI. */
export declare function Shortcut({ keys, size, className }: ShortcutProps): import("react").JSX.Element;
