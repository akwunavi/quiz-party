// ═══ Частицы сцены: снег, конфетти, серпантин, золотая пыль, дым хлопушки ═══
// Один холст на слой глубины. Всё в логических координатах сцены 1920×1080.
// Материалы ведут себя по-разному:
//  • снег — падает с покачиванием, дальний слой мельче/медленнее/тусклее,
//    ближний — крупные размытые хлопья (боке), ветер общий для всех;
//  • бумажное конфетти — кувыркается (видимая ширина = |cos| угла переворота),
//    у тыльной стороны темнее, сопротивление воздуха гасит скорость, отсюда
//    «порхание» при падении;
//  • фольга — то же, но в момент, когда плоскость встаёт к свету, вспыхивает;
//  • серпантин — цепочка точек (верле), лента вьётся и оседает;
//  • золотая пыль — светится (сложение цветов), мерцает и гаснет;
//  • дым хлопушки — расширяется и тает.
import { rng, range, clamp, type Rng } from './rng'

export const STAGE_W = 1920
export const STAGE_H = 1080

export interface SnowLayer {
  count: number
  size: [number, number]
  speed: [number, number]
  opacity: number
  blur?: number
  /** снежинка-кристалл вместо комка (крупный передний план) */
  crystal?: boolean
  /** бумажный «снег» из дырокола: матовые кружки с тенью */
  paper?: boolean
}
export interface SnowCfg {
  layers: SnowLayer[]
  wind?: number
  color?: string
  /** порывы: амплитуда добавки ветра */
  gust?: number
  /** ограничить область (например, снег только за окном) */
  clip?: { x: number; y: number; w: number; h: number } | null
}

export type ConfettiMaterial = 'paper' | 'foil' | 'gold'
export interface BurstCfg {
  x: number
  y: number
  /** направление, радианы (−π/2 — вверх) */
  angle: number
  spread: number
  speed: [number, number]
  count: number
  colors: string[]
  material?: ConfettiMaterial
  shapes?: ('rect' | 'circle' | 'strip' | 'star')[]
  size?: [number, number]
  streamers?: number
  gravity?: number
  smoke?: boolean
  sparks?: number
  delay?: number
  /** разброс точки вылета по горизонтали (дождь сверху, а не из точки) */
  xSpread?: number
}
export interface DustCfg {
  count: number
  area: { x: number; y: number; w: number; h: number }
  color: string
  size: [number, number]
  rise?: number
  life?: [number, number]
}

interface Flake { x: number; y: number; z: number; s: number; v: number; ph: number; layer: number; rot: number; vr: number }
interface Piece {
  x: number; y: number; vx: number; vy: number; rot: number; vr: number; flip: number; vf: number
  w: number; h: number; color: string; shape: string; material: ConfettiMaterial; life: number; born: number
}
interface Streamer { pts: { x: number; y: number; px: number; py: number }[]; color: string; width: number; born: number }
interface Mote { x: number; y: number; vx: number; vy: number; s: number; life: number; age: number; tw: number; color: string; kind: 'dust' | 'spark' | 'smoke' }

const spriteCache = new Map<string, HTMLCanvasElement>()
function softSprite(color: string, blur: number): HTMLCanvasElement {
  const key = color + blur
  const hit = spriteCache.get(key)
  if (hit) return hit
  const R = 32
  const c = document.createElement('canvas')
  c.width = c.height = R * 2
  const g = c.getContext('2d')!
  const gr = g.createRadialGradient(R, R, 0, R, R, R)
  const hard = clamp(1 - blur, 0.05, 0.95)
  gr.addColorStop(0, color)
  gr.addColorStop(hard * 0.6, color)
  gr.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = gr
  g.fillRect(0, 0, R * 2, R * 2)
  spriteCache.set(key, c)
  return c
}
function crystalSprite(color: string): HTMLCanvasElement {
  const key = 'x' + color
  const hit = spriteCache.get(key)
  if (hit) return hit
  const R = 48
  const c = document.createElement('canvas')
  c.width = c.height = R * 2
  const g = c.getContext('2d')!
  g.translate(R, R)
  g.strokeStyle = color
  g.lineCap = 'round'
  g.shadowColor = color
  g.shadowBlur = 4
  for (let k = 0; k < 6; k++) {
    g.save()
    g.rotate((k * Math.PI) / 3)
    g.lineWidth = 3
    g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -R * 0.86); g.stroke()
    g.lineWidth = 2
    for (const f of [0.35, 0.58, 0.76]) {
      const L = R * (0.32 - f * 0.22)
      g.beginPath()
      g.moveTo(0, -R * f); g.lineTo(L * 0.8, -R * f - L * 0.7)
      g.moveTo(0, -R * f); g.lineTo(-L * 0.8, -R * f - L * 0.7)
      g.stroke()
    }
    g.restore()
  }
  spriteCache.set(key, c)
  return c
}

