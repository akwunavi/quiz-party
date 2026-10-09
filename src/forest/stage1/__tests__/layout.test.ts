import { describe, expect, it } from 'vitest'
import { fitRow, sprintColumns, wordCells } from '../layout'

describe('Лес, этап 1: раскладка под настоящее содержимое', () => {
  it('ряд картинок: одна высота, натуральные пропорции, влезает в ширину; на лабораторных размерах — прежние рамки', () => {
    // лаборатория «Три попытки», фаза 1: Falcon 1024×683 и Коллинз 600×800 при maxH 560
    const r = fitRow([{ w: 1024, h: 683 }, { w: 600, h: 800 }], 40, 560, 1060, 1500, 56)
    expect(r.map(x => x.h)).toEqual([560, 560])
    expect(r[0].w).toBe(Math.round(1024 * 560 / 683))
    // четыре широкие — высота падает, пока ряд не влезет
    const four = fitRow(Array(4).fill({ w: 16, h: 9 }), 40, 300, 1060, 1500, 34)
    const right = four[3].x + four[3].w
    expect(right - four[0].x).toBeLessThanOrEqual(1500 + 4)
    expect(new Set(four.map(x => x.h)).size).toBe(1)
    // нет размера — 4:3
    expect(fitRow([{ w: 0, h: 0 }], 0, 300, 500, 2000)[0]).toMatchObject({ w: 400, h: 300 })
  })

  it('спилы: слово из 6 букв — ровно лабораторные позиции; длинное — мельче; очень длинное — в две строки', () => {
    const six = wordCells([['К', 'О', 'С', 'М', 'О', 'С']], 1060, 790, 920)
    expect(six.d).toBe(116)
    const x0 = 1060 - (5 * 140) / 2
    expect(six.cells.map(c => c.x)).toEqual([0, 1, 2, 3, 4, 5].map(i => x0 + i * 140))
    const long = wordCells(['ПАРАШЮТИСТКА'.split('')], 1060, 790, 920)
    expect(wordCells(['ДОСТОПРИМЕЧАТЕЛЬНОСТЬ'.split('')], 1060, 790, 920).rows).toBe(2)
    expect(long.rows).toBe(1)
    expect(long.maxX - long.minX).toBeLessThanOrEqual(920)
    const two = wordCells(['КРАСНАЯ', 'ПЛОЩАДЬ', 'МОСКВЫ', 'СТОЛИЦЫ'].map(w => w.split('')), 1060, 790, 920)
    expect(two.rows).toBe(2)
    expect(two.cells.map(c => c.flat)).toEqual(two.cells.map((_, i) => i))
    expect(two.maxX - two.minX).toBeLessThanOrEqual(920 + 1)
    expect(wordCells([], 1060, 790, 920).cells).toEqual([])
  })

  it('«120 секунд»: две колонки, левая — первая половина; 8 вопросов — 4 строки, как в лаборатории', () => {
    expect(sprintColumns([1, 2, 3, 4, 5, 6, 7, 8])).toEqual({ cols: [[1, 2, 3, 4], [5, 6, 7, 8]], rows: 4 })
    expect(sprintColumns([1, 2, 3, 4, 5])).toEqual({ cols: [[1, 2, 3], [4, 5]], rows: 3 })
    expect(sprintColumns([]).rows).toBe(1)
  })
})
