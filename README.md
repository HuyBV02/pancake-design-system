# Pancake Web Design System — code

Một nguồn token chung cho **Figma và code**, thư viện component React cho dev, và **skill + rào chắn để AI trong phần mềm code
lên design và code giao diện đúng chuẩn mà không cần qua Figma**.
Nguồn: Figma **Pancake-Design-System_AI** (`aScl8gFsM1pWrd0atTwyJM`), DS v1.3.

```
pancake-design-system/
├── packages/tokens/            @pancake/tokens — Ý 1: nguồn token chung
│   ├── figma-export/*.txt      Dữ liệu thô kéo từ Figma (Variables + text/effect style)
│   ├── tokens/*.json           ★ NGUỒN CHUẨN — W3C Design Tokens (DTCG), giữ alias như Figma
│   ├── scripts/                figma-to-dtcg · pull-figma (REST) · figma-plugin-export (không cần Enterprise)
│   ├── style-dictionary.config.mjs
│   └── dist/                   File sinh ra cho từng nền tảng (không sửa tay)
│       ├── css/tokens.css          CSS variables --pk-*
│       ├── js/tokens.js + .d.ts    tokens · cssVar · byFigmaName (có kiểu TypeScript)
│       ├── json/tokens.flat.json   Bảng phẳng tên → giá trị
│       └── tailwind/preset.js · theme.css   Tailwind v3 / v4
├── packages/ui/                @pancake/ui — Ý 2: thư viện component (React + antd v6)
│   ├── src/theme/antdTheme.ts  Token Pancake → theme antd (mọi component antd tự đúng chuẩn)
│   ├── src/components/         Button · Tag · Badge · Alert · Kbd/Shortcut · Text · Icon · Switch · Segmented · Modal · Empty
│   ├── src/styles/             CSS phần DS khác antd (chỉ dùng var(--pk-*))
│   ├── src/stories/            Storybook: Foundations · Components · Patterns
│   ├── docs/                   Tài liệu cho AI agent đi kèm package (components · rules · recipes · checklist · DESIGN)
│   ├── gallery/                Sinh trang xem tĩnh từ story (để gửi team)
│   └── dist/                   index.js · index.d.ts · styles.css
├── packages/lint/              @pancake/lint — Ý 3: ESLint + Stylelint chặn import antd, mã hex, px tự đặt
├── plugins/pancake-ui-dev/     Ý 3: plugin Claude Code
│   ├── skills/pancake-ui-dev/  SKILL.md + references/ (DESIGN, components, tokens, rules, recipes, checklist)
│   ├── hooks/                  Hook tự soát sau mỗi lần AI sửa file giao diện
│   └── templates/              AGENTS.md · CLAUDE.md · .cursor/rules · .github/copilot-instructions.md · cấu hình lint
├── examples/pancake-app-starter/  App mẫu: khung app, recipes, playground (#3416 Lọc hội thoại), lint, file cho AI agent
├── .claude-plugin/marketplace.json  Marketplace "pancake" để cài plugin
├── DESIGN.md                   Đặc tả 1 trang cho người và AI
└── scripts/sync-skill.mjs      Đồng bộ tài liệu skill từ token + app mẫu (npm run skill)
```

## Các file lưu dưới dạng gì

| Lớp | Định dạng | Ai dùng |
|---|---|---|
| Nguồn token | `tokens/*.json` — chuẩn W3C DTCG (`$type`, `$value`, `$description`, alias `{gray.800}`, `$extensions` ghi tên biến Figma) | Designer, công cụ token, AI agent |
| Token cho web | `tokens.css` (CSS variables), `tokens.js` + `.d.ts`, `tokens.flat.json`, Tailwind preset/theme | Dev |
| Component | Package npm `@pancake/ui`: React + TypeScript (`.tsx` → `dist/index.js` + `.d.ts`), `styles.css` | Dev |
| Tài liệu sống | Storybook (`npm run storybook`) + trang gallery tĩnh | Cả team |

## Ý 3 — AI lên design và code đúng chuẩn, không qua Figma

**Claude Code** (đủ nhất: skill + hook tự soát):
```bash
# trong Claude Code, trỏ tới repo design system (đường dẫn thư mục hoặc git repo nội bộ)
/plugin marketplace add ./pancake-design-system
/plugin install pancake-ui-dev@pancake
```
Sau đó gõ tự nhiên: *"lên design màn lọc hội thoại theo nguồn #3416"*, *"code trang Mẫu trả lời nhanh"*, *"review UI file này theo DS"*.
Skill hỏi Web/Mobile và chế độ (lên design / code chuẩn / review), dựng màn trong playground bằng @pancake/ui, tự chạy lint và soát checklist.
Hook chặn ngay khi AI ghi mã hex, px tự đặt hoặc import antd trực tiếp — AI phải sửa trước khi làm tiếp.

**Cursor, GitHub Copilot, Codex, editor khác:** chép từ `plugins/pancake-ui-dev/templates/` vào gốc repo sản phẩm:
`AGENTS.md`, `CLAUDE.md`, `.cursor/rules/pancake-ui.mdc`, `.github/copilot-instructions.md`. Các file này trỏ tới tài liệu nằm sẵn trong
`node_modules/@pancake/ui/docs/` và `node_modules/@pancake/tokens/dist/docs/tokens.md`.

