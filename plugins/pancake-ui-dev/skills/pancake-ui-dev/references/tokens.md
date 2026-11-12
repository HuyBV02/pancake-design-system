# Token Pancake Web — bảng tra (tự sinh, KHÔNG sửa tay)

_Nguồn: Figma DS_AI `aScl8gFsM1pWrd0atTwyJM` → `@pancake/tokens/tokens/*.json` (W3C DTCG). Sinh bởi `scripts/gen-docs.mjs`._

**Cách chọn token:** gắn vào đâu (chữ / icon / nền / viền) → vai trò (brand, neutral, danger…) → trạng thái (rest / hover / pressed / disabled).
Code màn hình dùng **Semantic**; Component Token chỉ dùng trong đúng component đó; **không** dùng Primitives (trừ tag/biểu đồ).

## Chữ — text/*

| Figma | CSS | JS (`tokens` / `cssVar`) | Giá trị | Dùng cho |
|---|---|---|---|---|
| `text/default` | `var(--pk-text-default)` | `text.default` | #1d2939 ← gray/800 | Nội dung chính, tiêu đề, giá trị input |
| `text/strong` | `var(--pk-text-strong)` | `text.strong` | #101828 ← gray/900 | Giá trị cần nhấn, tiêu đề modal xác nhận |
| `text/control` | `var(--pk-text-control)` | `text.control` | #344054 ← gray/700 | Nhãn nút Secondary Gray / Tertiary Gray / Text Button |
| `text/subtle` | `var(--pk-text-subtle)` | `text.subtle` | #475467 ← gray/600 | Label form, nội dung phụ, danh sách tính năng |
| `text/subtlest` | `var(--pk-text-subtlest)` | `text.subtlest` | #667085 ← gray/500 | Mô tả, meta, thời gian, giá gạch ngang |
| `text/placeholder` | `var(--pk-text-placeholder)` | `text.placeholder` | #98a2b3 ← gray/400 | Placeholder input/select |
| `text/disabled` | `var(--pk-text-disabled)` | `text.disabled` | #98a2b3 ← gray/400 | Chữ trên control vô hiệu |
| `text/inverse` | `var(--pk-text-inverse)` | `text.inverse` | #ffffff ← gray/0 | Chữ trên nền đậm |
| `text/brand/rest` | `var(--pk-text-brand-rest)` | `text.brand.rest` | #105ce2 ← blue/700 | Link, ID, nút Link/Secondary Blue/Tertiary Blue |
| `text/brand/hover` | `var(--pk-text-brand-hover)` | `text.brand.hover` | #1677ff ← blue/600 | Hover link, Tertiary Blue |
| `text/brand/pressed` | `var(--pk-text-brand-pressed)` | `text.brand.pressed` | #003eb3 ← blue/800 | Nhấn giữ link |
| `text/selected` | `var(--pk-text-selected)` | `text.selected` | #1677ff ← blue/600 | Tab đang chọn, menu checked |
| `text/danger` | `var(--pk-text-danger)` | `text.danger` | #cf1322 ← red/700 | Nhãn nút phủ định, dấu * bắt buộc, chữ lỗi |
| `text/success` | `var(--pk-text-success)` | `text.success` | #389e0d ← green/700 | Số tiền được trừ, trạng thái thành công |
| `text/warning` | `var(--pk-text-warning)` | `text.warning` | #ad4e00 ← orange/800 | Tiêu đề notification cảnh báo |
| `text/info` | `var(--pk-text-info)` | `text.info` | #1677ff ← blue/600 | Chữ thông tin, liên kết trong Alert info |

