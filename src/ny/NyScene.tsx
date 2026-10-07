// ═══ Боевая сцена новогодних тем: декорации ПОД игровой вёрсткой ═══
// Сцена — отдельные слои (position: fixed) до и после .host-screen; сама игровая
// вёрстка остаётся обычным DOM и ложится в «страницу книги» / «экран кинескопа»
// отступами из CSS (41/43-файлы тем). Снег и ели — canvas из ny/engine.
import { useEffect, useState } from 'react'
import { Stage } from './engine/stage'
import { BookFx, BookWorld } from './book/BookScene'
import { HomeBackdrop, HomeFx } from './home/HomeScene'
import { nyDensity, type NyThemeKey } from './density'
import { NY_SLOT_BG, NY_SLOT_FX } from './NySlot'

/** Системная настройка «уменьшить движение»: сцена встаёт в конечный кадр. */
function useReducedMotion() {
  const q = '(prefers-reduced-motion: reduce)'
  const [v, setV] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(q).matches)
  useEffect(() => {
    if (typeof matchMedia === 'undefined') return
    const m = matchMedia(q)
    const on = () => setV(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return v
}

export function NyBackdrop({ theme, phase, plain }: { theme: NyThemeKey; phase?: string; plain?: boolean }) {
  const reduced = useReducedMotion()
  const density = nyDensity(theme, phase, plain)
  return (
    <div className="ny-layer ny-layer-bg" data-ny-density={density}>
      <Stage fit="cover" paused={false} reduced={reduced}>
        {theme === 'ny_book'
          ? <BookWorld density={density} scene={phase ?? 'lobby'}><div id={NY_SLOT_BG} className="ny-slot" /></BookWorld>
          : <HomeBackdrop density={density}><div id={NY_SLOT_BG} className="ny-slot" /></HomeBackdrop>}
      </Stage>
    </div>
  )
}

/** Слой поверх игры: у Тёплого дома — «эфир» (развёртка, виньетка, блик стекла), у обоих —
 *  слот для QR (выше затемнения окна составов). */
export function NyFx({ theme, phase, plain }: { theme: NyThemeKey; phase?: string; plain?: boolean }) {
  const reduced = useReducedMotion()
  const density = nyDensity(theme, phase, plain)
  return (
    <div className="ny-layer ny-layer-fx">
      <Stage fit="cover" paused={false} reduced={reduced}>
        {theme === 'ny_home'
          ? <HomeFx density={density}><div id={NY_SLOT_FX} className="ny-slot" /></HomeFx>
          : <BookFx><div id={NY_SLOT_FX} className="ny-slot" /></BookFx>}
      </Stage>
    </div>
  )
}
