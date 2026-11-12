import type { ReactNode } from 'react';
import type { TagProps as AntTagProps } from 'antd';
/** 11 màu accent của DS + `neutral` (xám, cho chip trung tính) + `new` (nhãn "Mới"). */
export type TagColor = 'neutral' | 'blue' | 'cyan' | 'geekblue' | 'purple' | 'magenta' | 'red' | 'volcano' | 'orange' | 'gold' | 'lime' | 'green' | 'new';
export interface TagProps extends Omit<AntTagProps, 'color' | 'variant' | 'bordered'> {
    color?: TagColor;
    /** Có viền: chữ dùng accent/<màu>/text-strong + viền accent/<màu>/border. */
    bordered?: boolean;
    /** Nền đậm chữ trắng (cao 22, chữ 12). */
    solid?: boolean;
    /** Chấm tròn đầu tag (trạng thái). */
    dot?: boolean;
    children?: ReactNode;
}
/**
 * Tag gắn nhãn: thẻ hội thoại, trạng thái, thời hạn gói. Cao 24, bo tròn, chữ Body 14.
 * @example <Tag color="green" dot>Đang hoạt động</Tag>
 * @example <Tag color="gold" bordered>Còn 3 ngày</Tag>
 */
export declare function Tag({ color, bordered, solid, dot, className, children, ...rest }: TagProps): import("react").JSX.Element;
