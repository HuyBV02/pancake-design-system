import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const { render } = await import('./.ssr/index.js');
const { sections, css } = render();
const tokensCss = readFileSync(new URL('../dist/styles.css', import.meta.url), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const groups = [...new Set(sections.map((s) => s.group))];
const nav = groups.map((g) => `<div class="g">${esc(g)}</div>` + sections.filter((s) => s.group === g).map((s) => `<a href="#${s.id}">${esc(s.name)}</a>`).join('')).join('');
const body = sections.map((s) => `<section id="${s.id}" class="story${s.full ? ' full' : ''}"><header><span>${esc(s.group)}</span> / <b>${esc(s.name)}</b></header><div class="canvas">${s.html}</div></section>`).join('\n');
const html = `<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pancake UI · Design System Web (code)</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Mono&display=swap" rel="stylesheet">
<style>${tokensCss}</style>
${css}
<style>
body{margin:0;font-family:var(--pk-font-family-sans);background:var(--pk-surface-subtle)}
.side{position:fixed;inset:0 auto 0 0;width:248px;overflow:auto;background:var(--pk-surface-default);border-right:1px solid var(--pk-border-subtlest);padding:var(--pk-space-300) var(--pk-space-200)}
.side h1{font:var(--pk-typography-title-16-medium);color:var(--pk-text-strong);margin:0 0 4px}
.side p{font:var(--pk-typography-footnote-12-regular);color:var(--pk-text-subtlest);margin:0 0 var(--pk-space-200)}
.side .g{font:var(--pk-typography-footnote-12-medium);color:var(--pk-text-subtlest);margin:var(--pk-space-200) 0 var(--pk-space-050);text-transform:uppercase;letter-spacing:.02em}
.side a{display:block;padding:var(--pk-space-075) var(--pk-space-100);border-radius:var(--pk-radius-sm);font:var(--pk-typography-body-14-regular);color:var(--pk-text-default);text-decoration:none}
.side a:hover{background:var(--pk-bg-item-hover)}
main{margin-left:280px;padding:var(--pk-space-300)}
.story{margin-bottom:var(--pk-space-400);scroll-margin-top:var(--pk-space-200)}
.story header{font:var(--pk-typography-footnote-12-regular);color:var(--pk-text-subtlest);margin-bottom:var(--pk-space-100)}
.story header b{color:var(--pk-text-default);font-weight:500}
.canvas{background:var(--pk-surface-default);border:1px solid var(--pk-border-subtlest);border-radius:var(--pk-radius-xl);padding:var(--pk-space-300);overflow:auto}
.story.full .canvas{padding:0}
</style></head><body>
<nav class="side"><h1>Pancake UI</h1><p>DS_AI v1.3 · @pancake/tokens 1.3.0 · @pancake/ui 0.1.0<br>Bản xem tĩnh — rê chuột xem hover. Bản tương tác: npm run storybook</p>${nav}</nav>
<main>${body}</main></body></html>`;
mkdirSync(new URL('./out/', import.meta.url), { recursive: true });
writeFileSync(new URL('./out/index.html', import.meta.url), html);
console.log('sections', sections.length, 'html KB', Math.round(html.length / 1024), 'antd css KB', Math.round(css.length / 1024));