**Rào chắn cho mọi editor và CI:**
```js
// eslint.config.js
import pancake from '@pancake/lint/eslint';
export default [...pancake];
// stylelint.config.js
export { default } from '@pancake/lint/stylelint';
```
`src/components/ds-local/` là chỗ duy nhất được import antd (component DS chưa có, ghi `TODO(DS)`).

**Lên design trong code:** mỗi màn là 1 file `src/playground/<issue>-<tên>.tsx` với nhiều trạng thái, mở ở `/playground/<slug>` (chỉ khi dev).
Xem app mẫu: `npm run dev -w pancake-app-starter` → http://localhost:5173/playground/3416-loc-hoi-thoai

## Dùng trong dự án

```bash
npm i @pancake/ui @pancake/tokens antd react react-dom @phosphor-icons/react
```

```tsx
// main.tsx
import '@pancake/ui/styles.css';
import { PancakeProvider } from '@pancake/ui';

<PancakeProvider locale="vi"><App /></PancakeProvider>
```

```tsx
import { Button, Tag, Text, Icon, Input, Table, Alert } from '@pancake/ui';
import { Plus } from '@phosphor-icons/react';

<Text variant="h4-medium">Thẻ hội thoại</Text>
<Button variant="primary" icon={<Plus />}>Thêm thẻ</Button>
<Button variant="secondary-gray">Huỷ</Button>
<Tag color="gold" bordered>Còn 3 ngày</Tag>
```

Màu / khoảng cách / chữ ngoài component: `var(--pk-surface-default)`, `cssVar.space['150']` hoặc class Tailwind sinh từ token. **Không gõ mã hex hay px tự đặt.**

## Quy tắc

1. Chỉ import component từ `@pancake/ui` — không import thẳng từ `antd` trong code màn hình.
2. Mỗi màn 1 nút `primary`; Huỷ / Quay lại dùng `secondary-gray`.
3. Icon Phosphor (Regular), cỡ 20 trong UI thường; icon trong nút cùng màu chữ.
4. Đủ trạng thái: mặc định, hover, pressed, focus, disabled, lỗi, trống, đang tải.
5. Cỡ chữ 13/11/10 (`dense-*`) chỉ dùng ở vùng mật độ cao (dòng hội thoại, khung chat, tag mini).
6. Thiếu token → Designer thêm vào Figma trước, rồi kéo về. Không thêm token tay vào `tokens/*.json`.

## Khi Designer đổi token trên Figma

```bash
cd packages/tokens
FIGMA_TOKEN=xxx node scripts/pull-figma.mjs   # cần Figma Enterprise (Variables REST API)
npm run build                                  # figma-export → tokens/*.json → dist/*
```
Không có Enterprise: mở file DS_AI → chạy `scripts/figma-plugin-export.js` (Plugins → Development, hoặc nhờ Claude qua Figma MCP) → dán kết quả vào `figma-export/*.txt` → `npm run build`.
Text style / effect style: cập nhật `figma-export/styles.txt`.

## Lệnh

| Lệnh (ở thư mục gốc) | Việc |
|---|---|
| `npm install` | Cài cho cả 2 package |
| `npm run build` | Build token rồi build `@pancake/ui` |
| `npm run storybook` | Mở Storybook tại http://localhost:6006 |
| `npm run build-storybook` | Xuất Storybook tĩnh |
| `npm run gallery` | Sinh `packages/ui/gallery/out/index.html` (trang xem tĩnh) |
| `npm run skill` | Build token rồi đồng bộ tài liệu skill + `@pancake/ui/docs` + templates từ token và app mẫu |
| `npm run lint` | Lint app mẫu bằng `@pancake/lint` |
| `npm run dev -w pancake-app-starter` | Chạy app mẫu + playground |

## Đã kiểm tra

- Số token khớp Figma: Primitives 158 · Semantic 174 · Component Token 74 · Dimension 91 · 33 text style · 8 effect style (+ 4 vòng focus, elevation/selected theo tài liệu DS).
- 248/248 màu Semantic + Component Token resolve ra đúng mã hex như trong Figma.
- `tsc` không lỗi; Storybook build thành công.
- App mẫu: type-check, build, ESLint + Stylelint sạch; hook không báo lỗi trên mọi file; luật bắt đúng 7/7 lỗi JS và 6/6 lỗi CSS trên file sai mẫu.
- `claude plugin validate` qua cho plugin và marketplace.

## Giới hạn hiện tại

- Stack giả định **React + antd v6**. Stack khác: `@pancake/tokens` dùng nguyên, chỉ viết lại lớp component.
- Chưa có Dark mode (Figma chưa có mode Dark).
- Component chưa có trong DS_AI (Avatar, Drawer, Pagination, Card, Steps, Breadcrumb, Upload, Rate, Chat bubble…) → dùng antd + token, chờ Designer bổ sung.
- Minh hoạ Empty states (48 loại) chưa xuất từ Figma sang SVG.
- Chiều token chỉ đi **Figma → code**. Figma vẫn là nơi sửa token.
# pancake-design-system
