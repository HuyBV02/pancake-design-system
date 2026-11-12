import type { ButtonProps as AntButtonProps } from 'antd';
/** 7 kiểu nút trong DS_AI (trang Button). */
export type ButtonVariant = 'primary' | 'secondary-blue' | 'secondary-gray' | 'tertiary-blue' | 'tertiary-gray' | 'text' | 'link';
/** S 24 · M 32 (mặc định) · L 40 */
export type ButtonSize = 's' | 'm' | 'l';
export interface ButtonProps extends Omit<AntButtonProps, 'type' | 'color' | 'variant' | 'size' | 'danger' | 'ghost'> {
    /** Kiểu nút. Mỗi màn chỉ 1 nút `primary`; huỷ/quay lại dùng `secondary-gray`. */
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Bản phủ định (xoá, huỷ gói…). Có cho mọi kiểu. */
    negative?: boolean;
    /** Viền nét đứt — chỉ có ở Tertiary Blue (thêm mới). */
    dashed?: boolean;
}
/**
 * Nút Pancake. Màu từng trạng thái (rest/hover/pressed/disabled + vòng focus) lấy đúng token Semantic,
 * xem `styles/button.css`.
 *
 * @example <Button variant="primary">Lưu</Button>
 * @example <Button variant="secondary-gray">Huỷ</Button>
 * @example <Button variant="tertiary-blue" negative icon={<Trash />}>Xoá thẻ</Button>
 */
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
