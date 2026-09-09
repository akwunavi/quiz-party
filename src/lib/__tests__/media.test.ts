import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mediaUrl, primeMedia, releaseMedia, fetchMediaBlob } from '../media'
import { saveMedia, clearPack } from '../packCache'

describe('mediaUrl / primeMedia / releaseMedia', () => {
  beforeEach(async () => {
    await clearPack('t1')
    releaseMedia(['pack-t1/a.png', 'pack-t1/b.mp3'])
  })

  it('пустая карта — mediaUrl ведёт себя как раньше (сетевой адрес)', () => {
    const u = mediaUrl('pack-t1/a.png')
    expect(u).toContain('/storage/v1/object/public/quiz-media/pack-t1/a.png')
  })

  it('primeMedia прогревает blob-URL для скачанных файлов, mediaUrl его отдаёт', async () => {
    const blob = new Blob(['x'], { type: 'image/png' })
    await saveMedia('pack-t1/a.png', blob, 'image/png')
    await primeMedia(['pack-t1/a.png', 'pack-t1/missing.png'])
    const u = mediaUrl('pack-t1/a.png')
    expect(u.startsWith('blob:')).toBe(true)
    // файла, которого нет в кеше, карта не касается — обычный сетевой адрес
    expect(mediaUrl('pack-t1/missing.png')).toContain('/storage/v1/object/public/quiz-media/')
  })

  it('releaseMedia чистит карту — mediaUrl снова отдаёт сетевой адрес', async () => {
    const blob = new Blob(['x'], { type: 'image/png' })
    await saveMedia('pack-t1/a.png', blob, 'image/png')
    await primeMedia(['pack-t1/a.png'])
    expect(mediaUrl('pack-t1/a.png').startsWith('blob:')).toBe(true)
    releaseMedia(['pack-t1/a.png'])
    expect(mediaUrl('pack-t1/a.png')).toContain('/storage/v1/object/public/quiz-media/')
  })

  it('внешняя ссылка (http) не участвует в blob-карте', () => {
    expect(mediaUrl('https://cdn.example.com/a.png')).toBe('https://cdn.example.com/a.png')
  })
})

describe('fetchMediaBlob', () => {
  const realFetch = globalThis.fetch

  afterEach(() => { globalThis.fetch = realFetch })

  it('успешный ответ — возвращает Blob', async () => {
    globalThis.fetch = vi.fn(async () => new Response(new Blob(['ok']), { status: 200 })) as unknown as typeof fetch
    const blob = await fetchMediaBlob('pack-t1/a.png')
    expect(blob).toBeInstanceOf(Blob)
  })

  it('404 с телом "not_found" — понятная ошибка "файла нет"', async () => {
    globalThis.fetch = vi.fn(async () => new Response('{"error":"not_found"}', { status: 404 })) as unknown as typeof fetch
    await expect(fetchMediaBlob('pack-t1/missing.png')).rejects.toThrow(/ФАЙЛА НЕТ/)
  })

  it('500 — ошибка с кодом сервера', async () => {
    globalThis.fetch = vi.fn(async () => new Response('boom', { status: 500 })) as unknown as typeof fetch
    await expect(fetchMediaBlob('pack-t1/a.png')).rejects.toThrow(/500/)
  })
})
