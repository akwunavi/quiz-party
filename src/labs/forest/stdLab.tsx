// ═══ Лаборатория: этап 4 · Обычные вопросы и разборы ═══
// Рисунок разборов и куски таймлайна — общие с игрой (forest/stage4/Std.tsx); здесь тестовые вопросы вечера
// (forest/stage4/data.ts) и сборка всего показа в один перематываемый таймлайн. Вопрос «только текстом» — экран лаборатории.
import { useMemo } from 'react'
import { S1Screen, useEntrance, type S1Props } from '../../forest/stage1/common'
import type { Rect } from '../../forest/stage1/env'
import { Timer, timer3 } from '../../forest/stage3/common3'
import { BLANK, FrameLayer, StdScene, stdEnterTl, stdLayout, stdRevealTl, teamEnterTl, teamMarkTl, teamShowTl, type FS, type StdData } from '../../forest/stage4/Std'
import { MCQ, PHOTO, PHOTOS4, ROUND4, TXT, labRows } from '../../forest/stage4/data'

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

const sizeFor = (s: string, a = 68, b = 54, c = 44) => (s.length <= 100 ? a : s.length <= 200 ? b : c)
const head4 = (rev: boolean) => <div className="s3-head"><b>{ROUND4.name}</b><span>{rev ? 'разбор · ' : ''}вопрос {ROUND4.qn} / {ROUND4.qcount}</span></div>

const base = { title: ROUND4.name, qn: ROUND4.qn, qcount: ROUND4.qcount, options: [], correct: -1, photos: [], keys: [], caption: '', answer: '' }
function dataOf(state: string): StdData {
  if (state === 'revmc') return { ...base, kind: 'mc', question: MCQ.q, options: MCQ.options, correct: MCQ.options.findIndex(o => o.key === MCQ.correct) }
  if (state === 'revimg') return { ...base, kind: 'img', question: PHOTO.q, answer: PHOTO.answer, photos: [PHOTO.img] }
  if (state === 'revimgopt') return { ...base, kind: 'imgopt', question: PHOTOS4.q, photos: PHOTOS4.imgs, keys: PHOTOS4.keys, correct: PHOTOS4.correct, caption: PHOTOS4.imgs[PHOTOS4.correct].caption }
  return { ...base, kind: 'text', question: TXT.q, answer: TXT.answer }
}
const teamsOf = (state: string) => labRows(state === 'revmc' ? MCQ.teams : state === 'revimg' ? PHOTO.teams : state === 'revimgopt' ? PHOTOS4.teams : TXT.teams)
/** утверждённые моменты показа в лаборатории */
const LAB_T = { revtext: { R: 1.4, k: 0.14 }, revmc: { R: 1.2, k: 0.14 }, revimg: { R: 1.2, k: 0.14 }, revimgopt: { R: 1.2, k: 0.14 } } as Record<string, { R: number; k: number }>

export function Std(p: S1Props) {
  return p.state.startsWith('rev') ? <StdReviewLab {...p} /> : <StdQuestionLab {...p} />
}

function StdReviewLab({ state, nOv, onReady }: S1Props) {
  const d = useMemo(() => dataOf(state), [state])
  const ly = useMemo(() => stdLayout(d), [d])
  const fs = useMemo<FS>(() => { const k = ly.frame.rects.length; return { grow: Array(k).fill(1), reveal: Array(k).fill(1), bloom: Array(k).fill(0), pulse: 0 } }, [ly])
  const rows = useMemo(() => teamsOf(state), [state])
  const { root } = useEntrance(onReady, (tl, q) => {
    stdEnterTl(tl, q)
    const { show, mark } = stdRevealTl(tl, q, d, fs, LAB_T[state])
    teamEnterTl(tl, q); teamShowTl(tl, q, show); teamMarkTl(tl, q, mark)
  }, null, [state, fs])
  return <StdScene d={d} ly={ly} fs={fs} rows={rows} n={nOv ?? null} rootRef={root} />
}

function StdQuestionLab({ state, nOv, onReady }: S1Props) {
  const long = state === 'textlong'
  const frame = useMemo(() => ({ rects: [{ x: 430, y: 190, w: 1260, h: 500 }], srcs: [BLANK] }), [])
  const fs = useMemo<FS>(() => ({ grow: [0], reveal: [0], bloom: [0], pulse: 0 }), [])
  const tm = timer3('question', ROUND4.timer)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    tl.fromTo(fs.grow, { 0: 0 }, { 0: 1, duration: 1.1, ease: 'power2.inOut' }, 0.1)
      .fromTo(fs.reveal, { 0: 0 }, { 0: 1, duration: 0.95, ease: 'power2.inOut' }, 1.1)
      .fromTo(fs, { pulse: 0 }, { pulse: 1.15, duration: 1.1, ease: 'power1.inOut' }, 0.1)
      .fromTo(q('.s4-qtext .w'), { opacity: 0, y: 16, rotation: -3 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: Math.min(0.05, 1.2 / (long ? TXT.long : TXT.q).split(' ').length), ease: 'back.out(1.5)' }, 1.7)
      .fromTo(q('.s4-qno'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 2.4)
  }, tm, [state, fs])
  const n = nOv ?? nLive
  const rects: Rect[] = [{ x: 400, y: 160, w: 1320, h: 560 }]
  const text = long ? TXT.long : TXT.q
  return (
    <S1Screen rects={rects} n={n} rootRef={root} cls={`s3 s4 st-${state}`}>
      {head4(false)}
      <FrameLayer rects={frame.rects} srcs={frame.srcs} fs={fs} panel={0.42} />
      <div className="s4-qtext" style={{ left: 470, top: 230, width: 1180, height: 420, fontSize: sizeFor(text) }}>
        <span>{text.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}</span>
      </div>
      <div className="s4-qno">{ROUND4.name} · вопрос {ROUND4.qn} из {ROUND4.qcount}</div>
      <Timer n={n} total={ROUND4.timer} />
    </S1Screen>
  )
}
