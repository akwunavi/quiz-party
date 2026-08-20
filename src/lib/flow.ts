// ═══ МАРШРУТ ПОСЛЕ РАУНДА ═══
// Один расчёт для проектора и для админки: раньше логика была скопирована в
// оба места, они разошлись, и игра зацикливалась «табло → перерыв → табло».
//
// Порядок строгий и без возвратов:
//   конец раунда → [табло] → [перерыв] → следующий раунд / финал
// Каждый шаг включается своей настройкой раунда и проходится РОВНО ОДИН РАЗ.
import type { LoadedPack } from './packLoader'

export type AfterRoundStep =
  | { kind: 'scoreboard'; label: string }
  | { kind: 'break'; label: string }
  | { kind: 'next'; label: string }
  | { kind: 'finale'; label: string }

export function afterRoundStep(
  pack: LoadedPack, roundNumber: number, phase: string,
): AfterRoundStep {
  const round = pack.rounds[roundNumber]
  const s = (round?.settings ?? {}) as {
    show_scoreboard_after?: boolean; break_after_minutes?: number
  }
  const last = roundNumber + 1 >= pack.rounds.length
  const done: AfterRoundStep = last
    ? { kind: 'finale', label: 'ФИНАЛЬНЫЕ ИТОГИ →' }
    : { kind: 'next', label: 'СЛЕДУЮЩИЙ РАУНД →' }

  // перерыв — последний шаг маршрута, из него только вперёд
  if (phase === 'break') return done
  // с табло — либо в перерыв, либо сразу дальше
  if (phase === 'scoreboard') {
    return s.break_after_minutes
      ? { kind: 'break', label: 'ПЕРЕРЫВ →' }
      : done
  }
  // конец раунда
  if (s.show_scoreboard_after) return { kind: 'scoreboard', label: 'К ТАБЛО →' }
  if (s.break_after_minutes) return { kind: 'break', label: 'ПЕРЕРЫВ →' }
  return done
}
