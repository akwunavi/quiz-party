// ═══ Этап 5 · Табло ═══
// Настоящее табло (HostScreen.ScoreboardScreen): строка на команду — место, название, очки по каждому сыгранному
// раунду, сумма; раскрывается с ПОСЛЕДНЕГО места к первому (по строке за раз); после раунда строки один раз «переезжают» со
// своих прежних мест на новые (FLIP); место считается плотно — у двух команд с равной суммой одно место, следующее
// на единицу больше, а выше стоит та, чей поздний раунд сильнее (lib/ranking.ts).
// Лес: табло — листья-плашки на ветвях; место — медальон (золото, серебро, бронза — тёплые, без неона), очки раундов — ягоды
// (лучшая в раунде светится), сумма — плод справа. Длинные названия переносятся на две строки и не обрезаются.
// Разметка общая для лаборатории (labs/forest/stage5Lab.tsx, таймлайн boardBuild) и игры (ForestBoard в game5.tsx:
// строки открываются по счётчику боевого экрана — `reveal`). Строки и места приходят готовыми (views.ts).
import { useLayoutEffect, type CSSProperties } from 'react'
import { S1Screen } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { useFontsReady } from '../stage1/gameHooks'
import { boardLayout, type BoardLayout, type BoardView } from './views'

const LEAF = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'
const MED = ['', 'gold', 'silver', 'bronze']

