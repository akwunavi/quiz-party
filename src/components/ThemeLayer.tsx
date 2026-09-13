// ═══ Слой темы: обёртка с CSS-классом + снег для «Нового года» ═══
// Снег — только на проекторе (isProjector), телефоны получают лишь палитру (ТЗ 8б).
import type { ThemeKey } from '../types/quiz'
import { NewYearScene } from './NewYearScene'

export function ThemeLayer({ theme, isProjector, phase, children }: {
  theme: ThemeKey; isProjector?: boolean
  /** Фаза игры (gameState.phase) — управляет ТОЛЬКО плотностью сцены
   *  через [data-phase] на корне .mg-scene (34-magic-environment.css),
   *  раскладку экранов не трогает. */
  phase?: string
  children: React.ReactNode
}) {
  return (
    <div className={`theme-${theme}`}>
      {theme === 'classic' && isProjector && <CyberScene />}
      {theme === 'new_year' && isProjector && <>
        <NewYearScene />
        {/* сани Деда Мороза: редкий пролёт по небу */}
        <div className="ny-sleigh" aria-hidden>🦌🦌🛷🎅</div>
      </>}
      {theme === 'potter' && isProjector && <MagicScene phase={phase} />}
      {children}
    </div>
  )
}



/** Magic: «Хрустальный шар» + «Блуждающий огонёк» — пылинки в свете,
 *  редкие вспышки дальней магии, два еле заметных вращающихся кольца на
 *  заднем плане и один блуждающий огонёк, лениво облетающий экран.
 *  Никакой франшизной символики: только абстрактный «магический» декор. */
function MagicScene({ phase }: { phase?: string }) {
  return (
    <div className="mg-scene" data-phase={phase} aria-hidden>
      {/* Пылинки в узких коридорах вдоль краёв — та же причина, что была у
          свечей: центральная колонка держит текст вопроса и плитки, там
          декор мешает читать даже за слоем ниже контента. */}
      {Array.from({ length: 16 }, (_, i) => {
        const right = i % 2 === 1
        const lane = 1 + Math.floor(i / 2) * 3
        const left = right ? 100 - lane - 3 : lane
        const top = 14 + ((i * 11) % 74)
        return (
          <span key={`d${i}`} className="mg-dust" style={{
            left: `${left}%`, top: `${top}%`,
            animationDelay: `${(i % 6) * 0.6}s`,
            animationDuration: `${5 + (i % 4)}s`,
          }} />
        )
      })}
      {/* Редкие дальние вспышки — «эхо» магии где-то за кадром */}
      {Array.from({ length: 4 }, (_, i) => (
        <span key={`f${i}`} className="mg-flare" style={{
          left: `${12 + i * 26}%`, top: `${18 + ((i * 23) % 60)}%`,
          animationDelay: `${i * 2.3}s`,
        }} />
      ))}
      {/* Два еле заметных магических кольца в противоположных углах,
          вращаются в разные стороны — чистая атмосфера, не таймер. */}
      <span className="mg-ring mg-ring--a" />
      <span className="mg-ring mg-ring--b" />
      {/* Блуждающий огонёк: единственный, лениво облетает экран. */}
      <div className="mg-wisp">
        <span className="mw-wing l" />
        <span className="mw-core" />
        <span className="mw-wing r" />
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
