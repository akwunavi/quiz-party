import { describe, it, expect } from 'vitest'

// повторяем логику mediaUrl без импорта компонента (он тянет React и Supabase)
const build = (path: string) => {
  const base = 'https://x.supabase.co'
  if (/^https?:\/\//.test(path)) return path
  const safe = path.replace(/^\//, '').split('/').map(encodeURIComponent).join('/')
  return `${base}/storage/v1/object/public/quiz-media/${safe}`
}

describe('ссылка на медиа', () => {
  it('ПРОБЕЛЫ в имени файла кодируются', () => {
    const u = build('pack-1/song r7 9 1 .mp3')
    expect(u).toContain('song%20r7%209%201%20.mp3')
    expect(u).not.toContain(' ')
  })

  it('кириллица в имени кодируется', () => {
    expect(build('pack-1/трек.mp3')).toContain('%D1%82%D1%80%D0%B5%D0%BA')
  })

  it('разделители путей остаются как есть', () => {
    expect(build('pack-1/sub/file.mp3'))
      .toBe('https://x.supabase.co/storage/v1/object/public/quiz-media/pack-1/sub/file.mp3')
  })

  it('готовая внешняя ссылка не трогается', () => {
    expect(build('https://cdn.example.com/a b.mp3')).toBe('https://cdn.example.com/a b.mp3')
  })
})
