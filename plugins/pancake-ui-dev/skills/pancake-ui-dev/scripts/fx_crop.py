#!/usr/bin/env python3
"""Cắt ảnh/icon từ ảnh render Figma @2x khi không tải được asset gốc (figma.com bị chặn).

  python3 fx_crop.py assets.json public/figma-<issue>/

assets.json — toạ độ theo px @1x trong ảnh nguồn (ảnh nguồn chụp @2x):
{
  "sources": { "list": "fx/list.png", "header": "fx/header.png" },
  "assets": {
    "logo":      ["header", 112, 13, 120, 30],
    "r1-avatar": ["list", 12, 67, 50, 50]
  }
}
→ public/figma-<issue>/logo.png (240×60 = dùng ở 120×30 trong code).
Ưu tiên asset gốc: get_design_context → download_assets (SVG/PNG thật). Script này chỉ là đường lui.
Cần: pip install pillow
"""
import json, os, sys
from PIL import Image

spec = json.load(open(sys.argv[1])); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
src = {k: Image.open(v).convert('RGBA') for k, v in spec['sources'].items()}
scale = spec.get('scale', 2)
for name, (s, x, y, w, h) in spec['assets'].items():
    box = tuple(int(round(v * scale)) for v in (x, y, x + w, y + h))
    src[s].crop(box).save(os.path.join(out, f'{name}.png'))
print(f'Đã cắt {len(spec["assets"])} asset vào {out}')
