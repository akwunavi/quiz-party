// Сцена раунда «Скачки бульдогов» на canvas 1920×1080: выбор → переход → отсчёт → гонка Race V3 → финиш → пьедестал.
// Порт лабораторной сцены (bulldog-racing/round-lab) под продукт: время ИЗ ЧАСОВ (startedAt), цвета из CSS-переменных темы, ресурсы с освобождением.
// Не знает про React и сеть: снаружи вызывают setInput() и draw(nowMs).
import { LAYOUT as L, DOG_IDS, T, versionedUrl, type DogId } from './config'
import { raceClock, type RacePhase } from './phases'
import { raceFor, stateAt, canPrefetch, loadDogData, loadSelectionData, createSelectionPlayer, raceSheetUrls, selectSheetUrl, BitmapPool, type DogData } from './engine'
import { ButterflyManager } from './vendor/butterfly.mjs'
import type { RaceV3, SelectionPlayer, SelectionFrame, Visual } from './v3types'
import { ArenaRenderer, type ArenaOptions } from './arena/arena'

export interface StageInput {
  race: { seed: number; D: number; startedMs: number } | null      // null — идёт выбор; startedMs — startedAt (мс, серверное время)
  frozenElapsed?: number                                             // предпросмотр редактора: фиксированное время с «Старт» вместо часов
  counts: number[]; names: string[]
  scores: { team: string; dog: number | null; place: number | null; points: number }[]
  /** Зимняя арена вместо плоской трассы на фазах переход/отсчёт/гонка/финиш. Нет поля — прежняя сцена (по умолчанию в игре). Слои арены — из slotBase. */
  arena?: Pick<ArenaOptions, 'slotBase' | 'slotFiles'>
}
export interface StageStats { phase: RacePhase | 'select'; decodedMB: number; bitmaps: number; loading: boolean; drawMs: number }
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
  private podiumPicked = false; private prevPhase: RacePhase | 'select' = 'select'
  private selData: Awaited<ReturnType<typeof loadSelectionData>> | null = null
  private noseCache = new Map<string, { x: number; y: number }>(); private tmp: HTMLCanvasElement; private tctx: CanvasRenderingContext2D
  private pal = { fg: '#f2f5fa', muted: '#9aa7bd', panel: '#101728', accent: '#ea580c', accent2: '#22d3ee', ok: '#57f5c0', font: 'sans-serif', at: 0 }
  private dead = false; private prefetched = false
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
      this.bf.reset(); this.arenaKey = ''; this.podiumPicked = false; this.podiumPlayers = [null, null, null, null, null]
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
  private elapsed(): number { const r = this.input.race; return !r ? 0 : this.input.frozenElapsed ?? (this.now() - r.startedMs) / 1000 }
  // ───────────── управление ресурсами по фазе
  private urlsFor(phase: RacePhase | 'select', phaseT = 0): Set<string> {
    const w = new Set<string>()
    const sel = (i: number, clips: string[]) => { const d = this.dogs[i]; if (d) for (const c of clips) w.add(selectSheetUrl(DOG_IDS[i], d.sel.clips[c]?.sheet ?? '')) }
    if (phase === 'select' || (phase === 'transition' && phaseT < T.transition * 0.4)) {          // карточки уходят за первые 40% перехода — дальше листы выбора не нужны
      for (let i = 0; i < 5; i++) { sel(i, ['idle']); if (this.wantPick.has(i) || this.players[i]?.busy() || this.input.counts[i] > 0) { if (this.dogs[i]?.sel.clips.sel) sel(i, ['sel', 'ret'].filter(c => this.dogs[i]!.sel.clips[c])) } }
    }
    // гонка догружается уже во время перехода (3,2 с): к отсчёту листы декодированы; листы выбора освобождаются с началом отсчёта
    if (phase === 'transition' || phase === 'countdown' || phase === 'race' || phase === 'finish' || phase === 'podiumTransition') {
      if (this.raceObj) this.raceObj.dogs.forEach((dog, i) => { const d = this.dogs[i]; if (d) raceSheetUrls(d, dog.segments).forEach(u => w.add(u)) })
    }
    if (phase === 'finish' || phase === 'podiumTransition' || phase === 'podium') {            // пьедестал: IDLE призёров + SELECTED/RETURN победителя
      const pl = this.raceObj?.places ?? []
      pl.slice(0, 3).forEach((dog, k) => sel(dog, k === 0 ? ['idle', 'sel', 'ret'].filter(c => this.dogs[dog]?.sel.clips[c]) : ['idle']))
    }
    if (phase === 'podium') { /* гонка уже не нужна */ }
    return w
  }
  private ensure(phase: RacePhase | 'select', phaseT = 0) {
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
    this.stats = { ...this.stats, phase, decodedMB: Math.round(this.pool.decodedBytes / 1048576), bitmaps: this.pool.count, loading }
  }
  // ───────────── кадр
  draw(nowMs: number) {
    if (this.dead) return
    const t0 = performance.now(); this.drawInner(nowMs)
    this.drawAcc += performance.now() - t0; if (++this.drawN >= 30) { this.stats = { ...this.stats, drawMs: +(this.drawAcc / this.drawN).toFixed(1) }; this.drawAcc = 0; this.drawN = 0 }
  }
  private drawInner(nowMs: number) {
    const dt = this.lastNow ? Math.min(0.25, (nowMs - this.lastNow) / 1000) : 0; this.lastNow = nowMs
    const inp = this.input, rc = inp.race && this.raceObj ? raceClock(this.elapsed(), this.raceObj.end) : null
    const phase: RacePhase | 'select' = rc ? rc.phase : 'select'
    if (phase !== this.prevPhase) { this.prevPhase = phase; this.podiumPicked = false }
    this.ensure(phase, rc?.phaseT ?? 0)
    if (nowMs - this.pal.at > 1500) this.readPalette()
    // 24 Гц: проигрыватели экрана выбора
    this.acc += dt
    while (this.acc >= 1 / 24) { this.acc -= 1 / 24; this.tickSelection(phase); }
    const c = this.ctx; c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, L.width, L.height)
    if (phase === 'select') this.drawSelect(1, 0)
    else if (phase === 'transition') {
      const u = rc!.phaseT / T.transition, a = ease(u / 0.4)
      if (u < 0.4) this.drawSelect(1 - a, a * 500)
      else { if (!this.drawArena(0, ease((u - 0.4) / 0.35))) this.drawTrack(0, 'stand', (i) => ease((u - 0.55 - 0.07 * i) / 0.2)); this.text('К СТАРТОВОЙ ЛИНИИ', 960, 60, 30, this.rgba(this.pal.fg, ease((u - 0.4) / 0.2)), 'center', 'bold') }
    }
    else if (phase === 'countdown') { if (!this.drawArena(0)) this.drawTrack(0, 'stand'); this.text(rc!.countdown > 0 ? String(rc!.countdown) : 'СТАРТ!', 960, 560, 220, this.rgba(this.pal.fg, .85), 'center', 'bold') }
    else if (phase === 'race') { if (!this.drawArena(rc!.raceT)) this.drawTrack(rc!.raceT, 'race') }
    else if (phase === 'finish') { if (!this.drawArena(this.raceObj!.end)) this.drawTrack(this.raceObj!.end, 'race'); this.drawFinishOverlay() }
    else if (phase === 'podiumTransition') { if (!this.drawArena(this.raceObj!.end)) this.drawTrack(this.raceObj!.end, 'race'); this.drawFinishOverlay(); this.drawPodium(rc!, ease(rc!.phaseT / T.podiumTransition)) }
    else this.drawPodium(rc!, 1)
    if (this.stats.loading && (phase === 'select' || phase === 'transition' || phase === 'countdown')) this.text('Загрузка бульдогов…', 960, 1040, 26, this.rgba(this.pal.muted, .9), 'center')
  }
  /** Кадр зимней арены (если включена и готова) на основное полотно; false — рисуем прежнюю трассу. t — секунды гонки (0 — старт). */
  private drawArena(t: number, alpha = 1): boolean {
    const a = this.arena, race = this.input.race; if (!a || !this.raceObj || !race || !this.dogs.every(Boolean)) return false
    if (this.arenaKey !== this.raceKey) { a.setRace({ seed: race.seed, D: race.D }, 0, this.raceObj.end); this.arenaKey = this.raceKey }
    if (!a.ready) return false
    a.names = this.input.names; a.draw(t); const c = this.ctx; c.save(); c.globalAlpha = alpha; c.drawImage(this.arenaCv!, 0, 0); c.restore(); return true
  }
  private tickSelection(phase: RacePhase | 'select') {
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
      for (const dog of pl.slice(0, 3)) {
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
  private drawSelect(alpha: number, yOff: number) {
    const c = this.ctx, P = this.pal; c.save(); c.globalAlpha = alpha; c.translate(0, yOff)
    this.text('ВЫБЕРИТЕ СВОЕГО БУЛЬДОГА', 960, 78, 46, P.fg, 'center', 'bold')
    this.text(this.input.race ? 'Выбор закрыт' : 'Команды выбирают на телефонах — выбор можно менять до старта', 960, 118, 26, P.muted, 'center')
    const cw = 340, gap = 30, x0 = (L.width - (5 * cw + 4 * gap)) / 2, k = 1.4, pawY = 690 * (this.dogs[0]?.sel.scale ?? 0.4)
    const counts = this.input.counts
    DOG_IDS.forEach((id, i) => {
      const x = x0 + i * (cw + gap), y = 160, h = 780, sel = (counts[i] ?? 0) > 0, cell = this.dogs[i]?.sel.cell ?? [227, 283], dw = cell[0] * k
      c.fillStyle = this.rgba(P.panel, .88); this.rr(x, y, cw, h, 22); c.fill(); c.strokeStyle = sel ? P.accent : this.rgba(P.muted, .5); c.lineWidth = sel ? 6 : 2; c.stroke()
      c.fillStyle = P.accent; this.rr(x + 16, y + 16, 64, 64, 14); c.fill(); this.text(String(i + 1), x + 48, y + 64, 44, '#fff', 'center', 'bold')
      this.text(this.input.names[i] ?? id, x + 96, y + 62, 40, P.fg, 'left', 'bold')
      const paw = y + 575
      c.fillStyle = 'rgba(0,0,0,.28)'; c.beginPath(); c.ellipse(x + cw / 2, paw + 4, 120, 14, 0, 0, 7); c.fill()
      this.drawSel(i, this.frames[i], x + (cw - dw) / 2, paw - pawY * k, k)
      this.text('СТАВОК', x + cw / 2, y + h - 105, 22, P.muted, 'center'); this.text(String(counts[i] ?? 0), x + cw / 2, y + h - 40, 64, sel ? P.accent : this.rgba(P.muted, .8), 'center', 'bold')
      const fr = this.frames[i], p = this.players[i]
      if (p?.busy() && fr) this.text(fr.kind === 'sel' ? 'ВЫБРАН!' : fr.kind === 'ret' ? '' : '…', x + cw / 2, y + 120, 22, P.accent, 'center', 'bold')
    })
    c.restore()
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
  private drawFinishOverlay() {
    const c = this.ctx, P = this.pal, race = this.raceObj!; c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(0, 0, L.width, L.height)
    c.fillStyle = this.rgba(P.panel, .96); this.rr(600, 220, 720, 560, 24); c.fill(); c.strokeStyle = P.accent; c.lineWidth = 3; c.stroke()
    this.text('ФИНИШ — ИТОГОВЫЕ МЕСТА', 960, 290, 40, P.fg, 'center', 'bold')
    race.places.forEach((dog, pos) => { this.text(String(pos + 1), 680, 370 + pos * 70, 44, pos < 3 ? P.accent : P.muted, 'left', 'bold'); this.text(`№${dog + 1} ${this.input.names[dog] ?? ''}`, 760, 370 + pos * 70, 38, P.fg); this.text(`${race.dogs[dog].crossing.toFixed(2)} с`, 1260, 370 + pos * 70, 34, P.muted, 'right') })
  }
  private drawPodium(rc: ReturnType<typeof raceClock>, alpha: number) {
    const c = this.ctx, P = this.pal, race = this.raceObj!, pl = race.places; c.save(); c.globalAlpha = alpha
    c.fillStyle = this.rgba(P.panel, 1); c.fillRect(0, 0, L.width, L.height)
    this.text('ФИНИШ · ПЬЕДЕСТАЛ', 960, 76, 46, P.fg, 'center', 'bold')
    const steps = [{ place: 2, x: 560, h: 170, dog: pl[1] }, { place: 1, x: 960, h: 250, dog: pl[0] }, { place: 3, x: 1360, h: 110, dog: pl[2] }], base = 880, k = 1.5, bw = 330, TOP = 30
    const pawRow = PODIUM_PAW_ROW                                                                  // нижняя строка лап в ячейке IDLE (замер по листам 5 собак: 266–275, медиана 273)
    // тёплое пятно-«пол» под пьедесталом, чтобы блоки не висели на сплошной заливке
    { const g = c.createRadialGradient(960, base + 6, 20, 960, base + 6, 980); g.addColorStop(0, 'rgba(255,200,150,.10)'); g.addColorStop(1, 'rgba(255,200,150,0)'); c.save(); c.translate(960, base + 6); c.scale(1, 0.12); c.translate(-960, -(base + 6)); c.fillStyle = g; c.fillRect(0, base - 980, L.width, 1960); c.restore() }
    steps.forEach(s => {
      const shown = rc.podiumShown >= (s.place === 3 ? 1 : s.place === 2 ? 2 : 3), col = s.place === 1 ? [217, 180, 74] : s.place === 2 ? [191, 196, 201] : [192, 138, 90], top = base - s.h
      const fg = c.createLinearGradient(0, top, 0, base); fg.addColorStop(0, `rgb(${col.map(v => Math.round(v * .94)).join(',')})`); fg.addColorStop(1, `rgb(${col.map(v => Math.round(v * .72)).join(',')})`)
      c.fillStyle = fg; c.fillRect(s.x - bw / 2, top, bw, s.h)                                       // фасад
      c.fillStyle = `rgb(${col.map(v => Math.min(255, Math.round(v * 1.08))).join(',')})`; c.beginPath(); c.moveTo(s.x - bw / 2 + 14, top - TOP); c.lineTo(s.x + bw / 2 - 14, top - TOP); c.lineTo(s.x + bw / 2, top); c.lineTo(s.x - bw / 2, top); c.closePath(); c.fill()   // верхняя площадка (видна глубина — собака стоит НА ней)
      c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(s.x - bw / 2, top, bw, 3); c.fillStyle = 'rgba(0,0,0,.16)'; c.fillRect(s.x - bw / 2, base - 8, bw, 8)
      this.text(String(s.place), s.x, top + s.h / 2 + 34, 90, '#fff', 'center', 'bold')
      if (!shown) return
      const cell = this.dogs[s.dog]?.sel.cell ?? [227, 283], dw = cell[0] * k, pawY = top - TOP / 2 + 2                  // лапы — посередине площадки, чуть глубже её переднего края
      const sg = c.createRadialGradient(s.x + 8, pawY + 1, 0, s.x + 8, pawY + 1, 150); sg.addColorStop(0, 'rgba(30,20,60,.50)'); sg.addColorStop(0.55, 'rgba(30,20,60,.24)'); sg.addColorStop(1, 'rgba(30,20,60,0)')
      c.save(); c.translate(s.x + 8, pawY + 1); c.scale(1, 0.12); c.translate(-(s.x + 8), -(pawY + 1)); c.fillStyle = sg; c.beginPath(); c.arc(s.x + 8, pawY + 1, 150, 0, 7); c.fill(); c.restore()   // мягкая контактная тень на площадке
      this.drawSel(s.dog, this.podiumFrames[s.dog], s.x - dw / 2, pawY - pawRow * k, k)
      c.fillStyle = this.rgba(P.panel, .95); this.rr(s.x - 150, base + 14, 300, 76, 14); c.fill(); c.strokeStyle = P.accent; c.lineWidth = 2; c.stroke()
      this.text(`${s.place} место · №${s.dog + 1}`, s.x, base + 46, 28, P.fg, 'center', 'bold'); this.text(this.input.names[s.dog] ?? '', s.x, base + 78, 28, P.muted, 'center')
    })
    c.fillStyle = this.rgba(P.fg, .08); this.rr(60, 150, 380, 330, 16); c.fill(); this.text('4–5 МЕСТО', 80, 188, 26, P.fg, 'left', 'bold')
    pl.slice(3).forEach((dog, j) => this.text(`${j + 4}. №${dog + 1} ${this.input.names[dog] ?? ''} — ${race.dogs[dog].crossing.toFixed(1)} с`, 80, 238 + j * 46, 26, P.muted))
    c.fillStyle = this.rgba(P.fg, .08); this.rr(1480, 150, 400, 560, 16); c.fill(); this.text('ОЧКИ КОМАНД (5 − место)', 1500, 188, 24, P.fg, 'left', 'bold')
    this.input.scores.slice(0, 13).forEach((s, i) => { this.text(s.team.slice(0, 14), 1500, 232 + i * 34, 22, P.accent2, 'left', 'bold'); this.text(s.dog ? `№${s.dog} · ${s.place} м.` : 'без ставки', 1700, 232 + i * 34, 20, P.muted); this.text(`+${s.points}`, 1860, 232 + i * 34, 22, P.fg, 'right', 'bold') })
    if (this.input.scores.length > 13) this.text(`… и ещё ${this.input.scores.length - 13}`, 1500, 232 + 13 * 34, 20, P.muted)
    c.restore()
  }
}
