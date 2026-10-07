// ═══ Наряженная ель: хвоя + игрушки + гирлянда (+ отражение) одним блоком ═══
// Ставится на сцену за основание (baseAt) — так ель «стоит» на полу/снегу,
// а не висит в воздухе. Игрушки рисуются один раз на свой холст (стекло,
// винтаж, бумага, лёд — у каждого мира свой материал), огни — отдельным
// анимированным холстом.
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Tree, TreeLights, useStage, type LightMode } from './stage'
import { treeBox, type TreeOpts, type TreeResult } from './tree'
import { rng, range } from './rng'

export type OrnamentKind = 'glass' | 'vintage' | 'paper' | 'ice' | 'gold'

export interface OrnamentCfg { kind: OrnamentKind; colors: string[]; count: number; size?: number; seed?: number }
export interface LightsCfg { colors: string[]; count?: number; mode?: LightMode; size?: number; spiral?: number; progress?: number; seed?: number }

export function DecoratedTree({ opts, baseX, baseY, displayHeight, ornaments, lights, className, style, topper, children, reflection }: {
  opts: TreeOpts
  /** точка, где ствол касается пола, в координатах сцены */
  baseX: number
  baseY: number
  displayHeight?: number
  ornaments?: OrnamentCfg
  lights?: LightsCfg
  className?: string
  style?: CSSProperties
  /** элемент на макушке (звезда), позиционируется в точке макушки */
  topper?: ReactNode
  children?: ReactNode
  /** отражение на глянцевом полу */
  reflection?: { opacity: number; blur?: number }
}) {
  const box = treeBox(opts)
  const f = displayHeight ? displayHeight / opts.height : 1
  const [tree, setTree] = useState<TreeResult | null>(null)
  const left = baseX - box.apexX * f
  const top = baseY - box.groundY * f
  const W = box.w * f, H = box.h * f
  return (
    <div className={`nyl-dtree ${className ?? ''}`} style={{ position: 'absolute', left, top, width: W, height: H, ...style }}>
      {reflection && (
        <div className="nyl-dtree-refl" style={{
          position: 'absolute', left: 0, top: box.groundY * f * 2 - H * 0.02, width: W, height: H,
          transform: 'scaleY(-1)', transformOrigin: '50% 0', opacity: reflection.opacity,
          filter: `blur(${reflection.blur ?? 3}px)`,
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0) 45%)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0) 45%)',
        }}>
          <Tree opts={opts} displayHeight={displayHeight} style={{ left: 0, top: 0 }} />
        </div>
      )}
      <Tree opts={opts} displayHeight={displayHeight} style={{ left: 0, top: 0 }} onTree={setTree} />
      {ornaments && tree && <Ornaments tree={tree} cfg={ornaments} scale={f} />}
      {lights && tree && (
        <div style={{ position: 'absolute', left: 0, top: 0 }}>
          <TreeLights tree={tree} displayScale={f} {...lights} />
        </div>
      )}
      {topper && <div className="nyl-dtree-topper" style={{ position: 'absolute', left: box.apexX * f, top: box.apexY * f }}>{topper}</div>}
      {children}
    </div>
  )
}

function Ornaments({ tree, cfg, scale }: { tree: TreeResult; cfg: OrnamentCfg; scale: number }) {
  const { k } = useStage()
  const cv = useRef<HTMLCanvasElement>(null)
  const picks = useMemo(() => {
    const r = rng(cfg.seed ?? 5)
    const pool = tree.anchors.filter(a => a.d > 0.6 && a.t > 0.12)
    const out: { x: number; y: number; d: number; c: string; v: number }[] = []
    const n = Math.min(cfg.count, pool.length)
    for (let i = 0; i < n; i++) {
      const a = pool[Math.floor(((i + r() * 0.8) / n) * pool.length)]
      // не ставим игрушки вплотную друг к другу
      if (out.some(o => Math.hypot(o.x - a.x, o.y - a.y) < (cfg.size ?? 1) * tree.h * 0.03)) continue
      out.push({ x: a.x, y: a.y, d: a.d, c: cfg.colors[i % cfg.colors.length], v: r() })
    }
    return out
  }, [tree, cfg])
  useEffect(() => {
    const c = cv.current!
    const KK = Math.min(2, k * scale)
    c.width = Math.round(tree.w * KK)
    c.height = Math.round(tree.h * KK)
    const g = c.getContext('2d')!
    g.setTransform(KK, 0, 0, KK, 0, 0)
    const R0 = tree.h * 0.0135 * (cfg.size ?? 1)
    const r = rng((cfg.seed ?? 5) + 1)
    for (const o of picks) drawOrnament(g, cfg.kind, o.x, o.y, R0 * (0.75 + o.d * 0.45) * range(r, 0.85, 1.15), o.c, o.v)
  }, [picks, k, scale, tree, cfg])
  return <canvas ref={cv} className="nyl-ornaments" style={{ position: 'absolute', left: 0, top: 0, width: tree.w * scale, height: tree.h * scale }} />
}

/** Игрушка: стекло (шар с бликом), винтаж (сосулька/шишка/шар-«рефлектор»),
 *  бумага (плоская с тенью), лёд (прозрачная с преломлением), золото. */
