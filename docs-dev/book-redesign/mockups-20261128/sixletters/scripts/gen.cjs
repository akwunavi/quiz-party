// Генератор макетов «6 букв» / «Порядок» (28.11.2026). Пишет html/*.html (статичные, 1920×1080, без JS).
// Подложка — настоящий кадр проектора «Книги» (assets/bd-*.jpg, scripts/backdrops.cjs); шрифты и свиток hscroll-bow — настоящие файлы public/.
// usage: node gen.cjs
const fs = require('fs'), path = require('path')
const OUT = path.join(__dirname, '..', 'html')
fs.mkdirSync(OUT, { recursive: true })
const PUB = '../../../../../public'   // html/ → корень репозитория

const FONTS = (() => {
  const L = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
  const C = 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'
  const ff = (fam, w, st, file, ur) => `@font-face{font-family:'${fam}';font-style:${st};font-weight:${w};font-display:block;src:url(${PUB}/fonts/${file}.woff2) format('woff2');unicode-range:${ur}}`
  const out = []
  for (const [w, st] of [[400, 'normal'], [700, 'normal'], [400, 'italic'], [700, 'italic']]) {
    out.push(ff('PT Serif', w, st, `pt-serif-cyrillic-${w}-${st}`, C), ff('PT Serif', w, st, `pt-serif-latin-${w}-${st}`, L))
  }
  for (const w of [600, 700]) out.push(ff('Cormorant Garamond', w, 'normal', `cormorant-garamond-${w}-normal-cyrillic`, C), ff('Cormorant Garamond', w, 'normal', `cormorant-garamond-${w}-normal-latin`, L))
  return out.join('\n')
})()

