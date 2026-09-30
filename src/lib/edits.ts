// ═══ УЧЁТ ПРАВОК ОТВЕТА ═══
// Сопоставление и порядок команда набирает ПО ЧАСТЯМ: тап по паре, тап по
// следующей. Раньше каждый такой тап считался отдельной правкой, и лимит
// (обычно 2) съедался ещё до того, как ответ был введён целиком.
//
// Правило: правка засчитывается ТОЛЬКО за смену уже готового ответа на
// другой готовый. Набор первого ответа бесплатен, сколько бы тапов он ни занял.
import type { AnswerSpec } from '../types/quiz'
import { anagramLetterCount, anagramTemplate } from './anagram'

export function isComplete(spec: AnswerSpec, text: string): boolean {
  if (!text) return false
  if (spec.mode === 'match') return text.split(',').filter(Boolean).length >= spec.left.length
  if (spec.mode === 'order') return text.length >= spec.choices.length
  // «Скрэмбл»: готов, когда собраны ВСЕ буквы (иначе частичная отправка была
  // бы бесплатной правкой). Считаем именно буквы: цифры/знаки фразы стоят на
  // месте сами и попадают в текст даже при пустых клетках.
  if (spec.mode === 'anagram') return anagramLetterCount(text) >= anagramTemplate(spec.phrase).letters.length
  return true
}

export function spendsEdit(spec: AnswerSpec, prev: string, next: string): boolean {
  return isComplete(spec, prev) && isComplete(spec, next) && prev !== next
}
