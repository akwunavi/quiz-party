// Book Redesign Mockups: ИНТЕРАКТИВНЫЕ HTML-мокапы (не настоящие компоненты игры) на локальных шрифтах и ассетах «Книги». См. docs-dev/book-redesign/REDESIGN.md
'use strict'
const A = window.RD_ASSETS, $ = s => document.querySelector(s)
const RES = { '1920': [1920, 1080], '1899': [1899, 905], '1366': [1366, 768], '1280': [1280, 720] }
const S = { tab: 'typo', res: '1920', reduce: matchMedia('(prefers-reduced-motion: reduce)').matches, teams: 8, names: 'short', state: 'normal', rules: 'short', ftn: 8 }
const SHORT = ['Лисы', 'Ёжики', 'Совы', 'Волки', 'Зайцы', 'Белки', 'Рыси', 'Тетери', 'Кроты', 'Ласки', 'Выдры', 'Сойки', 'Бобры', 'Утки', 'Грачи', 'Чижи']
const LONG = ['Знатоки из подвала на Ленина', 'Ну мы же просто пришли поиграть', 'Команда имени Деда Мороза и Снегурочки', 'Ёлки-палки', 'Три богатыря и Змей Горыныч', 'Эрудиты-самоучки', 'Щелкунчик и мышиный король', 'ИвановыИвановыИвановыИвановы', 'Mr. & Mrs. Smith', 'Бабки на лавке', 'Квартет без Мартышки', 'Шесть соток', 'Чудо-юдо рыба-кит', 'Игорь + 4', 'Саша и сироты', 'Яблоки в снегу']
const COLORS = ['#c0392b', '#2e7d32', '#1565c0', '#8e24aa', '#ef6c00', '#00838f', '#6d4c41', '#ad1457', '#558b2f', '#283593', '#d84315', '#00695c', '#4527a0', '#9e9d24', '#37474f', '#c2185b']
const names = n => (S.names === 'short' ? SHORT : LONG).slice(0, n)
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
const img = (k, st = '') => `<img src="${A[k]}" style="${st}" alt="">`

// ── сцена: книжный разворот ──
const book = (inner, o = {}) => `<div class="desk"></div><div class="book"><div class="pages"><div class="pg l"></div><div class="pg r"></div><div class="fold"></div></div></div>
  <div class="content">${inner}</div>${o.nodecor ? '' : `<img class="garl ${o.tw ? 'tw' : ''}" src="${A.garland}" style="left:50%;top:-34px;width:900px;margin-left:-450px;position:absolute;pointer-events:none"><img class="sprig" src="${A.sprigB}" style="left:110px;bottom:60px"><img class="sprig" src="${A.sprigC}" style="right:110px;bottom:60px">`}`
const qnA = (r = 3, q = 4, n = 12) => `<div class="qn-a">Р${r} <i>·</i> вопрос <b>${q}</b> <i>/ ${n}</i></div>`
const qnB = (r = 3, q = 4, n = 12) => `<div class="qn-b">раунд ${r}<b>${q}</b><small>из ${n}</small></div>`
const timer = (sec, d = 150, tot = 60) => { const low = sec <= 10; return `<div class="tm ${low ? 'low' : ''}" style="width:${d}px;--d:${d}px;--f:${Math.max(0, sec / tot)}"><img src="${A.plate}" alt=""><span class="arc"></span><span class="num">${sec}</span></div>` }
const ph = (w, h, c = 0) => `<div class="pframe"><span class="ph" style="width:${w}px;height:${h}px;filter:hue-rotate(${c * 70}deg)"></span></div>`

