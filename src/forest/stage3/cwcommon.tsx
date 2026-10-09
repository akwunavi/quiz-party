// ═══ Этап 3 · «Кроссворд» — общее для трёх концептов: сетка, ответы команд, сверка букв ═══
// Данные настоящие: сетка — CrosswordGrid из генератора редактора (lib/crossword.ts), вопрос кроссворда в игре —
// одно слово: определение = текст вопроса, номер слова = номер вопроса; команды вписывают слово на телефоне;
// разбор (ShowAnswers в HostScreen) идёт слово за словом: определение, «ПРАВИЛЬНЫЙ ОТВЕТ», колонка «ответы команд»
// с вердиктом ✓/✗ (isCrosswordWordCorrect: е=ё, регистр не важен, опечатки НЕ прощаются), балл — 1 за верное слово
// (scoreCrossword). Команда без ответа — запись с пустым текстом («—»), вердикта нет.
// Здесь добавлено только отображение: ответ команды выложен по буквам под буквами правильного слова — видно, где он
// разошёлся. Баллы и проверка — настоящие функции, ничего не придумано.
import { CW_GRID, TEAMS } from '../../labs/magic2/data'
import { isCrosswordWordCorrect, normalize } from '../../lib/answerCheck'
import type { CrosswordWordPlacement } from '../../types/quiz'

export const G = CW_GRID
export const CW_TIMER = 45
export type Cell = { r: number; c: number; num?: number; words: number[]; ch: string }
export const CELLS: Cell[] = (() => {
  const m = new Map<string, Cell>()
  G.words.forEach((w, wi) => {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === 'down' ? w.row + i : w.row, c = w.dir === 'across' ? w.col + i : w.col, k = `${r},${c}`
      const cell = m.get(k) ?? { r, c, words: [], ch: w.word[i].toUpperCase() }
      cell.words.push(wi); if (i === 0) cell.num = w.number; m.set(k, cell)
    }
  })
  return [...m.values()]
})()
export const wi = (num: number) => G.words.findIndex(w => w.number === num)
export const W = (num: number): CrosswordWordPlacement => G.words[wi(num)]
export const NUMS = [...G.words.map(w => w.number)].sort((a, b) => a - b)
export const wordCells = (num: number): Cell[] => {
  const w = W(num), i0 = wi(num)
  return CELLS.filter(c => c.words.includes(i0)).sort((a, b) => (w.dir === 'down' ? a.r - b.r : a.c - b.c))
}
export const cellNums = (c: Cell) => c.words.map(i => G.words[i].number)
export const dirRu = (num: number) => (W(num).dir === 'across' ? 'по горизонтали' : 'по вертикали')

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
export const verdict = (num: number, ti: number): boolean | null => { const a = CW_ANS[num][ti]; return a ? isCrosswordWordCorrect(a, W(num).word) : null }
export const total = (ti: number) => NUMS.filter(n => verdict(n, ti) === true).length
export type Dl = { ch: string; st: 'ok' | 'bad' | 'extra' }
/** ответ по буквам под буквами слова; null — ответ слишком длинный для побуквенной выкладки (показываем текстом) */
export function diffOf(num: number, ti: number): Dl[] | null {
  const a = CW_ANS[num][ti]; if (!a) return null
  const ans = normalize(a).replace(/\s/g, '').toUpperCase(), w = normalize(W(num).word).replace(/\s/g, '').toUpperCase()
  if (ans.length > w.length + 2) return null
  return [...ans].map((ch, i) => ({ ch, st: i >= w.length ? 'extra' : ch === w[i] ? 'ok' : 'bad' }))
}

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
export const lenCls = (t: string) => (t.length > 70 ? ' xl' : t.length > 40 ? ' lg' : '')
/** сводка итога: команды по числу угаданных слов */
export const RANKED = CWT.map((t, i) => ({ ...t, i, n: total(i) })).sort((a, b) => b.n - a.n || a.i - b.i)

/** ответ команды по буквам (или текстом, если длинный); px — префикс классов концепта; hide — буквы скрыты (до показа) */
export function Align({ num, ti, px, hide }: { num: number; ti: number; px: string; hide?: boolean }) {
  const a = CW_ANS[num][ti], w = W(num).word
  if (a == null) return <span className={`${px}-none`}>не ответили</span>
  const dl = diffOf(num, ti)
  if (!dl) return <span className={`${px}-txt${lenCls(a)}`}><b className="ch">{a}</b></span>
  const n = Math.max(w.length, dl.length)
  return <span className={`${px}-al`}>{Array.from({ length: n }, (_, i) => { const d = dl[i]; return <i key={i} className={`${px}-lt ${d ? d.st : 'miss'}`}><b className="ch" style={hide ? { opacity: 0 } : undefined}>{d?.ch ?? ''}</b></i> })}</span>
}
/** вердикт строки: ✓ верно (+1), ✗ неверно, — нет ответа */
export function Mark({ num, ti, px }: { num: number; ti: number; px: string }) {
  const v = verdict(num, ti)
  return <span className={`${px}-mk ${v === true ? 'ok' : v === false ? 'no' : 'nil'}`}>{v === true ? <><b>✓</b><em>+1</em></> : v === false ? <b>✗</b> : <b>—</b>}</span>
}
