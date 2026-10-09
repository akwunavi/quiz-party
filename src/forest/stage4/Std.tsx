// ═══ Этап 4 · Разборы обычных вопросов — общий рисунок лаборатории и игры ═══
// У каждого типа вопроса своё превращение леса:
//  · открытый ответ — слово прорастает по лозе буква за буквой и заканчивается цветком;
//  · варианты — неверные цветы закрываются и никнут, верный раскрывается золотом, свет бежит по земле к нему;
//  · фото — рама зацветает, под ней прорастает ответ;
//  · фото-варианты — неверные снимки зарастают листвой, верный зацветает.
// Справа — колонка «Ответы команд» (TeamStrip.tsx): до показа «• • •», потом текст, потом вердикт (как в HostScreen.ShowAnswers).
// Данные приходят пропсами (StdData): в лаборатории — тестовые (labs/forest/stdLab.tsx), в игре — настоящий вопрос
// (forest/stage4/ReviewGame.tsx). Куски таймлайна (вход, показ, ответы команд, вердикт) — общие: лаборатория
// собирает их в один перематываемый таймлайн, игра запускает по настоящим событиям (показ ответа, проверка).
import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { S1Screen } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { makeFrames, type FRect } from '../stage1/mediaFrames'
import { TeamCol, type TeamPhase, type TeamRow } from './TeamStrip'
import { fitFs, type ColLay } from './teamLayout'

export type FS = { grow: number[]; reveal: number[]; bloom: number[]; pulse: number }
export const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

/** Рамы из ветвей (утверждённая техника Концепта C) на холсте под содержимым */
export function FrameLayer({ rects, srcs, fs, panel }: { rects: FRect[]; srcs: string[]; fs: FS; panel?: number }) {
  const cv = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = cv.current!.getContext('2d')!, draw0 = makeFrames({ rects, srcs, panel }, 40)
    const draw = () => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, 1920, 1080); draw0(ctx, fs) }
    gsap.ticker.add(draw); return () => gsap.ticker.remove(draw)
  }, [rects, srcs, fs, panel])
  return <canvas ref={cv} className="s4-cv" width={1920} height={1080} aria-hidden />
}
export function fitRect(im: { w: number; h: number }, cx: number, y: number, maxW: number, maxH: number): FRect {
  const k = Math.min(maxW / im.w, maxH / im.h), w = Math.round(im.w * k), h = Math.round(im.h * k)
  return { x: Math.round(cx - w / 2), y, w, h }
}

export type StdKind = 'text' | 'mc' | 'img' | 'imgopt'
/** фото разбора; video — место под скрытое видео вопроса (рама вокруг, само видео кладёт игра поверх) */
export type Photo = { src: string; w: number; h: number; video?: boolean }
export type StdData = {
  kind: StdKind
  /** шапка: название раунда, номер вопроса */
  title: string; qn: number; qcount: number
  /** текст вопроса (напоминание сверху) */
  question: string
  /** правильный ответ словами (открытый ответ, фото) */
  answer: string
  /** варианты (text: 'mc') */
  options: { key: string; text: string }[]
  /** индекс верного варианта / верного фото; −1 — неизвестен */
  correct: number
  /** фото ('img' — снимки ответа; 'imgopt' — фото-варианты) */
  photos: Photo[]
  /** буквы фото-вариантов */
  keys: string[]
  /** подпись верного фото-варианта («Ответ: Г — …») */
  caption: string
  /** пояснение к ответу (answer_note) — после проверки */
  note?: string
}
export const STD_CLS: Record<StdKind, string> = { text: 'revtext', mc: 'revmc', img: 'revimg', imgopt: 'revimgopt' }

// ── раскладка (чистая) ──
const RECALL = { left: 70, top: 84, width: 1160 }
/** кегль напоминания вопроса: 40 (до трёх строк, как в лаборатории), дальше мельче — низ не ниже ~265 */
export function recallFs(text: string): number {
  const fit = (fs: number, lines: number) => Math.ceil((Math.max(1, text.length) * 0.5 * fs) / RECALL.width) <= lines
  for (const [fs, lines] of [[40, 3], [34, 4], [30, 5]] as const) if (fit(fs, lines)) return fs
  return 26
}
export const recallBottom = (text: string, fs = recallFs(text)) => RECALL.top + Math.ceil((Math.max(1, text.length) * 0.5 * fs) / RECALL.width) * fs * 1.14
/** Правильный ответ крупными буквами: кегль и число строк (перенос — по словам), чтобы влезть в ширину и высоту. */
export function fitAnswer(answer: string, width: number, base: number, maxH: number, min = 40): { fs: number; lines: number } {
  const words = answer.toUpperCase().split(/\s+/).filter(Boolean)
  for (let fs = base; fs >= min; fs -= 2) {
    const lw = (w: string) => w.length * (0.66 * fs + 6)
    if (words.some(w => lw(w) > width)) continue
    let lines = 1, cur = 0
    for (const w of words) { const add = (cur ? 0.35 * fs : 0) + lw(w); if (cur && cur + add > width) { lines++; cur = lw(w) } else cur += add }
    if (lines * fs <= maxH) return { fs, lines }
  }
  return { fs: min, lines: 3 }
}

