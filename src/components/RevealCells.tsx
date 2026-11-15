// ═══ «3 попытки»: буквенные ячейки слова — один компонент для вопроса (фазы 1–3), разбора и ручной раскладки ═══
// Закрытые «?», открытые подсказкой и (в разборе) все буквы. Кегль подгоняется замером под ширину/высоту родителя (useFitText): длинное слово или фраза
// из нескольких слов не вылезает за свою зону ни на 1280, ни на 3840 — ячейки заданы в em от кегля `.rv-word`, подгон масштабирует их целиком.
import { useFitText } from '../hooks/useFitText'
import { revealGroups, revealLetterOpen } from '../lib/reveal'

export function RevealCells({ word, open, phase }: { word: string; open: number[] | undefined; phase: 1 | 2 | 3 | 'review' }) {
  // минимум ниже обычных 45%: фраза в 20+ букв на левой странице «Книги» иначе обрезалась бы
  const fit = useFitText<HTMLDivElement>([word, phase], { minScale: 0.25 })
  let flat = -1
  return (
    <div className="rv-word-wrap">
      <div className="rv-word" ref={fit}>
        {revealGroups(word).map((g, gi) => (
          <span className="rv-group" key={gi}>
            {g.map((ch, k) => {
              flat++
              const isOpen = revealLetterOpen(flat, open, phase)
              return <span key={k} className={`rv-cell${isOpen ? ' open' : ''}`}>{isOpen ? ch : '?'}</span>
            })}
          </span>
        ))}
      </div>
    </div>
  )
}
