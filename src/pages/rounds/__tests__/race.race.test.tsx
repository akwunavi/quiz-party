// ═══ RaceRound: гонка начисления очков на финише (F3, HANDOFF.md §3bu) ═══
// Сама формула упаковки строк для upsertAnswers (одна пачка, а не цикл
// последовательных patchAnswer) видна прямо в RaceRound.tsx — tsc уже
// подтверждает форму AnswerUpsert[]. Полноценный regression-тест «сетевой
// сбой не роняет весь цикл молча» требует того же render-стенда, что и
// melody.race.test.tsx (см. комментарий там) — не построен в этой сессии.
import { describe, it } from 'vitest'

describe('RaceRound: гонки, требующие render-стенда (не построен в этой сессии)', () => {
  it.todo('F3: сбой сети на upsertAnswers ретраится (до 3 попыток), а не роняет цикл молча и не оставляет stage не записанным')
})
