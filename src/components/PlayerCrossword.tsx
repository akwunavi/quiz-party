// ═══ Кроссворд на телефоне игрока: адаптивная, увеличиваемая, «приклеенная» сетка ═══
// Что чинит (HANDOFF §3ex): размер клетки раньше считался один раз от innerWidth (потолок 26 px, без пересчёта
// при повороте/клавиатуре), а сетка лежала в потоке страницы — клавиатура уводила страницу к полю ввода, и сетка
// уезжала за верх экрана. Теперь: клетка вписывается в измеренную область, панель `position: sticky`, высота
// считается от visualViewport (клавиатура), зум щипком/двойным тапом/кнопками, активное слово подкручивается в видимую зону.
// Вся математика — в `lib/crosswordFit.ts` (без DOM, под тестами).
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CrosswordView } from './CrosswordView'
import type { CrosswordGrid, CrosswordWordPlacement } from '../types/quiz'
import {
  clampZoom, doubleTapZoom, fitCellSize, isKeyboardOpen, panelAreaHeight,
  pinchZoom, revealAxis, span, wordRect, zoomScroll,
} from '../lib/crosswordFit'

function visibleHeight(): number {
  return Math.round(window.visualViewport?.height ?? window.innerHeight)
}

/** Видимая высота окна (с учётом клавиатуры) и «спокойная» (без неё — по ней считается базовая клетка, чтобы сетка не прыгала). */
function useViewportHeights() {
  const [vis, setVis] = useState(visibleHeight)
  const stable = useRef({ w: window.innerWidth, h: visibleHeight() })
  useEffect(() => {
    const update = () => {
      const h = visibleHeight()
      const w = window.innerWidth
      // поворот экрана — «спокойная» высота начинается заново; иначе только растёт
      if (Math.abs(w - stable.current.w) > 40) stable.current = { w, h }
      else if (h > stable.current.h) stable.current.h = h
      setVis(h)
    }
    update()
    const vv = window.visualViewport
    vv?.addEventListener('resize', update)
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      vv?.removeEventListener('resize', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])
  return { vis, stableH: Math.max(stable.current.h, vis) }
}

export function PlayerCrossword({ grid, letters, current, onPickCell }: {
  grid: CrosswordGrid
  letters?: Map<string, string>
  current?: CrosswordWordPlacement
  onPickCell?: (r: number, c: number) => void
}) {
  const viewRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const [areaW, setAreaW] = useState(() => Math.max(200, Math.min(window.innerWidth, 760) - 16))
  const [zoom, setZoom] = useState(1)
  const pending = useRef<{ left: number; top: number } | null>(null)
  const { vis, stableH } = useViewportHeights()

  // ширина области — измеряем (поворот, планшет, рамка темы); без ResizeObserver — по окну
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const measure = () => {
      const cs = getComputedStyle(el)
      const w = el.clientWidth - parseFloat(cs.paddingLeft || '0') - parseFloat(cs.paddingRight || '0')
      if (w > 0) setAreaW(Math.floor(w))
    }
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const keyboard = isKeyboardOpen(vis, stableH)
  const base = fitCellSize({ areaW, areaH: panelAreaHeight(stableH, false), cols: grid.cols, rows: grid.rows })
  const cell = Math.round(base * zoom)
  const contentW = span(grid.cols, cell), contentH = span(grid.rows, cell)
  const viewH = Math.min(contentH, panelAreaHeight(vis, keyboard))
  const font = Math.max(9, Math.round(cell * 0.56))

  // зум: точка под пальцем (focus) остаётся на месте; прокрутка применяется после перерисовки
  const applyZoom = useCallback((next: number, fx?: number, fy?: number) => {
    const view = viewRef.current
    const z = clampZoom(next)
    if (view && z !== zoom) {
      const newCell = Math.round(base * z)
      const focusX = fx ?? view.clientWidth / 2, focusY = fy ?? view.clientHeight / 2
      pending.current = {
        left: zoomScroll({ scroll: view.scrollLeft, focus: focusX, oldContent: contentW, newContent: span(grid.cols, newCell), view: view.clientWidth }),
        top: zoomScroll({ scroll: view.scrollTop, focus: focusY, oldContent: contentH, newContent: span(grid.rows, newCell), view: view.clientHeight }),
      }
    }
    setZoom(z)
  }, [base, zoom, contentW, contentH, grid.cols, grid.rows])
  const zoomRef = useRef({ zoom, applyZoom })
  zoomRef.current = { zoom, applyZoom }

  useLayoutEffect(() => {
    const view = viewRef.current
    if (pending.current && view) {
      view.scrollLeft = pending.current.left
      view.scrollTop = pending.current.top
      pending.current = null
    }
  }, [zoom])

  // щипок двумя пальцами и двойной тап (родной щипок страницы в области сетки выключен touch-action)
  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    let pinch: { dist: number; zoom: number } | null = null
    let lastTap = { t: 0, x: 0, y: 0 }
    const dist = (t: TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY)
    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 2) pinch = { dist: dist(e.touches), zoom: zoomRef.current.zoom }
    }
    const onMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || !pinch) return
      e.preventDefault()
      const r = view.getBoundingClientRect()
      const fx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left
      const fy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top
      zoomRef.current.applyZoom(pinchZoom(pinch.zoom, pinch.dist, dist(e.touches)), fx, fy)
    }
    const onEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinch = null
      if (e.touches.length === 0 && e.changedTouches.length === 1) {
        const t = e.changedTouches[0], now = Date.now()
        if (now - lastTap.t < 320 && Math.hypot(t.clientX - lastTap.x, t.clientY - lastTap.y) < 30) {
          const r = view.getBoundingClientRect()
          zoomRef.current.applyZoom(doubleTapZoom(zoomRef.current.zoom), t.clientX - r.left, t.clientY - r.top)
          lastTap = { t: 0, x: 0, y: 0 }
        } else lastTap = { t: now, x: t.clientX, y: t.clientY }
      }
    }
    view.addEventListener('touchstart', onStart, { passive: true })
    view.addEventListener('touchmove', onMove, { passive: false })
    view.addEventListener('touchend', onEnd, { passive: true })
    view.addEventListener('touchcancel', onEnd, { passive: true })
    return () => {
      view.removeEventListener('touchstart', onStart)
      view.removeEventListener('touchmove', onMove)
      view.removeEventListener('touchend', onEnd)
      view.removeEventListener('touchcancel', onEnd)
    }
  }, [])

  // активное слово — в видимую зону (при выборе слова, смене зума, клавиатуры); видимое — не двигаем
  const curKey = current ? `${current.number}${current.dir}` : ''
  useEffect(() => {
    const view = viewRef.current
    if (!view || !current) return
    const grid0 = view.querySelector('.cw-grid') as HTMLElement | null
    const offX = grid0 ? grid0.offsetLeft : 0
    const r = wordRect(current, cell)
    view.scrollLeft = revealAxis({ start: r.x + offX, size: r.w, scroll: view.scrollLeft, view: view.clientWidth, content: view.scrollWidth })
    view.scrollTop = revealAxis({ start: r.y, size: r.h, scroll: view.scrollTop, view: view.clientHeight, content: view.scrollHeight })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curKey, cell, viewH, areaW])

  // страница при открытии клавиатуры скроллит поле ввода под прилипшую панель — оставляем под неё «поля» прокрутки
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const set = () => { document.documentElement.style.scrollPaddingTop = `${el.offsetHeight + 8}px` }
    set()
    return () => { document.documentElement.style.scrollPaddingTop = '' }
  }, [viewH])

  return (
    <div className={`pl-crossword${keyboard ? ' kb' : ''}`} ref={rootRef} data-zoom={zoom.toFixed(2)}>
      <div className="pl-cw-view" ref={viewRef} style={{ height: viewH }}>
        <CrosswordView grid={grid} letters={letters} cellSize={cell} fontSize={font}
          currentWordNumber={current?.number} currentDir={current?.dir} onCell={onPickCell} />
      </div>
      <div className="pl-cw-zoom" role="group" aria-label="Масштаб сетки">
        <button type="button" aria-label="Уменьшить" onClick={() => applyZoom(zoom / 1.4)}>−</button>
        <button type="button" aria-label="Увеличить" onClick={() => applyZoom(zoom * 1.4)}>+</button>
        {zoom > 1.05 && <button type="button" aria-label="Вся сетка" onClick={() => applyZoom(1)}>⤢</button>}
      </div>
    </div>
  )
}
