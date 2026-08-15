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
      {theme === 'potter' && isProjector && <PotterScene />}
      {children}
    </div>
  )
}



/** «Волшебная школа»: летающий снитч, искры палочки, свечи под потолком. */
function PotterScene() {
  return (
    <div className="pt-scene" aria-hidden>
      {/* парящие свечи */}
      {Array.from({ length: 9 }, (_, i) => (
        <span key={`c${i}`} className="pt-candle" style={{
          left: `${6 + i * 11}%`, top: `${4 + (i % 3) * 3}%`,
          animationDelay: `${(i % 5) * 0.7}s`,
        }}>🕯️</span>
      ))}
      {/* искры из палочки в углах */}
      {Array.from({ length: 14 }, (_, i) => (
        <span key={`s${i}`} className="pt-spark" style={{
          left: `${(i * 37) % 100}%`, top: `${55 + ((i * 13) % 40)}%`,
          animationDelay: `${(i % 7) * 0.5}s`,
        }} />
      ))}
      {/* золотой снитч с крыльями — летает по экрану */}
      <div className="pt-snitch">
        <span className="pt-wing l" />
        <span className="pt-ball" />
        <span className="pt-wing r" />
      </div>
    </div>
  )
}
