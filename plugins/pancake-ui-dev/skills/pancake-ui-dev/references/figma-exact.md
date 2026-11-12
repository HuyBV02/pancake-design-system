# Chế độ DỰNG Y HỆT FIGMA (figma-exact) — preview 100% thiết kế trên code

Dùng khi dev / PM / Designer nói: "dựng y hệt Figma", "giống 100% thiết kế", "pixel-perfect", "preview cho chuẩn",
"đúng từng component như bản vẽ", hoặc gửi link 1 frame Figma và muốn xem nó chạy trên trình duyệt **không sai một pixel**.

Khác với chế độ **Lên design** (dựng bằng component DS, quy đổi mockup về token — QĐ #9):
ở đây **bản Figma là chuẩn tuyệt đối**. Mọi kích thước, khoảng cách, màu, chữ, ảnh, icon chép nguyên từ Figma,
kể cả khi Figma lệch DS. Chỗ lệch DS **không sửa** mà **liệt kê** cho Designer quyết định.

Mẫu tham chiếu đã làm xong: `examples/pancake-app-starter/src/playground/figma-exact/3066-sticker-popover/`
(Hội Thoại 3 · #3066 Sticker Popover, frame `27:27391`, file `8NXSgaDqKxd60cCpuZN2be`, 1440×900).
Mở: `npm run dev -w pancake-app-starter` → `/playground/3066-sticker-popover`.
Ảnh chuẩn + vùng so: `examples/pancake-app-starter/figma-ref/3066/{full.png,regions.json}`.
Trạng thái mẫu: mới qua vòng dựng đầu — header 1,2% · navi 0% · danh sách 1,8% · chat 4,8% · panel thông tin 12,6% · popover 9,3%
(lệch chủ yếu do lệch dọc vài px ở panel và lưới emoji). Muốn đạt 100%: chạy tiếp Bước 4 trên đúng mẫu này.

---

## 1. Luật của chế độ này

1. **Figma là chuẩn 100%.** Không "làm đẹp", không đổi chữ, không thêm/bớt phần tử, không quy về token gần nhất.
2. **Đúng từng phần tử.** Mỗi khối trong Figma (header, navi, dòng hội thoại, tag, bubble, popover, scrollbar, bóng, mũi tên…)
   là 1 phần tử trong code, đúng vị trí / kích thước / thứ tự lớp. Thanh cuộn, chấm trạng thái, badge cũng phải có.
3. **Màu:** trùng giá trị token DS_AI → dùng `var(--pk-…)` (tra `references/tokens.md`, so mã hex chính xác).
   Không có trong DS → khai báo 1 lần trong khối biến cục bộ `--x-…` ở đầu file CSS, đặt tên theo vai trò, rồi dùng biến đó.
   **Không** rải mã hex trong JSX.
4. **Chữ:** đúng cỡ / line-height / độ đậm của Figma (vd. 13/16, 11/16, weight 460 → 500, SemiBold → 600 — import `@fontsource/roboto/600.css` nếu cần).
5. **Ảnh, icon, avatar, emoji:** dùng **đúng asset của Figma** đặt ở `public/figma-<issue>/`, đặt đúng chỗ, đúng kích thước CSS (ảnh @2x hiển thị ở @1x).
   Không vẽ lại, không thay bằng icon Phosphor "na ná", không bỏ sót. Emoji hệ thống (Apple) lấy từ gói `emoji-datasource-apple` (PNG 64px) theo mã codepoint.
6. **Chỉ để preview.** Code nằm trong `src/playground/figma-exact/<issue>-<tên>/` — thư mục duy nhất ESLint, Stylelint
   và hook của plugin bỏ qua luật token. **Không** import code từ đây vào tính năng thật; khi làm thật → chế độ **Code chuẩn** bằng `@pancake/ui`.
7. Không sửa file Figma (chỉ đọc). Link ảnh tạm từ Figma MCP hết hạn sau 7 ngày — luôn tải về máy, không để URL Figma trong code.

## 2. Quy trình

### Bước 1 — Lấy dữ liệu thiết kế (Figma MCP)
1. `create_session` với fileKey → `get_design_context(nodeId, fileKey)` của frame (kèm ảnh chụp). Trả về "sparse" → gọi tiếp cho từng khối con
   (header, navi, list, chat header, messages, composer, panel, popover…) **song song**.
2. Ghi lại spec từng khối: kích thước, auto-layout (hướng, gap, padding, căn), màu nền/viền/chữ, text style, bo góc, bóng, blur, vị trí absolute.
3. Ảnh chuẩn để so: chụp frame @1x đúng kích thước (`get_screenshot`, hoặc trong `use_figma`: `await node.screenshot({ scale: 1 })`) → `fx/full.png`.
   Chụp thêm từng khối @2x (`scale: 2`) để cắt asset — **mỗi lần gọi `use_figma` chỉ chụp 1 ảnh** (gọi nhiều ảnh 1 lần trả về thiếu / sai thứ tự).

### Bước 2 — Asset
- **Cách chuẩn:** `download_assets` / link asset trong `get_design_context` → tải SVG/PNG gốc vào `public/figma-<issue>/`
  (cần mạng ra được `www.figma.com`; nếu bị chặn → nhờ người dùng mở quyền domain này).
- **Đường lui khi bị chặn:** cắt từ ảnh render @2x bằng `scripts/fx_crop.py` (khai báo toạ độ @1x trong `assets.json`).
  Ghép 1 ảnh kiểm tra các mảnh cắt trước khi dùng. Ghi rõ trong báo cáo là asset cắt từ render.
- Emoji: `npm pack emoji-datasource-apple` → `img/apple/64/<codepoint>.png` → `public/figma-<issue>/emoji/`.

### Bước 3 — Dựng
Cấu trúc thư mục (theo mẫu #3066):
```
src/playground/figma-exact/<issue>-<tên>/
  index.tsx   ← component + đăng ký PlaygroundPage (slug `<issue>-<tên>`, title có "(y hệt Figma)")
  data.ts     ← dữ liệu chép nguyên văn từ Figma (tên, nội dung, giờ, thẻ…) — kể cả lorem ipsum nếu Figma có
  <issue>.css ← mọi style; khối --x-* (giá trị ngoài DS) ở đầu file, có chú thích
```
- Gốc màn: 1 phần tử đúng kích thước frame (vd. `width:1440px; height:900px; overflow:hidden`).
- Auto-layout Figma → flex (direction / gap / padding / align giống hệt). Absolute trong Figma → `position:absolute` cùng toạ độ.
- Danh sách lặp (dòng hội thoại, tag, emoji…) → mảng dữ liệu + map, nhưng **mỗi dòng giữ đúng biến thể của Figma**
  (nền, đậm/nhạt, icon, thẻ, có/không mũi tên trả lời…).
- Hiệu ứng: `drop-shadow`/`box-shadow` đúng thông số; viền trái kiểu "inset" → `box-shadow: inset 4px 0 0 …`;
  độ mờ lớp (opacity 60%) đặt trên phần tử, không tự trộn màu.
- Đăng ký vào `PAGES` trong `src/playground/Playground.tsx`.

### Bước 4 — So pixel và sửa tới khi khớp
```bash
npm run dev -w pancake-app-starter            # hoặc dev server của repo
python3 scripts/fx_shot.py http://localhost:5173/playground/<slug> fx/code.png --size 1440x900
python3 scripts/fx_diff.py fx/full.png fx/code.png --regions fx/regions.json --out fx/diff.png
python3 scripts/fx_diff.py fx/full.png fx/code.png --offset card=1120,356,1440,392 tabs=1067,56,1440,104
python3 scripts/fx_diff.py fx/full.png fx/code.png --pair 1000,0,1440,56 --zoom 2 --out fx/pair.png
```
- Đi từng vùng, lệch nhiều nhất trước. `--offset` cho biết khối bị dời bao nhiêu px → sửa padding/gap/height tương ứng.
  `--pair` để nhìn tận mắt (trên = Figma, dưới = code).
- **Đạt** khi: mọi vùng lệch ≤ 1–2% (phần còn lại chỉ là khử răng cưa chữ), không còn khối nào `--offset` khác 0,
  mọi asset đúng chỗ / đúng kích thước, không thiếu phần tử nào. Lặp tối đa ~5 vòng; vẫn lệch → ghi lại nguyên nhân (thường do font render).

### Bước 5 — Báo cáo
1. Route preview + ảnh ghép **Figma | Code | Lệch** (gửi file ảnh).
2. % lệch theo vùng sau vòng cuối.
3. **Bảng giá trị ngoài DS_AI** (chính là khối `--x-*`): giá trị · dùng ở đâu · token gần nhất đề xuất — để Designer chọn
   "đưa vào DS" hay "sửa Figma về token".
4. Nguồn asset (gốc từ Figma / cắt từ render / Apple emoji) và việc còn thiếu.
5. Nhắc: đây là bản preview; làm tính năng thật thì dựng lại bằng `@pancake/ui` (chế độ Code chuẩn), lấy bản này làm đích so sánh.

## 3. Giá trị ngoài DS đã gặp ở #3066 (tham khảo)
| Giá trị | Dùng ở | Gần nhất trong DS |
|---|---|---|
| `#4a646c` | giờ ở dòng chưa đọc | `--pk-gray-600` |
| `#57c6b3` / `#da5c9d` / `#00a02d` | tag cyan / magenta / green | `--pk-cyan-*` / `--pk-magenta-*` / `--pk-green-*` |
| `#c7c7d2` | thanh cuộn | `--pk-gray-300` |
| `#d9dbea` / `#8f90a6` | gạch dưới tab / chữ tab chưa chọn | `--pk-gray-250` / `--pk-gray-500` |
| `#cdf0c2` / `#5ecc9f` | khối trích dẫn trong bubble xanh | `--pk-green-*` |
| `rgb(52 64 84 / 80%)` | nền mục navi phụ | `--pk-gray-700` |
| `rgb(0 0 0 / 85%)` | tiêu đề "Tra cứu cảnh báo" | `--pk-gray-900` |
| 11 màu thẻ ghim (`#2697ec`, `#b591bf`, `#e79991`…) | thẻ trên khung soạn tin | bảng màu thẻ của sản phẩm (chưa có trong DS) |
| SemiBold 600 | tên người gửi, tab đang chọn | DS chỉ có 400/500 |
