// Рендер арены: бесшовная трасса в мировых координатах, сопровождающая камера, слои параллакса, настоящие собаки Race V3, свет и частицы.
// Дорожки, скорость и тайминги — из Race V3 без изменений; здесь только «картинка» (прогресс → мировые пиксели, см. camera.ts).
import { ARENA, buildCameraTrack, worldX } from './camera'
import { HZ, BERM_Y, STARS, buildSky, buildMountains, buildFarShore, buildLake, buildTrack, buildFence, rng, cv, type TrackArt } from './art'
import { SLOTS, loadSlots, slotPlacements, type LoadedSlot, type SlotSpec } from './slots'
import { LAYOUT as L, DOG_IDS } from '../config'
import { raceFor, stateAt, loadDogData, raceSheetUrls, selectSheetUrl, BitmapPool, type DogData } from '../engine'
import { ButterflyManager } from '../vendor/butterfly.mjs'
import type { RaceV3 } from '../v3types'

const SW = L.spriteWidth, SH = L.spriteHeight
export interface ArenaOptions { slotBase?: string; names?: string[]; guide?: boolean }
export class ArenaRenderer {
  private ctx: CanvasRenderingContext2D
  private pool = new BitmapPool()
  private dogs: (DogData | null)[] = [null, null, null, null, null]
  private race: RaceV3 | null = null
  private cam: ReturnType<typeof buildCameraTrack> | null = null
  private t0 = 0
  private bf = new ButterflyManager()
  private tmp = cv(SW * 2, SH * 2); private refl = cv(SW * 2, SH * 2); private nose = cv(SW, SH)
  private noseCache = new Map<string, { x: number; y: number }>()
  private art!: { sky: HTMLCanvasElement; mtnFar: HTMLCanvasElement; mtnNear: HTMLCanvasElement; shore: HTMLCanvasElement; lake: HTMLCanvasElement; track: TrackArt; fence: HTMLCanvasElement; ray: HTMLCanvasElement }
  slots: LoadedSlot[] = []; missing: SlotSpec[] = SLOTS.slice()
  guide = false; names: string[] = ['Фрэнк', 'Зефир', 'Рокки', 'Пупс', 'Луна']
  buildMs = 0
  constructor(private canvas: HTMLCanvasElement, private opt: ArenaOptions = {}) {
    canvas.width = ARENA.W; canvas.height = ARENA.H; this.ctx = canvas.getContext('2d')!; this.guide = !!opt.guide; if (opt.names) this.names = opt.names
  }
  /** Тяжёлая часть: рисует слои, грузит собак и листы гонки для окна, подключает доступные авторские слои. */
  async init(race: { seed: number; D: number }, t0: number, dur: number) {
    const s = performance.now()
    const sky = buildSky(), mtnFar = buildMountains(0.06, 41, 205, 'far'), mtnNear = buildMountains(0.10, 77, 150, 'near'), shore = buildFarShore(0.16)
    const lake = buildLake(sky, mtnFar, mtnNear, shore, 0.2), track = buildTrack(), fence = buildFence(track.lanternsX)
    const ray = cv(2, 2)
    this.art = { sky, mtnFar, mtnNear, shore, lake, track, fence, ray }
    this.race = raceFor(race.seed, race.D); this.t0 = t0; this.cam = buildCameraTrack(this.race, t0, dur)
    await Promise.all(DOG_IDS.map(async (id, i) => { const d = await loadDogData(id); this.dogs[i] = d; await Promise.all(raceSheetUrls(d, this.race!.dogs[i].segments).map(u => this.pool.get(u))) }))
    if (this.opt.slotBase) { const r = await loadSlots(this.opt.slotBase); this.slots = r.loaded; this.missing = r.missing }
    this.buildMs = performance.now() - s
  }
  destroy() { this.pool.release(); this.canvas.width = 0; this.canvas.height = 0 }
  get duration() { return this.cam?.dur ?? 0 }
  camX(t: number) { return this.cam!.at(t).x }

