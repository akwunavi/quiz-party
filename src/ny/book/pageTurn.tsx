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
/** прогрев растра невидимого листа перед стартом, мс (лист с клоном всей страницы рисуется не мгновенно) */
const WARM = Number(new URLSearchParams(location.search).get('bkwarm') ?? 220)

function cloneClean(src: HTMLElement): HTMLElement {
  const c = src.cloneNode(true) as HTMLElement
  c.style.clipPath = ''
  // при быстрой второй смене страницы настоящий экран ещё скрыт (visibility:hidden, data-bk-turning) — клон обязан быть видимым
  c.style.visibility = ''; c.removeAttribute('data-bk-turning')
  // position:fixed в клоне на повёрнутом листе считался бы от листа (transform листа — containing block), а не от экрана: шапка и таймер «Книги» — fixed и уезжали
  // (регресс 10.66+, найдено кадрами перелистывания 10.70). Обёртка клона и так равна экрану по размеру и началу координат, поэтому fixed → absolute даёт те же
  // координаты. Клон клона (src отсоединён) уже без fixed: правка записана inline. Обёртку с transform для этого брать нельзя: растр картинок на листе запаздывает.
  if (src.isConnected) {
    const from = src.querySelectorAll<HTMLElement>('*'), to = c.querySelectorAll<HTMLElement>('*')
    for (let i = 0; i < from.length && i < to.length; i++) if (getComputedStyle(from[i]).position === 'fixed') to[i].style.setProperty('position', 'absolute', 'important')
  }
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
    // ЖЁСТКОЕ ПРАВИЛО (10.71): пока лист не перевернулся, НОВОГО содержимого на экране нет вообще — ни под листом, ни на нём. Настоящий (новый) экран скрыт целиком (visibility),
    // под листом — СТАРАЯ левая страница, справа и на обороте листа — чистая бумага. Когда лист лёг, новый экран появляется сразу целиком: его анимации входа дорабатываются мгновенно
    // (иначе они шли бы под листом, и после переворота элементы «въезжали» бы заново).
    const under = document.createElement('div'); under.className = 'bk-turn2-under'
    under.appendChild(wrap(p.node, 0, 0))          // до старта листа — старая страница ЦЕЛИКОМ
    const leaf = document.createElement('div'); leaf.className = 'bk-turn2-leaf'
    leaf.style.cssText = `left:${cx}px;top:${py}px;width:${pw}px;height:${ph}px;opacity:.01;`   // невидим, но отрисовывается (прогрев растра)
    const front = document.createElement('div'); front.className = 'bk-turn2-face'
    front.appendChild(wrap(cloneClean(p.node), -cx, -py))
    const back = document.createElement('div'); back.className = 'bk-turn2-face back'
    const sh1 = document.createElement('i'); sh1.className = 'bk-turn2-shade'; front.appendChild(sh1)
    const sh2 = document.createElement('i'); sh2.className = 'bk-turn2-shade r'; back.appendChild(sh2)
    leaf.append(front, back)
    stage.style.perspectiveOrigin = `${cx}px 40%`
    stage.append(under, leaf)
    const prevVis = host.style.visibility
    host.style.visibility = 'hidden'
    host.setAttribute('data-bk-turning', '')
    const end = () => {
      if (finished) return; finished = true
      timers.forEach(clearTimeout)
      under.remove(); leaf.remove()
      host.style.visibility = prevVis; host.removeAttribute('data-bk-turning')
      // новый экран — сразу целиком: конечные анимации входа доигрываем до конца, бесконечные (мерцание декора) не трогаем
      try { for (const an of host.getAnimations({ subtree: true })) { const it = an.effect?.getComputedTiming().iterations; if (it !== Infinity) an.finish() } } catch { /* не критично */ }
      if (stop.current === end) stop.current = null
    }
    stop.current = end
    const opts = { duration: DUR, easing: 'cubic-bezier(.5,.05,.3,1)', fill: 'forwards' as const }
    const a = leaf.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-180deg)' }], opts)
    const anims = [a]
    for (const s of [sh1, sh2]) anims.push(s.animate([{ opacity: 0 }, { opacity: .5, offset: .5 }, { opacity: 0 }], { duration: DUR, fill: 'forwards' }))
    anims.forEach(x => x.pause())
    // растр клона на лист готовится не сразу: ждём decode() картинок + 2 кадра + прогрев; старая страница под листом остаётся целой
    let started = false
    const go = () => {
      if (finished || started) return; started = true
      under.style.clipPath = 'inset(0 50% 0 0)'; leaf.style.opacity = ''
      anims.forEach(x => x.play())
      timers.push(window.setTimeout(end, DUR + 400))   // страховка
    }
    const decodes = [...leaf.querySelectorAll('img'), ...under.querySelectorAll('img')].map(i => (i.decode ? i.decode().catch(() => undefined) : Promise.resolve()))
    void Promise.all(decodes).then(() => requestAnimationFrame(() => requestAnimationFrame(() => { timers.push(window.setTimeout(go, WARM)) })))
    timers.push(window.setTimeout(go, 650))            // страховка: rAF не идёт (фон) / картинка не декодируется
    a.onfinish = end
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k])
}
