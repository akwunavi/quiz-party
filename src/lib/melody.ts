// ═══ «Угадай мелодию»: переходы стадий, общие для проектора и админки ═══
//
// До 8.86 весь автомат жил внутри MelodyRound.tsx (проектор) россыпью
// inline-вызовов saveMelody({...m, stage: ...}). Пульт ведущего в админке
// должен уметь ровно те же шаги — и если бы он писал свои копии этих
// объектов, две стороны рано или поздно разошлись бы (ровно это уже было с
// маршрутом после раунда, см. HANDOFF.md §3v). Поэтому переходы вынесены
// сюда ЧИСТЫМИ функциями (состояние → состояние, без записи и без времени),
// а запись — одна на всех, saveMelody ниже.
//
// Стадии, для справки (полный список — 9, см. HANDOFF §3ai):
//   idle/нет      — доска, трек не выбран
//   spinning      — барабан крутится (автошаг, кнопок нет)
//   listen        — 1 секунда трека (автошаг, кнопок нет)
//   bidding       — команды ставят секунды
//   bids          — ставки собраны, очередь известна
//   snippet       — играет отрывок (пассивный экран)
//   answering     — отвечает ПЕРВАЯ команда
//   passed        — ход у ВТОРОЙ: она слушает трек целиком
//   reveal        — угадали, показываем ответ и кто забрал баллы
//   done          — трек закрыт, назад к доске
import type { MelodyState } from '../types/quiz'

/** Дедлайн через N секунд в том же формате, что читают все экраны. */
export const melodyDeadline = (sec: number, now = Date.now()) =>
  new Date(now + sec * 1000).toISOString()

/** Ключи всех треков раунда в порядке «тема-трек». */
export function melodyKeys(themes: { tracks: unknown[] }[]): string[] {
  return themes.flatMap((t, x) => t.tracks.map((_, y) => `${x}-${y}`))
}

/** Ещё не отыгранные треки. */
export function melodyFree(themes: { tracks: unknown[] }[], played: string[]): string[] {
  return melodyKeys(themes).filter(k => !played.includes(k))
}

/** Доска: трек не выбран (или уже закрыт) — можно крутить рулетку. */
export function melodyIdle(m: MelodyState): boolean {
  return !m.stage || m.stage === 'idle' || m.stage === 'done'
}

/** Запуск трека рулеткой. Одна свободная плитка — крутить нечего, открываем
 *  сразу (то же правило, что и на проекторе: барабан по одной плитке выглядит
 *  как зависание). `spinSec` ограничен восемью секундами — зал не ждёт дольше. */
export function melodySpin(m: MelodyState, key: string, freeCount: number,
  spinSec: number, now = Date.now()): MelodyState {
  const base = { ...m, key, order: undefined, turn: 0, chooser: undefined }
  if (freeCount <= 1) return { ...base, stage: 'listen', deadline: melodyDeadline(3, now) }
  return { ...base, stage: 'spinning', deadline: melodyDeadline(Math.min(spinSec, 8), now) }
}

/** Ставки собраны — запускаем отрывок на выигравшую ставку. */
export function melodyPlaySnippet(m: MelodyState, bidSec: number): MelodyState {
  return { ...m, stage: 'snippet', snippetSec: bidSec || 5, deadline: undefined }
}

/** Отрывок отыграл (или звук не пошёл) — открываем окно на ответ. */
export function melodyAcceptAnswer(m: MelodyState, answerSec: number,
  now = Date.now()): MelodyState {
  return { ...m, stage: 'answering', deadline: melodyDeadline(answerSec, now) }
}

/** Трек закрыт без очков: «пропустить трек», аварийное «закрыть», а также
 *  промах последней команды. Ключ уходит в отыгранные — второй раз он не
 *  выпадет ни рулеткой, ни ручным выбором. */
export function melodyClose(m: MelodyState): MelodyState {
  const played = m.played ?? []
  const key = m.key
  return {
    ...m, stage: 'done', deadline: undefined,
    played: key && !played.includes(key) ? [...played, key] : played,
  }
}

/** Первая команда не угадала. Есть кому передать — ход уходит второй
 *  (она слушает трек ЦЕЛИКОМ), некому — трек закрывается. */
export function melodyPass(m: MelodyState): MelodyState {
  const first = (m.turn ?? 0) === 0
  const hasSecond = (m.order?.length ?? 0) > 1
  if (first && hasSecond) return { ...m, stage: 'passed', turn: 1, deadline: undefined }
  return melodyClose(m)
}

/** Угадали: показываем ответ и кто забрал баллы. Трек уходит в отыгранные
 *  ЗДЕСЬ, а не при закрытии окна — иначе выход по крестику вернул бы его на
 *  доску уже разыгранным. */
export function melodyReveal(m: MelodyState, pts: number, teamId?: string): MelodyState {
  const played = m.played ?? []
  const key = m.key
  return {
    ...m, stage: 'reveal', deadline: undefined, wonPts: pts, wonTeam: teamId,
    chooser: undefined,
    played: key && !played.includes(key) ? [...played, key] : played,
  }
}

/** С экрана результата — обратно к доске. */
export function melodyToBoard(m: MelodyState): MelodyState {
  return { ...m, stage: 'done' }
}

/** Сколько очков даёт верный ответ: 2–5 сек → 2, 6+ → 1, у второй команды
 *  (ход передан) всегда 0.5. Формула одна на проектор и на пульт. */
export function melodyPoints(bidSec: number, first: boolean): number {
  if (!first) return 0.5
  return bidSec <= 5 ? 2 : 1
}