  /** Кадр в момент t — секунды от начала окна. Стейтлесс: любой t в любом порядке даёт тот же кадр (перемотка, запись видео). */
  draw(t: number) {
    if (!this.cam || !this.race) return
    const c = this.ctx, A = this.art, cam = this.cam.at(t), X = cam.x, T = this.t0 + t
    c.clearRect(0, 0, ARENA.W, ARENA.H)
    const px = (p: number) => -(X * p) + 0.0, sw = (k: number) => cam.sway * k
    c.drawImage(A.sky, -(X * 0.02) % 360 - 0, sw(0.2))
    this.drawStars(T); this.drawAurora(T, X)
    c.drawImage(A.mtnFar, px(0.06), sw(0.3)); c.drawImage(A.mtnNear, px(0.10), sw(0.4)); c.drawImage(A.shore, px(0.16), HZ - A.shore.height + 4 + sw(0.5))
    c.drawImage(A.lake, px(0.2), HZ - 4)
    this.drawLakeGlints(T, X)
    // авторские слои деревни/леса/трибун — только если файлы есть
    for (const s of this.slots) if (s.spec.parallax < 0.85) this.drawSlot(s, X, T)
    c.drawImage(A.fence, -X, BERM_Y - 146 + 2 + sw(0.9))
    for (const s of this.slots) if (s.spec.parallax >= 0.85) this.drawSlot(s, X, T)
    c.drawImage(A.track.canvas, -X, A.track.y0)
    this.drawIceSparkle(T, X)
    this.drawDogs(t, X)
    this.drawLanternBloom(T, X)
    this.drawSnow(T, X)
    this.drawGrade()
    this.drawHud(T)
    if (this.guide) this.drawGuide(X)
  }

