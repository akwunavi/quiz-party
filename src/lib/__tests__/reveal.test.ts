import { describe, it, expect } from 'vitest'
import {
  revealStart, revealNext, revealSwitchAt, revealDeadline, revealVisibleIndices,
  revealGroups, revealLetterOpen, revealAllAnswered, revealPhaseSec,
  REVEAL_GRACE_MS, REVEAL_DEFAULTS,
} from '../reveal'
import type { RevealSettings } from '../../types/quiz'

describe('revealPhaseSec/revealStart', () => {
  it('использует дефолты, если настройки пустые', () => {
    expect(revealPhaseSec({}, 1, false)).toBe(REVEAL_DEFAULTS.p1Sec)
    expect(revealPhaseSec({}, 2, false)).toBe(REVEAL_DEFAULTS.p2Sec)
    expect(revealPhaseSec({}, 3, false)).toBe(REVEAL_DEFAULTS.p3Sec)
    expect(revealPhaseSec({}, 2, true)).toBe(REVEAL_DEFAULTS.shortSec)
    expect(revealPhaseSec({}, 3, true)).toBe(REVEAL_DEFAULTS.shortSec)
  })

  it('использует настройки раунда, если заданы', () => {
    const s: RevealSettings = { p1Sec: 40, p2Sec: 25, p3Sec: 15, shortSec: 5 }
    expect(revealPhaseSec(s, 1, false)).toBe(40)
    expect(revealPhaseSec(s, 2, false)).toBe(25)
    expect(revealPhaseSec(s, 3, true)).toBe(5)
  })

  it('revealStart стартует с фазы 1, не укорочена', () => {
    const rv = revealStart('q1', {}, 1000)
    expect(rv).toEqual({ qid: 'q1', phase: 1, startedAt: new Date(1000).toISOString(),
      phaseSec: REVEAL_DEFAULTS.p1Sec })
  })
})

describe('revealDeadline/revealSwitchAt', () => {
  it('дедлайн = startedAt + phaseSec', () => {
    const rv = revealStart('q1', {}, 0)
    expect(revealDeadline(rv)).toBe(REVEAL_DEFAULTS.p1Sec * 1000)
  })

  it('переключение = дедлайн + запас', () => {
    const rv = revealStart('q1', {}, 0)
    expect(revealSwitchAt(rv)).toBe(REVEAL_DEFAULTS.p1Sec * 1000 + REVEAL_GRACE_MS)
  })

  it('без фазы дедлайн 0', () => {
    expect(revealDeadline({})).toBe(0)
    expect(revealSwitchAt({})).toBe(0)
  })
})

describe('revealNext', () => {
  const s: RevealSettings = {}

  it('1→2 без allAnswered — фаза не укорочена', () => {
    const rv = revealStart('q1', s, 0)
    const next = revealNext(rv, s, false, 1000)
    expect(next.phase).toBe(2)
    expect(next.short).toBe(false)
    expect(next.phaseSec).toBe(REVEAL_DEFAULTS.p2Sec)
    expect(next.startedAt).toBe(new Date(1000).toISOString())
  })

  it('1→2 с allAnswered — фаза укорочена', () => {
    const rv = revealStart('q1', s, 0)
    const next = revealNext(rv, s, true, 1000)
    expect(next.short).toBe(true)
    expect(next.phaseSec).toBe(REVEAL_DEFAULTS.shortSec)
  })

  it('2→3 переносит short как было (allAnswered тут не учитывается)', () => {
    const rv = { qid: 'q1', phase: 2 as const, startedAt: new Date(0).toISOString(),
      phaseSec: REVEAL_DEFAULTS.shortSec, short: true }
    const next = revealNext(rv, s, false, 2000)
    expect(next.phase).toBe(3)
    expect(next.short).toBe(true)
    expect(next.phaseSec).toBe(REVEAL_DEFAULTS.shortSec)
  })

  it('2→3 без short остаётся полным временем фазы 3', () => {
    const rv = { qid: 'q1', phase: 2 as const, startedAt: new Date(0).toISOString(),
      phaseSec: REVEAL_DEFAULTS.p2Sec, short: false }
    const next = revealNext(rv, s, false, 2000)
    expect(next.phaseSec).toBe(REVEAL_DEFAULTS.p3Sec)
  })

  it('3→review сбрасывает startedAt/phaseSec', () => {
    const rv = { qid: 'q1', phase: 3 as const, startedAt: new Date(0).toISOString(),
      phaseSec: REVEAL_DEFAULTS.p3Sec }
    const next = revealNext(rv, s, false, 3000)
    expect(next.phase).toBe('review')
    expect(next.startedAt).toBeUndefined()
    expect(next.phaseSec).toBeUndefined()
  })

  it('review→review идемпотентно', () => {
    const rv = { qid: 'q1', phase: 'review' as const }
    expect(revealNext(rv, s, false)).toEqual(rv)
  })
})

