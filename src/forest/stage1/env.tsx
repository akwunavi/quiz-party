// ═══ Этап 1 — общий лесной фон для механик (тот же лес Концепта C) ═══
// Слои рисуются ОДИН раз на страницу (кэш модуля), сцена механики только
// сообщает: где содержимое (дымка под ним, светлячки облетают), настроение
// (обычно / тревога / время вышло) и «импульс» — волну света по корням на
// событие (верный ответ, новая фаза). Утверждённые экраны (Scene.tsx) этот
// модуль не трогает.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { LOOKS, W, H, groundY, seeded, noise1, mk, paintBack, paintMids, paintGround, paintMist, paintFront, paintVignette, type Pt } from '../paint'

export type Rect = { x: number; y: number; w: number; h: number }
export type Mood = 'calm' | 'warning' | 'zero'

type Layers = ReturnType<typeof paintAll>
let cache: Layers | null = null
function paintAll() {
  const look = LOOKS.C
  const back = paintBack(look), mids = paintMids(look), ground = paintGround(look), front = paintFront(look)
  const mistFar = paintMist(0.07, 560, 300, 5), mistNear = paintMist(0.10, 840, 260, 9), vign = paintVignette(0.55)
  // деревья среднего плана — в «разошедшемся» положении Концепта C, гнутся от корня полосами
  const midC = mk(), mx = midC.getContext('2d')!
  mids.forEach(m => { const ang = (m.x < 1150 ? -1 : 1) * 0.72 * 0.2, sx = m.x - m.ox; for (let y = 0; y < m.cv.height; y += 6) { const hh = Math.max(0, m.base - (y + 3)), dx = Math.tan(ang) * hh * (hh / m.h); mx.drawImage(m.cv, 0, y, m.cv.width, 6, sx + dx, y, m.cv.width, 6) } })
  // статичная часть одним холстом: небо, дальний туман, деревья, земля, древнее дерево, раскрытая крона
  const still = mk(), x = still.getContext('2d')!
  x.drawImage(back, 0, 0); x.globalAlpha = 0.9; x.drawImage(mistFar.cv, 0, mistFar.y0); x.globalAlpha = 1
  x.drawImage(midC, 0, 0); x.drawImage(ground.cv, 0, 0)
  const top = mk(), tx = top.getContext('2d')!
  tx.drawImage(front.cv, 0, 0)
  for (const side of [-1, 1]) {
    tx.save(); tx.beginPath(); tx.moveTo(side < 0 ? -200 : W + 200, -10)
    for (let y = -10; y <= 330; y += 30) tx.lineTo(1150 + Math.sin(y * 0.05) * 60 + Math.sin(y * 0.13) * 30, y)
    tx.lineTo(side < 0 ? -200 : W + 200, 330); tx.closePath(); tx.clip(); tx.drawImage(front.canopy, side * 110, -40); tx.restore()
  }
  const SRC = { x: 260, y: 960 }, rg = seeded(71)
  type Glow = { x: number; y: number; r: number; d: number; f: number; front: boolean }
  const glows: Glow[] = []
  const add = (pts: Pt[], k: number, fr: boolean) => pts.forEach((p, i) => { if (i % 2 === 0) glows.push({ x: p.x, y: p.y - 2, r: (9 - i * 0.4) * k + 3, d: Math.hypot(p.x - SRC.x, p.y - SRC.y), f: rg() * 10, front: fr }) })
  front.roots.forEach(p => add(p, 1.4, true)); mids.forEach(m => m.roots.forEach(p => add(p, 0.7, false)))
  for (let i = 0; i < 90; i++) { const gx = 360 + rg() * 1520, gy = groundY(gx) + 8 + rg() * 50; glows.push({ x: gx, y: gy, r: 4 + rg() * 8, d: Math.hypot(gx - SRC.x, gy - SRC.y), f: rg() * 10, front: false }) }
  ground.mush.forEach(m => glows.push({ x: m.x, y: m.y, r: m.r * 1.8, d: Math.hypot(m.x - SRC.x, m.y - SRC.y), f: rg() * 10, front: false }))
  const spr = (rgb: string, k = 0.3) => { const c = mk(64, 64), g2 = c.getContext('2d')!, g = g2.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, `rgba(${rgb},1)`); g.addColorStop(k, `rgba(${rgb},.35)`); g.addColorStop(1, `rgba(${rgb},0)`); g2.fillStyle = g; g2.fillRect(0, 0, 64, 64); return c }
  return { still, top, mistNear, vign, glows, SRC, glowSpr: spr('150,250,222'), warmSpr: spr('255,206,130'), flySpr: spr('255,214,130', 0.18) }
}

