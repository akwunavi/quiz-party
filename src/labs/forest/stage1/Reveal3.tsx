// ═══ «Три попытки» — большие картинки и спилы с буквами (утверждено) ═══
// Механика (RevealRound/reveal.ts): фаза 1 — картинки 1 и 2 (верно → 2 балла), фаза 2 —
// картинка 3 ВМЕСТО первых двух (1 балл), фаза 3 — картинка 4 (0,5 балла); у каждой фазы
// свой таймер (30/20/10 с); клетки слова: закрытые «?», заранее открытые — буквой; разбор —
// все картинки, слово целиком, пояснение и ответы команд (с фазой и ✓/✗). Текста вопроса нет.
// Картинки — в рамах Концепта C (mediaFrames.ts), фазы — стебель справа, время — одуванчик.
import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { REVEAL } from './data'
import { makeFrames, type FrameState } from './mediaFrames'
import { Timer } from '../stage3/common3'
import { RoundIntro, S1Screen, introTl, useEntrance, type S1Props } from './common'
import type { Rect } from './env'

export const REVEAL_STATES = [
  { id: 'intro', name: 'Вступление раунда' }, { id: 'p1', name: 'Фаза 1: две картинки · 2 балла' }, { id: 'p2', name: 'Фаза 2: третья картинка · 1 балл' },
  { id: 'p3', name: 'Фаза 3: четвёртая · 0,5 балла (последние секунды)' }, { id: 'over', name: 'Попытки исчерпаны: время вышло' }, { id: 'review', name: 'Разбор: слово и ответы команд' },
]
export const REVEAL_VARIANTS = [
  { id: 'A', name: 'A · Три бутона', note: 'Продолжение утверждённого экрана: картинки в рамах из ветвей, слово — на спилах ветки, время — одуванчик. Фазы — три бутона на одном стебле с баллами: текущий раскрыт, отыгранные увяли, будущие закрыты.' },
]

const P = { p1: 0, p2: 1, p3: 2, over: 2, review: 3 } as Record<string, number>
const prevOf = (st: string) => (st === 'p2' ? [0, 1] : st === 'p3' ? [2] : [])
const shown = (st: string) => (st === 'p1' ? [0, 1] : st === 'p2' ? [2] : st === 'p3' || st === 'over' ? [3] : [0, 1, 2, 3])
function timerFor(state: string) {
  if (state === 'p1') return { start: 30, from: 1.2, run: 8 }
  if (state === 'p2') return { start: 20, from: 2.4, run: 8 }
  if (state === 'p3') return { start: 10, from: 2.4, run: 6 }
  return null
}
/** Картинки фазы: одной высоты (равная важность), пропорции свои. */
function frames(idx: number[], top: number, maxH: number, cx: number, maxW: number, gap = 50): Rect[] {
  const imgs = idx.map(i => REVEAL.imgs[i])
  let h = maxH
  const total = (hh: number) => imgs.reduce((a, im) => a + im.w * hh / im.h, 0) + gap * (imgs.length - 1)
  while (total(h) > maxW) h -= 4
  let x = cx - total(h) / 2
  return imgs.map(im => { const w = Math.round(im.w * h / im.h), r = { x: Math.round(x), y: top, w, h }; x += w + gap; return r })
}

/** Холст рам Концепта C: текущие картинки + (при смене фазы) прошлые, которые уходят под листву. */
type FS = { cur: FrameState; prev: FrameState }
function FrameCanvas({ idx, rs, prevIdx, prevRs, fs }: { idx: number[]; rs: Rect[]; prevIdx: number[]; prevRs: Rect[]; fs: FS }) {
  const cv = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = cv.current!.getContext('2d')!
    const cur = makeFrames({ rects: rs, srcs: idx.map(i => REVEAL.imgs[i].src) }, 40), prev = prevRs.length ? makeFrames({ rects: prevRs, srcs: prevIdx.map(i => REVEAL.imgs[i].src) }, 60) : null
    const draw = () => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, 1920, 1080); if (prev) prev(ctx, fs.prev); cur(ctx, fs.cur) }
    gsap.ticker.add(draw); return () => gsap.ticker.remove(draw)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fs])
  return <canvas ref={cv} className="rvA-cv" width={1920} height={1080} aria-hidden />
}