const CSS = `${FONTS}
:root{--paper:#f8eedb;--paper2:#efe0c1;--ink:#2a1f17;--ink2:#1f2a44;--muted:#6b4e33;--red:#8f1d2c;--red3:#5e101b;--gold:#c9a14a;--gold2:#f2d58c;--gold3:#8a6a24;--shade:#d9c59c;--line:rgba(138,106,36,.55);--shadow:rgba(60,35,12,.28);
 --serif:'PT Serif',Georgia,serif;--display:'Cormorant Garamond','PT Serif',Georgia,serif}
*{box-sizing:border-box}
html,body{margin:0;width:1920px;height:1080px;overflow:hidden;background:#1a0f0a}
body{position:relative;font-family:var(--serif);color:var(--ink);background-repeat:no-repeat;background-size:1920px 1080px}
.abs{position:absolute!important}
.bl{display:inline-block;width:0;height:0;vertical-align:baseline}            /* маркер базовой линии для замера */
/* ── свиток-плашка (настоящий hscroll-bow, 9-slice как в 41-ny-book.css) ── */
.scroll{--sh:150px;position:relative;flex:none;height:var(--sh);margin:calc(var(--sh)*.2277) 0 calc(var(--sh)*.0941);display:flex;align-items:center;justify-content:center;text-align:center;
 border:solid transparent;border-width:0 calc(var(--sh)*.9);border-image:url(${PUB}/ny-book/hscroll-bow.webp) 0 211 0 211 fill / 0 calc(var(--sh)*1.0446) / calc(var(--sh)*.2277) 0 calc(var(--sh)*.0941) 0 stretch;
 filter:drop-shadow(0 6px 7px rgba(60,30,10,.32))}
.scroll>.ap{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;min-width:0}
.ap .lab{font:700 18px/1.1 var(--serif);letter-spacing:.14em;color:var(--red);text-transform:uppercase;margin:0 0 4px;white-space:nowrap}
.ap .word{font:700 calc(var(--sh)*.42)/1.05 var(--serif);color:var(--ink2);white-space:nowrap}
/* ── плитки-буквы (как «Скрэмбл» в «Книге»: пергамент, золотая кромка, Cormorant 700) ── */
.tiles{display:flex;gap:8px;justify-content:center;align-items:flex-end}
.tile{--tw:72px;width:var(--tw);height:calc(var(--tw)*1.24);border-radius:calc(var(--tw)*.12);display:grid;place-items:center;font:700 calc(var(--tw)*.74)/1 var(--display);text-transform:uppercase;position:relative;flex:none}
.tile.off{background:rgba(255,250,235,.5);color:rgba(107,78,51,.5);box-shadow:inset 0 0 0 2.5px rgba(138,106,36,.38),inset 0 5px 8px rgba(90,55,20,.12)}
.tile.on{background:linear-gradient(180deg,#fff6da 0%,#f6dd96 55%,#e3b95a 100%);color:var(--red3);
 box-shadow:inset 0 0 0 3px var(--gold3),inset 0 0 0 7px rgba(255,248,222,.75),0 5px 0 var(--shade),0 9px 12px var(--shadow)}
.cap{font:italic 400 21px/1.2 var(--serif);color:var(--muted);text-align:center;white-space:nowrap}
.cap b{font-style:normal;font-weight:700;color:var(--red)}
.badge{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;flex:none;font:700 22px/1 var(--serif);color:var(--red3);background:linear-gradient(180deg,#fff1c4,#e6bd62);box-shadow:inset 0 0 0 2px var(--gold3),0 2px 0 var(--shade),0 4px 6px var(--shadow)}
/* ── фото: рамка на самом <img> (как .q-img img в «Книге»), ячейка прозрачна ── */
.cell{display:flex;align-items:center;justify-content:center;position:relative;flex:none}
.cell>img{display:block;width:auto;height:auto;object-fit:contain;background:#fffdf6;box-shadow:0 0 0 9px #fffdf6,0 0 0 10.5px var(--line),0 10px 20px 9px rgba(60,35,12,.3)}
.cell>.badge{position:absolute;left:-6px;top:-6px;z-index:2}
/* паспарту (б1): РАМКА — сама ячейка, картинка внутри без своей рамки (плашка в плашку не вкладываем) */
.mat{display:flex;align-items:center;justify-content:center;position:relative;flex:none;background:#fffdf6;border-radius:3px;box-shadow:0 0 0 1.5px var(--line),0 10px 20px rgba(60,35,12,.3)}
.mat>img{display:block;width:auto;height:auto;object-fit:contain;box-shadow:0 0 0 1px rgba(138,106,36,.45)}
.mat>.badge{position:absolute;left:-10px;top:-10px;z-index:2}
/* ── порядок: свитки-варианты ── */
.opl{--sh:80px;position:relative;flex:none;height:var(--sh);margin:calc(var(--sh)*.2277) 0 calc(var(--sh)*.0941);display:flex;align-items:center;justify-content:flex-start;
 border:solid transparent;border-width:0 calc(var(--sh)*.9);border-image:url(${PUB}/ny-book/hscroll-bow.webp) 0 211 0 211 fill / 0 calc(var(--sh)*1.0446) / calc(var(--sh)*.2277) 0 calc(var(--sh)*.0941) 0 stretch;
 padding:0 calc(var(--sh)*.12) 0 calc(var(--sh)*.06);filter:drop-shadow(0 6px 7px rgba(60,30,10,.32));font:700 calc(var(--sh)*.31)/1.12 var(--serif);color:var(--ink);overflow:visible}
.opl .txt{min-width:0;flex:1 1 0;text-wrap:pretty}
.opl .row{display:flex;align-items:baseline;width:100%;gap:calc(var(--sh)*.16)}
.orow{display:flex;align-items:baseline;gap:14px;flex:none}
.opl .key{width:calc(var(--sh)*.62);height:calc(var(--sh)*.62);border-radius:50%;display:inline-grid;place-items:center;flex:none;background:var(--red);color:#f8eedb;font:700 calc(var(--sh)*.34)/1 var(--serif);box-shadow:inset 0 0 0 2px rgba(242,213,140,.7),0 3px 0 rgba(0,0,0,.25)}
.opl .pl{flex:none;font:700 calc(var(--sh)*.5)/1 var(--serif);color:var(--gold3);text-shadow:0 1px 0 #fbeec8,0 -1px 0 rgba(94,16,27,.18);min-width:.62em;text-align:center}
.opl.long{font-size:calc(var(--sh)*.3);line-height:1.1}
.med{flex:none;width:calc(var(--sh)*.7);height:calc(var(--sh)*.7);border-radius:50%;display:grid;place-items:center;font:700 calc(var(--sh)*.44)/1 var(--serif);color:var(--red3);background:linear-gradient(180deg,#fff1c4,#e6bd62);box-shadow:inset 0 0 0 2px var(--gold3),0 3px 0 var(--shade),0 5px 8px var(--shadow)}
.lbl{font:700 20px/1.1 var(--serif);letter-spacing:.2em;color:var(--red);text-transform:uppercase;text-align:center;white-space:nowrap}
.div{display:flex;align-items:center;gap:14px;width:100%;color:var(--gold3);margin:6px 0 0}
.div i{flex:1;height:2px;background:linear-gradient(90deg,transparent,var(--gold) 15%,var(--gold) 85%,transparent)}
.div s{text-decoration:none;font:400 16px/1 var(--serif)}
.recall{font:400 25px/1.28 var(--serif);color:var(--muted);text-align:center;text-wrap:balance;margin:0}
.note{font:italic 400 23px/1.3 var(--serif);color:var(--muted);text-align:left;margin:8px 0 0;text-wrap:pretty}
.stack{position:absolute;display:flex;flex-direction:column;align-items:center}
.stack>*{flex:none}
/* ── редактор компоновки (оверлей как в LayoutEditor) ── */
.fr{position:absolute;border:2px dashed #1f9d55;background:rgba(31,157,85,.07);z-index:20}
.fr.red{border-color:#d6372b;background:rgba(214,55,43,.05)}
.fr>em{position:absolute;left:-2px;top:-22px;font:700 12px/1 system-ui,sans-serif;font-style:normal;color:#fff;background:#1f9d55;padding:3px 7px;border-radius:3px 3px 0 0;white-space:nowrap}
.fr.red>em{background:#d6372b}
.fr>b{position:absolute;right:-6px;bottom:-6px;width:12px;height:12px;background:#1f9d55;border-radius:2px}
.fr.red>b{background:#d6372b}
.hatch{position:absolute;pointer-events:none;background:repeating-linear-gradient(135deg,rgba(255,255,255,.18) 0 6px,rgba(0,0,0,.05) 6px 12px)}
.panel{position:absolute;z-index:30;left:1212px;top:760px;width:456px;background:#1c1411f2;color:#f1e6d0;border-radius:8px;padding:12px 14px;font:12.5px/1.35 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.5)}
.panel .r{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 8px;align-items:center}
.panel .b{border:1px solid #6b5538;border-radius:5px;padding:4px 9px;background:#2d2219;color:#f1e6d0}
.panel .b.on{background:#c9a14a;color:#2a1f17;border-color:#c9a14a;font-weight:700}
.panel .w{background:#f6e8c0;color:#4a3410;border-radius:4px;padding:5px 8px;margin:0 0 6px}
.panel h4{margin:0 8px 0 0;font:700 13px system-ui}
`

