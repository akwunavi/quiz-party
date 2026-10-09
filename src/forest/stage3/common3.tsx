// ═══ Этап 3 — общие детали концептов: шапка, одуванчик-таймер, состояние таймера ═══
import { Dandelion } from '../stage1/timers'

export const head = (title: string, qn: number, qcount: number, extra?: string) => (
  <div className="s3-head"><b>{title}</b><span>вопрос {qn} / {qcount}{extra}</span></div>
)
/** Единый таймер всех экранов с «стоящим» одуванчиком: размер и место — как на утверждённых экранах с фото
 *  (голова ≈ 260 px, центр (206, 800)), стебель короткий, внизу трава. Поменять размер нужно ЗДЕСЬ, а не на экранах. */
export const TM = { x: 206, headY: 800, size: 375, stem: 190, rooted: 30 }
export function Timer({ n, total }: { n: number | null; total: number }) {
  if (n == null) return null
  return <div className="s3-tm" style={{ left: TM.x - TM.size / 2, top: TM.headY - TM.size / 2 }}><Dandelion n={n} total={total} size={TM.size} seeds={Math.min(total, 30)} stem={TM.stem} rooted={TM.rooted} /></div>
}
/** Таймер вопроса: стартует, когда вопрос встал на место; в «подсказках» — уже последние секунды. */
export function timer3(state: string, total: number) {
  if (state === 'question') return { start: total, from: 1.6, run: 8 }
  if (state === 'hints') return { start: 12, from: 0.6, run: 4 }
  return null
}
