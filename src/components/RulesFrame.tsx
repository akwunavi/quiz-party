// ═══ Рамка правил раунда ═══
// Правила пишет ведущий — длина любая. Раньше пункты ужимались flex-ом внутри рамки с max-height и обрезались
// посередине слова (UI-01: «Тёплый дом»). Теперь порядок такой: рамка растёт по содержимому до своего предела
// (`max-height` в 23-answers.css), потом `useFitText` (опция `items`) уменьшает кегль пунктов на общий масштаб
// до читаемого предела, и только затем работает прежнее ограничение по числу строк (`line-clamp`).
import { useFitText } from '../hooks/useFitText'

export function RulesFrame({ rules, delay }: { rules: string[]; delay: (i: number) => number }) {
  const body = useFitText<HTMLDivElement>([rules.join('|')], { items: '.rule-item', minScale: 0.5 })
  return (
    <div className="rules-frame" data-count={rules.length}>
      <div className="rules-frame-label">ПРАВИЛА</div>
      <div className="rules-fit">
        <div className="rules-body" ref={body}>
          {rules.map((r, i) => (
            <div key={i} className="rule-item" style={{ animationDelay: `${delay(i)}s` }}>
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>{r}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
