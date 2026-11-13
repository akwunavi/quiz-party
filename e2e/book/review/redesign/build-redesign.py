#!/usr/bin/env python3
"""Сборка ОДНОГО автономного HTML с интерактивными мокапами редизайна «Книги» (шрифты и ассеты — data URI, без сети/CDN).
Результат: docs-dev/book-redesign/review/book-redesign-mockups.html. usage: python3 -I e2e/book/review/redesign/build-redesign.py"""
import base64, io, json, os
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))
OUT = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'review', 'book-redesign-mockups.html')
b64 = lambda b: base64.b64encode(b).decode()
def webp(path, w, q=80):
    im = Image.open(path).convert('RGBA'); im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'WEBP', quality=q, method=6); return 'data:image/webp;base64,' + b64(buf.getvalue())
D = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'assets-src', 'derived'); T = os.path.join(ROOT, 'public', 'ny-book', '_tmp')
assets = {'coverRed': webp(f'{D}/cover-red.webp', 440, 78), 'coverGreen': webp(f'{D}/cover-green.webp', 440, 78), 'coverBlue': webp(f'{D}/cover-blue.webp', 440, 78),
  'plate': webp(f'{D}/timer-plate.webp', 420, 82), 'garland': webp(f'{T}/garland-long.webp', 1060, 70), 'sprigB': webp(f'{T}/sprig-berries.webp', 272, 75), 'sprigC': webp(f'{T}/sprig-cone.webp', 252, 75)}
F = os.path.join(ROOT, 'public', 'fonts')
fonts = [('PT Serif', 400, 'normal', 'pt-serif-cyrillic-400-normal'), ('PT Serif', 700, 'normal', 'pt-serif-cyrillic-700-normal'), ('PT Serif', 400, 'italic', 'pt-serif-cyrillic-400-italic'),
  ('Cormorant Garamond', 700, 'normal', 'cormorant-garamond-700-normal-cyrillic'), ('EB Garamond', 600, 'normal', 'eb-garamond-600-normal-cyrillic'),
  ('Lora', 400, 'normal', 'lora-cyrillic-400-normal'), ('Lora', 700, 'normal', 'lora-cyrillic-700-normal'), ('Lora', 400, 'italic', 'lora-cyrillic-400-italic'), ('Philosopher', 700, 'normal', 'philosopher-700-normal-cyrillic')]
ff = ''.join(f"@font-face{{font-family:'{n}';font-weight:{w};font-style:{s};src:url(data:font/woff2;base64,{b64(open(f'{F}/{f}.woff2','rb').read())}) format('woff2')}}\n" for n, w, s, f in fonts)
css = open(f'{HERE}/redesign.css', encoding='utf-8').read(); js = open(f'{HERE}/redesign.js', encoding='utf-8').read()
html = f'''<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Book Redesign Mockups</title><style>{ff}{css}</style></head>
<body><div id="bar"></div><div id="note"></div><div id="main"></div><div id="zoom"></div><script>window.RD_ASSETS={json.dumps(assets)}</script><script>{js}</script></body></html>'''
os.makedirs(os.path.dirname(OUT), exist_ok=True); open(OUT, 'w', encoding='utf-8').write(html); print(OUT, len(html) // 1024, 'КБ')