/** Таймлайн лаборатории: раскрытие с последнего места; в состоянии «переезда» — новая колонка и перестановка строк. */
export function boardBuild(tl: gsap.core.Timeline, q: (s: string) => Element[], v: BoardView, lay: BoardLayout) {
  const { rows, flip } = v, n = rows.length, fin = v.kind === 'final', { rh, gap } = lay
  tl.fromTo(q('.bd-title'), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
    .fromTo(q('.bd-colh'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.4)
  if (!flip) {
    rows.forEach((_, i) => tl.fromTo(q(`.bd-row[data-i="${i}"]`), { opacity: 0, x: -30, clipPath: 'inset(0 100% 0 0 round 40px)' }, { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0 round 40px)', duration: 0.55, ease: 'power2.out' }, 0.7 + (n - 1 - i) * (fin ? 0.24 : 0.34)))
    tl.fromTo(q('.bd-row[data-i="0"] .bd-med'), { scale: 1 }, { scale: 1.25, yoyo: true, repeat: 1, duration: 0.35 }, 0.7 + n * (fin ? 0.24 : 0.34) + 0.2)
  } else {
    // сначала табло как после прошлого раунда, потом — новая колонка очков, суммы и переезд строк
    tl.fromTo(q('.bd-row'), { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.04 }, 0.5)
    tl.addLabel('M', 2.2)
    rows.forEach((r, i) => {
      const dy = ((r.prevIdx ?? i) - i) * (rh + gap)
      tl.fromTo(q(`.bd-row[data-i="${i}"]`), { y: dy }, { y: 0, duration: 1.3, ease: 'power3.inOut' }, 'M+=0.3')
        .fromTo(q(`.bd-row[data-i="${i}"] .bd-bry.last`), { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(2.2)' }, 'M')
        .fromTo(q(`.bd-row[data-i="${i}"] .bd-tot .a`), { opacity: 1 }, { opacity: 0, duration: 0.3 }, 'M+=0.5')
        .fromTo(q(`.bd-row[data-i="${i}"] .bd-tot .b`), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 'M+=0.6')
      if (r.delta) tl.fromTo(q(`.bd-row[data-i="${i}"] .bd-chip`), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, 'M+=1.5')
    })
    tl.fromTo(q('.bd-colh .last'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 }, 'M')
  }
}

/** Табло. `reveal` (игра) — сколько строк снизу уже открыто; без него строки стоят все (ими ведёт таймлайн лаборатории). */
export function BoardScreen({ v, rootRef, reveal }: { v: BoardView; rootRef: React.RefObject<HTMLDivElement>; reveal?: number }) {
  const { rows, flip, cols } = v
  const n = rows.length, upto = cols.length
  const lay = boardLayout(n, upto)
  const { big, rh, gap, y0, custom } = lay
  const best = Array.from({ length: upto }, (_, r) => Math.max(0, ...rows.map(t => t.scores[r] ?? 0)))
  const game = reveal !== undefined
  const isIn = (i: number) => !game || i >= n - reveal!
  const fonts = useFontsReady()
  // длинные названия: в две строки, а если и так выше листа — кегль меньше (лабораторные влезают — ничего не меняется)
  const nameKey = rows.map(r => r.name).join('|')
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    el.querySelectorAll<HTMLElement>('.bd-nm').forEach(nm => {
      nm.style.fontSize = custom ? `${lay.nameFs}px` : ''
      let f = parseFloat(getComputedStyle(nm).fontSize) || 27
      while (nm.offsetHeight > rh - 4 && f > 12) { f -= 1; nm.style.fontSize = `${f}px` }
    })
  }, [nameKey, rh, custom, lay.nameFs, fonts, rootRef])
  const rects: Rect[] = [{ x: 200, y: 20, w: 1520, h: 1040 }]
  const tieKnots = rows.map((r, i) => (i > 0 && rows[i - 1].place === r.place ? i : -1)).filter(i => i >= 0)
  const st = (s: CSSProperties) => (custom ? s : undefined)
  return (
    <S1Screen rects={rects} n={null} rootRef={rootRef} cls={`s5 bd bd-${v.kind}${big ? ' big' : ''}${game ? ' bd-game' : ''}${game && reveal! >= n ? ' all-in' : ''}`}>
      <div className="bd-title"><b>{v.title}</b><span>{v.sub}</span></div>
      <div className="bd-colh" style={{ top: y0 - 40 }}>
        {cols.map((c, r) => <i key={r} className={r === upto - 1 && flip ? 'last' : ''} style={{ left: custom ? lay.brLeft + r * lay.step : (big ? 790 : 760) + r * (big ? 76 : 58), width: custom ? lay.berry : big ? 60 : 46, ...(custom ? { fontSize: lay.colFs } : {}) }}>{c}</i>)}
        <em>Σ</em>
      </div>
      {rows.map((r, i) => {
        const delta = r.delta ?? 0
        return <div key={r.id} className={`bd-row${r.place <= 3 ? ' pod p' + r.place : ''}${game && isIn(i) ? ' is-in' : ''}`} data-i={i} style={{ top: y0 + i * (rh + gap), height: rh, ...(custom ? { ['--rh' as string]: `${rh}px` } : {}) }}>
          <svg className="bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={LEAF} /></svg>
          <span className={`bd-med ${MED[r.place] ?? ''}`} style={st({ fontSize: lay.medFs })}>{r.place}</span>
          <span className="bd-chip" style={delta === 0 ? { visibility: 'hidden', ...st({ fontSize: Math.min(22, Math.round(rh * 0.55)) }) } : st({ fontSize: Math.min(22, Math.round(rh * 0.55)) })}>{delta > 0 ? `▲ ${delta}` : `▼ ${-delta}`}</span>
          <span className="bd-nm" style={{ color: r.color }}>{r.name}</span>
          <span className="bd-brs" style={st({ left: lay.brLeft, gap: lay.step - lay.berry })}>{Array.from({ length: upto }, (_, k) => {
            const val = r.scores[k] ?? 0
            return <i key={k} className={`bd-bry${val === best[k] && best[k] > 0 ? ' best' : ''}${val === 0 ? ' z' : ''}${flip && k === upto - 1 ? ' last' : ''}`} style={st({ width: lay.berry, height: lay.berry, fontSize: lay.berryFs })}>{val}</i>
          })}</span>
          <span className="bd-tot" style={st({ fontSize: lay.totFs })}>{flip ? <><b className="a">{r.prevSum ?? r.sum}</b><b className="b">{r.sum}</b></> : <b>{r.sum}</b>}</span>
        </div>
      })}
      {tieKnots.map(i => <svg key={i} className={`bd-knot${game && isIn(i - 1) ? ' is-in' : ''}`} style={{ top: y0 + i * (rh + gap) - gap - 12, ...(custom ? { width: Math.min(70, rh + 4) } : {}) }} viewBox="0 0 60 30" aria-hidden><path d="M 6 4 C 20 4 18 26 30 26 C 42 26 40 4 54 4" /><circle cx="30" cy="15" r="6" /></svg>)}
    </S1Screen>
  )
}
