import { describe, it, expect } from 'vitest'
import { sortTeamsForLobby } from '../teamOrder'

describe('sortTeamsForLobby', () => {
  it('сортирует по времени регистрации, а не по порядку в массиве', () => {
    const teams = [
      { id: 'c', created_at: '2026-09-07T10:00:02.000Z' },
      { id: 'a', created_at: '2026-09-07T10:00:00.000Z' },
      { id: 'b', created_at: '2026-09-07T10:00:01.000Z' },
    ]
    expect(sortTeamsForLobby(teams).map(t => t.id)).toEqual(['a', 'b', 'c'])
  })

  it('порядок одинаков независимо от исходного порядка входного массива — не «прыгает»', () => {
    const base = [
      { id: 'a', created_at: '2026-09-07T10:00:00.000Z' },
      { id: 'b', created_at: '2026-09-07T10:00:01.000Z' },
      { id: 'c', created_at: '2026-09-07T10:00:02.000Z' },
    ]
    const shuffled = [base[2], base[0], base[1]]
    expect(sortTeamsForLobby(shuffled).map(t => t.id))
      .toEqual(sortTeamsForLobby(base).map(t => t.id))
  })

  it('фолбэк на id, когда created_at отсутствует', () => {
    const teams = [
      { id: 'z', created_at: null },
      { id: 'a', created_at: null },
    ]
    expect(sortTeamsForLobby(teams).map(t => t.id)).toEqual(['a', 'z'])
  })

  it('не мутирует исходный массив', () => {
    const teams = [
      { id: 'b', created_at: '2026-09-07T10:00:01.000Z' },
      { id: 'a', created_at: '2026-09-07T10:00:00.000Z' },
    ]
    const copy = [...teams]
    sortTeamsForLobby(teams)
    expect(teams).toEqual(copy)
  })
})