// ── карточки команд ──
function cards(n, kind, st, o = {}) {
  const ns = names(n), fs = n <= 4 ? 46 : n <= 8 ? 36 : 27, cols = n <= 8 ? 1 : 2, w = o.w ?? 700
  const items = ns.map((nm, i) => {
    let cls = '', mk = '', sc = ''
    if (st === 'answers') { if (i % 3 === 0) { cls = 'ok'; mk = '✓' } else if (i % 3 === 1) { cls = 'bad'; mk = '✗' } else if (i % 5 === 2) cls = 'empty' }
    if (st === 'sel' && i === 1) cls = 'sel'
    if (st === 'final') sc = (20 - i * 1.5).toFixed(1).replace('.0', '')
    return `<div class="tc tc${kind} ${cls}" style="--c:${COLORS[i]}"><span class="dot"></span><span class="nm">${esc(nm)}</span>${mk ? `<span class="mk">${mk}</span>` : ''}${sc ? `<span class="sc">${sc}</span>` : ''}</div>`
  }).join('')
  if (n === 0) return `<div style="text-align:center;width:${w}px"><div class="chap" style="font-size:56px">Ждём команды</div><p class="note" style="margin:12px 0 0">Наведите камеру на код слева — и выберите название</p></div>`
  return `<div style="width:${w}px;font-size:${fs}px;display:grid;grid-template-columns:repeat(${cols},1fr);gap:.4em .5em">${items}</div>`
}
const lobbyScene = (n, kind, st) => book(`<div class="abs" style="left:250px;top:230px;width:640px;text-align:center"><div class="chap" style="font-size:96px">Викторина</div><div class="round-tag" style="margin-top:14px">у новогодней ёлки</div><div style="margin:40px auto 0;width:300px;height:300px;background:#fff;box-shadow:0 0 0 8px #fffdf6,0 0 0 10px var(--line);display:grid;place-items:center;color:#2a1f17;font:700 24px var(--q-font)">QR-код</div><div class="svc" style="margin-top:20px">сканируйте</div></div>
  <div class="abs" style="left:1010px;top:200px;width:700px"><div class="svc" style="margin-bottom:14px;color:var(--red)">команды · ${n}</div>${cards(n, kind, st, { w: 660 })}</div>`, { tw: 1 })

// ── вкладки ──
const T = {}
T.typo = () => ['A', 'B'].map(d => ({ cap: d === 'A' ? 'Направление A — «Классическая книга»: PT Serif (вопрос/ответы/правила) + Cormorant Garamond (главы)' : 'Направление B — «Печатная книга»: Lora (вопрос/ответы/правила) + Philosopher (главы)', cls: 'dir' + d,
  html: book(`<div class="abs" style="left:250px;top:90px">${qnA()}</div>
  <div class="abs" style="left:250px;top:200px;width:620px"><div class="round-tag">Раунд 3</div><div class="chap" style="margin-top:8px">Зимние чудеса</div><p class="rule" style="margin-top:30px">За верный ответ — один балл. Ответ можно поправить два раза, пока идёт время.</p><div class="svc" style="margin-top:36px">правила раунда</div></div>
  <div class="abs" style="left:1010px;top:200px;width:660px"><div class="q" style="font-size:46px;text-align:left">Какой материал, по легенде, заменил свечи на главной ёлке?</div>
   <div style="display:grid;gap:16px;margin-top:30px"><div class="choice"><span class="key">А</span>Бумажные звёзды</div><div class="choice"><span class="key">Б</span>Стеклянные шары</div><div class="choice"><span class="key">В</span>Электрические гирлянды</div></div>
   <div class="correct" style="margin-top:34px;display:block"><span class="svc" style="display:block;font-size:16px">правильный ответ</span>В — электрические гирлянды</div><p class="note" style="margin:14px 0 0">Первые гирлянды появились в конце XIX века.</p>
   <table class="tbl" style="margin-top:26px"><tr><th>команда</th><th>очки</th></tr><tr><td>Лисы</td><td class="n">12.5</td></tr><tr><td>Знатоки из подвала на Ленина</td><td class="n">11</td></tr></table></div>`) }))
