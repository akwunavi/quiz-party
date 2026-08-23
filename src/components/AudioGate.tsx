// ═══ РАЗБЛОКИРОВКА ЗВУКА НА ПРОЕКТОРЕ ═══
// Браузер не даёт играть звук, пока пользователь не взаимодействовал со
// страницей. Симптом ровно тот, что видел Иван: «пока не перезагрузил
// страницу, ничего не заиграло» — после перезагрузки он кликал по кнопке,
// и разрешение появлялось.
//
// Здесь мы: (1) при первом же клике/нажатии клавиши «прогреваем» звук
// беззвучным воспроизведением, (2) сообщаем экрану, разрешён звук или нет,
// чтобы показать подсказку ведущему.
import { useEffect, useState } from 'react'

let unlocked = false
const listeners = new Set<(v: boolean) => void>()

function markUnlocked() {
  if (unlocked) return
  unlocked = true
  listeners.forEach(fn => fn(true))
}

/** Пробное беззвучное воспроизведение: если прошло — звук разрешён. */
async function probe(): Promise<boolean> {
  try {
    const Ctx = window.AudioContext
      ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    if (ctx.state === 'suspended') await ctx.resume()
    const ok = ctx.state === 'running'
    void ctx.close()
    return ok
  } catch { return false }
}

export function useAudioUnlock() {
  const [ready, setReady] = useState(unlocked)

  useEffect(() => {
    if (unlocked) return
    listeners.add(setReady)

    const onGesture = () => { void probe().then(ok => { if (ok) markUnlocked() }) }
    // любое действие ведущего годится: клик по кнопке, пробел, тап
    window.addEventListener('pointerdown', onGesture)
    window.addEventListener('keydown', onGesture)
    // возможно, звук уже разрешён (страница открыта не впервые)
    void probe().then(ok => { if (ok) markUnlocked() })

    return () => {
      listeners.delete(setReady)
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
    }
  }, [])

  return ready
}

/** Подсказка ведущему, пока звук заблокирован. Исчезает после первого клика. */
export function AudioGate() {
  const ready = useAudioUnlock()
  if (ready) return null
  return (
    <div className="audio-gate" onClick={() => {}}>
      <span>🔇 Звук заблокирован браузером</span>
      <b>кликните по экрану один раз</b>
    </div>
  )
}
