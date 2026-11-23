#!/usr/bin/env python3
"""Кожаная лента заголовка лобби «Книги» (10.74): вырезка фона из исходника ведущего.
Исходник: docs-dev/book-redesign/assets-src/lobby-ribbon-leather-source.webp (2000×667, RGB, АЛЬФЫ НЕТ — серо-белая «шахматка» запечена в картинку).
Как вырезается фон:
  1. «Фон-кандидат» — светлый нейтральный пиксель (min(R,G,B) >= 200 и разброс каналов <= 16: белое и серое клеток шахматки, 245–254).
     Бордо и золото под это не попадают (золото насыщенное, min канал << 200).
  2. Заливка ОТ КРАЁВ картинки (flood fill) по кандидатам — фон снаружи ленты; светлые блики ВНУТРИ ленты, до которых заливка не дошла, остаются.
  3. Сглаженный край: у полосы в 3 px вокруг фона альфа восстанавливается по «смеси» пиксель = a·цвет_ленты + (1−a)·фон
     (фон ≈ 250; цвет ленты — минимум каналов по окрестности надёжных пикселей), цвет «расчищается» (убирается примесь белого) —
     белой каймы на тёмном фоне нет.
  4. Обрезка по содержимому, масштаб до ширины W, webp с альфой.
usage: python3 scripts/ny-book/make-lobby-ribbon.py"""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
SRC = 'docs-dev/book-redesign/assets-src/lobby-ribbon-leather-source.webp'
OUT = 'public/ny-book/lobby-ribbon.webp'
W = 1300
im = Image.open(SRC).convert('RGB')
a = np.asarray(im).astype(np.float32)
mn, mx = a.min(2), a.max(2)
cand = ((mn >= 200) & (mx - mn <= 16))
m = Image.fromarray((cand * 255).astype(np.uint8), 'L').copy()
h, w = cand.shape
# заливка от всех краёв: кандидатов, достижимых с границы, красим в 128
for x in range(w):
    for y in (0, h - 1):
        if m.getpixel((x, y)) == 255:
            ImageDraw.floodfill(m, (x, y), 128)
for y in range(h):
    for x in (0, w - 1):
        if m.getpixel((x, y)) == 255:
            ImageDraw.floodfill(m, (x, y), 128)
bg = (np.asarray(m) == 128)
# полоса вокруг фона: не-фон в пределах 3 px от фона
near = np.asarray(Image.fromarray((bg * 255).astype(np.uint8), 'L').filter(ImageFilter.MaxFilter(7))) > 0
band = near & ~bg
solid = ~near
fgmap = np.where(solid[:, :, None], a, 255.0).astype(np.float32)
fg = np.stack([np.asarray(Image.fromarray(fgmap[:, :, c].astype(np.uint8), 'L').filter(ImageFilter.MinFilter(9))).astype(np.float32) for c in range(3)], 2)
BG = 250.0
alpha = np.ones((h, w), np.float32)
den = np.maximum(BG - fg.min(2), 1.0)
ab = np.clip((BG - mn) / den, 0, 1)
alpha = np.where(band, ab, alpha)
alpha = np.where(bg, 0, alpha)
ae = np.maximum(alpha, 0.05)[:, :, None]
dec = (a - (1 - alpha)[:, :, None] * BG) / ae
col = np.where(band[:, :, None], np.clip(dec, 0, 255), a)
bl = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8), 'L').filter(ImageFilter.GaussianBlur(0.7))).astype(np.float32)
al8 = np.where(near, bl, alpha * 255).astype(np.uint8)
out = np.dstack([np.clip(col, 0, 255).astype(np.uint8), al8])
out[out[:, :, 3] < 6] = 0
img = Image.fromarray(out, 'RGBA')
ys, xs = np.where(out[:, :, 3] > 0)
box = (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)
img = img.crop(box)
H = round(img.height * W / img.width)
img = img.resize((W, H), Image.LANCZOS)
img.save(OUT, quality=88, method=6, alpha_quality=90)
print('box', box, 'size', img.size, 'scale', W / (box[2] - box[0]))
