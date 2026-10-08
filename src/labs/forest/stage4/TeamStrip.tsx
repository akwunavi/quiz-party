// Полоса «Ответы команд» под разбором (Сопоставление, Порядок): шесть листов-карточек в ряд. Ответ — так, как команда
// отправила его с телефона («1Б 2В 3А 4Г» / «БВГА»); ✓ — совпал с верным, ✗ — нет, «—» — не ответили.
import { CWT } from '../stage3/cwcommon'
import type { TRow } from './data'

const LEAF = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'
export function TeamStrip({ rows, top = 958 }: { rows: TRow[]; top?: number }) {
  return <div className="s4-strip" style={{ top }}>
    {CWT.map((t, i) => { const r = rows[i]; return <div key={i} className={`s4-sl ${r.ok === true ? 'ok' : r.ok === false ? 'no' : 'nil'}`}>
      <svg className="bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={LEAF} /></svg>
      <span className="nm" style={{ color: t.color }}>{t.name}</span>
      <span className="txt">{r.text ?? 'не ответили'}</span>
      <i className="mk">{r.ok === true ? '✓' : r.ok === false ? '✗' : '—'}</i>
    </div> })}
  </div>
}
/** ответы команд по правильной строке: три команды верно, одна путает последнюю пару, одна — первую, одна не ответила */
export function rowsFrom(parts: string[], join: string): TRow[] {
  const swap = (a: number, b: number) => { const c = [...parts]; [c[a], c[b]] = [c[b], c[a]]; return c.join(join) }
  const right = parts.join(join), n = parts.length
  return [{ text: right, ok: true }, { text: right, ok: true }, { text: swap(n - 2, n - 1), ok: false }, { text: swap(0, 1), ok: false }, { text: right, ok: true }, { text: null, ok: null }]
}
