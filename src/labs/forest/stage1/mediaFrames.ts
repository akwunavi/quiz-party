// ═══ Рамы и раскрытие фото — та же техника, что в утверждённом Концепте C (forest/Scene.tsx) ═══
// Перенесено из Scene.tsx (framePath, leavesFor, drawLine в режиме still, узлы на углах, раскрытие
// «живым краем» листвы, цветение правильной рамы), чтобы «Три попытки» говорили тем же языком,
// не трогая утверждённый экран. Меняешь технику в Scene.tsx — поменяй и здесь (HANDOFF §3ct).
// Всё рисуется от чисел состояния (рост рамы, раскрытие, цветение) — перемотка даёт тот же кадр.
import { LOOKS, mk, seeded, noise1, type Pt } from '../paint'

export type FRect = { x: number; y: number; w: number; h: number }
export type FrameSet = { rects: FRect[]; srcs: string[] }
/** Числа, которые двигает GSAP: на каждую раму — рост (0..1), раскрытие фото (0..1), цветение (0..1). */
export type FrameState = { grow: number[]; reveal: number[]; bloom: number[]; pulse: number }

const look = LOOKS.C
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const ease = (v: number) => { v = clamp01(v); return v * v * (3 - 2 * v) }

const framePath = (r: FRect, pad: number, side: -1 | 1, amp: number, phase: number, seed: number): Pt[] => {
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
type Leaf = { i: number; ang: number; len: number; col: string; twig: number }
function leavesFor(line: Pt[], seed: number, every: number, outward: -1 | 1, twigP: number): Leaf[] {
  const r = seeded(seed), out: Leaf[] = []
  for (let i = 4; i < line.length - 1; i += every + Math.floor(r() * 2)) {
    out.push({ i, ang: (0.55 + r() * 0.75) * outward, len: 14 + r() * 20, col: r() < 0.55 ? look.leafLight[Math.floor(r() * 4)] : look.leafDark[Math.floor(r() * 3)], twig: r() < twigP ? 18 + r() * 34 : 0 })
  }
  return out
}

/** Подготовить набор рам (один раз на состояние). Возвращает функцию рисования в заданный холст. */
export function makeFrames(set: FrameSet, seedBase = 40) {
  const halves = set.rects.flatMap((r, k) => ([-1, 1] as const).map(side => ({ k, side,
    main: framePath(r, 11, side, 1.5, 0, seedBase + k * 7 + side), twin: framePath(r, 11, side, 4.5, 1.6, seedBase + 1 + k * 7 + side), thin: framePath(r, 12, side, 6, 3.4, seedBase + 2 + k * 7 + side) })))
  const halfLeaves = halves.map((h, j) => leavesFor(h.main, 400 + seedBase + j, 9, h.side < 0 ? -1 : 1, 0.12))
  const imgs = set.srcs.map(s => { const i = new Image(); i.src = s; return i })
  const foliage = (() => { const c = mk(420, 420), x = c.getContext('2d')!, r = seeded(66); x.fillStyle = '#0a211b'; x.fillRect(0, 0, 420, 420)
    for (let i = 0; i < 900; i++) { const px = r() * 420, py = r() * 420, len = 16 + r() * 22, a = r() * 6.3, col = r() < 0.5 ? look.leafLight[i % 4] : look.leafDark[i % 3]
      for (const [ox, oy] of [[0, 0], [420, 0], [-420, 0], [0, 420], [0, -420]]) { x.save(); x.translate(px + ox, py + oy); x.rotate(a); x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(len * 0.25, -len * 0.32, len * 0.7, -len * 0.3, len, 0); x.bezierCurveTo(len * 0.7, len * 0.3, len * 0.25, len * 0.32, 0, 0); x.fillStyle = col; x.fill(); x.restore() } }
    return c })()
  const glowSpr = (() => { const c = mk(64, 64), x = c.getContext('2d')!, g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(150,250,222,1)'); g.addColorStop(0.3, 'rgba(150,250,222,.35)'); g.addColorStop(1, 'rgba(150,250,222,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return c })()

  return (ctx: CanvasRenderingContext2D, st: FrameState) => {
    const folPat = ctx.createPattern(foliage, 'repeat')!
    const leafPath = (len: number, w: number) => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(len * 0.25, -len * w, len * 0.7, -len * w * 0.9, len, 0); ctx.bezierCurveTo(len * 0.7, len * w * 0.9, len * 0.25, len * w, 0, 0) }
    const drawLine = (ln: Pt[], g: number, w0: number, leaves: Leaf[]) => {
      const n = Math.floor(g * (ln.length - 1)); if (n < 1) return
      const seg = (pts: Pt[], wk: number, col: string, dx = 0, dy = 0) => {
        ctx.strokeStyle = col; ctx.lineCap = 'round'
        const m = Math.min(n, pts.length - 1)
        for (let i = 0; i < m; i++) { const tip = Math.min(1, (n - i) / 14); ctx.lineWidth = Math.max(1, (w0 * (1 - i / ln.length * 0.6)) * wk * (0.35 + 0.65 * tip)); ctx.beginPath(); ctx.moveTo(pts[i].x + dx, pts[i].y + dy); ctx.lineTo(pts[i + 1].x + dx, pts[i + 1].y + dy); ctx.stroke() }
      }
      seg(ln, 1.14, '#050d0a', 0, 3); seg(ln, 1, look.bark[1]); seg(ln, 0.55, '#4a3a2a', 0, -w0 * 0.14); seg(ln, 0.16, '#8fd3b4', 1, -w0 * 0.32)
      for (const lf of leaves) {
        if (lf.i >= n) continue
        const u = ease((n - lf.i) / 12), p = ln[lf.i], p2 = ln[lf.i + 1], a = Math.atan2(p2.y - p.y, p2.x - p.x) + lf.ang
        let bx = p.x, by = p.y
        if (lf.twig) { bx = p.x + Math.cos(a) * lf.twig * u; by = p.y + Math.sin(a) * lf.twig * u; ctx.strokeStyle = look.bark[1]; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.quadraticCurveTo((p.x + bx) / 2 + 4, (p.y + by) / 2 - 3, bx, by); ctx.stroke() }
        const w = Math.floor(lf.len * 7.3) % 3 === 2 ? 0.42 : 0.28
        ctx.save(); ctx.translate(bx, by); ctx.rotate(a); ctx.scale(u, u)
        leafPath(lf.len, w); ctx.fillStyle = lf.col; ctx.fill()
        ctx.strokeStyle = 'rgba(200,255,230,.13)'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(lf.len * 0.8, 0); ctx.stroke()
        ctx.restore()
      }
    }
    // фото: тень, снимок без фильтров, раскрытие живым краем
    set.rects.forEach((r, k) => {
      const im = imgs[k], rv = clamp01(st.reveal[k] ?? 0), fr = st.grow[k] ?? 0
      if (fr <= 0.6) return
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.75)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10; ctx.fillStyle = '#071410'; ctx.globalAlpha = clamp01((fr - 0.6) * 2.5); ctx.fillRect(r.x, r.y, r.w, r.h); ctx.restore()
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
    // рама — три переплетённых побега на каждую сторону, узлы на углах, цветение
    halves.forEach((h, j) => {
      const g = st.grow[h.k] ?? 0; if (g <= 0) return
      drawLine(h.thin, clamp01(g * 1.1 - 0.1), 3, []); drawLine(h.twin, clamp01(g * 1.05 - 0.05), 6, []); drawLine(h.main, g, 10, halfLeaves[j])
      if (g > 0.95 && h.side < 0) {
        const r = set.rects[h.k], k2 = ease((g - 0.95) * 20)
        for (const [x, y] of [[r.x - 11, r.y - 11], [r.x + r.w + 11, r.y - 11], [r.x - 11, r.y + r.h + 11], [r.x + r.w + 11, r.y + r.h + 11]]) {
          ctx.fillStyle = look.bark[1]; ctx.beginPath(); ctx.ellipse(x, y, 10 * k2, 8 * k2, 0.6, 0, 6.3); ctx.fill()
          ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.strokeStyle = 'rgba(143,211,180,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, 6 * k2, 3.6, 5.2); ctx.stroke()
        }
        const hot = st.bloom[h.k] ?? 0
        if (hot > 0) { const rr = seeded(77 + h.k); for (let k = 0; k < 14; k++) { // рама зацветает (разбор)
          const side = k % 4, u = rr(), x = side === 0 ? r.x + u * r.w : side === 1 ? r.x + r.w + 12 : side === 2 ? r.x + u * r.w : r.x - 12, y = side === 0 ? r.y - 12 : side === 2 ? r.y + r.h + 12 : r.y + u * r.h
          const bu = ease(hot * 2 - k / 14); if (bu <= 0) continue
          for (let p = 0; p < 5; p++) { const a2 = p * 1.2566 + k; ctx.fillStyle = 'rgba(240,232,255,.95)'; ctx.beginPath(); ctx.ellipse(x + Math.cos(a2) * 6 * bu, y + Math.sin(a2) * 6 * bu, 6 * bu, 3.5 * bu, a2, 0, 6.3); ctx.fill() }
          ctx.fillStyle = '#ffd56b'; ctx.beginPath(); ctx.arc(x, y, 3 * bu, 0, 6.3); ctx.fill()
        } }
      }
      // свет бежит по главному побегу, пока рама растёт
      if (st.pulse > 0 && st.pulse < 1.15) {
        const ln = h.main, head = Math.floor(clamp01(st.pulse) * (ln.length - 1)), fade = st.pulse > 1 ? 1 - (st.pulse - 1) / 0.15 : 1
        ctx.globalCompositeOperation = 'lighter'
        for (let k = 0; k < 26; k++) { const i = head - k; if (i < 0) break; const p = ln[i], s = (12 - k * 12 / 32) * (k === 0 ? 1.6 : 1); ctx.globalAlpha = 0.75 * (1 - k / 26) * fade; ctx.drawImage(glowSpr, p.x - s, p.y - s, s * 2, s * 2) }
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
      }
    })
  }
}
