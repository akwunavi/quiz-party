// ═══ «Книга»: карточка команды — геометрия нарезки совпадает с реальным ассетом ═══
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { TC, TC_INNER } from '../book/BookTeamCard'

/** Размер WebP из заголовка (VP8X / VP8L / VP8). */
function webpSize(buf: Buffer): { w: number; h: number } {
  const t = buf.toString('ascii', 12, 16)
  if (t === 'VP8X') return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) }
  if (t === 'VP8L') { const b = buf.readUInt32LE(21); return { w: 1 + (b & 0x3fff), h: 1 + ((b >> 14) & 0x3fff) } }
  return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff }
}
describe('BookTeamCard: ассет и нарезка', () => {
  it('public/ny-book/team-card.webp есть и по размеру равен TC (1453×662)', () => {
    expect(existsSync('public/ny-book/team-card.webp')).toBe(true)
    expect(webpSize(readFileSync('public/ny-book/team-card.webp'))).toEqual({ w: TC.w, h: TC.h })
  })
  it('края не съедают середину, полезная область пергамента — положительная доля высоты', () => {
    expect(TC.left + TC.right).toBeLessThan(TC.w * 0.5)
    expect(TC.top + TC.bottom).toBeLessThan(TC.h)
    expect(TC_INNER).toBeGreaterThan(0.4); expect(TC_INNER).toBeLessThan(0.7)
  })
})
