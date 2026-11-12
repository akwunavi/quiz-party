#!/usr/bin/env python3
"""Попиксельное сравнение регресс-снимков других тем «до/после» правок «Книги».
Маска шума: пиксели, различающиеся между двумя прогонами «до» (+раздутие 2 px), исключаются; «после» сравнивается с «до №1»
вне маски. Порог канала 24. usage: python3 -I e2e/book/regress-compare.py <scratch> <theme> [...]
ждёт PNG в <scratch>/shots-png-regress-<theme>-before1|before2|after1/"""
import os, sys
import numpy as np
from PIL import Image
THR = 24
load = lambda p: np.asarray(Image.open(p).convert('RGB')).astype(np.int16)
def dilate(m, r=2):
    o = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            o |= np.roll(np.roll(m, dy, 0), dx, 1)
    return o
root, themes = sys.argv[1], sys.argv[2:]
bad = 0
for th in themes:
    d1, d2, da = (os.path.join(root, f'shots-png-regress-{th}-{t}') for t in ('before1', 'before2', 'after1'))
    for f in sorted(os.listdir(d1)):
        if not f.endswith('.png') or not os.path.exists(os.path.join(da, f)): continue
        a, b = load(os.path.join(d1, f)), load(os.path.join(da, f))
        noise = np.zeros(a.shape[:2], bool)
        if os.path.exists(os.path.join(d2, f)):
            noise = dilate((np.abs(a - load(os.path.join(d2, f))) > THR).any(-1))
        diff = (np.abs(a - b) > THR).any(-1) & ~noise
        pct = diff.mean() * 100
        box = ''
        if diff.any():
            ys, xs = np.nonzero(diff); box = f' область x{xs.min()}–{xs.max()} y{ys.min()}–{ys.max()}'
        flag = 'РАСХОЖДЕНИЕ' if pct > 0.05 else 'ok'
        bad += flag != 'ok'
        print(f'{th:17s} {f[:-4]:38s} diff={pct:.3f}%  маска шума={noise.mean()*100:.1f}%  {flag}{box}')
print(f'итого сцен с расхождением: {bad}')
