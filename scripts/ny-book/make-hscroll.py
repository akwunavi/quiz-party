#!/usr/bin/env python3
"""Горизонтальный свиток для вариантов ответа «Книги»: собирается ТОЛЬКО из утверждённого public/ny-book/scroll.webp (новых ассетов нет).
Левый кап — закрученный рулон (верх-лево исходника), правый — его зеркало, середина — чистый пергамент исходника.
Результат: public/ny-book/hscroll.webp — одна картинка 812×230 для border-image (края 196 px, середина растягивается).
usage: python3 scripts/ny-book/make-hscroll.py"""
from PIL import Image
src = Image.open('public/ny-book/scroll.webp').convert('RGBA')
cap = src.crop((0, 22, 196, 252))          # спираль рулона + кусок цилиндра
mid = src.crop((340, 340, 900, 570))       # чистый пергамент без рамки и декора
W = Image.new('RGBA', (196 + 420 + 196, 230), (0, 0, 0, 0))
W.paste(cap, (0, 0), cap); W.paste(mid.resize((420, 230)), (196, 0)); cr = cap.transpose(Image.FLIP_LEFT_RIGHT); W.paste(cr, (196 + 420, 0), cr)
W.save('public/ny-book/hscroll.webp', quality=88)   # 812×230: border-image slice 0 196 0 196 (края не растягиваются, середина — да)
