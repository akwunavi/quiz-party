// ═══ Этап 3 · «Кроссворд» — три НОВЫХ концепта (прежние три отклонены) ═══
// В каждом две обязательные сцены: активный кроссворд (идёт слово) и разбор ответов команд (слово за словом,
// ответы по буквам, ✓/✗, переход к следующему слову), плюс итог. Данные и проверка — настоящие (см. cwcommon.tsx).
import type { S1Props } from '../stage1/common'
import { CrosswordA, CWA_NOTE } from './CrosswordA'
import { CrosswordB, CWB_NOTE } from './CrosswordB'
import { CrosswordC, CWC_NOTE } from './CrosswordC'
export { CW_STATES } from './cwcommon'

export const CW_VARIANTS = [
  { id: 'A', name: 'A · Фонарные гирлянды', note: CWA_NOTE },
  { id: 'B', name: 'B · Живое дерево', note: CWB_NOTE },
  { id: 'C', name: 'C · Созвездие светлячков', note: CWC_NOTE },
]
export function Crossword(p: S1Props) {
  return p.variant === 'B' ? <CrosswordB {...p} /> : p.variant === 'C' ? <CrosswordC {...p} /> : <CrosswordA {...p} />
}
