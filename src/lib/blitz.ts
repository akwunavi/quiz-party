// ═══ БЛИЦ «100 ВОПРОСОВ»: ОЧКИ И БАЛЛЫ ═══
//
// В этом раунде ДВЕ разные величины, и путать их нельзя:
//
//  • ОЧКИ — внутренняя валюта раунда. +1 за верный ответ, −1 за скип или
//    исчерпанные попытки. Команде, у которой первой кончилось время, −10.
//  • БАЛЛЫ — то, что уходит на общее табло игры. Начисляются ПО МЕСТАМ,
//    а места определяются очками уже ПОСЛЕ штрафа.
//
// Пример из обсуждения: 18, 16, 10, 9 очков. Время кончилось у команды с
// 18 — она теряет 10 и получает 8. Порядок становится 16, 10, 9, 8, и
// бывший лидер уходит на четвёртое место с 3 баллами.
//
// Места делятся плотно: три команды с равными очками все «первые», а
// следующая за ними — «вторая». То есть 10, 10, 10, 7 — как и договорились.

/** Баллы за место. Четвёртое и ниже — по 3. */
export const PLACE_POINTS = [10, 7, 5] as const
export const PLACE_POINTS_REST = 3

/** Штраф по умолчанию команде, у которой первой кончилось время.
 *  Настраивается в редакторе раунда (`settings.timeoutPenalty`): цифра
 *  подбирается на живых играх, зашивать её в код нельзя.
 *  Если раунд кончился из-за того, что кончились ВОПРОСЫ, штрафа нет. */
export const TIMEOUT_PENALTY = 10

export type BlitzTeamState = {
  teamId: string
  /** Верные ответы за раунд. */
  correct: number
  /** Скипы и вопросы, где исчерпаны три попытки. */
  missed: number
  /** true у той единственной команды, на которой остановился таймер. */
  timedOut?: boolean
  /** Остаток времени в миллисекундах на момент конца раунда.
   *  По нему раздаётся бонус за скорость. */
  leftMs?: number
}

/** Бонус за остаток времени: кто сэкономил больше, тот и получил.
 *  Команды с нулевым остатком бонуса не получают вовсе — иначе тот, у
 *  кого время кончилось, оказался бы в одной группе с теми, кто просто
 *  доиграл впритык. */
export const TIME_BONUS = [3, 2, 1] as const

/** Раздать бонус за скорость. Равный остаток — равный бонус, следующая
 *  группа получает следующий по величине, а не пропущенный. */
export function timeBonuses(teams: BlitzTeamState[]): Map<string, number> {
  const out = new Map<string, number>()
  const withTime = teams.filter(t => (t.leftMs ?? 0) > 0)
  const tiers = [...new Set(withTime.map(t => t.leftMs ?? 0))].sort((a, b) => b - a)
  for (const t of teams) {
    const i = tiers.indexOf(t.leftMs ?? 0)
    out.set(t.teamId, (t.leftMs ?? 0) > 0 && i >= 0 ? (TIME_BONUS[i] ?? 0) : 0)
  }
  return out
}

export type BlitzResultRow = {
  teamId: string
  /** Очки до штрафа и бонуса — их видно на экране по ходу раунда. */
  raw: number
  /** Бонус за остаток времени: 3 / 2 / 1 или 0. */
  bonus: number
  /** Очки после штрафа: по ним определяются места. */
  points: number
  place: number
  shared: boolean
  /** Баллы в общий зачёт игры. */
  score: number
}

/** Очки команды до штрафа. */
export function rawPoints(t: BlitzTeamState): number {
  return t.correct - t.missed
}

/** Итоги раунда: очки → места → баллы.
 *  Чистая функция без обращений к базе — её проверяют тесты, и она же
 *  используется на проекторе, чтобы цифры нигде не разошлись. */
export function blitzResults(
  teams: BlitzTeamState[],
  /** Штраф за таймаут. Приходит из настроек раунда; ноль означает
   *  «штрафа нет вообще» — это допустимая настройка, а не ошибка. */
  timeoutPenalty: number = TIMEOUT_PENALTY,
): BlitzResultRow[] {
  const penalty = Math.max(0, timeoutPenalty)
  const bonus = timeBonuses(teams)
  const withPoints = teams.map(t => ({
    teamId: t.teamId,
    raw: rawPoints(t),
    bonus: bonus.get(t.teamId) ?? 0,
    // Порядок важен: сначала очки за ответы, потом штраф за таймаут,
    // потом бонус за скорость. Места считаются уже по итогу.
    points: rawPoints(t) - (t.timedOut ? penalty : 0) + (bonus.get(t.teamId) ?? 0),
  }))

  // Плотная нумерация мест: равные очки — одно место, следующее не
  // пропускается. Иначе после дележа первого места второе исчезало бы.
  const sorted = [...withPoints].sort((a, b) => b.points - a.points)
  const uniq: number[] = []
  for (const r of sorted) if (!uniq.includes(r.points)) uniq.push(r.points)

  return sorted.map(r => {
    const place = uniq.indexOf(r.points) + 1
    const shared = sorted.filter(x => x.points === r.points).length > 1
    const score = PLACE_POINTS[place - 1] ?? PLACE_POINTS_REST
    return { ...r, place, shared, score }
  })
}
