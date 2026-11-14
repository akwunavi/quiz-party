// ═══ «Книга»: перелистывание А на РЕАЛЬНОМ содержимом (клон DOM уходящей страницы едет на листе) ═══
// Последовательность: старый вопрос остаётся на странице → правая страница переворачивается вокруг корешка и несёт на лицевой стороне СТАРОЕ правое содержимое →
// под ней открывается НОВОЕ правое (настоящий DOM) → на обороте листа — новое левое содержимое, лист ложится на левую страницу. Левая половина под листом до конца остаётся СТАРОЙ.
// Как: старый DOM клонируется В ФАЗЕ РЕНДЕРА (до коммита React новое содержимое ещё не в документе); в layout-эффекте (до отрисовки) настоящая левая половина прячется
// clip-path, поверх неё — клон старой левой; новый клон для оборота листа снимается позже (кегль useFitText уже подогнан). Анимации внутри клонов гасятся CSS (.bk-turn2 *).
// Только визуальный слой: состояние игры не читается и не пишется. reduced-motion / скрытая вкладка / недавнее скрытие — без листа.
import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react'
import { pageTurnKey, type TurnSnap } from './motion'
import { BOOK } from './geometry'

const DUR = 900

function cloneClean(src: HTMLElement): HTMLElement {
  const c = src.cloneNode(true) as HTMLElement
  c.style.clipPath = ''
  c.querySelectorAll('canvas, video, audio').forEach(e => e.remove())
  return c
}
function realScreen(root: HTMLElement | null): HTMLElement | null {
  return root ? root.querySelector<HTMLElement>(':scope > .host-screen, .host-screen:not(.bk-turn2 *)') : null
}
function wrap(node: HTMLElement, left: number, top: number): HTMLDivElement {
  const w = document.createElement('div')
  w.className = 'bk-turn2-clone'
  w.style.cssText = `position:absolute;left:${left}px;top:${top}px;width:${innerWidth}px;height:${innerHeight}px;overflow:hidden;`
  w.appendChild(node)
  return w
}

export function useBookPageTurn(rootRef: RefObject<HTMLElement | null>, stageRef: RefObject<HTMLDivElement | null>, snap: TurnSnap | null | undefined, enabled: boolean) {
  const last = useRef<TurnSnap | null>(null)
  const pending = useRef<{ key: string; node: HTMLElement } | null>(null)
  const stop = useRef<(() => void) | null>(null)
  const hiddenSince = useRef(false)
  const visibleAt = useRef(performance.now())
  useEffect(() => {
    const on = () => { if (document.hidden) hiddenSince.current = true; else visibleAt.current = performance.now() }
    document.addEventListener('visibilitychange', on)
    return () => { document.removeEventListener('visibilitychange', on); stop.current?.() }
  }, [])

  // ФАЗА РЕНДЕРА: документ ещё показывает СТАРОЕ содержимое — снимаем клон (идемпотентно по ключу)
  const key = enabled && snap ? pageTurnKey(last.current, snap) : null
  if (key && pending.current?.key !== key) {
    const src = realScreen(rootRef.current)
    pending.current = src ? { key, node: cloneClean(src) } : null
  }

  const k = snap ? `${snap.game_id}|${snap.phase}|${snap.round_number}|${snap.question_index}` : ''
  useLayoutEffect(() => {
    if (!snap) return
    const p = pending.current; pending.current = null
    const ok = enabled && !document.hidden && !hiddenSince.current && performance.now() - visibleAt.current > 2000 &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    const want = pageTurnKey(last.current, snap)
    last.current = snap; hiddenSince.current = false
    stop.current?.()                                     // быстрый переход: предыдущий лист мгновенно в конечное состояние, побеждает последний
    if (!ok || !want || !p || p.key !== want) return
    const stage = stageRef.current, host = realScreen(rootRef.current)
    if (!stage || !host) return
    const W = innerWidth, H = innerHeight, u = Math.min(W / 1920, H / 1080), ox = (W - 1920 * u) / 2, oy = (H - 1080 * u) / 2
    const cx = ox + (BOOK.x + BOOK.w / 2) * u, pw = (BOOK.w / 2) * u, py = oy + BOOK.y * u, ph = BOOK.h * u
    const timers: number[] = []
    let finished = false
    // слой «под листом»: СТАРАЯ левая половина (настоящая левая спрятана clip-path)
    const under = document.createElement('div'); under.className = 'bk-turn2-under'
    under.style.clipPath = 'inset(0 50% 0 0)'
    under.appendChild(wrap(p.node, 0, 0))
    // лист
    const leaf = document.createElement('div'); leaf.className = 'bk-turn2-leaf'
    leaf.style.cssText = `left:${cx}px;top:${py}px;width:${pw}px;height:${ph}px;`
    const front = document.createElement('div'); front.className = 'bk-turn2-face'
    front.appendChild(wrap(cloneClean(p.node), -cx, -py))
    const back = document.createElement('div'); back.className = 'bk-turn2-face back'
    const sh1 = document.createElement('i'); sh1.className = 'bk-turn2-shade'; front.appendChild(sh1)
    const sh2 = document.createElement('i'); sh2.className = 'bk-turn2-shade r'; back.appendChild(sh2)
    leaf.append(front, back)
    stage.style.perspectiveOrigin = `${cx}px 40%`
    stage.append(under, leaf)
    const prevClip = host.style.clipPath
    host.style.clipPath = 'inset(0 0 0 50%)'
    const end = () => {
      if (finished) return; finished = true
      timers.forEach(clearTimeout)
      host.style.clipPath = prevClip
      under.remove(); leaf.remove()
      if (stop.current === end) stop.current = null
    }
    stop.current = end
    const opts = { duration: DUR, easing: 'cubic-bezier(.5,.05,.3,1)', fill: 'forwards' as const }
    const a = leaf.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-180deg)' }], opts)
    // затухание — на гранях, а не на листе: opacity < 1 на элементе с preserve-3d сплющивает его, и оборот листа показывал бы лицевую сторону зеркально
    for (const f of [front, back]) f.animate([{ opacity: 1 }, { opacity: 1, offset: .9 }, { opacity: 0 }], { duration: DUR, fill: 'forwards' })
    for (const s of [sh1, sh2]) s.animate([{ opacity: 0 }, { opacity: .5, offset: .5 }, { opacity: 0 }], { duration: DUR, fill: 'forwards' })
    // оборот листа: НОВОЕ левое содержимое (снимаем, когда подгонка кегля уже отработала; оборот виден только после 90°)
    timers.push(window.setTimeout(() => {
      const live = realScreen(rootRef.current); if (!live || finished) return
      back.insertBefore(wrap(cloneClean(live), -(cx - pw), -py), sh2)
    }, 250))
    // лист почти лёг: открываем настоящую левую половину, клон старой убираем (лист ещё прикрывает и растворяется)
    timers.push(window.setTimeout(() => { host.style.clipPath = prevClip; under.remove() }, DUR * 0.78))
    a.onfinish = end
    timers.push(window.setTimeout(end, DUR + 400))        // страховка
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k])
}
