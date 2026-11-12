# DESIGN.md — Pancake Web Design System (DS_AI v1.3)

Đặc tả ngắn để người và AI agent hiểu hệ thống trước khi dựng giao diện. Chi tiết: `components.md`, `tokens.md`, `rules.md`, `recipes.md`.

## Sản phẩm
Pancake — quản lý hội thoại & bán hàng đa kênh (Facebook, Instagram, TikTok, WhatsApp, Zalo, Shopee, Lazada…), >260.000 doanh nghiệp.
Người dùng chính: nhân viên trực page / CSKH dùng cả ngày → tốc độ, mật độ thông tin cao, phím tắt, trạng thái lỗi rõ.

## Nguồn sự thật
- Figma `Pancake-Design-System_AI` (`aScl8gFsM1pWrd0atTwyJM`) → `@pancake/tokens/tokens/*.json` (W3C DTCG) → CSS / JS / Tailwind.
- Component: `@pancake/ui` (React, antd v6 đã gắn theme). Chiều đồng bộ: Figma → code.

## Cảm giác
Sạch, mềm, gọn: nền nội dung xám xanh nhạt `surface/canvas` #ECEDF4, card trắng bo 12 viền mảnh; một màu nhấn xanh Pancake #105CE2;
không đường kẻ cắt ngang khung, tách vùng bằng khoảng cách; chữ Roboto, cỡ mặc định 14/22; icon nét mảnh Phosphor Regular 20.

## Token (tóm tắt)
| Nhóm | Giá trị chính |
|---|---|
| Brand | `bg/brand-bold/rest` #105CE2 · hover #1677FF · pressed #003EB3 · disabled #8496B4 |
| Chữ | `text/default` #1D2939 · `strong` #101828 · `control` #344054 · `subtle` #475467 · `subtlest` #667085 · `disabled` #98A2B3 · `danger` #CF1322 |
| Nền | `surface/default` #FFF · `subtle` #F9FAFB · `sunken` #F2F4F7 · `canvas` #ECEDF4 · `inverse` #1D2939 · `bg/neutral/rest` #EAECF0 · `bg/item/selected` #D2EBFF |
| Viền | `border/default` #D0D5DD · `subtle` #DDE1E7 · `subtlest` #EAECF0 · `focus` #1677FF · `danger/rest` #C9405A |
| Phủ định | `bg/danger-bold/rest` #C9405A (nút xoá) · chữ lỗi `text/danger` · chỉ báo `bg/indicator/danger` #FF4D4F |
| Khoảng cách | 2 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 (`space/025…800`) |
| Bo góc | 4 · 6 (control 24) · 8 (control 32/40) · 12 (card, panel, dropdown) · 16 (modal) · 999 |
| Cỡ control | 24 / 32 (mặc định) / 40 · icon 12 / 16 / 18 / 20 / 24 |
| Chữ | H0 46 · H1 38 · H2 30 · H3 24 · H4 20/28 · Title 16/24 · Body 14/22 · Footnote 12/16 · Dense 13/11/10 (mật độ cao) |
| Bóng | raised `0 2 8 rgba(0,0,0,.15)` · overlay 3 lớp (dropdown, modal) · focus vòng 4px |

## Component
Button (7 kiểu × negative × S/M/L) · Text · Icon · Tag (11 màu + neutral + new) · Badge · Alert (gọn / đầy đủ) · Kbd / Shortcut · Switch · Segmented · Modal (500 / 883) · Empty
+ antd có theme: Form, Input, Select, InputNumber, DatePicker, Checkbox, Radio, Tabs, Dropdown, Menu, Table, Popover, Popconfirm, Tooltip, Tour, Progress, Skeleton, Spin.
Chưa có (dùng tạm + `TODO(DS)`): Avatar, Drawer, Card, Pagination, Breadcrumb, Steps, Upload, Rate, Chat bubble.

## Bố cục
Khung 1440×960 · top nav 56 `surface/inverse` · menu trái 280 · nội dung `surface/canvas` · card trắng padding 24 ·
Hội thoại 3 cột ~400 / còn lại / 373 · modal form 500 · modal nội dung 883 · drawer 760.

## Luật
1 nút primary mỗi màn · chỉ token, không giá trị tự đặt · đủ trạng thái tải / trống / lỗi · không AI slop (mô tả, badge, dấu `·` thừa) ·
tiếng Việt có dấu, nút bắt đầu bằng động từ · ngày `dd/MM/yyyy HH:mm` · tiền `1.550.000 đ`.
