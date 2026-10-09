// «Ответы команд» в разборах Леса: колонка справа (обычные вопросы) и полоса снизу (Сопоставление, Порядок).
// Рисунок — утверждённый в лаборатории (лист на каждую команду: имя её цветом, ответ, ✓ / ✗ / «—»). Данные — пропсами:
// в лаборатории тестовые, в игре — команды и ответы из ShowAnswers.
// Фаза показа (только игра; лаборатория рисует всё сразу и прячет таймлайном — phase 'all'):
//   dots — ответ ещё не показан: у всех «• • •», текста ответов в разметке НЕТ (ничего не утекает);
//   anim — идёт показ: «• • •» уходят, ответы проступают (таймлайн сцены);
//   open — ответы на месте.
// Вердикт (класс ok/no и значок) — только при judged (ShowAnswers объявил проверку); у команды без ответа — «не ответили»
// и пустой значок «—», у ответа без автопроверки (null) — без значка.
import type { CSSProperties } from 'react'
import { STRIP, fitFs, type ColLay, type StripLay } from './teamLayout'

export type TeamRow = {
  key: string | number; name: string; color: string
  /** ответ команды; null — не ответили */
  text: string | null
  /** вердикт (is_correct ?? autocheck); null — нет */
  ok: boolean | null
  /** ставка (раунды со ставками) */
  stake?: number | null
}
export type TeamPhase = 'all' | 'dots' | 'anim' | 'open'

const LEAF = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'
const clsOf = (r: TeamRow, judged: boolean) => (r.text == null ? 'nil' : !judged ? 'un' : r.ok === true ? 'ok' : r.ok === false ? 'no' : 'un')
const mkOf = (c: string) => (c === 'ok' ? '✓' : c === 'no' ? '✗' : c === 'nil' ? '—' : null)
const stakeOf = (r: TeamRow) => (r.stake != null && r.stake !== 0 && r.text != null ? <small className="stk"> · {r.stake}</small> : null)

export function TeamCol({ rows, phase = 'all', judged = true, lay, count }: {
  rows: TeamRow[]; phase?: TeamPhase; judged?: boolean
  /** раскладка игры (без неё — утверждённая колонка лаборатории) */
  lay?: ColLay
  /** «Ответили: n из N» */
  count?: string
}) {
  const game = !!lay
  const st: CSSProperties | undefined = lay ? {
    '--rh': `${lay.rowH ?? 118}px`, '--gap': `${lay.gap}px`, '--nfs': `${lay.nameFs}px`, '--tfs': `${lay.txtFs}px`, '--mks': `${lay.mk}px`,
    '--tl': lay.txtLines, '--pl': `${lay.padL}px`, '--cols': lay.cols,
  } as CSSProperties : undefined
  const tw = lay ? (580 - (lay.cols - 1) * 12) / lay.cols - lay.padL - lay.mk - 30 : 0
  return <div className={`s4-teams${game ? ` g c${lay!.cols}` : ''}`} style={st}>
    <div className="s4-th">Ответы команд{count != null && <span className="s4-cnt">{count}</span>}</div>
    {rows.map((r, i) => {
      const c = clsOf(r, judged), mk = phase === 'all' || judged ? mkOf(c) : null
      const txt = r.text ?? 'не ответили'
      const fs = game && r.text != null ? fitFs(txt, tw, lay!.txtFs, lay!.txtLines) : undefined
      return <div key={r.key} className={`s4-ta ${c}`} data-i={i}>
        <svg className="s4-ta-bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={LEAF} /></svg>
        <span className="nm" style={{ color: r.color }}>{r.name}</span>
        {phase !== 'open' && <span className="dots">• • •</span>}
        {phase !== 'dots' && <span className="txt" style={fs && fs !== lay!.txtFs ? { fontSize: fs } : undefined}>{txt}{stakeOf(r)}</span>}
        {(phase === 'all' || mk != null) && <i className="mk">{mk}</i>}
      </div>
    })}
  </div>
}

// Полоса «Ответы команд» под разбором (Сопоставление, Порядок): листы-карточки в ряд. Ответ — так, как команда
// отправила его с телефона («1Б 2В 3А 4Г» / «БВГА»); ✓ — совпал с верным, ✗ — нет, «—» — не ответили.
export function TeamStrip({ rows, top = 958, phase = 'all', judged = true, lay, count }: {
  rows: TeamRow[]; top?: number; phase?: TeamPhase; judged?: boolean
  lay?: StripLay; count?: string
}) {
  const game = !!lay
  const st: CSSProperties = { top }
  if (lay) Object.assign(st, {
    '--cols': lay.cols, '--cw': lay.cw != null ? `${lay.cw}px` : '1fr', '--rh': `${lay.rowH}px`, '--gap': `${lay.gap}px`,
    '--nfs': `${lay.nameFs}px`, '--tfs': `${lay.txtFs}px`, '--mks': `${lay.mk}px`,
  })
  const cw = lay ? (lay.cw ?? (STRIP.width - STRIP.gap * 5) / 6) : 0
  return <>
    {count != null && <div className="s4-scnt" style={{ top: top - 40 }}>{count}</div>}
    <div className={`s4-strip${game ? ` g r${lay!.rows}` : ''}`} style={st}>
      {rows.map(r => {
        const c = clsOf(r, judged), mk = phase === 'all' || judged ? mkOf(c) : null
        const txt = r.text ?? 'не ответили'
        const fs = game && r.text != null ? fitFs(txt, cw - lay!.mk - 40, lay!.txtFs, 1) : undefined
        return <div key={r.key} className={`s4-sl ${c}`}>
          <svg className="bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={LEAF} /></svg>
          <span className="nm" style={{ color: r.color }}>{r.name}</span>
          {game && phase !== 'open' && phase !== 'all' && <span className="dots">• • •</span>}
          {phase !== 'dots' && <span className="txt" style={fs && fs !== lay!.txtFs ? { fontSize: fs } : undefined}>{txt}{stakeOf(r)}</span>}
          {(phase === 'all' || mk != null) && <i className="mk">{mk}</i>}
        </div>
      })}
    </div>
  </>
}
