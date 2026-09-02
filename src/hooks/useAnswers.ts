import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Answer } from '../types/quiz'

/** @param intervalMs Период опроса. По умолчанию 2000 — обычным экранам
 *  этого достаточно. Блиц — исключение: там таймер команды продолжает
 *  тикать, ПОКА проектор не заметил присланный ответ (пауза на проверку
 *  ставится в момент, когда HostScreen увидел новую строку в answers, а
 *  не в момент, когда команда её отправила) — на редком опросе секунды
 *  команды сгорали впустую на ожидание, хотя ждать было нечего. BlitzScreen
 *  передаёт интервал короче. */
export function useAnswers(gameId: string | null, roundNumber?: number, intervalMs = 2000) {
  const [answers, setAnswers] = useState<Answer[]>([])
  useEffect(() => {
    if (!gameId) return
    let stopped = false
    async function load() {
      let q = supabase.from('answers').select('*').eq('game_id', gameId!)
      if (roundNumber !== undefined) q = q.eq('round_number', roundNumber)
      const { data } = await q
      if (!stopped && data) setAnswers(data as Answer[])
    }
    void load()
    const t = setInterval(load, intervalMs)
    return () => { stopped = true; clearInterval(t) }
  }, [gameId, roundNumber, intervalMs])
  return answers
}
