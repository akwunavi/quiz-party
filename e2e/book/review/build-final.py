#!/usr/bin/env python3
"""Итоговый просмотр «Книги»: разделы «Актуальная версия» / «На согласовании» / «Архив / Отклонено», 13 обязательных пунктов,
4 разрешения. Один self-contained HTML (кадры WebP base64, демо — blob-iframe). usage: python3 -I e2e/book/review/build-final.py"""
import base64, io, json, os
from PIL import Image
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
SH = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'shots', 'redesign')
RV = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'review')
RES = ['1920x1080', '1899x905', '1366x768', '1280x720']
W, Q = 820, 38
def frame(sid, res):
    f = os.path.join(SH, f'{sid}-{res}.webp')
    if not os.path.exists(f): return None
    im = Image.open(f).convert('RGB'); im = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'WEBP', quality=Q, method=6); return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()
def blob(name): return base64.b64encode(open(os.path.join(RV, name), 'rb').read()).decode()

# (номер, заголовок, [id сцен], пометка о проверке)
CURRENT = [
 (1, 'Лобби: 0 и 8 команд', ['01-lobby-0', '01-lobby-8'], 'кадры настоящего экрана, 4 разрешения'),
 (2, 'Рандомайзер: затемнён весь экран, QR не просвечивает, окно по центру', ['68-rand-8', '67-rand-2'], 'кадры настоящего экрана'),
 (3, 'Правила раунда (единый шаблон)', ['700-rules-r0', '701-rules-r1'], 'кадры настоящего экрана'),
 (4, 'Правила кроссворда (особый шаблон: сетка слева, правила справа)', ['703-rules-r3'], 'кадры настоящего экрана'),
 (5, 'Длинный вопрос: крупный таймер, ёлки на месте', ['04-q-0img-long', '07-q-3img'], 'кадры настоящего экрана'),
 (6, '«120 секунд»: 4+4 карточки на двух страницах', ['35-sprint'], 'кадры настоящего экрана'),
 (7, '«Скрэмбл»: 6 / 8 / 16 команд', ['49-anagram-6', '49-anagram-8', '49-anagram-16'], 'кадры настоящего экрана; на 16 командах имена мелкие'),
 (8, 'Блиц: карточка команды + шарик цвета команды', ['41-blitz-turn', '42-blitz-verdict'], 'кадры настоящего экрана'),
 (9, 'Экран ответа с картинкой: рядом с ответом, 3 / 8 / 16 команд', ['69-ans-1img', '69-ans-3img', '65-reveal-short', '64-reveal-16'], 'кадры настоящего экрана; несколько картинок — компактный ряд'),
 (10, 'Мелодия и «Своя игра»: крупные книги', ['13-melody-board-3x4', '37-jp-board'], 'кадры настоящего экрана; правая ёлка слегка заходит на угол книги'),
 (11, 'Свиток-модалка (мелодия, «Своя игра»)', ['14-melody-snippet', '38-jp-tile'], 'кадры настоящего экрана; анимация — вкладка «Анимации»'),
 (12, 'Финал: от последнего к первому, 16 команд читаемы', ['15-finale-16', '15-finale-8'], 'кадры настоящего экрана; на 1280×720 имена около 12 px'),
]
PROPOSED = [('Правила всех раундов (галерея)', [f'7{r:02d}-rules-r{r}' for r in range(15)]),
            ('Варианты прежних согласований: правила в рамке-свитке; финал V2/V3; типографика B', ['62-var-rules2', '15-finale-8-v2', '15-finale-8-v3', '60-var-fontB'])]
frames = {}
def need(ids):
    for s in ids:
        for r in RES:
            f = frame(s, r)
            if f: frames.setdefault(s, {})[r] = f
