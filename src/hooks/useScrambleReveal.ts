// ═══ «Взлом терминала»: заголовок дешифруется посимвольно (классика) ═══
// Разметка не меняется — меняется только текст внутри существующего <span>,
// поэтому не спорит с glitchRGB (`.neon-title { animation: glitchRGB … }`,
// 15-projector-interactive.css): та анимация крутит text-shadow/transform,
// эта — только содержимое текста.
import { useEffect, useRef, useState } from 'react'
import { scramble } from '../lib/scramble'

const FRAMES = 14
const FRAME_MS = 50 // 14 кадров × 50мс ≈ 700мс — в заявленных 650-750мс

/** @param text текст, который должен «дешифроваться»
 *  @param active включает эффект (classic + не reduced-motion — решает
 *    вызывающая сторона); при false просто возвращает `text` как есть */
export function useScrambleReveal(text: string, active: boolean): string {
  const [display, setDisplay] = useState(text)
  const seedRef = useRef(0)

  useEffect(() => {
    const reduced = typeof matchMedia === 'function'
      && matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!active || reduced) { setDisplay(text); return }

    seedRef.current += 1
    const seed = seedRef.current
    let frame = 0
    setDisplay(scramble(text, 0, seed))
    const id = setInterval(() => {
      frame += 1
      const p = frame / FRAMES
      if (p >= 1) { setDisplay(text); clearInterval(id); return }
      setDisplay(scramble(text, p, seed))
    }, FRAME_MS)
    return () => clearInterval(id)
  }, [text, active])

  return display
}
