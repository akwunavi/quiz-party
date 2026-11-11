#!/usr/bin/env python3
"""Подготовка присланных художником файлов к слотам арены (10.55): `village_2` и `spruce_set`.
Запуск: python3 scripts/arena/prep_p2.py <village_2_src.webp> <spruce_sheet_src.webp> — пишет public/arena/village_2.webp и spruce_set.webp.
Рисунок не меняется: village_2 — обрезка пустых полей + сжатие слабого светлого ореола по альфе (кривая, а не маска); ели — перепаковка листа 2×2 в полосу из 4 модулей 800×400 (низ на одной линии)."""
import sys, numpy as np
from PIL import Image
v = Image.open(sys.argv[1]).convert('RGBA'); a = np.asarray(v).astype(float)
A = a[..., 3] / 255.0; A2 = np.where(A >= 0.97, A, A * (A / 0.97) ** 4)   # слабое свечение вокруг силуэта гасим, плотный объект не трогаем
a[..., 3] = A2 * 255; v = Image.fromarray(a.astype('uint8'), 'RGBA').crop((0, 120, v.width, 560))
v.save('public/arena/village_2.webp', quality=92, alpha_quality=100, method=6)
s = Image.open(sys.argv[2]).convert('RGBA'); sa = np.asarray(s)[..., 3]
quads = [(0, 960, 0, 410), (960, s.width, 0, 410), (0, 960, 410, s.height), (960, s.width, 410, s.height)]
M = Image.new('RGBA', (3200, 400), (0, 0, 0, 0))
for i, (x0, x1, y0, y1) in enumerate(quads):
    ys, xs = np.nonzero(sa[y0:y1, x0:x1] > 8); bx0, bx1, by0, by1 = xs.min() + x0, xs.max() + x0 + 1, ys.min() + y0, ys.max() + y0 + 1
    c = s.crop((bx0, by0, bx1, by1)); M.alpha_composite(c, (i * 800 + (800 - c.width) // 2, 400 - 6 - c.height))
M.save('public/arena/spruce_set.webp', quality=92, alpha_quality=100, method=6)
