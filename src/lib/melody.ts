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

/** Максимальная ставка — жёстко зашита в ряд кнопок на телефоне
 *  (PlayerPage.tsx, [2..10]). Меняешь диапазон там — поменяй и здесь. */
const MAX_BID_SEC = 10

/** До какой секунды может начаться «сюрприз-отрывок» — с запасом на
 *  максимальную ставку, чтобы отрывок никогда не пытался сыграть за
 *  пределами файла. `trackSec` — настройка раунда (номинальная длина
 *  треков этого пака, ведущий сам решает 20 это или 30); `realDuration` —
 *  секунда, если браузер её уже сообщил (см. HANDOFF: трек может быть
 *  короче заявленного, отрывок в конце обрывался бы тишиной). Слишком
 *  короткий trackSec (короче ставки) не роняет формулу — потолок уходит
 *  в 0, и отрывок всегда стартует с начала, как раньше. */
export function melodyPreviewCeiling(trackSec: number, realDuration?: number): number {
  const len = realDuration && realDuration > 0 ? Math.min(trackSec, realDuration) : trackSec
  return Math.max(0, len - MAX_BID_SEC)
}

/** Случайная секунда старта — выбирается ОДИН раз при открытии трека и
 *  дальше живёт в состоянии (см. MelodyState.startSec): «слушаем 1
 *  секунду» и отрывок по ставке победителя обязаны стартовать с одной и
 *  той же точки, не с двух разных бросков. Дробная секунда — точность не
 *  нужна, важно только не спрашивать её нигде на экране (не тот дух игры). */
export function melodyRandomStart(ceiling: number): number {
  return Math.random() * ceiling
}

/** Доска: трек не выбран (или уже закрыт) — можно крутить рулетку. */
export function melodyIdle(m: MelodyState): boolean {
  return !m.stage || m.stage === 'idle' || m.stage === 'done'
}

/** Запуск трека рулеткой. Одна свободная плитка — крутить нечего, открываем
 *  сразу (то же правило, что и на проекторе: барабан по одной плитке выглядит
 *  как зависание). `spinSec` ограничен восемью секундами — зал не ждёт дольше.
 *  `trackSec` — номинальная длина треков раунда, отсюда же считается случайная
 *  точка старта (см. melodyPreviewCeiling) — задаётся ЗДЕСЬ, а не по месту
 *  показа, потому что рулетку дёргают И проектор, И пульт в админке
 *  (AdminPage.tsx) — общая точка входа не даёт им разойтись. */
export function melodySpin(m: MelodyState, key: string, freeCount: number,
  spinSec: number, trackSec: number, now = Date.now()): MelodyState {
  const startSec = melodyRandomStart(melodyPreviewCeiling(trackSec))
  const base = { ...m, key, order: undefined, turn: 0, chooser: undefined, startSec }
  if (freeCount <= 1) return { ...base, stage: 'listen', deadline: melodyDeadline(3, now) }
  return { ...base, stage: 'spinning', deadline: melodyDeadline(Math.min(spinSec, 8), now) }
}

/** Ручной выбор плитки (Р2, без рулетки) — та же логика выбора случайной
 *  точки старта, что и у melodySpin, просто без стадии spinning. Раньше жила
 *  инлайном прямо в обработчике кнопки на проекторе — вынесена сюда, чтобы
 *  не плодить вторую копию формулы `melodyPreviewCeiling`. */
