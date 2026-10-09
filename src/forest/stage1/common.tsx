// ═══ Этап 1 — общий каркас экрана механики ═══
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ForestBackdrop, type Rect, type Mood } from './env'
import { forestScene, useForestScene, useInShell } from '../shell'
import { tphase } from './timers'
import type { RoundIntroData } from './data'

// одна сборка таймлайна обслуживает все состояния: пустые выборки (нет такого элемента в этом
// состоянии) — норма, а не ошибка; без этого консоль сыплет «GSAP target not found»
gsap.config({ nullTargetWarn: false })

export type Variant = 'A' | 'B' | 'C'
export type S1Api = { tl: gsap.core.Timeline; setTimer: (n: number) => void; dispose?: () => void }
export type S1Props = { variant: Variant; state: string; nOv: number | null; onReady: (a: S1Api) => void; /** блиц: сколько команд (3 / 5 / 8) */ teams?: number }

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
  // В игре лес общий для всех экранов (forest/shell.tsx): экран лишь сообщает, где его содержимое и какое «настроение»;
  // в лаборатории каждый экран рисует свой холст, как раньше.
  const shell = useInShell()
  useForestScene({ rects, mood }, `${mood}|${rects.map(r => `${r.x},${r.y},${r.w},${r.h}`).join('|')}`)
  useEffect(() => { if (shell && pulse) forestScene.pulse() }, [shell, pulse])
  return (
    <div className={`s1 ${cls}`} ref={rootRef} data-mood={mood}>
      {!shell && <ForestBackdrop rects={rects} mood={mood} pulse={pulse} />}
      {children}
    </div>
  )
}

/** Вступление раунда — те же поля, что в игре (HostScreen, phase 'round_intro'): «Раунд N»
 *  крупно в углу, название (строки из редактора), короткая подсказка под ним, правила — списком
 *  01, 02… сбоку. Лес раздвигает ветви, из земли поднимается эмблема механики, правила проступают
 *  на листьях по одному. Нет правил — заголовок по центру. */
export function RoundIntro({ intro, emblem }: { intro: RoundIntroData; emblem: ReactNode }) {
  const side = intro.rules.length > 0
  return (
    <div className={`s1-intro${side ? ' side' : ''}`}>
      <div className="s1-intro-badge"><span>Раунд</span><b>{intro.num}</b></div>
      <div className="s1-intro-main">
        <div className="s1-intro-emb">{emblem}</div>
        <h1 className="s1-intro-title">{intro.titleLines.map((ln, li) => <span key={li} className="ln">{ln.split('').map((ch, i) => <span key={i} className="ch">{ch === ' ' ? '\u00a0' : ch}</span>)}</span>)}</h1>
        <div className="s1-intro-meta">{intro.meta}</div>
      </div>
      {side && <ol className="s1-intro-rules">
        {intro.rules.map((r, i) => <li key={i} className="w"><span className="idx">{String(i + 1).padStart(2, '0')}</span><span className="t">{r}</span></li>)}
      </ol>}
    </div>
  )
}
export function introTl(tl: gsap.core.Timeline, q: (s: string) => Element[]) {
  tl.fromTo(q('.s1-intro-emb'), { opacity: 0, scale: 0.6, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'back.out(1.4)' }, 0.2)
    .fromTo(q('.s1-intro-badge'), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 0.4)
    .fromTo(q('.s1-intro-meta'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 1.3)
    .fromTo(q('.s1-intro-title .ch'), { opacity: 0, y: 30, rotation: -8 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: 0.04, ease: 'back.out(1.8)' }, 0.8)
    .fromTo(q('.s1-intro-rules .w'), { opacity: 0, x: -24, clipPath: 'inset(0 100% 0 0 round 40px)' }, { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0 round 40px)', duration: 0.6, stagger: 0.45, ease: 'power2.out' }, 1.7)
}
