// ═══ Подсчёт баллов: чистые функции, покрыты тестами ═══
// Принцип: автопроверка = черновик оценки, финальное слово админа —
// поле is_correct в answers (true/false), эти функции считают ИТОГ по is_correct.

export interface ScoredAnswer {
  questionIndex: number
  isCorrect: boolean | null     // null = не проверен/пусто
  stake?: number | null
}

/** standard: 1 балл (или pointsPerQuestion) за верный */
export function scoreStandard(answers: ScoredAnswer[], pointsPerQuestion = 1): number {
  return answers.reduce((s, a) => s + (a.isCorrect ? pointsPerQuestion : 0), 0)
}

/** test_stop (Р3): идём по порядку; верный +1; ПУСТОЙ (null) = пропуск;
 *  первый НЕВЕРНЫЙ = стоп, дальше не считаем. */
export function scoreTestStop(answers: ScoredAnswer[]): number {
  const sorted = [...answers].sort((a, b) => a.questionIndex - b.questionIndex)
  let total = 0
  for (const a of sorted) {
    if (a.isCorrect === null) continue        // пропуск — не ошибка
    if (a.isCorrect) total += 1
    else break                                // стоп после первой ошибки
  }
  return total
}

/** stakes_unique (Р5): верно = ставка + 1, неверно = −ставка.
 *  Уникальность ставок валидируется на вводе (телефон), тут просто считаем. */
export function scoreStakesUnique(answers: ScoredAnswer[]): number {
  return answers.reduce((s, a) => {
    if (a.isCorrect === null) return s
    const stake = a.stake ?? 0
    return s + (a.isCorrect ? stake + 1 : -stake)
  }, 0)
}

/** stakes_free (Р7, ставка бинарная 0|2):
 *  со ставкой: верно +3 (2+1), неверно −2; без ставки: 1/0. */
export function scoreStakesFree(answers: ScoredAnswer[]): number {
  return answers.reduce((s, a) => {
    if (a.isCorrect === null) return s
    const stake = a.stake ?? 0
    if (stake > 0) return s + (a.isCorrect ? stake + 1 : -stake)
    return s + (a.isCorrect ? 1 : 0)
  }, 0)
}

/** thematic_x2 (Р6): база — standard; удвоение отдельной ручной кнопкой админа. */
export function scoreThematic(answers: ScoredAnswer[], doubled: boolean): number {
  const base = scoreStandard(answers)
  return doubled ? base * 2 : base
}

/** jeopardy (Р4): сумма value верных плиток. */
export function scoreJeopardy(tiles: { value: number; isCorrect: boolean | null }[]): number {
  return tiles.reduce((s, t) => s + (t.isCorrect ? t.value : 0), 0)
}

/** crossword: 1 балл за каждое верное слово. */
export function scoreCrossword(answers: ScoredAnswer[]): number {
  return scoreStandard(answers, 1)
}
