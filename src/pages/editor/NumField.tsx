// ═══ ЧИСЛОВОЕ ПОЛЕ С ОТЛОЖЕННЫМ СОХРАНЕНИЕМ ═══
// Обычный <input type="number"> в редакторе вёл себя плохо: каждое нажатие
// стрелки и каждая цифра улетали на сервер, поле перерисовывалось ответом,
// и набрать «120» с клавиатуры было почти невозможно — значение прыгало.
//
// Здесь: пока поле в фокусе, значение живёт локально и на сервер НЕ уходит.
// Сохраняем при потере фокуса или по Enter. Значение из базы подхватывается
// только когда поле не редактируется — иначе оно затирало бы набранное.
import { useEffect, useRef, useState } from 'react'

export function NumField({ value, onCommit, min, max, disabled, suffix, width }: {
  value: number
  onCommit: (v: number) => void
  min?: number
  max?: number
  disabled?: boolean
  suffix?: string
  width?: number
}) {
  const [draft, setDraft] = useState(String(value))
  const editing = useRef(false)

  useEffect(() => {
    if (!editing.current) setDraft(String(value))
  }, [value])

  const commit = () => {
    editing.current = false
    const raw = draft.trim().replace(',', '.')
    let n = Number(raw)
    if (raw === '' || Number.isNaN(n)) { setDraft(String(value)); return }
    if (min != null) n = Math.max(min, n)
    if (max != null) n = Math.min(max, n)
    n = Math.round(n)
    setDraft(String(n))
    if (n !== value) onCommit(n)
  }

  return (
    <span className="num-field">
      <input
        type="text"
        inputMode="numeric"
        value={draft}
        disabled={disabled}
        style={width ? { width } : undefined}
        onFocus={() => { editing.current = true }}
        onChange={e => { editing.current = true; setDraft(e.target.value) }}
        onBlur={commit}
        onKeyDown={e => {
          if (e.key === 'Enter') { e.currentTarget.blur(); return }
          if (e.key === 'Escape') { editing.current = false; setDraft(String(value)) }
          // стрелки всё равно работают — но шагом, а не дёргая сервер
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault()
            const step = e.shiftKey ? 10 : 1
            const cur = Number(draft) || value
            const next = e.key === 'ArrowUp' ? cur + step : cur - step
            editing.current = true
            setDraft(String(next))
          }
        }} />
      {suffix && <span className="num-suffix">{suffix}</span>}
    </span>
  )
}
