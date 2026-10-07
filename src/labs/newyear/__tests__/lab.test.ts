// ═══ New Year Mockup Lab (Фаза 2): каркас и «замок» на игровую логику ═══
// Сама картинка проверяется рендером (HANDOFF §3cj). Здесь — то, что легко
// сломать незаметно: три мира на месте, у каждого описано каждое из 14
// состояний, данные демо-игры лежат в настоящих формах (пары, порядок,
// кроссворд, «Скрэмбл»), а таймер ведёт себя как components/Timer.tsx.
import { describe, it, expect } from 'vitest'
import { CONCEPTS } from '../concepts'
import { STATES } from '../game/states'
import { demoSpeed, timerAt } from '../game/timer'
import {
  BLITZ, CROSSWORD_GRID, JEOPARDY, MELODY, Q_MATCH, Q_ORDER, RULES_ROUNDS, SCRAMBLE, TEAMS,
} from '../game/data'
import { anagramQuestion } from '../../../lib/anagram'
import { rng } from '../engine/rng'
import { treeBox } from '../engine/tree'

describe('New Year Mockup Lab · Фаза 2', () => {
  it('ровно три мира — 2, 3, 4 (1 и 5 отклонены), id уникальны', () => {
    expect(CONCEPTS.map(c => c.meta.num)).toEqual([2, 3, 4])
    expect(CONCEPTS.map(c => c.kit.id)).toEqual(['popup', 'frost', 'home'])
    expect(new Set(CONCEPTS.map(c => c.meta.id)).size).toBe(3)
  })

  it('14 состояний подряд 01…14, у каждого есть описание «как в игре» и источник', () => {
    expect(STATES).toHaveLength(14)
    expect(STATES.map(s => s.n)).toEqual(Array.from({ length: 14 }, (_, i) => String(i + 1).padStart(2, '0')))
    expect(new Set(STATES.map(s => s.id)).size).toBe(14)
    for (const s of STATES) {
      expect(s.real.length, s.id).toBeGreaterThan(80)
      expect(s.src.length, s.id).toBeGreaterThan(5)
      expect(typeof s.C, s.id).toBe('function')
    }
  })

  it('каждый мир описал каждое состояние и все поля паспорта', () => {
    for (const c of CONCEPTS) {
      const m = c.meta
      expect(m.name.trim().length).toBeGreaterThan(2)
      for (const f of [m.tagline, m.idea, m.containers, m.media, m.options, m.timer, m.transitions, m.reveal, m.density, m.trees,
        m.hierarchy.primary, m.hierarchy.secondary, m.hierarchy.atmosphere]) {
        expect(f.trim().length, `${m.id}`).toBeGreaterThan(20)
      }
      for (const s of STATES) expect((m.states[s.id] ?? '').length, `${m.id}/${s.id}`).toBeGreaterThan(40)
      expect(Object.keys(m.states).sort()).toEqual(STATES.map(s => s.id).sort())
    }
  })

  it('тайминг перехода у каждого мира возрастает: out ≤ cover < in < done', () => {
    for (const c of CONCEPTS) {
      const t = c.kit.timing
      expect(t.out, c.meta.id).toBeLessThanOrEqual(t.cover)
      expect(t.cover).toBeLessThan(t.in)
      expect(t.in).toBeLessThan(t.done)
    }
  })

  it('сопоставление: пары 1…N → А…, подписи на каждую букву, ответ — перестановка', () => {
    const a = Q_MATCH.answer
    expect(a.mode).toBe('match')
    if (a.mode !== 'match') return
    expect(a.left).toEqual(a.left.map((_, i) => String(i + 1)))
    expect(a.right.length).toBe(a.left.length)
    expect(a.right_labels?.length).toBe(a.right.length)
    expect(Q_MATCH.media.length).toBe(a.left.length)
    expect(a.correct_pairs).toHaveLength(a.left.length)
    expect([...a.correct_pairs.map(p => p.slice(1))].sort()).toEqual([...a.right].sort())
  })

  it('порядок: 4 элемента по умолчанию, правильный порядок — те же буквы', () => {
    const a = Q_ORDER.answer
    expect(a.mode).toBe('order')
    if (a.mode !== 'order') return
    expect(a.choices).toHaveLength(4)
    expect(a.correct_order.split('').sort()).toEqual(a.choices.map(c => c.key).sort())
  })

  it('слайд правил повторяет продакшн: у «Своей игры» и мелодии «0 вопр.»', () => {
    const by = Object.fromEntries(RULES_ROUNDS.map(r => [r.name, r.count]))
    expect(by['Своя игра']).toBe(0)
    expect(by['Угадай мелодию']).toBe(0)
    expect(RULES_ROUNDS.filter(r => r.count > 0).length).toBeGreaterThanOrEqual(3)
  })

  it('кроссворд собран настоящим генератором: слов не меньше шести, у каждого номер', () => {
    expect(CROSSWORD_GRID.words.length).toBeGreaterThanOrEqual(6)
    expect(CROSSWORD_GRID.rows).toBeGreaterThan(5)
    expect(new Set(CROSSWORD_GRID.words.map(w => w.number)).size).toBe(CROSSWORD_GRID.words.length)
  })

  it('«Скрэмбл»: плитки — те же буквы, что во фразе, клеток столько же', () => {
    const { letters, tiles, template } = anagramQuestion(SCRAMBLE.answer.phrase, SCRAMBLE.answer.order)
    expect([...tiles].sort()).toEqual([...letters].sort())
    const cells = template.words.flat().filter(c => c.kind !== 'fixed').length
    expect(cells).toBe(letters.length)
  })

  it('«Своя игра» 5×5, мелодия — выбранный трек свободен; блиц — команды из состава', () => {
    expect(JEOPARDY.themes).toHaveLength(5)
    for (const t of JEOPARDY.themes) expect(t.tiles).toHaveLength(5)
    expect(MELODY.played).not.toContain(MELODY.pick)
    const ids = new Set(TEAMS.map(t => t.id))
    for (const id of BLITZ.order) expect(ids.has(id)).toBe(true)
    expect(TEAMS.some(t => !t.alive)).toBe(true)     // отвалившаяся команда в лобби, как в игре
  })

  it('таймер как Timer.tsx: целые секунды вверх, «мало» с 10, ноль — в конце', () => {
    expect(timerAt(30, 0, 1, true).left).toBe(30)
    expect(timerAt(30, 0.2, 1, true).left).toBe(30)
    expect(timerAt(30, 0.2, 1, true).low).toBe(false)
    expect(timerAt(30, 20, 1, true).left).toBe(10)
    expect(timerAt(30, 20, 1, true).low).toBe(true)
    expect(timerAt(30, 29.5, 1, true).left).toBe(1)
    const z = timerAt(30, 31, 1, true)
    expect(z.left).toBe(0); expect(z.zero).toBe(true); expect(z.running).toBe(false)
    expect(demoSpeed(30)).toBeGreaterThan(1)
    expect(demoSpeed(5)).toBe(1)
  })

  it('генератор зёрен детерминирован, а ель имеет положительные размеры', () => {
    const a = rng(7), b = rng(7)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
    const box = treeBox({ height: 300, spread: 0.33, trunk: 0.05 })
    expect(box.w).toBeGreaterThan(0); expect(box.h).toBeGreaterThan(0)
  })
})
