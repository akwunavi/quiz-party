// ═══ ПРОВЕРКА ВОПРОСОВ ИИ — КЛИЕНТ ═══
// Ключ провайдера здесь НЕ используется и в браузер не попадает: запрос идёт
// в Edge Function `review-question`, которая держит ключ в секретах Supabase.
import { supabase } from './supabase'
import type { LoadedPack } from './packLoader'

export type Issue = { kind: string; text: string; question?: number | null }

export type QuestionReview = {
  verdict: 'ok' | 'warn' | 'bad'
  difficulty: number
  difficulty_note: string
  solve_seconds: number
  solve_path: string
  issues: Issue[]
  suggestion: string
}

export type RoundReview = {
  summary: string
  difficulty_curve: string
  balance: string
  questions: { n: number; solve_seconds: number; verdict: 'fits' | 'tight' | 'over' }[]
  over_timer: number[]
  issues: Issue[]
  recommendations: string[]
}

type Q = LoadedPack['rounds'][number]['questions'][number]

/** Текст ответа для промпта: ИИ должен видеть, что именно считается верным. */
function answerText(q: Q): string {
  const a = q.answer as unknown as Record<string, unknown>
  if (a.mode === 'choice') {
    const ch = (a.choices ?? []) as { key: string; text: string }[]
    return `варианты: ${ch.map(c => `${c.key}) ${c.text}`).join('; ')}`
      + ` | верный: ${String(a.correct_choice ?? '?')}`
  }
  if (a.mode === 'match') {
    const l = (a.left ?? []) as string[]
    const r = (a.right_labels ?? []) as string[]
    return `сопоставление: ${l.join(', ')} → ${r.join(', ')}`
  }
  // режим называется free_text; из-за 'free' ИИ получал JSON вместо ответа
  if (a.mode === 'free_text') return `ответ: ${String(a.correct ?? '')}`
  return `режим ${String(a.mode)}: ${JSON.stringify(a).slice(0, 300)}`
}

/** Последние решения редактора — калибровка придирчивости под него. */
async function loadExamples() {
  const { data } = await supabase.from('ai_feedback')
    .select('issue_text, accepted').order('created_at', { ascending: false }).limit(24)
  return (data ?? []).map(r => ({ text: r.issue_text as string, accepted: r.accepted as boolean }))
}

async function call(mode: 'question' | 'round', payload: string) {
  const examples = await loadExamples()
  const { data, error } = await supabase.functions.invoke('review-question', {
    body: { mode, payload, examples },
  })
  if (error) {
    // supabase-js на любой не-2xx отдаёт общее «Edge Function returned a non-2xx
    // status code» и прячет тело ответа. Настоящая причина — внутри context,
    // и без неё чинить нечего: достаём её и показываем как есть.
    const ctx = (error as unknown as { context?: Response }).context
    if (ctx && typeof ctx.text === 'function') {
      try {
        const raw = await ctx.text()
        const parsed = raw.trim().startsWith('{') ? JSON.parse(raw) : null
        throw new Error(parsed?.error ?? raw.slice(0, 400) ?? error.message)
      } catch (e) {
        if (e instanceof Error && e.message !== error.message) throw e
      }
    }
    throw new Error(error.message)
  }
  if (data?.error) throw new Error(data.error)
  return data
}

export async function reviewQuestion(q: Q, timerSeconds: number): Promise<QuestionReview> {
  const payload = [
    `Таймер раунда: ${timerSeconds} сек.`,
    `Вопрос: ${q.question_text || '(текста нет, только медиа)'}`,
    answerText(q),
    q.answer_note ? `Пояснение: ${q.answer_note}` : '',
    (q.media.question ?? []).length ? `К вопросу приложено медиа: ${(q.media.question ?? []).length} шт.` : '',
  ].filter(Boolean).join('\n')

  const res = await call('question', payload) as QuestionReview
  await supabase.from('ai_reviews').upsert({
    target_kind: 'question', target_id: q.id, result: res,
  } as never, { onConflict: 'target_kind,target_id' } as never)
  return res
}

export async function reviewRound(
  round: LoadedPack['rounds'][number],
): Promise<RoundReview> {
  const qs = round.questions.filter(q => !q.hidden)
  const payload = [
    `Раунд: ${round.title_lines.join(' ')} (механика: ${round.mechanic})`,
    `Таймер на вопрос: ${round.timer_seconds} сек. Вопросов: ${qs.length}.`,
    '',
    ...qs.map((q, i) => `${i + 1}. ${q.question_text || '(только медиа)'}\n   ${answerText(q)}`),
  ].join('\n')

  const res = await call('round', payload) as RoundReview
  await supabase.from('ai_reviews').upsert({
    target_kind: 'round', target_id: round.id, result: res,
  } as never, { onConflict: 'target_kind,target_id' } as never)
  return res
}

/** Решение редактора по замечанию — из этого набирается калибровка. */
export async function rateIssue(questionId: string | null, issue: Issue, accepted: boolean) {
  await supabase.from('ai_feedback').insert({
    question_id: questionId, issue_kind: issue.kind, issue_text: issue.text, accepted,
  } as never)
}

/** Сохранённый разбор — чтобы не гонять ИИ повторно при каждом открытии. */
export async function loadReview(kind: 'question' | 'round', id: string) {
  const { data } = await supabase.from('ai_reviews')
    .select('result, created_at').eq('target_kind', kind).eq('target_id', id).maybeSingle()
  return data ?? null
}

/** Проверка связи: есть ли ключ и отвечает ли провайдер. Токены не тратит. */
export async function pingAi() {
  const { data, error } = await supabase.functions.invoke('review-question', {
    body: { mode: 'ping' },
  })
  if (error) {
    const ctx = (error as unknown as { context?: Response }).context
    if (ctx?.text) {
      const raw = await ctx.text()
      throw new Error(raw.slice(0, 400))
    }
    throw new Error(error.message)
  }
  return data as { ok: boolean; status: number; key_tail: string; body: string }
}