export class ParticleField {
  private g: CanvasRenderingContext2D
  private k = 1
  private flakes: Flake[] = []
  private snow: SnowCfg | null = null
  private pieces: Piece[] = []
  private streamers: Streamer[] = []
  private motes: Mote[] = []
  private raf = 0
  private last = 0
  private time = 0
  private running = false
  private r: Rng
  private pending: { at: number; fn: () => void }[] = []
  private emitters: { x: number; y: number; rate: number; acc: number; color: string; speed: [number, number] }[] = []
  reduced = false

  constructor(private canvas: HTMLCanvasElement, seed = 7) {
    this.g = canvas.getContext('2d')!
    this.r = rng(seed)
  }

  resize(k: number) {
    this.k = k
    this.canvas.width = Math.round(STAGE_W * k)
    this.canvas.height = Math.round(STAGE_H * k)
    if (!this.running) this.draw()
  }

  setSnow(cfg: SnowCfg | null) {
    this.snow = cfg
    this.flakes = []
    if (!cfg) return
    cfg.layers.forEach((L, li) => {
      for (let i = 0; i < L.count; i++) {
        const area = cfg.clip ?? { x: 0, y: 0, w: STAGE_W, h: STAGE_H }
        this.flakes.push({
          x: area.x + this.r() * area.w, y: area.y + this.r() * area.h, z: li,
          s: range(this.r, L.size[0], L.size[1]), v: range(this.r, L.speed[0], L.speed[1]),
          ph: this.r() * Math.PI * 2, layer: li, rot: this.r() * 6, vr: range(this.r, -0.5, 0.5),
        })
      }
    })
    if (!this.running) this.draw()
  }

  burst(c: BurstCfg) {
    // «без движения»: дождь сверху застыл бы ровной полосой — его не показываем,
    // залпы хлопушек остаются застывшим веером
    if (this.reduced && c.xSpread) return
    const run = () => {
      const shapes = c.shapes ?? ['rect', 'rect', 'circle', 'strip']
      for (let i = 0; i < c.count; i++) {
        const a = c.angle + range(this.r, -c.spread, c.spread)
        const sp = range(this.r, c.speed[0], c.speed[1])
        const [s0, s1] = c.size ?? [10, 18]
        const shape = shapes[Math.floor(this.r() * shapes.length)]
        const w = range(this.r, s0, s1)
        this.pieces.push({
          x: c.x + range(this.r, -6, 6) + (c.xSpread ? range(this.r, -c.xSpread, c.xSpread) : 0), y: c.y + range(this.r, -6, 6),
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          rot: this.r() * Math.PI * 2, vr: range(this.r, -9, 9),
          flip: this.r() * Math.PI * 2, vf: range(this.r, 5, 14),
          w, h: shape === 'strip' ? w * 0.28 : shape === 'circle' ? w * 0.7 : w * 0.62,
          color: c.colors[Math.floor(this.r() * c.colors.length)], shape,
          material: c.material ?? 'paper', life: range(this.r, 5, 8), born: this.time,
        })
      }
      for (let i = 0; i < (c.streamers ?? 0); i++) {
        const a = c.angle + range(this.r, -c.spread * 0.8, c.spread * 0.8)
        const sp = range(this.r, c.speed[0] * 0.8, c.speed[1] * 1.05)
        const pts = Array.from({ length: 16 }, (_, j) => {
          const x = c.x - Math.cos(a) * j * 3, y = c.y - Math.sin(a) * j * 3
          const dt = 1 / 60
          return { x, y, px: x - Math.cos(a) * sp * dt * (1 - j * 0.03), py: y - Math.sin(a) * sp * dt * (1 - j * 0.03) }
        })
        this.streamers.push({ pts, color: c.colors[Math.floor(this.r() * c.colors.length)], width: range(this.r, 5, 8), born: this.time })
      }
      if (c.smoke) {
        for (let i = 0; i < 9; i++) {
          const a = c.angle + range(this.r, -0.5, 0.5)
          const sp = range(this.r, 60, 240)
          this.motes.push({ x: c.x, y: c.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, s: range(this.r, 20, 42), life: range(this.r, 0.9, 1.6), age: 0, tw: 0, color: 'rgba(235,228,220,0.28)', kind: 'smoke' })
        }
      }
      for (let i = 0; i < (c.sparks ?? 0); i++) {
        const a = c.angle + range(this.r, -c.spread * 1.2, c.spread * 1.2)
        const sp = range(this.r, c.speed[0] * 0.6, c.speed[1] * 1.3)
        this.motes.push({ x: c.x, y: c.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, s: range(this.r, 2, 5), life: range(this.r, 0.5, 1.2), age: 0, tw: this.r() * 6, color: 'rgba(255,214,140,1)', kind: 'spark' })
      }
      if (this.reduced) this.settle()
    }
    if (c.delay) this.pending.push({ at: this.time + c.delay, fn: run })
    else run()
  }

