import { useEffect, useState } from 'react'
import { room } from './transport'
import { createPollLoop } from './pollLoop'
import type { BlitzState } from './blitzState'

// ═══ ХРАНИЛИЩЕ СОСТОЯНИЯ БЛИЦА ═══
//
// Состояние целиком лежит одной строкой в blitz_state (см. миграцию 0009).
// Тонкий слой: вся логика переходов — в blitzState.ts, здесь только чтение,
// запись и подписка. Так правила остаются проверяемыми тестами, а этот
// файл можно читать глазами.
//
// Опрос, а не realtime: по всему проекту связь держится на поллинге —
// вебсокеты у части гостей не проходят через мобильных операторов.

export async function loadBlitz(
  gameId: string, roundNumber: number,
): Promise<BlitzState | null> {
  return room.readBlitz(gameId, roundNumber)
}

export async function saveBlitz(
  gameId: string, roundNumber: number, state: BlitzState,
): Promise<void> {
  await room.writeBlitz(gameId, roundNumber, state)
}

/** Итоги блица в общий зачёт игры (8.86 — одна функция на оба экрана).
 *
 *  Очки блица живут в blitz_state, а общий подсчёт читает только answers —
 *  поэтому итог кладём готовой строкой `q-blitz`.
 *
 *  ОДНИМ upsert'ом, а не через очередь ответов: очередь читает список из
 *  localStorage и пишет обратно, параллельные вызовы хватают один снимок и
 *  выживает последний — на этом блиц уже терял две команды из трёх (см.
 *  HANDOFF §5). Проектор это починил у себя ещё в 8.60, а в админке
 *  оставалась старая версия на очереди: до 8.86 её было достаточно нажать
 *  «прервать блиц досрочно» (кнопка есть только в админке), чтобы итоги
 *  снова поехали через сломанный путь. Теперь путь один. */
export async function saveBlitzResults(
  gameId: string, roundNumber: number,
  rows: { teamId: string; place: number; score: number }[],
): Promise<void> {
  try {
    await room.upsertAnswers(rows.map(r => ({
      team_id: r.teamId, game_id: gameId, question_ref: 'q-blitz',
      round_number: roundNumber, answer_text: `место ${r.place}`, stake: r.score,
      updated_at: new Date().toISOString(),
    })))
  } catch (err) {
    console.error('блиц: итоги не записались', err)
  }
}

const BLITZ_POLL_MS = 1000
// Бэкофф пропорционален базовой частоте блица (1 сек, а не 2 сек, как у
// остальных экранов) — тот же множитель 2.5×/5×, что у useGameState/
// useTeams/useAnswers (см. HANDOFF, шаг 4).
const BLITZ_BACKOFF_STEPS = [2500, 5000]

/** Подписка на состояние раунда с опросом раз в секунду.
 *  Секунда — компромисс: чаще нет смысла (таймер экраны считают сами по
 *  shownAt), реже — заметна задержка при передаче хода. */
export function useBlitz(gameId: string | null, roundNumber: number) {
  const [state, setState] = useState<BlitzState | null>(null)

  useEffect(() => {
    if (!gameId) return
    const loop = createPollLoop(
      () => loadBlitz(gameId, roundNumber),
      setState,
      { intervalMs: BLITZ_POLL_MS, backoffStepsMs: BLITZ_BACKOFF_STEPS },
    )
    void loop.poll()
    return () => loop.stop()
  }, [gameId, roundNumber])

  return { state, setState }
}
