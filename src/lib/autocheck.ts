// ═══ Первичная автопроверка ответа по AnswerSpec ═══
// Возвращает true/false/null (null = пусто/не проверяем автоматически).
// Финальное слово всегда за админом (is_correct в answers).
import type { AnswerSpec } from '../types/quiz'
import { isFuzzyMatch, letterEq, normalize, isCrosswordWordCorrect } from './answerCheck'

export function autocheck(spec: AnswerSpec, answerText: string): boolean | null {
  const text = answerText ?? ''
  if (!normalize(text)) return null
  switch (spec.mode) {
    case 'free_text':
      return isFuzzyMatch(text, spec.correct)
    case 'choice':
      return letterEq(text, spec.correct_choice)
    case 'order': {
      const a = normalize(text).replace(/\s/g, '')
      const c = normalize(spec.correct_order).replace(/\s/g, '')
      return a === c
    }
    case 'match': {
      // ответ: "1А,2В,3Г,4Б" — сравнение как множества пар
      const pairs = (s: string) => new Set(
        s.split(',').map(p => normalize(p).replace(/\s/g, '')).filter(Boolean))
      const a = pairs(text), c = pairs(spec.correct_pairs.join(','))
      if (a.size !== c.size) return false
      for (const p of a) if (!c.has(p)) return false
      return true
    }
    case 'crossword_word':
      return isCrosswordWordCorrect(text, spec.word)
    case 'none':
      return null
  }
}
