import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { classifyRequest } from '../swStrategy'

const ORIGIN = 'https://akwunavi.github.io'
const BASE = '/quiz-party/'

type Case = [label: string, url: string, mode: string | undefined, expected: 'network-first' | 'cache-first' | 'bypass']

// Кейсы прогоняются ДВАЖДЫ: один раз по канонической функции (импорт из
// swStrategy.ts), второй раз — по буквальной копии, вытащенной из живого
// public/sw.js (см. ниже). Расхождение — красный тест, не просроченный
// комментарий, которому никто не верит.
const CASES: Case[] = [
  ['навигация на index.html — network-first', ORIGIN + BASE, 'navigate', 'network-first'],
  ['index.html по прямому пути — network-first', ORIGIN + BASE + 'index.html', undefined, 'network-first'],
  ['корень origin — network-first', ORIGIN + '/', undefined, 'network-first'],
  ['хешированный чанк в assets — cache-first', ORIGIN + BASE + 'assets/HostScreen-a1b2c3.js', undefined, 'cache-first'],
  ['css в assets — cache-first', ORIGIN + BASE + 'assets/index-9f8e7d.css', undefined, 'cache-first'],
  ['шрифт из public/fonts — cache-first', ORIGIN + BASE + 'fonts/inter-400-normal-latin.woff2', undefined, 'cache-first'],
  ['mp3 из public — cache-first', ORIGIN + BASE + 'main.mp3', undefined, 'cache-first'],
  ['картинка медиа пакета — cache-first', ORIGIN + BASE + 'media/round1/q1.jpg', undefined, 'cache-first'],
  ['/api/* на своём origin — bypass', ORIGIN + BASE + 'api/session', undefined, 'bypass'],
  ['/api/* без base — bypass', ORIGIN + '/api/health', undefined, 'bypass'],
  ['Supabase, чужой origin — bypass', 'https://xyzcompany.supabase.co/rest/v1/teams', undefined, 'bypass'],
  ['локальный сервер бара, чужой origin — bypass', 'http://192.168.1.50:7331/api/session', undefined, 'bypass'],
  ['неизвестный путь на своём origin — network-first (как HTML)', ORIGIN + BASE + 'nonsense-route', undefined, 'network-first'],
  ['битый URL — bypass, не бросает исключение', 'http://[::1', undefined, 'bypass'],
]

describe('classifyRequest (src/lib/swStrategy.ts, каноническая версия)', () => {
  for (const [label, url, mode, expected] of CASES) {
    it(label, () => {
      expect(classifyRequest(url, ORIGIN, BASE, mode)).toBe(expected)
    })
  }
})

/** Достаёт тело `classifyRequest` буквально из public/sw.js и делает его
 *  вызываемым — чтобы тест гонял РЕАЛЬНЫЙ код Service Worker'а, а не
 *  вручную набранную «копию копии», которая сама могла разойтись с sw.js
 *  так же, как sw.js может разойтись со swStrategy.ts. */
function loadClassifyRequestFromServiceWorker(): (url: string, origin: string, base: string, mode?: string) => string {
  const swPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../public/sw.js')
  const src = readFileSync(swPath, 'utf8')

  const startMarker = '// ─── classifyRequest'
  const endMarker = '// ─── конец копии ───'
  const startIdx = src.indexOf(startMarker)
  const endIdx = src.indexOf(endMarker)
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error('public/sw.js: не нашёл границы блока classifyRequest — маркеры комментариев переименованы?')
  }
  const block = src.slice(startIdx, endIdx)

  // Намеренно: исполняем реальный текст sw.js, а не переписываем его заново.
  const factory = new Function(`${block}\nreturn classifyRequest;`)
  return factory() as (url: string, origin: string, base: string, mode?: string) => string
}

describe('classifyRequest (буквально из public/sw.js — не должен разойтись со swStrategy.ts)', () => {
  const swClassify = loadClassifyRequestFromServiceWorker()

  for (const [label, url, mode, expected] of CASES) {
    it(label, () => {
      expect(swClassify(url, ORIGIN, BASE, mode)).toBe(expected)
    })
  }

  it('даёт тот же результат, что каноническая функция, на каждом кейсе', () => {
    for (const [, url, mode] of CASES) {
      expect(swClassify(url, ORIGIN, BASE, mode)).toBe(classifyRequest(url, ORIGIN, BASE, mode))
    }
  })
})
