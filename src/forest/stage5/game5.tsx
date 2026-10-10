// ═══ Этап 5 в игре: общие экраны «Волшебного леса» на настоящих данных ═══
// Правила, заставка раунда, табло, перерыв, подсчёт, финал, «время ответов», повтор вопросов и переходы между экранами.
// Здесь только вид и анимации: запись в базу, подсчёт очков, места, таймеры (timer_started_at), шаги финала и автопереходы
// остаются в боевых компонентах HostScreen — они передают сюда уже готовые значения (views.ts).
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { S1Screen, type S1Api } from '../stage1/common'
import { Dandelion } from '../stage1/timers'
import { useFontsReady, useStageTl } from '../stage1/gameHooks'
import { useRealTimer } from '../useTimer'
import { ForestQuestion } from '../question/ForestQuestion'
import { forestQFrom } from '../question/fromQuestion'
import { mediaUrl } from '../../lib/media'
import { RulesScreen, type RulesView } from './Rules'
import { RoundIntroScreen, type IntroKind } from './Intro5'
import { BoardScreen } from './Board'
import { FinScreen, finBuild, type FinView } from './Finale'
import { TransOverlay } from './Trans'
import { answerGrid, boardLayout, transKind, type BoardView, type TransKind } from './views'
import type { RoundIntroData } from '../stage1/data'
import type { Question } from '../../types/quiz'

const play = (a: S1Api) => { a.tl.play() }

export function ForestRules({ view }: { view: RulesView }) {
  return <div className="fo-screen"><RulesScreen v={view} onReady={play} /></div>
}

export function ForestRoundIntro({ kind, intro }: { kind: IntroKind; intro: RoundIntroData }) {
  return <div className="fo-screen"><RoundIntroScreen kind={kind} intro={intro} onReady={play} /></div>
}

/** Табло в игре: строки открываются по счётчику боевого экрана (`reveal`), после полного раскрытия — один раз
 *  «переезд» строк с мест прошлого раунда (как FLIP у классики), если места поменялись. */
