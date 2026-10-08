// ═══ Этап 1 · «Три попытки» — три композиции ═══
// Механика (RevealRound/reveal.ts): фаза 1 — картинки 1 и 2 (верно → 2 балла), фаза 2 —
// картинка 3 ВМЕСТО первых двух (1 балл), фаза 3 — картинка 4 (0,5 балла); у каждой фазы
// свой таймер (30/20/10 с); клетки слова: закрытые «?», заранее открытые — буквой; разбор —
// все картинки, слово целиком, пояснение и ответы команд (с фазой и ✓/✗). Текста вопроса нет.
// A «Три бутона» — продолжение утверждённого экрана «3 попытки»: спилы ветки, одуванчик.
// B «Листья попыток» — ветвь с тремя листьями-фазами, отыгранный лист желтеет и опадает;
//   время — лоза; буквы — на речной гальке.
// C «Росток и луна» — фаза растёт ростком у корней, время — убывающая луна в просвете кроны;
//   буквы — на шляпках светящихся грибов.
import { REVEAL } from './data'
import { Dandelion, VineTimer, MoonTimer } from './timers'
import { RoundIntro, S1Screen, introTl, useEntrance, type S1Props } from './common'
import type { Rect } from './env'

export const REVEAL_STATES = [
  { id: 'intro', name: 'Вступление раунда' }, { id: 'p1', name: 'Фаза 1: две картинки · 2 балла' }, { id: 'p2', name: 'Фаза 2: третья картинка · 1 балл' },
  { id: 'p3', name: 'Фаза 3: четвёртая · 0,5 балла (последние секунды)' }, { id: 'over', name: 'Попытки исчерпаны: время вышло' }, { id: 'review', name: 'Разбор: слово и ответы команд' },
]
export const REVEAL_VARIANTS = [
  { id: 'A', name: 'A · Три бутона', note: 'Продолжение утверждённого экрана: картинки в рамах из ветвей, слово — на спилах ветки, время — одуванчик. Фазы — три бутона на одном стебле с баллами: текущий раскрыт, отыгранные увяли, будущие закрыты.' },
  { id: 'B', name: 'B · Листья попыток', note: 'Слева ветвь с тремя большими листьями: «фаза 1 · 2 балла» и т. д. Текущий лист живой и крупный, отыгранный желтеет и опадает. Время — лоза над картинками. Буквы — на речной гальке.' },
  { id: 'C', name: 'C · Росток и луна', note: 'Время — луна в просвете кроны: убывает до новолуния. Фазу показывает росток у корней: росток → куст → деревце. Буквы — на шляпках светящихся грибов, при разборе грибы разгораются по одному.' },
]

