#!/usr/bin/env python3
"""So pixel bản code với ảnh Figma (chế độ figma-exact).

  # % điểm lệch theo vùng + ảnh lệch (trắng = lệch)
  python3 fx_diff.py figma.png code.png --regions regions.json --out diff.png

  # tìm khối bị dời bao nhiêu px (dx, dy) — sửa CSS theo số này
  python3 fx_diff.py figma.png code.png --offset header=0,0,1440,56 card=1120,356,1440,392

  # ghép 2 ảnh trên/dưới để nhìn tận mắt 1 vùng (phóng 2 lần)
  python3 fx_diff.py figma.png code.png --pair 1000,0,1440,56 --zoom 2 --out pair.png

regions.json: {"header": [0,0,1440,56], "list": [52,56,452,900], ...}
Ngưỡng lệch mặc định 40/255 (bỏ qua khác biệt khử răng cưa của font).
Cần: pip install pillow
"""
import argparse, json
from PIL import Image, ImageChops

ap = argparse.ArgumentParser()
ap.add_argument('figma'); ap.add_argument('code')
ap.add_argument('--regions'); ap.add_argument('--out')
ap.add_argument('--threshold', type=int, default=40)
ap.add_argument('--offset', nargs='*'); ap.add_argument('--range', type=int, default=6)
ap.add_argument('--pair'); ap.add_argument('--zoom', type=float, default=2)
a = ap.parse_args()

A = Image.open(a.figma).convert('RGB'); B = Image.open(a.code).convert('RGB')
if A.size != B.size:
    raise SystemExit(f'Khác kích thước: figma {A.size} ≠ code {B.size}. Chụp lại đúng --size (và --scale).')

def mean_err(a_img, b_img):
    h = ImageChops.difference(a_img, b_img).convert('L').histogram()
    return sum(i * c for i, c in enumerate(h)) / (a_img.size[0] * a_img.size[1])

if a.pair:
    x0, y0, x1, y1 = map(int, a.pair.split(','))
    fa, fb = A.crop((x0, y0, x1, y1)), B.crop((x0, y0, x1, y1))
    w, h = fa.size
    out = Image.new('RGB', (w, h * 2 + 4), 'red'); out.paste(fa, (0, 0)); out.paste(fb, (0, h + 4))
    out.resize((int(w * a.zoom), int((h * 2 + 4) * a.zoom)), Image.NEAREST).save(a.out or 'pair.png')
    print('Trên = Figma, dưới = code →', a.out or 'pair.png'); raise SystemExit

if a.offset:
    LA, LB = A.convert('L'), B.convert('L')
    for item in a.offset:
        name, box = item.split('='); x0, y0, x1, y1 = map(int, box.split(','))
        fa = LA.crop((x0, y0, x1, y1)); best = None
        for dy in range(-a.range, a.range + 1):
            for dx in range(-a.range, a.range + 1):
                e = mean_err(fa, LB.crop((x0 + dx, y0 + dy, x1 + dx, y1 + dy)))
                if best is None or e < best[0]: best = (e, dx, dy)
        e0 = mean_err(fa, LB.crop((x0, y0, x1, y1)))
        hint = 'khớp' if best[1] == best[2] == 0 else f'code đang lệch dx={best[1]:+d} dy={best[2]:+d}px → dời ngược lại'
        print(f'{name:16s} sai số {e0:5.2f} → {best[0]:5.2f}  {hint}')
    raise SystemExit

d = ImageChops.difference(A, B).convert('L').point(lambda v: 255 if v > a.threshold else 0)
regions = json.load(open(a.regions)) if a.regions else {'toàn màn': [0, 0, *A.size]}
total = 0
for k, r in regions.items():
    c = d.crop(tuple(r)); n = c.size[0] * c.size[1]; bad = c.histogram()[255]
    print(f'{k:12s} lệch {bad / n * 100:5.2f}%'); total += bad
print(f'{"TỔNG":12s} lệch {total / (A.size[0] * A.size[1]) * 100:5.2f}%  (mục tiêu ≤ 1–2%, phần còn lại là khử răng cưa chữ)')
if a.out: d.save(a.out); print('Ảnh lệch →', a.out)
