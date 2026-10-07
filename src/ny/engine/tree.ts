// ═══ Процедурная ель (2.5D) ═══
// Не треугольник и не ярусы-шаблоны: ель строится как настоящая —
// мутовки ветвей вокруг ствола в 3D (азимут φ), каждая ветвь с провисом и
// чуть вздёрнутым кончиком, на ветви — веточки, на веточках — хвоинки
// (тысячи коротких штрихов). Ветви, смотрящие от зрителя (z < 0), рисуются
// раньше и темнее, к зрителю — позже и светлее: отсюда объём. Снег ложится
// на верхнюю сторону ветвей, иней — на кончики хвои.
// Результат — холст, который рисуется ОДИН раз и дальше только двигается
// трансформами (дорого рисовать, дёшево показывать).
import { rng, range, clamp, lerp } from './rng'

export type HSL = [number, number, number]

export interface TreeOpts {
  seed: number
  /** высота дерева вместе с видимым стволом, css px */
  height: number
  /** полуширина кроны к высоте: 0.28 — узкая ель, 0.42 — пышная пихта */
  spread?: number
  /** число мутовок; по умолчанию от высоты */
  tiers?: number
  /** основной цвет хвои */
  color?: HSL
  /** 0..1 — сколько снега лежит на ветвях */
  snow?: number
  /** 0..1 — иней на кончиках хвои */
  frost?: number
  /** множитель густоты хвои (0.4 — дальний лес, 1 — первый план) */
  density?: number
  /** провис ветвей: 0.6 — пихта Нордмана, 1 — ель, 1.4 — плакучая */
  droop?: number
  /** откуда свет: -1 слева … 1 справа */
  lightX?: number
  /** доля видимого ствола внизу */
  trunk?: number
  /** длина хвоинки относительно высоты (по умолчанию 1) */
  needle?: number
  /** вырезанная бумага / силуэт: всё одним цветом, без теней */
  flat?: string | null
  /** снег в бумажном режиме — плоский, своим цветом */
  flatSnow?: string
  /** воздушная перспектива: подмешать цвет тумана */
  fog?: { color: string; amount: number } | null
  /** множитель разрешения холста (devicePixelRatio × масштаб сцены) */
  scale?: number
  /** тёплая подсветка изнутри (гирлянда), 0..1 */
  innerGlow?: number
}

export interface TreeAnchor { x: number; y: number; d: number; t: number }

export interface TreeResult {
  canvas: HTMLCanvasElement
  /** css-размер холста */
  w: number
  h: number
  /** макушка и основание кроны в координатах холста */
  apex: { x: number; y: number }
  ground: { x: number; y: number }
  /** точки на ветвях для игрушек и огней (d — насколько ветвь к зрителю) */
  anchors: TreeAnchor[]
  /** полуширина кроны на высоте t (0 — макушка, 1 — низ) */
  halfAt: (t: number) => number
  crownTop: number
  crownBottom: number
}

interface Branch { x0: number; y0: number; L: number; phi: number; t: number; z: number; minor: boolean }

const cache = new Map<string, TreeResult>()

/** Габариты холста ели без рисования — для раскладки сцены. */
export function treeBox(o: Pick<TreeOpts, 'height' | 'spread' | 'trunk'>) {
  const H = o.height
  const pad = H * 0.05
  const w = Math.ceil(H * (o.spread ?? 0.34) * 2 * 1.16 + pad * 2)
  const h = Math.ceil(H + pad * 1.2)
  return { w, h, apexX: w / 2, apexY: pad, groundY: pad + H }
}

export function renderTree(o: TreeOpts): TreeResult {
  const key = JSON.stringify(o)
  const hit = cache.get(key)
  if (hit) return hit
  const res = draw(o)
  cache.set(key, res)
  return res
}

