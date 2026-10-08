// ═══ Forest Refinement Lab — статичная живопись леса (рисуется ОДИН раз в холсты) ═══
// Композиция одна для всех трёх обработок (одинаковые зёрна случайности), меняется
// только «рука»: A — иллюстрация (контур, штриховка коры, чёткие листья),
// B — кино (глубина резкости, контровой свет, объёмные лучи), C — живой лес
// (как B, но мягче, а главное — сильнее поведение, см. Scene.tsx).
// Дерево среднего плана — отдельный спрайт с основанием НИЖЕ линии земли:
// сцена гнёт его полосами, у корня смещение 0 — оно не может оторваться от земли.

export type LookId = 'A' | 'B' | 'C'
export type Look = {
  id: LookId
  farBlur: number; nearBlur: number; ink: boolean; hatch: boolean; rim: number; rays: number
  leafLight: string[]; leafDark: string[]; bark: [string, string, string]; rimCol: string
}
export const LOOKS: Record<LookId, Look> = {
  A: { id: 'A', farBlur: 0, nearBlur: 0, ink: true, hatch: true, rim: 0.35, rays: 0.7,
    leafLight: ['#2f6a52', '#3b7a5c', '#2a5e4c', '#46896a'], leafDark: ['#0d2a22', '#123228', '#0a221c'], bark: ['#120c08', '#3f2d20', '#1a120c'], rimCol: '#7fd6bf' },
  B: { id: 'B', farBlur: 5, nearBlur: 1.6, ink: false, hatch: false, rim: 0.9, rays: 1.25,
    leafLight: ['#25594a', '#2e6656', '#214f42', '#3a7562'], leafDark: ['#081d18', '#0b231d', '#061612'], bark: ['#0a0705', '#2e2219', '#120d09'], rimCol: '#9cf0da' },
  C: { id: 'C', farBlur: 3, nearBlur: 0.8, ink: false, hatch: true, rim: 0.7, rays: 1.0,
    leafLight: ['#2b6350', '#357058', '#285a48', '#418066'], leafDark: ['#0a221c', '#0e2a22', '#081c17'], bark: ['#0d0906', '#352719', '#150f0a'], rimCol: '#8ee8cf' },
}

export const W = 1920, H = 1080
export type Pt = { x: number; y: number }
export function seeded(seed: number) {
  let a = seed >>> 0
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}
export function noise1(seed: number) {
  const r = seeded(seed), P = Array.from({ length: 512 }, () => r())
  return (x: number) => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return P[i & 511] + (P[(i + 1) & 511] - P[i & 511]) * u }
}
const gn = noise1(77)
/** Линия земли: одна на всю сцену — по ней садятся корни, грибы, цветы, деревья. */
export const groundY = (x: number) => 958 + Math.sin(x * 0.0042 + 1.2) * 14 + (gn(x * 0.01) - 0.5) * 18
export function mk(w = W, h = H) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
/** Размыть готовый слой ОДНИМ проходом (фильтр на каждый мазок в программной отрисовке — минуты). */
function blurred(src: HTMLCanvasElement, px: number) {
  if (!px) return src
  const c = mk(src.width, src.height), x = c.getContext('2d')!; x.filter = `blur(${px}px)`; x.drawImage(src, 0, 0); return c
}
const pick = <T,>(r: () => number, a: T[]) => a[Math.floor(r() * a.length)]

/** Один лист: миндалина с прожилкой. */
function leaf(x: CanvasRenderingContext2D, px: number, py: number, len: number, ang: number, col: string, look: Look, vein = true) {
  x.save(); x.translate(px, py); x.rotate(ang)
  x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(len * 0.45, -len * 0.32, len, 0); x.quadraticCurveTo(len * 0.45, len * 0.32, 0, 0)
  x.fillStyle = col; x.fill()
  if (look.ink) { x.strokeStyle = 'rgba(2,10,8,.55)'; x.lineWidth = 1; x.stroke() }
  if (vein && len > 12) { x.strokeStyle = 'rgba(255,255,255,.08)'; x.lineWidth = 0.8; x.beginPath(); x.moveTo(1, 0); x.lineTo(len * 0.85, 0); x.stroke() }
  x.restore()
}
/** Гроздь листвы: тёмная середина, светлый край со стороны луны (сверху справа). */
export function cluster(x: CanvasRenderingContext2D, r: () => number, cx: number, cy: number, rad: number, n: number, look: Look, k = 1) {
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * rad
    const px = cx + Math.cos(a) * d, py = cy + Math.sin(a) * d * 0.7
    const lit = (px - cx) / rad * 0.5 - (py - cy) / rad * 0.7 + (r() - 0.5) * 0.6
    const col = lit > 0.25 ? pick(r, look.leafLight) : pick(r, look.leafDark)
    leaf(x, px, py, (10 + r() * 16) * k, a + (r() - 0.5) * 1.2, col, look)
  }
}

