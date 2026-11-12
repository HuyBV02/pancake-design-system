# Component `@pancake/ui` — API và cách chọn

Mọi component import từ `@pancake/ui`. Icon từ `@phosphor-icons/react` (weight Regular — mặc định).
Ứng với trang component trong Figma DS_AI (`aScl8gFsM1pWrd0atTwyJM`); spec đầy đủ: tài liệu DS `pancake-ds-components.md`.

## Nền

```tsx
import '@pancake/ui/styles.css';          // 1 lần ở entry: token CSS + style Pancake
import { PancakeProvider } from '@pancake/ui';
<PancakeProvider locale="vi">{app}</PancakeProvider>   // theme antd + App context (message/notification/modal)
```
`tokens` (giá trị đã resolve), `cssVar` (chuỗi `var(--pk-…)`), `byFigmaName['bg/brand-bold/rest']` cũng export từ `@pancake/ui`.

---

## Component có API riêng theo DS

### Button
```tsx
<Button variant="primary" size="m" icon={<Plus />}>Thêm thẻ</Button>
<Button variant="secondary-gray">Huỷ</Button>
<Button variant="tertiary-blue" negative icon={<Trash />}>Xoá</Button>
<Button variant="text" size="s" icon={<DotsThree />} aria-label="Thêm thao tác" />   // chỉ icon: bắt buộc aria-label
<Button variant="tertiary-gray" icon={<CaretDown />} iconPlacement="end">Lọc theo nguồn</Button>
```
| Prop | Giá trị | Ghi chú |
|---|---|---|
| `variant` | `primary` · `secondary-blue` · `secondary-gray` (mặc định) · `tertiary-blue` · `tertiary-gray` · `text` · `link` | |
| `size` | `s` 24 · `m` 32 (mặc định) · `l` 40 | S bo 6, icon 18 · M/L bo 8, icon 20 · L chữ 16 |
| `negative` | boolean | Bản phủ định cho mọi kiểu |
| `dashed` | boolean | Chỉ Tertiary Blue (nút "+ Thêm" dạng viền đứt) |
| còn lại | như antd Button | `loading`, `disabled`, `icon`, `iconPlacement`, `htmlType`, `onClick`, `block` |

Chọn kiểu:
- `primary`: hành động chính của màn / modal — **tối đa 1**.
- `secondary-blue`: hành động phụ cùng hướng với primary (vd. "Lưu nháp").
- `secondary-gray`: Huỷ, Quay lại, Đóng, hành động trung tính.
- `tertiary-gray`: nút trên thanh công cụ (Lọc, Xuất file), trigger dropdown.
- `tertiary-blue`: hành động nổi bật vừa phải trong card; `dashed` cho "+ Thêm …".
- `text`: nút icon trong dòng bảng / toolbar, hành động rất phụ.
- `link`: điều hướng / mở chi tiết trong câu chữ.

### Text
```tsx
<Text variant="h4-medium">Thẻ hội thoại</Text>                 // tự render <h4>
<Text tone="subtlest" as="p">Gắn thẻ để lọc hội thoại nhanh hơn.</Text>
<Text variant="footnote-12-regular" tone="subtlest">14/11/2026 09:30</Text>
```
`variant` = tên text style Figma, viết thường gạch nối: `h0-light|bold` · `h1-*` · `h2-*` · `h3-*` · `h4-regular|medium|bold` · `title-16-regular|medium|bold` · `body-14-regular` (mặc định) `|medium|bold|regular-underline|regular-strikethrough|code` · `footnote-12-regular|medium|bold|system-monospace` · `dense-13|11|10-regular|medium`.
`tone` = token `text/*`: `default` · `strong` · `control` · `subtle` · `subtlest` · `placeholder` · `disabled` · `inverse` · `brand` · `selected` · `danger` · `success` · `warning` · `info`.

