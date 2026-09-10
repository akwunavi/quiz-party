import { describe, it, expect } from 'vitest'
import { buildSlidePlan } from '../pptxExport'
import type { LoadedPack } from '../packLoader'
import type { AnswerSpec, Question } from '../../types/quiz'

// Тестируем ТОЛЬКО слой А (buildSlidePlan) — чистая функция, без сети и без
// pptxgenjs. Слой Б (renderBackupPptx) собирает реальный .pptx и проверяется
// отдельным smoke-тестом ниже.

const q = (over: Partial<Question> = {}): Question => ({
  id: over.id ?? 'q1', round_id: 'r1', position: 0,
  question_text: 'Вопрос?', media: { question: [], answer: [] },
  answer: { mode: 'free_text', correct: 'да', display: 'да' },
  answer_note: null, service: {}, is_final_question: false, status: 'ready',
  hidden: false,
  ...over,
})

const round = (over: Record<string, unknown> = {}) => ({
  id: 'r1', pack_id: 'p1', position: 0, mechanic: 'standard',
  title_lines: ['РАУНД 1'], rules: ['правило раз', 'правило два'],
  rules_audio: null, timer_seconds: 30, settings: {}, off_scoreboard: false,
  answers_reveal: 'after_question', meta_line_override: null, status: 'ready',
  questions: [q()],
  ...over,
})

const pack = (rounds: unknown[]): LoadedPack => ({
  id: 'p1', name: 'Тестовый пак', status: 'ready', theme: 'classic',
  created_at: '', updated_at: '',
  rounds: rounds as LoadedPack['rounds'],
} as LoadedPack)

