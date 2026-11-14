// ═══ «Книга» (ny_book): события анимаций — ЧИСТЫЕ функции (прототип этапа 2, PLAN §3) ═══
// Анимации зависят только от СМЕНЫ состояния игры, а не от рендера: опрос каждые 2 с даёт новый объект gameState,
// но не новое событие. Первый снимок (загрузка, перезагрузка проектора) — без анимации: конечный кадр.

/** Раскрытие ответа «живое» — только если ЭТОТ экран видел тот же вопрос нераскрытым, а потом раскрытым. */
export interface RevealLive { key: string; sawHidden: boolean; live: boolean }
export const REVEAL_LIVE_INIT: RevealLive = { key: '', sawHidden: false, live: false }

export function revealLiveStep(prev: RevealLive, key: string, revealed: boolean): RevealLive {
  if (prev.key !== key) return { key, sawHidden: !revealed, live: false }
  if (!revealed) return prev.sawHidden && !prev.live ? prev : { key, sawHidden: true, live: false }
  if (prev.live || !prev.sawHidden) return prev
  return { key, sawHidden: true, live: true }
}

/** Перелистывание: смена вопроса внутри раунда (вопрос → вопрос, разбор → разбор) или вход в 1-й вопрос из заставки.
 *  null — листать нечего (первый снимок, та же страница, другие фазы). */
export interface TurnSnap { game_id: string; phase: string; round_number: number; question_index: number }
export function pageTurnKey(prev: TurnSnap | null, next: TurnSnap): string | null {
  if (!prev || prev.game_id !== next.game_id) return null
  const sameRound = prev.round_number === next.round_number
  if (next.phase === 'question' && sameRound
    && ((prev.phase === 'question' && prev.question_index !== next.question_index) || prev.phase === 'round_intro'))
    return `turn:${next.round_number}:${next.question_index}`
  if (next.phase === 'show_answers' && prev.phase === 'show_answers' && sameRound && prev.question_index !== next.question_index)
    return `turn:a:${next.round_number}:${next.question_index}`
  return null
}
