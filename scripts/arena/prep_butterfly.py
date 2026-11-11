#!/usr/bin/env python3
"""Лист кадров бабочки из присланного GIF (монарх, 9 кадров взмаха, 724×241, прозрачность 1 бит).
Запуск: python3 scripts/arena/prep_butterfly.py <butterfly.gif> → public/arena/butterfly.webp
Что делается: общий габарит всех кадров (тело стоит на месте), уменьшение до ячейки 192×134 (≈2/3), мягкое сглаживание ступенчатого края альфы GIF (радиус 0.6 px — только альфа, рисунок не меняется),
кадры в одну строку: лист 9×192 = 1728×134. Число кадров код берёт из ширины листа (ширина / 192)."""
import sys, numpy as np
from PIL import Image, ImageSequence, ImageFilter
im = Image.open(sys.argv[1]); fr = [f.convert('RGBA').copy() for f in ImageSequence.Iterator(im)]
bb = [Image.fromarray(np.asarray(f)[..., 3]).point(lambda v: 255 if v > 0 else 0).getbbox() for f in fr]
x0, y0, x1, y1 = min(b[0] for b in bb), min(b[1] for b in bb), max(b[2] for b in bb), max(b[3] for b in bb)
CW, CH = 192, 134; sheet = Image.new('RGBA', (CW * len(fr), CH), (0, 0, 0, 0))
for i, f in enumerate(fr):
    c = f.crop((x0, y0, x1, y1)); sc = min((CW - 4) / c.width, (CH - 4) / c.height); c = c.resize((round(c.width * sc), round(c.height * sc)), Image.LANCZOS)
    a = c.getchannel('A').filter(ImageFilter.GaussianBlur(0.6)); c.putalpha(a)
    cell = Image.new('RGBA', (CW, CH), (0, 0, 0, 0)); cell.alpha_composite(c, (CW - 2 - c.width, (CH - c.height) // 2)); sheet.alpha_composite(cell, (i * CW, 0))   # тело (правый край) в одном месте во всех кадрах
sheet.save('public/arena/butterfly.webp', quality=92, alpha_quality=100, method=6)
print(sheet.size, len(fr))