export function drawOrnament(g: CanvasRenderingContext2D, kind: OrnamentKind, x: number, y: number, R: number, color: string, v: number) {
  g.save()
  // ниточка к ветке
  g.strokeStyle = kind === 'paper' ? 'rgba(60,40,30,0.6)' : 'rgba(230,210,170,0.55)'
  g.lineWidth = Math.max(0.6, R * 0.06)
  g.beginPath(); g.moveTo(x, y - R * 1.6); g.lineTo(x, y - R * 0.9); g.stroke()
  if (kind === 'vintage' && v < 0.33) {
    // сосулька
    const L = R * 3.2
    const gr = g.createLinearGradient(x - R * 0.5, 0, x + R * 0.5, 0)
    gr.addColorStop(0, shade(color, -0.35)); gr.addColorStop(0.35, shade(color, 0.35)); gr.addColorStop(1, shade(color, -0.45))
    g.fillStyle = gr
    g.beginPath(); g.moveTo(x - R * 0.42, y - R * 0.8); g.lineTo(x + R * 0.42, y - R * 0.8); g.lineTo(x, y - R * 0.8 + L); g.closePath(); g.fill()
    g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = R * 0.08
    for (let k = 1; k < 5; k++) { const yy = y - R * 0.8 + (L * k) / 5; const ww = R * 0.42 * (1 - k / 5); g.beginPath(); g.moveTo(x - ww, yy); g.lineTo(x + ww, yy + R * 0.2); g.stroke() }
    cap(g, x, y - R * 0.8, R * 0.7)
  } else if (kind === 'vintage' && v < 0.55) {
    // шишка
    const gr = g.createRadialGradient(x - R * 0.3, y - R * 0.2, R * 0.1, x, y + R * 0.3, R * 1.6)
    gr.addColorStop(0, shade(color, 0.4)); gr.addColorStop(1, shade(color, -0.5))
    g.fillStyle = gr
    g.beginPath(); g.ellipse(x, y + R * 0.4, R * 0.62, R * 1.3, 0, 0, Math.PI * 2); g.fill()
    g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = R * 0.07
    for (let k = 0; k < 6; k++) { const yy = y - R * 0.6 + k * R * 0.38; g.beginPath(); g.arc(x, yy, R * 0.6, 0.2, Math.PI - 0.2); g.stroke() }
    g.fillStyle = 'rgba(255,255,255,0.75)'; g.beginPath(); g.ellipse(x - R * 0.25, y - R * 0.2, R * 0.12, R * 0.35, 0.3, 0, Math.PI * 2); g.fill()
    cap(g, x, y - R * 0.85, R * 0.55)
  } else if (kind === 'paper') {
    g.fillStyle = 'rgba(40,20,10,0.25)'
    g.beginPath(); g.arc(x + R * 0.18, y + R * 0.22, R, 0, Math.PI * 2); g.fill()
    g.fillStyle = color
    g.beginPath(); g.arc(x, y, R, 0, Math.PI * 2); g.fill()
    g.strokeStyle = 'rgba(255,248,230,0.7)'; g.lineWidth = R * 0.12
    g.beginPath(); g.arc(x, y, R * 0.62, 0, Math.PI * 2); g.stroke()
  } else {
    const isIce = kind === 'ice'
    const gr = g.createRadialGradient(x - R * 0.35, y - R * 0.4, R * 0.05, x, y, R * 1.05)
    if (isIce) {
      gr.addColorStop(0, 'rgba(255,255,255,0.75)'); gr.addColorStop(0.4, 'rgba(200,230,255,0.18)'); gr.addColorStop(0.85, 'rgba(160,210,255,0.35)'); gr.addColorStop(1, 'rgba(230,245,255,0.8)')
    } else {
      gr.addColorStop(0, shade(color, 0.55)); gr.addColorStop(0.35, color); gr.addColorStop(0.9, shade(color, -0.55)); gr.addColorStop(1, shade(color, -0.3))
    }
    g.fillStyle = gr
    g.beginPath(); g.arc(x, y, R, 0, Math.PI * 2); g.fill()
    if (kind === 'vintage') {
      // «рефлектор»: вдавленная звезда, как у советских шаров
      g.fillStyle = 'rgba(255,255,255,0.22)'
      g.beginPath()
      for (let k = 0; k < 16; k++) { const rr = k % 2 ? R * 0.22 : R * 0.6; const a = (k * Math.PI) / 8; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr) }
      g.closePath(); g.fill()
    }
    // отражённое окно/софит — блик и рефлекс снизу
    g.fillStyle = 'rgba(255,255,255,0.9)'
    g.beginPath(); g.ellipse(x - R * 0.38, y - R * 0.42, R * 0.2, R * 0.13, -0.6, 0, Math.PI * 2); g.fill()
    g.fillStyle = isIce ? 'rgba(255,255,255,0.4)' : 'rgba(255,220,170,0.28)'
    g.beginPath(); g.ellipse(x + R * 0.2, y + R * 0.62, R * 0.45, R * 0.12, 0.2, 0, Math.PI * 2); g.fill()
    cap(g, x, y - R * 0.95, R * 0.5)
  }
  g.restore()
}

function cap(g: CanvasRenderingContext2D, x: number, y: number, w: number) {
  const gr = g.createLinearGradient(x - w / 2, 0, x + w / 2, 0)
  gr.addColorStop(0, '#6d5a32'); gr.addColorStop(0.5, '#f1dc9c'); gr.addColorStop(1, '#5c4a28')
  g.fillStyle = gr
  g.fillRect(x - w / 2, y - w * 0.45, w, w * 0.5)
}

/** осветлить (+) / затемнить (−) цвет #rrggbb */
export function shade(hex: string, amt: number): string {
  const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex)
  if (!m) return hex
  const ch = [1, 2, 3].map(i => parseInt(m[i], 16)).map(c => amt >= 0 ? c + (255 - c) * amt : c * (1 + amt))
  return `rgb(${ch.map(c => Math.round(c)).join(',')})`
}
