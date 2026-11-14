#!/usr/bin/env python3
"""Медиа демо-пакета стенда «Книги» (e2e/book): картинки разных пропорций с
подписью пропорции, PNG с прозрачностью, короткие тоны для «Угадай мелодию».

Только Pillow (+ ffmpeg для звука, если найден). Пишет в <out>/book/*.
usage: python3 -I e2e/book/media/gen.py <out-dir> [ffmpeg-path]

Ничего из этого не коммитится — генерируется заново на каждом запуске
стенда в scratch (e2e/book/stand.mjs вызывает этот скрипт сам).
"""
import json
import math
import os
import shutil
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(sys.argv[1] if len(sys.argv) > 1 else 'out', 'book')
FFMPEG = sys.argv[2] if len(sys.argv) > 2 else (shutil.which('ffmpeg') or '')
os.makedirs(OUT, exist_ok=True)

FONT_PATHS = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
]


def font(size):
    for p in FONT_PATHS:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


# Палитра — нарочно «чужая» книге (холодные/яркие), чтобы на снимках было
# видно, где картинка, а где подложка темы.
PALETTE = [(46, 94, 170), (196, 72, 52), (58, 140, 92), (150, 84, 170), (216, 160, 40), (40, 150, 160)]


def opaque(name, w, h, label, color_i):
    """Непрозрачная картинка: градиент + сетка + крупная подпись пропорции."""
    c = PALETTE[color_i % len(PALETTE)]
    img = Image.new('RGB', (w, h))
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(1, h - 1)
        d.line([(0, y), (w, y)], fill=tuple(int(c[k] * (1 - .45 * t) + 30 * t) for k in range(3)))
    step = max(40, min(w, h) // 8)
    for x in range(0, w, step):
        d.line([(x, 0), (x, h)], fill=(255, 255, 255), width=1)
    for y in range(0, h, step):
        d.line([(0, y), (w, y)], fill=(255, 255, 255), width=1)
    d.rectangle([0, 0, w - 1, h - 1], outline=(255, 255, 255), width=6)
    d.line([(0, 0), (w, h)], fill=(255, 255, 255), width=3)
    d.line([(w, 0), (0, h)], fill=(255, 255, 255), width=3)
    size = max(28, min(w, h) // 6)
    while size > 28 and d.textlength(label, font=font(size)) > w * .8:   # подпись не шире 80% картинки
        size -= 4
    f = font(size)
    sub = font(max(18, min(w, h) // 16))
    tw = d.textlength(label, font=f)
    d.rectangle([w / 2 - tw / 2 - 24, h / 2 - f.size * .75, w / 2 + tw / 2 + 24, h / 2 + f.size * .75], fill=(0, 0, 0))
    d.text((w / 2, h / 2), label, font=f, fill=(255, 255, 255), anchor='mm')
    d.text((w / 2, h / 2 + f.size * 1.2), f'{w}×{h}', font=sub, fill=(255, 255, 255), anchor='mm')
    img.save(os.path.join(OUT, name), quality=86)
    return {'file': name, 'w': w, 'h': h, 'alpha': False}


def transparent(name, w, h, label):
    """PNG с альфой: звезда + подпись, вокруг — полностью прозрачно."""
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy, r1, r2 = w / 2, h / 2 - h * .05, min(w, h) * .45, min(w, h) * .19
    pts = []
    for k in range(10):
        a = -math.pi / 2 + k * math.pi / 5
        r = r1 if k % 2 == 0 else r2
        pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    d.polygon(pts, fill=(222, 172, 40, 255), outline=(120, 70, 10, 255))
    # полупрозрачный ореол — проверка, что подложка темы не «съедает» альфу
    d.ellipse([cx - r1 * 1.05, cy - r1 * 1.05, cx + r1 * 1.05, cy + r1 * 1.05], outline=(255, 255, 255, 110), width=10)
    f = font(max(24, min(w, h) // 9))
    d.text((cx, h - f.size * 1.1), label, font=f, fill=(30, 30, 30, 255), anchor='mm', stroke_width=3, stroke_fill=(255, 255, 255, 255))
    img.save(os.path.join(OUT, name))
    return {'file': name, 'w': w, 'h': h, 'alpha': True}


images = [
    opaque('p3x4.jpg', 900, 1200, '3:4', 0),
    opaque('p16x9.jpg', 1600, 900, '16:9', 1),
    opaque('p1x1.jpg', 1000, 1000, '1:1', 2),
    opaque('p4x3.jpg', 1200, 900, '4:3', 3),
    opaque('p9x16.jpg', 720, 1280, '9:16', 4),
    opaque('p21x9.jpg', 1680, 720, '21:9', 5),
    opaque('ans16x9.jpg', 1600, 900, 'ОТВЕТ 16:9', 2),
    opaque('rebus-a.jpg', 1000, 800, 'РЕБУС А 5:4', 3),
    opaque('rebus-b.jpg', 800, 1000, 'РЕБУС Б 4:5', 4),
    transparent('alpha1x1.png', 1000, 1000, 'PNG α 1:1'),
    transparent('alpha3x2.png', 1200, 800, 'PNG α 3:2'),
]
for i, lbl in enumerate(['А', 'Б', 'В', 'Г']):
    images.append(opaque(f'opt-{i}.jpg', [1000, 900, 1600, 1000][i], [1000, 1200, 900, 750][i], f'ВАРИАНТ {lbl}', i))

# наборы для сценариев адаптивной раскладки (4 горизонтальных / вертикальных / квадратных)
for i, lbl in enumerate('ABCD'):
    images.append(opaque(f'ha-{i}.jpg', 800, 450, f'16:9 {lbl}', i))
    images.append(opaque(f'va-{i}.jpg', 450, 800, f'9:16 {lbl}', i + 1))
    images.append(opaque(f'sa-{i}.jpg', 600, 600, f'1:1 {lbl}', i + 2))

audio = []
if FFMPEG:
    # 4 + 6 треков на тему, 4 темы максимум; тоны разной высоты, 14 с
    for t in range(4):
        for k in range(6):
            name = f'mel-{t}-{k}.mp3'
            freq = 220 + 55 * t + 30 * k
            subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-f', 'lavfi', '-i',
                            f'sine=frequency={freq}:duration=14', '-af', 'volume=0.3',
                            '-ac', '1', '-b:a', '48k', os.path.join(OUT, name)], check=True)
            audio.append(name)
    ext = 'mp3'
else:
    # запасной путь без ffmpeg — WAV встроенным модулем
    import struct
    import wave
    for t in range(4):
        for k in range(6):
            name = f'mel-{t}-{k}.wav'
            freq, rate = 220 + 55 * t + 30 * k, 16000
            with wave.open(os.path.join(OUT, name), 'w') as wv:
                wv.setnchannels(1); wv.setsampwidth(2); wv.setframerate(rate)
                wv.writeframes(b''.join(struct.pack('<h', int(9000 * math.sin(2 * math.pi * freq * i / rate))) for i in range(rate * 14)))
            audio.append(name)
    ext = 'wav'

json.dump({'images': images, 'audio': audio, 'audioExt': ext}, open(os.path.join(OUT, 'manifest.json'), 'w'), ensure_ascii=False, indent=1)
print(f'media: {len(images)} картинок, {len(audio)} треков ({ext}) → {OUT}')