type TreeOpt = { x: number; base: number; h: number; w: number; lean: number; seed: number; leaves: number; rimSide: 1 | -1; tone?: number; noBranches?: boolean; moss?: number }
/** Дерево: ствол с корневым наплывом и корнями, кора, ветвление, листва. Возвращает корни (для свечения). */
export function paintTree(x: CanvasRenderingContext2D, o: TreeOpt, look: Look): Pt[][] {
  const r = seeded(o.seed), wob = noise1(o.seed + 3)
  const cx = (t: number) => o.x + o.lean * o.h * t * t + (wob(t * 4) - 0.5) * o.w * 0.5
  const wd = (t: number) => o.w * (1 - 0.72 * t) * (1 + 1.1 * Math.max(0, 1 - t / 0.09) ** 2)
  const L: Pt[] = [], R: Pt[] = []
  for (let i = 0; i <= 60; i++) { const t = i / 60, y = o.base + 30 - (o.h + 30) * t; L.push({ x: cx(t) - wd(t) / 2, y }); R.push({ x: cx(t) + wd(t) / 2, y }) }
  const g = x.createLinearGradient(o.x - o.w, 0, o.x + o.w, 0)
  const [d0, m, d1] = look.bark
  if (o.rimSide > 0) { g.addColorStop(0, d0); g.addColorStop(0.55, m); g.addColorStop(0.92, d1); g.addColorStop(1, look.rimCol) }
  else { g.addColorStop(0, look.rimCol); g.addColorStop(0.08, d1); g.addColorStop(0.45, m); g.addColorStop(1, d0) }
  // корни: выходят из наплыва в стороны и уходят под землю
  const roots: Pt[][] = []
  const nr = 4 + Math.floor(r() * 3)
  for (let i = 0; i < nr; i++) {
    const side = i % 2 ? 1 : -1, len = Math.min(o.w * (1.6 + r() * 2.4), 90 + r() * 170), wr = Math.min(o.w * (0.22 + r() * 0.16), 26)
    const pts: Pt[] = []
    for (let k = 0; k <= 14; k++) { const t = k / 14; const px = o.x + side * (o.w * 0.35 + len * t); pts.push({ x: px, y: o.base - wr * 0.6 * (1 - t) + t * t * 16 + Math.sin(t * 6 + i) * 4 }) }
    x.beginPath()
    pts.forEach((p, k) => { const t = k / 14, ww = wr * (1 - t * 0.9); { if (k) x.lineTo(p.x, p.y - ww); else x.moveTo(p.x, p.y - ww) } })
    for (let k = 14; k >= 0; k--) { const t = k / 14, ww = wr * (1 - t * 0.9); x.lineTo(pts[k].x, pts[k].y + ww * 0.4) }
    x.closePath(); x.fillStyle = look.bark[1]; x.fill(); x.fillStyle = 'rgba(0,0,0,.35)'; x.fill()
    if (look.ink) { x.strokeStyle = 'rgba(0,0,0,.6)'; x.lineWidth = 1.2; x.stroke() }
    roots.push(pts)
  }
  x.beginPath(); L.forEach((p, i) => { if (i) x.lineTo(p.x, p.y); else x.moveTo(p.x, p.y) }); for (let i = R.length - 1; i >= 0; i--) x.lineTo(R[i].x, R[i].y); x.closePath()
  x.fillStyle = g; x.fill()
  if (o.tone) { x.fillStyle = `rgba(6,22,19,${o.tone})`; x.fill() }
  if (look.ink) { x.strokeStyle = 'rgba(0,0,0,.7)'; x.lineWidth = 1.5; x.stroke() }
  // кора: продольные борозды по стволу + (A, C) поперечная штриховка
  x.save(); x.clip()
  const nf = Math.max(3, Math.round(o.w / 7))
  for (let f = 0; f < nf; f++) {
    const u = (f + 0.5) / nf - 0.5
    x.beginPath()
    for (let i = 0; i <= 40; i++) { const t = i / 40, y = o.base - o.h * t; const px = cx(t) + u * wd(t) + (wob(t * 20 + f * 3) - 0.5) * 6; { if (i) x.lineTo(px, y); else x.moveTo(px, y) } }
    x.strokeStyle = `rgba(0,0,0,${0.25 + r() * 0.25})`; x.lineWidth = 1 + r() * 2.2; x.stroke()
  }
  if (look.hatch) for (let i = 0; i < o.h / 9; i++) {
    const t = r(), y = o.base - o.h * t, ww = wd(t), px = cx(t) + (r() - 0.5) * ww * 0.8
    x.strokeStyle = `rgba(0,0,0,${0.18 + r() * 0.2})`; x.lineWidth = 1; x.beginPath(); x.moveTo(px - 6, y); x.lineTo(px + 6, y - 4); x.stroke()
  }
  // мох у основания
  for (let i = 0; i < (o.moss ?? o.w * 0.8); i++) { const t = r() * 0.16, px = cx(t) + (r() - 0.5) * wd(t); x.fillStyle = `rgba(${60 + r() * 30},${110 + r() * 40},${70 + r() * 30},${0.25 + r() * 0.3})`; x.beginPath(); x.arc(px, o.base - o.h * t, 1.5 + r() * 3, 0, 6.3); x.fill() }
  x.restore()
  // ветви: от середины ствола вверх, чередуя стороны, с ветвлением второго порядка
  const branch = (bx: number, by: number, ang: number, len: number, bw: number, depth: number) => {
    const ex = bx + Math.sin(ang) * len, ey = by - Math.cos(ang) * len
    const mx = bx + Math.sin(ang) * len * 0.5 + (r() - 0.5) * len * 0.2, my = by - Math.cos(ang) * len * 0.5 + len * 0.08
    const nx = Math.cos(ang), ny = Math.sin(ang)
    x.beginPath(); x.moveTo(bx - nx * bw / 2, by - ny * bw / 2); x.quadraticCurveTo(mx, my, ex, ey); x.quadraticCurveTo(mx, my, bx + nx * bw / 2, by + ny * bw / 2); x.closePath()
    x.fillStyle = look.bark[1]; x.fill(); x.fillStyle = 'rgba(0,0,0,.3)'; x.fill()
    if (look.ink) { x.strokeStyle = 'rgba(0,0,0,.6)'; x.lineWidth = 1; x.stroke() }
    if (depth > 0) {
      const n = 2 + Math.floor(r() * 2)
      for (let i = 0; i < n; i++) { const t = 0.45 + r() * 0.5; branch(bx + (ex - bx) * t, by + (ey - by) * t, ang + (r() < 0.5 ? -1 : 1) * (0.35 + r() * 0.5), len * (0.45 + r() * 0.25), bw * 0.5, depth - 1) }
    }
    if (depth === 0 && o.leaves > 0) cluster(x, r, ex, ey, 26 + r() * 30, Math.round(o.leaves * (14 + r() * 14)), look, 0.9)
  }
  const nb = o.noBranches ? 0 : 3 + Math.floor(r() * 4)
  for (let i = 0; i < nb; i++) {
    const t = 0.42 + (i / nb) * 0.5 + r() * 0.05, side = i % 2 ? 1 : -1
    branch(cx(t) + side * wd(t) * 0.3, o.base - o.h * t, side * (0.55 + r() * 0.55), o.h * (0.16 + r() * 0.1) * (1 - t * 0.4), wd(t) * 0.45, 2)
  }
  return roots
}

