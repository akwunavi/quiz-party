// ═══ Валидатор готовности пакета (ТЗ п.8) ═══
import type { Question } from '../types/quiz'
import type { LoadedPack, LoadedRound } from './packLoader'
import { rebusRuleHolds } from './answerCheck'
import { anagramTemplate, anagramOrderValid } from './anagram'

export interface Problem {
  roundIdx: number
  questionIdx?: number
  text: string
}

export function validatePack(pack: LoadedPack): Problem[] {
  const problems: Problem[] = []
  if (pack.rounds.length === 0) problems.push({ roundIdx: -1, text: 'В пакете нет раундов' })

  // дубли вопросов между раундами и внутри раунда
  const seen = new Map<string, string>()
  pack.rounds.forEach((r, ri) => r.questions.filter(q => !q.hidden).forEach((q, qi) => {
    const key = q.question_text.trim().toLowerCase()
    if (!key) return
    if (seen.has(key)) problems.push({ roundIdx: ri, questionIdx: qi,
      text: `Дубль вопроса (уже есть в ${seen.get(key)})` })
    else seen.set(key, `раунде ${ri + 1}`)
  }))

  pack.rounds.forEach((rawRound, ri) => {
    // скрытые вопросы в игре не участвуют — валидатор их полностью игнорирует
    const round = { ...rawRound, questions: rawRound.questions.filter(q => !q.hidden) }
    // В этих механиках контент задаётся НЕ вопросами, а темами/треками/сеткой,
  // поэтому «нет вопросов» для них не ошибка.
  const noQuestions = round.mechanic === 'jeopardy' || round.mechanic === 'melody'
    || round.mechanic === 'crossword' || round.mechanic === 'race'
    if (!noQuestions && round.questions.length === 0)
      problems.push({ roundIdx: ri, text: 'Нет вопросов' })
    if (round.mechanic === 'melody') validateMelody(round, ri, problems)
    if (round.title_lines.length === 0 || !round.title_lines.join('').trim())
      problems.push({ roundIdx: ri, text: 'Нет заголовка раунда' })
    if (round.rules.length === 0)
      problems.push({ roundIdx: ri, text: 'Не заполнены правила раунда' })
    if (round.rules.some(r => !r.trim()))
      problems.push({ roundIdx: ri, text: 'Есть пустые строки правил' })
    if (round.timer_seconds < 10 && round.mechanic !== 'jeopardy' && round.mechanic !== 'four_pics')
      problems.push({ roundIdx: ri, text: `Таймер ${round.timer_seconds} сек — слишком мало` })
    if (round.off_scoreboard && ri === pack.rounds.length - 1)
      problems.push({ roundIdx: ri, text: 'Последний раунд помечен «вне зачёта» — так задумано?' })
    // дубли слов кроссворда
    if (round.mechanic === 'crossword') {
      const words = round.questions.filter(q => !q.hidden && q.answer.mode === 'crossword_word')
        .map(q => (q.answer as { word: string }).word.trim().toUpperCase())
      if (new Set(words).size !== words.length)
        problems.push({ roundIdx: ri, text: 'В кроссворде есть повторяющиеся слова' })
    }
    if (round.mechanic === 'crossword') validateCrossword(round, ri, problems)
    if (round.mechanic === 'jeopardy') validateJeopardy(round, ri, problems)
    if (round.mechanic === 'four_pics') validateFourPics(round, ri, problems)
    if (round.mechanic === 'anagram') validateAnagram(round, ri, pack, problems)
    round.questions.forEach((q, qi) => validateQuestion(round, q, ri, qi, problems))
  })
  return problems
}