/** Лесной фон. `pulse` — счётчик: при изменении по корням проходит волна света. */
export function ForestBackdrop({ rects, mood = 'calm', pulse = 0, hazeK = 0.62 }: { rects: Rect[]; mood?: Mood; pulse?: number; hazeK?: number }) {
  const cv = useRef<HTMLCanvasElement>(null)
  const st = useRef({ wave: 2, warm: 0, dark: 0, haze: 0 })
  const rectsRef = useRef(rects); rectsRef.current = rects
  const hazeC = useRef<HTMLCanvasElement | null>(null)
  const key = rects.map(r => `${r.x},${r.y},${r.w},${r.h}`).join('|')
  useEffect(() => { // дымка под содержимым — растушёванные прямоугольники, один раз на раскладку
    const c = mk(W / 4, H / 4), x = c.getContext('2d')!; x.filter = 'blur(14px)'; x.fillStyle = 'rgba(2,16,13,1)'
    rects.forEach(r => x.fillRect((r.x - 30) / 4, (r.y - 30) / 4, (r.w + 60) / 4, (r.h + 60) / 4))
    hazeC.current = c; st.current.haze = 0; gsap.to(st.current, { haze: 1, duration: 0.9, ease: 'power2.out' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  useEffect(() => { if (pulse) gsap.fromTo(st.current, { wave: 0 }, { wave: 1.05, duration: 1.8, ease: 'power1.in' }) }, [pulse])
  useEffect(() => { gsap.to(st.current, { warm: mood === 'warning' ? 1 : 0, dark: mood === 'zero' ? 1 : 0, duration: 1.2 }) }, [mood])
  useEffect(() => {
    if (!cache) cache = paintAll()
    const L = cache, ctx = cv.current!.getContext('2d')!
    const rf = seeded(91), nz = noise1(3)
    const homes = [{ x: 470, y: 880, n: 6 }, { x: 760, y: 860, n: 4 }, { x: 1220, y: 900, n: 5 }, { x: 1700, y: 880, n: 6 }, { x: 900, y: 360, n: 4 }, { x: 1500, y: 330, n: 5 }]
    const flies = homes.flatMap(h => Array.from({ length: h.n }, () => ({ hx: h.x + (rf() - 0.5) * 160, hy: h.y + (rf() - 0.5) * 120, rad: 40 + rf() * 100, sp: 0.08 + rf() * 0.16, ph: rf() * 100, per: 2.2 + rf() * 2.6, dur: 0.25 + rf() * 0.3, s: 0.7 + rf() * 0.6 })))
    const draw = () => {
      const t = gsap.ticker.time, s = st.current
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.drawImage(L.still, 0, 0)
      ctx.globalCompositeOperation = 'lighter'
      const front0 = s.wave * 2300, dim = 1 - s.dark * 0.7
      for (const g of L.glows) {
        const flick = 0.5 + 0.5 * Math.sin(t * 1.1 + g.f)
        const w = s.wave < 1.05 ? Math.exp(-((g.d - front0) ** 2) / (2 * 140 * 140)) : 0
        const a = (0.06 + 0.05 * flick + 0.08) * dim + w * 0.9, rr = g.r * (1 + w * 1.4)
        ctx.globalAlpha = Math.min(1, a); ctx.drawImage(s.warm > 0.5 && w < 0.1 ? L.warmSpr : L.glowSpr, g.x - rr, g.y - rr, rr * 2, rr * 2)
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
      const mn = (t * 10) % W; ctx.drawImage(L.mistNear.cv, -mn, L.mistNear.y0)
      ctx.drawImage(L.top, 0, 0)
      ctx.drawImage(L.vign, 0, 0)
      if (s.dark > 0) { ctx.fillStyle = `rgba(2,10,9,${0.28 * s.dark})`; ctx.fillRect(0, 0, W, H) }
      if (hazeC.current && s.haze > 0) { ctx.globalAlpha = hazeK * s.haze; ctx.drawImage(hazeC.current, 0, 0, W, H); ctx.globalAlpha = 1 }
      // светлячки: облетают содержимое стороной; в тревогу — суетливее, на нуле почти гаснут
      ctx.globalCompositeOperation = 'lighter'
      const rs = rectsRef.current
      flies.forEach((f, i) => {
        const sp = 1 + s.warm * 0.8
        let x = f.hx + (nz(f.ph + t * f.sp * sp) - 0.5) * f.rad * 2, y = f.hy + (nz(f.ph + 40 + t * f.sp * 0.8 * sp) - 0.5) * f.rad * 1.2 + Math.sin(t * 2 + i) * 3
        const m = rs.find(r => x > r.x - 30 && x < r.x + r.w + 30 && y > r.y - 30 && y < r.y + r.h + 30)
        if (m) { const dl = x - m.x + 30, dr = m.x + m.w + 30 - x, dt = y - m.y + 30, db = m.y + m.h + 30 - y, mn2 = Math.min(dl, dr, dt, db); if (mn2 === dl) x = m.x - 30; else if (mn2 === dr) x = m.x + m.w + 30; else if (mn2 === dt) y = m.y - 30; else y = m.y + m.h + 30 }
        const cyc = ((t + f.ph) % f.per) / f.per, fl = cyc < f.dur / f.per ? Math.sin(Math.PI * cyc * f.per / f.dur) : 0
        const b = (0.18 + 0.82 * fl) * (1 - s.dark * 0.85), sz = f.s * (6 + 20 * b)
        ctx.globalAlpha = Math.min(1, 0.15 + b); ctx.drawImage(L.flySpr, x - sz, y - sz, sz * 2, sz * 2)
      })
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
    }
    gsap.ticker.add(draw)
    return () => gsap.ticker.remove(draw)
  }, [hazeK])
  return <canvas ref={cv} className="s1-bg" width={W} height={H} />
}
