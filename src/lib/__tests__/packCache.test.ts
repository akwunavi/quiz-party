import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach } from 'vitest'
import {
  savePack, readPack, clearPack, saveMedia, readMedia, hasMedia, listMediaPaths, estimateSize,
} from '../packCache'

// fake-indexeddb держит состояние между тестами файла — своя БД на файл,
// но не на тест, поэтому чистим то, что писали, руками где важно.

describe('packCache', () => {
  beforeEach(async () => {
    await clearPack('p1')
    await clearPack('p2')
  })

  it('сохраняет и читает пакет целиком', async () => {
    const pack = { id: 'p1', name: 'Тест', rounds: [{ id: 'r1' }] }
    await savePack('p1', pack)
    expect(await readPack('p1')).toEqual(pack)
  })

  it('readPack отдаёт null для незнакомого id', async () => {
    expect(await readPack('nope')).toBeNull()
  })

  it('clearPack стирает только свой пакет', async () => {
    await savePack('p1', { a: 1 })
    await savePack('p2', { b: 2 })
    await clearPack('p1')
    expect(await readPack('p1')).toBeNull()
    expect(await readPack('p2')).toEqual({ b: 2 })
  })

  it('сохраняет и читает медиа-блоб', async () => {
    const blob = new Blob(['hello'], { type: 'image/png' })
    await saveMedia('pack-p1/a.png', blob, 'image/png')
    const back = await readMedia('pack-p1/a.png')
    expect(back).not.toBeNull()
    expect(back!.size).toBe(blob.size)
  })

  it('readMedia отдаёт null, если файла нет в кеше', async () => {
    expect(await readMedia('pack-p1/missing.png')).toBeNull()
  })

  it('hasMedia не читает блоб, только проверяет наличие ключа', async () => {
    expect(await hasMedia('pack-p1/x.mp3')).toBe(false)
    await saveMedia('pack-p1/x.mp3', new Blob(['x']), 'audio/mpeg')
    expect(await hasMedia('pack-p1/x.mp3')).toBe(true)
  })

  it('listMediaPaths фильтрует по префиксу pack-<id>/', async () => {
    await saveMedia('pack-listp1/one.png', new Blob(['1']), 'image/png')
    await saveMedia('pack-listp1/two.mp3', new Blob(['2']), 'audio/mpeg')
    await saveMedia('pack-other/three.png', new Blob(['3']), 'image/png')
    const paths = await listMediaPaths('listp1')
    expect(paths.sort()).toEqual(['pack-listp1/one.png', 'pack-listp1/two.mp3'])
  })

  it('estimateSize не падает, даже если navigator.storage недоступен', async () => {
    const res = await estimateSize()
    expect(res).toHaveProperty('usage')
    expect(res).toHaveProperty('quota')
  })
})
