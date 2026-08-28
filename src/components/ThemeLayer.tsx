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
      {/* Парящие свечи вдоль ЛЕВОГО и ПРАВОГО краёв — там, где контента
          не бывает. Верхнюю полосу (шапка с номером раунда и таймером) и
          центральную колонку (текст вопроса, плитки) не занимаем вовсе:
          именно там свечи налезали на текст.
          Слой сцены лежит ниже контента, но зрительно пламя всё равно
          мешало читать, поэтому вопрос решается расстановкой, а не слоями. */}
      {Array.from({ length: 10 }, (_, i) => {
        const right = i % 2 === 1
        // Коридоры узкие: 1…13% слева и 87…99% справа. Шире нельзя —
        // на 1600px текст вопроса начинается примерно с 18% ширины, и
        // свеча на 20% уже касалась буквы.
        const lane = 1 + Math.floor(i / 2) * 3
        const left = right ? 100 - lane - 3 : lane
        const top = 22 + ((i * 13) % 60)
        return (
        <span key={`c${i}`} className="pt-candle" style={{
          left: `${left}%`, top: `${top}%`,
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
