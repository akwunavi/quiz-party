// ═══ Forest Lab — Концепт C «Живой лес» (утверждён), доработка 10.07 ═══
// Приоритет экрана: 1) игровая информация видна целиком, 2) фото крупно и чисто,
// 3) текст читается, 4) таймер виден, 5) декор. Лес подстраивается под вопрос:
// ветви/лианы/опоры строятся вокруг кадров, деревья расходятся от содержимого,
// за содержимым ложится мягкая дымка (под фото, не поверх).
// Появление вопроса: ПРЕДВОСХИЩЕНИЕ (лес затихает) → ПЕРЕСТРОЙКА (свет бежит по ветви,
// ветвь прорастает, лианы, рама из переплетённых побегов) → РАСКРЫТИЕ (листва в кадре
// расходится живым краем, слова прорастают, цветы распускаются) → ПОКОЙ.
// Показ ответа (только предпросмотр, игровую логику не трогаем): свет бежит по земле
// к правильному цветку/раме, тот отзывается, остальные притихают.
// Всё рисуется в одном холсте от состояния `st` (GSAP двигает только числа) —
// перемотка в любую точку даёт тот же кадр.
import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { LOOKS, W, H, groundY, seeded, noise1, mk, paintBack, paintMids, paintGround, paintMist, paintFront, paintVignette, type Pt, type Look } from './paint'
import { MC, IMG1, PORT, TWO, SIX, THREE, FOUR, LONG, LONG2, IMG, CORRECT, ROUND_NAME, QNO, phaseOf, type StateId, type Img, type Opt } from './content'

export type SceneApi = { tl: gsap.core.Timeline; setTimer: (n: number) => void; dispose?: () => void }
export type Mode = 'quick' | 'full'
type Rect = { x: number; y: number; w: number; h: number }
type Flower = { x: number; y: number; r: number }
type Layout = {
  strands: { pts: Pt[]; w: number }[]; frames: { r: Rect; img: Img }[]; vines: [Pt, Pt][]
  flowers: Flower[]; opts: Opt[]; label: number; labelW: number
  q: { text: string; left: number; top: number; width: number; size: number; align: 'center' | 'left' } | null
  markers: { key: string; x: number; y: number; frame: number }[]
  cells: { word: string; open: number[]; cx: number; cy: number; d: number; gap: number } | null
  phase: { text: string; x: number; y: number } | null
  dand: Pt; ans: { x: number; y: number; w: number; align: 'center' | 'left' } | null
}
const byH = (img: Img, h: number) => Math.round(img.w * h / img.h)
const fit = (img: Img, cx: number, cy: number, mw: number, mh: number): Rect => {
  const k = Math.min(mw / img.w, mh / img.h), w = Math.round(img.w * k), h = Math.round(img.h * k)
  return { x: Math.round(cx - w / 2), y: Math.round(cy - h / 2), w, h }
}
/** Ряд картинок одной высоты (равная важность), по центру cx, с промежутком gap. */
function row(imgs: Img[], h: number, cx: number, y: number, gap: number): Rect[] {
  const ws = imgs.map(i => byH(i, h)), total = ws.reduce((a, b) => a + b, 0) + gap * (imgs.length - 1)
  let x = Math.round(cx - total / 2)
  return ws.map(w => { const r = { x, y, w, h }; x += w + gap; return r })
}
const G = (x: number) => ({ x, y: groundY(x) + 6 })
const DAND_TEXT = { x: 236, y: 610 }   // утверждённый экран текста — место прежнее
const DAND_MEDIA = { x: 206, y: 800 }  // экраны с фото — нижний левый угол, верх экрана отдан фото
const bough = (y: number, x0: number, x1: number): Pt[] => [{ x: x0, y: y + 34 }, { x: x0 + (x1 - x0) * 0.18, y: y + 6 }, { x: x0 + (x1 - x0) * 0.42, y }, { x: x0 + (x1 - x0) * 0.66, y: y + 4 }, { x: x0 + (x1 - x0) * 0.86, y: y + 12 }, { x: x1, y: y + 26 }]
const hang = (r: Rect, from: number): [Pt, Pt][] => [r.x + r.w * 0.2, r.x + r.w * 0.8].map(x => [{ x, y: from }, { x, y: r.y - 10 }] as [Pt, Pt])
/** Опоры от земли к нижним углам кадра — для одиночного большого фото. */
const props = (r: Rect): { pts: Pt[]; w: number }[] => [
  { pts: [G(r.x - 70), { x: r.x - 64, y: (r.y + r.h + groundY(r.x)) / 2 + 20 }, { x: r.x - 30, y: r.y + r.h - 10 }, { x: r.x - 12, y: r.y + r.h * 0.55 }], w: 18 },
  { pts: [G(r.x + r.w + 70), { x: r.x + r.w + 64, y: (r.y + r.h + groundY(r.x + r.w)) / 2 + 20 }, { x: r.x + r.w + 30, y: r.y + r.h - 10 }, { x: r.x + r.w + 12, y: r.y + r.h * 0.55 }], w: 18 },
]
const base: Layout = { strands: [], frames: [], vines: [], flowers: [], opts: [], label: 0, labelW: 280, q: null, markers: [], cells: null, phase: null, dand: DAND_MEDIA, ans: null }
const F4 = [560, 920, 1280, 1640]

