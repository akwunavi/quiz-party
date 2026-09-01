// ═══ Где в игре появляется слайд-брифинг ═══
//
// Чистая логика, БЕЗ клиента базы: иначе её нельзя покрыть тестами —
// импорт gameActions поднимает supabase, а ему нужны ключи (то же правило,
// что у flow.ts с маршрутом после раунда).
//
// Правило размещения одно: **«после раунда N» — это то же место, что
// «перед раундом N+1»**, отдельного значения ему не нужно. Дырка была одна:
// после ПОСЛЕДНЕГО раунда следующего не существует, для неё есть 'finale'.
//
//   'manual'   — не выходит сам, только кнопкой из админки;
//   'lobby'    — перед первым раундом;
//   'round:N'  — на входе в раунд N (нумерация с единицы, как в редакторе);
//   'finale'   — после последнего раунда, перед итогами.

export interface SlidePlacement { show_at?: string }

/** Индекс слайда, назначенного на вход в раунд, или null.
 *  roundNumber — индекс раунда с НУЛЯ (как в игре). */
export function slideForRound(
  slides: SlidePlacement[] | undefined, roundNumber: number,
): number | null {
  if (!slides?.length) return null
  const want = roundNumber === 0 ? ['lobby', 'round:1'] : [`round:${roundNumber + 1}`]
  const i = slides.findIndex(s => s.show_at && want.includes(s.show_at))
  return i >= 0 ? i : null
}

/** Индекс слайда, назначенного на конец игры (перед итогами), или null. */
export function slideBeforeFinale(slides: SlidePlacement[] | undefined): number | null {
  if (!slides?.length) return null
  const i = slides.findIndex(s => s.show_at === 'finale')
  return i >= 0 ? i : null
}
