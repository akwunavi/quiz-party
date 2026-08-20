// ═══ ОЦЕНКА ДЛИТЕЛЬНОСТИ РАУНДА ═══
// Отдельный модуль без зависимостей: его можно тестировать, не поднимая
// клиент Supabase.
/** Оценка длительности раунда в минутах: таймер + разбор + вступление. */
export function estimateRoundMinutes(round: {
  questions: { hidden?: boolean }[]; timer_seconds: number
  answers_reveal?: string
}): number {
  const n = round.questions.filter(q => !q.hidden).length
  if (n === 0) return 0
  const timer = round.timer_seconds || 45
  const reveal = round.answers_reveal === 'never' ? 0
    : round.answers_reveal === 'after_round' ? 12 : 10   // сек на разбор одного
  const answerTime = round.answers_reveal === 'after_round' ? 60 : 0  // «время ответов»
  const intro = 40                                       // заставка и правила
  const seconds = intro + answerTime + n * (timer + 8 + reveal)  // +8 — переход/чтение
  return Math.max(1, Math.round(seconds / 60))
}
