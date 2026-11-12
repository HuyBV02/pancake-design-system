import type { AlertProps as AntAlertProps } from 'antd';
export type AlertType = 'info' | 'success' | 'warning' | 'error';
export interface AlertProps extends Omit<AntAlertProps, 'type' | 'banner'> {
    type?: AlertType;
    /** Alert gọn cao 32 (mặc định trong drawer/form). false → Alert đầy đủ có tiêu đề + mô tả. */
    compact?: boolean;
}
/**
 * Thông báo nằm trong luồng trang. Icon Phosphor 20, nền `bg/<trạng thái>-subtlest`.
 * @example <Alert type="info" title="Tin nhắn sẽ được gửi sau 5 phút" />
 * @example <Alert compact={false} type="warning" title="Gói sắp hết hạn" description="Gia hạn trước 20/11 để không gián đoạn." />
 */
export declare function Alert({ type, compact, showIcon, className, ...rest }: AlertProps): import("react").JSX.Element;