export type StdLayout = ReturnType<typeof stdLayout>
/** Раскладка разбора. dx — сдвиг всего содержимого вправо (бумажная игра: колонки команд нет — разбор по центру). */
export function stdLayout(d: StdData, dx = 0) {
  const rFs = recallFs(d.question), rBot = recallBottom(d.question, rFs)
  const top = Math.max(190, Math.round(rBot + 22))
  let rects: FRect[] = [], srcs: string[] = []
  if (d.kind === 'img' && d.photos.length) {
    const ph = d.photos.slice(0, 4), maxH = 710 - top
    if (ph.length === 1) rects = [fitRect(ph[0], 650 + dx, top, 900, maxH)]
    else {
      const gap = 40, sum = ph.reduce((a, p) => a + p.w / p.h, 0)
      const h = Math.round(Math.min(maxH, (1160 - gap * (ph.length - 1)) / sum))
      const ws = ph.map(p => Math.round((p.w / p.h) * h)), tot = ws.reduce((a, b) => a + b, 0) + gap * (ph.length - 1)
      let x = Math.round(650 + dx - tot / 2)
      rects = ws.map(w => { const r = { x, y: top, w, h }; x += w + gap; return r })
    }
    srcs = ph.map(p => (p.video ? BLANK : p.src))
  }
  if (d.kind === 'imgopt' && d.photos.length) {
    const n = d.photos.length, cols = n <= 3 ? n : n === 4 ? 2 : 3, rows = Math.ceil(n / cols)
    const cellW = 1200 / cols, cellH = (890 - top + 40) / rows
    rects = d.photos.map((im, i) => fitRect(im, 60 + dx + cellW * ((i % cols) + 0.5), Math.round(top + Math.floor(i / cols) * cellH), cellW - 80, Math.min(520, cellH - 40)))
    srcs = d.photos.map(p => p.src)
  }
  const n = Math.max(1, d.options.length), step = 1160 / n
  const ans = d.kind === 'img' ? fitAnswer(d.answer, 1160, 104, 150) : fitAnswer(d.answer, 1160, 150, 250)
  return {
    dx, recallFs: rFs, frame: { rects, srcs },
    ans, ansBase: d.kind === 'img' ? 104 : 150,
    /** варианты: центр цветка, ширина подписи, масштаб цветка */
    cx: (i: number) => 70 + dx + step * (i + 0.5),
    optW: Math.min(270, Math.round(step - 20)), flower: Math.min(1, step / 290),
    // один кегль на все подписи вариантов (по самой длинной) — разный кегль у соседей выглядит случайностью
    optFs: Math.min(32, ...d.options.map(o => fitFs(o.text, Math.min(270, Math.round(step - 20)), 32, 3, 20, 0.56))),
    noteTop: d.kind === 'text' ? 730 : d.kind === 'mc' ? 900 : 992,
  }
}

// ── куски таймлайна (общие для лаборатории и игры) ──
type Q = (s: string) => Element[]
/** вход разбора: вопрос сверху */
export function stdEnterTl(tl: gsap.core.Timeline, q: Q) {
  tl.fromTo(q('.s4-recall'), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
}
/** колонка команд: ряды появляются с «• • •» */
export function teamEnterTl(tl: gsap.core.Timeline, q: Q) {
  tl.fromTo(q('.s4-th, .s4-ta'), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.07 }, 0.3)
    .fromTo(q('.s4-ta .txt, .s4-ta .mk'), { opacity: 0 }, { opacity: 0, duration: 0.01 }, 0.3)
}
/** ответы команд проступают вместе с показом */
export function teamShowTl(tl: gsap.core.Timeline, q: Q, show: number) {
  tl.to(q('.s4-ta .dots'), { opacity: 0, duration: 0.3, stagger: 0.06 }, show)
    .fromTo(q('.s4-ta .txt'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 }, show)
}
/** вердикт */
export function teamMarkTl(tl: gsap.core.Timeline, q: Q, mark: number, stagger = 0.2) {
  tl.fromTo(q('.s4-ta .mk'), { opacity: 0, scale: 0, rotation: -40 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, stagger, ease: 'back.out(2.4)' }, mark)
}
/** Тайминг показа: R — начало, k — шаг букв, lt — старт букв (фото). Лаборатория — утверждённые числа; игра — быстрее,
 *  чтобы ответ целиком стоял на экране к моменту проверки ShowAnswers (revealDoneMs + 600 мс). */
