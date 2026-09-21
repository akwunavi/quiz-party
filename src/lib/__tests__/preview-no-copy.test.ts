// ═══ Анти-регрессия: предпросмотр не должен обрастать своей копией вёрстки ═══
// До 9.51 QuestionPreview.tsx был независимой копией разметки боевого
// экрана (HANDOFF.md) — не знал ни про масштаб картинки, ни про рамку
// темы, ни про 6 из 13 механик. Теперь он тонкая оболочка, маршрутизирующая
// на ТЕ ЖЕ компоненты, что использует проектор. Если кто-то снова начнёт
// дописывать сюда разметку вместо переиспользования — этот тест должен
// сказать об этом словами, а не молчать месяцами (тот же приём уже
// применяется в pptxExport.test.ts).
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const file = join(here, '..', '..', 'pages', 'editor', 'QuestionPreview.tsx')
const src = readFileSync(file, 'utf8')

const FORBIDDEN = [
  'q-media-grid', 'choices-grid', 'q-text', 'sprint-card', 'host-topbar',
  'q-split', 'img-answers', 'answer-reveal',
]

describe('QuestionPreview.tsx — не должен держать свою копию вёрстки', () => {
  for (const cls of FORBIDDEN) {
    it(`не содержит "${cls}" — это разметка QuestionScreen/rounds, не предпросмотра`, () => {
      expect(src.includes(cls)).toBe(false)
    })
  }

  it('маршрутизирует по round.mechanic, а не рисует switch по q.answer.mode сам', () => {
    expect(src).toContain('round.mechanic')
  })
})
