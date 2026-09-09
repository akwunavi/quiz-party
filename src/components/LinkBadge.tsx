// ═══ Индикатор связи для действий ведущего (не путать с ConnectionDot —
// та точка про очередь ОТВЕТОВ игрока на телефоне, эта — про действия
// самого ведущего: переходы фаз, оценка ответов, запись баллов) ═══
//
// Тихий текст в обычном состоянии, лёгкое затемнение на busy (без
// keyframes — see ниже, почему), заметный красный при ошибке с понятной
// фразой, а не техническим текстом.
import { useEffect, useState } from 'react'
import { subscribeStatus, type ActionStatus } from '../lib/actionStatus'

/** Сколько ошибка ещё видна текстом, дальше остаётся только точка —
 *  не пугать старой ошибкой всю игру, если следующее действие прошло. */
const ERROR_VISIBLE_MS = 8000

/**
 * `corner` — жёсткое позиционирование в углу экрана (проектор, поверх
 * всего): используется на HostScreen.tsx. Без него бейдж — обычный
 * инлайновый элемент в потоке страницы (AdminPage.tsx ставит его прямо в
 * шапку, рядом с номером версии — там и так узкий мобильный экран, ещё
 * один fixed-элемент в углу скорее наложился бы на кнопки шапки, чем
 * помог).
 */
export function LinkBadge({ corner }: { corner?: boolean } = {}) {
  const [status, setStatus] = useState<ActionStatus>({ busy: false, lastError: null, lastOkAt: null })
  const [errorShownAt, setErrorShownAt] = useState<number | null>(null)
  const [, forceTick] = useState(0)

  useEffect(() => subscribeStatus(setStatus), [])

  // Новая ошибка запоминает момент показа — от него отсчитываем, когда
  // погасить текст, чтобы старая ошибка не пугала весь вечер, если
  // следующее действие уже прошло успешно.
  useEffect(() => {
    if (status.lastError) setErrorShownAt(Date.now())
    else setErrorShownAt(null)
  }, [status.lastError])

  // Перерисовываем компонент, когда истекает ERROR_VISIBLE_MS — без этого
  // текст ошибки висел бы до следующего runAction, а не гас сам.
  useEffect(() => {
    if (errorShownAt == null) return
    const t = setTimeout(() => forceTick(n => n + 1), ERROR_VISIBLE_MS)
    return () => clearTimeout(t)
  }, [errorShownAt])

  const errorFresh = errorShownAt != null && Date.now() - errorShownAt < ERROR_VISIBLE_MS

  return (
    <div className={`link-badge${corner ? ' link-badge-corner' : ''}${status.busy ? ' is-busy' : ''}${errorFresh ? ' is-error' : ''}`}
      role="status" title={errorFresh ? status.lastError ?? undefined : 'связь с базой'}>
      {errorFresh ? 'НЕТ СВЯЗИ — действие не применилось' : status.busy ? 'ОБЛАКО…' : 'ОБЛАКО'}
    </div>
  )
}
