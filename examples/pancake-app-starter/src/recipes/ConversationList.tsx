/**
 * RECIPE · Danh sách hội thoại (vùng mật độ cao) + bong bóng chat
 * Khi nào dùng: cột trái màn Hội thoại, danh sách tin nhắn, mọi list dày dùng cả ngày.
 * Spec: cột ~400 · dòng 72 · chữ dense-13 (tên Medium, preview Regular subtlest) · giờ dense-11 · chưa đọc = Badge đỏ + tên Medium
 *       · đang chọn bg/item/selected · hover bg/item/hover · tag mini cỡ dense-10.
 */
import type { ComponentType } from 'react';
import type { IconProps } from '@phosphor-icons/react';
import { Badge, Icon, Text } from '@pancake/ui';
import { Avatar } from '../components/ds-local';
import './conversation.css';

export interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
  channel: ComponentType<IconProps>;
  tags?: Array<{ label: string; color: 'blue' | 'gold' | 'green' | 'red' | 'purple' | 'volcano' }>;
}

export function ConversationItem({ c, selected, onSelect }: { c: Conversation; selected?: boolean; onSelect?: () => void }) {
  return (
    <button type="button" className={`pk-conv${selected ? ' is-selected' : ''}`} onClick={onSelect} aria-current={selected || undefined}>
      <span className="pk-conv__avatar">
        <Avatar size={40}>{c.name.slice(0, 1)}</Avatar>
        <span className="pk-conv__channel"><Icon as={c.channel} size="sm" tone="subtle" /></span>
      </span>
      <span className="pk-conv__body">
        <span className="pk-conv__row">
          <Text variant={c.unread ? 'dense-13-medium' : 'dense-13-regular'} className="pk-ellipsis">{c.name}</Text>
          <Text variant="dense-11-regular" tone="subtlest" style={{ whiteSpace: 'nowrap' }}>{c.time}</Text>
        </span>
        <span className="pk-conv__row">
          <Text variant="dense-13-regular" tone={c.unread ? 'default' : 'subtlest'} className="pk-ellipsis">{c.preview}</Text>
          {c.unread > 0 && <Badge count={c.unread} size="sm" />}
        </span>
        {c.tags?.length ? (
          <span className="pk-conv__tags">
            {c.tags.map((t) => (
              <span key={t.label} className={`pk-tag-mini pk-tag-mini--${t.color}`}>{t.label}</span>
            ))}
          </span>
        ) : null}
      </span>
    </button>
  );
}

export function ChatBubble({ side, text, time }: { side: 'in' | 'out'; text: string; time: string }) {
  return (
    <div className={`pk-bubble pk-bubble--${side}`}>
      <Text variant="body-14-regular" as="p">{text}</Text>
      <Text variant="dense-11-regular" tone="subtlest" as="span" className="pk-bubble__time">{time}</Text>
    </div>
  );
}
