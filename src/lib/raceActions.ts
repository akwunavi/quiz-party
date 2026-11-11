// ═══ «Скачки бульдогов»: действия, общие для проектора и админки ═══
// Раньше жили только в RaceRound.tsx. При добавлении кнопки «Начать скачки»
// в админку (8.62) вынесены сюда — оба места пишут ОДНУ функцию, а не свою
// копию одной и той же записи в game_sessions, которая рано или поздно
// разойдётся (см. HANDOFF.md про маршрут после раунда — там уже было).
import { getRoomId } from './room'
import { room } from './transport'
import type { GameState, MelodyState } from '../types/quiz'
import { updateMelodyBag } from './sessionBag'
import { serverIso, serverNow } from './serverClock'
import { DEFAULT_COURSE_SEC, START_LEAD_MS } from './bulldog/config'
import { raceKey, raceOf } from './bulldog/bets'

export type RaceActionResult = 'written' | 'already'

/** Чистые условия переходов (идемпотентны: повтор на уже применённом состоянии → null, ничего не пишем). Лежат отдельно, чтобы тесты
 *  проверяли правила словами, а не вызовы сети. `at` — раунд и игра, к которым относится запись (raceOf): чужое/старое состояние = «нет состояния». */
export interface RaceAt { round: number; game: string }
export const openBetsFn = (at: RaceAt) => (cur: MelodyState): MelodyState | null =>
  raceOf(cur, at.round, at.game).stage ? null : { ...cur, race: { stage: 'betting', round: at.round, game: at.game } }
/** «Старт» ведущего: ставки закрываются СРАЗУ (сервер — только `betting` принимает ставки, миграция 0017), сид и D фиксируются один раз; startedAt ещё НЕТ — гонка не идёт, проектор готовит ресурсы и музыку. */
export const startRaceFn = (at: RaceAt, seed: number, preparingAt: string, D: number) => (cur: MelodyState): MelodyState | null =>
  raceOf(cur, at.round, at.game).stage === 'betting' ? { ...cur, race: { seed, stage: 'preparing', preparingAt, D, round: at.round, game: at.game } } : null
/** Проектор готов (или ведущий решил без проверки/без музыки): ОДИН серверный startedAt для всех. Только из `preparing` и только пока startedAt нет — повтор, второй проектор, пульт одновременно с проектором ничего не перепишут. */
export const beginRaceFn = (at: RaceAt, seed: number, startedAt: string, noMusic?: boolean) => (cur: MelodyState): MelodyState | null => {
  const r = raceOf(cur, at.round, at.game)
  if (r.stage !== 'preparing' || r.seed !== seed || r.startedAt) return null
  const { prep: _prep, ...rest } = r; void _prep
  return { ...cur, race: { ...rest, stage: 'running', startedAt, ...(noMusic ? { noMusic: true } : {}) } }
}
/** Статус подготовки для пульта (пишет проектор): только `preparing` и только та же гонка; тот же статус — не пишем (нет лишних записей). */
export const reportPrepFn = (at: RaceAt, seed: number, prep: NonNullable<NonNullable<MelodyState['race']>['prep']>) => (cur: MelodyState): MelodyState | null => {
  const r = raceOf(cur, at.round, at.game)
  if (r.stage !== 'preparing' || r.seed !== seed || (r.prep?.status === prep.status && r.prep?.msg === prep.msg)) return null
  return { ...cur, race: { ...r, prep } }
}
/** «Забег окончен» ставится только той гонке, что начисляется (тот же seed, тот же раунд и игра) и только из 'running': запоздавшая запись из
 *  старого цикла не заденет ни следующий раунд (там другое состояние), ни повторный запуск гонки. */
export const finishRaceFn = (at: RaceAt, seed: number) => (cur: MelodyState): MelodyState | null => {
  const r = raceOf(cur, at.round, at.game)
  if (r.stage !== 'running' || r.seed !== seed) return null
  const done = { ...r, stage: 'done' as const }
  return { ...cur, race: done, raceDone: { ...(cur.raceDone ?? {}), [raceKey(at.game, at.round)]: done } }
}
const atOf = (gs: GameState): RaceAt => ({ round: gs.round_number, game: gs.game_id })

function conflict(): never { throw new Error('состояние игры только что изменилось — повторите действие') }

/** Открыть ставки: только если гонка ещё не начата (сброс «running»→«betting» перезагрузкой проектора невозможен — читается свежее
 *  состояние, а запись идёт через CAS, lib/sessionBag.ts). */
export async function openRaceBets(gameState: GameState): Promise<RaceActionResult> {
  const r = await updateMelodyBag(gameState, openBetsFn(atOf(gameState)))
  if (r.status === 'conflict') conflict()
  return r.status === 'written' ? 'written' : 'already'
}

/** Сид забега рождается ИМЕННО ЗДЕСЬ — до этого вызова исхода не существует нигде, ни на одном экране: честность держится на том,
 *  что никто не может знать результат заранее. Старт — один раз: второй вызов (двойной клик, проектор + пульт одновременно) видит
 *  'running' и ничего не пишет, поэтому сид и startedAt не «перезапускаются» посреди забега. */
export async function startRace(gameState: GameState, D: number = DEFAULT_COURSE_SEC): Promise<RaceActionResult> {
  const seed = (crypto.getRandomValues(new Uint32Array(1))[0]) >>> 0
  // D пишется вместе с сидом: все экраны считают ОДНУ гонку, даже если настройку раунда правят уже во время забега
  const r = await updateMelodyBag(gameState, startRaceFn(atOf(gameState), seed, serverIso(), D))   // → этап `preparing`
  if (r.status === 'conflict') conflict()
  if (r.status === 'skipped') {
    const fresh = await room.readSession(getRoomId())
    if (!raceOf(fresh?.melody, gameState.round_number, gameState.game_id).stage) throw new Error('выбор ещё не открыт — откройте экран забега на проекторе')
    return 'already'
  }
  return 'written'
}

/** Начать гонку: проектор готов (или ведущий решил начать без проверки / без музыки). startedAt = серверное «сейчас» + START_LEAD_MS; сам бег (raceT=0) наступит ещё через переход и отсчёт. Повтор → 'already'. */
export async function beginRace(gameState: GameState, seed: number, opts: { noMusic?: boolean } = {}): Promise<RaceActionResult> {
  const startedAt = new Date(serverNow() + START_LEAD_MS).toISOString()
  const r = await updateMelodyBag(gameState, beginRaceFn(atOf(gameState), seed, startedAt, opts.noMusic))
  if (r.status === 'conflict') conflict()
  return r.status === 'written' ? 'written' : 'already'
}
/** Сообщить пульту, как идёт подготовка проектора (не критично: ошибка записи не мешает подготовке). */
export async function reportPrep(gameState: GameState, seed: number, status: 'loading' | 'audio_blocked' | 'error' | 'ready', msg?: string): Promise<void> {
  const prep = { status, ...(msg ? { msg } : {}), at: serverIso() }
  const r = await updateMelodyBag(gameState, reportPrepFn(atOf(gameState), seed, prep)); void r
}

/** Отметить забег оконченным (после начисления) — тоже через CAS с проверкой seed. */
export async function finishRace(gameState: GameState, seed: number): Promise<RaceActionResult> {
  const r = await updateMelodyBag(gameState, finishRaceFn(atOf(gameState), seed))
  if (r.status === 'conflict') conflict()
  return r.status === 'written' ? 'written' : 'already'
}
