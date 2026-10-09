// ═══ Рандомайзер: общий движок показа (три концепта — три разных мира вокруг него) ═══
// Механика не меняется: составы заданы заранее (GROUPS / GROUPS8), здесь только показ. Положение каждого имени считает
// тикер gsap по времени таймлайна (перемотка ставит onUpdate на паузу — тикер её не боится). Фаза 1: имена всплывают и
// кружатся по траектории мира; фаза 2: по одному ложатся в свою команду; команда «расцветает», когда состав собран.
import { useEffect, type MutableRefObject, type ReactNode } from 'react'
import gsap from 'gsap'
import type { S1Api } from '../../stage1/common'
import { rzPeople, tcol } from './core'
import { ALL } from '../data'

export type XY = { x: number; y: number }
export const LAND0 = 3.4, STEP = 0.11, DUR = 0.8, SW0 = 0.9
export type RzMode = 'intro' | 'run' | 'done' | 'back'
export type RzCfg = {
  cls: string
  /** траектория вихря: i — человек, s ∈ [0..1] — «время» вихря, o ∈ [0..1) — его доля по кругу */
  swirl: (i: number, s: number, o: number, K: number) => XY
  /** значок команды над списком: размер зависит от числа команд */
  Sigil: (p: { hue: number; gi: number; size: number }) => ReactNode
  /** верх списка имён и верх значка */
  layout: (gi: number, K: number) => { cx: number; names: number; sigil: number; size: number; pitch: number }
}

export function useRzTicker(apiRef: MutableRefObject<S1Api | null>, pills: MutableRefObject<HTMLElement[]>, K: 4 | 8 | 0, mode: RzMode | undefined, cfg: RzCfg) {
  useEffect(() => {
    if (!K || !mode) return
    const { people, order, N } = rzPeople(K)
    const fin = people.map(p => { const L = cfg.layout(p.gi, K); return { x: L.cx, y: L.names + p.j * L.pitch } })
    const tick = () => {
      const t = (apiRef.current?.tl.time() ?? 0) + (mode === 'done' || mode === 'back' ? 20 : 0)
      const total = N * STEP + DUR
      const sw = Math.max(0, Math.min(1, (t - SW0) / (LAND0 + total - SW0)))
      const land = mode === 'intro' ? 0 : Math.max(0, Math.min(1, (t - LAND0) / total))
      pills.current.forEach((el, i) => {
        if (!el) return
        const u = Math.max(0, Math.min(1, (land * total - order[i] * STEP) / DUR)), e = u * u * (3 - 2 * u)
        const sp = cfg.swirl(i, sw, order[i] / N, K), f = fin[i]
        el.style.transform = `translate(${sp.x + (f.x - sp.x) * e - f.x}px, ${sp.y + (f.y - sp.y) * e - f.y}px) scale(${0.82 + 0.18 * e})`
        el.style.opacity = String(mode === 'back' ? 0 : Math.min(1, sw * 14))
        el.classList.toggle('landed', e > 0.98)
      })
    }
    gsap.ticker.add(tick); tick()
    return () => gsap.ticker.remove(tick)
  })
}

export function RzLayer({ K, cfg, pills }: { K: 4 | 8; cfg: RzCfg; pills: MutableRefObject<HTMLElement[]> }) {
  const { people, groups } = rzPeople(K)
  return <div className={`rz3 ${cfg.cls}${K === 8 ? ' k8' : ''}`}>
    <div className="rz-head"><b>Составы команд</b><span>{K} · {people.length} чел.</span></div>
    {groups.map((_, gi) => { const L = cfg.layout(gi, K), hue = ALL[gi].hue
      return <div key={gi} className="rz-grp" data-g={gi} style={{ left: L.cx - 190, top: L.sigil, width: 380, ['--tc' as string]: tcol(hue) }}>
        <div className="rz-sg" style={{ height: L.size }}>{cfg.Sigil({ hue, gi, size: L.size })}</div>
        <div className="rz-gn" style={{ color: tcol(hue) }}>Команда {gi + 1}</div>
      </div> })}
    {people.map((p, i) => { const L = cfg.layout(p.gi, K)
      return <span key={i} ref={el => { if (el) pills.current[i] = el }} className="rz-n" style={{ left: L.cx - 115, top: L.names + p.j * L.pitch - 20, opacity: 0, ['--tc' as string]: tcol(ALL[p.gi].hue) }}>{p.name}</span> })}
  </div>
}

/** таймлайн показа рандомайзера. База 0.5 с: мир затихает; дальше — вихрь и посадка по командам */
export function rzBuild(tl: gsap.core.Timeline, q: (s: string) => Element[], K: 4 | 8, mode: RzMode, lobby: string, onLand?: (at: number, gi: number) => void) {
  const { groups, order, people, N } = rzPeople(K)
  if (mode === 'back') {
    tl.fromTo(q(lobby), { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.05 }, 0.5)
      .fromTo(q('.rz-veil'), { opacity: 1 }, { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, 0.3)
      .fromTo(q('.rz-head, .rz-grp'), { opacity: 1 }, { opacity: 0, duration: 0.8, stagger: 0.04 }, 0.2)
    return
  }
  if (mode === 'done') {
    tl.set(q(lobby), { opacity: 0 }, 0).set(q('.rz-veil, .rz-head, .rz-grp'), { opacity: 1 }, 0)
      .fromTo(q('.rz-grp .rz-gn'), { opacity: 0.35, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(2)' }, 0.3)
      .fromTo(q('.rz-grp .rz-sg'), { filter: 'brightness(1.9)' }, { filter: 'brightness(1)', duration: 1.2, stagger: 0.12 }, 0.3)
      .to({}, { duration: 2.4 }, 0)
    return
  }
  tl.to(q(lobby), { opacity: 0, duration: 0.8 }, 0.1)
    .fromTo(q('.rz-veil'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.1)
    .fromTo(q('.rz-head'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
  if (mode === 'intro') { tl.fromTo(q('.rz-grp'), { opacity: 0, y: 14 }, { opacity: 0.0, y: 0, duration: 0.01 }, 0.6).to({}, { duration: 4.6 }, 0); return }
  tl.fromTo(q('.rz-grp'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, LAND0 - 1.0)
  groups.forEach((g, gi) => {
    const last = Math.max(...g.map((nm, j) => order[people.findIndex(p => p.gi === gi && p.j === j)])) * STEP + DUR
    tl.fromTo(q(`.rz-grp[data-g="${gi}"] .rz-sg`), { filter: 'brightness(1)' }, { filter: 'brightness(1.9)', duration: 0.4, yoyo: true, repeat: 1 }, LAND0 + last)
    onLand?.(LAND0 + last, gi)
    tl
      .fromTo(q(`.rz-grp[data-g="${gi}"] .rz-gn`), { scale: 0.9 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, LAND0 + last)
  })
  tl.to({}, { duration: LAND0 + N * STEP + DUR + 0.8 }, 0.1)
}
