// ═══ «Скачки бульдогов»: действия, общие для проектора и админки ═══
// Раньше жили только в RaceRound.tsx. При добавлении кнопки «Начать скачки»
// в админку (8.62) вынесены сюда — оба места пишут ОДНУ функцию, а не свою
// копию одной и той же записи в game_sessions, которая рано или поздно
// разойдётся (см. HANDOFF.md про маршрут после раунда — там уже было).
import { getRoomId } from './room'
import { room } from './transport'
import type { GameState, MelodyState } from '../types/quiz'
import { updateMelodyBag } from './sessionBag'
import { serverIso } from './serverClock'
import { DEFAULT_COURSE_SEC } from './bulldog/config'

export type RaceActionResult = 'written' | 'already'

/** Чистые условия переходов (идемпотентны: повтор на уже применённом состоянии → null, ничего не пишем). Лежат отдельно, чтобы тесты
 *  проверяли правила словами, а не вызовы сети. */
export const openBetsFn = (cur: MelodyState): MelodyState | null => (cur.race?.stage ? null : { ...cur, race: { stage: 'betting' } })
export const startRaceFn = (seed: number, startedAt: string, D: number) => (cur: MelodyState): MelodyState | null =>
  cur.race?.stage === 'betting' ? { ...cur, race: { seed, stage: 'running', startedAt, D } } : null
/** «Забег окончен» ставится только той гонке, что начисляется (тот же seed) и только из 'running': запоздавшая запись из старого цикла
 *  не заденет ни следующий раунд (там другого вида race), ни повторный запуск гонки. */
export const finishRaceFn = (seed: number) => (cur: MelodyState): MelodyState | null =>
  cur.race?.stage === 'running' && cur.race.seed === seed ? { ...cur, race: { ...cur.race, stage: 'done' } } : null

function conflict(): never { throw new Error('состояние игры только что изменилось — повторите действие') }

/** Открыть ставки: только если гонка ещё не начата (сброс «running»→«betting» перезагрузкой проектора невозможен — читается свежее
 *  состояние, а запись идёт через CAS, lib/sessionBag.ts). */
export async function openRaceBets(gameState: GameState): Promise<RaceActionResult> {
  const r = await updateMelodyBag(gameState, openBetsFn)
  if (r.status === 'conflict') conflict()
  return r.status === 'written' ? 'written' : 'already'
}

/** Сид забега рождается ИМЕННО ЗДЕСЬ — до этого вызова исхода не существует нигде, ни на одном экране: честность держится на том,
 *  что никто не может знать результат заранее. Старт — один раз: второй вызов (двойной клик, проектор + пульт одновременно) видит
 *  'running' и ничего не пишет, поэтому сид и startedAt не «перезапускаются» посреди забега. */
export async function startRace(gameState: GameState, D: number = DEFAULT_COURSE_SEC): Promise<RaceActionResult> {
  const seed = (crypto.getRandomValues(new Uint32Array(1))[0]) >>> 0
  // D пишется вместе с сидом: все экраны считают ОДНУ гонку, даже если настройку раунда правят уже во время забега
  const r = await updateMelodyBag(gameState, startRaceFn(seed, serverIso(), D))
  if (r.status === 'conflict') conflict()
  if (r.status === 'skipped') {
    const fresh = await room.readSession(getRoomId())
    if (!fresh?.melody?.race?.stage) throw new Error('выбор ещё не открыт — откройте экран забега на проекторе')
    return 'already'
  }
  return 'written'
}

/** Отметить забег оконченным (после начисления) — тоже через CAS с проверкой seed. */
export async function finishRace(gameState: GameState, seed: number): Promise<RaceActionResult> {
  const r = await updateMelodyBag(gameState, finishRaceFn(seed))
  if (r.status === 'conflict') conflict()
  return r.status === 'written' ? 'written' : 'already'
}
