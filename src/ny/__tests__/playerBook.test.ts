// ═══ «Книга» на телефоне игрока 10.75: всё под классом темы, ассеты лёгкие и существуют, декор — только на экранах ожидания/разбора ═══
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(__dirname, '../../..')
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8')
const css = read('src/styles/parts/46-ny-book-player.css').replace(/\/\*[\s\S]*?\*\//g, '')

/** Селекторы всех правил файла (внутри @media тоже), без тел. */
function selectors(src: string): string[] {
  const out: string[] = []
  const re = /([^{}]+)\{/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    const sel = m[1].trim()
    if (sel.startsWith('@')) continue
    out.push(...sel.split(/,(?![^(]*\))/).map(s => s.trim()))
  }
  return out
}

describe('Книга на телефоне: стили не задевают другие темы', () => {
  it('каждый селектор файла 46 начинается с .theme-ny_book (или :has-варианта на нём)', () => {
    const bad = selectors(css).filter(s => !s.startsWith('.theme-ny_book'))
    expect(bad).toEqual([])
  })
  it('файл подключён в global.css после 41-ny-book (равный вес — выигрывает он)', () => {
    const g = read('src/styles/global.css')
    expect(g.indexOf('46-ny-book-player.css')).toBeGreaterThan(g.indexOf('41-ny-book.css'))
  })
})

describe('Книга на телефоне: декор', () => {
  const urls = [...css.matchAll(/url\('\/quiz-party\/(ny-book\/[^']+)'\)/g)].map(m => m[1])
  it('картинки CSS существуют и вместе весят до 160 КБ (hscroll 50 + гирлянда 43 + бугор 33 + ёлка 11)', () => {
    expect(urls.length).toBeGreaterThanOrEqual(4)
    let total = 0
    for (const u of new Set(urls)) { const f = path.join(ROOT, 'public', u); expect(fs.existsSync(f), u).toBe(true); total += fs.statSync(f).size }
    expect(total).toBeLessThan(160 * 1024)
  })
  it('псевдоэлементы-декор заданы только для .pl-center и .pl-calm (экраны ввода ответа без декора)', () => {
    const deco = selectors(css).filter(s => /::(before|after)/.test(s))
    expect(deco.length).toBeGreaterThan(0)
    for (const s of deco) expect(s, s).toMatch(/\.pl-center|\.pl-calm/)
  })
  it('в PlayerPage pl-calm стоит только на экранах ожидания/разбора, а не на формах ввода', () => {
    const lines = read('src/pages/PlayerPage.tsx').split('\n')
    const calm = lines.filter(l => l.includes('pl-root pl-calm'))
    expect(calm.length).toBe(5)       // «Своя игра»: ждём плитку; «3 попытки»: ждём/разбор/закрыто; разбор раунда
    // на формах ввода (AnswerForm, мелодия, скачки, скрэмбл) класса нет
    const src = lines.join('\n')
    for (const fn of ['function AnswerForm', 'function MelodyPlayer', 'function RacePlayer', 'function AnagramPlayer']) {
      const start = src.indexOf(fn); expect(start).toBeGreaterThan(0)
      const next = src.indexOf('\nfunction ', start + 10), body = src.slice(start, next < 0 ? undefined : next)
      expect(body.includes('pl-calm'), fn).toBe(false)
    }
  })
})
