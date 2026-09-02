import { describe, it, expect } from 'vitest'
import { estimateRoundMinutes, packStats } from '../duration'

const round = (n: number, timer: number, reveal = 'after_question') => ({
  mechanic: 'standard' as const,
  questions: Array.from({ length: n }, () => ({ hidden: false })),
  timer_seconds: timer, answers_reveal: reveal,
})

describe('estimateRoundMinutes — standard и родственные механики (формула не менялась)', () => {
  it('пустой раунд — ноль', () => {
    expect(estimateRoundMinutes(round(0, 45))).toBe(0)
  })

  it('12 вопросов по 45 сек — около 14 минут', () => {
    const m = estimateRoundMinutes(round(12, 45))
    expect(m).toBeGreaterThanOrEqual(12)
    expect(m).toBeLessThanOrEqual(16)
  })

  it('скрытые вопросы не считаются', () => {
    const r = { ...round(6, 45) }
    r.questions = [...r.questions, { hidden: true }, { hidden: true }]
    expect(estimateRoundMinutes(r)).toBe(estimateRoundMinutes(round(6, 45)))
  })

  it('без показа ответов раунд короче', () => {
    expect(estimateRoundMinutes(round(10, 45, 'never')))
      .toBeLessThan(estimateRoundMinutes(round(10, 45, 'after_question')))
  })

  it('длинный таймер удлиняет раунд', () => {
    expect(estimateRoundMinutes(round(10, 90)))
      .toBeGreaterThan(estimateRoundMinutes(round(10, 30)))
  })
})

describe('estimateRoundMinutes — race (ставка + забег, не число вопросов)', () => {
  it('не зависит от round.questions, считает по betSec+raceSec', () => {
    const r = { mechanic: 'race' as const, questions: [], timer_seconds: 45,
      settings: { betSec: 30, raceSec: 18 } }
    const m = estimateRoundMinutes(r)
    expect(m).toBeGreaterThan(0)
  })

  it('длиннее ставка/забег — длиннее раунд', () => {
    const short = estimateRoundMinutes({ mechanic: 'race' as const, questions: [],
      timer_seconds: 45, settings: { betSec: 10, raceSec: 10 } })
    const long = estimateRoundMinutes({ mechanic: 'race' as const, questions: [],
      timer_seconds: 45, settings: { betSec: 60, raceSec: 60 } })
    expect(long).toBeGreaterThan(short)
  })
})

describe('estimateRoundMinutes — jeopardy (по числу плиток, не round.questions)', () => {
  it('пустые questions — раунд всё равно не ноль, если есть плитки', () => {
    const r = { mechanic: 'jeopardy' as const, questions: [], timer_seconds: 45,
      settings: { themes: [{ name: 'т', tiles: [
        { value: 10, audio: '', correct: '' }, { value: 20, audio: '', correct: '' },
      ] }] } }
    expect(estimateRoundMinutes(r)).toBeGreaterThan(0)
  })

  it('без плиток — ноль', () => {
    const r = { mechanic: 'jeopardy' as const, questions: [], timer_seconds: 45,
      settings: { themes: [] } }
    expect(estimateRoundMinutes(r)).toBe(0)
  })

  it('больше плиток — дольше', () => {
    const few = estimateRoundMinutes({ mechanic: 'jeopardy' as const, questions: [],
      timer_seconds: 45, settings: { themes: [{ name: 'т',
        tiles: [{ value: 10, audio: '', correct: '' }] }] } })
    const many = estimateRoundMinutes({ mechanic: 'jeopardy' as const, questions: [],
      timer_seconds: 45, settings: { themes: [{ name: 'т',
        tiles: Array.from({ length: 10 }, () => ({ value: 10, audio: '', correct: '' })) }] } })
    expect(many).toBeGreaterThan(few)
  })
})