Dùng cỡ nào: tiêu đề trang cài đặt `h4-medium` · tiêu đề card / modal `title-16-medium` · nội dung `body-14-regular` · label form tự đặt `body-14-regular` tone `subtle` · meta / thời gian `footnote-12-regular` tone `subtlest` · số KPI `h2-medium` · dòng hội thoại `dense-13-*`, giờ trong bong bóng `dense-11-regular`.

### Icon
```tsx
<Icon as={MagnifyingGlass} tone="subtle" />            // 20px, màu icon/subtle
<Icon as={WarningCircle} size="sm" tone="danger" />
```
`size`: `xs` 12 · `sm` 16 · `md` 18 · `lg` 20 (mặc định) · `xl` 24. `tone`: `inherit` (mặc định, theo màu chữ) · `default` · `subtle` · `subtlest` · `disabled` · `inverse` · `brand` · `info` · `success` · `warning` · `danger`.
Icon trong `Button` / `Input prefix` truyền thẳng `<Plus />` — component tự chỉnh cỡ và màu.

### Tag
```tsx
<Tag color="green" dot>Đang hoạt động</Tag>
<Tag color="gold" bordered>Còn 3 ngày</Tag>
<Tag color="blue" solid>VIP</Tag>
<Tag color="new">Mới</Tag>
<Tag color="neutral" closable onClose={…}>Lan Anh</Tag>
```
`color`: `neutral` (mặc định) · `blue` · `cyan` · `geekblue` · `purple` · `magenta` · `red` · `volcano` · `orange` · `gold` · `lime` · `green` · `new`. Cao 24, bo tròn, Body 14. `bordered` → chữ đậm hơn + viền. `solid` → cao 22, chữ 12 trắng.
Thời hạn gói: xanh lá > 7 ngày · `gold` 2–7 ngày · `red` ≤ 1 ngày.

### Badge
```tsx
<Badge count={12}><Avatar … /></Badge>                  // đỏ = chưa đọc
<Badge tone="info" count={5} size="sm" />
<Badge tone="success" text="Đã kết nối" />              // chấm trạng thái 6×6
```
`tone`: `danger` (mặc định) · `info` · `success` · `warning` · `neutral`. `size`: `sm` 16 · `md` 20.

### Alert
```tsx
<Alert type="info" title="Tin nhắn sẽ được gửi sau 5 phút." />                 // gọn, cao 32
<Alert compact={false} type="warning" title="Gói Pro hết hạn sau 3 ngày" description="Gia hạn trước 15/11/2026 để không gián đoạn." />
```
`type`: `info` · `success` · `warning` · `error`. `compact` mặc định `true`. Dùng trong luồng trang / form / drawer; không dùng cho kết quả thao tác (dùng `message`).

### Kbd · Shortcut
```tsx
<Shortcut keys={['⌘', '⇧', 'K']} />           // sm 18 — dropdown, menu, dòng danh sách, tooltip
<Shortcut size="md" keys={['Ctrl', 'K']} />   // md 22 — trang cài đặt phím tắt
<Kbd>Esc</Kbd>
```
macOS: ⌘ ⌥ ⇧ ⌃ ↵ ⌫; Windows: chữ Ctrl / Alt / Shift. Hiển thị theo hệ điều hành người dùng, không đặt 2 bộ cạnh nhau. Tối đa 3 phím.

