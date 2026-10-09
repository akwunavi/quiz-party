// ═══ Лаборатория: «Кроссворд» — выбранный ведущим концепт «Созвездие светлячков» (A и B отклонены) ═══
// Сцены: активный кроссворд (идёт слово) и разбор ответов команд (слово за словом, ответы по буквам, ✓/✗,
// переход к следующему слову), плюс итог. Рисунок — общий с игрой (forest/stage3/CrosswordC.tsx), здесь только
// тестовые данные вечера и один перематываемый таймлайн на состояние.
import { useEntrance, type S1Props } from '../../forest/stage1/common'
import { timer3 } from '../../forest/stage3/common3'
import { CrosswordScene, CWC_NOTE, X0, ANSY, cwGeom, type CwPart } from '../../forest/stage3/CrosswordC'
import { rowGeom } from '../../forest/stage3/cwModel'
import { CWM, CWT, CW_ANS, CW_TIMER, RANKED, sceneOf, shown, total, verdict } from '../../forest/stage3/cwcommon'
export { CW_STATES } from '../../forest/stage3/cwcommon'

export const CW_VARIANTS = [
  { id: 'C', name: 'Созвездие светлячков', note: CWC_NOTE },
]

const m = CWM
const part = (num: number, cls: string, covered: boolean): CwPart => ({
  num, cls, covered, hidden: covered, recExtra: covered ? ' · ответили 6 команд' : '', clue: m.W(num).clue, judged: true,
  rows: CWT.map((t, ti) => ({ key: ti, name: t.name, color: t.color, answer: CW_ANS[num][ti], verdict: verdict(num, ti) })),
})