const page = (title, bd, body, extra = '') => `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>${title}</title><style>${CSS}\nbody{background-image:url(../assets/${bd}.jpg)}\n${extra}</style></head><body data-title="${title}">\n${body}\n</body></html>\n`
const write = (name, html) => fs.writeFileSync(path.join(OUT, name + '.html'), html)

// ═══ данные ═══
const W1 = 'опал', W2 = 'тусовка', ANS = 'ПАЛТУС'
const PH = [['ph1', 1], ['ph2', 16 / 9], ['ph3', 4 / 3], ['ph4', 3 / 4]]
const wordTiles = (w, first, tw) => {
  const cut = first ? w.length - 3 : 3
  return `<div class="tiles" style="--g:8px">${[...w].map((c, i) => `<span class="tile ${(first ? i >= cut : i < cut) ? 'on' : 'off'}" style="--tw:${tw}px"><span><i class="bl"></i>${c}</span></span>`).join('')}</div>`
}
const tw = (w, W, max = 72, gap = 8) => Math.min(max, Math.floor((W - (w.length - 1) * gap) / w.length))
const capFirst = `<b>ПАЛ</b> — последние три буквы слова «ОПАЛ»`, capSecond = `<b>ТУС</b> — первые три буквы слова «ТУСОВКА»`

