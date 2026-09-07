import { describe, it, expect } from 'vitest'
import {
  melodySpin, melodyPlaySnippet, melodyAcceptAnswer, melodyClose, melodyPass,
  melodyReveal, melodyToBoard, melodyPoints, melodyIdle, melodyFree, melodyKeys,
  melodyDeadline,
} from '../melody'
import type { MelodyState } from '../../types/quiz'

const themes = [{ tracks: [0, 1, 2] }, { tracks: [0, 1] }]
const T0 = Date.parse('2026-09-07T20:00:00.000Z')

describe('мелодия: доска', () => {
  it('ключи идут «тема-трек» по всем темам', () => {
    expect(melodyKeys(themes)).toEqual(['0-0', '0-1', '0-2', '1-0', '1-1'])
  })

  it('отыгранные ключи из свободных выпадают', () => {
    expect(melodyFree(themes, ['0-1', '1-0'])).toEqual(['0-0', '0-2', '1-1'])
  })

  it('доска активна на пустом состоянии, idle и done', () => {
    expect(melodyIdle({})).toBe(true)
    expect(melodyIdle({ stage: 'idle' })).toBe(true)
    expect(melodyIdle({ stage: 'done' })).toBe(true)
    expect(melodyIdle({ stage: 'bidding' })).toBe(false)
    expect(melodyIdle({ stage: 'reveal' })).toBe(false)
  })
})

describe('мелодия: рулетка', () => {
  it('несколько свободных треков — крутим барабан', () => {
    const n = melodySpin({ played: ['0-0'] }, '1-1', 4, 5, T0)
    expect(n.stage).toBe('spinning')
    expect(n.key).toBe('1-1')
    expect(n.deadline).toBe(melodyDeadline(5, T0))
  })

  it('свободна одна плитка — крутить нечего, открываем сразу', () => {
    const n = melodySpin({}, '1-1', 1, 5, T0)
    expect(n.stage).toBe('listen')
    expect(n.deadline).toBe(melodyDeadline(3, T0))
  })

  it('барабан не крутится дольше восьми секунд', () => {
    const n = melodySpin({}, '0-0', 5, 30, T0)
    expect(n.deadline).toBe(melodyDeadline(8, T0))
  })

  it('очередь прошлого трека сбрасывается', () => {
    const n = melodySpin({ order: ['a', 'b'], turn: 1, chooser: 'a' }, '0-0', 3, 5, T0)
    expect(n.order).toBeUndefined()
    expect(n.turn).toBe(0)
    expect(n.chooser).toBeUndefined()
  })
})

describe('мелодия: ход трека', () => {
  it('ставка уходит в snippetSec, без ставки — пять секунд', () => {
    expect(melodyPlaySnippet({ stage: 'bids' }, 4).snippetSec).toBe(4)
    expect(melodyPlaySnippet({ stage: 'bids' }, 0).snippetSec).toBe(5)
    expect(melodyPlaySnippet({ stage: 'bids' }, 4).deadline).toBeUndefined()
  })

  it('приём ответа ставит окно на answerSec', () => {
    const n = melodyAcceptAnswer({ stage: 'snippet' }, 30, T0)
    expect(n.stage).toBe('answering')
    expect(n.deadline).toBe(melodyDeadline(30, T0))
  })
})

describe('мелодия: закрытие трека', () => {
  const base: MelodyState = { key: '0-2', stage: 'bids', played: ['0-0'], deadline: 'x' }

  it('закрытие уводит трек в отыгранные и снимает дедлайн', () => {
    const n = melodyClose(base)
    expect(n.stage).toBe('done')
    expect(n.played).toEqual(['0-0', '0-2'])
    expect(n.deadline).toBeUndefined()
  })

  it('повторное закрытие не задваивает ключ', () => {
    expect(melodyClose(melodyClose(base)).played).toEqual(['0-0', '0-2'])
  })

  it('без выбранного трека список отыгранных не меняется', () => {
    expect(melodyClose({ played: ['0-0'] }).played).toEqual(['0-0'])
  })
})

describe('мелодия: передача хода', () => {
  it('первая команда промахнулась, есть вторая — ход уходит ей', () => {
    const n = melodyPass({ key: '0-1', stage: 'answering', order: ['a', 'b'], turn: 0 })
    expect(n.stage).toBe('passed')
    expect(n.turn).toBe(1)
  })

  it('промахнулась вторая — трек закрывается', () => {
    const n = melodyPass({ key: '0-1', stage: 'passed', order: ['a', 'b'], turn: 1 })
    expect(n.stage).toBe('done')
    expect(n.played).toEqual(['0-1'])
  })

  it('передавать некому (одна команда) — трек закрывается', () => {
    const n = melodyPass({ key: '0-1', stage: 'answering', order: ['a'], turn: 0 })
    expect(n.stage).toBe('done')
  })
})

describe('мелодия: очки и результат', () => {
  it('быстрая ставка дороже медленной, передача хода — половина балла', () => {
    expect(melodyPoints(2, true)).toBe(2)
    expect(melodyPoints(5, true)).toBe(2)
    expect(melodyPoints(6, true)).toBe(1)
    expect(melodyPoints(10, true)).toBe(1)
    expect(melodyPoints(3, false)).toBe(0.5)
  })

  it('reveal закрывает трек как отыгранный и помнит, кто забрал', () => {
    const n = melodyReveal({ key: '1-0', stage: 'answering', played: [] }, 2, 'team-1')
    expect(n.stage).toBe('reveal')
    expect(n.played).toEqual(['1-0'])
    expect(n.wonPts).toBe(2)
    expect(n.wonTeam).toBe('team-1')
  })

  it('с экрана результата возвращаемся к доске, не трогая отыгранные', () => {
    const n = melodyToBoard({ key: '1-0', stage: 'reveal', played: ['1-0'] })
    expect(n.stage).toBe('done')
    expect(n.played).toEqual(['1-0'])
  })
})
