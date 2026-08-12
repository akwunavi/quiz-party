// ═══ Генератор сетки кроссворда ═══
// Вход: 6–10 слов с определениями. Выход: классическая сетка с нумерацией
// или список слов, которые не удалось уложить (редактор подсветит).
// Алгоритм: многократный жадный перебор со случайными перестановками,
// выбор лучшей раскладки по числу пересечений и компактности.

import type { CrosswordGrid, CrosswordWordPlacement } from '../types/quiz'

export interface CrosswordInput { word: string; clue: string }
export interface CrosswordResult {
  grid: CrosswordGrid | null
  unplaced: string[]            // слова, которые не легли (редактор: «замени»)
}

const norm = (w: string) => w.toUpperCase().replace(/Ё/g, 'Е').replace(/[^А-ЯA-Z0-9]/g, '')

interface Cell { ch: string }
type Board = Map<string, Cell>  // "row,col" → буква
interface Placed { word: string; clue: string; dir: 'across' | 'down'; row: number; col: number }

const key = (r: number, c: number) => `${r},${c}`

function canPlace(board: Board, word: string, r: number, c: number, dir: 'across' | 'down'): boolean {
  const dr = dir === 'down' ? 1 : 0
  const dc = dir === 'across' ? 1 : 0
  // клетка перед началом и после конца должны быть пустыми
  if (board.has(key(r - dr, c - dc))) return false
  if (board.has(key(r + dr * word.length, c + dc * word.length))) return false

  let hasCross = board.size === 0 // первое слово — без пересечений
  for (let i = 0; i < word.length; i++) {
    const rr = r + dr * i, cc = c + dc * i
    const cell = board.get(key(rr, cc))
    if (cell) {
      if (cell.ch !== word[i]) return false      // конфликт буквы
      hasCross = true
    } else {
      // соседи поперёк должны быть пустыми (классическая сетка, слова не слипаются)
      if (dir === 'across') {
        if (board.has(key(rr - 1, cc)) || board.has(key(rr + 1, cc))) return false
      } else {
        if (board.has(key(rr, cc - 1)) || board.has(key(rr, cc + 1))) return false
      }
    }
  }
  return hasCross
}

function place(board: Board, word: string, r: number, c: number, dir: 'across' | 'down') {
  const dr = dir === 'down' ? 1 : 0
  const dc = dir === 'across' ? 1 : 0
  for (let i = 0; i < word.length; i++) board.set(key(r + dr * i, c + dc * i), { ch: word[i] })
}

interface Attempt { placed: Placed[]; board: Board; crossings: number }

function tryLayout(words: CrosswordInput[], rng: () => number): Attempt {
  const board: Board = new Map()
  const placed: Placed[] = []
  let crossings = 0

  for (const { word: raw, clue } of words) {
    const word = norm(raw)
    if (placed.length === 0) {
      place(board, word, 0, 0, 'across')
      placed.push({ word, clue, dir: 'across', row: 0, col: 0 })
      continue
    }
    // все кандидаты: каждая буква нового слова × каждая совпадающая буква на доске
    const candidates: { r: number; c: number; dir: 'across' | 'down'; cross: number }[] = []
    for (const [k, cell] of board) {
      const [br, bc] = k.split(',').map(Number)
      for (let i = 0; i < word.length; i++) {
        if (word[i] !== cell.ch) continue
        for (const dir of ['across', 'down'] as const) {
          const r = dir === 'down' ? br - i : br
          const c = dir === 'across' ? bc - i : bc
          if (canPlace(board, word, r, c, dir)) {
            let cross = 0
            const dr = dir === 'down' ? 1 : 0, dc = dir === 'across' ? 1 : 0
            for (let j = 0; j < word.length; j++)
              if (board.has(key(r + dr * j, c + dc * j))) cross++
            candidates.push({ r, c, dir, cross })
          }
        }
      }
    }
    if (candidates.length === 0) continue        // слово не легло в этой попытке
    // предпочитаем больше пересечений; среди равных — случайно
    candidates.sort((a, b) => b.cross - a.cross || rng() - 0.5)
    const best = candidates[0]
    place(board, word, best.r, best.c, best.dir)
    placed.push({ word, clue, dir: best.dir, row: best.r, col: best.c })
    crossings += best.cross
  }
  return { placed, board, crossings }
}

