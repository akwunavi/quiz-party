import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Answer } from '../types/quiz'

export function useAnswers(gameId: string | null, roundNumber?: number) {
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
    const t = setInterval(load, 2000)
    return () => { stopped = true; clearInterval(t) }
  }, [gameId, roundNumber])
  return answers
}
