// ═══ Мини-подсказка при ошибочном действии ═══
//
// Зачем: серая кнопка «сохранить» ничего не объясняет. Человек жмёт её,
// ничего не происходит, и он остаётся один на один с догадкой — так и вышло
// с новым пакетом: поле названия сверху, кнопка снизу, связь между ними
// видна только тому, кто её и писал.
//
// Правило подсказки: она ОБЪЯСНЯЕТ, а не запрещает. Кнопка остаётся живой,
// клик по ней говорит, чего не хватает, и ставит курсор в нужное поле.
// Ничего не блокируется и никаких модалок с «ОК» — на игре не до них.
import { useCallback, useEffect, useRef, useState } from 'react'

/** Текст подсказки + функция показа. Сам гаснет через несколько секунд. */
export function useHint(ms = 6000) {
  const [text, setText] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const show = useCallback((message: string, focus?: HTMLElement | null) => {
    setText(message)
    focus?.focus()
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setText(null), ms)
  }, [ms])

  // таймер живёт дольше компонента, если экран закрыли раньше срока
  useEffect(() => () => clearTimeout(timer.current), [])

  return { text, show, clear: () => { clearTimeout(timer.current); setText(null) } }
}

/** Сама подсказка. Пустой текст — ничего не рисуем. */
export function Hint({ text }: { text: string | null }) {
  if (!text) return null
  // role="status" — экранный диктор прочитает появившийся текст
  return <div className="ui-hint" role="status">{text}</div>
}
