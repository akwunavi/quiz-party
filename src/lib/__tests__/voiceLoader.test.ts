import { describe, it, expect } from 'vitest'
import { createVoiceLoader, NOT_FOUND_MSG, type LoaderDeps } from '../voiceLoader'

/** Подставная «сеть»: каждый запрос ждёт, пока тест его не разрешит. */
function harness(opts: Parameters<typeof createVoiceLoader>[1] = {}) {
  const pending: { path: string; ok: (b: Blob) => void; fail: (e: Error) => void }[] = []
  const calls: string[] = []
  const revoked: string[] = []
  const inUse = new Set<string>()
  const sleeps: number[] = []
  let n = 0
  const deps: LoaderDeps = {
    fetchBlob: path => new Promise((ok, fail) => { calls.push(path); pending.push({ path, ok, fail }) }),
    createUrl: () => `blob:${++n}`,
    revokeUrl: u => { revoked.push(u) },
    sleep: ms => { sleeps.push(ms); return Promise.resolve() },
    inUse: u => inUse.has(u),
    urlOf: p => `https://x/${p}`,
  }
  const loader = createVoiceLoader(deps, { retryDelaysMs: [1, 2], ...opts })
  const settle = () => new Promise(r => setTimeout(r, 0))
  const resolve = async (path: string, size = 10) => {
    const i = pending.findIndex(p => p.path === path)
    pending.splice(i, 1)[0].ok(new Blob([new Uint8Array(size)]))
    await settle()
  }
  const reject = async (path: string, msg = 'Failed to fetch') => {
    const i = pending.findIndex(p => p.path === path)
    pending.splice(i, 1)[0].fail(new Error(msg))
    await settle()
  }
  return { loader, pending, calls, revoked, inUse, sleeps, resolve, reject, settle }
}

describe('voiceLoader: очередь', () => {
  it('качает не больше двух файлов одновременно, остальные ждут', async () => {
    const h = harness()
    h.loader.setList(['a', 'b', 'c', 'd'])
    expect(h.calls).toEqual(['a', 'b'])
    await h.resolve('a')
    expect(h.calls).toEqual(['a', 'b', 'c'])
    expect(h.loader.status()).toEqual({ total: 4, done: 1, failed: 0, loading: 2 })
  })

  it('порядок списка = порядок скачивания; новый порядок переставляет ожидающих', async () => {
    const h = harness({ concurrency: 1 })
    h.loader.setList(['a', 'b', 'c'])
    h.loader.setList(['a', 'c', 'b'])           // сменили раунд — c нужнее
    await h.resolve('a')
    expect(h.calls).toEqual(['a', 'c'])
  })

  it('уже скачанное не качается повторно', async () => {
    const h = harness()
    h.loader.setList(['a'])
    await h.resolve('a')
    h.loader.setList(['a', 'b'])
    h.loader.setList(['b', 'a'])
    expect(h.calls).toEqual(['a', 'b'])
  })

  it('get отдаёт blob-URL скачанного, а нескачанного — undefined (поток)', async () => {
    const h = harness()
    h.loader.setList(['a', 'b'])
    await h.resolve('a')
    expect(h.loader.get('a')).toBe('blob:1')
    expect(h.loader.get('b')).toBeUndefined()
    expect(h.loader.getByUrl('https://x/a')).toBe('blob:1')
    expect(h.loader.getByUrl('https://x/b')).toBeUndefined()
  })
})

describe('voiceLoader: ошибки и повтор', () => {
  it('сетевой сбой повторяется с паузой, потом успех', async () => {
    const h = harness()
    h.loader.setList(['a'])
    await h.reject('a')
    expect(h.sleeps).toEqual([1])
    await h.resolve('a')
    expect(h.loader.status().done).toBe(1)
    expect(h.loader.status().failed).toBe(0)
  })

  it('после всех повторов — failed, остальные файлы не страдают', async () => {
    const h = harness()
    h.loader.setList(['a', 'b'])
    await h.reject('a'); await h.reject('a'); await h.reject('a')
    await h.resolve('b')
    expect(h.sleeps).toEqual([1, 2])
    expect(h.loader.status()).toEqual({ total: 2, done: 1, failed: 1, loading: 0 })
    expect(h.loader.get('a')).toBeUndefined()        // запасной путь — поток
  })

  it('«файла нет в хранилище» не повторяется', async () => {
    const h = harness()
    h.loader.setList(['a'])
    await h.reject('a', NOT_FOUND_MSG)
    expect(h.sleeps).toEqual([])
    expect(h.loader.status().failed).toBe(1)
  })

  it('retryFailed ставит упавшие в очередь заново', async () => {
    const h = harness()
    h.loader.setList(['a'])
    await h.reject('a', NOT_FOUND_MSG)
    h.loader.retryFailed()
    expect(h.calls).toEqual(['a', 'a'])
    await h.resolve('a')
    expect(h.loader.status()).toEqual({ total: 1, done: 1, failed: 0, loading: 0 })
  })
})

describe('voiceLoader: память', () => {
  it('файл больше потолка не кладётся в память, но считается обработанным', async () => {
    const h = harness({ maxFileBytes: 5 })
    h.loader.setList(['big'])
    await h.resolve('big', 6)
    expect(h.loader.status().done).toBe(1)
    expect(h.loader.get('big')).toBeUndefined()
  })

  it('при нехватке места вытесняются ОТЫГРАННЫЕ, давние первыми, играющие — никогда', async () => {
    const h = harness({ maxTotalBytes: 25, concurrency: 1 })
    h.loader.setList(['a', 'b', 'c'])
    await h.resolve('a'); await h.resolve('b')
    const ua = h.loader.get('a')!                    // a отыграна первой
    h.loader.get('b')                                // b — позже
    h.inUse.add(ua)                                  // но a сейчас играет
    await h.resolve('c')                             // 30 байт > 25
    expect(h.revoked).toEqual(['blob:2'])            // вытеснили b, а не играющую a
    expect(h.loader.get('a')).toBe(ua)
  })

  it('неотыгранное не вытесняется: нет места — остальные доиграют потоком', async () => {
    const h = harness({ maxTotalBytes: 15, concurrency: 1 })
    h.loader.setList(['a', 'b', 'c'])
    await h.resolve('a')
    await h.resolve('b')                             // 20 > 15, отыгранных нет
    expect(h.revoked).toEqual([])
    expect(h.loader._state('c')).toBe('skipped')
    expect(h.loader.status().done).toBe(3)
  })

  it('выпавшее из списка (смена пакета) освобождается, играющее — нет', async () => {
    const h = harness()
    h.loader.setList(['a', 'b'])
    await h.resolve('a'); await h.resolve('b')
    h.inUse.add('blob:2')
    h.loader.setList(['z'])
    expect(h.revoked).toEqual(['blob:1'])
    expect(h.loader.status().total).toBe(1)
  })

  it('файл, убранный из списка в полёте, в кеш не попадает', async () => {
    const h = harness()
    h.loader.setList(['a'])
    h.loader.setList(['b'])
    await h.resolve('a')
    expect(h.loader._hasBlob('a')).toBe(false)
  })
})
