// Лес, этап 3 в игре: раскладка «Скрэмбла» и «Кроссворда» под настоящие данные (длинные фразы, большие сетки, много команд)
// и связь вопроса со словом сетки. Утверждённые кадры лаборатории — потолок: на тех же данных размеры не меняются.
import { describe, expect, it } from 'vitest'
import { anagramQuestion, anagramShuffle, anagramTemplate, hashStr } from '../../../lib/anagram'
import { generateCrossword } from '../../../lib/crossword'
import { scrLayout, scrResultTop } from '../Scramble'
import { cwModel, diffOf, mapGeom, questionNums, rowGeom, tallyGeom, teamsWord, wordForQuestion } from '../cwModel'

const scr = (phrase: string) => { const t = anagramTemplate(phrase); const { template, order } = anagramQuestion(phrase, anagramShuffle(t.letters, hashStr(phrase))); return scrLayout(template, order) }
const inFrame = (x: number, y: number) => x > 0 && x < 1920 && y > 0 && y < 1080

describe('Скрэмбл Леса — раскладка', () => {
  it('утверждённые фразы — клетка и строки как в лаборатории', () => {
    expect(scr('Кракен').rowY).toEqual([880])
    expect(scr('Летучий голландец').rowY.length).toBeLessThanOrEqual(2)
    expect(scr('Преступление и наказание').cell).toBeGreaterThanOrEqual(56)
  })
  it('длинные фразы (до ~40 букв, много слов): все клетки в кадре и не налезают друг на друга', () => {
    for (const p of ['Электроэнцефалография', 'Двадцать тысяч лье под водой', 'Сто лет одиночества и пять минут тишины', 'Мастер и Маргарита в Москве тридцатых годов']) {
      const L = scr(p), n = anagramTemplate(p).letters.length
      for (let i = 0; i < n; i++) expect(inFrame(L.slot[i].x, L.slot[i].y), `${p} #${i}`).toBe(true)
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const a = L.slot[i], b = L.slot[j]
        expect(Math.abs(a.x - b.x) >= L.cell || Math.abs(a.y - b.y) >= L.cell, `${p} ${i}/${j}`).toBe(true)
      }
      for (const h of L.home) expect(inFrame(h.x, h.y)).toBe(true)
      // плитки над грядками
      expect(Math.max(...L.home.map(h => h.y)) + L.tile / 2).toBeLessThan(Math.min(...L.rowY) - L.cell / 2)
    }
  })
  it('строка «угадали» с длинным списком уходит на освободившееся место плиток', () => {
    const L = scr('Летучий голландец')
    expect(scrResultTop(L, 1)).toBeGreaterThan(900)
    expect(scrResultTop(L, 4)).toBe(330)
  })
})

const WORDS = ['Онегин', 'Воланд', 'Маргарита', 'Печорин', 'Гоголь', 'Нос', 'Чичиков', 'Азазелло', 'Раскольников', 'Обломов']
  .map((w, i) => ({ word: w, clue: `Определение ${i + 1}` }))

describe('Кроссворд Леса — модель и раскладка', () => {
  const grid = generateCrossword(WORDS, 800, 7).grid!
  const m = cwModel(grid)
  it('вопрос → слово сетки: по слову, при повторе — по номеру', () => {
    WORDS.forEach((w, i) => {
      const num = wordForQuestion(grid, w.word, i)
      expect(num).not.toBeNull()
      expect(m.W(num!).word).toBe(w.word.toUpperCase())
    })
    expect(wordForQuestion(grid, 'неизвестное', 0)).toBe(grid.words.find(x => x.number === 1)!.number)
    const qs = WORDS.map(w => ({ answer: { mode: 'crossword_word', word: w.word } }))
    expect(questionNums(grid, qs).every(x => x != null)).toBe(true)
  })
  it('утверждённые размеры — потолок; большая сетка ужимается и остаётся в своей области', () => {
    const lab = { r0: 0, r1: 9, c0: 0, c1: 13 }
    expect(mapGeom(lab, 'question')).toEqual({ P: 78, OX: 960 - 7 * 78, OY: 96 })
    expect(mapGeom(lab, 'review')).toEqual({ P: 56, OX: 44, OY: 310 })
    expect(mapGeom(lab, 'complete')).toEqual({ P: 66, OX: 70, OY: 200 })
    const big = { r0: 0, r1: 17, c0: 0, c1: 21 }
    const g = mapGeom(big, 'question', { bottom: 820 })
    expect(g.OX).toBeGreaterThanOrEqual(400); expect(g.OX + 22 * g.P).toBeLessThanOrEqual(1520); expect(g.OY + 18 * g.P).toBeLessThanOrEqual(820)
    const r = mapGeom(big, 'review')
    expect(r.OY + 18 * r.P).toBeLessThanOrEqual(870)
  })
  it('строки команд: 6 команд — утверждённый шаг; 12+ команд помещаются до низа кадра', () => {
    expect(rowGeom(6, 9)).toEqual({ ROW0: 392, ROWH: 88, COL: 62, lt: 54 })
    for (const n of [1, 3, 12, 16]) { const g = rowGeom(n, 12); expect(g.ROW0 + (n - 1) * g.ROWH + g.ROWH / 2).toBeLessThanOrEqual(1080); expect(g.lt).toBeLessThanOrEqual(g.COL - 8) }
    // длинное слово (14 букв + 2 лишние) помещается в колонку букв (704 px)
    expect(rowGeom(6, 14).COL * 16).toBeLessThanOrEqual(704)
    expect(tallyGeom(6, 8)).toEqual({ top: 300, step: 92, pip: 40 })
    expect(tallyGeom(12, 10).top + 11 * tallyGeom(12, 10).step + 80).toBeLessThanOrEqual(1080)
  })
  it('ответ по буквам: ё=е, лишние буквы, слишком длинный — текстом', () => {
    expect(diffOf('Печорин', 'ПЕЧОРИН')!.every(d => d.st === 'ok')).toBe(true)
    expect(diffOf('Маргаритта', 'МАРГАРИТА')!.map(d => d.st).slice(-2)).toEqual(['bad', 'extra'])
    expect(diffOf('Грушницкий — друг Печорина', 'ПЕЧОРИН')).toBeNull()
    expect(teamsWord(1)).toBe('команда'); expect(teamsWord(3)).toBe('команды'); expect(teamsWord(12)).toBe('команд'); expect(teamsWord(21)).toBe('команда')
  })
})
