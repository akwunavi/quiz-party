// ═══ Лобби «Книги» 10.74: кожаная лента заголовка — ассет с альфой и лёгкий, 9-slice в CSS согласован с ассетом, ёлка без мерцающих лампочек ═══
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(__dirname, '../../..')
const css = (f: string) => fs.readFileSync(path.join(ROOT, 'src/styles/parts', f), 'utf8')

describe('Книга: лента лобби (lobby-ribbon.webp)', () => {
  const buf = fs.readFileSync(path.join(ROOT, 'public/ny-book/lobby-ribbon.webp'))
  it('webp с альфа-каналом (фон вырезан), вес до 150 КБ, размер 1300×256', () => {
    expect(buf.subarray(0, 4).toString()).toBe('RIFF')
    expect(buf.subarray(8, 12).toString()).toBe('WEBP')
    expect(buf.subarray(12, 16).toString()).toBe('VP8X')            // расширенный формат: флаги в байте 20
    expect(buf[20] & 0x10).toBe(0x10)                                // бит 4 — есть альфа
    const w = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)), h = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16))
    expect(w).toBe(1300); expect(h).toBe(256)
    expect(buf.length).toBeLessThan(150 * 1024)
  })
  it('CSS: 9-slice по краям 175 px файла (концы не тянутся), ширина концов = 175·масштаб, высота элемента = 256·масштаб', () => {
    const m = /\.bk-ribbon \{[^}]*\}/.exec(css('40a-ny-book-core.css'))![0]
    expect(m).toMatch(/lobby-ribbon\.webp'\) 0 175 0 175 fill \/ 0 108\.5px \/ 0 stretch/)
    const k = 108.5 / 175, hgt = /height: (\d+(?:\.\d+)?)px/.exec(m)![1]
    expect(Math.abs(Number(hgt) - 256 * k)).toBeLessThan(1)         // пропорции без деформации
  })
  it('ёлка рядом с QR: без лампочек (без анимации), только в лобби (sparse)', () => {
    const src = fs.readFileSync(path.join(ROOT, 'src/ny/book/BookStage.tsx'), 'utf8')
    const line = src.split('\n').find(l => l.includes('x: 470'))!
    expect(line).toMatch(/lamps: 0/)
    expect(line).toMatch(/on: \['sparse'\]/)
  })
})
