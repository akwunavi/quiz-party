import { describe, it, expect, vi } from 'vitest'
vi.mock('../packCache', () => ({ readMedia: vi.fn() }))
vi.mock('../transport/mode', () => ({ isLocalMode: () => false }))
const { normalizeMediaLink, SITE_BASE } = await import('../media')

// 9.81: ведущий не помнит, как писать путь — годится любой разумный вариант
describe('ссылка на медиа без полного пути', () => {
  const want = SITE_BASE + 'main.mp3'
  it.each([
    'main.mp3', '/main.mp3', './main.mp3', 'public/main.mp3', 'docs/main.mp3',
    'quiz-party/main.mp3', '/quiz-party/main.mp3', 'akwunavi.github.io/quiz-party/main.mp3',
    '  "main.mp3"  ', '«main.mp3»', 'public\\\\main.mp3',
  ])('«%s» → полный адрес', input => {
    expect(normalizeMediaLink(input)).toBe(want)
  })

  it('полный адрес остаётся как есть', () => {
    expect(normalizeMediaLink('https://example.com/a.mp3')).toBe('https://example.com/a.mp3')
  })

  it('пробелы и кириллица в имени кодируются, папки сохраняются', () => {
    expect(normalizeMediaLink('музыка/Новый год.mp3'))
      .toBe(SITE_BASE + encodeURIComponent('музыка') + '/' + encodeURIComponent('Новый год.mp3'))
  })

  it('пусто — ничего', () => {
    expect(normalizeMediaLink('   ')).toBeNull()
    expect(normalizeMediaLink('public/')).toBeNull()
  })
})
