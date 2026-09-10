import { describe, it, expect, vi } from 'vitest'
import type { LoadedPack } from '../packLoader'
import type { Question } from '../../types/quiz'

// Слой Б (renderBackupPptx) — минимальный smoke-тест: сеть и pptxgenjs
// замоканы, бинарное содержимое .pptx не проверяем (неподъёмно юнит-тестом,
// см. CLAUDE.md/HANDOFF.md). Проверяем только: не падает, возвращает Blob,
// onProgress вызывается по каждому скачанному файлу, а «упавший» файл не
// роняет всю генерацию.

vi.mock('../media', () => ({
  fetchMediaBlob: vi.fn(async (path: string) => {
    if (path.includes('broken')) throw new Error('ФАЙЛА НЕТ В ХРАНИЛИЩЕ')
    return new Blob(['x'], { type: 'image/jpeg' })
  }),
}))

// Достаточно замокать конструктор с теми методами, что реально вызывает renderBackupPptx.
class FakeSlide {
  background?: unknown
  addText() { return this }
  addImage() { return this }
  addMedia() { return this }
  addNotes() { return this }
}
class FakePptxGenJS {
  layout = ''
  slides: FakeSlide[] = []
  addSlide() { const s = new FakeSlide(); this.slides.push(s); return s }
  async write() { return new Blob(['pptx-bytes'], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }) }
}
vi.mock('pptxgenjs', () => ({ default: FakePptxGenJS }))

const { renderBackupPptx } = await import('../pptxExport')

const q = (over: Partial<Question> = {}): Question => ({
  id: over.id ?? 'q1', round_id: 'r1', position: 0,
  question_text: 'Вопрос?', media: { question: [], answer: [] },
  answer: { mode: 'free_text', correct: 'да', display: 'да' },
  answer_note: null, service: {}, is_final_question: false, status: 'ready',
  hidden: false,
  ...over,
})

const pack: LoadedPack = {
  id: 'p1', name: 'Смоук-пак', status: 'ready', theme: 'classic',
  created_at: '', updated_at: '',
  rounds: [{
    id: 'r1', pack_id: 'p1', position: 0, mechanic: 'standard',
    title_lines: ['РАУНД 1'], rules: [], rules_audio: null, timer_seconds: 30,
    settings: {}, off_scoreboard: false, answers_reveal: 'after_question',
    meta_line_override: null, status: 'ready',
    questions: [
      q({ id: 'a', media: { question: ['p/q1.jpg'], answer: ['p/a1.jpg'] } }),
      q({ id: 'b', media: { question: ['p/broken.jpg'], answer: [] } }),
    ],
  }] as LoadedPack['rounds'],
}

describe('renderBackupPptx (smoke)', () => {
  it('не падает, возвращает Blob и зовёт onProgress по каждому файлу', async () => {
    const progress: Array<[number, number]> = []
    const blob = await renderBackupPptx(pack, (done, total) => progress.push([done, total]))
    expect(blob).toBeInstanceOf(Blob)
    // 3 media-пути: p/q1.jpg, p/a1.jpg, p/broken.jpg — один из них падает,
    // но не роняет всю генерацию
    expect(progress.length).toBe(3)
    expect(progress[progress.length - 1]).toEqual([3, 3])
  })
})
