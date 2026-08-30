import { describe, it, expect } from 'vitest'
import { blitzResults, rawPoints, type BlitzTeamState } from '../blitz'
import { computeTotals, computeRoundScores } from '../totals'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team } from '../../types/quiz'

// Правила блица легко перепутать: очки и баллы — разные величины, штраф
// применяется ДО распределения мест, а места делятся плотно. Тесты
// фиксируют ровно те случаи, которые проговаривались словами.

const t = (teamId: string, correct: number, missed = 0, timedOut = false): BlitzTeamState =>
  ({ teamId, correct, missed, timedOut })

describe('блиц: очки', () => {
  it('верный +1, скип и три ошибки −1', () => {
    expect(rawPoints(t('a', 12, 4))).toBe(8)
  })
  it('очки могут уйти в минус', () => {
    expect(rawPoints(t('a', 1, 5))).toBe(-4)
  })
})

describe('блиц: штраф и места', () => {
  it('пример из обсуждения: лидер с 18 теряет 10 и падает на 4 место', () => {
    const rows = blitzResults([
      t('a', 18, 0, true),   // 18 → 8 после штрафа
      t('b', 16), t('c', 10), t('d', 9),
    ])
    const a = rows.find(r => r.teamId === 'a')!
    expect(a.raw).toBe(18)
    expect(a.points).toBe(8)
    expect(a.place).toBe(4)
    expect(a.score).toBe(3)
    expect(rows.find(r => r.teamId === 'b')!.score).toBe(10)
    expect(rows.find(r => r.teamId === 'c')!.score).toBe(7)
    expect(rows.find(r => r.teamId === 'd')!.score).toBe(5)
  })

  it('три равных первых места: 10, 10, 10 и 7 у следующей', () => {
    const rows = blitzResults([t('a', 10), t('b', 10), t('c', 10), t('d', 7)])
    expect(rows.filter(r => r.score === 10)).toHaveLength(3)
    expect(rows.find(r => r.teamId === 'd')!.place).toBe(2)
    expect(rows.find(r => r.teamId === 'd')!.score).toBe(7)
  })

  it('пятая и дальше команды получают по 3 балла', () => {
    const rows = blitzResults([t('a', 9), t('b', 8), t('c', 7), t('d', 6), t('e', 5)])
    expect(rows.find(r => r.teamId === 'd')!.score).toBe(3)
    expect(rows.find(r => r.teamId === 'e')!.score).toBe(3)
  })

  it('без таймаута штрафа нет ни у кого — вопросы просто кончились', () => {
    const rows = blitzResults([t('a', 12), t('b', 5)])
    expect(rows.every(r => r.points === r.raw)).toBe(true)
  })

  it('штраф применяется ДО мест, а не после', () => {
    // если бы штраф вычитали из БАЛЛОВ, команда 'a' осталась бы первой
    const rows = blitzResults([t('a', 15, 0, true), t('b', 6)])
    expect(rows.find(r => r.teamId === 'a')!.place).toBe(2)
    expect(rows.find(r => r.teamId === 'b')!.place).toBe(1)
  })

  it('штраф может увести в минус, место всё равно последнее', () => {
    const rows = blitzResults([t('a', 3, 0, true), t('b', 2)])
    expect(rows.find(r => r.teamId === 'a')!.points).toBe(-7)
    expect(rows.find(r => r.teamId === 'a')!.place).toBe(2)
  })
})

describe('блиц: штраф настраивается', () => {
  it('свой размер штрафа меняет расстановку', () => {
    // 15 очков против 13. Штраф 10 → 5, лидер падает на второе место.
    // Штраф 1 → 14, лидер остаётся первым. Цифра решает исход.
    const teams = [t('a', 15, 0, true), t('b', 13)]
    expect(blitzResults(teams, 10).find(r => r.teamId === 'a')!.place).toBe(2)
    expect(blitzResults(teams, 1).find(r => r.teamId === 'a')!.place).toBe(1)
  })

  it('ноль — допустимая настройка: штрафа нет', () => {
    const rows = blitzResults([t('a', 15, 0, true), t('b', 13)], 0)
    expect(rows.find(r => r.teamId === 'a')!.points).toBe(15)
    expect(rows.find(r => r.teamId === 'a')!.place).toBe(1)
  })

  it('отрицательный штраф трактуется как ноль, а не как бонус', () => {
    const rows = blitzResults([t('a', 5, 0, true)], -7)
    expect(rows[0].points).toBe(5)
  })
})

