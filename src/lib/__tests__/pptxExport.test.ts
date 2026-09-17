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
  it('раунд с пропускаемой механикой не даёт НИ ОДНОГО слайда — как будто его нет', () => {
    const p = pack([round({ mechanic: 'jeopardy', title_lines: ['СВОЯ ИГРА'], questions: [q(), q({ id: 'q2' })] })])
    const plan = buildSlidePlan(p)
    // только титульный слайд — раунд целиком пропущен, финала тоже нет (не
    // было ни одного показанного раунда)
    expect(plan.slides).toHaveLength(1)
    expect(plan.slides.every(s => s.heading !== 'СВОЯ ИГРА')).toBe(true)
  })

  it('все четыре пропускаемые механики дают ноль слайдов на раунд', () => {
    for (const mechanic of ['jeopardy', 'melody', 'race', 'blitz']) {
      const p = pack([round({ mechanic }), round({ id: 'r2', mechanic: 'standard', questions: [] })])
      const plan = buildSlidePlan(p)
      // титул + round_intro второго раунда (без вопросов) + финал — от
      // пропущенного раунда НИ ОДНОГО слайда
      expect(plan.slides.some(s => s.kind === 'round_intro')).toBe(true)
      expect(plan.slides).toHaveLength(3)
    }
  })

  it('порядок раундов соответствует position (порядок pack.rounds)', () => {
    const p = pack([
      round({ id: 'r1', title_lines: ['ПЕРВЫЙ'], questions: [] }),
      round({ id: 'r2', title_lines: ['ВТОРОЙ'], questions: [] }),
    ])
    const plan = buildSlidePlan(p)
    const headings = plan.slides.filter(s => s.kind === 'round_intro').map(s => s.heading)
    expect(headings).toEqual(['ПЕРВЫЙ', 'ВТОРОЙ'])
  })

  it('титульный слайд содержит имя пакета и пометку про автономность', () => {
    const plan = buildSlidePlan(pack([]))
    expect(plan.slides[0]).toMatchObject({ kind: 'title', heading: 'Тестовый пак' })
    expect(plan.slides[0].lines?.join(' ')).toContain('без сети и без приложения')
  })

  it('финальный слайд появляется, только если был хотя бы один непропущенный раунд', () => {
    const withRound = buildSlidePlan(pack([round({ questions: [] })]))
    expect(withRound.slides[withRound.slides.length - 1]).toMatchObject({ kind: 'title', heading: 'ФИНАЛ' })

    const onlySkipped = buildSlidePlan(pack([round({ mechanic: 'blitz' })]))
    expect(onlySkipped.slides.some(s => s.heading === 'ФИНАЛ')).toBe(false)
  })

  it('four_pics НЕ пропускается: даёт слайды вопроса и ответа как обычный раунд', () => {
    const p = pack([round({
      mechanic: 'four_pics', title_lines: ['3 ПОПЫТКИ'],
      questions: [q({ answer: { mode: 'crossword_word', word: 'СЛОВО' },
        media: { question: ['a.jpg', 'b.jpg'], answer: [] } })],
    })])
    const plan = buildSlidePlan(p)
    const kinds = plan.slides.map(s => s.kind)
    expect(kinds).toContain('question')
    expect(kinds).toContain('answer')
    const answer = plan.slides.find(s => s.kind === 'answer')
    expect(answer?.body).toBe('СЛОВО')
  })

  describe('порядок вопрос/ответ по answers_reveal (главный сценарий)', () => {
    it('after_question: интерливинг Q1,A1,Q2,A2 — ровно как решает HostScreen кнопкой "Показать ответ"', () => {
      const p = pack([round({
        answers_reveal: 'after_question',
        questions: [q({ id: 'a' }), q({ id: 'b' })],
      })])
      const kinds = buildSlidePlan(p).slides.map(s => s.kind)
      expect(kinds).toEqual(['title', 'round_intro', 'question', 'answer', 'question', 'answer', 'title'])
    })

    it('after_round: сначала ВСЕ вопросы, потом отдельным блоком ВСЕ ответы — не question→answer→question→answer', () => {
      const p = pack([round({
        answers_reveal: 'after_round',
        questions: [q({ id: 'a' }), q({ id: 'b' }), q({ id: 'c' })],
      })])
      const kinds = buildSlidePlan(p).slides.map(s => s.kind)
      expect(kinds).toEqual([
        'title', 'round_intro',
        'question', 'question', 'question',
        'answer_time',
        'answer', 'answer', 'answer',
        'title',
      ])
    })

    it('after_round + recap_before_answers: вопросы ещё раз слайдами ПЕРЕД answer_time', () => {
      const p = pack([round({
        answers_reveal: 'after_round',
        settings: { recap_before_answers: true },
        questions: [q({ id: 'a' }), q({ id: 'b' })],
      })])
      const kinds = buildSlidePlan(p).slides.map(s => s.kind)
      expect(kinds).toEqual([
        'title', 'round_intro',
        'question', 'question',
        'recap', 'recap',
        'answer_time',
        'answer', 'answer',
        'title',
      ])
    })

    it('never: только вопросы, ответы на экране не появляются вообще', () => {
      const p = pack([round({
        answers_reveal: 'never',
        questions: [q({ id: 'a' }), q({ id: 'b' })],
      })])
      const slides = buildSlidePlan(p).slides
      expect(slides.map(s => s.kind)).toEqual(['title', 'round_intro', 'question', 'question', 'title'])
      expect(slides.some(s => s.kind === 'answer' || s.kind === 'answer_time')).toBe(false)
    })

    it('never: верный ответ уходит в заметки последнего слайда раунда, не на сам слайд', () => {
      const p = pack([round({
        answers_reveal: 'never',
        questions: [q({ id: 'a', answer: { mode: 'free_text', correct: 'да', display: 'Да, конечно' } })],
      })])
      const slides = buildSlidePlan(p).slides
      const lastQuestionSlide = slides.filter(s => s.kind === 'question').at(-1)!
      expect(lastQuestionSlide.body).toBe('Вопрос?')
      expect(lastQuestionSlide.notes).toContain('Да, конечно')
    })
  })

  describe('табло/перерыв после раунда', () => {
    it('show_scoreboard_after добавляет слайд scoreboard без реальных цифр', () => {
      const p = pack([round({ settings: { show_scoreboard_after: true }, questions: [] })])
      const kinds = buildSlidePlan(p).slides.map(s => s.kind)
      expect(kinds).toEqual(['title', 'round_intro', 'scoreboard', 'title'])
    })

    it('break_after_minutes добавляет слайд break с числом минут в теле', () => {
      const p = pack([round({ settings: { break_after_minutes: 15 }, questions: [] })])
      const plan = buildSlidePlan(p)
      const breakSlide = plan.slides.find(s => s.kind === 'break')!
      expect(breakSlide.body).toContain('15')
    })

    it('оба флага вместе идут табло, потом перерыв', () => {
      const p = pack([round({
        settings: { show_scoreboard_after: true, break_after_minutes: 10 }, questions: [],
      })])
      const kinds = buildSlidePlan(p).slides.map(s => s.kind)
      expect(kinds).toEqual(['title', 'round_intro', 'scoreboard', 'break', 'title'])
    })

    it('без галочек — ни scoreboard, ни break', () => {
      const p = pack([round({ questions: [] })])
      const kinds = buildSlidePlan(p).slides.map(s => s.kind)
      expect(kinds).not.toContain('scoreboard')
      expect(kinds).not.toContain('break')
    })
  })

  describe('содержание слайда ВОПРОСА — варианты видны ДО раскрытия, как в игре', () => {
    const questionPlan = (answer: AnswerSpec) => {
      const p = pack([round({ mechanic: 'standard', questions: [q({ answer })] })])
      return buildSlidePlan(p).slides.find(s => s.kind === 'question')!
    }

    it('choice → плитки без пометки верного', () => {
      const s = questionPlan({
        mode: 'choice',
        choices: [{ key: 'А', text: 'Кошка' }, { key: 'Б', text: 'Собака' }],
        correct_choice: 'Б', display: 'Собака',
      })
      expect(s.choices).toEqual([{ key: 'А', text: 'Кошка' }, { key: 'Б', text: 'Собака' }])
      expect(s.choices?.every(c => !c.correct)).toBe(true)
    })

    it('order → плитки в ИСХОДНОМ (не отсортированном) порядке, без пометки', () => {
      const s = questionPlan({
        mode: 'order',
        choices: [{ key: 'А', text: 'Первое' }, { key: 'Б', text: 'Второе' }],
        correct_order: 'БА', display: ['Второе', 'Первое'],
      })
      expect(s.choices).toEqual([{ key: 'А', text: 'Первое' }, { key: 'Б', text: 'Второе' }])
    })

    it('match с right_labels → список целей на слайде вопроса', () => {
      const s = questionPlan({
        mode: 'match',
        left: ['Пушкин', 'Толстой'], right: ['1', '2'],
        right_labels: ['Евгений Онегин', 'Война и мир'],
        correct_pairs: ['Пушкин1', 'Толстой2'], display: '',
      })
      expect(s.choices).toEqual([{ key: '1', text: 'Евгений Онегин' }, { key: '2', text: 'Война и мир' }])
    })

    it('match без right_labels → целей на вопросе нет', () => {
      const s = questionPlan({
        mode: 'match', left: ['Пушкин'], right: ['1'],
        correct_pairs: ['Пушкин1'], display: '',
      })
      expect(s.choices).toBeUndefined()
    })

    it('free_text/none/crossword_word → на вопросе только текст, без плиток', () => {
      expect(questionPlan({ mode: 'free_text', correct: 'да', display: 'да' }).choices).toBeUndefined()
      expect(questionPlan({ mode: 'none', display: 'на усмотрение' }).choices).toBeUndefined()
      expect(questionPlan({ mode: 'crossword_word', word: 'СЛОВО' }).choices).toBeUndefined()
    })
  })

  describe('содержание слайда ОТВЕТА по режиму AnswerSpec', () => {
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

    it('choice → те же плитки, что на вопросе, верная помечена', () => {
      const s = answerPlan({
        mode: 'choice',
        choices: [{ key: 'А', text: 'Кошка' }, { key: 'Б', text: 'Собака' }],
        correct_choice: 'Б', display: 'Собака',
      })
      expect(s.choices).toEqual([
        { key: 'А', text: 'Кошка', correct: false },
        { key: 'Б', text: 'Собака', correct: true },
      ])
    })

    it('order → плитки в ПРАВИЛЬНОМ порядке, все помечены (порядок и есть ответ)', () => {
      const s = answerPlan({
        mode: 'order',
        choices: [{ key: 'А', text: 'Первое' }, { key: 'Б', text: 'Второе' }],
        correct_order: 'БА', display: ['Второе', 'Первое'],
      })
      expect(s.choices).toEqual([
        { key: '1', text: 'Второе', correct: true },
        { key: '2', text: 'Первое', correct: true },
      ])
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

    it('без дублей, если один и тот же путь встречается дважды (в т.ч. на recap)', () => {
      const p = pack([round({
        mechanic: 'standard',
        answers_reveal: 'after_round',
        settings: { recap_before_answers: true },
        questions: [
          q({ id: 'a', media: { question: ['shared.jpg'], answer: [] } }),
          q({ id: 'b', media: { question: ['shared.jpg'], answer: [] } }),
        ],
      })])
      expect(buildSlidePlan(p).mediaPaths).toEqual(['shared.jpg'])
    })
  })
})
