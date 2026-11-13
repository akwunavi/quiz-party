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

export type BookTeamVariant = 1 | 2 | 3

/** ПРОТОТИП (только для согласования): вариант плитки команды в лобби из адреса проектора `?bkteam=1|2|3`
 *  (1 — лента-закладка, 2 — карточка с бумажным язычком, 3 — подарочная бирка). После выбора флаг убирается. */
export function bookTeamVariant(): BookTeamVariant {
  try {
    const m = typeof location !== 'undefined' ? /[?&]bkteam=([123])/.exec(location.href) : null
    return m ? (Number(m[1]) as BookTeamVariant) : 1
  } catch { return 1 }
}

/** ПРОТОТИП (только для согласования): переключатели редизайна из адреса проектора — `?bkfont=A|B` (типографика), `?bkqn=A|B` (плашка номера вопроса),
 *  `?bkrules=1|2` (экран правил). По умолчанию A / A / 1. Применяются атрибутами `data-bk-*` на <html> (CSS: `:root[data-bk-font="B"] …`). После выбора — убрать. */
export function bookFlags(): { font: 'A' | 'B'; qn: 'A' | 'B'; rules: '1' | '2' } {
  try {
    const h = typeof location !== 'undefined' ? location.href : ''
    return { font: /[?&]bkfont=B/i.test(h) ? 'B' : 'A', qn: /[?&]bkqn=B/i.test(h) ? 'B' : 'A', rules: /[?&]bkrules=2/.test(h) ? '2' : '1' }
  } catch { return { font: 'A', qn: 'A', rules: '1' } }
}
