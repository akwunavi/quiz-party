// Фазы раунда после «Старт» — ЧИСТАЯ функция от времени с startedAt и длины гонки. Проектор, пульт и любая перезагрузка страницы получают одно и то же.
import { T } from './config'
export type RacePhase = 'transition' | 'countdown' | 'race' | 'finish' | 'podiumTransition' | 'podium'
export interface RaceClock { phase: RacePhase; raceT: number; phaseT: number; podiumShown: number; countdown: number }
/** elapsed — секунды с startedAt (серверное время), raceEnd — длина гонки Race V3 (race.end). */
export function raceClock(elapsed: number, raceEnd: number): RaceClock {
  const e = Math.max(0, elapsed)
  const tTrans = T.transition, tCount = tTrans + T.countdown, tRace = tCount + raceEnd, tFin = tRace + T.finishHold, tPodTr = tFin + T.podiumTransition
  if (e < tTrans) return { phase: 'transition', raceT: 0, phaseT: e, podiumShown: 0, countdown: T.countdown }
  if (e < tCount) return { phase: 'countdown', raceT: 0, phaseT: e - tTrans, podiumShown: 0, countdown: Math.ceil(tCount - e) }
  if (e < tRace) return { phase: 'race', raceT: e - tCount, phaseT: e - tCount, podiumShown: 0, countdown: 0 }
  if (e < tFin) return { phase: 'finish', raceT: raceEnd, phaseT: e - tRace, podiumShown: 0, countdown: 0 }
  if (e < tPodTr) return { phase: 'podiumTransition', raceT: raceEnd, phaseT: e - tFin, podiumShown: 0, countdown: 0 }
  const pt = e - tPodTr
  return { phase: 'podium', raceT: raceEnd, phaseT: pt, podiumShown: Math.min(3, Math.floor(pt / T.podiumStep)), countdown: 0 }
}
/** Момент (секунды с startedAt), когда гонка закончилась и можно начислять очки: сразу после финиша последней собаки. */
export const gradeAt = (raceEnd: number) => T.transition + T.countdown + raceEnd