## Icon — icon/*
Icon trong nút / link dùng cùng màu chữ (QĐ #20).

| Figma | CSS | JS (`tokens` / `cssVar`) | Giá trị | Dùng cho |
|---|---|---|---|---|
| `icon/default` | `var(--pk-icon-default)` | `icon.default` | #344054 ← gray/700 | Icon trong nút xám, Text Button, toolbar |
| `icon/subtle` | `var(--pk-icon-subtle)` | `icon.subtle` | #667085 ← gray/500 | Caret input, icon meta, icon ô tìm kiếm |
| `icon/subtlest` | `var(--pk-icon-subtlest)` | `icon.subtlest` | #98a2b3 ← gray/400 | Icon rất nhạt: nút xoá trong input, resizer |
| `icon/disabled` | `var(--pk-icon-disabled)` | `icon.disabled` | #98a2b3 ← gray/400 | Icon trên control vô hiệu |
| `icon/inverse` | `var(--pk-icon-inverse)` | `icon.inverse` | #ffffff ← gray/0 | Icon trên nền đậm |
| `icon/brand` | `var(--pk-icon-brand)` | `icon.brand` | #105ce2 ← blue/700 | Icon trong nút xanh, link có icon |
| `icon/info` | `var(--pk-icon-info)` | `icon.info` | #1677ff ← blue/600 | Alert/Message thông tin |
| `icon/success` | `var(--pk-icon-success)` | `icon.success` | #52c41a ← green/600 | CheckCircle, Alert/Message thành công |
| `icon/warning` | `var(--pk-icon-warning)` | `icon.warning` | #ff7a45 ← volcano/500 | Alert/Message cảnh báo |
| `icon/danger` | `var(--pk-icon-danger)` | `icon.danger` | #ff4d4f ← red/500 | Alert/Message lỗi, XCircle |

## Bề mặt — surface/* · overlay/*

| Figma | CSS | JS (`tokens` / `cssVar`) | Giá trị | Dùng cho |
|---|---|---|---|---|
| `surface/default` | `var(--pk-surface-default)` | `surface.default` | #ffffff ← gray/0 | Nền trang, card, panel |
| `surface/subtle` | `var(--pk-surface-subtle)` | `surface.subtle` | #f9fafb ← gray/50 | Khối phụ trong card |
| `surface/sunken` | `var(--pk-surface-sunken)` | `surface.sunken` | #f2f4f7 ← gray/100 | Header bảng, vùng lõm nhẹ |
| `surface/overlay` | `var(--pk-surface-overlay)` | `surface.overlay` | #ffffff ← gray/0 | Dropdown, popover, modal, toast — đi kèm elevation/overlay |
| `surface/inverse` | `var(--pk-surface-inverse)` | `surface.inverse` | #1d2939 ← gray/800 | Tour tối, tooltip tối |
| `surface/chat` | `var(--pk-surface-chat)` | `surface.chat` | #e5ded8 ← beige/200 | Nền khung chat màn Hội thoại |
| `surface/canvas` | `var(--pk-surface-canvas)` | `surface.canvas` | #ecedf4 ← gray/150 | Nền vùng nội dung phía sau card (Cài đặt, Thống kê) |
| `overlay/backdrop` | `var(--pk-overlay-backdrop)` | `overlay.backdrop` | rgba(71, 84, 103, 0.6) | Nền mờ sau Modal / Drawer — #475467 60% |

## Nền tương tác — bg/*
`<vai trò>-bold` nền đậm chữ trắng · `-subtle` nền nhạt · `-subtlest` nền rất nhạt (Alert). info/success/warning bold/subtle chỉ cho Alert, Notification, Badge, Tag, Progress.

| Figma | CSS | JS (`tokens` / `cssVar`) | Giá trị | Dùng cho |
|---|---|---|---|---|
| `bg/brand-bold/rest` | `var(--pk-bg-brand-bold-rest)` | `bg.brandBold.rest` | #105ce2 ← blue/700 | Nút Primary, switch bật |
| `bg/brand-bold/hover` | `var(--pk-bg-brand-bold-hover)` | `bg.brandBold.hover` | #1677ff ← blue/600 | Hover nút Primary |
| `bg/brand-bold/pressed` | `var(--pk-bg-brand-bold-pressed)` | `bg.brandBold.pressed` | #003eb3 ← blue/800 | Nhấn nút Primary |
| `bg/brand-bold/disabled` | `var(--pk-bg-brand-bold-disabled)` | `bg.brandBold.disabled` | #8496b4 ← slate/400 | Nút Primary vô hiệu |
| `bg/brand-subtle/rest` | `var(--pk-bg-brand-subtle-rest)` | `bg.brandSubtle.rest` | #d2ebff ← blue/100 | Nút Secondary Blue |
| `bg/brand-subtle/hover` | `var(--pk-bg-brand-subtle-hover)` | `bg.brandSubtle.hover` | #bae0ff ← blue/200 | Hover Secondary Blue |
| `bg/brand-subtle/pressed` | `var(--pk-bg-brand-subtle-pressed)` | `bg.brandSubtle.pressed` | #91caff ← blue/300 | Nhấn Secondary Blue |
| `bg/brand-subtlest` | `var(--pk-bg-brand-subtlest)` | `bg.brandSubtlest` | #e2f2ff ← blue/50 | Alert info, hover/checked checkbox |
| `bg/neutral/rest` | `var(--pk-bg-neutral-rest)` | `bg.neutral.rest` | #eaecf0 ← gray/200 | Nút Secondary Gray, rãnh segmented, chip Tag input |
| `bg/neutral/hover` | `var(--pk-bg-neutral-hover)` | `bg.neutral.hover` | #dde1e7 ← gray/250 | Hover Secondary Gray, item segmented |
| `bg/neutral/pressed` | `var(--pk-bg-neutral-pressed)` | `bg.neutral.pressed` | #d0d5dd ← gray/300 | Nhấn Secondary Gray |
| `bg/neutral-subtle/rest` | `var(--pk-bg-neutral-subtle-rest)` | `bg.neutralSubtle.rest` | rgba(255, 255, 255, 0) | Text / Link Button khi nghỉ |
| `bg/neutral-subtle/hover` | `var(--pk-bg-neutral-subtle-hover)` | `bg.neutralSubtle.hover` | #dde1e7 ← gray/250 | Hover Text / Link Button |
| `bg/neutral-subtle/pressed` | `var(--pk-bg-neutral-subtle-pressed)` | `bg.neutralSubtle.pressed` | #d0d5dd ← gray/300 | Nhấn Text / Link Button |
| `bg/neutral-bold/rest` | `var(--pk-bg-neutral-bold-rest)` | `bg.neutralBold.rest` | #1d2939 ← gray/800 | Nền đậm trung tính: badge tối, toast/tooltip tối |
| `bg/neutral-bold/hover` | `var(--pk-bg-neutral-bold-hover)` | `bg.neutralBold.hover` | #344054 ← gray/700 | Hover nền đậm trung tính |
| `bg/neutral-bold/pressed` | `var(--pk-bg-neutral-bold-pressed)` | `bg.neutralBold.pressed` | #101828 ← gray/900 | Nhấn nền đậm trung tính |
| `bg/danger-bold/rest` | `var(--pk-bg-danger-bold-rest)` | `bg.dangerBold.rest` | #c9405a ← crimson/600 | Nút Primary Negative |
| `bg/danger-bold/hover` | `var(--pk-bg-danger-bold-hover)` | `bg.dangerBold.hover` | #d87486 ← crimson/500 | Hover Primary Negative |
| `bg/danger-bold/pressed` | `var(--pk-bg-danger-bold-pressed)` | `bg.dangerBold.pressed` | #d87486 ← crimson/500 | Nhấn Primary Negative |
| `bg/danger-bold/disabled` | `var(--pk-bg-danger-bold-disabled)` | `bg.dangerBold.disabled` | #8496b4 ← slate/400 | Nút Primary Negative vô hiệu |
| `bg/danger-subtle/rest` | `var(--pk-bg-danger-subtle-rest)` | `bg.dangerSubtle.rest` | #fee4e2 ← crimson/100 | Nút Secondary Negative |
| `bg/danger-subtle/hover` | `var(--pk-bg-danger-subtle-hover)` | `bg.dangerSubtle.hover` | #f8d3d0 ← crimson/200 | Hover Secondary Negative |
| `bg/danger-subtle/pressed` | `var(--pk-bg-danger-subtle-pressed)` | `bg.dangerSubtle.pressed` | #f6bdb9 ← crimson/300 | Nhấn Secondary Negative |
| `bg/success-bold/rest` | `var(--pk-bg-success-bold-rest)` | `bg.successBold.rest` | #52c41a ← green/600 | Nút/khối thành công đậm (chữ trắng) |
| `bg/success-bold/hover` | `var(--pk-bg-success-bold-hover)` | `bg.successBold.hover` | #73d13d ← green/500 | Hover thành công đậm |
| `bg/success-bold/pressed` | `var(--pk-bg-success-bold-pressed)` | `bg.successBold.pressed` | #389e0d ← green/700 | Nhấn thành công đậm |
| `bg/success-subtle/rest` | `var(--pk-bg-success-subtle-rest)` | `bg.successSubtle.rest` | #d9f7be ← green/200 | Nền thành công nhạt |
| `bg/success-subtle/hover` | `var(--pk-bg-success-subtle-hover)` | `bg.successSubtle.hover` | #b7eb8f ← green/300 | Hover thành công nhạt |
| `bg/success-subtle/pressed` | `var(--pk-bg-success-subtle-pressed)` | `bg.successSubtle.pressed` | #95de64 ← green/400 | Nhấn thành công nhạt |
| `bg/warning-bold/rest` | `var(--pk-bg-warning-bold-rest)` | `bg.warningBold.rest` | #ff7a45 ← volcano/500 | Khối cảnh báo đậm (chữ trắng) |
| `bg/warning-bold/hover` | `var(--pk-bg-warning-bold-hover)` | `bg.warningBold.hover` | #ff9c6e ← volcano/400 | Hover cảnh báo đậm |
| `bg/warning-bold/pressed` | `var(--pk-bg-warning-bold-pressed)` | `bg.warningBold.pressed` | #fa541c ← volcano/600 | Nhấn cảnh báo đậm |
| `bg/warning-subtle/rest` | `var(--pk-bg-warning-subtle-rest)` | `bg.warningSubtle.rest` | #ffd8bf ← volcano/200 | Nền cảnh báo nhạt |
| `bg/warning-subtle/hover` | `var(--pk-bg-warning-subtle-hover)` | `bg.warningSubtle.hover` | #ffbb96 ← volcano/300 | Hover cảnh báo nhạt |
| `bg/warning-subtle/pressed` | `var(--pk-bg-warning-subtle-pressed)` | `bg.warningSubtle.pressed` | #ff9c6e ← volcano/400 | Nhấn cảnh báo nhạt |
| `bg/info-bold/rest` | `var(--pk-bg-info-bold-rest)` | `bg.infoBold.rest` | #1677ff ← blue/600 | Khối thông tin đậm (chữ trắng) |
| `bg/info-bold/hover` | `var(--pk-bg-info-bold-hover)` | `bg.infoBold.hover` | #4096ff ← blue/500 | Hover thông tin đậm |
| `bg/info-bold/pressed` | `var(--pk-bg-info-bold-pressed)` | `bg.infoBold.pressed` | #105ce2 ← blue/700 | Nhấn thông tin đậm |
| `bg/info-subtle/rest` | `var(--pk-bg-info-subtle-rest)` | `bg.infoSubtle.rest` | #d2ebff ← blue/100 | Nền thông tin nhạt |
| `bg/info-subtle/hover` | `var(--pk-bg-info-subtle-hover)` | `bg.infoSubtle.hover` | #bae0ff ← blue/200 | Hover thông tin nhạt |
| `bg/info-subtle/pressed` | `var(--pk-bg-info-subtle-pressed)` | `bg.infoSubtle.pressed` | #91caff ← blue/300 | Nhấn thông tin nhạt |
| `bg/disabled` | `var(--pk-bg-disabled)` | `bg.disabled` | #f9fafb ← gray/50 | Nền nút Secondary/Tertiary vô hiệu |
| `bg/input/rest` | `var(--pk-bg-input-rest)` | `bg.input.rest` | #ffffff ← gray/0 | Nền input, select, textarea |
| `bg/input/disabled` | `var(--pk-bg-input-disabled)` | `bg.input.disabled` | #f2f4f7 ← gray/100 | Input vô hiệu |
| `bg/item/hover` | `var(--pk-bg-item-hover)` | `bg.item.hover` | #eaecf0 ← gray/200 | Hover dòng bảng, item dropdown, ô lịch |
| `bg/item/selected` | `var(--pk-bg-item-selected)` | `bg.item.selected` | #d2ebff ← blue/100 | Dòng / item đang chọn |
| `bg/item/selected-hover` | `var(--pk-bg-item-selected-hover)` | `bg.item.selectedHover` | #bae0ff ← blue/200 | Hover item đang chọn |
| `bg/control/off` | `var(--pk-bg-control-off)` | `bg.control.off` | #d0d5dd ← gray/300 | Switch tắt |
| `bg/control/off-hover` | `var(--pk-bg-control-off-hover)` | `bg.control.offHover` | #98a2b3 ← gray/400 | Hover switch tắt |
| `bg/info-subtlest` | `var(--pk-bg-info-subtlest)` | `bg.infoSubtlest` | #e2f2ff ← blue/50 | Alert thông tin |
| `bg/success-subtlest` | `var(--pk-bg-success-subtlest)` | `bg.successSubtlest` | #f6ffed ← green/100 | Alert / Notification thành công |
| `bg/warning-subtlest` | `var(--pk-bg-warning-subtlest)` | `bg.warningSubtlest` | #fff2e8 ← volcano/100 | Alert cảnh báo |
| `bg/danger-subtlest` | `var(--pk-bg-danger-subtlest)` | `bg.dangerSubtlest` | #fff1f0 ← red/100 | Alert / Notification lỗi |
| `bg/indicator/info` | `var(--pk-bg-indicator-info)` | `bg.indicator.info` | #1677ff ← blue/600 | Badge đếm xanh, chấm processing |
| `bg/indicator/success` | `var(--pk-bg-indicator-success)` | `bg.indicator.success` | #52c41a ← green/600 | Badge xanh lá, chấm thành công |
| `bg/indicator/warning` | `var(--pk-bg-indicator-warning)` | `bg.indicator.warning` | #faad14 ← gold/600 | Chấm cảnh báo |
| `bg/indicator/danger` | `var(--pk-bg-indicator-danger)` | `bg.indicator.danger` | #ff4d4f ← red/500 | Badge đếm đỏ (chưa đọc), chấm lỗi |
| `bg/indicator/neutral` | `var(--pk-bg-indicator-neutral)` | `bg.indicator.neutral` | #98a2b3 ← gray/400 | Badge xám, chấm mặc định |
| `bg/skeleton` | `var(--pk-bg-skeleton)` | `bg.skeleton` | #eaecf0 ← gray/200 | Khối skeleton |

## Viền — border/*

| Figma | CSS | JS (`tokens` / `cssVar`) | Giá trị | Dùng cho |
|---|---|---|---|---|
| `border/default` | `var(--pk-border-default)` | `border.default` | #d0d5dd ← gray/300 | Input, select, Tertiary Gray, nút +/− |
| `border/subtle` | `var(--pk-border-subtle)` | `border.subtle` | #dde1e7 ← gray/250 | Dòng bảng, checkbox, card cài đặt |
| `border/subtlest` | `var(--pk-border-subtlest)` | `border.subtlest` | #eaecf0 ← gray/200 | Viền card, panel dropdown, divider trong card |
| `border/strong` | `var(--pk-border-strong)` | `border.strong` | #98a2b3 ← gray/400 | Viền cần nổi rõ trên nền xám |
| `border/brand/rest` | `var(--pk-border-brand-rest)` | `border.brand.rest` | #105ce2 ← blue/700 | Tertiary Blue, radio button outlined đang chọn |
| `border/brand/hover` | `var(--pk-border-brand-hover)` | `border.brand.hover` | #1677ff ← blue/600 | Hover Tertiary Blue |
| `border/brand/pressed` | `var(--pk-border-brand-pressed)` | `border.brand.pressed` | #1677ff ← blue/600 | Nhấn Tertiary Blue |
| `border/focus` | `var(--pk-border-focus)` | `border.focus` | #1677ff ← blue/600 | Input hover & focus, checkbox hover |
| `border/selected` | `var(--pk-border-selected)` | `border.selected` | #91caff ← blue/300 | Dòng bảng đang chọn |
| `border/danger/rest` | `var(--pk-border-danger-rest)` | `border.danger.rest` | #c9405a ← crimson/600 | Input lỗi, Tertiary Negative |
| `border/danger/hover` | `var(--pk-border-danger-hover)` | `border.danger.hover` | #d87486 ← crimson/500 | Hover Tertiary Negative |
| `border/danger/pressed` | `var(--pk-border-danger-pressed)` | `border.danger.pressed` | #d87486 ← crimson/500 | Nhấn Tertiary Negative |
| `border/disabled` | `var(--pk-border-disabled)` | `border.disabled` | #d0d5dd ← gray/300 | Control vô hiệu |
| `border/success` | `var(--pk-border-success)` | `border.success` | #b7eb8f ← green/300 | Viền khối thành công |
| `border/warning` | `var(--pk-border-warning)` | `border.warning` | #ffbb96 ← volcano/300 | Viền khối cảnh báo |
| `border/info` | `var(--pk-border-info)` | `border.info` | #91caff ← blue/300 | Viền khối thông tin |
| `border/inverse` | `var(--pk-border-inverse)` | `border.inverse` | #ffffff ← gray/0 | Viền trắng trên nền đậm / ảnh (avatar, badge) |

## Tag & biểu đồ — accent/* · chart/*

| Figma | CSS | JS (`tokens` / `cssVar`) | Giá trị | Dùng cho |
|---|---|---|---|---|
| `accent/blue/bg` | `var(--pk-accent-blue-bg)` | `accent.blue.bg` | #d2ebff ← blue/100 | Nền tag blue |
| `accent/blue/border` | `var(--pk-accent-blue-border)` | `accent.blue.border` | #91caff ← blue/300 | Viền tag blue |
| `accent/blue/text` | `var(--pk-accent-blue-text)` | `accent.blue.text` | #105ce2 ← blue/700 | Chữ tag blue (không viền) |
| `accent/blue/text-strong` | `var(--pk-accent-blue-text-strong)` | `accent.blue.textStrong` | #001d66 ← blue/950 | Chữ tag blue (có viền) |
| `accent/blue/bold` | `var(--pk-accent-blue-bold)` | `accent.blue.bold` | #1677ff ← blue/600 | Nền tag solid blue, chữ trắng |
| `accent/cyan/bg` | `var(--pk-accent-cyan-bg)` | `accent.cyan.bg` | #e6fffb ← cyan/100 | Nền tag cyan |
| `accent/cyan/border` | `var(--pk-accent-cyan-border)` | `accent.cyan.border` | #87e8de ← cyan/300 | Viền tag cyan |
| `accent/cyan/text` | `var(--pk-accent-cyan-text)` | `accent.cyan.text` | #08979c ← cyan/700 | Chữ tag cyan (không viền) |
| `accent/cyan/text-strong` | `var(--pk-accent-cyan-text-strong)` | `accent.cyan.textStrong` | #002329 ← cyan/950 | Chữ tag cyan (có viền) |
| `accent/cyan/bold` | `var(--pk-accent-cyan-bold)` | `accent.cyan.bold` | #13c2c2 ← cyan/600 | Nền tag solid cyan, chữ trắng |
| `accent/geekblue/bg` | `var(--pk-accent-geekblue-bg)` | `accent.geekblue.bg` | #f0f5ff ← geekblue/100 | Nền tag geekblue |
| `accent/geekblue/border` | `var(--pk-accent-geekblue-border)` | `accent.geekblue.border` | #adc6ff ← geekblue/300 | Viền tag geekblue |
| `accent/geekblue/text` | `var(--pk-accent-geekblue-text)` | `accent.geekblue.text` | #1d39c4 ← geekblue/700 | Chữ tag geekblue (không viền) |
| `accent/geekblue/text-strong` | `var(--pk-accent-geekblue-text-strong)` | `accent.geekblue.textStrong` | #030852 ← geekblue/950 | Chữ tag geekblue (có viền) |
| `accent/geekblue/bold` | `var(--pk-accent-geekblue-bold)` | `accent.geekblue.bold` | #2f54eb ← geekblue/600 | Nền tag solid geekblue, chữ trắng |
| `accent/purple/bg` | `var(--pk-accent-purple-bg)` | `accent.purple.bg` | #f9f0ff ← purple/100 | Nền tag purple |
| `accent/purple/border` | `var(--pk-accent-purple-border)` | `accent.purple.border` | #d3adf7 ← purple/300 | Viền tag purple |
| `accent/purple/text` | `var(--pk-accent-purple-text)` | `accent.purple.text` | #531dab ← purple/700 | Chữ tag purple (không viền) |
| `accent/purple/text-strong` | `var(--pk-accent-purple-text-strong)` | `accent.purple.textStrong` | #120338 ← purple/950 | Chữ tag purple (có viền) |
| `accent/purple/bold` | `var(--pk-accent-purple-bold)` | `accent.purple.bold` | #722ed1 ← purple/600 | Nền tag solid purple, chữ trắng |
| `accent/magenta/bg` | `var(--pk-accent-magenta-bg)` | `accent.magenta.bg` | #fff0f6 ← magenta/100 | Nền tag magenta |
| `accent/magenta/border` | `var(--pk-accent-magenta-border)` | `accent.magenta.border` | #ffadd2 ← magenta/300 | Viền tag magenta |
| `accent/magenta/text` | `var(--pk-accent-magenta-text)` | `accent.magenta.text` | #c41d7f ← magenta/700 | Chữ tag magenta (không viền) |
| `accent/magenta/text-strong` | `var(--pk-accent-magenta-text-strong)` | `accent.magenta.textStrong` | #520339 ← magenta/950 | Chữ tag magenta (có viền) |
| `accent/magenta/bold` | `var(--pk-accent-magenta-bold)` | `accent.magenta.bold` | #eb2f96 ← magenta/600 | Nền tag solid magenta, chữ trắng |
| `accent/red/bg` | `var(--pk-accent-red-bg)` | `accent.red.bg` | #fff1f0 ← red/100 | Nền tag red |
| `accent/red/border` | `var(--pk-accent-red-border)` | `accent.red.border` | #ffa39e ← red/300 | Viền tag red |
| `accent/red/text` | `var(--pk-accent-red-text)` | `accent.red.text` | #cf1322 ← red/700 | Chữ tag red (không viền) |
| `accent/red/text-strong` | `var(--pk-accent-red-text-strong)` | `accent.red.textStrong` | #5c0011 ← red/950 | Chữ tag red (có viền) |
| `accent/red/bold` | `var(--pk-accent-red-bold)` | `accent.red.bold` | #f5222d ← red/600 | Nền tag solid red, chữ trắng |
| `accent/volcano/bg` | `var(--pk-accent-volcano-bg)` | `accent.volcano.bg` | #fff2e8 ← volcano/100 | Nền tag volcano |
| `accent/volcano/border` | `var(--pk-accent-volcano-border)` | `accent.volcano.border` | #ffbb96 ← volcano/300 | Viền tag volcano |
| `accent/volcano/text` | `var(--pk-accent-volcano-text)` | `accent.volcano.text` | #d4380d ← volcano/700 | Chữ tag volcano (không viền) |
| `accent/volcano/text-strong` | `var(--pk-accent-volcano-text-strong)` | `accent.volcano.textStrong` | #610b00 ← volcano/950 | Chữ tag volcano (có viền) |
| `accent/volcano/bold` | `var(--pk-accent-volcano-bold)` | `accent.volcano.bold` | #fa541c ← volcano/600 | Nền tag solid volcano, chữ trắng |
| `accent/orange/bg` | `var(--pk-accent-orange-bg)` | `accent.orange.bg` | #fff7e6 ← orange/100 | Nền tag orange |
| `accent/orange/border` | `var(--pk-accent-orange-border)` | `accent.orange.border` | #ffd591 ← orange/300 | Viền tag orange |
| `accent/orange/text` | `var(--pk-accent-orange-text)` | `accent.orange.text` | #d46b08 ← orange/700 | Chữ tag orange (không viền) |
| `accent/orange/text-strong` | `var(--pk-accent-orange-text-strong)` | `accent.orange.textStrong` | #612500 ← orange/950 | Chữ tag orange (có viền) |
| `accent/orange/bold` | `var(--pk-accent-orange-bold)` | `accent.orange.bold` | #fa8c16 ← orange/600 | Nền tag solid orange, chữ trắng |
| `accent/gold/bg` | `var(--pk-accent-gold-bg)` | `accent.gold.bg` | #fffbe6 ← gold/100 | Nền tag gold |
| `accent/gold/border` | `var(--pk-accent-gold-border)` | `accent.gold.border` | #ffd666 ← gold/400 | Viền tag gold |
| `accent/gold/text` | `var(--pk-accent-gold-text)` | `accent.gold.text` | #d48806 ← gold/700 | Chữ tag gold (không viền) |
| `accent/gold/text-strong` | `var(--pk-accent-gold-text-strong)` | `accent.gold.textStrong` | #613400 ← gold/950 | Chữ tag gold (có viền) |
| `accent/gold/bold` | `var(--pk-accent-gold-bold)` | `accent.gold.bold` | #faad14 ← gold/600 | Nền tag solid gold, chữ trắng |
| `accent/lime/bg` | `var(--pk-accent-lime-bg)` | `accent.lime.bg` | #fcffe6 ← lime/100 | Nền tag lime |
| `accent/lime/border` | `var(--pk-accent-lime-border)` | `accent.lime.border` | #bae637 ← lime/500 | Viền tag lime |
| `accent/lime/text` | `var(--pk-accent-lime-text)` | `accent.lime.text` | #7cb305 ← lime/700 | Chữ tag lime (không viền) |
| `accent/lime/text-strong` | `var(--pk-accent-lime-text-strong)` | `accent.lime.textStrong` | #254000 ← lime/950 | Chữ tag lime (có viền) |
| `accent/lime/bold` | `var(--pk-accent-lime-bold)` | `accent.lime.bold` | #a0d911 ← lime/600 | Nền tag solid lime, chữ trắng |
| `accent/green/bg` | `var(--pk-accent-green-bg)` | `accent.green.bg` | #f6ffed ← green/100 | Nền tag green |
| `accent/green/border` | `var(--pk-accent-green-border)` | `accent.green.border` | #b7eb8f ← green/300 | Viền tag green |
| `accent/green/text` | `var(--pk-accent-green-text)` | `accent.green.text` | #389e0d ← green/700 | Chữ tag green (không viền) |
| `accent/green/text-strong` | `var(--pk-accent-green-text-strong)` | `accent.green.textStrong` | #092b00 ← green/950 | Chữ tag green (có viền) |
| `accent/green/bold` | `var(--pk-accent-green-bold)` | `accent.green.bold` | #52c41a ← green/600 | Nền tag solid green, chữ trắng |
| `chart/1` | `var(--pk-chart-1)` | `chart['1']` | #1677ff ← blue/600 | Màu chuỗi biểu đồ 1 |
| `chart/2` | `var(--pk-chart-2)` | `chart['2']` | #13c2c2 ← cyan/600 | Màu chuỗi biểu đồ 2 |
| `chart/3` | `var(--pk-chart-3)` | `chart['3']` | #f759ab ← magenta/500 | Màu chuỗi biểu đồ 3 |
| `chart/4` | `var(--pk-chart-4)` | `chart['4']` | #ffa940 ← orange/500 | Màu chuỗi biểu đồ 4 |
| `chart/5` | `var(--pk-chart-5)` | `chart['5']` | #b37feb ← purple/400 | Màu chuỗi biểu đồ 5 |
| `chart/6` | `var(--pk-chart-6)` | `chart['6']` | #52c41a ← green/600 | Màu chuỗi biểu đồ 6 |
| `chart/7` | `var(--pk-chart-7)` | `chart['7']` | #ffd666 ← gold/400 | Màu chuỗi biểu đồ 7 |
| `chart/8` | `var(--pk-chart-8)` | `chart['8']` | #87e8de ← cyan/300 | Màu chuỗi biểu đồ 8 |

## Component Token
Chỉ dùng bên trong đúng component.

| Figma | CSS | JS (`tokens` / `cssVar`) | Giá trị | Dùng cho |
|---|---|---|---|---|
| `button/tertiary-negative/text/rest` | `var(--pk-button-tertiary-negative-text-rest)` | `button.tertiaryNegative.text.rest` | #c9405a ← crimson/600 |  |
| `button/tertiary-negative/text/hover` | `var(--pk-button-tertiary-negative-text-hover)` | `button.tertiaryNegative.text.hover` | #d87486 ← crimson/500 |  |
| `button/tertiary-negative/text/pressed` | `var(--pk-button-tertiary-negative-text-pressed)` | `button.tertiaryNegative.text.pressed` | #d87486 ← crimson/500 |  |
| `button/tertiary-negative/icon/rest` | `var(--pk-button-tertiary-negative-icon-rest)` | `button.tertiaryNegative.icon.rest` | #c9405a ← crimson/600 |  |
| `button/tertiary-negative/icon/hover` | `var(--pk-button-tertiary-negative-icon-hover)` | `button.tertiaryNegative.icon.hover` | #d87486 ← crimson/500 |  |
| `button/tertiary-negative/icon/pressed` | `var(--pk-button-tertiary-negative-icon-pressed)` | `button.tertiaryNegative.icon.pressed` | #d87486 ← crimson/500 |  |
| `input/icon/error` | `var(--pk-input-icon-error)` | `input.icon.error` | #c9405a ← crimson/600 |  |
| `input/icon/error-subtle` | `var(--pk-input-icon-error-subtle)` | `input.icon.errorSubtle` | #ff7875 ← red/400 |  |
| `input/text/error` | `var(--pk-input-text-error)` | `input.text.error` | #c9405a ← crimson/600 |  |
| `checkbox/text/disabled` | `var(--pk-checkbox-text-disabled)` | `checkbox.text.disabled` | #d0d5dd ← gray/300 |  |
| `tabs/icon/divider` | `var(--pk-tabs-icon-divider)` | `tabs.icon.divider` | #f2f4f7 ← gray/100 |  |
| `tabs/border/divider` | `var(--pk-tabs-border-divider)` | `tabs.border.divider` | #f2f4f7 ← gray/100 |  |
| `dropdown/text/danger` | `var(--pk-dropdown-text-danger)` | `dropdown.text.danger` | #ff4d4f ← red/500 |  |
| `dropdown/icon/scrollbar` | `var(--pk-dropdown-icon-scrollbar)` | `dropdown.icon.scrollbar` | #d0d5dd ← gray/300 |  |
| `tag/magenta/text-800` | `var(--pk-tag-magenta-text-800)` | `tag.magenta.text800` | #9e1068 ← magenta/800 |  |
| `tag/magenta/icon-600` | `var(--pk-tag-magenta-icon-600)` | `tag.magenta.icon600` | #eb2f96 ← magenta/600 |  |
| `tag/magenta/border-400` | `var(--pk-tag-magenta-border-400)` | `tag.magenta.border400` | #ff85c0 ← magenta/400 |  |
| `tag/magenta/icon-500` | `var(--pk-tag-magenta-icon-500)` | `tag.magenta.icon500` | #f759ab ← magenta/500 |  |
| `tag/red/icon-600` | `var(--pk-tag-red-icon-600)` | `tag.red.icon600` | #f5222d ← red/600 |  |
| `tag/red/text-600` | `var(--pk-tag-red-text-600)` | `tag.red.text600` | #f5222d ← red/600 |  |
| `tag/volcano/icon-700` | `var(--pk-tag-volcano-icon-700)` | `tag.volcano.icon700` | #d4380d ← volcano/700 |  |
| `tag/volcano/icon-600` | `var(--pk-tag-volcano-icon-600)` | `tag.volcano.icon600` | #fa541c ← volcano/600 |  |
| `tag/volcano/text-600` | `var(--pk-tag-volcano-text-600)` | `tag.volcano.text600` | #fa541c ← volcano/600 |  |
| `tag/orange/icon-700` | `var(--pk-tag-orange-icon-700)` | `tag.orange.icon700` | #d46b08 ← orange/700 |  |
| `tag/orange/icon-600` | `var(--pk-tag-orange-icon-600)` | `tag.orange.icon600` | #fa8c16 ← orange/600 |  |
| `tag/gold/icon-800` | `var(--pk-tag-gold-icon-800)` | `tag.gold.icon800` | #ad6800 ← gold/800 |  |
| `tag/gold/text-800` | `var(--pk-tag-gold-text-800)` | `tag.gold.text800` | #ad6800 ← gold/800 |  |
| `tag/gold/icon-600` | `var(--pk-tag-gold-icon-600)` | `tag.gold.icon600` | #faad14 ← gold/600 |  |
| `tag/lime/icon-800` | `var(--pk-tag-lime-icon-800)` | `tag.lime.icon800` | #5b8c00 ← lime/800 |  |
| `tag/lime/text-800` | `var(--pk-tag-lime-text-800)` | `tag.lime.text800` | #5b8c00 ← lime/800 |  |
| `tag/lime/icon-700` | `var(--pk-tag-lime-icon-700)` | `tag.lime.icon700` | #7cb305 ← lime/700 |  |
| `tag/lime/bg-700` | `var(--pk-tag-lime-bg-700)` | `tag.lime.bg700` | #7cb305 ← lime/700 |  |
| `tag/cyan/icon-700` | `var(--pk-tag-cyan-icon-700)` | `tag.cyan.icon700` | #08979c ← cyan/700 |  |
| `tag/cyan/bg-700` | `var(--pk-tag-cyan-bg-700)` | `tag.cyan.bg700` | #08979c ← cyan/700 |  |
| `tag/geekblue/text-600` | `var(--pk-tag-geekblue-text-600)` | `tag.geekblue.text600` | #2f54eb ← geekblue/600 |  |
| `tag/geekblue/icon-600` | `var(--pk-tag-geekblue-icon-600)` | `tag.geekblue.icon600` | #2f54eb ← geekblue/600 |  |
| `tag/geekblue/bg-500` | `var(--pk-tag-geekblue-bg-500)` | `tag.geekblue.bg500` | #597ef7 ← geekblue/500 |  |
| `tag/purple/text-600` | `var(--pk-tag-purple-text-600)` | `tag.purple.text600` | #722ed1 ← purple/600 |  |
| `tag/purple/icon-500` | `var(--pk-tag-purple-icon-500)` | `tag.purple.icon500` | #9254de ← purple/500 |  |
| `tag/purple/icon-600` | `var(--pk-tag-purple-icon-600)` | `tag.purple.icon600` | #722ed1 ← purple/600 |  |
| `tag/purple/bg-500` | `var(--pk-tag-purple-bg-500)` | `tag.purple.bg500` | #9254de ← purple/500 |  |
| `tag/green/text-600` | `var(--pk-tag-green-text-600)` | `tag.green.text600` | #52c41a ← green/600 |  |
| `tag/new/bg` | `var(--pk-tag-new-bg)` | `tag.new.bg` | #e5fdff ← teal/50 |  |
| `tag/new/text` | `var(--pk-tag-new-text)` | `tag.new.text` | #296266 ← teal/800 |  |
| `tag/new/border` | `var(--pk-tag-new-border)` | `tag.new.border` | #296266 ← teal/800 |  |
| `badge/pink/bg` | `var(--pk-badge-pink-bg)` | `badge.pink.bg` | #ff85c0 ← magenta/400 |  |
| `badge/yellow/bg` | `var(--pk-badge-yellow-bg)` | `badge.yellow.bg` | #fadb14 ← yellow/600 |  |
| `badge/ribbon/border` | `var(--pk-badge-ribbon-border)` | `badge.ribbon.border` | #f2f4f7 ← gray/100 |  |
| `notification/success/text` | `var(--pk-notification-success-text)` | `notification.success.text` | #237804 ← green/800 |  |
| `notification/info-notes/bg` | `var(--pk-notification-info-notes-bg)` | `notification.infoNotes.bg` | #597ef7 ← geekblue/500 |  |
| `notification/error/text` | `var(--pk-notification-error-text)` | `notification.error.text` | #a8071a ← red/800 |  |
| `message/error/icon` | `var(--pk-message-error-icon)` | `message.error.icon` | #f5222d ← red/600 |  |
| `message/warning/icon` | `var(--pk-message-warning-icon)` | `message.warning.icon` | #fa8c16 ← orange/600 |  |
| `modal-confirm/warning/icon` | `var(--pk-modal-confirm-warning-icon)` | `modalConfirm.warning.icon` | #fa8c16 ← orange/600 |  |
| `modal-confirm/danger/icon` | `var(--pk-modal-confirm-danger-icon)` | `modalConfirm.danger.icon` | #f5222d ← red/600 |  |
| `popover/icon/subtle` | `var(--pk-popover-icon-subtle)` | `popover.icon.subtle` | #d0d5dd ← gray/300 |  |
| `popover/border/divider` | `var(--pk-popover-border-divider)` | `popover.border.divider` | #f2f4f7 ← gray/100 |  |
| `popover/bg/placeholder` | `var(--pk-popover-bg-placeholder)` | `popover.bg.placeholder` | #d0d5dd ← gray/300 |  |
| `tooltip/dark/text` | `var(--pk-tooltip-dark-text)` | `tooltip.dark.text` | #f2f4f7 ← gray/100 |  |
| `tooltip/dark/text-subtle` | `var(--pk-tooltip-dark-text-subtle)` | `tooltip.dark.textSubtle` | #d0d5dd ← gray/300 |  |
| `tooltip/dark/icon` | `var(--pk-tooltip-dark-icon)` | `tooltip.dark.icon` | #d0d5dd ← gray/300 |  |
| `tooltip/dark/keystroke-bg` | `var(--pk-tooltip-dark-keystroke-bg)` | `tooltip.dark.keystrokeBg` | #344054 ← gray/700 |  |
| `tour/dark/text` | `var(--pk-tour-dark-text)` | `tour.dark.text` | #f2f4f7 ← gray/100 |  |
| `tour/dark/bg-subtle` | `var(--pk-tour-dark-bg-subtle)` | `tour.dark.bgSubtle` | #475467 ← gray/600 |  |
| `table/row/icon-danger` | `var(--pk-table-row-icon-danger)` | `table.row.iconDanger` | #c9405a ← crimson/600 |  |
| `table/row/accent-bg` | `var(--pk-table-row-accent-bg)` | `table.row.accentBg` | #43b5c3 |  |
| `table/row/tag-icon` | `var(--pk-table-row-tag-icon)` | `table.row.tagIcon` | #13c2c2 ← accent/cyan/bold |  |
| `table/header/divider` | `var(--pk-table-header-divider)` | `table.header.divider` | #f2f4f7 ← gray/100 |  |
| `spinner/track` | `var(--pk-spinner-track)` | `spinner.track` | #d2ebff ← blue/100 |  |
| `spinner/indicator` | `var(--pk-spinner-indicator)` | `spinner.indicator` | #1677ff ← bg/indicator/info |  |
| `chat/bg` | `var(--pk-chat-bg)` | `chat.bg` | #ede8e2 ← beige/100 |  |
| `chat/bubble-outgoing` | `var(--pk-chat-bubble-outgoing)` | `chat.bubbleOutgoing` | #dcf8c6 ← green/150 |  |
| `chat/bubble-incoming` | `var(--pk-chat-bubble-incoming)` | `chat.bubbleIncoming` | #ffffff ← surface/default |  |
| `alert/warning-strong` | `var(--pk-alert-warning-strong)` | `alert.warningStrong` | #ff8100 ← orange/650 |  |

## Khoảng cách, bo góc, kích thước, chữ — Dimension
Khoảng cách chỉ lấy trong thang `space/*`. Bo góc: control 24 → `radius/sm` · 32/40 → `radius/md` · card/panel → `radius/xl` · modal → `radius/xxl` · pill → `radius/rounded`.

| Figma | CSS | JS (`tokens` / `cssVar`) | Giá trị | Dùng cho |
|---|---|---|---|---|
| `space/0` | `var(--pk-space-0)` | `space['0']` | 0px |  |
| `space/100` | `var(--pk-space-100)` | `space['100']` | 8px |  |
| `space/125` | `var(--pk-space-125)` | `space['125']` | 10px |  |
| `space/150` | `var(--pk-space-150)` | `space['150']` | 12px |  |
| `space/200` | `var(--pk-space-200)` | `space['200']` | 16px |  |
| `space/250` | `var(--pk-space-250)` | `space['250']` | 20px |  |
| `space/300` | `var(--pk-space-300)` | `space['300']` | 24px |  |
| `space/400` | `var(--pk-space-400)` | `space['400']` | 32px |  |
| `space/500` | `var(--pk-space-500)` | `space['500']` | 40px |  |
| `space/600` | `var(--pk-space-600)` | `space['600']` | 48px |  |
| `space/800` | `var(--pk-space-800)` | `space['800']` | 64px |  |
| `space/025` | `var(--pk-space-025)` | `space['025']` | 2px |  |
| `space/050` | `var(--pk-space-050)` | `space['050']` | 4px |  |
| `space/075` | `var(--pk-space-075)` | `space['075']` | 6px |  |
| `radius/none` | `var(--pk-radius-none)` | `radius.none` | 0px |  |
| `radius/xxs` | `var(--pk-radius-xxs)` | `radius.xxs` | 2px |  |
| `radius/xs` | `var(--pk-radius-xs)` | `radius.xs` | 4px |  |
| `radius/sm` | `var(--pk-radius-sm)` | `radius.sm` | 6px |  |
| `radius/md` | `var(--pk-radius-md)` | `radius.md` | 8px |  |
| `radius/xl` | `var(--pk-radius-xl)` | `radius.xl` | 12px |  |
| `radius/xxl` | `var(--pk-radius-xxl)` | `radius.xxl` | 16px |  |
| `radius/3xl` | `var(--pk-radius-3xl)` | `radius['3xl']` | 20px |  |
| `radius/rounded` | `var(--pk-radius-rounded)` | `radius.rounded` | 999px |  |
| `size/control/sm` | `var(--pk-size-control-sm)` | `size.control.sm` | 24px |  |
| `size/control/md` | `var(--pk-size-control-md)` | `size.control.md` | 32px |  |
| `size/control/lg` | `var(--pk-size-control-lg)` | `size.control.lg` | 40px |  |
| `size/icon/xs` | `var(--pk-size-icon-xs)` | `size.icon.xs` | 12px |  |
| `size/icon/sm` | `var(--pk-size-icon-sm)` | `size.icon.sm` | 16px |  |
| `size/icon/md` | `var(--pk-size-icon-md)` | `size.icon.md` | 18px |  |
| `size/icon/lg` | `var(--pk-size-icon-lg)` | `size.icon.lg` | 20px |  |
| `size/icon/xl` | `var(--pk-size-icon-xl)` | `size.icon.xl` | 24px |  |
| `size/checkbox/md` | `var(--pk-size-checkbox-md)` | `size.checkbox.md` | 16px |  |
| `size/checkbox/lg` | `var(--pk-size-checkbox-lg)` | `size.checkbox.lg` | 20px |  |
| `size/switch/width` | `var(--pk-size-switch-width)` | `size.switch.width` | 40px |  |
| `size/switch/height` | `var(--pk-size-switch-height)` | `size.switch.height` | 22px |  |
| `size/badge/sm` | `var(--pk-size-badge-sm)` | `size.badge.sm` | 16px |  |
| `size/badge/md` | `var(--pk-size-badge-md)` | `size.badge.md` | 20px |  |
| `size/dot` | `var(--pk-size-dot)` | `size.dot` | 6px |  |
| `size/tag` | `var(--pk-size-tag)` | `size.tag` | 24px |  |
| `size/menu-item` | `var(--pk-size-menu-item)` | `size.menuItem` | 32px |  |
| `size/table/header` | `var(--pk-size-table-header)` | `size.table.header` | 48px |  |
| `size/table/row` | `var(--pk-size-table-row)` | `size.table.row` | 48px |  |
| `size/tabs/sm` | `var(--pk-size-tabs-sm)` | `size.tabs.sm` | 38px |  |
| `size/tabs/md` | `var(--pk-size-tabs-md)` | `size.tabs.md` | 46px |  |
| `size/tabs/lg` | `var(--pk-size-tabs-lg)` | `size.tabs.lg` | 56px |  |
| `size/segmented/sm` | `var(--pk-size-segmented-sm)` | `size.segmented.sm` | 26px |  |
| `size/segmented/md` | `var(--pk-size-segmented-md)` | `size.segmented.md` | 34px |  |
| `size/segmented/lg` | `var(--pk-size-segmented-lg)` | `size.segmented.lg` | 40px |  |
| `size/sidebar-icon` | `var(--pk-size-sidebar-icon)` | `size.sidebarIcon` | 52px |  |
| `size/dropdown/width` | `var(--pk-size-dropdown-width)` | `size.dropdown.width` | 210px |  |
| `size/tooltip/max` | `var(--pk-size-tooltip-max)` | `size.tooltip.max` | 328px |  |
| `size/popover/width` | `var(--pk-size-popover-width)` | `size.popover.width` | 432px |  |
| `size/modal/confirm` | `var(--pk-size-modal-confirm)` | `size.modal.confirm` | 500px |  |
| `size/modal/md` | `var(--pk-size-modal-md)` | `size.modal.md` | 883px |  |
| `size/drawer/md` | `var(--pk-size-drawer-md)` | `size.drawer.md` | 760px |  |
| `size/kbd/sm` | `var(--pk-size-kbd-sm)` | `size.kbd.sm` | 18px |  |
| `size/kbd/md` | `var(--pk-size-kbd-md)` | `size.kbd.md` | 22px |  |
| `border-width/default` | `var(--pk-border-width-default)` | `borderWidth.default` | 1px |  |
| `border-width/indicator` | `var(--pk-border-width-indicator)` | `borderWidth.indicator` | 2px |  |
| `border-width/accent` | `var(--pk-border-width-accent)` | `borderWidth.accent` | 4px |  |
| `font/weight/regular` | `var(--pk-font-weight-regular)` | `font.weight.regular` | 400 |  |
| `font/weight/medium` | `var(--pk-font-weight-medium)` | `font.weight.medium` | 500 |  |
| `font/weight/bold` | `var(--pk-font-weight-bold)` | `font.weight.bold` | 700 |  |
| `font/heading/2xl/size` | `var(--pk-font-heading-2xl-size)` | `font.heading['2xl'].size` | 46px |  |
| `font/heading/2xl/line-height` | `var(--pk-font-heading-2xl-line-height)` | `font.heading['2xl'].lineHeight` | 54px |  |
| `font/heading/xl/size` | `var(--pk-font-heading-xl-size)` | `font.heading.xl.size` | 38px |  |
| `font/heading/xl/line-height` | `var(--pk-font-heading-xl-line-height)` | `font.heading.xl.lineHeight` | 46px |  |
| `font/heading/lg/size` | `var(--pk-font-heading-lg-size)` | `font.heading.lg.size` | 30px |  |
| `font/heading/lg/line-height` | `var(--pk-font-heading-lg-line-height)` | `font.heading.lg.lineHeight` | 40px |  |
| `font/heading/md/size` | `var(--pk-font-heading-md-size)` | `font.heading.md.size` | 24px |  |
| `font/heading/md/line-height` | `var(--pk-font-heading-md-line-height)` | `font.heading.md.lineHeight` | 32px |  |
| `font/heading/sm/size` | `var(--pk-font-heading-sm-size)` | `font.heading.sm.size` | 20px |  |
| `font/heading/sm/line-height` | `var(--pk-font-heading-sm-line-height)` | `font.heading.sm.lineHeight` | 28px |  |
| `font/heading/xs/size` | `var(--pk-font-heading-xs-size)` | `font.heading.xs.size` | 16px |  |
| `font/heading/xs/line-height` | `var(--pk-font-heading-xs-line-height)` | `font.heading.xs.lineHeight` | 24px |  |
| `font/body/md/size` | `var(--pk-font-body-md-size)` | `font.body.md.size` | 14px |  |
| `font/body/md/line-height` | `var(--pk-font-body-md-line-height)` | `font.body.md.lineHeight` | 22px |  |
| `font/body/sm/size` | `var(--pk-font-body-sm-size)` | `font.body.sm.size` | 12px |  |
| `font/body/sm/line-height` | `var(--pk-font-body-sm-line-height)` | `font.body.sm.lineHeight` | 16px |  |
| `font/code/md/size` | `var(--pk-font-code-md-size)` | `font.code.md.size` | 14px |  |
| `font/code/md/line-height` | `var(--pk-font-code-md-line-height)` | `font.code.md.lineHeight` | 22px |  |
| `font/code/sm/size` | `var(--pk-font-code-sm-size)` | `font.code.sm.size` | 12px |  |
| `font/code/sm/line-height` | `var(--pk-font-code-sm-line-height)` | `font.code.sm.lineHeight` | 16px |  |
| `font/dense/md/size` | `var(--pk-font-dense-md-size)` | `font.dense.md.size` | 13px |  |
| `font/dense/md/line-height` | `var(--pk-font-dense-md-line-height)` | `font.dense.md.lineHeight` | 20px |  |
| `font/dense/sm/size` | `var(--pk-font-dense-sm-size)` | `font.dense.sm.size` | 11px |  |
| `font/dense/sm/line-height` | `var(--pk-font-dense-sm-line-height)` | `font.dense.sm.lineHeight` | 16px |  |
| `font/dense/xs/size` | `var(--pk-font-dense-xs-size)` | `font.dense.xs.size` | 10px |  |
| `font/dense/xs/line-height` | `var(--pk-font-dense-xs-line-height)` | `font.dense.xs.lineHeight` | 14px |  |
| `font/family/sans` | `var(--pk-font-family-sans)` | `font.family.sans` | Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `font/family/mono` | `var(--pk-font-family-mono)` | `font.family.mono` | 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace |  |

## Typography (font shorthand)
Dùng `<Text variant="…">` hoặc `font: var(--pk-typography-…)`. Cỡ 13/11/10 (`dense-*`) chỉ ở vùng mật độ cao.

| Figma | CSS | JS (`tokens` / `cssVar`) | Giá trị | Dùng cho |
|---|---|---|---|---|
| `typography/h0-light` | `var(--pk-typography-h0-light)` | `typography.h0Light` | 300 46px/54px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h0-bold` | `var(--pk-typography-h0-bold)` | `typography.h0Bold` | 700 46px/54px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h1-regular` | `var(--pk-typography-h1-regular)` | `typography.h1Regular` | 400 38px/46px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h1-medium` | `var(--pk-typography-h1-medium)` | `typography.h1Medium` | 500 38px/46px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h1-bold` | `var(--pk-typography-h1-bold)` | `typography.h1Bold` | 700 38px/46px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h2-regular` | `var(--pk-typography-h2-regular)` | `typography.h2Regular` | 400 30px/40px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h2-medium` | `var(--pk-typography-h2-medium)` | `typography.h2Medium` | 500 30px/40px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h2-bold` | `var(--pk-typography-h2-bold)` | `typography.h2Bold` | 700 30px/40px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h3-regular` | `var(--pk-typography-h3-regular)` | `typography.h3Regular` | 400 24px/32px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h3-medium` | `var(--pk-typography-h3-medium)` | `typography.h3Medium` | 500 24px/32px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h3-bold` | `var(--pk-typography-h3-bold)` | `typography.h3Bold` | 700 24px/32px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h4-regular` | `var(--pk-typography-h4-regular)` | `typography.h4Regular` | 400 20px/28px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h4-medium` | `var(--pk-typography-h4-medium)` | `typography.h4Medium` | 500 20px/28px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/h4-bold` | `var(--pk-typography-h4-bold)` | `typography.h4Bold` | 700 20px/28px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/title-16-regular` | `var(--pk-typography-title-16-regular)` | `typography.title16Regular` | 400 16px/24px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/title-16-medium` | `var(--pk-typography-title-16-medium)` | `typography.title16Medium` | 500 16px/24px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/title-16-bold` | `var(--pk-typography-title-16-bold)` | `typography.title16Bold` | 700 16px/24px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/body-14-regular` | `var(--pk-typography-body-14-regular)` | `typography.body14Regular` | 400 14px/22px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/body-14-medium` | `var(--pk-typography-body-14-medium)` | `typography.body14Medium` | 500 14px/22px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/body-14-bold` | `var(--pk-typography-body-14-bold)` | `typography.body14Bold` | 700 14px/22px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/body-14-regular-underline` | `var(--pk-typography-body-14-regular-underline)` | `typography.body14RegularUnderline` | 400 14px/22px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/body-14-regular-strikethrough` | `var(--pk-typography-body-14-regular-strikethrough)` | `typography.body14RegularStrikethrough` | 400 14px/22px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/body-14-code` | `var(--pk-typography-body-14-code)` | `typography.body14Code` | 400 14px/22px 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace |  |
| `typography/footnote-12-regular` | `var(--pk-typography-footnote-12-regular)` | `typography.footnote12Regular` | 400 12px/16px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/footnote-12-medium` | `var(--pk-typography-footnote-12-medium)` | `typography.footnote12Medium` | 500 12px/16px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/footnote-12-bold` | `var(--pk-typography-footnote-12-bold)` | `typography.footnote12Bold` | 700 12px/16px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/footnote-12-system-monospace` | `var(--pk-typography-footnote-12-system-monospace)` | `typography.footnote12SystemMonospace` | 400 12px/16px 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace |  |
| `typography/dense-13-regular` | `var(--pk-typography-dense-13-regular)` | `typography.dense13Regular` | 400 13px/20px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/dense-13-medium` | `var(--pk-typography-dense-13-medium)` | `typography.dense13Medium` | 500 13px/20px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/dense-11-regular` | `var(--pk-typography-dense-11-regular)` | `typography.dense11Regular` | 400 11px/16px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/dense-11-medium` | `var(--pk-typography-dense-11-medium)` | `typography.dense11Medium` | 500 11px/16px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/dense-10-regular` | `var(--pk-typography-dense-10-regular)` | `typography.dense10Regular` | 400 10px/14px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |
| `typography/dense-10-medium` | `var(--pk-typography-dense-10-medium)` | `typography.dense10Medium` | 500 10px/14px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |

## Bóng, vòng focus, blur

| Figma | CSS | JS (`tokens` / `cssVar`) | Giá trị | Dùng cho |
|---|---|---|---|---|
| `elevation/raised` | `var(--pk-elevation-raised)` | `elevation.raised` | 0px 2px 8px 0px #00000026 | Dòng bảng khi hover, card gói khuyến nghị |
| `elevation/overlay` | `var(--pk-elevation-overlay)` | `elevation.overlay` | 0px 9px 28px 8px #0000000d, 0px 6px 16px 0px #00000014, 0px 3px 6px -4px #0000001f | Dropdown, popover, modal, message, notification |
| `elevation/selected` | `var(--pk-elevation-selected)` | `elevation.selected` | 0px 2px 8px 0px #0000000d | Item segmented đang chọn |
| `elevation/button-primary` | `var(--pk-elevation-button-primary)` | `elevation.buttonPrimary` | 0px 2px 0px 0px #0000000b | Nút Primary |
| `elevation/button-default` | `var(--pk-elevation-button-default)` | `elevation.buttonDefault` | 0px 2px 0px 0px #00000004 | Nút Tertiary (có viền) |
| `focus/brand` | `var(--pk-focus-brand)` | `focus.brand` | 0px 0px 0px 4px #6399f233 | Vòng focus nút Primary / Tertiary Blue, input focus |
| `focus/danger` | `var(--pk-focus-danger)` | `focus.danger` | 0px 0px 0px 4px #f8e3e8 | Vòng focus nút Negative |
| `focus/neutral` | `var(--pk-focus-neutral)` | `focus.neutral` | 0px 0px 0px 4px #8496b41a | Vòng focus nút Tertiary Gray |
| `focus/control` | `var(--pk-focus-control)` | `focus.control` | 0px 0px 0px 4px #e2f2ff | Vòng focus checkbox, radio |
| `blur/sm` | `var(--pk-blur-sm)` | `blur.sm` | 8px |  |
| `blur/md` | `var(--pk-blur-md)` | `blur.md` | 16px |  |
| `blur/lg` | `var(--pk-blur-lg)` | `blur.lg` | 24px |  |
| `blur/xl` | `var(--pk-blur-xl)` | `blur.xl` | 40px |  |

## Primitives (chỉ để tham chiếu)
- **gray**: 0 #ffffff · 50 #f9fafb · 100 #f2f4f7 · 150 #ecedf4 · 200 #eaecf0 · 250 #dde1e7 · 300 #d0d5dd · 400 #98a2b3 · 500 #667085 · 600 #475467 · 700 #344054 · 800 #1d2939 · 900 #101828 · 1000 #000000
- **blue**: 50 #e2f2ff · 100 #d2ebff · 200 #bae0ff · 300 #91caff · 400 #69b1ff · 500 #4096ff · 600 #1677ff · 700 #105ce2 · 800 #003eb3 · 900 #002c8c · 950 #001d66
- **crimson**: 50 #f8e3e8 · 100 #fee4e2 · 200 #f8d3d0 · 300 #f6bdb9 · 500 #d87486 · 600 #c9405a
- **slate**: 400 #8496b4
- **beige**: 100 #ede8e2 · 200 #e5ded8
- **teal**: 50 #e5fdff · 800 #296266
- **red**: 100 #fff1f0 · 200 #ffccc7 · 300 #ffa39e · 400 #ff7875 · 500 #ff4d4f · 600 #f5222d · 700 #cf1322 · 800 #a8071a · 900 #820014 · 950 #5c0011
- **volcano**: 100 #fff2e8 · 200 #ffd8bf · 300 #ffbb96 · 400 #ff9c6e · 500 #ff7a45 · 600 #fa541c · 700 #d4380d · 800 #ad2102 · 900 #871400 · 950 #610b00
- **orange**: 100 #fff7e6 · 200 #ffe7ba · 300 #ffd591 · 400 #ffc069 · 500 #ffa940 · 600 #fa8c16 · 650 #ff8100 · 700 #d46b08 · 800 #ad4e00 · 900 #873800 · 950 #612500
- **gold**: 100 #fffbe6 · 200 #fff1b8 · 300 #ffe58f · 400 #ffd666 · 500 #ffc53d · 600 #faad14 · 700 #d48806 · 800 #ad6800 · 900 #874d00 · 950 #613400
- **yellow**: 100 #feffe6 · 200 #ffffb8 · 300 #fffb8f · 400 #fff566 · 500 #ffec3d · 600 #fadb14 · 700 #d4b106 · 800 #ad8b00 · 900 #876800 · 950 #614700
- **lime**: 100 #fcffe6 · 200 #f4ffb8 · 300 #eaff8f · 400 #d3f261 · 500 #bae637 · 600 #a0d911 · 700 #7cb305 · 800 #5b8c00 · 900 #3f6600 · 950 #254000
- **green**: 100 #f6ffed · 150 #dcf8c6 · 200 #d9f7be · 300 #b7eb8f · 400 #95de64 · 500 #73d13d · 600 #52c41a · 700 #389e0d · 800 #237804 · 900 #135200 · 950 #092b00
- **cyan**: 100 #e6fffb · 200 #b5f5ec · 300 #87e8de · 400 #5cdbd3 · 500 #36cfc9 · 600 #13c2c2 · 700 #08979c · 800 #006d75 · 900 #00474f · 950 #002329
- **sky**: 100 #e6f7ff · 200 #bae7ff · 300 #91d5ff · 400 #69c0ff · 500 #40a9ff · 600 #1890ff · 700 #096dd9 · 800 #0050b3 · 900 #003a8c · 950 #002766
- **geekblue**: 100 #f0f5ff · 200 #d6e4ff · 300 #adc6ff · 400 #85a5ff · 500 #597ef7 · 600 #2f54eb · 700 #1d39c4 · 800 #10239e · 900 #061178 · 950 #030852
- **purple**: 100 #f9f0ff · 200 #efdbff · 300 #d3adf7 · 400 #b37feb · 500 #9254de · 600 #722ed1 · 700 #531dab · 800 #391085 · 900 #22075e · 950 #120338
- **magenta**: 100 #fff0f6 · 200 #ffd6e7 · 300 #ffadd2 · 400 #ff85c0 · 500 #f759ab · 600 #eb2f96 · 700 #c41d7f · 800 #9e1068 · 900 #780650 · 950 #520339
