import { describe, expect, it } from 'vitest'
import {
  answerGrid, boardLayout, boardRowsFrom, fmtMinutes, introKindOf, introTitleLines, introTitleSize, introTitleWraps, mmss, playedCols, podiumSlots, ptsWord,
  retroLayout, rulesViewFrom, transKind,
} from '../views'
import { rankTeams } from '../../../lib/ranking'
import type { InfoSlide, Team } from '../../../types/quiz'

const slide = (p: Partial<InfoSlide>): InfoSlide => ({ id: 's', title: '', body: '', images: [], ...p })
const stats = { roundsCount: 6, questionsCount: 66, hasMiniGame: false, musicTracks: 16, totalMinutes: 150 }
const team = (id: string, name: string, color = '#ff0000') => ({ id, name, color }) as unknown as Team

describe('Лес · этап 5: правила', () => {
  it('пункты из строк тела, раунды и статистика — только по галочкам слайда', () => {
    const v = rulesViewFrom({ slide: slide({ body: 'Один\n\n Два \nТри', show_rounds: true }), rounds: [{ name: 'Кино', count: 7 }], stats, image: null })!
    expect(v.lines).toEqual(['Один', 'Два', 'Три'])
    expect(v.title).toBe('ПРАВИЛА')
    expect(v.rounds).toEqual([{ n: 1, name: 'Кино', count: 7 }])
    expect(v.stats).toBeNull()
    expect(v.layout).toBe('rules')
  })
  it('статистика: мини-игра и треки — только если есть; время — как у InfoSlideView', () => {
    const v = rulesViewFrom({ slide: slide({ body: 'А', show_stats: true }), rounds: [], stats: { ...stats, musicTracks: 0, hasMiniGame: true }, image: null })!
    expect(v.stats).toEqual([[6, 'раундов'], [66, 'вопросов'], [1, 'мини-игра'], ['~2 ч 30 мин', 'на игру']])
    expect(fmtMinutes(45)).toBe('~45 мин'); expect(fmtMinutes(120)).toBe('~2 ч')
  })
  it('раскладка: без пунктов — заголовок сбоку; больше пяти — плотная; картинка — рама справа', () => {
    expect(rulesViewFrom({ slide: slide({ show_rounds: true }), rounds: [{ name: 'X', count: 1 }], stats: null, image: null })!.layout).toBe('rstats')
    expect(rulesViewFrom({ slide: slide({ body: '1\n2\n3\n4\n5\n6' }), rounds: [], stats: null, image: null })!.layout).toBe('dense')
    const img = rulesViewFrom({ slide: slide({ body: 'А', images: ['a.jpg'], note: ' сноска ' }), rounds: [], stats: null, image: { src: 'u', w: 900, h: 600 } })!
    expect(img.layout).toBe('rimg'); expect(img.photo).toEqual({ src: 'u', w: 900, h: 600 }); expect(img.note).toBe('сноска')
  })
  it('сочетания без композиции в лаборатории — прежний экран (null), ничего не теряется', () => {
    expect(rulesViewFrom({ slide: slide({ body: 'А', images: ['a', 'b'] }), rounds: [], stats: null, image: null })).toBeNull()
    expect(rulesViewFrom({ slide: slide({ body: 'А', images: ['a'], show_stats: true }), rounds: [], stats, image: { src: 'u', w: 1, h: 1 } })).toBeNull()
    expect(rulesViewFrom({ slide: slide({ images: ['a'] }), rounds: [], stats: null, image: { src: 'u', w: 1, h: 1 } })).toBeNull()
  })
})

describe('Лес · этап 5: табло', () => {
  it('раскладка совпадает с лабораторией до 12 команд и 6 колонок', () => {
    expect(boardLayout(8, 2)).toMatchObject({ big: true, rh: 84, gap: 9, y0: 200, brLeft: 790, step: 76, berry: 60, custom: false })
    expect(boardLayout(12, 6)).toMatchObject({ big: false, rh: 66, gap: 5, y0: 168, brLeft: 760, step: 58, berry: 46, custom: false })
  })
  it('24 команды: все строки до низа кадра; много раундов — колонки не наезжают на сумму', () => {
    for (const n of [0, 1, 6, 12, 13, 24, 30]) {
      const l = boardLayout(n, 6)
      expect(l.y0 + n * (l.rh + l.gap)).toBeLessThanOrEqual(1062)
      expect(l.rh).toBeGreaterThan(20)
    }
    for (const cols of [6, 8, 10, 14]) for (const n of [6, 12, 24]) {
      const l = boardLayout(n, cols)
      expect(l.brLeft + (cols - 1) * l.step + l.berry).toBeLessThanOrEqual(1150)
      expect(l.berry).toBeLessThanOrEqual(l.rh)
    }
  })
  it('колонки — сыгранные раунды, но не меньше последней, где уже есть очки', () => {
    expect(playedCols([1, 2, 3, 4], 2, [[1, 2, 0, 0]])).toBe(2)
    expect(playedCols([1, 2, 3, 4], 2, [[0, 0, 0, 3]])).toBe(4)
    expect(playedCols([0, 1], 5, [])).toBe(2)
  })
  it('строки берут места и суммы из rankTeams, очки — по индексам раундов, ▲/▼ — по местам прошлого раунда', () => {
    const teams = [team('a', 'Альфа'), team('b', 'Бета'), team('c', 'Гамма')]
    const per = new Map([['a', [0, 2, 1]], ['b', [0, 3, 3]], ['c', [0, 1, 0]]])
    const totals = new Map([['a', 3], ['b', 6], ['c', 1]])
    const ranked = rankTeams(teams, totals, [], per)
    const prev = rankTeams(teams, new Map([['a', 2], ['b', 3], ['c', 1]]), [], new Map([['a', [0, 2]], ['b', [0, 3]], ['c', [0, 1]]]))
    const rows = boardRowsFrom(ranked, per, [1, 2], () => 'x', { order: prev.map(r => r.team.id) })
    expect(rows.map(r => [r.id, r.place, r.sum, r.scores])).toEqual([['b', 1, 6, [3, 3]], ['a', 2, 3, [2, 1]], ['c', 3, 1, [1, 0]]])
    expect(rows.map(r => r.delta)).toEqual([0, 0, 0])
    const moved = boardRowsFrom(ranked, per, [1, 2], () => 'x', { order: ['c', 'a', 'b'] })
    expect(moved.map(r => [r.id, r.delta, r.prevIdx])).toEqual([['b', 2, 2], ['a', 0, 1], ['c', -2, 0]])
    const tie = rankTeams(teams, new Map([['a', 5], ['b', 5], ['c', 1]]), [], per)
    expect(tie.map(r => r.place)).toEqual([1, 1, 2])
  })
})

