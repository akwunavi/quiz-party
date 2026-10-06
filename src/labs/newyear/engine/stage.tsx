// ═══ Сцена 16:9 и общая «режиссура» лаборатории ═══
// Сцена всегда верстается в логических 1920×1080 и масштабируется целиком —
// композиция одна на любом экране (как проектор). Часы сцены умеют паузу:
// пауза в лаборатории останавливает и CSS-анимации, и частицы, и таймер.
import {
  createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState,
  type CSSProperties, type ReactNode,
} from 'react'
import { ParticleField, STAGE_H, STAGE_W, type SnowCfg } from './particles'
import { renderTree, type TreeOpts, type TreeResult, type TreeAnchor } from './tree'

export interface Clock { now: () => number; paused: () => boolean }

interface StageCtx { k: number; paused: boolean; reduced: boolean; clock: Clock }
const Ctx = createContext<StageCtx>({
  k: 1, paused: false, reduced: false, clock: { now: () => 0, paused: () => false },
})
export const useStage = () => useContext(Ctx)

/** Часы сцены: секунды с монтирования без учёта пауз. */
function useClockSource(paused: boolean): Clock {
  const st = useRef({ base: performance.now(), pausedAt: 0 as number | 0, offset: 0 })
  const pausedRef = useRef(paused)
  // отсчёт — с первой отрисовки, а не с монтирования: ели рисуются в
  // layout-эффектах и на тяжёлой сцене занимают секунды; CSS-анимации
  // стартуют только после них, и реплики по часам должны идти с ними в ногу
  useEffect(() => {
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => { st.current.base = performance.now(); st.current.offset = 0 })
    })
    return () => cancelAnimationFrame(raf)
  }, [])
  useLayoutEffect(() => {
    const s = st.current
    if (paused && !pausedRef.current) s.pausedAt = performance.now()
    if (!paused && pausedRef.current && s.pausedAt) { s.offset += performance.now() - s.pausedAt; s.pausedAt = 0 }
    pausedRef.current = paused
  }, [paused])
  return useMemo<Clock>(() => ({
    now: () => {
      const s = st.current
      const t = (s.pausedAt || performance.now()) - s.base - s.offset
      return t / 1000
    },
    paused: () => pausedRef.current,
  }), [])
}

