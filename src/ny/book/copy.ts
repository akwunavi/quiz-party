// ═══ «Книга» (ny_book): тексты темы (прототип этапа 2) ═══

/** Заголовок итогового табло — основной вариант ведущего (PLAN §8 В1). */
export const BOOK_FINALE_TITLE: readonly string[] = ['Глава последняя.', 'Наши победители']

export type BookFinaleVariant = 1 | 2 | 3

/** ПРОТОТИП (только для согласования, этап 2): вариант оформления финала из адреса проектора `?bkfin=2|3`. По умолчанию — 1.
 *  После выбора ведущим флаг убирается, остаётся один вариант (этап 4, Б6). */
export function bookFinaleVariant(): BookFinaleVariant {
  try {
    const m = typeof location !== 'undefined' ? /[?&]bkfin=([123])/.exec(location.href) : null
    return m ? (Number(m[1]) as BookFinaleVariant) : 1
  } catch { return 1 }
}
