import { supabase } from './supabase'

// ═══ ОЦЕНКИ ВОПРОСОВ И КОММЕНТАРИИ К РАУНДУ ═══
//
// Оценка ставится КАЖДОМУ вопросу по шкале 1..10 и в любой момент, пока
// идёт раунд. Комментарий — один на раунд, поле под списком вопросов.
//
// Всё живёт в одной таблице question_ratings. Комментарий отличается от
// оценки видом ключа: `r<номер>-comment` и rating = null. Так не пришлось
// заводить вторую таблицу ради одного текстового поля, а уникальность
// (team_id, question_ref) сама не даёт задвоить ни оценку, ни комментарий.

export type RatingRow = {
  team_id: string
  game_id: string | null
  round_number: number | null
  question_ref: string
  rating: number | null
  comment: string | null
}

export const commentRef = (roundNumber: number) => `r${roundNumber}-comment`
export const isCommentRef = (ref: string) => /^r\d+-comment$/.test(ref)

/** Поставить или изменить оценку вопроса. */
export async function rateQuestion(args: {
  teamId: string; gameId: string; roundNumber: number
  questionRef: string; rating: number
}) {
  const { error } = await supabase.from('question_ratings').upsert({
    team_id: args.teamId, game_id: args.gameId, round_number: args.roundNumber,
    question_ref: args.questionRef,
    rating: Math.max(1, Math.min(10, Math.round(args.rating))),
    updated_at: new Date().toISOString(),
  }, { onConflict: 'team_id,question_ref' })
  if (error) throw error
}

/** Сохранить комментарий к раунду. Пустой текст удаляет строку: пустой
 *  комментарий и его отсутствие — одно и то же, а строка-пустышка нарушила
 *  бы условие «оценка или комментарий». */
export async function saveRoundComment(args: {
  teamId: string; gameId: string; roundNumber: number; comment: string
}) {
  const ref = commentRef(args.roundNumber)
  const text = args.comment.trim()
  if (!text) {
    await supabase.from('question_ratings').delete()
      .eq('team_id', args.teamId).eq('question_ref', ref)
    return
  }
  const { error } = await supabase.from('question_ratings').upsert({
    team_id: args.teamId, game_id: args.gameId, round_number: args.roundNumber,
    question_ref: ref, rating: null, comment: text,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'team_id,question_ref' })
  if (error) throw error
}

/** Все оценки игры — для админки и выгрузки. */
export async function loadRatings(gameId: string): Promise<RatingRow[]> {
  const { data } = await supabase.from('question_ratings')
    .select('team_id, game_id, round_number, question_ref, rating, comment')
    .eq('game_id', gameId)
  return (data ?? []) as RatingRow[]
}

export type RoundSummary = {
  roundNumber: number
  avg: number | null
  votes: number
  comments: string[]
  /** Средняя по каждому вопросу: ключ — question_ref. */
  byQuestion: Map<string, { avg: number; votes: number }>
}

/** Свод по раундам: средняя оценка, число голосов, комментарии.
 *  Считается на клиенте — данных мало, а лишний запрос к базе на каждый
 *  пересчёт во время игры не нужен. */
export function summarize(rows: RatingRow[]): Map<number, RoundSummary> {
  const out = new Map<number, RoundSummary>()
  for (const r of rows) {
    const rn = r.round_number ?? 0
    let s = out.get(rn)
    if (!s) {
      s = { roundNumber: rn, avg: null, votes: 0, comments: [], byQuestion: new Map() }
      out.set(rn, s)
    }
    if (r.comment?.trim()) s.comments.push(r.comment.trim())
    if (r.rating == null) continue
    s.votes++
    const q = s.byQuestion.get(r.question_ref) ?? { avg: 0, votes: 0 }
    q.avg = (q.avg * q.votes + r.rating) / (q.votes + 1)
    q.votes++
    s.byQuestion.set(r.question_ref, q)
  }
  for (const s of out.values()) {
    if (s.votes === 0) { s.avg = null; continue }
    let sum = 0, n = 0
    for (const q of s.byQuestion.values()) { sum += q.avg * q.votes; n += q.votes }
    s.avg = n ? +(sum / n).toFixed(2) : null
  }
  return out
}

/** Средние оценки по вопросам за ВСЕ игры — для выгрузки пакета.
 *  Смысл именно в накоплении: одна вечеринка ничего не доказывает, а вот
 *  вопрос, который стабильно получает четвёрки, стоит переписать. */
export async function ratingsByQuestion(): Promise<Map<string, { avg: number; votes: number }>> {
  const { data } = await supabase.from('question_ratings')
    .select('question_ref, rating')
    .not('rating', 'is', null)
  const out = new Map<string, { avg: number; votes: number }>()
  for (const r of (data ?? []) as { question_ref: string; rating: number }[]) {
    const cur = out.get(r.question_ref) ?? { avg: 0, votes: 0 }
    cur.avg = (cur.avg * cur.votes + r.rating) / (cur.votes + 1)
    cur.votes++
    out.set(r.question_ref, cur)
  }
  return out
}
