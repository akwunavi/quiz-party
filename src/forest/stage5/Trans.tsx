// ═══ Этап 5 · Переходы ═══
// Между экранами игры (лобби → правила → раунд → табло → перерыв → финал) — короткая вставка 1.2–1.8 с, устройства леса поверх
// двух экранов: плющ-занавес, ветер с листьями, вспышка светлячков, лепестки, туман, раскрывающийся цветок.
// Устройства (TransDevices) общие. Лаборатория (labs/forest/stage5Lab.tsx) показывает их между двумя карточками-заглушками
// полным таймлайном. В игре (TransOverlay) экран под вставкой меняется в момент смены фазы — смену держать нельзя, не трогая
// игру, поэтому играет вторая половина вставки: устройство уже закрывает кадр и уходит, открывая новый экран.
import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import type { TransKind } from './views'

const rng = (i: number) => Math.abs((Math.sin(i * 91.7 + 13.1) * 43758.5453) % 1)
export type Bit = { y: number; d: number; s: number; r: number }
export const transBits = (): Bit[] => Array.from({ length: 40 }, (_, i) => ({ y: 60 + rng(i) * 960, d: rng(i + 5) * 0.5, s: 0.7 + rng(i + 9), r: rng(i + 3) * 360 }))

export function TransDevices({ state, bits }: { state: string; bits: Bit[] }) {
  return <>
    {state === 'vine' && <><div className="tr-veil" /><svg className="tr-vine" viewBox="0 0 1920 1080" aria-hidden>{Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${130 + i * 280} -20 C ${60 + i * 280} 260 ${230 + i * 280} 420 ${130 + i * 280} 560 S ${60 + i * 280} 860 ${150 + i * 280} 1100`} />)}</svg></>}
    {state === 'wind' && bits.slice(0, 26).map((b, i) => <i key={i} className="tr-leaf" style={{ top: b.y, transform: `scale(${b.s})` }} />)}
    {state === 'fly' && <><div className="tr-flash" />{Array.from({ length: 36 }, (_, i) => <i key={i} className="tr-orb" style={{ left: 960, top: 540 }} />)}</>}
    {state === 'petal' && bits.map((b, i) => <i key={i} className="tr-pet" style={{ top: b.y - 140, ['--h' as string]: (i * 37) % 360 }} />)}
    {state === 'mist' && [0, 1, 2, 3].map(i => <div key={i} className="tr-fog" style={{ top: i * 270 }} />)}
    {state === 'bloom' && <svg className="tr-iris" viewBox="-300 -300 600 600" aria-hidden>{Array.from({ length: 8 }, (_, i) => <g key={i} transform={`rotate(${i * 45})`}><ellipse className="p" cx="0" cy="-150" rx="60" ry="150" /></g>)}<circle r="46" fill="#f0c055" /></svg>}
  </>
}

/** Вторая половина вставки (с момента, когда в лаборатории меняются карточки). Длительность ≤ 1.8 с. */
function overlayBuild(tl: gsap.core.Timeline, q: (s: string) => Element[], kind: TransKind, bits: Bit[]) {
  if (kind === 'vine') {
    tl.set(q('.tr-vine path'), { strokeDashoffset: 0 }, 0).set(q('.tr-veil'), { opacity: 1 }, 0)
      .to(q('.tr-vine path'), { strokeDashoffset: -1400, duration: 0.7, stagger: 0.06, ease: 'power2.in' }, 0.1)
      .to(q('.tr-veil'), { opacity: 0, duration: 0.5 }, 0.2)
  }
  if (kind === 'wind') tl.fromTo(q('.tr-leaf'), { x: -400, opacity: 0, rotation: (i: number) => i * 40 }, { x: 2400, opacity: 1, rotation: (i: number) => i * 40 + 540, duration: 1.5, stagger: 0.03, ease: 'power1.inOut' }, 0)
  if (kind === 'fly') {
    q('.tr-orb').forEach((el, i) => tl.fromTo(el, { x: 0, y: 0, opacity: 1, scale: 0.4 }, { x: Math.cos(i) * (300 + (i % 7) * 120), y: Math.sin(i) * (200 + (i % 5) * 90), scale: 1.2, duration: 0.9, ease: 'power2.out' }, 0).to(el, { opacity: 0, duration: 0.6 }, 0.8))
    tl.fromTo(q('.tr-flash'), { opacity: 0.95 }, { opacity: 0, duration: 0.45 }, 0)
  }
  if (kind === 'petal') tl.fromTo(q('.tr-pet'), { x: -200, opacity: 0 }, { x: (i: number) => 2100 + (i % 4) * 80, opacity: 1, y: (i: number) => bits[i].y + 140, rotation: (i: number) => bits[i].r + 500, duration: 1.7, stagger: 0.025, ease: 'sine.inOut' }, 0)
  if (kind === 'mist') tl.set(q('.tr-fog'), { xPercent: 0 }, 0).to(q('.tr-fog'), { xPercent: 110, duration: 0.8, stagger: 0.1, ease: 'power2.in' }, 0.1)
  if (kind === 'bloom') tl.set(q('.tr-iris'), { scale: 1, rotation: 50 }, 0).to(q('.tr-iris'), { scale: 3.2, opacity: 0, rotation: 90, duration: 0.8, ease: 'power2.out' }, 0)
}

/** Вставка поверх экранов игры. Не перехватывает клики; сама себя убирает (`onDone`). */
export function TransOverlay({ kind, onDone }: { kind: TransKind; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const bits = useMemo(transBits, [])
  const done = useRef(onDone); done.current = onDone
  useLayoutEffect(() => {
    const q = gsap.utils.selector(root)
    const tl = gsap.timeline({ onComplete: () => done.current() })
    overlayBuild(tl, q, kind, bits)
    return () => { tl.kill() }
  }, [kind, bits])
  return <div ref={root} className={`s5 tr tr-ov tr-${kind}`} aria-hidden><TransDevices state={kind} bits={bits} /></div>
}
