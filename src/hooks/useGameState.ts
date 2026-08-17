import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { getRoomId } from '../lib/room'
import type { GameState } from '../types/quiz'

const POLL_INTERVAL = 2000 // мс — проверенный интервал; Realtime не используем (RKN)

/** Состояние ИГРЫ ТЕКУЩЕЙ КОМНАТЫ (?room= в адресе). Без комнаты — null. */
export function useGameState() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)
  // roomId живёт в адресе; клик «выбрать комнату» меняет адрес БЕЗ перезагрузки,
  // поэтому слушаем hashchange — иначе React не узнаёт о смене комнаты
  const [roomId, setRoomId] = useState<string | null>(getRoomId())
  useEffect(() => {
    const onHash = () => { setLoading(true); setRoomId(getRoomId()) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (!roomId) { setGameState(null); setLoading(false); return }
    let stopped = false
    async function load() {
      const { data } = await supabase.from('game_sessions').select('*').eq('id', roomId).single()
      if (!stopped) {
        setGameState((data as GameState) ?? null)
        setLoading(false)
      }
    }
    void load()
    const t = setInterval(load, POLL_INTERVAL)
    return () => { stopped = true; clearInterval(t) }
  }, [roomId])

  return { gameState, loading, roomId }
}