export function ForestBoard({ view, reveal, flipKey }: { view: BoardView; reveal: number; flipKey: string | null }) {
  const root = useRef<HTMLDivElement>(null)
  useStageTl(root, 'in', (tl, q) => {
    tl.fromTo(q('.bd-title'), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
      .fromTo(q('.bd-colh'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.4)
  })
  const n = view.rows.length, all = n > 0 && reveal >= n
  const lay = boardLayout(n, view.cols.length)
  const flipped = useRef<string | null>(null)
  const rowsRef = useRef(view.rows); rowsRef.current = view.rows
  useLayoutEffect(() => {
    if (!all || !flipKey || flipped.current === flipKey || !root.current) return
    flipped.current = flipKey
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const q = gsap.utils.selector(root)
    const tl = gsap.timeline({ delay: 0.6 })
    rowsRef.current.forEach((r, i) => {
      const dy = ((r.prevIdx ?? i) - i) * (lay.rh + lay.gap)
      if (dy) tl.fromTo(q(`.bd-row[data-i="${i}"]`), { y: dy }, { y: 0, duration: 1.3, ease: 'power3.inOut', clearProps: 'transform' }, 0)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all, flipKey])
  return <div className="fo-screen"><BoardScreen v={view} rootRef={root} reveal={reveal} /></div>
}

/** Финал/перерыв/подсчёт: `step` — ключ шага (новая медаль, новая карточка); `only` — что именно доигрывает шаг. */
export function ForestFin({ view, step, only, onClick }: { view: FinView; step: string; only?: number; onClick?: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const vRef = useRef(view); vRef.current = view
  useStageTl(root, step, (tl, q) => finBuild(tl, q, vRef.current, only))
  return <div className="fo-screen" onClick={onClick}><FinScreen v={view} rootRef={root} /></div>
}

/** Кинематографическая вставка финала в Лесу: «огоньки собираются к бутону» (≈5.5 с), потом onDone. */
export function ForestFinaleIntro({ hues, onDone }: { hues: number[]; onDone: () => void }) {
  const done = useRef(onDone); done.current = onDone
  useEffect(() => { const t = setTimeout(() => done.current(), 5600); return () => clearTimeout(t) }, [])
  return <ForestFin view={{ state: 'antic', hues }} step="antic" />
}

export type AnswerTeam = { id: string; name: string; color: string; got: number; total: number; done: boolean }
/** «Время ответов»: крупный одуванчик-таймер (настоящий timer_started_at, тот же гонг) и — при игре с телефонов —
 *  листья команд со счётчиком долетевших ответов. */
export function ForestAnswerTime({ num, paper, startedAt, seconds, teams }: { num: string; paper: boolean; startedAt: string | null; seconds: number; teams: AnswerTeam[] | null }) {
  const root = useRef<HTMLDivElement>(null)
  const t = useRealTimer(startedAt, seconds, true)
  useStageTl(root, 'in', (tl, q) => {
    tl.fromTo(q('.ru-title .ch'), { opacity: 0, y: 30, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.55, stagger: 0.05, ease: 'back.out(1.8)' }, 0.1)
      .fromTo(q('.at5-sub'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
      .fromTo(q('.at5-timer'), { clipPath: 'inset(100% -40% 0 -40%)' }, { clipPath: 'inset(0% -40% 0 -40%)', duration: 1.3, ease: 'power2.out' }, 0.2)
      .fromTo(q('.at5-t'), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.05 }, 0.8)
  })
  const g = answerGrid(teams?.length ?? 0)
  // длинные названия: кегль меньше, пока имя не влезет в свой лист
  const fonts = useFontsReady()
  const names = (teams ?? []).map(x => x.name).join('|')
  useLayoutEffect(() => {
    root.current?.querySelectorAll<HTMLElement>('.at5-t .nm').forEach(nm => {
      nm.style.fontSize = ''
      const li = nm.parentElement as HTMLElement
      let f = parseFloat(getComputedStyle(nm).fontSize) || 30
      while (nm.offsetHeight > li.clientHeight - 6 && f > 12) { f -= 1; nm.style.fontSize = `${f}px` }
    })
  }, [names, fonts, g.rowH, g.fz])
  const title = paper ? 'Сдавайте бланки' : 'Отвечайте!'
  return (
    <div className="fo-screen">
      <S1Screen rects={paper ? [{ x: 560, y: 160, w: 800, h: 880 }] : [{ x: 60, y: 30, w: 600, h: 1000 }, { x: 680, y: 220, w: 1200, h: 830 }]} n={startedAt ? t.left : null} rootRef={root} cls={`s5 ru at5${paper ? ' paper' : ''}`}>
        <h1 className="ru-title">{title.split('').map((c, i) => <span key={i} className="ch">{c === ' ' ? ' ' : c}</span>)}</h1>
        <div className="at5-sub">Раунд {num} · {paper ? 'передайте бланки ведущему' : 'капитаны отправляют ответы с телефонов'}</div>
        <div className="at5-timer"><Dandelion n={t.left} total={seconds} size={paper ? 420 : 380} seeds={24} /></div>
        {teams && <ul className="at5-teams" style={{ gridTemplateColumns: `repeat(${g.cols}, 1fr)`, gridAutoRows: g.rowH, ['--fz' as string]: `${g.fz}px` }}>
          {teams.map(tm => <li key={tm.id} className={`at5-t${tm.done ? ' done' : ''}`}><span className="nm" style={{ color: tm.color }}>{tm.name}</span><em>{tm.got}/{tm.total}</em></li>)}
        </ul>}
      </S1Screen>
    </div>
  )
}

/** Повтор вопросов перед ответами: утверждённый экран вопроса Леса, без таймера и без ответа. */
export function ForestRecap({ q, roundName, qno, seconds }: { q: Question; roundName: string; qno: string; seconds: number }) {
  const fq = useMemo(() => forestQFrom(q, mediaUrl, ''),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q.id, q.question_text, JSON.stringify(q.media), JSON.stringify(q.answer)])
  return <div className="fo-screen"><ForestQuestion q={fq} roundName={roundName} qno={qno} startedAt={null} seconds={seconds} reveal={false} calm from="D" /></div>
}

/** Переходы между экранами: короткая вставка поверх кадра на смене фазы (игру не задерживает). Рендерится всегда —
 *  постоянное число детей ThemeLayer; вне Леса и при «меньше движения» ничего не рисует. */
export function ForestTransitions({ on, phase }: { on: boolean; phase: string | null | undefined }) {
  const prev = useRef<string | null | undefined>(phase)
  const [cur, setCur] = useState<{ kind: TransKind; n: number } | null>(null)
  useLayoutEffect(() => {
    const k = on ? transKind(prev.current, phase) : null
    prev.current = phase
    if (!k) return
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setCur(c => ({ kind: k, n: (c?.n ?? 0) + 1 }))
  }, [on, phase])
  const clear = useCallback(() => setCur(null), [])
  if (!on || !cur) return null
  return <TransOverlay key={cur.n} kind={cur.kind} onDone={clear} />
}
