// ═══ «Кроссворд» в игре (тема «Волшебный лес»): утверждённое «Созвездие светлячков» на настоящем состоянии ═══
// Вопрос (phase 'question'): карта огоньков из настоящей сетки, идущее слово горит золотом, определение внизу,
// таймер-одуванчик от timer_started_at. Буквы на карте — только у слов, ответ которых зал уже видел (показ после
// вопроса); в режиме «ответы после раунда» сетка до разбора без букв — как и прежний экран вопроса.
// Разбор (phase 'show_answers'): карта в углу, справа определение, «Правильный ответ» и ответы команд по буквам.
// До показа ответа — пустые огоньки и «ответили N команд»; на показе слово взлетает с карты к ответу, потом
// проступают ответы команд, а вердикт (✓/✗, раскраска букв) — только когда ShowAnswers объявил проверку.
// Последнее слово разобрано — через несколько секунд итог «Кроссворд разгадан». Ничего не пишет в сеть.
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { CrosswordScene, ANSY, X0, cwGeom, type CwTallyRow, type CwTeamRow } from './CrosswordC'
import { lenCls, rowGeom, teamsWord, type CwModel } from './cwModel'

/** Нижняя граница карты над определением: высота определения по длине (кегль — как в CSS по lenCls) */
export function clueBottom(text: string, withAnswer: boolean, note: string) {
  const c = lenCls(text), fs = c.includes('xxl') ? 31 : c.includes('xl') ? 38 : c.includes('lg') ? 44 : 52
  const lines = Math.max(1, Math.ceil(text.length / (1260 / (fs * 0.52))))
  const h = 40 + lines * fs * 1.14 + (withAnswer ? 62 : 0) + (note ? Math.ceil(note.length / 90) * 30 : 0)
  return Math.round(1080 - 34 - h - 24)
}

