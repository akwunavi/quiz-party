// ═══ Рендер сетки кроссворда (проектор и телефон) ═══
// letters: заполнение клеток буквами своих ответов (телефон); null = пустая сетка (проектор).
import type { CrosswordGrid } from '../types/quiz'

export function CrosswordView({ grid, currentWordNumber, currentDir, letters, cellSize = 30 }: {
  grid: CrosswordGrid
  currentWordNumber?: number
  currentDir?: 'across' | 'down'
  letters?: Map<string, string>       // "r,c" → буква
  cellSize?: number
}) {
  const cells = new Map<string, { num?: number; current: boolean }>()
  for (const w of grid.words) {
    const isCurrent = w.number === currentWordNumber && w.dir === currentDir
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === 'down' ? w.row + i : w.row
      const c = w.dir === 'across' ? w.col + i : w.col
      const key = `${r},${c}`
      const prev = cells.get(key)
      cells.set(key, {
        num: i === 0 ? w.number : prev?.num,
        current: (prev?.current ?? false) || isCurrent,
      })
    }
  }
  return (
    <div className="cw-grid" style={{ gridTemplateColumns: `repeat(${grid.cols}, ${cellSize}px)` }}>
      {Array.from({ length: grid.rows * grid.cols }, (_, i) => {
        const r = Math.floor(i / grid.cols), c = i % grid.cols
        const cell = cells.get(`${r},${c}`)
        if (!cell) return <div key={i} className="cw-cell empty" style={{ width: cellSize, height: cellSize }} />
        return (
          <div key={i} className={`cw-cell${cell.current ? ' current' : ''}`}
            style={{ width: cellSize, height: cellSize }}>
            {cell.num && <span className="num">{cell.num}</span>}
            {letters?.get(`${r},${c}`) ?? ''}
          </div>
        )
      })}
    </div>
  )
}

/** Буквы своих ответов: слова игрока раскладываются по клеткам (вариант «б» из ТЗ:
 *  хранение по-словно; конфликт в общей клетке — показывается буква последнего ввода). */
export function lettersFromAnswers(grid: CrosswordGrid, byWord: Record<string, string>): Map<string, string> {
  const m = new Map<string, string>()
  for (const w of grid.words) {
    const input = (byWord[w.word] ?? '').toUpperCase().replace(/Ё/g, 'Е').replace(/[^А-ЯA-Z0-9]/g, '')
    for (let i = 0; i < Math.min(input.length, w.word.length); i++) {  // длиннее — обрезаем
      const r = w.dir === 'down' ? w.row + i : w.row
      const c = w.dir === 'across' ? w.col + i : w.col
      m.set(`${r},${c}`, input[i])
    }
  }
  return m
}