// ═══ А. Экран ответа «6 букв» ═══
const scroll = sh => `<div class="scroll" style="--sh:${sh}px;width:650px"><div class="ap"><div class="lab"><i class="bl"></i>ПРАВИЛЬНЫЙ ОТВЕТ</div><div class="word"><i class="bl"></i>${ANS}</div></div></div>`
const imgTag = (k, maxW, maxH) => { const [n, ar] = PH[k]; return `<img src="../assets/${n}.jpg" style="max-width:${maxW}px;max-height:${maxH}px;${ar >= maxW / maxH ? `width:${maxW}px` : `height:${maxH}px`}">` }

// А1: фото сверху (равные ячейки), слова — строками на всю ширину
function a1(n) {
  const cw = n === 2 ? 317 : Math.floor((650 - (n - 1) * 12) / n), ch = n === 2 ? 232 : 150
  const photos = Array.from({ length: n }, (_, i) => `<div class="cell" style="width:${cw}px;height:${ch}px"><span class="badge">${i + 1}</span>${imgTag(i, cw - 32, ch - 32)}</div>`).join('')
  const row = (k, w, first, cap) => `<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><div class="arow" style="display:flex;align-items:baseline;gap:14px"><span class="badge"><span><i class="bl"></i>${k}</span></span>${wordTiles(w, first, tw(w, 580, 72))}</div><div class="cap"><i class="bl"></i>${cap}</div></div>`
  const body = `<div class="stack" id="col" style="left:250px;top:170px;width:650px;height:774px;justify-content:center;gap:14px">
  ${scroll(150)}
  <div style="display:flex;gap:16px;width:650px;justify-content:center;margin-top:4px">${photos}</div>
  <div style="display:flex;flex-direction:column;gap:14px;margin-top:10px">${row(1, W1, true, capFirst)}${row(2, W2, false, capSecond)}</div>
  </div>`
  return page(`А1 · фото сверху, слова строками · ${n} картинки`, 'bd-answer-rebus', body)
}

// А2: строки «фото слева — слово справа», лишние картинки — полоской внизу
function a2(n) {
  const row = (k, w, first, cap) => `<div style="display:flex;align-items:center;gap:22px;width:650px"><div class="cell" style="width:190px;height:150px"><span class="badge">${k}</span>${imgTag(k - 1, 164, 124)}</div>
   <div style="display:flex;flex-direction:column;align-items:flex-start;gap:8px;flex:1;min-width:0">${wordTiles(w, first, tw(w, 438, 58, 6)).replace('class="tiles"', 'class="tiles" style="justify-content:flex-start;gap:6px"')}<div class="cap" style="text-align:left"><i class="bl"></i>${cap}</div></div></div>`
  const extra = n > 2 ? `<div style="display:flex;gap:16px;width:650px;justify-content:flex-start;margin-top:6px;align-items:center"><span class="cap" style="text-align:left;white-space:normal;width:150px">ещё картинки к вопросу</span>${Array.from({ length: n - 2 }, (_, i) => `<div class="cell" style="width:150px;height:112px"><span class="badge">${i + 3}</span>${imgTag(i + 2, 126, 88)}</div>`).join('')}</div>` : ''
  const body = `<div class="stack" id="col" style="left:250px;top:170px;width:650px;height:774px;justify-content:center;gap:18px">
  ${scroll(160)}
  <div style="display:flex;flex-direction:column;gap:16px;margin-top:6px">${row(1, W1, true, capFirst)}${row(2, W2, false, capSecond)}</div>${extra}
  </div>`
  return page(`А2 · строки «фото — слово» · ${n} картинки`, 'bd-answer-rebus', body)
}

