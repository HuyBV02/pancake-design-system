# AGENTS.md — giao diện Pancake Web

Hướng dẫn cho mọi AI agent (Claude Code, Cursor, Copilot, Codex…) khi tạo hoặc sửa giao diện trong repo này.
Giao diện phải đúng Design System Pancake DS_AI v1.3 — dùng **@pancake/ui** và **@pancake/tokens**, không cần mở Figma.

## Tài liệu (đọc khi cần, theo thứ tự)
1. `node_modules/@pancake/ui/docs/components.md` — chọn component, prop, biến thể, phần DS chưa có.
2. `node_modules/@pancake/tokens/dist/docs/tokens.md` — bảng token theo vai trò (tự sinh từ Figma).
3. `node_modules/@pancake/ui/docs/rules.md` — quy tắc thiết kế cho code, UX writing tiếng Việt.
4. `node_modules/@pancake/ui/docs/recipes.md` — khung code: khung app, trang cài đặt + bảng, modal, drawer, danh sách hội thoại, trạng thái, playground.
5. `node_modules/@pancake/ui/docs/checklist.md` — tự soát trước khi báo xong.

Claude Code: cài plugin `pancake-ui-dev` (skill + hook tự soát) — xem README của repo design system.

## Luật cứng
1. Chỉ import UI từ `@pancake/ui`; icon từ `@phosphor-icons/react` (Regular). Không import `antd` / `@ant-design/*` / thư viện UI khác — trừ trong `src/components/ds-local/` (component DS chưa có, ghi `// TODO(DS)`).
2. Màu, khoảng cách, bo góc, chữ, bóng chỉ qua token: `var(--pk-…)`, `cssVar.…`, prop component. Không mã hex / rgb, không px tự đặt cho padding / margin / gap / radius / font.
3. Chữ tự đặt dùng `<Text variant tone>` (Roboto). Cỡ 13/11/10 (`dense-*`) chỉ ở vùng mật độ cao.
4. Mỗi màn tối đa 1 `Button variant="primary"`; Huỷ / Quay lại = `secondary-gray`; xoá = `negative` + xác nhận.
5. Mỗi khối dữ liệu có đủ: đang tải · trống (chữ đúng ngữ cảnh) · lỗi (Alert + Thử lại) · có dữ liệu · disabled theo quyền.
6. Không tự thêm mô tả / badge / icon trang trí ngoài requirement; không nối chữ bằng `·` `•` `|` `/` `—`.
7. Chữ tiếng Việt có dấu; nút bắt đầu bằng động từ, 1–4 chữ; ngày `dd/MM/yyyy HH:mm`; tiền `1.550.000 đ`.
8. Thiếu component / token → dùng phần gần nhất + `// TODO(DS): …`, báo lại; không tự thêm token.

## Lên design (prototype) không qua Figma
- Tạo `src/playground/<issue>-<tên-màn>.tsx`, đăng ký vào `src/playground/Playground.tsx`; mỗi trạng thái 1 mục trong `states`. Mở `/playground/<slug>` (chỉ bật khi dev).
- **Dựng y hệt Figma 100% để preview** (pixel-perfect, đúng từng component): làm trong `src/playground/figma-exact/<issue>-<tên>/`, chép nguyên giá trị Figma, so pixel tới khi khớp, liệt kê giá trị ngoài DS cho Designer. Quy trình: `figma-exact.md` trong skill `pancake-ui-dev`; mẫu: `figma-exact/3066-sticker-popover`. Chỉ thư mục này được bỏ qua luật token — không import vào tính năng thật.
- Dữ liệu mẫu tiếng Việt thật, khung 1440×960. Chưa rõ hướng → 2–4 phương án khác cấu trúc (`OptionA/B/C`).
- Duyệt xong → chuyển sang thư mục tính năng, nối dữ liệu thật, giữ nguyên UI.

## Trước khi báo xong
`npm run lint` (ESLint + Stylelint của `@pancake/lint`) và type-check sạch → soát `checklist.md` → báo: file / route, trạng thái đã có, các `TODO(DS)`.
