/**
 * RECIPE · Xác nhận xoá
 * Tiêu đề = câu hỏi có tên đối tượng · nội dung = hệ quả + "Không thể hoàn tác." · nút "Xoá …" negative + "Huỷ".
 */
import { App } from '@pancake/ui';

export function useConfirmDelete() {
  const { modal } = App.useApp();
  return ({ title, content, okText = 'Xoá', onOk }: { title: string; content: string; okText?: string; onOk: () => void | Promise<void> }) =>
    modal.confirm({
      title,
      content,
      okText,
      cancelText: 'Huỷ',
      okButtonProps: { danger: true },
      centered: true,
      width: 500,
      onOk,
    });
}
