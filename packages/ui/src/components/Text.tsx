import type { CSSProperties, ElementType, ReactNode } from 'react';

/** Text style trong DS_AI (Figma) → tên biến thể. */
export type TextVariant =
  | 'h0-light' | 'h0-bold'
  | 'h1-regular' | 'h1-medium' | 'h1-bold'
  | 'h2-regular' | 'h2-medium' | 'h2-bold'
  | 'h3-regular' | 'h3-medium' | 'h3-bold'
  | 'h4-regular' | 'h4-medium' | 'h4-bold'
  | 'title-16-regular' | 'title-16-medium' | 'title-16-bold'
  | 'body-14-regular' | 'body-14-medium' | 'body-14-bold'
  | 'body-14-regular-underline' | 'body-14-regular-strikethrough' | 'body-14-code'
  | 'footnote-12-regular' | 'footnote-12-medium' | 'footnote-12-bold' | 'footnote-12-system-monospace'
  /** Ngoại lệ QĐ #26 — chỉ dùng trong vùng mật độ cao (dòng hội thoại, khung chat, tag mini). */
  | 'dense-13-regular' | 'dense-13-medium' | 'dense-11-regular' | 'dense-11-medium' | 'dense-10-regular' | 'dense-10-medium';

/** Vai trò màu chữ — token `text/*`. */
export type TextTone =
  | 'default' | 'strong' | 'control' | 'subtle' | 'subtlest' | 'placeholder' | 'disabled' | 'inverse'
  | 'brand' | 'selected' | 'danger' | 'success' | 'warning' | 'info';

export interface TextProps {
  variant?: TextVariant;
  tone?: TextTone;
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

const DEFAULT_TAG: Partial<Record<string, ElementType>> = { h0: 'h1', h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4' };

/**
 * Chữ theo đúng text style của DS. Không tự đặt font-size / màu.
 * @example <Text variant="h4-medium">Thẻ hội thoại</Text>
 * @example <Text variant="footnote-12-regular" tone="subtlest">Cập nhật 2 phút trước</Text>
 */
export function Text({ variant = 'body-14-regular', tone = 'default', as, children, className, style, title }: TextProps) {
  const Tag = as ?? DEFAULT_TAG[variant.split('-')[0]] ?? 'span';
  const color = tone === 'brand' ? 'var(--pk-text-brand-rest)' : `var(--pk-text-${tone})`;
  const deco = variant.endsWith('underline') ? 'underline' : variant.endsWith('strikethrough') ? 'line-through' : undefined;
  return (
    <Tag
      className={className}
      title={title}
      style={{ font: `var(--pk-typography-${variant})`, color, textDecoration: deco, margin: 0, ...style }}
    >
      {children}
    </Tag>
  );
}