// ═══ Б. Экран вопроса «6 букв» (подложка — шапка и таймер настоящего проектора; картинки рисует макет) ═══
const LX = 250, RX = 1020, PW = 650, TOP = 208, BOT = 930
// Б1: паспарту — ячейки ОДНОГО размера, картинка вписана внутри (рамка = ячейка)
function b1(n) {
  const mat = (x, y, w, h, k) => `<div class="mat abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><span class="badge">${k + 1}</span>${imgTag(k, w - 44, h - 44)}</div>`
  let cells = ''
  const H1 = BOT - TOP, CW = 560, XL = LX + (PW - CW) / 2, XR = RX + (PW - CW) / 2
  if (n === 2) { const h = 420, y = TOP + (H1 - h) / 2; cells = mat(XL, y, CW, h, 0) + mat(XR, y, CW, h, 1) }
  if (n === 3) { const h = 340, g = 22, y0 = TOP + (H1 - 2 * h - g) / 2; cells = mat(XL, y0, CW, h, 0) + mat(XL, y0 + h + g, CW, h, 1) + mat(XR, TOP + (H1 - h) / 2, CW, h, 2) }
  if (n === 4) { const h = 340, g = 22, y0 = TOP + (H1 - 2 * h - g) / 2; cells = mat(XL, y0, CW, h, 0) + mat(XR, y0, CW, h, 1) + mat(XL, y0 + h + g, CW, h, 2) + mat(XR, y0 + h + g, CW, h, 3) }
  return page(`Б1 · паспарту равных ячеек · ${n} картинки`, 'bd-question', cells)
}
// Б2: одна высота (выключка): рамка прижата к картинке, нижние края на одной линии, пара прижата к сгибу
function b2() {
  const H = Math.floor(640 / (16 / 9)), w0 = H, w1 = Math.round(H * 16 / 9), y = TOP + (BOT - TOP - H) / 2
  const cell = (x, w, k) => `<div class="cell abs" style="left:${x}px;top:${y}px;width:${w}px;height:${H}px"><span class="badge">${k + 1}</span><img src="../assets/${PH[k][0]}.jpg" style="width:${w - 20}px;height:${H - 20}px"></div>`
  return page('Б2 · одна высота, рамка по картинке · 2 картинки', 'bd-question', cell(890 - w0, w0, 0) + cell(1030, w1, 1))
}
const panel = (tab, hint) => `<div class="panel"><div class="r"><h4>Компоновка</h4><span class="b ${tab === 'q' ? 'on' : ''}">Вопрос</span><span class="b ${tab === 'a' ? 'on' : ''}">Ответ</span><span class="b">Авто</span><span class="b on">Вручную</span></div>
 <div class="r"><span class="b on">Сохранить</span><span class="b">Сбросить</span><span class="b">Отмена</span></div>${hint}
 <div style="color:#bfae8e;font-size:11.5px">Рамку можно ставить куда угодно в пределах экрана. Угол ◢ — размер; Shift — сохранить пропорции картинки. Раскладка хранится в вопросе (service.layout) — миграция базы не нужна.</div></div>`
