#!/usr/bin/env node
/**
 * Chuyển dữ liệu xuất từ Figma (figma-export/*.txt) sang token chuẩn W3C DTCG (tokens/*.json).
 *
 * Định dạng mỗi dòng trong figma-export: <tên biến>|<kiểu C/F/S>|<giá trị hoặc {alias}>|<mô tả>
 *   C = COLOR, F = FLOAT, S = STRING. Alias viết {gray/800} như trong Figma.
 *
 * Chạy: node scripts/figma-to-dtcg.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = (f) => readFileSync(join(root, 'figma-export', f), 'utf8');
const FIGMA_FILE = 'aScl8gFsM1pWrd0atTwyJM';

const toRef = (v) => (v.startsWith('{') ? '{' + v.slice(1, -1).split('/').join('.') + '}' : v);

function setPath(obj, path, leaf) {
  let o = obj;
  path.forEach((k, i) => {
    if (i === path.length - 1) o[k] = leaf;
    else o = o[k] ??= {};
  });
}

function dimensionType(name) {
  if (name.startsWith('font/weight')) return 'fontWeight';
  if (name.startsWith('font/family')) return 'fontFamily';
  return 'dimension';
}

function parseVars(file, collection) {
  const out = {};
  for (const line of src(file).split('\n')) {
    if (!line.trim() || line.startsWith('#')) continue;
    const [name, t, raw, desc] = line.split('|');
    const value = toRef(raw);
    let token;
    if (t === 'C') token = { $type: 'color', $value: value };
    else if (t === 'S') token = { $type: 'fontFamily', $value: value };
    else {
      const type = dimensionType(name);
      const num = Number(raw);
      token =
        type === 'dimension'
          ? { $type: 'dimension', $value: { value: num, unit: 'px' } }
          : { $type: type, $value: num };
    }
    if (desc) token.$description = desc.trim();
    token.$extensions = { 'vn.pancake.figma': { file: FIGMA_FILE, collection, variable: name } };
    setPath(out, name.split('/'), token);
  }
  return out;
}

// ---------- Text styles → typography composite ----------
const weightRef = { Light: 300, Regular: '{font.weight.regular}', Medium: '{font.weight.medium}', Bold: '{font.weight.bold}' };
const sizeGroup = {
  46: 'heading.2xl', 38: 'heading.xl', 30: 'heading.lg', 24: 'heading.md', 20: 'heading.sm',
  16: 'heading.xs', 14: 'body.md', 12: 'body.sm', 13: 'dense.md', 11: 'dense.sm', 10: 'dense.xs',
};
function parseStyles() {
  const typography = {};
  const effects = {};
  let mode = null;
  for (const line of src('styles.txt').split('\n')) {
    if (line.startsWith('#TEXT')) { mode = 'text'; continue; }
    if (line.startsWith('#EFFECT')) { mode = 'effect'; continue; }
    if (!line.trim()) continue;
    if (mode === 'text') {
      const [name, family, style, size] = line.split('|');
      const mono = family.includes('Mono');
      const group = mono ? (Number(size) === 14 ? 'code.md' : 'code.sm') : sizeGroup[size];
      const decoration = name.includes('underline') ? 'underline' : name.includes('strikethrough') ? 'line-through' : undefined;
      const key = name
        .replace(/^H\d - \d+\//, (m) => m.split(' ')[0].toLowerCase() + '-')
        .replace(/^Title 16\//, 'title-16-').replace(/^Body 14\//, 'body-14-')
        .replace(/^Footnote 12\//, 'footnote-12-').replace(/^Dense (\d+)\//, 'dense-$1-')
        .toLowerCase();
      const token = {
        $type: 'typography',
        $value: {
          fontFamily: mono ? '{font.family.mono}' : '{font.family.sans}',
          fontWeight: weightRef[style] ?? '{font.weight.regular}',
          fontSize: `{font.${group}.size}`,
          lineHeight: `{font.${group}.line-height}`,
          letterSpacing: { value: 0, unit: 'px' },
        },
        $extensions: { 'vn.pancake.figma': { file: FIGMA_FILE, textStyle: name, ...(decoration && { textDecoration: decoration }) } },
      };
      typography[key] = token;
    } else if (mode === 'effect') {
      const [name, json] = line.split('|');
      effects[name] = JSON.parse(json);
    }
  }
  return { typography, effects };
}

const { typography, effects } = parseStyles();
const shadow = (fx) =>
  fx.map((e) => ({ color: e.c, offsetX: { value: e.x, unit: 'px' }, offsetY: { value: e.y, unit: 'px' }, blur: { value: e.b, unit: 'px' }, spread: { value: e.s, unit: 'px' } }));
const fxToken = (style, desc) => ({
  $type: 'shadow', $value: shadow(effects[style]), $description: desc,
  $extensions: { 'vn.pancake.figma': { file: FIGMA_FILE, effectStyle: style } },
});
const ring = (color, desc) => ({
  $type: 'shadow', $description: desc,
  $value: [{ color, offsetX: { value: 0, unit: 'px' }, offsetY: { value: 0, unit: 'px' }, blur: { value: 0, unit: 'px' }, spread: { value: 4, unit: 'px' } }],
});
const effectTokens = {
  elevation: {
    raised: fxToken('Drop-Shadow/0.15', 'Dòng bảng khi hover, card gói khuyến nghị'),
    overlay: fxToken('Drop-Shadow/0.12+0.8+0.5', 'Dropdown, popover, modal, message, notification'),
    selected: {
      $type: 'shadow', $description: 'Item segmented đang chọn',
      $value: [{ color: '#0000000d', offsetX: { value: 0, unit: 'px' }, offsetY: { value: 2, unit: 'px' }, blur: { value: 8, unit: 'px' }, spread: { value: 0, unit: 'px' } }],
    },
    'button-primary': fxToken('Drop-Shadow/button-primary', 'Nút Primary'),
    'button-default': fxToken('Drop-Shadow/button-secondary', 'Nút Tertiary (có viền)'),
  },
  focus: {
    brand: ring('#6399f233', 'Vòng focus nút Primary / Tertiary Blue, input focus'),
    danger: ring('{crimson.50}', 'Vòng focus nút Negative'),
    neutral: ring('#8496b41a', 'Vòng focus nút Tertiary Gray'),
    control: ring('{blue.50}', 'Vòng focus checkbox, radio'),
  },
  blur: Object.fromEntries(
    ['sm', 'md', 'lg', 'xl'].map((k) => [k, {
      $type: 'dimension', $value: { value: effects[`Background blur/${k}`][0].r, unit: 'px' },
      $extensions: { 'vn.pancake.figma': { file: FIGMA_FILE, effectStyle: `Background blur/${k}` } },
    }]),
  ),
};

const files = {
  'primitives.json': parseVars('primitives.txt', 'Primitives'),
  'semantic.json': parseVars('semantic.txt', 'Semantic'),
  'component.json': parseVars('component.txt', 'Component Token'),
  'dimension.json': parseVars('dimension.txt', 'Dimension'),
  'typography.json': { typography },
  'effects.json': effectTokens,
};

mkdirSync(join(root, 'tokens'), { recursive: true });
for (const [f, data] of Object.entries(files)) {
  writeFileSync(join(root, 'tokens', f), JSON.stringify(data, null, 2) + '\n');
}
const count = (o) => Object.values(o).reduce((n, v) => n + (v && v.$value !== undefined ? 1 : typeof v === 'object' ? count(v) : 0), 0);
console.log(Object.entries(files).map(([f, d]) => `${f}: ${count(d)} token`).join('\n'));
