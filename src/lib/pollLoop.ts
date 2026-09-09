// ═══ Общий цикл поллинга с защитой от наложения ═══
//
// Шаг 4 плана офлайн-устойчивости: раньше четыре хука (useGameState,
// useTeams, useAnswers, useBlitz) держали свой setInterval, который не
// знал, вернулся ли предыдущий запрос. На офлайн-вкладке (или просто
// медленной сети) это копило десятки висящих запросов в минуту — каждый
// тик стартовал новый поверх ещё не завершённого предыдущего.
//
// Правило: если предыдущий тик ещё не вернулся — следующий пропускается
// (не запускает второй параллельный запрос). После нескольких подряд
// неудач интервал растёт (см. BACKOFF ниже), на первом успехе — падает
// обратно к норме.
export interface PollLoopOptions {
  /** Обычный интервал между тиками, мс. */
  intervalMs: number
  /** Интервалы бэкоффа после `failsBeforeBackoff` неудач подряд —
   *  используется по кругу/по нарастающей до конца списка. */
  backoffStepsMs?: number[]
  /** Сколько неудач подряд терпим на обычном интервале, прежде чем
   *  включить бэкофф. По умолчанию 3 (см. CLAUDE.md/план шага 4). */
  failsBeforeBackoff?: number
}

export interface PollLoop {
  /** Один тик вручную — им же пользуется внутренний таймер. Не запускает
   *  второй параллельный `fetcher()`, если предыдущий вызов ещё не
   *  вернулся: наложившийся вызов просто перепланирует следующий тик и
   *  выходит. Полезно и в тестах — можно вызвать дважды подряд без ожидания
   *  и проверить, что `fetcher` дёрнулся один раз. */
  poll(): Promise<void>
  /** Останавливает цикл: ни текущий таймер, ни уже летящий `fetcher()`
   *  больше не тронут `onResult`. */
  stop(): void
}

export function createPollLoop<T>(
  fetcher: () => Promise<T>,
  onResult: (data: T) => void,
  opts: PollLoopOptions,
): PollLoop {
  const { intervalMs, backoffStepsMs = [], failsBeforeBackoff = 3 } = opts
  let stopped = false
  let inFlight = false
  let fails = 0
  let timer: ReturnType<typeof setTimeout> | undefined

  function schedule() {
    if (stopped) return
    const useBackoff = fails >= failsBeforeBackoff && backoffStepsMs.length > 0
    const delay = useBackoff
      ? backoffStepsMs[Math.min(fails - failsBeforeBackoff, backoffStepsMs.length - 1)]
      : intervalMs
    timer = setTimeout(() => { void poll() }, delay)
  }

  async function poll(): Promise<void> {
    if (stopped) return
    if (inFlight) { schedule(); return }
    inFlight = true
    try {
      const data = await fetcher()
      if (!stopped) { onResult(data); fails = 0 }
    } catch {
      fails++
    } finally {
      inFlight = false
      schedule()
    }
  }

  function stop() {
    stopped = true
    if (timer) clearTimeout(timer)
  }

  return { poll, stop }
}