function b3q() {
  // 3 картинки, ручные рамки: слева крупная, справа две друг под другом (пример «как захотел ведущий»)
  const fr = (x, y, w, h, k, name) => `<div class="fr" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><em>${name}</em><b></b></div><div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center">${imgTag(k, w - 24, h - 24).replace('<img', '<img class="fim"')}</div>`
  const body = `<style>.fim{background:#fffdf6;box-shadow:0 0 0 9px #fffdf6,0 0 0 10.5px var(--line),0 10px 20px 9px rgba(60,35,12,.3)}</style>
   ${fr(270, 212, 600, 700, 3, 'Картинка 1')}${fr(1040, 212, 600, 330, 1, 'Картинка 2')}${fr(1040, 582, 600, 330, 2, 'Картинка 3')}
   <div class="hatch" style="left:900px;top:60px;width:120px;height:880px"></div>
   ${panel('q', '<div class="w">Ребус (3+3) — компоновка вопроса доступна, как у обычных вопросов. Слова ОПАЛ/ТУСОВКА на экране вопроса не показываются.</div>')}`
  return page('Б3 · ручная раскладка вопроса (редактор) · 3 картинки', 'bd-question', body)
}
function b3a() {
  const cap = (x, y, w, h, name, inner, red) => `<div class="fr ${red ? 'red' : ''}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><em>${name}</em><b></b></div>${inner}`
  const body = `<div class="stack" style="left:250px;top:200px;width:650px;justify-content:flex-start">${scroll(150)}</div>
   <div class="abs" style="left:250px;top:410px;width:650px"><div style="display:flex;flex-direction:column;gap:12px;align-items:center">${[[W1, true], [W2, false]].map(([w, f]) => wordTiles(w, f, tw(w, 600, 64))).join('')}</div></div>
   <div class="cell abs" style="left:262px;top:640px;width:300px;height:230px"><span class="badge">1</span>${imgTag(0, 270, 200)}</div>
   <div class="cell abs" style="left:598px;top:640px;width:300px;height:230px"><span class="badge">2</span>${imgTag(1, 270, 200)}</div>
   ${cap(250, 190, 650, 215, 'Ответ (свиток)', '')}${cap(250, 410, 650, 200, 'Слова (плитки)', '', true)}${cap(262, 640, 300, 230, 'Картинка 1', '')}${cap(598, 640, 300, 230, 'Картинка 2', '')}
   ${cap(1010, 190, 700, 380, 'Ответы команд', '', true)}
   <div class="hatch" style="left:900px;top:60px;width:120px;height:880px"></div>
   ${panel('a', '<div class="w">Новая рамка «Слова» (плитки ОПАЛ/ТУСОВКА) — как рамка плиток у вариантов; свиток, картинки и команды — как сейчас.</div>')}`
  return page('Б3 · ручная раскладка ответа (редактор): свиток, слова, картинки', 'bd-answer-rebus', body)
}

