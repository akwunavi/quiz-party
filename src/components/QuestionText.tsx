// ═══ Текст вопроса: появление «ветром» по словам ═══
// Вынесено из HostScreen.tsx (9.51) — общий узел для проектора и
// предпросмотра в редакторе (см. HANDOFF.md, план объединения предпросмотра).
import { lenClass } from '../lib/media'
import { useFitText } from '../hooks/useFitText'

/** Появление текста «ветром»: по словам с каскадной задержкой. */
export function WindText({ text }: { text: string }) {
  const words = text.split(/(\s+)/)
  let idx = 0
  // Кегль из CSS — это подгон под ширину ЭКРАНА. Дальше текст вписывается в
  // реально доступное место: вопрос на 440 знаков иначе наезжает на шапку,
  // на варианты или на кнопки ведущего — на каждом экране по-своему.
  const fit = useFitText<HTMLParagraphElement>([text])
  return (
    <p ref={fit} className={`q-text${lenClass(text)}`}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return w
        const delay = 0.12 * idx++
        return <span key={i} className="q-word" style={{ animationDelay: `${delay}s` }}>{w}</span>
      })}
    </p>
  )
}
