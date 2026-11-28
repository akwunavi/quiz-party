// Генератор макетов «Книги» 28.11.2026 → ../*.html (статичные HTML + mock.css). Холст 1920×1080.
// usage: node build-mockups.cjs
'use strict'
const fs = require('fs')
const path = require('path')
const OUT = path.resolve(__dirname, '..')

// ───────── данные ─────────
const ICONS = ['1f384', '26c4', '1f98c', '1f385', '2744', '1f381', '1f525', '1f451', '1f981', '1f984', '1f680', '2b50', '1f3c6', '1f9d9', '1f942', '1f514']
const COLORS = ['#e0457b', '#f2b705', '#1fb5d4', '#f08a3c', '#7fbf3a', '#8e6fe0', '#e8505b', '#2fb89a', '#d86bd1', '#4f8fe8', '#c98a2b', '#5ac27a', '#e86f4f', '#9aa63a', '#3b6fb6', '#b04a6f']
const NAMES16 = ['Мандарины и шампанское', 'Ёлочки', 'Снежный барс', 'Дед Мороз и компания', 'Оливье навсегда', 'Северные олени', 'Хлопушки', 'Самая длинная команда вечера',
  'Курантики', 'Ледяные сердца', 'Новогодний патруль', 'Гирлянда', 'Сосульки', 'Весёлые снеговики из 3-го', 'Бенгальский огонь', 'Морозко']
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }
const fmt = n => (Number.isInteger(n) ? String(n) : n.toFixed(1)).replace('-', '−')
const sum = a => a.reduce((s, x) => s + x, 0)
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
function rank(teams) { let p = 0, prev = null; return teams.map(t => { if (t.total !== prev) { p++; prev = t.total } return { ...t, place: p } }) }

// промежуточные результаты: 9 раундов, сыграно `played`
const INTER4 = [
  { name: 'я родился', rounds: [3, 3.5, 10, 10, 2, 15] },
  { name: 'Тест-2', rounds: [0, 0, 6, 4, 2, -2] },
  { name: 'Тест-3', rounds: [0, 0, 7, 2, -1, 1] },
  { name: 'Тест-1', rounds: [0, 0, 5, 2, 0, 0] },
]
function inter16() {
  const r = rng(28112026)
  const t = NAMES16.map(name => ({ name, rounds: Array.from({ length: 7 }, () => Math.round(r() * 24) / 2) }))
  t[10].rounds[3] = -7 // отрицательный раунд
  t[0].rounds[6] = 10.5 // «широкое» число
  const s = t.map(x => sum(x.rounds)).map((v, i) => [v, i]).sort((a, b) => b[0] - a[0])
  // ничья на 2-м месте
  const second = t[s[1][1]]; const third = t[s[2][1]]
  third.rounds[6] += (sum(second.rounds) - sum(third.rounds))
  return t
}
function prep(raw, played) {
  const t = raw.map((x, i) => ({ ...x, total: sum(x.rounds), last: x.rounds[played - 1], icon: ICONS[i % ICONS.length], color: COLORS[i % COLORS.length] }))
  t.sort((a, b) => b.total - a.total)
  return rank(t)
}
const FIN4 = rank([['я родился', 99.5], ['Тест-3', 49], ['Тест-1', 38], ['Тест-2', 24]].map(([name, total], i) => ({ name, total, icon: ICONS[i], color: COLORS[i] })))
const FIN16_TOTALS = [99.5, 87, 84.5, 81.5, 78, 74.5, 71, 69.5, 66, 63, 60.5, 58, 55, 51.5, 47, 40]
const FIN16 = rank(NAMES16.map((name, i) => ({ name, total: FIN16_TOTALS[i], icon: ICONS[i % ICONS.length], color: COLORS[i % COLORS.length] })))

