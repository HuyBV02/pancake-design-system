import type { EmptyProps as AntEmptyProps, ModalProps as AntModalProps, SegmentedProps as AntSegmentedProps, SwitchProps as AntSwitchProps } from 'antd';
export type SwitchProps = Omit<AntSwitchProps, 'size' | 'checkedChildren' | 'unCheckedChildren'>;
export declare function Switch({ className, ...rest }: SwitchProps): import("react").JSX.Element;
export type SegmentedProps<V = string> = Omit<AntSegmentedProps<V>, 'size'> & {
    size?: 's' | 'm' | 'l';
};
export declare function Segmented<V = string>({ size, className, ...rest }: SegmentedProps<V>): import("react").JSX.Element;
export declare const MODAL_WIDTH: {
    /** Modal xác nhận (Static / Delete confirmation) */
    readonly confirm: number;
    /** Modal nội dung */
    readonly md: number;
};
export interface ModalProps extends Omit<AntModalProps, 'width'> {
    /** confirm 500 · md 883 · hoặc số px */
    width?: keyof typeof MODAL_WIDTH | number;
}
/**
 * Modal nội dung. Nút footer: 1 Primary + Secondary Gray "Huỷ".
 * Hộp xác nhận nhanh: `const { modal } = App.useApp(); modal.confirm({...})`.
 */
export declare function Modal({ width, className, ...rest }: ModalProps): import("react").JSX.Element;
export declare function Empty({ description, image, ...rest }: AntEmptyProps): import("react").JSX.Element;
