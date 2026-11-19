#!/usr/bin/env python3
"""Горизонтальный свиток с бантом/хвоей на концах для «Книги» (10.73): рабочий файл из исходника ведущего.
Исходник: docs-dev/book-redesign/assets-src/hscroll-bow.webp (2000×667, RGBA, прозрачный фон).
Что делает: обрезает прозрачные поля по содержимому, чистит слабый шум альфы, уменьшает до 1176×267 (масштаб 0.6) → public/ny-book/hscroll-bow.webp.
Геометрия для CSS (в пикселях РАБОЧЕГО файла, тело пергамента = 203 px по высоте в середине):
  верх декора над кромкой: 45 px (0.222 высоты тела), низ декора под кромкой: 19 px (0.094), концы (рулон+бант+хвоя): 211 px (1.039) с каждой стороны,
  середина (211…965) — чистый пергамент, растягивается (border-image slice 0 211 0 211).
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
