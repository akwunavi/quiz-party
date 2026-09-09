// ═══ Общая сетевая обёртка для transport/*, не для polling-хуков напрямую ═══
//
// Две вещи в одном месте, чтобы 13 операций RoomTransport не дублировали
// логику каждая по-своему:
//  1. таймаут через AbortController — облачный Supabase ждём максимум
//     TIMEOUT_MS, дальше не висим вечно (ровно та дыра, из-за которой
//     раньше зависал HostGate на getUser(), см. HANDOFF §3al — здесь та
//     же болезнь, но для игровых вызовов);
//  2. один повторный вызов, если ошибка ИМЕННО сетевая (обрыв/офлайн/
//     таймаут) — но НЕ повторяем, если сервер уже ответил кодом 4xx/5xx:
//     это осмысленный отказ (RLS, конфликт и т.п.), повтор ничего не даёт
//     и рискует задвоить запись.
//
// `callTransport` дополнительно сводит вызов с шиной `actionStatus.ts`
// (`runAction`) — её здесь не переизобретаем. Используется ТОЛЬКО для
// операций записи/действий: если завести туда и polling-чтения хуков,
// индикатор «идёт запрос» будет мигать каждые 2 секунды при обычной игре,
// а это уже видимое изменение поведения экрана, которого в этом шаге
// сознательно нет. Поэтому в supabaseTransport.ts poll-чтения
// (readSession/listTeams/listAnswers/readBlitz) идут через
// `withNetResilience` без статус-шины, а операции записи — через
// `callTransport`.
import { runAction } from '../actionStatus'

export const TIMEOUT_MS = 6000

function isRetryableNetworkError(err: unknown): boolean {
  if (err instanceof DOMException && err.name === 'AbortError') return true
  if (err instanceof TypeError) return true
  const raw = err instanceof Error ? err.message : String(err)
  return /network|fetch|failed to fetch|offline|abort/i.test(raw)
}

/** Один вызов с таймаутом. `fn` обязан передать `signal` дальше в
 *  supabase-запрос (`.abortSignal(signal)`), иначе таймаут ничего не
 *  прервёт — просто перестанем ждать со своей стороны. */
async function withTimeout<T>(fn: (signal: AbortSignal) => PromiseLike<T>): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fn(controller.signal)
  } finally {
    clearTimeout(timer)
  }
}

/** Таймаут + единичный ретрай на сетевую ошибку. Без шины статуса —
 *  для чтений, которые опрашивает поллинг (свой backoff у самих хуков,
 *  см. useGameState/useTeams/useAnswers/useBlitz). */
export async function withNetResilience<T>(fn: (signal: AbortSignal) => PromiseLike<T>): Promise<T> {
  try {
    return await withTimeout(fn)
  } catch (err) {
    if (!isRetryableNetworkError(err)) throw err
    return await withTimeout(fn)
  }
}

/** То же самое + шина `actionStatus` — для операций записи/действий
 *  ведущего. `label` — тот же человекочитаемый текст, что раньше стоял
 *  в вызовах `runAction(...)` на местах (см. AdminPage.tsx). */
export async function callTransport<T>(
  label: string, fn: (signal: AbortSignal) => PromiseLike<T>,
): Promise<T> {
  const result = await runAction(label, () => withNetResilience(fn))
  // runAction либо возвращает T, либо бросает — undefined сюда не долетает,
  // но типизирован как T | undefined из-за общей сигнатуры шины.
  return result as T
}
