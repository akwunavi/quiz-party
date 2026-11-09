// ═══ «Скачки бульдогов»: действия, общие для проектора и админки ═══
// Раньше жили только в RaceRound.tsx. При добавлении кнопки «Начать скачки»
// в админку (8.62) вынесены сюда — оба места пишут ОДНУ функцию, а не свою
// копию одной и той же записи в game_sessions, которая рано или поздно
// разойдётся (см. HANDOFF.md про маршрут после раунда — там уже было).
import { getRoomId } from './room'
import { room } from './transport'
import type { GameState } from '../types/quiz'
import { serverIso } from './serverClock'
import { DEFAULT_COURSE_SEC } from './bulldog/config'

/** Открыть ставки — тот же переход, что уже случается сам при заходе на
 *  экран забега (RaceRound.tsx), просто доступный отдельной кнопкой. */
export async function openRaceBets(gameState: GameState) {
  await room.patchSession(getRoomId(), {
    melody: { ...gameState.melody, race: { stage: 'betting' } },
  })
}

/** Сид забега рождается ИМЕННО ЗДЕСЬ — до этого вызова исхода не существует
 *  нигде, ни на одном экране: честность держится на том, что никто не может
 *  знать результат заранее. */
export async function startRace(gameState: GameState, D: number = DEFAULT_COURSE_SEC) {
  const seed = (crypto.getRandomValues(new Uint32Array(1))[0]) >>> 0
  // D пишется вместе с сидом: все экраны считают ОДНУ гонку, даже если настройку раунда правят уже во время забега
  await room.patchSession(getRoomId(), {
    melody: { ...gameState.melody, race: { seed, stage: 'running', startedAt: serverIso(), D } },
  })
}
