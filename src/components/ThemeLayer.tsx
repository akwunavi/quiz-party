// ═══ Слой темы: обёртка с CSS-классом + снег для «Нового года» ═══
// Снег — только на проекторе (isProjector), телефоны получают лишь палитру (ТЗ 8б).
import type { ThemeKey } from '../types/quiz'
import { NewYearScene } from './NewYearScene'

export function ThemeLayer({ theme, isProjector, children }: {
  theme: ThemeKey; isProjector?: boolean; children: React.ReactNode
}) {
  return (
    <div className={`theme-${theme}`}>
      {theme === 'new_year' && isProjector && <NewYearScene />}
      {children}
    </div>
  )
}

