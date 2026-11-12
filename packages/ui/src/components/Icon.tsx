import type { ComponentType } from 'react';
import type { IconProps as PhosphorProps } from '@phosphor-icons/react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconTone = 'default' | 'subtle' | 'subtlest' | 'disabled' | 'inverse' | 'brand' | 'info' | 'success' | 'warning' | 'danger' | 'inherit';

export interface IconProps extends Omit<PhosphorProps, 'size' | 'color'> {
  /** Icon Phosphor, vd. `import { ChatCircle } from '@phosphor-icons/react'` */
  as: ComponentType<PhosphorProps>;
  /** xs 12 · sm 16 · md 18 · lg 20 (mặc định trong UI) · xl 24 */
  size?: IconSize;
  /** Token `icon/*`. `inherit` = cùng màu chữ (icon trong nút/link — QĐ #20). */
  tone?: IconTone;
}

/**
 * Icon Phosphor (Stroke · Regular) theo token kích thước và màu.
 * @example <Icon as={MagnifyingGlass} tone="subtle" />
 */
export function Icon({ as: Comp, size = 'lg', tone = 'inherit', weight = 'regular', ...rest }: IconProps) {
  return (
    <Comp
      {...rest}
      weight={weight}
      size="1em"
      style={{ fontSize: `var(--pk-size-icon-${size})`, flexShrink: 0, verticalAlign: 'middle', ...rest.style }}
      color={tone === 'inherit' ? 'currentColor' : `var(--pk-icon-${tone})`}
      aria-hidden={rest['aria-label'] ? undefined : true}
    />
  );
}