  dust(c: DustCfg) {
    for (let i = 0; i < c.count; i++) {
      this.motes.push({
        x: c.area.x + this.r() * c.area.w, y: c.area.y + this.r() * c.area.h,
        vx: range(this.r, -8, 8), vy: -range(this.r, 4, c.rise ?? 20),
        s: range(this.r, c.size[0], c.size[1]), life: range(this.r, ...(c.life ?? [3, 7])), age: this.r() * 2,
        tw: this.r() * 6, color: c.color, kind: 'dust',
      })
    }
  }

  /** постоянный источник искр (бенгальский огонь) */
  emit(e: { x: number; y: number; rate: number; color?: string; speed?: [number, number] }) {
    this.emitters.push({ x: e.x, y: e.y, rate: e.rate, acc: 0, color: e.color ?? 'rgba(255,226,170,1)', speed: e.speed ?? [120, 420] })
    if (this.reduced) {
      for (let i = 0; i < 40; i++) this.step(1 / 60)
      this.draw()
    }
  }

  clearBursts() {
    this.pieces = []; this.streamers = []; this.motes = []; this.pending = []
    if (!this.running) this.draw()
  }

  /** без движения: прокрутить физику вперёд и показать один кадр */
  private settle() {
    for (let i = 0; i < 70; i++) this.step(1 / 60)
    this.draw()
  }

