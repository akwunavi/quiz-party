// Процедурная часть арены — ТОЛЬКО то, что допустимо рисовать кодом: небо и сияние, дальние горы и берег, озеро с отражением, ледяная трасса, снежные борта,
// свет и частицы. Шале, ели, трибуны, зрители и архитектура ЗДЕСЬ НЕ РИСУЮТСЯ (решение ведущего: их даёт авторская графика уровня концептов B+C — см. slots.ts
// и ASSET_BRIEF). Всё строится один раз в offscreen-холсты; детерминировано по сиду.
import { ARENA } from './camera'

export const PAL = {                         // «B+C»: спортивная ясность B + вечерняя сказка C
  skyTop: '#161447', skyMid: '#4b3a8c', skyLow: '#c4669a', horizon: '#ffb778',
  iceFar: '#b9a6e6', iceNear: '#4c4aa6', snowLit: '#f7ecff', snowShade: '#8d86cf', warm: '#ffc27a', warmDeep: '#ff8f4a',
}
export const HZ = 379                        // линия горизонта (низ гор, начало озера)
export const FENCE_H = 340                  // высота холста ограждения: фонарь с колпаком и свечением целиком внутри (раньше 150 px резало колпак и свечение по прямой линии)
export const BERM_Y = 477                    // дальний снежный борт: верхняя кромка трассы
export const rng = (seed: number) => { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }
export const cv = (w: number, h: number) => { const c = document.createElement('canvas'); c.width = Math.ceil(w); c.height = Math.ceil(h); return c }
const lin = (c: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, stops: [number, string][]) => { const g = c.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, col]) => g.addColorStop(o, col)); return g }
const glow = (c: CanvasRenderingContext2D, x: number, y: number, r: number, col: string, a: number) => {
  const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace(')', `,${a})`).replace('rgb(', 'rgba(')); g.addColorStop(1, col.replace(')', ',0)').replace('rgb(', 'rgba(')); c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2)
}
/** Ширина слоя с параллаксом p, чтобы покрыть любой ход камеры по дистанции. */
export const layerW = (p: number) => Math.ceil(ARENA.W + (ARENA.TRACK_LEN + 1400) * p + 240)

