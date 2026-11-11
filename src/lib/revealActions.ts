// ═══ «3 попытки»: запись состояния ═══
// Чистые переходы — в lib/reveal.ts; здесь только запись, общая для
// проектора и пульта ведущего (тот же приём, что у мелодии — melodyActions.ts).
//
// КРИТИЧНО: пишем ВЕСЬ мешок `melody`, никогда только `{ rv }` — в облачном
// транспорте нет merge на уровне jsonb-ключей (только в local-server/server.mjs),
// запись одного rv стёрла бы played/jp/race, если бы они были в том же
// объекте (см. CLAUDE.md/HANDOFF.md про мешок механик).
import { updateMelodyBag } from './sessionBag'
import type { MelodyState, RevealState } from '../types/quiz'

// 10.64 (аудит В7): запись идёт защищённо (CAS, lib/sessionBag.ts) на СВЕЖИЙ мешок — устаревший снимок экрана больше не стирает чужие ключи (race/jp/played…).
// Параметр `bag` оставлен для совместимости вызовов: значение берётся из базы, а не из снимка. Повтор того же состояния ничего не пишет.
export async function saveReveal(_bag: MelodyState, next: RevealState) {
  await updateMelodyBag(null, cur => (JSON.stringify(cur.rv ?? null) === JSON.stringify(next) ? null : { ...cur, rv: next }))
}

export async function clearReveal(_bag: MelodyState) {
  await updateMelodyBag(null, cur => (cur.rv === undefined ? null : { ...cur, rv: undefined }))
}