function shuffled<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Главная функция. attempts — число случайных попыток (по умолчанию 2000). */
export function generateCrossword(
  inputs: CrosswordInput[],
  attempts = 2000,
  seed = Date.now(),
): CrosswordResult {
  if (inputs.length < 6 || inputs.length > 10) {
    throw new Error('Кроссворд: нужно от 6 до 10 слов')
  }
  // простой детерминируемый rng (mulberry32) — «Перегенерировать» = новый seed
  let s = seed >>> 0
  const rng = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  let best: Attempt | null = null
  for (let i = 0; i < attempts; i++) {
    const order = shuffled(inputs, rng)
      .sort((a, b) => (i % 3 === 0 ? norm(b.word).length - norm(a.word).length : 0)) // треть попыток — длинные первыми
    const attempt = tryLayout(order, rng)
    if (!best) { best = attempt; continue }
    // критерий: больше слов уложено → больше пересечений → компактнее
    const better =
      attempt.placed.length > best.placed.length ||
      (attempt.placed.length === best.placed.length && attempt.crossings > best.crossings) ||
      (attempt.placed.length === best.placed.length && attempt.crossings === best.crossings &&
        area(attempt.board) < area(best.board))
    if (better) best = attempt
    if (best.placed.length === inputs.length && i > attempts / 4) break // все легли — можно не искать дальше
  }

  const placedWords = new Set(best!.placed.map(p => p.word))
  const unplaced = inputs.map(i => norm(i.word)).filter(w => !placedWords.has(w))
  if (best!.placed.length === 0) return { grid: null, unplaced }

  return { grid: toGrid(best!.placed), unplaced }
}

function area(board: Board): number {
  let minR = Infinity, maxR = -Infinity, minC = Infinity, maxC = -Infinity
  for (const k of board.keys()) {
    const [r, c] = k.split(',').map(Number)
    minR = Math.min(minR, r); maxR = Math.max(maxR, r)
    minC = Math.min(minC, c); maxC = Math.max(maxC, c)
  }
  return (maxR - minR + 1) * (maxC - minC + 1)
}

/** Сдвиг в положительные координаты + классическая нумерация:
 *  клетки-начала слов нумеруются по строкам слева направо. */
function toGrid(placed: Placed[]): CrosswordGrid {
  let minR = Infinity, minC = Infinity, maxR = -Infinity, maxC = -Infinity
  for (const p of placed) {
    const endR = p.dir === 'down' ? p.row + p.word.length - 1 : p.row
    const endC = p.dir === 'across' ? p.col + p.word.length - 1 : p.col
    minR = Math.min(minR, p.row); maxR = Math.max(maxR, endR)
    minC = Math.min(minC, p.col); maxC = Math.max(maxC, endC)
  }
  const shifted = placed.map(p => ({ ...p, row: p.row - minR, col: p.col - minC }))

  // нумерация: уникальные стартовые клетки, сортировка row→col
  const starts = [...new Map(
    shifted.map(p => [key(p.row, p.col), { row: p.row, col: p.col }]),
  ).values()].sort((a, b) => a.row - b.row || a.col - b.col)
  const numberOf = new Map(starts.map((s, i) => [key(s.row, s.col), i + 1]))

  const words: CrosswordWordPlacement[] = shifted.map(p => ({
    word: p.word, clue: p.clue, dir: p.dir, row: p.row, col: p.col,
    number: numberOf.get(key(p.row, p.col))!,
  }))
  return { rows: maxR - minR + 1, cols: maxC - minC + 1, words }
}

/** ASCII-рендер для отладки/тестов. */
export function renderAscii(grid: CrosswordGrid): string {
  const cells: string[][] = Array.from({ length: grid.rows }, () =>
    Array.from({ length: grid.cols }, () => '·'))
  for (const w of grid.words) {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === 'down' ? w.row + i : w.row
      const c = w.dir === 'across' ? w.col + i : w.col
      cells[r][c] = w.word[i]
    }
  }
  return cells.map(row => row.join(' ')).join('\n')
}
