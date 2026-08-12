// ═══ Валидатор готовности пакета (ТЗ п.8) ═══
import type { Question } from '../types/quiz'
import type { LoadedPack, LoadedRound } from './packLoader'
import { rebusRuleHolds } from './answerCheck'

export interface Problem {
  roundIdx: number
  questionIdx?: number
  text: string
}

export function validatePack(pack: LoadedPack): Problem[] {
  const problems: Problem[] = []
  if (pack.rounds.length === 0) problems.push({ roundIdx: -1, text: 'В пакете нет раундов' })

  pack.rounds.forEach((rawRound, ri) => {
    // скрытые вопросы в игре не участвуют — валидатор их полностью игнорирует
    const round = { ...rawRound, questions: rawRound.questions.filter(q => !q.hidden) }
    if (round.questions.length === 0)
      problems.push({ roundIdx: ri, text: 'Нет вопросов' })
    if (round.title_lines.length === 0 || !round.title_lines.join('').trim())
      problems.push({ roundIdx: ri, text: 'Нет заголовка раунда' })
    if (round.mechanic === 'crossword') validateCrossword(round, ri, problems)
    if (round.mechanic === 'jeopardy') validateJeopardy(round, ri, problems)
    round.questions.forEach((q, qi) => validateQuestion(round, q, ri, qi, problems))
  })
  return problems
}

function validateQuestion(round: LoadedRound, q: Question, ri: number, qi: number, out: Problem[]) {
  const push = (text: string) => out.push({ roundIdx: ri, questionIdx: qi, text })
  const a = q.answer
  const hasMedia = (q.media.question ?? []).length > 0
  if (!q.question_text.trim() && !hasMedia) push('Пустой вопрос (нет ни текста, ни медиа)')

  switch (a.mode) {
    case 'free_text':
      if (!a.correct.trim()) push('Не заполнен правильный ответ')
      break
    case 'choice':
      if (a.choices.length < 2) push('Меньше 2 вариантов ответа')
      if (!a.correct_choice) push('Не отмечен верный вариант')
      else if (!a.choices.some(c => c.key === a.correct_choice))
        push(`Верный вариант «${a.correct_choice}» не существует среди вариантов`)
      if (a.choices.some(c => !c.text.trim() && !hasMedia))
        push('Есть пустые тексты вариантов')
      break
    case 'order':
      if (a.choices.length < 2) push('Меньше 2 элементов для упорядочивания')
      if (a.correct_order.length !== a.choices.length)
        push('Правильный порядок задан не полностью')
      break
    case 'match': {
      if (a.left.length < 2) push('Меньше 2 пар для сопоставления')
      if (a.correct_pairs.length !== a.left.length)
        push('Правильные пары заданы не полностью')
      break
    }
    case 'crossword_word':
      if (!a.word.trim()) push('Не задано слово кроссворда')
      break
    case 'none':
      break
  }

  if (round.mechanic === 'rebus') {
    const w1 = q.service.word1 ?? '', w2 = q.service.word2 ?? ''
    if (!w1 || !w2) push('Ребус: не заполнены слова картинок (word1/word2)')
    else if (a.mode === 'free_text' && a.correct &&
      !rebusRuleHolds(w1, w2, a.correct.split('/')[0]))
      push(`Ребус: правило 3+3 не сходится (из «${w1}»+«${w2}» получается другое слово)`)
    if ((q.media.question ?? []).length !== 2) push('Ребус: должно быть ровно 2 картинки')
  }
}

function validateCrossword(round: LoadedRound, ri: number, out: Problem[]) {
  const s = round.settings as { grid?: unknown }
  if (!s.grid) out.push({ roundIdx: ri, text: 'Кроссворд: сетка не сгенерирована/не зафиксирована' })
  const n = round.questions.length
  if (n < 6 || n > 10)
    out.push({ roundIdx: ri, text: `Кроссворд: слов ${n}, должно быть 6–10` })
}

function validateJeopardy(round: LoadedRound, ri: number, out: Problem[]) {
  const s = round.settings as { themes?: { name: string; tiles: { audio: string; correct: string }[] }[] }
  const themes = s.themes ?? []
  if (themes.length === 0) out.push({ roundIdx: ri, text: 'Jeopardy: нет тем' })
  themes.forEach((t, ti) => {
    if (!t.name.trim()) out.push({ roundIdx: ri, text: `Jeopardy: тема ${ti + 1} без названия` })
    t.tiles.forEach((tile, i) => {
      if (!tile.audio) out.push({ roundIdx: ri, text: `Jeopardy: «${t.name || ti + 1}», плитка ${i + 1}: нет аудио` })
      if (!tile.correct.trim()) out.push({ roundIdx: ri, text: `Jeopardy: «${t.name || ti + 1}», плитка ${i + 1}: нет ответа` })
    })
  })
}
