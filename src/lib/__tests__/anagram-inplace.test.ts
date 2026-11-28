import { describe, it, expect } from 'vitest'
import {
  anagramTemplate, anagramWordScramble, anagramBookCellPlan, anagramWordSpecs, anagramHintOrder,
  anagramHintsOpen, anagramMaxHints, hashStr, type AnagramScrambledCell,
} from '../anagram'

const PHRASES = ['Снегурочка', 'Дед Мороз', 'Ёлка и Ёж', 'Формула-1 2024', 'Я', 'ааа ббб аб', 'Новый год у ёлки с подарками для всех гостей',
  'Сто лет тому вперёд и ещё немного сверху для длины фразы 40+ знаков']

const word = (cells: AnagramScrambledCell[]) => cells.map(c => c.ch).join('')
const letterCells = (w: AnagramScrambledCell[]) => w.filter(c => c.kind === 'letter') as Extract<AnagramScrambledCell, { kind: 'letter' }>[]

describe('anagramWordScramble (перепутанные буквы в клетках «Книги»)', () => {
  it('без подсказок: набор букв слова тот же, слово из 2+ разных букв не в правильном порядке, знаки на месте', () => {
    for (const phrase of PHRASES) for (const qid of ['q1', 'abc', 'q-долгий-id']) {
      const t = anagramTemplate(phrase)
      const out = anagramWordScramble(t, [], hashStr(qid))
      expect(out.length).toBe(t.words.length)
      out.forEach((w, wi) => {
        const right = t.words[wi].map(c => c.kind === 'fixed' ? c.ch : t.letters[c.idx]).join('')
        expect(word(w).split('').sort().join('')).toBe(right.split('').sort().join(''))
        t.words[wi].forEach((c, ci) => { if (c.kind === 'fixed') expect(w[ci]).toEqual({ kind: 'fixed', ch: c.ch }) })
        if (new Set(letterCells(w).map(c => c.ch)).size > 1) expect(word(w)).not.toBe(right)
      })
    }
  })

  it('детерминирована: тот же сид и фраза — то же самое (проектор, предпросмотр, любой другой экран)', () => {
    const t = anagramTemplate('Дед Мороз и Снегурочка')
    expect(anagramWordScramble(t, [1, 4], 777)).toEqual(anagramWordScramble(anagramTemplate('Дед Мороз и Снегурочка'), [1, 4], 777))
    expect(anagramWordScramble(t, [], 777)).not.toEqual(anagramWordScramble(t, [], 778))
  })

  it('однобуквенное слово и слово из одинаковых букв — как есть', () => {
    const out = anagramWordScramble(anagramTemplate('Я ааа'), [], 5)
    expect(word(out[0])).toBe('Я')
    expect(word(out[1])).toBe('ААА')
  })

  it('подсказка: на своём месте правильная буква (set), остальные — перепутанные оставшиеся', () => {
    const t = anagramTemplate('Снегурочка')
    const hinted = [3, 6, 8]
    const out = anagramWordScramble(t, hinted, 42)[0]
    const lc = letterCells(out)
    for (const c of lc) {
      expect(c.set).toBe(hinted.includes(c.idx))
      if (c.set) expect(c.ch).toBe(t.letters[c.idx])
    }
    expect(word(out).split('').sort().join('')).toBe('СНЕГУРОЧКА'.split('').sort().join(''))
    // оставшиеся буквы не сложились в правильное слово
    expect(word(out)).not.toBe('СНЕГУРОЧКА')
  })

  it('каждая новая подсказка меняет не больше двух клеток слова (экран не перемешивается заново)', () => {
    for (const phrase of PHRASES) {
      const t = anagramTemplate(phrase)
      const seed = hashStr('stability-' + phrase)
      const ord = anagramHintOrder(t.letters, seed)
      let prev = anagramWordScramble(t, [], seed)
      let jumps = 0, steps = 0
      for (let k = 1; k <= anagramMaxHints(t.letters.length); k++) {
        const next = anagramWordScramble(t, ord.slice(0, k), seed)
        next.forEach((w, wi) => {
          const diff = w.filter((c, ci) => c.ch !== prev[wi][ci].ch).length
          steps++
          if (diff > 2) jumps++
        })
        prev = next
      }
      // редкая «переразводка» остатка допустима, но только как исключение
      expect(jumps).toBeLessThanOrEqual(Math.ceil(steps * 0.05))
    }
  })

  it('все подсказки (n−2) и показ ответа: ни одна клетка не теряет букву, показ — правильные буквы везде', () => {
    for (const phrase of PHRASES) {
      const t = anagramTemplate(phrase)
      const seed = hashStr('all-' + phrase)
      const ord = anagramHintOrder(t.letters, seed)
      const open = anagramWordScramble(t, ord.slice(0, anagramMaxHints(t.letters.length)), seed)
      open.forEach((w, wi) => {
        const right = t.words[wi].map(c => c.kind === 'fixed' ? c.ch : t.letters[c.idx]).join('')
        expect(word(w).split('').sort().join('')).toBe(right.split('').sort().join(''))
      })
      const rev = anagramWordScramble(t, [], seed, true)
      rev.forEach((w, wi) => expect(word(w)).toBe(t.words[wi].map(c => c.kind === 'fixed' ? c.ch : t.letters[c.idx]).join('')))
    }
  })

  it('расписание подсказок не тронуто: какие буквы и когда — прежние функции', () => {
    const t = anagramTemplate('Снегурочка')
    const seed = hashStr('qid-1')
    expect(anagramHintOrder(t.letters, seed)).toEqual(anagramHintOrder(t.letters, seed))
    expect(anagramHintOrder(t.letters, seed)).not.toContain(0)
    const start = '2026-01-01T00:00:00.000Z'
    const at = (s: number) => anagramHintsOpen({ nowMs: Date.parse(start) + s * 1000, startedAtIso: start, intervalSec: 10, timerSec: 45, maxHints: 8 })
    expect([at(0), at(9), at(10), at(25), at(44), at(100)]).toEqual([0, 0, 1, 2, 4, 4])
  })
})

describe('anagramBookCellPlan (размер клетки без кучи плиток)', () => {
  const plan = (p: string, zw = 676, zh = 540) => anagramBookCellPlan(anagramWordSpecs(anagramTemplate(p).words), zw, zh)
  it('короткая фраза — крупно, но не больше потолка', () => {
    expect(plan('Дед Мороз').cw).toBeLessThanOrEqual(118)
    expect(plan('Дед Мороз').cw).toBeGreaterThan(60)
  })
  it('длинная фраза: влезает в зону по высоте и ширине, слова переносятся', () => {
    const p = plan('Сто лет тому вперёд и ещё немного сверху для длины фразы 40+ знаков')
    expect(p.fits).toBe(true)
    expect(p.rows).toBeGreaterThan(1)
    expect(p.rows * 1.24 * p.cw + (p.rows - 1) * 24).toBeLessThanOrEqual(540)
  })
  it('больше, чем при куче плиток: плитки больше не отнимают высоту', () => {
    expect(plan('Новый год у ёлки с подарками').cw).toBeGreaterThanOrEqual(40)
  })
})
