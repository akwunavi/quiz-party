import { describe, expect, it, vi } from 'vitest'
import { getStatus, runAction, subscribeStatus } from '../actionStatus'

describe('actionStatus', () => {
  it('успешный вызов обновляет lastOkAt и корректно ведёт себя по фазам busy', async () => {
    const updates: boolean[] = []
    const unsub = subscribeStatus(s => updates.push(s.busy))

    const before = Date.now()
    const result = await runAction('тест', async () => 42)
    unsub()

    expect(result).toBe(42)
    expect(getStatus().busy).toBe(false)
    expect(getStatus().lastError).toBeNull()
    expect(getStatus().lastOkAt).not.toBeNull()
    expect(getStatus().lastOkAt as number).toBeGreaterThanOrEqual(before)
    // хотя бы один раз busy=true (начало), хотя бы один раз busy=false (конец)
    expect(updates).toContain(true)
    expect(updates[updates.length - 1]).toBe(false)
  })

  it('провалившийся вызов обновляет lastError, busy сбрасывается в false в finally даже при исключении', async () => {
    await expect(runAction('переход к раунду', async () => {
      throw new Error('boom')
    })).rejects.toThrow('boom')

    expect(getStatus().busy).toBe(false)
    expect(getStatus().lastError).toContain('переход к раунду')
    expect(getStatus().lastError).toContain('не выполнился')
  })

  it('сетевая ошибка формулируется человекочитаемо, а не сырым stack', async () => {
    await expect(runAction('оценка ответа', async () => {
      throw new TypeError('Failed to fetch')
    })).rejects.toThrow()

    expect(getStatus().lastError).toContain('нет связи')
    expect(getStatus().lastError).not.toContain('TypeError')
  })

  it('подписчик получает обновления по ходу вызова', async () => {
    const cb = vi.fn()
    const unsub = subscribeStatus(cb)
    await runAction('шаг', async () => 'ok')
    unsub()
    expect(cb).toHaveBeenCalled()
    const calls = cb.mock.calls.map(c => c[0])
    expect(calls.some(s => s.busy === true)).toBe(true)
    expect(calls.some(s => s.busy === false && s.lastOkAt != null)).toBe(true)
  })

  it('отписка реально прекращает уведомления', async () => {
    const cb = vi.fn()
    const unsub = subscribeStatus(cb)
    unsub()
    await runAction('после отписки', async () => 'ok').catch(() => {})
    expect(cb).not.toHaveBeenCalled()
  })

  it('busy остаётся true, пока хотя бы один параллельный вызов ещё не завершился', async () => {
    let resolveSlow: () => void = () => {}
    const slow = new Promise<void>(res => { resolveSlow = res })
    const slowCall = runAction('долгий', async () => { await slow })
    const fastCall = runAction('быстрый', async () => 'done')

    await fastCall
    // быстрый вызов завершился, но медленный ещё в полёте — busy должен остаться true
    expect(getStatus().busy).toBe(true)

    resolveSlow()
    await slowCall
    expect(getStatus().busy).toBe(false)
  })
})
