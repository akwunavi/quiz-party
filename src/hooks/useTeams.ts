import { useEffect, useState } from 'react'
import { room } from '../lib/transport'
import { createPollLoop } from '../lib/pollLoop'
import type { Team } from '../types/quiz'

const POLL_INTERVAL = 2000
const BACKOFF_STEPS = [5000, 10000]

export function useTeams(gameId: string | null) {
  const [teams, setTeams] = useState<Team[]>([])
  useEffect(() => {
    if (!gameId) return
    const loop = createPollLoop(
      () => room.listTeams(gameId),
      setTeams,
      { intervalMs: POLL_INTERVAL, backoffStepsMs: BACKOFF_STEPS },
    )
    void loop.poll()
    return () => loop.stop()
  }, [gameId])
  return teams
}

/** Живость команды: полила за последние 10 сек. */
export function isAlive(team: Team): boolean {
  if (!team.last_seen_at) return false
  return Date.now() - new Date(team.last_seen_at).getTime() < 10_000
}
