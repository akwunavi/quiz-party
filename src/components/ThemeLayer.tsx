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
      {/* Парящие свечи: воск + живое пламя, качающееся от «сквозняка».
          В углах экрана живут номер раунда и счётчик вопросов, поэтому
          крайние свечи опускаем ниже — иначе пламя загораживало цифры. */}
      {Array.from({ length: 9 }, (_, i) => {
        const left = 6 + i * 11
        // Верхняя полоса экрана занята шапкой (номер раунда слева, номер
        // вопроса справа) — свечи туда не ставим вовсе, иначе пламя
        // перекрывает цифры. Середина висит ниже шапки, края — ещё ниже.
        // Свечи держим У КРАЁВ экрана и ниже шапки. Раньше они стояли и
        // в середине верхней трети — ровно там, где рамка вопроса и
        // заголовок раунда, — и визуально налезали на текст, хотя лежат
        // слоем ниже. Центральную полосу 26–74% оставляем пустой.
        // Свечи стоят ТОЛЬКО по краям и вдоль низа — в полосе, где контента
        // не бывает. Раньше они попадали в центральную треть, где живут
        // текст вопроса и плитки вариантов, и оказывались поверх них.
        const bottomRow = i % 3 === 0
        const edge = bottomRow ? 8 + (i % 9) * 10
          : left < 50 ? 2 + (i % 3) * 4 : 92 + (i % 3) * 3
        const top = bottomRow ? 88 + (i % 2) * 4 : 30 + (i % 6) * 9
        return (
        <span key={`c${i}`} className="pt-candle" style={{
          left: `${edge}%`, top: `${top}%`,
          animationDelay: `${(i % 5) * 0.7}s`,
          ['--h' as string]: `${34 + (i % 3) * 10}px`,
        }}>
          <span className="pt-flame" style={{ animationDelay: `${(i % 4) * 0.35}s` }} />
        </span>
      )})}
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