function Cells({ kind, review, cy, d = 110, gap = 22 }: { kind: 'slice'; review: boolean; cy: number; d?: number; gap?: number }) {
  const letters = REVEAL.word.split(''), x0 = 1060 - ((letters.length - 1) * (d + gap)) / 2
  return <>{letters.map((ch, i) => {
    const open = review || REVEAL.open.includes(i)
    return <div key={i} className={`rv-cell rv-${kind}${open ? ' open' : ''}${REVEAL.open.includes(i) ? ' pre' : ''}`} data-i={i} style={{ left: x0 + i * (d + gap) - d / 2, top: cy - d / 2, width: d, height: d }}><i className="rv-ember" aria-hidden /><span>{open ? ch : '?'}</span></div>
  })}</>
}
function Answers({ cls }: { cls: string }) {
  return (
    <div className={`rv-answers ${cls}`}>
      {REVEAL.answers.map(a => (
        <div key={a.team} className={`rv-ans ${a.ok ? 'ok' : 'no'}`}>
          <i className="rv-mark">{a.ok ? '✓' : '✗'}</i>
          <b style={{ color: a.color }}>{a.team}</b>
          <span className="rv-atext">{a.text}</span>
          <span className="rv-aph">фаза {a.phase}</span>
        </div>
      ))}
    </div>
  )
}

