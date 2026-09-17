// ═══ «3 попытки»: запись состояния ═══
// Чистые переходы — в lib/reveal.ts; здесь только запись, общая для
// проектора и пульта ведущего (тот же приём, что у мелодии — melodyActions.ts).
//
// КРИТИЧНО: пишем ВЕСЬ мешок `melody`, никогда только `{ rv }` — в облачном
// транспорте нет merge на уровне jsonb-ключей (только в local-server/server.mjs),
// запись одного rv стёрла бы played/jp/race, если бы они были в том же
// объекте (см. CLAUDE.md/HANDOFF.md про мешок механик).
import { getRoomId } from './room'
import { room } from './transport'
import type { MelodyState, RevealState } from '../types/quiz'

export async function saveReveal(bag: MelodyState, next: RevealState) {
  await room.patchSession(getRoomId(), { melody: { ...bag, rv: next } })
}

export async function clearReveal(bag: MelodyState) {
  await room.patchSession(getRoomId(), { melody: { ...bag, rv: undefined } })
}
