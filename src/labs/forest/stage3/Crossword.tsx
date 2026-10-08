// ═══ Этап 3 · «Кроссворд» — выбранный ведущим концепт «Созвездие светлячков» (A и B отклонены) ═══
// Сцены: активный кроссворд (идёт слово) и разбор ответов команд (слово за словом, ответы по буквам, ✓/✗,
// переход к следующему слову), плюс итог. Данные и проверка — настоящие (см. cwcommon.tsx).
import type { S1Props } from '../stage1/common'
import { CrosswordC, CWC_NOTE } from './CrosswordC'
export { CW_STATES } from './cwcommon'

export const CW_VARIANTS = [
  { id: 'C', name: 'Созвездие светлячков', note: CWC_NOTE },
]
export function Crossword(p: S1Props) {
  return <CrosswordC {...p} />
}
