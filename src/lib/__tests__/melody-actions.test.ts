import { describe, it, expect } from 'vitest'
import {
  melodySpin, melodyPick, melodyPlaySnippet, melodyAcceptAnswer, melodyClose, melodyPass,
  melodyReveal, melodyToBoard, melodyPoints, melodyIdle, melodyFree, melodyKeys,
  melodyDeadline, melodyPreviewCeiling, melodyRandomStart,
  melodyMatches, guardMelody, melodyOrderFromBids, melodyBidSec,
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
    const n = melodySpin({ played: ['0-0'] }, '1-1', 4, 5, 30, T0)
    expect(n.stage).toBe('spinning')
    expect(n.key).toBe('1-1')
    expect(n.deadline).toBe(melodyDeadline(5, T0))
  })

  it('свободна одна плитка — крутить нечего, открываем сразу', () => {
    const n = melodySpin({}, '1-1', 1, 5, 30, T0)
    expect(n.stage).toBe('listen')
    expect(n.deadline).toBe(melodyDeadline(3, T0))
  })

  it('барабан не крутится дольше восьми секунд', () => {
    const n = melodySpin({}, '0-0', 5, 30, 30, T0)
    expect(n.deadline).toBe(melodyDeadline(8, T0))
  })

  it('очередь прошлого трека сбрасывается', () => {
    const n = melodySpin({ order: ['a', 'b'], turn: 1, chooser: 'a' }, '0-0', 3, 5, 30, T0)
    expect(n.order).toBeUndefined()
    expect(n.turn).toBe(0)
    expect(n.chooser).toBeUndefined()
  })

  it('выбирает случайную точку старта в пределах melodyPreviewCeiling(trackSec)', () => {
    for (let i = 0; i < 50; i++) {
      const n = melodySpin({}, '0-0', 5, 5, 30, T0)
      expect(n.startSec).toBeGreaterThanOrEqual(0)
      expect(n.startSec).toBeLessThanOrEqual(20) // 30 − максимальная ставка (10)
    }
  })
})

describe('мелодия: ручной выбор плитки (Р2)', () => {
  it('открывает трек сразу в listen со случайной точкой старта', () => {
    const n = melodyPick({ order: ['a'], turn: 1, chooser: 'x' }, '1-0', 30, T0)
    expect(n.stage).toBe('listen')
    expect(n.key).toBe('1-0')
    expect(n.deadline).toBe(melodyDeadline(3, T0))
    expect(n.order).toBeUndefined()
    expect(n.turn).toBe(0)
    expect(n.chooser).toBeUndefined()
    expect(n.startSec).toBeGreaterThanOrEqual(0)
    expect(n.startSec).toBeLessThanOrEqual(20)
  })
})