export function Reveal3({ state, nOv, onReady }: S1Props) {
  const tm = timerFor(state)
  const idx = shown(state)
  const review = state === 'review'
  // числа рам для холста варианта A — новый объект на каждое состояние (перемотка/повтор не копят значений)
  const fs = useMemo<FS>(() => {
    const k = shown(state).length, pk = prevOf(state).length
    const done = state === 'over' ? 1 : 0
    return { cur: { grow: Array(k).fill(done), reveal: Array(k).fill(done), bloom: Array(k).fill(0), pulse: 0 }, prev: { grow: Array(pk).fill(1), reveal: Array(pk).fill(1), bloom: Array(pk).fill(0), pulse: 0 } }
  }, [state])
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (state === 'intro') return introTl(tl, q)
    if (state !== 'over') {
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
    if (!(state === 'p2' || state === 'p3' || state === 'over')) tl.fromTo(q('.rv-cell'), { opacity: 0, y: 30, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.8)' }, 0.3)
    // смена фазы: текущий маркер раскрывается, прошлый вянет
    tl.fromTo(q('.rv-ph.cur'), { scale: 0.7 }, { scale: 1, duration: 0.7, ease: 'back.out(2)' }, 0.6)
      .fromTo(q('.rv-ph.used.just'), { rotation: 0, y: 0, opacity: 1 }, { rotation: 0, y: 0, opacity: 0.75, duration: 0.9, ease: 'power2.in' }, 0.2)
    if (state === 'over') tl.fromTo(q('.rv-over'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' }, 0.5)
        .fromTo(q('.rvA-ph.used .rvA-ph-bud'), { rotation: 0 }, { rotation: 14, duration: 0.8, stagger: 0.1, ease: 'power2.in' }, 0.3)
    if (review) {
      // разбор: по лозе под словом бежит свет, спилы по одному переворачиваются — буква выжжена
      // в древесине и тлеет угольком; на рамах картинок распускаются цветы
      tl.fromTo(q('.rvA-vine-light'), { strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power1.inOut' }, 0.8)
        .fromTo(q('.rv-cell:not(.pre)'), { rotationY: -90 }, { rotationY: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(1.4)', transformPerspective: 600 }, 1.0)
        .fromTo(q('.rv-cell:not(.pre) .rv-ember'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1.25, duration: 0.35, stagger: 0.18, ease: 'power2.out' }, 1.3)
        .to(q('.rv-cell:not(.pre) .rv-ember'), { opacity: 0, scale: 1.6, duration: 0.6, stagger: 0.18 }, 1.65)
        .fromTo(q('.rv-word-glow'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 2.2)
        .fromTo(q('.rv-note'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 2.5)
        .fromTo(q('.rv-ans'), { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12 }, 2.8)
    }
  }, tm, [state, fs])
  const n = nOv ?? (state === 'over' ? 0 : nLive)
  const ph = P[state] ?? 0
  const phases = REVEAL.phases.map((p, i) => ({ ...p, cls: review || i < ph ? 'used' : i === ph ? 'cur' : 'next', just: i === ph - 1 && !review }))
  const showTimer = state !== 'review' && state !== 'intro'
  if (state === 'intro') return (
    <S1Screen rects={[{ x: 460, y: 300, w: 1000, h: 520 }]} n={null} rootRef={root} cls="rv rvA">
      <RoundIntro intro={REVEAL.intro} emblem={<svg viewBox="0 0 220 160" width="230"><path d="M110 156 C 108 110 112 70 110 30" stroke="#4f8f6a" strokeWidth="5" fill="none" />{[[60, 70], [110, 30], [160, 70]].map(([x, y], i) => <g key={i}><path d={`M110 ${100 - i * 10} Q ${(x + 110) / 2} ${y + 30} ${x} ${y}`} stroke="#4f8f6a" strokeWidth="4" fill="none" /><ellipse cx={x} cy={y} rx="16" ry="22" fill={['#c9b6ff', '#8f78d8', '#5b4396'][i]} /></g>)}</svg>} />
    </S1Screen>
  )

  // ── A: три бутона (выбранная) — снизу одна «полоса земли»: слева одуванчик-время,
  //    в центре слово на спилах, справа стебель фаз; картинки над ней — всегда в одной и той же рамке
  //    (одна высота для всех фаз: при смене фазы ничего не прыгает)
  {
    const rs = review ? frames(idx, 40, 300, 1060, 1500, 34) : frames(idx, 40, 560, 1060, 1500, 56)
    const cy = review ? 470 : 790
    const exhausted = state === 'over'
    const word = REVEAL.word.length, d = 116, gap = 24, wx0 = 1060 - ((word - 1) * (d + gap)) / 2 - d / 2 - 30, ww = word * d + (word - 1) * gap + 60
    const ptsWord = (p: string) => (p === '1' ? 'балл' : 'балла')
    return (
      <S1Screen rects={[...rs, { x: wx0, y: cy - 80, w: ww, h: 170 }]} n={showTimer ? n : null} rootRef={root} cls={`rv rvA st-${state}`}>
        <FrameCanvas idx={idx} rs={rs} prevIdx={prevOf(state)} prevRs={prevOf(state).length ? frames(prevOf(state), 40, 560, 1060, 1500, 56) : []} fs={fs} />
        {idx.map((i, k) => <span key={i} className="rvA-no" style={{ left: rs[k].x - 4, top: rs[k].y - 4 }}>{i + 1}</span>)}
        <svg className="rvA-vine" style={{ left: wx0, top: cy + d / 2 - 6, width: ww }} viewBox={`0 0 ${ww} 40`} preserveAspectRatio="none" aria-hidden>
          <path className="rvA-vine-s" d={`M 0 18 C ${ww * 0.25} 34 ${ww * 0.5} 4 ${ww * 0.75} 22 S ${ww - 20} 14 ${ww} 18`} />
          <path className="rvA-vine-light" d={`M 0 18 C ${ww * 0.25} 34 ${ww * 0.5} 4 ${ww * 0.75} 22 S ${ww - 20} 14 ${ww} 18`} />
        </svg>
        <Cells kind="slice" review={review} cy={cy} d={d} gap={gap} />
        {review && <><i className="rv-word-glow" style={{ top: cy - 90 }} /><div className="rv-note">{REVEAL.note}</div><Answers cls="rvA-ans" /></>}
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
        {showTimer && <Timer n={n} total={REVEAL.phases[ph].sec} />}
        {state === 'over' && <div className="rv-over rvA-over">Попытки исчерпаны — разбор</div>}
      </S1Screen>
    )
  }
}
