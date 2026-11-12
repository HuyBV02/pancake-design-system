/**
 * Style Dictionary — sinh token cho từng nền tảng từ tokens/*.json (W3C DTCG).
 *
 *   dist/css/tokens.css        CSS variables --pk-* (semantic tham chiếu primitive bằng var())
 *   dist/js/tokens.js|.d.ts    Giá trị đã resolve + tên CSS var, dạng object lồng nhau
 *   dist/json/tokens.flat.json Bảng phẳng tên → giá trị (cho công cụ khác, AI agent)
 *   dist/tailwind/preset.js    Preset Tailwind v3
 *   dist/tailwind/theme.css    @theme cho Tailwind v4
 *
 * Chạy: node style-dictionary.config.mjs
 */
import StyleDictionary from 'style-dictionary';

const PREFIX = 'pk';
const FONT_FALLBACK = {
  Roboto: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  'Roboto Mono': "'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
};

// DTCG 2025: dimension = { value, unit } → "8px" để mọi định dạng đầu ra dùng được.
const isDim = (v) => v && typeof v === 'object' && 'unit' in v && 'value' in v && Object.keys(v).length === 2;
function flattenDims(node) {
  if (Array.isArray(node)) return node.map(flattenDims);
  if (isDim(node)) return `${node.value}${node.unit}`;
  if (node && typeof node === 'object') {
    for (const k of Object.keys(node)) if (k !== '$extensions') node[k] = flattenDims(node[k]);
  }
  return node;
}
StyleDictionary.registerPreprocessor({ name: 'pk/dtcg-dimension', preprocessor: (d) => flattenDims(d) });

StyleDictionary.registerTransform({
  name: 'pk/font-family-stack',
  type: 'value',
  transitive: true,
  filter: (t) => t.$type === 'fontFamily',
  transform: (t) => FONT_FALLBACK[t.$value ?? t.value] ?? t.$value ?? t.value,
});

// ---------- JS: object lồng nhau, giá trị đã resolve + tên CSS var ----------
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
function nest(tokens, pick) {
  const out = {};
  for (const t of tokens) {
    let o = out;
    t.path.forEach((p, i) => {
      const k = /^\d/.test(p) ? p : camel(p);
      if (i === t.path.length - 1) o[k] = pick(t);
      else o = o[k] ??= {};
    });
  }
  return out;
}
StyleDictionary.registerFormat({
  name: 'pk/js-module',
  format: ({ dictionary }) => {
    const header = '/** Tự sinh từ @pancake/tokens — KHÔNG sửa tay. Nguồn: Figma DS_AI aScl8gFsM1pWrd0atTwyJM */\n';
    const values = nest(dictionary.allTokens, (t) => t.$value ?? t.value);
    const vars = nest(dictionary.allTokens, (t) => `var(--${t.name})`);
    const flat = Object.fromEntries(dictionary.allTokens.map((t) => [t.path.join('/'), t.$value ?? t.value]));
    return (
      header +
      `export const tokens = ${JSON.stringify(values, null, 2)};\n\n` +
      `/** Tên CSS variable tương ứng — dùng khi cần theo theme runtime: style={{ color: cssVar.text.default }} */\n` +
      `export const cssVar = ${JSON.stringify(vars, null, 2)};\n\n` +
      `/** Tra theo đúng tên biến Figma: byFigmaName['bg/brand-bold/rest'] */\n` +
      `export const byFigmaName = ${JSON.stringify(flat, null, 2)};\n\n` +
      'export default tokens;\n'
    );
  },
});
StyleDictionary.registerFormat({
  name: 'pk/js-dts',
  format: ({ dictionary }) => {
    const shape = (obj, ind = '  ') =>
      '{\n' +
      Object.entries(obj)
        .map(([k, v]) => `${ind}${/^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${typeof v === 'object' && !Array.isArray(v) ? shape(v, ind + '  ') : 'string'};`)
        .join('\n') +
      `\n${ind.slice(2)}}`;
    const values = nest(dictionary.allTokens, () => 's');
    const names = dictionary.allTokens.map((t) => JSON.stringify(t.path.join('/'))).join(' | ');
    return (
      '/** Tự sinh từ @pancake/tokens — KHÔNG sửa tay. */\n' +
      `export type PancakeTokens = ${shape(values)};\n` +
      `export type FigmaTokenName = ${names};\n` +
      'export declare const tokens: PancakeTokens;\n' +
      'export declare const cssVar: PancakeTokens;\n' +
      'export declare const byFigmaName: Record<FigmaTokenName, string>;\n' +
      'export default tokens;\n'
    );
  },
});

