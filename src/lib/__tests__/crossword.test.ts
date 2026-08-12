import { describe, it, expect } from 'vitest'
import { generateCrossword, renderAscii } from '../crossword'

const WORDS = [
  { word: 'самовывоз', clue: 'Отказ от посредника' },
  { word: 'аншлаг', clue: 'Полный зал' },
  { word: 'ледник', clue: 'Река льда' },
  { word: 'токсик', clue: 'Неприятный человек' },
  { word: 'ковбой', clue: 'Всадник прерий' },
  { word: 'ластик', clue: 'Стирает карандаш' },
]

describe('crossword generator', () => {
  it('минимум 6, максимум 10 слов', () => {
    expect(() => generateCrossword(WORDS.slice(0, 5))).toThrow()
    expect(() => generateCrossword([...WORDS, ...WORDS])).toThrow()
  })

  it('укладывает 6 обычных русских слов', () => {
    const { grid, unplaced } = generateCrossword(WORDS, 2000, 42)
    expect(grid).not.toBeNull()
    expect(unplaced).toEqual([])
    expect(grid!.words).toHaveLength(6)
  })

  it('нумерация классическая: по строкам, без дырок, с 1', () => {
    const { grid } = generateCrossword(WORDS, 2000, 42)
    const nums = [...new Set(grid!.words.map(w => w.number))].sort((a, b) => a - b)
    expect(nums[0]).toBe(1)
    expect(nums[nums.length - 1]).toBe(nums.length)
  })

  it('пересечения согласованы: общая клетка = общая буква', () => {
    const { grid } = generateCrossword(WORDS, 2000, 42)
    const cellMap = new Map<string, string>()
    for (const w of grid!.words) {
      for (let i = 0; i < w.word.length; i++) {
        const r = w.dir === 'down' ? w.row + i : w.row
        const c = w.dir === 'across' ? w.col + i : w.col
        const k = `${r},${c}`
        if (cellMap.has(k)) expect(cellMap.get(k)).toBe(w.word[i])
        cellMap.set(k, w.word[i])
      }
    }
  })

  it('слово без общих букв попадает в unplaced', () => {
    const bad = [...WORDS.slice(0, 5), { word: 'жжжж', clue: 'нет общих букв' }]
    const { unplaced } = generateCrossword(bad, 500, 7)
    expect(unplaced).toContain('ЖЖЖЖ')
  })

  it('перегенерация с другим seed даёт валидную сетку', () => {
    const a = generateCrossword(WORDS, 1000, 1)
    const b = generateCrossword(WORDS, 1000, 2)
    expect(a.grid).not.toBeNull()
    expect(b.grid).not.toBeNull()
    // ascii-рендер не падает
    expect(renderAscii(a.grid!)).toContain('А')
  })
})