describe('revealVisibleIndices', () => {
  it('фаза 1 — первые 2 картинки (или все, если их меньше)', () => {
    expect(revealVisibleIndices(4, 1)).toEqual([0, 1])
    expect(revealVisibleIndices(3, 1)).toEqual([0, 1])
    expect(revealVisibleIndices(2, 1)).toEqual([0, 1])
  })
  it('фаза 2 — заменяет фазу 1 третьей картинкой, если она есть', () => {
    expect(revealVisibleIndices(4, 2)).toEqual([2])
    expect(revealVisibleIndices(3, 2)).toEqual([2])
    expect(revealVisibleIndices(2, 2)).toEqual([0, 1])
  })
  it('фаза 3 — заменяет фазу 2 четвёртой картинкой, если она есть', () => {
    expect(revealVisibleIndices(4, 3)).toEqual([3])
    expect(revealVisibleIndices(3, 3)).toEqual([2])
    expect(revealVisibleIndices(2, 3)).toEqual([0, 1])
  })
  it('review — все картинки, что есть у вопроса', () => {
    expect(revealVisibleIndices(4, 'review')).toEqual([0, 1, 2, 3])
    expect(revealVisibleIndices(3, 'review')).toEqual([0, 1, 2])
    expect(revealVisibleIndices(2, 'review')).toEqual([0, 1])
  })
  it('никогда не показывает больше 2 картинок сразу в фазах 1-3', () => {
    for (const count of [2, 3, 4]) {
      for (const phase of [1, 2, 3] as const) {
        expect(revealVisibleIndices(count, phase).length).toBeLessThanOrEqual(2)
      }
    }
  })
})

describe('revealGroups', () => {
  it('слово с пробелом разбивается на группы по словам', () => {
    expect(revealGroups('Красная площадь')).toEqual([
      ['К', 'Р', 'А', 'С', 'Н', 'А', 'Я'],
      ['П', 'Л', 'О', 'Щ', 'А', 'Д', 'Ь'],
    ])
  })
  it('слово без пробела — одна группа', () => {
    expect(revealGroups('слово')).toEqual([['С', 'Л', 'О', 'В', 'О']])
  })
  it('пустое слово — пустой список групп', () => {
    expect(revealGroups('')).toEqual([])
  })
})

describe('revealLetterOpen', () => {
  it('review — всегда открыто, даже без индекса в open', () => {
    expect(revealLetterOpen(5, [], 'review')).toBe(true)
    expect(revealLetterOpen(5, undefined, 'review')).toBe(true)
  })
  it('на фазах 1-3 — только явно открытые индексы', () => {
    expect(revealLetterOpen(1, [1, 3], 1)).toBe(true)
    expect(revealLetterOpen(2, [1, 3], 1)).toBe(false)
    expect(revealLetterOpen(0, undefined, 2)).toBe(false)
  })
})

describe('revealAllAnswered', () => {
  it('пустой список команд — всегда false', () => {
    expect(revealAllAnswered([], [])).toBe(false)
  })
  it('есть команда без ответа — false', () => {
    expect(revealAllAnswered(['a', 'b'], [{ team_id: 'a', answer_text: 'x' }])).toBe(false)
  })
  it('пустой текст ответа не считается ответом', () => {
    expect(revealAllAnswered(['a'], [{ team_id: 'a', answer_text: '   ' }])).toBe(false)
  })
  it('все ответили непустым текстом — true', () => {
    expect(revealAllAnswered(['a', 'b'],
      [{ team_id: 'a', answer_text: 'x' }, { team_id: 'b', answer_text: 'y' }])).toBe(true)
  })
})
