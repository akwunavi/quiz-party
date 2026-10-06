// ═══ Морозный узор на стекле ═══
// Дендриты растут от краёв внутрь, ветвятся под 60° (лёд гексагональный),
// к кончикам тоньше и прозрачнее; поверх — молочная дымка у кромок.
// Рисуется один раз; «нарастание» инея — это маска поверх готового узора.
import { rng, range, type Rng } from './rng'
import { STAGE_H, STAGE_W } from './particles'

const cache = new Map<string, HTMLCanvasElement>()

export function renderFrost(seed: number, scale: number, density = 1): HTMLCanvasElement {
  const key = `${seed}:${scale}:${density}`
  const hit = cache.get(key)
  if (hit) return hit
  const W = STAGE_W, H = STAGE_H
  const c = document.createElement('canvas')
  c.width = Math.round(W * scale)
  c.height = Math.round(H * scale)
  const g = c.getContext('2d')!
  g.scale(scale, scale)
  const r = rng(seed)

  // молочная дымка: у кромки стекло почти белое, к центру чистое
  const haze = g.createRadialGradient(W / 2, H / 2, H * 0.32, W / 2, H / 2, W * 0.62)
  haze.addColorStop(0, 'rgba(225,240,255,0)')
  haze.addColorStop(0.6, 'rgba(225,240,255,0.16)')
  haze.addColorStop(1, 'rgba(235,246,255,0.5)')
  g.fillStyle = haze
  g.fillRect(0, 0, W, H)

  g.lineCap = 'round'
  const paths = [new Path2D(), new Path2D(), new Path2D()]       // толстые / средние / тонкие
  // «перо» инея: ствол идёт мелкими шагами с лёгким изгибом, на каждом
  // шаге — пара боковых бородок под ±60°, которые сами ветвятся ещё раз
  const grow = (x: number, y: number, ang: number, len: number, depth: number, rr: Rng) => {
    let cx = x, cy = y, a = ang
    const bend = range(rr, -0.035, 0.035)
    const steps = depth === 0 ? Math.round(len / 7) : Math.round(len / 5)
    const seg = depth === 0 ? 7 : 5
    for (let step = 0; step < steps; step++) {
      a += bend + range(rr, -0.05, 0.05)
      const nx = cx + Math.cos(a) * seg, ny = cy + Math.sin(a) * seg
      paths[Math.min(2, depth)].moveTo(cx, cy)
      paths[Math.min(2, depth)].lineTo(nx, ny)
      const left = 1 - step / steps                       // бородки короче к кончику
      if (depth < 2 && step % 2 === 0 && left > 0.08) {
        const bl = len * (depth === 0 ? 0.24 : 0.38) * left * range(rr, 0.7, 1.1)
        if (bl > 4) {
          grow(nx, ny, a + Math.PI / 3, bl, depth + 1, rr)
          if (rr() < 0.85) grow(nx, ny, a - Math.PI / 3, bl * range(rr, 0.8, 1), depth + 1, rr)
        }
      }
      cx = nx; cy = ny
      if (cx < -40 || cy < -40 || cx > W + 40 || cy > H + 40) break
    }
  }
  const n = Math.round(70 * density)
  for (let i = 0; i < n; i++) {
    const edge = Math.floor(r() * 4)
    const t = r()
    let x = 0, y = 0, a = 0
    if (edge === 0) { x = t * W; y = -4; a = Math.PI / 2 }
    else if (edge === 1) { x = W + 4; y = t * H; a = Math.PI }
    else if (edge === 2) { x = t * W; y = H + 4; a = -Math.PI / 2 }
    else { x = -4; y = t * H; a = 0 }
    // к центру края — короче (иней гуще в углах)
    const corner = Math.abs(t - 0.5) * 2
    grow(x, y, a + range(r, -0.6, 0.6), range(r, 120, 260) * (0.6 + corner * 0.7), 0, r)
  }
  // россыпь мелких кристаллов
  for (let i = 0; i < 260 * density; i++) {
    const x = r() * W, y = r() * H
    const dc = Math.min(x, y, W - x, H - y) / (H / 2)
    if (r() > 1.2 - dc * 1.6) continue
    const s = range(r, 1.5, 4)
    for (let k = 0; k < 3; k++) {
      const a = (k * Math.PI) / 3
      paths[2].moveTo(x - Math.cos(a) * s, y - Math.sin(a) * s)
      paths[2].lineTo(x + Math.cos(a) * s, y + Math.sin(a) * s)
    }
  }
  g.strokeStyle = 'rgba(240,248,255,0.62)'; g.lineWidth = 2.1; g.stroke(paths[0])
  g.strokeStyle = 'rgba(236,246,255,0.5)'; g.lineWidth = 1.3; g.stroke(paths[1])
  g.strokeStyle = 'rgba(230,243,255,0.42)'; g.lineWidth = 0.8; g.stroke(paths[2])
  // мягкое свечение узора
  g.globalCompositeOperation = 'lighter'
  g.filter = 'blur(3px)'
  g.strokeStyle = 'rgba(190,225,255,0.18)'; g.lineWidth = 4; g.stroke(paths[0])
  g.filter = 'none'
  g.globalCompositeOperation = 'source-over'
  cache.set(key, c)
  return c
}
