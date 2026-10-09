// ═══ «Своя игра» — Цветы цен (выбрано) ═══
// Механика (JeopardyRound.tsx): темы — колонками (1…6), в каждой плитки с ценой; плитка — звук.
// Клик по плитке → она открывается: клип 30 с (обратный отсчёт), команды отвечают с телефонов,
// ответы идут по скорости (#1, #2 …) — до «Показать ответ» видно только факт ответа; потом
// правильный ответ и ✓/✗ ведущего; «Закрыть плитку» → плитка гаснет; балл = цена при ✓.
// Тема = цветок, лепестки = цены; сыгранный лепесток вянет на месте.
//
// Здесь только КАРТИНКА: сцена получает всё пропсами (темы, состояние плиток, ответы, отсчёт) и не знает, откуда
// они — из лаборатории (src/labs/forest/jeopardyLab.tsx, тестовый вечер) или из игры (pages/rounds/JeopardyRound.tsx,
// настоящая сессия). Таймлайн входа в состояние — jpBuild, общий для обоих.
import type { ReactNode, RefObject } from 'react'
import { S1Screen } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { fmtVal, balla, lenCls } from './fmt'
import { jpTilePos, listDensity, type JpFlower, JP_PETAL_R } from './layout'

/** Состояние сцены: доска, выбор цены, открытая плитка, ответ, возврат к доске. */
export type JpView = 'board' | 'select' | 'question' | 'reveal' | 'back'
export type JpThemeV = { name: string; hint?: string; values: number[] }
/** Ответ команды на панели: до «Показать ответ» текст не выводится вовсе (только факт ответа). */
export type JpRow = { key: string; name: string; color?: string; text: string; verdict: boolean | null }

export const VX = 430, VY = 600 // где стоит открытая плитка
const key = (ti: number, i: number) => `${ti}-${i}`

/** Таймлайн входа в состояние. `lab` — в лаборатории ответы «приходят» по одному прямо в таймлайне; в игре они уже
 *  пришли (или придут позже — их проявляет сама игра), и таймлайн лишь проявляет то, что есть. */