/** Задний план: небо с луной, дальние стволы в дымке, лучи, верхний туман. */
export function paintBack(look: Look) {
  const c = mk(), x = c.getContext('2d')!, r = seeded(11)
  const sky = x.createRadialGradient(1240, 40, 20, 1240, 40, 1300)
  sky.addColorStop(0, '#4fa392'); sky.addColorStop(0.18, '#2b7465'); sky.addColorStop(0.45, '#123c35'); sky.addColorStop(1, '#03100d')
  x.fillStyle = sky; x.fillRect(0, 0, W, H)
  // три ряда дальних стволов: чем дальше, тем светлее и тоньше (воздушная перспектива)
  const farC = mk(), fx = farC.getContext('2d')!
  const rows = [{ n: 16, w: 10, h: 0.75, c: '#1f5a4f', a: 0.55 }, { n: 12, w: 18, h: 0.85, c: '#164539', a: 0.75 }, { n: 9, w: 28, h: 0.95, c: '#0e2f28', a: 0.9 }]
  {
  const x = fx
  for (const row of rows) {
    for (let i = 0; i < row.n; i++) {
      const px = 380 + (i + r() * 0.8) * (1600 / row.n), w = row.w * (0.7 + r() * 0.6)
      x.globalAlpha = row.a; x.fillStyle = row.c
      const base = groundY(px) - 40 * (1 - row.h)
      x.beginPath(); x.moveTo(px - w / 2, base); x.lineTo(px - w * 0.35, -10); x.lineTo(px + w * 0.35, -10); x.lineTo(px + w / 2, base); x.fill()
      for (let b = 0; b < 3; b++) { const by = base - 300 - r() * 400, s = r() < 0.5 ? -1 : 1; x.lineWidth = w * 0.25; x.strokeStyle = row.c; x.beginPath(); x.moveTo(px, by); x.quadraticCurveTo(px + s * 50, by - 30, px + s * (80 + r() * 60), by - 70 - r() * 40); x.stroke() }
    }
    // дымка между рядами
    x.globalAlpha = 1; const f = x.createLinearGradient(0, 520, 0, 1000); f.addColorStop(0, 'rgba(110,200,180,0)'); f.addColorStop(1, 'rgba(110,200,180,.10)'); x.fillStyle = f; x.fillRect(0, 0, W, H)
  }
  }
  x.drawImage(blurred(farC, look.farBlur), 0, 0); x.globalAlpha = 1
  // лунные лучи сквозь просветы кроны
  const rays = [[1060, 90, 1], [1320, 70, 0.8], [800, 60, 0.6], [1560, 50, 0.5]]
  for (const [rx, rw, k] of rays) {
    const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, `rgba(200,255,240,${0.16 * k * look.rays})`); gr.addColorStop(1, 'rgba(200,255,240,0)')
    x.fillStyle = gr; x.beginPath(); x.moveTo(rx, 0); x.lineTo(rx + rw, 0); x.lineTo(rx + rw * 3.6 - 160, H); x.lineTo(rx + rw * 1.4 - 160, H); x.fill()
  }
  return c
}

