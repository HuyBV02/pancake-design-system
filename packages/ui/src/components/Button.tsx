import { forwardRef } from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import { cx } from '../utils';

/** 7 kiểu nút trong DS_AI (trang Button). */
export type ButtonVariant =
  | 'primary'
  | 'secondary-blue'
  | 'secondary-gray'
  | 'tertiary-blue'
  | 'tertiary-gray'
  | 'text'
  | 'link';

/** S 24 · M 32 (mặc định) · L 40 */
export type ButtonSize = 's' | 'm' | 'l';

export interface ButtonProps
  extends Omit<AntButtonProps, 'type' | 'color' | 'variant' | 'size' | 'danger' | 'ghost'> {
  /** Kiểu nút. Mỗi màn chỉ 1 nút `primary`; huỷ/quay lại dùng `secondary-gray`. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Bản phủ định (xoá, huỷ gói…). Có cho mọi kiểu. */
  negative?: boolean;
  /** Viền nét đứt — chỉ có ở Tertiary Blue (thêm mới). */
  dashed?: boolean;
}

const ANT: Record<ButtonVariant, Pick<AntButtonProps, 'color' | 'variant'>> = {
  primary: { color: 'primary', variant: 'solid' },
  'secondary-blue': { color: 'primary', variant: 'filled' },
  'secondary-gray': { color: 'default', variant: 'filled' },
  'tertiary-blue': { color: 'primary', variant: 'outlined' },
  'tertiary-gray': { color: 'default', variant: 'outlined' },
  text: { color: 'default', variant: 'text' },
  link: { color: 'primary', variant: 'text' },
};
const SIZE = { s: 'small', m: 'middle', l: 'large' } as const;

/**
 * Nút Pancake. Màu từng trạng thái (rest/hover/pressed/disabled + vòng focus) lấy đúng token Semantic,
 * xem `styles/button.css`.
 *
 * @example <Button variant="primary">Lưu</Button>
 * @example <Button variant="secondary-gray">Huỷ</Button>
 * @example <Button variant="tertiary-blue" negative icon={<Trash />}>Xoá thẻ</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary-gray', size = 'm', negative = false, dashed = false, className, ...rest },
  ref,
) {
  const ant = ANT[variant];
  return (
    <AntButton
      ref={ref}
      {...rest}
      color={negative ? 'danger' : ant.color}
      variant={dashed && variant === 'tertiary-blue' ? 'dashed' : ant.variant}
      size={SIZE[size]}
      className={cx('pk-btn', `pk-btn--${variant}`, `pk-btn--${size}`, negative && 'pk-btn--negative', dashed && 'pk-btn--dashed', className)}
    />
  );
});
