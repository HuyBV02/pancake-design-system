import type { ReactElement } from 'react';
import { Alert as AntAlert } from 'antd';
import type { AlertProps as AntAlertProps } from 'antd';
import { CheckCircle, Info, Warning, XCircle } from '@phosphor-icons/react';
import { cx } from '../utils';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<AntAlertProps, 'type' | 'banner'> {
  type?: AlertType;
  /** Alert gọn cao 32 (mặc định trong drawer/form). false → Alert đầy đủ có tiêu đề + mô tả. */
  compact?: boolean;
}

const ICON: Record<AlertType, ReactElement> = {
  info: <Info weight="fill" />,
  success: <CheckCircle weight="fill" />,
  warning: <Warning weight="fill" />,
  error: <XCircle weight="fill" />,
};

/**
 * Thông báo nằm trong luồng trang. Icon Phosphor 20, nền `bg/<trạng thái>-subtlest`.
 * @example <Alert type="info" title="Tin nhắn sẽ được gửi sau 5 phút" />
 * @example <Alert compact={false} type="warning" title="Gói sắp hết hạn" description="Gia hạn trước 20/11 để không gián đoạn." />
 */
export function Alert({ type = 'info', compact = true, showIcon = true, className, ...rest }: AlertProps) {
  return (
    <AntAlert
      {...rest}
      type={type}
      showIcon={showIcon}
      icon={rest.icon ?? ICON[type]}
      className={cx('pk-alert', compact ? 'pk-alert--compact' : 'pk-alert--full', className)}
    />
  );
}
