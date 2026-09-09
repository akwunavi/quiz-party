// ═══ «Угадай мелодию»: запись состояния ═══
// Чистые переходы — в lib/melody.ts (их гоняют тесты); здесь только запись,
// одна на проектор и на пульт ведущего. Разделение то же, что у блица:
// blitzState.ts (чистый автомат) + blitzApi.ts (запись).
import { getRoomId } from './room'
import { room } from './transport'
import { melodyPass, melodyPoints, melodyReveal } from './melody'
import type { Answer, MelodyState } from '../types/quiz'

/** Единственная точка записи состояния мелодии. */
export async function saveMelody(next: MelodyState) {
  await room.patchSession(getRoomId(), { melody: next })
}

/** Вердикт по ответу на трек. Один вызов на проектор и на пульт ведущего:
 *  очки считает melodyPoints, стадию — melodyReveal, копий формулы нет. */
export async function gradeMelody(m: MelodyState, ans: Answer, correct: boolean,
  bidSec: number): Promise<void> {
  const pts = correct ? melodyPoints(bidSec, (m.turn ?? 0) === 0) : 0
  await room.patchAnswer(ans.id, { is_correct: correct, stake: pts })
  // верно — показываем результат и кто забрал; неверно — просто снимаем
  // время и ждём, пока ведущий передаст ход
  await saveMelody(correct ? melodyReveal(m, pts, ans.team_id) : { ...m, deadline: undefined })
}

/** «Не угадали» и «дальше» — одно действие: отметить промах (если ведущий не
 *  отметил его сам) и передать ход второй команде либо закрыть трек. */
export async function passMelody(m: MelodyState, ans?: Answer): Promise<void> {
  if (ans && ans.is_correct == null) {
    await room.patchAnswer(ans.id, { is_correct: false, stake: 0 })
  }
  await saveMelody(melodyPass(m))
}
