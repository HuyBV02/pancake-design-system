#!/usr/bin/env python3
"""Chụp màn playground đúng kích thước frame Figma (chế độ figma-exact).

  python3 fx_shot.py http://localhost:5173/playground/3066-sticker-popover code.png --size 1440x900

Ẩn thanh chuyển trạng thái của playground để ảnh so được với Figma.
Cần: pip install playwright && playwright install chromium (hoặc dùng --channel chrome).
"""
import argparse
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
ap.add_argument('url')
ap.add_argument('out')
ap.add_argument('--size', default='1440x900', help='Kích thước frame Figma, vd. 1440x900')
ap.add_argument('--scale', type=float, default=1, help='deviceScaleFactor (2 = ảnh @2x)')
ap.add_argument('--channel', default=None, help='vd. chrome nếu máy có Google Chrome')
a = ap.parse_args()
w, h = map(int, a.size.lower().split('x'))

with sync_playwright() as p:
    b = p.chromium.launch(channel=a.channel) if a.channel else p.chromium.launch()
    pg = b.new_page(viewport={'width': w, 'height': h}, device_scale_factor=a.scale)
    pg.goto(a.url, wait_until='networkidle')
    pg.add_style_tag(content='[data-playground-bar]{display:none!important} body{margin:0}')
    pg.evaluate('document.fonts.ready')
    pg.wait_for_timeout(300)
    pg.screenshot(path=a.out)
    b.close()
print('Đã chụp', a.out)
