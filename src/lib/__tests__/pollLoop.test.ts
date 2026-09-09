import { describe, it, expect, vi } from 'vitest'
import { createPollLoop } from '../pollLoop'

// Используется всеми четырьмя поллинг-хуками (useGameState/useTeams/
// useAnswers/useBlitz) — здесь тестируется сама защита от наложения, а не
// React-рендер (в проекте нет @testing-library/react, а для этой логики
// он и не нужен: она не трогает DOM).

function deferred<T>() {
  let resolve!: (v: T) => void
  let reject!: (e: unknown) => void
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej })
  return { promise, resolve, reject }
}

describe('createPollLoop: inFlight не даёт двум тикам наложиться', () => {
  it('второй poll() во время незавершённого первого не дёргает fetcher ещё раз', async () => {
    const d = deferred<number>()
    const fetcher = vi.fn(() => d.promise)
    const onResult = vi.fn()
    const loop = createPollLoop(fetcher, onResult, { intervalMs: 2000 })

    const p1 = loop.poll()          // тик №1 стартовал, fetcher вызван, висит
    const p2 = loop.poll()          // тик №2 «пришёл» раньше, чем первый вернулся

    expect(fetcher).toHaveBeenCalledTimes(1)   // ВТОРОГО параллельного вызова нет

    d.resolve(42)
    await p1
    await p2

    expect(onResult).toHaveBeenCalledTimes(1)
    expect(onResult).toHaveBeenCalledWith(42)
    loop.stop()
  })

  it('после завершения первого тика следующий poll() снова идёт в сеть', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce('a')
      .mockResolvedValueOnce('b')
    const onResult = vi.fn()
    const loop = createPollLoop(fetcher, onResult, { intervalMs: 2000 })

    await loop.poll()
    await loop.poll()

    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(onResult).toHaveBeenNthCalledWith(1, 'a')
    expect(onResult).toHaveBeenNthCalledWith(2, 'b')
    loop.stop()
  })

  it('после stop() поздний ответ висящего запроса больше не долетает до onResult', async () => {
    const d = deferred<string>()
    const fetcher = vi.fn(() => d.promise)
    const onResult = vi.fn()
    const loop = createPollLoop(fetcher, onResult, { intervalMs: 2000 })

    const p1 = loop.poll()
    loop.stop()
    d.resolve('поздно')
    await p1

    expect(onResult).not.toHaveBeenCalled()
  })
})

describe('createPollLoop: бэкофф после подряд идущих неудач', () => {
  it('после трёх неудач подряд следующий тик планируется через шаг бэкоффа', async () => {
    vi.useFakeTimers()
    try {
      const fetcher = vi.fn().mockRejectedValue(new Error('офлайн'))
      const onResult = vi.fn()
      const loop = createPollLoop(fetcher, onResult, {
        intervalMs: 2000, backoffStepsMs: [5000, 10000], failsBeforeBackoff: 3,
      })

      await loop.poll()   // неудача №1 — следующий тик всё ещё на обычном интервале
      await vi.advanceTimersByTimeAsync(2000)
      await vi.advanceTimersByTimeAsync(2000)
      // после трёх неудач подряд (poll + 2 автотика) следующий шаг должен
      // быть длиннее обычного интервала — 2 секунды подряд НЕ вызовут его снова
      const callsAfterThreeFails = fetcher.mock.calls.length
      expect(callsAfterThreeFails).toBe(3)
      await vi.advanceTimersByTimeAsync(2000)
      expect(fetcher.mock.calls.length).toBe(3)   // всё ещё не вызвался — ждём бэкофф
      await vi.advanceTimersByTimeAsync(3000)      // добираем до 5000 мс бэкоффа
      expect(fetcher.mock.calls.length).toBe(4)

      loop.stop()
    } finally {
      vi.useRealTimers()
    }
  })

  it('успешный тик сбрасывает счётчик неудач — интервал возвращается к обычному', async () => {
    vi.useFakeTimers()
    try {
      const fetcher = vi.fn()
        .mockRejectedValueOnce(new Error('1'))
        .mockRejectedValueOnce(new Error('2'))
        .mockRejectedValueOnce(new Error('3'))
        .mockResolvedValueOnce('ok')
        .mockResolvedValueOnce('ok2')
      const onResult = vi.fn()
      const loop = createPollLoop(fetcher, onResult, {
        intervalMs: 2000, backoffStepsMs: [5000], failsBeforeBackoff: 3,
      })

      await loop.poll()
      await vi.advanceTimersByTimeAsync(2000)
      await vi.advanceTimersByTimeAsync(2000)   // 3 неудачи, теперь на бэкоффе
      expect(fetcher.mock.calls.length).toBe(3)

      await vi.advanceTimersByTimeAsync(5000)   // бэкофф-шаг — 4-й вызов, успешный
      expect(fetcher.mock.calls.length).toBe(4)
      expect(onResult).toHaveBeenCalledWith('ok')

      // после успеха следующий тик снова на ОБЫЧНОМ интервале (2000, не 5000)
      await vi.advanceTimersByTimeAsync(2000)
      expect(fetcher.mock.calls.length).toBe(5)

      loop.stop()
    } finally {
      vi.useRealTimers()
    }
  })
})
