// ═══ «Три попытки» — большие картинки и спилы с буквами: сцена (утверждено) ═══
// Механика (RevealRound/reveal.ts): фаза 1 — картинки 1 и 2 (верно → 2 балла), фаза 2 —
// картинка 3 ВМЕСТО первых двух (1 балл), фаза 3 — картинка 4 (0,5 балла); у каждой фазы
// свой таймер; клетки слова: закрытые «?», заранее открытые — буквой; разбор —
// все картинки, слово целиком, пояснение и ответы команд (с фазой и ✓/✗). Текста вопроса нет.
// Картинки — в рамах Концепта C (mediaFrames.ts), фазы — стебель справа, время — одуванчик.
// Сцена рисует то, что ей дали: какие картинки видны (те же индексы, что revealVisibleIndices в игре), какие
// буквы открыты, ответы команд. Лаборатория — stage1/Reveal3.tsx, игра — forest/rounds/ForestReveal.tsx.
import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { makeFrames, type FrameState } from './mediaFrames'
import { Timer } from '../stage3/common3'
import { RoundIntro, S1Screen, introTl } from './common'
import type { RoundIntroData } from './data'
import type { Rect } from './env'
import { fitRow, wordCells, type Size } from './layout'
import { shrinkToFit, useFontsReady } from './gameHooks'

export type RvImg = { src: string; w: number; h: number }
export type RvAns = { team: string; color: string; text: string; phase: number | null; ok: boolean | null }
export type RvPhase = { n: number; sec: number; pts: string }
export type RvState = 'intro' | 'p1' | 'p2' | 'p3' | 'over' | 'review'
export type RevealView = {
  state: RvState
  /** все картинки вопроса (натуральные размеры) */
  imgs: RvImg[]
  /** видимые сейчас (индексы в imgs) и уходящие при смене фазы */
  shown: number[]
  prev: number[]
  /** текущие рамы уже стоят (время вышло / набор картинок не сменился) — не растут заново */
  still: boolean
  /** слово(а) ответа по группам и плоские индексы заранее открытых букв */
  groups: string[][]
  open: number[]
  phases: RvPhase[]
  note?: string
  answers: RvAns[]
  intro?: RoundIntroData
}

const PH: Record<string, number> = { p1: 0, p2: 1, p3: 2, over: 2, review: 3 }

/** Картинки фазы: одной высоты (равная важность), пропорции свои. */
function frames(v: RevealView, idx: number[], review: boolean): Rect[] {
  const sz = idx.map<Size>(i => v.imgs[i] ?? { w: 4, h: 3 })
  return review ? fitRow(sz, 40, 300, 1060, 1500, 34) : fitRow(sz, 40, 560, 1060, 1500, 56)
}

/** Числа рам для холста — новый объект на каждое состояние (перемотка/повтор не копят значений). */
export type FS = { cur: FrameState; prev: FrameState }
export function revealFs(state: string, curN: number, prevN: number, still: boolean): FS {
  const done = still ? 1 : 0
  return { cur: { grow: Array(curN).fill(done), reveal: Array(curN).fill(done), bloom: Array(curN).fill(0), pulse: 0 }, prev: { grow: Array(prevN).fill(1), reveal: Array(prevN).fill(1), bloom: Array(prevN).fill(0), pulse: 0 } }
}

