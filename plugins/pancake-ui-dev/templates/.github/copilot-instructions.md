# Copilot — giao diện Pancake Web

Làm theo `AGENTS.md` ở gốc repo. Tóm tắt:
- Chỉ import UI từ `@pancake/ui`, icon từ `@phosphor-icons/react`. Không import `antd` ngoài `src/components/ds-local/`.
- Màu, khoảng cách, bo góc, chữ chỉ qua token (`var(--pk-…)`, `cssVar`) — không hex, không px tự đặt.
- Chữ dùng `<Text variant tone>`; mỗi màn 1 nút `primary`; đủ trạng thái tải / trống / lỗi.
- Tra: `node_modules/@pancake/ui/docs/components.md`, `node_modules/@pancake/tokens/dist/docs/tokens.md`, `node_modules/@pancake/ui/docs/recipes.md`.
- Chạy `npm run lint` trước khi xong.
