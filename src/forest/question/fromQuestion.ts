// Вопрос игры → содержимое сцены Леса. Чистая функция (без сети): адреса картинок и текст ответа приходят снаружи.
import type { Question } from '../../types/quiz'
import type { ForestQ } from './ForestQuestion'

const AV = /\.(mp3|mp4|webm|wav|m4a|ogg)$/i
export function forestQFrom(q: Question, url: (p: string) => string, answerText: string): ForestQ {
  const a = q.answer
  const media = q.media.question ?? []
  const images = q.media.hidden ? [] : media.filter(m => !AV.test(m)).slice(0, 4).map(url)
  let options: ForestQ['options'] = []
  let correctKey: string | undefined
  if (a.mode === 'choice') { options = a.choices.map(c => ({ key: c.key, text: c.text })); correctKey = a.correct_choice }
  else if (a.mode === 'order') options = a.choices.map(c => ({ key: c.key, text: c.text }))
  else if (a.mode === 'match') options = a.right.map((r, i) => ({ key: r, text: a.right_labels?.[i] ?? '' }))
  // у вопросов с вариантами подпись «Ответ: …» не нужна — отвечает свет к цветку; у открытых — текст ответа
  return { id: q.id, text: q.question_text.trim(), options, images, correctKey, answerText: correctKey ? undefined : answerText }
}