  start() {
    if (this.running) return
    if (this.reduced) { this.draw(); return }
    this.running = true
    this.last = performance.now()
    const loop = (now: number) => {
      if (!this.running) return
      const dt = Math.min(0.05, (now - this.last) / 1000)
      this.last = now
      this.step(dt)
      this.draw()
      this.raf = requestAnimationFrame(loop)
    }
    this.raf = requestAnimationFrame(loop)
  }
  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }
  destroy() { this.stop(); this.flakes = []; this.pieces = []; this.streamers = []; this.motes = [] }

  private step(dt: number) {
    this.time += dt
    if (this.pending.length) {
      const due = this.pending.filter(p => p.at <= this.time)
      this.pending = this.pending.filter(p => p.at > this.time)
      due.forEach(p => p.fn())
    }
    for (const e of this.emitters) {
      e.acc += e.rate * dt
      while (e.acc >= 1) {
        e.acc -= 1
        const a = this.r() * Math.PI * 2
        const sp = range(this.r, e.speed[0], e.speed[1])
        this.motes.push({ x: e.x, y: e.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 60, s: range(this.r, 1.2, 2.6), life: range(this.r, 0.25, 0.7), age: 0, tw: 0, color: e.color, kind: 'spark' })
      }
    }
    const sn = this.snow
    if (sn) {
      const wind = (sn.wind ?? 0) + Math.sin(this.time * 0.37) * (sn.gust ?? 0) * Math.max(0, Math.sin(this.time * 0.11))
      const area = sn.clip ?? { x: 0, y: 0, w: STAGE_W, h: STAGE_H }
      for (const f of this.flakes) {
        const L = sn.layers[f.layer]
        const depth = 0.4 + 0.6 * (f.layer / Math.max(1, sn.layers.length - 1))
        f.ph += dt * (0.8 + f.v * 0.004)
        f.y += f.v * dt
        f.x += (wind * depth + Math.sin(f.ph) * 18 * depth) * dt
        f.rot += f.vr * dt
        if (f.y > area.y + area.h + 20) { f.y = area.y - 20; f.x = area.x + this.r() * area.w }
        if (f.x > area.x + area.w + 30) f.x = area.x - 30
        if (f.x < area.x - 30) f.x = area.x + area.w + 30
        void L
      }
    }
    for (const p of this.pieces) {
      // сопротивление воздуха сильнее, когда лист плашмя (|cos flip| велик)
      const flat = Math.abs(Math.cos(p.flip))
      const drag = p.material === 'gold' ? 1.1 : 1.6 + flat * 1.6
      p.vx -= p.vx * drag * dt
      p.vy -= p.vy * drag * dt * 0.9
      p.vy += 820 * dt * (p.shape === 'strip' ? 0.7 : 1)
      // порхание: плоский лист скользит вбок по фазе переворота
      p.vx += Math.sin(p.flip) * 60 * flat * dt
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.rot += p.vr * dt
      p.flip += p.vf * dt
    }
    this.pieces = this.pieces.filter(p => this.time - p.born < p.life && p.y < STAGE_H + 60)
    for (const s of this.streamers) {
      for (const q of s.pts) {
        const vx = (q.x - q.px) * 0.985, vy = (q.y - q.py) * 0.985
        q.px = q.x; q.py = q.y
        q.x += vx; q.y += vy + 640 * dt * dt
      }
      for (let it = 0; it < 3; it++) {
        for (let j = 1; j < s.pts.length; j++) {
          const a = s.pts[j - 1], b = s.pts[j]
          const dx = b.x - a.x, dy = b.y - a.y
          const d = Math.hypot(dx, dy) || 1
          const diff = (d - 9) / d * 0.5
          a.x += dx * diff; a.y += dy * diff
          b.x -= dx * diff; b.y -= dy * diff
        }
      }
    }
    this.streamers = this.streamers.filter(s => this.time - s.born < 7 && s.pts[0].y < STAGE_H + 200)
    for (const m of this.motes) {
      m.age += dt
      if (m.kind === 'spark') { m.vy += 300 * dt; m.vx *= 1 - 1.5 * dt; m.vy *= 1 - 1.5 * dt }
      if (m.kind === 'smoke') { m.vx *= 1 - 3 * dt; m.vy *= 1 - 3 * dt; m.s += 40 * dt }
      m.x += m.vx * dt; m.y += m.vy * dt
      if (m.kind === 'dust' && m.age > m.life) { m.age = 0; m.y += 40 }
    }
    this.motes = this.motes.filter(m => m.kind === 'dust' || m.age < m.life)
  }

  private draw() {
    const g = this.g
    g.setTransform(1, 0, 0, 1, 0, 0)
    g.clearRect(0, 0, this.canvas.width, this.canvas.height)
    g.setTransform(this.k, 0, 0, this.k, 0, 0)
    const sn = this.snow
    if (sn) {
      if (sn.clip) { g.save(); g.beginPath(); g.rect(sn.clip.x, sn.clip.y, sn.clip.w, sn.clip.h); g.clip() }
      sn.layers.forEach((L, li) => {
        const spr = L.crystal ? crystalSprite(sn.color ?? 'rgba(240,248,255,0.95)') : softSprite(sn.color ?? 'rgba(255,255,255,1)', L.blur ?? 0.3)
        g.globalAlpha = L.opacity
        for (const f of this.flakes) {
          if (f.layer !== li) continue
          if (L.paper) {
            g.fillStyle = 'rgba(80,50,20,0.22)'
            g.beginPath(); g.arc(f.x + f.s * 0.35, f.y + f.s * 0.45, f.s, 0, Math.PI * 2); g.fill()
            g.fillStyle = sn.color ?? '#fffaf0'
            g.beginPath(); g.ellipse(f.x, f.y, f.s, f.s * (0.55 + 0.45 * Math.abs(Math.cos(f.rot))), f.rot, 0, Math.PI * 2); g.fill()
          } else if (L.crystal) {
            g.save(); g.translate(f.x, f.y); g.rotate(f.rot)
            g.drawImage(spr, -f.s, -f.s, f.s * 2, f.s * 2)
            g.restore()
          } else g.drawImage(spr, f.x - f.s, f.y - f.s, f.s * 2, f.s * 2)
        }
      })
      g.globalAlpha = 1
      if (sn.clip) g.restore()
    }
    for (const m of this.motes) {
      if (m.kind === 'smoke') {
        g.globalAlpha = Math.max(0, 1 - m.age / m.life) * 0.8
        g.drawImage(softSprite(m.color, 0.9), m.x - m.s, m.y - m.s, m.s * 2, m.s * 2)
      }
    }
    g.globalAlpha = 1
    for (const s of this.streamers) {
      const fade = clamp(7 - (this.time - s.born), 0, 1)
      g.globalAlpha = fade
      for (let j = 1; j < s.pts.length; j++) {
        const a = s.pts[j - 1], b = s.pts[j]
        const tw = Math.abs(Math.sin(j * 0.9 + this.time * 3))       // лента скручивается
        g.strokeStyle = s.color
        g.lineWidth = s.width * (0.25 + 0.75 * tw)
        g.lineCap = 'round'
        g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke()
        if (tw > 0.8) {
          g.strokeStyle = 'rgba(255,255,255,0.35)'
          g.lineWidth = s.width * 0.25
          g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke()
        }
      }
    }
    g.globalAlpha = 1
    for (const p of this.pieces) {
      const age = this.time - p.born
      const fade = clamp(p.life - age, 0, 1)
      const c = Math.cos(p.flip)
      const sx = Math.max(0.08, Math.abs(c))
      g.save()
      g.globalAlpha = fade
      g.translate(p.x, p.y)
      g.rotate(p.rot)
      g.scale(1, sx)
      g.fillStyle = p.color
      if (p.shape === 'circle') { g.beginPath(); g.arc(0, 0, p.w / 2, 0, Math.PI * 2); g.fill() }
      else if (p.shape === 'star') {
        g.beginPath()
        for (let k = 0; k < 10; k++) {
          const rr = k % 2 ? p.w * 0.22 : p.w * 0.55
          const a = (k * Math.PI) / 5
          g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr)
        }
        g.closePath(); g.fill()
      } else g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      // тыльная сторона темнее; фольга вспыхивает, когда встаёт к свету
      if (c < 0) { g.fillStyle = 'rgba(0,0,0,0.28)'; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h) }
      if ((p.material === 'foil' || p.material === 'gold') && c > 0.86) {
        g.fillStyle = `rgba(255,255,240,${(c - 0.86) * 5})`
        g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      }
      g.restore()
    }
    g.globalCompositeOperation = 'lighter'
    for (const m of this.motes) {
      if (m.kind === 'smoke') continue
      const life = m.kind === 'dust' ? Math.sin(Math.PI * clamp(m.age / m.life)) : 1 - m.age / m.life
      const tw = m.kind === 'dust' ? 0.55 + 0.45 * Math.sin(this.time * 3 + m.tw) : 1
      g.globalAlpha = Math.max(0, life * tw)
      g.drawImage(softSprite(m.color, 0.7), m.x - m.s * 2, m.y - m.s * 2, m.s * 4, m.s * 4)
    }
    g.globalCompositeOperation = 'source-over'
    g.globalAlpha = 1
  }
}
