// ═══ Этап 3 — общие детали концептов: шапка, одуванчик-таймер, состояние таймера ═══
import { Dandelion } from '../stage1/timers'

export const head = (title: string, qn: number, qcount: number) => (
  <div className="s3-head"><b>{title}</b><span>вопрос {qn} / {qcount}</span></div>
)
/** Одуванчик на своём стебле; base — где у стебля земля (px от верха экрана). */
export function Timer({ n, total, x, base, size = 190, rooted = 120 }: { n: number | null; total: number; x: number; base: number; size?: number; rooted?: number }) {
  if (n == null) return null
  const h = size * (520 + rooted) / 340
  return <div className="s3-tm" style={{ left: x - size / 2, top: base - h }}><Dandelion n={n} total={total} size={size} seeds={Math.min(total, 30)} rooted={rooted} /></div>
}
/** Таймер вопроса: стартует, когда вопрос встал на место; в «подсказках» — уже последние секунды. */
export function timer3(state: string, total: number) {
  if (state === 'question') return { start: total, from: 1.6, run: 8 }
  if (state === 'hints') return { start: 12, from: 0.6, run: 4 }
  return null
}
