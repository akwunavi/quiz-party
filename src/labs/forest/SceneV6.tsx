// ═══ Forest Lab — Концепт C, версия 10.06 (СОХРАНЕНА ДЛЯ СРАВНЕНИЯ «до/после», не править) ═══
// Каждое появление вопроса — одна последовательность ПРЕДВОСХИЩЕНИЕ → ПЕРЕСТРОЙКА →
// РАСКРЫТИЕ → ПОКОЙ: лес затихает, по ветви бежит свет, ветвь прорастает и выпускает
// лианы, вокруг кадра вырастает рама, поверхность кадра раскрывается живым краем,
// цветы-варианты распускаются, всё успокаивается. Режим «quick» — обычный вопрос
// (~3,5 с до читаемого кадра), «full» — первый вопрос раунда с полным пробуждением леса.
// Всё рисуется в одном холсте от состояния `st`, которое двигает GSAP-таймлайн:
// перемотка в любую точку даёт тот же кадр.
// Фото — игровая информация: пропорции сохраняются (fit), поверх фото не рисуется
// ничего (ни виньетки, ни светлячков, ни листьев после раскрытия).
import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { LOOKS, W, H, groundY, seeded, noise1, mk, paintBack, paintMids, paintGround, paintMist, paintFront, paintVignette, type Pt, type Look } from './paint'
import { MC, IMG1, PORT, TWO, SIX, THREE, FOUR, LONG, IMG, ROUND_NAME, QNO, phaseOf, type StateId, type Img, type Opt } from './content'

export type SceneApi = { tl: gsap.core.Timeline; setTimer: (n: number) => void; dispose?: () => void }
export type Mode = 'quick' | 'full'
type Rect = { x: number; y: number; w: number; h: number }
type Flower = { x: number; y: number; r: number; stem: boolean }
type Frame = { r: Rect; img: Img }
type Layout = {
  strands: Pt[][]; frames: Frame[]; vines: [Pt, Pt][]; flowers: Flower[]; opts: Opt[]; label: number
  q: { text: string; left: number; top: number; width: number; size: number; align: 'center' | 'left' } | null
  badges: { key: string; x: number; y: number }[]
  cells: { word: string; open: number[]; cx: number; cy: number; d: number; gap: number } | null
  phase: { text: string; x: number; y: number } | null
}
const fit = (img: Img, cx: number, cy: number, mw: number, mh: number): Rect => {
  const k = Math.min(mw / img.w, mh / img.h), w = Math.round(img.w * k), h = Math.round(img.h * k)
  return { x: Math.round(cx - w / 2), y: Math.round(cy - h / 2), w, h }
}
const G = (x: number) => ({ x, y: groundY(x) + 6 })
const DAND = { x: 236, y: 610 }
/** Ветвь-перекладина от древнего дерева вправо. */
const bough = (y: number, xEnd: number): Pt[] => [{ x: 300, y: y + 40 }, { x: 520, y: y + 8 }, { x: 800, y }, { x: 1100, y: y + 4 }, { x: 1400, y: y + 14 }, { x: xEnd, y: y + 30 }]
const boughAt = (y: number, x: number) => y + (x < 800 ? 8 * (800 - x) / 280 : x < 1100 ? 4 * (x - 800) / 300 : 4 + 10 * (x - 1100) / 300)
/** Две лианы от ветви к верхнему краю кадра. */
const hang = (r: Rect, by: number): [Pt, Pt][] => [r.x + r.w * 0.2, r.x + r.w * 0.8].map(x => [{ x, y: boughAt(by, x) }, { x, y: r.y - 14 }] as [Pt, Pt])
const ARCH_WIDE: Pt[][] = [
  [G(560), { x: 534, y: 720 }, { x: 556, y: 420 }, { x: 660, y: 220 }, { x: 860, y: 118 }, { x: 1100, y: 88 }, { x: 1240, y: 90 }],
  [G(1736), { x: 1770, y: 720 }, { x: 1748, y: 420 }, { x: 1640, y: 220 }, { x: 1440, y: 118 }, { x: 1200, y: 90 }, { x: 1060, y: 92 }],
]
const empty: Layout = { strands: [], frames: [], vines: [], flowers: [], opts: [], label: 0, q: null, badges: [], cells: null, phase: null }
function layoutOf(s: StateId): Layout {
  if (s === 'mc') return { ...empty,
    strands: [[G(548), { x: 506, y: 760 }, { x: 532, y: 520 }, { x: 630, y: 330 }, { x: 790, y: 212 }, { x: 990, y: 158 }, { x: 1210, y: 150 }],
      [G(1748), { x: 1788, y: 760 }, { x: 1764, y: 520 }, { x: 1676, y: 330 }, { x: 1526, y: 214 }, { x: 1326, y: 160 }, { x: 1100, y: 154 }]],
    flowers: [735, 1005, 1275, 1545].map(x => ({ x, y: 716, r: 74, stem: true })), label: 812,
    q: { text: MC.text, left: 620, top: 318, width: 1060, size: 60, align: 'center' }, opts: MC.options }
  if (s === 'img1opt') {
    const r = fit(IMG.palace, 1140, 482, 960, 540)
    return { ...empty, strands: ARCH_WIDE, frames: [{ r, img: IMG.palace }],
      flowers: [780, 1020, 1260, 1500].map(x => ({ x, y: 836, r: 54, stem: true })), label: 900, opts: IMG1.options,
      q: { text: IMG1.text, left: 540, top: 114, width: 1200, size: 50, align: 'center' } }
  }
  if (s === 'img1open') {
    const r = fit(IMG.palace, 1140, 600, 960, 640)
    return { ...empty, strands: ARCH_WIDE, frames: [{ r, img: IMG.palace }], q: { text: IMG1.text, left: 640, top: 150, width: 1000, size: 52, align: 'center' } }
  }
  if (s === 'port') {
    const r = fit(IMG.collins, 840, 566, 520, 650)
    return { ...empty, strands: [bough(196, 1330)], frames: [{ r, img: IMG.collins }], vines: hang(r, 196),
      q: { text: PORT.text, left: 1170, top: 400, width: 600, size: 52, align: 'left' } }
  }
  if (s === 'two') {
    const a = fit(IMG.falcon, 915, 470, 470, 340), b = fit(IMG.hubble, 1405, 470, 400, 340)
    return { ...empty, strands: [bough(262, 1700)], frames: [{ r: a, img: IMG.falcon }, { r: b, img: IMG.hubble }], vines: [...hang(a, 262), ...hang(b, 262)],
      flowers: [735, 1005, 1275, 1545].map(x => ({ x, y: 752, r: 58, stem: true })), label: 830,
      q: { text: TWO.text, left: 640, top: 126, width: 1000, size: 50, align: 'center' }, opts: TWO.options }
  }
  if (s === 'six') {
    // «3 попытки», фаза 1: две большие картинки рядом, у каждой свои пропорции
    const a0 = fit(IMG.falcon, 0, 420, 720, 500), b0 = fit(IMG.collins, 0, 420, 420, 500)
    const x0 = Math.round(1140 - (a0.w + 60 + b0.w) / 2)
    const a = { ...a0, x: x0 }, b = { ...b0, x: x0 + a0.w + 60 }
    return { ...empty, strands: [bough(140, 1820)], frames: [{ r: a, img: IMG.falcon }, { r: b, img: IMG.collins }], vines: [...hang(a, 140), ...hang(b, 140)],
      cells: { word: SIX.word, open: SIX.open, cx: 1140, cy: 808, d: 104, gap: 18 }, phase: { text: `Фаза ${SIX.phase} из 3`, x: 1140, y: 700 } }
  }
  if (s === 'three') {
    const imgs = [IMG.coffee, IMG.hubble, IMG.dahlia], cxs = [705, 1150, 1595]
    const rs = imgs.map((im, i) => fit(im, cxs[i], 500, 430, 380))
    return { ...empty, strands: [bough(258, 1840)], frames: rs.map((r, i) => ({ r, img: imgs[i] })), vines: rs.flatMap(r => hang(r, 258)),
      badges: rs.map((r, i) => ({ key: 'АБВ'[i], x: r.x + r.w / 2, y: 500 + 180 + 62 })),
      q: { text: THREE.text, left: 540, top: 118, width: 1200, size: 50, align: 'center' } }
  }
  if (s === 'four') {
    const imgs = [IMG.collins, IMG.falcon, IMG.hubble, IMG.palace]
    const rs = imgs.map((im, i) => fit(im, i % 2 ? 1460 : 860, i < 2 ? 352 : 718, 540, 320))
    return { ...empty, strands: [bough(168, 1840), bough(536, 1840)], frames: rs.map((r, i) => ({ r, img: imgs[i] })),
      vines: rs.flatMap((r, i) => hang(r, i < 2 ? 168 : 536)),
      badges: rs.map((r, i) => ({ key: 'АБВГ'[i], x: r.x - 40, y: r.y + r.h - 34 })),
      q: { text: FOUR.text, left: 490, top: 86, width: 1300, size: 46, align: 'center' } }
  }
  if (s === 'long') {
    const r = fit(IMG.palace, 820, 560, 720, 620)
    return { ...empty, strands: [bough(232, 1250)], frames: [{ r, img: IMG.palace }], vines: hang(r, 232),
      q: { text: LONG.text, left: 1250, top: 312, width: 570, size: 42, align: 'left' } }
  }
  return empty
}