export function Stage({ children, paused, reduced, className, style }: {
  children: ReactNode; paused: boolean; reduced: boolean; className?: string; style?: CSSProperties
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  useLayoutEffect(() => {
    const el = wrap.current
    if (!el) return
    const fit = () => setScale(Math.max(0.05, el.clientWidth / STAGE_W))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const k = Math.min(2, Math.max(0.5, scale * (window.devicePixelRatio || 1)))
  const kq = Math.round(k * 4) / 4               // не перерисовывать ели на каждый пиксель ресайза
  const clock = useClockSource(paused)
  const ctx = useMemo(() => ({ k: kq, paused, reduced, clock }), [kq, paused, reduced, clock])
  return (
    <div className="nyl-stage-wrap" ref={wrap} style={{ aspectRatio: '16 / 9' }}>
      <div
        className={`nyl-stage${paused ? ' is-paused' : ''}${reduced ? ' is-reduced' : ''} ${className ?? ''}`}
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})`, ...style }}
      >
        <Ctx.Provider value={ctx}>{children}</Ctx.Provider>
      </div>
    </div>
  )
}

/** Вызвать fn в моменты t (секунды сцены). Уважает паузу; при «без движения»
 *  все реплики срабатывают сразу (сцена встаёт в конечное состояние). */
export function useCues(cues: [number, () => void][], deps: unknown[] = []) {
  const { clock, reduced } = useStage()
  const ref = useRef(cues)
  ref.current = cues
  useEffect(() => {
    const done = new Set<number>()
    if (reduced) { ref.current.forEach(([, fn]) => fn()); return }
    const id = window.setInterval(() => {
      const t = clock.now()
      ref.current.forEach(([at, fn], i) => {
        if (!done.has(i) && t >= at) { done.add(i); fn() }
      })
      if (done.size === ref.current.length) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clock, reduced, ...deps])
}

/** Время сцены в секундах, обновляется fps раз в секунду. */
export function useTime(fps = 20): number {
  const { clock, reduced } = useStage()
  const [t, setT] = useState(0)
  useEffect(() => {
    if (reduced) { setT(clock.now()); }
    const id = window.setInterval(() => setT(clock.now()), 1000 / fps)
    return () => clearInterval(id)
  }, [clock, fps, reduced])
  return t
}

/** Слой частиц. api отдаётся через onReady — для хлопушек по репликам. */
export function Particles({ snow, onReady, z = 5, className, seed = 7 }: {
  snow?: SnowCfg | null; onReady?: (p: ParticleField) => void; z?: number; className?: string; seed?: number
}) {
  const { k, paused, reduced } = useStage()
  const cv = useRef<HTMLCanvasElement>(null)
  const field = useRef<ParticleField | null>(null)
  const ready = useRef(onReady)
  ready.current = onReady
  useLayoutEffect(() => {
    const f = new ParticleField(cv.current!, seed)
    field.current = f
    f.reduced = reduced
    f.resize(k)
    if (snow) f.setSnow(snow)
    ready.current?.(f)
    return () => f.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => { field.current?.resize(k) }, [k])
  useEffect(() => {
    const f = field.current
    if (!f) return
    f.reduced = reduced
    if (paused || reduced) f.stop(); else f.start()
  }, [paused, reduced])
  return <canvas ref={cv} className={`nyl-particles ${className ?? ''}`} style={{ zIndex: z }} />
}

/** Процедурная ель. Позиционируется снаружи (left/top/bottom в style). */
export function Tree({ opts, className, style, onTree, displayHeight }: {
  opts: TreeOpts; className?: string; style?: CSSProperties; onTree?: (t: TreeResult) => void
  /** если задано — ель рисуется крупнее/мельче своей «модельной» высоты */
  displayHeight?: number
}) {
  const { k } = useStage()
  const cv = useRef<HTMLCanvasElement>(null)
  const [res, setRes] = useState<TreeResult | null>(null)
  const key = JSON.stringify(opts)
  useLayoutEffect(() => {
    const scale = Math.min(2, k * (displayHeight ? displayHeight / opts.height : 1))
    const t = renderTree({ ...opts, scale: Math.max(0.35, Math.round(scale * 4) / 4) })
    const c = cv.current!
    c.width = t.canvas.width
    c.height = t.canvas.height
    c.getContext('2d')!.drawImage(t.canvas, 0, 0)
    setRes(t)
    onTree?.(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, k])
  const f = displayHeight ? displayHeight / opts.height : 1
  return (
    <canvas
      ref={cv}
      className={`nyl-tree ${className ?? ''}`}
      style={{ width: (res?.w ?? 0) * f, height: (res?.h ?? 0) * f, ...style }}
    />
  )
}

export type LightMode = 'twinkle' | 'chase' | 'breath'
/** Огни гирлянды поверх ели: сложение цвета, мерцание у каждой лампочки своё.
 *  progress (0..1) — сколько огней погашено сверху вниз (для таймера). */
export function TreeLights({ tree, colors, count = 60, mode = 'twinkle', size = 1, progress = 0, z, displayScale = 1, seed = 3, spiral = 0 }: {
  tree: TreeResult | null; colors: string[]; count?: number; mode?: LightMode; size?: number; progress?: number
  z?: number; displayScale?: number; seed?: number
  /** 0 — огни по веткам, >0 — спираль гирлянды (витков) */
  spiral?: number
}) {
  const { k, paused, reduced, clock } = useStage()
  const cv = useRef<HTMLCanvasElement>(null)
  const prog = useRef(progress)
  prog.current = progress
  const bulbs = useMemo(() => {
    if (!tree) return []
    const out: (TreeAnchor & { c: string; ph: number; sp: number; i: number })[] = []
    let s = seed
    const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647 }
    if (spiral > 0) {
      for (let i = 0; i < count; i++) {
        const f = i / count
        // шаг по длине спирали, а не по высоте: у макушки витки короче,
        // иначе огни слипаются там в сплошные штрихи
        const t = 0.06 + Math.sqrt(f) * 0.9
        const ang = f * spiral * Math.PI * 2
        const y = tree.crownTop + (tree.crownBottom - tree.crownTop) * t
        const hw = tree.halfAt(t) * 0.92
        const front = Math.cos(ang)
        if (front < -0.2) continue                                   // за стволом не видно
        out.push({ x: tree.apex.x + Math.sin(ang) * hw, y: y + front * hw * 0.06, d: (front + 1) / 2, t, c: colors[i % colors.length], ph: rnd() * 6.28, sp: 0.6 + rnd() * 1.6, i })
      }
    } else {
      const pool = tree.anchors.filter(a => a.d > 0.55)
      for (let i = 0; i < Math.min(count, pool.length); i++) {
        const a = pool[Math.floor((i / Math.min(count, pool.length)) * pool.length)]
        out.push({ ...a, c: colors[i % colors.length], ph: rnd() * 6.28, sp: 0.6 + rnd() * 1.6, i })
      }
    }
    return out.sort((a, b) => a.y - b.y)
  }, [tree, colors, count, seed, spiral])

  useEffect(() => {
    const c = cv.current
    if (!c || !tree) return
    const KK = Math.min(2, k * displayScale)
    c.width = Math.round(tree.w * KK)
    c.height = Math.round(tree.h * KK)
    const g = c.getContext('2d')!
    const sprites = new Map<string, HTMLCanvasElement>()
    const sprite = (col: string) => {
      let sp = sprites.get(col)
      if (sp) return sp
      sp = document.createElement('canvas')
      sp.width = sp.height = 64
      const q = sp.getContext('2d')!
      const gr = q.createRadialGradient(32, 32, 0, 32, 32, 32)
      gr.addColorStop(0, 'rgba(255,255,245,1)')
      gr.addColorStop(0.12, col)
      gr.addColorStop(0.35, col.replace(/[\d.]+\)$/, '0.35)'))
      gr.addColorStop(1, 'rgba(0,0,0,0)')
      q.fillStyle = gr
      q.fillRect(0, 0, 64, 64)
      sprites.set(col, sp)
      return sp
    }
    let raf = 0
    const frame = () => {
      const t = clock.now()
      g.setTransform(1, 0, 0, 1, 0, 0)
      g.clearRect(0, 0, c.width, c.height)
      g.setTransform(KK, 0, 0, KK, 0, 0)
      g.globalCompositeOperation = 'lighter'
      const n = bulbs.length
      bulbs.forEach((b, idx) => {
        const off = prog.current > 0 && idx < Math.floor(prog.current * n)
        let a = 1
        if (mode === 'twinkle') a = 0.55 + 0.45 * Math.sin(t * b.sp * 2 + b.ph)
        else if (mode === 'chase') a = 0.35 + 0.65 * Math.max(0, Math.sin(t * 4 - idx * 0.5))
        else a = 0.7 + 0.3 * Math.sin(t * 1.2 + b.t * 6)
        if (reduced) a = 0.9
        if (off) a = 0.06
        const r = (5 + b.d * 7) * size
        g.globalAlpha = a
        g.drawImage(sprite(b.c), b.x - r * 2, b.y - r * 2, r * 4, r * 4)
      })
      if (!paused && !reduced) raf = requestAnimationFrame(frame)
    }
    frame()
    return () => cancelAnimationFrame(raf)
  }, [tree, bulbs, k, paused, reduced, clock, mode, size, displayScale])

  if (!tree) return null
  return <canvas ref={cv} className="nyl-lights" style={{ width: tree.w * displayScale, height: tree.h * displayScale, zIndex: z }} />
}

/** Повтор/пауза для небольших «ручных» анимаций на requestAnimationFrame. */
export function useFrame(fn: (t: number) => void, deps: unknown[] = []) {
  const { clock, paused, reduced } = useStage()
  const cb = useRef(fn)
  cb.current = fn
  const tick = useCallback(() => cb.current(clock.now()), [clock])
  useEffect(() => {
    let raf = 0
    const loop = () => { tick(); if (!paused && !reduced) raf = requestAnimationFrame(loop) }
    loop()
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, paused, reduced, ...deps])
}
