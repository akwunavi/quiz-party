#!/usr/bin/env python3
"""Горизонтальный свиток с бантом/хвоей на концах для «Книги» (10.73): рабочий файл из исходника ведущего.
Исходник: docs-dev/book-redesign/assets-src/hscroll-bow.webp (2000×667, RGBA, прозрачный фон).
Что делает: обрезает прозрачные поля по содержимому, чистит слабый шум альфы, уменьшает до 1176×267 (масштаб 0.6) → public/ny-book/hscroll-bow.webp.
Геометрия для CSS (пиксели РАБОЧЕГО файла 1176×267; тело пергамента в середине 202 px по высоте, от y=46 до y=248):
  выступ декора над кромкой: 46 px (0.2277 высоты тела), под нижней кромкой: 19 px (0.0941) — border-image-outset;
  концы (рулон+бант+хвоя): 211 px (1.0446 высоты тела) с каждой стороны, середина (211…965) — чистый пергамент, растягивается;
  border-image-slice 0 211 0 211, высота всей картинки = 267/202 = 1.3218 высоты тела.
usage: python3 scripts/ny-book/make-hscroll-bow.py"""
from PIL import Image
import numpy as np
SRC = 'docs-dev/book-redesign/assets-src/hscroll-bow.webp'
OUT = 'public/ny-book/hscroll-bow.webp'
im = Image.open(SRC).convert('RGBA')
a = np.array(im)
a[a[:, :, 3] < 8] = 0                      # шум прозрачного фона
ys, xs = np.where(a[:, :, 3] > 0)
box = (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)
im = Image.fromarray(a, 'RGBA').crop(box)
W, H = 1176, 267
im = im.resize((W, H), Image.LANCZOS)
im.save(OUT, quality=88, method=6)
print(box, im.size)