function layoutOf(s: StateId): Layout {
  if (s === 'mc') return { ...base, dand: DAND_TEXT, labelW: 270,
    strands: [{ pts: [G(548), { x: 506, y: 760 }, { x: 532, y: 520 }, { x: 630, y: 330 }, { x: 790, y: 212 }, { x: 990, y: 158 }, { x: 1210, y: 150 }], w: 30 },
      { pts: [G(1748), { x: 1788, y: 760 }, { x: 1764, y: 520 }, { x: 1676, y: 330 }, { x: 1526, y: 214 }, { x: 1326, y: 160 }, { x: 1100, y: 154 }], w: 30 }],
    flowers: [735, 1005, 1275, 1545].map(x => ({ x, y: 716, r: 74 })), label: 806,
    q: { text: MC.text, left: 620, top: 318, width: 1060, size: 60, align: 'center' }, opts: MC.options }
  if (s === 'two' || s === 'long2') {
    // два фото одной высоты — равная важность; вопрос сверху, цветы-варианты снизу
    const long = s === 'long2'
    const rs = row([IMG.falcon, IMG.hubble], long ? 470 : 548, 1060, long ? 200 : 112, 48)
    return { ...base, strands: [{ pts: bough(long ? 176 : 92, 280, 1860), w: 16 }], vines: rs.flatMap(r => hang(r, (long ? 182 : 98))),
      frames: [{ r: rs[0], img: IMG.falcon }, { r: rs[1], img: IMG.hubble }],
      flowers: F4.map(x => ({ x, y: long ? 748 : 752, r: 52 })), label: long ? 812 : 818, opts: TWO.options,
      q: long ? { text: LONG2.text, left: 380, top: 26, width: 1440, size: 40, align: 'center' } : { text: TWO.text, left: 380, top: 30, width: 1440, size: 48, align: 'center' } }
  }
  if (s === 'three') {
    // три фото одной высоты в ряд, промежутки шире — в них живут метки А/Б/В
    const imgs = [IMG.coffee, IMG.hubble, IMG.dahlia], rs = row(imgs, 386, 1004, 214, 78)
    return { ...base, strands: [{ pts: bough(168, 60, 1890), w: 16 }], vines: rs.flatMap(r => hang(r, 174)),
      frames: rs.map((r, i) => ({ r, img: imgs[i] })), markers: rs.map((r, i) => ({ key: 'АБВ'[i], x: r.x - 40, y: r.y + r.h / 2, frame: i })),
      q: { text: THREE.text, left: 380, top: 40, width: 1440, size: 48, align: 'center' }, ans: null }
  }
  if (s === 'four') {
    // сетка 2×2: ячейки 712×432, центральная лоза между столбцами держит рамы
    const imgs = [IMG.collins, IMG.falcon, IMG.hubble, IMG.palace]
    const rs = imgs.map((im, i) => fit(im, i % 2 ? 1500 : 760, i < 2 ? 322 : 780, 650, 432))
    return { ...base,
      strands: [{ pts: [G(1130), { x: 1122, y: 760 }, { x: 1136, y: 540 }, { x: 1126, y: 330 }, { x: 1132, y: 110 }], w: 18 }],
      vines: [], frames: rs.map((r, i) => ({ r, img: imgs[i] })), markers: rs.map((r, i) => ({ key: 'АБВГ'[i], x: r.x - 40, y: r.y + r.h / 2, frame: i })),
      q: { text: FOUR.text, left: 380, top: 26, width: 1500, size: 44, align: 'center' } }
  }
  if (s === 'six') {
    // «3 попытки», фаза 1: две большие картинки (у каждой свои пропорции) + клетки слова
    const rs = row([IMG.falcon, IMG.collins], 560, 1060, 58, 56)
    return { ...base, strands: [], vines: rs.flatMap(r => hang(r, -10)), frames: [{ r: rs[0], img: IMG.falcon }, { r: rs[1], img: IMG.collins }],
      cells: { word: SIX.word, open: SIX.open, cx: 1060, cy: 788, d: 112, gap: 22 }, phase: { text: `Фаза ${SIX.phase} из 3`, x: 1060, y: 660 } }
  }
  if (s === 'img1opt') {
    const r = fit(IMG.palace, 1090, 408, 1000, 600)
    return { ...base, strands: props(r), frames: [{ r, img: IMG.palace }], flowers: [700, 960, 1220, 1480].map(x => ({ x, y: 790, r: 50 })), label: 852, opts: IMG1.options,
      q: { text: IMG1.text, left: 440, top: 32, width: 1300, size: 48, align: 'center' } }
  }
  if (s === 'img1open') {
    const r = fit(IMG.palace, 1080, 524, 1260, 812)
    return { ...base, strands: props(r), frames: [{ r, img: IMG.palace }], q: { text: IMG1.text, left: 440, top: 34, width: 1300, size: 50, align: 'center' },
      ans: { x: 1080, y: r.y + r.h + 8, w: 900, align: 'center' } }
  }
  if (s === 'port') {
    const r = fit(IMG.collins, 750, 540, 660, 860)
    return { ...base, strands: [{ pts: bough(70, 260, 1180), w: 16 }], vines: hang(r, 76), frames: [{ r, img: IMG.collins }],
      q: { text: PORT.text, left: 1150, top: 360, width: 680, size: 52, align: 'left' }, ans: { x: 1150, y: 660, w: 680, align: 'left' } }
  }
  if (s === 'long') {
    const r = fit(IMG.palace, 840, 540, 900, 700)
    return { ...base, strands: [{ pts: bough(190, 260, 1330), w: 16 }], vines: hang(r, 196), frames: [{ r, img: IMG.palace }],
      q: { text: LONG.text, left: 1340, top: 300, width: 520, size: 40, align: 'left' }, ans: { x: 1340, y: 700, w: 520, align: 'left' } }
  }
  return base
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
/** Половина рамы: от середины низа вдоль стороны вверх и к середине верха. amp/phase — побеги-близнецы вокруг главного. */
const framePath = (r: Rect, pad: number, side: -1 | 1, amp: number, phase: number, seed: number): Pt[] => {
  const L = r.x - pad, R = r.x + r.w + pad, T = r.y - pad, B = r.y + r.h + pad, mx = (L + R) / 2
  const wob = noise1(seed)
  let c = 0
  const seg = (p: Pt, q: Pt, n: number) => Array.from({ length: n }, (_, i) => {
    const u = i / n, dx = q.x - p.x, dy = q.y - p.y, l = Math.hypot(dx, dy) || 1
    const o = (wob(c * 0.16) - 0.5) * 6 + Math.sin(c * 0.42 + phase) * amp; c++
    return { x: p.x + dx * u - dy / l * o, y: p.y + dy * u + dx / l * o }
  })
  const n = (len: number) => Math.max(8, Math.round(len / 14))
  return side < 0
    ? [...seg({ x: mx, y: B }, { x: L, y: B }, n(mx - L)), ...seg({ x: L, y: B }, { x: L, y: T }, n(B - T)), ...seg({ x: L, y: T }, { x: mx + 14, y: T }, n(mx - L))]
    : [...seg({ x: mx, y: B }, { x: R, y: B }, n(R - mx)), ...seg({ x: R, y: B }, { x: R, y: T }, n(B - T)), ...seg({ x: R, y: T }, { x: mx - 14, y: T }, n(R - mx))]
}
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const ease = (v: number) => { v = clamp01(v); return v * v * (3 - 2 * v) }
const backOut = (v: number) => { v = clamp01(v); const c = 1.7; return 1 + (c + 1) * (v - 1) ** 3 + c * (v - 1) ** 2 }

type Leaf = { i: number; ang: number; len: number; col: string; twig: number }
function leavesFor(line: Pt[], seed: number, look: Look, every: number, outward?: -1 | 1, twigP = 0.28): Leaf[] {
  const r = seeded(seed), out: Leaf[] = []
  for (let i = 4; i < line.length - 1; i += every + Math.floor(r() * 2)) {
    const side = outward ?? (r() < 0.5 ? -1 : 1)
    out.push({ i, ang: (0.55 + r() * 0.75) * side, len: 14 + r() * 20, col: r() < 0.55 ? look.leafLight[Math.floor(r() * 4)] : look.leafDark[Math.floor(r() * 3)], twig: r() < twigP ? 18 + r() * 34 : 0 })
  }
  return out
}
/** Лепестки цветка: у каждого свой разброс длины, ширины, наклона и асимметрии — живой, не штамп. */
type Petal = { a: number; len: number; wid: number; sk: number; curl: number; hue: number }
function petalsFor(seed: number) {
  const r = seeded(seed)
  const ring = (n: number, len: number, wid: number, off: number) => Array.from({ length: n }, (_, k) => ({ a: off + (k / n) * Math.PI * 2 + (r() - 0.5) * 0.18, len: len * (0.88 + r() * 0.24), wid: wid * (0.85 + r() * 0.3), sk: (r() - 0.5) * 0.5, curl: (r() - 0.5) * 0.3, hue: (r() - 0.5) * 14 }))
  return { back: ring(8, 1.06, 0.32, 0.1), mid: ring(7, 0.86, 0.33, 0.1 + Math.PI / 7), cup: ring(5, 0.5, 0.3, 0.4), sep: ring(5, 0.55, 0.16, 0.25) }
}

export function Scene({ state, mode, answer, onReady }: { state: StateId; mode: Mode; answer: boolean; onReady: (a: SceneApi) => void }) {
  const look = LOOKS.C
  const root = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLCanvasElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  const L = useMemo(() => layoutOf(state), [state])
  const corr = CORRECT[state]
  useLayoutEffect(() => {
    const el = root.current!, ctx = cvRef.current!.getContext('2d')!
    const q = gsap.utils.selector(root)
    const back = paintBack(look), mids = paintMids(look), ground = paintGround(look), front = paintFront(look)
    const mistFar = paintMist(0.07, 560, 300, 5), mistNear = paintMist(0.10, 840, 260, 9)
    const vign = paintVignette(0.5)
    const imgs = L.frames.map(f => { const i = new Image(); i.src = f.img.src; return i })
    // дымка под содержимым: растушёванное пятно по границам вопроса, фото и вариантов — один раз
    const haze = (() => {
      const c = mk(W / 4, H / 4), x = c.getContext('2d')!; x.filter = 'blur(14px)'; x.fillStyle = 'rgba(2,16,13,1)'
      const box = (r: Rect, pad: number) => x.fillRect((r.x - pad) / 4, (r.y - pad) / 4, (r.w + pad * 2) / 4, (r.h + pad * 2) / 4)
      L.frames.forEach(f => box(f.r, 40))
      if (L.q) box({ x: L.q.left, y: L.q.top, w: L.q.width, h: L.q.size * 1.2 * Math.ceil(L.q.text.length * L.q.size * 0.5 / L.q.width) }, 30)
      if (L.flowers.length && state !== 'mc') box({ x: L.flowers[0].x - 150, y: L.flowers[0].y - 60, w: L.flowers[L.flowers.length - 1].x - L.flowers[0].x + 300, h: 200 }, 20)
      if (L.cells) box({ x: L.cells.cx - 420, y: L.cells.cy - 120, w: 840, h: 190 }, 20)
      return c
    })()
    const foliage = (() => { const c = mk(420, 420), x = c.getContext('2d')!, r = seeded(66); x.fillStyle = '#0a211b'; x.fillRect(0, 0, 420, 420)
      for (let i = 0; i < 900; i++) { const px = r() * 420, py = r() * 420, len = 16 + r() * 22, a = r() * 6.3, col = r() < 0.5 ? look.leafLight[i % 4] : look.leafDark[i % 3]
        for (const [ox, oy] of [[0, 0], [420, 0], [-420, 0], [0, 420], [0, -420]]) { x.save(); x.translate(px + ox, py + oy); x.rotate(a); x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(len * 0.25, -len * 0.32, len * 0.7, -len * 0.3, len, 0); x.bezierCurveTo(len * 0.7, len * 0.3, len * 0.25, len * 0.32, 0, 0); x.fillStyle = col; x.fill(); x.restore() } }
      return c })()
    const folPat = ctx.createPattern(foliage, 'repeat')!
    const SRC = { x: 260, y: 960 }
    type Glow = { x: number; y: number; r: number; d: number; f: number }
    const glowsMid: Glow[] = [], glowsFront: Glow[] = []
    const rg = seeded(71)
    const addRoot = (to: Glow[], pts: Pt[], k: number) => pts.forEach((p, i) => { if (i % 2 === 0) to.push({ x: p.x, y: p.y - 2, r: (9 - i * 0.4) * k + 3, d: Math.hypot(p.x - SRC.x, p.y - SRC.y), f: rg() * 10 }) })
    front.roots.forEach(p => addRoot(glowsFront, p, 1.4)); mids.forEach(m => m.roots.forEach(p => addRoot(glowsMid, p, 0.7)))
    for (let i = 0; i < 90; i++) { const x = 360 + rg() * 1520, y = groundY(x) + 8 + rg() * 50; glowsMid.push({ x, y, r: 4 + rg() * 8, d: Math.hypot(x - SRC.x, y - SRC.y), f: rg() * 10 }) }
    ground.mush.forEach(m => glowsMid.push({ x: m.x, y: m.y, r: m.r * 1.8, d: Math.hypot(m.x - SRC.x, m.y - SRC.y), f: rg() * 10 }))
    const spr = (rgb: string, k = 0.3) => { const c = mk(64, 64), x = c.getContext('2d')!, g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, `rgba(${rgb},1)`); g.addColorStop(k, `rgba(${rgb},.35)`); g.addColorStop(1, `rgba(${rgb},0)`); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return c }
    const glowSpr = spr('150,250,222'), flySpr = spr('255,214,130', 0.18), warmSpr = spr('255,226,160', 0.25)
    // ветви, лианы, рамы
    const lines = L.strands.map(s => spline(s.pts, 170))
    const wraps = lines.map(ln => ln.map((p, i) => { const q2 = ln[Math.min(ln.length - 1, i + 1)], p0 = ln[Math.max(0, i - 1)], dx = q2.x - p0.x, dy = q2.y - p0.y, l = Math.hypot(dx, dy) || 1; const o = Math.sin(i * 0.33) * 7; return { x: p.x - dy / l * o, y: p.y + dx / l * o } }))
    const lineLeaves = lines.map((ln, k) => leavesFor(ln, 300 + k, look, 4))
    // рама — три переплетённых побега на каждую сторону: главный, близнец, тонкий усик
    const halves = L.frames.flatMap((f, k) => ([-1, 1] as const).map(side => ({ k, side,
      main: framePath(f.r, 11, side, 1.5, 0, 40 + k * 7 + side), twin: framePath(f.r, 11, side, 4.5, 1.6, 41 + k * 7 + side), thin: framePath(f.r, 12, side, 6, 3.4, 42 + k * 7 + side) })))
    const halfLeaves = halves.map((h, j) => leavesFor(h.main, 400 + j, look, 9, h.side < 0 ? -1 : 1, 0.12))
    const media = L.frames.map(f => ({ x: f.r.x - 34, y: f.r.y - 34, w: f.r.w + 68, h: f.r.h + 68 }))
    const petals = L.flowers.map((_, i) => petalsFor(900 + i)), mPetals = L.markers.map((_, i) => petalsFor(950 + i))
    // светлячки
    const rf = seeded(91), nzf = noise1(3)
    const homes = [{ x: 470, y: 880, n: 7 }, { x: 700, y: 860, n: 5 }, { x: 1220, y: 880, n: 6 }, { x: 1700, y: 870, n: 7 }, { x: 900, y: 420, n: 5 }, { x: 1500, y: 380, n: 6 }, { x: 1120, y: 620, n: 4 }]
    const flies = homes.flatMap(h => Array.from({ length: h.n }, () => ({ hx: h.x + (rf() - 0.5) * 160, hy: h.y + (rf() - 0.5) * 120, rad: 40 + rf() * 110, sp: 0.08 + rf() * 0.18, ph: rf() * 100, per: 2.2 + rf() * 2.6, dur: 0.25 + rf() * 0.3, s: 0.7 + rf() * 0.7, perch: rf(), rest: rf() < 0.25 })))
    const perchLine = lines.length ? lines.flat() : null
    // ответ: куда бежит свет
    const tgtFlower = corr.key ? L.opts.findIndex(o => o.key === corr.key) : -1
    const tgtMarker = corr.key ? L.markers.findIndex(m => m.key === corr.key) : -1
    const tgtFrame = tgtMarker >= 0 ? L.markers[tgtMarker].frame : -1
    const ansPath: Pt[] = (() => {
      let tx = -1, ty = 0
      if (tgtFlower >= 0) { tx = L.flowers[tgtFlower].x; ty = L.flowers[tgtFlower].y + L.flowers[tgtFlower].r * 0.4 }
      else if (tgtFrame >= 0) { const r = L.frames[tgtFrame].r; tx = r.x + r.w / 2; ty = r.y + r.h + 12 }
      if (tx < 0) return []
      const out: Pt[] = []
      for (let i = 0; i <= 60; i++) { const x = SRC.x + (tx - SRC.x) * (i / 60); out.push({ x, y: groundY(x) + 10 }) }
      const gy = groundY(tx) + 10
      for (let i = 1; i <= 30; i++) out.push({ x: tx + Math.sin(i * 0.5) * 3, y: gy + (ty - gy) * (i / 30) })
      return out
    })()
    // ── состояние
    const full = mode === 'full'
    const cx0 = L.frames.length ? L.frames.reduce((a, f) => a + f.r.x + f.r.w / 2, 0) / L.frames.length : 1150
    const st = {
      camX: full ? 30 : 0, camZ: full ? 1.07 : 1, hush: 0, wave: 0, after: full ? 0 : 0.55, sync: 0, bend: full ? 0 : 0.72, sway: 1, part: full ? 0 : 1, light: full ? 0 : 1,
      grow: lines.map(() => 0), energy: 0, frame: halves.map(() => 0), fpulse: 0, gather: 0, focus: 0, reveal: L.frames.map(() => 0), vine: 0,
      fl: L.flowers.map(() => ({ g: 0, b: 0 })), mk: L.markers.map(() => 0), cells: 0, flip: 0, dand: 0, n: 30, bloomArch: 0,
      ans: 0, hit: 0,
    }
    const gone: number[] = []
    let lastN = 30
    const dirs = mids.map(m => (m.x < cx0 ? -1 : 1))
    const midC = mk(), mctx = midC.getContext('2d')!
    let midKey = ''
    const K = { back: 0.25, ground: 0.6, mist: 0.8, front: 1.1 }
    const tf = (k: number) => { ctx.setTransform(st.camZ, 0, 0, st.camZ, (1 - st.camZ) * W / 2 + st.camX * k, (1 - st.camZ) * H / 2) }

    const leafPath = (len: number, w: number) => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(len * 0.25, -len * w, len * 0.7, -len * w * 0.9, len, 0); ctx.bezierCurveTo(len * 0.7, len * w * 0.9, len * 0.25, len * w, 0, 0) }
    const drawLine = (ln: Pt[], wr: Pt[] | null, g: number, w0: number, leaves: Leaf[], t: number, still = false, glowK = 0) => {
      const n = Math.floor(g * (ln.length - 1)); if (n < 1) return
      const sway = (i: number) => still ? 0 : Math.sin(t * 0.9 + i * 0.05) * 1.4 * st.sway * (i / ln.length)
      const seg = (pts: Pt[], wk: number, col: string, dx = 0, dy = 0) => {
        ctx.strokeStyle = col; ctx.lineCap = 'round'
        const m = Math.min(n, pts.length - 1)
        for (let i = 0; i < m; i++) { const tip = Math.min(1, (n - i) / 14); ctx.lineWidth = Math.max(1, (w0 * (1 - i / ln.length * 0.6)) * wk * (0.35 + 0.65 * tip)); ctx.beginPath(); ctx.moveTo(pts[i].x + dx + sway(i), pts[i].y + dy); ctx.lineTo(pts[i + 1].x + dx + sway(i + 1), pts[i + 1].y + dy); ctx.stroke() }
      }
      seg(ln, 1.14, '#050d0a', 0, 3); seg(ln, 1, look.bark[1]); seg(ln, 0.55, '#4a3a2a', 0, -w0 * 0.14); seg(ln, 0.16, glowK ? `rgba(200,255,230,${0.5 + glowK * 0.5})` : '#8fd3b4', 1, -w0 * 0.32)
      if (wr && g > 0.2) seg(wr.slice(0, Math.max(2, Math.floor(n * 0.92))), 0.34, '#2d4a33')
      for (const lf of leaves) {
        if (lf.i >= n) continue
        const u = ease((n - lf.i) / 12), p = ln[lf.i], p2 = ln[lf.i + 1], a = Math.atan2(p2.y - p.y, p2.x - p.x) + lf.ang
        const px = p.x + sway(lf.i), py = p.y
        let bx = px, by = py
        if (lf.twig) { bx = px + Math.cos(a) * lf.twig * u; by = py + Math.sin(a) * lf.twig * u; ctx.strokeStyle = look.bark[1]; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo((px + bx) / 2 + 4, (py + by) / 2 - 3, bx, by); ctx.stroke() }
        const w = Math.floor(lf.len * 7.3) % 3 === 2 ? 0.42 : 0.28
        ctx.save(); ctx.translate(bx, by); ctx.rotate(a + (still ? 0 : Math.sin(t * 1.3 + lf.i) * 0.07 * st.sway)); ctx.scale(u, u)
        leafPath(lf.len, w); ctx.fillStyle = lf.col; ctx.fill()
        ctx.strokeStyle = 'rgba(200,255,230,.13)'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(lf.len * 0.8, 0); ctx.stroke()
        if (glowK) { ctx.fillStyle = `rgba(180,255,220,${0.25 * glowK})`; leafPath(lf.len, w); ctx.fill() }
        ctx.restore()
        if (!still && lf.twig && lf.i % 3 === 0 && st.bloomArch > 0) {
          const bu = ease((st.bloomArch - (lf.i / ln.length) * 0.6) * 3); if (bu > 0) {
            for (let k = 0; k < 5; k++) { const a2 = k * 1.2566 + lf.i; ctx.fillStyle = 'rgba(232,222,255,.92)'; ctx.beginPath(); ctx.ellipse(bx + Math.cos(a2) * 5 * bu, by + Math.sin(a2) * 5 * bu, 5 * bu, 3 * bu, a2, 0, 6.3); ctx.fill() }
            ctx.fillStyle = '#ffd56b'; ctx.beginPath(); ctx.arc(bx, by, 2.4 * bu, 0, 6.3); ctx.fill()
          }
        }
      }
    }
    const drawPulse = (ln: Pt[], e: number, size = 18, spr0 = glowSpr) => {
      if (e <= 0 || e >= 1.15 || ln.length < 2) return
      const head = Math.floor(clamp01(e) * (ln.length - 1)), fade = e > 1 ? 1 - (e - 1) / 0.15 : 1
      ctx.globalCompositeOperation = 'lighter'
      for (let k = 0; k < 26; k++) { const i = head - k; if (i < 0) break; const p = ln[i], s = (size - k * size / 32) * (k === 0 ? 1.6 : 1); ctx.globalAlpha = 0.75 * (1 - k / 26) * fade; ctx.drawImage(spr0, p.x - s, p.y - s, s * 2, s * 2) }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
    }
    /** Цветок: чашелистики, три круга лепестков (задний тёмный, средний, внутренняя чаша), тычинки, отражённый свет. */
    const drawBloom = (hx: number, hy: number, r: number, open: number, P: ReturnType<typeof petalsFor>, mood: number, t: number, coreK = 0.44) => {
      // mood: 1 — правильный (раскрыт шире, тёплое свечение), отрицательный — притих (лепестки прикрыты, тусклее)
      const op = Math.max(0, open * (mood < 0 ? 1 + mood * 0.28 : 1 + mood * 0.1))
      if (mood > 0) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.55 * mood; ctx.drawImage(warmSpr, hx - r * 2.2, hy - r * 2.2, r * 4.4, r * 4.4); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over' }
      ctx.save(); if (mood < 0) ctx.globalAlpha = 1 + mood * 0.4
      const petal = (p: Petal, len: number, wid: number, c0: string, c1: string, c2: string, rim: boolean) => {
        const ang = -Math.PI / 2 + (p.a + Math.PI / 2) * op, l = len * p.len * (0.35 + 0.65 * Math.min(1, op)), w = wid * p.wid
        ctx.save(); ctx.translate(hx, hy); ctx.rotate(ang + p.curl * 0.3)
        const g = ctx.createLinearGradient(0, 0, l, 0); g.addColorStop(0, c0); g.addColorStop(0.55, c1); g.addColorStop(1, c2)
        ctx.beginPath(); ctx.moveTo(0, 0)
        ctx.bezierCurveTo(l * 0.24, -w * (1 + p.sk), l * 0.8, -w * (0.95 + p.sk) + p.curl * w, l, -w * 0.12)
        ctx.quadraticCurveTo(l * 1.02, 0, l * 0.97, w * 0.1)
        ctx.bezierCurveTo(l * 0.8, w * (0.95 - p.sk) + p.curl * w, l * 0.24, w * (1 - p.sk), 0, 0)
        ctx.fillStyle = g; ctx.fill()
        ctx.strokeStyle = 'rgba(24,8,52,.4)'; ctx.lineWidth = 0.9; ctx.stroke()
        ctx.strokeStyle = 'rgba(255,255,255,.16)'; ctx.lineWidth = 0.8
        for (const v of [-0.35, 0, 0.35]) { ctx.beginPath(); ctx.moveTo(l * 0.1, 0); ctx.quadraticCurveTo(l * 0.5, w * v * 0.7, l * 0.85, w * v * 0.9); ctx.stroke() }
        // лунный свет сверху справа: светлая кромка у лепестков, смотрящих туда
        if (rim) { const facing = Math.cos(ang - (-Math.PI / 4)); if (facing > 0.2) { ctx.strokeStyle = `rgba(214,255,240,${0.4 * facing})`; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(l * 0.3, -w * 0.9); ctx.bezierCurveTo(l * 0.6, -w * 1.02, l * 0.85, -w * 0.8, l, -w * 0.12); ctx.stroke() } }
        ctx.restore()
      }
      for (const p of P.sep) petal(p, r * 1.0, r * 0.62, '#1f4a33', '#2f6a49', '#4f8f69', false)
      for (const p of P.back) petal(p, r, r, `hsl(${262 + p.hue},48%,16%)`, `hsl(${262 + p.hue},42%,36%)`, `hsl(${258 + p.hue},52%,62%)`, true)
      for (const p of P.mid) petal(p, r, r, `hsl(${264 + p.hue},46%,30%)`, `hsl(${262 + p.hue},50%,56%)`, `hsl(${256 + p.hue},70%,86%)`, true)
      for (const p of P.cup) petal(p, r, r, `hsl(${268 + p.hue},44%,48%)`, `hsl(${262 + p.hue},62%,76%)`, `hsl(${255 + p.hue},90%,95%)`, false)
      // отражённый свет снизу и сердцевина с тычинками
      const cr = r * coreK * clamp01(open * 1.4)
      if (cr > 1) {
        ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.25; ctx.drawImage(glowSpr, hx - r, hy - r * 0.4, r * 2, r * 1.4); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
        ctx.strokeStyle = 'rgba(255,236,170,.8)'; ctx.lineWidth = 1
        for (let k = 0; k < 16; k++) { const a = (k / 16) * 6.283 + 0.2, l1 = cr * 0.9, l2 = cr * (1.28 + (k % 3) * 0.08); ctx.beginPath(); ctx.moveTo(hx + Math.cos(a) * l1, hy + Math.sin(a) * l1); ctx.lineTo(hx + Math.cos(a) * l2, hy + Math.sin(a) * l2); ctx.stroke(); ctx.fillStyle = '#ffe9a0'; ctx.beginPath(); ctx.arc(hx + Math.cos(a) * l2, hy + Math.sin(a) * l2, Math.max(1.3, r * 0.03), 0, 6.3); ctx.fill() }
        const g = ctx.createRadialGradient(hx - cr * 0.3, hy - cr * 0.35, 1, hx, hy, cr); g.addColorStop(0, '#fff5cc'); g.addColorStop(0.65, '#efbf54'); g.addColorStop(1, '#9c6820')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hx, hy, cr, 0, 6.3); ctx.fill()
        ctx.strokeStyle = 'rgba(80,40,10,.35)'; ctx.lineWidth = 1.5; ctx.stroke()
      }
      ctx.restore()
      if (mood > 0.2) { ctx.globalCompositeOperation = 'lighter'; for (let k = 0; k < 7; k++) { const ph = (t * 0.35 + k / 7) % 1, x = hx + Math.sin(k * 2.1 + t) * r * 0.9, y = hy - r * 0.4 - ph * r * 1.6; ctx.globalAlpha = mood * (1 - ph) * 0.8; ctx.drawImage(warmSpr, x - 5, y - 5, 10, 10) } ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over' }
    }
    const drawFlower = (f: Flower, gr: number, bl: number, i: number, t: number, mood: number) => {
      if (gr <= 0) return
      const gy = groundY(f.x) + 8, top = f.y + 2
      if (bl > 0 && bl < 1) { ctx.strokeStyle = `rgba(150,255,225,${0.4 * (1 - bl)})`; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(f.x, gy + 4, 30 + bl * 150, 8 + bl * 30, 0, 0, 6.3); ctx.stroke() }
      const sw = Math.sin(t * 0.7 + i * 1.7) * 1.6 * st.sway
      const pts: Pt[] = []
      for (let k = 0; k <= 30; k++) { const u = k / 30; pts.push({ x: f.x + Math.sin(u * 5 + i * 1.3) * 7 * (1 - u) + sw * u * u, y: gy - (gy - top) * u }) }
      const n = Math.max(1, Math.floor(ease(gr) * 30))
      // стебель — сужающийся, с бликом
      ctx.fillStyle = '#356b4a'; ctx.beginPath()
      for (let k = 0; k <= n; k++) { const w = 4.2 - 1.8 * k / 30; if (k) ctx.lineTo(pts[k].x - w, pts[k].y); else ctx.moveTo(pts[k].x - w, pts[k].y) }
      for (let k = n; k >= 0; k--) { const w = 4.2 - 1.8 * k / 30; ctx.lineTo(pts[k].x + w, pts[k].y) }
      ctx.fill(); ctx.strokeStyle = 'rgba(170,240,200,.35)'; ctx.lineWidth = 1.2; ctx.beginPath(); for (let k = 0; k <= n; k++) { if (k) ctx.lineTo(pts[k].x + 2, pts[k].y); else ctx.moveTo(pts[k].x + 2, pts[k].y) } ctx.stroke()
      const lu = ease((gr - 0.4) * 2.6)
      if (lu > 0) for (const [s, at, ll] of [[-1, 9, f.r * 0.75], [1, 14, f.r * 0.62]] as const) {
        const p = pts[Math.min(n, at)]
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(s > 0 ? -0.55 - 0.5 * (1 - lu) : Math.PI + 0.55 + 0.5 * (1 - lu)); ctx.scale(lu, lu)
        const g = ctx.createLinearGradient(0, -ll * 0.3, 0, ll * 0.3); g.addColorStop(0, '#4f9a70'); g.addColorStop(1, '#22533a')
        leafPath(ll, 0.32); ctx.fillStyle = g; ctx.fill()
        ctx.strokeStyle = 'rgba(200,255,220,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(ll * 0.86, 0); ctx.stroke()
        for (let v = 1; v < 4; v++) { ctx.beginPath(); ctx.moveTo(ll * v * 0.2, 0); ctx.lineTo(ll * (v * 0.2 + 0.12), -ll * 0.16); ctx.moveTo(ll * v * 0.2, 0); ctx.lineTo(ll * (v * 0.2 + 0.12), ll * 0.16); ctx.stroke() }
        ctx.restore()
      }
      if (gr < 1) return
      drawBloom(pts[n].x, pts[n].y - 2, f.r, Math.min(1.08, backOut(bl)), petals[i], mood, t)
    }
    const drawDand = (p: Pt, g: number, t: number) => {
      if (g <= 0) return
      const R = 118, gy = groundY(p.x) + 30, ph = phaseOf(st.n), zero = ph === 'zero', n0 = ease(g)
      const droop = zero ? 1 : 0
      const hx = p.x + droop * 10, hy = p.y + droop * 16
      ctx.strokeStyle = '#5f9b78'; ctx.lineWidth = 6; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(p.x, gy); ctx.quadraticCurveTo(p.x + 16 + droop * 20, gy - (gy - hy - 70) * 0.5 * n0, hx + Math.sin(t * 0.7) * 1.5 * st.sway, gy - (gy - hy - 70) * n0); ctx.stroke()
      ctx.strokeStyle = 'rgba(190,255,220,.3)'; ctx.lineWidth = 1.5; ctx.stroke()
      if (g < 1) return
      // подсветка сзади — семена читаются на тёмном стволе
      const bg = ctx.createRadialGradient(hx, hy, R * 0.5, hx, hy, R * 1.55); bg.addColorStop(0, `rgba(110,210,185,${zero ? 0.06 : 0.2})`); bg.addColorStop(1, 'rgba(110,210,185,0)')
      ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(hx, hy, R * 1.55, 0, 6.3); ctx.fill()
      const warn = ph === 'warning' ? 1 : 0
      for (let i = 0; i < 30; i++) {
        const a = -Math.PI / 2 + (i / 30) * Math.PI * 2 + (warn ? Math.sin(t * 7 + i * 1.9) * 0.025 * (1 + (10 - st.n) * 0.12) : 0)
        let x0 = hx, y0 = hy, al = 1, rot = 0
        if (i >= st.n) { const at = gone[i]; if (at === undefined) continue; const age = t - at; if (age > 3 || age < 0) continue; x0 += age * 80 + Math.sin(age * 2.4 + i) * 14; y0 -= age * 56 + age * age * 6; al = 1 - age / 3; rot = age * 0.6 }
        const aa = a + rot, lean = warn ? 0.18 : 0, ex = x0 + Math.cos(aa) * R, ey = y0 + Math.sin(aa) * R
        ctx.globalAlpha = al
        ctx.fillStyle = '#5a4a32'; ctx.beginPath(); ctx.ellipse(x0 + Math.cos(aa) * 76, y0 + Math.sin(aa) * 76, 5, 2, aa, 0, 6.3); ctx.fill()
        ctx.strokeStyle = 'rgba(225,255,245,.55)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0 + Math.cos(aa) * 80, y0 + Math.sin(aa) * 80); ctx.lineTo(ex, ey); ctx.stroke()
        const col = warn ? '255,206,130' : zero ? '140,170,160' : '236,255,248'
        ctx.strokeStyle = `rgba(${col},.9)`; ctx.lineWidth = 1.2
        for (let k = -4; k <= 4; k++) { const b = aa + lean + k * 0.11; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.quadraticCurveTo(ex + Math.cos(b) * 10, ey + Math.sin(b) * 10 - 2, ex + Math.cos(b) * 18, ey + Math.sin(b) * 18); ctx.stroke() }
        ctx.globalAlpha = 1
      }
      // сердцевина под число
      const core = ctx.createRadialGradient(hx, hy, 30, hx, hy, 74); core.addColorStop(0, 'rgba(3,16,13,.92)'); core.addColorStop(0.8, 'rgba(3,16,13,.8)'); core.addColorStop(1, 'rgba(3,16,13,0)')
      ctx.fillStyle = core; ctx.beginPath(); ctx.arc(hx, hy, 74, 0, 6.3); ctx.fill()
      if (zero) { ctx.fillStyle = 'rgba(160,190,175,.25)'; for (let k = 0; k < 40; k++) { const a = k * 2.4, d = Math.sqrt(k / 40) * 46; ctx.beginPath(); ctx.arc(hx + Math.cos(a) * d, hy + Math.sin(a) * d, 1.6, 0, 6.3); ctx.fill() } }
      const el2 = q('.ft')[0] as HTMLElement | undefined; if (el2) el2.style.transform = `translate(${hx - p.x}px, ${hy - p.y}px)`
    }
    /** Спилы ветки — клетки слова «3 попыток». flip: переворот спила при показе ответа. */
    const drawCells = (c: NonNullable<Layout['cells']>, g: number, flip: number) => {
      const n = c.word.length, x0 = c.cx - ((n - 1) * (c.d + c.gap)) / 2
      // мшистое ложе под спилами
      const bed = ctx.createRadialGradient(c.cx, c.cy + c.d * 0.5, 20, c.cx, c.cy + c.d * 0.5, (n * (c.d + c.gap)) * 0.6); bed.addColorStop(0, `rgba(30,70,50,${0.5 * clamp01(g * 2)})`); bed.addColorStop(1, 'rgba(30,70,50,0)')
      ctx.fillStyle = bed; ctx.beginPath(); ctx.ellipse(c.cx, c.cy + c.d * 0.5, n * (c.d + c.gap) * 0.6, c.d * 0.5, 0, 0, 6.3); ctx.fill()
      for (let i = 0; i < n; i++) {
        const u = backOut((g * 1.6 - i * 0.1)); if (u <= 0) continue
        const fp = clamp01(flip * (n + 2) / 2 - i * 0.5), sx = Math.abs(Math.cos(fp * Math.PI)) || 0.02
        const x = x0 + i * (c.d + c.gap), y = c.cy, R = (c.d / 2) * u, rr = seeded(5 + i)
        ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.beginPath(); ctx.ellipse(x + 4, y + R * 0.92, R * 0.95 * sx, R * 0.22, 0, 0, 6.3); ctx.fill()
        ctx.save(); ctx.translate(x, y); ctx.scale(sx, 1)
        ctx.fillStyle = '#22150b'; ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.3); ctx.fill()
        for (let k = 0; k < 18; k++) { const a = k * 0.35 + rr(); ctx.strokeStyle = 'rgba(70,46,24,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, R * 0.95, a, a + 0.18); ctx.stroke() }
        const g2 = ctx.createRadialGradient(-R * 0.2, -R * 0.25, 2, 0, 0, R * 0.86); g2.addColorStop(0, '#a47c4c'); g2.addColorStop(0.6, '#77542f'); g2.addColorStop(1, '#4a311b')
        ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(0, 0, R * 0.86, 0, 6.3); ctx.fill()
        ctx.strokeStyle = 'rgba(40,22,10,.32)'; ctx.lineWidth = 1.2
        for (let k = 1; k < 8; k++) { const rk = R * 0.84 * (k / 8) ** 0.8; ctx.beginPath(); ctx.ellipse((rr() - 0.5) * 3, (rr() - 0.5) * 3, rk, rk * (0.94 + rr() * 0.06), rr(), 0, 6.3); ctx.stroke() }
        ctx.strokeStyle = 'rgba(170,240,210,.28)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, R * 0.97, Math.PI * 1.1, Math.PI * 1.75); ctx.stroke()
        if (fp > 0.5) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.3 * (1 - Math.abs(fp - 0.75) * 2); ctx.drawImage(warmSpr, -R, -R, R * 2, R * 2); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over' }
        ctx.restore()
      }
      q('.fc').forEach((e, i) => { const fp = clamp01(flip * (n + 2) / 2 - i * 0.5); (e as HTMLElement).style.transform = `scaleX(${Math.abs(Math.cos(fp * Math.PI)) || 0.02})`; (e as HTMLElement).classList.toggle('is-flipped', fp > 0.5) })
    }
    const drawFrame = (j: number, t: number) => {
      const h = halves[j], g = st.frame[j]; if (g <= 0) return
      const hot = h.k === tgtFrame ? st.hit : 0, cold = tgtFrame >= 0 && h.k !== tgtFrame ? st.hit : 0
      ctx.save(); if (cold) ctx.globalAlpha = 1 - cold * 0.35
      drawLine(h.thin, null, clamp01(g * 1.1 - 0.1), 3, [], t, true)
      drawLine(h.twin, null, clamp01(g * 1.05 - 0.05), 6, [], t, true)
      drawLine(h.main, null, g, 10, halfLeaves[j], t, true, hot)
      ctx.restore()
      // узлы на углах, где побеги перехлёстываются, — появляются, когда рама сомкнулась
      if (g > 0.95 && h.side < 0) {
        const r = L.frames[h.k].r, k2 = ease((Math.min(st.frame[j], st.frame[j + 1]) - 0.95) * 20)
        for (const [x, y] of [[r.x - 11, r.y - 11], [r.x + r.w + 11, r.y - 11], [r.x - 11, r.y + r.h + 11], [r.x + r.w + 11, r.y + r.h + 11]]) {
          ctx.fillStyle = look.bark[1]; ctx.beginPath(); ctx.ellipse(x, y, 10 * k2, 8 * k2, 0.6, 0, 6.3); ctx.fill()
          ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.strokeStyle = 'rgba(143,211,180,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, 6 * k2, 3.6, 5.2); ctx.stroke()
        }
        if (hot) { const rr = seeded(77 + h.k); for (let k = 0; k < 14; k++) { // правильная рама зацветает
          const side = k % 4, u = rr(), x = side === 0 ? r.x + u * r.w : side === 1 ? r.x + r.w + 12 : side === 2 ? r.x + u * r.w : r.x - 12, y = side === 0 ? r.y - 12 : side === 2 ? r.y + r.h + 12 : r.y + u * r.h
          const bu = ease(hot * 2 - k / 14); if (bu <= 0) continue
          for (let p = 0; p < 5; p++) { const a2 = p * 1.2566 + k; ctx.fillStyle = 'rgba(240,232,255,.95)'; ctx.beginPath(); ctx.ellipse(x + Math.cos(a2) * 6 * bu, y + Math.sin(a2) * 6 * bu, 6 * bu, 3.5 * bu, a2, 0, 6.3); ctx.fill() }
          ctx.fillStyle = '#ffd56b'; ctx.beginPath(); ctx.arc(x, y, 3 * bu, 0, 6.3); ctx.fill()
        } }
      }
    }

    const inMedia = (x: number, y: number) => media.find(m => x > m.x && x < m.x + m.w && y > m.y && y < m.y + m.h)
    const draw = () => {
      const t = gsap.ticker.time
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H)
      tf(K.back); ctx.drawImage(back, 0, 0)
      if (st.light > 0) { const g = ctx.createRadialGradient(1240, 40, 0, 1240, 40, 900); g.addColorStop(0, `rgba(160,255,230,${0.2 * st.light})`); g.addColorStop(1, 'rgba(160,255,230,0)'); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over' }
      const mf = (t * 6) % W; ctx.globalAlpha = 0.9; ctx.drawImage(mistFar.cv, -mf, mistFar.y0); ctx.globalAlpha = 1
      // деревья гнутся полосами от корня (основание неподвижно) и расходятся ОТ содержимого
      const angs = mids.map((_, i) => Math.round(((st.bend * 0.2 * dirs[i]) + Math.sin(t * 0.5 + i * 1.3) * 0.005 * st.sway) * 2000) / 2000)
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
      if (st.part > 0) {
        for (const side of [-1, 1]) {
          ctx.save(); ctx.beginPath(); ctx.moveTo(side < 0 ? -200 : W + 200, -10)
          for (let y = -10; y <= 330; y += 30) ctx.lineTo(1150 + Math.sin(y * 0.05) * 60 + Math.sin(y * 0.13) * 30, y)
          ctx.lineTo(side < 0 ? -200 : W + 200, 330); ctx.closePath(); ctx.clip()
          ctx.drawImage(front.canopy, side * st.part * 110, -st.part * 40); ctx.restore()
        }
      } else ctx.drawImage(front.canopy, 0, 0)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.drawImage(vign, 0, 0)
      // дымка ПОД содержимым: ветки за фото и текстом теряют контраст, края леса остаются богатыми
      if (st.focus > 0) { ctx.globalAlpha = 0.62 * st.focus; ctx.drawImage(haze, 0, 0, W, H); ctx.globalAlpha = 1 }
      // ── содержимое
      lines.forEach((ln, k) => { drawLine(ln, wraps[k], st.grow[k], L.strands[k].w, lineLeaves[k], t); drawPulse(ln, st.energy - k * 0.08) })
      L.vines.forEach(([a, b], i) => {
        const u = ease(st.vine * 1.3 - (i % 4) * 0.08); if (u <= 0) return
        const by = a.y + (b.y - a.y) * u
        ctx.strokeStyle = '#2f5a40'; ctx.lineWidth = 3.2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.bezierCurveTo(a.x + 7, a.y + (by - a.y) * 0.3, a.x - 7, a.y + (by - a.y) * 0.7, a.x, by); ctx.stroke()
        ctx.strokeStyle = 'rgba(160,230,190,.3)'; ctx.lineWidth = 1; ctx.stroke()
        for (let y = a.y + 20; y < by - 6; y += 26) { const s = ((y / 26) | 0) % 2 ? 1 : -1; ctx.save(); ctx.translate(a.x, y); ctx.rotate(s * 0.7); leafPath(13, 0.36); ctx.fillStyle = look.leafLight[((y / 26) | 0) % 4]; ctx.fill(); ctx.restore() }
      })
      // фото: тень, снимок без фильтров, раскрытие живым краем
      L.frames.forEach((f, k) => {
        const r = f.r, im = imgs[k], rv = clamp01(st.reveal[k])
        const fr = Math.min(st.frame[k * 2], st.frame[k * 2 + 1])
        if (fr > 0.6) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.75)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10; ctx.fillStyle = '#071410'; ctx.globalAlpha = clamp01((fr - 0.6) * 2.5); ctx.fillRect(r.x, r.y, r.w, r.h); ctx.restore() }
        if (fr <= 0.6) return
        const cx = r.x + r.w / 2, cy = r.y + r.h / 2, Rm = Math.hypot(r.w, r.h) / 2 * 1.12, R = rv * Rm
        const blob = (fresh = true) => { if (fresh) ctx.beginPath(); for (let i = 0; i <= 64; i++) { const a = (i / 64) * Math.PI * 2, rr = R * (1 + 0.09 * Math.sin(a * 5 + k * 2) + 0.05 * Math.sin(a * 9 + 1)); if (i) ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); else ctx.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) } ctx.closePath() }
        ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip()
        if (rv > 0 && im.complete && im.naturalWidth) { if (rv < 1) { ctx.save(); blob(); ctx.clip(); ctx.drawImage(im, r.x, r.y, r.w, r.h); ctx.restore() } else ctx.drawImage(im, r.x, r.y, r.w, r.h) }
        if (rv < 1) {
          ctx.save(); ctx.globalAlpha = clamp01((fr - 0.6) * 2.5); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); if (rv > 0) blob(false); ctx.fillStyle = folPat; ctx.fill('evenodd'); ctx.restore()
          if (rv > 0) { ctx.save(); blob(); ctx.strokeStyle = `rgba(170,255,225,${0.7 * (1 - rv)})`; ctx.lineWidth = 3; ctx.shadowColor = 'rgba(120,255,210,.8)'; ctx.shadowBlur = 14; ctx.stroke(); ctx.restore() }
        }
        ctx.restore()
        if (rv >= 1) { ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.lineWidth = 2; ctx.strokeRect(r.x - 1, r.y - 1, r.w + 2, r.h + 2); ctx.strokeStyle = 'rgba(220,255,240,.2)'; ctx.lineWidth = 1; ctx.strokeRect(r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1) }
        if (rv > 0 && rv < 1) { const rr = seeded(800 + k); for (let i = 0; i < 70; i++) {
          const a = rr() * 6.3, d0 = rr(), len = 16 + rr() * 18, col = rr() < 0.5 ? look.leafLight[i % 4] : look.leafDark[i % 3]
          const pr = clamp01((rv - d0 * 0.7) * 3); if (pr <= 0 || pr >= 1) continue
          const dd = Rm * (d0 * 0.7 + pr * 0.8), x = cx + Math.cos(a) * dd * (r.w / Math.hypot(r.w, r.h)) * 1.3, y = cy + Math.sin(a) * dd * (r.h / Math.hypot(r.w, r.h)) * 1.3 + pr * pr * 120
          ctx.globalAlpha = 1 - pr; ctx.save(); ctx.translate(x, y); ctx.rotate(a + pr * 5); leafPath(len, 0.3); ctx.fillStyle = col; ctx.fill(); ctx.restore()
        } ctx.globalAlpha = 1 }
      })
      halves.forEach((_, j) => drawFrame(j, t))
      halves.forEach((h, j) => drawPulse(h.main, st.fpulse - (j % 2) * 0.02, 12))
      if (tgtFrame >= 0 && st.hit > 0) halves.forEach(h => { if (h.k === tgtFrame) drawPulse(h.main, (st.hit * 1.3) % 1.15, 14, warmSpr) })
      // ответ: свет бежит по земле к правильному цветку или раме
      if (st.ans > 0 && st.ans < 1.15) drawPulse(ansPath, st.ans, 20, warmSpr)
      L.flowers.forEach((f, i) => drawFlower(f, st.fl[i].g, st.fl[i].b, i, t, tgtFlower < 0 ? 0 : i === tgtFlower ? st.hit : -st.hit))
      L.markers.forEach((m, i) => { const u = st.mk[i]; if (u <= 0) return
        // метка-цветок сидит на усике, растущем из боковой стороны рамы
        const r = L.frames[m.frame].r
        ctx.strokeStyle = look.bark[1]; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(r.x - 11, m.y + 30); ctx.quadraticCurveTo(m.x + 8, m.y + 34, m.x, m.y + 22 * u); ctx.stroke()
        for (const s of [-1, 1]) { ctx.save(); ctx.translate(m.x, m.y + 26); ctx.rotate(Math.PI / 2 + s * 1.0); ctx.scale(u, u); leafPath(20, 0.34); ctx.fillStyle = look.leafLight[1]; ctx.fill(); ctx.restore() }
        drawBloom(m.x, m.y, 35, backOut(u), mPetals[i], tgtMarker < 0 ? 0 : i === tgtMarker ? st.hit : -st.hit, t, 0.6)
      })
      if (L.cells) drawCells(L.cells, st.cells, st.flip)
      drawDand(L.dand, st.dand, t)
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
          b = b * (1 - e) + e * (0.4 + 0.15 * Math.sin(t * 0.9 + i))
        }
        const m = inMedia(x, y)
        if (m) { const dl = x - m.x, dr = m.x + m.w - x, dt = y - m.y, db = m.y + m.h - y, mn2 = Math.min(dl, dr, dt, db); if (mn2 === dl) x = m.x; else if (mn2 === dr) x = m.x + m.w; else if (mn2 === dt) y = m.y; else y = m.y + m.h }
        const s = f.s * (6 + 20 * b)
        ctx.globalAlpha = Math.min(1, 0.2 + b) * (1 - st.focus * 0.35); ctx.drawImage(flySpr, x - s, y - s, s * 2, s * 2)
      })
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
    }
    gsap.ticker.add(draw)

    // ── хореография
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    const sp = full ? 1 : 0.62
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
      tl.addLabel('B', 0.5)
        .to(st, { hush: 1, sway: 0.2, duration: 0.4, ease: 'power2.out' }, 'B')
        .to(st, { after: 0.9, duration: 0.5 }, 'B')
        .addLabel('C', 1.0)
    }
    // перестройка: деревья расходятся от содержимого, свет по ветви, ветвь, лианы, рамы
    tl.to(st, { bend: 0.86, duration: 1.0 * sp, ease: 'power3.inOut' }, 'C').to(st, { bend: 0.8, duration: 0.8, ease: 'sine.inOut' }, `C+=${1.0 * sp}`)
      .to(st, { focus: 1, duration: 1.6 * sp }, 'C')
    lines.forEach((_, k) => tl.to(st.grow, { [k]: 1, duration: 2.4 * sp, ease: 'power2.inOut' }, `C+=${k * 0.15 * sp}`))
    if (lines.length) tl.to(st, { energy: 1.15, duration: 2.4 * sp, ease: 'power1.inOut' }, 'C+=0.1')
    if (perchLine) tl.to(st, { gather: 1, duration: 2.6 * sp, ease: 'power1.inOut' }, `C+=${1.2 * sp}`)
    const tv = lines.length ? 1.4 : 0.2
    if (L.vines.length) tl.to(st, { vine: 1, duration: 1.0 * sp, ease: 'power2.in' }, `C+=${tv * sp}`)
    const tfm = (L.vines.length ? tv + 0.8 : lines.length ? 1.6 : 0.4) * sp
    halves.forEach((h, j) => tl.to(st.frame, { [j]: 1, duration: 1.1 * sp, ease: 'power2.inOut' }, `C+=${tfm + h.k * 0.1}`))
    if (halves.length) tl.to(st, { fpulse: 1.15, duration: 1.1 * sp, ease: 'power1.inOut' }, `C+=${tfm}`)
    tl.to(st, { dand: 1, duration: 1.4 * sp, ease: 'power2.out' }, `C+=${1.0 * sp}`)
    tl.to(st, { bloomArch: 1, duration: 2.4 * sp, ease: 'none' }, `C+=${2.0 * sp}`)
    if (L.cells) tl.to(st, { cells: 1, duration: 1.1, ease: 'none' }, `C+=${tfm + 0.6}`)
    // раскрытие
    const D = full ? 9.0 : 1.0 + Math.max(2.4, tfm + 1.2 * sp + 0.3)
    tl.addLabel('D', D).to(st, { hush: 0, duration: 0.6 }, 'D')
    L.frames.forEach((_, k) => tl.to(st.reveal, { [k]: 1, duration: 0.95, ease: 'power2.inOut' }, `D-=${0.35 - k * 0.1}`))
    if (L.q) tl.fromTo(q('.fq .w'), { opacity: 0, y: 16, rotation: -3, color: '#7ff2d8' }, { opacity: 1, y: 0, rotation: 0, color: '#eefff9', duration: 0.6, stagger: Math.min(0.05, 1.0 / L.q.text.split(' ').length), ease: 'back.out(1.5)' }, 'D-=0.2')
    L.flowers.forEach((_, i) => {
      tl.to(st.fl[i], { g: 1, duration: 1.0 * sp + 0.2, ease: 'power2.out' }, `D+=${0.1 + i * 0.12}`)
        .to(st.fl[i], { b: 1, duration: 0.9, ease: 'none' }, `D+=${0.9 * sp + 0.4 + i * 0.12}`)
    })
    L.markers.forEach((_, i) => tl.to(st.mk, { [i]: 1, duration: 0.9, ease: 'none' }, `D+=${0.45 + i * 0.12}`))
    if (L.flowers.length) tl.fromTo(q('.fo b'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.12, ease: 'back.out(2)' }, `D+=${0.9 * sp + 0.85}`)
      .fromTo(q('.fo span'), { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, `D+=${0.9 * sp + 0.95}`)
    if (L.markers.length) tl.fromTo(q('.fb b'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.12, ease: 'back.out(2)' }, 'D+=0.95')
    if (L.cells) tl.fromTo(q('.fc span'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.06 }, 'D-=0.2')
    if (L.phase) tl.fromTo(q('.fp'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 'D-=0.3')
    tl.fromTo(q('.ft span'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, 'D+=0.2')
      .fromTo(q('.fm'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=0.8')
      .addLabel('E', D + 2.2)
      .to(st, { sway: 0.3, after: 0.6, duration: 2.2 }, 'E')
    // показ ответа (только предпросмотр): свет по земле → цветок/рама отзывается; спилы переворачиваются
    if (answer) {
      tl.addLabel('R', D + 3.4)
      if (ansPath.length) tl.to(st, { ans: 1.15, duration: 1.3, ease: 'power1.in' }, 'R').to(st, { hit: 1, duration: 1.2, ease: 'power2.out' }, 'R+=1.2')
      if (L.cells) tl.to(st, { flip: 1, duration: 1.6, ease: 'none' }, 'R')
      if (L.ans) tl.fromTo(q('.fa'), { opacity: 0, y: 14, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, 'R')
      tl.to({}, { duration: 2.6 }, 'R+=1.2')
    } else tl.to({}, { duration: 2.4 }, 'E')

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
  }, [look, mode, answer, state, L, corr, onReady])

  const cellX = (i: number) => L.cells ? L.cells.cx - ((L.cells.word.length - 1) * (L.cells.d + L.cells.gap)) / 2 + i * (L.cells.d + L.cells.gap) : 0
  return (
    <div className="fr-root" ref={root} data-ph="normal">
      <canvas ref={cvRef} width={W} height={H} />
      {L.q && <p className={`fq${L.q.align === 'left' ? ' is-left' : ''}`} style={{ left: L.q.left, top: L.q.top, width: L.q.width, fontSize: L.q.size }}>
        {L.q.text.split(' ').map((w, i) => <span key={i} className="w">{w}</span>)}
      </p>}
      {L.opts.map((o, i) => (
        <div key={o.key} className={`fo${L.flowers[i].r < 60 ? ' is-sm' : ''}`} style={{ left: L.flowers[i].x, top: L.flowers[i].y }}>
          <b>{o.key}</b><span style={{ top: L.label - L.flowers[i].y, width: L.labelW, left: -L.labelW / 2 }}>{o.text}</span>
        </div>
      ))}
      {L.markers.map(m => <div key={m.key} className="fb" style={{ left: m.x, top: m.y }}><b>{m.key}</b></div>)}
      {L.cells && L.cells.word.split('').map((ch, i) => (
        <div key={i} className={`fc${L.cells!.open.includes(i) ? ' is-open' : ''}`} style={{ left: cellX(i), top: L.cells!.cy }}><span><i className="q">{L.cells!.open.includes(i) ? ch : '?'}</i><i className="a">{ch}</i></span></div>
      ))}
      {L.phase && <div className="fp" style={{ left: L.phase.x, top: L.phase.y }}>{L.phase.text}</div>}
      {L.ans && corr.text && <div className={`fa${L.ans.align === 'left' ? ' is-left' : ''}`} style={{ left: L.ans.align === 'left' ? L.ans.x : L.ans.x - L.ans.w / 2, top: L.ans.y, width: L.ans.w }}>Ответ: <b>{corr.text}</b></div>}
      <div className="ft" style={{ left: L.dand.x, top: L.dand.y }}><span ref={tnum}>30</span></div>
      <div className="fm"><span>{state === 'six' ? '3 попытки' : ROUND_NAME}</span><span>{QNO}</span></div>
    </div>
  )
}
