// ═══ Шина статуса действий ведущего ═══
//
// Зачем: `onClick={() => void gotoRound(...)}` не ловит ошибку — если
// сети нет или база недоступна, промис падает молча, кнопка «Дальше» не
// делает ничего, а ведущий стоит с микрофоном и не понимает, баг это или
// просто нет связи. `runAction` оборачивает такой вызов: помечает «идёт
// запрос», при провале запоминает человекочитаемую причину, а
// `subscribeStatus` даёт любому компоненту (или в будущем — транспортному
// слою, не обязательно React) подписаться на эти изменения.
//
// Без React специально: шину дёргают не только кнопки в AdminPage.tsx —
// такой же вызов может понадобиться вне компонента (следующие шаги плана
// офлайн-устойчивости).

export interface ActionStatus {
  /** идёт хотя бы один вызов runAction прямо сейчас */
  busy: boolean
  /** человекочитаемая причина последней ошибки, null — если её нет */
  lastError: string | null
  /** когда последний раз что-то прошло успешно (Date.now()), null — ни разу */
  lastOkAt: number | null
}

let state: ActionStatus = { busy: false, lastError: null, lastOkAt: null }
const subscribers = new Set<(s: ActionStatus) => void>()

function setState(patch: Partial<ActionStatus>) {
  state = { ...state, ...patch }
  for (const cb of subscribers) cb(state)
}

/** Текущий снимок статуса — на случай, если нужен разово, без подписки. */
export function getStatus(): ActionStatus {
  return state
}

/** Подписка на изменения статуса. Возвращает функцию отписки. */
export function subscribeStatus(cb: (s: ActionStatus) => void): () => void {
  subscribers.add(cb)
  return () => { subscribers.delete(cb) }
}

/** Сколько одновременных runAction сейчас в полёте — busy гаснет, только
 *  когда их не осталось ни одного (иначе один быстрый успешный вызов
 *  погасил бы индикатор, пока рядом ещё висит другой). */
let inFlight = 0

/** Текст для ведущего, а не сырой stack. Сетевые ошибки — самые частые
 *  на живой игре (мобильный оператор, слабый wi-fi бара), поэтому у них
 *  отдельная явная формулировка. */
function humanMessage(label: string, err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err)
  const isNetwork = err instanceof TypeError
    || /network|fetch|failed to fetch|offline/i.test(raw)
  const reason = isNetwork ? 'нет связи' : raw || 'неизвестная ошибка'
  return `«${label}» не выполнился: ${reason}`
}

/**
 * Оборачивает асинхронное действие ведущего: выставляет `busy`, при
 * успехе обновляет `lastOkAt`, при ошибке — `lastError` (текст под
 * человека, не stack). Состояние обновляется в любом случае (`finally`),
 * ошибка при этом прокидывается дальше — вызывающий код может сам решить,
 * что с ней делать (например, показать локальную подсказку рядом с
 * полем), шина ему не мешает.
 */
export async function runAction<T>(label: string, fn: () => Promise<T>): Promise<T | undefined> {
  inFlight++
  setState({ busy: true })
  try {
    const result = await fn()
    setState({ lastError: null, lastOkAt: Date.now() })
    return result
  } catch (err) {
    setState({ lastError: humanMessage(label, err) })
    throw err
  } finally {
    inFlight--
    if (inFlight <= 0) { inFlight = 0; setState({ busy: false }) }
  }
}
