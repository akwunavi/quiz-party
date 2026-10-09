// ═══ Разбор ответов в игре (тема «Волшебный лес»): утверждённые разборы этапа 4 на настоящем состоянии ═══
// Ничего не пишет в сеть и не решает: показ ответа (`revealed`) и проверка (`checked`) приходят из ShowAnswers.
// Стадии сцены: covered — ответа нет даже в разметке, у команд «• • •» и «Ответили: n из N»; anim — показ (таймлайн
// утверждённого превращения, ужатый так, чтобы ответ целиком стоял на экране к проверке ShowAnswers); open — ответ на
// месте. Вердикт (✓/✗) — только когда checked И показ доиграл. Страница открыта уже после показа — сразу итоговый кадр.
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { useImageSizes } from '../question/useImageSizes'
import { StdScene, stdEnterTl, stdLayout, stdRevealTl, teamEnterTl, teamMarkTl, teamShowTl, letterCount, type FS, type Photo, type StdData } from './Std'
import { MatchScene, matchLayout, matchQuestionTl, matchRevealTl, matchWordsTl, type MatchData } from '../stage3/Match'
import { OrderScene, orderLayout, orderQuestionTl, orderRevealTl, orderWordsTl, type OrderData } from '../stage3/Order'
import type { MItem } from '../stage3/data'
import { teamColLayout, stripLayout } from './teamLayout'
import { letterStep, matchStep, orderStep, type ReviewKind } from './review'
import type { TeamPhase, TeamRow } from './TeamStrip'

export type Stage = 'covered' | 'anim' | 'open'
type Q = (s: string) => Element[]

/** covered → anim (показ) → open; ответ снова закрыли — сцена пересобирается с нуля (epoch) */
function useRevealStage(revealed: boolean, checked: boolean) {
  const [stage, setStage] = useState<Stage>(revealed ? 'open' : 'covered')
  const [epoch, setEpoch] = useState(0)
  useEffect(() => {
    if (!revealed) { if (stage !== 'covered') { setStage('covered'); setEpoch(e => e + 1) } }
    else if (stage === 'covered') setStage('anim')
  }, [revealed]) // eslint-disable-line react-hooks/exhaustive-deps
  const done = useCallback(() => setStage(s => (s === 'anim' ? 'open' : s)), [])
  return { stage, epoch, judged: checked && stage === 'open', done }
}
const phaseOf = (s: Stage): TeamPhase => (s === 'covered' ? 'dots' : s)

