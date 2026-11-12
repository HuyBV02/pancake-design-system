#!/usr/bin/env node
/**
 * Kéo Variables mới nhất từ Figma DS_AI về figma-export/*.txt rồi build lại token.
 *
 * Cách 1 — Figma REST API (cần gói Figma Enterprise + personal access token có scope file_variables:read):
 *   FIGMA_TOKEN=xxx node scripts/pull-figma.mjs && npm run build
 *
 * Cách 2 — không có Enterprise: mở file DS_AI → Plugins → Development → chạy scripts/figma-plugin-export.js
 *   (hoặc nhờ Claude chạy qua Figma MCP), dán kết quả vào figma-export/*.txt, rồi `npm run build`.
 *
 * Text style / effect style không có trong Variables API → giữ figma-export/styles.txt, cập nhật khi Designer đổi style.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE = process.env.FIGMA_FILE ?? 'aScl8gFsM1pWrd0atTwyJM';
const TOKEN = process.env.FIGMA_TOKEN;
if (!TOKEN) {
  console.error('Thiếu FIGMA_TOKEN. Xem hướng dẫn ở đầu file.');
  process.exit(1);
}
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const res = await fetch(`https://api.figma.com/v1/files/${FILE}/variables/local`, { headers: { 'X-Figma-Token': TOKEN } });
if (!res.ok) {
  console.error(`Figma trả về ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const { meta } = await res.json();
const { variables, variableCollections } = meta;

const hex = ({ r, g, b, a }) => {
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return '#' + h(r) + h(g) + h(b) + (a !== undefined && a < 1 ? h(a) : '');
};
const TYPE = { COLOR: 'C', FLOAT: 'F', STRING: 'S', BOOLEAN: 'B' };
const OUT = { Primitives: 'primitives.txt', Semantic: 'semantic.txt', 'Component Token': 'component.txt', Dimension: 'dimension.txt' };

for (const col of Object.values(variableCollections)) {
  const file = OUT[col.name];
  if (!file) continue; // bỏ qua ⛔ Legacy
  const mode = col.defaultModeId;
  const lines = col.variableIds.map((id) => {
    const v = variables[id];
    let val = v.valuesByMode[mode];
    if (val?.type === 'VARIABLE_ALIAS') val = `{${variables[val.id]?.name ?? val.id}}`;
    else if (v.resolvedType === 'COLOR') val = hex(val);
    const desc = (v.description ?? '').split('·')[0].replace(/\s*→.*$/, '').trim();
    return [v.name, TYPE[v.resolvedType], val, desc].filter((x, i) => i < 3 || x).join('|');
  });
  writeFileSync(join(root, 'figma-export', file), lines.join('\n') + '\n');
  console.log(`${col.name}: ${lines.length} biến → figma-export/${file}`);
}
