// ═══ Forest Refinement Lab — живая сцена (одна для A / B / C, отличается «рукой» и поведением) ═══
// Событие одно и непрерывное: лес затихает (предвосхищение) → свет бежит по корням,
// мху и грибам, светлячки вспыхивают синхронной волной, деревья расступаются →
// ветви вырастают аркой (или рамой для фото) → вопрос «прорастает» → цветы
// распускаются вариантами → всё успокаивается. Таймер стартует с метки D.
// Всё рисуется в одном холсте от состояния `st`: перемотка таймлайна в любую точку
// даёт тот же кадр (нужно для «Итогового кадра» и для съёмки).
import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { LOOKS, W, H, groundY, seeded, noise1, mk, paintBack, paintMids, paintGround, paintMist, paintFront, paintPaper, paintVignette, paintGrain, type LookId, type Pt, type Look } from './paint'
import { MC, LAND, PORT, TWO, ROUND_NAME, QNO, phaseOf, type StateId, type Img, type Opt } from './content'

export type SceneApi = { tl: gsap.core.Timeline; setTimer: (n: number) => void; dispose?: () => void }
type Rect = { x: number; y: number; w: number; h: number }
type Flower = { x: number; y: number; r: number }
type Layout = {
  strands: Pt[][]; frames: Rect[]; imgs: { img: Img; r: Rect }[]; flowers: Flower[]; vines: [Pt, Pt][]
  q: { text: string; left: number; top: number; width: number; size: number; align: 'center' | 'left' }
  opts: Opt[]; label: number; dand: Pt | null
}
const fit = (img: Img, cx: number, cy: number, mw: number, mh: number): Rect => {
  const k = Math.min(mw / img.w, mh / img.h), w = Math.round(img.w * k), h = Math.round(img.h * k)
  return { x: Math.round(cx - w / 2), y: Math.round(cy - h / 2), w, h }
}
const G = (x: number) => ({ x, y: groundY(x) + 6 })
const DAND = { x: 236, y: 610 }
function layoutOf(s: StateId): Layout {
  const none: Layout = { strands: [], frames: [], imgs: [], flowers: [], vines: [], q: { text: '', left: 0, top: 0, width: 0, size: 0, align: 'center' }, opts: [], label: 0, dand: null }
  if (s === 'mc') return { ...none, dand: DAND,
    strands: [[G(548), { x: 506, y: 760 }, { x: 532, y: 520 }, { x: 630, y: 330 }, { x: 790, y: 212 }, { x: 990, y: 158 }, { x: 1210, y: 150 }],
      [G(1748), { x: 1788, y: 760 }, { x: 1764, y: 520 }, { x: 1676, y: 330 }, { x: 1526, y: 214 }, { x: 1326, y: 160 }, { x: 1100, y: 154 }]],
    flowers: [735, 1005, 1275, 1545].map(x => ({ x, y: 716, r: 74 })), label: 812,
    q: { text: MC.text, left: 620, top: 318, width: 1060, size: 60, align: 'center' }, opts: MC.options }
  if (s === 'land') {
    const r = fit(LAND.img, 1140, 616, 900, 570)
    return { ...none, dand: DAND,
      strands: [[G(560), { x: 534, y: 720 }, { x: 556, y: 420 }, { x: 660, y: 220 }, { x: 860, y: 118 }, { x: 1100, y: 88 }, { x: 1240, y: 90 }],
        [G(1736), { x: 1770, y: 720 }, { x: 1748, y: 420 }, { x: 1640, y: 220 }, { x: 1440, y: 118 }, { x: 1200, y: 90 }, { x: 1060, y: 92 }]],
      frames: [r], imgs: [{ img: LAND.img, r }], q: { text: LAND.text, left: 640, top: 150, width: 1000, size: 52, align: 'center' } }
  }
  if (s === 'port') {
    const r = fit(PORT.img, 840, 566, 520, 650)
    return { ...none, dand: DAND,
      strands: [[{ x: 300, y: 262 }, { x: 520, y: 214 }, { x: 760, y: 196 }, { x: 1000, y: 204 }, { x: 1200, y: 226 }, { x: 1330, y: 250 }]],
      frames: [r], imgs: [{ img: PORT.img, r }], vines: [[{ x: r.x + 40, y: 202 }, { x: r.x + 40, y: r.y }], [{ x: r.x + r.w - 40, y: 207 }, { x: r.x + r.w - 40, y: r.y }]],
      q: { text: PORT.text, left: 1170, top: 400, width: 600, size: 52, align: 'left' } }
  }
  if (s === 'two') {
    const a = fit(TWO.imgs[0], 915, 470, 470, 340), b = fit(TWO.imgs[1], 1405, 470, 400, 340)
    return { ...none, dand: DAND,
      strands: [[{ x: 300, y: 300 }, { x: 560, y: 272 }, { x: 860, y: 262 }, { x: 1160, y: 266 }, { x: 1460, y: 278 }, { x: 1700, y: 300 }]],
      frames: [a, b], imgs: [{ img: TWO.imgs[0], r: a }, { img: TWO.imgs[1], r: b }],
      vines: [[{ x: a.x + 40, y: 266 }, { x: a.x + 40, y: a.y }], [{ x: a.x + a.w - 40, y: 264 }, { x: a.x + a.w - 40, y: a.y }], [{ x: b.x + 40, y: 268 }, { x: b.x + 40, y: b.y }], [{ x: b.x + b.w - 40, y: 274 }, { x: b.x + b.w - 40, y: b.y }]],
      flowers: [735, 1005, 1275, 1545].map(x => ({ x, y: 752, r: 58 })), label: 830,
      q: { text: TWO.text, left: 640, top: 126, width: 1000, size: 50, align: 'center' }, opts: TWO.options }
  }
  return none
}

