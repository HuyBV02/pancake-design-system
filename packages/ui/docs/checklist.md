# Checklist trước khi báo xong

Chạy lần lượt. Sai mục nào → sửa rồi chạy lại.

## Tự động
- [ ] `npm run lint` sạch (ESLint + Stylelint của `@pancake/lint`): không import antd ngoài `ds-local/`, không hex, không px tự đặt cho khoảng cách / bo góc / chữ.
- [ ] Type-check của repo sạch (`tsc --noEmit` hoặc lệnh sẵn có).
- [ ] Trang chạy không lỗi console.

## Nhìn (chụp 1440×960, từng trạng thái)
- [ ] Đúng component DS: nút đúng kiểu (≤ 1 primary), Tag/Badge/Alert đúng loại, Switch 40×22.
- [ ] Không phần tử tràn mép, bị cắt, chồng nhau; chữ ngắn (ngày, tiền, tên nút) không xuống dòng.
- [ ] Khoảng cách theo thang; các khối cùng cấp thẳng hàng, chia đều.
- [ ] Không đường kẻ cắt ngang hết khung; vùng tách bằng khoảng cách / card (QĐ #11, #31).
- [ ] Bảng: header `surface/sunken`, dòng cao đều, cột số canh phải, dòng cuối không viền.
- [ ] Chữ: Roboto; tiêu đề / nội dung / meta đúng variant; `dense-*` chỉ ở vùng mật độ cao.
- [ ] Icon Phosphor Regular, cỡ 20 (16 trong chip / meta), cùng màu chữ khi nằm trong nút.

## Trạng thái
- [ ] Đang tải · Trống (chữ đúng ngữ cảnh) · Lỗi (Alert + Thử lại) · Có dữ liệu · Disabled khi không có quyền.
- [ ] Hành động xoá có xác nhận; kết quả thao tác có toast.
- [ ] Focus bàn phím thấy được (Tab qua các nút / input); nút chỉ icon có `aria-label` + Tooltip.

## Chữ
- [ ] Tiếng Việt có dấu, nút bắt đầu bằng động từ, nhãn 1–4 chữ, mô tả ≤ 1 câu.
- [ ] Không chữ thừa / badge / mô tả tự thêm ngoài requirement; không nối bằng `·` `•` `|` `/` `—`.
- [ ] Ngày `dd/MM/yyyy HH:mm`, tiền `1.550.000 đ`, số có dấu chấm nghìn.

## Báo cáo
- [ ] Route / file đã tạo, danh sách trạng thái, chỗ quy đổi từ mockup, các `TODO(DS)` cho Designer.
