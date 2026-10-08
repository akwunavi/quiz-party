// ═══ Этап 1 — общий каркас экрана механики ═══
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ForestBackdrop, type Rect, type Mood } from './env'
import { tphase } from './timers'

export type Variant = 'A' | 'B' | 'C'
export type S1Api = { tl: gsap.core.Timeline; setTimer: (n: number) => void; dispose?: () => void }
export type S1Props = { variant: Variant; state: string; nOv: number | null; onReady: (a: S1Api) => void }

/** Таймлайн входа в состояние + «живой» таймер внутри него (пауза/перемотка лаборатории управляют и им). */
export function useEntrance(onReady: (a: S1Api) => void, build: (tl: gsap.core.Timeline, q: (s: string) => Element[]) => void,
  timer: { start: number; from: number; run: number } | null, deps: unknown[]) {
  const root = useRef<HTMLDivElement>(null)
  const [nLive, setNLive] = useState(timer?.start ?? 0)
  const ov = useRef<number | null>(null)
  const [, force] = useState(0)
  useLayoutEffect(() => {
    const q = gsap.utils.selector(root)
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    tl.addLabel('A', 0)
    build(tl, q)
    // таймер читается из положения таймлайна в каждом кадре — перемотка и «сразу результат» дают верное число
    let tick: (() => void) | null = null
    if (timer) {
      tl.to({}, { duration: 0.01 }, timer.from + timer.run)
      let last = -1
      tick = () => { const v = Math.max(0, Math.ceil(timer.start - Math.min(timer.run, Math.max(0, tl.time() - timer.from)))); if (v !== last) { last = v; setNLive(v) } }
      gsap.ticker.add(tick)
    }
    tl.addLabel('E', Math.max(tl.duration(), 0.1))
    tl.to({}, { duration: 0.6 })
    onReady({ tl, setTimer: n => { const v = n === 999 ? null : n; if (ov.current !== v) { ov.current = v; force(x => x + 1) } } })
    return () => { tl.kill(); if (tick) gsap.ticker.remove(tick) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return { root, n: ov.current ?? nLive }
}

export function S1Screen({ rects, n, children, rootRef, pulse = 0, cls = '', moodOverride }: { rects: Rect[]; n: number | null; children: ReactNode; rootRef: React.RefObject<HTMLDivElement>; pulse?: number; cls?: string; moodOverride?: Mood }) {
  const mood: Mood = moodOverride ?? (n == null ? 'calm' : tphase(n) === 'warning' ? 'warning' : tphase(n) === 'zero' ? 'zero' : 'calm')
  return (
    <div className={`s1 ${cls}`} ref={rootRef} data-mood={mood}>
      <ForestBackdrop rects={rects} mood={mood} pulse={pulse} />
      {children}
    </div>
  )
}

/** Вступление раунда — общий приём этапа 1: лес раздвигает ветви, из земли поднимается
 *  «вывеска» раунда из сплетённых побегов, правила проступают строками. У каждой механики
 *  своя эмблема (передаётся как emblem). */
export function RoundIntro({ title, rules, emblem, num }: { title: string; rules: string; emblem: ReactNode; num: string }) {
  return (
    <div className="s1-intro">
      <div className="s1-intro-emb">{emblem}</div>
      <div className="s1-intro-num">{num}</div>
      <h1 className="s1-intro-title">{title.split('').map((ch, i) => <span key={i} className="ch">{ch === ' ' ? ' ' : ch}</span>)}</h1>
      <p className="s1-intro-rules">{rules.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}</p>
    </div>
  )
}
export function introTl(tl: gsap.core.Timeline, q: (s: string) => Element[]) {
  tl.fromTo(q('.s1-intro-emb'), { opacity: 0, scale: 0.6, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'back.out(1.4)' }, 0.2)
    .fromTo(q('.s1-intro-num'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
    .fromTo(q('.s1-intro-title .ch'), { opacity: 0, y: 30, rotation: -8 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: 0.04, ease: 'back.out(1.8)' }, 0.8)
    .fromTo(q('.s1-intro-rules .w'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.03 }, 1.5)
}