function validateQuestion(round: LoadedRound, q: Question, ri: number, qi: number, out: Problem[]) {
  const push = (text: string) => out.push({ roundIdx: ri, questionIdx: qi, text })
  const a = q.answer
  const hasMedia = (q.media.question ?? []).length > 0
  const text = q.question_text
  // у «Скрэмбла» вопрос — сама перемешанная фраза, текст необязателен
  if (!text.trim() && !hasMedia && a.mode !== 'anagram') push('Пустой вопрос (нет ни текста, ни медиа)')

  // ── опечатки и типовые огрехи ──
  // Лишние и двойные пробелы НЕ проверяем: на игру они не влияют,
  // автопроверка ответов их всё равно срезает, а в списке проблем они
  // тонули среди настоящих ошибок.
  if (/\s+[,.!?]/.test(text)) push('Пробел перед знаком препинания')
  if (/\b([а-яa-z]{3,})\s+\1\b/i.test(text)) push('Похоже, слово повторяется дважды')

  const answerText = a.mode === 'free_text' ? a.correct
    : a.mode === 'crossword_word' ? a.word
    : a.mode === 'anagram' ? a.phrase : ''
  if (answerText) {
    if (answerText.length > 60) push('Правильный ответ подозрительно длинный (>60 символов)')
  }
    // пробелы в пояснении тоже не мешают

  switch (a.mode) {
    case 'free_text':
      if (!a.correct.trim()) push('Не заполнен правильный ответ')
      break
    case 'choice': {
      if (a.choices.length < 2) push('Меньше 2 вариантов ответа')
      const texts = a.choices.map(c => c.text.trim().toLowerCase()).filter(Boolean)
      if (new Set(texts).size !== texts.length) push('Есть одинаковые варианты ответа')
      const imgs = (q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
      if (imgs.length > 0 && imgs.length !== a.choices.length && texts.length === 0)
        push(`Картинок ${imgs.length}, а вариантов ${a.choices.length} — не совпадает`)
      if (!a.correct_choice) push('Не отмечен верный вариант')
      else if (!a.choices.some(c => c.key === a.correct_choice))
        push(`Верный вариант «${a.correct_choice}» не существует среди вариантов`)
      if (a.choices.some(c => !c.text.trim() && !hasMedia))
        push('Есть пустые тексты вариантов')
      break
    }
    case 'order':
      if (a.choices.length < 2) push('Меньше 2 элементов для упорядочивания')
      if (a.correct_order.length !== a.choices.length)
        push('Правильный порядок задан не полностью')
      break
    case 'match': {
      if (a.left.length < 2) push('Меньше 2 пар для сопоставления')
      if (a.left.length > 6) push('Больше 6 пар для сопоставления — не поместятся на экран')
      // номера на картинках и кнопки на телефоне берутся из числа пар:
      // картинок больше/меньше — команды не смогут ответить про лишние (9.76)
      const mImgs = (q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
      if (mImgs.length > 0 && mImgs.length !== a.left.length)
        push(`Картинок ${mImgs.length}, а пар ${a.left.length} — поменяй число пар («Пар: − +»)`)
      if (a.correct_pairs.length !== a.left.length)
        push('Правильные пары заданы не полностью')
      break
    }
    case 'crossword_word':
      if (!a.word.trim()) push('Не задано слово кроссворда')
      else if (a.word.replace(/[^А-Яа-яЁёA-Za-z0-9]/g, '').length < 3)
        push('Слово кроссворда короче 3 букв')
      break
    case 'none':
      break
    case 'anagram':
      break   // правила «Скрэмбла» — validateAnagram (коммит редактора)
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

function validateMelody(round: LoadedRound, ri: number, out: Problem[]) {
  const s = round.settings as { themes?: { name: string; tracks: { audio: string; correct: string }[] }[] }
  const themes = s.themes ?? []
  if (themes.length === 0) out.push({ roundIdx: ri, text: 'Мелодия: нет тем' })
  themes.forEach((t, ti) => {
    if (!t.name.trim()) out.push({ roundIdx: ri, text: `Мелодия: тема ${ti + 1} без названия` })
    if (t.tracks.length === 0) out.push({ roundIdx: ri, text: `Мелодия: «${t.name || ti + 1}» — нет треков` })
    t.tracks.forEach((tr, i) => {
      if (!tr.audio) out.push({ roundIdx: ri, text: `Мелодия: «${t.name || ti + 1}», трек ${i + 1}: нет файла` })
      if (!tr.correct.trim()) out.push({ roundIdx: ri, text: `Мелодия: «${t.name || ti + 1}», трек ${i + 1}: нет ответа` })
    })
  })
}

function validateFourPics(round: LoadedRound, ri: number, out: Problem[]) {
  round.questions.forEach((q, qi) => {
    const push = (text: string) => out.push({ roundIdx: ri, questionIdx: qi, text })
    if (q.answer.mode !== 'crossword_word') { push('3 попытки: тип ответа должен быть «слово в сетку»'); return }
    const imgs = (q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
    if (imgs.length < 2) push(`3 попытки: картинок ${imgs.length}, нужно минимум 2`)
    if (!q.answer.word.trim()) push('3 попытки: не задано слово ответа')
    const flatLen = q.answer.word.trim().replace(/\s+/g, '').length
    const bad = (q.service.openLetters ?? []).some(i => i < 0 || i >= flatLen)
    if (bad) push('3 попытки: «открытые буквы» указывают на несуществующий индекс — перевыбери после правки слова')
  })
}

function validateAnagram(round: LoadedRound, ri: number, pack: LoadedPack, out: Problem[]) {
  const s = round.settings as { mode?: string }
  if (s.mode === 'race' && pack.settings?.play_mode === 'paper')
    out.push({ roundIdx: ri, text: 'Скрэмбл: гонка недоступна на бумаге — будет считаться как обычный' })
  round.questions.forEach((q, qi) => {
    const push = (text: string) => out.push({ roundIdx: ri, questionIdx: qi, text })
    if (q.answer.mode !== 'anagram') { push('Скрэмбл: тип ответа должен быть «Скрэмбл» (фраза)'); return }
    const letters = anagramTemplate(q.answer.phrase).letters
    if (letters.length < 3) { push('Скрэмбл: во фразе меньше 3 букв'); return }
    if (letters.length > 40)
      push(`Скрэмбл: ${letters.length} букв — на проекторе плитки станут мелкими, лучше до 40`)
    if (q.answer.order.length !== letters.length)
      push('Скрэмбл: перемешивание не совпадает с фразой — нажми «Перемешать заново»')
    else if (!anagramOrderValid(q.answer.order, letters))
      push('Скрэмбл: перемешивание невалидно (совпадает с фразой или первая буква на месте) — нажми «Перемешать заново»')
  })
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
