import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Team } from '../types/quiz'

export function useTeams(gameId: string | null) {
  const [teams, setTeams] = useState<Team[]>([])
  useEffect(() => {
    if (!gameId) return
    let stopped = false
    async function load() {
      const { data } = await supabase.from('teams').select('*').eq('game_id', gameId)
      if (!stopped && data) setTeams(data as Team[])
    }
    void load()
    const t = setInterval(load, 2000)
    return () => { stopped = true; clearInterval(t) }
  }, [gameId])
  return teams
}

/** Живость команды: полила за последние 10 сек. */
export function isAlive(team: Team): boolean {
  if (!team.last_seen_at) return false
  return Date.now() - new Date(team.last_seen_at).getTime() < 10_000
}
