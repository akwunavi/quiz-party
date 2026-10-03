// ═══ БАНК ВОПРОСОВ БЛИЦА: неотыгранное переезжает между квизами (9.80) ═══
// Просьба ведущего: «чтобы в блице переносились все неотыгранные вопросы в
// банк вопросов для блица».
//
// Цикл такой:
//   1. В банке (пакет со статусом 'bank') есть рубрика «БЛИЦ» — раунд с
//      механикой blitz. Это и есть запас неотыгранных вопросов.
//   2. Готовя новый квиз, ведущий в раунде блица жмёт «Забрать из банка
//      блица»: все вопросы рубрики ПЕРЕЕЗЖАЮТ в раунд (копия + удаление из
//      банка) — один вопрос не окажется в двух квизах сразу.
//   3. Блиц сыгран — проектор сам возвращает в банк всё, что не успели
//      показать. То же можно сделать кнопкой в редакторе (если проектор
//      был без входа редактора или раунд не доигран).
//
// Дубликаты не плодятся ни в одну сторону: вопрос с тем же текстом и
// ответом уже в банке / уже в раунде — пропускается. Поэтому возврат можно
// вызывать сколько угодно раз (проектор + кнопка) — результат тот же.
import { supabase } from './supabase'
import { getOrCreateBank } from './editorApi'
import type { Question } from '../types/quiz'

type QRow = Pick<Question, 'id' | 'question_text' | 'media' | 'answer' | 'answer_note' | 'hidden'> & {
  service?: unknown; is_final_question?: boolean; played_at?: string | null; position?: number
}

/** Ключ «тот же вопрос»: текст без регистра/лишних пробелов + ответ + медиа. */
export function blitzKey(q: Pick<QRow, 'question_text' | 'answer' | 'media'>): string {
  const text = (q.question_text ?? '').toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim()
  return `${text}|${JSON.stringify(q.answer ?? null)}|${JSON.stringify(q.media?.question ?? [])}`
}

/** Что вернуть в банк: не скрытые, не показанные (ни по отметке в базе,
 *  ни по списку показанных в этой игре — отметка `played_at` пишется
 *  асинхронно и могла не долететь), и которых в банке ещё нет. */
export function blitzToReturn(round: QRow[], bank: QRow[], usedInGame: string[] = []): QRow[] {
  const inBank = new Set(bank.map(blitzKey))
  const seen = new Set<string>()
  return round.filter(q => {
    if (q.hidden || q.played_at || usedInGame.includes(q.id)) return false
    const k = blitzKey(q)
    if (inBank.has(k) || seen.has(k)) return false
    seen.add(k)
    return true
  })
}

/** Что забрать из банка в раунд: не скрытые и которых в раунде ещё нет. */
export function blitzToTake(bank: QRow[], round: QRow[]): QRow[] {
  const inRound = new Set(round.map(blitzKey))
  const seen = new Set<string>()
  return bank.filter(q => {
    if (q.hidden) return false
    const k = blitzKey(q)
    if (inRound.has(k) || seen.has(k)) return false
    seen.add(k)
    return true
  })
}

/** Рубрика «БЛИЦ» в банке — найти или завести. */
export async function getOrCreateBlitzRubric(): Promise<string> {
  const bank = await getOrCreateBank()
  const { data: found } = await supabase.from('pack_rounds').select('id')
    .eq('pack_id', bank.id).eq('mechanic', 'blitz').order('position').limit(1).maybeSingle()
  if (found) return (found as { id: string }).id
  const { data: maxRow } = await supabase.from('pack_rounds').select('position')
    .eq('pack_id', bank.id).order('position', { ascending: false }).limit(1).maybeSingle()
  const { data, error } = await supabase.from('pack_rounds').insert({
    pack_id: bank.id, position: ((maxRow as { position?: number } | null)?.position ?? -1) + 1,
    mechanic: 'blitz', title_lines: ['БЛИЦ'], rules: [],
    settings: { teamSeconds: 60, timeoutPenalty: 10 }, timer_seconds: 30,
  }).select('id').single()
  if (error) throw error
  return (data as { id: string }).id
}

async function listQuestions(roundId: string): Promise<QRow[]> {
  const { data, error } = await supabase.from('pack_questions').select('*')
    .eq('round_id', roundId).order('position')
  if (error) throw error
  return (data ?? []) as QRow[]
}

async function insertCopies(roundId: string, rows: QRow[]): Promise<void> {
  if (rows.length === 0) return
  const { data: maxRow } = await supabase.from('pack_questions').select('position')
    .eq('round_id', roundId).order('position', { ascending: false }).limit(1).maybeSingle()
  let pos = ((maxRow as { position?: number } | null)?.position ?? -1) + 1
  // одним запросом: позиции считаем сами подряд (unique round_id+position)
  const { error } = await supabase.from('pack_questions').insert(rows.map(q => ({
    round_id: roundId, position: pos++,
    question_text: q.question_text, media: q.media, answer: q.answer,
    answer_note: q.answer_note, service: q.service ?? {},
    is_final_question: q.is_final_question ?? false,
  })))
  if (error) throw error
}

/** Вернуть неотыгранные вопросы раунда блица в банк. Возвращает, сколько
 *  вопросов добавлено (0 — всё уже там или возвращать нечего). */
export async function returnUnplayedBlitz(roundId: string, usedInGame: string[] = []): Promise<number> {
  const rubric = await getOrCreateBlitzRubric()
  if (rubric === roundId) return 0          // сам банк в банк не возвращаем
  const [round, bank] = await Promise.all([listQuestions(roundId), listQuestions(rubric)])
  const rows = blitzToReturn(round, bank, usedInGame)
  await insertCopies(rubric, rows)
  return rows.length
}

/** Забрать все вопросы из банка блица в раунд (переезд: в банке их больше
 *  нет). Возвращает, сколько добавлено в раунд. */
export async function takeBlitzFromBank(roundId: string): Promise<number> {
  const rubric = await getOrCreateBlitzRubric()
  if (rubric === roundId) return 0
  const [bank, round] = await Promise.all([listQuestions(rubric), listQuestions(roundId)])
  const rows = blitzToTake(bank, round)
  await insertCopies(roundId, rows)
  // из банка убираем ВСЁ, что теперь лежит в раунде, — и только что
  // скопированное, и то, что там уже было (дубликат)
  const inRound = new Set([...round, ...rows].map(blitzKey))
  const gone = bank.filter(q => !q.hidden && inRound.has(blitzKey(q))).map(q => q.id)
  if (gone.length) {
    // удаление — только владельцу (RLS), и отказ RLS приходит НЕ ошибкой,
    // а пустым результатом: сверяем, что реально удалилось, остальное
    // прячем (как BankSend у редактора без права удаления)
    const { data: del } = await supabase.from('pack_questions').delete().in('id', gone).select('id')
    const deleted = new Set(((del ?? []) as { id: string }[]).map(r => r.id))
    const left = gone.filter(id => !deleted.has(id))
    if (left.length) {
      const { error: e2 } = await supabase.from('pack_questions').update({ hidden: true }).in('id', left)
      if (e2) throw e2
    }
  }
  return rows.length
}

/** Сколько вопросов сейчас ждёт в банке блица (для подписи кнопки). */
export async function blitzBankCount(): Promise<number> {
  const rubric = await getOrCreateBlitzRubric()
  return (await listQuestions(rubric)).filter(q => !q.hidden).length
}