function draw(o: TreeOpts): TreeResult {
  const r = rng(o.seed)
  const S = o.scale ?? 1
  const H = o.height
  const spread = o.spread ?? 0.34
  const droop = o.droop ?? 1
  const density = o.density ?? 1
  const snow = o.snow ?? 0
  const frost = o.frost ?? 0
  const lightX = o.lightX ?? -0.5
  const flat = o.flat ?? null
  const [hue, sat, lig] = o.color ?? [140, 32, 22]
  const pad = H * 0.05
  const W = Math.ceil(H * spread * 2 * 1.16 + pad * 2)
  const Hc = Math.ceil(H + pad * 1.2)
  const cv = document.createElement('canvas')
  cv.width = Math.max(1, Math.round(W * S))
  cv.height = Math.max(1, Math.round(Hc * S))
  const g = cv.getContext('2d')!
  g.scale(S, S)
  g.lineCap = 'round'

  const cx = W / 2 + range(r, -1, 1) * H * 0.006
  const top = pad
  const trunkFrac = o.trunk ?? 0.06
  const crownH = H * (1 - trunkFrac)
  const crownBottom = top + crownH
  const ground = top + H
  const tiers = o.tiers ?? Math.round(15 + H / 75)
  const needle = H * 0.0118 * (o.needle ?? 1)
  const lean = range(r, -1, 1) * 0.04

  // огибающая кроны: острая макушка, широкая слегка скруглённая юбка
  const env = (t: number) => Math.pow(t, 0.9) * (1 - 0.1 * Math.pow(t, 7))
  const halfAt = (t: number) => H * spread * env(clamp(t))

  // ── ветви ──
  const branches: Branch[] = []
  const total = tiers * 2
  for (let i = 0; i < total; i++) {
    const minor = i % 2 === 1                          // межмутовочные — короче
    const t = clamp((i + 0.7) / total + range(r, -0.2, 0.2) / total, 0.02, 1)
    const y = top + crownH * 0.03 + t * crownH * 0.97
    const nb = Math.max(3, Math.round((minor ? 3 : 5) + t * (minor ? 3 : 4) + range(r, -1, 1)))
    const base = r() * Math.PI * 2
    const tierNoise = range(r, 0.86, 1.1)
    for (let b = 0; b < nb; b++) {
      if (r() < 0.05) continue                         // естественный «пропуск»
      const phi = base + (b * Math.PI * 2) / nb + range(r, -0.4, 0.4)
      const L = halfAt(t) * tierNoise * range(r, 0.84, 1.1) * (minor ? 0.72 : 1)
      // ветви к зрителю/от зрителя видны почти с торца: чуть разводим их
      // от оси, иначе они складываются в светлый «шов» по центру кроны
      const endOn = 1 - Math.abs(Math.cos(phi))
      const x0 = cx + lean * (y - top) * 0.3 + endOn * range(r, -1, 1) * halfAt(t) * 0.35
      branches.push({ x0, y0: y + endOn * Math.sin(phi) * halfAt(t) * 0.12, L, phi, t, z: Math.sin(phi), minor })
    }
  }
  branches.sort((a, b) => a.z - b.z)

  const colorAt = (l: number, h = hue, s = sat) => flat ?? `hsl(${h.toFixed(0)},${s.toFixed(0)}%,${clamp(l, 2, 96).toFixed(1)}%)`

  // ── тёмное «нутро» кроны: без него сквозь хвою просвечивал бы фон ──
  {
    g.save()
    if (!flat) g.filter = `blur(${(H * 0.012).toFixed(1)}px)`
    g.fillStyle = flat ?? colorAt(lig * 0.42, hue + 6, sat * 0.8)
    g.beginPath()
    g.moveTo(cx, top + crownH * 0.02)
    for (let k = 0; k <= 30; k++) {
      const t = k / 30
      g.lineTo(cx + halfAt(t) * 0.72, top + crownH * (0.02 + t * 0.94))
    }
    for (let k = 30; k >= 0; k--) {
      const t = k / 30
      g.lineTo(cx - halfAt(t) * 0.72, top + crownH * (0.02 + t * 0.94))
    }
    g.closePath()
    g.fill()
    g.restore()
  }

  const anchors: TreeAnchor[] = []
  const drawTrunk = () => {
    const tw = H * 0.024
    g.save()
    const grad = g.createLinearGradient(cx - tw, 0, cx + tw, 0)
    if (flat) { g.fillStyle = flat } else {
      grad.addColorStop(0, 'hsl(20,25%,10%)')
      grad.addColorStop(0.45, 'hsl(22,24%,22%)')
      grad.addColorStop(1, 'hsl(20,25%,8%)')
      g.fillStyle = grad
    }
    g.beginPath()
    g.moveTo(cx - tw * 0.3, top + crownH * 0.55)
    g.lineTo(cx + tw * 0.3, top + crownH * 0.55)
    g.lineTo(cx + tw * 0.62, ground)
    g.quadraticCurveTo(cx, ground + tw * 0.3, cx - tw * 0.62, ground)
    g.closePath()
    g.fill()
    g.restore()
  }
  drawTrunk()

  const step = needle * 0.42 / density
  // пачки штрихов по оттенку — тысячи хвоинок рисуются десятком stroke()
  const buckets = new Map<string, Path2D>()
  const frostPath = new Path2D()
  const addNeedle = (key: string, x: number, y: number, x2: number, y2: number) => {
    let p = buckets.get(key)
    if (!p) { p = new Path2D(); buckets.set(key, p) }
    p.moveTo(x, y)
    p.lineTo(x2, y2)
  }
  // тень под лапой: та же хвоя, сдвинутая вниз и тёмная — даёт «полки»
  // еловых лап с тёмными провалами под ними, без чего ель выглядит плоской
  let shadowPath = new Path2D()
  const flush = (width: number, shadowL: number, dy: number) => {
    if (!flat) {
      g.save()
      g.translate(needle * 0.12, dy)
      g.lineWidth = width * 1.6
      g.strokeStyle = `hsla(${hue + 10},${sat * 0.7}%,${Math.max(3, shadowL)}%,0.68)`
      g.stroke(shadowPath)
      g.restore()
    }
    g.lineWidth = width
    for (const [k, p] of buckets) { g.strokeStyle = k; g.stroke(p) }
    buckets.clear()
    shadowPath = new Path2D()
  }

  for (const br of branches) {
    const { L, phi, t } = br
    const cos = Math.cos(phi)
    const d = (br.z + 1) / 2                                   // 0 — сзади, 1 — к зрителю
    const dx = L * cos
    const dz = L * br.z
    const droopAmt = L * (0.08 + 0.42 * t) * droop
    const pt = (s: number) => {
      let y = br.y0 - L * 0.09 * Math.sin(Math.PI * s * 0.85) * (1 - t * 0.7) + droopAmt * s * s + dz * 0.1 * s
      if (s > 0.78) y -= (s - 0.78) * L * 0.16 * (1 - t * 0.4)   // кончик ели чуть вздёрнут
      return { x: br.x0 + dx * s, y }
    }
    const l0 = lig + lerp(-15, 8, d) + (1 - t) * 3 + lightX * cos * 5
    const h0 = hue + range(r, -5, 5)
    const lw = needle * (br.minor ? 0.1 : 0.12) * (0.9 + d * 0.2)

    const needlesAlong = (ax: number, ay: number, bx: number, by: number, sFrom: number, sTo: number, scaleN: number) => {
      const len = Math.hypot(bx - ax, by - ay)
      if (len < 0.5) return
      const ux = (bx - ax) / len, uy = (by - ay) / len
      const n = Math.max(2, Math.floor(len / step))
      for (let k = 0; k <= n; k++) {
        const f = k / n
        const px = ax + (bx - ax) * f, py = ay + (by - ay) * f
        const sLocal = lerp(sFrom, sTo, f)
        for (const side of [1, -1]) {
          const a = side * range(r, 0.55, 1.45) - side * 0.2 * f + range(r, -0.15, 0.15)
          const ca = Math.cos(a), sa = Math.sin(a)
          const vx = ux * ca - uy * sa, vy = ux * sa + uy * ca
          const nl = needle * range(r, 0.72, 1.12) * scaleN * (1.05 - sLocal * 0.25)
          const up = vy < 0
          const tipGrow = sLocal > 0.82 && r() < 0.5        // молодой прирост светлее и желтее
          const l = l0 + (up ? 6 : -8) + sLocal * 5 + range(r, -6, 6) + (tipGrow ? 7 : 0)
          const key = colorAt(Math.round(l / 2.5) * 2.5, Math.round((h0 - (tipGrow ? 12 : 0)) / 4) * 4,
            sat * (tipGrow ? 1.15 : 1))
          const ex = px + vx * nl, ey = py + vy * nl
          addNeedle(key, px, py, ex, ey)
          if ((k & 1) === 0) { shadowPath.moveTo(px, py); shadowPath.lineTo(ex, ey) }
          if (frost > 0 && r() < frost * (0.45 + 0.4 * d)) {
            frostPath.moveTo(px + vx * nl * 0.55, py + vy * nl * 0.55)
            frostPath.lineTo(ex, ey)
          }
        }
      }
    }

    // ствол ветви
    const segs = 10
    let prev = pt(0.04)
    for (let k = 1; k <= segs; k++) {
      const s = 0.04 + (k / segs) * 0.96
      const p = pt(s)
      needlesAlong(prev.x, prev.y, p.x, p.y, s - 0.096, s, 1)
      prev = p
    }
    // веточки
    const twigStep = Math.max(0.05, (needle * 2.3) / Math.max(L, 1))
    let side = 1
    for (let s = 0.14; s < 0.96; s += twigStep * range(r, 0.8, 1.2)) {
      side = -side
      const p = pt(s)
      const q = pt(Math.min(1, s + 0.02))
      const len0 = Math.hypot(q.x - p.x, q.y - p.y) || 1
      const ux = (q.x - p.x) / len0, uy = (q.y - p.y) / len0
      const ang = side * range(r, 0.55, 0.95)
      let vx = ux * Math.cos(ang) - uy * Math.sin(ang)
      let vy = ux * Math.sin(ang) + uy * Math.cos(ang)
      vy += 0.22 * droop                                       // веточки свисают
      const vl = Math.hypot(vx, vy); vx /= vl; vy /= vl
      const Lt = L * 0.3 * Math.pow(1 - s, 0.65) * range(r, 0.7, 1.1) * (0.5 + 0.5 * Math.abs(cos) + 0.3)
      if (Lt < needle * 0.8) continue
      needlesAlong(p.x, p.y, p.x + vx * Lt, p.y + vy * Lt, s, Math.min(1, s + 0.25), 0.82)
    }
    flush(lw, l0 - 16, needle * 0.55)

    // снег — комьями по верхней стороне лапы: круги сливаются в неровный
    // гребень; лежит пятнами (где-то сдуло), к кончику тоньше
    if (snow > 0 && (!flat || o.flatSnow)) {
      const sn = new Path2D(), sh = new Path2D(), hi = new Path2D()
      const ph = r() * 10
      const blob = (x: number, y: number, rad: number) => {
        sh.moveTo(x + rad, y + rad * 0.45); sh.arc(x, y + rad * 0.45, rad, 0, Math.PI * 2)
        sn.moveTo(x + rad, y); sn.arc(x, y, rad, 0, Math.PI * 2)
        hi.moveTo(x + rad * 0.55, y - rad * 0.3); hi.arc(x - rad * 0.1, y - rad * 0.3, rad * 0.62, 0, Math.PI * 2)
      }
      const endOnB = 1 - Math.abs(cos)
      // лапа, смотрящая на зрителя, видна с торца — снег на ней лежит шапкой
      // у кончика, а не полосой вдоль (иначе получаются вертикальные «потёки»)
      const sFrom = endOnB > 0.55 ? 0.62 : 0.1
      for (let s = sFrom; s < 0.97; s += (needle * 0.5) / Math.max(L, 1)) {
        const patch = Math.sin(s * 15 + ph) * 0.5 + 0.5
        if (patch < 1 - snow * 1.05 || r() < 0.22) continue
        const p = pt(s)
        const rad = needle * (0.3 + 0.5 * snow) * range(r, 0.7, 1.25) * (1.15 - s * 0.55)
        blob(p.x + range(r, -1, 1) * needle * 0.15, p.y - rad * 0.55, rad)
      }
      // редкие комочки на веточках
      for (let k = 0; k < 6 * snow; k++) {
        const s = range(r, 0.2, 0.9)
        const p = pt(s)
        const off = range(r, -1, 1) * L * 0.12 * Math.abs(cos)
        blob(p.x + off, p.y + Math.abs(off) * 0.35 - needle * 0.2, needle * range(r, 0.25, 0.45) * (0.5 + snow))
      }
      if (flat) {
        g.fillStyle = o.flatSnow!
        g.fill(sn)
      } else {
        const shade = lerp(58, 84, d)
        g.fillStyle = `hsla(214,30%,${shade - 26}%,0.5)`
        g.fill(sh)
        g.fillStyle = `hsl(210,${lerp(26, 40, d)}%,${shade}%)`
        g.fill(sn)
        g.fillStyle = `hsla(200,50%,${Math.min(99, shade + 13)}%,0.95)`
        g.fill(hi)
      }
    }

    // точки для игрушек и огней — на ветвях, смотрящих к зрителю
    if (d > 0.42 && t > 0.06) {
      const n = br.minor ? 1 : 2
      for (let k = 0; k < n; k++) {
        const s = range(r, 0.5, 0.92)
        const p = pt(s)
        anchors.push({ x: p.x, y: p.y + needle * 0.5, d, t })
      }
    }
  }

  if (frost > 0 && !flat) {
    g.lineWidth = needle * 0.11
    g.strokeStyle = 'hsla(200,70%,94%,0.85)'
    g.stroke(frostPath)
  }

  // ── макушка: вертикальный побег ──
  {
    const tipY = top + crownH * 0.035
    const lead = top - needle * 0.6
    g.lineWidth = needle * 0.12
    for (let y = lead; y < tipY; y += step) {
      const f = (y - lead) / (tipY - lead)
      for (const side of [1, -1]) {
        const nl = needle * (0.5 + f * 0.6)
        const a = side * range(r, 0.6, 0.9)
        g.strokeStyle = colorAt(lig + 6 + range(r, -3, 3))
        g.beginPath()
        g.moveTo(cx, y)
        g.lineTo(cx + Math.sin(a) * nl, y - Math.cos(a) * nl * -0.4 + nl * 0.25)
        g.stroke()
      }
    }
  }

  // ── объём: свет с одной стороны, тень с другой и снизу ──
  if (!flat) {
    g.save()
    g.globalCompositeOperation = 'source-atop'
    const lx = lightX < 0 ? 0 : W
    const gr = g.createLinearGradient(lx, 0, W - lx, 0)
    gr.addColorStop(0, 'rgba(255,240,215,0.07)')
    gr.addColorStop(0.55, 'rgba(0,0,0,0)')
    gr.addColorStop(1, 'rgba(0,8,18,0.32)')
    g.fillStyle = gr
    g.fillRect(0, 0, W, Hc)
    const gv = g.createLinearGradient(0, top, 0, ground)
    gv.addColorStop(0, 'rgba(0,0,0,0)')
    gv.addColorStop(0.75, 'rgba(0,0,0,0)')
    gv.addColorStop(1, 'rgba(0,6,14,0.3)')
    g.fillStyle = gv
    g.fillRect(0, 0, W, Hc)
    if (o.innerGlow) {
      const rg = g.createRadialGradient(cx, top + crownH * 0.62, 0, cx, top + crownH * 0.62, crownH * 0.6)
      rg.addColorStop(0, `rgba(255,170,80,${0.22 * o.innerGlow})`)
      rg.addColorStop(1, 'rgba(255,170,80,0)')
      g.globalCompositeOperation = 'lighter'
      g.fillStyle = rg
      g.fillRect(0, 0, W, Hc)
    }
    g.restore()
  }
  if (o.fog && o.fog.amount > 0) {
    g.save()
    g.globalCompositeOperation = 'source-atop'
    g.globalAlpha = o.fog.amount
    g.fillStyle = o.fog.color
    g.fillRect(0, 0, W, Hc)
    g.restore()
  }

  anchors.sort((a, b) => a.y - b.y)
  return {
    canvas: cv, w: W, h: Hc, anchors, halfAt,
    apex: { x: cx, y: top }, ground: { x: cx, y: ground },
    crownTop: top, crownBottom,
  }
}
