// ═══ «Книга»: каталог временных ассетов совпадает с MANIFEST.json, файлы на месте ═══
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { BOOK_ASSETS, BOOK_ASSET_DIR } from '../book/assets'

const DIR = path.resolve(__dirname, '../../../public', BOOK_ASSET_DIR)

describe('Книга: временные ассеты прототипа', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(DIR, 'MANIFEST.json'), 'utf8')) as { note: string; items: { id: string; w: number; h: number }[] }
  it('манифест и README помечены как временные', () => {
    expect(manifest.note).toMatch(/ВРЕМЕННЫЕ/)
    expect(fs.readFileSync(path.join(DIR, 'README.md'), 'utf8')).toMatch(/ВРЕМЕННЫЕ/)
  })
  it('каждый ассет каталога есть в манифесте с теми же размерами, файл существует, лампочки в долях 0..1', () => {
    for (const a of Object.values(BOOK_ASSETS)) {
      const m = manifest.items.find(i => i.id === a.id)
      expect(m, a.id).toBeTruthy()
      expect([a.w, a.h]).toEqual([m!.w, m!.h])
      expect(fs.existsSync(path.join(DIR, a.src)), a.src).toBe(true)
      for (const [x, y] of a.lamps) { expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThanOrEqual(1); expect(y).toBeGreaterThanOrEqual(0); expect(y).toBeLessThanOrEqual(1) }
    }
    expect(Object.keys(BOOK_ASSETS).length).toBe(manifest.items.length)
  })
})