export type StdTiming = { R: number; k: number; lt?: number }
export const letterCount = (s: string) => s.replace(/\s/g, '').length
/** показ правильного ответа; возвращает моменты «ответы команд» (show) и «вердикт» (mark) */
export function stdRevealTl(tl: gsap.core.Timeline, q: Q, d: StdData, fs: FS, t: StdTiming, appear = false): { show: number; mark: number } {
  const { R, k } = t, len = letterCount(d.answer)
  if (d.kind === 'text') {
    tl.fromTo(q('.s4-lab'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, R - 0.4)
      .fromTo(q('.s4-vine-light'), { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: len * k + 0.5, ease: 'none' }, R)
      .fromTo(q('.s4-ans .l'), { opacity: 0, scale: 0.25, y: 34 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: k, ease: 'back.out(2)' }, R + 0.1)
      .fromTo(q('.s4-glow'), { opacity: 0 }, { opacity: 1, duration: 1.2 }, R + 0.6)
      .fromTo(q('.s4-fl'), { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, svgOrigin: '0 0', duration: 0.8, ease: 'back.out(2)' }, R + len * k + 0.3)
    return { show: R + 0.9, mark: R + len * k + 1.2 }
  }
  if (d.kind === 'mc') {
    const ci = d.correct
    d.options.forEach((_, i) => {
      if (i === ci) tl.fromTo(q(`.s4-mf[data-i="${i}"]`), { scale: 1 }, { scale: 1.25, svgOrigin: '0 0', duration: 0.9, ease: 'back.out(2)' }, R + 0.9)
        .fromTo(q(`.s4-mf[data-i="${i}"] .pt`), { fill: '#c9b6ff' }, { fill: '#ffd986', duration: 0.9 }, R + 0.9)
        .fromTo(q(`.s4-halo[data-i="${i}"]`), { opacity: 0, attr: { r: 36 } }, { opacity: 1, attr: { r: 124 }, duration: 0.9, ease: 'power2.out' }, R + 0.9)
        .fromTo(q(`.s4-opt[data-i="${i}"]`), { color: '#f4fff9' }, { color: '#ffe2a0', duration: 0.6 }, R + 1.0)
      else if (ci >= 0) tl.to(q(`.s4-mf[data-i="${i}"]`), { scale: 0.62, rotation: i % 2 ? -16 : 16, svgOrigin: '0 0', duration: 1.0, ease: 'power2.inOut' }, R + 0.2 + i * 0.1)
        .to(q(`.s4-mf[data-i="${i}"] .pt`), { fill: '#5d5a7a', duration: 1.0 }, R + 0.2 + i * 0.1)
        .to(q(`.s4-opt[data-i="${i}"]`), { opacity: 0.45, duration: 0.8 }, R + 0.3 + i * 0.1)
    })
    tl.fromTo(q('.s4-gl'), { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.3, ease: 'power1.in' }, R)
    return { show: R + 0.9, mark: R + 2.3 }
  }
  if (d.kind === 'img') {
    const lt = t.lt ?? R + 1.1, idx = fs.bloom.map((_, i) => i)
    const obj = (v: number) => Object.fromEntries(idx.map(i => [i, v]))
    if (appear && idx.length) tl.fromTo(fs.grow, obj(0), { ...obj(1), duration: 0.6, ease: 'power2.out' }, R).fromTo(fs.reveal, obj(0), { ...obj(1), duration: 0.6, ease: 'power2.inOut' }, R + 0.2)
    tl.fromTo(fs, { pulse: 0 }, { pulse: 1.15, duration: 1.3, ease: 'power1.inOut' }, R)
    if (idx.length) tl.fromTo(fs.bloom, obj(0), { ...obj(1), duration: 1.4, ease: 'power1.out' }, R + 0.6)
    tl.fromTo(q('.s4-lab'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, lt - 0.3)
      .fromTo(q('.s4-vine-light'), { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: len * k + 0.5, ease: 'none' }, lt - 0.1)
      .fromTo(q('.s4-ans .l'), { opacity: 0, scale: 0.25, y: 34 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: k, ease: 'back.out(2)' }, lt)
      .fromTo(q('.s4-glow'), { opacity: 0 }, { opacity: 1, duration: 1.0 }, lt + 0.3)
    return { show: lt + 0.5, mark: lt + 1.9 }
  }
  const ci = d.correct
  d.photos.forEach((_, i) => {
    if (i === ci) tl.fromTo(fs.bloom, { [i]: 0 }, { [i]: 1, duration: 1.4, ease: 'power1.out' }, R + 0.8)
    else if (ci >= 0) tl.fromTo(fs.reveal, { [i]: 1 }, { [i]: 0, duration: 1.1, ease: 'power2.in' }, R + 0.2 + i * 0.12)
  })
  tl.fromTo(fs, { pulse: 0 }, { pulse: 1.15, duration: 1.3, ease: 'power1.inOut' }, R + 0.5)
    .fromTo(q('.s4-capt'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, R + 1.8)
  return { show: R + 1.4, mark: R + 2.8 }
}

const flowerSvg = (n: number, rx: number, ry: number, cy: number) => Array.from({ length: n }, (_, k) => <g key={k} transform={`rotate(${(k * 360) / n})`}><ellipse className="pt" cx="0" cy={cy} rx={rx} ry={ry} /></g>)
/** буквы ответа: одно слово — как в лаборатории (буквы подряд), несколько — словами с переносом */
function answerLetters(answer: string) {
  const words = answer.toUpperCase().split(/\s+/).filter(Boolean)
  if (words.length <= 1) return (words[0] ?? '').split('').map((ch, i) => <span key={i} className="l">{ch}</span>)
  return words.map((w, wi) => <span key={wi} className="wd">{w.split('').map((ch, i) => <span key={i} className="l">{ch}</span>)}</span>)
}

/** Сцена разбора. shown — правильный ответ на экране (до показа его нет и в разметке); rows — null: колонки нет. */
export function StdScene({ d, ly, fs, rows, phase = 'all', judged = true, colLay, count, shown = true, n = null, rootRef, cls = '', video }: {
  d: StdData; ly: StdLayout; fs: FS
  rows: TeamRow[] | null; phase?: TeamPhase; judged?: boolean; colLay?: ColLay; count?: string
  shown?: boolean; n?: number | null
  rootRef: React.RefObject<HTMLDivElement>; cls?: string
  /** скрытое видео вопроса (игра) — кладётся в раму места video */
  video?: ReactNode
}) {
  const { dx } = ly, X = (x: number) => x + dx
  const rects: Rect[] = [{ x: X(40), y: 80, w: 1220, h: 900 }, ...(rows ? [{ x: 1270, y: 90, w: 620, h: 860 }] : [])]
  const recallSt = ly.recallFs !== 40 ? { fontSize: ly.recallFs, left: X(70) } : dx ? { left: X(70) } : undefined
  const ansSt = (top: number) => ({ left: X(70), width: 1160, top, ...(ly.ans.fs !== ly.ansBase ? { fontSize: ly.ans.fs } : {}) })
  const wrap = d.answer.trim().includes(' ') ? ' wrap' : ''
  const ci = d.correct
  const vIdx = d.kind === 'img' ? d.photos.findIndex(p => p.video) : -1
  const vr = vIdx >= 0 ? ly.frame.rects[vIdx] : null
  return (
    <S1Screen rects={rects} n={n} rootRef={rootRef} cls={`s3 s4 st-${STD_CLS[d.kind]}${cls}`}>
      <div className="s3-head"><b>{d.title}</b><span>разбор · вопрос {d.qn} / {d.qcount}</span></div>
      {ly.frame.rects.length > 0 && <FrameLayer rects={ly.frame.rects} srcs={ly.frame.srcs} fs={fs} />}
      {d.kind === 'text' && <>
        <div className="s4-recall" style={recallSt}>{d.question}</div>
        {shown && <>
          <i className="s4-glow" style={{ left: X(120), top: 330, width: 1060, height: 340 }} />
          <div className="s4-lab" style={{ left: X(70), width: 1160, top: 300 }}>Правильный ответ</div>
          <div className={`s4-ans${wrap}`} style={ansSt(350)}>{answerLetters(d.answer)}</div>
          <svg className="s4-svg" viewBox="0 0 1920 1080" aria-hidden>
            <path className="s4-vine" d={`M ${X(250)} 650 C ${X(380)} 690 ${X(520)} 620 ${X(650)} 660 S ${X(920)} 690 ${X(1020)} 640`} />
            <path className="s4-vine-light" d={`M ${X(250)} 650 C ${X(380)} 690 ${X(520)} 620 ${X(650)} 660 S ${X(920)} 690 ${X(1020)} 640`} />
            <g transform={`translate(${X(1100)} 636)`}><g className="s4-fl">{flowerSvg(8, 13, 26, -30)}<circle r="12" className="ct" /></g></g>
          </svg>
        </>}
      </>}
      {d.kind === 'mc' && <>
        <div className="s4-recall" style={recallSt}>{d.question}</div>
        <svg className="s4-svg" viewBox="0 0 1920 1080" aria-hidden>
          <path className="s4-ground" d={`M ${X(70)} 700 C ${X(400)} 690 ${X(800)} 712 ${X(1230)} 696`} />
          {shown && ci >= 0 && <path className="s4-gl" d={`M ${X(70)} 700 C ${X(300)} 692 ${ly.cx(ci) - 200} 706 ${ly.cx(ci)} 700`} />}
          {d.options.map((o, i) => <g key={o.key} transform={`translate(${ly.cx(i)} 520)${ly.flower < 1 ? ` scale(${ly.flower.toFixed(3)})` : ''}`}>
            <path className="s4-stem" d="M 0 60 C -10 110 10 150 0 180" />
            <circle className="s4-halo" data-i={i} r="124" />
            <g className="s4-mf" data-i={i}>{flowerSvg(8, 22, 44, -52)}<circle r="34" className="ct" /></g>
          </g>)}
        </svg>
        {d.options.map((o, i) => <div key={o.key} className="s4-opt" data-i={i} style={{ left: ly.cx(i) - ly.optW / 2, top: 730, ...(ly.optW !== 270 ? { width: ly.optW } : {}), ...(ly.optFs !== 32 ? { fontSize: ly.optFs } : {}) }}><b>{o.key}</b><span>{o.text}</span></div>)}
        {d.options.map((o, i) => <b key={o.key} className="s4-key" style={{ left: ly.cx(i) - 24, top: 496 }}>{o.key}</b>)}
      </>}
      {d.kind === 'img' && <>
        <div className="s4-recall" style={recallSt}>{d.question}</div>
        {shown && <>
          <i className="s4-glow" style={{ left: X(120), top: 760, width: 1060, height: 240 }} />
          <div className="s4-lab" style={{ left: X(70), width: 1160, top: 744 }}>Правильный ответ</div>
          <div className={`s4-ans sm${wrap}`} style={ansSt(780)}>{answerLetters(d.answer)}</div>
          <svg className="s4-svg" viewBox="0 0 1920 1080" aria-hidden>
            <path className="s4-vine" d={`M ${X(330)} 944 C ${X(440)} 970 ${X(520)} 920 ${X(650)} 950 S ${X(860)} 972 ${X(970)} 936`} />
            <path className="s4-vine-light" d={`M ${X(330)} 944 C ${X(440)} 970 ${X(520)} 920 ${X(650)} 950 S ${X(860)} 972 ${X(970)} 936`} />
          </svg>
        </>}
      </>}
      {d.kind === 'imgopt' && <>
        <div className="s4-recall" style={recallSt}>{d.question}</div>
        {ly.frame.rects.map((r, i) => <b key={i} className="s4-pk" style={{ left: r.x - 6, top: r.y - 6 }}>{d.keys[i]}</b>)}
        {shown && ci >= 0 && <div className="s4-capt" style={dx ? { left: X(70) } : undefined}>Ответ: <b>{d.keys[ci]}</b>{d.caption ? ` — ${d.caption}` : ''}</div>}
      </>}
      {rows && <TeamCol rows={rows} phase={phase} judged={judged} lay={colLay} count={count} />}
      {vr && video && <div className="s4-vid" style={{ left: vr.x, top: vr.y, width: vr.w, height: vr.h }}>{video}</div>}
      {judged && shown && d.note && <div className="s4-note" style={{ left: X(70), top: ly.noteTop }}>{d.note}</div>}
    </S1Screen>
  )
}