describe('estimateRoundMinutes — melody (по числу треков, не round.questions)', () => {
  it('пустые questions — раунд всё равно не ноль, если есть треки', () => {
    const r = { mechanic: 'melody' as const, questions: [], timer_seconds: 45,
      settings: { themes: [{ name: 'т', tracks: [
        { audio: '', correct: '' }, { audio: '', correct: '' },
      ] }] } }
    expect(estimateRoundMinutes(r)).toBeGreaterThan(0)
  })

  it('без треков — ноль', () => {
    const r = { mechanic: 'melody' as const, questions: [], timer_seconds: 45,
      settings: { themes: [] } }
    expect(estimateRoundMinutes(r)).toBe(0)
  })

  it('больше треков — дольше', () => {
    const few = estimateRoundMinutes({ mechanic: 'melody' as const, questions: [],
      timer_seconds: 45, settings: { themes: [{ name: 'т',
        tracks: [{ audio: '', correct: '' }] }] } })
    const many = estimateRoundMinutes({ mechanic: 'melody' as const, questions: [],
      timer_seconds: 45, settings: { themes: [{ name: 'т',
        tracks: Array.from({ length: 10 }, () => ({ audio: '', correct: '' })) }] } })
    expect(many).toBeGreaterThan(few)
  })
})

describe('estimateRoundMinutes — blitz (по числу команд × время хода, не по банку вопросов)', () => {
  it('банк из сотен вопросов не раздувает время — считается по teamCount', () => {
    const r = { mechanic: 'blitz' as const,
      questions: Array.from({ length: 300 }, () => ({ hidden: false })),
      timer_seconds: 45, settings: { teamSeconds: 60 } }
    const m = estimateRoundMinutes(r, 6)
    // 6 команд * 60 сек + intro(40) ~= 400 сек ~= 7 минут, не десятки минут
    expect(m).toBeLessThan(15)
  })

  it('больше команд — дольше', () => {
    const r = { mechanic: 'blitz' as const, questions: [], timer_seconds: 45,
      settings: { teamSeconds: 60 } }
    expect(estimateRoundMinutes(r, 8)).toBeGreaterThan(estimateRoundMinutes(r, 3))
  })

  it('без teamCount — используется дефолт (6 команд)', () => {
    const r = { mechanic: 'blitz' as const, questions: [], timer_seconds: 45,
      settings: { teamSeconds: 60 } }
    expect(estimateRoundMinutes(r)).toBe(estimateRoundMinutes(r, 6))
  })
})

describe('packStats', () => {
  const standardRound = (n: number) => ({
    mechanic: 'standard' as const,
    questions: Array.from({ length: n }, () => ({ hidden: false })),
    timer_seconds: 45, answers_reveal: 'after_question', settings: {},
  })

  it('questionsCount игнорирует race/jeopardy/melody, но не blitz', () => {
    const pack = {
      rounds: [
        standardRound(5),
        { mechanic: 'race' as const, questions: [{ hidden: false }, { hidden: false }],
          timer_seconds: 45, settings: {} },
        { mechanic: 'jeopardy' as const, questions: [{ hidden: false }],
          timer_seconds: 45, settings: { themes: [] } },
        { mechanic: 'melody' as const, questions: [{ hidden: false }],
          timer_seconds: 45, settings: { themes: [] } },
        { mechanic: 'blitz' as const,
          questions: Array.from({ length: 40 }, () => ({ hidden: false })),
          timer_seconds: 45, settings: {} },
      ],
    }
    expect(packStats(pack).questionsCount).toBe(5 + 40)
  })

  it('hasMiniGame true только при наличии race', () => {
    expect(packStats({ rounds: [standardRound(3)] }).hasMiniGame).toBe(false)
    expect(packStats({ rounds: [standardRound(3),
      { mechanic: 'race' as const, questions: [], timer_seconds: 45, settings: {} }] })
      .hasMiniGame).toBe(true)
  })

  it('musicTracks суммирует jeopardy и melody вместе', () => {
    const pack = {
      rounds: [
        { mechanic: 'jeopardy' as const, questions: [], timer_seconds: 45,
          settings: { themes: [{ name: 'т', tiles: [
            { value: 10, audio: '', correct: '' }, { value: 20, audio: '', correct: '' },
          ] }] } },
        { mechanic: 'melody' as const, questions: [], timer_seconds: 45,
          settings: { themes: [{ name: 'т', tracks: [{ audio: '', correct: '' }] }] } },
      ],
    }
    expect(packStats(pack).musicTracks).toBe(3)
  })

  it('totalMinutes растёт с добавлением раунда', () => {
    const one = packStats({ rounds: [standardRound(10)] }).totalMinutes
    const two = packStats({ rounds: [standardRound(10), standardRound(10)] }).totalMinutes
    expect(two).toBeGreaterThan(one)
  })

  it('roundsCount не фильтрует по off_scoreboard', () => {
    const pack = { rounds: [standardRound(1), { ...standardRound(1), off_scoreboard: true }] }
    expect(packStats(pack).roundsCount).toBe(2)
  })
})
