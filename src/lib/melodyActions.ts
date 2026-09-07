// ═══ «Угадай мелодию»: запись состояния ═══
// Чистые переходы — в lib/melody.ts (их гоняют тесты); здесь только запись,
// одна на проектор и на пульт ведущего. Разделение то же, что у блица:
// blitzState.ts (чистый автомат) + blitzApi.ts (запись).
import { getRoomId } from './room'
import { supabase } from './supabase'
import { melodyPass, melodyPoints, melodyReveal } from './melody'
import type { Answer, MelodyState } from '../types/quiz'

/** Единственная точка записи состояния мелодии. */
export async function saveMelody(next: MelodyState) {
  await supabase.from('game_sessions').update({ melody: next }).eq('id', getRoomId())
}

/** Вердикт по ответу на трек. Один вызов на проектор и на пульт ведущего:
 *  очки считает melodyPoints, стадию — melodyReveal, копий формулы нет. */
export async function gradeMelody(m: MelodyState, ans: Answer, correct: boolean,
  bidSec: number): Promise<void> {
  const pts = correct ? melodyPoints(bidSec, (m.turn ?? 0) === 0) : 0
  await supabase.from('answers').update({ is_correct: correct, stake: pts }).eq('id', ans.id)
  // верно — показываем результат и кто забрал; неверно — просто снимаем
  // время и ждём, пока ведущий передаст ход
  await saveMelody(correct ? melodyReveal(m, pts, ans.team_id) : { ...m, deadline: undefined })
}

/** «Не угадали» и «дальше» — одно действие: отметить промах (если ведущий не
 *  отметил его сам) и передать ход второй команде либо закрыть трек. */
export async function passMelody(m: MelodyState, ans?: Answer): Promise<void> {
  if (ans && ans.is_correct == null) {
    await supabase.from('answers').update({ is_correct: false, stake: 0 }).eq('id', ans.id)
  }
  await saveMelody(melodyPass(m))
}
