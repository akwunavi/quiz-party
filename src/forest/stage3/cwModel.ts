// ═══ Кроссворд Леса — модель сетки и раскладка (чистые функции, без тестовых данных) ═══
// Сетка — настоящая CrosswordGrid (round.settings.grid из генератора редактора): клетки, номера, слова. Проверка ответа —
// НЕ здесь (в игре вердикт приходит снаружи: is_correct ведущего или autocheck, как в ShowAnswers). Здесь только
// «как выложить»: сетку на экран 1920×1080, ответ команды по буквам под буквами слова, высота строк под число команд.
import type { CrosswordGrid, CrosswordWordPlacement } from '../../types/quiz'
import { normalize } from '../../lib/answerCheck'

export type Cell = { r: number; c: number; num?: number; words: number[]; ch: string }
export type CwModel = {
  grid: CrosswordGrid
  cells: Cell[]
  /** номера слов по возрастанию */
  nums: number[]
  W: (num: number) => CrosswordWordPlacement
  wordCells: (num: number) => Cell[]
  cellNums: (c: Cell) => number[]
  dirRu: (num: number) => string
  bb: { r0: number; r1: number; c0: number; c1: number }
}

export function cwModel(grid: CrosswordGrid): CwModel {
  const m = new Map<string, Cell>()
  grid.words.forEach((w, wi) => {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === 'down' ? w.row + i : w.row, c = w.dir === 'across' ? w.col + i : w.col, k = `${r},${c}`
      const cell = m.get(k) ?? { r, c, words: [], ch: w.word[i].toUpperCase() }
      cell.words.push(wi); if (i === 0) cell.num = w.number; m.set(k, cell)
    }
  })
  const cells = [...m.values()]
  const wi = (num: number) => grid.words.findIndex(w => w.number === num)
  const W = (num: number): CrosswordWordPlacement => grid.words[wi(num)]
  const wordCells = (num: number): Cell[] => {
    const w = W(num), i0 = wi(num)
    if (!w) return []
    return cells.filter(c => c.words.includes(i0)).sort((a, b) => (w.dir === 'down' ? a.r - b.r : a.c - b.c))
  }
  const rs = cells.map(c => c.r), cs = cells.map(c => c.c)
  return {
    grid, cells, nums: [...grid.words.map(w => w.number)].sort((a, b) => a - b), W, wordCells,
    cellNums: c => c.words.map(i => grid.words[i].number),
    dirRu: num => (W(num)?.dir === 'down' ? 'по вертикали' : 'по горизонтали'),
    bb: cells.length ? { r0: Math.min(...rs), r1: Math.max(...rs), c0: Math.min(...cs), c1: Math.max(...cs) } : { r0: 0, r1: 0, c0: 0, c1: 0 },
  }
}

const normW = (s: string) => normalize(s).replace(/\s/g, '')
/** Слово сетки для вопроса кроссворда. Номер слова в генераторе = порядок вопроса (srcIndex + 1, lib/crossword.ts toGrid),
 *  но сетку могли собрать до правки вопросов — поэтому сначала совпадение по самому слову, потом по номеру. */
export function wordForQuestion(grid: CrosswordGrid, word: string | undefined, qIndex: number): number | null {
  const w = normW(word ?? '')
  const same = w ? grid.words.filter(x => normW(x.word) === w) : []
  if (same.length === 1) return same[0].number
  const byNum = grid.words.find(x => x.number === qIndex + 1)
  if (byNum && (!same.length || same.includes(byNum))) return byNum.number
  return same[0]?.number ?? byNum?.number ?? null
}

export type Dl = { ch: string; st: 'ok' | 'bad' | 'extra' }
/** Ответ по буквам под буквами слова; null — ответ слишком длинный для побуквенной выкладки (показываем текстом).
 *  Это только раскраска «где разошлось»; засчитано или нет — решает вердикт (✓/✗), а не она. */
export function diffOf(answer: string, word: string): Dl[] | null {
  const ans = normW(answer).toUpperCase(), w = normW(word).toUpperCase()
  if (ans.length > w.length + 2) return null
  return [...ans].map((ch, i) => ({ ch, st: i >= w.length ? 'extra' : ch === w[i] ? 'ok' : 'bad' }))
}

/** Кегль определения по длине (как в утверждённом экране; xxl — для очень длинных определений из настоящих паков) */
export const lenCls = (t: string) => (t.length > 160 ? ' xl xxl' : t.length > 70 ? ' xl' : t.length > 40 ? ' lg' : '')

export type MapGeom = { P: number; OX: number; OY: number }
/** Где лежит сетка. Утверждённые размеры — потолок (клетка 78 / 56 / 66 px); сетка крупнее — клетка меньше, чтобы
 *  поместиться в ту же область. `bottom` — нижняя граница карты на экране вопроса (над определением). */
export function mapGeom(bb: CwModel['bb'], mode: 'question' | 'review' | 'complete', o: { bottom?: number; right?: number } = {}): MapGeom {
  const cols = bb.c1 - bb.c0 + 1, rows = bb.r1 - bb.r0 + 1
  if (mode === 'question') {
    const top = 96, right = o.right ?? 1520, left = 1920 - right, h = Math.max(200, (o.bottom ?? 876) - top)
    const P = Math.max(24, Math.min(78, Math.floor((right - left) / cols), Math.floor(h / rows)))
    const cx = (left + right) / 2
    return { P, OX: cx - (cols * P) / 2, OY: top + Math.max(0, (h - rows * P) / 2) }
  }
  if (mode === 'complete') {
    const P = Math.max(24, Math.min(66, Math.floor(924 / cols), Math.floor(660 / rows)))
    return { P, OX: 70, OY: 200 + Math.max(0, (660 - rows * P) / 2) }
  }
  const P = Math.max(22, Math.min(56, Math.floor(784 / cols), Math.floor(560 / rows)))
  return { P, OX: 44, OY: 310 + Math.max(0, (560 - rows * P) / 2) }
}

/** Строки ответов команд под правильным ответом: шаг и размер буквы под число команд и длину слова.
 *  Утверждённый кадр (6 команд, слово до 9 букв) — шаг 88, буква 54, колонка 62. */
export function rowGeom(nTeams: number, wordLen: number) {
  const ROW0 = 392, ROWH = Math.max(40, Math.min(88, Math.floor(680 / Math.max(1, nTeams))))
  const COL = Math.max(34, Math.min(62, Math.floor(704 / Math.max(1, wordLen + 2))))
  const lt = Math.min(COL - 8, ROWH - 10)
  return { ROW0, ROWH, COL, lt }
}

/** Строки итога: утверждённый шаг 92 до 8 команд, дальше плотнее */
export function tallyGeom(nTeams: number, nWords: number) {
  const step = Math.max(40, Math.min(92, Math.floor(740 / Math.max(1, nTeams))))
  const pip = Math.max(26, Math.min(40, Math.floor(step - 12), Math.floor(560 / Math.max(1, nWords)) - 8))
  return { top: 300, step, pip }
}

/** «ответили 1 команда / 3 команды / 6 команд» */
export function teamsWord(n: number) {
  const a = n % 10, b = n % 100
  return a === 1 && b !== 11 ? 'команда' : a >= 2 && a <= 4 && (b < 12 || b > 14) ? 'команды' : 'команд'
}
