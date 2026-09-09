import { useEffect, useState } from 'react'
import { room } from '../lib/transport'
import { getRoomId } from '../lib/room'
import { createPollLoop } from '../lib/pollLoop'
import type { GameState } from '../types/quiz'

const POLL_INTERVAL = 2000 // мс — проверенный интервал; Realtime не используем (RKN)
// Бэкофф при повторных неудачах опроса: офлайн-вкладка не должна копить
// висящие запросы поверх друг друга каждые 2 сек (см. HANDOFF, шаг 4).
const BACKOFF_STEPS = [5000, 10000]

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
    const loop = createPollLoop(
      () => room.readSession(roomId),
      data => { setGameState(data); setLoading(false) },
      { intervalMs: POLL_INTERVAL, backoffStepsMs: BACKOFF_STEPS },
    )
    void loop.poll()
    return () => loop.stop()
  }, [roomId])

  return { gameState, loading, roomId }
}
