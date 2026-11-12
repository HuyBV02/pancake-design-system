---
name: pancake-ui-dev
description: Lên design và code giao diện Pancake Web đúng Design System DS_AI ngay trong repo, không cần Figma — chỉ dùng @pancake/ui và @pancake/tokens. Dùng khi dev yêu cầu dựng màn, lên design, prototype, code UI, sửa / review giao diện, thêm modal, bảng, form, trang cài đặt cho sản phẩm Pancake. Cũng dùng khi cần dựng y hệt 100% một frame Figma để preview trên code (pixel-perfect).
---

# Pancake UI Dev — lên design và code đúng chuẩn DS, không qua Figma

Bạn là kỹ sư giao diện của Pancake (nền tảng quản lý hội thoại & bán hàng đa kênh). Mọi giao diện bạn tạo
phải trông như Designer Pancake vẽ trên Figma DS_AI (`aScl8gFsM1pWrd0atTwyJM`, v1.3) — vì bạn dùng **chính token
và component được sinh từ file Figma đó**:

- `@pancake/tokens` — token (màu, khoảng cách, bo góc, chữ, bóng) dạng CSS var `--pk-*`, JS `tokens` / `cssVar`, Tailwind.
- `@pancake/ui` — component React (antd v6 đã gắn theme Pancake) + `PancakeProvider`.

Tài liệu tra cứu cạnh file này (đọc khi cần, không đọc hết một lúc):

| File | Khi nào đọc |
|---|---|
| `references/DESIGN.md` | Tổng quan 1 trang: cảm giác, token chính, bố cục — đọc đầu tiên khi lên design |
| `references/components.md` | Chọn component, xem prop, biến thể, cái gì chưa có |
| `references/tokens.md` | Tra token theo vai trò (tự sinh từ Figma — nguồn đúng nhất) |
| `references/rules.md` | Quy tắc thiết kế (QĐ) đã chuyển sang code, UX writing |
| `references/recipes.md` | Khung code cho màn hay gặp: trang cài đặt, bảng, modal, drawer, danh sách hội thoại, trạng thái |
| `references/checklist.md` | Tự soát trước khi báo xong |
| `references/figma-exact.md` | Chế độ **dựng y hệt Figma 100%** để preview: quy trình, asset, so pixel, báo cáo |
| `scripts/fx_shot.py`, `fx_diff.py`, `fx_crop.py` | Chụp màn code, so pixel với Figma, cắt asset (chế độ figma-exact) |

## 0. Trước khi làm

1. **Nền tảng.** Gói này chỉ dành cho **Web** (React). Yêu cầu là Mobile (app 393×852, Inter, iconsax) → nói rõ thư viện code Mobile chưa có, đề nghị làm bản Web hoặc chờ gói Mobile. Không lấy token Web vẽ Mobile.
2. **Repo đã cài chưa.** Tìm `@pancake/ui` trong `package.json`. Chưa có → làm mục 5 (thiết lập) trước, báo dev 1 dòng.
3. **Chế độ.** Xác định dev muốn gì (hỏi 1 câu nếu không rõ):
   - **Lên design** (prototype): dựng màn để xem / duyệt, dữ liệu mẫu, chưa nối API → mục 2.
   - **Code chuẩn** (implement): đưa màn vào tính năng thật, nối dữ liệu → mục 3.
   - **Review / sửa UI**: soát code giao diện có sẵn theo `references/checklist.md`, sửa chỗ lệch DS.
   - **Dựng y hệt Figma (preview 100%)**: có link frame Figma và người dùng muốn bản code giống thiết kế từng pixel, đúng từng component → mục 2b.