/** Анимации состояния. `word` — спилы появляются (один раз за вопрос: при смене фазы слово уже стоит). */
export function revealBuild(tl: gsap.core.Timeline, q: (s: string) => Element[], state: string, fs: FS, opt: { still?: boolean; word?: boolean } = {}) {
  if (state === 'intro') return introTl(tl, q)
  const review = state === 'review'
  const still = opt.still ?? state === 'over'
  if (!still) {
    // смена фазы: прошлые картинки закрывает листва, рама сворачивается — на том же месте вырастает
    // новая рама и листва расходится живым краем (как в утверждённом Концепте C); слово и стебель фаз не двигаются
    const swap = fs.prev.grow.length > 0, t0 = swap ? 1.0 : 0.1
    fs.prev.grow.forEach((_, k) => {
      tl.fromTo(fs.prev.reveal, { [k]: 1 }, { [k]: 0, duration: 0.55, ease: 'power2.in' }, 0.05 + k * 0.08)
        .fromTo(fs.prev.grow, { [k]: 1 }, { [k]: 0, duration: 0.6, ease: 'power2.in' }, 0.45 + k * 0.08)
    })
    fs.cur.grow.forEach((_, k) => {
      tl.fromTo(fs.cur.grow, { [k]: 0 }, { [k]: 1, duration: 1.1, ease: 'power2.inOut' }, t0 + k * 0.1)
        .fromTo(fs.cur.reveal, { [k]: 0 }, { [k]: 1, duration: 0.95, ease: 'power2.inOut' }, t0 + 1.0 + k * 0.1)
      if (review) tl.fromTo(fs.cur.bloom, { [k]: 0 }, { [k]: 1, duration: 1.0, ease: 'power1.out' }, 2.4 + k * 0.12)
    })
    tl.fromTo(fs.cur, { pulse: 0 }, { pulse: 1.15, duration: 1.1, ease: 'power1.inOut' }, t0)
      .fromTo(q('.rvA-no'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' }, t0 + 1.6)
  }
  // слово на спилах появляется один раз — при смене фазы (A, фазы 2–3) оно уже стоит и не перезапускается
  if (opt.word ?? !(state === 'p2' || state === 'p3' || state === 'over')) tl.fromTo(q('.rv-cell'), { opacity: 0, y: 30, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.8)' }, 0.3)
  // смена фазы: текущий маркер раскрывается, прошлый вянет
  tl.fromTo(q('.rv-ph.cur'), { scale: 0.7 }, { scale: 1, duration: 0.7, ease: 'back.out(2)' }, 0.6)
    .fromTo(q('.rv-ph.used.just'), { rotation: 0, y: 0, opacity: 1 }, { rotation: 0, y: 0, opacity: 0.75, duration: 0.9, ease: 'power2.in' }, 0.2)
  if (state === 'over') tl.fromTo(q('.rv-over'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' }, 0.5)
      .fromTo(q('.rvA-ph.used .rvA-ph-bud'), { rotation: 0 }, { rotation: 14, duration: 0.8, stagger: 0.1, ease: 'power2.in' }, 0.3)
  if (review) {
    // разбор: по лозе под словом бежит свет, спилы по одному переворачиваются — буква выжжена
    // в древесине и тлеет угольком; на рамах картинок распускаются цветы
    tl.fromTo(q('.rvA-vine-light'), { strokeDashoffset: (_: number, el: Element) => parseFloat((el as SVGElement).style.strokeDasharray) || 1200 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power1.inOut' }, 0.8)
      .fromTo(q('.rv-cell:not(.pre)'), { rotationY: -90 }, { rotationY: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(1.4)', transformPerspective: 600 }, 1.0)
      .fromTo(q('.rv-cell:not(.pre) .rv-ember'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1.25, duration: 0.35, stagger: 0.18, ease: 'power2.out' }, 1.3)
      .to(q('.rv-cell:not(.pre) .rv-ember'), { opacity: 0, scale: 1.6, duration: 0.6, stagger: 0.18 }, 1.65)
      .fromTo(q('.rv-word-glow'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 2.2)
      .fromTo(q('.rv-note'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 2.5)
      .fromTo(q('.rv-ans'), { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12 }, 2.8)
  }
}

/** Холст рам Концепта C: текущие картинки + (при смене фазы) прошлые, которые уходят под листву. */
function FrameCanvas({ srcs, rs, prevSrcs, prevRs, fs }: { srcs: string[]; rs: Rect[]; prevSrcs: string[]; prevRs: Rect[]; fs: FS }) {
  const cv = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = cv.current!.getContext('2d')!
    const cur = makeFrames({ rects: rs, srcs }, 40), prev = prevRs.length ? makeFrames({ rects: prevRs, srcs: prevSrcs }, 60) : null
    const draw = () => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, 1920, 1080); if (prev) prev(ctx, fs.prev); cur(ctx, fs.cur) }
    gsap.ticker.add(draw); return () => gsap.ticker.remove(draw)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fs, srcs.join('|'), rs.map(r => `${r.x},${r.y},${r.w},${r.h}`).join('|')])
  return <canvas ref={cv} className="rvA-cv" width={1920} height={1080} aria-hidden />
}

const D = 116, GAP = 24
export function Reveal3Scene({ v, n, fs, rootRef, introEmblem, extra }: { v: RevealView; n: number | null; fs: FS; rootRef: React.RefObject<HTMLDivElement>; introEmblem?: ReactNode; extra?: ReactNode }) {
  const state = v.state
  const review = state === 'review'
  const fonts = useFontsReady()
  const wl = wordCells(v.groups, 1060, review ? 470 : 790, review ? 1500 : 920, D, GAP)
  const ansKey = `${state}|${v.note ?? ''}|${v.answers.map(a => a.team + a.text + a.ok).join(',')}|${wl.bottom}`
  // разбор: пояснение — под словом, ответы команд — под пояснением; много команд — в две колонки и плотнее
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !review) return
    const note = root.querySelector<HTMLElement>('.rv-note')
    let y = 630
    if (note) {
      const top = Math.max(556, Math.round(wl.bottom + 26))
      note.style.top = top !== 556 ? `${top}px` : ''
      shrinkToFit([note], () => note.offsetHeight <= 96, 24)
      y = Math.max(630, note.offsetTop + note.offsetHeight + 20)
    }
    const list = root.querySelector<HTMLElement>('.rv-answers')
    if (!list) return
    list.style.top = y !== 630 ? `${y}px` : ''
    for (const s of ['', 'is-two', 'is-two is-tight', 'is-two is-tight is-tiny']) {
      list.className = `rv-answers rvA-ans${s ? ' ' + s : ''}`
      if (list.offsetTop + list.offsetHeight <= 1060) break
    }
  }, [ansKey, fonts, rootRef, review, wl.bottom])

  const ph = PH[state] ?? 0
  const phases = v.phases.map((p, i) => ({ ...p, cls: review || i < ph ? 'used' : i === ph ? 'cur' : 'next', just: i === ph - 1 && !review }))
  const showTimer = state !== 'review' && state !== 'intro'
  if (state === 'intro') return (
    <S1Screen rects={[{ x: 460, y: 300, w: 1000, h: 520 }]} n={null} rootRef={rootRef} cls="rv rvA">
      {v.intro && <RoundIntro intro={v.intro} emblem={introEmblem ?? <svg viewBox="0 0 220 160" width="230"><path d="M110 156 C 108 110 112 70 110 30" stroke="#4f8f6a" strokeWidth="5" fill="none" />{[[60, 70], [110, 30], [160, 70]].map(([x, y], i) => <g key={i}><path d={`M110 ${100 - i * 10} Q ${(x + 110) / 2} ${y + 30} ${x} ${y}`} stroke="#4f8f6a" strokeWidth="4" fill="none" /><ellipse cx={x} cy={y} rx="16" ry="22" fill={['#c9b6ff', '#8f78d8', '#5b4396'][i]} /></g>)}</svg>} />}
    </S1Screen>
  )

  // ── A: три бутона (выбранная) — снизу одна «полоса земли»: слева одуванчик-время,
  //    в центре слово на спилах, справа стебель фаз; картинки над ней — всегда в одной и той же рамке
  //    (одна высота для всех фаз: при смене фазы ничего не прыгает)
  const rs = frames(v, v.shown, review)
  const prevRs = v.prev.length ? frames(v, v.prev, false) : []
  const exhausted = state === 'over'
  const d = wl.d, rowH = d + Math.round(wl.gap * 0.9)
  const firstY = wl.cells[0]?.y ?? (review ? 470 : 790)
  const wx0 = wl.minX - 30, ww = wl.maxX - wl.minX + 60
  const ptsWord = (p: string) => (p === '1' ? 'балл' : 'балла')
  const cur = v.phases[Math.min(ph, v.phases.length - 1)]
  const vineTop = wl.bottom - 6
  const fsz = d !== D ? Math.round(70 * d / D) : undefined
  return (
    <S1Screen rects={[...rs, ...(wl.cells.length ? [{ x: wx0, y: firstY - 80, w: ww, h: 170 + (wl.rows - 1) * rowH }] : [])]} n={showTimer ? n : null} rootRef={rootRef} cls={`rv rvA st-${state}`}>
      <FrameCanvas srcs={v.shown.map(i => v.imgs[i]?.src ?? '')} rs={rs} prevSrcs={v.prev.map(i => v.imgs[i]?.src ?? '')} prevRs={prevRs} fs={fs} />
      {v.shown.map((i, k) => <span key={i} className="rvA-no" style={{ left: rs[k].x - 4, top: rs[k].y - 4 }}>{i + 1}</span>)}
      {wl.cells.length > 0 && <svg className="rvA-vine" style={{ left: wx0, top: vineTop, width: ww }} viewBox={`0 0 ${ww} 40`} preserveAspectRatio="none" aria-hidden>
        <path className="rvA-vine-s" d={`M 0 18 C ${ww * 0.25} 34 ${ww * 0.5} 4 ${ww * 0.75} 22 S ${ww - 20} 14 ${ww} 18`} />
        <path className="rvA-vine-light" style={ww + 40 > 1200 ? { strokeDasharray: ww + 40, strokeDashoffset: ww + 40 } : undefined} d={`M 0 18 C ${ww * 0.25} 34 ${ww * 0.5} 4 ${ww * 0.75} 22 S ${ww - 20} 14 ${ww} 18`} />
      </svg>}
      {wl.cells.map(c => {
        const pre = v.open.includes(c.flat), open = review || pre
        return <div key={c.flat} className={`rv-cell rv-slice${open ? ' open' : ''}${pre ? ' pre' : ''}`} data-i={c.flat} style={{ left: c.x - d / 2, top: c.y - d / 2, width: d, height: d }}><i className="rv-ember" aria-hidden /><span style={fsz ? { fontSize: fsz } : undefined}>{open ? c.ch : '?'}</span></div>
      })}
      {review && <>
        <i className="rv-word-glow" style={{ top: firstY - 90 }} />
        {v.note && <div className="rv-note">{v.note}</div>}
        <div className="rv-answers rvA-ans">
          {v.answers.map((a, i) => (
            <div key={a.team + i} className={`rv-ans ${a.ok === true ? 'ok' : a.ok === false ? 'no' : 'nv'}`}>
              <i className="rv-mark">{a.ok === true ? '✓' : a.ok === false ? '✗' : ''}</i>
              <b style={{ color: a.color }}>{a.team}</b>
              <span className="rv-atext">{a.text}</span>
              {a.phase != null && <span className="rv-aph">фаза {a.phase}</span>}
            </div>
          ))}
        </div>
      </>}
      {!review && (
        <div className={`rvA-phases${exhausted ? ' done' : ''}`} aria-label={exhausted ? 'Попытки исчерпаны' : `Фаза ${ph + 1} из 3`}>
          <div className="rvA-ph-head">{exhausted ? 'Все три фазы позади' : <>Фаза <b>{ph + 1}</b> из 3</>}</div>
          <svg className="rvA-ph-stem" viewBox="0 0 60 400" preserveAspectRatio="none" aria-hidden><path d="M 30 400 C 22 320 40 250 30 180 C 22 120 38 70 30 10" /></svg>
          {phases.map((p, i) => {
            const cls = exhausted ? 'used' : p.cls
            return (
              <div key={i} className={`rv-ph rvA-ph ${cls}${p.just ? ' just' : ''}`} style={{ top: 70 + i * 116 }}>
                <span className="rvA-ph-bud" aria-hidden>
                  <svg viewBox="-50 -50 100 100">
                    <path className="lf" d="M 0 30 C -26 26 -34 8 -30 -2 C -16 0 -6 12 0 30 Z" /><path className="lf" d="M 0 30 C 26 26 34 8 30 -2 C 16 0 6 12 0 30 Z" />
                    {cls === 'cur' ? <g className="fl">{Array.from({ length: 8 }, (_, j) => <ellipse key={j} cx="0" cy="-22" rx="10" ry="20" transform={`rotate(${j * 45})`} />)}<circle r="10" className="c" /></g>
                      : cls === 'used' ? <g className="wl"><path d="M 0 18 C -12 10 -14 -10 -4 -24 C 2 -14 6 -2 4 18 Z" /><path d="M 2 18 C 14 8 12 -8 6 -18" /></g>
                        : <g className="bd"><path d="M 0 22 C -16 14 -16 -12 0 -26 C 16 -12 16 14 0 22 Z" /><path className="sep" d="M 0 22 C -8 10 -8 -6 0 -16" /></g>}
                  </svg>
                </span>
                <span className="rvA-ph-t"><b>{p.pts} {ptsWord(p.pts)}</b><small>{cls === 'cur' ? `сейчас · ${p.sec} с` : cls === 'used' ? 'прошла' : `фаза ${p.n} · ${p.sec} с`}</small></span>
              </div>
            )
          })}
        </div>
      )}
      {showTimer && cur && <Timer n={n} total={cur.sec} />}
      {state === 'over' && <div className="rv-over rvA-over">Попытки исчерпаны — разбор</div>}
      {extra}
    </S1Screen>
  )
}
