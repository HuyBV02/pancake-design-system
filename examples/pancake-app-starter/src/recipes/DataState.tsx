/**
 * RECIPE · Trạng thái của một khối dữ liệu: đang tải / lỗi / trống / có dữ liệu
 * Khi nào dùng: bọc mọi danh sách, bảng, khối số liệu lấy từ API.
 */
import type { ReactNode } from 'react';
import { ArrowClockwise } from '@phosphor-icons/react';
import { Alert, Button, Empty, Skeleton } from '@pancake/ui';

export type LoadState = 'loading' | 'error' | 'ready';

export function DataState({
  state, isEmpty, emptyText, emptyAction, onRetry, rows = 4, children,
}: {
  state: LoadState;
  isEmpty: boolean;
  /** Chữ trống đúng ngữ cảnh, vd. "Chưa có thẻ hội thoại nào" */
  emptyText: string;
  /** Nút tạo mới khi trống (nếu người dùng có quyền) */
  emptyAction?: ReactNode;
  onRetry?: () => void;
  rows?: number;
  children: ReactNode;
}) {
  if (state === 'loading') return <Skeleton active paragraph={{ rows }} title={false} />;
  if (state === 'error')
    return (
      <Alert
        type="error"
        title="Không tải được dữ liệu. Kiểm tra kết nối rồi thử lại."
        action={onRetry && <Button size="s" variant="secondary-gray" icon={<ArrowClockwise />} onClick={onRetry}>Thử lại</Button>}
      />
    );
  if (isEmpty)
    return (
      <Empty description={emptyText} style={{ padding: 'var(--pk-space-500) 0' }}>
        {emptyAction}
      </Empty>
    );
  return <>{children}</>;
}