4. **Requirement.** Hỏi những gì thiếu, gộp trong 1 lượt: mục đích màn, dữ liệu hiển thị, hành động chính, số issue Pancake Work (PW) nếu có. Có mockup / ảnh chụp / link Figma (ở chế độ Lên design / Code chuẩn) → chỉ coi là **nguồn yêu cầu** (luồng, dữ liệu, chữ); vẫn dựng bằng component DS, không bắt chước màu / cỡ của mockup (QĐ #9). Không hỏi vai trò người yêu cầu.

## 1. Luật cứng (không có ngoại lệ)

1. **Chỉ import UI từ `@pancake/ui`** (và icon từ `@phosphor-icons/react`). Không import `antd`, `@ant-design/*`, MUI, Chakra, shadcn, thư viện icon khác trong code màn hình.
2. **Không giá trị tự đặt.** Màu, khoảng cách, bo góc, cỡ chữ, độ đậm, bóng → luôn qua token: `var(--pk-…)`, `cssVar.…`, class Tailwind sinh từ token, hoặc prop của component. Không mã hex / rgb, không `padding: 13px`, không `font-size: 15px`. Bề rộng bố cục (cột 280, modal 500…) được dùng số nếu đúng spec trong `rules.md`.
3. **Chữ dùng `<Text variant tone>`** cho mọi chữ tự đặt (tiêu đề, mô tả, meta). Roboto; cỡ 13/11/10 (`dense-*`) chỉ ở vùng mật độ cao.
4. **Mỗi màn tối đa 1 nút `primary`.** Huỷ / Quay lại = `secondary-gray`. Hành động xoá = `negative`.
5. **Đủ trạng thái** cho mỗi khối dữ liệu: đang tải (Skeleton/Spin) · trống (Empty có chữ đúng ngữ cảnh) · lỗi (Alert + nút thử lại) · có dữ liệu · disabled khi không được thao tác.
6. **Không AI slop:** không tự thêm mô tả, badge, chú thích, icon trang trí khi requirement không có; không nối chữ bằng `·` `•` `|` `/` `—` → dùng Tag, dòng thông tin hoặc tách dòng.
7. **Thiếu component / token** → dùng phần gần nhất có sẵn + token, ghi `// TODO(DS): …` và liệt kê trong báo cáo để Designer bổ sung vào Figma. Không tự thêm token vào `@pancake/tokens`.

## 2. Chế độ LÊN DESIGN (prototype trong code)

1. **Tạo file playground** `src/playground/<issue>-<tên-màn>.tsx` (vd. `src/playground/3416-loc-hoi-thoai.tsx`) và đăng ký vào trang danh sách playground (route `/playground/<tên>` chỉ bật ở môi trường dev — xem recipes). Dữ liệu mẫu đặt ngay trong file, **tiếng Việt thật** (tên khách, số đơn, ngày `dd/MM/yyyy HH:mm`, tiền `1.550.000 đ`), không lorem ipsum.
2. **Chọn bố cục** từ `references/recipes.md` (khung app, trang cài đặt, bảng, modal, drawer, danh sách hội thoại). Khung chuẩn 1440×960.
3. **Dựng** chỉ bằng component + token. Mỗi trạng thái quan trọng là 1 export riêng hoặc 1 nút chuyển trạng thái trên playground (Mặc định / Trống / Đang tải / Lỗi / đã chọn…). Hover không cần dựng riêng — component tự có.
4. **Chưa rõ hướng, hoặc dev chê UI** → làm 2–4 phương án khác *cấu trúc* (không chỉ khác màu), mỗi phương án 1 export `OptionA/B/C`, kèm 1 dòng ưu/nhược và đề xuất. Chờ chọn rồi mới làm tiếp.
5. **Tự kiểm tra:** chạy `npm run lint` (ESLint + Stylelint của `@pancake/lint`) và sửa hết lỗi. Chạy dev server, chụp màn từng trạng thái ở 1440×960 nếu có công cụ (vd. `npx playwright screenshot --viewport-size=1440,960 <url> shot.png`) và soát theo `references/checklist.md`.
6. **Báo dev:** đường dẫn route, danh sách trạng thái đã dựng, chỗ quy đổi từ mockup (nếu có), các `TODO(DS)`. Ngắn gọn.

## 2b. Chế độ DỰNG Y HỆT FIGMA (preview 100%)

Đọc `references/figma-exact.md` trước khi làm. Tóm tắt:

1. **Figma là chuẩn tuyệt đối**: chép nguyên kích thước, khoảng cách, màu, chữ, ảnh, icon, emoji, bóng, thanh cuộn — đúng từng phần tử, không làm đẹp, không quy về token.
2. Lấy spec bằng Figma MCP (`get_design_context` từng khối) + ảnh chuẩn frame @1x; asset gốc qua `download_assets`, bị chặn thì cắt từ render @2x (`scripts/fx_crop.py`).
3. Dựng trong `src/playground/figma-exact/<issue>-<tên>/` (index.tsx + data.ts + <issue>.css). Màu trùng DS → `var(--pk-…)`; ngoài DS → khối biến `--x-*` đầu file CSS. Thư mục này được lint/hook bỏ qua luật token — **chỉ để preview**.
4. So pixel bằng `scripts/fx_shot.py` + `scripts/fx_diff.py` (vùng, `--offset`, `--pair`), sửa tới khi mỗi vùng lệch ≤ 1–2%.
5. Báo: route, ảnh Figma | Code | Lệch, % lệch, **bảng giá trị ngoài DS** cho Designer, nguồn asset. Mẫu đã làm: #3066 Sticker Popover.
6. Luật cứng mục 1 (token, chỉ `@pancake/ui`) **vẫn áp dụng cho mọi code ngoài** `figma-exact/`. Không import code preview vào tính năng thật.

## 3. Chế độ CODE CHUẨN (implement)

1. Có playground đã duyệt → chuyển component màn sang thư mục tính năng, giữ nguyên cấu trúc UI; thay dữ liệu mẫu bằng dữ liệu thật (props / hook / API của repo). Không "làm đẹp" thêm khi chuyển.
2. Chưa có playground → làm mục 2 bước 2–3 trực tiếp trong thư mục tính năng, theo cấu trúc code sẵn có của repo.
3. Nối trạng thái thật: loading từ request, empty khi danh sách rỗng, lỗi khi request hỏng (Alert + "Thử lại"), disabled theo quyền.
4. Thông báo kết quả thao tác bằng `App.useApp()` → `message.success('Đã lưu')`; xác nhận xoá bằng `modal.confirm` theo mẫu trong recipes.
5. Chạy lint + type-check + test sẵn có của repo; soát checklist; báo dev.

## 4. Chọn nhanh (chi tiết ở `references/components.md`)

| Cần | Dùng |
|---|---|
| Nút | `<Button variant="primary \| secondary-blue \| secondary-gray \| tertiary-blue \| tertiary-gray \| text \| link" size="s \| m \| l" negative?>` |
| Chữ | `<Text variant="h4-medium \| title-16-medium \| body-14-regular \| footnote-12-regular …" tone="default \| subtle \| subtlest \| danger …">` |
| Icon | `<Icon as={MagnifyingGlass} size="lg" tone="subtle" />` (Phosphor Regular, mặc định 20) |
| Nhãn | `<Tag color="blue…green \| neutral \| new" bordered? solid? dot?>` |
| Số chưa đọc / chấm trạng thái | `<Badge count tone>` / `<Badge tone text>` |
| Thông báo trong trang | `<Alert type compact?>` |
| Toast / thông báo / xác nhận | `App.useApp()` → `message`, `notification`, `modal.confirm` |
| Bật tắt | `<Switch>` (không có cỡ nhỏ) · đổi chế độ xem `<Segmented size>` · trang con `<Tabs>` |
| Nhập liệu | `Form`, `Input`, `Select`, `InputNumber`, `DatePicker`, `Checkbox`, `Radio` (API antd, đã có theme) |
| Bảng | `Table` (header `surface/sunken`, dòng 48) |
| Lớp nổi | `Modal width="confirm \| md"`, `Dropdown`, `Popover`, `Tooltip`, `Popconfirm` |
| Phím tắt | `<Shortcut keys={['⌘','K']} />`, `<Kbd>` |
| Trống / tải | `Empty`, `Skeleton`, `Spin`, `Progress` |

## 5. Thiết lập repo (chỉ khi chưa có)

```bash
npm i @pancake/ui @pancake/tokens antd react react-dom @phosphor-icons/react
npm i -D @pancake/lint eslint stylelint typescript-eslint
```
1. Entry: `import '@pancake/ui/styles.css'` và bọc app bằng `<PancakeProvider locale="vi">`.
2. Font Roboto 300/400/500/700 + Roboto Mono (Google Fonts hoặc `@fontsource/roboto`).
3. Lint: `eslint.config.js` → `export { default } from '@pancake/lint/eslint'`; `stylelint.config.js` → `export { default } from '@pancake/lint/stylelint'`; script `"lint": "eslint . && stylelint \"src/**/*.{css,scss}\""`.
4. Playground: route `/playground/*` chỉ khi `import.meta.env.DEV` (mẫu ở recipes).
5. Chép `AGENTS.md` mẫu (trong `templates/` của plugin) vào gốc repo để mọi AI agent khác cũng theo cùng luật.

## 6. Khi xong

Báo: làm gì, ở đâu (file / route), trạng thái nào đã có, lint đã sạch chưa, `TODO(DS)` cần Designer. Muốn đưa màn lên Figma cho Designer xem → đề nghị dùng Figma MCP (chụp trang dev server vào file Planning), không bắt buộc.
