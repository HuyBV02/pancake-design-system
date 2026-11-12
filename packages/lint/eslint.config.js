/**
 * @pancake/lint/eslint — giữ code giao diện đúng Design System Pancake.
 *
 * Dùng trong repo sản phẩm (eslint.config.js):
 *   import pancake from '@pancake/lint/eslint';
 *   export default [...pancake, { ...luật riêng của repo }];
 *
 * Luật:
 *  1. Không import thư viện UI trực tiếp (antd, @ant-design/*, MUI, Chakra, icon khác) — dùng @pancake/ui, @phosphor-icons/react.
 *     Ngoại lệ: thư mục src/components/ds-local/ (component chưa có trong DS, ghi TODO(DS)).
 *  Ngoại lệ chung: src/playground/figma-exact/** — bản preview y hệt Figma (chép nguyên giá trị Figma).
 *  2. Không mã màu hex / rgb / hsl trong code — dùng token (cssVar, var(--pk-*)).
 *  3. Không số tự đặt cho khoảng cách, bo góc, cỡ chữ, độ đậm trong style — dùng token.
 *  4. Không đặt fontFamily tự do — Roboto đã có sẵn qua token.
 */
import tseslint from 'typescript-eslint';

const COLOR_HINT = 'Tra @pancake/tokens/docs (tokens.md) — vd. cssVar.text.subtle, var(--pk-border-subtle).';
const SIZE_HINT = 'Tra @pancake/tokens/docs (tokens.md) — vd. cssVar.space["150"], var(--pk-radius-md), <Text variant="…">.';
const SPACING_KEYS =
  '^(padding|paddingTop|paddingRight|paddingBottom|paddingLeft|paddingInline|paddingBlock|paddingInlineStart|paddingInlineEnd|paddingBlockStart|paddingBlockEnd|margin|marginTop|marginRight|marginBottom|marginLeft|marginInline|marginBlock|marginInlineStart|marginInlineEnd|marginBlockStart|marginBlockEnd|gap|rowGap|columnGap|borderRadius|borderTopLeftRadius|borderTopRightRadius|borderBottomLeftRadius|borderBottomRightRadius|fontSize|lineHeight|fontWeight|letterSpacing)$';
const HEX = '#[0-9a-fA-F]{3,8}\\b';

const restrictedImports = {
  paths: [
    { name: 'antd', message: 'Import component từ @pancake/ui (đã gắn theme Pancake). Component chưa có trong DS → bọc trong src/components/ds-local/.' },
  ],
  patterns: [
    { group: ['antd/*', '@ant-design/*'], message: 'Import từ @pancake/ui. Chưa có trong DS → src/components/ds-local/.' },
    { group: ['@mui/*', '@chakra-ui/*', '@radix-ui/themes', '@mantine/*', 'react-bootstrap', 'semantic-ui-react'], message: 'Pancake chỉ dùng @pancake/ui.' },
    { group: ['react-icons', 'react-icons/*', 'lucide-react', '@heroicons/*', '@tabler/icons-react', '@ant-design/icons'], message: 'Icon Pancake là Phosphor: import từ @phosphor-icons/react, hiển thị qua <Icon as={…} />.' },
  ],
};

const restrictedSyntax = [
  { selector: `Literal[value=/${HEX}/]`, message: `Không dùng mã màu hex — dùng token màu. ${COLOR_HINT}` },
  { selector: `TemplateElement[value.raw=/${HEX}/]`, message: `Không dùng mã màu hex — dùng token màu. ${COLOR_HINT}` },
  { selector: 'Literal[value=/\\b(rgb|rgba|hsl|hsla)\\(/]', message: `Không dùng rgb()/hsl() — dùng token màu. ${COLOR_HINT}` },
  { selector: `Property[key.name=/${SPACING_KEYS}/] > Literal[raw=/^[1-9]/]`, message: `Không dùng số tự đặt cho khoảng cách / bo góc / chữ — dùng token. ${SIZE_HINT}` },
  { selector: `Property[key.name=/${SPACING_KEYS}/] > Literal[value=/^\\d+(\\.\\d+)?(px|rem|em)( |$)/]`, message: `Không dùng px/rem tự đặt cho khoảng cách / bo góc / chữ — dùng token. ${SIZE_HINT}` },
  { selector: 'Property[key.name="fontFamily"] > Literal', message: 'Không đặt fontFamily — Roboto đã có qua token (var(--pk-font-family-sans)).' },
];

export default [
  { ignores: ['**/dist/**', '**/build/**', '**/node_modules/**', '**/storybook-static/**', '**/*.d.ts'] },
  ...tseslint.configs.recommended.map((c) => ({ ...c, files: ['**/*.{ts,tsx,js,jsx,mjs}'] })),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: {
      'no-restricted-imports': ['error', restrictedImports],
      'no-restricted-syntax': ['error', ...restrictedSyntax],
    },
  },
  {
    // Component tạm cho phần DS chưa có: được import antd, vẫn phải dùng token.
    files: ['**/components/ds-local/**'],
    rules: { 'no-restricted-imports': 'off' },
  },
  {
    // Chế độ "dựng y hệt Figma để preview": chép nguyên số đo/màu Figma. Chỉ preview, KHÔNG phải code sản phẩm.
    files: ['**/playground/figma-exact/**'],
    rules: { 'no-restricted-syntax': 'off', 'no-restricted-imports': 'off' },
  },
  {
    // File cấu hình, script build: không áp luật giao diện.
    files: ['**/*.config.{js,ts,mjs}', '**/scripts/**'],
    rules: { 'no-restricted-syntax': 'off' },
  },
];