// ───────── кирпичики ─────────
let uid = 0
const PAL = { 1: ['#f6d56a', '#b8861b', '#7b5410'], 2: ['#eef2f6', '#9aa7b4', '#5b6671'], 3: ['#ecae7a', '#a8612c', '#6b3a17'] }
function medal(place, h, extra = '') {
  const [l, m, d] = PAL[place]; const id = 'fm' + (++uid)
  let star = ''
  for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 - Math.PI / 2, r = i % 2 ? 7 : 17; star += `${i ? 'L' : 'M'}${(50 + Math.cos(a) * r).toFixed(1)} ${(54 + Math.sin(a) * r).toFixed(1)}` }
  return `<svg class="medal" style="--mh:${h}px;${extra}" viewBox="0 0 100 124" aria-hidden="true"><defs><radialGradient id="${id}" cx="35%" cy="30%"><stop offset="0" stop-color="${l}"/><stop offset=".6" stop-color="${m}"/><stop offset="1" stop-color="${d}"/></radialGradient></defs>`
    + `<path d="M30 56 L18 120 L40 108 L50 123 L60 108 L82 120 L70 56Z" fill="#b3263a" stroke="#7a1626" stroke-width="2"/><circle cx="50" cy="48" r="40" fill="url(#${id})" stroke="${d}" stroke-width="3"/>`
    + `<circle cx="50" cy="48" r="31" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2"/><path d="${star}Z" transform="translate(0 -6)" fill="rgba(255,255,255,.92)"/></svg>`
}
const mw = h => h * 100 / 124
const gem = (t, d, style = '') => `<span class="gem" style="--tm-d:${d}px;--tmc:${t.color};${style}"><span class="in"><img src="../../../public/emoji/${t.icon}.svg" alt=""></span></span>`
/** кегль имени: наибольший ≤ base, при котором строка помещается в w (EB Garamond 600, кириллица ≈ .47 em на знак) */
const fitFs = (name, base, w) => Math.max(14, Math.min(base, Math.floor(w / (name.length * 0.47))))
const seal = (cls, w, h, fs, txt, style = '') => `<span class="seal ${cls}" style="width:${w}px;height:${h}px;font-size:${fs}px;${style}">${txt}</span>`
const sealCls = p => (p === 1 ? '' : p === 2 ? 's2' : 's3')
function card(t, { x, y, ch, cw }) {
  return `<div class="tc" style="--ch:${ch}px;--cw:${cw}px;left:${x}px;top:${y}px">${gem(t, 0).replace('class="gem"', 'class="gem"').replace(/--tm-d:0px;/, '')}</div>`
}
/** текстовая область карточки: левый край и ширина относительно левого края карточки */
const cardText = (ch, cw) => { const k = ch / 662; return { left: 428 * k, w: cw - 599 * k, cy: 0.408 * ch, k } }
/** имя на пергаменте карточки: одна строка или две (balance), по центру по вертикали пергамента */
function cardName(name, x, y, ch, cw, base, align = 'flex-start') {
  const k = ch / 662, w = cw - 599 * k, h = 340 * k
  const f1 = fitFs(name, base, w)
  let f = f1, two = false
  if (f1 < base * 0.72) { const f2 = Math.min(base, Math.floor(w / (Math.ceil(name.length / 2 + 2) * 0.47)), Math.floor(h / 2.15)); if (f2 > f1) { f = f2; two = true } }
  return `<div class="abs" style="left:${x + 428 * k}px;top:${y + 100 * k}px;width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:${align}"><span class="nm" style="display:block;${align === 'center' ? 'text-align:center;' : ''}font-size:${f}px;${two ? 'white-space:normal;text-wrap:balance;line-height:1.04;' : 'white-space:nowrap;'}overflow:visible">${esc(name)}</span></div>`
}
const hl = (x, y, w, cls = '') => `<div class="abs hl ${cls}" style="left:${x}px;top:${y}px;width:${w}px"></div>`
const kicker = (txt, top, fs = 22, color = '') => `<div class="kicker" data-hero style="top:${top + 7}px;font-size:${fs}px;${color ? 'color:' + color : ''}">${txt}</div>`
const h1 = (txt, top, fs) => `<div class="h1" data-hero style="top:${top + 7}px;font-size:${fs}px">${txt}</div>`
const page = (title, body, dense = false) => `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><title>${title}</title><meta name="viewport" content="width=1920">
<link rel="stylesheet" href="mock.css"></head>
<body><div class="stage${dense ? ' dense' : ''}">
${body}
</div></body></html>
`
const write = (name, title, body0, dense) => {
  const body = body0.replace(/(<div class="abs row"[^>]*?);?padding-top:(-?[\d.]+)px">/g, (m, a, b) => `${a}">${'<i class="st" style="height:' + b + 'px"></i>'}`)
  fs.writeFileSync(path.join(OUT, name + '.html'), page(title, body, dense)); console.log('✓', name) }

// ───────── промежуточные результаты · (а) «страница книги» ─────────
function interA(n) {
  const P = 9, PLAYED = n === 4 ? 6 : 7
  const teams = prep(n === 4 ? INTER4 : inter16(), PLAYED)
  const big = n === 4
  const pitch = big ? 150 : 42, top0 = big ? 318 : 266, hy = big ? 268 : 228
  const ch = 128, cw = 570
  const colW = 58, RX = 750 /* x правой группы относительно 250 → 1000 */, SW = big ? 134 : 100
  const numFs = big ? 34 : 24, nmFs = big ? 44 : 26, B = big ? 86 : 29, sFs = big ? 46 : 26 /* базовая линия от верха ряда */
  const out = []
  out.push(kicker('Положение команд', big ? 134 : 128, big ? 22 : 20))
  out.push(h1('Промежуточные результаты', big ? 168 : 158, big ? 60 : 50))
  // полоса последнего сыгранного раунда
  const lbX = 250 + RX + (PLAYED - 1) * colW - 2
  out.push(`<div class="abs lastband" style="left:${lbX}px;top:${hy - 12}px;width:${colW + 4}px;height:${top0 + teams.length * pitch - hy + 6}px"></div>`)
  // шапка
  const hcells = []
  hcells.push(`<span class="c" style="width:80px"></span>`)
  const nmLeft = big ? cardText(ch, cw).left : 108
  hcells.push(`<span class="c l th" style="width:420px;margin-left:${(big ? 100 + nmLeft - 80 : 28)}px">Команда</span>`)
  const used = 80 + (big ? 100 + nmLeft - 80 : 28) + 420
  hcells.push(`<span class="c" style="width:${RX - used}px"></span>`)
  for (let i = 1; i <= P; i++) hcells.push(`<span class="c th${i === PLAYED ? ' last' : i > PLAYED ? ' future' : ''}" style="width:${colW}px;font-size:${big ? 26 : 22}px">Р${i}</span>`)
  hcells.push(`<span class="c th sig" style="width:${SW}px;margin-left:8px">Σ</span>`)
  out.push(`<div class="abs row" style="left:250px;top:${hy}px;height:30px;width:1420px"><span style="display:contents">${hcells.join('')}</span></div>`)
  out.push(hl(250, hy + 40, 670, 'dbl') + hl(1000, hy + 40, 670, 'dbl'))
  teams.forEach((t, i) => {
    const ty = top0 + i * pitch, cy = B - 0.33 * numFs
    const art = []
    // место: медаль или цифра
    if (t.place <= 3) art.push(`<span class="abs" style="left:${(80 - mw(big ? 84 : 34)) / 2}px;top:${cy - (big ? 84 : 34) / 2 - 2}px">${medal(t.place, big ? 84 : 34)}</span>`)
    if (big) {
      const ct = cardText(ch, cw)
      art.push(card(t, { x: 100, y: 0, ch, cw }).replace('left:100px;top:0px', `left:100px;top:${cy - ct.cy}px`))
    } else {
      art.push(`<span class="abs" style="left:64px;top:${cy - 17}px">${gem(t, 34)}</span>`)
    }
    if (t.place <= 3 || big) {
      const sc = sealCls(t.place > 3 ? 3 : t.place)
      art.push(`<span class="abs" style="left:${RX + P * colW + 8}px;top:${B - 0.35 * sFs - (big ? 37 : 17)}px">${seal(t.place > 3 ? 'plain' : sc, SW, big ? 74 : 34, 0, '')}</span>`)
    }
    const cells = []
    cells.push(`<span class="c place" style="width:80px;font-size:${big ? 34 : 24}px">${t.place <= 3 ? '' : t.place}</span>`)
    const nameW = big ? cardText(ch, cw).w : 540 - 28 - 20
    const left = big ? 100 + cardText(ch, cw).left : 108
    const fsz = fitFs(t.name, nmFs, nameW)
    cells.push(`<span class="c l nm" style="width:${nameW}px;margin-left:${left - 80}px;font-size:${fsz}px;overflow:visible">${esc(t.name)}</span>`)
    cells.push(`<span class="c" style="width:${RX - left - nameW}px"></span>`)
    for (let r = 0; r < P; r++) {
      const played = r < PLAYED, v = t.rounds[r]
      cells.push(`<span class="c cell nums${!played ? ' future' : v < 0 ? ' neg' : ''}" style="width:${colW}px;font-size:${numFs - (big ? 4 : 0)}px">${played ? fmt(v) : '·'}</span>`)
    }
    cells.push(`<span class="c score nums" style="width:${SW}px;margin-left:8px;font-size:${sFs}px;${t.place <= 3 || big ? 'color:' + ({ 1: '#3a1208', 2: '#1d2630', 3: '#2c1305' }[t.place] || 'var(--red)') : ''}">${fmt(t.total)}</span>`)
    out.push(`<div class="abs row" data-row="inter-a-${n}-${i}" style="left:250px;top:${ty}px;height:${pitch}px;width:1420px;padding-top:${B}px">${art.join('')}${cells.join('')}</div>`)
    if (i < teams.length - 1) out.push(hl(250, ty + pitch - 2, 670) + hl(1000, ty + pitch - 2, 670))
  })
  out.push(hl(250, top0 + teams.length * pitch - 2, 670, 'dbl') + hl(1000, top0 + teams.length * pitch - 2, 670, 'dbl'))
  return out.join('\n')
}
write('inter-a-4', 'Промежуточные результаты · А · 4 команды', interA(4))
write('inter-a-16', 'Промежуточные результаты · А · 16 команд', interA(16))

// ───────── промежуточные результаты · (б) «пьедестал + список» ─────────
function interB(n) {
  const big = n === 4
  const teams = prep(n === 4 ? INTER4 : inter16(), n === 4 ? 6 : 7)
  const out = []
  const delta = t => { const v = t.last; return `<span class="chip ${v > 0 ? 'up' : v < 0 ? 'dn' : 'zero'}">${v > 0 ? '+' : ''}${fmt(v)}</span>` }
  out.push(kicker('Положение команд', big ? 134 : 126, big ? 22 : 20))
  out.push(h1('Промежуточные результаты', big ? 166 : 154, big ? 56 : 46))
  const top3 = [teams[1], teams[0], teams[2]] // 2-е | 1-е | 3-е
  const ch = big ? 200 : 140, cw = big ? 440 : 420
  const gap = big ? 50 : 40
  const x0 = 960 - (3 * cw + 2 * gap) / 2
  const baseY = big ? 292 : 216
  top3.forEach((t, i) => {
    const first = t.place === 1
    const x = x0 + i * (cw + gap)
    const dy = first ? 0 : (big ? 56 : 30)
    const mh = first ? (big ? 108 : 58) : (big ? 84 : 46)
    const y0 = baseY + dy
    const cardY = y0 + mh + (big ? 10 : 4)
    const ct = cardText(ch, cw)
    const nameFs0 = big ? (first ? 54 : 48) : 40
    out.push(`<span class="abs" style="left:${x + cw / 2 - mw(mh) / 2}px;top:${y0}px">${medal(t.place, mh)}</span>`)
    out.push(card(t, { x, y: cardY, ch, cw }))
    // имя на карточке — на базовой линии ряда
    const nm = cardY + ct.cy
    out.push(cardName(t.name, x, cardY, ch, cw, nameFs0))
    const sy = cardY + ch + (big ? 6 : 2)
    const sh = first ? (big ? 96 : 54) : (big ? 80 : 46), sw = first ? (big ? 230 : 140) : (big ? 190 : 120)
    const sfs = first ? (big ? 58 : 34) : (big ? 48 : 28)
    out.push(`<div class="abs row" data-row="inter-b-${n}-sigma${t.place}" style="left:${x + cw / 2 - (sw + (big ? 100 : 80)) / 2}px;top:${sy}px;height:${sh}px;width:${sw + (big ? 100 : 80)}px;padding-top:${sh / 2 + 0.35 * sfs}px">`
      + `<span class="abs" style="left:0;top:0">${seal(sealCls(t.place), sw, sh, 0, '')}</span>`
      + `<span class="c score nums" style="width:${sw}px;font-size:${sfs}px;color:${t.place === 1 ? '#3a1208' : '#1d2630'}">${fmt(t.total)}</span>`
      + `<span class="c" style="width:${big ? 16 : 10}px"></span><span class="c nums" style="font-size:${big ? 28 : 20}px">${delta(t)}</span></div>`)
  })
  const rest = teams.slice(3)
  if (big) {
    // единственная команда ниже подиума: ряд по центру, на странице
    const y = 800
    out.push(`<div class="kicker" style="top:${y - 46}px;font-size:18px;color:var(--muted)">Остальные команды</div>`)
    out.push(hl(560, y - 8, 800, 'dbl'))
    rest.forEach((t, i) => {
      const ry = y + i * 80
      out.push(`<div class="abs row" data-row="inter-b-4-rest${i}" style="left:560px;top:${ry}px;width:800px;height:70px;padding-top:48px">`
        + `<span class="abs" style="left:64px;top:16px">${gem(t, 38)}</span>`
        + `<span class="c place" style="width:64px;font-size:34px">${t.place}</span><span class="c l nm plain" style="width:420px;margin-left:48px;font-size:40px">${esc(t.name)}</span>`
        + `<span class="c score nums" style="width:120px;font-size:42px;text-align:right">${fmt(t.total)}</span><span class="c" style="width:28px"></span><span class="c nums" style="font-size:26px">${delta(t)}</span></div>`)
      out.push(hl(560, ry + 72, 800))
    })
  } else {
    const y0 = 538, pitch = 50
    out.push(kicker('Остальные команды', y0 - 34, 16, 'var(--muted)'))
    const cols = [rest.slice(0, 7), rest.slice(7)]
    cols.forEach((col, ci) => {
      const cx = ci === 0 ? 250 : 1010
      out.push(hl(cx, y0 - 6, 660, 'dbl'))
      col.forEach((t, i) => {
        const ry = y0 + i * pitch
        out.push(`<div class="abs row" data-row="inter-b-16-rest${ci}-${i}" style="left:${cx}px;top:${ry}px;width:660px;height:${pitch}px;padding-top:34px">`
          + `<span class="abs" style="left:58px;top:${pitch / 2 - 17}px">${gem(t, 34)}</span>`
          + `<span class="c place" style="width:50px;font-size:24px">${t.place}</span><span class="c l nm plain" style="width:370px;margin-left:50px;font-size:${fitFs(t.name, 27, 370)}px">${esc(t.name)}</span>`
          + `<span class="c score nums" style="width:84px;font-size:28px;text-align:right">${fmt(t.total)}</span><span class="c" style="width:22px"></span><span class="c nums" style="width:76px;font-size:19px;text-align:left">${delta(t)}</span></div>`)
        out.push(hl(cx, ry + pitch - 2, 660, 'faint'))
      })
    })
  }
  return out.join('\n')
}
write('inter-b-4', 'Промежуточные результаты · Б · 4 команды', interB(4))
write('inter-b-16', 'Промежуточные результаты · Б · 16 команд', interB(16))

// ───────── финал · (а) торжественный ─────────
function confetti(avoid, count, seed, box) {
  const r = rng(seed), cols = ['#c9a14a', '#f2d58c', '#b3263a', '#2f6b3f', '#fffaf0', '#e8c46a', '#8f1d2c', '#3f7a52'], out = []
  let tries = 0
  while (out.length < count && tries++ < 4000) {
    const x = box.x + r() * box.w, y = box.y + r() * box.h
    if (avoid.some(a => x > a.x - 14 && x < a.x + a.w + 14 && y > a.y - 14 && y < a.y + a.h + 14)) continue
    const k = r(), c = cols[Math.floor(r() * cols.length)], rot = Math.round(r() * 180)
    if (k < .5) out.push(`<i class="cf r" style="left:${x | 0}px;top:${y | 0}px;background:${c};transform:rotate(${rot}deg);box-shadow:0 1px 1px rgba(60,30,10,.35)"></i>`)
    else if (k < .8) out.push(`<i class="cf d" style="left:${x | 0}px;top:${y | 0}px;width:${6 + (r() * 6 | 0)}px;height:${6 + (r() * 6 | 0)}px;background:${c};box-shadow:0 1px 1px rgba(60,30,10,.3)"></i>`)
    else out.push(`<i class="cf s" style="left:${x | 0}px;top:${y | 0}px;color:${c};transform:rotate(${rot}deg);text-shadow:0 1px 1px rgba(60,30,10,.35)">✦</i>`)
  }
  return out.join('')
}
function finA(n) {
  const big = n === 4
  const teams = n === 4 ? FIN4 : FIN16
  const [w, s2, s3] = teams.filter(t => t.place <= 3 || false).slice(0, 1).concat(teams.filter(t => t.place === 2).slice(0, 1), teams.filter(t => t.place === 3).slice(0, 1))
  const out = [], avoid = []
  const kt = big ? 132 : 128
  out.push(kicker('Итоги игры', kt, big ? 24 : 20))
  if (big) { out.push(`<div class="sub" data-hero style="top:172px;font-size:34px">Глава последняя</div>`); out.push(h1('Наши победители', 214, 88)); avoid.push({ x: 440, y: 120, w: 1040, h: 200 }) }
  else { out.push(h1('Наши победители', 154, 56)); avoid.push({ x: 600, y: 120, w: 720, h: 110 }) }
  // победитель: свиток с бантом, медаль слева, печать Σ справа
  const sh = big ? 190 : 128, hw = big ? 1040 : 900, hy = big ? 350 : 250
  const hx = 960 - hw / 2
  out.push(`<div class="hs" style="--sh:${sh}px;--hw:${hw}px;left:${hx}px;top:${hy}px"></div>`)
  avoid.push({ x: hx - 150, y: hy - 50, w: hw + 300, h: sh + 70 })
  const inner = hw - 1.8 * sh
  const nameFs = fitFs(w.name, big ? 80 : 54, inner - (big ? 110 : 80))
  out.push(`<div class="abs row" data-row="fin-a-${n}-winner" style="left:${hx + 0.9 * sh}px;top:${hy}px;width:${inner}px;height:${sh}px;padding-top:${Math.round(sh / 2 + 0.33 * nameFs)}px;justify-content:center">`
    + `<span class="abs" style="left:${(inner - (big ? 100 : 66) - 20 - 0) / 2 - 0}px;top:0;display:none"></span>`
    + `<span class="c" style="margin-right:${big ? 22 : 14}px;font-size:0;line-height:0;align-self:center;position:relative">${gem(w, big ? 92 : 62, 'vertical-align:middle')}</span>`
    + `<span class="c nm" style="font-size:${nameFs}px;font-weight:700;overflow:visible">${esc(w.name)}</span></div>`)
  out.push(`<div class="abs" style="left:${hx + 0.9 * sh}px;width:${inner}px;top:${hy + (big ? 16 : 10)}px;text-align:center;font:700 ${big ? 20 : 15}px/1 var(--serif);letter-spacing:.22em;color:var(--red)" data-text="label">ПЕРВОЕ МЕСТО</div>`)
  const mh = big ? 168 : 112
  out.push(`<span class="abs" style="left:${hx - mw(mh) - 24}px;top:${hy + sh / 2 - mh / 2 + 10}px">${medal(1, mh)}</span>`)
  const sw = big ? 160 : 130, shh = big ? 110 : 70
  out.push(`<div class="abs row" data-row="fin-a-${n}-sigma" style="left:${hx + hw + 24}px;top:${hy + sh / 2 - shh / 2 + 6}px;width:${sw}px;height:${shh}px;padding-top:${shh / 2 + 0.35 * (big ? 62 : 38)}px">${`<span class="abs" style="left:0;top:0">${seal('', sw, shh, 0, '')}</span>`}<span class="c score nums" style="width:${sw}px;font-size:${big ? 62 : 38}px;color:#3a1208">${fmt(w.total)}</span></div>`)
  // 2-е и 3-е — по бокам, ниже, каждое на своей странице
  const by = big ? 640 : 440, bch = big ? 140 : 104, bcw = 430
  ;[[s2, 250], [s3, 1000]].forEach(([t, bx]) => {
    const ct = cardText(bch, bcw), mhh = big ? 92 : 66
    out.push(`<span class="abs" style="left:${bx + (84 - mw(mhh)) / 2}px;top:${by + bch * 0.408 - mhh * 0.46}px">${medal(t.place, mhh)}</span>`)
    out.push(card(t, { x: bx + 96, y: by, ch: bch, cw: bcw }))
    const f = fitFs(t.name, big ? 44 : 34, ct.w)
    out.push(cardName(t.name, bx + 96, by, bch, bcw, big ? 44 : 34))
    const sw2 = big ? 132 : 104, sh2 = big ? 70 : 52, sx = bx + 96 + bcw + 14
    out.push(`<div class="abs row" data-row="fin-a-${n}-s${t.place}" style="left:${sx}px;top:${by + ct.cy - sh2 / 2}px;width:${sw2}px;height:${sh2}px;padding-top:${sh2 / 2 + 0.35 * (big ? 40 : 30)}px"><span class="abs" style="left:0;top:0">${seal(sealCls(t.place), sw2, sh2, 0, '')}</span><span class="c score nums" style="width:${sw2}px;font-size:${big ? 40 : 30}px;color:${t.place === 2 ? '#1d2630' : '#2c1305'}">${fmt(t.total)}</span></div>`)
    avoid.push({ x: bx, y: by - 20, w: 700, h: bch + 30 })
  })
  const rest = teams.filter(t => t.place > 3)
  if (big) {
    const y = 826
    out.push(hl(640, y - 14, 640, 'dbl'))
    rest.forEach((t, i) => out.push(`<div class="abs row" data-row="fin-a-4-rest${i}" style="left:640px;top:${y + i * 70}px;width:640px;height:64px;padding-top:45px"><span class="abs" style="left:56px;top:13px">${gem(t, 38)}</span><span class="c place" style="width:56px;font-size:32px">${t.place}</span><span class="c l nm plain" style="width:360px;margin-left:56px;font-size:38px">${esc(t.name)}</span><span class="c score nums" style="width:120px;font-size:40px;text-align:right">${fmt(t.total)}</span></div>`))
    avoid.push({ x: 560, y: y - 20, w: 800, h: 100 })
  } else {
    const y0 = 580, pitch = 50
    ;[rest.slice(0, 7), rest.slice(7)].forEach((col, ci) => {
      const cx = ci === 0 ? 250 : 1010
      out.push(hl(cx, y0 - 8, 660, 'dbl'))
      col.forEach((t, i) => {
        const ry = y0 + i * pitch
        out.push(`<div class="abs row" data-row="fin-a-16-rest${ci}-${i}" style="left:${cx}px;top:${ry}px;width:660px;height:${pitch}px;padding-top:34px"><span class="abs" style="left:58px;top:${pitch / 2 - 17}px">${gem(t, 34)}</span><span class="c place" style="width:50px;font-size:24px">${t.place}</span><span class="c l nm plain" style="width:420px;margin-left:50px;font-size:${fitFs(t.name, 27, 420)}px">${esc(t.name)}</span><span class="c score nums" style="width:110px;font-size:28px;text-align:right">${fmt(t.total)}</span></div>`)
        out.push(hl(cx, ry + pitch - 2, 660, 'faint'))
      })
    })
    avoid.push({ x: 250, y: 550, w: 1420, h: 400 })
  }
  const conf = confetti(avoid, big ? 95 : 60, 1128 + n, { x: 262, y: 136, w: 1396, h: big ? 700 : 440 })
  return conf + '\n' + out.join('\n')
}
write('final-a-4', 'Финал · А · 4 команды', finA(4))
write('final-a-16', 'Финал · А · 16 команд', finA(16))

// ───────── финал · (б) таблица на странице + кожаная лента победителя ─────────
function finB(n) {
  const big = n === 4
  const teams = n === 4 ? FIN4 : FIN16
  const w = teams[0]
  const out = []
  out.push(kicker('Итоги игры', big ? 134 : 126, big ? 22 : 20))
  out.push(h1('Наши победители', big ? 164 : 152, big ? 70 : 52))
  // лента победителя
  const rh = big ? 214 : 168, rw = big ? 1260 : 1060, rx = 960 - rw / 2, ry = big ? 256 : 214
  out.push(`<div class="ribbon" style="--rh:${rh}px;--rw:${rw}px;left:${rx}px;top:${ry}px"></div>`)
  const bodyC = ry + rh * 0.37 // середина кожаной части
  const mh = big ? 124 : 92
  out.push(`<span class="abs" style="left:${rx + 175 * rh / 256 + 28}px;top:${bodyC - mh * 0.44}px">${medal(1, mh)}</span>`)
  const nfs = fitFs(w.name, big ? 76 : 54, rw - 2 * 175 * rh / 256 - 2 * (mw(mh) + 60) - 260)
  const innerL = rx + 175 * rh / 256 + 28 + mw(mh) + 26, innerW = rw - 2 * 175 * rh / 256 - 56 - mw(mh) - 26
  const gd = big ? 96 : 66
  out.push(`<div class="abs row" data-row="fin-b-${n}-winner" style="left:${innerL}px;top:${bodyC - (big ? 54 : 40)}px;width:${innerW}px;height:${big ? 108 : 80}px;padding-top:${(big ? 54 : 40) + Math.round(0.33 * nfs)}px">`
    + `<span class="c" style="margin-right:20px;font-size:0;align-self:center;margin-top:${big ? 0 : 0}px">${gem(w, gd, 'vertical-align:middle')}</span>`
    + `<span class="c l foil-name" style="font-size:${nfs}px;width:${innerW - gd - 20 - (big ? 270 : 190)}px;overflow:visible">${esc(w.name)}</span>`
    + `<span class="c score gold nums" style="width:${big ? 270 : 190}px;font-size:${big ? 88 : 60}px;text-align:right">${fmt(w.total)}</span></div>`)
  // остальные: страница — слева место+карточка, справа очки (+ отрыв от лидера)
  const startY = big ? 500 : 410, pitch = big ? 130 : 92, ch = big ? 118 : 84, cw = big ? 570 : 480
  const rows = teams.slice(1)
  const medalRows = rows.filter(t => t.place <= 3)
  const lowRows = rows.filter(t => t.place > 3)
  if (big) {
    out.push(`<div class="abs th" style="left:1000px;width:300px;text-align:center;top:${startY - 32}px;font-size:18px;color:var(--muted)">Отрыв от лидера</div>`)
    out.push(`<div class="abs th sig" style="left:1480px;width:150px;text-align:center;top:${startY - 34}px;font-size:20px;letter-spacing:.2em">Очки</div>`)
  }
  out.push(hl(250, startY - 8, 670, 'dbl') + hl(1000, startY - 8, 670, 'dbl'))
  medalRows.forEach((t, i) => {
    const y = startY + i * pitch, ct = cardText(ch, cw), B = (big ? 65 : 46) + Math.round(0.33 * fitFs(t.name, big ? 46 : 32, ct.w)), fs = fitFs(t.name, big ? 46 : 32, ct.w), cy = B - 0.33 * fs
    const sw = big ? 150 : 104, sh = big ? 76 : 52, sfs = big ? 44 : 30
    out.push(`<div class="abs row" data-row="fin-b-${n}-m${i}" style="left:250px;top:${y}px;width:1420px;height:${pitch}px;padding-top:${B}px">`
      + `<span class="abs" style="left:${(80 - mw(big ? 78 : 56)) / 2}px;top:${cy - (big ? 78 : 56) / 2 - 2}px">${medal(t.place, big ? 78 : 56)}</span>`
      + card(t, { x: 100, y: 0, ch, cw }).replace('left:100px;top:0px', `left:100px;top:${cy - ct.cy}px`)
      + `<span class="abs" style="left:1230px;top:${cy - sh / 2}px">${seal(sealCls(t.place), sw, sh, 0, '')}</span>`
      + `<span class="c" style="width:80px"></span><span class="c l nm" style="width:${ct.w}px;margin-left:${100 + ct.left - 80}px;font-size:${fs}px;overflow:visible">${esc(t.name)}</span>`
      + `<span class="c" style="width:${750 - (100 + ct.left + ct.w)}px"></span>`
      + `<span class="c nums" style="width:300px;font-size:${big ? 28 : 22}px;color:var(--muted);font-weight:400">${fmt(t.total - w.total)}</span><span class="c" style="width:${480 - 300 + 0}px"></span>`
      + `<span class="c score nums" style="width:${sw}px;font-size:${sfs}px;color:${t.place === 2 ? '#1d2630' : '#2c1305'}">${fmt(t.total)}</span></div>`)
    out.push(hl(250, y + pitch - 2, 670) + hl(1000, y + pitch - 2, 670))
  })
  if (!big && lowRows.length) {
    const y0 = startY + medalRows.length * pitch + 14, p2 = 45
    ;[lowRows.slice(0, 7), lowRows.slice(7)].forEach((col, ci) => {
      const cx = ci === 0 ? 250 : 1010
      col.forEach((t, i) => {
        const ry2 = y0 + i * p2
        out.push(`<div class="abs row" data-row="fin-b-${n}-low${ci}-${i}" style="left:${cx}px;top:${ry2}px;width:660px;height:${p2}px;padding-top:31px"><span class="abs" style="left:58px;top:${p2 / 2 - 16}px">${gem(t, 32)}</span><span class="c place" style="width:50px;font-size:24px">${t.place}</span><span class="c l nm plain" style="width:420px;margin-left:50px;font-size:${fitFs(t.name, 26, 420)}px">${esc(t.name)}</span><span class="c score nums" style="width:110px;font-size:27px;text-align:right">${fmt(t.total)}</span></div>`)
        out.push(hl(cx, ry2 + p2 - 2, 660, 'faint'))
      })
    })
  } else {
    // 4 команды: четвёртая — обычная строка таблицы (карточка поменьше)
  }
  if (big) {
    const t = lowRows[0]
    if (t) {
      const y = startY + medalRows.length * pitch, ct = cardText(ch, cw), B = 78, fs = fitFs(t.name, 46, ct.w), cy = B - 0.33 * fs
      out.push(`<div class="abs row" data-row="fin-b-4-low" style="left:250px;top:${y}px;width:1420px;height:${pitch}px;padding-top:80px">`
        + card(t, { x: 100, y: 0, ch, cw }).replace('left:100px;top:0px', `left:100px;top:${cy - ct.cy}px`)
        + `<span class="c place" style="width:80px;font-size:36px">${t.place}</span><span class="c l nm" style="width:${ct.w}px;margin-left:${100 + ct.left - 80}px;font-size:${fs}px;overflow:visible">${esc(t.name)}</span>`
        + `<span class="c" style="width:${750 - (100 + ct.left + ct.w)}px"></span>`
        + `<span class="c nums" style="width:300px;font-size:28px;color:var(--muted);font-weight:400">${fmt(t.total - w.total)}</span><span class="c" style="width:180px"></span>`
        + `<span class="c score nums" style="width:150px;font-size:46px">${fmt(t.total)}</span></div>`)
      out.push(hl(250, y + pitch - 2, 670, 'dbl') + hl(1000, y + pitch - 2, 670, 'dbl'))
    }
  }
  return out.join('\n')
}
write('final-b-4', 'Финал · Б · 4 команды', finB(4))
write('final-b-16', 'Финал · Б · 16 команд', finB(16))

// ───────── «Вспоминаем игру» ─────────
const REC = [
  { name: 'я родился', pts: 15, icon: '1f384', color: '#e0457b' },
  { name: 'Тест-3', pts: 12, icon: '26c4', color: '#1fb5d4' },
  { name: 'Тест-1', pts: 10, icon: '1f98c', color: '#7fbf3a' },
]
const REC_LONG = [
  { name: 'Самая длинная команда вечера из третьего «Б»', pts: 15.5, icon: '1f451', color: '#f2b705' },
  { name: 'Весёлые снеговики', pts: 12, icon: '26c4', color: '#2fb89a' },
  { name: 'Дед Мороз и компания', pts: 10, icon: '1f385', color: '#f08a3c' },
]
function recA(list, long) {
  const t = list[0], out = []
  out.push(`<span class="abs" style="left:84px;top:58px;width:288px;height:238px;background:url('../../../public/ny-book/_tmp/corner-l.webp') center/contain no-repeat"></span><span class="abs" style="left:1548px;top:58px;width:288px;height:238px;background:url('../../../public/ny-book/_tmp/corner-r.webp') center/contain no-repeat"></span>`)
  out.push(`<span class="abs" style="left:560px;top:148px;width:136px;height:68px;background:url('../../../public/ny-book/_tmp/sprig-berries.webp') center/contain no-repeat;transform:scaleX(-1)"></span>`)
  out.push(`<span class="abs" style="left:1224px;top:148px;width:136px;height:68px;background:url('../../../public/ny-book/_tmp/sprig-berries.webp') center/contain no-repeat"></span>`)
  out.push(kicker('Вспоминаем игру', 168, 28))
  out.push(`<div class="abs" style="left:660px;width:600px;top:226px;height:20px;display:flex;align-items:center;gap:14px"><i style="flex:1;height:2px;background:linear-gradient(90deg,transparent,var(--gold))"></i><b style="color:var(--gold-3);font-size:22px;line-height:1">❖</b><i style="flex:1;height:2px;background:linear-gradient(270deg,transparent,var(--gold))"></i></div>`)
  out.push(`<div class="abs foil" data-text="roundname" style="left:250px;width:1420px;top:262px;text-align:center;font-size:132px;white-space:nowrap">ШЕСТЬ БУКВ</div>`)
  out.push(`<div class="abs" style="left:250px;width:1420px;top:418px;text-align:center;font:700 36px/1 var(--display);letter-spacing:.3em;color:var(--ink-2);text-transform:uppercase;white-space:nowrap">Лучший результат</div>`)
  const ch = 280, cw = 1000, ct = cardText(ch, cw), cy = 478
  out.push(card(t, { x: 960 - cw / 2, y: cy, ch, cw }))
  const f = fitFs(t.name, 92, ct.w)
  out.push(cardName(t.name, 960 - cw / 2, cy, ch, cw, 92, 'center'))
  out.push(`<div class="abs row" data-row="rec-a-${long ? 'long' : 'short'}-score" style="left:660px;width:600px;top:${cy + ch + 4}px;height:110px;justify-content:center;padding-top:89px"><span class="c score gold nums" style="font-size:96px">${fmt(t.pts)}</span><span class="c" style="width:22px"></span><span class="c" style="font:700 24px/1 var(--serif);letter-spacing:.24em;color:var(--red)">ОЧКОВ</span></div>`)
  // индикатор страниц раунда: 9 точек на золотой нити, текущая — красная печать с номером
  const y = 884, x0 = 600, step = 90
  out.push(`<div class="abs" style="left:${x0}px;top:${y + 15}px;width:${step * 8}px;height:2px;background:linear-gradient(90deg,transparent,rgba(138,106,36,.7) 6%,rgba(138,106,36,.7) 94%,transparent)"></div>`)
  for (let i = 1; i <= 9; i++) {
    const cx = x0 + (i - 1) * step
    if (i === 7) out.push(`<span class="abs" style="left:${cx - 20}px;top:${y - 5}px;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#c4384a,var(--red) 60%,var(--red-3));box-shadow:0 0 0 3px var(--gold),0 0 0 5px rgba(42,26,10,.7),0 4px 6px rgba(60,30,10,.4);color:#fff3d6;font:700 22px/40px var(--serif);text-align:center">7</span>`)
    else out.push(`<span class="abs" style="left:${cx - 8}px;top:${y + 7}px;width:16px;height:16px;border-radius:50%;background:${i < 7 ? 'var(--gold)' : 'rgba(138,106,36,.28)'};box-shadow:0 0 0 2px ${i < 7 ? 'var(--gold-3)' : 'rgba(138,106,36,.4)'}"></span>`)
  }
  return out.join('\n')
}
write('recap-a', 'Вспоминаем игру · А · портрет', recA(REC, false), true)
write('recap-a-long', 'Вспоминаем игру · А · длинное имя', recA(REC_LONG, true), true)

function recB(list, long) {
  const out = []
  // левая страница: закладка с номером, подпись, название раунда
  out.push(`<div class="abs" style="left:530px;top:50px;width:104px;height:300px;filter:drop-shadow(0 6px 6px rgba(40,14,8,.4))"><div style="width:100%;height:100%;clip-path:polygon(0 0,100% 0,100% 100%,50% 88%,0 100%);background:#5e101b"></div><div style="position:absolute;inset:5px 5px 6px;clip-path:polygon(0 0,100% 0,100% 100%,50% 88%,0 100%);background:linear-gradient(90deg,#7d1626,#a82437 40%,#8f1d2c 70%,#6e1220)"></div><div style="position:absolute;inset:14px 14px 40px;border:2px solid var(--gold);border-radius:4px;opacity:.8"></div></div>`)
  out.push(`<div class="abs foil" data-text="bm" style="left:530px;width:104px;top:130px;text-align:center;font-size:96px;line-height:1">7</div>`)
  out.push(`<div class="abs" style="left:530px;width:104px;top:236px;text-align:center;font:700 14px/1 var(--serif);letter-spacing:.2em;color:var(--gold-2)">РАУНД</div>`)
  out.push(`<div class="abs" style="left:250px;width:670px;top:396px;text-align:center;font:700 26px/1 var(--serif);letter-spacing:.26em;color:var(--red);white-space:nowrap">✦ ВСПОМИНАЕМ ИГРУ ✦</div>`)
  out.push(`<div class="abs foil" data-text="roundname" style="left:250px;width:670px;top:450px;text-align:center;font-size:112px;line-height:1.02">ШЕСТЬ<br>БУКВ</div>`)
  out.push(`<div class="abs" style="left:380px;width:410px;top:700px;height:20px;display:flex;align-items:center;gap:12px"><i style="flex:1;height:2px;background:linear-gradient(90deg,transparent,var(--gold))"></i><b style="color:var(--gold-3);font-size:20px;line-height:1">❖</b><i style="flex:1;height:2px;background:linear-gradient(270deg,transparent,var(--gold))"></i></div>`)
  out.push(`<div class="abs" style="left:250px;width:670px;top:742px;text-align:center;font:italic 500 30px/1 var(--display);letter-spacing:.06em;color:var(--muted)">7 из 9</div>`)
  // правая страница: три лучшие команды раунда лесенкой
  out.push(`<div class="abs" style="left:1000px;width:670px;top:160px;text-align:center;font:700 36px/1 var(--display);letter-spacing:.24em;color:var(--ink-2);text-transform:uppercase;white-space:nowrap">Лучший результат</div>`)
  out.push(hl(1100, 214, 470))
  const steps = [{ ch: 188, cw: 470, ind: 0, mh: 92, y: 262 }, { ch: 156, cw: 440, ind: 30, mh: 74, y: 500 }, { ch: 132, cw: 410, ind: 60, mh: 62, y: 690 }]
  list.forEach((t, i) => {
    const s = steps[i], ct = cardText(s.ch, s.cw), x = 1000 + 64 + s.ind
    const f = fitFs(t.name, [56, 46, 40][i], ct.w)
    out.push(`<span class="abs" style="left:${1000 + (64 - mw(s.mh)) / 2 + s.ind}px;top:${s.y + ct.cy - s.mh * 0.46}px">${medal(i + 1, s.mh)}</span>`)
    out.push(card(t, { x, y: s.y, ch: s.ch, cw: s.cw }))
    out.push(cardName(t.name, x, s.y, s.ch, s.cw, [56, 46, 40][i]))
    const sw = [132, 112, 100][i], sh = [70, 58, 52][i], sfs = [42, 34, 30][i]
    out.push(`<div class="abs row" data-row="rec-b-${long ? 'long' : 'short'}-s${i}" style="left:${x + s.cw + 10}px;top:${s.y + ct.cy - sh / 2}px;width:${sw}px;height:${sh}px;padding-top:${sh / 2 + 0.35 * sfs}px"><span class="abs" style="left:0;top:0">${seal(sealCls(i + 1), sw, sh, 0, '')}</span><span class="c score nums" style="width:${sw}px;font-size:${sfs}px;color:${i === 0 ? '#3a1208' : i === 1 ? '#1d2630' : '#2c1305'}">${fmt(t.pts)}</span></div>`)
  })
  return out.join('\n')
}
write('recap-b', 'Вспоминаем игру · Б · две страницы', recB(REC, false), true)
write('recap-b-long', 'Вспоминаем игру · Б · длинные имена', recB(REC_LONG, true), true)