export type MidTree = { cv: HTMLCanvasElement; x: number; base: number; h: number; roots: Pt[][]; ox: number }
/** Деревья среднего плана — по спрайту на каждое (сцена их гнёт). */
export function paintMids(look: Look): MidTree[] {
  const xs = [560, 760, 935, 1385, 1575, 1770]
  return xs.map((px, i) => {
    const sw = 760, cv = mk(sw, H + 40), x = cv.getContext('2d')!, ox = sw / 2
    const base = groundY(px)
    const roots = paintTree(x, { x: ox, base, h: base + 40, w: 46 + (i % 3) * 12, lean: (i < 3 ? -1 : 1) * 0.02, seed: 500 + i * 17, leaves: 0.6, rimSide: 1, tone: 0.28 }, look)
    return { cv, x: px, base, h: base, roots: roots.map(p => p.map(q => ({ x: q.x - ox + px, y: q.y }))), ox }
  })
}

export type Mush = { x: number; y: number; r: number; d: number }
/** Земля: мох, трава, папоротники, камни, грибы, корни; туман у земли — отдельно. */
export function paintGround(look: Look) {
  const c = mk(), x = c.getContext('2d')!, r = seeded(23)
  const g = x.createLinearGradient(0, 900, 0, H); g.addColorStop(0, '#0b221c'); g.addColorStop(0.3, '#081813'); g.addColorStop(1, '#030a08')
  x.beginPath(); x.moveTo(0, H); for (let px = 0; px <= W; px += 20) x.lineTo(px, groundY(px)); x.lineTo(W, H); x.closePath(); x.fillStyle = g; x.fill()
  // мшистые кочки
  for (let i = 0; i < 70; i++) { const px = r() * W, py = groundY(px) + 6 + r() * 60, rr = 20 + r() * 50; const mg = x.createRadialGradient(px, py - rr * 0.3, 0, px, py, rr); mg.addColorStop(0, `rgba(40,90,62,${0.35 + r() * 0.2})`); mg.addColorStop(1, 'rgba(20,50,36,0)'); x.fillStyle = mg; x.beginPath(); x.ellipse(px, py, rr, rr * 0.45, 0, 0, 6.3); x.fill() }
  // камни
  for (let i = 0; i < 9; i++) { const px = 420 + r() * 1460, py = groundY(px) + 30 + r() * 60, rr = 14 + r() * 26; x.fillStyle = '#16241f'; x.beginPath(); x.ellipse(px, py, rr, rr * 0.6, 0, 0, 6.3); x.fill(); x.fillStyle = 'rgba(140,220,200,.12)'; x.beginPath(); x.ellipse(px + rr * 0.2, py - rr * 0.3, rr * 0.6, rr * 0.25, 0, 0, 6.3); x.fill() }
  // папоротники: изогнутый стержень и перышки листочков
  const fern = (fx: number, fy: number, s: number, dir: number) => {
    for (let f = 0; f < 5; f++) {
      const ang = -Math.PI / 2 + (f - 2) * 0.42 * dir + (r() - 0.5) * 0.2, len = (70 + r() * 50) * s
      const pts: Pt[] = []; for (let k = 0; k <= 12; k++) { const t = k / 12, a = ang + t * t * 0.9 * (ang > -Math.PI / 2 ? 1 : -1); pts.push({ x: fx + Math.cos(a) * len * t, y: fy + Math.sin(a) * len * t }) }
      x.strokeStyle = '#2c5e44'; x.lineWidth = 2; x.beginPath(); pts.forEach((p, k) => { if (k) x.lineTo(p.x, p.y); else x.moveTo(p.x, p.y) }); x.stroke()
      for (let k = 1; k < 12; k++) { const p = pts[k], q = pts[k + 1], a = Math.atan2(q.y - p.y, q.x - p.x), ll = 16 * s * (1 - k / 13); leaf(x, p.x, p.y, ll, a - 1.2, pick(r, look.leafLight), look, false); leaf(x, p.x, p.y, ll, a + 1.2, pick(r, look.leafDark.concat(look.leafLight)), look, false) }
    }
  }
  ;[[470, 0.9, 1], [690, 0.7, -1], [1230, 0.6, 1], [1690, 1.0, -1], [1860, 0.8, 1], [1080, 0.55, -1]].forEach(([fx, s, d]) => fern(fx, groundY(fx) + 8, s, d))
  // трава: тонкие стебли вдоль кромки земли
  for (let i = 0; i < 900; i++) {
    const px = r() * W, py = groundY(px) + 4 + r() * 40, hh = 10 + r() * 34, lean = (r() - 0.5) * 18
    x.strokeStyle = r() < 0.7 ? pick(r, look.leafDark) : pick(r, look.leafLight); x.lineWidth = 1 + r() * 1.3
    x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + lean * 0.3, py - hh * 0.6, px + lean, py - hh); x.stroke()
  }
  // грибы: ножка, шляпка, пластинки снизу — сами шляпки светятся в сцене
  const mush: Mush[] = []
  const grp: [number, number][] = [[440, 3], [610, 2], [1150, 2], [1650, 3], [1800, 2]]
  for (const [gx, n] of grp) for (let i = 0; i < n; i++) {
    const px = gx + (i - n / 2) * 26 + r() * 12, py = groundY(px) + 10 + r() * 8, s = 0.55 + r() * 0.6
    x.fillStyle = '#c9e6dc'; x.beginPath(); x.moveTo(px - 4 * s, py); x.quadraticCurveTo(px - 3 * s, py - 20 * s, px - 2 * s, py - 34 * s); x.lineTo(px + 2 * s, py - 34 * s); x.quadraticCurveTo(px + 3 * s, py - 20 * s, px + 4 * s, py); x.fill()
    x.fillStyle = '#2b6d60'; x.beginPath(); x.ellipse(px, py - 34 * s, 24 * s, 12 * s, 0, Math.PI, 0); x.fill()
    x.fillStyle = 'rgba(150,240,215,.35)'; x.beginPath(); x.ellipse(px, py - 34 * s, 22 * s, 3 * s, 0, 0, Math.PI); x.fill()
    if (look.ink) { x.strokeStyle = 'rgba(0,0,0,.6)'; x.lineWidth = 1; x.beginPath(); x.ellipse(px, py - 34 * s, 24 * s, 12 * s, 0, Math.PI, 0); x.stroke() }
    mush.push({ x: px, y: py - 38 * s, r: 24 * s, d: 0 })
  }
  // опавшие листья
  for (let i = 0; i < 160; i++) { const px = r() * W, py = groundY(px) + 20 + r() * 100; leaf(x, px, py, 6 + r() * 8, r() * 6.3, `rgba(${30 + r() * 30},${50 + r() * 40},${36 + r() * 20},.8)`, look, false) }
  return { cv: c, mush }
}

