#!/usr/bin/env python3
"""Подложки (PNG → JPEG q88) и заглушки-«фото» для макетов (мягкие градиенты разных пропорций, без цифр/подписей пропорции).
usage: python3 -I make-assets.py   (запускать из любого места; пути относительно этого файла)"""
import os, math, random
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, '..', '..', '..', 'docs-dev', 'book-redesign', 'mockups-20261128', 'sixletters', 'assets')

# подложки: PNG стенда → JPEG q88, PNG удаляется (в git — только лёгкие файлы)
for f in sorted(os.listdir(A)):
    if f.startswith('bd-') and f.endswith('.png'):
        im = Image.open(os.path.join(A, f)).convert('RGB')
        out = os.path.join(A, f[:-4] + '.jpg')
        im.save(out, 'JPEG', quality=88, optimize=True)
        os.remove(os.path.join(A, f))
        print(f, '->', os.path.getsize(out) // 1024, 'KB')

PHOTOS = [  # (имя, w, h, фон-верх, фон-низ, цвет фигуры)
    ('ph1', 900, 900, (232, 226, 214), (160, 150, 138), (58, 52, 48)),      # «гравюра»: светлый портрет
    ('ph2', 1280, 720, (64, 36, 40), (18, 12, 14), (170, 90, 80)),          # тёмный кадр
    ('ph3', 1200, 900, (150, 186, 206), (64, 96, 120), (236, 240, 244)),    # холодный пейзаж
    ('ph4', 900, 1200, (222, 190, 120), (120, 70, 40), (252, 238, 200)),    # тёплый вертикальный
]
random.seed(7)
for name, w, h, top, bot, fig in PHOTOS:
    im = Image.new('RGB', (w, h))
    px = im.load()
    for y in range(h):
        t = y / (h - 1)
        c = tuple(int(top[i] * (1 - t) + bot[i] * t) for i in range(3))
        for x in range(w):
            px[x, y] = c
    d = ImageDraw.Draw(im, 'RGBA')
    cx, cy = w * 0.5, h * 0.52
    r = min(w, h) * 0.26
    d.ellipse([cx - r, cy - r * 1.25, cx + r, cy + r * 0.75], fill=fig + (210,))                 # голова
    d.rounded_rectangle([cx - r * 1.5, cy + r * 0.55, cx + r * 1.5, h + r], radius=int(r * .6), fill=fig + (170,))   # плечи
    im = im.filter(ImageFilter.GaussianBlur(min(w, h) / 90))
    # мягкая виньетка
    vg = Image.new('L', (w, h), 0)
    ImageDraw.Draw(vg).ellipse([-w * .2, -h * .2, w * 1.2, h * 1.2], fill=255)
    vg = vg.filter(ImageFilter.GaussianBlur(min(w, h) / 4))
    dark = Image.new('RGB', (w, h), (20, 14, 10))
    im = Image.composite(im, dark, vg.point(lambda v: int(120 + v * 135 / 255)))
    out = os.path.join(A, name + '.jpg')
    im.save(out, 'JPEG', quality=84, optimize=True)
    print(name, w, h, os.path.getsize(out) // 1024, 'KB')
