#!/usr/bin/env python3
"""Статический просмотр прототипов «Книги»: ОДИН self-contained HTML из кадров shots/proto (без сервера, без сети, без CDN).
Навигация/разрешения/варианты — тот же review.js (режим window.REVIEW_STATIC). Кадры ужимаются (ширина ≤ 1200, WebP q46) и вшиваются
base64. Результат: docs-dev/book-redesign/review/book-review.html. usage: python3 -I e2e/book/review/build-static.py"""
import base64, io, json, os, re, subprocess, sys
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
SHOTS = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'shots', 'proto')
OUT = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'review', 'book-review.html')
HERE = os.path.dirname(__file__)

meta = json.loads(subprocess.run(['node', os.path.join(HERE, 'meta.mjs'), '--json'], capture_output=True, text=True, check=True, cwd=ROOT).stdout)
frames, have = {}, set()
def add(dirpath, prefix, width=1200, q=46):
    if not os.path.isdir(dirpath): return
    for f in sorted(os.listdir(dirpath)):
        m = re.match(r'^(.+)-(1920|1899|1366|1280)x\d+\.webp$', f)
        if not m: continue
        sid, res = m.groups(); have.add(sid)
        im = Image.open(os.path.join(dirpath, f)).convert('RGB')
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        buf = io.BytesIO(); im.save(buf, 'WEBP', quality=q, method=6)
        frames.setdefault(prefix + sid, {})[res] = 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()
W_AD, Q_AD, W_RD, Q_RD, W_PR, Q_PR = [int(x) for x in os.environ.get('RV_SIZES', '800 32 880 34 1000 40').split()]
add(SHOTS, '', W_PR, Q_PR)
# доработка адаптивности: b: — исходный baseline (до A–C), c: — этапы A–C (cbf101b), a: — после доработки (кадры мельче: их много)
ADAPT2 = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'shots', 'adaptive2')
for d, pre in (('before', 'b:'), ('cbf', 'c:'), ('after', 'a:')): add(os.path.join(ADAPT2, d), pre, W_AD, Q_AD)
add(os.path.join(ROOT, 'docs-dev', 'book-redesign', 'shots', 'redesign'), '', W_RD, Q_RD)   # редизайн: сцены 3x/6x (кадры настоящих экранов)
have |= {i[2:] for i in frames if i[:2] in ('b:', 'c:', 'a:')}
scenes = [{**{k: s[k] for k in ('id', 'title', 'group')}, 'teams': False, 'steps': [], 'path': None} for s in meta if s['id'] in have or any(k in frames for k in ('a:' + s['id'],))]
MOCK = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'review', 'book-redesign-mockups.html')
MOCK_B64 = base64.b64encode(open(MOCK, 'rb').read()).decode() if os.path.exists(MOCK) else ''
TOPJS = '''(function(){var f=document.getElementById('vf'),l=document.getElementById('vl'),a=document.getElementById('app'),v=document.getElementById('live'),made=false;
function show(w){a.style.display=w==='f'?'':'none';v.style.display=w==='l'?'block':'none';f.className=w==='f'?'on':'';l.className=w==='l'?'on':'';
if(w==='l'&&!made&&window.__MOCK){made=true;var b=Uint8Array.from(atob(window.__MOCK),function(c){return c.charCodeAt(0)});var u=URL.createObjectURL(new Blob([b],{type:'text/html'}));var i=document.createElement('iframe');i.src=u;i.style.cssText='width:100%;height:calc(100vh - 44px);border:0;background:#15100d';v.appendChild(i)}}
f.onclick=function(){show('f')};l.onclick=function(){show('l')}})();'''
css = open(os.path.join(HERE, 'review.css'), encoding='utf-8').read()+'''
#top{display:flex;gap:10px;align-items:center;padding:6px 12px;background:#211813;border-bottom:1px solid #4a3a28;height:44px;color:#e9dcc2;font:13px system-ui}#top button{background:#2d2219;color:#e9dcc2;border:1px solid #5a4630;border-radius:6px;padding:5px 10px;cursor:pointer}#top button.on{background:#c9a14a;color:#2a1f17}#vn{color:#bba98a;font-size:12px}
#app{height:calc(100vh - 44px)}'''
js = open(os.path.join(HERE, 'review.js'), encoding='utf-8').read()
data = json.dumps({'scenes': scenes, 'frames': frames}, ensure_ascii=False)
html = f'''<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Book Design Review (кадры)</title><style>{css}</style></head>
<body><div id="top"><b>Book Design Review</b><button id="vf" class="on">Кадры настоящих экранов (статика)</button><button id="vl">Живые анимации и HTML-мокапы вариантов (интерактивно)</button><span id="vn">кадры — это снимки настоящих экранов игры, не живой стенд; вкладка справа — интерактивные HTML-мокапы, не компоненты игры</span></div><div id="live" style="display:none"></div><div id="app"><nav id="side"></nav><div id="main"><div id="bar"></div><div id="title"></div><div id="stage"><div id="msg"></div></div></div></div>
<script>window.REVIEW_STATIC={data.replace('</', '<\\/')}</script>
<script>{js}</script><script>window.__MOCK="__MOCK_PLACEHOLDER__"</script><script>{TOPJS}</script></body></html>'''
html = html.replace('__MOCK_PLACEHOLDER__', MOCK_B64)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(html)
print(f'{OUT}: {len(scenes)} сцен, {sum(len(v) for v in frames.values())} кадров, {len(html) // 1024} КБ')
