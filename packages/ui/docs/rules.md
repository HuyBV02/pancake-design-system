# Quy tắc thiết kế Pancake Web — bản dành cho code

Chuyển từ Rules Design (QĐ #1–#33, Figma DS_AI trang 📏 Rules Design) sang ngôn ngữ code. Số QĐ để đối chiếu với Designer.

## Token & chữ
- Màu / khoảng cách / bo góc / chữ / bóng chỉ qua token (`var(--pk-*)`, `cssVar`, Tailwind từ token, prop component). Không hex, không primitive trực tiếp (trừ tag, biểu đồ `chart/1…8`).
- Chọn token: gắn vào đâu → vai trò → trạng thái. Vd. nền nút phụ hover = `bg/neutral/hover`; chữ mô tả = `text/subtlest`; viền card = `border/subtlest`.
- Thang khoảng cách: 2 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 (`space/025…800`). Không giá trị ngoài thang.
- Bo góc: control 24 → `radius/sm` 6 · control 32/40 → `radius/md` 8 · card, panel, dropdown → `radius/xl` 12 · modal, card gói → `radius/xxl` 16 · pill → `radius/rounded`.
- Chữ: chỉ Roboto (mono: Roboto Mono). Không Inter, không SemiBold (dùng Medium 500). Cỡ 10/11/13 chỉ qua `dense-*` ở vùng mật độ cao — dòng hội thoại, khung chat, tag mini (QĐ #26).
- Icon: Phosphor Regular; cỡ 20 trong UI thường, 16 trong chip/meta, 12 trong tag. Icon trong nút / link cùng màu chữ (QĐ #20, #28).

## Bố cục
- Khung màn chuẩn 1440×960 (kiểm tra thêm 1920×1080).
- Khung app: top nav cao 56 nền `surface/inverse`; menu trái rộng 280, mục cao 42 bo 8; vùng nội dung nền `surface/canvas`, padding 32 (dọc) / 112 (ngang) ở trang cài đặt rộng; card trắng `radius/xl` padding 24.
- Màn Hội thoại: 3 cột ~400 / phần còn lại / 373. Khung chat nền `chat/bg`; bong bóng gửi `chat/bubble-outgoing`, nhận `chat/bubble-incoming`.
- Modal nhập liệu ngắn 500–520 (`width="confirm"`), modal nội dung 883 (`width="md"`). Drawer cài đặt 760.
- **Mềm mại (QĐ #11):** không đường kẻ cắt ngang hết khung (dưới header, trên footer, giữa nav và nội dung); không chia vùng nền tối/sáng. Tách vùng bằng khoảng cách, card viền mảnh, nền xanh nhạt khi chọn. Ngoại lệ: modal/drawer cài đặt nhiều mục = cột trái `surface/sunken` 200 + nội dung trắng (QĐ #19).
- **Divider giữa vùng (QĐ #31):** chỉ giữa 2 vùng lớn trong modal/drawer/trang cài đặt: 1px `border/subtlest`, nằm trong padding. Không kẻ giữa các hàng trong cùng vùng (cách nhau `space/150`).
- **Bảng (QĐ #20):** khung `border/subtlest` bo 12; header 46–48 `surface/sunken` Body 14 Medium; dòng 48 (52 có avatar), viền dưới `border/subtle`, dòng cuối không viền; mọi dòng cao bằng nhau, cột thẳng hàng; cột số canh phải.
- **Không lệch, không cắt (QĐ #21):** phần tử nằm trọn khung; chữ ngắn (ngày giờ, số tiền, tên nút) không xuống dòng — `white-space: nowrap` và nới cột; chữ dài cắt bằng ellipsis + Tooltip.
- Khối cùng cấp chia đều chiều rộng (flex / grid), không đặt bề rộng lẻ.

## Thành phần
- Mỗi màn tối đa 1 nút `primary`. Cặp nút cuối: `secondary-gray` "Huỷ" bên trái, `primary` bên phải, cách 8.
- Switch luôn 40×22, không chữ trong núm (QĐ #10).
- Phím tắt dạng keycap `Shortcut` / `Kbd` (sm 18 trong menu, md 22 ở trang cài đặt); macOS ký hiệu, Windows chữ.
- Màu sản phẩm (QĐ #27): nền vùng nội dung `surface/canvas`; nhãn "Mới" `Tag color="new"`; cảnh báo mạnh `alert/warning-strong`.
- Trạng thái: màn tĩnh mặc định ở trạng thái Default; hover chỉ xuất hiện khi rê chuột (QĐ #12) — không dựng màn "đang hover" làm mặc định.

## UX writing (QĐ #18, #29)
- Tiếng Việt có dấu đầy đủ, xưng hô trung tính, không "Bạn có thể…".
- Nhãn, tên nút 1–4 chữ; **nút bắt đầu bằng động từ**: "Thêm thẻ", "Lưu", "Gửi tin", "Xoá".
- Bỏ điều hiển nhiên; không "Nhấn Enter để thêm".
- Mô tả ≤ 1 câu (~10 chữ), chỉ nói hệ quả / giới hạn: "Thẻ sẽ bị gỡ khỏi 128 hội thoại."
- Placeholder gợi ý nội dung: "Tìm tên hoặc số điện thoại", "VD: Khách VIP".
- Ưu tiên số liệu: "Đã chọn 40/100".
- Định dạng: ngày giờ `dd/MM/yyyy HH:mm` (dayjs `DD/MM/YYYY HH:mm`), tiền `1.550.000 đ` (`toLocaleString('vi-VN') + ' đ'`), số `2.045`.
- Không nối thông tin bằng `·` `•` `|` `/` `—`; dùng Tag, dòng thông tin, tách dòng.
- Xác nhận xoá: tiêu đề câu hỏi có tên đối tượng ("Xoá thẻ "Khách VIP"?"), nội dung nói hệ quả + "Không thể hoàn tác.", nút `Xoá thẻ` negative + `Huỷ`.
- Toast kết quả: "Đã lưu", "Đã xoá thẻ", lỗi: "Không lưu được. Thử lại sau."

## Sản phẩm (để chọn đúng ngữ cảnh)
Pancake: quản lý hội thoại & bán hàng đa kênh (Facebook, Instagram, TikTok, WhatsApp, Zalo, Shopee, Lazada…). Người dùng chính là nhân viên trực page / CSKH dùng cả ngày → ưu tiên tốc độ, mật độ cao, phím tắt. Màn chính: Dashboard · Hội thoại · Gộp trang · Bài viết · Thống kê · Cài đặt · Tổng đài · Tài khoản / Gói cước. Trợ lý AI chỉ gợi ý — nhân viên bấm gửi. Phụ thuộc chính sách nền tảng (Meta, Zalo, TikTok) → luôn thiết kế trạng thái lỗi, mất kết nối, giới hạn.
