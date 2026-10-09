// ═══ Этап 3 · «Кроссворд» — ТЕСТОВЫЕ данные лаборатории (в игру не входят) ═══
// Сетка — CrosswordGrid из настоящего генератора (lib/crossword.ts) по словам вечера из labs/magic2; вопрос кроссворда в
// игре — одно слово: определение = текст вопроса, номер слова = номер вопроса; команды вписывают слово на телефоне;
// разбор (ShowAnswers в HostScreen) идёт слово за словом, вердикт ✓/✗ — isCrosswordWordCorrect (е=ё, регистр не важен,
// опечатки НЕ прощаются), балл — 1 за верное слово (scoreCrossword). Команда без ответа — «не ответили», вердикта нет.
// Рисунок сцены — CrosswordC.tsx (общий с игрой), модель сетки — cwModel.ts, лабораторная сцена — labs/forest/crosswordLab.tsx.
import { CW_GRID, TEAMS } from '../../labs/magic2/data'
import { isCrosswordWordCorrect } from '../../lib/answerCheck'
import { cwModel } from './cwModel'

export const CWM = cwModel(CW_GRID)
export const CW_TIMER = 45

/** шесть команд: имена настоящие по длине (самое длинное — 44 знака) */
export const CWT = TEAMS.slice(0, 6).map(t => ({ name: t.name, color: `hsl(${t.hue} 52% 66%)` }))
/** ответы команд по номеру слова; null — запись без текста (команда не успела) */
export const CW_ANS: Record<number, (string | null)[]> = {
  1: ['Онегин', 'Онегин', 'Ленский', 'Онегин', 'Онегин', 'Онегин'],
  2: ['Воланд', 'Мефистофель', 'Воланд', 'Воланд', 'Воланд', null],
  3: ['Маргарита', 'Маргарита', 'Маргаритта', 'Гелла', 'Маргарита', null],
  4: ['Печорин', 'Онегин', 'Печорин', 'Базаров', 'Грушницкий — друг Печорина', 'Печорин'],
  5: ['Гоголь', 'Гоголь', 'Гоголь', 'Гогаль', 'Николай Васильевич Гоголь', 'Гоголь'],
  6: ['Нос', 'Нос', 'Нос', 'Глаз', 'Нос', 'Нос'],
  7: ['Чичиков', 'Манилов', 'Чичиков', 'Чичиков', 'Чичиков', null],
  8: ['Азазелло', 'Бегемот', 'Азазело', 'Коровьев', 'Азазелло — демон-убийца из свиты Воланда', 'Азазелло'],
}
export const verdict = (num: number, ti: number): boolean | null => { const a = CW_ANS[num][ti]; return a ? isCrosswordWordCorrect(a, CWM.W(num).word) : null }
export const total = (ti: number) => CWM.nums.filter(n => verdict(n, ti) === true).length

/** что за состояние: какое слово разбирается, показан ли разбор */
export type Scene = { cur: number; rev: boolean; complete: boolean; next: number | null }
export function sceneOf(state: string): Scene {
  if (state === 'review') return { cur: 3, rev: true, complete: false, next: 4 }
  if (state === 'dense') return { cur: 8, rev: true, complete: false, next: null }
  if (state === 'complete') return { cur: 9, rev: true, complete: true, next: null }
  return { cur: 3, rev: false, complete: false, next: null }
}
/** буквы слова видны: разобранные раньше (и все — в итоге); текущее слово открывает таймлайн разбора */
export const shown = (num: number, sc: Scene) => sc.complete || num < sc.cur

export const CW_STATES = [
  { id: 'question', name: 'Сцена A: идёт слово 3 — активный кроссворд' },
  { id: 'review', name: 'Сцена B: разбор слова 3 → переход к слову 4' },
  { id: 'dense', name: 'Сцена B: плотный разбор слова 8 (длинные ответы)' },
  { id: 'complete', name: 'Итог: кроссворд разгадан, слов у команд' },
]
/** сводка итога: команды по числу угаданных слов */
export const RANKED = CWT.map((t, i) => ({ ...t, i, n: total(i) })).sort((a, b) => b.n - a.n || a.i - b.i)
