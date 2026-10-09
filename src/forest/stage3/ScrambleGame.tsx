// ═══ «Скрэмбл» в игре (тема «Волшебный лес»): утверждённая сцена «Семена над поляной» на настоящем состоянии ═══
// Всё, что решает игру, приходит снаружи (pages/rounds/AnagramRound.tsx): буквы и перемешивание из ответа вопроса,
// сколько подсказок открыто (lib/anagram.ts от timer_started_at), показан ли ответ (gameState.reveal), число на таймере
// (useRealTimer от timer_started_at), кто угадал / кто первый в гонке (серверное accepted_at). Здесь только анимация:
// новая подсказка — семя перелетает в чашечку; показ ответа — все семена планируют на места. Ничего не пишет в сеть.
// Обновили страницу посреди вопроса — всё сразу стоит на своих местах, без повторных перелётов.
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import type { AnagramTemplate } from '../../lib/anagram'
import { ScrambleScene, scrEnterTl, scrHintTl, scrLayout, scrResultTop, scrRevealTl } from './Scramble'

function reduced() {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ScrambleGame({ title, qn, qcount, race, clue, img, template, letters, order, hinted, reveal, n, total, result, resultLines }: {
  title: string; qn: number; qcount: number; race: boolean
  clue: string; img: string | null
  template: AnagramTemplate; letters: string[]; order: number[]
  /** открытые подсказки (индексы букв, в порядке открытия) */
  hinted: number[]
  reveal: boolean
  n: number | null; total: number
  /** строка результата; null — не показывать (бумажная игра) */
  result: ReactNode | null
  resultLines: number
}) {
  const root = useRef<HTMLDivElement>(null)
  const q = useMemo(() => gsap.utils.selector(root), [])
  const Ly = useMemo(() => scrLayout(template, order), [template, order])
  const all = useMemo(() => letters.map((_, i) => i), [letters])
  const targets = reveal ? all : hinted
  const targetsKey = targets.join(',')
  // буквы, чьи семена уже сидят в чашечках (React ставит их на место); летящие — двигает GSAP
  const [landed, setLanded] = useState<ReadonlySet<number>>(() => new Set(targets))
  const [done, setDone] = useState(reveal) // показ ответа доиграл: золотой побег и строка результата
  const landedRef = useRef(landed); landedRef.current = landed
  const flight = useRef<{ tl: gsap.core.Timeline; fresh: number[]; reveal: boolean } | null>(null)
  const enter = useRef<gsap.core.Timeline | null>(null)
  const first = useRef(true)

  // вход на экран (один раз на вопрос): живой вопрос — семена взлетают; ответ уже открыт — спокойно
  useLayoutEffect(() => {
    const tl = gsap.timeline()
    scrEnterTl(tl, q, !reveal)
    enter.current = tl
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // новые цели: подсказка или показ ответа
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return }
    enter.current?.progress(1)
    // незаконченный перелёт — сразу в конечное положение
    const prev = flight.current
    let cur = new Set(landedRef.current)
    if (prev) { prev.tl.kill(); prev.fresh.forEach(i => cur.add(i)); flight.current = null }
    const want = new Set(targets)
    cur = new Set([...cur].filter(i => want.has(i)))
    const fresh = targets.filter(i => !cur.has(i))
    if (!fresh.length || reduced()) {
      fresh.forEach(i => cur.add(i))
      setLanded(cur); setDone(reveal)
      return
    }
    setLanded(cur); setDone(false)
    const tl = gsap.timeline({ onComplete: () => {
      if (flight.current?.tl !== tl) return
      flight.current = null
      setLanded(p => new Set([...p, ...fresh])); setDone(reveal)
    } })
    if (reveal) scrRevealTl(tl, q, Ly, order, [...fresh].sort((a, b) => a - b), letters.length)
    else fresh.forEach((i, k) => scrHintTl(tl, q, Ly, order, i, k * 0.7, 0.8 + k * 0.7))
    flight.current = { tl, fresh, reveal }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetsKey])

  // севшие семена: React уже поставил их в чашечки — снять следы перелёта
  const landedKey = [...landed].sort((a, b) => a - b).join(',')
  useLayoutEffect(() => {
    const els = q('.s3-tile.landed'); if (!els.length) return
    gsap.set(els, { clearProps: 'transform' })
    gsap.set(q('.s3-tile.landed .scA-fluff'), { clearProps: 'opacity' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landedKey])

  // строка результата проступает, когда показ ответа доиграл
  useLayoutEffect(() => {
    if (!done) return
    const tl = gsap.timeline()
    tl.fromTo(q('.s3-result > *'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0.2)
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

  useEffect(() => () => { flight.current?.tl.kill() }, [])

  const hintSet = useMemo(() => new Set(hinted), [hinted])
  const resTop = scrResultTop(Ly, resultLines)
  return (
    <ScrambleScene title={title} qn={qn} qcount={qcount} qExtra={race ? ' · гонка' : undefined} clue={clue} Ly={Ly}
      letters={letters} order={order} landed={landed} hinted={hintSet} fin={reveal} n={n} total={total}
      cls={`${reveal ? (done ? 'st-complete' : 'st-reveal') : 'st-question'}${img ? ' has-img' : ''}`}
      timeUp={n === 0 && !reveal} result={done && result != null ? result : null} resTop={resTop} rootRef={root}
      side={img ? <figure className="scA-img"><img src={img} alt="" /></figure> : undefined} />
  )
}
