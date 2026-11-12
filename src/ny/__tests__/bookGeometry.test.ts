// ═══ «Книга»: чистая геометрия разворота и раскладка лобби (прототип этапа 2) ═══
import { describe, it, expect } from 'vitest'
import { BOOK, PAGE_L, PAGE_R, SAFE, SCENE, TEAMS_BOX, bookDecor, lobbyLayout, lobbyRowH } from '../book/geometry'

describe('Книга: геометрия', () => {
  it('книга и безопасная область внутри сцены 1920×1080, страницы делят разворот пополам', () => {
    expect(BOOK.x + BOOK.w).toBeLessThanOrEqual(SCENE.w)
    expect(BOOK.y + BOOK.h).toBeLessThanOrEqual(SCENE.h)
    expect(PAGE_L.w + PAGE_R.w).toBe(BOOK.w)
    expect(PAGE_R.x).toBe(PAGE_L.w)
    expect(SAFE.x).toBeGreaterThan(BOOK.x)
    expect(SAFE.t).toBeGreaterThan(BOOK.y)
    expect(SCENE.h - SAFE.b).toBeLessThan(BOOK.y + BOOK.h)
  })
  it('область команд лежит на правой странице', () => {
    expect(TEAMS_BOX.x).toBeGreaterThanOrEqual(PAGE_R.x)
    expect(TEAMS_BOX.x + TEAMS_BOX.w).toBeLessThanOrEqual(PAGE_R.x + PAGE_R.w)
    expect(TEAMS_BOX.y + TEAMS_BOX.h).toBeLessThanOrEqual(BOOK.h)
  })
  it('плотность декора: лобби — максимум, игра — минимум, прочее — средне', () => {
    expect(bookDecor('lobby')).toBe('sparse'); expect(bookDecor(undefined)).toBe('sparse')
    for (const p of ['question', 'show_answers', 'answer_time', 'recap']) expect(bookDecor(p)).toBe('dense')
    for (const p of ['round_intro', 'info', 'scoreboard', 'finale', 'break', 'counting', 'intro']) expect(bookDecor(p)).toBe('medium')
  })
})

describe('Книга: раскладка лобби по числу команд', () => {
  it('0 → приглашение без пустых слотов', () => {
    expect(lobbyLayout(0)).toEqual({ mode: 'invite', cols: 0, perCol: 0, fontU: 0, hidden: 0 })
    expect(lobbyLayout(-3).mode).toBe('invite')
  })
  it('1–4 карточки, 5–8 список, 9–16 две колонки, 17–24 три', () => {
    expect([1, 4].map(n => lobbyLayout(n).mode)).toEqual(['cards', 'cards'])
    expect([5, 8].map(n => lobbyLayout(n).mode)).toEqual(['list', 'list'])
    expect([9, 10, 16].map(n => lobbyLayout(n).mode)).toEqual(['cols2', 'cols2', 'cols2'])
    expect([17, 24].map(n => lobbyLayout(n).mode)).toEqual(['cols3', 'cols3'])
    expect(lobbyLayout(10)).toMatchObject({ cols: 2, perCol: 5 })
    expect(lobbyLayout(9)).toMatchObject({ cols: 2, perCol: 5 })
  })
  it('чип «+N» — только когда три колонки по 8 не вмещают; видимых + чип = все ячейки', () => {
    for (const n of [1, 8, 10, 16, 24]) expect(lobbyLayout(n).hidden).toBe(0)
    expect(lobbyLayout(25)).toMatchObject({ cols: 3, perCol: 8, hidden: 2 })
    expect(lobbyLayout(48).hidden).toBe(25)
    const l = lobbyLayout(60)
    expect(60 - l.hidden + 1).toBe(l.cols * l.perCol)
  })
  it('высота строки: не меньше читаемой и не больше области; 10 и 16 команд — 62 px', () => {
    expect(lobbyRowH(lobbyLayout(0))).toBe(0)
    expect(lobbyRowH(lobbyLayout(4))).toBe(118)
    expect(lobbyRowH(lobbyLayout(8))).toBe(66)
    expect(lobbyRowH(lobbyLayout(16))).toBe(62)
    for (let n = 1; n <= 60; n++) expect(lobbyRowH(lobbyLayout(n))).toBeGreaterThanOrEqual(56)
  })
  it('кегль не растёт с числом команд; любая раскладка влезает в область команд', () => {
    let prev = Infinity
    for (let n = 1; n <= 60; n++) {
      const l = lobbyLayout(n)
      expect(l.fontU).toBeLessThanOrEqual(prev); prev = l.fontU
      expect(l.fontU).toBeGreaterThanOrEqual(24)
      expect(70 + l.perCol * (lobbyRowH(l) + 10)).toBeLessThanOrEqual(TEAMS_BOX.h)
    }
  })
})
