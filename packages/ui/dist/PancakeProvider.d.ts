import type { ReactNode } from 'react';
export interface PancakeProviderProps {
    children: ReactNode;
    /** Ngôn ngữ cho chữ mặc định của antd (lịch, phân trang, Empty…). Mặc định 'vi'. */
    locale?: 'vi' | 'en';
}
/**
 * Bọc toàn bộ app (hoặc Storybook). Gắn theme Pancake cho mọi component antd và bật App context
 * để dùng `App.useApp()` → message / notification / modal đúng theme.
 *
 * Style antd được đặt trong `@layer antd` → CSS của @pancake/ui (không layer) luôn thắng, không cần !important.
 * Nhớ import '@pancake/ui/styles.css' một lần ở entry của app.
 */
export declare function PancakeProvider({ children, locale }: PancakeProviderProps): import("react").JSX.Element;
