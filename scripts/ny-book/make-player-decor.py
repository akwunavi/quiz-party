#!/usr/bin/env python3
"""Лёгкие копии существующих ассетов «Книги» для ТЕЛЕФОНА игрока (10.75, HANDOFF §3fc).
Новых картинок не рисуется: берутся готовые файлы проекта и уменьшаются под ширину телефона (≤ 3× от 440 css-px на гирлянде).
  garland-long.webp (1125×224, 100 КБ)  -> player-garland.webp  (640 px шириной)
  snow-hill-hi.webp (1700×208, 106 КБ)  -> player-hill.webp     (обрезан верх 28 px — там остаток соседнего сугроба; 900 px шириной)
  tree-4.webp (384×584, 61 КБ)          -> player-tree.webp     (высота 180 px)
Запуск: python3 -I scripts/ny-book/make-player-decor.py   (из корня репозитория)"""
from PIL import Image
import os

SRC = 'public/ny-book'


def save(im, name):
    out = os.path.join(SRC, name)
    im.save(out, 'WEBP', quality=84, method=6)
    print(name, im.size, os.path.getsize(out), 'байт')


g = Image.open(f'{SRC}/_tmp/garland-long.webp').convert('RGBA')
save(g.resize((640, round(g.height * 640 / g.width)), Image.LANCZOS), 'player-garland.webp')

h = Image.open(f'{SRC}/snow-hill-hi.webp').convert('RGBA')
h = h.crop((0, 28, h.width, h.height))
save(h.resize((900, round(h.height * 900 / h.width)), Image.LANCZOS), 'player-hill.webp')

t = Image.open(f'{SRC}/_tmp/tree-4.webp').convert('RGBA')
save(t.resize((round(t.width * 180 / t.height), 180), Image.LANCZOS), 'player-tree.webp')