describe('мелодия: окно случайного старта отрывка', () => {
  it('номинальные 30 секунд трека → потолок 20 (запас под ставку до 10 сек)', () => {
    expect(melodyPreviewCeiling(30)).toBe(20)
  })

  it('короче номинала (реальная длительность известна) → потолок ужимается', () => {
    expect(melodyPreviewCeiling(30, 22)).toBe(12)
  })

  it('длиннее номинала — не даём потолку вырасти сверх настройки раунда', () => {
    expect(melodyPreviewCeiling(30, 90)).toBe(20)
  })

  it('трек короче максимальной ставки — потолок не уходит в минус', () => {
    expect(melodyPreviewCeiling(8)).toBe(0)
    expect(melodyPreviewCeiling(30, 4)).toBe(0)
  })

  it('без реальной длительности (undefined/0/NaN) — доверяем номиналу', () => {
    expect(melodyPreviewCeiling(30, 0)).toBe(20)
    expect(melodyPreviewCeiling(30, undefined)).toBe(20)
  })

  it('melodyRandomStart не выходит за потолок и не уходит в минус', () => {
    for (let i = 0; i < 50; i++) {
      const r = melodyRandomStart(20)
      expect(r).toBeGreaterThanOrEqual(0)
      expect(r).toBeLessThan(20)
    }
    expect(melodyRandomStart(0)).toBe(0)
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

// ═══ 9.61 (HANDOFF §3bw): условия для CAS-записи (lib/sessionBag.ts) ═══
describe('мелодия: melodyMatches/guardMelody (условия для CAS)', () => {
  it('совпадает: тот же key и стадия входит в список ожидаемых', () => {
    const cur: MelodyState = { key: '0-1', stage: 'bids', turn: 0 }
    expect(melodyMatches(cur, { key: '0-1', stage: 'bids' })).toBe(true)
    expect(melodyMatches(cur, { key: '0-1', stage: ['bidding', 'bids'] })).toBe(true)
  })

  it('не совпадает: другой key, другая стадия или другой turn', () => {
    const cur: MelodyState = { key: '0-1', stage: 'bids', turn: 1 }
    expect(melodyMatches(cur, { key: '0-2', stage: 'bids' })).toBe(false)
    expect(melodyMatches(cur, { key: '0-1', stage: 'snippet' })).toBe(false)
    expect(melodyMatches(cur, { key: '0-1', stage: 'bids', turn: 0 })).toBe(false)
  })

  it('guardMelody: пишет только когда условие держится, иначе null (не откатывает)', () => {
    const fn = guardMelody({ key: '0-1', stage: 'bids' }, cur => ({ ...cur, stage: 'snippet' }))
    expect(fn({ key: '0-1', stage: 'bids' })?.stage).toBe('snippet')
    // кто-то уже увёл игру дальше — не пишем, не откатываем на bids
    expect(fn({ key: '0-1', stage: 'snippet' })).toBeNull()
    expect(fn({ key: '0-2', stage: 'bids' })).toBeNull()
  })

  it('guardMelody идемпотентен, если переход-функция идемпотентна: повторный вызов ' +
    'на уже применённом состоянии не пишет снова', () => {
    // условие проверяет 'bids' — как только применили переход (стадия стала
    // 'snippet'), условие больше не совпадает, повтор возвращает null
    const fn = guardMelody({ key: '0-1', stage: 'bids' }, cur => ({ ...cur, stage: 'snippet' }))
    const once = fn({ key: '0-1', stage: 'bids' })
    expect(once).not.toBeNull()
    expect(fn(once!)).toBeNull()
  })
})

describe('мелодия: melodyOrderFromBids', () => {
  it('меньшая ставка играет раньше', () => {
    const bids = [
      { team_id: 'a', answer_text: '8', updated_at: 't1' },
      { team_id: 'b', answer_text: '3', updated_at: 't2' },
    ]
    expect(melodyOrderFromBids(bids, ['a', 'b'])).toEqual(['b', 'a'])
  })

  it('при равенстве секунд решает время ставки (кто раньше поставил)', () => {
    const bids = [
      { team_id: 'a', answer_text: '5', updated_at: '2026-01-01T00:00:02.000Z' },
      { team_id: 'b', answer_text: '5', updated_at: '2026-01-01T00:00:01.000Z' },
    ]
    expect(melodyOrderFromBids(bids, ['a', 'b'])).toEqual(['b', 'a'])
  })

  it('команды без ставки уходят в конец очереди, не выпадают совсем', () => {
    const bids = [{ team_id: 'a', answer_text: '4', updated_at: 't1' }]
    expect(melodyOrderFromBids(bids, ['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
  })
})

describe('мелодия: melodyBidSec — секунды по ставке ТЕКУЩЕГО (турна) в order', () => {
  it('берёт ставку команды на позиции m.turn в m.order', () => {
    const bids = [
      { team_id: 'a', answer_text: '7' },
      { team_id: 'b', answer_text: '4' },
    ]
    expect(melodyBidSec(bids, { order: ['b', 'a'], turn: 0 })).toBe(4)
    expect(melodyBidSec(bids, { order: ['b', 'a'], turn: 1 })).toBe(7)
  })

  it('нет ставки/нет текущей команды — 0', () => {
    expect(melodyBidSec([], { order: [], turn: 0 })).toBe(0)
  })
})
