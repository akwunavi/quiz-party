import { describe, it, expect } from 'vitest'
import { raceClock, gradeAt } from '../phases'
import { T, courseSeconds, dogNames, DOG_NAMES, DEFAULT_COURSE_SEC } from '../config'
import { countsByDog, pointsFor, scoreRows } from '../bets'

describe('фазы раунда: чистая функция от времени с «Старт»', () => {
  const END = 60
  it('порядок и границы фаз', () => {
    const seq = [0, T.transition - .01, T.transition, T.transition + T.countdown - .01, T.transition + T.countdown, T.transition + T.countdown + END - .01,
      T.transition + T.countdown + END, gradeAt(END) + T.finishHold, gradeAt(END) + T.finishHold + T.podiumTransition].map(e => raceClock(e, END).phase)
    expect(seq).toEqual(['transition', 'transition', 'countdown', 'countdown', 'race', 'race', 'finish', 'podiumTransition', 'podium'])
  })
  it('время гонки идёт с нуля после отсчёта и замирает на финише', () => {
    expect(raceClock(T.transition + T.countdown, END).raceT).toBe(0)
    expect(raceClock(T.transition + T.countdown + 12.5, END).raceT).toBeCloseTo(12.5, 6)
    expect(raceClock(gradeAt(END) + 1, END).raceT).toBe(END)
  })
  it('перезагрузка страницы через час: сразу пьедестал, все три места открыты', () => {
    const c = raceClock(3600, END); expect(c.phase).toBe('podium'); expect(c.podiumShown).toBe(3)
  })
  it('пьедестал открывает 3-е, 2-е, 1-е места по одному', () => {
    const t0 = gradeAt(END) + T.finishHold + T.podiumTransition
    expect([0.1, T.podiumStep + .1, 2 * T.podiumStep + .1, 3 * T.podiumStep + .1].map(d => raceClock(t0 + d, END).podiumShown)).toEqual([0, 1, 2, 3])
  })
  it('отрицательное время (часы телефона отстают) — не ломается', () => { expect(raceClock(-5, END).phase).toBe('transition') })
})

describe('ставки и очки', () => {
  it('несколько команд на одну собаку; последний выбор команды побеждает; мусор игнорируется', () => {
    const bets = [{ team_id: 'a', answer_text: '3' }, { team_id: 'b', answer_text: '3' }, { team_id: 'c', answer_text: '1' },
      { team_id: 'a', answer_text: '5' }, { team_id: 'd', answer_text: 'x' }, { team_id: 'e', answer_text: '9' }, { team_id: 'f', answer_text: '2.5' }]
    expect(countsByDog(bets)).toEqual([1, 0, 1, 0, 1])
  })
  it('очки: 1 место — 5 … 5 место — 1, нет ставки — 0', () => {
    const places = [2, 4, 0, 3, 1]
    expect([3, 5, 1, 4, 2].map(n => pointsFor(String(n), places).points)).toEqual([5, 4, 3, 2, 1])
    expect(pointsFor('', places)).toEqual({ dog: null, place: null, points: 0 })
    expect(pointsFor('7', places).points).toBe(0)
  })
  it('таблица очков команд, команда без ставки получает 0', () => {
    const rows = scoreRows([{ id: 'a', name: 'А' }, { id: 'b', name: 'Б' }, { id: 'c', name: 'В' }], [{ team_id: 'a', answer_text: '3' }, { team_id: 'b', answer_text: '3' }], [2, 4, 0, 3, 1])
    expect(rows.map(r => r.points)).toEqual([5, 5, 0])
  })
})

describe('настройки раунда', () => {
  it('время дистанции: по умолчанию 42, мусор и выход за 20–120 заменяются', () => {
    expect(courseSeconds(undefined)).toBe(DEFAULT_COURSE_SEC); expect(courseSeconds({ courseSec: 60 })).toBe(60)
    expect(courseSeconds({ courseSec: 5 })).toBe(42); expect(courseSeconds({ courseSec: 999 })).toBe(42); expect(courseSeconds({ courseSec: NaN })).toBe(42)
  })
  it('клички: старые заглушки редактора заменяются настоящими именами собак, свои — остаются', () => {
    expect(dogNames({ dogs: ['Френк', 'Батон', 'Пельмень', 'Турбо', 'Ракета'] })).toEqual(DOG_NAMES)
    expect(dogNames(undefined)).toEqual(DOG_NAMES)
    expect(dogNames({ dogs: ['А', 'Б', 'В', 'Г', ''] })).toEqual(['А', 'Б', 'В', 'Г', 'Луна'])
  })
})
