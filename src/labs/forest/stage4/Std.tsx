// ═══ Этап 4 · Обычные вопросы и разборы ответов ═══
// Вопросы с фото и с вариантами утверждены (раздел «Вопросы с фото») и здесь не пересоздаются. Добавлено то, чего
// не хватало: вопрос ТОЛЬКО ТЕКСТОМ (без картинок и вариантов) и четыре разбора, у каждого — своё превращение леса:
//  · открытый ответ — слово прорастает по лозе буква за буквой и заканчивается цветком;
//  · варианты — неверные цветы закрываются и никнут, верный раскрывается золотом, свет бежит по земле к нему;
//  · фото — рама зацветает, под ней прорастает ответ;
//  · фото-варианты — неверные снимки зарастают листвой, верный зацветает.
// Справа везде — колонка «Ответы команд»: до показа «• • •», потом текст, потом вердикт (как в HostScreen.ShowAnswers).
import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { makeFrames, type FRect } from '../stage1/mediaFrames'
import { Timer, timer3 } from '../stage3/common3'
import { MCQ, PHOTO, PHOTOS4, ROUND4, TEAM_ROWS, TXT, type TRow } from './data'

export const STD_STATES = [
  { id: 'text', name: 'Вопрос: только текст' },
  { id: 'textlong', name: 'Вопрос: длинный текст' },
  { id: 'revtext', name: 'Разбор: открытый ответ' },
  { id: 'revmc', name: 'Разбор: варианты с текстом' },
  { id: 'revimg', name: 'Разбор: ответ по фото' },
  { id: 'revimgopt', name: 'Разбор: фото-варианты' },
]
export const STD_VARIANTS = [
  { id: 'A', name: 'Обычные вопросы и разборы', note: 'Вопрос только текстом — в живой раме из ветвей, листва расходится и открывает текст. Разборы (у каждого типа вопроса своё превращение): открытый ответ прорастает по лозе буква за буквой и заканчивается цветком; у вариантов неверные цветы закрываются и никнут, верный раскрывается золотом; у вопроса по фото рама зацветает; у фото-вариантов неверные снимки зарастают листвой. Справа — «Ответы команд»: до показа «• • •», затем текст, затем ✓ / ✗ (команда без ответа — «—»).' },
]

type FS = { grow: number[]; reveal: number[]; bloom: number[]; pulse: number }
const LEAF = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

/** Рамы из ветвей (утверждённая техника Концепта C) на холсте под содержимым */
function FrameLayer({ rects, srcs, fs, panel }: { rects: FRect[]; srcs: string[]; fs: FS; panel?: number }) {
  const cv = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = cv.current!.getContext('2d')!, draw0 = makeFrames({ rects, srcs, panel }, 40)
    const draw = () => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, 1920, 1080); draw0(ctx, fs) }
    gsap.ticker.add(draw); return () => gsap.ticker.remove(draw)
  }, [rects, srcs, fs, panel])
  return <canvas ref={cv} className="s4-cv" width={1920} height={1080} aria-hidden />
}
function fitRect(im: { w: number; h: number }, cx: number, y: number, maxW: number, maxH: number): FRect {
  const k = Math.min(maxW / im.w, maxH / im.h), w = Math.round(im.w * k), h = Math.round(im.h * k)
  return { x: Math.round(cx - w / 2), y, w, h }
}

function TeamCol({ rows }: { rows: TRow[] }) {
  return <div className="s4-teams">
    <div className="s4-th">Ответы команд</div>
    {TEAM_ROWS.map((t, i) => { const r = rows[i]; return <div key={i} className={`s4-ta ${r.ok === true ? 'ok' : r.ok === false ? 'no' : 'nil'}`} data-i={i}>
      <svg className="s4-ta-bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={LEAF} /></svg>
      <span className="nm" style={{ color: t.color }}>{t.name}</span>
      <span className="dots">• • •</span><span className="txt">{r.text ?? 'не ответили'}</span>
      <i className="mk">{r.ok === true ? '✓' : r.ok === false ? '✗' : '—'}</i>
    </div> })}
  </div>
}
const sizeFor = (s: string, a = 68, b = 54, c = 44) => (s.length <= 100 ? a : s.length <= 200 ? b : c)
const head4 = (rev: boolean) => <div className="s3-head"><b>{ROUND4.name}</b><span>{rev ? 'разбор · ' : ''}вопрос {ROUND4.qn} / {ROUND4.qcount}</span></div>

