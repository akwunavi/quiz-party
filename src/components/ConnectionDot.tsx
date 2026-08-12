// Индикатор связи игрока: точка + баннер «ответ не отправлен, повторяю»
import { useEffect, useState } from 'react'
import { subscribeQueue, type QueueState } from '../lib/answerQueue'

export function ConnectionDot() {
  const [state, setState] = useState<QueueState>({ pending: 0, lastError: false })
  const [online, setOnline] = useState(true)
  useEffect(() => {
    const unsub = subscribeQueue(setState)
    const on = () => setOnline(true), off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { unsub(); window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])
  const trouble = !online || state.lastError
  return (
    <>
      <span title={trouble ? 'нет связи' : 'онлайн'} style={{
        position: 'fixed', top: 10, right: 10, width: 10, height: 10, borderRadius: 5,
        background: trouble ? '#f43f5e' : '#22c55e', zIndex: 50,
      }} />
      {state.pending > 0 && trouble && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, padding: 8,
          background: '#f43f5e', color: '#fff', textAlign: 'center', zIndex: 50,
        }}>Ответ не отправлен — повторяю…</div>
      )}
    </>
  )
}
