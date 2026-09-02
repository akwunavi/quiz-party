import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

/** question_ref → shown_at, за всю игру (см. миграцию 0009).
 *  Только для выгрузки CSV после игры — опрос редкий, живого табло на
 *  этом не строится. Таблицы может не быть, если миграция не прогнана:
 *  тогда просто остаётся пустая карта, а не падает вся выгрузка. */
export function useQuestionShown(gameId: string | null, intervalMs = 5000) {
  const [shown, setShown] = useState<Map<string, string>>(new Map())
  useEffect(() => {
    if (!gameId) return
    let stopped = false
    async function load() {
      const { data, error } = await supabase.from('question_shown')
        .select('question_ref, shown_at').eq('game_id', gameId!)
      if (error) return  // таблицы ещё нет — молча остаёмся с пустой картой
      if (!stopped && data) {
        setShown(new Map(data.map(r => [r.question_ref as string, r.shown_at as string])))
      }
    }
    void load()
    const t = setInterval(load, intervalMs)
    return () => { stopped = true; clearInterval(t) }
  }, [gameId, intervalMs])
  return shown
}