function spline(P: Pt[], n = 160): Pt[] {
  const out: Pt[] = []
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * (P.length - 1), k = Math.min(P.length - 2, Math.floor(t)), u = t - k
    const p0 = P[Math.max(0, k - 1)], p1 = P[k], p2 = P[k + 1], p3 = P[Math.min(P.length - 1, k + 2)]
    const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u)
    out.push({ x: f(p0.x, p1.x, p2.x, p3.x), y: f(p0.y, p1.y, p2.y, p3.y) })
  }
  return out
}
/** Рама растёт от нижних углов вверх по обеим сторонам и смыкается сверху. */
const framePath = (r: Rect, pad: number, side: -1 | 1): Pt[] => {
  const L = r.x - pad, R = r.x + r.w + pad, T = r.y - pad, B = r.y + r.h + pad, mx = (L + R) / 2
  const wob = noise1(Math.round(r.x + r.y) + side)
  let c = 0
  const seg = (p: Pt, q: Pt, n: number) => Array.from({ length: n }, (_, i) => {
    const u = i / n, dx = q.x - p.x, dy = q.y - p.y, l = Math.hypot(dx, dy) || 1, o = (wob(c++ * 0.18) - 0.5) * 9
    return { x: p.x + dx * u - dy / l * o, y: p.y + dy * u + dx / l * o }
  })
  return side < 0
    ? [...seg({ x: mx, y: B }, { x: L, y: B }, 20), ...seg({ x: L, y: B }, { x: L, y: T }, 36), ...seg({ x: L, y: T }, { x: mx + 12, y: T }, 22)]
    : [...seg({ x: mx, y: B }, { x: R, y: B }, 20), ...seg({ x: R, y: B }, { x: R, y: T }, 36), ...seg({ x: R, y: T }, { x: mx - 12, y: T }, 22)]
}
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const ease = (v: number) => { v = clamp01(v); return v * v * (3 - 2 * v) }
const backOut = (v: number) => { v = clamp01(v); const c = 1.9; return 1 + (c + 1) * (v - 1) ** 3 + c * (v - 1) ** 2 }

type Leaf = { i: number; ang: number; len: number; col: string; twig: number }
function leavesFor(line: Pt[], seed: number, look: Look, every: number, outward?: -1 | 1): Leaf[] {
  const r = seeded(seed), out: Leaf[] = []
  for (let i = 4; i < line.length - 1; i += every) {
    const side = outward ?? (r() < 0.5 ? -1 : 1)
    out.push({ i, ang: (0.55 + r() * 0.75) * side, len: 15 + r() * 20, col: r() < 0.55 ? look.leafLight[Math.floor(r() * 4)] : look.leafDark[Math.floor(r() * 3)], twig: r() < 0.28 ? 22 + r() * 46 : 0 })
  }
  return out
}