/** Сплайн Катмулла — Рома через опорные точки → ровная полилиния. */
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
const rectPath = (r: Rect, pad: number): Pt[] => {
  const a = { x: r.x - pad, y: r.y - pad }, b = { x: r.x + r.w + pad, y: r.y - pad }, c = { x: r.x + r.w + pad, y: r.y + r.h + pad }, d = { x: r.x - pad, y: r.y + r.h + pad }
  const seg = (p: Pt, q: Pt, n: number) => Array.from({ length: n }, (_, i) => ({ x: p.x + (q.x - p.x) * (i / n), y: p.y + (q.y - p.y) * (i / n) }))
  return [...seg(a, b, 40), ...seg(b, c, 30), ...seg(c, d, 40), ...seg(d, a, 30), a]
}
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const ease = (v: number) => { v = clamp01(v); return v * v * (3 - 2 * v) }
const backOut = (v: number) => { v = clamp01(v); const c = 1.9; return 1 + (c + 1) * (v - 1) ** 3 + c * (v - 1) ** 2 }

type Leaf = { i: number; side: number; ang: number; len: number; col: string; twig: number }
function leavesFor(line: Pt[], seed: number, look: Look, every = 5): Leaf[] {
  const r = seeded(seed), out: Leaf[] = []
  for (let i = 4; i < line.length - 1; i += every) {
    const side = r() < 0.5 ? -1 : 1
    out.push({ i, side, ang: (0.5 + r() * 0.8) * side, len: 15 + r() * 20, col: r() < 0.55 ? look.leafLight[Math.floor(r() * 4)] : look.leafDark[Math.floor(r() * 3)], twig: r() < 0.28 ? 22 + r() * 46 : 0 })
  }
  return out
}

