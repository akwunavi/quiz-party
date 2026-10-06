// ═══ New Year Mockup Lab: каркас лаборатории ═══
// Сама картинка проверяется рендером (HANDOFF §3ci), здесь — то, что легко
// сломать незаметно: пять миров на месте, у каждого полное описание, восемь
// экранов, детерминированные зёрна и раскладка «Скрэмбла».
import { describe, it, expect } from 'vitest'
import { CONCEPTS } from '../concepts'
import { SCREENS, ANAGRAM } from '../content'
import { rng } from '../engine/rng'
import { treeBox } from '../engine/tree'
import { scrambleMap } from '../concepts/popup/Popup'

describe('New Year Mockup Lab', () => {
  it('ровно пять миров, номера 1–5 по порядку, id уникальны', () => {
    expect(CONCEPTS.map(c => c.meta.num)).toEqual([1, 2, 3, 4, 5])
    expect(new Set(CONCEPTS.map(c => c.meta.id)).size).toBe(5)
  })

  it('у каждого мира заполнено описание: идея, свет, движение, ели, иерархия, Special', () => {
    for (const c of CONCEPTS) {
      const m = c.meta
      for (const v of [m.name, m.tagline, m.idea, m.metaphor, m.composition, m.light, m.materials, m.motion, m.transitions, m.trees, m.special,
        m.hierarchy.primary, m.hierarchy.secondary, m.hierarchy.atmosphere]) {
        expect(v.trim().length).toBeGreaterThan(2)
      }
      expect(typeof c.Screen).toBe('function')
    }
  })

  it('восемь экранов в порядке из задания', () => {
    expect(SCREENS.map(s => s.label)).toEqual(['Lobby', 'Round Intro', 'Question', 'Timer', 'Answer', 'Scoreboard', 'Special', 'Finale'])
  })

  it('Special каждого мира — разная существующая механика', () => {
    const named = CONCEPTS.map(c => /«([^»]+)»/.exec(c.meta.special)?.[1])
    expect(named.every(Boolean)).toBe(true)
    expect(new Set(named).size).toBe(5)
  })

  it('генератор случайных чисел детерминирован (ель не «прыгает» при повторе)', () => {
    const a = rng(42), b = rng(42)
    const xs = Array.from({ length: 5 }, () => a())
    expect(Array.from({ length: 5 }, () => b())).toEqual(xs)
    expect(xs.every(x => x >= 0 && x < 1)).toBe(true)
  })

  it('treeBox: макушка по центру холста, основание ниже макушки на высоту ели', () => {
    const b = treeBox({ height: 900, spread: 0.37 })
    expect(b.apexX).toBeCloseTo(b.w / 2)
    expect(b.groundY - b.apexY).toBe(900)
  })

  it('«Скрэмбл»: каждая перемешанная буква получает своё место в слове, повторы не сталкиваются', () => {
    const map = scrambleMap(ANAGRAM.shuffled, ANAGRAM.word)
    expect([...map].sort((x, y) => x - y)).toEqual([...ANAGRAM.word].map((_, i) => i))
    map.forEach((j, i) => expect(ANAGRAM.word[j]).toBe(ANAGRAM.shuffled[i]))
  })
})
