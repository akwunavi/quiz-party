import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { LoadedPack } from '../packLoader'

// «Failed to fetch» — сырое сообщение браузера при обрыве соединения (не
// 404 и не «файла нет»). Проверяем: такая ошибка ретраится и на 2-3 попытке
// выправляется, а «ФАЙЛА НЕТ В ХРАНИЛИЩЕ» — не ретраится вообще, нет смысла.
const fetchMediaBlob = vi.fn()
vi.mock('../media', () => ({ fetchMediaBlob: (...a: unknown[]) => fetchMediaBlob(...a) }))

const store = new Map<string, Blob>()
vi.mock('../packCache', () => ({
  hasMedia: vi.fn(async (p: string) => store.has(p)),
  saveMedia: vi.fn(async (p: string, b: Blob) => { store.set(p, b) }),
  savePack: vi.fn(async () => {}),
  estimateSize: vi.fn(async () => ({ usage: 0, quota: 0 })),
}))

const { downloadPackForOffline } = await import('../packPreload')

function pack(paths: string[]): LoadedPack {
  return {
    id: 'p1', name: 'т', status: 'ready', theme: 'classic',
    created_at: '', updated_at: '',
    rounds: [{
      id: 'r1', pack_id: 'p1', position: 0, mechanic: 'standard',
      title_lines: [], rules: [], rules_audio: null, timer_seconds: 30,
      settings: {}, off_scoreboard: false, answers_reveal: 'after_question',
      meta_line_override: null, status: 'ready',
      questions: paths.map((p, i) => ({
        id: `q${i}`, round_id: 'r1', position: i, question_text: '?',
        media: { question: [p], answer: [] },
        answer: { mode: 'none', display: '' },
        answer_note: null, service: {}, is_final_question: false,
        status: 'ready', hidden: false,
      })),
    }] as LoadedPack['rounds'],
  }
}

beforeEach(() => {
  store.clear()
  fetchMediaBlob.mockReset()
  vi.useFakeTimers()
})

describe('downloadPackForOffline: повтор при сетевом сбое', () => {
  it('обрыв соединения ретраится и в итоге скачивается', async () => {
    fetchMediaBlob.mockRejectedValueOnce(new Error('Failed to fetch'))
    fetchMediaBlob.mockResolvedValueOnce(new Blob(['x'], { type: 'image/jpeg' }))

    const p = pack(['a.jpg'])
    const promise = downloadPackForOffline(p, () => {})
    await vi.runAllTimersAsync()
    const result = await promise

    expect(fetchMediaBlob).toHaveBeenCalledTimes(2)
    expect(result.failed).toEqual([])
    expect(store.has('a.jpg')).toBe(true)
  })

  it('«ФАЙЛА НЕТ В ХРАНИЛИЩЕ» не ретраится вообще', async () => {
    fetchMediaBlob.mockRejectedValue(new Error('ФАЙЛА НЕТ В ХРАНИЛИЩЕ'))

    const p = pack(['missing.jpg'])
    const promise = downloadPackForOffline(p, () => {})
    await vi.runAllTimersAsync()
    const result = await promise

    expect(fetchMediaBlob).toHaveBeenCalledTimes(1)
    expect(result.failed).toEqual(['missing.jpg — ФАЙЛА НЕТ В ХРАНИЛИЩЕ'])
  })

  it('после исчерпания всех попыток файл попадает в failed', async () => {
    fetchMediaBlob.mockRejectedValue(new Error('Failed to fetch'))

    const p = pack(['flaky.jpg'])
    const promise = downloadPackForOffline(p, () => {})
    await vi.runAllTimersAsync()
    const result = await promise

    // 1 первая попытка + 2 повтора = 3 всего
    expect(fetchMediaBlob).toHaveBeenCalledTimes(3)
    expect(result.failed).toEqual(['flaky.jpg — Failed to fetch'])
  })
})