// ---------- Tailwind ----------
const isColor = (t) => t.$type === 'color';
const twKey = (t) => t.path.join('-');
StyleDictionary.registerFormat({
  name: 'pk/tailwind-preset',
  format: ({ dictionary }) => {
    const pick = (f) => Object.fromEntries(dictionary.allTokens.filter(f).map((t) => [twKey(t), `var(--${t.name})`]));
    const strip = (f, prefix) =>
      Object.fromEntries(dictionary.allTokens.filter(f).map((t) => [t.path.slice(1).join('-'), `var(--${t.name})`]));
    const preset = {
      theme: {
        colors: { transparent: 'transparent', current: 'currentColor', ...pick(isColor) },
        spacing: strip((t) => t.path[0] === 'space'),
        borderRadius: strip((t) => t.path[0] === 'radius'),
        borderWidth: strip((t) => t.path[0] === 'border-width'),
        fontFamily: { sans: 'var(--pk-font-family-sans)', mono: 'var(--pk-font-family-mono)' },
        fontWeight: strip((t) => t.path[0] === 'font' && t.path[1] === 'weight'),
        boxShadow: Object.fromEntries(
          dictionary.allTokens.filter((t) => t.$type === 'shadow').map((t) => [t.path.join('-'), `var(--${t.name})`]),
        ),
        extend: {
          fontSize: Object.fromEntries(
            dictionary.allTokens
              .filter((t) => t.path[0] === 'font' && t.path.at(-1) === 'size')
              .map((t) => {
                const key = t.path.slice(1, -1).join('-');
                return [key, [`var(--${t.name})`, { lineHeight: `var(--${t.name.replace(/-size$/, '-line-height')})` }]];
              }),
          ),
        },
      },
    };
    return `/** Tự sinh — Tailwind v3 preset. Cần import '@pancake/tokens/css' trước. */\nexport default ${JSON.stringify(preset, null, 2)};\n`;
  },
});
StyleDictionary.registerFormat({
  name: 'pk/tailwind-v4-theme',
  format: ({ dictionary }) => {
    const line = (k, t) => `  --${k}: var(--${t.name});`;
    const out = [];
    for (const t of dictionary.allTokens) {
      const [g] = t.path;
      if (isColor(t)) out.push(line(`color-${twKey(t)}`, t));
      else if (g === 'space') out.push(line(`spacing-${t.path[1]}`, t));
      else if (g === 'radius') out.push(line(`radius-${t.path[1]}`, t));
      else if (t.$type === 'shadow') out.push(line(`shadow-${twKey(t)}`, t));
      else if (g === 'font' && t.path.at(-1) === 'size') out.push(line(`text-${t.path.slice(1, -1).join('-')}`, t));
      else if (g === 'font' && t.path.at(-1) === 'line-height')
        out.push(line(`text-${t.path.slice(1, -1).join('-')}--line-height`, t));
    }
    return (
      "/** Tự sinh — Tailwind v4: @import '@pancake/tokens/css'; @import '@pancake/tokens/dist/tailwind/theme.css'; */\n" +
      '@theme inline {\n  --color-*: initial;\n  --font-sans: var(--pk-font-family-sans);\n  --font-mono: var(--pk-font-family-mono);\n' +
      out.join('\n') +
      '\n}\n'
    );
  },
});

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  preprocessors: ['pk/dtcg-dimension'],
  log: { verbosity: 'default', warnings: 'warn' },
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['attribute/cti', 'name/kebab', 'pk/font-family-stack', 'color/css', 'shadow/css/shorthand', 'typography/css/shorthand'],
      prefix: PREFIX,
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            fileHeader: () => ['Tự sinh từ @pancake/tokens — KHÔNG sửa tay', 'Nguồn: Figma Pancake-Design-System_AI (aScl8gFsM1pWrd0atTwyJM) · DS v1.3'],
          },
        },
      ],
    },
    js: {
      transforms: ['attribute/cti', 'name/kebab', 'pk/font-family-stack', 'color/css', 'shadow/css/shorthand', 'typography/css/shorthand'],
      prefix: PREFIX,
      buildPath: 'dist/',
      files: [
        { destination: 'js/tokens.js', format: 'pk/js-module' },
        { destination: 'js/tokens.d.ts', format: 'pk/js-dts' },
        { destination: 'json/tokens.flat.json', format: 'json/flat' },
        { destination: 'tailwind/preset.js', format: 'pk/tailwind-preset' },
        { destination: 'tailwind/theme.css', format: 'pk/tailwind-v4-theme' },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
