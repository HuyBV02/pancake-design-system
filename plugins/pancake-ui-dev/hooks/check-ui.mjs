#!/usr/bin/env node
/**
 * Hook PostToolUse (Claude Code) — chạy sau mỗi lần AI ghi / sửa file giao diện.
 * Phát hiện lệch Design System Pancake và trả lỗi (exit 2) để AI tự sửa ngay.
 * Không cần cài gì thêm; luật đầy đủ hơn nằm ở @pancake/lint (ESLint + Stylelint).
 */
import { readFileSync, existsSync } from 'node:fs';

let input = '';
for await (const chunk of process.stdin) input += chunk;
let file;
try {
  const data = JSON.parse(input || '{}');
  file = data.tool_input?.file_path ?? data.tool_input?.path;
} catch {
  process.exit(0);
}
if (!file || !existsSync(file)) process.exit(0);
if (!/\.(tsx|jsx|ts|js|css|scss|less)$/.test(file)) process.exit(0);
// Bỏ qua: thư viện DS, file sinh tự động, cấu hình, test.
// Bỏ qua bản preview y hệt Figma (chế độ figma-exact).
if (/playground\/figma-exact\//.test(file)) process.exit(0);
if (/node_modules|\/dist\/|packages\/(ui|tokens|lint)\/|\.config\.|\.d\.ts$|\.(test|spec|stories)\./.test(file)) process.exit(0);

const isStyle = /\.(css|scss|less)$/.test(file);
const isLocalDs = /components\/ds-local\//.test(file);
const lines = readFileSync(file, 'utf8').split('\n');
const issues = [];
const add = (i, msg) => issues.push(`  ${file}:${i + 1} — ${msg}`);

const SPACING_JS = /\b(padding\w*|margin\w*|gap|rowGap|columnGap|borderRadius|border\w*Radius|fontSize|lineHeight|fontWeight|letterSpacing)\s*:\s*(['"`]?)(\d*\.?\d+)(px|rem|em)?\2/;
const SPACING_CSS = /^\s*(padding[\w-]*|margin[\w-]*|gap|row-gap|column-gap|border(-[\w]+)?-radius|font-size|line-height|letter-spacing)\s*:\s*[^;]*\b\d*\.?\d+(px|rem|em)\b/;

lines.forEach((line, i) => {
  const code = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');
  if (/^\s*(\*|\/\*)/.test(line)) return;
  const hexJs = /['"`]#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(['"`\s;,)])/;
  const hexCss = /:[^;{]*#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;
  if (isStyle ? hexCss.test(code) : hexJs.test(code) || hexCss.test(code) && /`/.test(code))
    add(i, 'mã màu hex → dùng token màu (var(--pk-…) / cssVar.…).');
  if (/\b(rgb|rgba|hsl|hsla)\(/.test(code)) add(i, 'rgb()/hsl() → dùng token màu.');
  if (isStyle) {
    for (const decl of code.split(/[;{}]/)) {
      if (SPACING_CSS.test(decl)) add(i, `"${decl.trim()}" → var(--pk-space-*), var(--pk-radius-*), var(--pk-typography-*).`);
      if (/^\s*font-family\s*:(?!\s*var\(--pk-font-family)/.test(decl)) add(i, 'font-family tự đặt → var(--pk-font-family-sans).');
      if (/^\s*font-weight\s*:\s*\d/.test(decl)) add(i, 'font-weight số → var(--pk-font-weight-*).');
    }
  } else {
    const m = code.match(SPACING_JS);
    if (m && !(m[3] === '0' && !m[4])) add(i, `${m[1]}: ${m[3]}${m[4] ?? ''} tự đặt → dùng token (cssVar.space['…'], cssVar.radius.…, <Text variant>).`);
    if (/\bfontFamily\s*:/.test(code)) add(i, 'fontFamily tự đặt → bỏ, Roboto đã có qua token.');
    if (!isLocalDs && /from\s+['"](antd|antd\/[^'"]*|@ant-design\/[^'"]*)['"]/.test(code))
      add(i, 'import antd trực tiếp → import từ @pancake/ui (chưa có trong DS → src/components/ds-local/).');
    if (/from\s+['"](@mui\/|@chakra-ui\/|react-icons|lucide-react|@heroicons\/)/.test(code))
      add(i, 'thư viện UI / icon ngoài → chỉ dùng @pancake/ui và @phosphor-icons/react.');
  }
});

if (issues.length) {
  console.error(
    `Pancake DS: ${issues.length} chỗ lệch Design System trong file vừa sửa — sửa trước khi làm tiếp:\n` +
      issues.slice(0, 20).join('\n') +
      (issues.length > 20 ? `\n  … và ${issues.length - 20} chỗ khác` : '') +
      '\nTra token: references/tokens.md của skill pancake-ui-dev.',
  );
  process.exit(2);
}
process.exit(0);
