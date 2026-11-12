import { Badge as AntBadge } from 'antd';
import type { BadgeProps as AntBadgeProps } from 'antd';
import { tokens } from '@pancake/tokens';

export type BadgeTone = 'danger' | 'info' | 'success' | 'warning' | 'neutral';

export interface BadgeProps extends Omit<AntBadgeProps, 'color' | 'size'> {
  /** danger = chưa đọc (mặc định) · info · success · warning · neutral */
  tone?: BadgeTone;
  /** sm 16 · md 20 */
  size?: 'sm' | 'md';
}

const TONE: Record<BadgeTone, string> = {
  danger: tokens.bg.indicator.danger,
  info: tokens.bg.indicator.info,
  success: tokens.bg.indicator.success,
  warning: tokens.bg.indicator.warning,
  neutral: tokens.bg.indicator.neutral,
};

/**
 * Badge đếm (số chưa đọc) hoặc chấm trạng thái 6×6.
 * @example <Badge count={12}><Avatar /></Badge>
 * @example <Badge tone="success" text="Đã kết nối" />   // chấm trạng thái
 */
export function Badge({ tone = 'danger', size = 'md', ...rest }: BadgeProps) {
  return <AntBadge {...rest} color={TONE[tone]} size={size === 'sm' ? 'small' : 'medium'} />;
}
