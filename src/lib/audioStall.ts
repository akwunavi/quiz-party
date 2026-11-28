// ═══ ДИАГНОСТИКА ОСТАНОВОК ЗВУКА (10.75) ═══
// Озвучка один раз «заглохла на ~15 с и продолжила с того же места» — это
// остановка по буферу. Чтобы в следующий раз было видно, было ли такое и
// насколько долго, считаем события `waiting`/`stalled` у проигрываемой
// озвучки. Считается ЭПИЗОД остановки: от первого `waiting`/`stalled` до
// возобновления (`playing`), конца или паузы. Короче `MIN_STALL_MS` —
// мелкое подвисание на старте/перемотке, не считаем.
//
// `StallTracker` чистый (время приходит аргументом). `watchStalls` вешает
// его на живой <audio>; общий счёт — `stallStats` (его читает проектор и
// пишет в общее состояние, админка показывает «остановки: N (макс. X с)»).

export const MIN_STALL_MS = 700

export type StallEvent = 'playing' | 'waiting' | 'stalled' | 'ended' | 'pause'

export interface StallSink {
  /** эпизод достиг порога — считать его (один раз на эпизод) */
  confirm(): void
  /** текущая/итоговая длительность эпизода (для максимума) */
  grow(ms: number): void
}

export class StallTracker {
  private started = false
  private since: number | null = null
  private confirmed = false
  constructor(private sink: StallSink) {}

  get open() { return this.since !== null }

  event(type: StallEvent, now: number) {
    if (type === 'playing') {
      this.started = true
      this.close(now)
    } else if (type === 'waiting' || type === 'stalled') {
      // до первого `playing` «ждёт» — это обычная загрузка старта, не остановка
      if (!this.started || this.since !== null) return
      this.since = now
      this.confirmed = false
    } else {
      this.close(now)
    }
  }

  /** Периодически, пока эпизод открыт: подтверждает долгий и растит максимум. */
  tick(now: number) {
    if (this.since === null) return
    const ms = now - this.since
    if (!this.confirmed && ms >= MIN_STALL_MS) { this.confirmed = true; this.sink.confirm() }
    if (this.confirmed) this.sink.grow(ms)
  }

  private close(now: number) {
    if (this.since === null) return
    this.tick(now)
    this.since = null
    this.confirmed = false
  }

  dispose(now: number) { this.close(now) }
}

// ─── общий счёт по всем элементам ───
export interface StallTotals { count: number; maxMs: number }
const totals: StallTotals = { count: 0, maxMs: 0 }
const subs = new Set<() => void>()
const emit = () => subs.forEach(fn => { try { fn() } catch { /* подписчик не роняет звук */ } })

export const stallStats = {
  get(): StallTotals { return { ...totals } },
  subscribe(fn: () => void): () => void { subs.add(fn); return () => { subs.delete(fn) } },
  /** только для тестов и смены игры */
  reset() { totals.count = 0; totals.maxMs = 0; emit() },
}

/** Следить за остановками одного элемента. Возвращает отписку (вызывать в
 *  cleanup ТОГО ЖЕ эффекта, что создал элемент). */
export function watchStalls(el: HTMLMediaElement, label = 'озвучка'): () => void {
  const tracker = new StallTracker({
    confirm() {
      totals.count++
      console.warn(`[звук] остановка: ${label} ждёт данные`)
      emit()
    },
    grow(ms) {
      if (ms > totals.maxMs) { totals.maxMs = ms; emit() }
    },
  })
  const now = () => Date.now()
  const on = (t: StallEvent) => () => tracker.event(t, now())
  const handlers: [StallEvent, () => void][] =
    (['playing', 'waiting', 'stalled', 'ended', 'pause'] as StallEvent[]).map(t => [t, on(t)])
  handlers.forEach(([t, h]) => el.addEventListener(t, h))
  const timer = setInterval(() => tracker.tick(now()), 500)
  return () => {
    clearInterval(timer)
    handlers.forEach(([t, h]) => el.removeEventListener(t, h))
    tracker.dispose(now())
  }
}