export function Scene({ look: lookId, state, onReady }: { look: LookId; state: StateId; onReady: (a: SceneApi) => void }) {
  const look = LOOKS[lookId]
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
    const paper = lookId === 'A' ? paintPaper() : null
    const vign = paintVignette(lookId === 'B' ? 0.78 : lookId === 'C' ? 0.5 : 0.25)
    const grain = lookId === 'B' ? paintGrain() : null
    const rd = seeded(19)
    const dust = lookId === 'B' ? Array.from({ length: 90 }, () => ({ u: rd(), v: rd(), s: 1 + rd() * 1.8, ph: rd() * 30 })) : []
    const imgs = L.imgs.map(m => { const i = new Image(); i.src = m.img.src; return i })
    // свечение: точки по корням (передний и средний план), шляпки грибов, мох у корней
    const SRC = { x: 260, y: 960 }
    type Glow = { x: number; y: number; r: number; d: number; f: number }
    const glows: Glow[] = []
    const rg = seeded(71)
    const addRoot = (pts: Pt[], k: number) => pts.forEach((p, i) => { if (i % 2 === 0) glows.push({ x: p.x, y: p.y - 2, r: (9 - i * 0.4) * k + 3, d: Math.hypot(p.x - SRC.x, p.y - SRC.y), f: rg() * 10 }) })
    front.roots.forEach(p => addRoot(p, 1.4)); mids.forEach(m => m.roots.forEach(p => addRoot(p, 0.7)))
    for (let i = 0; i < 90; i++) { const x = 360 + rg() * 1520, y = groundY(x) + 8 + rg() * 50; glows.push({ x, y, r: 4 + rg() * 8, d: Math.hypot(x - SRC.x, y - SRC.y), f: rg() * 10 }) }
    ground.mush.forEach(m => glows.push({ x: m.x, y: m.y, r: m.r * 1.8, d: Math.hypot(m.x - SRC.x, m.y - SRC.y), f: rg() * 10 }))
    const glowSpr = (() => { const c = mk(64, 64), x = c.getContext('2d')!, g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(170,255,228,1)'); g.addColorStop(0.3, 'rgba(120,235,205,.35)'); g.addColorStop(1, 'rgba(120,235,205,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return c })()
    const flySpr = (() => { const c = mk(64, 64), x = c.getContext('2d')!, g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,236,170,1)'); g.addColorStop(0.18, 'rgba(255,205,110,.55)'); g.addColorStop(1, 'rgba(255,190,90,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return c })()
    // арка / ветвь / рамы
    const lines = L.strands.map(s => spline(s, 170))
    const wraps = lines.map(ln => ln.map((p, i) => { const q2 = ln[Math.min(ln.length - 1, i + 1)], p0 = ln[Math.max(0, i - 1)], dx = q2.x - p0.x, dy = q2.y - p0.y, l = Math.hypot(dx, dy) || 1; const o = Math.sin(i * 0.33) * 8; return { x: p.x - dy / l * o, y: p.y + dx / l * o } }))
    const lineLeaves = lines.map((ln, k) => leavesFor(ln, 300 + k, look, 3))
    const frames = L.frames.map(r => rectPath(r, 14))
    const frameLeaves = frames.map((fr, k) => leavesFor(fr, 400 + k, look, 9).map(l => ({ ...l, side: -1, ang: -Math.abs(l.ang) - 0.25 })))
    // светлячки: живут группами у растений и под кроной, у каждого свой ритм вспышек
    const rf = seeded(91), nzf = noise1(3)
    const homes = [{ x: 470, y: 880, n: 7 }, { x: 700, y: 860, n: 5 }, { x: 1220, y: 870, n: 6 }, { x: 1700, y: 870, n: 7 }, { x: 900, y: 420, n: 5 }, { x: 1500, y: 380, n: 6 }, { x: 1120, y: 620, n: 4 }]
    const flies = homes.flatMap(h => Array.from({ length: h.n }, () => ({ hx: h.x + (rf() - 0.5) * 160, hy: h.y + (rf() - 0.5) * 120, rad: 40 + rf() * 110, sp: 0.08 + rf() * 0.18, ph: rf() * 100, per: 2.2 + rf() * 2.6, dur: 0.25 + rf() * 0.3, s: 0.7 + rf() * 0.7, perch: rf(), rest: rf() < 0.25 })))
    const perchLine = lines[0] ? lines.flat() : null
    // ── состояние (его двигает таймлайн)
    const st = {
      camX: 30, camZ: 1.07, hush: 0, wave: 0, after: 0, sync: 0, bend: 0, sway: 1, part: 0, light: 0,
      grow: lines.map(() => 0), frame: frames.map(() => 0), gather: 0, veil: 0, reveal: 0, vine: 0,
      fl: L.flowers.map(() => ({ g: 0, b: 0 })), dand: 0, n: 30, calm: 0, bloomArch: 0,
    }
    const bendAmp = lookId === 'C' ? 0.2 : lookId === 'B' ? 0.09 : 0.065
    const gone: number[] = [] // когда улетело каждое семечко (время тикера)
    let lastN = 30
    const dirs = mids.map(m => (m.x < 1150 ? -1 : 1))

    const midC = mk(), mctx = midC.getContext('2d')!
    let midKey = ''
    const tf = (k: number) => { ctx.setTransform(st.camZ, 0, 0, st.camZ, (1 - st.camZ) * W / 2 + st.camX * k, (1 - st.camZ) * H / 2) }
    const drawLine = (ln: Pt[], wr: Pt[], g: number, w0: number, leaves: Leaf[], t: number) => {
      const n = Math.floor(g * (ln.length - 1)); if (n < 1) return
      const sway = (i: number) => Math.sin(t * 0.9 + i * 0.05) * 1.6 * st.sway * (i / ln.length)
      const seg = (pts: Pt[], wk: number, col: string, dx = 0, dy = 0) => {
        ctx.strokeStyle = col; ctx.lineCap = 'round'
        const m = Math.min(n, pts.length - 1)
        for (let i = 0; i < m; i++) { const tip = Math.min(1, (n - i) / 14); ctx.lineWidth = Math.max(1.2, (w0 * (1 - i / ln.length * 0.75)) * wk * (0.35 + 0.65 * tip)); ctx.beginPath(); ctx.moveTo(pts[i].x + dx + sway(i), pts[i].y + dy); ctx.lineTo(pts[i + 1].x + dx + sway(i + 1), pts[i + 1].y + dy); ctx.stroke() }
      }
      if (look.ink) seg(ln, 1.25, '#020806')
      seg(ln, 1, look.bark[1]); seg(ln, 0.3, lookId === 'A' ? '#5b7d5e' : '#7fc9a6', 2, -4)
      if (g > 0.2) seg(wr.slice(0, Math.max(2, Math.floor(n * 0.92))), 0.42, '#2d4a33')
      for (const lf of leaves) {
        if (lf.i >= n) continue
        const u = ease((n - lf.i) / 14), p = ln[lf.i], p2 = ln[lf.i + 1], a = Math.atan2(p2.y - p.y, p2.x - p.x) + lf.ang
        const px = p.x + sway(lf.i), py = p.y
        let bx = px, by = py
        if (lf.twig) { bx = px + Math.cos(a) * lf.twig * u; by = py + Math.sin(a) * lf.twig * u; ctx.strokeStyle = look.bark[1]; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by); ctx.stroke() }
        ctx.save(); ctx.translate(bx, by); ctx.rotate(a + Math.sin(t * 1.3 + lf.i) * 0.08 * st.sway); ctx.scale(u, u)
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(lf.len * 0.45, -lf.len * 0.32, lf.len, 0); ctx.quadraticCurveTo(lf.len * 0.45, lf.len * 0.32, 0, 0)
        ctx.fillStyle = lf.col; ctx.fill(); if (look.ink) { ctx.strokeStyle = 'rgba(2,10,8,.6)'; ctx.lineWidth = 1; ctx.stroke() }
        ctx.restore()
        // живой лес: на арке распускаются мелкие цветы — уже после листьев
        if (lookId === 'C' && lf.twig && st.bloomArch > 0) {
          const bu = ease((st.bloomArch - (lf.i / ln.length) * 0.6) * 3); if (bu > 0) {
            for (let k = 0; k < 5; k++) { const a2 = k * 1.2566 + lf.i; ctx.fillStyle = 'rgba(236,226,255,.9)'; ctx.beginPath(); ctx.ellipse(bx + Math.cos(a2) * 5 * bu, by + Math.sin(a2) * 5 * bu, 5 * bu, 3 * bu, a2, 0, 6.3); ctx.fill() }
            ctx.fillStyle = '#ffd56b'; ctx.beginPath(); ctx.arc(bx, by, 2.4 * bu, 0, 6.3); ctx.fill()
          }
        }
      }
    }
    const drawFlower = (f: Flower, gr: number, bl: number, i: number, t: number) => {
      if (gr <= 0) return
      const gy = groundY(f.x) + 8, top = f.y + f.r * 0.2
      if (lookId === 'C' && bl > 0 && bl < 1) { // кольцо света по земле от раскрывшегося цветка
        ctx.strokeStyle = `rgba(150,255,225,${0.5 * (1 - bl)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(f.x, gy + 4, 30 + bl * 170, 8 + bl * 34, 0, 0, 6.3); ctx.stroke()
      }
      const sw = Math.sin(t * 0.8 + i * 1.7) * 3 * st.sway
      // стебель растёт снизу, с лёгким S-изгибом (в C — с закрученным побегом)
      const pts: Pt[] = []
      for (let k = 0; k <= 30; k++) { const u = k / 30; const curl = lookId === 'C' ? Math.sin(u * 9 + i) * 10 * (1 - u) : Math.sin(u * 3.2 + i) * 8; pts.push({ x: f.x + curl + sw * u * u, y: gy - (gy - top) * u }) }
      const n = Math.max(1, Math.floor(ease(gr) * 30))
      ctx.strokeStyle = '#3f7a56'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); for (let k = 1; k <= n; k++) ctx.lineTo(pts[k].x, pts[k].y); ctx.stroke()
      ctx.strokeStyle = 'rgba(160,230,190,.35)'; ctx.lineWidth = 1.5; ctx.stroke()
      // пара листьев на стебле разворачивается
      const lu = ease((gr - 0.45) * 3)
      if (lu > 0) for (const s of [-1, 1]) {
        const p = pts[12 + (s > 0 ? 4 : 0)]
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(s * (0.9 - 0.4 * lu) - Math.PI / 2 * 0 + (s > 0 ? -0.5 : Math.PI + 0.5)); ctx.scale(lu, lu)
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(22, -14, 46, 0); ctx.quadraticCurveTo(22, 14, 0, 0); ctx.fillStyle = look.leafLight[1]; ctx.fill()
        ctx.strokeStyle = 'rgba(200,255,220,.2)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(40, 0); ctx.stroke(); ctx.restore()
      }
      const head = pts[n]
      if (gr < 1) return
      // бутон → цветок: два круга лепестков, задние темнее и шире, передние светлее
      const b = backOut(bl), hx = head.x, hy = head.y - 2
      const ring = (cnt: number, len: number, wid: number, off: number, c0: string, c1: string, open: number) => {
        for (let k = 0; k < cnt; k++) {
          const a = off + (k / cnt) * Math.PI * 2
          const ang = -Math.PI / 2 + (a + Math.PI / 2) * open // закрытый бутон — все лепестки смотрят вверх
          const l = len * (0.35 + 0.65 * open)
          ctx.save(); ctx.translate(hx, hy); ctx.rotate(ang)
          const g = ctx.createLinearGradient(0, 0, l, 0); g.addColorStop(0, c0); g.addColorStop(1, c1)
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(l * 0.3, -wid, l * 0.85, -wid * 0.9, l, 0); ctx.bezierCurveTo(l * 0.85, wid * 0.9, l * 0.3, wid, 0, 0)
          ctx.fillStyle = g; ctx.fill()
          if (look.ink) { ctx.strokeStyle = 'rgba(20,6,40,.6)'; ctx.lineWidth = 1.2; ctx.stroke() }
          ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(l * 0.12, 0); ctx.lineTo(l * 0.8, 0); ctx.stroke()
          ctx.restore()
        }
      }
      const open = Math.min(1.08, b)
      ring(7, f.r * 1.02, f.r * 0.34, 0.2, '#3a2470', '#8f78d8', open)
      ring(6, f.r * 0.8, f.r * 0.3, 0.2 + Math.PI / 6, '#5b3fa8', '#d9ccff', open)
      if (lookId !== 'A') { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.25 * clamp01(bl); ctx.drawImage(glowSpr, hx - f.r * 1.3, hy - f.r * 1.3, f.r * 2.6, f.r * 2.6); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over' }
      const cr = f.r * 0.42 * clamp01(bl * 1.4)
      if (cr > 1) {
        const g = ctx.createRadialGradient(hx - cr * 0.3, hy - cr * 0.3, 1, hx, hy, cr); g.addColorStop(0, '#fff2b8'); g.addColorStop(0.7, '#f2c25a'); g.addColorStop(1, '#b07a24')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hx, hy, cr, 0, 6.3); ctx.fill()
        ctx.fillStyle = 'rgba(255,240,190,.9)'; for (let k = 0; k < 14; k++) { const a = (k / 14) * 6.28; ctx.beginPath(); ctx.arc(hx + Math.cos(a) * cr * 1.12, hy + Math.sin(a) * cr * 1.12, 2, 0, 6.3); ctx.fill() }
      }
    }
    const drawDand = (p: Pt, g: number, t: number) => {
      if (g <= 0) return
      const gy = groundY(p.x) + 30, top = p.y
      const n = ease(g)
      ctx.strokeStyle = '#5f9b78'; ctx.lineWidth = 5; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(p.x, gy); ctx.quadraticCurveTo(p.x + 14, gy - (gy - top - 58) * 0.5 * n, p.x + Math.sin(t * 0.7) * 2 * st.sway, gy - (gy - top - 58) * n); ctx.stroke()
      if (g < 1) return
      const hx = p.x, hy = top, R = 104, ph = phaseOf(st.n)
      { const g = ctx.createRadialGradient(hx, hy, 20, hx, hy, 64); g.addColorStop(0, 'rgba(3,16,13,.82)'); g.addColorStop(1, 'rgba(3,16,13,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hx, hy, 64, 0, 6.3); ctx.fill() }
      for (let i = 0; i < 30; i++) {
        const a = -Math.PI / 2 + (i / 30) * Math.PI * 2
        let x0 = hx, y0 = hy, al = 1
        if (i >= st.n) { const at = gone[i]; if (at === undefined) continue; const age = t - at; if (age > 2.6 || age < 0) continue; x0 += age * 70 + Math.sin(age * 3 + i) * 10; y0 -= age * 60; al = 1 - age / 2.6 }
        const ex = x0 + Math.cos(a) * R, ey = y0 + Math.sin(a) * R
        ctx.globalAlpha = al; ctx.strokeStyle = 'rgba(225,255,245,.45)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(x0 + Math.cos(a) * 60, y0 + Math.sin(a) * 60); ctx.lineTo(ex, ey); ctx.stroke()
        const col = ph === 'warning' ? '255,214,140' : ph === 'zero' ? '120,150,140' : '232,255,246'
        ctx.strokeStyle = `rgba(${col},.75)`; ctx.lineWidth = 1
        for (let k = -2; k <= 2; k++) { const b = a + k * 0.16; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + Math.cos(b) * 14, ey + Math.sin(b) * 14); ctx.stroke() }
        ctx.globalAlpha = 1
      }
          }

    const draw = () => {
      const t = gsap.ticker.time
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H)
      tf(0.25); ctx.drawImage(back, 0, 0)
      if (st.light > 0) { const g = ctx.createRadialGradient(1240, 40, 0, 1240, 40, 900); g.addColorStop(0, `rgba(160,255,230,${0.22 * st.light * look.rays})`); g.addColorStop(1, 'rgba(160,255,230,0)'); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over' }
      const mf = (t * 6) % W; ctx.globalAlpha = 0.9; ctx.drawImage(mistFar.cv, -mf, mistFar.y0); ctx.globalAlpha = 1
      // деревья среднего плана: гнутся полосами, у корня смещение ноль — основание на месте
      // кеш: полосы перерисовываем, только когда наклон заметно изменился
      const angs = mids.map((_, i) => Math.round(((st.bend * bendAmp * dirs[i]) + Math.sin(t * 0.5 + i * 1.3) * 0.006 * st.sway) * 2000) / 2000)
      const key = angs.join(',')
      if (key !== midKey) {
        midKey = key; mctx.clearRect(0, 0, W, H)
        mids.forEach((m, i) => {
          const sx = m.x - m.ox
          for (let y = 0; y < m.cv.height; y += 6) {
            const hh = Math.max(0, m.base - (y + 3)), dx = Math.tan(angs[i]) * hh * (hh / m.h)
            mctx.drawImage(m.cv, 0, y, m.cv.width, 6, sx + dx, y, m.cv.width, 6)
          }
        })
      }
      tf(0.5); ctx.drawImage(midC, 0, 0)
      tf(0.75); ctx.drawImage(ground.cv, 0, 0)
      // свечение: ровный фон + волна от древнего дерева + остаток после волны
      ctx.globalCompositeOperation = 'lighter'
      const front0 = st.wave * 2300
      for (const g of glows) {
        const flick = 0.5 + 0.5 * Math.sin(t * 1.1 + g.f)
        const w = Math.exp(-((g.d - front0) ** 2) / (2 * 140 * 140)) * (st.wave > 0 && st.wave < 1.05 ? 1 : 0)
        const a = 0.06 + 0.06 * flick + w * 0.9 + st.after * (0.16 + 0.12 * flick)
        const rr = g.r * (1 + w * 1.6); ctx.globalAlpha = Math.min(1, a); ctx.drawImage(glowSpr, g.x - rr, g.y - rr, rr * 2, rr * 2)
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
      tf(0.85); const mn = (t * 10) % W; ctx.drawImage(mistNear.cv, -mn, mistNear.y0)
      // передний план: древнее дерево и крона (в C крона расходится, впуская луну)
      tf(1.1); ctx.drawImage(front.cv, 0, 0)
      if (st.part > 0) { // крона расходится по неровной кромке листвы, а не по прямой
        for (const side of [-1, 1]) {
          ctx.save(); ctx.beginPath(); ctx.moveTo(side < 0 ? -200 : W + 200, -10)
          for (let y = -10; y <= 330; y += 30) ctx.lineTo(1150 + Math.sin(y * 0.05) * 60 + Math.sin(y * 0.13) * 30, y)
          ctx.lineTo(side < 0 ? -200 : W + 200, 330); ctx.closePath(); ctx.clip()
          ctx.drawImage(front.canopy, side * st.part * 110, -st.part * 40); ctx.restore()
        }
      } else ctx.drawImage(front.canopy, 0, 0)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      // затемнение за текстом — отделяет содержимое от декора
      if (st.veil > 0) { const g = ctx.createRadialGradient(L.q.left + L.q.width / 2, L.q.top + 70, 40, L.q.left + L.q.width / 2, L.q.top + 70, L.q.width * 0.62); g.addColorStop(0, `rgba(2,12,10,${0.55 * st.veil})`); g.addColorStop(1, 'rgba(2,12,10,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H) }
      lines.forEach((ln, k) => drawLine(ln, wraps[k], st.grow[k], k === 0 && L.strands.length === 1 ? 18 : 30, lineLeaves[k], t))
      // лианы, на которых висят фото
      L.vines.forEach(([a, b]) => { const u = ease(st.vine); if (u <= 0) return; ctx.strokeStyle = '#3c6a4a'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(a.x + 6, a.y + (b.y - a.y) * 0.5, a.x, a.y + (b.y - a.y) * u); ctx.stroke() })
      // фото: тень, сама картинка, рама из веток — ветки только СНАРУЖИ кадра
      L.imgs.forEach((m, k) => {
        const r = m.r, im = imgs[k], a = clamp01(st.reveal * 1.3 - k * 0.2)
        if (a > 0 && im.complete && im.naturalWidth) {
          ctx.fillStyle = `rgba(0,0,0,${0.5 * a})`; ctx.fillRect(r.x - 6, r.y + 10, r.w + 12, r.h + 8)
          ctx.globalAlpha = a; ctx.drawImage(im, r.x, r.y, r.w, r.h); ctx.globalAlpha = 1
          ctx.fillStyle = `rgba(3,16,13,${(1 - a) * 0.0})`
        }
      })
      frames.forEach((fr, k) => drawLine(fr, fr, st.frame[k], 9, frameLeaves[k], t))
      // занавес листьев над фото разлетается наружу и падает
      if (L.imgs.length && st.reveal < 1.2) L.imgs.forEach((m, k) => {
        const r = m.r, rr = seeded(800 + k)
        for (let i = 0; i < 150; i++) {
          const sx = r.x + rr() * r.w, sy = r.y + rr() * r.h, d0 = rr(), len = 18 + rr() * 22, a0 = rr() * 6.3, col = rr() < 0.5 ? look.leafLight[i % 4] : look.leafDark[i % 3]
          const pr = clamp01((st.reveal - d0 * 0.5) * 2.2); if (st.frame[k] < 0.6 || pr >= 1) continue
          const cx = r.x + r.w / 2, cy = r.y + r.h / 2, dx = sx - cx, dy = sy - cy, dl = Math.hypot(dx, dy) || 1
          const x0 = sx + dx / dl * pr * 340, y0 = sy + dy / dl * pr * 160 + pr * pr * 420
          ctx.globalAlpha = (1 - pr) * clamp01((st.frame[k] - 0.6) * 4)
          ctx.save(); ctx.translate(x0, y0); ctx.rotate(a0 + pr * 4); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * 0.45, -len * 0.32, len, 0); ctx.quadraticCurveTo(len * 0.45, len * 0.32, 0, 0); ctx.fillStyle = col; ctx.fill(); ctx.restore()
        }
        ctx.globalAlpha = 1
      })
      L.flowers.forEach((f, i) => drawFlower(f, st.fl[i].g, st.fl[i].b, i, t))
      if (L.dand) drawDand(L.dand, st.dand, t)
      // светлячки
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
        const s = f.s * (6 + 22 * b)
        ctx.globalAlpha = Math.min(1, 0.2 + b); ctx.drawImage(flySpr, x - s, y - s, s * 2, s * 2)
      })
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
      // пыль в лучах (B): плывёт в столбах света
      if (dust.length) { ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = '#d8fff2'; for (const d of dust) { const y = (d.v * H + t * 6) % H, x = 900 + d.u * 520 - y * 0.25 + Math.sin(t * 0.4 + d.ph) * 20; ctx.globalAlpha = 0.18 + 0.12 * Math.sin(t + d.ph); ctx.fillRect(x, y, d.s, d.s) } ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over' }
      ctx.drawImage(vign, 0, 0)
      if (paper) { ctx.globalCompositeOperation = 'overlay'; ctx.drawImage(paper, 0, 0); ctx.globalCompositeOperation = 'source-over' }
      if (grain) { const gx = Math.floor(t * 97) % 512, gyy = Math.floor(t * 61) % 512; ctx.fillStyle = ctx.createPattern(grain, 'repeat')!; ctx.save(); ctx.translate(-gx, -gyy); ctx.fillRect(gx, gyy, W, H); ctx.restore() }
    }
    gsap.ticker.add(draw)

    // ── хореография
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    const strong = lookId === 'C', cine = lookId === 'B'
    tl.addLabel('A', 0)
      .to(st, { camX: 0, camZ: 1.0, duration: cine ? 5.4 : 4.4, ease: 'sine.inOut' }, 0)
      .addLabel('B', 2.8)
      // предвосхищение: ветер стихает, светлячки гаснут и замирают — лес прислушивается
      .to(st, { hush: 1, sway: 0.15, duration: 0.8, ease: 'power2.out' }, 'B')
      .to(st, { wave: 1.05, duration: 2.4, ease: 'power1.in' }, 'B+=0.7')
      .to(st, { sync: 1, hush: 0, duration: 0.4 }, 'B+=0.8')
      .to(st, { light: 1, duration: 1.2 }, 'B+=1.0')
      .to(st, { after: 1, duration: 1.2 }, 'B+=2.4')
      .to(st, { bend: 1, duration: strong ? 2.2 : 1.8, ease: 'power3.inOut' }, 'B+=1.2')
      .to(st, { bend: strong ? 0.72 : 0.8, duration: 1.0, ease: 'sine.inOut' }, strong ? 'B+=3.4' : 'B+=3.0') // доводка: стволы пружинят назад
      .to(st, { sync: 0, light: cine ? 0.6 : 0.3, duration: 1.0 }, 'B+=3.2')
    if (strong) tl.to(st, { part: 1, duration: 2.4, ease: 'power3.inOut' }, 'B+=2.0').to(st, { light: 1, duration: 1.4 }, 'B+=2.6')
    if (state === 'empty') {
      tl.to(st, { sway: 1, duration: 2 }, 'B+=3.4').addLabel('E', 7).to(st, { calm: 1, duration: 3 }, 'E')
    } else {
      tl.addLabel('C', 6.0)
      lines.forEach((_, k) => tl.to(st.grow, { [k]: 1, duration: strong ? 3.0 : 2.6, ease: 'power2.inOut' }, `C+=${k * 0.25}`))
      if (perchLine) tl.to(st, { gather: 1, duration: 2.6, ease: 'power1.inOut' }, 'C+=1.4')
      frames.forEach((_, k) => tl.to(st.frame, { [k]: 1, duration: 1.8, ease: 'power2.inOut' }, `C+=${1.6 + k * 0.3}`))
      if (L.vines.length) tl.to(st, { vine: 1, duration: 1.2 }, 'C+=1.2')
      if (L.dand) tl.to(st, { dand: 1, duration: 1.6, ease: 'power2.out' }, 'C+=1.6')
      if (strong) tl.to(st, { bloomArch: 1, duration: 2.4, ease: 'none' }, 'C+=2.2')
      tl.addLabel('D', 9.2)
        .to(st, { veil: 1, duration: 1.0 }, 'D-=0.4')
        .fromTo(q('.fq .w'), { opacity: 0, y: 22, rotation: -5, color: '#7ff2d8' }, { opacity: 1, y: 0, rotation: 0, color: '#eefff9', duration: 0.9, stagger: 0.06, ease: 'back.out(1.6)' }, 'D')
      if (L.imgs.length) tl.to(st, { reveal: 1.2, duration: 2.0, ease: 'power2.out' }, 'D+=0.5')
      L.flowers.forEach((_, i) => {
        tl.to(st.fl[i], { g: 1, duration: strong ? 1.5 : 1.2, ease: 'power2.out' }, `D+=${0.3 + i * 0.16}`)
          .to(st.fl[i], { b: 1, duration: 1.0, ease: 'none' }, `D+=${1.5 + i * 0.16}`)
      })
      if (L.flowers.length) tl.fromTo(q('.fo b'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.16, ease: 'back.out(2)' }, 'D+=2.0')
        .fromTo(q('.fo span'), { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.16, ease: 'power2.out' }, 'D+=2.2')
      tl.fromTo(q('.ft'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }, 'D+=0.6')
        .fromTo(q('.fm'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=2.4')
        .addLabel('E', 12.6)
        // всё успокаивается: ветер возвращается едва заметным
        .to(st, { sway: 0.4, after: 0.7, calm: 1, duration: 3 }, 'E')
        .to({}, { duration: 3.4 }, 'E')
    }

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
  }, [look, lookId, state, L, onReady])

  return (
    <div className="fr-root" ref={root} data-ph="normal">
      <canvas ref={cvRef} width={W} height={H} />
      {L.q.text && <p className={`fq${L.q.align === 'left' ? ' is-left' : ''}`} style={{ left: L.q.left, top: L.q.top, width: L.q.width, fontSize: L.q.size }}>
        {L.q.text.split(' ').map((w, i) => <span key={i} className="w">{w}</span>)}
      </p>}
      {L.opts.map((o, i) => (
        <div key={o.key} className="fo" style={{ left: L.flowers[i].x, top: L.flowers[i].y }}>
          <b>{o.key}</b><span style={{ top: L.label - L.flowers[i].y }}>{o.text}</span>
        </div>
      ))}
      {L.dand && <div className="ft" style={{ left: L.dand.x, top: L.dand.y }}><span ref={tnum}>30</span></div>}
      {state !== 'empty' && <div className="fm"><span>{ROUND_NAME}</span><span>{QNO}</span></div>}
    </div>
  )
}
