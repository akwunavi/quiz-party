// ═══ Очередь ответов с retry (перенос из старого проекта, TS) ═══
// Ответ сохраняется в localStorage до подтверждения сервером.
// Индикатор связи строится на pending-счётчике + флаге последней ошибки.
import { supabase } from './supabase'

export interface PendingAnswer {
  team_id: string
  game_id: string
  question_ref: string
  round_number: number
  answer_text: string
  stake?: number | null
}

const LS = 'qp-answer-queue'
let flushing = false
const listeners = new Set<(state: QueueState) => void>()

export interface QueueState { pending: number; lastError: boolean }

function read(): PendingAnswer[] {
  try { return JSON.parse(localStorage.getItem(LS) ?? '[]') } catch { return [] }
}
function write(q: PendingAnswer[]) {
  localStorage.setItem(LS, JSON.stringify(q))
}
function notify(lastError: boolean) {
  const s: QueueState = { pending: read().length, lastError }
  listeners.forEach(fn => fn(s))
}

export function subscribeQueue(fn: (s: QueueState) => void): () => void {
  listeners.add(fn)
  fn({ pending: read().length, lastError: false })
  return () => { listeners.delete(fn) }
}

export async function enqueueAnswer(a: PendingAnswer) {
  const q = read().filter(x => x.question_ref !== a.question_ref || x.team_id !== a.team_id)
  q.push(a)
  write(q)
  notify(false)
  void flush()
}

export async function flush() {
  if (flushing) return
  flushing = true
  try {
    let q = read()
    while (q.length > 0) {
      const a = q[0]
      const { error } = await supabase.from('answers').upsert({
        ...a, updated_at: new Date().toISOString(),
      }, { onConflict: 'team_id,question_ref' })
      if (error) { notify(true); return }   // сеть/БД легли — повторим при следующем flush
      q = q.slice(1)
      write(q)
      notify(false)
    }
  } finally {
    flushing = false
  }
}

// периодический добив очереди
if (typeof window !== 'undefined') {
  setInterval(() => { void flush() }, 3000)
}