const P = { p1: 0, p2: 1, p3: 2, over: 2, review: 3 } as Record<string, number>
const shown = (st: string) => (st === 'p1' ? [0, 1] : st === 'p2' ? [2] : st === 'p3' || st === 'over' ? [3] : [0, 1, 2, 3])
function timerFor(state: string) {
  if (state === 'p1') return { start: 30, from: 1.2, run: 8 }
  if (state === 'p2') return { start: 20, from: 1.2, run: 8 }
  if (state === 'p3') return { start: 10, from: 1.0, run: 6 }
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

function Frames({ idx, rs }: { idx: number[]; rs: Rect[] }) {
  return <>{idx.map((i, k) => (
    <div key={i} className="rv-frame" style={{ left: rs[k].x, top: rs[k].y, width: rs[k].w, height: rs[k].h }}>
      <img src={REVEAL.imgs[i].src} alt="" /><i className="rv-foliage" /><span className="rv-no">{i + 1}</span>
    </div>
  ))}</>
}
function Cells({ kind, review, cy, d = 110, gap = 22 }: { kind: 'slice' | 'pebble' | 'cap'; review: boolean; cy: number; d?: number; gap?: number }) {
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

export function Reveal3({ variant, state, nOv, onReady }: S1Props) {
  const tm = timerFor(state)
  const idx = shown(state)
  const review = state === 'review'
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (state === 'intro') return introTl(tl, q)
    // фото появляются из-под листвы: листва расходится от центра; в фазе 2/3 старые кадры сперва зарастают
    if (state === 'p2' || state === 'p3') tl.fromTo(q('.rv-ghost'), { opacity: 1, clipPath: 'circle(75% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)', duration: 0.6, ease: 'power2.in' }, 0)
    tl.fromTo(q('.rv-frame'), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, state === 'p2' || state === 'p3' ? 0.5 : 0.1)
      .fromTo(q('.rv-frame img'), { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 0.9, stagger: 0.12, ease: 'power2.inOut' }, state === 'p2' || state === 'p3' ? 0.8 : 0.4)
      .fromTo(q('.rv-foliage'), { opacity: 1 }, { opacity: 0, duration: 0.9, stagger: 0.12 }, state === 'p2' || state === 'p3' ? 0.8 : 0.4)
    tl.fromTo(q('.rv-cell'), { opacity: 0, y: 30, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.8)' }, 0.3)
    // смена фазы: текущий маркер раскрывается, прошлый вянет
    tl.fromTo(q('.rv-ph.cur'), { scale: 0.7 }, { scale: 1, duration: 0.7, ease: 'back.out(2)' }, 0.6)
      .fromTo(q('.rv-ph.used.just'), { rotation: 0, y: 0, opacity: 1 }, { rotation: variant === 'B' ? 24 : 0, y: variant === 'B' ? 30 : 0, opacity: 0.75, duration: 0.9, ease: 'power2.in' }, 0.2)
    if (variant === 'C') tl.fromTo(q('.rvC-sprout .grow'), { scaleY: 0.6, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.6)' }, 0.5)
    if (state === 'over') tl.fromTo(q('.rv-over'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' }, 0.5)
        .fromTo(q('.rvA-ph.used .rvA-ph-bud'), { rotation: 0 }, { rotation: 14, duration: 0.8, stagger: 0.1, ease: 'power2.in' }, 0.3)
    if (review && variant === 'A') {
      // разбор: по лозе под словом бежит свет, спилы по одному переворачиваются — буква выжжена
      // в древесине и тлеет угольком; на рамах картинок распускаются цветы
      tl.fromTo(q('.rvA-vine-light'), { strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power1.inOut' }, 0.8)
        .fromTo(q('.rv-cell:not(.pre)'), { rotationY: -90 }, { rotationY: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(1.4)', transformPerspective: 600 }, 1.0)
        .fromTo(q('.rv-cell:not(.pre) .rv-ember'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1.25, duration: 0.35, stagger: 0.18, ease: 'power2.out' }, 1.3)
        .to(q('.rv-cell:not(.pre) .rv-ember'), { opacity: 0, scale: 1.6, duration: 0.6, stagger: 0.18 }, 1.65)
        .fromTo(q('.rvA-bloom'), { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(2)' }, 2.1)
        .fromTo(q('.rv-word-glow'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 2.2)
        .fromTo(q('.rv-note'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 2.5)
        .fromTo(q('.rv-ans'), { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12 }, 2.8)
    } else if (review) {
      tl.fromTo(q('.rv-cell span'), { rotationY: 90 }, { rotationY: 0, duration: 0.45, stagger: 0.12, ease: 'back.out(1.6)' }, 1.0)
        .fromTo(q('.rv-word-glow'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.8)
        .fromTo(q('.rv-note'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 2.2)
        .fromTo(q('.rv-ans'), { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12 }, 2.5)
    }
  }, tm, [variant, state])
  const n = nOv ?? (state === 'over' ? 0 : nLive)
  const ph = P[state] ?? 0
  const phases = REVEAL.phases.map((p, i) => ({ ...p, cls: review || i < ph ? 'used' : i === ph ? 'cur' : 'next', just: i === ph - 1 && !review }))
  const showTimer = state !== 'review' && state !== 'intro'
  if (state === 'intro') return (
    <S1Screen rects={[{ x: 460, y: 300, w: 1000, h: 520 }]} n={null} rootRef={root} cls={`rv rv${variant}`}>
      <RoundIntro intro={REVEAL.intro} emblem={<svg viewBox="0 0 220 160" width="230"><path d="M110 156 C 108 110 112 70 110 30" stroke="#4f8f6a" strokeWidth="5" fill="none" />{[[60, 70], [110, 30], [160, 70]].map(([x, y], i) => <g key={i}><path d={`M110 ${100 - i * 10} Q ${(x + 110) / 2} ${y + 30} ${x} ${y}`} stroke="#4f8f6a" strokeWidth="4" fill="none" /><ellipse cx={x} cy={y} rx="16" ry="22" fill={['#c9b6ff', '#8f78d8', '#5b4396'][i]} /></g>)}</svg>} />
    </S1Screen>
  )

  // ── A: три бутона (выбранная) — снизу одна «полоса земли»: слева одуванчик-время,
  //    в центре слово на спилах, справа стебель фаз; картинки над ней — всегда в одной и той же рамке
  //    (одна высота для всех фаз: при смене фазы ничего не прыгает)
  if (variant === 'A') {
    const rs = review ? frames(idx, 40, 300, 1060, 1500, 34) : frames(idx, 40, 560, 1060, 1500, 56)
    const cy = review ? 470 : 790
    const exhausted = state === 'over'
    const word = REVEAL.word.length, d = 116, gap = 24, wx0 = 1060 - ((word - 1) * (d + gap)) / 2 - d / 2 - 30, ww = word * d + (word - 1) * gap + 60
    const ptsWord = (p: string) => (p === '1' ? 'балл' : 'балла')
    return (
      <S1Screen rects={[...rs, { x: wx0, y: cy - 80, w: ww, h: 170 }]} n={showTimer ? n : null} rootRef={root} cls={`rv rvA st-${state}`}>
        {(state === 'p2' || state === 'p3') && <div className="rv-ghost" />}
        <Frames idx={idx} rs={rs} />
        {review && rs.map((r, k) => <span key={k} className="rvA-bloom" style={{ left: r.x + r.w - 6, top: r.y - 8 }} aria-hidden><i /><i /><i /><i /><i /><b /></span>)}
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
        {showTimer && <div className="rv-tm rvA-tm"><Dandelion n={n} total={REVEAL.phases[ph].sec} size={230} seeds={REVEAL.phases[ph].sec} rooted={150} /></div>}
        {state === 'over' && <div className="rv-over rvA-over">Попытки исчерпаны — разбор</div>}
      </S1Screen>
    )
  }
  // ── B: листья попыток
  if (variant === 'B') {
    const rs = review ? frames(idx, 120, 290, 1150, 1360, 30) : frames(idx, 170, state === 'p1' ? 520 : 580, 1150, 1360, 50)
    const cy = review ? 540 : 880
    return (
      <S1Screen rects={[...rs, { x: 760, y: cy - 60, w: 800, h: 130 }, { x: 60, y: 160, w: 300, h: 720 }]} n={showTimer ? n : null} rootRef={root} cls="rv rvB">
        {showTimer && <div className="rv-tm rvB-tm"><VineTimer n={n} total={REVEAL.phases[ph].sec} width={1140} /><b>{n}</b></div>}
        {(state === 'p2' || state === 'p3') && <div className="rv-ghost" />}
        <Frames idx={idx} rs={rs} />
        <svg className="rvB-branch" viewBox="0 0 300 900"><path d="M 150 0 C 140 200 170 420 150 900" /></svg>
        {phases.map((p, i) => (
          <div key={i} className={`rv-ph rvB-leaf ${p.cls}${p.just ? ' just' : ''}`} style={{ top: 190 + i * 230 }}>
            <svg viewBox="0 0 260 150"><path d="M 10 75 C 60 0 200 0 250 75 C 200 150 60 150 10 75 Z" /><path className="vein" d="M 14 75 L 246 75 M 80 75 L 120 40 M 80 75 L 120 110 M 150 75 L 190 44 M 150 75 L 190 106" /></svg>
            <div><b>{p.pts}</b><span>{p.pts === '2' ? 'балла' : p.pts === '1' ? 'балл' : 'балла'} · фаза {p.n}</span></div>
          </div>
        ))}
        <Cells kind="pebble" review={review} cy={cy + 0} d={104} />
        {review && <><i className="rv-word-glow" style={{ top: cy - 86, left: 1150 }} /><div className="rv-note rvB-note">{REVEAL.note}</div><Answers cls="rvB-ans" /></>}
        {state === 'over' && <div className="rv-over rvB-over">Время вышло — разбор</div>}
      </S1Screen>
    )
  }
  // ── C: росток и луна
  const rs = review ? frames(idx, 50, 300, 1060, 1500, 34) : frames(idx, 50, state === 'p1' ? 600 : 640, 1020, 1380, 56)
  const cy = review ? 480 : 850
  const sprout = Math.min(2, ph)
  return (
    <S1Screen rects={[...rs, { x: 640, y: cy - 70, w: 840, h: 150 }]} n={showTimer ? n : null} rootRef={root} cls="rv rvC">
      {showTimer && <div className="rv-tm rvC-tm"><MoonTimer n={n} total={REVEAL.phases[ph].sec} size={250} /></div>}
      {(state === 'p2' || state === 'p3') && <div className="rv-ghost" />}
      <Frames idx={idx} rs={rs} />
      {!review && (
        <div className="rvC-sprout">
          <svg viewBox="0 0 220 300">
            <path className="st" d={sprout === 0 ? 'M110 300 C 108 270 112 250 110 236' : sprout === 1 ? 'M110 300 C 104 240 116 190 110 150' : 'M110 300 C 100 220 120 140 110 70'} />
            <g className="grow">
              {sprout >= 0 && <><path className="lf" d="M110 240 C 80 220 70 236 66 246 C 84 252 100 248 110 240 Z" /><path className="lf" d="M110 240 C 140 220 150 236 154 246 C 136 252 120 248 110 240 Z" /></>}
              {sprout >= 1 && <><path className="lf" d="M110 190 C 70 170 56 186 52 200 C 76 206 98 200 110 190 Z" /><path className="lf" d="M110 170 C 150 150 166 166 170 178 C 146 186 124 182 110 170 Z" /></>}
              {sprout >= 2 && <><ellipse className="lf" cx="110" cy="90" rx="62" ry="44" /><ellipse className="lf l2" cx="80" cy="110" rx="36" ry="26" /><ellipse className="lf l2" cx="142" cy="106" rx="36" ry="26" /></>}
            </g>
          </svg>
          <div className="rvC-cap">Фаза {ph + 1} из 3<b>{REVEAL.phases[ph].pts} {ph === 0 ? 'балла' : ph === 1 ? 'балл' : 'балла'}</b></div>
        </div>
      )}
      <Cells kind="cap" review={review} cy={cy} d={112} />
      {review && <><i className="rv-word-glow" style={{ top: cy - 90 }} /><div className="rv-note">{REVEAL.note}</div><Answers cls="rvC-ans" /></>}
      {state === 'over' && <div className="rv-over rvC-over">Время вышло — разбор</div>}
    </S1Screen>
  )
}