export function jpBuild(tl: gsap.core.Timeline, q: (s: string) => Element[], view: JpView, sel: { x: number; y: number }, opts: { intro?: boolean; lab?: boolean } = {}) {
  const others = q('.jp2b-fl:not(.selfl) .jp2b-pw'), othersLow = q('.jp2b-fl:not(.selfl) .jp2b-leaf, .jp2b-fl:not(.selfl) .jp2b-core')
  if (view === 'board' && opts.intro !== false) {
    tl.fromTo(q('.jp2b-stem'), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.9, stagger: 0.08 }, 0)
      .fromTo(q('.jp2b-core'), { scale: 0 }, { scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 0.5)
      .fromTo(q('.jp2b-leaf'), { opacity: 0, rotation: -20 }, { opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08 }, 0.6)
      .fromTo(q('.jp2-t'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.025, ease: 'back.out(1.8)' }, 0.7)
  }
  if (view === 'select') {
    // выбранный лепесток приподнимается и вспыхивает
    tl.fromTo(q('.jp2-t.sel'), { scale: 1 }, { scale: 1.18, duration: 0.35, ease: 'back.out(3)' }, 0.4)
      .fromTo(q('.jp2-t.sel'), { rotation: 0 }, { rotation: 6, duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0.75)
      .fromTo(q('.jp2-selring'), { scale: 0.4, opacity: 0.9 }, { scale: 2.2, opacity: 0, duration: 1.1, ease: 'power2.out' }, 0.5)
  }
  if (view === 'question') {
    // лепесток отрывается и летит к зрителю, остальные цветы закрываются (без чёрной заливки)
    tl.fromTo(others, { scale: 1, opacity: 1 }, { scale: 0.62, opacity: 0.5, duration: 0.8, stagger: 0.03, ease: 'power2.inOut' }, 0)
      .fromTo(othersLow, { opacity: 1 }, { opacity: 0.45, duration: 0.6 }, 0)
      .fromTo(q('.jp2-vessel'), { x: sel.x - VX, y: sel.y - VY, scale: 0.28, opacity: 0.9 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power3.inOut' }, 0.1)
      .fromTo(q('.jp2-head > *'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0.9)
      .fromTo(q('.jp2-cnt, .jp2-hint'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.2)
    if (opts.lab) q('.jp2-row').forEach((el, k) => {
      const at = 2.2 + k * 0.9
      tl.fromTo(el, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, at)
      tl.fromTo(q(`.jp2-cnt .c${k + 1}`), { opacity: 0 }, { opacity: 1, duration: 0.15 }, at)
      tl.to(q(`.jp2-cnt .c${k}`), { opacity: 0, duration: 0.15 }, at)
    })
    else tl.fromTo(q('.jp2-row'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' }, 1.2)
  }
  if (view === 'reveal') {
    // лепесток переворачивается; ответы команд открываются, потом вердикты
    tl.fromTo(q('.jp2-v-flip'), { rotationY: 0 }, { rotationY: 180, duration: 1.0, ease: 'power2.inOut', transformPerspective: 900 }, 0.2)
      .fromTo(q('.jp2-ans'), { rotationX: -70, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', transformPerspective: 700, transformOrigin: '50% 0%' }, 0.7)
      .fromTo(q('.jp2-row .dots'), { opacity: 1 }, { opacity: 0, duration: 0.2, stagger: 0.08 }, 1.3)
      .fromTo(q('.jp2-row .txt'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 }, 1.4)
      .fromTo(q('.jp2-row .mk'), { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.45, stagger: 0.15, ease: 'back.out(2.2)' }, 2.1)
      .fromTo(q('.jp2-row .pts'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15 }, 2.3)
  }
  if (view === 'back') {
    // лепесток возвращается на цветок и вянет на месте; остальные цветы раскрываются обратно
    tl.fromTo(q('.jp2-vessel'), { x: 0, y: 0, scale: 1, opacity: 1 }, { x: sel.x - VX, y: sel.y - VY, scale: 0.28, opacity: 0, duration: 0.9, ease: 'power3.inOut' }, 0.1)
      .fromTo(others, { scale: 0.62, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'back.out(1.4)' }, 0.4)
      .fromTo(othersLow, { opacity: 0.45 }, { opacity: 1, duration: 0.6 }, 0.4)
      .fromTo(q('.jp2-t.just'), { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 0.9)
  }
}

/** Вся сцена «Своей игры». `open` — открытая плитка (сосуд с отсчётом + панель ответов): в игре её рисует компонент,
 *  который живёт ровно столько, сколько открыта плитка (звук, ответы команд); в лаборатории — тестовые данные. */
export function JeopardyScene({ rootRef, cls, view, title, sub, themes, layout, stOf, sel, n, open, onTile, children }: {
  rootRef: RefObject<HTMLDivElement>
  /** класс состояния (`st-…`): в лаборатории — имя её состояния, в игре — JpView */
  cls: string
  view: JpView
  title: string
  sub: string
  themes: JpThemeV[]
  layout: JpFlower[]
  stOf: (k: string) => string
  /** центр выбранной/открытой цены */
  sel: { x: number; y: number }
  /** отсчёт клипа (для настроения леса) */
  n: number | null
  open?: ReactNode
  /** клик по доступной цене (в игре — открыть плитку) */
  onTile?: (ti: number, i: number) => void
  children?: ReactNode
}) {
  const inQ = view === 'question' || view === 'reveal' || view === 'back'
  const rects: Rect[] = inQ && view !== 'back' ? [{ x: 150, y: 220, w: 560, h: 760 }, { x: 860, y: 70, w: 1000, h: 900 }] : [{ x: 120, y: 150, w: 1680, h: 880 }]
  return (
    <S1Screen rects={rects} n={null} rootRef={rootRef} cls={`jp2 jp2B st-${cls}`} moodOverride={n != null && n <= 10 ? (n <= 0 ? 'zero' : 'warning') : 'calm'}>
      <div className="jp2-title">{title}<span>{sub}</span></div>
      <div className="jp2-board">
        <BoardB themes={themes} layout={layout} stOf={stOf} onTile={onTile} />
      </div>
      {view === 'select' && <i className="jp2-selring" style={{ left: sel.x, top: sel.y }} aria-hidden />}
      {(view === 'question' || view === 'reveal') && open}
      {view === 'back' && <JpVessel n={null} playing={false} />}
      {children}
    </S1Screen>
  )
}

// ── доска ─────────────────────────────────────────────────────────────────
const PETAL = 'M 0 -24 C 42 -44 64 -124 0 -186 C -64 -124 -42 -44 0 -24 Z'
const LABEL_TOP = 806 // все подписи тем — на одной линии, по центру своего стебля
function BoardB({ themes, layout, stOf, onTile }: { themes: JpThemeV[]; layout: JpFlower[]; stOf: (k: string) => string; onTile?: (ti: number, i: number) => void }) {
  return <>{themes.map((t, ti) => {
    const f = layout[ti], cx = f.cx, cy = f.cy, k = f.k, s = k * f.kp
    const sts = t.values.map((_, i) => stOf(key(ti, i)))
    const all = sts.length > 0 && sts.every(x => x.startsWith('done')), sel = sts.some(x => x === 'sel' || x === 'taken')
    const core = 92 * k
    return (
      <div key={ti} className={`jp2b-fl u${sts.filter(x => x.startsWith('done')).length}${all ? ' bare' : ''}${sel ? ' selfl' : ''}`}>
        <svg className="jp2b-stem" style={{ left: cx - 70, top: cy }} viewBox={`0 0 140 ${1080 - cy}`} aria-hidden>
          <path d={`M 70 0 C 62 ${(1080 - cy) * 0.35} 78 ${(1080 - cy) * 0.65} 70 ${1080 - cy}`} />
          <path className="lf" d={`M 70 ${(1080 - cy) * 0.22} C 40 ${(1080 - cy) * 0.18} 14 ${(1080 - cy) * 0.24} 4 ${(1080 - cy) * 0.3} C 30 ${(1080 - cy) * 0.3} 54 ${(1080 - cy) * 0.28} 70 ${(1080 - cy) * 0.25} Z`} />
          <path className="lf" d={`M 70 ${(1080 - cy) * 0.12} C 100 ${(1080 - cy) * 0.07} 124 ${(1080 - cy) * 0.12} 136 ${(1080 - cy) * 0.18} C 110 ${(1080 - cy) * 0.19} 86 ${(1080 - cy) * 0.17} 70 ${(1080 - cy) * 0.15} Z`} />
        </svg>
        <div className="jp2b-leaf" style={f.labelW === 336 ? { left: cx, top: LABEL_TOP } : { left: cx, top: LABEL_TOP, width: f.labelW, marginLeft: -f.labelW / 2, fontSize: f.labelW < 300 ? '0.9em' : undefined }}><b>{t.name}</b>{t.hint && <span>{t.hint}</span>}{all && <em>сыграна</em>}</div>
        {t.values.map((v, i) => {
          const st = sts[i], done = st.startsWith('done'), a = f.ang[i], rad = ((a + (done ? 14 : 0)) * Math.PI) / 180
          const r = (done ? 87 : JP_PETAL_R) * s, pick = onTile && st === 'av'
          return (
            <div key={i} className={`jp2-t jp2b-t ${st}${pick ? ' pick' : ''}`} style={{ left: cx, top: cy }} onClick={pick ? () => onTile(ti, i) : undefined}>
              <div className="jp2b-pw">
                <svg className="jp2b-petal" viewBox="-90 -200 180 210" style={{ transform: `rotate(${a + 90 + (done ? 14 : 0)}deg) scale(${(done ? 0.84 : 1) * s})` }} aria-hidden><path d={PETAL} /><path className="vein" d="M 0 -30 Q 5 -104 0 -176" /></svg>
                {st !== 'taken' && <b className="jp2b-val" style={s === 1 ? { left: Math.cos(rad) * r, top: Math.sin(rad) * r } : { left: Math.cos(rad) * r, top: Math.sin(rad) * r, fontSize: `${(done ? 36 : 48) * Math.max(0.7, s)}px` }}>{fmtVal(v)}</b>}
              </div>
            </div>
          )
        })}
        <svg className="jp2b-core" style={k === 1 ? { left: cx - 46, top: cy - 46 } : { left: cx - core / 2, top: cy - core / 2, width: core, height: core }} viewBox="-46 -46 92 92" aria-hidden>
          <circle r="40" className="disc" /><circle r="36" className="rim" />{Array.from({ length: 21 }, (_, k) => { const a = k * 2.4, d = Math.sqrt(k / 21) * 30; return <circle key={k} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r="2.6" className="seed" /> })}
        </svg>
      </div>
    )
  })}</>
}
/** центр выбранной цены — для сцены */
export const jpSelPos = (layout: JpFlower[], ti: number, i: number) => (layout[ti] ? jpTilePos(layout[ti], i) : { x: VX, y: VY })

// ── открытая плитка: «сосуд» звука с отсчётом ─────────────────────────────
export function JpVessel({ n, playing }: { n: number | null; playing: boolean }) {
  return (
    <div className={`jp2-vessel jp2-vB${playing ? ' playing' : ''}${n != null ? ` is-${n <= 0 ? 'zero' : n <= 10 ? 'warning' : 'normal'}` : ''}`} style={{ left: VX, top: VY }}>
      <span className="jp2-waves" aria-hidden>{[0, 1, 2, 3].map(k => <i key={k} style={{ animationDelay: `${k * 0.55}s` }} />)}</span>
      <div className="jp2-v-flip"><svg className="jp2-v-open" viewBox="-160 -300 320 340" aria-hidden><path d="M 0 30 C 110 -20 170 -200 0 -300 C -170 -200 -110 -20 0 30 Z" /><path className="vein" d="M 0 20 Q 10 -130 0 -280" /></svg></div>
      {n != null && <b className="jp2-v-num">{Math.max(0, n)}</b>}
    </div>
  )
}

/** Панель открытой плитки: тема и цена, правильный ответ (после «Показать ответ»), ответы команд по скорости.
 *  `countSteps` — только лаборатория: счётчик «Ответили» перелистывается в таймлайне. */
export function JpPanel({ theme, value, reveal, correct, rows, count, countSteps, note, panelRef }: {
  theme: { name: string; hint?: string }
  value: number
  reveal: boolean
  correct: string
  rows: JpRow[]
  count: number
  countSteps?: number
  /** строка внизу (пока ответ не показан): «звучит трек…» или беда со звуком */
  note?: ReactNode
  panelRef?: RefObject<HTMLDivElement>
}) {
  return (
    <div className="jp2-panel jp2-pB" ref={panelRef}>
      <div className="jp2-head"><b>{theme.name}</b><span>{theme.hint ? `${theme.hint} · ` : ''}цена <em>{fmtVal(value)}</em> {balla(value)}</span></div>
      {reveal && <div className={`jp2-ans jp2-ansB${lenCls(correct)}`}><span>правильный ответ</span><b>{correct}</b></div>}
      <div className={`jp2-list${listDensity(rows.length)}`}>
        <div className="jp2-cnt">{reveal ? 'Ответы по скорости' : <>Ответили: {countSteps != null ? Array.from({ length: countSteps + 1 }, (_, k) => <em key={k} className={`c${k}`}>{k}</em>) : <em className="c0">{count}</em>}</>}</div>
        {rows.map((a, k) => {
          const graded = reveal && a.verdict != null
          return (
            <div key={a.key} data-k={a.key} className={`jp2-row ${graded ? (a.verdict ? 'ok' : 'no') : ''}`}>
              <span className="pos">#{k + 1}</span>
              <span className="nm" style={{ color: a.color }}>{a.name}</span>
              <span className="dots">• • •</span>
              {reveal && <span className="txt">{a.text}</span>}
              {graded && <i className="mk">{a.verdict ? '✓' : '✗'}</i>}
              {graded && <span className="pts">{a.verdict ? `+${fmtVal(value)}` : '0'}</span>}
            </div>
          )
        })}
      </div>
      {!reveal && note}
    </div>
  )
}
export const JP_NOTE = 'звучит трек · ответы видны после «Показать ответ»'