// ── небо (статичная подложка); сияние и звёзды анимируются отдельно
export function buildSky(): HTMLCanvasElement {
  const W = ARENA.W + 360, c = cv(W, HZ + 4), x = c.getContext('2d')!, r = rng(11)
  x.fillStyle = lin(x, 0, 0, 0, HZ, [[0, PAL.skyTop], [0.36, '#2c2672'], [0.62, PAL.skyMid], [0.86, PAL.skyLow], [1, PAL.horizon]]); x.fillRect(0, 0, W, HZ + 4)
  // закатное свечение у горизонта слева (источник света всей сцены) и тёплые облака-мазки
  glow(x, W * 0.22, HZ - 10, 760, 'rgb(255,170,110)', 0.55)
  x.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 26; i++) { const cx = r() * W, cy = HZ - 40 - r() * 250, w = 180 + r() * 420, h = 10 + r() * 26; const g = x.createRadialGradient(cx, cy, 0, cx, cy, w); const warm = cy > HZ - 150; g.addColorStop(0, warm ? 'rgba(255,150,130,.20)' : 'rgba(170,140,255,.13)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.save(); x.translate(cx, cy); x.scale(1, h / w); x.translate(-cx, -cy); x.fillStyle = g; x.fillRect(cx - w, cy - w, w * 2, w * 2); x.restore() }
  x.globalCompositeOperation = 'source-over'
  return c
}
export const STARS = (() => { const r = rng(5), a: { x: number; y: number; s: number; ph: number }[] = []; for (let i = 0; i < 160; i++) a.push({ x: r() * (ARENA.W + 360), y: r() * HZ * 0.62, s: 0.4 + r() * 1.3, ph: r() * 6.28 }); return a })()

// ── горы: хребет по фрактальному шуму, свет заката с левой стороны, дымка у основания
function ridge(W: number, base: number, amp: number, seed: number, rough: number): number[] {
  const r = rng(seed), P: number[][] = []; for (let o = 0; o < 5; o++) { const n = 6 + o * 9, a: number[] = []; for (let i = 0; i <= n; i++) a.push(r()); P.push(a) }
  const out: number[] = []; for (let x = 0; x <= W; x += 6) { let h = 0, k = 1, tot = 0; for (let o = 0; o < 5; o++) { const n = P[o].length - 1, u = (x / W) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i, s = f * f * (3 - 2 * f); const v = P[o][i] * (1 - s) + P[o][i + 1] * s; h += (1 - Math.abs(2 * v - 1)) * k; tot += k; k *= rough } out.push(base - (h / tot) * amp) }
  return out
}
export function buildMountains(p: number, seed: number, amp: number, tone: 'far' | 'near'): HTMLCanvasElement {
  const W = layerW(p), c = cv(W, HZ + 6), x = c.getContext('2d')!, ys = ridge(W, HZ, amp, seed, 0.62)
  const lit = tone === 'far' ? [255, 196, 205] : [226, 150, 178], shade = tone === 'far' ? [64, 54, 138] : [38, 33, 96], base = tone === 'far' ? [150, 96, 160] : [96, 70, 150]
  const mix = (a: number[], b: number[], u: number) => a.map((v, i) => Math.round(v * (1 - u) + b[i] * u))
  // покраска по уклону: левые грани (подъём вправо) ловят закат, правые — в синей тени; у вершины — снег, к основанию — дымка
  for (let i = 1; i < ys.length - 1; i++) {
    const px = i * 6, slope = (ys[Math.min(ys.length - 1, i + 5)] - ys[Math.max(0, i - 5)]) / 60, u = Math.max(0, Math.min(1, 0.5 - slope * 1.9)), body = mix(shade, lit, u)
    const g = x.createLinearGradient(0, ys[i], 0, HZ + 6)
    g.addColorStop(0, `rgb(${mix(body, [255, 245, 252], 0.55).join(',')})`); g.addColorStop(0.16, `rgb(${mix(body, [255, 235, 245], 0.2).join(',')})`)
    g.addColorStop(0.55, `rgb(${mix(body, shade, 0.35).join(',')})`); g.addColorStop(1, `rgb(${mix(mix(body, shade, 0.5), base, 0.7).join(',')})`)
    x.fillStyle = g; x.fillRect(px - 3, ys[i], 7, HZ + 6 - ys[i])
  }
  // тонкая светлая кромка по хребту и ледовые желоба — штрихи вниз от вершин
  x.lineJoin = 'round'; x.beginPath(); ys.forEach((y, i) => i ? x.lineTo(i * 6, y + 0.5) : x.moveTo(0, y)); x.strokeStyle = 'rgba(255,248,252,.55)'; x.lineWidth = 1.6; x.stroke()
  const r = rng(seed + 9); for (let i = 3; i < ys.length - 3; i++) { if (ys[i] < ys[i - 2] && ys[i] < ys[i + 2] && r() < 0.9) { const px = i * 6, len = amp * (0.25 + r() * 0.4); const g = x.createLinearGradient(px, ys[i], px + len * 0.3, ys[i] + len); g.addColorStop(0, 'rgba(255,240,248,.38)'); g.addColorStop(1, 'rgba(255,240,248,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(px - 2, ys[i]); x.lineTo(px + 3, ys[i]); x.lineTo(px + 5 + len * 0.3, ys[i] + len); x.lineTo(px - 6 + len * 0.1, ys[i] + len * 0.9); x.closePath(); x.fill() } }
  x.fillStyle = lin(x, 0, HZ - amp * 0.35, 0, HZ + 6, [[0, 'rgba(255,170,150,0)'], [1, tone === 'far' ? 'rgba(255,180,150,.42)' : 'rgba(255,165,150,.28)']]); x.fillRect(0, 0, W, HZ + 6)
  { const o = cv(W, HZ + 6); const ox = o.getContext('2d')!; ox.filter = tone === 'far' ? 'blur(2px)' : 'blur(1.1px)'; ox.drawImage(c, 0, 0); return o }
}

// ── дальний берег: плотная полоса мелких тёмных елей (силуэты, без деталей — это дальний план) + редкие огоньки далёкого посёлка
export function buildFarShore(p: number): HTMLCanvasElement {
  const W = layerW(p), H = 90, c = cv(W, H), x = c.getContext('2d')!, r = rng(23), base = H - 4
  for (let row = 0; row < 3; row++) {
    const tone = ['#4c4896', '#3c3a82', '#2e2d68'][row], yb = base - (2 - row) * 5 - 2
    for (let px = -10; px < W + 10; px += 5 + r() * 7) {
      const h = 12 + r() * 22 + (2 - row) * 4, w = h * (0.34 + r() * 0.08); x.fillStyle = tone; x.beginPath(); x.moveTo(px, yb - h); x.lineTo(px + w, yb); x.lineTo(px - w, yb); x.closePath(); x.fill()
      x.fillStyle = 'rgba(255,205,215,.30)'; x.beginPath(); x.moveTo(px, yb - h); x.lineTo(px - w * 0.3, yb - h * 0.55); x.lineTo(px + w * 0.05, yb - h * 0.6); x.closePath(); x.fill()      // свет заката на левой грани
    }
  }
  { const o = cv(W, H), ox = o.getContext('2d')!; ox.filter = 'blur(0.9px)'; ox.drawImage(c, 0, 0); x.clearRect(0, 0, W, H); x.drawImage(o, 0, 0) }
  x.globalCompositeOperation = 'lighter'; for (let i = 0; i < W / 70; i++) { const px = r() * W, py = base - 6 - r() * 22; glow(x, px, py, 9, 'rgb(255,190,110)', 0.65); x.fillStyle = 'rgba(255,230,170,.95)'; x.fillRect(px - 0.8, py - 0.8, 1.8, 1.8) }
  x.globalCompositeOperation = 'source-over'; x.fillStyle = lin(x, 0, 0, 0, H, [[0, 'rgba(255,170,150,.0)'], [1, 'rgba(255,170,150,.28)']]); x.fillRect(0, 0, W, H)
  x.globalCompositeOperation = 'destination-in'; x.fillStyle = lin(x, 0, 0, 0, H, [[0, 'rgba(0,0,0,0)'], [0.38, 'rgba(0,0,0,1)'], [1, 'rgba(0,0,0,1)']]); x.fillRect(0, 0, W, H); x.globalCompositeOperation = 'source-over'
  return c
}

// ── озеро между горизонтом и бортом: отражение неба/гор (переворот + размытие + затухание) и блики
export function buildLake(sky: HTMLCanvasElement, mtnFar: HTMLCanvasElement, mtnNear: HTMLCanvasElement, shore: HTMLCanvasElement, p: number): HTMLCanvasElement {
  const W = layerW(p), H = BERM_Y - HZ + 4, c = cv(W, H), x = c.getContext('2d')!, r = rng(31)
  x.fillStyle = lin(x, 0, 0, 0, H, [[0, '#d88aa8'], [0.25, '#8a5fa8'], [1, '#2f2a74']]); x.fillRect(0, 0, W, H)
  const t = cv(W, H), tx = t.getContext('2d')!; tx.filter = 'blur(3px)'; tx.save(); tx.translate(0, 0); tx.scale(1, -0.62); tx.translate(0, -(HZ + 4) + 0)
  tx.drawImage(shore, 0, HZ - shore.height); tx.drawImage(mtnNear, 0, 0); tx.restore()
  x.globalAlpha = 0.55; x.drawImage(t, 0, 0); x.globalAlpha = 1
  x.fillStyle = lin(x, 0, 0, 0, H, [[0, 'rgba(255,190,150,.0)'], [0.4, 'rgba(60,40,120,.0)'], [1, 'rgba(25,22,80,.55)']]); x.fillRect(0, 0, W, H)
  x.globalCompositeOperation = 'lighter'; for (let i = 0; i < W / 14; i++) { const py = r() * H * r(), px = r() * W, w = 20 + r() * 90 * (0.3 + py / H); x.fillStyle = `rgba(255,${200 + r() * 40 | 0},${200 + r() * 40 | 0},${0.05 + r() * 0.14})`; x.fillRect(px, py, w, 1) }
  x.globalCompositeOperation = 'destination-in'; x.fillStyle = lin(x, 0, 0, 0, H, [[0, 'rgba(0,0,0,0)'], [0.16, 'rgba(0,0,0,1)'], [1, 'rgba(0,0,0,1)']]); x.fillRect(0, 0, W, H); x.globalCompositeOperation = 'source-over'; return c
}

// ── ледяная трасса (мировые координаты, параллакс 1): отражение огней, царапины, трещины, снежные гребни между дорожками, дальний и ближний борт
export interface TrackArt { canvas: HTMLCanvasElement; lanternsX: number[]; y0: number }
export function buildTrack(): TrackArt {
  const WW = ARENA.START_X + ARENA.TRACK_LEN + 1700, y0 = BERM_Y - 20, H = ARENA.H - y0, c = cv(WW, H), x = c.getContext('2d')!, r = rng(77), Y = (y: number) => y - y0
  // утрамбованный снег: матовый, холодные сиренево-голубые тени; у горизонта тёплее (закат), к камере глубже. Без блеска и зеркальных отражений
  x.fillStyle = lin(x, 0, Y(BERM_Y), 0, H, [[0, '#cdb2e2'], [0.1, '#b6a2de'], [0.4, '#a099d6'], [0.75, '#938fcf'], [1, '#8a88c9']]); x.fillRect(0, 0, WW, H)
  const lanternsX: number[] = []; for (let wx = 260; wx < WW; wx += 520) lanternsX.push(wx)
  // широкие холодные тени и тёплые отсветы фонарей — плоскими пятнами, без вертикальных бликов
  for (let i = 0; i < WW / 260; i++) { const px = r() * WW, py = Y(BERM_Y + 40 + r() * (ARENA.H - BERM_Y - 60)), rw = 160 + r() * 340, g = x.createRadialGradient(px, py, 0, px, py, rw); g.addColorStop(0, r() < 0.7 ? 'rgba(70,70,170,.10)' : 'rgba(255,225,240,.09)'); g.addColorStop(1, 'rgba(70,70,170,0)'); x.save(); x.translate(px, py); x.scale(1, 0.14); x.translate(-px, -py); x.fillStyle = g; x.fillRect(px - rw, py - rw, rw * 2, rw * 2); x.restore() }
  x.globalCompositeOperation = 'lighter'
  for (const lx of lanternsX) { const g = x.createRadialGradient(lx, Y(BERM_Y + 12), 0, lx, Y(BERM_Y + 12), 330); g.addColorStop(0, 'rgba(255,175,110,.20)'); g.addColorStop(1, 'rgba(255,175,110,0)'); x.save(); x.translate(lx, Y(BERM_Y + 12)); x.scale(1, 0.3); x.translate(-lx, -Y(BERM_Y + 12)); x.fillStyle = g; x.fillRect(lx - 330, Y(BERM_Y + 12) - 330, 660, 660); x.restore() }
  x.globalCompositeOperation = 'source-over'
  // фактура: мелкое зерно (светлое и холодное тёмное), вдоль дорожек — тонкие линии укатки (трамбовка снегоуплотнителем)
  for (let i = 0; i < WW * H / 55; i++) { const light = r() < 0.5; x.fillStyle = light ? `rgba(255,248,255,${0.05 + r() * 0.09})` : `rgba(60,55,150,${0.04 + r() * 0.08})`; x.fillRect(r() * WW, r() * H, 1 + (r() < 0.2 ? 1 : 0), 1) }
  for (let k = 0; k < H / 7; k++) { const py = Y(BERM_Y + 30) + k * 7 + r() * 3; x.strokeStyle = `rgba(${r() < 0.5 ? '255,250,255' : '70,65,160'},${0.025 + r() * 0.03})`; x.lineWidth = 0.8; x.beginPath(); x.moveTo(0, py); for (let px = 0; px < WW; px += 220) x.lineTo(px + 220, py + (r() - 0.5) * 1.4); x.stroke() }
  // лёгкая «шлифовка» дорожек: чередующиеся едва заметные полосы по центру дорожек
  for (let i = 0; i < 5; i++) { const ly = ARENA.LANE_Y[i], top = i ? (ARENA.LANE_Y[i - 1] + ly) / 2 + 4 : BERM_Y + 24, bot = i < 4 ? (ly + ARENA.LANE_Y[i + 1]) / 2 - 2 : ARENA.H
    x.fillStyle = lin(x, 0, Y(top), 0, Y(bot), [[0, 'rgba(255,255,255,0)'], [0.55, i % 2 ? 'rgba(255,250,255,.05)' : 'rgba(110,100,210,.06)'], [1, 'rgba(255,255,255,0)']]); x.fillRect(0, Y(top), WW, bot - top) }
  // разделители дорожек: ЦЕПОЧКА маленьких тёплых огоньков, утопленных в снег (4 линии между 5 дорожками), с мягким пятном света на снегу
  const B = [0, 1, 2, 3].map(i => (ARENA.LANE_Y[i] + ARENA.LANE_Y[i + 1]) / 2 + 2)
  for (const by of B) {
    x.fillStyle = lin(x, 0, Y(by) - 7, 0, Y(by) + 7, [[0, 'rgba(255,170,90,0)'], [0.5, 'rgba(255,170,90,.09)'], [1, 'rgba(255,170,90,0)']]); x.fillRect(0, Y(by) - 7, WW, 14)      // непрерывная тёплая полоса света
    x.globalCompositeOperation = 'lighter'
    for (let px = 20; px < WW; px += 56) { const g = x.createRadialGradient(px, Y(by), 0, px, Y(by), 34); g.addColorStop(0, 'rgba(255,176,92,.42)'); g.addColorStop(0.5, 'rgba(255,150,70,.15)'); g.addColorStop(1, 'rgba(255,170,90,0)'); x.save(); x.translate(px, Y(by)); x.scale(1, 0.32); x.translate(-px, -Y(by)); x.fillStyle = g; x.fillRect(px - 34, Y(by) - 34, 68, 68); x.restore() }
    x.globalCompositeOperation = 'source-over'
    for (let px = 20; px < WW; px += 56) {
      x.fillStyle = 'rgba(40,30,80,.38)'; x.beginPath(); x.ellipse(px + 1, Y(by) + 2.2, 7.5, 2.6, 0, 0, 7); x.fill()                                   // тень-лунка в снегу
      x.fillStyle = '#4a3a58'; x.beginPath(); x.ellipse(px, Y(by) + 0.6, 5.4, 2.2, 0, 0, 7); x.fill()                                                 // тёмное основание светильника
      const bg = x.createRadialGradient(px - 0.8, Y(by) - 2.4, 0.3, px, Y(by) - 1.2, 3.6); bg.addColorStop(0, '#fff6d6'); bg.addColorStop(0.55, '#ffc868'); bg.addColorStop(1, '#e98a30'); x.fillStyle = bg
      x.beginPath(); x.ellipse(px, Y(by) - 0.8, 3.3, 2.9, 0, Math.PI, 0); x.fill()                                                                  // лампочка-купол
      x.fillStyle = 'rgba(244,236,255,.95)'; x.beginPath(); x.ellipse(px, Y(by) + 0.9, 6.3, 1.9, 0, 0, Math.PI); x.fill()                              // снежная кромка перед светильником: «утоплен»
    }
  }
  // дальний борт (снежный вал) с мягкой верхней кромкой и тенью на льду; ближний край — низкий вал без громоздкости
  const berm = (yy: number, hh: number, top: boolean) => {
    const pts: number[] = []; for (let px = 0; px <= WW; px += 8) pts.push(Y(yy) - (hh + Math.sin(px * 0.013) * hh * 0.25 + Math.sin(px * 0.047 + 2) * hh * 0.12 + Math.sin(px * 0.19) * 1.2 + r() * 1.6))
    x.beginPath(); x.moveTo(0, Y(yy) + 6); x.lineTo(0, pts[0]); for (let i = 1; i < pts.length; i++) { const mx = (i * 8 - 4), my = (pts[i - 1] + pts[i]) / 2; x.quadraticCurveTo((i - 1) * 8, pts[i - 1], mx, my) } x.lineTo(WW, pts[pts.length - 1]); x.lineTo(WW, Y(yy) + 6); x.closePath()
    const a = x.createLinearGradient(0, Y(yy) - hh - 8, 0, Y(yy) + 6); a.addColorStop(0, '#fdf4ff'); a.addColorStop(0.45, '#cdbcf0'); a.addColorStop(1, '#8a7fd0'); x.fillStyle = a; x.fill()
    x.fillStyle = lin(x, 0, Y(yy) + 6, 0, Y(yy) + 40, [[0, top ? 'rgba(30,24,100,.5)' : 'rgba(30,24,100,.0)'], [1, 'rgba(30,24,100,0)']]); x.fillRect(0, Y(yy) + 6, WW, 34)
  }
  berm(BERM_Y + 4, 20, true)
  { const fy = ARENA.H + 6, pts: number[] = []; for (let px = 0; px <= WW; px += 8) pts.push(Y(fy) - (11 + Math.sin(px * 0.017) * 3 + Math.sin(px * 0.21) * 1 + r() * 1.5))
    x.beginPath(); x.moveTo(0, Y(fy) + 2); x.lineTo(0, pts[0]); for (let i = 1; i < pts.length; i++) x.quadraticCurveTo((i - 1) * 8, pts[i - 1], i * 8 - 4, (pts[i - 1] + pts[i]) / 2); x.lineTo(WW, pts[pts.length - 1]); x.lineTo(WW, Y(fy) + 2); x.closePath()
    const a = x.createLinearGradient(0, Y(fy) - 16, 0, Y(fy)); a.addColorStop(0, 'rgba(245,235,255,0)'); a.addColorStop(0.35, 'rgba(235,225,255,.9)'); a.addColorStop(1, '#ffffff'); x.fillStyle = a; x.fill() }
  return { canvas: c, lanternsX, y0 }
}

// ── ограждение дальнего борта: деревянные столбы, перила, гирлянда с лампочками, фонари (вторичный декор; без зрителей и построек)
export function buildFence(lanternsX: number[]): HTMLCanvasElement {
  const WW = ARENA.START_X + ARENA.TRACK_LEN + 1700, H = FENCE_H, c = cv(WW, H), x = c.getContext('2d')!, r = rng(91), base = H - 4
  const wood = (px: number, py: number, w: number, h: number) => { const g = x.createLinearGradient(px, 0, px + w, 0); g.addColorStop(0, '#9a6a45'); g.addColorStop(0.5, '#6b4430'); g.addColorStop(1, '#3d2622'); x.fillStyle = g; x.fillRect(px, py, w, h); x.fillStyle = 'rgba(0,0,0,.18)'; for (let k = 0; k < h / 7; k++) x.fillRect(px + r() * w, py + k * 7, 1, 3 + r() * 5) }
  const posts: number[] = []; for (let px = 40; px < WW; px += 170) posts.push(px)
  x.fillStyle = 'rgba(30,20,90,.32)'; x.fillRect(0, base - 3, WW, 6)
  for (const ry of [base - 44, base - 78]) { wood(0, ry, WW, 7); x.fillStyle = 'rgba(255,242,255,.92)'; for (let px = 0; px < WW; px += 5) { x.beginPath(); x.ellipse(px + r() * 3, ry - 0.5 - r() * 1.5, 4.5 + r() * 3, 2.2 + r() * 1.8, 0, 0, 7); x.fill() } }
  for (const px of posts) { wood(px - 5, base - 92, 10, 90); x.fillStyle = '#fff4ff'; x.beginPath(); x.ellipse(px, base - 92, 8, 4.5, 0, 0, 7); x.fill() }
  // гирлянда: хвойная лента с красной ягодой и тёплыми лампочками между столбами
  for (let i = 0; i < posts.length - 1; i++) { const a = posts[i], b = posts[i + 1], my = base - 74 + 16; x.strokeStyle = '#1d4a3d'; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath(); x.moveTo(a, base - 80); x.quadraticCurveTo((a + b) / 2, my + 14, b, base - 80); x.stroke(); x.strokeStyle = '#2f7a56'; x.lineWidth = 2.4; x.stroke()
    for (let k = 1; k < 6; k++) { const u = k / 6, px = a + (b - a) * u, py = (1 - u) * (1 - u) * (base - 80) + 2 * u * (1 - u) * (my + 14) + u * u * (base - 80); x.fillStyle = k % 2 ? '#d83a4a' : '#ffe2a3'; x.beginPath(); x.arc(px, py + 2, 2.2, 0, 7); x.fill() } }
  x.globalCompositeOperation = 'lighter'; for (let i = 0; i < posts.length - 1; i++) { const a = posts[i], b = posts[i + 1], my = base - 74 + 16; for (let k = 1; k < 6; k++) { const u = k / 6, px = a + (b - a) * u, py = (1 - u) * (1 - u) * (base - 80) + 2 * u * (1 - u) * (my + 14) + u * u * (base - 80); glow(x, px, py + 2, 16, 'rgb(255,190,110)', 0.55) } }
  x.globalCompositeOperation = 'source-over'
  // фонари: высокий столб, рамка, тёплое стекло, свечение
  for (const lx of lanternsX) { const px = lx; wood(px - 4, base - 128, 8, 126); x.fillStyle = '#2a1e2e'; x.fillRect(px - 11, base - 150, 22, 6); const g = x.createLinearGradient(0, base - 144, 0, base - 116); g.addColorStop(0, '#fff0c0'); g.addColorStop(1, '#ff9a4a'); x.fillStyle = g; x.beginPath(); x.roundRect(px - 8, base - 144, 16, 28, 3); x.fill(); x.strokeStyle = '#2a1e2e'; x.lineWidth = 2; x.stroke(); x.fillStyle = '#2a1e2e'; x.beginPath(); x.moveTo(px - 12, base - 144); x.lineTo(px, base - 154); x.lineTo(px + 12, base - 144); x.closePath(); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.ellipse(px, base - 155, 9, 3.5, 0, 0, 7); x.fill() }
  x.globalCompositeOperation = 'lighter'; for (const lx of lanternsX) { glow(x, lx, base - 130, 46, 'rgb(255,225,170)', 0.85) }                      // только тугое ядро; широкий ореол рисуется на лету (drawLanternBloom) без обрезки
  x.globalCompositeOperation = 'source-over'
  const o = cv(WW, H), ox = o.getContext('2d')!; ox.filter = 'blur(0.55px)'; ox.drawImage(c, 0, 0); return o
}
