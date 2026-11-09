// Service Worker и библиотека собак: версия в sw.js обязана совпадать с MANIFEST.json (sha256), адреса файлов несут ?v=, чужую версию кеш не отдаёт.
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
const ROOT = path.resolve(__dirname, '../../..')
const sw = readFileSync(path.join(ROOT, 'public/sw.js'), 'utf8')
const mv = createHash('sha256').update(readFileSync(path.join(ROOT, 'public/bulldog/MANIFEST.json'))).digest('hex').slice(0, 12)

describe('Service Worker × библиотека собак', () => {
  it('BULLDOG_V в sw.js == sha256(MANIFEST.json)[0..12] (иначе после смены ассетов кеш не сменится)', () => {
    expect(sw.match(/const BULLDOG_V = '([0-9a-f]{12})'/)?.[1]).toBe(mv)
  })
  it('кеш библиотеки не удаляется при активации новой версии приложения и не смешивается с кешем приложения', () => {
    expect(sw).toMatch(/k !== CACHE && k !== BULLDOG_CACHE && k\.startsWith\('qp-'\)/)
    expect(sw).toMatch(/BULLDOG_CACHE = 'qp-bd-' \+ BULLDOG_V/)
  })
  it('версия сборки приложения (define) совпадает с версией в sw.js, адреса файлов получают ?v=', async () => {
    const { BULLDOG_V, versionedUrl, stillUrl } = await import('../bulldog/config')
    expect(BULLDOG_V).toBe(mv)
    expect(versionedUrl('/x/a.webp')).toBe(`/x/a.webp?v=${mv}`); expect(versionedUrl('/x/a.json?q=1')).toBe(`/x/a.json?q=1&v=${mv}`)
    expect(stillUrl('frenk')).toMatch(new RegExp(`bulldog/frenk/still\\.webp\\?v=${mv}$`))
  })
  it('телефону игрока нужны только still.webp: игровые листы (десятки МБ) в страницу игрока не попадают', () => {
    const sizes = ['frenk', 'zefir', 'rocky', 'pups', 'luna'].map(d => readFileSync(path.join(ROOT, `public/bulldog/${d}/still.webp`)).length)
    expect(sizes.reduce((a, b) => a + b, 0)).toBeLessThan(150 * 1024)
  })
})
