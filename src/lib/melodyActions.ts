// ═══ «Угадай мелодию»: запись состояния ═══
// Чистые переходы — в lib/melody.ts (их гоняют тесты); здесь запись.
// 9.61 (HANDOFF §3bw): бо́льшая часть записи переведена на защищённую
// (CAS) запись через lib/sessionBag.ts — условие проверяется на СВЕЖЕМ
// состоянии перед каждой попыткой, а не только один раз в замыкании
// эффекта, как раньше (freshMelodyOrAbort/bidsAdvancingRef, удалены).
import { getRoomId } from './room'
import { room } from './transport'
import { melodyPass, melodyPoints, melodyReveal } from './melody'
import { updateMelodyBag, type BagFn } from './sessionBag'
import type { Answer, GameState, MelodyState } from '../types/quiz'

/** Слепая запись без защиты от гонки. Единственные оставшиеся вызовы —
 *  «Своя игра» (JeopardyRound.tsx, AdminPage.tsx — ServiceDrawer её ещё не
 *  использует нигде для мелодии) и осознанный жёсткий сброс между раундами
 *  (finishMelodyRound/сброс в AdminPage) — там триггер БД всё равно поднимет
 *  версию сам, любые устаревшие CAS-попытки, летящие в этот момент,
 *  корректно не пройдут после сброса. Удалить полностью для мелодии, когда
 *  «Своя игра» тоже переедет на CAS (см. HANDOFF §7, P2a). */
export async function saveMelody(next: MelodyState) {
  await room.patchSession(getRoomId(), { melody: next })
}

/** Тонкая обёртка над updateMelodyBag — для автопереходов (эффекты), где
 *  устаревшая попытка просто тихо пропускается (skipped/conflict не
 *  считается ошибкой пользователя — эффект просто ничего не сделал). */
export async function updateMelody(gs: GameState | null, fn: BagFn): Promise<void> {
  await updateMelodyBag(gs, fn)
}

/** Для явных кликов ведущего (Р2): устаревшая кнопка обязана СКАЗАТЬ об
 *  этом, а не молчать — бросает читаемую ошибку, которую подхватывает
 *  runAction (AdminPage) или локальный catch (проектор). */
export async function melodyClick(gs: GameState | null, fn: BagFn): Promise<void> {
  const r = await updateMelodyBag(gs, fn)
  if (r.status === 'skipped' || r.status === 'conflict') {
    throw new Error('Экран уже перешёл дальше — кнопка устарела')
  }
}

/** Вердикт по ответу на трек. Один вызов на проектор и на пульт ведущего:
 *  очки считает melodyPoints, стадию — melodyReveal, копий формулы нет.
 *
 *  9.62 (HANDOFF §3bx, находка 3): порядок операций ОБЯЗАН быть «сначала
 *  CAS-переход, потом patchAnswer» — раньше было наоборот, и устаревшая
 *  кнопка (ход уже ушёл другой команде на другом экране) успевала
 *  необратимо испортить чужой ответ ДО того, как CAS отклонял саму
 *  попытку. Очки считаются ВНУТРИ условия — на том же `cur`, на котором
 *  реально прошла запись, а не на устаревшем внешнем снимке `gs`. */
export async function gradeMelody(gs: GameState, ans: Answer, correct: boolean,
  bidSec: number): Promise<void> {
  const m = gs.melody ?? {}
  let appliedPts = 0
  const r = await updateMelodyBag(gs, cur => {
    if (!(cur.key === m.key && (cur.stage === 'answering' || cur.stage === 'passed')
      && (cur.turn ?? 0) === (m.turn ?? 0))) return null
    const pts = correct ? melodyPoints(bidSec, (cur.turn ?? 0) === 0) : 0
    appliedPts = pts
    // верно — показываем результат и кто забрал; неверно — просто снимаем
    // время и ждём, пока ведущий передаст ход
    return correct ? melodyReveal(cur, pts, ans.team_id) : { ...cur, deadline: undefined }
  })
  if (r.status === 'skipped' || r.status === 'conflict') {
    throw new Error('Экран уже перешёл дальше — кнопка устарела')
  }
  await room.patchAnswer(ans.id, { is_correct: correct, stake: appliedPts })
}

/** «Не угадали» и «дальше» — одно действие: отметить промах (если ведущий не
 *  отметил его сам) и передать ход второй команде либо закрыть трек.
 *
 *  9.62 (HANDOFF §3bx, находка 3): тот же порядок, что и в gradeMelody —
 *  СНАЧАЛА CAS-переход, и только если он реально прошёл — отметка промаха
 *  в `answers`. Раньше `patchAnswer(false, 0)` уходил ДО проверки условия
 *  и мог затереть уже верный ответ, оценённый параллельно вторым экраном
 *  (стадия там уже ушла в 'reveal', здесь ещё казалось, что 'answering'). */
export async function passMelody(gs: GameState, ans?: Answer): Promise<void> {
  const m = gs.melody ?? {}
  let markWrong = false
  const r = await updateMelodyBag(gs, cur => {
    if (!(cur.key === m.key && (cur.stage === 'answering' || cur.stage === 'passed')
      && (cur.turn ?? 0) === (m.turn ?? 0))) return null
    markWrong = !!ans && ans.is_correct == null
    return melodyPass(cur)
  })
  if (r.status === 'skipped' || r.status === 'conflict') {
    throw new Error('Экран уже перешёл дальше — кнопка устарела')
  }
  if (markWrong && ans) {
    await room.patchAnswer(ans.id, { is_correct: false, stake: 0 })
  }
}
