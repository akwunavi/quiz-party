import 'fake-indexeddb/auto'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// packLoader.ts тянет singleton-клиент из ./supabase — подменяем модуль,
// как это уже делает auth.test.ts (VITE_SUPABASE_URL в тестах не задан).
const packRow = { id: 'p1', name: 'Тест', theme: 'classic', settings: {} }
const roundsRow = [{ id: 'r1', pack_id: 'p1', position: 0, settings: {} }]
const questionsRow = [{ id: 'q1', round_id: 'r1', position: 0, hidden: false }]

let networkMode: 'ok' | 'fail' = 'ok'
let fromCalls = 0

function makeBuilder<T>(result: T) {
  const builder = {
    select: () => builder,
    eq: () => builder,
    order: () => builder,
    in: () => builder,
    single: () => builder,
    then: (resolve: (v: T) => void, reject: (e: unknown) => void) =>
      Promise.resolve(result).then(resolve, reject),
  }
  return builder
}

vi.mock('../supabase', () => ({
  supabase: {
    from: (table: string) => {
      fromCalls++
      if (networkMode === 'fail') return makeBuilder(Promise.reject(new Error('сеть недоступна')))
      if (table === 'packs') return makeBuilder({ data: packRow, error: null })
      if (table === 'pack_rounds') return makeBuilder({ data: roundsRow, error: null })
      return makeBuilder({ data: questionsRow, error: null })
    },
  },
}))

// Node без jsdom не даёт localStorage — простой in-memory полифилл, как
// это делает браузер, только без квоты (нам достаточно API).
function installLocalStorage() {
  const store = new Map<string, string>()
  ;(globalThis as unknown as { localStorage: Storage }).localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, v) },
    removeItem: (k: string) => { store.delete(k) },
    clear: () => store.clear(),
    key: (i: number) => [...store.keys()][i] ?? null,
    get length() { return store.size },
  }
}

describe('packLoader: порядок источников', () => {
  beforeEach(async () => {
    vi.resetModules()
    installLocalStorage()
    networkMode = 'ok'
    fromCalls = 0
    localStorage.clear()
    const { clearPack } = await import('../packCache')
    await clearPack('p1')
  })

  it('успешная сеть — пишет в IndexedDB, НЕ в localStorage', async () => {
    const { loadPack } = await import('../packLoader')
    const { readPack } = await import('../packCache')
    const loaded = await loadPack('p1')
    expect(loaded.id).toBe('p1')
    expect(await readPack('p1')).toMatchObject({ id: 'p1' })
    expect(localStorage.getItem('qp-pack-p1')).toBeNull()
  })

  it('второй вызов без force берёт из памяти — сеть не дёргается снова', async () => {
    const { loadPack } = await import('../packLoader')
    await loadPack('p1')
    const callsAfterFirst = fromCalls
    await loadPack('p1')
    expect(fromCalls).toBe(callsAfterFirst)
  })

  it('force обходит память и снова читает сеть', async () => {
    const { loadPack } = await import('../packLoader')
    await loadPack('p1')
    const callsAfterFirst = fromCalls
    await loadPack('p1', true)
    expect(fromCalls).toBeGreaterThan(callsAfterFirst)
  })

  it('сеть недоступна, но пакет уже лежит в IndexedDB — отдаёт его, не падает', async () => {
    const { loadPack } = await import('../packLoader')
    await loadPack('p1')                 // прогрели IndexedDB онлайн-загрузкой
    networkMode = 'fail'
    const loaded = await loadPack('p1', true)   // force, чтобы обойти память
    expect(loaded.id).toBe('p1')
  })

  it('сеть недоступна, в IndexedDB пусто, но есть legacy-запись в localStorage — отдаёт её', async () => {
    localStorage.setItem('qp-pack-p1', JSON.stringify({ id: 'p1', legacy: true, rounds: [] }))
    networkMode = 'fail'
    const { loadPack } = await import('../packLoader')
    const loaded = await loadPack('p1')
    expect((loaded as unknown as { legacy: boolean }).legacy).toBe(true)
  })

  it('сеть недоступна и нигде ничего не сохранено — бросает исключение', async () => {
    networkMode = 'fail'
    const { loadPack } = await import('../packLoader')
    await expect(loadPack('p1')).rejects.toThrow()
  })
})
