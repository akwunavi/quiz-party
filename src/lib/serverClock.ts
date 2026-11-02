// ═══ Серверные часы: общее «сейчас» для проектора, пульта и телефонов ═══
// Часы устройств расходятся на секунды и минуты, а таймеры, дедлайны и защиты
// сравнивают время, записанное ОДНИМ устройством, с часами ДРУГОГО. Здесь
// держится поправка «время базы − время этого устройства»; `serverNow()` — вместо
// `Date.now()` везде, где сравниваются разные устройства. Источник — функция
// `server_now()` (миграция 0016) или `/api/server-now` локального сервера бара.
// Не получилось (миграция не прогнана, офлайн) — поправка 0, всё как раньше.
let offsetMs = 0
let synced = false
let bestRtt = Infinity     // задержка лучшего замера — одиночный плохой замер при возврате вкладки его не затирает
let started = false

/** «Сейчас» по часам базы (или по своим, пока синхронизации не было). */
export const serverNow = (): number => Date.now() + offsetMs
export const serverIso = (): string => new Date(serverNow()).toISOString()
export const clockOffsetMs = (): number => offsetMs
export const clockSynced = (): boolean => synced

/** Чистая оценка поправки по замеру: серверное время относим к середине запроса.
 *  Из нескольких замеров берётся тот, у кого задержка (rtt) меньше. */
export function estimateOffset(samples: { t0: number; t1: number; server: number }[]): number | null {
  let best: { rtt: number; off: number } | null = null
  for (const s of samples) {
    const rtt = s.t1 - s.t0
    if (!(rtt >= 0) || !Number.isFinite(s.server)) continue
    const off = s.server - (s.t0 + s.t1) / 2
    if (!best || rtt < best.rtt) best = { rtt, off }
  }
  return best ? Math.round(best.off) : null
}

export async function syncServerClock(attempts = 3): Promise<boolean> {
  const samples: { t0: number; t1: number; server: number }[] = []
  for (let i = 0; i < attempts; i++) {
    const t0 = Date.now()
    try {
      const { room } = await import('./transport')   // лениво: сам модуль чистый, без сети при импорте
      const server = await room.serverNow()
      samples.push({ t0, t1: Date.now(), server })
    } catch { break }
  }
  const off = estimateOffset(samples)
  if (off == null) return false
  const rtt = Math.min(...samples.filter(s => s.t1 >= s.t0).map(s => s.t1 - s.t0))
  // принимаем, если замер не заметно хуже прежнего лучшего (запас 300 мс); иначе оставляем прежнюю поправку
  if (synced && rtt > bestRtt * 2 + 300) return false
  offsetMs = off
  bestRtt = Math.min(bestRtt * 1.5 + 50, rtt)   // лучший замер «устаревает» плавно, чтобы поправка могла обновляться
  synced = true
  return true
}

/** Запустить один раз при старте приложения: замер сейчас, потом раз в 5 минут и при возврате вкладки. */
export function startServerClock(): void {
  if (started || typeof window === 'undefined') return
  started = true
  void syncServerClock()
  window.setInterval(() => { void syncServerClock() }, 5 * 60_000)
  document.addEventListener('visibilitychange', () => { if (!document.hidden) void syncServerClock(1) })
}