describe('buildSlidePlan', () => {
  it('раунд с пропускаемой механикой даёт ровно один слайд-заглушку', () => {
    const p = pack([round({ mechanic: 'jeopardy', title_lines: ['СВОЯ ИГРА'], questions: [q(), q({ id: 'q2' })] })])
    const plan = buildSlidePlan(p)
    // титул + 1 заглушка
    expect(plan.slides).toHaveLength(2)
    expect(plan.slides[1]).toMatchObject({ kind: 'skip', heading: 'СВОЯ ИГРА' })
    expect(plan.slides[1].body).toContain('пропускаем')
  })

  it('все четыре пропускаемые механики дают заглушку', () => {
    for (const mechanic of ['jeopardy', 'melody', 'race', 'blitz']) {
      const p = pack([round({ mechanic })])
      const plan = buildSlidePlan(p)
      expect(plan.slides[1].kind).toBe('skip')
    }
  })

  it('включённая механика: заголовок раунда + вопрос/ответ на каждый не-hidden вопрос', () => {
    const p = pack([round({
      mechanic: 'standard',
      questions: [q({ id: 'a' }), q({ id: 'b', hidden: true }), q({ id: 'c' })],
    })])
    const plan = buildSlidePlan(p)
    // титул + заголовок раунда + (вопрос+ответ) × 2 не-hidden вопроса
    expect(plan.slides).toHaveLength(1 + 1 + 2 * 2)
    expect(plan.slides[1]).toMatchObject({ kind: 'round_title', heading: 'РАУНД 1' })
    expect(plan.slides[1].lines).toEqual(['правило раз', 'правило два'])
    expect(plan.slides[2].kind).toBe('question')
    expect(plan.slides[3].kind).toBe('answer')
    expect(plan.slides[4].kind).toBe('question')
    expect(plan.slides[5].kind).toBe('answer')
  })

  it('порядок раундов соответствует position (порядок pack.rounds)', () => {
    const p = pack([
      round({ id: 'r1', title_lines: ['ПЕРВЫЙ'], questions: [] }),
      round({ id: 'r2', title_lines: ['ВТОРОЙ'], questions: [] }),
    ])
    const plan = buildSlidePlan(p)
    const headings = plan.slides.filter(s => s.kind === 'round_title').map(s => s.heading)
    expect(headings).toEqual(['ПЕРВЫЙ', 'ВТОРОЙ'])
  })

  it('титульный слайд содержит имя пакета и пометку про автономность', () => {
    const plan = buildSlidePlan(pack([]))
    expect(plan.slides[0]).toMatchObject({ kind: 'title', heading: 'Тестовый пак' })
    expect(plan.slides[0].lines?.join(' ')).toContain('без сети и без приложения')
  })

  describe('содержание слайда ответа по режиму AnswerSpec', () => {
    const answerPlan = (answer: AnswerSpec) => {
      const p = pack([round({ mechanic: 'standard', questions: [q({ answer })] })])
      return buildSlidePlan(p).slides.find(s => s.kind === 'answer')!
    }

    it('free_text → display', () => {
      const s = answerPlan({ mode: 'free_text', correct: 'да / ага', display: 'Да' })
      expect(s.body).toBe('Да')
    })

    it('free_text с массивом display склеивается через " / "', () => {
      const s = answerPlan({ mode: 'free_text', correct: 'x', display: ['Да', 'Ага'] })
      expect(s.body).toBe('Да / Ага')
    })

    it('choice → список вариантов, верный помечен', () => {
      const s = answerPlan({
        mode: 'choice',
        choices: [{ key: 'А', text: 'Кошка' }, { key: 'Б', text: 'Собака' }],
        correct_choice: 'Б', display: 'Собака',
      })
      expect(s.lines).toEqual(['А) Кошка', '✔ Б) Собака'])
    })

    it('order → буквы сопоставлены с текстом варианта по correct_order', () => {
      const s = answerPlan({
        mode: 'order',
        choices: [{ key: 'А', text: 'Первое' }, { key: 'Б', text: 'Второе' }],
        correct_order: 'БА', display: ['Второе', 'Первое'],
      })
      expect(s.lines).toEqual(['Б → Второе', 'А → Первое'])
    })

    it('match → correct_pairs сопоставлены с left/right_labels', () => {
      const s = answerPlan({
        mode: 'match',
        left: ['Пушкин', 'Толстой'],
        right: ['1', '2'],
        right_labels: ['Евгений Онегин', 'Война и мир'],
        correct_pairs: ['Пушкин1', 'Толстой2'],
        display: '',
      })
      expect(s.lines).toEqual(['Пушкин → Евгений Онегин', 'Толстой → Война и мир'])
    })

    it('crossword_word → word', () => {
      const s = answerPlan({ mode: 'crossword_word', word: 'СЛОВО' })
      expect(s.body).toBe('СЛОВО')
    })

    it('none → display (ручная оценка)', () => {
      const s = answerPlan({ mode: 'none', display: 'на усмотрение ведущего' })
      expect(s.body).toBe('на усмотрение ведущего')
    })
  })

  describe('mediaPaths', () => {
    it('содержит пути вопроса, ответа и озвучки без дублей', () => {
      const p = pack([round({
        mechanic: 'standard',
        questions: [q({
          media: { question: ['p/q1.jpg', 'p/q2.jpg'], voice: 'p/voice.mp3', answer: ['p/a1.jpg'] },
        })],
      })])
      const plan = buildSlidePlan(p)
      expect(plan.mediaPaths.sort()).toEqual(['p/a1.jpg', 'p/q1.jpg', 'p/q2.jpg', 'p/voice.mp3'])
    })

    it('не включает пути скрытых вопросов', () => {
      const p = pack([round({
        mechanic: 'standard',
        questions: [q({ hidden: true, media: { question: ['skip.jpg'], answer: [] } })],
      })])
      expect(buildSlidePlan(p).mediaPaths).toEqual([])
    })

    it('не включает пути из пропущенных механик', () => {
      const p = pack([round({
        mechanic: 'blitz',
        questions: [q({ media: { question: ['blitz.jpg'], answer: [] } })],
      })])
      expect(buildSlidePlan(p).mediaPaths).toEqual([])
    })

    it('без дублей, если один и тот же путь встречается дважды', () => {
      const p = pack([round({
        mechanic: 'standard',
        questions: [
          q({ id: 'a', media: { question: ['shared.jpg'], answer: [] } }),
          q({ id: 'b', media: { question: ['shared.jpg'], answer: [] } }),
        ],
      })])
      expect(buildSlidePlan(p).mediaPaths).toEqual(['shared.jpg'])
    })
  })
})
