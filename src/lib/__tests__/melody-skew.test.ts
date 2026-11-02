// ADM-03 (10.27): дедлайн стадии мелодии записан часами пульта, читается часами проектора.
import { describe, it, expect } from 'vitest'
import { melodyRebaseDeadline, melodyStageMaxSec } from '../melody'

const NOW = 1_700_000_000_000

describe('melodyRebaseDeadline — сдвиг часов между пультом и проектором', () => {
  it('часы в норме — дедлайн не трогаем', () => {
    expect(melodyRebaseDeadline(NOW + 5000, NOW, 5, true)).toBe(NOW + 5000)
    expect(melodyRebaseDeadline(NOW + 5000, NOW, 5, false)).toBe(NOW + 5000)
  })
  it('часы телефона убежали вперёд на минуту — рулетка длится положенные 5 с, а не 65', () => {
    expect(melodyRebaseDeadline(NOW + 65_000, NOW, 5, false)).toBe(NOW + 5000)
  })
  it('часы телефона отстали на минуту, стадия возникла на глазах — не кончается мгновенно', () => {
    expect(melodyRebaseDeadline(NOW - 55_000, NOW, 5, true)).toBe(NOW + 5000)
  })
  it('экран открыт посреди стадии, дедлайн давно прошёл — это обычный перезапуск, не трогаем', () => {
    expect(melodyRebaseDeadline(NOW - 55_000, NOW, 5, false)).toBe(NOW - 55_000)
  })
  it('допуск на опрос раз в 2 с: дедлайн «уже на 3 с в прошлом» при живом переходе не считается сдвигом', () => {
    expect(melodyRebaseDeadline(NOW - 3000, NOW, 5, true)).toBe(NOW - 3000)
  })
})

describe('melodyStageMaxSec', () => {
  it('берёт длительность из записанного барабана и настроек раунда', () => {
    expect(melodyStageMaxSec({ stage: 'spinning', spinMs: 6000 }, {})).toBe(6)
    expect(melodyStageMaxSec({ stage: 'listen' }, {})).toBe(3)
    expect(melodyStageMaxSec({ stage: 'bidding' }, { bidSec: 12 })).toBe(12)
    expect(melodyStageMaxSec({ stage: 'answering' }, {})).toBe(30)
    expect(melodyStageMaxSec({ stage: 'passed' }, { passAnswerSec: 8 })).toBe(8)
    expect(melodyStageMaxSec({ stage: 'bids' }, {})).toBeNull()
  })
})
