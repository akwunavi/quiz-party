#!/usr/bin/env python3
"""Демо анимаций НАСТОЯЩИХ компонентов «Книги»: записи реального проектора (e2e/book/anim-shoot.cjs → webm) вшиты в один HTML.
usage: python3 -I e2e/book/review/build-anim.py <каталог с *-s.webm>"""
import base64, os, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
src = sys.argv[1]
items = [('snow-lobby', 'Снег лобби', 'Настоящее лобби (8 команд): три слоя снега разной скорости над пейзажем. При «уменьшении движения» снег не рисуется.'),
         ('reveal', 'Раскрытие ответа', 'Настоящий экран разбора: ведущий нажимает «показать ответ» — ответ появляется, затем команды получают отметки (шары-статусы).'),
         ('scroll-unroll', 'Разворачивание свитка', 'Настоящая модалка мелодии: свиток разворачивается сверху вниз за 0.75 с. При «уменьшении движения» — просто плавное появление.'),
         ('finale', 'Появление команд в финале', 'Настоящий финал (8 команд): объявление от последнего места к первому, каждая строка опускается сверху и остаётся. При «уменьшении движения» — все строки сразу.')]
cards = ''
for k, t, d in items:
    b = base64.b64encode(open(os.path.join(src, k + '-s.webm'), 'rb').read()).decode()
    cards += f'<section><h3>{t}</h3><video muted loop playsinline controls preload="auto" src="data:video/webm;base64,{b}"></video><p>{d}</p><button onclick="var v=this.previousElementSibling.previousElementSibling;v.currentTime=0;v.play()">Сначала</button></section>'
html = f'''<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Анимации «Книги» — настоящие компоненты</title>
<style>:root{{--bg:#1c1410;--ink:#f1e4c6;--gold:#c9a14a}}@media (prefers-color-scheme:light){{:root{{--bg:#f3ead6;--ink:#2a1a12}}}}
html,body{{margin:0;background:var(--bg);color:var(--ink);font:15px system-ui}}main{{max-width:1100px;margin:0 auto;padding:16px}}
.g{{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,480px),1fr));gap:16px}}section{{border:1px solid var(--gold);border-radius:8px;padding:10px}}video{{width:100%;border-radius:6px;background:#000}}
button{{background:#7a1f2b;color:#fff;border:1px solid var(--gold);border-radius:6px;padding:6px 12px;cursor:pointer}}h3{{margin:0 0 8px}}</style></head><body><main>
<h2>Анимации «Книги» на настоящих компонентах</h2><p>Это записи реального проектора (тот же код, что в игре, 1280×720), не мокап. Все анимации в игре уважают prefers-reduced-motion. Перелистывание страницы — отдельная страница <b>page-flip.html</b>.</p>
<div class="g">{cards}</div></main>
<script>document.querySelectorAll('video').forEach(function(v){{if(matchMedia('(prefers-reduced-motion: reduce)').matches){{v.removeAttribute('loop')}}else{{v.autoplay=true;v.play().catch(function(){{}})}}}})</script></body></html>'''
out = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'review', 'animations.html')
open(out, 'w', encoding='utf-8').write(html); print(out, len(html) // 1024, 'КБ')
