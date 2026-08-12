import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { GameState } from '../types/quiz'

const POLL_INTERVAL = 2000 // мс — проверенный интервал; Realtime не используем (RKN)

export function useGameState() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let stopped = false
    async function load() {
      const { data } = await supabase.from('game_state').select('*').eq('id', 1).single()
      if (!stopped && data) {
        setGameState(data as GameState)
        setLoading(false)
      }
    }
    void load()
    const t = setInterval(load, POLL_INTERVAL)
    return () => { stopped = true; clearInterval(t) }
  }, [])

  return { gameState, loading }
}