### Switch
`<Switch checked onChange />` — 40×22. **Không** có cỡ nhỏ, không chữ / icon trong núm (QĐ #10). Nhãn đặt bên cạnh bằng `Text`.

### Segmented
`<Segmented size="s|m|l" options={['Ngày','Tuần','Tháng']} />` — đổi chế độ xem trong cùng 1 khối. Đổi trang con → dùng `Tabs`.

### Modal
```tsx
<Modal open title="Thêm thẻ hội thoại" width="confirm" onCancel={close}
  footer={[<Button key="c" variant="secondary-gray" onClick={close}>Huỷ</Button>,
           <Button key="o" variant="primary" onClick={submit}>Thêm thẻ</Button>]}>…</Modal>
```
`width`: `confirm` 500 (form ngắn, xác nhận) · `md` 883 (nội dung) · hoặc số. Bo 16, tự canh giữa.
Xác nhận nhanh: `modal.confirm({...})` từ `App.useApp()` — mẫu trong recipes.

### Empty
`<Empty description="Chưa có thẻ hội thoại nào" />` — chữ phải nói đúng ngữ cảnh. Kèm nút tạo mới nếu người dùng có quyền.

---

## Component antd dùng nguyên API (đã có theme Pancake)

`App` · `Form` · `Input` (+ `Input.TextArea`, `Input.Search`, `Input.Password`) · `InputNumber` · `Select` · `DatePicker` · `TimePicker` · `Checkbox` · `Radio` · `Tabs` · `Dropdown` · `Menu` · `Table` · `Popover` · `Popconfirm` · `Tooltip` · `Tour` · `Progress` · `Skeleton` · `Spin` · `Space`.

Ghi chú theo DS:
- **Input / Select:** cỡ `small` 24 · `middle` 32 (mặc định) · `large` 40. Icon dẫn đầu qua `prefix={<Icon as={…} tone="subtle" />}`. Lỗi: `status="error"`.
- **Form:** `layout="vertical"`; label → 8 → input → 4 → helper. `requiredMark` dùng dấu * đỏ. Thông báo lỗi ngắn: "Nhập tên thẻ".
- **Checkbox / Radio:** nhóm dọc cách 12, ngang cách 20 (đã có trong style). Checkbox đã chọn = nền xanh nhạt + viền xanh (style tự áp).
- **Tabs:** chuyển trang con. Khoảng cách tab 20, gạch chọn 2px.
- **Dropdown:** `menu={{ items }}`; item có `icon` (Phosphor 20), `extra={<Shortcut … />}`, `danger` cho xoá; nhóm bằng `type: 'group'`.
- **Table:** header `surface/sunken` Body 14 Medium; dòng 48 (52 khi có avatar); chọn dòng `rowSelection`; cột số `align: 'right'`; thao tác cuối dòng là `Button variant="text" size="s"` chỉ icon; `locale={{ emptyText: <Empty … /> }}`; phân trang `pagination` antd.
- **Tooltip:** cho nút chỉ icon và chữ bị cắt. Có phím tắt: `title={<>Tìm hội thoại <Shortcut keys={['⌘','K']} /></>}`.
- **Message / Notification:** `const { message, notification } = App.useApp()`. message = kết quả thao tác ("Đã lưu"), notification = sự kiện (tin mới, mất kết nối).

## Chưa có trong DS_AI (dùng tạm, ghi `TODO(DS)`)

| Cần | Dùng tạm |
|---|---|
| Avatar | `Avatar` từ antd **qua** file wrapper cục bộ `src/components/ds-local/Avatar.tsx` (import antd chỉ được phép trong `ds-local/`), cỡ 32/40, bo tròn |
| Drawer | `Drawer` antd trong `ds-local/`, rộng 760, header Title 16 Medium; cài đặt nhiều mục: cột trái 200 `surface/sunken` + nội dung trắng |
| Pagination | `Table pagination` hoặc `Pagination` antd trong `ds-local/` |
| Card | `div` với `surface/default`, viền `border/subtlest`, `radius/xl`, padding `space/300` (mẫu trong recipes) |
| Breadcrumb, Steps, Upload, Rate, Collapse, Timeline | antd trong `ds-local/` + token, báo Designer |
| Chat bubble, composer | `div` + token `chat/*` (mẫu trong recipes) |

`src/components/ds-local/` là nơi duy nhất trong repo sản phẩm được import antd trực tiếp (đã cấu hình trong `@pancake/lint`). Mỗi file ở đây ghi `// TODO(DS): chờ component <tên> trong DS_AI`.
