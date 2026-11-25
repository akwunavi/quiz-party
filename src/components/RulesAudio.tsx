import { useEffect, useRef, useState } from 'react'
import { voiceSrc } from '../lib/voicePreload'
import { watchStalls } from '../lib/audioStall'

/** Озвучка правил раунда (заставка раунда). Играет из памяти, если озвучка
 *  уже скачана (`voicePreload`), иначе — потоком, как раньше. Адрес берётся
 *  ОДИН раз при показе: если бы он менялся на лету (скачалось посреди
 *  проигрывания), элемент перезапустил бы звук с начала. */
export function RulesAudio({ path }: { path: string }) {
  const [src] = useState(() => voiceSrc(path))
  const ref = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    const el = ref.current
    return el ? watchStalls(el, 'правила раунда') : undefined
  }, [])
  return <audio ref={ref} autoPlay src={src} />
}
