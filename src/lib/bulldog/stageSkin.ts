// «Скин» экранов раунда «Скачки бульдогов» (выбор, переход, отсчёт, итоги, пьедестал): ВСЁ оформление берётся из токенов активной темы Quiz Party (CSS-переменные `.theme-*`) —
// никакого хардкода цветов и своих списков тем. Вид рамок и зимний декор задают три необязательные переменные раунда (13-round-race.css):
//   --race-frame: bevel | arch | round | leaf (форма карточек/панелей), --race-decor: none | winter (снежные шапки, гирлянда, дерево/снег на пьедестале).
// Нет переменных — вид `bevel`/`none` на токенах темы. Бизнес-логики здесь нет: функции только рисуют переданные данные (ставки, места, очки приходят из StageInput).
export type Frame = 'bevel' | 'arch' | 'round' | 'leaf'
export interface Skin { light: boolean; fg: string; muted: string; panel: string; bg: string; bg2: string; accent: string; accent2: string; /** цвет акцентного ТЕКСТА: accent2, а если он плохо виден на панели (у ny_home красный на тёмном) — accent */ hi: string; ok: string; disp: string; digits: string; frame: Frame; decor: 'none' | 'winter' }
export const W = 1920, H = 1080
// ── цвет
export function parseColor(c: string): [number, number, number, number] {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c.trim()); if (m) { const h = m[1].length === 3 ? m[1].split('').map(x => x + x).join('') : m[1]; return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1] }
  const r = /rgba?\(([^)]+)\)/.exec(c); if (r) { const p = r[1].split(',').map(x => parseFloat(x)); return [p[0], p[1], p[2], p[3] ?? 1] }
  return [128, 128, 128, 1]
}
export const rgba = (c: string, a: number) => { const [r, g, b, a0] = parseColor(c); return `rgba(${r},${g},${b},${a * a0})` }
export const lum = (c: string) => { const [r, g, b] = parseColor(c); return (0.299 * r + 0.587 * g + 0.114 * b) / 255 }
const ease = (u: number) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u) }
export const seg = (u: number, a: number, b: number) => ease((u - a) / (b - a))
const rnd = (i: number) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
export function readSkin(el: Element): Skin {
  const cs = getComputedStyle(el), g = (n: string, d: string) => cs.getPropertyValue(n).trim() || d
  const bg = g('--bg', '#0a0f1e'), fr = g('--race-frame', 'bevel'), dc = g('--race-decor', 'none')
  return { light: lum(bg) > 0.55, fg: g('--fg', '#f2f5fa'), muted: g('--muted', '#9aa7bd'), panel: g('--panel', '#101728'), bg, bg2: g('--bg2', '#101728'), accent: g('--accent', '#ea580c'), accent2: g('--accent2', '#22d3ee'), hi: Math.abs(lum(g('--accent2', '#22d3ee')) - lum(g('--panel', '#101728'))) >= 0.35 && Math.abs(lum(g('--accent2', '#22d3ee')) - lum(bg)) >= 0.35 ? g('--accent2', '#22d3ee') : g('--accent', '#ea580c'), ok: g('--ok', '#57f5c0'),
    disp: g('--font-display', 'sans-serif'), digits: g('--font-digits', 'monospace'), frame: (['bevel', 'arch', 'round', 'leaf'] as const).includes(fr as Frame) ? fr as Frame : 'bevel', decor: dc === 'winter' ? 'winter' : 'none' }
}
type C = CanvasRenderingContext2D
export interface TextOpts { align?: CanvasTextAlign; font?: string; weight?: string; ls?: number; shadow?: string; blur?: number }
export function text(c: C, s: string, x: number, y: number, size: number, color: string, o: TextOpts = {}) {
  c.save(); c.fillStyle = color; c.font = `${o.weight ?? 'normal'} ${size}px ${o.font ?? 'sans-serif'}`; c.textAlign = o.align ?? 'left'; c.textBaseline = 'alphabetic'
  if (o.ls) (c as unknown as { letterSpacing: string }).letterSpacing = `${o.ls}px`
  if (o.shadow) { c.shadowColor = o.shadow; c.shadowBlur = o.blur ?? 18 }
  c.fillText(s, x, y); c.restore()
}
/** Строка, не шире maxW: обрезается с «…» (длинные названия команд не вылезают за рамку). */
export function fit(c: C, s: string, maxW: number, size: number, font: string, weight = 'normal'): string {
  c.save(); c.font = `${weight} ${size}px ${font}`; let t = s; if (c.measureText(t).width > maxW) { while (t.length > 1 && c.measureText(t + '…').width > maxW) t = t.slice(0, -1); t = t.trimEnd() + '…' } c.restore(); return t
}
/** Список имён в одну строку: сколько влезает по ширине, остальное — «+N». */
export function fitList(c: C, names: string[], maxW: number, size: number, font: string, sep = ' · ', weight = 'normal'): string {
  if (!names.length) return ''
  c.save(); c.font = `${weight} ${size}px ${font}`
  for (let n = names.length; n >= 1; n--) { const shown = names.slice(0, n).map(x => x.length > 14 ? x.slice(0, 13) + '…' : x).join(sep), rest = names.length - n, t = rest ? `${shown} +${rest}` : shown; if (c.measureText(t).width <= maxW) { c.restore(); return t } }
  const t = `${names.length} ком.`; c.restore(); return t
}
const rr = (c: C, x: number, y: number, w: number, h: number, r: number) => { c.beginPath(); c.roundRect(x, y, w, h, r) }
// ── фон экрана по семейству темы
export function backdrop(c: C, sk: Skin) {
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, sk.bg); g.addColorStop(1, sk.bg2); c.fillStyle = g; c.fillRect(0, 0, W, H)
  if (sk.decor === 'winter') {
    if (sk.light) { c.strokeStyle = rgba(sk.muted, .35); c.lineWidth = 3; rr(c, 34, 34, W - 68, H - 68, 18); c.stroke(); c.lineWidth = 1; rr(c, 46, 46, W - 92, H - 92, 12); c.stroke() }
    else for (let i = 0; i < 120; i++) { c.fillStyle = `rgba(255,255,255,${.2 + rnd(i) * .5})`; c.beginPath(); c.arc(rnd(i + 1) * W, rnd(i + 2) * H, .8 + rnd(i + 3) * 2.2, 0, 7); c.fill() }
  } else if (sk.frame === 'bevel') {
    c.strokeStyle = rgba(sk.accent, .07); c.lineWidth = 1; for (let x = 0; x < W; x += 60) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke() } for (let y = 0; y < H; y += 60) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke() }
    const r = c.createRadialGradient(W / 2, H * .95, 0, W / 2, H * .95, 900); r.addColorStop(0, rgba(sk.accent, .22)); r.addColorStop(1, rgba(sk.accent, 0)); c.fillStyle = r; c.fillRect(0, 0, W, H)
  } else if (sk.frame === 'arch') {
    const r = c.createRadialGradient(W / 2, H * .45, 100, W / 2, H * .5, 1100); r.addColorStop(0, rgba(sk.accent, .10)); r.addColorStop(1, 'rgba(0,0,0,.45)'); c.fillStyle = r; c.fillRect(0, 0, W, H)
    for (let i = 0; i < 70; i++) { c.fillStyle = rgba(sk.accent, .15 + rnd(i) * .5); c.fillRect(rnd(i + 9) * W, rnd(i + 3) * H, 2, 2) }
  } else for (let i = 0; i < 40; i++) { const x = rnd(i) * W, y = rnd(i + 5) * H, r0 = 20 + rnd(i + 8) * 60, gg = c.createRadialGradient(x, y, 0, x, y, r0); gg.addColorStop(0, rgba(i % 2 ? sk.accent : sk.accent2, .22)); gg.addColorStop(1, rgba(sk.accent, 0)); c.fillStyle = gg; c.fillRect(x - r0, y - r0, r0 * 2, r0 * 2) }
}
/** Гирлянда дугами с огоньками токенов темы (только `decor: winter`). */
export function garland(c: C, sk: Skin, y: number, x0 = 0, x1 = W) {
  c.save(); c.strokeStyle = rgba(sk.light ? sk.fg : '#1d4a3d', .7); c.lineWidth = 3; c.beginPath(); const n = Math.ceil((x1 - x0) / 220)
  for (let i = 0; i < n; i++) { const a = x0 + i * 220, b = Math.min(x1, a + 220); c.moveTo(a, y); c.quadraticCurveTo((a + b) / 2, y + 34, b, y) } c.stroke()
  for (let i = 0; i < n; i++) for (let k = 1; k < 6; k++) { const a = x0 + i * 220, b = Math.min(x1, a + 220), u = k / 6, px = a + (b - a) * u, py = y + 2 * u * (1 - u) * 34 + 4, col = (i + k) % 3 === 0 ? sk.accent2 : sk.accent
    const gg = c.createRadialGradient(px, py, 0, px, py, 16); gg.addColorStop(0, rgba(col, .8)); gg.addColorStop(1, rgba(col, 0)); c.fillStyle = gg; c.fillRect(px - 16, py - 16, 32, 32); c.fillStyle = '#fff6d8'; c.beginPath(); c.arc(px, py, 3, 0, 7); c.fill() }
  c.restore()
}
// ── рамка/бейдж по форме темы
export function frame(c: C, sk: Skin, x: number, y: number, w: number, h: number, sel = false, compact = false) {
  c.save(); c.fillStyle = rgba(sk.panel, sk.light ? .96 : .9); c.strokeStyle = sel ? sk.accent : rgba(sk.muted, .55); c.lineWidth = sel ? 6 : 2
  if (sel && sk.decor !== 'winter') { c.shadowColor = rgba(sk.accent, .7); c.shadowBlur = 28 }
  const p = new Path2D(), f = compact ? 'round' : sk.frame
  if (f === 'bevel') { const k = Math.min(26, h / 3); p.moveTo(x + k, y); p.lineTo(x + w - k, y); p.lineTo(x + w, y + k); p.lineTo(x + w, y + h - k); p.lineTo(x + w - k, y + h); p.lineTo(x + k, y + h); p.lineTo(x, y + h - k); p.lineTo(x, y + k); p.closePath() }
  else if (f === 'arch' && h > 200) { p.moveTo(x, y + h); p.lineTo(x, y + 90); p.quadraticCurveTo(x, y, x + w / 2, y - 6); p.quadraticCurveTo(x + w, y, x + w, y + 90); p.lineTo(x + w, y + h); p.closePath() }
  else if (f === 'leaf' && h > 200) p.roundRect(x, y, w, h, [60, 14, 60, 14]); else p.roundRect(x, y, w, h, f === 'arch' || f === 'leaf' ? 18 : 24)
  c.fill(p); c.stroke(p); c.shadowBlur = 0
  if (f === 'arch' && h > 200) { c.strokeStyle = rgba(sk.accent, .35); c.lineWidth = 1; c.save(); c.translate(x + 10, y + 10); c.scale((w - 20) / w, (h - 14) / h); c.stroke(p); c.restore() }
  if (sk.decor === 'winter' && !compact) { c.fillStyle = sk.light ? '#fff' : '#f3efff'; c.beginPath(); c.moveTo(x + 6, y + 6); for (let k = 0; k <= 16; k++) c.lineTo(x + 6 + (w - 12) * k / 16, y - 8 - Math.sin(k * 1.9 + x) * 4 - (k % 2) * 3); c.lineTo(x + w - 6, y + 10); c.lineTo(x + 6, y + 10); c.closePath(); c.fill() }
  c.restore()
}
export function badge(c: C, sk: Skin, x: number, y: number, n: number | string, s = 64) {
  c.save(); c.fillStyle = sk.accent
  if (sk.frame === 'bevel') { c.beginPath(); c.moveTo(x + 14, y); c.lineTo(x + s, y); c.lineTo(x + s, y + s - 14); c.lineTo(x + s - 14, y + s); c.lineTo(x, y + s); c.lineTo(x, y + 14); c.closePath(); c.fill() }
  else if (sk.frame === 'arch' || sk.frame === 'leaf') { c.beginPath(); c.arc(x + s / 2, y + s / 2, s / 2, 0, 7); c.fill(); c.strokeStyle = rgba(sk.fg, .6); c.lineWidth = 2; c.beginPath(); c.arc(x + s / 2, y + s / 2, s / 2 - 5, 0, 7); c.stroke() }
  else { rr(c, x, y, s, s, 14); c.fill() }
  c.restore(); text(c, String(n), x + s / 2, y + s * .72, s * .62, lum(sk.accent) > .6 ? '#1a1a1a' : '#fff', { align: 'center', font: sk.digits, weight: 'bold' })
}
export function medalColors(p: number, sk: Skin): [string, string] { return p === 0 ? ['#ffe27a', '#b8860b'] : p === 1 ? ['#f1f4f8', '#8d98a6'] : p === 2 ? ['#e8a974', '#8a4f26'] : [sk.muted, sk.muted] }
// ── экран выбора
export interface SelectIO { names: string[]; counts: number[]; dog: (i: number, cx: number, pawY: number, k: number) => void; closed: boolean; status?: { title: string; sub?: string } | null }
export function drawSelect(c: C, sk: Skin, io: SelectIO, alpha = 1, scale = 1) {
  c.save(); c.globalAlpha = alpha; c.translate(W / 2, H / 2); c.scale(scale, scale); c.translate(-W / 2, -H / 2)
  text(c, 'ВЫБЕРИТЕ СВОЕГО БУЛЬДОГА', W / 2, 96, 54, sk.fg, { align: 'center', font: sk.disp, weight: 'bold', ls: 3, shadow: sk.light ? undefined : rgba(sk.accent, .5) })
  text(c, io.closed ? 'Выбор закрыт — ставки приняты' : 'Команды выбирают на телефонах — выбор можно менять до старта', W / 2, 142, 26, sk.muted, { align: 'center', font: sk.disp })
  const cw = 340, gap = 30, x0 = (W - (5 * cw + 4 * gap)) / 2
  for (let i = 0; i < 5; i++) {
    const x = x0 + i * (cw + gap), y = 200, h = 780, n = io.counts[i] ?? 0, sel = n > 0
    frame(c, sk, x, y, cw, h, sel); badge(c, sk, x + 18, y + 22, i + 1); text(c, fit(c, io.names[i] ?? '', cw - 120, 42, sk.disp, 'bold'), x + 98, y + 76, 42, sk.fg, { font: sk.disp, weight: 'bold' })
    const gg = c.createRadialGradient(x + cw / 2, y + 560, 0, x + cw / 2, y + 560, 150); gg.addColorStop(0, rgba(sel ? sk.accent : sk.muted, .28)); gg.addColorStop(1, rgba(sk.accent, 0)); c.save(); c.translate(x + cw / 2, y + 560); c.scale(1, .14); c.translate(-(x + cw / 2), -(y + 560)); c.fillStyle = gg; c.fillRect(x, y + 400, cw, 320); c.restore()
    io.dog(i, x + cw / 2, y + 568, 1.4)
    text(c, 'СТАВОК', x + cw / 2, y + h - 100, 24, sk.muted, { align: 'center', font: sk.disp, ls: 2 }); text(c, String(n), x + cw / 2, y + h - 30, 72, sel ? sk.accent : rgba(sk.muted, .85), { align: 'center', font: sk.digits, weight: 'bold' })
    if (sel) { c.save(); c.fillStyle = sk.accent; rr(c, x + cw / 2 - 54, y + 104, 108, 36, 18); c.fill(); c.restore(); text(c, 'ВЫБРАН', x + cw / 2, y + 130, 20, lum(sk.accent) > .6 ? '#111' : '#fff', { align: 'center', font: sk.disp, weight: 'bold' }) }
  }
  if (io.status) {                                                                       // подготовка: плашка поверх закрытого выбора
    c.fillStyle = 'rgba(0,0,0,.38)'; c.fillRect(0, 0, W, H); const bw = 1000, bh = io.status.sub ? 210 : 150, bx = (W - bw) / 2, by = (H - bh) / 2
    frame(c, sk, bx, by, bw, bh, true, true); text(c, fit(c, io.status.title, bw - 80, 54, sk.disp, 'bold'), W / 2, by + 78, 54, sk.fg, { align: 'center', font: sk.disp, weight: 'bold', ls: 3 })
    if (io.status.sub) text(c, fit(c, io.status.sub, bw - 80, 30, sk.disp), W / 2, by + 140, 30, sk.muted, { align: 'center', font: sk.disp })
  }
  c.restore()
}
// ── переход A «Стартовая решётка»: шторка темы открывает арену; без плашек и подписей у собак
export function wipeEdge(u: number) { return seg(u, .1, .62) * (W + 500) - 250 }
export function drawWipeClip(c: C, edge: number, draw: () => void) { c.save(); c.beginPath(); c.moveTo(edge, 0); c.lineTo(W, 0); c.lineTo(W, H); c.lineTo(edge - 220, H); c.closePath(); c.clip(); draw(); c.restore() }
export function drawWipeBand(c: C, sk: Skin, edge: number) {
  const gg = c.createLinearGradient(edge - 260, 0, edge + 40, 0); gg.addColorStop(0, rgba(sk.accent, 0)); gg.addColorStop(.55, rgba(sk.accent, .9)); gg.addColorStop(.8, rgba(sk.accent2, .95)); gg.addColorStop(1, rgba(sk.accent2, 0))
  c.save(); c.beginPath(); c.moveTo(edge - 220, H); c.lineTo(edge, 0); c.lineTo(edge + 40, 0); c.lineTo(edge - 180, H); c.closePath(); c.fillStyle = gg; c.fill(); c.restore()
}
export function drawStartBanner(c: C, sk: Skin, a: number) {
  if (a <= 0) return
  c.save(); c.globalAlpha = a; c.fillStyle = rgba(sk.panel, .9); c.fillRect(0, 60, W, 96); c.fillStyle = sk.accent; c.fillRect(0, 60, W, 5); c.restore()
  c.save(); c.globalAlpha = a; text(c, 'К СТАРТОВОЙ ЛИНИИ', W / 2, 126, 52, sk.fg, { align: 'center', font: sk.disp, weight: 'bold', ls: 6 }); c.restore()
}
// ── отсчёт: крупная цифра по центру (5…1), затем «НАЧИНАЕМ!»; читаемо на любом фоне арены (белая заливка с тёмным контуром), стиль — шрифт и акценты темы
export function drawCountdownNumber(c: C, sk: Skin, label: string, frac: number, go = false) {
  const pop = 1 + .3 * (1 - seg(frac, 0, .22)), fade = go ? 1 - seg(frac, .55, 1) : 1 - seg(frac, .86, 1)
  c.save(); c.globalAlpha = Math.max(0, fade); c.translate(W / 2, go ? 600 : 700); c.scale(pop, pop)
  const size = go ? 190 : 420
  if (!go) { c.strokeStyle = rgba(sk.accent, .9); c.lineWidth = 16; c.shadowColor = rgba(sk.accent, .9); c.shadowBlur = 40; c.beginPath(); c.arc(0, -size * .34, size * .58, 0, 7); c.stroke(); c.shadowBlur = 0 }
  c.font = `bold ${size}px ${go ? sk.disp : sk.digits}`; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; (c as unknown as { letterSpacing: string }).letterSpacing = go ? '10px' : '0px'
  c.lineJoin = 'round'; c.lineWidth = go ? 14 : 18; c.strokeStyle = 'rgba(10,8,40,.55)'; c.strokeText(label, 0, 0); c.shadowColor = rgba(sk.accent, .8); c.shadowBlur = 36; c.fillStyle = '#fff'; c.fillText(label, 0, 0); c.restore()
}
// ── итоги гонки (панель поверх затемнённой арены)
export interface ResultRow { dog: number; name: string; time: number; teams: string[]; points: number }
export interface ResultsIO { rows: ResultRow[]; noBet: string[]; dog: (i: number, cx: number, pawY: number, k: number) => void }
export function drawResults(c: C, sk: Skin, io: ResultsIO, u = 1) {
  c.fillStyle = 'rgba(6,5,28,.55)'; c.fillRect(0, 0, W, H)
  const x = 330, y = 120, w = 1260, h = 840; frame(c, sk, x, y, w, h, false)
  text(c, 'ФИНИШ · ИТОГОВЫЕ МЕСТА', W / 2, y + 90, 56, sk.fg, { align: 'center', font: sk.disp, weight: 'bold', ls: 4 }); c.fillStyle = rgba(sk.accent, .8); c.fillRect(x + 60, y + 116, w - 120, 4)
  io.rows.forEach((r, p) => {
    const s = seg(u, p * .12, p * .12 + .2), ry = y + 160 + p * 100; c.save(); c.globalAlpha = s; c.translate((1 - s) * 80, 0)
    c.fillStyle = p === 0 ? rgba(sk.accent, .18) : rgba(sk.muted, .09); rr(c, x + 50, ry, w - 100, 88, 14); c.fill()
    const [c1, c2] = medalColors(p, sk), gg = c.createRadialGradient(x + 112, ry + 40, 4, x + 112, ry + 44, 40); gg.addColorStop(0, c1); gg.addColorStop(1, c2); c.fillStyle = gg; c.beginPath(); c.arc(x + 112, ry + 44, 36, 0, 7); c.fill()
    text(c, String(p + 1), x + 112, ry + 60, 44, p < 3 ? '#1b1b1b' : sk.bg, { align: 'center', font: sk.digits, weight: 'bold' })
    io.dog(r.dog, x + 230, ry + 82, .36)
    text(c, fit(c, r.name, 240, 42, sk.disp, 'bold'), x + 290, ry + 56, 42, sk.fg, { font: sk.disp, weight: 'bold' })
    text(c, r.teams.length ? fitList(c, r.teams, 330, 28, sk.disp) : 'без ставок', x + 550, ry + 54, 28, sk.muted, { font: sk.disp })
    text(c, `${r.time.toFixed(2)} с`, x + w - 180, ry + 56, 36, sk.fg, { align: 'right', font: sk.digits }); text(c, `+${r.points}`, x + w - 100, ry + 56, 44, p === 0 ? sk.accent : sk.hi, { align: 'center', font: sk.digits, weight: 'bold' }); c.restore()
  })
  if (io.noBet.length) text(c, 'Без ставки: ' + fitList(c, io.noBet, w - 280, 28, sk.disp), W / 2, y + h - 40, 28, sk.muted, { align: 'center', font: sk.disp })
}
// ── пьедестал A «Основательный»: материалы и декор по теме (зима — дерево+снег+гирлянда; bevel — сталь+неон; arch/leaf — камень с отделкой цветами темы)
export interface PodiumIO { places: number[]; names: string[]; teamsByDog: string[][]; scores: { team: string; dog: number | null; points: number }[]; shown: number; dog: (i: number, cx: number, pawY: number, k: number) => void; bgBlur?: CanvasImageSource | null }
const STEPS = [{ place: 1, x: 500, h: 190, need: 2 }, { place: 0, x: 880, h: 280, need: 3 }, { place: 2, x: 1260, h: 120, need: 1 }]
const PBASE = 860, PW = 340, PD = 46                                   // PD — глубина верхней площадки (в проекции): собака стоит на её середине
function snowCap(c: C, x: number, y: number, w: number, light: boolean) {
  c.save(); c.fillStyle = light ? '#fff' : '#f5f1ff'; c.shadowColor = 'rgba(40,30,110,.35)'; c.shadowBlur = 10; c.shadowOffsetY = 4
  c.beginPath(); c.moveTo(x - 12, y + 14); for (let k = 0; k <= 24; k++) c.lineTo(x - 12 + (w + 24) * k / 24, y - 10 - Math.sin(k * 1.3 + w) * 5 - (k % 3) * 3); c.lineTo(x + w + 12, y + 20); c.lineTo(x + w - 20, y + 30 + Math.sin(w) * 4); c.lineTo(x + 40, y + 28); c.lineTo(x - 12, y + 22); c.closePath(); c.fill(); c.restore()
  c.fillStyle = 'rgba(190,200,255,.85)'; for (let k = 0; k < 9; k++) { const px = x + 14 + (w - 28) * (k + .3) / 9, ih = 12 + rnd(k + w) * 20; c.beginPath(); c.moveTo(px - 5, y + 24); c.lineTo(px + 5, y + 24); c.lineTo(px, y + 24 + ih); c.closePath(); c.fill() }
}
function podiumBlock(c: C, sk: Skin, p: number, x: number, h: number) {
  const top = PBASE - h, l = x - PW / 2, [m1, m2] = medalColors(p, sk)
  if (sk.decor === 'winter') {
    const g = c.createLinearGradient(0, top, 0, PBASE); g.addColorStop(0, '#9a6a45'); g.addColorStop(1, '#4a2f22'); c.fillStyle = g; c.fillRect(l, top, PW, h)
    for (let k = 0; k < PW / 42; k++) { c.fillStyle = `rgba(0,0,0,${.12 + rnd(k + p) * .12})`; c.fillRect(l + k * 42, top, 3, h); c.fillStyle = 'rgba(255,220,170,.08)'; c.fillRect(l + k * 42 + 4, top, 6, h) }
    for (let k = 0; k < 60; k++) { c.strokeStyle = `rgba(40,20,10,${.1 + rnd(k) * .1})`; c.lineWidth = 1; const gx = l + rnd(k + p) * PW; c.beginPath(); c.moveTo(gx, top + rnd(k + 2) * h); c.lineTo(gx + (rnd(k + 5) - .5) * 10, top + rnd(k + 2) * h + 30 + rnd(k + 7) * 40); c.stroke() }
    for (const by of [top + 26, PBASE - 30]) { c.fillStyle = '#2b2f3a'; c.fillRect(l - 2, by, PW + 4, 14); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(l - 2, by, PW + 4, 3); for (let k = 0; k < 8; k++) { c.fillStyle = '#8b94a4'; c.beginPath(); c.arc(l + 20 + k * (PW - 40) / 7, by + 8, 2.5, 0, 7); c.fill() } }
    c.fillStyle = '#c28a5a'; c.beginPath(); c.moveTo(l + 16, top - PD); c.lineTo(l + PW - 16, top - PD); c.lineTo(l + PW, top); c.lineTo(l, top); c.closePath(); c.fill()
    snowCap(c, l + 10, top - PD + 6, PW - 20, sk.light); garland(c, sk, top + 62, l + 6, l + PW - 6)
  } else if (sk.frame === 'bevel') {
    const g = c.createLinearGradient(0, top, 0, PBASE); g.addColorStop(0, mixc(sk.panel, '#ffffff', .12)); g.addColorStop(1, mixc(sk.panel, '#000000', .45)); c.fillStyle = g; c.beginPath(); c.moveTo(l, top); c.lineTo(l + PW, top); c.lineTo(l + PW, PBASE - 16); c.lineTo(l + PW - 16, PBASE); c.lineTo(l + 16, PBASE); c.lineTo(l, PBASE - 16); c.closePath(); c.fill()
    c.strokeStyle = rgba(sk.accent2, .12); c.lineWidth = 1; for (let k = 0; k < PW; k += 24) { c.beginPath(); c.moveTo(l + k, top); c.lineTo(l + k - 40, PBASE); c.stroke() }
    c.fillStyle = mixc(sk.panel, '#ffffff', .22); c.beginPath(); c.moveTo(l + 18, top - PD); c.lineTo(l + PW - 18, top - PD); c.lineTo(l + PW, top); c.lineTo(l, top); c.closePath(); c.fill()
    c.save(); c.shadowColor = sk.accent; c.shadowBlur = 24; c.strokeStyle = sk.accent; c.lineWidth = 4; c.beginPath(); c.moveTo(l, top); c.lineTo(l + PW, top); c.stroke(); c.strokeStyle = sk.accent2; c.lineWidth = 3; c.beginPath(); c.moveTo(l + 16, PBASE - 6); c.lineTo(l + PW - 16, PBASE - 6); c.stroke(); c.restore()
  } else {
    const g = c.createLinearGradient(0, top, 0, PBASE); g.addColorStop(0, mixc(sk.panel, '#ffffff', .22)); g.addColorStop(1, mixc(sk.panel, '#000000', .35)); c.fillStyle = g; c.fillRect(l, top, PW, h)
    c.save(); c.beginPath(); c.rect(l, top, PW, h); c.clip(); for (let r = 0; r < h / 46; r++) for (let k = 0; k < 5; k++) { c.strokeStyle = 'rgba(0,0,0,.28)'; c.strokeRect(l + k * 85 + (r % 2) * 42 - 42, top + r * 46, 85, 46) } c.restore()
    c.fillStyle = mixc(sk.panel, '#ffffff', .32); c.beginPath(); c.moveTo(l + 16, top - PD); c.lineTo(l + PW - 16, top - PD); c.lineTo(l + PW, top); c.lineTo(l, top); c.closePath(); c.fill()
    c.strokeStyle = sk.accent; c.lineWidth = 5; c.beginPath(); c.moveTo(l, top); c.lineTo(l + PW, top); c.stroke(); c.lineWidth = 2; c.strokeRect(l + 10, top + 14, PW - 20, h - 24)
  }
  const gm = c.createRadialGradient(x - 8, top + h / 2 - 12, 4, x, top + h / 2, 56); gm.addColorStop(0, m1); gm.addColorStop(1, m2); c.fillStyle = gm; c.beginPath(); c.arc(x, top + h / 2 + 6, 52, 0, 7); c.fill(); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; c.stroke()
  text(c, String(p + 1), x, top + h / 2 + 30, 76, '#1d1d1d', { align: 'center', font: sk.digits, weight: 'bold' })
}
const mixc = (a: string, b: string, t: number) => { const x = parseColor(a), y = parseColor(b); return `rgb(${Math.round(x[0] + (y[0] - x[0]) * t)},${Math.round(x[1] + (y[1] - x[1]) * t)},${Math.round(x[2] + (y[2] - x[2]) * t)})` }
export function drawPodium(c: C, sk: Skin, io: PodiumIO) {
  if (sk.decor === 'winter' && io.bgBlur) { c.drawImage(io.bgBlur, 0, 0, W, H); c.fillStyle = 'rgba(8,6,34,.5)'; c.fillRect(0, 0, W, H) } else backdrop(c, sk)
  const tc = sk.decor === 'winter' ? '#ffffff' : sk.fg
  text(c, 'ПЬЕДЕСТАЛ', W / 2, 108, 74, tc, { align: 'center', font: sk.disp, weight: 'bold', ls: 10, shadow: rgba(sk.accent, .7) }); text(c, 'СКАЧКИ БУЛЬДОГОВ · ИТОГИ ЗАБЕГА', W / 2, 156, 30, sk.decor === 'winter' && sk.light ? '#ffe9a8' : sk.hi, { align: 'center', font: sk.disp, ls: 6 })
  if (sk.decor === 'winter') garland(c, sk, 190)
  const fl = c.createLinearGradient(0, PBASE - 30, 0, H); fl.addColorStop(0, rgba(sk.decor === 'winter' ? '#d9ccff' : sk.panel, sk.decor === 'winter' ? .9 : .6)); fl.addColorStop(1, rgba(sk.bg, 1)); c.fillStyle = fl; c.fillRect(0, PBASE - 24, W, H - PBASE + 24)
  STEPS.forEach(s => {
    const top = PBASE - s.h, shown = io.shown >= s.need; podiumBlock(c, sk, s.place, s.x, s.h); if (!shown) return
    const d = io.places[s.place], surf = top - PD * 0.46                                                       // линия поверхности (подошвы) — на верхней площадке, чуть ближе к краю, чем к центру
    io.dog(d, s.x, surf, 1.5)
    const px = s.x - 170, py = PBASE + 30; frame(c, sk, px, py, 340, 120, false, true); text(c, fit(c, io.names[d] ?? '', 300, 40, sk.disp, 'bold'), s.x, py + 50, 40, sk.fg, { align: 'center', font: sk.disp, weight: 'bold' })
    text(c, io.teamsByDog[d]?.length ? fitList(c, io.teamsByDog[d], 300, 24, sk.disp) : 'без ставок', s.x, py + 90, 24, sk.muted, { align: 'center', font: sk.disp })
  })
  // очки команд — компактно справа, без конкуренции с призёрами
  const rx = 1520, ry = 300, rows = io.scores.slice().sort((a, b) => b.points - a.points || a.team.localeCompare(b.team)), maxRows = 9, shown = rows.slice(0, rows.length > maxRows ? maxRows - 1 : maxRows), more = rows.length - shown.length
  const ph = 84 + shown.length * 48 + (more > 0 ? 40 : 0); frame(c, sk, rx, ry, 340, ph, false, true); text(c, 'ОЧКИ КОМАНД', rx + 170, ry + 52, 26, sk.fg, { align: 'center', font: sk.disp, weight: 'bold', ls: 3 })
  shown.forEach((r, i) => { const yy = ry + 100 + i * 48; text(c, fit(c, r.team, 196, 25, sk.disp, 'bold'), rx + 22, yy, 25, sk.hi, { font: sk.disp, weight: 'bold' }); text(c, r.dog ? `№${r.dog}` : '—', rx + 232, yy, 22, sk.muted, { font: sk.disp }); text(c, `+${r.points}`, rx + 322, yy, 28, sk.fg, { align: 'right', font: sk.digits, weight: 'bold' }) })
  if (more > 0) text(c, `… и ещё ${more}`, rx + 170, ry + 100 + shown.length * 48, 24, sk.muted, { align: 'center', font: sk.disp })
}
