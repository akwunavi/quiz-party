// Сцена раунда «Скачки бульдогов» на canvas 1920×1080: выбор → переход → отсчёт → гонка Race V3 → финиш → пьедестал.
// Порт лабораторной сцены (bulldog-racing/round-lab) под продукт: время ИЗ ЧАСОВ (startedAt), цвета из CSS-переменных темы, ресурсы с освобождением.
// Не знает про React и сеть: снаружи вызывают setInput() и draw(nowMs).
import { LAYOUT as L, DOG_IDS, T, versionedUrl, type DogId } from './config'
import { raceClock, type RacePhase } from './phases'
import { raceFor, stateAt, canPrefetch, loadDogData, loadSelectionData, createSelectionPlayer, raceSheetUrls, selectSheetUrl, BitmapPool, type DogData } from './engine'
import { ButterflyManager } from './vendor/butterfly.mjs'
import type { RaceV3, SelectionPlayer, SelectionFrame, Visual } from './v3types'
import { ArenaRenderer, type ArenaOptions } from './arena/arena'
import * as SK from './stageSkin'

export interface StageInput {
  race: { seed: number; D: number; startedMs: number | null } | null      // null — идёт выбор; startedMs — startedAt (мс, серверное время)
  frozenElapsed?: number                                             // предпросмотр редактора: фиксированное время с «Старт» вместо часов
  counts: number[]; names: string[]
  scores: { team: string; dog: number | null; place: number | null; points: number }[]
  /** Зимняя арена вместо плоской трассы на фазах переход/отсчёт/гонка/финиш. Нет поля — прежняя сцена (по умолчанию в игре). Слои арены — из slotBase. */
  arena?: Pick<ArenaOptions, 'slotBase' | 'slotFiles'>
  /** Этап `preparing` (startedMs = null): плашка статуса поверх закрытого выбора. */
  prep?: { title: string; sub?: string } | null
}
export type StagePhase = RacePhase | 'select' | 'preparing'
export interface StageStats { phase: StagePhase; decodedMB: number; bitmaps: number; loading: boolean; drawMs: number
  /** Всё для гонки готово: листы всех собак этого сида декодированы и арена построена (проектор только после этого пишет startedAt). */
  raceReady?: boolean }
const seg01 = (u: number, a: number, b: number) => ease((u - a) / (b - a))
const ease = (u: number) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u) }
const SW = L.spriteWidth, SH = L.spriteHeight
const PODIUM_PAW_ROW = 273

