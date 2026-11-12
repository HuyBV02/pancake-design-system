import { Empty as AntEmpty, Modal as AntModal, Segmented as AntSegmented, Switch as AntSwitch } from 'antd';
import type { EmptyProps as AntEmptyProps, ModalProps as AntModalProps, SegmentedProps as AntSegmentedProps, SwitchProps as AntSwitchProps } from 'antd';
import { tokens } from '@pancake/tokens';
import { cx } from '../utils';

/* ---------- Switch: 40×22, không có cỡ small, không icon (QĐ #10) ---------- */
export type SwitchProps = Omit<AntSwitchProps, 'size' | 'checkedChildren' | 'unCheckedChildren'>;
export function Switch({ className, ...rest }: SwitchProps) {
  return <AntSwitch {...rest} className={cx('pk-switch', className)} />;
}

/* ---------- Segmented: S 26 · M 34 · L 40 ---------- */
export type SegmentedProps<V = string> = Omit<AntSegmentedProps<V>, 'size'> & { size?: 's' | 'm' | 'l' };
export function Segmented<V = string>({ size = 'm', className, ...rest }: SegmentedProps<V>) {
  return (
    <AntSegmented<V>
      {...(rest as AntSegmentedProps<V>)}
      size={size === 's' ? 'small' : size === 'l' ? 'large' : 'middle'}
      className={cx('pk-segmented', `pk-segmented--${size}`, className)}
    />
  );
}

/* ---------- Modal: 2 bề rộng chuẩn ---------- */
export const MODAL_WIDTH = {
  /** Modal xác nhận (Static / Delete confirmation) */
  confirm: parseFloat(tokens.size.modal.confirm),
  /** Modal nội dung */
  md: parseFloat(tokens.size.modal.md),
} as const;

export interface ModalProps extends Omit<AntModalProps, 'width'> {
  /** confirm 500 · md 883 · hoặc số px */
  width?: keyof typeof MODAL_WIDTH | number;
}
/**
 * Modal nội dung. Nút footer: 1 Primary + Secondary Gray "Huỷ".
 * Hộp xác nhận nhanh: `const { modal } = App.useApp(); modal.confirm({...})`.
 */
export function Modal({ width = 'md', className, ...rest }: ModalProps) {
  return (
    <AntModal
      centered
      {...rest}
      width={typeof width === 'number' ? width : MODAL_WIDTH[width]}
      className={cx('pk-modal', className)}
    />
  );
}

/* ---------- Empty: chữ mặc định tiếng Việt ---------- */
export function Empty({ description = 'Chưa có dữ liệu', image = AntEmpty.PRESENTED_IMAGE_SIMPLE, ...rest }: AntEmptyProps) {
  return <AntEmpty {...rest} description={description} image={image} />;
}
