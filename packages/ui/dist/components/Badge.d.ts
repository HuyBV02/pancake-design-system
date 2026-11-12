import type { BadgeProps as AntBadgeProps } from 'antd';
export type BadgeTone = 'danger' | 'info' | 'success' | 'warning' | 'neutral';
export interface BadgeProps extends Omit<AntBadgeProps, 'color' | 'size'> {
    /** danger = chưa đọc (mặc định) · info · success · warning · neutral */
    tone?: BadgeTone;
    /** sm 16 · md 20 */
    size?: 'sm' | 'md';
}
/**
 * Badge đếm (số chưa đọc) hoặc chấm trạng thái 6×6.
 * @example <Badge count={12}><Avatar /></Badge>
 * @example <Badge tone="success" text="Đã kết nối" />   // chấm trạng thái
 */
export declare function Badge({ tone, size, ...rest }: BadgeProps): import("react").JSX.Element;