T.timer = () => {
  const sc = (q, long, kind) => book(`<div class="abs" style="left:250px;top:76px">${kind === 'a' ? qnA() : qnB()}</div><div class="abs" style="left:1490px;top:50px">${timer(49, 190)}</div>
    ${long ? '<div class="abs q long" style="left:300px;top:260px;width:1320px;font-size:40px">Старинная рождественская книга рассказывает, что в одном северном городке в канун праздника жители выносили на площадь самую высокую ель и украшали её бумажными звёздами. Какой материал заменил свечи после большого пожара?</div>' : q === 'imgs' ? `<div class="abs q" style="left:300px;top:230px;width:1320px;font-size:52px">Что общего у этих снимков?</div><div class="abs" style="left:340px;top:420px;display:flex;gap:40px">${ph(360, 220)}${ph(360, 220, 1)}${ph(360, 220, 2)}</div><div class="abs" style="left:1000px;top:700px;display:flex;gap:30px;width:600px"><span class="choice"><span class="key">А</span>Лапландия</span><span class="choice"><span class="key">Б</span>Устюг</span></div>` : '<div class="abs q short" style="left:300px;top:430px;width:1320px">Сколько ног у паука?</div>'}`)
  return [{ cap: 'Таймер на коротком тексте · плашка A (тиснёный ярлык)', html: sc('s', 0, 'a') }, { cap: 'Таймер на длинном тексте · плашка B (закладка)', html: sc('l', 1, 'b') }, { cap: 'Таймер при нескольких картинках · плашка A', html: sc('imgs', 0, 'a') },
    { cap: 'Состояния таймера 49 / 10 / 5 / 0 (цифры — динамический текст поверх плашки; пропорция плашки 1010×990 не меняется; красная дуга — слой CSS)', html: book(`<div class="abs" style="left:200px;top:300px;display:flex;gap:60px">${[49, 10, 5, 0].map(s => timer(s, 330)).join('')}</div><div class="abs" style="left:250px;top:90px;display:flex;gap:60px;align-items:flex-start">${qnA()}${qnB()}</div>`, { nodecor: 1 }) }]
}
T.teams = () => ['A', 'B', 'C'].map((k, i) => ({ cap: `Вариант ${i + 1}: ${['пергаментная табличка с золотой окантовкой', 'ярлык-закладка с цветной полоской', 'карточка с тиснением (бордовая кожа)'][i]} · ${S.teams} команд`, html: lobbyScene(S.teams, k, S.state) }))
T.rules = () => {
  const short = ['Отвечайте с телефона капитана: одна команда — один ответ', 'За верный ответ — 1 балл, штрафа нет', 'Ответ можно поправить два раза']
  const long = [...short, 'Опечатки ведущий прощает, если смысл ответа очевиден залу', 'Если ответы разошлись — решает ведущий, и его слово окончательное', 'Подсказки не засчитываются, а звонки другу — тем более', 'Побеждает команда, набравшая больше очков за все раунды вечера']
  const R = S.rules === 'short' ? short : long
  const v1 = book(`<div class="abs" style="left:250px;top:260px;width:600px"><div class="round-tag">Раунд 3</div><div class="chap" style="margin-top:10px">Зимние чудеса</div><div class="svc" style="margin-top:30px">правила раунда</div></div>
    <div class="abs" style="left:1010px;top:220px;width:680px;display:grid;gap:${S.rules === 'short' ? 34 : 18}px">${R.map((t, i) => `<div style="display:flex;gap:22px;align-items:flex-start"><span class="key" style="width:56px;height:56px;font-size:30px;background:radial-gradient(circle at 35% 30%,#b3263a,#5e101b)">${i + 1}</span><span class="rule" style="font-size:${S.rules === 'short' ? 36 : 30}px">${esc(t)}</span></div>`).join('')}</div>`)
  const v2 = book(`<div class="abs" style="left:250px;top:230px;width:660px"><div class="chapbar">Раунд 3</div><div class="chap" style="margin-top:24px;text-align:center">Зимние чудеса</div></div>
    <div class="abs" style="left:1010px;top:215px;width:680px;padding:34px 40px;background:linear-gradient(180deg,#f8eed4,#ecdcb8);box-shadow:inset 0 0 0 3px var(--gold),inset 0 0 0 9px #f4e5c3,inset 0 0 0 11px rgba(201,161,74,.7),0 12px 24px var(--shadow);border-radius:10px">
    <div class="svc" style="text-align:center;margin-bottom:18px">Правила</div>${R.map((t, i) => `<div style="display:flex;gap:16px;padding:${S.rules === 'short' ? 14 : 8}px 0;border-bottom:1px solid var(--line)"><span style="font:700 ${S.rules === 'short' ? 46 : 36}px var(--h-font);color:var(--red);min-width:46px">${i + 1}</span><span class="rule" style="font-size:${S.rules === 'short' ? 32 : 27}px">${esc(t)}</span></div>`).join('')}</div>`)
  return [{ cap: `Правила, вариант 1 «нумерованные печати» · ${S.rules === 'short' ? 'короткие' : 'длинные'} правила; гирлянда не перекрывает (контент ниже y=200)`, html: v1 }, { cap: `Правила, вариант 2 «рамка-свиток» · ${S.rules === 'short' ? 'короткие' : 'длинные'}`, html: v2 }]
}
function turntable(spin, arm) {
  return `<svg viewBox="0 0 700 520" width="700" height="520" class="${spin ? 'spin' : ''}"><defs><linearGradient id="wd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a0622d"/><stop offset=".5" stop-color="#7a4520"/><stop offset="1" stop-color="#5a3015"/></linearGradient><radialGradient id="rc" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#1a1a1a"/><stop offset=".9" stop-color="#0c0c0c"/><stop offset="1" stop-color="#222"/></radialGradient></defs>
  <rect x="20" y="40" width="660" height="440" rx="22" fill="url(#wd)" stroke="#3b1e0c" stroke-width="6"/><rect x="34" y="54" width="632" height="412" rx="14" fill="none" stroke="#c9a14a" stroke-opacity=".7" stroke-width="3"/>
  ${Array.from({ length: 14 }, (_, i) => `<path d="M40 ${80 + i * 28} q160 ${i % 2 ? 6 : -6} 320 0 t300 0" stroke="#3b1e0c" stroke-opacity=".25" fill="none"/>`).join('')}
  <circle cx="300" cy="260" r="196" fill="#c9a14a"/><circle cx="300" cy="260" r="188" fill="#2a2a2a"/>
  <g class="rec" style="transform-origin:300px 260px"><circle cx="300" cy="260" r="180" fill="url(#rc)"/>${[160, 140, 120, 100, 80].map(r => `<circle cx="300" cy="260" r="${r}" fill="none" stroke="#fff" stroke-opacity=".07"/>`).join('')}<path d="M300 260 L440 150 A180 180 0 0 1 480 260Z" fill="#fff" fill-opacity=".05"/><circle cx="300" cy="260" r="62" fill="#a8283b"/><circle cx="300" cy="260" r="56" fill="none" stroke="#f2d58c" stroke-width="2"/><text x="300" y="258" text-anchor="middle" font-size="17" font-weight="700" fill="#f2d58c" font-family="PT Serif,serif">ЗИМНИЕ</text><text x="300" y="280" text-anchor="middle" font-size="15" fill="#f2d58c" font-family="PT Serif,serif">трек 3</text><circle cx="300" cy="260" r="5" fill="#d9d9d9"/></g>
  <g style="transform-origin:600px 110px;transform:rotate(${arm ? 0 : -28}deg);transition:transform .8s ease"><circle cx="600" cy="110" r="34" fill="#c9a14a" stroke="#8a6a24" stroke-width="4"/><circle cx="600" cy="110" r="14" fill="#5a3015"/><path d="M600 110 L470 268 L452 262" stroke="#d8d8d8" stroke-width="9" fill="none" stroke-linecap="round"/><rect x="436" y="256" width="30" height="16" rx="3" transform="rotate(-38 451 264)" fill="#222" stroke="#c9a14a"/><circle cx="624" cy="94" r="16" fill="#8a6a24"/></g>
  <circle cx="620" cy="430" r="14" fill="#c9a14a"/><circle cx="660" cy="430" r="14" fill="#c9a14a"/></svg>`
}
T.melody = () => {
  const cov = (k, x, ttl, tiles, st) => { const W = 440, H = 583, f = (a, b, c, d) => `left:${a * W}px;top:${b * H}px;width:${c * W}px;height:${d * H}px`
    return `<div class="cov" style="left:${x}px;top:200px;width:${W}px;height:${H}px;background-image:url(${A['cover' + k]})"><div class="ttl" style="${f(.2, .158, .74, .2)}">${esc(ttl)}</div>${[[.215, .4], [.584, .4], [.215, .637], [.584, .637]].map((p, i) => `<div class="tl ${st[i] || ''}" style="${f(p[0], p[1], .336, .213)}"><span>${tiles[i]}<small>${st[i] === 'used' ? 'сыграно' : st[i] === 'sel' ? 'выбран' : 'трек'}</small></span></div>`).join('')}</div>` }
  const sel = book(`${cov('Red', 190, 'Советские новогодние', [1, 2, 3, 4], ['used', '', 'sel', ''])}${cov('Green', 740, 'Зарубежные хиты', [1, 2, 3, 4], ['', 'used', '', ''])}${cov('Blue', 1290, 'Мультфильмы', [1, 2, 3, 4], ['', '', '', 'used'])}<div class="abs round-tag" style="left:250px;top:110px">Угадай мелодию · выберите трек</div>`)
  const modal = (st, spin, arm, body) => book(`<div class="modal"><div class="abs svc" style="left:40px;top:28px">Зимние чудеса · трек 3</div><div class="abs" style="left:250px;top:70px">${turntable(spin, arm)}</div>${body}</div>`, { nodecor: 1 })
  return [{ cap: 'Выбор: три объёмные мини-книги по ассету sheet-covers-3books (названия категорий и номера треков — динамические; доступен / выбран / сыгран)', html: sel },
    { cap: 'Окно трека · ставки (проигрыватель сверху; пластинка стоит, тонарм в покое)', html: modal('bid', false, false, `<div class="abs q" style="left:60px;top:610px;width:1080px;font-size:44px">ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?</div><div class="abs" style="left:240px;top:700px;width:720px;font-size:32px;display:grid;gap:8px"><div class="tc tcA" style="--c:#c0392b"><span class="dot"></span><span class="nm">Лисы</span><span class="sc">5 сек</span></div><div class="tc tcA" style="--c:#2e7d32"><span class="dot"></span><span class="nm">Ёжики</span><span class="sc">…</span></div></div>`) },
    { cap: 'Окно трека · играет отрывок (пластинка вращается ТОЛЬКО во время реального воспроизведения; тонарм на пластинке)', html: modal('snip', true, true, `<div class="abs q" style="left:60px;top:610px;width:1080px;font-size:44px;color:var(--red)">ИГРАЕТ: Лисы</div><div class="abs note" style="left:60px;top:700px;width:1080px;text-align:center">отрывок на 5 секунд</div>`) },
    { cap: 'Окно трека · ответ (пластинка остановлена)', html: modal('rev', false, false, `<div class="abs correct" style="left:200px;top:620px;width:800px;text-align:center">«Ёлочка» — Новогодний оркестр</div><div class="abs q" style="left:60px;top:740px;width:1080px;font-size:40px">забрала 2 балла: Лисы</div>`) }]
}
T.finale = () => {
  const n = S.ftn, ns = SHORT.slice(0, n).map((s, i) => (i % 3 === 1 && S.names === 'long' ? LONG[i] : s)), sc = ns.map((_, i) => 24 - i * 1.5 - (i > 0 && i % 4 === 0 ? 0 : 0)), rank = ns.map((_, i) => (i === 1 ? 1 : i === 0 ? 1 : i === 2 ? 3 : i + 1))
  sc[1] = sc[0]; const winners = ns.filter((_, i) => rank[i] === 1).join(' · '), pod = ns.map((_, i) => i).filter(i => rank[i] <= 3 && n > 2 || n <= 2); const M = i => (rank[i] === 1 ? 'g' : rank[i] === 2 ? 's' : rank[i] === 3 ? 'b' : '')
  const row = (i, fs) => `<div class="tc tcA" style="font-size:${fs}px;--c:${COLORS[i]}">${M(i) ? `<span class="medal ${M(i)}" style="--m:${fs * .7}px">${rank[i]}</span>` : `<span class="mk" style="min-width:1.4em;text-align:center">${rank[i]}</span>`}<span class="nm">${esc(ns[i])}</span><span class="sc">${String(sc[i].toFixed(1)).replace('.0', '')}</span></div>`
  const fs = n <= 3 ? 52 : n <= 8 ? 36 : 25
  const v1 = book(`<div class="abs" style="left:250px;top:210px;width:640px;text-align:center"><div class="round-tag">итоги вечера</div><div class="chap" style="font-size:${winners.length > 14 ? 64 : 88}px;margin-top:10px">${esc(winners)}</div><div style="display:flex;gap:20px;justify-content:center;margin-top:50px;align-items:flex-end">${pod.map(i => `<span class="medal ${M(i)}" style="--m:${rank[i] === 1 ? 60 : 44}px">${rank[i]}</span>`).join('')}</div></div>
    <div class="abs" style="left:1010px;top:200px;width:680px;display:grid;gap:${n <= 3 ? 24 : n <= 8 ? 12 : 6}px;${n > 8 ? 'grid-template-columns:1fr 1fr;width:700px' : ''}">${ns.map((_, i) => row(i, fs)).join('')}</div>`)
  const v2 = book(`<div class="abs" style="left:250px;top:200px;width:1420px"><div class="chapbar">Итоги вечера</div><div style="display:flex;gap:60px;justify-content:center;margin:26px 0 22px">${pod.map(i => `<span style="text-align:center"><span class="medal ${M(i)}" style="--m:${rank[i] === 1 ? 52 : 38}px">${rank[i]}</span><div class="tname" style="margin-top:8px;font-size:${rank[i] === 1 ? 40 : 30}px">${esc(ns[i])}</div></span>`).join('')}</div>
    <div style="display:grid;grid-template-columns:${n > 8 ? '1fr 1fr' : n > 3 ? '1fr 1fr' : '1fr'};gap:8px 60px;${n <= 3 ? 'width:700px;margin:0 auto' : ''}">${ns.map((_, i) => row(i, n <= 3 ? 44 : n <= 8 ? 32 : 24)).join('')}</div></div>`)
  const v3 = book(`<div class="abs" style="left:250px;top:200px;width:640px;text-align:center"><div class="medal g" style="--m:90px;margin:0 auto">1</div><div class="chap" style="font-size:${winners.length > 14 ? 60 : 84}px;margin-top:20px">${esc(winners)}</div><div class="q" style="font-size:44px;margin-top:10px;color:var(--red)">${String(sc[0].toFixed(1)).replace('.0', '')} очка</div></div>
    <div class="abs" style="left:1010px;top:200px;width:680px;display:grid;gap:8px;${n > 8 ? 'grid-template-columns:1fr 1fr;width:700px' : ''}">${ns.map((_, i) => i).filter(i => rank[i] !== 1).map(i => row(i, fs)).join('')}</div>`)
  return [{ cap: `Финал, композиция 1 «победитель слева, таблица справа» · ${n} команд (равные места: 1 и 1 → следующее 3)`, html: v1 }, { cap: 'Композиция 2 «пьедестал-лента и таблица на разворот»', html: v2 }, { cap: 'Композиция 3 «чемпион крупно, остальные карточками»', html: v3 }]
}
T.unified = () => [{ cap: 'Единое оформление: кнопки, плитки (обычная / выбранная / сыгранная), рамка картинки, подпись и варианты, правильный ответ, пояснение, таблица, переход главы', html: book(`<div class="abs" style="left:250px;top:90px">${qnA()}</div><div class="abs" style="left:250px;top:200px;width:650px"><div class="chapbar">Глава 3</div><div class="chap" style="margin-top:24px;font-size:64px;text-align:center">Зимние чудеса</div><div style="display:flex;gap:16px;margin-top:40px"><span class="btn">Дальше →</span><span class="btn ghost">Назад</span></div><div style="display:flex;gap:12px;margin-top:40px"><span class="tile">1</span><span class="tile sel">2</span><span class="tile used">3</span><span class="tile">4</span></div><table class="tbl" style="margin-top:40px"><tr><th>команда</th><th>очки</th></tr><tr><td>Лисы</td><td class="n">12.5</td></tr><tr><td>Ёжики</td><td class="n">11</td></tr></table></div>
   <div class="abs" style="left:1010px;top:200px;width:660px"><div style="display:flex;gap:30px;align-items:flex-end">${ph(300, 190)}<div><div class="choice"><span class="key">А</span>Лапландия</div><div class="svc" style="margin-top:12px">подпись картинки</div></div></div><div class="correct" style="margin-top:40px">В — электрические гирлянды</div><p class="note" style="margin:16px 0 0">Пояснение к ответу курсивом: первые гирлянды появились в конце XIX века.</p></div>`) }]
