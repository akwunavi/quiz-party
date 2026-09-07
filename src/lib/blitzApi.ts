import { useEffect, useState } from 'react'
import { supabase } from './supabase'
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
  const { data } = await supabase.from('blitz_state')
    .select('state').eq('game_id', gameId).eq('round_number', roundNumber)
    .maybeSingle()
  const st = (data as { state?: BlitzState } | null)?.state
  return st && Array.isArray(st.order) ? st : null
}

export async function saveBlitz(
  gameId: string, roundNumber: number, state: BlitzState,
): Promise<void> {
  const { error } = await supabase.from('blitz_state').upsert({
    game_id: gameId, round_number: roundNumber,
    state, updated_at: new Date().toISOString(),
  }, { onConflict: 'game_id,round_number' })
  if (error) throw error
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
  const { error } = await supabase.from('answers').upsert(
    rows.map(r => ({
      team_id: r.teamId, game_id: gameId, question_ref: 'q-blitz',
      round_number: roundNumber, answer_text: `место ${r.place}`, stake: r.score,
      updated_at: new Date().toISOString(),
    })),
    { onConflict: 'team_id,question_ref' })
  if (error) console.error('блиц: итоги не записались', error)
}

/** Подписка на состояние раунда с опросом раз в секунду.
 *  Секунда — компромисс: чаще нет смысла (таймер экраны считают сами по
 *  shownAt), реже — заметна задержка при передаче хода. */
export function useBlitz(gameId: string | null, roundNumber: number) {
  const [state, setState] = useState<BlitzState | null>(null)

  useEffect(() => {
    if (!gameId) return
    let alive = true
    const tick = async () => {
      try {
        const s = await loadBlitz(gameId, roundNumber)
        if (alive) setState(s)
      } catch { /* связь моргнула — покажем прежнее состояние */ }
    }
    void tick()
    const t = setInterval(tick, 1000)
    return () => { alive = false; clearInterval(t) }
  }, [gameId, roundNumber])

  return { state, setState }
}
