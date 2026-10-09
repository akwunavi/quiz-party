// ═══ Лес в игре: «120 секунд», «Блиц», «Три попытки» на проекторе ═══
// Утверждённые сцены этапа 1 (src/forest/stage1/*Scene.tsx) на настоящих данных. Здесь только «вид» и анимации:
// запись в базу, автопереходы, автопроверка, итоги блица остаются в боевых компонентах (SprintBoard, ShowAnswers,
// BlitzScreen, RevealBoard) — они передают сюда уже готовые значения. Таймеры рисунков — от настоящих отметок
// времени (timer_started_at, melody.rv.startedAt, состояние блица), своих отсчётов здесь нет.
import { useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { useRealTimer } from '../useTimer'
import { useImageSizes, useNow, useStageTl } from '../stage1/gameHooks'
import { SprintScene, sprintBuild, sprintMarksTl, type SprintImg, type SprintQ, type TeamAns } from '../stage1/SprintScene'
import { BlitzScene, blitzBuild } from '../stage1/BlitzScene'
import { Reveal3Scene, revealBuild, revealFs, type RevealView, type RvAns } from '../stage1/Reveal3Scene'
import { S1Screen } from '../stage1/common'
import { blitzSceneView, revealFrames, revealPhases, revealSceneState, sprintBoardState, type BlitzInput } from './views'
import type { RevealSettings } from '../../types/quiz'

const withSizes = (urls: string[], sizes: { w: number; h: number }[]): SprintImg[] => urls.map((src, i) => ({ src, w: sizes[i].w, h: sizes[i].h }))

// ── «120 секунд»: слайд со всеми вопросами ────────────────────────────────────
export function ForestSprintBoard({ title, questions, seconds, startedAt, countdown }: {
  title: string
  questions: { text: string; img?: string }[]
  seconds: number
  startedAt: string | null
  /** «читаем вопросы»: сколько секунд до старта (null — старт по кнопке ведущего, игра на бумаге) */
  countdown: number | null
}) {
  const root = useRef<HTMLDivElement>(null)
  const t = useRealTimer(startedAt, seconds, true)
  const state = sprintBoardState(!!startedAt, t.left)
  const urls = questions.map(q => q.img).filter((u): u is string => !!u)
  const { sizes } = useImageSizes(urls)
  const qs: SprintQ[] = questions.map((q, i) => {
    const k = q.img ? urls.indexOf(q.img) : -1
    return { n: i + 1, text: q.text, answer: '', img: q.img ? { src: q.img, w: sizes[k].w, h: sizes[k].h } : undefined }
  })
  // вопросы и одуванчик выходят один раз (при появлении экрана); «время пошло», «10 секунд», «время вышло» — свои акценты
  useStageTl(root, state === 'read' || state === 'active' ? 'board' : state, (tl, q) => sprintBuild(tl, q, state))
  const n = state === 'read' ? countdown : t.left
  return <SprintScene state={state} n={n} rootRef={root} title={title} total={seconds} questions={qs} mood={state === 'read' ? 'calm' : undefined} />
}

// ── «120 секунд»: разбор по одному вопросу (фаза show_answers) ─────────────────
export function ForestSprintReview({ title, count, step, q, shown, verdicts, answers, qImgs, aImgs, note, extra }: {
  title: string
  count: number
  step: number
  q: { text: string; answer: string }
  shown: boolean
  verdicts: boolean
  answers: TeamAns[] | null
  qImgs: string[]
  aImgs: string[]
  note?: string
  extra?: ReactNode
}) {
  const root = useRef<HTMLDivElement>(null)
  const qi = useImageSizes(qImgs), ai = useImageSizes(aImgs)
  const questions: SprintQ[] = Array.from({ length: count }, (_, i) => ({ n: i + 1, text: '', answer: '' }))
  const cur: SprintQ = { n: step + 1, text: q.text, answer: q.answer }
  const state = shown ? 'reveal' : 'review'
  useStageTl(root, `${step}|${state}`, (tl, sel) => sprintBuild(tl, sel, state))
  // вердикты загораются позже показа ответа (когда он целиком на экране) — своим коротким таймлайном
  const prevV = useRef(verdicts), prevStep = useRef(step)
  useLayoutEffect(() => {
    if (verdicts && !prevV.current && prevStep.current === step && root.current) sprintMarksTl(gsap.timeline(), gsap.utils.selector(root), 0)
    prevV.current = verdicts; prevStep.current = step
  }, [verdicts, step])
  return (
    <SprintScene state={state} n={null} rootRef={root} title={title} total={0} questions={questions} extra={extra}
      review={{ q: cur, shown, verdicts, answers, qImgs: withSizes(qImgs, qi.sizes), aImgs: withSizes(aImgs, ai.sizes), note: verdicts ? note : undefined }} />
  )
}

// ── «Блиц» ─────────────────────────────────────────────────────────────────────
export function ForestBlitz(props: Omit<BlitzInput, 'now'> & { extra?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const now = useNow(250)
  const v = blitzSceneView({ ...props, now })
  const s = props.state, cur = s?.current
  // что «въезжает» заново: деревья — при появлении, после кубика и на итоге; центр — при новом вопросе/паузе
  const center = v.state === 'rolling' ? 'rolling' : v.state === 'dice' ? 'dice' : v.state === 'complete' ? 'complete'
    : cur ? `q:${cur.questionId}` : s?.lastReveal ? `b:${s.lastReveal.at}` : 'next'
  const prevCenter = useRef<string | null>(null)
  const key = `${center}|${v.state}|${cur?.attempts ?? ''}|${v.teams.length}`
  useStageTl(root, key, (tl, q, first) => {
    const newCenter = prevCenter.current !== center
    const teams = first || (newCenter && (center === 'dice' || center === 'complete'))
    prevCenter.current = center
    blitzBuild(tl, q, v.state, v.teams.length, { teams, center: first || newCenter })
  })
  return <BlitzScene v={v} rootRef={root} extra={props.extra} />
}

// ── «Три попытки» ──────────────────────────────────────────────────────────────
export function ForestReveal({ qid, imgs, phase, startedAt, phaseSec, short, settings, groups, open, answers, note, extra }: {
  /** null — в раунде нет вопросов */
  qid: string | null
  imgs: string[]
  phase: 1 | 2 | 3 | 'review'
  startedAt: string | null
  phaseSec: number | null
  short: boolean
  settings: RevealSettings
  groups: string[][]
  open: number[]
  answers: RvAns[]
  note?: string
  extra?: ReactNode
}) {
  const root = useRef<HTMLDivElement>(null)
  const running = !!startedAt && phaseSec != null && phase !== 'review'
  // гонг — только в конце третьей фазы (как у боевого таймера: chime = phase === 3)
  const t = useRealTimer(running ? startedAt : null, phaseSec ?? 30, phase === 3)
  const state = revealSceneState(phase, running, t.left)
  const { sizes, ready } = useImageSizes(imgs)
  const fr = revealFrames(imgs.length, phase)
  const still = fr.still || state === 'over'
  const fsKey = `${qid}|${state}|${fr.shown.join(',')}|${fr.prev.join(',')}|${still}|${ready}`
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fs = useMemo(() => revealFs(state, fr.shown.length, fr.prev.length, still), [fsKey])
  const wordShown = useRef<string | null>(null)
  useStageTl(root, qid && ready ? fsKey : null, (tl, q) => {
    // спилы появляются один раз за вопрос; при смене фазы слово уже стоит
    const word = wordShown.current !== qid || state === 'review'
    wordShown.current = qid
    revealBuild(tl, q, state, fs, { still, word })
  })
  if (!qid) return (
    <S1Screen rects={[{ x: 460, y: 420, w: 1000, h: 200 }]} n={null} rootRef={root} cls="rv rvA">
      <div className="s1-empty">В этом раунде нет вопросов — добавь их в редакторе</div>
      {extra}
    </S1Screen>
  )
  const v: RevealView = {
    state, imgs: withSizes(imgs, sizes), shown: fr.shown, prev: fr.prev, still,
    // пока размеры картинок не известны, слово не выводим — иначе спилы мелькнули бы до своего входа
    groups: ready ? groups : [], open, phases: revealPhases(settings, short, typeof phase === 'number' ? { phase, sec: phaseSec ?? undefined } : undefined),
    note, answers,
  }
  return <Reveal3Scene v={v} n={running ? t.left : null} fs={fs} rootRef={root} extra={extra} />
}
