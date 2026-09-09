import { useEffect, useState } from 'react'
import { room } from '../lib/transport'
import { createPollLoop } from '../lib/pollLoop'
import type { Answer } from '../types/quiz'

const BACKOFF_STEPS = [5000, 10000]

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
    const loop = createPollLoop(
      () => room.listAnswers(gameId, roundNumber),
      setAnswers,
      { intervalMs, backoffStepsMs: BACKOFF_STEPS },
    )
    void loop.poll()
    return () => loop.stop()
  }, [gameId, roundNumber, intervalMs])
  return answers
}
