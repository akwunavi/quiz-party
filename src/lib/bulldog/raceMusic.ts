// Музыка гонки: заранее скачивается и декодируется в `AudioBuffer`, запускается СТРОГО в расчётный момент старта гонки (raceT=0 = startedAt + переход + отсчёт).
// Решения по музыке не принимаются молча: нет разрешения браузера на звук — статус `blocked` (проектор/пульт показывают кнопку и понятный текст); не успела загрузиться — музыка в этой гонке НЕ запускается
// (никогда не стартует посреди гонки после поздней загрузки, допуск опоздания — LATE_TOLERANCE_MS).
export const LATE_TOLERANCE_MS = 300
export type MusicStatus = 'none' | 'loading' | 'ready' | 'blocked' | 'error'
/** Чистое решение «когда и с какого места играть»: delaySec — через сколько секунд по часам аудио, offsetSec — смещение внутрь трека. */
export function musicStartPlan(targetMs: number, nowMs: number, tolerance = LATE_TOLERANCE_MS): { mode: 'start'; delaySec: number; offsetSec: number } | { mode: 'skip' } {
  const delay = targetMs - nowMs
  if (delay >= 0) return { mode: 'start', delaySec: delay / 1000, offsetSec: 0 }
  if (-delay <= tolerance) return { mode: 'start', delaySec: 0, offsetSec: -delay / 1000 }
  return { mode: 'skip' }
}
export interface MusicDeps { AudioContext?: new () => AudioContext; fetchBuffer: () => Promise<ArrayBuffer>; now: () => number }
export interface RaceMusic {
  status(): MusicStatus; reason(): string
  /** Жест пользователя / повторная попытка: разрешить звук. */
  resume(): Promise<void>
  /** Подписка на смену статуса. */
  onChange(cb: () => void): () => void
  /** Запланировать старт на серверный момент targetMs; true — запущено/запланировано, false — пропущено (опоздали) или музыка не готова. */
  playAt(targetMs: number): boolean
  stop(): void; destroy(): void
}
export function createRaceMusic(hasTrack: boolean, deps: MusicDeps): RaceMusic {
  let status: MusicStatus = hasTrack ? 'loading' : 'none', why = '', ctx: AudioContext | null = null, buf: AudioBuffer | null = null, src: AudioBufferSourceNode | null = null, dead = false
  const subs = new Set<() => void>(); const set = (s: MusicStatus, r = '') => { if (s === status && r === why) return; status = s; why = r; subs.forEach(f => f()) }
  const refresh = () => { if (dead || !buf || !ctx) return; set(ctx.state === 'running' ? 'ready' : 'blocked', ctx.state === 'running' ? '' : 'браузер не разрешил воспроизведение звука — нажмите «Включить звук»') }
  if (hasTrack) {
    const Ctor = deps.AudioContext ?? (typeof AudioContext !== 'undefined' ? AudioContext : undefined)
    if (!Ctor) set('error', 'в этом браузере нет Web Audio')
    else {
      ctx = new Ctor(); ctx.onstatechange = () => refresh()
      void (async () => {
        try { const raw = await deps.fetchBuffer(); if (dead) return; buf = await ctx!.decodeAudioData(raw.slice(0)); if (dead) return
          if (ctx!.state !== 'running') { try { await ctx!.resume() } catch { /* нужен жест */ } } refresh()
        } catch (e) { if (!dead) set('error', 'не удалось загрузить музыку: ' + (e instanceof Error ? e.message : String(e))) }
      })()
    }
  }
  return {
    status: () => status, reason: () => why,
    async resume() { if (!ctx) return; try { await ctx.resume() } catch { /* остаётся blocked */ } refresh() },
    onChange(cb) { subs.add(cb); return () => { subs.delete(cb) } },
    playAt(targetMs) {
      if (dead || status !== 'ready' || !ctx || !buf) return false
      const plan = musicStartPlan(targetMs, deps.now()); if (plan.mode === 'skip') return false
      this.stop(); const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; const g = ctx.createGain(); g.gain.value = 0.55; s.connect(g); g.connect(ctx.destination)
      s.start(ctx.currentTime + plan.delaySec, plan.offsetSec % buf.duration); src = s; return true
    },
    stop() { try { src?.stop() } catch { /* уже остановлена */ } src = null },
    destroy() { dead = true; this.stop(); subs.clear(); try { void ctx?.close() } catch { /* уже закрыт */ } },
  }
}