/** общие для разборов твины колонки команд: ряды появляются с «• • •», ответ — вместе с показом, вердикт — после */
function teamTl(tl: gsap.core.Timeline, q: (s: string) => Element[], show: number, mark: number) {
  tl.fromTo(q('.s4-th, .s4-ta'), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.07 }, 0.3)
    .fromTo(q('.s4-ta .txt, .s4-ta .mk'), { opacity: 0 }, { opacity: 0, duration: 0.01 }, 0.3)
    .to(q('.s4-ta .dots'), { opacity: 0, duration: 0.3, stagger: 0.06 }, show)
    .fromTo(q('.s4-ta .txt'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 }, show)
    .fromTo(q('.s4-ta .mk'), { opacity: 0, scale: 0, rotation: -40 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, stagger: 0.2, ease: 'back.out(2.4)' }, mark)
}
const flowerSvg = (n: number, rx: number, ry: number, cy: number) => Array.from({ length: n }, (_, k) => <g key={k} transform={`rotate(${(k * 360) / n})`}><ellipse className="pt" cx="0" cy={cy} rx={rx} ry={ry} /></g>)

export function Std({ state, nOv, onReady }: S1Props) {
  const rev = state.startsWith('rev'), q4 = !rev
  const long = state === 'textlong'
  const frame = useMemo<{ rects: FRect[]; srcs: string[] }>(() => {
    if (state === 'text' || state === 'textlong') return { rects: [{ x: 430, y: 190, w: 1260, h: 500 }], srcs: [BLANK] }
    if (state === 'revimg') return { rects: [fitRect(PHOTO.img, 650, 190, 900, 520)], srcs: [PHOTO.img.src] }
    if (state === 'revimgopt') return { rects: PHOTOS4.imgs.map((im, i) => fitRect(im, i % 2 ? 960 : 360, i < 2 ? 190 : 560, 520, 330)), srcs: PHOTOS4.imgs.map(i => i.src) }
    return { rects: [], srcs: [] }
  }, [state])
  const fs = useMemo<FS>(() => {
    const k = frame.rects.length
    return { grow: Array(k).fill(rev ? 1 : 0), reveal: Array(k).fill(rev ? 1 : 0), bloom: Array(k).fill(0), pulse: 0 }
  }, [frame, rev])
  const tm = q4 ? timer3('question', ROUND4.timer) : null
  const word = TXT.answer.toUpperCase().split('')
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (q4) {
      tl.fromTo(fs.grow, { 0: 0 }, { 0: 1, duration: 1.1, ease: 'power2.inOut' }, 0.1)
        .fromTo(fs.reveal, { 0: 0 }, { 0: 1, duration: 0.95, ease: 'power2.inOut' }, 1.1)
        .fromTo(fs, { pulse: 0 }, { pulse: 1.15, duration: 1.1, ease: 'power1.inOut' }, 0.1)
        .fromTo(q('.s4-qtext .w'), { opacity: 0, y: 16, rotation: -3 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: Math.min(0.05, 1.2 / (long ? TXT.long : TXT.q).split(' ').length), ease: 'back.out(1.5)' }, 1.7)
        .fromTo(q('.s4-qno'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 2.4)
      return
    }
    tl.fromTo(q('.s4-recall'), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
    if (state === 'revtext') {
      const R = 1.4, k = 0.14
      tl.fromTo(q('.s4-lab'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, R - 0.4)
        .fromTo(q('.s4-vine-light'), { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: word.length * k + 0.5, ease: 'none' }, R)
        .fromTo(q('.s4-ans .l'), { opacity: 0, scale: 0.25, y: 34 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: k, ease: 'back.out(2)' }, R + 0.1)
        .fromTo(q('.s4-glow'), { opacity: 0 }, { opacity: 1, duration: 1.2 }, R + 0.6)
        .fromTo(q('.s4-fl'), { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, svgOrigin: '0 0', duration: 0.8, ease: 'back.out(2)' }, R + word.length * k + 0.3)
      teamTl(tl, q, R + 0.9, R + word.length * k + 1.2)
    }
    if (state === 'revmc') {
      const R = 1.2, ci = MCQ.options.findIndex(o => o.key === MCQ.correct)
      MCQ.options.forEach((_, i) => {
        if (i === ci) tl.fromTo(q(`.s4-mf[data-i="${i}"]`), { scale: 1 }, { scale: 1.25, svgOrigin: '0 0', duration: 0.9, ease: 'back.out(2)' }, R + 0.9)
          .fromTo(q(`.s4-mf[data-i="${i}"] .pt`), { fill: '#c9b6ff' }, { fill: '#ffd986', duration: 0.9 }, R + 0.9)
          .fromTo(q(`.s4-halo[data-i="${i}"]`), { opacity: 0, attr: { r: 36 } }, { opacity: 1, attr: { r: 124 }, duration: 0.9, ease: 'power2.out' }, R + 0.9)
          .fromTo(q(`.s4-opt[data-i="${i}"]`), { color: '#f4fff9' }, { color: '#ffe2a0', duration: 0.6 }, R + 1.0)
        else tl.to(q(`.s4-mf[data-i="${i}"]`), { scale: 0.62, rotation: i % 2 ? -16 : 16, svgOrigin: '0 0', duration: 1.0, ease: 'power2.inOut' }, R + 0.2 + i * 0.1)
          .to(q(`.s4-mf[data-i="${i}"] .pt`), { fill: '#5d5a7a', duration: 1.0 }, R + 0.2 + i * 0.1)
          .to(q(`.s4-opt[data-i="${i}"]`), { opacity: 0.45, duration: 0.8 }, R + 0.3 + i * 0.1)
      })
      tl.fromTo(q('.s4-gl'), { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.3, ease: 'power1.in' }, R)
      teamTl(tl, q, R + 0.9, R + 2.3)
    }
    if (state === 'revimg') {
      const R = 1.2
      tl.fromTo(fs, { pulse: 0 }, { pulse: 1.15, duration: 1.3, ease: 'power1.inOut' }, R)
        .fromTo(fs.bloom, { 0: 0 }, { 0: 1, duration: 1.4, ease: 'power1.out' }, R + 0.6)
        .fromTo(q('.s4-lab'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, R + 0.8)
        .fromTo(q('.s4-vine-light'), { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: PHOTO.answer.length * 0.14 + 0.5, ease: 'none' }, R + 1.0)
        .fromTo(q('.s4-ans .l'), { opacity: 0, scale: 0.25, y: 34 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.14, ease: 'back.out(2)' }, R + 1.1)
        .fromTo(q('.s4-glow'), { opacity: 0 }, { opacity: 1, duration: 1.0 }, R + 1.4)
      teamTl(tl, q, R + 1.6, R + 3.0)
    }
    if (state === 'revimgopt') {
      const R = 1.2, ci = PHOTOS4.correct
      PHOTOS4.imgs.forEach((_, i) => {
        if (i === ci) tl.fromTo(fs.bloom, { [i]: 0 }, { [i]: 1, duration: 1.4, ease: 'power1.out' }, R + 0.8)
        else tl.fromTo(fs.reveal, { [i]: 1 }, { [i]: 0, duration: 1.1, ease: 'power2.in' }, R + 0.2 + i * 0.12)
      })
      tl.fromTo(fs, { pulse: 0 }, { pulse: 1.15, duration: 1.3, ease: 'power1.inOut' }, R + 0.5)
        .fromTo(q('.s4-capt'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, R + 1.8)
      teamTl(tl, q, R + 1.4, R + 2.8)
    }
  }, tm, [state, fs])
  const n = nOv ?? (tm ? nLive : null)
  const rects: Rect[] = rev ? [{ x: 40, y: 80, w: 1220, h: 900 }, { x: 1270, y: 90, w: 620, h: 860 }] : [{ x: 400, y: 160, w: 1320, h: 560 }]
  const text = long ? TXT.long : TXT.q
  const cx = (i: number) => 215 + i * 290
  return (
    <S1Screen rects={rects} n={n} rootRef={root} cls={`s3 s4 st-${state}`}>
      {head4(rev)}
      {frame.rects.length > 0 && <FrameLayer rects={frame.rects} srcs={frame.srcs} fs={fs} panel={q4 ? 0.42 : undefined} />}
      {q4 && <>
        <div className="s4-qtext" style={{ left: 470, top: 230, width: 1180, height: 420, fontSize: sizeFor(text) }}>
          <span>{text.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}</span>
        </div>
        <div className="s4-qno">{ROUND4.name} · вопрос {ROUND4.qn} из {ROUND4.qcount}</div>
        <Timer n={n} total={ROUND4.timer} />
      </>}
      {state === 'revtext' && <>
        <div className="s4-recall">{TXT.q}</div>
        <i className="s4-glow" style={{ left: 120, top: 330, width: 1060, height: 340 }} />
        <div className="s4-lab" style={{ left: 70, width: 1160, top: 300 }}>Правильный ответ</div>
        <div className="s4-ans" style={{ left: 70, width: 1160, top: 350 }}>{word.map((ch, i) => <span key={i} className="l">{ch}</span>)}</div>
        <svg className="s4-svg" viewBox="0 0 1920 1080" aria-hidden>
          <path className="s4-vine" d="M 250 650 C 380 690 520 620 650 660 S 920 690 1020 640" />
          <path className="s4-vine-light" d="M 250 650 C 380 690 520 620 650 660 S 920 690 1020 640" />
          <g transform="translate(1100 636)"><g className="s4-fl">{flowerSvg(8, 13, 26, -30)}<circle r="12" className="ct" /></g></g>
        </svg>
        <TeamCol rows={TXT.teams} />
      </>}
      {state === 'revmc' && <>
        <div className="s4-recall">{MCQ.q}</div>
        <svg className="s4-svg" viewBox="0 0 1920 1080" aria-hidden>
          <path className="s4-ground" d="M 70 700 C 400 690 800 712 1230 696" />
          <path className="s4-gl" d={`M 70 700 C 300 692 ${cx(MCQ.options.findIndex(o => o.key === MCQ.correct)) - 200} 706 ${cx(MCQ.options.findIndex(o => o.key === MCQ.correct))} 700`} />
          {MCQ.options.map((o, i) => <g key={o.key} transform={`translate(${cx(i)} 520)`}>
            <path className="s4-stem" d="M 0 60 C -10 110 10 150 0 180" />
            <circle className="s4-halo" data-i={i} r="124" />
            <g className="s4-mf" data-i={i}>{flowerSvg(8, 22, 44, -52)}<circle r="34" className="ct" /></g>
          </g>)}
        </svg>
        {MCQ.options.map((o, i) => <div key={o.key} className="s4-opt" data-i={i} style={{ left: cx(i) - 135, top: 730 }}><b>{o.key}</b><span>{o.text}</span></div>)}
        {MCQ.options.map((o, i) => <b key={o.key} className="s4-key" style={{ left: cx(i) - 24, top: 496 }}>{o.key}</b>)}
        <TeamCol rows={MCQ.teams} />
      </>}
      {state === 'revimg' && <>
        <div className="s4-recall">{PHOTO.q}</div>
        <i className="s4-glow" style={{ left: 120, top: 760, width: 1060, height: 240 }} />
        <div className="s4-lab" style={{ left: 70, width: 1160, top: 744 }}>Правильный ответ</div>
        <div className="s4-ans sm" style={{ left: 70, width: 1160, top: 780 }}>{PHOTO.answer.toUpperCase().split('').map((ch, i) => <span key={i} className="l">{ch}</span>)}</div>
        <svg className="s4-svg" viewBox="0 0 1920 1080" aria-hidden>
          <path className="s4-vine" d="M 330 944 C 440 970 520 920 650 950 S 860 972 970 936" />
          <path className="s4-vine-light" d="M 330 944 C 440 970 520 920 650 950 S 860 972 970 936" />
        </svg>
        <TeamCol rows={PHOTO.teams} />
      </>}
      {state === 'revimgopt' && <>
        <div className="s4-recall">{PHOTOS4.q}</div>
        {frame.rects.map((r, i) => <b key={i} className="s4-pk" style={{ left: r.x - 6, top: r.y - 6 }}>{PHOTOS4.keys[i]}</b>)}
        <div className="s4-capt">Ответ: <b>{PHOTOS4.keys[PHOTOS4.correct]}</b> — {PHOTOS4.imgs[PHOTOS4.correct].caption}</div>
        <TeamCol rows={PHOTOS4.teams} />
      </>}
    </S1Screen>
  )
}
