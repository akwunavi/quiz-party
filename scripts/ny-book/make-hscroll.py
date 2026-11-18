#!/usr/bin/env python3
"""Горизонтальный свиток для вариантов ответа «Книги»: собирается ТОЛЬКО из утверждённого public/ny-book/scroll.webp (новых ассетов нет).
Левый кап — закрученный рулон (верх-лево исходника), правый — его зеркало, середина — чистый пергамент исходника.
Результат: public/ny-book/hscroll.webp — одна картинка 812×230 для border-image (края 196 px, середина растягивается).
usage: python3 scripts/ny-book/make-hscroll.py"""
from PIL import Image
src = Image.open('public/ny-book/scroll.webp').convert('RGBA')
import numpy as np
cap = src.crop((0, 22, 196, 252))          # спираль рулона + кусок цилиндра (непрозрачные строки на стыке: 14…229)
mid = src.crop((340, 340, 900, 555))       # чистый пергамент без рамки и декора, высота 215 = высоте листа на стыке с рулоном
H, MW = 230, 420
W = Image.new('RGBA', (196 + MW + 196, H), (0, 0, 0, 0))
m = mid.resize((MW, 215))
mid_h = 215
arr = np.array(m).astype(float)
# кромка листа: по верху и низу пергамент темнеет (как край бумаги) и слегка закругляется — не плоский прямоугольник поверх рулонов
for i in range(10):
    k = 1 - 0.35 * (1 - i / 10) ** 2
    arr[i, :, :3] *= k; arr[214 - i, :, :3] *= k
arr[:2, :, 3] = 120; arr[-2:, :, 3] = 120
m = Image.fromarray(arr.clip(0, 255).astype('uint8'), 'RGBA')
# пергамент заходит ПОД рулоны (на 24 px с каждой стороны) — стык скрыт телом рулона, плоского «прямоугольника» нет
m = m.resize((MW + 48, 205)); W.alpha_composite(m, (196 - 24, 18))
W.alpha_composite(cap, (0, 0))
cr = cap.transpose(Image.FLIP_LEFT_RIGHT); W.alpha_composite(cr, (196 + MW, 0))
W.save('public/ny-book/hscroll.webp', quality=90)   # 812×230: border-image slice 0 196 0 196 (края не растягиваются, середина — да)
bg = Image.new('RGBA', W.size, (240, 228, 200, 255)); bg.alpha_composite(W); bg.convert('RGB').resize((1624, 460)).save('/tmp/hscroll-preview.png')
