// ═══ Этап 1 в игре: общие хуки боевых экранов (картинки, таймлайн входа, «сейчас») ═══
// Лаборатория ведёт таймлайн сама (useEntrance + перемотка); в игре таймлайн просто проигрывается, но не на каждый
// рендер, а на смену «ключа» (новый вопрос, новая фаза): прошлый доигрывается мгновенно до конца, чтобы элементы
// не застряли на полпути, и запускается следующий.
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import gsap from 'gsap'
import { FALLBACK_SIZE, type Size } from './layout'

const sizeCache = new Map<string, Size>()

/** Натуральные размеры картинок: из кеша сразу, иначе — предзагрузка. `ready` — все загрузились (или не смогли),
 *  либо прошло `waitMs`: дальше рисуем с запасным 4:3, чтобы экран не ждал вечно на плохой сети. */
export function useImageSizes(urls: string[], waitMs = 1800): { sizes: Size[]; ready: boolean } {
  const key = urls.join('\n')
  const [, bump] = useState(0)
  const [timedOut, setTimedOut] = useState(false)
  useEffect(() => {
    setTimedOut(false)
    const todo = urls.filter(u => !sizeCache.has(u))
    if (!todo.length) return
    let alive = true
    todo.forEach(u => {
      const im = new Image()
      const done = (s: Size) => { sizeCache.set(u, s); if (alive) bump(x => x + 1) }
      im.onload = () => done(im.naturalWidth && im.naturalHeight ? { w: im.naturalWidth, h: im.naturalHeight } : FALLBACK_SIZE)
      im.onerror = () => done(FALLBACK_SIZE)
      im.src = u
    })
    const t = setTimeout(() => { if (alive) setTimedOut(true) }, waitMs)
    return () => { alive = false; clearTimeout(t) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, waitMs])
  const sizes = urls.map(u => sizeCache.get(u) ?? FALLBACK_SIZE)
  return { sizes, ready: timedOut || urls.every(u => sizeCache.has(u)) }
}

/** Таймлайн входа на смену ключа. build(tl, q, first) — first: экран только что появился (после обновления страницы
 *  тоже): можно сыграть полный вход; дальше — только то, что изменилось. */
export function useStageTl(root: RefObject<HTMLElement>, key: string | null,
  build: (tl: gsap.core.Timeline, q: (s: string) => Element[], first: boolean) => void) {
  const cur = useRef<gsap.core.Timeline | null>(null)
  const first = useRef(true)
  const buildRef = useRef(build); buildRef.current = build
  useLayoutEffect(() => {
    if (key == null || !root.current) return
    cur.current?.progress(1); cur.current?.kill()
    const q = gsap.utils.selector(root)
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
    buildRef.current(tl, q, first.current)
    first.current = false
    cur.current = tl
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  useEffect(() => () => { cur.current?.kill() }, [])
}

/** Текущее время с шагом `ms` — для таймеров, которые считаются из состояния (блиц), а не из timer_started_at. */
export function useNow(ms = 250): number {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), ms); return () => clearInterval(t) }, [ms])
  return now
}

/** Шрифты Леса подгружаются асинхронно: замеры вписывания надо повторить, когда они готовы. */
export function useFontsReady(): boolean {
  const [ok, setOk] = useState(() => typeof document === 'undefined' || !document.fonts || document.fonts.status === 'loaded')
  useEffect(() => { if (!ok && document.fonts) void document.fonts.ready.then(() => setOk(true)) }, [ok])
  return ok
}

/** Уменьшать кегль элементов (шаг 2px), пока `fits()` не станет true или не дойдём до `min`. Ничего не трогает,
 *  если всё влезает с исходным кеглем (в лаборатории так и есть — её кадры не меняются). */
export function shrinkToFit(els: HTMLElement[], fits: () => boolean, min: number) {
  els.forEach(e => { e.style.fontSize = '' })
  if (!els.length || fits()) return
  let fs = Math.max(...els.map(e => parseFloat(getComputedStyle(e).fontSize) || 0))
  while (fs > min) {
    fs = Math.max(min, fs - 2)
    els.forEach(e => { e.style.fontSize = `${fs}px` })
    if (fits()) return
  }
}
