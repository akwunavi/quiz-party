import { describe, it, expect } from 'vitest'
import { validatePack } from '../validate'
import type { LoadedPack } from '../packLoader'

// 9.76: у сопоставления до 6 картинок — число картинок обязано совпадать с
// числом пар, иначе номера на картинках пропадают, а команды не могут
// ответить про «лишние» (кнопки на телефоне строятся по числу пар).
const pack = (n: number, imgs: number) => ({
  id: 'p', name: 'P', status: 'draft', theme: 'classic', settings: {},
  rounds: [{
    id: 'r', pack_id: 'p', position: 0, mechanic: 'standard', title_lines: ['Р'], rules: [],
    timer_seconds: 30, settings: {}, off_scoreboard: false, answers_reveal: 'after_round',
    questions: [{
      id: 'q', round_id: 'r', position: 0, question_text: 'Сопоставьте', hidden: false,
      media: { question: Array.from({ length: imgs }, (_, i) => `p/${i}.jpg`), answer: [] },
      answer: { mode: 'match', left: Array.from({ length: n }, (_, i) => String(i + 1)),
        right: ['А', 'Б', 'В', 'Г', 'Д', 'Е'].slice(0, n),
        correct_pairs: Array.from({ length: n }, (_, i) => `${i + 1}${'АБВГДЕ'[i]}`), display: '' },
      answer_note: null, service: {}, is_final_question: false, status: 'ready',
    }],
  }],
}) as unknown as LoadedPack

const mismatch = (p: LoadedPack) => validatePack(p).some(x => /Картинок \d+, а пар \d+/.test(x.text))

describe('проверка пакета: сопоставление картинок и пар (9.76)', () => {
  it('6 картинок на 4 пары — предупреждение', () => expect(mismatch(pack(4, 6))).toBe(true))
  it('6 картинок на 6 пар — порядок', () => expect(mismatch(pack(6, 6))).toBe(false))
  it('без картинок (пары по тексту) — порядок', () => expect(mismatch(pack(4, 0))).toBe(false))
})