T.anim = () => []

// ── кадры ──
function frame(c, W, H, w) {
  const k = w / W, f = document.createElement('div'); f.className = 'frame'; f.style.width = w + 'px'; f.style.height = H * k + 'px'
  const sc = Math.min(W / 1920, H / 1080) * k, st = document.createElement('div'); st.className = 'stage ' + (c.cls || ''); st.innerHTML = c.html
  st.style.transform = `scale(${sc}) translate(-50%,-50%)`; f.append(st)
  f.onclick = () => zoom(c, W, H); return f
}
function zoom(c, W, H) { const z = $('#zoom'); z.textContent = ''; const w = Math.min(innerWidth - 20, (innerHeight - 20) * W / H); z.append(frame(c, W, H, w)); z.classList.add('on'); z.onclick = () => z.classList.remove('on') }
const TABS = { typo: 'Типографика (2 направления)', timer: 'Таймер и плашка номера', teams: 'Карточки команд (3 варианта)', rules: 'Правила (2 варианта)', melody: 'Угадай мелодию', finale: 'Финал (3 композиции)', unified: 'Единое оформление', anim: 'Анимации (живые)' }
function controls() {
  const b = $('#bar'); b.textContent = ''
  const btn = (t, on, f) => { const e = document.createElement('button'); e.textContent = t; if (on) e.className = 'on'; e.onclick = f; b.append(e) }
  const sep = () => { const e = document.createElement('span'); e.className = 'sep'; b.append(e) }
  for (const [k, v] of Object.entries(TABS)) btn(v, S.tab === k, () => { S.tab = k; render() }); sep()
  for (const k of Object.keys(RES)) btn(RES[k].join('×'), S.res === k, () => { S.res = k; render() })
  if (S.tab === 'teams') { sep(); [0, 4, 8, 16].forEach(n => btn(n + ' ком.', S.teams === n, () => { S.teams = n; render() })); btn('короткие', S.names === 'short', () => { S.names = 'short'; render() }); btn('длинные', S.names === 'long', () => { S.names = 'long'; render() })
    ;[['normal', 'обычно'], ['answers', 'верно/неверно'], ['sel', 'выбрана'], ['final', 'результаты']].forEach(([k, t]) => btn(t, S.state === k, () => { S.state = k; render() })) }
  if (S.tab === 'rules') { sep(); btn('короткие', S.rules === 'short', () => { S.rules = 'short'; render() }); btn('длинные', S.rules === 'long', () => { S.rules = 'long'; render() }) }
  if (S.tab === 'finale') { sep(); [3, 8, 16].forEach(n => btn(n + ' ком.', S.ftn === n, () => { S.ftn = n; render() })); btn('длинные имена', S.names === 'long', () => { S.names = S.names === 'long' ? 'short' : 'long'; render() }) }
  sep(); btn('reduced-motion: ' + (S.reduce ? 'вкл' : 'выкл'), S.reduce, () => { S.reduce = !S.reduce; document.body.classList.toggle('reduce', S.reduce); render() })
}
function animTab(m) {
  const wrap = document.createElement('div'); wrap.className = 'sec'
  wrap.innerHTML = `<h2>Живые анимации (CSS/JS, не картинки)</h2><p class="d">Каждая кнопка запускает реальную анимацию. «Перелистывание» срабатывает ТОЛЬКО по кнопке «Сменить вопрос» — «фоновое обновление» не листает (как в требованиях к реализации). При reduced-motion все переходы заменяются мягким появлением, функциональность сохраняется.</p>`
  const st = document.createElement('div'); st.className = 'frame'; const W = 1100, H = 620; st.style.width = W + 'px'; st.style.height = H + 'px'; st.style.cursor = 'default'
  const sg = document.createElement('div'); sg.className = 'stage'; sg.style.transform = `scale(${W / 1920}) translate(-50%,-50%)`; st.append(sg)
  const inner = (q, extra = '') => book(`<div class="abs" style="left:250px;top:90px">${qnA(3, q)}</div><div class="abs" style="left:1490px;top:50px">${timer(49, 190)}</div><div id="qq" class="abs q" style="left:300px;top:380px;width:1320px;font-size:64px">${q === 4 ? 'Сколько ног у паука?' : q === 5 ? 'Какой город называют северной столицей?' : 'Вопрос номер ' + q}</div>${extra}`, { tw: 1 })
  let q = 4; sg.innerHTML = inner(q)
  const snow = document.createElement('canvas'); snow.width = 1920; snow.height = 1080; snow.style.cssText = 'position:absolute;inset:0;pointer-events:none;width:1920px;height:1080px'; let flakes = Array.from({ length: 140 }, () => ({ x: Math.random() * 1920, y: Math.random() * 1080, r: 2 + Math.random() * 4, v: 40 + Math.random() * 70, d: Math.random() * 6 }))
  let snowOn = true, last = performance.now(); const cx = snow.getContext('2d'); sg.append(snow)
  const tick = t => { if (!document.body.contains(sg)) return; const dt = (t - last) / 1000; last = t; cx.clearRect(0, 0, 1920, 1080); if (snowOn && !S.reduce) { cx.fillStyle = 'rgba(255,255,255,.85)'; flakes.forEach(f => { f.y += f.v * dt; f.x += Math.sin(t / 900 + f.d) * 20 * dt; if (f.y > 1080) { f.y = -10; f.x = Math.random() * 1920 } cx.beginPath(); cx.arc(f.x, f.y, f.r, 0, 7); cx.fill() }) } requestAnimationFrame(tick) }
  requestAnimationFrame(tick)
  const ensureQ = () => { if (!sg.querySelector('#qq')) { sg.innerHTML = inner(q); sg.append(snow) } }
  const run = (sel, cls, ms = 1600) => { const e = sg.querySelector(sel) || sg; e.classList.remove('go'); void e.offsetWidth; e.classList.add('go'); setTimeout(() => e.classList.remove('go'), ms) }
  const ctl = document.createElement('div'); ctl.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin:10px 0'
  const add = (t, f) => { const e = document.createElement('button'); e.textContent = t; e.style.cssText = 'background:#2d2219;color:#e9dcc2;border:1px solid #5a4630;border-radius:6px;padding:6px 12px;cursor:pointer'; e.onclick = f; ctl.append(e) }
  add('Снегопад вкл/выкл', () => { snowOn = !snowOn })
  add('Мерцание гирлянды', () => { sg.querySelector('.garl')?.classList.toggle('tw') })
  add('Сменить вопрос (листание страницы)', () => { ensureQ(); const p = document.createElement('div'); p.className = 'pgturn go'; sg.querySelector('.pages').append(p); setTimeout(() => { q = q === 4 ? 5 : 4; const x = sg.querySelector('#qq'); if (!x) return; x.textContent = q === 4 ? 'Сколько ног у паука?' : 'Какой город называют северной столицей?'; const qb = sg.querySelectorAll('.qn-a b')[0]; if (qb) qb.textContent = q }, 450); setTimeout(() => p.remove(), 1000) })
  add('Фоновое обновление (НЕ листает)', () => { ensureQ(); sg.querySelector('.tm .num').textContent = Math.max(0, +sg.querySelector('.tm .num').textContent - 1) })
  add('Новая глава (смена раунда)', () => { sg.innerHTML = book(`<div class="abs chapopen" style="left:300px;top:380px;width:1320px;text-align:center"><div class="round-tag">Раунд 4</div><div class="chap" style="font-size:110px;margin-top:10px">Новая глава</div></div>`, { tw: 1 }); sg.append(snow); run('.chapopen', 'go', 1500) })
  add('Раскрытие ответа (печать, не листание)', () => { ensureQ(); sg.querySelector('.stamp')?.remove(); sg.querySelector('#qq').insertAdjacentHTML('afterend', `<div class="abs stamp correct" style="left:560px;top:620px;width:800px;text-align:center">Ответ: восемь</div>`); run('.stamp', 'go', 1000) })
  add('Появление карточек команд', () => { sg.innerHTML = lobbyScene(8, 'A', 'normal'); sg.append(snow); const g = sg.querySelector('div[style*="grid-template-columns"]'); g.classList.add('pop'); [...g.children].forEach((c, i) => c.style.setProperty('--i', i)); run('.pop', 'go', 1500) })
  add('Выбор плитки', () => { sg.innerHTML = book(`<div class="abs" style="left:560px;top:380px;display:flex;gap:30px">${[1, 2, 3, 4].map(n => `<span class="tile ${n === 2 ? 'sel' : ''}" style="font-size:50px;padding:30px 50px">${n}</span>`).join('')}</div>`); sg.append(snow); sg.querySelectorAll('.tile').forEach((t, i) => setTimeout(() => { sg.querySelectorAll('.tile').forEach(x => x.classList.remove('sel', 'go')); t.classList.add('sel', 'go') }, 400 * i)) })
  let spin = false; add('Пластинка: вращение вкл/выкл (только при «воспроизведении»)', () => { spin = !spin; sg.innerHTML = book(`<div class="modal"><div class="abs" style="left:250px;top:70px">${turntable(spin, spin)}</div></div>`, { nodecor: 1 }); sg.append(snow) })
  add('Переход к финалу', () => { sg.innerHTML = book(`<div class="tofin abs" style="left:300px;top:300px;width:1320px;text-align:center"><div class="round-tag">итоги вечера</div><div class="chap" style="font-size:120px;margin-top:10px">Финал</div><div style="display:flex;gap:30px;justify-content:center;margin-top:50px"><span class="medal s" style="--m:60px">2</span><span class="medal g" style="--m:90px">1</span><span class="medal b" style="--m:60px">3</span></div></div>`, { tw: 1 }); sg.append(snow); run('.tofin', 'go', 1700) })
  wrap.append(ctl, st); m.append(wrap)
}
function render() {
  controls(); const m = $('#main'); m.textContent = ''
  document.body.classList.toggle('reduce', S.reduce)
  $('#note').textContent = 'Интерактивные HTML-мокапы (не настоящие компоненты игры): на локальных шрифтах и ассетах «Книги»; плашка таймера и обложки — производные из присланных исходников. Дизайн НЕ согласован — это варианты для выбора.'
  if (S.tab === 'anim') { animTab(m); return }
  const [W, H] = RES[S.res], fw = ({ typo: 930, rules: 930, melody: 930, unified: 930, timer: 930, teams: 620, finale: 620 })[S.tab] || 620
  const sec = document.createElement('div'); sec.className = 'sec'; const row = document.createElement('div'); row.className = 'row'
  for (const c of T[S.tab]()) { const box = document.createElement('div'); box.append(frame(c, W, H, fw), Object.assign(document.createElement('div'), { className: 'cap', textContent: c.cap })); box.style.maxWidth = fw + 'px'; row.append(box) }
  sec.append(row); m.append(sec)
}
render()
