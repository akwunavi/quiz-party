#!/usr/bin/env python3
"""Статический просмотр прототипов «Книги»: ОДИН self-contained HTML из кадров shots/proto (без сервера, без сети, без CDN).
Навигация/разрешения/варианты — тот же review.js (режим window.REVIEW_STATIC). Кадры ужимаются (ширина ≤ 1400, WebP q52) и вшиваются
base64. Результат: docs-dev/book-redesign/review/book-review.html. usage: python3 -I e2e/book/review/build-static.py"""
import base64, io, json, os, re, subprocess, sys
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
SHOTS = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'shots', 'proto')
OUT = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'review', 'book-review.html')
HERE = os.path.dirname(__file__)

meta = json.loads(subprocess.run(['node', os.path.join(HERE, 'meta.mjs'), '--json'], capture_output=True, text=True, check=True, cwd=ROOT).stdout)
frames, have = {}, set()
def add(dirpath, prefix):
    if not os.path.isdir(dirpath): return
    for f in sorted(os.listdir(dirpath)):
        m = re.match(r'^(.+)-(1920|1899|1366|1280)x\d+\.webp$', f)
        if not m: continue
        sid, res = m.groups(); have.add(sid)
        im = Image.open(os.path.join(dirpath, f)).convert('RGB')
        im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
        buf = io.BytesIO(); im.save(buf, 'WEBP', quality=52, method=6)
        frames.setdefault(prefix + sid, {})[res] = 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()
add(SHOTS, '')
ADAPT = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'shots', 'adaptive')
add(os.path.join(ADAPT, 'before'), 'b:'); add(os.path.join(ADAPT, 'after'), 'a:')
have |= {i[2:] for i in frames if i[:2] in ('b:', 'a:')}
scenes = [{**{k: s[k] for k in ('id', 'title', 'group')}, 'teams': False, 'steps': [], 'path': None} for s in meta if s['id'] in have or any(k in frames for k in ('a:' + s['id'],))]
css = open(os.path.join(HERE, 'review.css'), encoding='utf-8').read()
js = open(os.path.join(HERE, 'review.js'), encoding='utf-8').read()
data = json.dumps({'scenes': scenes, 'frames': frames}, ensure_ascii=False)
html = f'''<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Book Design Review (кадры)</title><style>{css}</style></head>
<body><div id="app"><nav id="side"></nav><div id="main"><div id="bar"></div><div id="title"></div><div id="stage"><div id="msg"></div></div></div></div>
<script>window.REVIEW_STATIC={data.replace('</', '<\\/')}</script>
<script>{js}</script></body></html>'''
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(html)
print(f'{OUT}: {len(scenes)} сцен, {sum(len(v) for v in frames.values())} кадров, {len(html) // 1024} КБ')
