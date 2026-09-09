// ═══ Тесты починки: resetGame/finishGame идут через room.setPackStatus ═══
//
// Раньше эти две функции дёргали supabase.from('packs')... напрямую, в
// обход RoomTransport — в локальном режиме (без сети до облака) это тихо
// падало необработанным промисом (см. HANDOFF §3aq/§7 шага 7). Проверяем:
//  - packId-путь идёт через room.setPackStatus (уже было починено в шаге 4
//    для finishGame/selectPackAndStart — тест защищает от регресса);
//  - оставшиеся прямые вызовы supabase (resetGame: сброс ВСЕХ active-пакетов
//    по условию, не по id; finishGame: last_game_id) в локальном режиме НЕ
//    выполняются вовсе — не пытаются достучаться до недоступного облака.
import { beforeEach, describe, expect, it, vi } from 'vitest'

const roomMock = {
  patchSession: vi.fn().mockResolvedValue(undefined),
  setPackStatus: vi.fn().mockResolvedValue(undefined),
  readSession: vi.fn().mockResolvedValue({ game_id: 'g1' }),
}

let localMode = false
vi.mock('../transport', () => ({ room: roomMock }))
vi.mock('../transport/mode', () => ({ isLocalMode: () => localMode }))
vi.mock('../room', () => ({ getRoomId: () => 'room-1' }))

const fromMock = vi.fn()
vi.mock('../supabase', () => ({ supabase: { from: (...args: unknown[]) => fromMock(...args) } }))

const { resetGame, finishGame } = await import('../gameActions')

function chainable() {
  const chain = {
    update: vi.fn(() => chain),
    eq: vi.fn(() => Promise.resolve({ error: null })),
  }
  return chain
}

beforeEach(() => {
  vi.clearAllMocks()
  localMode = false
  fromMock.mockImplementation(() => chainable())
})

describe('finishGame', () => {
  it('переводит статус пакета через room.setPackStatus, не напрямую', async () => {
    await finishGame('pack1', false)
    expect(roomMock.setPackStatus).toHaveBeenCalledWith('pack1', 'played')
  })

  it('в облаке пишет last_game_id напрямую (вне 13 операций транспорта)', async () => {
    await finishGame('pack1', false)
    expect(fromMock).toHaveBeenCalledWith('packs')
  })

  it('в локальном режиме НЕ трогает supabase.from — packs недоступны локально', async () => {
    localMode = true
    await finishGame('pack1', false)
    expect(roomMock.setPackStatus).toHaveBeenCalledWith('pack1', 'played')
    expect(fromMock).not.toHaveBeenCalled()
  })
})

describe('resetGame', () => {
  it('в облаке сбрасывает статус активных пакетов напрямую', async () => {
    await resetGame()
    expect(fromMock).toHaveBeenCalledWith('packs')
  })

  it('в локальном режиме пропускает шаг с packs и не падает', async () => {
    localMode = true
    await expect(resetGame()).resolves.toBeUndefined()
    expect(fromMock).not.toHaveBeenCalled()
    expect(roomMock.patchSession).toHaveBeenCalled()
  })
})