// ═══ В. Экран ответа «Порядок» ═══
const ITEMS4 = [['Б', 'Jingle Bells'], ['В', 'Песенка про 5 минут'], ['Г', 'Три белых коня'], ['А', 'All I Want for Christmas Is You']]
const ITEMS6 = [['Д', 'Рождество у Диккенса'], ['Б', 'Щелкунчик'], ['В', 'Каникулы в Простоквашино'], ['Г', 'Ночь перед Рождеством'], ['А', 'Один дома'], ['Е', 'Ирония судьбы']]
const ITEMS6L = [['Д', 'Старый Новый год по юлианскому календарю, который отмечают в ночь на 14 января'], ['Б', 'Католическое Рождество, 25 декабря по григорианскому календарю'], ['В', 'Новый год'], ['Г', 'Православное Рождество, седьмое января по новому стилю'], ['А', 'Крещенский сочельник'], ['Е', 'Сретение Господне, 15 февраля']]
const Q4 = 'Эти пять песен звучат каждое Рождество, хотя между появлением самой ранней и самой поздней прошло больше ста лет. Расположите их в порядке первого выпуска, начиная с самой старой.'
const Q6 = 'Расставьте праздники и традиции зимы в порядке их наступления в календаре, начиная с самого раннего, и обратите внимание на формулировки.'
const N4 = 'Jingle Bells - 1857 год, 5 минут - 1956, Три белых коня - 1982, All I Want for Christmas Is You - 1994'
const N6 = 'Даты в разных календарях не совпадают: юлианский отстаёт от григорианского на тринадцать дней, поэтому Старый Новый год и православное Рождество смещены относительно европейских праздников.'
// плитка: [место][буква][текст] — место и буква на одной базовой линии с первой строкой текста
const plate = (i, [k, t], sh, mode, long, W) => {
  const inner = `<div class="row">${mode === 'in' ? `<span class="pl"><i class="bl"></i>${i + 1}</span>` : ''}<span class="key"><span><i class="bl"></i>${k}</span></span><span class="txt"><i class="bl"></i>${t}</span></div>`
  if (mode === 'in') return `<div class="opl${long ? ' long' : ''}" style="--sh:${sh}px;width:${W}px">${inner}</div>`
  const med = `<span class="med" style="--sh:${sh}px"><span><i class="bl"></i>${i + 1}</span></span>`
  return `<div class="orow" style="--sh:${sh}px">${med}<div class="opl${long ? ' long' : ''}" style="--sh:${sh}px;width:${W - sh * 0.7 - 14}px">${inner}</div></div>`
}
function v(name, title, items, sh, q, note, variant, clampRecall, clampNote) {
  const long = items.some(x => x[1].length > 38)
  const W = 650, X = 250
  const head = variant === 1
    ? `<div class="lbl"><i class="bl"></i>Правильный ответ</div><div class="div"><i></i><s>❖</s><i></i></div>`
    : `<div class="scroll" style="--sh:54px;width:420px;margin-top:calc(54px*.2277)"><div class="ap" style="flex-direction:row"><div class="lab" style="margin:0;font-size:17px"><i class="bl"></i>Правильный ответ</div></div></div>`
  const plates = items.map((it, i) => plate(i, it, sh, variant === 1 ? 'in' : 'out', long && it[1].length > 38, W)).join('')
  const lc = clampRecall ? `display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:${clampRecall};overflow:hidden;` : ''
  const nc = clampNote ? `display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:${clampNote};overflow:hidden;` : ''
  const body = `<div class="stack" id="col" style="left:${X}px;top:172px;width:${W}px;height:772px;justify-content:flex-start;gap:10px">
   <p class="recall" style="margin-bottom:6px;${lc}width:${variant === 2 ? 650 : W}px"><i class="bl"></i>${q}</p>
   ${head}
   <div style="display:flex;flex-direction:column;gap:4px;margin-top:0">${plates}</div>
   <div style="width:${variant === 2 ? 650 : W}px;margin-top:6px"><div class="lbl" style="text-align:center"><i class="bl"></i>Пояснение</div><div class="div"><i></i><s>❖</s><i></i></div><p class="note" style="${nc}"><i class="bl"></i>${note}</p></div>
  </div>`
  write(name, page(title, items.length === 4 ? 'bd-answer-order4' : 'bd-answer-order6', body))
}

// ═══ вывод ═══
for (const n of [2, 4]) { write(`a1-${n}`, a1(n)); write(`a2-${n}`, a2(n)) }
for (const n of [2, 3, 4]) write(`b1-${n}`, b1(n))
write('b2-2', b2()); write('b3-q', b3q()); write('b3-a', b3a())
v('v1-4', 'В1 · «Порядок», 4 пункта', ITEMS4, 78, Q4, N4, 1, 4, 2)
v('v1-6', 'В1 · «Порядок», 6 пунктов', ITEMS6, 60, Q6, N6.slice(0, 110), 1, 2, 2)
v('v1-6long', 'В1 · «Порядок», 6 пунктов, длинные тексты', ITEMS6L, 60, Q6, N6, 1, 2, 2)
v('v2-4', 'В2 · «Порядок», 4 пункта', ITEMS4, 74, Q4, N4, 2, 4, 2)
v('v2-6', 'В2 · «Порядок», 6 пунктов', ITEMS6, 56, Q6, N6.slice(0, 110), 2, 2, 2)
v('v2-6long', 'В2 · «Порядок», 6 пунктов, длинные тексты', ITEMS6L, 56, Q6, N6, 2, 2, 2)
console.log(fs.readdirSync(OUT).filter(f => f.endsWith('.html')).length, 'html')