export class StageRenderer {
  private ctx: CanvasRenderingContext2D
  private pool = new BitmapPool()
  private dogs: (DogData | null)[] = [null, null, null, null, null]
  private players: (SelectionPlayer | null)[] = [null, null, null, null, null]
  private frames: (SelectionFrame | null)[] = [null, null, null, null, null]
  private acc = 0; private lastNow = 0
  private prevCounts: number[] | null = null
  private wantPick = new Set<number>()
  private bf = new ButterflyManager()
  private input: StageInput = { race: null, counts: [0, 0, 0, 0, 0], names: [], scores: [] }
  private raceObj: RaceV3 | null = null; private raceKey = ''
  private podiumPlayers: (SelectionPlayer | null)[] = [null, null, null, null, null]; private podiumFrames: (SelectionFrame | null)[] = [null, null, null, null, null]
  private podiumPicked = false; private prevPhase: StagePhase = 'select'
  private selData: Awaited<ReturnType<typeof loadSelectionData>> | null = null
  private noseCache = new Map<string, { x: number; y: number }>(); private tmp: HTMLCanvasElement; private tctx: CanvasRenderingContext2D
  private pal = { fg: '#f2f5fa', muted: '#9aa7bd', panel: '#101728', accent: '#ea580c', accent2: '#22d3ee', ok: '#57f5c0', font: 'sans-serif', at: 0 }
  private dead = false; private prefetched = false
  private skin: SK.Skin = { light: false, fg: '#f2f5fa', muted: '#9aa7bd', panel: '#101728', bg: '#0a0f1e', bg2: '#101728', accent: '#ea580c', accent2: '#22d3ee', hi: '#22d3ee', ok: '#57f5c0', disp: 'sans-serif', digits: 'monospace', frame: 'bevel', decor: 'none' }
  private endSnap: HTMLCanvasElement | null = null; private podiumBg: HTMLCanvasElement | null = null
  private arena: ArenaRenderer | null = null; private arenaCv: HTMLCanvasElement | null = null; private arenaKey = ''
  stats: StageStats = { phase: 'select', decodedMB: 0, bitmaps: 0, loading: true, drawMs: 0 }
  private drawAcc = 0; private drawN = 0
  constructor(private canvas: HTMLCanvasElement, private now: () => number = Date.now) {
    canvas.width = L.width; canvas.height = L.height
    this.ctx = canvas.getContext('2d')!
    this.tmp = document.createElement('canvas'); this.tmp.width = SW; this.tmp.height = SH; this.tctx = this.tmp.getContext('2d', { willReadFrequently: true })!
    void this.boot()
  }
  setInput(i: StageInput) {
    const c = i.counts
    if (this.prevCounts) c.forEach((n, k) => { if (n > 0 && this.prevCounts![k] === 0 && !this.input.race && !i.race) this.wantPick.add(k) })   // собака реагирует на ПЕРВЫЙ выбор
    this.prevCounts = c.slice(); this.input = i
    if (i.arena && !this.arena) { this.arenaCv = document.createElement('canvas'); this.arena = new ArenaRenderer(this.arenaCv, { ...i.arena, shared: { pool: this.pool, dogs: this.dogs } }); void this.arena.prepare().catch(() => { this.arena = null }) }   // тяжёлое (небо, трасса) — пока идёт выбор
    const key = i.race ? `${i.race.seed}:${i.race.D}` : ''
    if (key !== this.raceKey) {
      this.raceKey = key; this.raceObj = key ? raceFor(i.race!.seed, i.race!.D) : null
      this.bf.reset(); this.arenaKey = ''; this.endSnap = null; this.podiumBg = null; this.podiumPicked = false; this.podiumPlayers = [null, null, null, null, null]
      if (!key) { this.players = [null, null, null, null, null]; this.frames = [null, null, null, null, null]; this.wantPick.clear() }       // новый раунд: выбор начинается заново
    }
  }
  /** Уход с экрана: закрыть все ImageBitmap и ОТДАТЬ видеопамять canvas (размер 0) — иначе буфер 1920×1080 и временный холст живут до сборщика мусора. */
  destroy() {
    this.dead = true; this.arena?.destroy(); this.arena = null; this.arenaCv = null; this.pool.release(); this.noseCache.clear()
    this.canvas.width = 0; this.canvas.height = 0; this.tmp.width = 0; this.tmp.height = 0
  }
  private async boot() {
    try {
      this.selData = await loadSelectionData()
      await Promise.all(DOG_IDS.map(async (id, i) => { this.dogs[i] = await loadDogData(id) }))
    } catch { /* сеть: повторим на следующем кадре через ensure() */ }
  }
  private elapsed(): number { const r = this.input.race; return !r || r.startedMs == null ? 0 : this.input.frozenElapsed ?? (this.now() - r.startedMs) / 1000 }
  // ───────────── управление ресурсами по фазе
  private urlsFor(phase: StagePhase, phaseT = 0): Set<string> {
    const w = new Set<string>()
    const sel = (i: number, clips: string[]) => { const d = this.dogs[i]; if (d) for (const c of clips) w.add(selectSheetUrl(DOG_IDS[i], d.sel.clips[c]?.sheet ?? '')) }
    if (phase === 'select' || phase === 'preparing' || (phase === 'transition' && phaseT < T.transition * 0.62)) {          // карточки уходят за первые 40% перехода — дальше листы выбора не нужны
      for (let i = 0; i < 5; i++) { sel(i, ['idle']); if (this.wantPick.has(i) || this.players[i]?.busy() || this.input.counts[i] > 0) { if (this.dogs[i]?.sel.clips.sel) sel(i, ['sel', 'ret'].filter(c => this.dogs[i]!.sel.clips[c])) } }
    }
    // гонка догружается уже во время перехода (3,2 с): к отсчёту листы декодированы; листы выбора освобождаются с началом отсчёта
    if (phase === 'preparing' || phase === 'transition' || phase === 'countdown' || phase === 'race' || phase === 'finish' || phase === 'podiumTransition') {
      if (this.raceObj) this.raceObj.dogs.forEach((dog, i) => { const d = this.dogs[i]; if (d) raceSheetUrls(d, dog.segments).forEach(u => w.add(u)) })
    }
    if (phase === 'finish' || phase === 'podiumTransition' || phase === 'podium') {            // итоги и пьедестал: IDLE всех пяти + SELECTED/RETURN победителя
      const pl = this.raceObj?.places ?? []
      for (let i = 0; i < 5; i++) sel(i, ['idle'])
      if (pl[0] != null) sel(pl[0], ['sel', 'ret'].filter(c => this.dogs[pl[0]]?.sel.clips[c]))
    }
    if (phase === 'podium') { /* гонка уже не нужна */ }
    return w
  }
  private ensure(phase: StagePhase, phaseT = 0) {
    const want = this.urlsFor(phase, phaseT)
    const keepRace = phase === 'podiumTransition' || phase === 'finish'                         // под затемнением ещё рисуется трасса
    this.pool.release(u => want.has(u) || (keepRace && this.raceObj != null && u.includes('/race/')))
    let loading = false
    for (const u of want) { if (!this.pool.peek(u)) { loading = true; void this.pool.get(u).catch(() => {}) } }
    // прогрев сетевого кеша гонки (без декодирования), пока идёт выбор: к старту листы уже скачаны (SW кеширует их cache-first)
    if (!this.prefetched && canPrefetch() && phase === 'select' && !loading && this.dogs.every(Boolean)) {
      this.prefetched = true
      void (async () => { for (const d of this.dogs) { if (!d) continue; for (const u of raceSheetUrls(d, [{ kind: 'BUTTERFLY' }, { kind: 'ROLL' }, { kind: 'SNIFF_PEE' }, { kind: 'RETURN' }] as never)) { try { await (await fetch(versionedUrl(u))).blob() } catch { /* не критично */ } } } })()
    }
    const raceReady = !!this.raceObj && this.dogs.every(Boolean) && this.raceObj.dogs.every((dog, i) => raceSheetUrls(this.dogs[i]!, dog.segments).every(u => !!this.pool.peek(u))) && (!this.arena || this.arenaReady())
    this.stats = { ...this.stats, phase, decodedMB: Math.round(this.pool.decodedBytes / 1048576), bitmaps: this.pool.count, loading, raceReady }
  }
  // ───────────── кадр
  draw(nowMs: number) {
    if (this.dead) return
    const t0 = performance.now(); this.drawInner(nowMs)
    this.drawAcc += performance.now() - t0; if (++this.drawN >= 30) { this.stats = { ...this.stats, drawMs: +(this.drawAcc / this.drawN).toFixed(1) }; this.drawAcc = 0; this.drawN = 0 }
  }
  private selectIO(status: { title: string; sub?: string } | null = null): SK.SelectIO {
    return { names: this.input.names, counts: this.input.counts, closed: !!this.input.race, status, dog: (i, cx, pawY, k) => this.dogAt(this.frames[i], i, cx, pawY, k) }
  }
  /** Собака по центру cx с линией лап на pawY (нижняя строка IDLE-ячейки — PODIUM_PAW_ROW). */
  private dogAt(fr: SelectionFrame | null, i: number, cx: number, pawY: number, k: number) {
    const d = this.dogs[i]; if (!d) return; const [cw] = d.sel.cell; this.drawSel(i, fr, cx - cw * k / 2, pawY - PODIUM_PAW_ROW * k, k)
  }
  private drawInner(nowMs: number) {
    const dt = this.lastNow ? Math.min(0.25, (nowMs - this.lastNow) / 1000) : 0; this.lastNow = nowMs
    const inp = this.input, preparing = !!inp.race && inp.race.startedMs == null && !!this.raceObj
    const rc = inp.race && this.raceObj && !preparing ? raceClock(this.elapsed(), this.raceObj.end) : null
    const phase: StagePhase = preparing ? 'preparing' : rc ? rc.phase : 'select'
    if (phase !== this.prevPhase) { this.prevPhase = phase; this.podiumPicked = false }
    this.ensure(phase, rc?.phaseT ?? 0)
    if (nowMs - this.pal.at > 1500) this.readPalette()
    // 24 Гц: проигрыватели экрана выбора
    this.acc += dt
    while (this.acc >= 1 / 24) { this.acc -= 1 / 24; this.tickSelection(phase); }
    const c = this.ctx, sk = this.skin; c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, L.width, L.height)
    const board = (alpha = 1, scale = 1, status: { title: string; sub?: string } | null = null) => { SK.backdrop(c, sk); if (sk.decor === 'winter' && !sk.light) SK.garland(c, sk, 20); SK.drawSelect(c, sk, this.selectIO(status), alpha, scale) }
    if (phase === 'select') board()
    else if (phase === 'preparing') board(1, 1, inp.prep ?? { title: 'ГОТОВИМ ГОНКУ…' })
    else if (phase === 'transition') {                                                      // переход A «Стартовая решётка»: шторка темы открывает арену, собаки уже на стартовых местах; без плашек и подписей
      const u = rc!.phaseT / T.transition, edge = SK.wipeEdge(u), got = this.drawArena(0)
      if (!got) { c.fillStyle = '#000'; c.fillRect(0, 0, L.width, L.height) }
      if (u < 0.66) { SK.drawWipeClip(c, edge, () => board(1 - seg01(u, 0, .3), 1 + seg01(u, 0, .3) * .04)); SK.drawWipeBand(c, sk, edge) }
      if (!got) this.drawTrack(0, 'stand', () => 1)
      SK.drawStartBanner(c, sk, SK.seg(u, .3, .5) * (1 - SK.seg(u, .84, .96)))
    }
    else if (phase === 'countdown') {                                                       // собаки стоят на старте; цифра 5…1 по секунде; гоночное время не идёт
      if (!this.drawArena(0)) this.drawTrack(0, 'stand'); SK.drawCountdownNumber(c, sk, String(rc!.countdown), rc!.phaseT - Math.floor(rc!.phaseT))
    }
    else if (phase === 'race') { if (!this.drawArena(rc!.raceT)) this.drawTrack(rc!.raceT, 'race'); if (rc!.raceT < 1) SK.drawCountdownNumber(c, sk, 'НАЧИНАЕМ!', rc!.raceT, true) }
    else if (phase === 'finish' || phase === 'podiumTransition') {
      this.drawEnd(); SK.drawResults(c, sk, this.resultsIO(), phase === 'finish' ? SK.seg(rc!.phaseT, 0, 1.6) : 1)
      if (phase === 'podiumTransition') { c.save(); c.globalAlpha = ease(rc!.phaseT / T.podiumTransition); this.drawPodiumScreen(rc!); c.restore() }
    }
    else this.drawPodiumScreen(rc!)
    if (this.stats.loading && (phase === 'select' || phase === 'transition' || phase === 'countdown')) this.text('Загрузка бульдогов…', 960, 1040, 26, this.rgba(this.pal.muted, .9), 'center')
  }
  /** Арена на момент финиша: один снимок (кадр статичен) — дальше только drawImage. */
  private drawEnd() {
    const c = this.ctx
    if (!this.endSnap && this.raceObj && this.arenaReady() && this.dogs.every(Boolean)) { const a = this.arena!; a.names = this.input.names; a.draw(this.raceObj.end); this.endSnap = document.createElement('canvas'); this.endSnap.width = L.width; this.endSnap.height = L.height; this.endSnap.getContext('2d')!.drawImage(this.arenaCv!, 0, 0) }
    if (this.endSnap) c.drawImage(this.endSnap, 0, 0); else this.drawTrack(this.raceObj!.end, 'race')
  }
  private resultsIO(): SK.ResultsIO {
    const race = this.raceObj!, sc = this.input.scores, names = this.input.names
    return { rows: race.places.map((d, p) => ({ dog: d, name: names[d] ?? '', time: race.dogs[d].crossing, teams: sc.filter(x => x.dog === d + 1).map(x => x.team), points: 5 - p })), noBet: sc.filter(x => !x.dog).map(x => x.team), dog: (i, cx, pawY, k) => this.dogAt(this.podiumFrames[i], i, cx, pawY, k) }
  }
  private drawPodiumScreen(rc: ReturnType<typeof raceClock>) {
    const race = this.raceObj!, sc = this.input.scores
    if (this.skin.decor === 'winter' && !this.podiumBg) {                                    // размытая арена на заднем плане пьедестала — один раз
      this.drawEnd(); const b = document.createElement('canvas'); b.width = L.width; b.height = L.height; const bc = b.getContext('2d')!; bc.filter = 'blur(5px)'; bc.drawImage(this.endSnap ?? this.canvas, -30, -30, L.width + 60, L.height + 60); this.podiumBg = b
    }
    SK.drawPodium(this.ctx, this.skin, { places: race.places, names: this.input.names, shown: rc.podiumShown, bgBlur: this.podiumBg,
      teamsByDog: [0, 1, 2, 3, 4].map(d => sc.filter(x => x.dog === d + 1).map(x => x.team)), scores: sc.map(x => ({ team: x.team, dog: x.dog, points: x.points })), dog: (i, cx, pawY, k) => this.dogAt(this.podiumFrames[i], i, cx, pawY, k) })
  }
  /** Арена включена, привязана к ЭТОЙ гонке и готова к кадру. */
  private arenaReady(): boolean {
    const a = this.arena, race = this.input.race; if (!a || !this.raceObj || !race || !this.dogs.every(Boolean)) return false
    if (this.arenaKey !== this.raceKey) { a.setRace({ seed: race.seed, D: race.D }, 0, this.raceObj.end); this.arenaKey = this.raceKey; this.endSnap = null; this.podiumBg = null }
    return a.ready
  }
  /** Кадр зимней арены (если включена и готова) на основное полотно; false — рисуем прежнюю трассу. t — секунды гонки (0 — старт). */
  private drawArena(t: number, alpha = 1): boolean {
    if (!this.arenaReady()) return false
    const a = this.arena!; a.names = this.input.names; a.draw(t); const c = this.ctx; c.save(); c.globalAlpha = alpha; c.drawImage(this.arenaCv!, 0, 0); c.restore(); return true
  }
  private tickSelection(phase: StagePhase) {
    if (!this.selData) return
    for (let i = 0; i < 5; i++) {
      const d = this.dogs[i]; if (!d) continue
      if (!this.players[i] && this.pool.peek(selectSheetUrl(DOG_IDS[i], d.sel.clips.idle.sheet))) this.players[i] = createSelectionPlayer(DOG_IDS[i], this.selData, Math.floor(Math.random() * 40) + i * 7)
      const p = this.players[i]; if (!p) continue
      if (this.wantPick.has(i) && !p.busy()) {
        const ok = ['sel', 'ret'].every(cl => !d.sel.clips[cl] || this.pool.peek(selectSheetUrl(DOG_IDS[i], d.sel.clips[cl].sheet)))
        if (ok && p.pick()) this.wantPick.delete(i)                                              // ждём, пока SELECTED/RETURN докачаются: обрыва реакции нет
      }
      this.frames[i] = p.tick()
    }
    if (phase === 'podium' || phase === 'podiumTransition' || phase === 'finish') {
      const pl = this.raceObj?.places ?? []
      for (const dog of [0, 1, 2, 3, 4]) {
        const d = this.dogs[dog]; if (!d || !this.selData) continue
        if (!this.podiumPlayers[dog] && this.pool.peek(selectSheetUrl(DOG_IDS[dog], d.sel.clips.idle.sheet))) this.podiumPlayers[dog] = createSelectionPlayer(DOG_IDS[dog], this.selData, Math.floor(Math.random() * 40))
        const p = this.podiumPlayers[dog]; if (p) this.podiumFrames[dog] = p.tick()
      }
      const clk = this.input.race && this.raceObj ? raceClock(this.elapsed(), this.raceObj.end) : null
      if (clk && clk.phase === 'podium' && clk.podiumShown === 3 && clk.phaseT < 6 && !this.podiumPicked && pl[0] != null) {   // победитель реагирует, только если смотрели с начала пьедестала
        const p = this.podiumPlayers[pl[0]], d = this.dogs[pl[0]]
        if (p && d && ['sel', 'ret'].every(cl => !d.sel.clips[cl] || this.pool.peek(selectSheetUrl(DOG_IDS[pl[0]], d.sel.clips[cl].sheet))) && p.pick()) this.podiumPicked = true
      }
    }
  }
  // ───────────── палитра темы (цвета — только из CSS-переменных, хардкод ломает темы)
  private readPalette() {
    const cs = getComputedStyle(this.canvas); const g = (n: string, d: string) => cs.getPropertyValue(n).trim() || d
    this.skin = SK.readSkin(this.canvas)
    this.pal = { fg: g('--fg', '#f2f5fa'), muted: g('--muted', '#9aa7bd'), panel: g('--panel', '#101728'), accent: g('--accent', '#ea580c'), accent2: g('--accent2', '#22d3ee'),
      ok: g('--ok', '#57f5c0'), font: cs.fontFamily || 'sans-serif', at: performance.now() }
  }
  private rgba(color: string, a: number): string {                                                 // цвет #rgb/#rrggbb/rgb() + прозрачность
    const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color)
    if (m) { const h = m[1].length === 3 ? m[1].split('').map(x => x + x).join('') : m[1]; return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})` }
    const r = /rgba?\(([^)]+)\)/.exec(color); if (r) { const p = r[1].split(',').slice(0, 3); return `rgba(${p.join(',')},${a})` }
    return color
  }
  private text(s: string, x: number, y: number, size: number, color: string, align: CanvasTextAlign = 'left', weight = 'normal') {
    const c = this.ctx; c.fillStyle = color; c.font = `${weight} ${size}px ${this.pal.font}`; c.textAlign = align; c.fillText(s, x, y); c.textAlign = 'left'
  }
  private rr(x: number, y: number, w: number, h: number, r: number) { this.ctx.beginPath(); this.ctx.roundRect(x, y, w, h, r) }
  // ───────────── кадры экрана выбора
  private selBitmap(i: number, fr: SelectionFrame | null) {
    const d = this.dogs[i]; if (!fr || !d) return null
    const bm = this.pool.peek(selectSheetUrl(DOG_IDS[i], d.sel.clips[fr.clip]?.sheet ?? '')); return bm ? { bm, d, fr } : null
  }
  private drawSel(i: number, fr: SelectionFrame | null, x: number, y: number, k: number) {
    const s = this.selBitmap(i, fr); if (!s) return
    const [cw, ch] = s.d.sel.cell, cols = s.d.sel.columns
    this.ctx.drawImage(s.bm, (s.fr.index % cols) * cw, Math.floor(s.fr.index / cols) * ch, cw, ch, x, y, cw * k, ch * k)
  }
  // ───────────── трасса
  private laneY(i: number) { return L.laneTop + i * L.laneStep }
  private noseOf(id: DogId, d: DogData, v: Visual, bm: ImageBitmap) {
    const key = id + v.sheet + v.index, hit = this.noseCache.get(key); if (hit) return hit
    const A = d.atlas; this.tctx.clearRect(0, 0, SW, SH)
    this.tctx.drawImage(bm, (v.index! % A.columns) * A.cellWidth, Math.floor(v.index! / A.columns) * A.cellHeight, A.cellWidth, A.cellHeight, 0, 0, SW, SH)
    const px = this.tctx.getImageData(0, 0, SW, SH).data; let top = 1e9, bot = -1
    for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) if (px[(y * SW + x) * 4 + 3] >= 128) { top = Math.min(top, y); bot = Math.max(bot, y) }
    const lim = top + (bot - top) * .6; let bx = -1, by = top
    for (let y = top; y <= lim; y++) for (let x = SW - 1; x >= 0; x--) if (px[(y * SW + x) * 4 + 3] >= 128) { if (x > bx) { bx = x; by = y } break }
    const r = { x: bx, y: by }; this.noseCache.set(key, r); return r
  }
  private drawTrack(t: number, mode: 'race' | 'stand', fadeLane?: (i: number) => number) {
    const c = this.ctx, P = this.pal, race = this.raceObj
    c.save()
    c.strokeStyle = this.rgba(P.muted, .8); c.lineWidth = 4
    for (const x of [L.startX, L.finishX]) { c.beginPath(); c.moveTo(x, 150); c.lineTo(x, 1000); c.stroke() }
    for (let r = 0; r < 12; r++) { c.fillStyle = r % 2 ? '#111' : '#eee'; c.fillRect(L.finishX + 2, 150 + r * 71, 14, 71) }
    this.text('СТАРТ', L.startX, 140, 22, P.muted, 'center', 'bold'); this.text('ФИНИШ', L.finishX, 140, 22, P.muted, 'center', 'bold')
    const prog = race ? race.dogs.map(dg => stateAt(dg, t).progress) : [0, 0, 0, 0, 0], order = prog.map((p, i) => [p, i]).sort((a, b) => b[0] - a[0]).map(a => a[1])
    DOG_IDS.forEach((id, i) => {
      const ly = this.laneY(i), d = this.dogs[i], dog = race?.dogs[i]
      c.fillStyle = i % 2 ? 'rgba(0,0,0,.16)' : 'rgba(0,0,0,.26)'; c.fillRect(0, ly - 111, L.width, 151)
      c.strokeStyle = this.rgba(P.muted, .35); c.lineWidth = 1; for (let k = 0; k <= 10; k++) { const x = L.startX + k * (L.finishX - L.startX) / 10; c.beginPath(); c.moveTo(x, ly + 14); c.lineTo(x, ly + 26); c.stroke() }
      c.beginPath(); c.moveTo(L.startX, ly + 20); c.lineTo(L.finishX, ly + 20); c.stroke()
      c.fillStyle = P.accent; this.rr(24, ly - 100, 52, 52, 12); c.fill(); this.text(String(i + 1), 50, ly - 62, 34, '#fff', 'center', 'bold'); this.text(this.input.names[i] ?? id, 90, ly - 62, 30, P.fg, 'left', 'bold')
      if (!d || !dog) return
      const st = stateAt(dog, t), x = L.startX + st.progress * (L.finishX - L.startX + L.finishControlOffset), v = d.visual.at(dog.segments, t)
      const a = fadeLane ? fadeLane(i) : 1; if (a <= 0) return
      c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(x - 50, ly + 2, 59, 5, 0, 0, 7); c.fill()
      const bm = v.sheet ? this.pool.peek(`${selectSheetUrl(id, v.sheet)}`) : undefined
      if (bm && v.index != null) c.drawImage(bm, (v.index % d.atlas.columns) * d.atlas.cellWidth, Math.floor(v.index / d.atlas.columns) * d.atlas.cellHeight, d.atlas.cellWidth, d.atlas.cellHeight, x - L.spriteAnchorX + v.shiftPx, ly - L.spriteTopOffset, SW, SH)
      c.globalAlpha = 1
      if (mode === 'race') {
        const cl = d.contract.clips.BUTTERFLY, n = cl?.sampler === 'table' ? cl.labels!.length : (cl?.count ?? 1)
        const b = this.bf.update(i, v, n, t, () => { const nz = bm && v.index != null ? this.noseOf(id, d, v, bm) : { x: 150, y: 40 }; return { x: x - L.spriteAnchorX + v.shiftPx + nz.x, y: ly - L.spriteTopOffset + nz.y } })
        if (b) this.drawButterfly(b)
        const done = t >= dog.crossing
        this.text(done ? `${race!.places.indexOf(i) + 1} МЕСТО` : `${order.indexOf(i) + 1}-й · ${(st.progress * 100).toFixed(0)}%`, 1650, ly - 36, 24, done ? P.accent : P.fg, 'left', 'bold')
      }
    })
    c.restore()
  }
  private drawButterfly(b: { x: number; y: number; alpha: number; wing: number }) {
    const c = this.ctx; c.save(); c.globalAlpha = b.alpha; c.translate(b.x, b.y)
    const w = 6 + 9 * (0.35 + 0.65 * b.wing); c.fillStyle = '#ff9a2e'; c.strokeStyle = '#7a3b00'; c.lineWidth = 1.5
    for (const s of [-1, 1]) { c.beginPath(); c.ellipse(s * w * .55, -3, w * .55, 7, s * .35, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(s * w * .4, 5, w * .38, 5, -s * .3, 0, 7); c.fill(); c.stroke() }
    c.fillStyle = '#3a2000'; c.fillRect(-1.2, -8, 2.4, 17); c.restore()
  }
  // ───────────── финиш и пьедестал
}
