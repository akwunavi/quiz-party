// Начисление очков «Скачек»: 5/4/3/2/1 по месту выбранной собаки; идемпотентно (повтор не даёт второго начисления).
import { describe, expect, it } from 'vitest'
import { gradingRows, pointsFor } from '../bets'
const places = [2, 0, 4, 1, 3]   // собака №3 первой, №1 второй, №5 третьей, №2 четвёртой, №4 пятой
const bet = (team: string, dog: string, extra = {}) => ({ team_id: team, answer_text: dog, stake: null as number | null, is_correct: null as boolean | null, ...extra })

describe('начисление очков', () => {
  it('5/4/3/2/1 по месту выбранной собаки', () => {
    expect(['3', '1', '5', '2', '4'].map(d => pointsFor(d, places).points)).toEqual([5, 4, 3, 2, 1])
  })
  it('одна собака у нескольких команд — все получают одинаково', () => {
    const rows = gradingRows([bet('a', '3'), bet('b', '3'), bet('c', '4')], places)
    expect(rows.map(r => r.stake)).toEqual([5, 5, 1])
  })
  it('нет ставки/мусор — 0 очков, не падает', () => {
    expect(gradingRows([bet('a', ''), bet('b', 'x'), bet('c', '9')], places).map(r => r.stake)).toEqual([0, 0, 0])
  })
  it('повторный вызов на уже начисленном — пусто (второго начисления нет)', () => {
    const first = gradingRows([bet('a', '3'), bet('b', '1')], places)
    expect(gradingRows(first, places)).toEqual([])
  })
  it('частичная операция: дописываются только недостающие, начисленные не трогаются', () => {
    const half = [bet('a', '3', { stake: 5, is_correct: true }), bet('b', '1')]
    const rows = gradingRows(half, places); expect(rows.map(r => r.team_id)).toEqual(['b']); expect(rows[0].stake).toBe(4)
  })
  it('чужое значение stake (в т.ч. накрученное игроком до финиша) перезаписывается правильным', () => {
    const rows = gradingRows([bet('a', '2', { stake: 5, is_correct: true })], places); expect(rows[0].stake).toBe(2)
  })
})