/** Общая механика таймлайнов игры: вход (при монтировании), показ (один раз — по стадии), вердикт (по judged). */
function useGameTl(stage: Stage, judged: boolean, done: () => void, enter: (tl: gsap.core.Timeline, q: Q) => void,
  reveal: (tl: gsap.core.Timeline, q: Q) => void, mark: (tl: gsap.core.Timeline, q: Q) => void) {
  const root = useRef<HTMLDivElement>(null)
  const q = useMemo(() => gsap.utils.selector(root), [])
  const instant = useRef(stage === 'open'), played = useRef(false)
  useLayoutEffect(() => {
    const tl = gsap.timeline()
    enter(tl, q)
    if (instant.current) tl.progress(1)
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useLayoutEffect(() => {
    if (stage === 'covered' || played.current) return
    played.current = true
    const tl = gsap.timeline({ onComplete: done })
    reveal(tl, q)
    if (stage === 'open') { tl.progress(1); return }
    return () => { if (tl.progress() < 1) { played.current = false; tl.kill() } }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])
  useLayoutEffect(() => {
    if (!judged) return
    const tl = gsap.timeline()
    mark(tl, q)
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [judged])
  return root
}

const stripShowTl = (tl: gsap.core.Timeline, q: Q, at: number) => tl
  .to(q('.s4-sl .dots'), { opacity: 0, duration: 0.3, stagger: 0.04 }, at)
  .fromTo(q('.s4-sl .txt'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, at)
const stripMarkTl = (tl: gsap.core.Timeline, q: Q) => { const n = q('.s4-sl .mk').length; return tl.fromTo(q('.s4-sl .mk'), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.35, stagger: Math.min(0.1, 2 / Math.max(1, n)), ease: 'back.out(2.4)' }, 0) }
const stripEnterTl = (tl: gsap.core.Timeline, q: Q) => tl.fromTo(q('.s4-sl, .s4-scnt'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, 0.6)

export type ReviewInput = {
  kind: ReviewKind
  title: string; qn: number; qcount: number
  question: string
  /** правильный ответ словами (displayAnswer) */
  answer: string
  /** варианты (choice / order) */
  options: { key: string; text: string }[]
  correctKey: string
  /** порядок: правильная последовательность букв */
  correctOrder: string
  /** сопоставление: левые номера, буквы и подписи справа, верные пары */
  left: string[]; right: string[]; rightLabels: string[]; pairs: string[]
  /** адреса картинок: вопроса (до показа; пусто, если скрыты), разбора (ответа или вопроса), всех картинок вопроса */
  qImgs: string[]; aImgs: string[]; allImgs: string[]
  /** в вопросе есть звук (подписи левых элементов сопоставления без картинок — «Трек N») */
  hasAudio: boolean
  note: string
}

/** Разбор ответов (phase show_answers). rows — null: колонки команд нет (бумажная игра). */
export function ForestReviewGame({ inp, rows, answered, revealed, checked, revealMs, video }: {
  inp: ReviewInput; rows: TeamRow[] | null; answered: number
  revealed: boolean; checked: boolean
  /** через сколько мс после показа ShowAnswers считает ответ показанным (revealDoneMs) — проверка через +600 */
  revealMs: number
  /** скрытое видео вопроса (RevealVideo) — уже только после показа */
  video?: ReactNode
}) {
  const { stage, epoch, judged, done } = useRevealStage(revealed, checked)
  const urls = inp.kind === 'match' ? inp.allImgs.slice(0, inp.left.length) : inp.kind === 'order' ? inp.allImgs.slice(0, 1)
    : inp.kind === 'imgopt' ? inp.allImgs : stage === 'covered' ? inp.qImgs : inp.aImgs
  // размеры всех картинок сразу (и вопроса, и разбора): смена картинок на показе не ждёт загрузки и не мигает
  const all = useMemo(() => [...new Set([...inp.allImgs, ...inp.qImgs, ...inp.aImgs])], [inp])
  const sizeList = useImageSizes(all)
  const sizes = sizeList ? urls.map(u => sizeList[all.indexOf(u)] ?? { w: 1200, h: 900 }) : null
  // стабильная ссылка: опрос ответов перерисовывает экран каждые 2 с — раскладка и рамы при этом не пересобираются
  const pkey = sizes ? JSON.stringify(urls.map((u, i) => [u, sizes[i].w, sizes[i].h])) : ''
  const photos = useMemo<Photo[]>(() => (pkey ? (JSON.parse(pkey) as [string, number, number][]).map(([src, w, h]) => ({ src, w, h })) : []), [pkey])
  const team = rows && rows.length ? rows : null
  const count = team ? `Ответили: ${answered} из ${team.length}` : undefined
  const doneS = (revealMs + 600) / 1000
  if (!sizes) return <div className="s1 fo-wait" />
  const common = { stage, judged, done, rows: team, count, doneS }
  if (inp.kind === 'match') return <MatchGame key={epoch} inp={inp} photos={photos} {...common} />
  if (inp.kind === 'order') return <OrderGame key={epoch} inp={inp} photos={photos} {...common} />
  return <><StdGame key={epoch} inp={inp} photos={photos} video={video} {...common} />
    {video && inp.kind !== 'img' && <div className="s4-vid corner">{video}</div>}</>
}

type GameP = { inp: ReviewInput; photos: Photo[]; stage: Stage; judged: boolean; done: () => void; rows: TeamRow[] | null; count?: string; doneS: number }

function StdGame({ inp, photos, stage, judged, done, rows, count, video }: GameP & { video?: ReactNode }) {
  const shown = stage !== 'covered'
  const appear = useRef(inp.kind === 'img' && stage === 'covered' && photos.length === 0)
  const kind = inp.kind as StdData['kind']
  const d = useMemo<StdData>(() => {
    const ph: Photo[] = kind === 'img' && shown && video ? [{ src: '', w: 16, h: 9, video: true }, ...photos].slice(0, 4) : photos
    return {
      kind, title: inp.title, qn: inp.qn, qcount: inp.qcount, question: inp.question, answer: inp.answer,
      options: inp.options, correct: kind === 'imgopt' || kind === 'mc' ? inp.options.findIndex(o => o.key === inp.correctKey) : -1,
      photos: kind === 'img' || kind === 'imgopt' ? ph : [], keys: inp.options.map(o => o.key),
      caption: inp.options.find(o => o.key === inp.correctKey)?.text.trim() ?? '', note: inp.note,
    }
  }, [inp, photos, shown, kind, !!video]) // eslint-disable-line react-hooks/exhaustive-deps
  const hasRows = !!rows
  const ly = useMemo(() => stdLayout(d, hasRows ? 0 : 310), [d, hasRows])
  const fs = useMemo<FS>(() => { const k = ly.frame.rects.length; return { grow: Array(k).fill(1), reveal: Array(k).fill(1), bloom: Array(k).fill(0), pulse: 0 } }, [ly])
  const colLay = useMemo(() => teamColLayout(rows?.length ?? 0), [rows?.length])
  const len = letterCount(d.answer)
  const root = useGameTl(stage, judged, done,
    (tl, q) => { stdEnterTl(tl, q); teamEnterTl(tl, q) },
    (tl, q) => {
      const t = kind === 'text' ? { R: 0.4, k: letterStep(len) } : kind === 'img' ? { R: 0, k: letterStep(len), lt: 0.35 } : { R: 0.2, k: 0.14 }
      const { show } = stdRevealTl(tl, q, d, fs, t, appear.current)
      teamShowTl(tl, q, show)
    },
    (tl, q) => { teamMarkTl(tl, q, 0, Math.min(0.2, 2.4 / Math.max(1, rows?.length ?? 1))); tl.fromTo(q('.s4-note'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.2) })
  return <StdScene d={d} ly={ly} fs={fs} rows={rows} phase={phaseOf(stage)} judged={judged} colLay={colLay} count={count}
    shown={shown} rootRef={root} cls={rows ? ' fg' : ' fg paper'} video={video} />
}

function MatchGame({ inp, photos, stage, judged, done, rows, count, doneS }: GameP) {
  const S = useMemo<MatchData>(() => ({
    title: inp.title, qn: inp.qn, qcount: inp.qcount, text: inp.question, timer: 0,
    items: inp.left.map((l, i): MItem => (photos[i] ? { kind: 'img', src: photos[i].src, w: photos[i].w, h: photos[i].h } : { kind: 'txt', text: inp.hasAudio ? `Трек ${l}` : l })),
    right: inp.right, right_labels: inp.right.map((_, i) => inp.rightLabels[i] ?? ''), correct_pairs: inp.pairs,
  }), [inp, photos])
  const sl = useMemo(() => stripLayout(rows?.length ?? 0), [rows?.length])
  const stripTop = 958 - sl.lift
  const long = S.right_labels.some(t => t.length > 60)
  const hasRows = !!rows
  const Ly = useMemo(() => matchLayout(S, { long, lift: sl.lift, stripTop: hasRows ? stripTop : undefined }), [S, long, sl, hasRows, stripTop])
  const n = S.items.length, step = matchStep(n, doneS, n > 4 ? 0.95 : 1.25)
  const pairsAt = 0.3 + (n - 1) * step + 1.0
  const root = useGameTl(stage, judged, done,
    (tl, q) => { matchWordsTl(tl, q); matchQuestionTl(tl, q); stripEnterTl(tl, q) },
    (tl, q) => { matchRevealTl(tl, q, S, Ly, { t0: 0.3, step, pairsAt, stripAt: null }); stripShowTl(tl, q, pairsAt + 0.4) },
    (tl, q) => { stripMarkTl(tl, q) })
  return <MatchScene S={S} Ly={Ly} rev={stage !== 'covered'} done={false} n={null} rootRef={root} cls=" fg"
    strip={rows ? { rows, top: stripTop, phase: phaseOf(stage), judged, lay: sl, count } : null} />
}

function OrderGame({ inp, photos, stage, judged, done, rows, count, doneS }: GameP) {
  const S = useMemo<OrderData>(() => ({
    title: inp.title, qn: inp.qn, qcount: inp.qcount, text: inp.question, timer: 0,
    choices: inp.options, correct_order: inp.correctOrder, media: photos[0]?.src ?? null,
  }), [inp, photos])
  const sl = useMemo(() => stripLayout(rows?.length ?? 0), [rows?.length])
  const long = S.choices.some(c => c.text.length > 50)
  const Ly = useMemo(() => orderLayout(S, { long, lift: sl.lift }), [S, long, sl])
  const step = orderStep(Ly.n, doneS, Ly.n > 5 ? 0.85 : 1.0)
  const root = useGameTl(stage, judged, done,
    (tl, q) => { orderWordsTl(tl, q); orderQuestionTl(tl, q); stripEnterTl(tl, q) },
    (tl, q) => { orderRevealTl(tl, q, S, Ly, { t0: 0.3, step, stripAt: null }); stripShowTl(tl, q, 0.3 + Ly.n * step + 0.2) },
    (tl, q) => { stripMarkTl(tl, q) })
  return <OrderScene S={S} Ly={Ly} rev={stage !== 'covered'} done={false} n={null} rootRef={root} cls=" fg"
    strip={rows ? { rows, top: 968 - sl.lift, phase: phaseOf(stage), judged, lay: sl, count } : null} />
}