// ── Итоги блица в общем зачёте ──────────────────────────────────────────
// Очки раунда живут отдельно от answers, поэтому пульт кладёт готовые
// БАЛЛЫ за место строкой `q-blitz`. Эти тесты держат договор между
// пультом и общим подсчётом: поменяешь ключ или поле — упадёт здесь.
describe('блиц в общем зачёте', () => {
  const pack = {
    rounds: [{ id: 'r', mechanic: 'blitz', off_scoreboard: false,
      settings: {}, questions: [] }],
  } as unknown as LoadedPack
  const team = { id: 't1', name: 'Тигры', color: '#fff' } as unknown as Team
  const row = (stake: number, ref = 'q-blitz', rn = 0): Answer => ({
    id: 'x', team_id: 't1', game_id: 'g', question_ref: ref, round_number: rn,
    answer_text: 'место 1', stake, is_correct: true, updated_at: '',
  } as Answer)

  it('баллы за место попадают в сумму игры', () => {
    expect(computeTotals(pack, [team], [row(10)]).get('t1')).toBe(10)
  })

  it('колонка раунда совпадает с суммой', () => {
    expect(computeRoundScores(pack, [team], [row(7)]).get('t1')).toEqual([7])
  })

  it('раунд не сыгран — ноль, а не пусто', () => {
    expect(computeTotals(pack, [team], []).get('t1')).toBe(0)
  })

  it('чужой ключ не засчитывается', () => {
    expect(computeTotals(pack, [team], [row(10, 'q-other')]).get('t1')).toBe(0)
  })

  it('строка другого раунда не засчитывается', () => {
    expect(computeTotals(pack, [team], [row(10, 'q-blitz', 1)]).get('t1')).toBe(0)
  })
})

describe('блиц: бонус за остаток времени', () => {
  const T = (id: string, correct: number, leftMs: number, timedOut = false) =>
    ({ teamId: id, correct, missed: 0, leftMs, timedOut }) as BlitzTeamState

  it('3 / 2 / 1 по убыванию остатка, остальным ноль', () => {
    const rows = blitzResults([
      T('a', 5, 30_000), T('b', 5, 20_000), T('c', 5, 10_000), T('d', 5, 5_000),
    ])
    const by = (id: string) => rows.find(r => r.teamId === id)!
    expect(by('a').bonus).toBe(3)
    expect(by('b').bonus).toBe(2)
    expect(by('c').bonus).toBe(1)
    expect(by('d').bonus).toBe(0)
  })

  it('равный остаток — равный бонус, следующая группа получает следующий', () => {
    const rows = blitzResults([
      T('a', 5, 30_000), T('b', 5, 30_000), T('c', 5, 10_000),
    ])
    expect(rows.find(r => r.teamId === 'a')!.bonus).toBe(3)
    expect(rows.find(r => r.teamId === 'b')!.bonus).toBe(3)
    expect(rows.find(r => r.teamId === 'c')!.bonus).toBe(2)
  })

  it('у кого время кончилось — бонуса нет, штраф остаётся', () => {
    const rows = blitzResults([T('a', 12, 0, true), T('b', 5, 10_000)], 10)
    const a = rows.find(r => r.teamId === 'a')!
    expect(a.bonus).toBe(0)
    expect(a.points).toBe(2)          // 12 − 10 штрафа + 0 бонуса
  })

  it('бонус может изменить место', () => {
    // одинаковые очки за ответы, но у 'b' остался запас времени
    const rows = blitzResults([T('a', 6, 1_000), T('b', 6, 40_000)])
    expect(rows.find(r => r.teamId === 'b')!.place).toBe(1)
    expect(rows.find(r => r.teamId === 'a')!.place).toBe(2)
  })
})
