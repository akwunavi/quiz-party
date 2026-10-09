// ═══ Рандомайзер команд: показ готового результата ═══
// Источник истины — составы, которые ведущий опубликовал из пульта (`random_groups` в game_sessions): здесь они только
// ПОКАЗЫВАЮТСЯ. Имена вылетают из лунного круга и кружатся каруселью вокруг ворот (неизвестность), затем по одному
// опускаются в свою команду; когда состав собран, фонарь команды вспыхивает. Положение каждого имени считает тикер gsap
// по времени таймлайна, поэтому перемотка в лаборатории и обычный ход в игре дают одну и ту же картину.
import { useEffect, type MutableRefObject } from 'react'
import gsap from 'gsap'
import { Lantern } from './Lantern'
import { hueOf, tcol } from '../util'
import { teamColor } from '../../lib/teamColors'

export type XY = { x: number; y: number }
export const LAND0 = 3.4, STEP = 0.11, DUR = 0.8, SW0 = 0.9
export type RzMode = 'intro' | 'run' | 'done' | 'back'

/** Перестановка 0..N-1 по содержимому составов: один и тот же порядок посадки при обновлении страницы. */
function seededOrder(groups: string[][]) {
  const N = groups.reduce((a, g) => a + g.length, 0)
  let h = 2166136261
  for (const s of groups.flat()) for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  const rnd = () => { h = (Math.imul(h, 1664525) + 1013904223) >>> 0; return h / 4294967296 }
  const a = Array.from({ length: N }, (_, i) => i)
  for (let i = N - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
export function rzPeople(groups: string[][]) {
  const people = groups.flatMap((m, gi) => m.map((name, j) => ({ name, gi, j })))
  return { people, order: seededOrder(groups), N: people.length, groups }
}
export type GroupSlot = { cx: number; names: number; sigil: number; size: number; pitch: number }
/** Раскладка списков: до 4 команд — один ряд, 5–8 — два; шаг строки подстраивается под самый большой состав. */
export function rzLayout(K: number, groups: string[][]): (gi: number) => GroupSlot {
  const maxLen = Math.max(1, ...groups.map(g => g.length)), cols = Math.min(K, 4)
  return gi => {
    const cx = 1100 + ((gi % cols) - (cols - 1) / 2) * 410
    if (K <= 4) return { cx, names: 650, sigil: 330, size: 190, pitch: Math.max(28, Math.min(52, 380 / maxLen)) }
    const small = maxLen <= 4
    return gi < 4
      ? { cx, names: small ? 420 : 300, sigil: small ? 210 : 130, size: small ? 140 : 110, pitch: Math.max(26, Math.min(44, (small ? 140 : 250) / maxLen)) }
      : { cx, names: small ? 780 : 740, sigil: small ? 570 : 575, size: small ? 140 : 110, pitch: Math.max(26, Math.min(44, 280 / maxLen)) }
  }
}
const swirl = (o: number, s: number, K: number): XY => { const a = o * Math.PI * 2 + s * Math.PI * 6; return { x: 1030 + Math.cos(a) * (K > 4 ? 760 : 700), y: 540 + Math.sin(a) * 230 - Math.sin(s * Math.PI) * 30 } }

export function useRzTicker(getTime: () => number, pills: MutableRefObject<HTMLElement[]>, groups: string[][] | null, mode: RzMode | undefined) {
  useEffect(() => {
    if (!groups || !groups.length || !mode) return
    const { people, order, N } = rzPeople(groups), K = groups.length, lay = rzLayout(K, groups)
    const fin = people.map(p => { const L = lay(p.gi); return { x: L.cx, y: L.names + p.j * L.pitch } })
    const tick = () => {
      const t = getTime() + (mode === 'done' || mode === 'back' ? 20 : 0)
      const total = N * STEP + DUR
      const sw = Math.max(0, Math.min(1, (t - SW0) / (LAND0 + total - SW0)))
      const land = mode === 'intro' ? 0 : Math.max(0, Math.min(1, (t - LAND0) / total))
      pills.current.forEach((el, i) => {
        if (!el) return
        const u = Math.max(0, Math.min(1, (land * total - order[i] * STEP) / DUR)), e = u * u * (3 - 2 * u)
        const sp = swirl(order[i] / N, sw, K), f = fin[i]
        el.style.transform = `translate(${sp.x + (f.x - sp.x) * e - f.x}px, ${sp.y + (f.y - sp.y) * e - f.y}px) scale(${0.82 + 0.18 * e})`
        el.style.opacity = String(mode === 'back' ? 0 : Math.min(1, sw * 14))
        el.classList.toggle('landed', e > 0.98)
      })
    }
    gsap.ticker.add(tick); tick()
    return () => gsap.ticker.remove(tick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, mode])
}

export function RzLayer({ groups, pills }: { groups: string[][]; pills: MutableRefObject<HTMLElement[]> }) {
  const { people } = rzPeople(groups), K = groups.length, lay = rzLayout(K, groups)
  const players = people.length
  return <div className={`rz3 rz-B${K > 4 ? ' k8' : ''}`}>
    <div className="rz-head"><b>Составы команд</b><span>{K} · {players} чел.</span></div>
    {groups.map((_, gi) => { const L = lay(gi), hue = hueOf(teamColor(gi))
      return <div key={gi} className="rz-grp" data-g={gi} style={{ left: L.cx - 190, top: L.sigil, width: 380 }}>
        <div className="rz-sg b-sg" style={{ height: L.size }}><Lantern hue={hue} id={`sg${gi}`} /></div>
        <div className="rz-gn" style={{ color: tcol(hue) }}>Команда {gi + 1}</div>
      </div> })}
    {people.map((p, i) => { const L = lay(p.gi)
      return <span key={i} ref={el => { if (el) pills.current[i] = el }} className="rz-n"
        style={{ left: L.cx - 115, top: L.names + p.j * L.pitch - 20, opacity: 0, ['--tc' as string]: tcol(hueOf(teamColor(p.gi))) }}>{p.name}</span> })}
  </div>
}

/** Таймлайн показа. `lobby` — селектор того, что в лобби прячется под вуаль. */
export function rzBuild(tl: gsap.core.Timeline, q: (s: string) => Element[], groups: string[][], mode: RzMode, lobby: string, onLand?: (at: number, gi: number) => void) {
  const { groups: gs, order, people, N } = rzPeople(groups)
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
  if (mode === 'intro') { tl.to({}, { duration: 4.6 }, 0); return }
  tl.fromTo(q('.rz-grp'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, LAND0 - 1.0)
  gs.forEach((g, gi) => {
    const last = Math.max(...g.map((_, j) => order[people.findIndex(p => p.gi === gi && p.j === j)])) * STEP + DUR
    tl.fromTo(q(`.rz-grp[data-g="${gi}"] .rz-sg`), { filter: 'brightness(1)' }, { filter: 'brightness(1.9)', duration: 0.4, yoyo: true, repeat: 1 }, LAND0 + last)
    onLand?.(LAND0 + last, gi)
    tl.fromTo(q(`.rz-grp[data-g="${gi}"] .rz-gn`), { scale: 0.9 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, LAND0 + last)
  })
  tl.to({}, { duration: LAND0 + N * STEP + DUR + 0.8 }, 0.1)
}
