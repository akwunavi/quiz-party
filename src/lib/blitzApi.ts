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
