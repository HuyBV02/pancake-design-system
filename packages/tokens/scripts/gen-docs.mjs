#!/usr/bin/env node
/**
 * Sinh bảng tra token cho người và AI agent: dist/docs/tokens.md
 * (tên Figma · CSS var · đường dẫn JS · giá trị · dùng cho). Chạy sau Style Dictionary.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const flat = JSON.parse(readFileSync(join(root, 'dist/json/tokens.flat.json'), 'utf8')); // { "pk-text-default": "#1d2939" }
const read = (f) => JSON.parse(readFileSync(join(root, 'tokens', f), 'utf8'));

function walk(node, path, out) {
  if (node && typeof node === 'object' && '$value' in node) {
    out.push({ path, desc: node.$description ?? '', raw: node.$value });
    return out;
  }
  for (const [k, v] of Object.entries(node)) if (!k.startsWith('$')) walk(v, [...path, k], out);
  return out;
}
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const jsPath = (p) => p.map((k, i) => (/^\d/.test(k) ? `['${k}']` : (i ? '.' : '') + camel(k))).join('');
const row = (t) => {
  const css = `--pk-${t.path.join('-')}`;
  const value = String(flat[css.slice(2)] ?? '').replace(/\|/g, '\\|');
  const ref = typeof t.raw === 'string' && t.raw.startsWith('{') ? ` ← ${t.raw.slice(1, -1).replace(/\./g, '/')}` : '';
  return `| \`${t.path.join('/')}\` | \`var(${css})\` | \`${jsPath(t.path)}\` | ${value}${ref} | ${t.desc} |`;
};
const table = (title, list, note = '') =>
  `## ${title}\n${note ? note + '\n' : ''}\n| Figma | CSS | JS (\`tokens\` / \`cssVar\`) | Giá trị | Dùng cho |\n|---|---|---|---|---|\n${list.map(row).join('\n')}\n`;

const semantic = walk(read('semantic.json'), [], []);
const by = (pre) => semantic.filter((t) => t.path[0] === pre);
const component = walk(read('component.json'), [], []);
const dimension = walk(read('dimension.json'), [], []);
const effects = walk(read('effects.json'), [], []);
const typography = walk(read('typography.json'), [], []);
const primitives = walk(read('primitives.json'), [], []);

const md = [
  '# Token Pancake Web — bảng tra (tự sinh, KHÔNG sửa tay)',
  '',
  '_Nguồn: Figma DS_AI `aScl8gFsM1pWrd0atTwyJM` → `@pancake/tokens/tokens/*.json` (W3C DTCG). Sinh bởi `scripts/gen-docs.mjs`._',
  '',
  '**Cách chọn token:** gắn vào đâu (chữ / icon / nền / viền) → vai trò (brand, neutral, danger…) → trạng thái (rest / hover / pressed / disabled).',
  'Code màn hình dùng **Semantic**; Component Token chỉ dùng trong đúng component đó; **không** dùng Primitives (trừ tag/biểu đồ).',
  '',
  table('Chữ — text/*', by('text')),
  table('Icon — icon/*', by('icon'), 'Icon trong nút / link dùng cùng màu chữ (QĐ #20).'),
  table('Bề mặt — surface/* · overlay/*', [...by('surface'), ...by('overlay')]),
  table('Nền tương tác — bg/*', by('bg'), '`<vai trò>-bold` nền đậm chữ trắng · `-subtle` nền nhạt · `-subtlest` nền rất nhạt (Alert). info/success/warning bold/subtle chỉ cho Alert, Notification, Badge, Tag, Progress.'),
  table('Viền — border/*', by('border')),
  table('Tag & biểu đồ — accent/* · chart/*', [...by('accent'), ...by('chart')]),
  table('Component Token', component, 'Chỉ dùng bên trong đúng component.'),
  table('Khoảng cách, bo góc, kích thước, chữ — Dimension', dimension, 'Khoảng cách chỉ lấy trong thang `space/*`. Bo góc: control 24 → `radius/sm` · 32/40 → `radius/md` · card/panel → `radius/xl` · modal → `radius/xxl` · pill → `radius/rounded`.'),
  table('Typography (font shorthand)', typography, 'Dùng `<Text variant="…">` hoặc `font: var(--pk-typography-…)`. Cỡ 13/11/10 (`dense-*`) chỉ ở vùng mật độ cao.'),
  table('Bóng, vòng focus, blur', effects),
  `## Primitives (chỉ để tham chiếu)\n${[...new Set(primitives.map((t) => t.path[0]))].map((g) => `- **${g}**: ${primitives.filter((t) => t.path[0] === g).map((t) => `${t.path[1]} ${flat['pk-' + t.path.join('-')]}`).join(' · ')}`).join('\n')}\n`,
].join('\n');

mkdirSync(join(root, 'dist/docs'), { recursive: true });
writeFileSync(join(root, 'dist/docs/tokens.md'), md);
console.log(`dist/docs/tokens.md — ${semantic.length + component.length + dimension.length + effects.length + typography.length} token`);
