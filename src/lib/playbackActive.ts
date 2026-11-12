// ═══ «Звук реально идёт» по событиям КОНКРЕТНОЙ операции общего <audio> (SharedPlayback) ═══
// Прототип «Книги» (этап 2): пластинка в «Угадай мелодию» вращается только во время реального воспроизведения — не по
// стадии игры и не по таймеру. playing → идёт; pause/waiting/ended → стоп; отписка (стадия сменилась, h.stop()) → стоп.
// AbortError (операцию вытеснили) — не ошибка: подписки вытесненной операции снимаются, пластинка просто стоит.
import { useCallback, useState } from 'react'
import type { SharedPlayback } from './sharedAudio'

type Subscribable = Pick<SharedPlayback, 'on'>

/** Чистая привязка (без React): подписаться на события операции, вернуть отписку (идемпотентна). */
export function bindPlayback(h: Subscribable, set: (active: boolean) => void): () => void {
  const on = () => set(true)
  const off = () => set(false)
  const offs = [h.on('playing', on), h.on('pause', off), h.on('waiting', off), h.on('ended', off)]
  let done = false
  return () => {
    if (done) return
    done = true
    offs.forEach(f => f())
    set(false)
  }
}

export function usePlaybackActive(): { active: boolean; bind: (h: Subscribable) => () => void } {
  const [active, setActive] = useState(false)
  const bind = useCallback((h: Subscribable) => bindPlayback(h, setActive), [])
  return { active, bind }
}