export function CrosswordQuestionGame({ m, title, qn, qcount, cur, past, clue, answer, note, n, total, side, sideN }: {
  m: CwModel; title: string; qn: number; qcount: number
  cur: number | null
  /** слова, которые уже шли (тлеют) */
  past: ReadonlySet<number>
  clue: string
  /** ответ показан на экране вопроса (показ после вопроса) */
  answer: string | null
  note: string
  n: number | null; total: number
  side?: ReactNode; sideN: number
}) {
  const root = useRef<HTMLDivElement>(null)
  const q = useMemo(() => gsap.utils.selector(root), [])
  const bottom = clueBottom(clue, !!answer, answer ? note : '')
  const right = sideN ? 1300 : undefined
  useLayoutEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(q('.cwC-dust i'), { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.01 }, 0)
      .fromTo(q('.cwC-line'), { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.08, ease: 'power2.out' }, 0.2)
      .fromTo(q('.cwC-orb'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: { each: 0.016, from: 'random' }, ease: 'back.out(2)' }, 0.4)
      .fromTo(q('.cwC-clue'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.2)
      .fromTo(q('.cwC-side'), { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.8)
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // ответ открыли на экране вопроса — буквы зажигаются по слову
  const lit = !!answer, was = useRef(lit)
  useLayoutEffect(() => {
    if (!lit || was.current) { was.current = lit; return }
    was.current = true
    const tl = gsap.timeline()
    tl.fromTo(q('.cwC-orb.rev .ch'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.1 }, 0)
      .fromTo(q('.cwC-open, .cwC-note'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, 0.3)
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lit])
  const sideBox = sideN > 0 && side ? <div className={`cwC-side${sideN > 2 ? ' grid' : ''}`} style={{ left: 1340, right: 40, top: 110, height: Math.max(180, bottom - 130) }}>{side}</div> : null
  return (
    <CrosswordScene m={m} mode="question" title={title} qn={qn} qcount={qcount} cur={cur} past={x => past.has(x)} shown={() => false}
      curLit={lit} clue={{ text: clue, answer: answer ?? undefined, note: answer && note ? note : undefined }} n={n} total={total} rootRef={root}
      cls={`st-question${lit ? ' open' : ''}`} bottom={bottom} right={right} side={sideBox} />
  )
}

export function CrosswordReviewGame({ m, title, qn, qcount, cur, reviewed, revealed, checked, clue, note, rows, answered, tally, side, sideN }: {
  m: CwModel; title: string; qn: number; qcount: number
  cur: number | null
  /** слова, разобранные раньше (их буквы зал уже видел) */
  reviewed: ReadonlySet<number>
  revealed: boolean
  /** ShowAnswers объявил проверку (тот же момент, когда пишется is_correct) */
  checked: boolean
  clue: string; note: string
  /** строки команд (пусто — бумажная игра) */
  rows: CwTeamRow[]
  /** сколько команд прислали ответ — до показа видно только число */
  answered: number
  /** итог кроссворда (последнее слово, онлайн-игра); null — итога нет */
  tally: CwTallyRow[] | null
  side?: ReactNode; sideN: number
}) {
  const root = useRef<HTMLDivElement>(null)
  const q = useMemo(() => gsap.utils.selector(root), [])
  // covered — ответ закрыт; anim — идёт показ; open — показ доиграл (или страница открыта уже с показанным ответом)
  const [stage, setStage] = useState<'covered' | 'anim' | 'open'>(revealed ? 'open' : 'covered')
  const [complete, setComplete] = useState(false)
  useEffect(() => { if (!revealed) setStage('covered'); else if (stage === 'covered') setStage('anim') }, [revealed]) // eslint-disable-line react-hooks/exhaustive-deps
  const judged = checked && stage === 'open'
  const mode = complete && tally ? 'complete' : 'review'
  const word = cur != null ? m.W(cur)?.word ?? '' : ''
  const RG = rowGeom(rows.length, word.length)

  // вход: слой разбора проявляется (как «следующее слово» в утверждённом разборе)
  useLayoutEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(q('.cwC-veil'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0)
      .fromTo(q('.cwC-rec, .cwC-lab, .cwC-nm, .cwC-trow, .cwC-ans, .cwC-side'), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.03 }, 0.1)
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // показ ответа: слово взлетает с карты в колонку букв, потом проступают ответы команд
  useLayoutEffect(() => {
    if (stage !== 'anim' || cur == null) return
    const wc = m.wordCells(cur), len = Math.max(1, wc.length)
    const { cx, cy, orb } = cwGeom(m, 'review')
    const tl = gsap.timeline({ onComplete: () => setStage(s => (s === 'anim' ? 'open' : s)) })
    tl.fromTo(q('.cwC-ans .ch, .cwC-trow .ch'), { opacity: 0 }, { opacity: 0, duration: 0.01 }, 0)
      .fromTo(q('.cwC-ans .cwC-lt, .cwC-trow .cwC-lt, .cwC-trow .cwC-none, .cwC-trow .cwC-txt'), { opacity: 0, scale: 0.4 }, { opacity: 0, scale: 0.4, duration: 0.01 }, 0)
    // правильное слово целиком на экране раньше, чем ShowAnswers объявит проверку (1,8 с) — зал видит ответ первым
    const st = Math.min(0.12, 0.5 / len)
    wc.forEach((c, k) => {
      const el = q(`.cwC-lift[data-k="${k}"]`)[0], fx = cx(c.c) - (X0 + k * RG.COL + RG.lt / 2), fy = cy(c.r) - ANSY, at = 0.1 + k * st, land = at + 0.9
      if (el) tl.fromTo(el, { x: fx, y: fy, scale: orb / RG.lt, opacity: 1 }, { keyframes: [{ x: fx * 0.4, y: fy * 0.4 - 60, scale: 1.1, duration: 0.5, ease: 'sine.inOut' }, { x: 0, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }] }, at)
        .to(el, { opacity: 0, duration: 0.15 }, land)
      tl.fromTo(q(`.cwC-beam[data-k="${k}"]`), { strokeDashoffset: 600, opacity: 0 }, { strokeDashoffset: 0, opacity: 0.9, duration: 0.5, ease: 'power1.out' }, at)
        .to(q(`.cwC-beam[data-k="${k}"]`), { opacity: 0, duration: 0.4 }, land - 0.1)
        .fromTo(q(`.cwC-ans .cwC-lt:nth-child(${k + 1})`), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.2 }, land)
        .fromTo(q(`.cwC-ans .cwC-lt:nth-child(${k + 1}) .ch`), { opacity: 0 }, { opacity: 1, duration: 0.2 }, land)
        .fromTo(q(`.cwC-orb[data-cur][data-k="${k}"]`), { '--on': 0, '--glow': 0.6 }, { '--on': 1, '--glow': 1, duration: 0.35, ease: 'power1.out' }, land)
    })
    const T = Math.max(0.1 + (len - 1) * st + 0.9 + 0.5, 2.0)
    const d = Math.min(0.55, 2.4 / Math.max(1, rows.length))
    rows.forEach((_, ti) => {
      tl.fromTo(q(`.cwC-trow[data-ti="${ti}"] .cwC-lt, .cwC-trow[data-ti="${ti}"] .cwC-none, .cwC-trow[data-ti="${ti}"] .cwC-txt`), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(2)' }, T + ti * d)
        .fromTo(q(`.cwC-trow[data-ti="${ti}"] .ch`), { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: 0.04 }, T + ti * d + 0.1)
    })
    tl.to({}, { duration: 0.3 })
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  // вердикт объявлен — ✓/✗ появляются по строкам
  useLayoutEffect(() => {
    if (!judged || mode !== 'review') return
    const tl = gsap.timeline()
    tl.fromTo(q('.cwC-mk'), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.12, ease: 'back.out(2.5)' }, 0)
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [judged])

  // последнее слово разобрано — итог через паузу (зал успевает прочитать ответы команд)
  const canTally = !!tally && judged
  useEffect(() => {
    if (!canTally) { setComplete(false); return }
    const t = setTimeout(() => setComplete(true), 8000)
    return () => clearTimeout(t)
  }, [canTally])
  useLayoutEffect(() => {
    if (mode !== 'complete') return
    const tl = gsap.timeline()
    tl.fromTo(q('.cwC-orb'), { '--glow': 0.4, scale: 1 }, { '--glow': 1, scale: 1.12, duration: 0.5, yoyo: true, repeat: 1, stagger: { each: 0.02, from: 'center' } }, 0.2)
      .fromTo(q('.cwC-tally > *'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.1 }, 0.6)
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const covered = stage === 'covered'
  const part = cur != null ? [{
    num: cur, cls: 'p1', covered, clue, judged,
    recExtra: covered && rows.length ? ` · ответили ${answered} ${teamsWord(answered)}` : '',
    note: judged && note ? note : undefined,
    rows: rows.map(r => ({ ...r, verdict: judged ? r.verdict : null })),
  }] : []
  return (
    <CrosswordScene m={m} mode={mode} title={title} qn={qn} qcount={qcount} cur={cur} past={x => reviewed.has(x)}
      shown={x => reviewed.has(x)} curLit={stage === 'open'} parts={part} lifts={stage === 'anim'}
      tally={mode === 'complete' && tally ? { rows: tally } : undefined} n={null} total={1} rootRef={root}
      cls={`st-${mode === 'complete' ? 'complete' : 'review'} rev`} timer={false}
      side={mode === 'review' && sideN > 0 && side ? <div className={`cwC-side${sideN > 1 ? ' row' : ''}`} style={{ left: 44, top: 96, width: 540, height: 190 }}>{side}</div> : undefined} />
  )
}
