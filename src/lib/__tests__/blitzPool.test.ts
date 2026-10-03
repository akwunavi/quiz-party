// ═══ Банк блица (9.80): что возвращается в банк и что забирается из него ═══
// Правила словами: в банк уходит только то, что зал НЕ видел (не показано
// ни по отметке в базе, ни в этой игре), не скрыто и чего в банке ещё нет;
// из банка в раунд — всё не скрытое, чего в раунде ещё нет. Один и тот же
// вопрос (текст без регистра/ё, тот же ответ и картинки) не задваивается.
import { describe, it, expect, vi } from 'vitest'
vi.mock('../supabase', () => ({ supabase: {} }))
vi.mock('../editorApi', () => ({ getOrCreateBank: vi.fn() }))
const { blitzToReturn, blitzToTake, blitzKey } = await import('../blitzPool')

const q = (id: string, text: string, extra: Record<string, unknown> = {}) => ({
  id, question_text: text, media: { question: [] as string[] },
  answer: { mode: 'free_text', correct: text.toUpperCase() }, answer_note: null, hidden: false,
  played_at: null as string | null, ...extra,
}) as never

describe('банк блица: возврат неотыгранных', () => {
  it('возвращается только то, что зал не видел', () => {
    const round = [q('a', 'Столица Франции'), q('b', 'Два плюс два', { played_at: '2026-10-03' }),
      q('c', 'Цвет неба'), q('d', 'Скрытый', { hidden: true })]
    expect(blitzToReturn(round, []).map((x: { id: string }) => x.id)).toEqual(['a', 'c'])
  })

  it('показанное в этой игре не возвращается, даже если отметка не долетела до базы', () => {
    const round = [q('a', 'Столица Франции'), q('c', 'Цвет неба')]
    expect(blitzToReturn(round, [], ['c']).map((x: { id: string }) => x.id)).toEqual(['a'])
  })

  it('повторный возврат ничего не задваивает (проектор + кнопка в редакторе)', () => {
    const round = [q('a', 'Столица Франции')]
    const bank = [q('z', '  столица   франции ', { answer: { mode: 'free_text', correct: 'СТОЛИЦА ФРАНЦИИ' } })] // тот же вопрос, другой регистр/пробелы
    expect(blitzToReturn(round, bank)).toEqual([])
  })
})

describe('банк блица: забрать в новый квиз', () => {
  it('забираются все не скрытые, кроме уже лежащих в раунде', () => {
    const bank = [q('x', 'Цвет неба'), q('y', 'Столица Франции'), q('h', 'Убран', { hidden: true })]
    const round = [q('r', 'Цвет неба')]
    expect(blitzToTake(bank, round).map((x: { id: string }) => x.id)).toEqual(['y'])
  })

  it('ё и е — один и тот же вопрос; разный ответ — разные вопросы', () => {
    const a = q('a', 'Ёлка'), b = q('b', 'елка')
    expect(blitzKey({ ...(a as object), answer: { mode: 'free_text', correct: 'X' } } as never))
      .toBe(blitzKey({ ...(b as object), answer: { mode: 'free_text', correct: 'X' } } as never))
    expect(blitzKey({ ...(a as object), answer: { mode: 'free_text', correct: 'X' } } as never))
      .not.toBe(blitzKey({ ...(b as object), answer: { mode: 'free_text', correct: 'Y' } } as never))
  })
})
