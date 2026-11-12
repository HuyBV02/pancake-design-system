#!/usr/bin/env node
/**
 * Đồng bộ tài liệu của skill pancake-ui-dev từ nguồn thật (chạy sau mỗi lần đổi token hoặc recipe):
 *  - references/tokens.md   ← packages/tokens/dist/docs/tokens.md
 *  - references/recipes.md  ← examples/pancake-app-starter/src/{recipes,playground,components/ds-local}
 *  - references/figma-exact-example.md ← examples/pancake-app-starter/src/playground/figma-exact/3066-sticker-popover
 *  - templates/*            ← examples/pancake-app-starter (AGENTS.md, CLAUDE.md, .cursor, .github, cấu hình lint)
 * Chạy: npm run skill
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skill = join(root, 'plugins/pancake-ui-dev/skills/pancake-ui-dev');
const starter = join(root, 'examples/pancake-app-starter');
const read = (p) => readFileSync(join(starter, p), 'utf8');

copyFileSync(join(root, 'packages/tokens/dist/docs/tokens.md'), join(skill, 'references/tokens.md'));
copyFileSync(join(root, 'DESIGN.md'), join(skill, 'references/DESIGN.md'));

const doc = (code) => (code.match(/^\/\*\*([\s\S]*?)\*\//) ?? [, ''])[1].split('\n').map((l) => l.replace(/^\s*\*\s?/, '')).join('\n').trim();
const block = (title, path, lang = 'tsx') => `### ${title}\n_File mẫu: \`examples/pancake-app-starter/${path}\`_\n\n${doc(read(path))}\n\n\`\`\`${lang}\n${read(path).trim()}\n\`\`\`\n`;

const recipes = [
  '# Recipes — khung code cho màn hay gặp (tự sinh từ app mẫu, KHÔNG sửa tay)',
  '',
  'Mọi đoạn dưới đây đã chạy, qua type-check và `@pancake/lint`. Chép rồi đổi dữ liệu / chữ theo requirement; giữ nguyên cấu trúc và token.',
  'Import trong recipe dùng đường dẫn tương đối của app mẫu — đổi cho khớp repo.',
  '',
  '## Mục lục',
  '1. Khung app · 2. Trạng thái dữ liệu · 3. Trang cài đặt có bảng · 4. Modal form · 5. Xác nhận xoá · 6. Drawer cài đặt · 7. Danh sách hội thoại + chat · 8. Component tạm (ds-local) · 9. Playground · 10. Ví dụ đầy đủ: #3416 Lọc hội thoại',
  '',
  block('1. Khung app', 'src/recipes/AppShell.tsx'),
  block('2. Trạng thái dữ liệu (tải / lỗi / trống)', 'src/recipes/DataState.tsx'),
  block('3. Trang cài đặt có bảng', 'src/recipes/SettingsTablePage.tsx'),
  block('4. Modal form', 'src/recipes/FormModal.tsx'),
  block('5. Xác nhận xoá', 'src/recipes/useConfirmDelete.tsx'),
  block('6. Drawer cài đặt nhiều mục', 'src/recipes/SettingsDrawer.tsx'),
  block('7. Danh sách hội thoại + bong bóng chat', 'src/recipes/ConversationList.tsx'),
  `#### CSS đi kèm\n\`\`\`css\n${read('src/recipes/conversation.css').trim()}\n\`\`\`\n`,
  block('8. Component tạm cho phần DS chưa có (src/components/ds-local)', 'src/components/ds-local/index.tsx'),
  block('9. Playground — lên design trong code', 'src/playground/Playground.tsx'),
  `Đăng màn mới vào playground:\n\`\`\`tsx\n${read('src/playground/the-hoi-thoai.tsx').trim()}\n\`\`\`\n\nRoute chỉ bật khi dev (\`src/App.tsx\`):\n\`\`\`tsx\n${read('src/App.tsx').trim()}\n\`\`\`\n`,
  block('10. Ví dụ đầy đủ — #3416 Lọc hội thoại theo nguồn (4 trạng thái)', 'src/playground/3416-loc-hoi-thoai.tsx'),
].join('\n');
writeFileSync(join(skill, 'references/recipes.md'), recipes);

// Mẫu chế độ figma-exact (#3066) — mang theo trong skill để dùng được cả khi không có app mẫu.
const fx = 'src/playground/figma-exact/3066-sticker-popover';
writeFileSync(join(skill, 'references/figma-exact-example.md'), [
  '# Mẫu dựng y hệt Figma — #3066 Sticker Popover (tự sinh từ app mẫu, KHÔNG sửa tay)',
  '',
  'Frame `27:27391` (file `8NXSgaDqKxd60cCpuZN2be`, 1440×900). Quy trình: `figma-exact.md`. Asset nằm ở `public/figma-3066/` của app mẫu.',
  '',
  `## index.tsx\n\`\`\`tsx\n${read(fx + '/index.tsx').trim()}\n\`\`\`\n`,
  `## data.ts\n\`\`\`ts\n${read(fx + '/data.ts').trim()}\n\`\`\`\n`,
  `## 3066.css\n\`\`\`css\n${read(fx + '/3066.css').trim()}\n\`\`\`\n`,
].join('\n'));

// Bản tài liệu đi kèm npm package @pancake/ui (để Cursor / Copilot / Codex đọc từ node_modules)
const uiDocs = join(root, 'packages/ui/docs');
mkdirSync(uiDocs, { recursive: true });
for (const f of ['components.md', 'rules.md', 'recipes.md', 'checklist.md']) copyFileSync(join(skill, 'references', f), join(uiDocs, f));
copyFileSync(join(root, 'DESIGN.md'), join(uiDocs, 'DESIGN.md'));

const tpl = join(root, 'plugins/pancake-ui-dev/templates');
for (const f of ['AGENTS.md', 'CLAUDE.md', 'eslint.config.js', 'stylelint.config.js']) {
  mkdirSync(tpl, { recursive: true });
  copyFileSync(join(starter, f), join(tpl, f));
}
mkdirSync(join(tpl, '.cursor/rules'), { recursive: true });
copyFileSync(join(starter, '.cursor/rules/pancake-ui.mdc'), join(tpl, '.cursor/rules/pancake-ui.mdc'));
mkdirSync(join(tpl, '.github'), { recursive: true });
copyFileSync(join(starter, '.github/copilot-instructions.md'), join(tpl, '.github/copilot-instructions.md'));
console.log('Đã đồng bộ: tokens.md, recipes.md, templates/', readdirSync(tpl).map((f) => basename(f)).join(', '));