for n, t, ids, c in CURRENT: need(ids)
for t, ids in PROPOSED: need(ids)
miss = [s for n, t, ids, c in CURRENT for s in ids if s not in frames]
if miss: print('НЕТ кадров:', miss)
def cards(ids): return ''.join(f'<figure data-id="{s}"><img alt="{s}"><figcaption>{s}</figcaption></figure>' for s in ids if s in frames)
sec_cur = ''.join(f'<section class="it"><h3>{n}. {t}</h3><p class="n">{c}</p><div class="g">{cards(ids)}</div></section>' for n, t, ids, c in CURRENT)
sec_cur += '<section class="it"><h3>13. Редактор компоновки — рабочий прототип</h3><p class="n">интерактивный HTML (не в боевой админке): перетаскивание, ресайз, авто/вручную, сброс, вопрос/ответ, сохранение в долях; подложка — реальные кадры</p><iframe data-b="led"></iframe></section>'
sec_prop = ''.join(f'<section class="it"><h3>{t}</h3><div class="g">{cards(ids)}</div></section>' for t, ids in PROPOSED)
sec_prop += '<section class="it"><h3>Перелистывание страницы: два варианта (A жёсткая / B с изгибом)</h3><p class="n">концепт на кадрах настоящих экранов; не подключён к игре</p><iframe data-b="flip"></iframe></section>'
sec_prop += '<section class="it"><h3>Анимации настоящих компонентов: снег лобби, раскрытие ответа, свиток, появление команд в финале</h3><p class="n">записи реального проектора</p><iframe data-b="anim"></iframe></section>'
sec_arch = '''<section class="it"><h3>Архив</h3><ul><li><b>book-review.html</b> — предыдущий просмотр (прототипы, адаптивность до/после, этапы A–C).</li><li><b>book-redesign-mockups.html</b> — интерактивные HTML-мокапы вариантов предыдущего согласования.</li><li><b>docs-dev/book-redesign/shots/baseline</b> — состояние «до редизайна».</li></ul><p class="n">Отклонённых вариантов в этой итерации нет: решения ведущего по ним в этом заходе не поступали. Старые варианты (правила в рамке, финал V2/V3, типографика B) вынесены в раздел «На согласовании», пока ведущий их не отклонит или не утвердит.</p></section>'''
css = '''<style>:root{--bg:#1c1410;--ink:#f1e4c6;--gold:#c9a14a;--red:#7a1f2b;--card:#2a1f17}@media (prefers-color-scheme:light){:root{--bg:#f3ead6;--ink:#2a1a12;--card:#fffaf0}}
html,body{margin:0;background:var(--bg);color:var(--ink);font:15px system-ui}header{position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--gold);padding:8px 16px;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
button{background:var(--red);color:#fff;border:1px solid var(--gold);border-radius:6px;padding:6px 12px;cursor:pointer;font:inherit}button.on{background:var(--gold);color:#2a1a12}
main{max-width:1500px;margin:0 auto;padding:12px 16px 60px}.it{margin:20px 0;padding:12px;border:1px solid rgba(201,161,74,.5);border-radius:8px;background:var(--card)}h3{margin:0 0 6px}.n{margin:0 0 8px;opacity:.8;font-size:13px}
.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr));gap:10px}figure{margin:0}img{width:100%;height:auto;border-radius:4px;background:#000;display:block}figcaption{font-size:12px;opacity:.7;padding-top:2px}
iframe{width:100%;height:min(80vh,720px);border:0;background:#000;border-radius:6px}.sec{display:none}.sec.on{display:block}.lead{opacity:.85}</style>'''
data = json.dumps(frames, ensure_ascii=False)
html = f'''<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Книга — итоговый просмотр</title>{css}</head><body>
<header><b>Книга — итоговый просмотр</b><span id="tabs"></span><span style="flex:1"></span><span>Экран:</span><span id="res"></span></header>
<main><p class="lead">Ничего здесь не принято: решения — за ведущим. Кадры — снимки настоящих экранов игры на тестовых данных (стенд), демо-вкладки помечены. Известные слабые места — в конце файла.</p>
<div class="sec on" id="s0">{sec_cur}</div><div class="sec" id="s1">{sec_prop}</div><div class="sec" id="s2">{sec_arch}</div>
<section class="it"><h3>Слабые места и что нужно от ведущего</h3><ul><li>Ассеты дом, фонарь, холм, циферблат таймера — низкого разрешения; крупнее растягивать нельзя (размоются) — нужны исходники больше.</li><li>Финал, 16 команд, 1280×720: имена около 12 px; «Скрэмбл», 16 команд: имена в панели мелкие.</li><li>Ответ с несколькими картинками и длинным пояснением — прежняя колонка (картинки компактнее).</li><li>Правая ёлка слегка заходит на угол книги на доске мелодии.</li></ul></section></main>
<script>
const F={data.replace('</', '<\\/')};const B={{led:"{blob('layout-editor.html')}",flip:"{blob('page-flip.html')}",anim:"{blob('animations.html')}"}};
const RES={json.dumps(RES)};let res=RES[0];
const tabs=[['Актуальная версия','s0'],['На согласовании','s1'],['Архив / Отклонено','s2']];
const tb=document.getElementById('tabs');tabs.forEach((t,i)=>{{const b=document.createElement('button');b.textContent=t[0];b.className=i?'':'on';b.onclick=()=>{{document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));document.getElementById(t[1]).classList.add('on');[...tb.children].forEach(x=>x.className='');b.className='on';mk()}};tb.append(b)}});
const rb=document.getElementById('res');RES.forEach(r=>{{const b=document.createElement('button');b.textContent=r.replace('x','×');b.className=r===res?'on':'';b.onclick=()=>{{res=r;[...rb.children].forEach(x=>x.className='');b.className='on';mk()}};rb.append(b)}});
function mk(){{document.querySelectorAll('.sec.on figure').forEach(f=>{{const s=F[f.dataset.id];f.querySelector('img').src=(s&&(s[res]||s[RES[0]]))||''}});
 document.querySelectorAll('.sec.on iframe[data-b]').forEach(i=>{{if(!i.src){{const u=Uint8Array.from(atob(B[i.dataset.b]),c=>c.charCodeAt(0));i.src=URL.createObjectURL(new Blob([u],{{type:'text/html'}}))}}}})}}
mk();
</script></body></html>'''
out = os.path.join(RV, 'book-review-final.html')
open(out, 'w', encoding='utf-8').write(html); print(out, len(html) // 1024, 'КБ', len(frames), 'сцен')
