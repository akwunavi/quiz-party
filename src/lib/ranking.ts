// ═══ РАНЖИРОВАНИЕ КОМАНД ═══
// Одно место — один расчёт, чтобы табло, финал и телефоны команд никогда
// не разошлись между собой.
//
// Правила:
//  1. Больше очков — выше.
//  2. При равенстве очков команды делят место, и следующее место НЕ
//     пропускается: 1, 1, 2, 3, 4 (плотная нумерация). Две команды с равной
//     суммой обе «первые», а идущая следом — «вторая», а не «третья».
//  3. Порядок внутри одинакового места — по времени первой ошибки:
//     кто ошибся РАНЬШЕ, тот выше в списке. Место при этом всё равно общее.
//  4. Команда, зарегистрированная в середине игры, за отыгранные раунды
//     получает 0 — отдельной обработки не требуется, суммы просто пустые.
import type { Answer, Team } from '../types/quiz'

export type RankRow = {
  team: Team
  total: number
  place: number        // общее место (у равных очков совпадает)
  shared: boolean      // true, если это место делят несколько команд
}

/** Время первой ошибки команды (мс). Ошибок нет — Infinity.
 *  Берём updated_at: именно он меняется, когда админ помечает ответ неверным. */
function firstMistakeAt(teamId: string, answers: Answer[]): number {
  let best = Infinity
  for (const a of answers) {
    if (a.team_id !== teamId) continue
    if (a.is_correct !== false) continue
    const t = a.updated_at ? new Date(a.updated_at).getTime() : NaN
    if (!Number.isNaN(t) && t < best) best = t
  }
  return best
}

export function rankTeams(
  teams: Team[], totals: Map<string, number>, answers: Answer[],
  roundScores: Map<string, number[]> = new Map(),
): RankRow[] {
  const sorted = [...teams].sort((a, b) => {
    const d = (totals.get(b.id) ?? 0) - (totals.get(a.id) ?? 0)
    if (d !== 0) return d

    // ── Ничья по сумме ──
    // Сравниваем раунды С КОНЦА: у кого сильнее финиш, тот выше — решает
    // САМЫЙ ПОЗДНИЙ раунд, где результаты разошлись, а не самый ранний.
    // Пример: 6-8-6 против 7-5-8 при равной сумме 20 — выше вторая, потому
    // что в ПОСЛЕДНЕМ раунде взяла больше (8 против 6), несмотря на то что
    // первая была впереди на старте. Раньше сравнение шло от первого
    // раунда к последнему — это награждало ранний отрыв, а не финишный
    // рывок, и ведущий несколько раз указывал, что итог не совпадает с
    // ожиданием именно на таких случаях.
    const ra = roundScores.get(a.id) ?? []
    const rb = roundScores.get(b.id) ?? []
    const n = Math.max(ra.length, rb.length)
    for (let i = n - 1; i >= 0; i--) {
      const diff = (rb[i] ?? 0) - (ra[i] ?? 0)
      if (diff !== 0) return diff
    }

    // раунды совпали до последнего — смотрим, кто раньше ошибся
    const ma = firstMistakeAt(a.id, answers)
    const mb = firstMistakeAt(b.id, answers)
    if (ma !== mb) return ma - mb
    return a.name.localeCompare(b.name)     // иначе стабильный порядок
  })

  const rows: RankRow[] = []
  let place = 0
  let prevScore: number | null = null
  for (const t of sorted) {
    const score = totals.get(t.id) ?? 0
    // плотная нумерация: место растёт на 1 только при смене суммы очков,
    // поэтому после двух первых мест идёт второе, а не третье
    if (prevScore === null || score !== prevScore) place += 1
    prevScore = score
    rows.push({ team: t, total: score, place, shared: false })
  }
  // помечаем разделённые места
  const counts = new Map<number, number>()
  for (const r of rows) counts.set(r.place, (counts.get(r.place) ?? 0) + 1)
  for (const r of rows) r.shared = (counts.get(r.place) ?? 0) > 1
  return rows
}