describe('Лес · этап 5: финал', () => {
  it('награждение: только реально существующие места, ничья — несколько имён на одном цветке', () => {
    const rows = [{ team: team('a', 'А'), place: 1, total: 9 }, { team: team('b', 'Б'), place: 1, total: 9 }, { team: team('c', 'В'), place: 2, total: 4 }]
    const s = podiumSlots(rows, () => 'c', () => 10)
    expect(s.map(x => [x.k, x.place, x.names.length, x.sum])).toEqual([[0, 1, 2, 9], [1, 2, 1, 4]])
    expect(podiumSlots([], () => 'c', () => 1)).toEqual([])
  })
  it('карточки раундов: 6 — как в лаборатории, больше — рядами, всё в кадре', () => {
    expect(retroLayout(6).map(p => [p.x, p.y, p.w])).toEqual([0, 1, 2, 3, 4, 5].map(i => [60 + i * 300, 400, 280]))
    for (const n of [1, 3, 7, 9, 12, 15]) for (const p of retroLayout(n)) {
      expect(p.x).toBeGreaterThanOrEqual(0); expect(p.x + p.w).toBeLessThanOrEqual(1920); expect(p.y + 230).toBeLessThanOrEqual(1080)
    }
  })
  it('склонение и часы', () => {
    expect([1, 2, 5, 11, 21, 22].map(ptsWord)).toEqual(['балл', 'балла', 'баллов', 'баллов', 'балл', 'балла'])
    expect(mmss(299)).toBe('04:59'); expect(mmss(-3)).toBe('00:00')
  })
})

describe('Лес · этап 5: заставка, «время ответов», переходы', () => {
  it('механика → лицо заставки', () => {
    expect(['crossword', 'four_pics', 'race', 'stakes_free', 'sprint'].map(introKindOf)).toEqual(['crossword', 'reveal', 'standard', 'standard', 'sprint'])
    expect(introTitleSize(['Литературный', 'кроссворд'])).toBe(112)
    expect(introTitleWraps(['Очень длинное название раунда без переносов'])).toBe(true)
    expect(introTitleWraps(['Литературный', 'кроссворд'])).toBe(false)
    expect(introTitleLines(['Литературный', 'кроссворд'])).toEqual(['Литературный', 'кроссворд'])
    const ls = introTitleLines(['Очень длинное название раунда про кино, музыку и литературу XX века'])
    expect(ls.join(' ')).toBe('Очень длинное название раунда про кино, музыку и литературу XX века')
    expect(Math.max(...ls.map(l => l.length))).toBeLessThanOrEqual(20)
    expect(introTitleSize([])).toBe(112)
  })
  it('сетка команд «время ответов» влезает в 800 px', () => {
    for (const n of [0, 1, 6, 12, 24]) { const g = answerGrid(n); expect(Math.ceil(Math.max(1, n) / g.cols) * (g.rowH + 10) - 10).toBeLessThanOrEqual(800) }
  })
  it('вставки — только на шести парах лаборатории', () => {
    expect(transKind('lobby', 'info')).toBe('vine')
    expect(transKind('info', 'round_intro')).toBe('wind')
    expect(transKind('round_intro', 'question')).toBe('fly')
    expect(transKind('show_answers', 'scoreboard')).toBe('petal')
    expect(transKind('scoreboard', 'break')).toBe('mist')
    expect(transKind('counting', 'finale')).toBe('bloom')
    expect(transKind('question', 'question')).toBeNull()
    expect(transKind('question', 'show_answers')).toBeNull()
    expect(transKind(null, 'lobby')).toBeNull()
  })
})
