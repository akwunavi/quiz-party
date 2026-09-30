import { describe, expect, it } from 'vitest'
import { previewAnswers, previewGameState, previewStages, previewTeams } from '../previewState'
import { anagramHintsOpen, anagramWinner, anagramElapsedMs } from '../anagram'
import type { LoadedPack, LoadedRound } from '../packLoader'
import type { MechanicKey } from '../../types/quiz'

const ALL_MECHANICS: MechanicKey[] = [
  'standard', 'test_stop', 'rebus', 'jeopardy', 'stakes_unique', 'stakes_free',
  'thematic_x2', 'crossword', 'sprint', 'melody', 'race', 'blitz', 'four_pics', 'anagram',
]

function fakeRound(mechanic: MechanicKey, over: Partial<LoadedRound> = {}): LoadedRound {
  return {
    id: 'r1', pack_id: 'p1', position: 1, mechanic,
    title_lines: ['Раунд'], rules: [], rules_audio: null,
    timer_seconds: 30, settings: {}, off_scoreboard: false,
    answers_reveal: 'after_round', meta_line_override: null, status: 'ready',
    questions: [], ...over,
  } as LoadedRound
}

function fakePack(rounds: LoadedRound[]): LoadedPack {
  return { id: 'p1', name: 'Тест', theme: 'classic', status: 'ready', settings: {}, rounds } as LoadedPack
}

describe('previewGameState', () => {
  it('всегда game_id пустой и таймер не запущен — вторая линия обороны от сети/записи в живую сессию', () => {
    const round = fakeRound('standard')
    const pack = fakePack([round])
    const gs = previewGameState(pack, round, 0, 0)
    expect(gs.game_id).toBe('')
    expect(gs.timer_started_at).toBeNull()
  })
})

describe('previewStages', () => {
  it('непустой список для КАЖДОЙ механики — забытая здесь новая механика ловится тестом', () => {
    for (const mech of ALL_MECHANICS) {
      expect(previewStages(mech).length).toBeGreaterThan(0)
    }
  })

  it('MechanicKey из типов не разъехался со списком в тесте (сверка на будущее)', () => {
    expect(ALL_MECHANICS.length).toBe(14)
  })
})

describe('previewGameState: four_pics', () => {
  it('qid и phase соответствуют выбранной стадии', () => {
    const round = fakeRound('four_pics', {
      questions: [{ id: 'q1' } as LoadedRound['questions'][number]],
    })
    const pack = fakePack([round])
    const gs = previewGameState(pack, round, 0, 0, 'phase2')
    expect(gs.melody?.rv?.qid).toBe('q1')
    expect(gs.melody?.rv?.phase).toBe(2)
  })
})

describe('previewGameState: jeopardy', () => {
  it('стадия «плитка открыта» даёт jp.tile === 0', () => {
    const round = fakeRound('jeopardy')
    const pack = fakePack([round])
    const gs = previewGameState(pack, round, 0, 0, 'tile')
    expect(gs.melody?.jp?.tile).toBe(0)
  })

  it('стадия «доска» — плитка закрыта', () => {
    const round = fakeRound('jeopardy')
    const pack = fakePack([round])
    const gs = previewGameState(pack, round, 0, 0, 'board')
    expect(gs.melody?.jp?.tile).toBeNull()
  })
})

describe('previewTeams', () => {
  it('ровно 4 команды по умолчанию (Р2 — без переключателя числа команд)', () => {
    expect(previewTeams()).toHaveLength(4)
  })
})

describe('предпросмотр «Скрэмбла»', () => {
  const q = { id: 'q1', answer: { mode: 'anagram', phrase: 'ПРИВЕТ', order: [1, 0, 3, 2, 5, 4] } }
  const round = fakeRound('anagram', { timer_seconds: 30, settings: { hintIntervalSec: 10 } as never,
    questions: [q] as never })
  const pack = fakePack([round])

  it('стадии: вопрос / подсказки / ответ; на «подсказках» открыты ровно 2 буквы', () => {
    expect(previewStages('anagram').map(x => x.key)).toEqual(['question', 'hints', 'answer'])
    expect(previewGameState(pack, round, 0, 0, 'question').timer_started_at).toBeNull()
    const gs = previewGameState(pack, round, 0, 0, 'hints')
    expect(gs.game_id).toBe('')
    expect(gs.reveal).toBe(false)
    expect(anagramHintsOpen({ nowMs: Date.now(), startedAtIso: gs.timer_started_at,
      intervalSec: 10, timerSec: 30, maxHints: 4 })).toBe(2)
  })

  it('на «ответе» — reveal, таймер истёк, победитель гонки — первая команда за 00:07.482', () => {
    const gs = previewGameState(pack, round, 0, 0, 'answer')
    expect(gs.reveal).toBe(true)
    expect(Date.now() - Date.parse(gs.timer_started_at!)).toBeGreaterThan(30_000)
    const teams = previewTeams()
    const answers = previewAnswers(round, 0, 'answer', teams)
    expect(anagramWinner(answers, 'ПРИВЕТ')).toBe(teams[0].id)
    const w = answers.find(a => a.team_id === teams[0].id)!
    expect(Math.round(anagramElapsedMs(w, gs.timer_started_at))).toBeGreaterThanOrEqual(7470)
    expect(Math.round(anagramElapsedMs(w, gs.timer_started_at))).toBeLessThanOrEqual(7500)
  })
})
