// Прототипы экранов раунда «Скачки бульдогов» для согласования (НЕ боевой код): выбор, переход, итоги, пьедестал — по токенам активной темы.
// Один набор функций рисует любой экран в любой теме: палитра читается из CSS-переменных класса `.theme-*` (тот же механизм, что у StageRenderer.readPalette),
// вид «рамок» (скос/арка/снежная шапка/лист) — по семейству темы. Зимняя арена — общий фон гонки; на других темах она остаётся как есть (принятая сцена).
// Управление: window.proto.frame({ screen, variant, theme, u }) — чистая функция от параметров, поэтому кадры и ролики детерминированы.
import '../../src/styles/global.css'
import { ArenaRenderer } from '../../src/lib/bulldog/arena/arena'
import { DOG_IDS, LAYOUT as L } from '../../src/lib/bulldog/config'
import { loadDogData, loadSelectionData, createSelectionPlayer, BitmapPool, selectSheetUrl, type DogData } from '../../src/lib/bulldog/engine'
import { ARENA } from '../../src/lib/bulldog/arena/camera'
import { pointsFor } from '../../src/lib/bulldog/bets'

const W = 1920, H = 1080
type Kind = 'cyber' | 'magic' | 'winter' | 'forest'
const KIND: Record<string, Kind> = { classic: 'cyber', potter: 'magic', new_year: 'winter', ny_book: 'winter', ny_home: 'winter', enchanted_forest: 'forest' }
interface Tok { theme: string; kind: Kind; light: boolean; fg: string; muted: string; panel: string; bg: string; bg2: string; accent: string; accent2: string; ok: string; disp: string; digits: string }
const cv = document.getElementById('cv') as HTMLCanvasElement; cv.width = W; cv.height = H
const ctx = cv.getContext('2d')!
const NAMES = ['Фрэнк', 'Зефир', 'Рокки', 'Пупс', 'Луна']
const TEAMS = ['ТИГРЫ', 'СОВЫ', 'ЛИСЫ', 'ВОЛКИ', 'ЁЖИКИ', 'ОРЛЫ', 'БОБРЫ', 'ЗУБРЫ']
const PICKS = [2, 4, 1, 5, 3, 2, 1, 0]                  // номер собаки 1..5, 0 — без ставки
const PLACES = [0, 4, 2, 3, 1]                          // итог: Фрэнк, Луна, Рокки, Пупс, Зефир (индексы собак)
const TIMES = [42.06, 49.37, 51.92, 53.56, 55.9]
const rnd = (i: number) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
// ── токены темы
function parse(c: string): [number, number, number, number] {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c.trim()); if (m) { const h = m[1].length === 3 ? m[1].split('').map(x => x + x).join('') : m[1]; return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1] }
  const r = /rgba?\(([^)]+)\)/.exec(c); if (r) { const p = r[1].split(',').map(x => parseFloat(x)); return [p[0], p[1], p[2], p[3] ?? 1] }
  return [128, 128, 128, 1]
}
const rgba = (c: string, a: number) => { const [r, g, b, a0] = parse(c); return `rgba(${r},${g},${b},${a * a0})` }
const lum = (c: string) => { const [r, g, b] = parse(c); return (0.299 * r + 0.587 * g + 0.114 * b) / 255 }
const holders = new Map<string, HTMLElement>()
function tok(theme: string): Tok {
  let h = holders.get(theme); if (!h) { h = document.createElement('div'); h.className = `theme-${theme}`; h.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden'; document.body.appendChild(h); holders.set(theme, h) }
  const cs = getComputedStyle(h), g = (n: string, d: string) => cs.getPropertyValue(n).trim() || d
  const bg = g('--bg', '#0a0f1e')
  return { theme, kind: KIND[theme] ?? 'cyber', light: lum(bg) > 0.55, fg: g('--fg', '#fff'), muted: g('--muted', '#aaa'), panel: g('--panel', '#101728'), bg, bg2: g('--bg2', '#101728'), accent: g('--accent', '#ea580c'), accent2: g('--accent2', '#22d3ee'), ok: g('--ok', '#57f5c0'),
    disp: g('--font-display', 'sans-serif'), digits: g('--font-digits', 'monospace') }
}
// ── примитивы
const rr = (x: number, y: number, w: number, h: number, r: number) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r) }
const ease = (u: number) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u) }
const seg = (u: number, a: number, b: number) => ease((u - a) / (b - a))
function text(s: string, x: number, y: number, size: number, color: string, o: { align?: CanvasTextAlign; font?: string; weight?: string; ls?: number; shadow?: string } = {}) {
  ctx.save(); ctx.fillStyle = color; ctx.font = `${o.weight ?? 'normal'} ${size}px ${o.font ?? 'sans-serif'}`; ctx.textAlign = o.align ?? 'left'; ctx.textBaseline = 'alphabetic'
  if (o.ls) (ctx as unknown as { letterSpacing: string }).letterSpacing = `${o.ls}px`
  if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = 18 }
  ctx.fillText(s, x, y); ctx.restore()
}
// ── ресурсы
let dogs: (DogData | null)[] = [], pool: BitmapPool, selData: Awaited<ReturnType<typeof loadSelectionData>>, arenaCv: HTMLCanvasElement, arenaStart: HTMLCanvasElement, arenaEnd: HTMLCanvasElement
const frames: { clip: string; index: number }[] = []
async function boot() {
  pool = new BitmapPool(); selData = await loadSelectionData(); dogs = await Promise.all(DOG_IDS.map(id => loadDogData(id)))
  await Promise.all(DOG_IDS.flatMap((id, i) => ['idle'].map(c => pool.get(selectSheetUrl(id, dogs[i]!.sel.clips[c].sheet)))))
  DOG_IDS.forEach((id, i) => { const p = createSelectionPlayer(id, selData, 11 + i * 7); let f = p.tick(); for (let k = 0; k < 40 + i * 9; k++) f = p.tick(); frames[i] = { clip: f.clip, index: f.index } })
  arenaCv = document.createElement('canvas'); const a = new ArenaRenderer(arenaCv, { slotBase: `${import.meta.env.BASE_URL}arena/`, names: NAMES }); await a.init({ seed: 777, D: 42 }, 0, 60)
  const snap = (t: number) => { a.draw(t); const c = document.createElement('canvas'); c.width = W; c.height = H; c.getContext('2d')!.drawImage(arenaCv, 0, 0); return c }
  arenaStart = snap(0); arenaEnd = snap(59)
}
function dog(i: number, x: number, y: number, k: number, alpha = 1) {                 // x — центр, y — линия лап
  const d = dogs[i]!, fr = frames[i], bm = pool.peek(selectSheetUrl(DOG_IDS[i], d.sel.clips[fr.clip]?.sheet ?? '')); if (!bm) return
  const [cw, ch] = d.sel.cell, cols = d.sel.columns, paw = 273
  ctx.save(); ctx.globalAlpha = alpha; ctx.drawImage(bm, (fr.index % cols) * cw, Math.floor(fr.index / cols) * ch, cw, ch, x - cw * k / 2, y - paw * k, cw * k, ch * k); ctx.restore()
}
// ── фоны по семейству темы
function backdrop(t: Tok, withSnow = true) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, t.bg); g.addColorStop(1, t.bg2); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  if (t.kind === 'cyber') { ctx.strokeStyle = rgba(t.accent, .07); ctx.lineWidth = 1; for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() } for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
    const r = ctx.createRadialGradient(W / 2, H * .95, 0, W / 2, H * .95, 900); r.addColorStop(0, rgba(t.accent, .22)); r.addColorStop(1, rgba(t.accent, 0)); ctx.fillStyle = r; ctx.fillRect(0, 0, W, H) }
  else if (t.kind === 'magic') { const r = ctx.createRadialGradient(W / 2, H * .45, 100, W / 2, H * .5, 1100); r.addColorStop(0, rgba(t.accent, .10)); r.addColorStop(1, 'rgba(0,0,0,.45)'); ctx.fillStyle = r; ctx.fillRect(0, 0, W, H)
    for (let i = 0; i < 70; i++) { ctx.fillStyle = rgba(t.accent, .15 + rnd(i) * .5); ctx.fillRect(rnd(i + 9) * W, rnd(i + 3) * H, 2, 2) } }
  else if (t.kind === 'forest') { for (let i = 0; i < 40; i++) { const x = rnd(i) * W, y = rnd(i + 5) * H, rr0 = 20 + rnd(i + 8) * 60, gg = ctx.createRadialGradient(x, y, 0, x, y, rr0); gg.addColorStop(0, rgba(i % 2 ? t.accent : t.accent2, .22)); gg.addColorStop(1, rgba(t.accent, 0)); ctx.fillStyle = gg; ctx.fillRect(x - rr0, y - rr0, rr0 * 2, rr0 * 2) } }
  else { // winter
    if (t.light) { ctx.strokeStyle = rgba(t.muted, .35); ctx.lineWidth = 3; rr(34, 34, W - 68, H - 68, 18); ctx.stroke(); ctx.lineWidth = 1; rr(46, 46, W - 92, H - 92, 12); ctx.stroke() }
    else if (withSnow) for (let i = 0; i < 120; i++) { ctx.fillStyle = `rgba(255,255,255,${.2 + rnd(i) * .5})`; ctx.beginPath(); ctx.arc(rnd(i + 1) * W, rnd(i + 2) * H, .8 + rnd(i + 3) * 2.2, 0, 7); ctx.fill() } }
}
function garland(t: Tok, y: number, x0 = 0, x1 = W) {                                  // гирлянда: провод дугами + огоньки токенами темы
  ctx.strokeStyle = rgba(t.light ? t.fg : '#1d4a3d', .7); ctx.lineWidth = 3; ctx.beginPath(); const n = Math.ceil((x1 - x0) / 220)
  for (let i = 0; i < n; i++) { const a = x0 + i * 220, b = Math.min(x1, a + 220); ctx.moveTo(a, y); ctx.quadraticCurveTo((a + b) / 2, y + 34, b, y) } ctx.stroke()
  for (let i = 0; i < n; i++) for (let k = 1; k < 6; k++) { const a = x0 + i * 220, b = Math.min(x1, a + 220), u = k / 6, px = a + (b - a) * u, py = y + 2 * u * (1 - u) * 34 + 4, c = (i + k) % 3 === 0 ? t.accent2 : t.accent
    const gg = ctx.createRadialGradient(px, py, 0, px, py, 16); gg.addColorStop(0, rgba(c, .8)); gg.addColorStop(1, rgba(c, 0)); ctx.fillStyle = gg; ctx.fillRect(px - 16, py - 16, 32, 32); ctx.fillStyle = '#fff6d8'; ctx.beginPath(); ctx.arc(px, py, 3, 0, 7); ctx.fill() }
}
// ── карточка/рамка по семейству темы
function frame(t: Tok, x: number, y: number, w: number, h: number, sel: boolean, compact = false) {
  ctx.save(); ctx.fillStyle = rgba(t.panel, t.light ? .96 : .9); ctx.strokeStyle = sel ? t.accent : rgba(t.muted, .55); ctx.lineWidth = sel ? 6 : 2
  if (sel && t.kind !== 'winter') { ctx.shadowColor = rgba(t.accent, .7); ctx.shadowBlur = 28 }
  const p = new Path2D()
  if (t.kind === 'cyber') { const c = 26; p.moveTo(x + c, y); p.lineTo(x + w - c, y); p.lineTo(x + w, y + c); p.lineTo(x + w, y + h - c); p.lineTo(x + w - c, y + h); p.lineTo(x + c, y + h); p.lineTo(x, y + h - c); p.lineTo(x, y + c); p.closePath() }
  else if (t.kind === 'magic' && !compact) { p.moveTo(x, y + h); p.lineTo(x, y + 90); p.quadraticCurveTo(x, y, x + w / 2, y - 6); p.quadraticCurveTo(x + w, y, x + w, y + 90); p.lineTo(x + w, y + h); p.closePath() }
  else if (t.kind === 'forest') { p.roundRect(x, y, w, h, [60, 14, 60, 14]) } else { p.roundRect(x, y, w, h, 24) }
  ctx.fill(p); ctx.stroke(p); ctx.shadowBlur = 0
  if (t.kind === 'magic' && !compact) { ctx.strokeStyle = rgba(t.accent, .35); ctx.lineWidth = 1; ctx.translate(0, 0); ctx.save(); ctx.translate(x + 10, y + 10); ctx.scale((w - 20) / w, (h - 14) / h); ctx.stroke(p); ctx.restore() }
  if (t.kind === 'winter' && !compact) {                                                           // снежная шапка на верхней кромке
    ctx.fillStyle = t.light ? '#fff' : '#f3efff'; ctx.beginPath(); ctx.moveTo(x + 6, y + 6); for (let k = 0; k <= 16; k++) { const px = x + 6 + (w - 12) * k / 16; ctx.lineTo(px, y - 8 - Math.sin(k * 1.9 + x) * 4 - (k % 2) * 3) } ctx.lineTo(x + w - 6, y + 10); ctx.lineTo(x + 6, y + 10); ctx.closePath(); ctx.fill() }
  ctx.restore()
}
const badge = (t: Tok, x: number, y: number, n: number, s = 64) => {
  ctx.save(); ctx.fillStyle = t.accent
  if (t.kind === 'cyber') { ctx.beginPath(); ctx.moveTo(x + 14, y); ctx.lineTo(x + s, y); ctx.lineTo(x + s, y + s - 14); ctx.lineTo(x + s - 14, y + s); ctx.lineTo(x, y + s); ctx.lineTo(x, y + 14); ctx.closePath(); ctx.fill() }
  else if (t.kind === 'magic' || t.kind === 'forest') { ctx.beginPath(); ctx.arc(x + s / 2, y + s / 2, s / 2, 0, 7); ctx.fill(); ctx.strokeStyle = rgba(t.fg, .6); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + s / 2, y + s / 2, s / 2 - 5, 0, 7); ctx.stroke() }
  else { rr(x, y, s, s, 14); ctx.fill() }
  ctx.restore(); text(String(n), x + s / 2, y + s * .72, s * .62, t.light ? '#fff' : (lum(t.accent) > .6 ? '#1a1a1a' : '#fff'), { align: 'center', font: t.digits, weight: 'bold' })
}
// ── экран выбора
function drawSelect(t: Tok, counts = [1, 2, 1, 0, 3], alpha = 1, dy = 0, scale = 1) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(W / 2, H / 2 + dy); ctx.scale(scale, scale); ctx.translate(-W / 2, -H / 2)
  text(t.kind === 'cyber' ? '// ВЫБЕРИТЕ СВОЕГО БУЛЬДОГА' : 'ВЫБЕРИТЕ СВОЕГО БУЛЬДОГА', W / 2, 96, 54, t.fg, { align: 'center', font: t.disp, weight: 'bold', ls: 3, shadow: t.light ? undefined : rgba(t.accent, .5) })
  text('Команды выбирают на телефонах — выбор можно менять до старта', W / 2, 142, 26, t.muted, { align: 'center', font: t.disp })
  const cw = 340, gap = 30, x0 = (W - (5 * cw + 4 * gap)) / 2
  for (let i = 0; i < 5; i++) {
    const x = x0 + i * (cw + gap), y = 200, h = 780, sel = counts[i] > 0
    frame(t, x, y, cw, h, sel); badge(t, x + 18, y + 22, i + 1); text(NAMES[i], x + 98, y + 76, 42, t.fg, { font: t.disp, weight: 'bold' })
    const gg = ctx.createRadialGradient(x + cw / 2, y + 560, 0, x + cw / 2, y + 560, 150); gg.addColorStop(0, rgba(sel ? t.accent : t.muted, .28)); gg.addColorStop(1, rgba(t.accent, 0)); ctx.save(); ctx.translate(x + cw / 2, y + 560); ctx.scale(1, .14); ctx.translate(-(x + cw / 2), -(y + 560)); ctx.fillStyle = gg; ctx.fillRect(x, y + 400, cw, 320); ctx.restore()
    dog(i, x + cw / 2, y + 568, 1.4)
    text('СТАВОК', x + cw / 2, y + h - 100, 24, t.muted, { align: 'center', font: t.disp, ls: 2 }); text(String(counts[i]), x + cw / 2, y + h - 30, 72, sel ? t.accent : rgba(t.muted, .85), { align: 'center', font: t.digits, weight: 'bold' })
    if (sel) { ctx.save(); ctx.fillStyle = t.accent; rr(x + cw / 2 - 54, y + 104, 108, 36, 18); ctx.fill(); ctx.restore(); text('ВЫБРАН', x + cw / 2, y + 130, 20, t.light ? '#fff' : '#111', { align: 'center', font: t.disp, weight: 'bold' }) }
  }
  ctx.restore()
}
// ── переход к гонке
const LANES = ARENA.LANE_Y
function lanePlate(t: Tok, i: number, a: number, slide: number) {
  const y = LANES[i] - 74, x = 26 - (1 - slide) * 460
  ctx.save(); ctx.globalAlpha = a; frame(t, x, y, 400, 62, false, true); badge(t, x + 8, y + 3, i + 1, 56); text(NAMES[i], x + 76, y + 44, 34, t.fg, { font: t.disp, weight: 'bold' })
  text(`×${[1, 2, 1, 0, 3][i]}`, x + 380, y + 44, 30, t.accent, { align: 'right', font: t.digits, weight: 'bold' }); ctx.restore()
}
function drawTransition(t: Tok, v: 'A' | 'B', u: number) {
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H)
  if (v === 'A') {                                                                    // A «Стартовая решётка»: тематическая шторка открывает арену, плашки дорожек выезжают слева
    const wipe = seg(u, .12, .5)
    ctx.drawImage(arenaStart, 0, 0)
    if (wipe < 1) {                                                                  // табло выбора уезжает, шторка темы идёт слева направо
      const edge = wipe * (W + 500) - 250
      ctx.save(); ctx.beginPath(); ctx.moveTo(edge, 0); ctx.lineTo(W, 0); ctx.lineTo(W, H); ctx.lineTo(edge - 220, H); ctx.closePath(); ctx.clip(); backdrop(t); drawSelect(t, undefined, 1 - seg(u, 0, .3), 0, 1 + seg(u, 0, .3) * .04); ctx.restore()
      const gg = ctx.createLinearGradient(edge - 260, 0, edge + 40, 0); gg.addColorStop(0, rgba(t.accent, 0)); gg.addColorStop(.55, rgba(t.accent, .9)); gg.addColorStop(.8, rgba(t.accent2, .95)); gg.addColorStop(1, rgba(t.accent2, 0)); ctx.save(); ctx.beginPath(); ctx.moveTo(edge - 220, H); ctx.lineTo(edge, 0); ctx.lineTo(edge + 40, 0); ctx.lineTo(edge - 180, H); ctx.closePath(); ctx.fillStyle = gg; ctx.fill(); ctx.restore() }
    for (let i = 0; i < 5; i++) { const s = seg(u, .36 + i * .035, .5 + i * .035), out = seg(u, .86 + i * .02, .98); if (s > 0 && out < 1) lanePlate(t, i, 1 - out, s * (1 - out) + 0) }
    const tt = seg(u, .3, .5) * (1 - seg(u, .84, .96)); if (tt > 0) { ctx.save(); ctx.globalAlpha = tt; ctx.fillStyle = rgba(t.panel, .88); ctx.fillRect(0, 60, W, 96); ctx.fillStyle = t.accent; ctx.fillRect(0, 60, W, 5); ctx.restore(); ctx.save(); ctx.globalAlpha = tt; text('К СТАРТОВОЙ ЛИНИИ', W / 2, 126, 52, t.fg, { align: 'center', font: t.disp, weight: 'bold', ls: 6 }); ctx.restore() }
  } else {                                                                            // B «Прожектор и наезд»: табло наезжает и растворяется ирисом, арена оседает из крупного плана, над собаками всплывают имена
    const iris = seg(u, .16, .6), z = 1.2 - .2 * seg(u, .12, .85)
    ctx.save(); ctx.translate(W / 2, H * .62); ctx.scale(z, z); ctx.translate(-W / 2, -H * .62); ctx.drawImage(arenaStart, 0, 0); ctx.restore()
    if (iris < 1) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.moveTo(W / 2 + iris * 1250, H / 2); ctx.arc(W / 2, H / 2, iris * 1250, 0, 7, true); ctx.clip('evenodd'); backdrop(t); drawSelect(t, undefined, 1 - seg(u, 0, .22), 0, 1 + seg(u, 0, .6) * .35); ctx.restore()
      ctx.strokeStyle = rgba(t.accent, .9 * (1 - iris)); ctx.lineWidth = 10 + 24 * (1 - iris); ctx.beginPath(); ctx.arc(W / 2, H / 2, iris * 1250, 0, 7); ctx.stroke() }
    const vg = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1200); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(0,0,0,${.55 * (1 - seg(u, .5, .95))})`); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H)
    const tt = seg(u, .38, .56) * (1 - seg(u, .8, .94)); if (tt > 0) { ctx.save(); ctx.globalAlpha = tt; text('ЗАБЕГ', W / 2, 280 - 30 * (1 - tt), 150, t.fg, { align: 'center', font: t.disp, weight: 'bold', ls: 18, shadow: rgba(t.accent, .9) }); text('ПЯТЬ БУЛЬДОГОВ · ОДНА ТРАССА', W / 2, 346, 34, t.accent2, { align: 'center', font: t.disp, ls: 8 }); ctx.restore() }
    for (let i = 0; i < 5; i++) { const s = seg(u, .55 + i * .04, .7 + i * .04) * (1 - seg(u, .88, .98)); if (s > 0) { const y = LANES[i] - 36 + (1 - s) * 0, x = 800 + (1 - s) * 40; ctx.save(); ctx.globalAlpha = s; frame(t, x - 100, y - 36, 200, 50, false, true); text(NAMES[i], x, y, 30, t.fg, { align: 'center', font: t.disp, weight: 'bold' }); ctx.restore() } }
  }
}
// ── итоги (общая таблица) и пьедестал
function medalColors(p: number, t: Tok): [string, string] { return p === 0 ? ['#ffe27a', '#b8860b'] : p === 1 ? ['#f1f4f8', '#8d98a6'] : p === 2 ? ['#e8a974', '#8a4f26'] : [rgba(t.muted, 1), rgba(t.muted, 1)] }
function drawResults(t: Tok, u = 1) {
  if (t.kind === 'winter') { ctx.drawImage(arenaEnd, 0, 0); ctx.fillStyle = 'rgba(8,6,30,.55)'; ctx.fillRect(0, 0, W, H) } else backdrop(t)
  const x = 330, y = 120, w = 1260, h = 840; frame(t, x, y, w, h, false)
  text('ФИНИШ · ИТОГОВЫЕ МЕСТА', W / 2, y + 90, 56, t.fg, { align: 'center', font: t.disp, weight: 'bold', ls: 4 })
  ctx.fillStyle = rgba(t.accent, .8); ctx.fillRect(x + 60, y + 116, w - 120, 4)
  PLACES.forEach((d, p) => {
    const s = seg(u, p * .12, p * .12 + .2), ry = y + 160 + p * 100, ox = (1 - s) * 80
    ctx.save(); ctx.globalAlpha = s; ctx.translate(ox, 0)
    ctx.fillStyle = p === 0 ? rgba(t.accent, .18) : rgba(t.muted, .09); rr(x + 50, ry, w - 100, 88, 14); ctx.fill()
    const [c1, c2] = medalColors(p, t); const gg = ctx.createRadialGradient(x + 112, ry + 40, 4, x + 112, ry + 44, 40); gg.addColorStop(0, c1); gg.addColorStop(1, c2); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x + 112, ry + 44, 36, 0, 7); ctx.fill()
    text(String(p + 1), x + 112, ry + 60, 44, p < 3 ? '#1b1b1b' : t.bg, { align: 'center', font: t.digits, weight: 'bold' })
    dog(d, x + 230, ry + 82, .36)
    text(NAMES[d], x + 300, ry + 56, 42, t.fg, { font: t.disp, weight: 'bold' })
    const who = PICKS.map((pk, ti) => pk === d + 1 ? TEAMS[ti] : null).filter(Boolean).join(' · ') || '—'
    text(who, x + 560, ry + 54, 28, t.muted, { font: t.disp }); text(`${TIMES[p].toFixed(2)} с`, x + w - 190, ry + 56, 38, t.fg, { align: 'right', font: t.digits }); text(`+${5 - p}`, x + w - 100, ry + 56, 44, p === 0 ? t.accent : t.accent2, { align: 'center', font: t.digits, weight: 'bold' })
    ctx.restore() })
  text('КОМАНДЫ БЕЗ СТАВКИ: ОРЛЫ, ЗУБРЫ (0 очков)', W / 2, y + h - 40, 28, t.muted, { align: 'center', font: t.disp })
}
// ── пьедестал: общий каркас (позиции, подписи, собаки) + два оформления
const STEPS = [{ place: 1, x: 500, h: 190 }, { place: 0, x: 880, h: 280 }, { place: 2, x: 1260, h: 120 }]       // место (0=1-е), центр, высота
const PBASE = 860, PW = 340, PDEPTH = 34
function snowCap(x: number, y: number, w: number, light: boolean) {
  ctx.save(); ctx.fillStyle = light ? '#fff' : '#f5f1ff'; ctx.shadowColor = 'rgba(40,30,110,.35)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4
  ctx.beginPath(); ctx.moveTo(x - 12, y + 14); for (let k = 0; k <= 24; k++) { const px = x - 12 + (w + 24) * k / 24; ctx.lineTo(px, y - 10 - Math.sin(k * 1.3 + w) * 5 - (k % 3) * 3) } ctx.lineTo(x + w + 12, y + 20); ctx.lineTo(x + w - 20, y + 30 + Math.sin(w) * 4); ctx.lineTo(x + 40, y + 28); ctx.lineTo(x - 12, y + 22); ctx.closePath(); ctx.fill(); ctx.restore()
  ctx.fillStyle = 'rgba(190,200,255,.85)'; for (let k = 0; k < 9; k++) { const px = x + 14 + (w - 28) * (k + .3) / 9, ih = 12 + rnd(k + w) * 20; ctx.beginPath(); ctx.moveTo(px - 5, y + 24); ctx.lineTo(px + 5, y + 24); ctx.lineTo(px, y + 24 + ih); ctx.closePath(); ctx.fill() }
}
function podiumA(t: Tok, p: number, x: number, h: number) {                           // A: «основательный» — дерево+снег / сталь+неон / камень+золото
  const top = PBASE - h, l = x - PW / 2, [m1, m2] = medalColors(p, t)
  if (t.kind === 'winter') {
    const g = ctx.createLinearGradient(0, top, 0, PBASE); g.addColorStop(0, '#9a6a45'); g.addColorStop(1, '#4a2f22'); ctx.fillStyle = g; ctx.fillRect(l, top, PW, h)
    for (let k = 0; k < PW / 42; k++) { ctx.fillStyle = `rgba(0,0,0,${.12 + rnd(k + p) * .12})`; ctx.fillRect(l + k * 42, top, 3, h); ctx.fillStyle = 'rgba(255,220,170,.08)'; ctx.fillRect(l + k * 42 + 4, top, 6, h) }
    for (let k = 0; k < 60; k++) { ctx.strokeStyle = `rgba(40,20,10,${.1 + rnd(k) * .1})`; ctx.lineWidth = 1; const gx = l + rnd(k + p) * PW; ctx.beginPath(); ctx.moveTo(gx, top + rnd(k + 2) * h); ctx.lineTo(gx + (rnd(k + 5) - .5) * 10, top + rnd(k + 2) * h + 30 + rnd(k + 7) * 40); ctx.stroke() }
    for (const by of [top + 26, PBASE - 30]) { ctx.fillStyle = '#2b2f3a'; ctx.fillRect(l - 2, by, PW + 4, 14); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(l - 2, by, PW + 4, 3); for (let k = 0; k < 8; k++) { ctx.fillStyle = '#8b94a4'; ctx.beginPath(); ctx.arc(l + 20 + k * (PW - 40) / 7, by + 8, 2.5, 0, 7); ctx.fill() } }
    ctx.fillStyle = '#c28a5a'; ctx.beginPath(); ctx.moveTo(l + 16, top - PDEPTH); ctx.lineTo(l + PW - 16, top - PDEPTH); ctx.lineTo(l + PW, top); ctx.lineTo(l, top); ctx.closePath(); ctx.fill()
    snowCap(l + 10, top - PDEPTH + 6, PW - 20, t.light)
    garland(t, top + 62, l + 6, l + PW - 6)
  } else if (t.kind === 'cyber') {
    const g = ctx.createLinearGradient(0, top, 0, PBASE); g.addColorStop(0, '#2a3040'); g.addColorStop(1, '#0f131c'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(l, top); ctx.lineTo(l + PW, top); ctx.lineTo(l + PW, PBASE - 16); ctx.lineTo(l + PW - 16, PBASE); ctx.lineTo(l + 16, PBASE); ctx.lineTo(l, PBASE - 16); ctx.closePath(); ctx.fill()
    ctx.strokeStyle = rgba(t.accent2, .12); ctx.lineWidth = 1; for (let k = 0; k < PW; k += 24) { ctx.beginPath(); ctx.moveTo(l + k, top); ctx.lineTo(l + k - 40, PBASE); ctx.stroke() }
    ctx.fillStyle = '#3b4358'; ctx.beginPath(); ctx.moveTo(l + 18, top - PDEPTH); ctx.lineTo(l + PW - 18, top - PDEPTH); ctx.lineTo(l + PW, top); ctx.lineTo(l, top); ctx.closePath(); ctx.fill()
    ctx.save(); ctx.shadowColor = t.accent; ctx.shadowBlur = 24; ctx.strokeStyle = t.accent; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(l, top); ctx.lineTo(l + PW, top); ctx.stroke(); ctx.strokeStyle = t.accent2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(l + 16, PBASE - 6); ctx.lineTo(l + PW - 16, PBASE - 6); ctx.stroke(); ctx.restore()
  } else {                                                                            // magic / forest: камень с золотой отделкой
    const g = ctx.createLinearGradient(0, top, 0, PBASE); g.addColorStop(0, t.kind === 'magic' ? '#4a4163' : '#2f4a3a'); g.addColorStop(1, t.kind === 'magic' ? '#231d38' : '#12251c'); ctx.fillStyle = g; ctx.fillRect(l, top, PW, h)
    ctx.save(); ctx.beginPath(); ctx.rect(l, top, PW, h); ctx.clip(); for (let r = 0; r < h / 46; r++) for (let k = 0; k < 5; k++) { ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.strokeRect(l + k * 85 + (r % 2) * 42 - 42, top + r * 46, 85, 46) } ctx.restore()
    ctx.fillStyle = t.kind === 'magic' ? '#6d6190' : '#4a7a5e'; ctx.beginPath(); ctx.moveTo(l + 16, top - PDEPTH); ctx.lineTo(l + PW - 16, top - PDEPTH); ctx.lineTo(l + PW, top); ctx.lineTo(l, top); ctx.closePath(); ctx.fill()
    ctx.strokeStyle = t.accent; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(l, top); ctx.lineTo(l + PW, top); ctx.stroke(); ctx.lineWidth = 2; ctx.strokeRect(l + 10, top + 14, PW - 20, h - 24)
  }
  const gm = ctx.createRadialGradient(x - 8, top + h / 2 - 12, 4, x, top + h / 2, 56); gm.addColorStop(0, m1); gm.addColorStop(1, m2); ctx.fillStyle = gm; ctx.beginPath(); ctx.arc(x, top + h / 2 + 6, 52, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 3; ctx.stroke()
  text(String(p + 1), x, top + h / 2 + 30, 76, '#1d1d1d', { align: 'center', font: t.digits, weight: 'bold' })
}
function podiumB(t: Tok, p: number, x: number, h: number) {                           // B: «шоу» — гладкие постаменты со светом: лёд / голограмма / мрамор
  const top = PBASE - h, l = x - PW / 2, [m1, m2] = medalColors(p, t)
  const body = t.kind === 'winter' ? ['#cfe6ff', '#6f9ed8'] : t.kind === 'cyber' ? [rgba(t.accent2, .55), rgba(t.accent2, .12)] : t.kind === 'magic' ? ['#f2ead0', '#8b7a52'] : ['#cdebd9', '#4f8a68']
  const g = ctx.createLinearGradient(l, 0, l + PW, 0); g.addColorStop(0, body[1]); g.addColorStop(.3, body[0]); g.addColorStop(.7, body[0]); g.addColorStop(1, body[1])
  ctx.save(); ctx.fillStyle = g; ctx.globalAlpha = t.kind === 'cyber' ? .85 : 1; ctx.beginPath(); ctx.moveTo(l, top); ctx.lineTo(l + PW, top); ctx.lineTo(l + PW, PBASE - 24); ctx.ellipse(x, PBASE - 24, PW / 2, 26, 0, 0, Math.PI); ctx.lineTo(l, top); ctx.closePath(); ctx.fill(); ctx.restore()
  const tg = ctx.createRadialGradient(x, top - 6, 10, x, top, PW / 2); tg.addColorStop(0, '#ffffff'); tg.addColorStop(1, body[0]); ctx.fillStyle = tg; ctx.beginPath(); ctx.ellipse(x, top, PW / 2, 30, 0, 0, 7); ctx.fill()
  ctx.save(); ctx.strokeStyle = t.kind === 'cyber' ? t.accent : rgba(t.accent, .9); ctx.lineWidth = 4; ctx.shadowColor = t.accent; ctx.shadowBlur = 22; ctx.beginPath(); ctx.ellipse(x, top, PW / 2, 30, 0, 0, Math.PI); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, PBASE - 24, PW / 2, 26, 0, 0, Math.PI); ctx.stroke(); ctx.restore()
  if (t.kind === 'cyber') { ctx.strokeStyle = rgba(t.accent2, .5); ctx.lineWidth = 1; for (let k = 0; k < h; k += 10) { ctx.beginPath(); ctx.moveTo(l, top + k); ctx.lineTo(l + PW, top + k); ctx.stroke() } }
  if (t.kind === 'winter') { ctx.fillStyle = 'rgba(255,255,255,.35)'; for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.moveTo(l + rnd(k + p) * PW, top + 20 + rnd(k) * (h - 60)); ctx.lineTo(l + rnd(k + p) * PW + 30, top + 40 + rnd(k) * (h - 60)); ctx.lineTo(l + rnd(k + p) * PW + 6, top + 56 + rnd(k) * (h - 60)); ctx.fill() } }
  const gm = ctx.createRadialGradient(x - 8, top + h / 2, 4, x, top + h / 2 + 8, 50); gm.addColorStop(0, m1); gm.addColorStop(1, m2); ctx.fillStyle = gm; ctx.beginPath(); ctx.arc(x, top + h / 2 + 18, 48, 0, 7); ctx.fill()
  text(String(p + 1), x, top + h / 2 + 44, 70, '#1b1b1b', { align: 'center', font: t.digits, weight: 'bold' })
}
function drawPodium(t: Tok, v: 'A' | 'B') {
  if (t.kind === 'winter') { ctx.save(); ctx.filter = 'blur(5px)'; ctx.drawImage(arenaEnd, -30, -30, W + 60, H + 60); ctx.restore(); ctx.fillStyle = 'rgba(8,6,34,.5)'; ctx.fillRect(0, 0, W, H) } else backdrop(t)
  if (v === 'B') { ctx.save(); ctx.globalCompositeOperation = 'lighter'; STEPS.forEach(s => { const g = ctx.createLinearGradient(s.x, 0, s.x, PBASE - s.h); g.addColorStop(0, rgba(s.place === 0 ? t.accent : t.accent2, .0)); g.addColorStop(1, rgba(s.place === 0 ? t.accent : t.accent2, .34)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(s.x - 20, 0); ctx.lineTo(s.x + 20, 0); ctx.lineTo(s.x + 230, PBASE - s.h); ctx.lineTo(s.x - 230, PBASE - s.h); ctx.closePath(); ctx.fill() })
    for (let i = 0; i < 90; i++) { ctx.fillStyle = [t.accent, t.accent2, '#fff'][i % 3]; ctx.globalAlpha = .7; ctx.save(); ctx.translate(rnd(i) * W, 80 + rnd(i + 4) * 760); ctx.rotate(rnd(i + 8) * 6); ctx.fillRect(-5, -2, 10, 4); ctx.restore() } ctx.restore() }
  const tc = t.kind === 'winter' ? '#ffffff' : t.fg; text('ПЬЕДЕСТАЛ', W / 2, 108, 74, tc, { align: 'center', font: t.disp, weight: 'bold', ls: 10, shadow: rgba(t.accent, .7) }); text('СКАЧКИ БУЛЬДОГОВ · ИТОГИ ЗАБЕГА', W / 2, 156, 30, t.kind === 'winter' && t.light ? '#ffe9a8' : t.accent2, { align: 'center', font: t.disp, ls: 6 })
  if (t.kind === 'winter' && v === 'A') garland(t, 190)
  // ковёр/пол
  const fl = ctx.createLinearGradient(0, PBASE - 30, 0, H); fl.addColorStop(0, rgba(t.kind === 'winter' ? '#d9ccff' : t.panel, t.kind === 'winter' ? .9 : .6)); fl.addColorStop(1, rgba(t.bg, 1)); ctx.fillStyle = fl; ctx.fillRect(0, PBASE - 24, W, H - PBASE + 24)
  STEPS.forEach(s => { const d = PLACES[s.place]; const top = PBASE - s.h; (v === 'A' ? podiumA : podiumB)(t, s.place, s.x, s.h)
    const pawY = top - (v === 'A' ? PDEPTH / 2 : 0) + 2; ctx.save(); const sg = ctx.createRadialGradient(s.x + 8, pawY, 0, s.x + 8, pawY, 150); sg.addColorStop(0, 'rgba(20,10,50,.5)'); sg.addColorStop(1, 'rgba(20,10,50,0)'); ctx.translate(s.x + 8, pawY); ctx.scale(1, .12); ctx.translate(-(s.x + 8), -pawY); ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(s.x + 8, pawY, 150, 0, 7); ctx.fill(); ctx.restore()
    dog(d, s.x, pawY, 1.5)
    const px = s.x - 170, py = PBASE + 30; frame(t, px, py, 340, 120, false); text(NAMES[d], s.x, py + 50, 40, t.fg, { align: 'center', font: t.disp, weight: 'bold' })
    const who = PICKS.map((pk, ti) => pk === d + 1 ? TEAMS[ti] : null).filter(Boolean).join(' · ') || 'без ставок'; text(who, s.x, py + 90, 24, t.muted, { align: 'center', font: t.disp }) })
  // правая колонка: очки команд
  const rx = 1500, ry = 330; frame(t, rx, ry, 360, 450, false); text('ОЧКИ КОМАНД', rx + 180, ry + 56, 28, t.fg, { align: 'center', font: t.disp, weight: 'bold', ls: 3 })
  PICKS.slice(0, 6).forEach((pk, i) => { const pt = pointsFor(String(pk), PLACES.map(d => d)).points; text(TEAMS[i], rx + 26, ry + 108 + i * 52, 24, t.accent2, { font: t.disp, weight: 'bold' }); text(pk ? `№${pk}` : '—', rx + 230, ry + 108 + i * 52, 22, t.muted, { font: t.disp }); text(`+${pt}`, rx + 336, ry + 108 + i * 52, 28, t.fg, { align: 'right', font: t.digits, weight: 'bold' }) })
}
// ── вход
type Req = { screen: 'select' | 'transition' | 'results' | 'podium'; variant?: 'A' | 'B'; theme: string; u?: number }
function frame2(r: Req) {
  const t = tok(r.theme); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.clearRect(0, 0, W, H)
  if (r.screen === 'select') { backdrop(t); if (t.kind === 'winter' && !t.light) garland(t, 20); drawSelect(t) }
  else if (r.screen === 'transition') drawTransition(t, r.variant ?? 'A', r.u ?? .5)
  else if (r.screen === 'results') drawResults(t, r.u ?? 1)
  else drawPodium(t, r.variant ?? 'A')
}
;(window as unknown as { proto: unknown; ready: boolean }).proto = { frame: frame2 }
void boot().then(() => { ;(window as unknown as { ready: boolean }).ready = true; frame2({ screen: 'select', theme: 'classic' }) })
void L
