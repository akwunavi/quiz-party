// ═══ «Книга»: плашка «ПРАВИЛЬНЫЙ ОТВЕТ» — горизонтальный свиток с бантом (hscroll-bow.webp) ═══
// Рулоны фиксированных пропорций (border-image, 9-slice), поэтому высота свитка ступенчатая: ОДНА из четырёх ступеней по длине ответа,
// а кегль внутри подгоняет useFitText по реальной вёрстке. Ширина = колонка страницы; ширина текста = колонка − два рулона (≈ 1,0·высоты с каждой стороны).
// Чистые функции без DOM — чтобы ступени проверялись тестом, а не глазами.

/** высота ТЕЛА свитка в «пикселях мокапа» (--u) по числу знаков ответа */
export function answerPlateSize(len: number): number {
  const n = Math.max(0, len)
  return n <= 16 ? 150 : n <= 40 ? 178 : n <= 80 ? 192 : 204
}

/** ширина колонки левой страницы (--u), на ней сидит свиток */
export const ANSWER_COLUMN_U = 690

/** ширина, оставшаяся тексту ответа (--u): колонка минус два рулона */
export function answerPlateTextWidth(sh: number, column = ANSWER_COLUMN_U): number {
  return column - 2 * sh
}

/** границы кегля (px) для подбора: потолок от высоты ячейки текста (одна строка ≈ 62 %), пол — предел читаемости; capU — потолок в мокапе (нет — только от ячейки) */
export function answerFitRange(boxH: number, u: number, capU: number | null): { min: number; max: number } {
  const min = Math.max(11, 12 * u)
  const byBox = boxH > 0 ? boxH * 0.62 : 60 * u
  const max = Math.max(min, capU == null ? byBox : Math.min(byBox, capU * u))
  return { min: Math.min(min, max), max }
}