export function Crossword({ state, nOv, onReady }: S1Props) {
  const sc = sceneOf(state), rev = sc.rev, cur = sc.cur
  const mode = !rev ? 'question' : sc.complete ? 'complete' : 'review'
  const { cx, cy, orb } = cwGeom(m, mode)
  const { COL } = rowGeom(CWT.length, m.W(cur)?.word.length ?? 0)
  const tm = timer3(rev ? 'reveal' : 'question', CW_TIMER)
  const wc = m.wordCells(cur)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (!rev) {
      tl.fromTo(q('.cwC-dust i'), { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.01 }, 0)
        .fromTo(q('.cwC-line'), { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.08, ease: 'power2.out' }, 0.2)
        .fromTo(q('.cwC-orb'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: { each: 0.016, from: 'random' }, ease: 'back.out(2)' }, 0.4)
        .fromTo(q('.cwC-clue'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.2)
    } else if (!sc.complete) {
      tl.fromTo(q('.cwC-orb, .cwC-line, .cwC-dust i'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
      tl.addLabel('P', 0.4)
      tl.fromTo(q('.cwC-veil'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.2)
      tl.fromTo(q('.cwC-rec.p1, .cwC-lab.p1, .cwC-nm.p1'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 }, 0.5)
      tl.fromTo(q('.cwC-trow.p1 .ch, .cwC-ans.p1 .ch'), { opacity: 0 }, { opacity: 0, duration: 0.01 }, 0.5)
      tl.fromTo(q('.cwC-trow.p1 .cwC-lt, .cwC-ans.p1 .cwC-lt'), { opacity: 0, scale: 0.4 }, { opacity: 0, scale: 0.4, duration: 0.01 }, 0.5)
      tl.fromTo(q('.cwC-trow.p1 .cwC-mk'), { opacity: 0, scale: 0 }, { opacity: 0, scale: 0, duration: 0.01 }, 0.5)
      tl.addLabel('R', 1.6)
      // слово взлетает с карты в колонку букв
      wc.forEach((c, k) => {
        const el = q(`.cwC-lift[data-k="${k}"]`)[0], fx = cx(c.c) - (X0 + k * COL + COL / 2), fy = cy(c.r) - ANSY, at = 1.6 + k * 0.12, land = at + 1.0
        if (el) tl.fromTo(el, { x: fx, y: fy, scale: orb / 54, opacity: 1 }, { keyframes: [{ x: fx * 0.4, y: fy * 0.4 - 60, scale: 1.1, duration: 0.55, ease: 'sine.inOut' }, { x: 0, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }] }, at)
          .to(el, { opacity: 0, duration: 0.15 }, land)
        tl.fromTo(q(`.cwC-beam[data-k="${k}"]`), { strokeDashoffset: 600, opacity: 0 }, { strokeDashoffset: 0, opacity: 0.9, duration: 0.6, ease: 'power1.out' }, at)
          .to(q(`.cwC-beam[data-k="${k}"]`), { opacity: 0, duration: 0.5 }, land - 0.1)
          .fromTo(q(`.cwC-ans.p1 .cwC-lt:nth-child(${k + 1})`), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.2 }, land)
      })
      const k0 = 1.6 + wc.length * 0.12 + 1.0
      tl.fromTo(q('.cwC-ans.p1 .ch'), { opacity: 0 }, { opacity: 1, duration: 0.35, stagger: 0.12 }, k0 - 0.4)
        .fromTo(q('.cwC-orb[data-cur]:not([data-old])'), { '--on': 0, '--glow': 0.6 }, { '--on': 1, '--glow': 1, duration: 0.35, stagger: (i, el) => Number((el as HTMLElement).dataset.k) * 0.12, ease: 'power1.out' }, k0 - 0.4)
      const T = k0 + wc.length * 0.12 + 0.8
      tl.addLabel('T', T)
      CWT.forEach((_, ti) => {
        tl.fromTo(q(`.cwC-trow.p1[data-ti="${ti}"] .cwC-lt`), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(2)' }, T + ti * 0.55)
          .fromTo(q(`.cwC-trow.p1[data-ti="${ti}"] .ch`), { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: 0.05 }, T + ti * 0.55 + 0.1)
          .fromTo(q(`.cwC-trow.p1[data-ti="${ti}"] .cwC-mk`), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2.5)' }, T + ti * 0.55 + 0.35)
      })
      if (sc.next != null) {
        const N = T + CWT.length * 0.55 + 1.6
        tl.addLabel('N', N)
        tl.to(q('.cwC-rec.p1, .cwC-lab.p1, .cwC-nm.p1, .cwC-trow.p1, .cwC-ans.p1'), { opacity: 0, y: 20, duration: 0.5, stagger: 0.02 }, N)
          .fromTo(q('.cwC-rec.p2, .cwC-lab.p2, .cwC-nm.p2, .cwC-trow.p2, .cwC-ans.p2'), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.03 }, N + 0.5)
          .fromTo(q('.cwC-orb[data-nx]'), { '--glow': 0.3 }, { '--glow': 1, duration: 0.7, stagger: 0.05 }, N + 0.2)
          .fromTo(q('.cwC-line[data-nx]'), { '--hot': 0 }, { '--hot': 1, duration: 0.7 }, N + 0.2)
      }
    } else {
      tl.fromTo(q('.cwC-orb'), { '--glow': 0.4, scale: 1 }, { '--glow': 1, scale: 1.12, duration: 0.5, yoyo: true, repeat: 1, stagger: { each: 0.02, from: 'center' } }, 0.2)
        .fromTo(q('.cwC-tally > *'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.1 }, 0.6)
    }
  }, tm, [state])
  const n = nOv ?? (tm ? nLive : null)
  const parts = rev && !sc.complete ? [part(cur, 'p1', false), ...(sc.next != null ? [part(sc.next, 'p2', true)] : [])] : undefined
  return (
    <CrosswordScene m={m} mode={mode} title="Литературный кроссворд" qn={cur > 8 ? 8 : cur} qcount={m.grid.words.length}
      cur={cur} next={sc.next} past={x => x < cur} shown={x => shown(x, sc)} clue={!rev ? { text: m.W(cur).clue } : undefined}
      parts={parts} lifts={rev && !sc.complete}
      tally={sc.complete ? { rows: RANKED.map(t => ({ key: t.i, name: t.name, color: t.color, pips: m.nums.map(num => verdict(num, t.i)), sum: total(t.i) })) } : undefined}
      n={n} total={CW_TIMER} rootRef={root} cls={`st-${state}${rev ? ' rev' : ''}`} />
  )
}
