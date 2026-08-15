// ═══ Слой темы: обёртка с CSS-классом + снег для «Нового года» ═══
// Снег — только на проекторе (isProjector), телефоны получают лишь палитру (ТЗ 8б).
import type { ThemeKey } from '../types/quiz'
import { NewYearScene } from './NewYearScene'

export function ThemeLayer({ theme, isProjector, children }: {
  theme: ThemeKey; isProjector?: boolean; children: React.ReactNode
}) {
  return (
    <div className={`theme-${theme}`}>
      {theme === 'classic' && isProjector && <CyberScene />}
      {theme === 'new_year' && isProjector && <>
        <NewYearScene />
        {/* сани Деда Мороза: редкий пролёт по небу */}
        <div className="ny-sleigh" aria-hidden>🦌🦌🛷🎅</div>
      </>}
      {theme === 'potter' && isProjector && <PotterScene />}
      {children}
    </div>
  )
}



/** «Волшебная школа»: летающий снитч, искры палочки, свечи под потолком. */
function PotterScene() {
  return (
    <div className="pt-scene" aria-hidden>
      {/* парящие свечи: воск + живое пламя, качающееся от «сквозняка» */}
      {Array.from({ length: 9 }, (_, i) => (
        <span key={`c${i}`} className="pt-candle" style={{
          left: `${6 + i * 11}%`, top: `${4 + (i % 3) * 3.4}%`,
          animationDelay: `${(i % 5) * 0.7}s`,
          ['--h' as string]: `${34 + (i % 3) * 10}px`,
        }}>
          <span className="pt-flame" style={{ animationDelay: `${(i % 4) * 0.35}s` }} />
        </span>
      ))}
      {/* сова с письмом: редкий пролёт через экран */}
      <div className="pt-owl">🦉<span className="pt-owl-letter">✉️</span></div>
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


/** Киберпанк: дрон-светлячок патрулирует экран, оставляя неоновый след. */
function CyberScene() {
  return (
    <div className="cb-scene" aria-hidden>
      <div className="cb-drone"><span className="cb-trail" /><span className="cb-dot" /></div>
    </div>
  )
}
