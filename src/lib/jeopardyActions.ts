// ═══ «Своя игра»: открыть/закрыть плитку — общее для проектора и пульта ═══
//
// До 8.86 это жило прямо в HostScreen.tsx: и открытие (gotoQuestion +
// startTimer), и закрытие (список отыгранных + снятие таймера). Пульт
// ведущего в телефоне теперь делает ровно то же самое, поэтому вызов один на
// обоих — своя копия в админке рано или поздно разошлась бы с проектором
// (это уже случалось с маршрутом после раунда, см. HANDOFF §3v).
import { getRoomId } from './room'
import { room } from './transport'
import { gotoQuestion, startTimer } from './gameActions'
import { jeopardyRef, jpOpen, jpClose } from './jeopardyRef'
import type { GameState } from '../types/quiz'

/** Отметки «плитка отыграна» из состояния комнаты. Отдельное поле сессии:
 *  раньше лежали в completed_rounds, которое перезаписывается при смене
 *  раунда — отметки стирались, и вопрос можно было сыграть дважды. */
export function jeopardyOpened(gameState: GameState): string[] {
  return ((gameState as unknown as { jeopardy_opened?: unknown[] }).jeopardy_opened ?? [])
    .filter((x): x is string => typeof x === 'string')
}

/** Открыть плитку по её сквозному номеру.
 *  gotoQuestion обнуляет timer_started_at, а телефоны команд именно по нему
 *  понимают, что плитка открыта — без последующего startTimer они вечно
 *  показывали «ждём, пока ведущий откроет плитку». */
export async function openJeopardyTile(gameState: GameState, flat: number) {
  await gotoQuestion(flat)
  await startTimer({
    gameId: gameState.game_id, roundNumber: gameState.round_number,
    questionRef: jeopardyRef(gameState.round_number, flat),
  })
  await room.patchSession(getRoomId(), { melody: jpOpen(gameState.melody ?? {}, flat) })
}

/** Закрыть плитку: пометить отыгранной и вернуть доску.
 *  Возвращает текст ошибки записи отметки или null. Молчать нельзя: без
 *  миграции 0006 плитки просто не сохраняются, и это надо видеть на экране,
 *  а не узнавать из консоли. */
export async function closeJeopardyTile(gameState: GameState, tileKey: string,
  opened: string[]): Promise<string | null> {
  const next = opened.includes(tileKey) ? opened : [...opened, tileKey]
  let errorText: string | null = null
  try {
    await room.patchSession(getRoomId(), { jeopardy_opened: next })
  } catch (err) {
    errorText = 'Плитки не сохраняются: ' + (err as Error).message
      + '. Выполни миграцию 0006_jeopardy_opened.sql.'
  }
  // Плитка закрыта — у команд должна пропасть форма ответа. Она видна, пока
  // идёт таймер, поэтому его надо снять, иначе форма висит вечно.
  await room.patchSession(getRoomId(), {
    timer_started_at: null, reveal: false,
    melody: jpClose(gameState.melody ?? {}),
  })
  return errorText
}