/** Туман у земли — широкая лента, сцена тянет её по горизонтали. */
export function paintMist(alpha: number, y0: number, hh: number, seed: number) {
  const c = mk(W * 2, hh), x = c.getContext('2d')!, r = seeded(seed)
  for (let i = 0; i < 70; i++) {
    const px = r() * W, py = hh * (0.35 + r() * 0.5), rx = 160 + r() * 260, ry = 26 + r() * 40
    for (const off of [0, W]) { const g = x.createRadialGradient(px + off, py, 0, px + off, py, rx); g.addColorStop(0, `rgba(150,235,215,${alpha * (0.5 + r() * 0.5)})`); g.addColorStop(1, 'rgba(150,235,215,0)'); x.fillStyle = g; x.save(); x.translate(px + off, py); x.scale(1, ry / rx); x.translate(-px - off, -py); x.beginPath(); x.arc(px + off, py, rx, 0, 6.3); x.fill(); x.restore() }
  }
  return { cv: c, y0 }
}

/** Передний план: древнее дерево слева (ствол, кора, мох, дупло, корни) и крона по верху. */
export function paintFront(look: Look) {
  const cc0 = mk(), r = seeded(41)
  let x = cc0.getContext('2d')!
  // крона: массы листвы с просветами, свисающие ветви и плети
  for (let i = 0; i < 46; i++) {
    const px = 300 + (i / 46) * 1700 + (r() - 0.5) * 40, py = 30 + Math.sin(i * 0.7) * 30 + r() * 60
    if (i % 7 === 3) continue // просвет — сквозь него идёт луч
    cluster(x, r, px, py, 60 + r() * 50, 70, look, 1.25)
  }
  x.strokeStyle = look.bark[0]; x.lineCap = 'round'
  for (let i = 0; i < 7; i++) { const px = 420 + i * 230 + r() * 60; x.lineWidth = 10 - i * 0.6; x.beginPath(); x.moveTo(px - 140, 30); x.quadraticCurveTo(px, 120 + r() * 40, px + 160, 40 + r() * 30); x.stroke() }
  for (let i = 0; i < 9; i++) { // плети, свисающие из кроны
    const px = 480 + r() * 1400, len = 60 + r() * 150
    x.strokeStyle = '#163a2e'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(px, 60); x.quadraticCurveTo(px + 10, 60 + len * 0.6, px + (r() - 0.5) * 30, 60 + len); x.stroke()
    for (let k = 0; k < len / 18; k++) leaf(x, px + (r() - 0.5) * 10, 70 + k * 18, 9 + r() * 6, Math.PI / 2 + (r() - 0.5) * 1.4, pick(r, look.leafDark.concat(look.leafLight)), look, false)
  }
  const cc = blurred(cc0, look.nearBlur)
  const c0 = mk(); x = c0.getContext('2d')!
  // древнее дерево: широкий ствол, уходит за левый край и в крону
  // два мощных сука уходят вправо-вверх в крону (вместо мелких веток-рогаток)
  const limb = (x0: number, y0: number, x1: number, y1: number, cx: number, cy: number, w0: number) => {
    const g = x.createLinearGradient(x0, y0 - w0 / 2, x0, y0 + w0 / 2); g.addColorStop(0, look.bark[1]); g.addColorStop(0.5, look.bark[1]); g.addColorStop(1, look.bark[0])
    x.beginPath(); x.moveTo(x0, y0 - w0 / 2); x.quadraticCurveTo(cx, cy - w0 * 0.3, x1, y1); x.quadraticCurveTo(cx, cy + w0 * 0.3, x0, y0 + w0 / 2); x.closePath(); x.fillStyle = g; x.fill()
    if (look.ink) { x.strokeStyle = 'rgba(0,0,0,.7)'; x.lineWidth = 1.5; x.stroke() }
    x.strokeStyle = look.rimCol; x.globalAlpha = 0.35 * look.rim; x.lineWidth = 2; x.beginPath(); x.moveTo(x0, y0 - w0 / 2 + 3); x.quadraticCurveTo(cx, cy - w0 * 0.3 + 3, x1, y1 + 2); x.stroke(); x.globalAlpha = 1
  }
  limb(200, 330, 760, -10, 420, 110, 90)
  limb(240, 150, 520, -20, 360, 40, 60)
  const roots = paintTree(x, { x: 150, base: 1130, h: 1330, w: 300, lean: -0.03, seed: 901, leaves: 0, rimSide: 1, noBranches: true, moss: 160 }, look)
  // дупло — выше таймера
  x.fillStyle = '#050302'; x.beginPath(); x.ellipse(176, 380, 20, 36, 0.1, 0, 6.3); x.fill()
  x.strokeStyle = 'rgba(120,90,60,.35)'; x.lineWidth = 3; x.beginPath(); x.ellipse(176, 380, 28, 46, 0.1, 0, 6.3); x.stroke()
  // мох пятнами у кромки ствола и у корней, а не россыпью по всей коре
  for (let i = 0; i < 90; i++) { const py = 760 + r() * 300, px = 250 + r() * 70; x.fillStyle = `rgba(${50 + r() * 30},${100 + r() * 50},${60 + r() * 30},${0.3 + r() * 0.35})`; x.beginPath(); x.arc(px, py, 2 + r() * 5, 0, 6.3); x.fill() }
  return { cv: blurred(c0, look.nearBlur * 0.6), canopy: cc, roots }
}