export function Scene({ state, mode, onReady }: { state: StateId; mode: Mode; onReady: (a: SceneApi) => void }) {
  const look = LOOKS.C
  const root = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLCanvasElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  const L = useMemo(() => layoutOf(state), [state])
  useLayoutEffect(() => {
    const el = root.current!, ctx = cvRef.current!.getContext('2d')!
    const q = gsap.utils.selector(root)
    // ── живопись (один раз)
    const back = paintBack(look), mids = paintMids(look), ground = paintGround(look), front = paintFront(look)
    const mistFar = paintMist(0.07, 560, 300, 5), mistNear = paintMist(0.10, 840, 260, 9)
    const vign = paintVignette(0.5)
    const imgs = L.frames.map(f => { const i = new Image(); i.src = f.img.src; return i })
    // плотная листва — «поверхность», которая раскрывается, открывая фото
    const foliage = (() => { const c = mk(420, 420), x = c.getContext('2d')!, r = seeded(66); x.fillStyle = '#0a211b'; x.fillRect(0, 0, 420, 420)
      for (let i = 0; i < 900; i++) { const px = r() * 420, py = r() * 420, len = 16 + r() * 22, a = r() * 6.3; const col = r() < 0.5 ? look.leafLight[i % 4] : look.leafDark[i % 3]
        for (const [ox, oy] of [[0, 0], [420, 0], [-420, 0], [0, 420], [0, -420]]) { x.save(); x.translate(px + ox, py + oy); x.rotate(a); x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(len * 0.25, -len * 0.32, len * 0.7, -len * 0.3, len, 0); x.bezierCurveTo(len * 0.7, len * 0.3, len * 0.25, len * 0.32, 0, 0); x.fillStyle = col; x.fill(); x.restore() } }
      return c })()
    const folPat = ctx.createPattern(foliage, 'repeat')!
    // свечение: средний план и земля — со слоем земли; корни древнего дерева — со своим деревом
    const SRC = { x: 260, y: 960 }
    type Glow = { x: number; y: number; r: number; d: number; f: number }
    const glowsMid: Glow[] = [], glowsFront: Glow[] = []
    const rg = seeded(71)
    const addRoot = (to: Glow[], pts: Pt[], k: number) => pts.forEach((p, i) => { if (i % 2 === 0) to.push({ x: p.x, y: p.y - 2, r: (9 - i * 0.4) * k + 3, d: Math.hypot(p.x - SRC.x, p.y - SRC.y), f: rg() * 10 }) })
    front.roots.forEach(p => addRoot(glowsFront, p, 1.4)); mids.forEach(m => m.roots.forEach(p => addRoot(glowsMid, p, 0.7)))
    for (let i = 0; i < 90; i++) { const x = 360 + rg() * 1520, y = groundY(x) + 8 + rg() * 50; glowsMid.push({ x, y, r: 4 + rg() * 8, d: Math.hypot(x - SRC.x, y - SRC.y), f: rg() * 10 }) }
    ground.mush.forEach(m => glowsMid.push({ x: m.x, y: m.y, r: m.r * 1.8, d: Math.hypot(m.x - SRC.x, m.y - SRC.y), f: rg() * 10 }))
    const spr = (rgb: string, k = 0.3) => { const c = mk(64, 64), x = c.getContext('2d')!, g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, `rgba(${rgb},1)`); g.addColorStop(k, `rgba(${rgb},.35)`); g.addColorStop(1, `rgba(${rgb},0)`); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return c }
    const glowSpr = spr('150,250,222'), flySpr = spr('255,214,130', 0.18)
    // ветви, лианы, рамы
    const lines = L.strands.map(s => spline(s, 170))
    const wraps = lines.map(ln => ln.map((p, i) => { const q2 = ln[Math.min(ln.length - 1, i + 1)], p0 = ln[Math.max(0, i - 1)], dx = q2.x - p0.x, dy = q2.y - p0.y, l = Math.hypot(dx, dy) || 1; const o = Math.sin(i * 0.33) * 8; return { x: p.x - dy / l * o, y: p.y + dx / l * o } }))
    const lineLeaves = lines.map((ln, k) => leavesFor(ln, 300 + k, look, 3))
    const frames = L.frames.flatMap(f => [framePath(f.r, 12, -1), framePath(f.r, 12, 1)])
    // листья рамы — только наружу: левая половина идёт против часовой, правая — по часовой
    const frameLeaves = frames.map((fr, k) => leavesFor(fr, 400 + k, look, 5, k % 2 ? 1 : -1))
    const media = L.frames.map(f => ({ x: f.r.x - 30, y: f.r.y - 30, w: f.r.w + 60, h: f.r.h + 60 }))
    // светлячки
    const rf = seeded(91), nzf = noise1(3)
    const homes = [{ x: 470, y: 880, n: 7 }, { x: 700, y: 860, n: 5 }, { x: 1220, y: 880, n: 6 }, { x: 1700, y: 870, n: 7 }, { x: 900, y: 420, n: 5 }, { x: 1500, y: 380, n: 6 }, { x: 1120, y: 620, n: 4 }]
    const flies = homes.flatMap(h => Array.from({ length: h.n }, () => ({ hx: h.x + (rf() - 0.5) * 160, hy: h.y + (rf() - 0.5) * 120, rad: 40 + rf() * 110, sp: 0.08 + rf() * 0.18, ph: rf() * 100, per: 2.2 + rf() * 2.6, dur: 0.25 + rf() * 0.3, s: 0.7 + rf() * 0.7, perch: rf(), rest: rf() < 0.25 })))
    const perchLine = lines.length ? lines.flat() : null
    // ── состояние (его двигает таймлайн)
    const full = mode === 'full'
    const st = {
      camX: full ? 30 : 0, camZ: full ? 1.07 : 1, hush: 0, wave: 0, after: full ? 0 : 0.55, sync: 0, bend: full ? 0 : 0.72, sway: 1, part: full ? 0 : 1, light: full ? 0 : 1,
      grow: lines.map(() => 0), energy: 0, frame: frames.map(() => 0), gather: 0, veil: 0, reveal: L.frames.map(() => 0), vine: 0,
      fl: L.flowers.map(() => ({ g: 0, b: 0 })), badge: L.badges.map(() => 0), cells: 0, dand: 0, n: 30, bloomArch: 0,
    }
    const bendAmp = 0.2
    const gone: number[] = []
    let lastN = 30
    const dirs = mids.map(m => (m.x < 1150 ? -1 : 1))
    const midC = mk(), mctx = midC.getContext('2d')!
    let midKey = ''
    // параллакс: земля и всё, что на ней стоит (деревья среднего плана, свечение), — ОДИН коэффициент,
    // иначе основания стволов скользят по земле при движении камеры
    const K = { back: 0.25, ground: 0.6, mist: 0.8, front: 1.1 }
    const tf = (k: number) => { ctx.setTransform(st.camZ, 0, 0, st.camZ, (1 - st.camZ) * W / 2 + st.camX * k, (1 - st.camZ) * H / 2) }

    const drawLine = (ln: Pt[], wr: Pt[] | null, g: number, w0: number, leaves: Leaf[], t: number, still = false) => {
      const n = Math.floor(g * (ln.length - 1)); if (n < 1) return
      const sway = (i: number) => still ? 0 : Math.sin(t * 0.9 + i * 0.05) * 1.6 * st.sway * (i / ln.length)
      const seg = (pts: Pt[], wk: number, col: string, dx = 0, dy = 0) => {
        ctx.strokeStyle = col; ctx.lineCap = 'round'
        const m = Math.min(n, pts.length - 1)
        for (let i = 0; i < m; i++) { const tip = Math.min(1, (n - i) / 14); ctx.lineWidth = Math.max(1.2, (w0 * (1 - i / ln.length * 0.7)) * wk * (0.35 + 0.65 * tip)); ctx.beginPath(); ctx.moveTo(pts[i].x + dx + sway(i), pts[i].y + dy); ctx.lineTo(pts[i + 1].x + dx + sway(i + 1), pts[i + 1].y + dy); ctx.stroke() }
      }
      // кора: тень снизу, тело, освещённый верх, тонкий лунный блик
      seg(ln, 1.12, '#06100c', 0, 3); seg(ln, 1, look.bark[1]); seg(ln, 0.5, '#4a3a2a', 0, -w0 * 0.15); seg(ln, 0.16, '#8fd3b4', 1, -w0 * 0.34)
      if (wr && g > 0.2) seg(wr.slice(0, Math.max(2, Math.floor(n * 0.92))), 0.36, '#2d4a33')
      for (const lf of leaves) {
        if (lf.i >= n) continue
        const u = ease((n - lf.i) / 14), p = ln[lf.i], p2 = ln[lf.i + 1], a = Math.atan2(p2.y - p.y, p2.x - p.x) + lf.ang
        const px = p.x + sway(lf.i), py = p.y
        let bx = px, by = py
        if (lf.twig) { bx = px + Math.cos(a) * lf.twig * u; by = py + Math.sin(a) * lf.twig * u; ctx.strokeStyle = look.bark[1]; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by); ctx.stroke() }
        const w = Math.floor(lf.len * 7.3) % 3 === 2 ? 0.44 : 0.3
        ctx.save(); ctx.translate(bx, by); ctx.rotate(a + (still ? 0 : Math.sin(t * 1.3 + lf.i) * 0.08 * st.sway)); ctx.scale(u, u)
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(lf.len * 0.25, -lf.len * w, lf.len * 0.7, -lf.len * w * 0.9, lf.len, 0); ctx.bezierCurveTo(lf.len * 0.7, lf.len * w * 0.9, lf.len * 0.25, lf.len * w, 0, 0)
        ctx.fillStyle = lf.col; ctx.fill(); ctx.strokeStyle = 'rgba(200,255,230,.12)'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(lf.len * 0.8, 0); ctx.stroke()
        ctx.restore()
        if (!still && lf.twig && lf.i % 3 === 0 && st.bloomArch > 0) { // на ветвях распускаются мелкие цветы — после листьев
          const bu = ease((st.bloomArch - (lf.i / ln.length) * 0.6) * 3); if (bu > 0) {
            for (let k = 0; k < 5; k++) { const a2 = k * 1.2566 + lf.i; ctx.fillStyle = 'rgba(232,222,255,.92)'; ctx.beginPath(); ctx.ellipse(bx + Math.cos(a2) * 5 * bu, by + Math.sin(a2) * 5 * bu, 5 * bu, 3 * bu, a2, 0, 6.3); ctx.fill() }
            ctx.fillStyle = '#ffd56b'; ctx.beginPath(); ctx.arc(bx, by, 2.4 * bu, 0, 6.3); ctx.fill()
          }
        }
      }
    }
    /** Импульс света, бегущий по ветви: яркая голова и затухающий след. */
    const drawPulse = (ln: Pt[], e: number) => {
      if (e <= 0 || e >= 1.15) return
      const head = Math.floor(clamp01(e) * (ln.length - 1)), fade = e > 1 ? 1 - (e - 1) / 0.15 : 1
      ctx.globalCompositeOperation = 'lighter'
      for (let k = 0; k < 26; k++) { const i = head - k; if (i < 0) break; const p = ln[i], s = (18 - k * 0.55) * (k === 0 ? 1.6 : 1); ctx.globalAlpha = 0.7 * (1 - k / 26) * fade; ctx.drawImage(glowSpr, p.x - s, p.y - s, s * 2, s * 2) }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
    }
    const drawFlower = (f: Flower, gr: number, bl: number, i: number, t: number) => {
      if (gr <= 0) return
      let hx = f.x, hy = f.y
      if (f.stem) {
        const gy = groundY(f.x) + 8, top = f.y + f.r * 0.2
        if (bl > 0 && bl < 1) { ctx.strokeStyle = `rgba(150,255,225,${0.45 * (1 - bl)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(f.x, gy + 4, 30 + bl * 170, 8 + bl * 34, 0, 0, 6.3); ctx.stroke() }
        const sw = Math.sin(t * 0.8 + i * 1.7) * 3 * st.sway
        const pts: Pt[] = []
        for (let k = 0; k <= 30; k++) { const u = k / 30; pts.push({ x: f.x + Math.sin(u * 9 + i) * 10 * (1 - u) + sw * u * u, y: gy - (gy - top) * u }) }
        const n = Math.max(1, Math.floor(ease(gr) * 30))
        ctx.strokeStyle = '#3f7a56'; ctx.lineWidth = Math.max(4, f.r * 0.08); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); for (let k = 1; k <= n; k++) ctx.lineTo(pts[k].x, pts[k].y); ctx.stroke()
        ctx.strokeStyle = 'rgba(160,230,190,.35)'; ctx.lineWidth = 1.5; ctx.stroke()
        const lu = ease((gr - 0.45) * 3)
        if (lu > 0) for (const s of [-1, 1]) {
          const p = pts[12 + (s > 0 ? 4 : 0)], ll = f.r * 0.62
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(s > 0 ? -0.5 - 0.4 * (1 - lu) : Math.PI + 0.5 + 0.4 * (1 - lu)); ctx.scale(lu, lu)
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(ll * 0.3, -ll * 0.34, ll * 0.7, -ll * 0.3, ll, 0); ctx.bezierCurveTo(ll * 0.7, ll * 0.3, ll * 0.3, ll * 0.34, 0, 0); ctx.fillStyle = look.leafLight[1]; ctx.fill()
          ctx.strokeStyle = 'rgba(200,255,220,.22)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(ll * 0.86, 0); ctx.stroke(); ctx.restore()
        }
        if (gr < 1) return
        hx = pts[n].x; hy = pts[n].y - 2
      } else if (gr < 1) return
      // цветок: задний круг крупнее и темнее, передний светлее; лепестки чашей, с прожилкой
      const open = Math.min(1.08, backOut(bl))
      const ring = (cnt: number, len: number, wid: number, off: number, c0: string, c1: string) => {
        for (let k = 0; k < cnt; k++) {
          const a = off + (k / cnt) * Math.PI * 2, ang = -Math.PI / 2 + (a + Math.PI / 2) * open, l = len * (0.35 + 0.65 * open)
          ctx.save(); ctx.translate(hx, hy); ctx.rotate(ang)
          const g = ctx.createLinearGradient(0, 0, l, 0); g.addColorStop(0, c0); g.addColorStop(0.75, c1); g.addColorStop(1, c1)
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(l * 0.28, -wid, l * 0.86, -wid * 0.95, l, -wid * 0.05); ctx.bezierCurveTo(l * 0.86, wid * 0.9, l * 0.28, wid, 0, 0)
          ctx.fillStyle = g; ctx.fill()
          ctx.strokeStyle = 'rgba(30,10,60,.35)'; ctx.lineWidth = 1; ctx.stroke()
          ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(l * 0.12, 0); ctx.quadraticCurveTo(l * 0.5, -wid * 0.1, l * 0.82, 0); ctx.stroke()
          ctx.restore()
        }
      }
      ring(7, f.r * 1.02, f.r * 0.34, 0.2, '#2e1c5e', '#8a72d4')
      ring(6, f.r * 0.8, f.r * 0.3, 0.2 + Math.PI / 6, '#4f379a', '#dcd0ff')
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.22 * clamp01(bl); ctx.drawImage(glowSpr, hx - f.r * 1.3, hy - f.r * 1.3, f.r * 2.6, f.r * 2.6); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
      const cr = f.r * 0.44 * clamp01(bl * 1.4)
      if (cr > 1) {
        const g = ctx.createRadialGradient(hx - cr * 0.3, hy - cr * 0.3, 1, hx, hy, cr); g.addColorStop(0, '#fff3c0'); g.addColorStop(0.7, '#f0c055'); g.addColorStop(1, '#a87222')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hx, hy, cr, 0, 6.3); ctx.fill()
        ctx.fillStyle = 'rgba(255,240,190,.9)'; for (let k = 0; k < 14; k++) { const a = (k / 14) * 6.28; ctx.beginPath(); ctx.arc(hx + Math.cos(a) * cr * 1.12, hy + Math.sin(a) * cr * 1.12, Math.max(1.4, f.r * 0.028), 0, 6.3); ctx.fill() }
      }
    }
    const drawDand = (p: Pt, g: number, t: number) => {
      if (g <= 0) return
      const gy = groundY(p.x) + 30, top = p.y, n = ease(g)
      ctx.strokeStyle = '#5f9b78'; ctx.lineWidth = 5; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(p.x, gy); ctx.quadraticCurveTo(p.x + 14, gy - (gy - top - 58) * 0.5 * n, p.x + Math.sin(t * 0.7) * 2 * st.sway, gy - (gy - top - 58) * n); ctx.stroke()
      if (g < 1) return
      const hx = p.x, hy = top, R = 104, ph = phaseOf(st.n)
      { const gr = ctx.createRadialGradient(hx, hy, 20, hx, hy, 66); gr.addColorStop(0, 'rgba(3,16,13,.85)'); gr.addColorStop(1, 'rgba(3,16,13,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(hx, hy, 66, 0, 6.3); ctx.fill() }
      for (let i = 0; i < 30; i++) {
        const a = -Math.PI / 2 + (i / 30) * Math.PI * 2
        let x0 = hx, y0 = hy, al = 1
        if (i >= st.n) { const at = gone[i]; if (at === undefined) continue; const age = t - at; if (age > 2.6 || age < 0) continue; x0 += age * 70 + Math.sin(age * 3 + i) * 10; y0 -= age * 60; al = 1 - age / 2.6 }
        const ex = x0 + Math.cos(a) * R, ey = y0 + Math.sin(a) * R
        ctx.globalAlpha = al; ctx.strokeStyle = 'rgba(225,255,245,.42)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(x0 + Math.cos(a) * 62, y0 + Math.sin(a) * 62); ctx.lineTo(ex, ey); ctx.stroke()
        const col = ph === 'warning' ? '255,206,130' : ph === 'zero' ? '120,150,140' : '232,255,246'
        ctx.strokeStyle = `rgba(${col},.8)`; ctx.lineWidth = 1
        for (let k = -2; k <= 2; k++) { const b = a + k * 0.16; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + Math.cos(b) * 14, ey + Math.sin(b) * 14); ctx.stroke() }
        ctx.globalAlpha = 1
      }
    }
    /** Спил ветки — клетка буквы «3 попыток»: годичные кольца, кора по краю. */
    const drawCells = (c: NonNullable<Layout['cells']>, g: number) => {
      const n = c.word.length, x0 = c.cx - ((n - 1) * (c.d + c.gap)) / 2, rr = seeded(5)
      for (let i = 0; i < n; i++) {
        const u = backOut((g * 1.6 - i * 0.1)); if (u <= 0) { rr(); continue }
        const x = x0 + i * (c.d + c.gap), y = c.cy, R = (c.d / 2) * u
        ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.ellipse(x + 4, y + R * 0.9, R * 0.95, R * 0.25, 0, 0, 6.3); ctx.fill()
        ctx.fillStyle = '#24160c'; ctx.beginPath(); ctx.arc(x, y, R, 0, 6.3); ctx.fill()
        const g2 = ctx.createRadialGradient(x - R * 0.2, y - R * 0.25, 2, x, y, R * 0.88); g2.addColorStop(0, '#9a7448'); g2.addColorStop(0.6, '#71502e'); g2.addColorStop(1, '#4a321c')
        ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(x, y, R * 0.88, 0, 6.3); ctx.fill()
        ctx.strokeStyle = 'rgba(40,22,10,.35)'; ctx.lineWidth = 1.2
        for (let k = 1; k < 7; k++) { const rk = R * 0.86 * (k / 7) ** 0.8; ctx.beginPath(); ctx.ellipse(x + (rr() - 0.5) * 3, y + (rr() - 0.5) * 3, rk, rk * (0.94 + rr() * 0.06), rr(), 0, 6.3); ctx.stroke() }
        ctx.strokeStyle = 'rgba(160,230,200,.25)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, R * 0.97, Math.PI * 1.1, Math.PI * 1.75); ctx.stroke()
      }
    }

    const inMedia = (x: number, y: number) => media.find(m => x > m.x && x < m.x + m.w && y > m.y && y < m.y + m.h)
    const draw = () => {
      const t = gsap.ticker.time
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H)
      tf(K.back); ctx.drawImage(back, 0, 0)
      if (st.light > 0) { const g = ctx.createRadialGradient(1240, 40, 0, 1240, 40, 900); g.addColorStop(0, `rgba(160,255,230,${0.22 * st.light})`); g.addColorStop(1, 'rgba(160,255,230,0)'); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over' }
      const mf = (t * 6) % W; ctx.globalAlpha = 0.9; ctx.drawImage(mistFar.cv, -mf, mistFar.y0); ctx.globalAlpha = 1
      // деревья среднего плана гнутся полосами: у корня смещение 0 — основание не отрывается
      const angs = mids.map((_, i) => Math.round(((st.bend * bendAmp * dirs[i]) + Math.sin(t * 0.5 + i * 1.3) * 0.006 * st.sway) * 2000) / 2000)
      const key = angs.join(',')
      if (key !== midKey) {
        midKey = key; mctx.clearRect(0, 0, W, H)
        mids.forEach((m, i) => { const sx = m.x - m.ox; for (let y = 0; y < m.cv.height; y += 6) { const hh = Math.max(0, m.base - (y + 3)), dx = Math.tan(angs[i]) * hh * (hh / m.h); mctx.drawImage(m.cv, 0, y, m.cv.width, 6, sx + dx, y, m.cv.width, 6) } })
      }
      tf(K.ground); ctx.drawImage(midC, 0, 0); ctx.drawImage(ground.cv, 0, 0)
      const front0 = st.wave * 2300
      const glow = (list: Glow[]) => {
        ctx.globalCompositeOperation = 'lighter'
        for (const g of list) {
          const flick = 0.5 + 0.5 * Math.sin(t * 1.1 + g.f)
          const w = Math.exp(-((g.d - front0) ** 2) / (2 * 140 * 140)) * (st.wave > 0 && st.wave < 1.05 ? 1 : 0)
          const a = 0.05 + 0.05 * flick + w * 0.9 + st.after * (0.14 + 0.1 * flick)
          const rr = g.r * (1 + w * 1.6); ctx.globalAlpha = Math.min(1, a); ctx.drawImage(glowSpr, g.x - rr, g.y - rr, rr * 2, rr * 2)
        }
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
      }
      glow(glowsMid)
      tf(K.mist); const mn = (t * 10) % W; ctx.drawImage(mistNear.cv, -mn, mistNear.y0)
      tf(K.front); ctx.drawImage(front.cv, 0, 0); glow(glowsFront)
      if (st.part > 0) { // крона расходится по неровной кромке листвы
        for (const side of [-1, 1]) {
          ctx.save(); ctx.beginPath(); ctx.moveTo(side < 0 ? -200 : W + 200, -10)
          for (let y = -10; y <= 330; y += 30) ctx.lineTo(1150 + Math.sin(y * 0.05) * 60 + Math.sin(y * 0.13) * 30, y)
          ctx.lineTo(side < 0 ? -200 : W + 200, 330); ctx.closePath(); ctx.clip()
          ctx.drawImage(front.canopy, side * st.part * 110, -st.part * 40); ctx.restore()
        }
      } else ctx.drawImage(front.canopy, 0, 0)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.drawImage(vign, 0, 0) // виньетка — на окружение, НЕ на фото и текст
      if (st.veil > 0 && L.q) { const cx = L.q.left + L.q.width / 2, g = ctx.createRadialGradient(cx, L.q.top + 70, 40, cx, L.q.top + 70, L.q.width * 0.62); g.addColorStop(0, `rgba(2,12,10,${0.5 * st.veil})`); g.addColorStop(1, 'rgba(2,12,10,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H) }
      // ── содержимое
      lines.forEach((ln, k) => { drawLine(ln, wraps[k], st.grow[k], L.strands.length && L.strands[0][0].y > 900 ? 30 : 20, lineLeaves[k], t); drawPulse(ln, st.energy - k * 0.08) })
      L.vines.forEach(([a, b], i) => {
        const u = ease(st.vine * 1.3 - (i % 4) * 0.08); if (u <= 0) return
        const by = a.y + (b.y - a.y) * u
        ctx.strokeStyle = '#2f5a40'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.bezierCurveTo(a.x + 8, a.y + (by - a.y) * 0.3, a.x - 8, a.y + (by - a.y) * 0.7, a.x, by); ctx.stroke()
        ctx.strokeStyle = 'rgba(160,230,190,.3)'; ctx.lineWidth = 1; ctx.stroke()
        for (let y = a.y + 22; y < by - 6; y += 30) { const s = ((y / 30) | 0) % 2 ? 1 : -1; ctx.save(); ctx.translate(a.x, y); ctx.rotate(s * 0.9 + Math.PI / 2 * 0); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(4, -4, 10 * s, -6, 14 * s, -2); ctx.bezierCurveTo(10 * s, 3, 4, 3, 0, 0); ctx.fillStyle = look.leafLight[(y / 30 | 0) % 4]; ctx.fill(); ctx.restore() }
      })
      // фото: мягкая тень под кадром, сам снимок без фильтров, раскрытие — живой край
      L.frames.forEach((f, k) => {
        const r = f.r, im = imgs[k], rv = clamp01(st.reveal[k])
        const fr = Math.min(st.frame[k * 2], st.frame[k * 2 + 1])
        if (fr > 0.6) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.75)'; ctx.shadowBlur = 34; ctx.shadowOffsetY = 12; ctx.fillStyle = '#071410'; ctx.globalAlpha = clamp01((fr - 0.6) * 2.5); ctx.fillRect(r.x, r.y, r.w, r.h); ctx.restore() }
        if (fr <= 0.6) return
        const cx = r.x + r.w / 2, cy = r.y + r.h / 2, Rm = Math.hypot(r.w, r.h) / 2 * 1.12, R = rv * Rm
        const blob = (fresh = true) => { if (fresh) ctx.beginPath(); for (let i = 0; i <= 64; i++) { const a = (i / 64) * Math.PI * 2, rr = R * (1 + 0.09 * Math.sin(a * 5 + k * 2) + 0.05 * Math.sin(a * 9 + 1)); if (i) ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); else ctx.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) } ctx.closePath() }
        ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip()
        if (rv > 0 && im.complete && im.naturalWidth) { if (rv < 1) { ctx.save(); blob(); ctx.clip(); ctx.drawImage(im, r.x, r.y, r.w, r.h); ctx.restore() } else ctx.drawImage(im, r.x, r.y, r.w, r.h) }
        if (rv < 1) { // плотная листва закрывает кадр и расходится от центра
          ctx.save(); ctx.globalAlpha = clamp01((fr - 0.6) * 2.5); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); if (rv > 0) blob(false); ctx.fillStyle = folPat; ctx.fill('evenodd'); ctx.restore()
          if (rv > 0) { ctx.save(); blob(); ctx.strokeStyle = `rgba(170,255,225,${0.7 * (1 - rv)})`; ctx.lineWidth = 3; ctx.shadowColor = 'rgba(120,255,210,.8)'; ctx.shadowBlur = 14; ctx.stroke(); ctx.restore() }
        }
        ctx.restore()
        if (rv >= 1) { ctx.strokeStyle = 'rgba(220,255,240,.22)'; ctx.lineWidth = 1; ctx.strokeRect(r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1) }
        // сорванные листья вылетают наружу за край кадра — над фото не задерживаются
        if (rv > 0 && rv < 1) { const rr = seeded(800 + k); for (let i = 0; i < 70; i++) {
          const a = rr() * 6.3, d0 = rr(), len = 16 + rr() * 18, col = rr() < 0.5 ? look.leafLight[i % 4] : look.leafDark[i % 3]
          const pr = clamp01((rv - d0 * 0.7) * 3); if (pr <= 0 || pr >= 1) continue
          const dd = Rm * (d0 * 0.7 + pr * 0.8), x = cx + Math.cos(a) * dd * (r.w / Math.hypot(r.w, r.h)) * 1.3, y = cy + Math.sin(a) * dd * (r.h / Math.hypot(r.w, r.h)) * 1.3 + pr * pr * 120
          ctx.globalAlpha = 1 - pr; ctx.save(); ctx.translate(x, y); ctx.rotate(a + pr * 5); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(len * 0.25, -len * 0.3, len * 0.7, -len * 0.28, len, 0); ctx.bezierCurveTo(len * 0.7, len * 0.28, len * 0.25, len * 0.3, 0, 0); ctx.fillStyle = col; ctx.fill(); ctx.restore()
        } ctx.globalAlpha = 1 }
      })
      frames.forEach((fr, k) => drawLine(fr, null, st.frame[k], 13, frameLeaves[k], t, true))
      L.flowers.forEach((f, i) => drawFlower(f, st.fl[i].g, st.fl[i].b, i, t))
      L.badges.forEach((b, i) => drawFlower({ x: b.x, y: b.y, r: 40, stem: false }, st.badge[i] > 0 ? 1 : 0, st.badge[i], i, t))
      if (L.cells) drawCells(L.cells, st.cells)
      drawDand(DAND, st.dand, t)
      // светлячки: облетают фото стороной
      ctx.globalCompositeOperation = 'lighter'
      flies.forEach((f, i) => {
        const tt = f.rest ? t * 0.15 : t
        let x = f.hx + (nzf(f.ph + tt * f.sp) - 0.5) * f.rad * 2 * (1 - st.hush * 0.6)
        let y = f.hy + (nzf(f.ph + 40 + tt * f.sp * 0.8) - 0.5) * f.rad * 1.2 * (1 - st.hush * 0.6) + Math.sin(t * 2 + i) * 3
        const cyc = ((t + f.ph) % f.per) / f.per, fl = cyc < f.dur / f.per ? Math.sin(Math.PI * cyc * f.per / f.dur) : 0
        let b = (0.18 + 0.82 * fl) * (1 - st.hush * 0.92)
        const d = Math.hypot(x - SRC.x, y - SRC.y), sw = Math.exp(-((d - st.wave * 2300) ** 2) / (2 * 120 * 120))
        b = b * (1 - st.sync) + st.sync * Math.max(sw, 0.25)
        if (perchLine && st.gather > 0) {
          const k = clamp01(st.gather * 1.5 - f.perch * 0.5), e = k * k * (3 - 2 * k)
          const tp = perchLine[Math.floor(f.perch * (perchLine.length - 1))]
          x += (tp.x - x) * e; y += (tp.y - 6 - y) * e
          b = b * (1 - e) + e * (0.45 + 0.2 * Math.sin(t * 0.9 + i))
        }
        const m = inMedia(x, y)
        if (m) { const dl = x - m.x, dr = m.x + m.w - x, dt = y - m.y, db = m.y + m.h - y, mn2 = Math.min(dl, dr, dt, db); if (mn2 === dl) x = m.x; else if (mn2 === dr) x = m.x + m.w; else if (mn2 === dt) y = m.y; else y = m.y + m.h }
        const s = f.s * (6 + 22 * b)
        ctx.globalAlpha = Math.min(1, 0.2 + b); ctx.drawImage(flySpr, x - s, y - s, s * 2, s * 2)
      })
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
    }
    gsap.ticker.add(draw)

    // ── хореография
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    const sp = full ? 1 : 0.62 // обычный вопрос — быстрее
    tl.addLabel('A', 0)
    if (full) {
      tl.to(st, { camX: 0, camZ: 1.0, duration: 4.4, ease: 'sine.inOut' }, 0)
        .addLabel('B', 2.8)
        .to(st, { hush: 1, sway: 0.15, duration: 0.8, ease: 'power2.out' }, 'B')
        .to(st, { wave: 1.05, duration: 2.4, ease: 'power1.in' }, 'B+=0.7')
        .to(st, { sync: 1, hush: 0, duration: 0.4 }, 'B+=0.8')
        .to(st, { after: 1, duration: 1.2 }, 'B+=2.4')
        .to(st, { bend: 1, duration: 2.2, ease: 'power3.inOut' }, 'B+=1.2')
        .to(st, { bend: 0.72, duration: 1.0, ease: 'sine.inOut' }, 'B+=3.4')
        .to(st, { sync: 0, duration: 1.0 }, 'B+=3.2')
        .to(st, { part: 1, duration: 2.4, ease: 'power3.inOut' }, 'B+=2.0').to(st, { light: 1, duration: 1.4 }, 'B+=2.6')
        .addLabel('C', 6.0)
    } else {
      // предвосхищение: лес на миг затихает, листья вздрагивают
      tl.addLabel('B', 0.5)
        .to(st, { hush: 1, sway: 0.2, duration: 0.4, ease: 'power2.out' }, 'B')
        .to(st, { after: 0.9, duration: 0.5 }, 'B')
        .addLabel('C', 1.0)
    }
    // перестройка: свет бежит по ветви, ветвь прорастает, лианы опускаются, рамы смыкаются
    lines.forEach((_, k) => tl.to(st.grow, { [k]: 1, duration: 2.6 * sp, ease: 'power2.inOut' }, `C+=${k * 0.2 * sp}`))
    tl.to(st, { energy: 1.15, duration: 2.6 * sp, ease: 'power1.inOut' }, 'C+=0.1')
    if (perchLine) tl.to(st, { gather: 1, duration: 2.6 * sp, ease: 'power1.inOut' }, `C+=${1.2 * sp}`)
    if (L.vines.length) tl.to(st, { vine: 1, duration: 1.0 * sp, ease: 'power2.in' }, `C+=${1.6 * sp}`)
    frames.forEach((_, k) => tl.to(st.frame, { [k]: 1, duration: 1.2 * sp, ease: 'power2.inOut' }, `C+=${(L.vines.length ? 2.2 : 1.6) * sp + Math.floor(k / 2) * 0.12}`))
    tl.to(st, { dand: 1, duration: 1.4 * sp, ease: 'power2.out' }, `C+=${1.2 * sp}`)
    tl.to(st, { bloomArch: 1, duration: 2.4 * sp, ease: 'none' }, `C+=${2.0 * sp}`)
    if (L.cells) tl.to(st, { cells: 1, duration: 1.1, ease: 'none' }, `C+=${2.4 * sp}`)
    // раскрытие: поверхность кадра расходится живым краем, слова прорастают, цветы распускаются
    const D = full ? 9.2 : 1.0 + 3.0 * sp
    tl.addLabel('D', D)
      .to(st, { veil: 1, duration: 0.8 }, 'D-=0.4')
      .to(st, { hush: 0, duration: 0.6 }, 'D')
    L.frames.forEach((_, k) => tl.to(st.reveal, { [k]: 1, duration: 1.0, ease: 'power2.inOut' }, `D-=${0.3 - k * 0.12}`))
    if (L.q) tl.fromTo(q('.fq .w'), { opacity: 0, y: 18, rotation: -4, color: '#7ff2d8' }, { opacity: 1, y: 0, rotation: 0, color: '#eefff9', duration: 0.7, stagger: Math.min(0.05, 1.2 / L.q.text.split(' ').length), ease: 'back.out(1.6)' }, 'D')
    L.flowers.forEach((_, i) => {
      tl.to(st.fl[i], { g: 1, duration: 1.1 * sp + 0.2, ease: 'power2.out' }, `D+=${0.15 + i * 0.12}`)
        .to(st.fl[i], { b: 1, duration: 0.9, ease: 'none' }, `D+=${1.0 * sp + 0.45 + i * 0.12}`)
    })
    L.badges.forEach((_, i) => tl.to(st.badge, { [i]: 1, duration: 0.8, ease: 'none' }, `D+=${0.6 + i * 0.12}`))
    if (L.flowers.length) tl.fromTo(q('.fo b'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.12, ease: 'back.out(2)' }, `D+=${1.0 * sp + 0.9}`)
      .fromTo(q('.fo span'), { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, `D+=${1.0 * sp + 1.0}`)
    if (L.badges.length) tl.fromTo(q('.fb b'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.12, ease: 'back.out(2)' }, 'D+=1.0')
    if (L.cells) tl.fromTo(q('.fc span'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, 'D+=0.1')
    if (L.phase) tl.fromTo(q('.fp'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 'D')
    tl.fromTo(q('.ft'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, 'D+=0.3')
      .fromTo(q('.fm'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=1.0')
      .addLabel('E', D + 2.4)
      // покой: ветер едва заметен, светлячки сидят на ветвях, содержимое неподвижно
      .to(st, { sway: 0.35, after: 0.6, duration: 2.4 }, 'E')
      .to({}, { duration: 2.6 }, 'E')

    onReady({
      tl,
      setTimer: n => {
        if (n < lastN) for (let i = n; i < lastN; i++) gone[i] = gsap.ticker.time
        if (n > lastN) gone.length = 0
        lastN = n; st.n = n
        if (tnum.current) tnum.current.textContent = String(n)
        el.setAttribute('data-ph', phaseOf(n))
      },
      dispose: () => gsap.ticker.remove(draw),
    })
    return () => { gsap.ticker.remove(draw); tl.kill() }
  }, [look, mode, state, L, onReady])

  const cellX = (i: number) => L.cells ? L.cells.cx - ((L.cells.word.length - 1) * (L.cells.d + L.cells.gap)) / 2 + i * (L.cells.d + L.cells.gap) : 0
  return (
    <div className="fr-root" ref={root} data-ph="normal">
      <canvas ref={cvRef} width={W} height={H} />
      {L.q && <p className={`fq${L.q.align === 'left' ? ' is-left' : ''}`} style={{ left: L.q.left, top: L.q.top, width: L.q.width, fontSize: L.q.size }}>
        {L.q.text.split(' ').map((w, i) => <span key={i} className="w">{w}</span>)}
      </p>}
      {L.opts.map((o, i) => (
        <div key={o.key} className={`fo${L.flowers[i].r < 60 ? ' is-sm' : ''}`} style={{ left: L.flowers[i].x, top: L.flowers[i].y }}>
          <b>{o.key}</b><span style={{ top: L.label - L.flowers[i].y }}>{o.text}</span>
        </div>
      ))}
      {L.badges.map(b => <div key={b.key} className="fb" style={{ left: b.x, top: b.y }}><b>{b.key}</b></div>)}
      {L.cells && L.cells.word.split('').map((ch, i) => (
        <div key={i} className={`fc${L.cells!.open.includes(i) ? ' is-open' : ''}`} style={{ left: cellX(i), top: L.cells!.cy }}><span>{L.cells!.open.includes(i) ? ch : '?'}</span></div>
      ))}
      {L.phase && <div className="fp" style={{ left: L.phase.x, top: L.phase.y }}>{L.phase.text}</div>}
      <div className="ft" style={{ left: DAND.x, top: DAND.y }}><span ref={tnum}>30</span></div>
      <div className="fm"><span>{state === 'six' ? '3 попытки' : ROUND_NAME}</span><span>{QNO}</span></div>
    </div>
  )
}
