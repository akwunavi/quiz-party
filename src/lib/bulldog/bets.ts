// Ставки команд и очки. Протокол прежний (RaceRound/RacePlayer): ответ `q-race-<раунд>`, answer_text = номер собаки 1..5, очки на финише
// пишутся в stake как 5 − (место выбранной собаки − 1). Здесь — только чистые функции без сети.
export interface BetRow { team_id: string; answer_text: string }
export const raceRef = (roundNumber: number) => `q-race-${roundNumber}`
/** Сколько команд выбрало каждую собаку (индексы 0..4). Мусор в answer_text игнорируется. */
export function countsByDog(bets: BetRow[]): number[] {
  const c = [0, 0, 0, 0, 0]
  const last = new Map<string, number>()                                    // одна команда — один выбор (последний)
  for (const b of bets) { const n = Number(b.answer_text); if (Number.isInteger(n) && n >= 1 && n <= 5) last.set(b.team_id, n) }
  for (const n of last.values()) c[n - 1]++
  return c
}
/** Очки команды за ставку: 1 место — 5 … 5 место — 1; нет ставки/мусор — 0. places — индексы собак по порядку финиша. */
export function pointsFor(answerText: string, places: number[]): { dog: number | null; place: number | null; points: number } {
  const n = Number(answerText)
  if (!Number.isInteger(n) || n < 1 || n > 5) return { dog: null, place: null, points: 0 }
  const pos = places.indexOf(n - 1)
  return pos < 0 ? { dog: n, place: null, points: 0 } : { dog: n, place: pos + 1, points: 5 - pos }
}
export function scoreRows(teams: { id: string; name: string }[], bets: BetRow[], places: number[]) {
  const by = new Map<string, string>(); for (const b of bets) by.set(b.team_id, b.answer_text)
  return teams.map(t => ({ team: t.name, ...pointsFor(by.get(t.id) ?? '', places) }))
}
