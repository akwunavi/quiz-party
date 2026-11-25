import { describe, expect, it } from 'vitest'
import {
  clampScroll, clampZoom, doubleTapZoom, fitCellSize, isKeyboardOpen, panelAreaHeight,
  pickWordAt, pinchZoom, revealAxis, span, wordRect, wordsAt, zoomScroll,
} from '../crosswordFit'
import type { CrosswordGrid } from '../../types/quiz'

const grid: CrosswordGrid = {
  rows: 5, cols: 5,
  words: [
    { word: 'ДОМИК', clue: '', number: 1, dir: 'across', row: 0, col: 0 },
    { word: 'ДВОР', clue: '', number: 1, dir: 'down', row: 0, col: 0 },
    { word: 'КОТ', clue: '', number: 2, dir: 'down', row: 0, col: 4 },
  ],
}

describe('crosswordFit', () => {
  it('span: n клеток со щелями', () => {
    expect(span(5, 20)).toBe(5 * 20 + 4 * 2)
    expect(span(0, 20)).toBe(0)
  })
  it('fitCellSize: вся сетка по ширине, целое число, в пределах min/max', () => {
    expect(fitCellSize({ areaW: 359, areaH: 400, cols: 7, rows: 7 })).toBe(48)
    expect(fitCellSize({ areaW: 359, areaH: 600, cols: 15, rows: 15 })).toBe(22)
    expect(fitCellSize({ areaW: 359, areaH: 200, cols: 11, rows: 11 })).toBe(Math.floor((200 - 20) / 11))
    expect(fitCellSize({ areaW: 300, areaH: 300, cols: 40, rows: 40 })).toBe(12)
    expect(fitCellSize({ areaW: NaN, areaH: NaN, cols: 5, rows: 5 })).toBe(12)
  })
  it('fitCellSize: вписанная сетка всегда помещается (кроме минимума)', () => {
    for (const n of [5, 7, 9, 11, 13, 15]) for (const w of [320, 360, 390, 768]) {
      const c = fitCellSize({ areaW: w - 16, areaH: 1000, cols: n, rows: n })
      if (c > 12) expect(span(n, c)).toBeLessThanOrEqual(w - 16)
    }
  })
  it('высота панели и клавиатура', () => {
    expect(panelAreaHeight(667, false)).toBe(334)
    expect(panelAreaHeight(400, true)).toBe(168)
    expect(panelAreaHeight(100, true)).toBe(120)
    expect(isKeyboardOpen(400, 667)).toBe(true)
    expect(isKeyboardOpen(640, 667)).toBe(false)
    expect(isKeyboardOpen(400, 0)).toBe(false)
  })
  it('зум: границы, щипок, двойной тап', () => {
    expect(clampZoom(0.2)).toBe(1); expect(clampZoom(99)).toBe(3.5); expect(clampZoom(NaN)).toBe(1)
    expect(pinchZoom(1, 100, 200)).toBe(2)
    expect(pinchZoom(2, 100, 50)).toBe(1)
    expect(pinchZoom(2, 0, 50)).toBe(2)
    expect(doubleTapZoom(1)).toBe(2.2); expect(doubleTapZoom(2.2)).toBe(1)
  })
  it('прокрутка: зажим и сохранение точки под пальцем', () => {
    expect(clampScroll(-5, 500, 300)).toBe(0)
    expect(clampScroll(999, 500, 300)).toBe(200)
    expect(clampScroll(10, 200, 300)).toBe(0)
    // точка content=150 под пальцем на 50 → после ×2 она на 300 → scroll 250
    expect(zoomScroll({ scroll: 100, focus: 50, oldContent: 400, newContent: 800, view: 300 })).toBe(250)
    expect(zoomScroll({ scroll: 100, focus: 50, oldContent: 0, newContent: 800, view: 300 })).toBe(0)
  })
  it('wordRect: по горизонтали и вертикали', () => {
    expect(wordRect(grid.words[0], 20)).toEqual({ x: 0, y: 0, w: span(5, 20), h: 20 })
    expect(wordRect(grid.words[2], 20)).toEqual({ x: 4 * 22, y: 0, w: 20, h: span(3, 20) })
  })
  it('revealAxis: видимое не трогаем, невидимое — в центр, длинное — к началу', () => {
    const base = { view: 200, content: 1000, margin: 8 }
    expect(revealAxis({ ...base, start: 50, size: 40, scroll: 0 })).toBe(0)
    expect(revealAxis({ ...base, start: 500, size: 40, scroll: 0 })).toBe(420)
    expect(revealAxis({ ...base, start: 500, size: 400, scroll: 0 })).toBe(492)
    expect(revealAxis({ ...base, start: 990, size: 10, scroll: 0 })).toBe(800)
  })
  it('wordsAt / pickWordAt: пересечение переключается вторым тапом', () => {
    expect(wordsAt(grid, 0, 0).map(w => w.dir).sort()).toEqual(['across', 'down'])
    expect(wordsAt(grid, 2, 2)).toEqual([])
    const first = pickWordAt(grid, 0, 0)!
    const second = pickWordAt(grid, 0, 0, first)!
    expect(second.dir).not.toBe(first.dir)
    expect(pickWordAt(grid, 0, 2)?.word).toBe('ДОМИК')
    expect(pickWordAt(grid, 0, 2, grid.words[0])?.word).toBe('ДОМИК')
    expect(pickWordAt(grid, 4, 4)).toBeUndefined()
  })
})
