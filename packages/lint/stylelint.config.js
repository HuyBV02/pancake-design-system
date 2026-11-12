/**
 * @pancake/lint/stylelint — CSS chỉ dùng token Pancake.
 *
 * Dùng trong repo sản phẩm (stylelint.config.js):
 *   export { default } from '@pancake/lint/stylelint';
 */
const HINT = 'Dùng token var(--pk-*) — tra trong @pancake/tokens/docs (tokens.md).';

export default {
  // Bản preview y hệt Figma: chép nguyên giá trị Figma, không áp luật token.
  ignoreFiles: ['**/playground/figma-exact/**'],
  rules: {
    'color-no-hex': [true, { message: `Không dùng mã màu hex. ${HINT}` }],
    'color-named': ['never', { message: `Không dùng tên màu. ${HINT}` }],
    'function-disallowed-list': [['rgb', 'rgba', 'hsl', 'hsla'], { message: `Không dùng rgb()/hsl(). ${HINT}` }],
    'declaration-property-unit-disallowed-list': [
      {
        '/^(padding|margin|gap|row-gap|column-gap|inset|border-radius|font-size|line-height|letter-spacing)/': ['px', 'rem', 'em'],
      },
      { message: `Không dùng đơn vị tự đặt cho khoảng cách / bo góc / chữ. ${HINT}` },
    ],
    'declaration-property-value-disallowed-list': [
      {
        'font-family': ['/^(?!var\\(--pk-font-family)/'],
        'font-weight': ['/^\\d+$/', 'bold', 'bolder', 'lighter'],
        'box-shadow': ['/^(?!none|var\\().*/'],
      },
      { message: `Dùng token: font → var(--pk-font-family-*), độ đậm → var(--pk-font-weight-*), bóng → var(--pk-elevation-*) / var(--pk-focus-*). ${HINT}` },
    ],
  },
};
