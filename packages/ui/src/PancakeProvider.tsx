import type { ReactNode } from 'react';
import { App, ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import viVN from 'antd/locale/vi_VN.js';
import enUS from 'antd/locale/en_US.js';
import { antdTheme } from './theme/antdTheme';

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
export function PancakeProvider({ children, locale = 'vi' }: PancakeProviderProps) {
  return (
    <StyleProvider layer>
      <ConfigProvider theme={antdTheme} locale={locale === 'vi' ? viVN : enUS} wave={{ disabled: true }}>
        <App className="pk-root">{children}</App>
      </ConfigProvider>
    </StyleProvider>
  );
}