/** Обработки: бумага для A, виньетка и зерно для B/C. Рисуются один раз. */
export function paintPaper() {
  const c = mk(), x = c.getContext('2d')!, r = seeded(5)
  for (let i = 0; i < 26000; i++) { const v = Math.floor(120 + r() * 120); x.fillStyle = `rgba(${v},${v},${v - 10},.05)`; x.fillRect(r() * W, r() * H, 1 + r() * 2, 1) }
  for (let i = 0; i < 900; i++) { x.strokeStyle = `rgba(255,250,230,${0.02 + r() * 0.03})`; x.lineWidth = 1; const px = r() * W, py = r() * H, a = r() * 6.3; x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(a) * 14, py + Math.sin(a) * 14); x.stroke() }
  return c
}
export function paintVignette(k: number) {
  const c = mk(), x = c.getContext('2d')!
  const g = x.createRadialGradient(W * 0.56, H * 0.5, H * 0.35, W * 0.56, H * 0.5, H * 1.05); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,4,3,${k})`)
  x.fillStyle = g; x.fillRect(0, 0, W, H); return c
}
export function paintGrain() {
  const c = mk(512, 512), x = c.getContext('2d')!, d = x.createImageData(512, 512), r = seeded(8)
  for (let i = 0; i < d.data.length; i += 4) { const v = Math.floor(r() * 255); d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 14 }
  x.putImageData(d, 0, 0); return c
}
