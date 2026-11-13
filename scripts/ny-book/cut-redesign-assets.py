#!/usr/bin/env python3
"""Нарезка исходников ведущего для мокапов редизайна «Книги» → docs-dev/book-redesign/assets-src/derived/ (ВРЕМЕННЫЕ производные).
 - cover-red|green|blue.webp — три обложки из sheet-covers-3books.webp (по прозрачным промежуткам);
 - timer-plate.webp — timer-sample-0049.webp с ОЧИЩЕННЫМ полем: цифры «00:49» и красная дуга НАРИСОВАНЫ в исходнике, здесь поверх поля
   положен ровный пергамент (эллипс по внутреннему кольцу). Это обходной путь для мокапа, НЕ финальный ассет — для боя нужен файл без цифр/дуги.
usage: python3 -I scripts/ny-book/cut-redesign-assets.py"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'assets-src'); OUT = os.path.join(SRC, 'derived'); os.makedirs(OUT, exist_ok=True)
# обложки
sh = Image.open(os.path.join(SRC, 'sheet-covers-3books.webp')).convert('RGBA'); a = np.asarray(sh)[..., 3] > 20
cols = a.any(axis=0); runs, s = [], None
for x, v in enumerate(cols):
    if v and s is None: s = x
    if not v and s is not None:
        if x - s > 100: runs.append((s, x))
        s = None
if s is not None: runs.append((s, len(cols)))
# слипшиеся книги делим по трети, если промежутков меньше двух
if len(runs) != 3: w = sh.width // 3; runs = [(i * w, (i + 1) * w) for i in range(3)]
for (x0, x1), name in zip(runs, ('red', 'green', 'blue')):
    c = sh.crop((x0, 0, x1, sh.height)); bb = c.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox(); c = c.crop(bb)
    c.save(os.path.join(OUT, f'cover-{name}.webp'), quality=88, method=6); print(name, c.size)
# таймер
im = Image.open(os.path.join(SRC, 'timer-sample-0049.webp')).convert('RGBA')
cx, cy, rx, ry = 768, 478, 282, 262; H, W = im.size[1], im.size[0]
rng = np.random.default_rng(3); yy, xx = np.mgrid[0:H, 0:W]; d = np.hypot((xx - cx) / rx, (yy - cy) / ry)
base = np.array([247, 224, 182], float)
tex = np.clip(np.stack([base[i] * (1 - 0.12 * d ** 2) + rng.normal(0, 2.2, (H, W)) for i in range(3)], -1), 0, 255)
mask = Image.new('L', im.size, 0); ImageDraw.Draw(mask).ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=255); mask = mask.filter(ImageFilter.GaussianBlur(2.5))
out = Image.composite(Image.fromarray(np.dstack([tex, np.full((H, W), 255)]).astype('uint8'), 'RGBA'), im, mask)
bb = out.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox(); out = out.crop(bb)
out.save(os.path.join(OUT, 'timer-plate.webp'), quality=90, method=6)
print('timer-plate', out.size, 'центр поля (доля):', round((cx - bb[0]) / out.width, 3), round((cy - bb[1]) / out.height, 3))