export function melodyPick(m: MelodyState, key: string, trackSec: number,
  now = Date.now()): MelodyState {
  const startSec = melodyRandomStart(melodyPreviewCeiling(trackSec))
  return {
    ...m, key, startSec, stage: 'listen', deadline: melodyDeadline(3, now),
    order: undefined, turn: 0, chooser: undefined,
  }
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

// ═══ 9.61 (HANDOFF §3bw): условные переходы для CAS-записи (lib/sessionBag.ts) ═══
//
// Раньше защита от «клик ведущего против устаревшего автоперехода» была
// россыпью inline-проверок (freshMelodyOrAbort, bidsAdvancingRef —
// MelodyRound.tsx, HANDOFF §3bu/§3bv) — и работала ТОЛЬКО на проекторе,
// пульт в админке был не защищён вовсе. guardMelody — тот же приём (не
// писать, если условие, на котором принималось решение, уже неактуально),
// но как ЧИСТАЯ функция условие→переход, годная для CAS: sessionBag
// повторяет попытку на свежем состоянии сам, если условие держится.
//
// ПРАВИЛО: функция-переход (то, что передают в guardMelody вторым
// аргументом) ОБЯЗАНА быть идемпотентной — повторный вызов на состоянии,
// где наша запись уже применилась, должен вернуть `null` (нечего писать)
// или тот же результат, а не откатить/задвоить эффект.
export type MelodyStage = NonNullable<MelodyState['stage']>

export type MelodyExpect = {
  key: string | undefined
  stage: MelodyStage | MelodyStage[]
  turn?: number
}

/** Условие «состояние всё ещё то, на котором мы решили действовать». */
export function melodyMatches(cur: MelodyState, e: MelodyExpect): boolean {
  if (cur.key !== e.key) return false
  const stages = Array.isArray(e.stage) ? e.stage : [e.stage]
  if (!cur.stage || !stages.includes(cur.stage)) return false
  if (e.turn !== undefined && (cur.turn ?? 0) !== e.turn) return false
  return true
}

/** Обернуть чистый переход условием: пишем, только если состояние всё ещё
 *  соответствует ожиданию — иначе `null` (не пишем, кто-то уже увёл игру
 *  дальше). Готовая `BagFn` для lib/sessionBag.ts:updateMelodyBag. */
export function guardMelody(
  e: MelodyExpect, f: (cur: MelodyState) => MelodyState | null,
): (cur: MelodyState) => MelodyState | null {
  return cur => (melodyMatches(cur, e) ? f(cur) : null)
}

/** Очередь команд по ставкам: кто поставил меньше секунд — играет раньше;
 *  при равенстве секунд — кто поставил раньше (`updated_at`); команды без
 *  ставки — в конец очереди (если первая не угадает, ход всё равно есть
 *  кому передать). Общая для проектора и пульта — раньше была продублирована
 *  инлайном в обоих местах (см. MelodyRound.tsx до 9.61). */
export function melodyOrderFromBids(
  bids: { team_id: string; answer_text: string; updated_at: string }[],
  teamIds: string[],
): string[] {
  const bidders = bids
    .map(a => ({ id: a.team_id, sec: Number(a.answer_text) || 99, at: a.updated_at }))
    .sort((x, y) => x.sec - y.sec || +new Date(x.at) - +new Date(y.at))
    .map(b => b.id)
  return [...bidders, ...teamIds.filter(id => !bidders.includes(id))]
}

/** Секунд по ставке победителя очереди — пересчитывается на СВЕЖИХ `bids`/
 *  `cur` в момент вызова (Р3: опоздавшая ставка, поменявшая порядок,
 *  учитывается, даже если ведущий уже нажал «Играем N сек»). */
export function melodyBidSec(
  bids: { team_id: string; answer_text: string }[], cur: MelodyState,
): number {
  const currentId = cur.order?.[cur.turn ?? 0]
  return Number(bids.find(b => b.team_id === currentId)?.answer_text) || 0
}

/** «Играем N сек»: пишет переход, ТОЛЬКО если локальный список `bids`
 *  (независимый REST-поллер вызывающего экрана — у пульта в админке и
 *  у проектора это ДВЕ разные подписки) уже знает лидера свежего
 *  `cur.order`, прочитанного прямо перед CAS-записью. Если лидера в
 *  локальных `bids` нет — они точно устарели относительно `cur.order`
 *  (кто-то пересобрал очередь по опоздавшей ставке между опросами этого
 *  экрана), и секунды посчитались бы по чужой/старой ставке. Возвращает
 *  `null` (не пишем, идемпотентно) — ведущий нажмёт ещё раз, к этому
 *  моменту `bids` уже подтянутся опросом (HANDOFF §3bx, находка 4). */
export function melodyPlaySnippetIfFresh(
  cur: MelodyState, bids: { team_id: string; answer_text: string }[],
): MelodyState | null {
  const leader = cur.order?.[cur.turn ?? 0]
  if (leader && !bids.some(b => b.team_id === leader)) return null
  return melodyPlaySnippet(cur, melodyBidSec(bids, cur))
}

/** Аварийное «Закрыть»: действует на ЛЮБОЙ активной стадии ТОГО ЖЕ
 *  трека, а не только на стадии, что была на момент клика. Пульт
 *  открывает `confirm()`, который может провисеть несколько секунд, пока
 *  ведущий решает нажимать «ОК» — за это время короткая цепочка
 *  автостадий (spinning→listen→bidding) успевает переключиться сама, без
 *  участия ведущего, и проверка «та же стадия» после этого никогда не
 *  совпадала бы (кнопка молчала бы «устарела», хотя смысл этой кнопки
 *  именно «закрыть немедленно, что бы сейчас ни происходило» — HANDOFF
 *  §3bx, находка 5). Экспортирована отдельно (а не заинлайнена в
 *  MelodyRound.tsx/AdminPage.tsx), чтобы тест на это условие проверял
 *  РЕАЛЬНЫЙ боевой код, а не свою копию.
 *
 *  Стадия `reveal` исключена нарочно (ревью, HANDOFF §3bx): `melodyIdle`
 *  не считает её неактивной, а на `reveal` уже показан победитель и
 *  начислены очки — «закрыть» здесь стёрло бы экран разбора и не тронуло
 *  бы уже записанные баллы, то есть ведущий думал бы, что отменил трек,
 *  а на самом деле только скрыл его результат. */
export function melodyEmergencyClose(
  key: string | undefined,
): (cur: MelodyState) => MelodyState | null {
  return cur => (
    cur.key === key && !melodyIdle(cur) && cur.stage !== 'reveal' ? melodyClose(cur) : null
  )
}
