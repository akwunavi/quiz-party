// ═══ Защищённая (CAS) запись мешка `melody` в game_sessions ═══
// (9.61, HANDOFF §3bw). Пока бо́льшая часть логики мелодии писала состояние
// слепым `patchSession({ melody: next })`: если два места (проектор и
// пульт, или два автоперехода) читали ОДИН снимок и оба решали писать —
// выживал тот, чья сетевая запись долетела последней, а не тот, чьё
// решение было актуальнее. Здесь вместо этого — read-modify-CAS-retry:
// решение (`fn`) пересчитывается заново на каждой попытке из СВЕЖЕГО
// снимка, поэтому устаревшее решение просто не пишется повторно (см.
// lib/melody.ts:guardMelody — условие внутри `fn` обязано быть
// идемпотентным).
import { getRoomId } from './room'
import { room } from './transport'
import type { GameState, MelodyState } from '../types/quiz'

/** Пересчитать следующее состояние мешка мелодии из ТЕКУЩЕГО. Вернуть
 *  `null`, если при этом состоянии писать уже нечего (переход неприменим —
 *  кто-то другой уже увёл игру дальше). Обязана быть идемпотентной. */
export type BagFn = (cur: MelodyState) => MelodyState | null

export type BagResult =
  | { status: 'written'; next: MelodyState }
  | { status: 'skipped' }
  | { status: 'conflict' }

/** Миграция 0014 ещё не прогнана на этой базе — `state_rev` в GameState
 *  просто нет. Деградация до старого поведения (слепая запись), не ошибка. */
export function casEnabled(gs: GameState | null): boolean {
  return typeof gs?.state_rev === 'number'
}

let warnedNoCas = false

export async function updateMelodyBag(
  base: GameState | null, fn: BagFn, maxAttempts = 3,
): Promise<BagResult> {
  const roomId = getRoomId()
  let snap = base ?? await room.readSession(roomId)

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const next = fn(snap?.melody ?? {})
    if (next === null) return { status: 'skipped' }

    if (!casEnabled(snap)) {
      if (!warnedNoCas) {
        warnedNoCas = true
        console.warn(
          'защита от гонки записи не активна — прогоните миграцию 0014 в SQL Editor '
          + '(supabase/migrations/0014_session_state_rev.sql)',
        )
      }
      await room.patchSession(roomId, { melody: next })
      return { status: 'written', next }
    }

    const r = await room.casSession(roomId, snap!.state_rev as number, { melody: next })
    if (r.ok) return { status: 'written', next }

    snap = r.current ?? await room.readSession(roomId)
  }

  return { status: 'conflict' }
}
