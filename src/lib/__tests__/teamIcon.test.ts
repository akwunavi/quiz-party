// ═══ Значок команды: эмодзи → файл public/emoji ═══
import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { teamIconFile, teamIconUrl } from '../teamIcon'
import { TEAM_EMOJI_GROUPS } from '../teamEmoji'

describe('teamIcon', () => {
  it('кодовые точки без FE0F', () => {
    expect(teamIconFile('🦁')).toBe('1f981.svg')
    expect(teamIconFile('❄️')).toBe('2744.svg')
    expect(teamIconFile('🕯️')).toBe('1f56f.svg')
  })
  it('значок вне набора и пустые — null (рисуется текстом, как раньше)', () => {
    expect(teamIconFile('🥑')).toBeNull()
    expect(teamIconFile('')).toBeNull()
    expect(teamIconFile(null)).toBeNull()
  })
  it('url от base', () => { expect(teamIconUrl('/quiz-party/', '🦁')).toBe('/quiz-party/emoji/1f981.svg') })
  it('для КАЖДОГО предлагаемого значка файл лежит в public/emoji', () => {
    for (const g of TEAM_EMOJI_GROUPS) for (const e of g.items) {
      const f = teamIconFile(e)
      expect(f, e).not.toBeNull()
      expect(existsSync(`public/emoji/${f}`), `${e} -> ${f}`).toBe(true)
    }
  })
  it('в списке нет повторов (иначе ключи React и сетка двоятся)', () => {
    const all = TEAM_EMOJI_GROUPS.flatMap(g => g.items)
    expect(new Set(all).size).toBe(all.length)
  })
})
