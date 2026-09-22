// ═══ Очередь ответов с retry (перенос из старого проекта, TS) ═══
// Ответ сохраняется в localStorage до подтверждения сервером.
// Индикатор связи строится на pending-счётчике + флаге последней ошибки.
import { room } from './transport'

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
      try {
        await room.upsertAnswers([{ ...a, updated_at: new Date().toISOString() }])
      } catch {
        notify(true); return   // сеть/БД легли — повторим при следующем flush
      }
      // Раньше здесь было `q = q.slice(1); write(q)` — снимало первый элемент
      // из СНИМКА `q`, прочитанного ДО отправки. Пока запрос летел по сети,
      // enqueueAnswer() мог дописать в localStorage что-то новое (игрок
      // поменял ставку 2→4 прямо во время отправки) — слепой `.slice(1)`
      // затирал эту новую запись обратно устаревшим снимком. Теперь после
      // успешной отправки ПЕРЕЧИТЫВАЕМ localStorage и снимаем только ту
      // запись, что совпадает и по ключу (team_id+question_ref), и по
      // содержимому (answer_text/stake) — если её успели переписать заново,
      // она останется в очереди и уйдёт следующим проходом.
      const fresh = read()
      const same = (x: PendingAnswer) =>
        x.team_id === a.team_id && x.question_ref === a.question_ref
        && x.answer_text === a.answer_text && (x.stake ?? null) === (a.stake ?? null)
      const idx = fresh.findIndex(same)
      if (idx !== -1) fresh.splice(idx, 1)
      write(fresh)
      q = fresh
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