  private drawStars(T: number) { const c = this.ctx; c.save(); for (const s of STARS) { const a = 0.35 + 0.65 * Math.abs(Math.sin(T * 0.9 + s.ph)); c.fillStyle = `rgba(255,245,255,${a * 0.8})`; c.fillRect(s.x - 360 * 0 % 1, s.y, s.s, s.s) } c.restore() }
  private aur = cv(960, 260)
  private drawAurora(T: number, X: number) {
    // полотнища рисуются в половинном разрешении, один раз размываются и растягиваются: мягкие ленты без «штрихкода»
    const a = this.aur.getContext('2d')!; a.clearRect(0, 0, 960, 260); a.save(); a.globalCompositeOperation = 'lighter'
    const curtains: [number, number, number, string][] = [[34, 0.5, 0.9, '110,255,210'], [60, 0.8, 1.9, '170,130,255'], [86, 0.7, 3.1, '255,130,210']]
    curtains.forEach(([base, sp, ph, col], k) => { for (let x = -20; x < 980; x += 5) { const u = (x * 2 + X * 0.03) / 300, y = base + Math.sin(u * 1.1 + T * 0.16 * sp + ph) * 26 + Math.sin(u * 2.9 - T * 0.1 + k) * 8, h = 46 + 62 * (0.5 + 0.5 * Math.sin(u * 1.7 + T * 0.35 * sp + k * 2)); const g = a.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(0.22, `rgba(${col},.20)`); g.addColorStop(1, `rgba(${col},0)`); a.fillStyle = g; a.fillRect(x, y, 7, h) } })
    a.restore()
    const c = this.ctx; c.save(); c.globalCompositeOperation = 'lighter'; c.filter = 'blur(6px)'; c.globalAlpha = 0.85; c.drawImage(this.aur, 0, 20, 1920, 520); c.restore()
  }
  private drawLakeGlints(T: number, X: number) { const c = this.ctx, r = rng(3); c.save(); c.globalCompositeOperation = 'lighter'; for (let i = 0; i < 70; i++) { const wx = r() * 3600, y = HZ + 6 + r() * (BERM_Y - HZ - 40), a = 0.25 * Math.abs(Math.sin(T * (0.8 + r()) + r() * 6)), x = ((wx - X * 0.2) % (ARENA.W + 200) + ARENA.W + 200) % (ARENA.W + 200) - 100; c.fillStyle = `rgba(255,220,230,${a})`; c.fillRect(x, y, 10 + r() * 24, 1) } c.restore() }
  private drawIceSparkle(T: number, X: number) { const c = this.ctx, r = rng(8); c.save(); c.globalCompositeOperation = 'lighter'; for (let i = 0; i < 90; i++) { const wx = r() * 3000, y = BERM_Y + 30 + r() * (ARENA.H - BERM_Y - 60), ph = r() * 9, a = Math.pow(Math.max(0, Math.sin(T * (1.2 + r() * 2) + ph)), 12), x = ((wx - X) % 3000 + 3000) % 3000 - 500; if (x < -20 || x > ARENA.W + 20) continue; c.fillStyle = `rgba(255,255,255,${a * 0.9})`; c.fillRect(x - 3, y, 7, 1); c.fillRect(x, y - 3, 1, 7) } c.restore() }
  private drawSlot(s: LoadedSlot, X: number, T: number) {
    const c = this.ctx, sp = s.spec, pl = slotPlacements(sp, X); for (const p of pl) { const idx = sp.mode === 'sequence' ? p.index % Math.max(1, Math.round(s.img.width / sp.tileW)) : 0; c.drawImage(s.img, idx * sp.tileW * (s.img.width / (sp.tileW * Math.max(1, Math.round(s.img.width / sp.tileW)))), 0, sp.tileW * (s.img.width / (sp.tileW * Math.max(1, Math.round(s.img.width / sp.tileW)))), s.img.height, p.x, sp.bottomY - sp.tileH, sp.tileW, sp.tileH) }
    void T
  }
  private noseOf(id: string, d: DogData, v: { sheet: string | null; index: number | null }, bm: ImageBitmap) {
    const key = id + v.sheet + v.index, hit = this.noseCache.get(key); if (hit) return hit
    const A = d.atlas, g = this.nose.getContext('2d', { willReadFrequently: true })!; g.clearRect(0, 0, SW, SH)
    g.drawImage(bm, (v.index! % A.columns) * A.cellWidth, Math.floor(v.index! / A.columns) * A.cellHeight, A.cellWidth, A.cellHeight, 0, 0, SW, SH)
    const px = g.getImageData(0, 0, SW, SH).data; let top = 1e9, bot = -1
    for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) if (px[(y * SW + x) * 4 + 3] >= 128) { top = Math.min(top, y); bot = Math.max(bot, y) }
    const lim = top + (bot - top) * .6; let bx = -1, by = top
    for (let y = top; y <= lim; y++) for (let x = SW - 1; x >= 0; x--) if (px[(y * SW + x) * 4 + 3] >= 128) { if (x > bx) { bx = x; by = y } break }
    const r = { x: bx, y: by }; this.noseCache.set(key, r); return r
  }
  /** Экранный Y верхней точки силуэта собаки каждой дорожки в момент t (для проверки «собаки не наступают друг на друга»). */
  silhouetteTops(t: number): (number | null)[] {
    const T = this.t0 + t; return this.dogs.map((d, i) => {
      if (!d) return null; const v = d.visual.at(this.race!.dogs[i].segments, T), bm = v.sheet ? this.pool.peek(selectSheetUrl(DOG_IDS[i], v.sheet)) : undefined; if (!bm || v.index == null) return null
      const g = this.nose.getContext('2d', { willReadFrequently: true })!; g.clearRect(0, 0, SW, SH); const A = d.atlas
      g.drawImage(bm, (v.index % A.columns) * A.cellWidth, Math.floor(v.index / A.columns) * A.cellHeight, A.cellWidth, A.cellHeight, 0, 0, SW, SH)
      const px = g.getImageData(0, 0, SW, SH).data; for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) if (px[(y * SW + x) * 4 + 3] >= 128) return ARENA.LANE_Y[i] - (L.spriteTopOffset - y) * ARENA.LANE_K[i]
      return null
    })
  }
  private drawDogs(t: number, X: number) {
    const c = this.ctx, race = this.race!, T = this.t0 + t
    for (let i = 0; i < 5; i++) {                                     // порядок i = дальняя дорожка → ближняя: ближние перекрывают дальние
      const d = this.dogs[i], dog = race.dogs[i]; if (!d) continue
      const k = ARENA.LANE_K[i], ly = ARENA.LANE_Y[i], st = stateAt(dog, T), wx = worldX(st.progress), sx = wx - X, v = d.visual.at(dog.segments, T)
      const bm = v.sheet ? this.pool.peek(selectSheetUrl(DOG_IDS[i], v.sheet)) : undefined
      // тень-пятно на льду
      c.save(); c.translate(sx - 52 * k, ly + 3); c.scale(1, 0.1); const sg = c.createRadialGradient(0, 0, 0, 0, 0, 74 * k); sg.addColorStop(0, 'rgba(24,18,86,.62)'); sg.addColorStop(1, 'rgba(24,18,86,0)'); c.fillStyle = sg; c.beginPath(); c.arc(0, 0, 74 * k, 0, 7); c.fill(); c.restore()
      this.drawPuffs(i, dog, T, X, k, ly)
      if (bm && v.index != null) {
        const w = SW * k, h = SH * k, ox = sx - L.spriteAnchorX * k + v.shiftPx * k, oy = ly - L.spriteTopOffset * k
        // вписывание в свет сцены: холодный свет неба сверху, тёплый закатный контур слева, лёгкое затемнение сумерек — на временном холсте, только по силуэту
        const g = this.tmp.getContext('2d')!; g.clearRect(0, 0, w + 4, h + 4); g.globalCompositeOperation = 'source-over'
        g.drawImage(bm, (v.index % d.atlas.columns) * d.atlas.cellWidth, Math.floor(v.index / d.atlas.columns) * d.atlas.cellHeight, d.atlas.cellWidth, d.atlas.cellHeight, 0, 0, w, h)
        g.globalCompositeOperation = 'source-atop'
        g.fillStyle = (() => { const q = g.createLinearGradient(0, 0, 0, h); q.addColorStop(0, 'rgba(120,110,230,.20)'); q.addColorStop(0.6, 'rgba(70,60,160,.10)'); q.addColorStop(1, 'rgba(255,170,110,.10)'); return q })(); g.fillRect(0, 0, w + 4, h + 4)
        g.fillStyle = (() => { const q = g.createLinearGradient(0, 0, w, 0); q.addColorStop(0, 'rgba(255,170,110,.22)'); q.addColorStop(0.4, 'rgba(255,170,110,0)'); return q })(); g.fillRect(0, 0, w + 4, h + 4)
        // отражение во льду: перевёрнутый силуэт, размытый и затухающий
        const rg = this.refl.getContext('2d')!; rg.clearRect(0, 0, w + 4, h + 4); rg.save(); rg.filter = 'blur(1.4px)'; rg.translate(0, h * 0.62); rg.scale(1, -1); rg.drawImage(this.tmp, 0, 0, w, h, 0, -h * 0.38, w, h); rg.restore()
        rg.globalCompositeOperation = 'destination-in'; const fade = rg.createLinearGradient(0, 0, 0, h * 0.62); fade.addColorStop(0, 'rgba(0,0,0,.42)'); fade.addColorStop(1, 'rgba(0,0,0,0)'); rg.fillStyle = fade; rg.fillRect(0, 0, w + 4, h * 0.62); rg.globalCompositeOperation = 'source-over'
        c.drawImage(this.refl, 0, 0, w + 4, h * 0.62, ox, oy + L.spriteTopOffset * k - 2, w + 4, h * 0.62)
        c.drawImage(this.tmp, 0, 0, w + 4, h + 4, ox, oy, w + 4, h + 4)
        const cl = d.contract.clips.BUTTERFLY, n = cl?.sampler === 'table' ? cl.labels!.length : (cl?.count ?? 1)
        const b = this.bf.update(i, v, n, T, () => { const nz = this.noseOf(DOG_IDS[i], d, v, bm); return { x: ox + nz.x * k, y: oy + nz.y * k } })
        if (b) this.drawButterfly(b)
      }
    }
  }
  private drawPuffs(i: number, dog: RaceV3['dogs'][number], T: number, X: number, k: number, ly: number) {
    const c = this.ctx, step = 0.05, base = Math.floor(T / step) * step; c.save()
    for (let j = 0; j < 11; j++) {
      const te = base - j * step, age = T - te; if (age > 0.5 || te < 0) continue
      const st = stateAt(dog, te); const spd = st.speed ?? 0; if (spd < 0.012) continue
      const h = Math.sin(te * 997.7 + i * 13.3) * 43758.5453, rr = h - Math.floor(h), u = age / 0.5
      const x = worldX(st.progress) - X - (66 + rr * 14) * k - u * 26, y = ly - (u * 34 - u * u * 18) * k * (0.6 + rr * 0.8), s = (2.2 + u * 6.5) * k * (0.7 + rr * 0.6)
      c.globalAlpha = (1 - u) * 0.46 * Math.min(1, spd * 22); c.fillStyle = rr > 0.5 ? '#f3eaff' : '#d7ccff'; c.beginPath(); c.arc(x, y, s, 0, 7); c.fill()
      if (rr > 0.7) { c.globalAlpha = (1 - u) * 0.8; c.fillStyle = '#ffffff'; c.fillRect(x + s, y - s * 1.2, 1.6, 1.6) }
    }
    c.restore()
  }
  private drawButterfly(b: { x: number; y: number; alpha: number; wing: number }) {
    const c = this.ctx; c.save(); c.globalAlpha = b.alpha; c.translate(b.x, b.y)
    const w = 6 + 9 * (0.35 + 0.65 * b.wing); c.fillStyle = '#ff9a2e'; c.strokeStyle = '#7a3b00'; c.lineWidth = 1.5
    for (const s of [-1, 1]) { c.beginPath(); c.ellipse(s * w * .55, -3, w * .55, 7, s * .35, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(s * w * .4, 5, w * .38, 5, -s * .3, 0, 7); c.fill(); c.stroke() }
    c.fillStyle = '#3a2000'; c.fillRect(-1.2, -8, 2.4, 17); c.restore()
  }
  private drawLanternBloom(T: number, X: number) {
    const c = this.ctx; c.save(); c.globalCompositeOperation = 'lighter'
    for (const lx of this.art.track.lanternsX) { const x = lx - X; if (x < -200 || x > ARENA.W + 200) continue; const f = 0.88 + 0.12 * Math.sin(T * 7 + lx * 0.13); const g = c.createRadialGradient(x, BERM_Y - 144 + 14, 0, x, BERM_Y - 130, 170); g.addColorStop(0, `rgba(255,190,120,${0.16 * f})`); g.addColorStop(1, 'rgba(255,170,100,0)'); c.fillStyle = g; c.fillRect(x - 170, BERM_Y - 300, 340, 340) }
    c.restore()
  }
  private drawSnow(T: number, X: number) {
    const c = this.ctx; c.save()
    for (let i = 0; i < 170; i++) {
      const h1 = Math.sin(i * 12.9898) * 43758.5453, a = h1 - Math.floor(h1), h2 = Math.sin(i * 78.233) * 12345.678, b = h2 - Math.floor(h2), z = 0.25 + b * 0.75
      const fall = (T * (26 + 50 * z) + a * ARENA.H) % (ARENA.H + 20), x = (((a * 5371) - T * (10 + 18 * z) - X * 0.18 * z) % (ARENA.W + 40) + ARENA.W + 40) % (ARENA.W + 40) - 20 + Math.sin(T * 0.8 + i) * 8 * z
      c.globalAlpha = 0.25 + 0.5 * z; c.fillStyle = '#fff'; c.beginPath(); c.arc(x, fall - 10, 0.7 + 2 * z * z, 0, 7); c.fill()
    }
    c.restore()
  }
  private drawGrade() {
    const c = this.ctx; c.save()
    const v = c.createRadialGradient(ARENA.W / 2, ARENA.H * 0.55, ARENA.H * 0.45, ARENA.W / 2, ARENA.H * 0.55, ARENA.W * 0.72); v.addColorStop(0, 'rgba(20,10,70,0)'); v.addColorStop(1, 'rgba(20,10,70,.42)'); c.fillStyle = v; c.fillRect(0, 0, ARENA.W, ARENA.H)
    c.globalCompositeOperation = 'soft-light'; c.fillStyle = lin(c, 0, 0, 0, ARENA.H, [[0, 'rgba(120,90,255,.18)'], [0.5, 'rgba(255,160,160,.10)'], [1, 'rgba(60,50,170,.22)']]); c.fillRect(0, 0, ARENA.W, ARENA.H)
    c.restore()
  }
  private drawHud(T: number) {
    const c = this.ctx; c.save(); c.font = 'bold 24px system-ui, sans-serif'; c.textBaseline = 'middle'
    for (let i = 0; i < 5; i++) { const y = ARENA.LANE_Y[i] - 34 * ARENA.LANE_K[i]; c.fillStyle = 'rgba(255,120,40,.92)'; c.beginPath(); c.roundRect(28, y - 20, 40, 40, 10); c.fill(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText(String(i + 1), 48, y + 1); c.textAlign = 'left'; c.fillStyle = 'rgba(255,255,255,.92)'; c.font = 'bold 20px system-ui, sans-serif'; c.fillText(this.names[i], 78, y + 1); c.font = 'bold 24px system-ui, sans-serif' }
    // мини-карта: положение собак на дистанции
    const x0 = 560, x1 = 1360, y = 44; c.fillStyle = 'rgba(15,10,60,.55)'; c.beginPath(); c.roundRect(x0 - 16, y - 18, x1 - x0 + 32, 36, 18); c.fill(); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x0, y - 1, x1 - x0, 2)
    this.race!.dogs.forEach((dog, i) => { const p = stateAt(dog, T).progress; c.fillStyle = ['#ffb26b', '#fff', '#7a6fb0', '#8fb0ff', '#e9e3ff'][i]; c.strokeStyle = '#1a1250'; c.lineWidth = 2; c.beginPath(); c.arc(x0 + p * (x1 - x0), y, 8, 0, 7); c.fill(); c.stroke() })
    c.restore()
  }
  private drawGuide(X: number) {
    const c = this.ctx; c.save(); c.font = '16px ui-monospace, monospace'; c.lineWidth = 1
    const band = (y0: number, y1: number, col: string, label: string) => { c.fillStyle = col; c.fillRect(0, y0, ARENA.W, y1 - y0); c.fillStyle = 'rgba(255,255,255,.95)'; c.fillText(label, 1500, y0 + 18) }
    band(HZ, BERM_Y, 'rgba(255,255,255,.06)', `озеро/задник: y ${HZ}–${BERM_Y}`); ARENA.LANE_Y.forEach((y, i) => { c.strokeStyle = 'rgba(0,255,200,.7)'; c.beginPath(); c.moveTo(0, y); c.lineTo(ARENA.W, y); c.stroke(); c.fillStyle = 'rgba(0,255,200,.9)'; c.fillText(`дорожка ${i + 1}: лапы y=${y}, масштаб ×${ARENA.LANE_K[i]}`, 1480, y + 16) })
    const cols = ['#ffd23c', '#ff8a3c', '#ff5fa2', '#7ad7ff', '#9bff8a']
    SLOTS.forEach((sp, i) => { const have = this.slots.some(l => l.spec.id === sp.id), col = cols[i % cols.length], y0 = sp.bottomY - sp.tileH; c.strokeStyle = col; c.setLineDash([10, 6]); c.lineWidth = 2; c.strokeRect(40 + i * 6, y0, 1840 - i * 12, sp.tileH); c.setLineDash([])
      c.fillStyle = 'rgba(10,6,40,.72)'; c.fillRect(48, 96 + i * 28, 760, 24); c.fillStyle = col; c.fillText(`${have ? '✓' : '○'} ${sp.id}: ${sp.tileW}×${sp.tileH} при 1×, параллакс ${sp.parallax}, нижняя кромка y=${sp.bottomY}`, 56, 114 + i * 28) })
    c.restore(); void X
  }
}
const lin = (c: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, stops: [number, string][]) => { const g = c.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, col]) => g.addColorStop(o, col)); return g }
