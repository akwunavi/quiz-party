// ═══ «Своя игра» — Цветы цен (выбрано) ═══
// Механика (JeopardyRound.tsx): темы — колонками (1…6), в каждой плитки с ценой; плитка — звук.
// Клик по плитке → она открывается: клип 30 с (обратный отсчёт), команды отвечают с телефонов,
// ответы идут по скорости (#1, #2 …) — до «Показать ответ» видно только факт ответа; потом
// правильный ответ и ✓/✗ ведущего; «Закрыть плитку» → плитка гаснет; балл = цена при ✓.
// Тема = цветок, четыре лепестка = четыре цены; сыгранный лепесток вянет на месте.
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { JP2, TEAM, fmtVal, balla } from './data'

export const JP_STATES = [
  { id: 'fresh', name: 'Доска: все цены доступны' }, { id: 'board', name: 'Доска: часть цен сыграна' }, { id: 'catdone', name: 'Тема сыграна целиком' }, { id: 'select', name: 'Выбор цены' },
  { id: 'question', name: 'Плитка открыта: звучит трек, ответы идут' }, { id: 'reveal', name: 'Показан ответ, оценки ✓/✗' },
  { id: 'back', name: 'Возврат к доске: плитка гаснет' }, { id: 'complete', name: 'Доска сыграна целиком' },
]
export const JP_VARIANTS = [
  { id: 'B', name: 'B · Цветы цен', note: 'Пять больших цветов — пять тем, имя на листе под цветком. Четыре лепестка — четыре цены, по часовой стрелке от верхнего левого. Выбранный лепесток отрывается и вырастает в огромный лепесток с отсчётом; на ответе он переворачивается — на изнанке написан правильный ответ. Сыгранный лепесток опадает; когда тема сыграна вся, остаётся сердцевина.' },
]

const TH = JP2.themes, VAL = JP2.values, OPEN = `${JP2.open.ti}-${JP2.open.i}`
const key = (ti: number, i: number) => `${ti}-${i}`
/** центр плитки на экране — нужен, чтобы выбранная плитка летела со своего места */
function tilePos(ti: number, i: number) {
  const a = (ANG[i] * Math.PI) / 180
  return { x: FL_X(ti) + Math.cos(a) * 104, y: FL_Y[ti] + Math.sin(a) * 104 }
}
const VX = 430, VY = 600 // где стоит открытая плитка

function timerFor(state: string) { return state === 'question' ? { start: JP2.clip, from: 1.6, run: 8 } : null }

export function Jeopardy({ state, nOv, onReady }: S1Props) {
  const tm = timerFor(state)
  const sel = tilePos(JP2.open.ti, JP2.open.i)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    const others = q('.jp2b-fl:not(.selfl) .jp2b-pw'), othersLow = q('.jp2b-fl:not(.selfl) .jp2b-leaf, .jp2b-fl:not(.selfl) .jp2b-core')
    if (state === 'board' || state === 'complete' || state === 'fresh' || state === 'catdone') {
      tl.fromTo(q('.jp2b-stem'), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.9, stagger: 0.08 }, 0)
        .fromTo(q('.jp2b-core'), { scale: 0 }, { scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 0.5)
        .fromTo(q('.jp2b-leaf'), { opacity: 0, rotation: -20 }, { opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08 }, 0.6)
        .fromTo(q('.jp2-t'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.025, ease: 'back.out(1.8)' }, 0.7)
    }
    if (state === 'select') {
      // выбранный лепесток приподнимается и вспыхивает
      tl.fromTo(q('.jp2-t.sel'), { scale: 1 }, { scale: 1.18, duration: 0.35, ease: 'back.out(3)' }, 0.4)
        .fromTo(q('.jp2-t.sel'), { rotation: 0 }, { rotation: 6, duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0.75)
        .fromTo(q('.jp2-selring'), { scale: 0.4, opacity: 0.9 }, { scale: 2.2, opacity: 0, duration: 1.1, ease: 'power2.out' }, 0.5)
    }
    if (state === 'question') {
      // лепесток отрывается и летит к зрителю, остальные цветы закрываются (без чёрной заливки)
      tl.fromTo(others, { scale: 1, opacity: 1 }, { scale: 0.62, opacity: 0.5, duration: 0.8, stagger: 0.03, ease: 'power2.inOut' }, 0)
        .fromTo(othersLow, { opacity: 1 }, { opacity: 0.45, duration: 0.6 }, 0)
        .fromTo(q('.jp2-vessel'), { x: sel.x - VX, y: sel.y - VY, scale: 0.28, opacity: 0.9 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power3.inOut' }, 0.1)
        .fromTo(q('.jp2-head > *'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0.9)
        .fromTo(q('.jp2-cnt, .jp2-hint'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.2)
      q('.jp2-row').forEach((el, k) => {
        const at = 2.2 + k * 0.9
        tl.fromTo(el, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, at)
        tl.fromTo(q(`.jp2-cnt .c${k + 1}`), { opacity: 0 }, { opacity: 1, duration: 0.15 }, at)
        tl.to(q(`.jp2-cnt .c${k}`), { opacity: 0, duration: 0.15 }, at)
      })
    }
    if (state === 'reveal') {
      // лепесток переворачивается, на изнанке — ответ; ответы команд открываются, потом вердикты
      tl.fromTo(q('.jp2-v-flip'), { rotationY: 0 }, { rotationY: 180, duration: 1.0, ease: 'power2.inOut', transformPerspective: 900 }, 0.2)
        .fromTo(q('.jp2-ans'), { rotationX: -70, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', transformPerspective: 700, transformOrigin: '50% 0%' }, 0.7)
        .fromTo(q('.jp2-row .dots'), { opacity: 1 }, { opacity: 0, duration: 0.2, stagger: 0.08 }, 1.3)
        .fromTo(q('.jp2-row .txt'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 }, 1.4)
        .fromTo(q('.jp2-row .mk'), { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.45, stagger: 0.15, ease: 'back.out(2.2)' }, 2.1)
        .fromTo(q('.jp2-row .pts'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15 }, 2.3)
    }
    if (state === 'back') {
      // лепесток возвращается на цветок и вянет на месте; остальные цветы раскрываются обратно
      tl.fromTo(q('.jp2-vessel'), { x: 0, y: 0, scale: 1, opacity: 1 }, { x: sel.x - VX, y: sel.y - VY, scale: 0.28, opacity: 0, duration: 0.9, ease: 'power3.inOut' }, 0.1)
        .fromTo(others, { scale: 0.62, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'back.out(1.4)' }, 0.4)
        .fromTo(othersLow, { opacity: 0.45 }, { opacity: 1, duration: 0.6 }, 0.4)
        .fromTo(q('.jp2-t.just'), { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 0.9)
    }
  }, tm, [state])

  const n = nOv ?? (state === 'question' ? nLive : null)
  const played = state === 'complete' ? TH.flatMap((_, ti) => VAL.map((_, i) => key(ti, i))) : state === 'fresh' ? [] : state === 'back' ? [...JP2.played, OPEN] : state === 'catdone' ? [...JP2.played, '1-2', '1-3'] : JP2.played
  const inQ = state === 'question' || state === 'reveal' || state === 'back'
  const stOf = (k: string) => (k === OPEN && state === 'select' ? 'sel' : k === OPEN && (state === 'question' || state === 'reveal') ? 'taken' : played.includes(k) ? `done${k === OPEN && state === 'back' ? ' just' : ''}` : 'av')
  const rects: Rect[] = inQ && state !== 'back' ? [{ x: 150, y: 220, w: 560, h: 760 }, { x: 860, y: 70, w: 1000, h: 900 }] : [{ x: 120, y: 150, w: 1680, h: 880 }]
  const remain = TH.length * VAL.length - played.length

  return (
    <S1Screen rects={rects} n={null} rootRef={root} cls={`jp2 jp2B st-${state}`} moodOverride={n != null && n <= 10 ? (n <= 0 ? 'zero' : 'warning') : 'calm'}>
      <div className="jp2-title">{JP2.title}{state === 'complete' ? <span> · все плитки сыграны</span> : <span> · осталось плиток: {remain}</span>}</div>
      <div className="jp2-board">
        <BoardB stOf={stOf} />
      </div>
      {state === 'select' && <i className="jp2-selring" style={{ left: sel.x, top: sel.y }} aria-hidden />}
      {inQ && <Vessel n={state === 'question' ? n : null} playing={state === 'question'} />}
      {(state === 'question' || state === 'reveal') && <Panel reveal={state === 'reveal'} n={n} />}
    </S1Screen>
  )
}

// ── доски ─────────────────────────────────────────────────────────────────
const PETAL = 'M 0 -24 C 42 -44 64 -124 0 -186 C -64 -124 -42 -44 0 -24 Z'
const ANG = [-135, -45, 45, 135] // по часовой стрелке от верхнего левого: 0,5 → 1 → 1,5 → 2
const FL_X = (ti: number) => 960 + (ti - 2) * 352
const FL_Y = [520, 498, 486, 498, 520]
const LABEL_TOP = 806 // все подписи тем — на одной линии, по центру своего стебля
function BoardB({ stOf }: { stOf: (k: string) => string }) {
  return <>{TH.map((t, ti) => {
    const cx = FL_X(ti), cy = FL_Y[ti]
    const sts = VAL.map((_, i) => stOf(key(ti, i)))
    const all = sts.every(x => x.startsWith('done')), sel = sts.some(x => x === 'sel' || x === 'taken')
    return (
      <div key={ti} className={`jp2b-fl u${sts.filter(x => x.startsWith('done')).length}${all ? ' bare' : ''}${sel ? ' selfl' : ''}`}>
        <svg className="jp2b-stem" style={{ left: cx - 70, top: cy }} viewBox={`0 0 140 ${1080 - cy}`} aria-hidden>
          <path d={`M 70 0 C 62 ${(1080 - cy) * 0.35} 78 ${(1080 - cy) * 0.65} 70 ${1080 - cy}`} />
          <path className="lf" d={`M 70 ${(1080 - cy) * 0.22} C 40 ${(1080 - cy) * 0.18} 14 ${(1080 - cy) * 0.24} 4 ${(1080 - cy) * 0.3} C 30 ${(1080 - cy) * 0.3} 54 ${(1080 - cy) * 0.28} 70 ${(1080 - cy) * 0.25} Z`} />
          <path className="lf" d={`M 70 ${(1080 - cy) * 0.12} C 100 ${(1080 - cy) * 0.07} 124 ${(1080 - cy) * 0.12} 136 ${(1080 - cy) * 0.18} C 110 ${(1080 - cy) * 0.19} 86 ${(1080 - cy) * 0.17} 70 ${(1080 - cy) * 0.15} Z`} />
        </svg>
        <div className="jp2b-leaf" style={{ left: cx, top: LABEL_TOP }}><b>{t.name}</b>{t.hint && <span>{t.hint}</span>}{all && <em>сыграна</em>}</div>
        {VAL.map((v, i) => {
          const st = sts[i], done = st.startsWith('done'), a = ANG[i], rad = ((a + (done ? 14 : 0)) * Math.PI) / 180
          return (
            <div key={i} className={`jp2-t jp2b-t ${st}`} style={{ left: cx, top: cy }}>
              <div className="jp2b-pw">
                <svg className="jp2b-petal" viewBox="-90 -200 180 210" style={{ transform: `rotate(${a + 90 + (done ? 14 : 0)}deg) scale(${done ? 0.84 : 1})` }} aria-hidden><path d={PETAL} /><path className="vein" d="M 0 -30 Q 5 -104 0 -176" /></svg>
                {st !== 'taken' && <b className="jp2b-val" style={{ left: Math.cos(rad) * (done ? 87 : 104), top: Math.sin(rad) * (done ? 87 : 104) }}>{fmtVal(v)}</b>}
              </div>
            </div>
          )
        })}
        <svg className="jp2b-core" style={{ left: cx - 46, top: cy - 46 }} viewBox="-46 -46 92 92" aria-hidden>
          <circle r="40" className="disc" /><circle r="36" className="rim" />{Array.from({ length: 21 }, (_, k) => { const a = k * 2.4, d = Math.sqrt(k / 21) * 30; return <circle key={k} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r="2.6" className="seed" /> })}
        </svg>
      </div>
    )
  })}</>
}
// ── открытая плитка: «сосуд» звука с отсчётом ─────────────────────────────
function Vessel({ n, playing }: { n: number | null; playing: boolean }) {
  return (
    <div className={`jp2-vessel jp2-vB${playing ? ' playing' : ''}${n != null ? ` is-${n <= 0 ? 'zero' : n <= 10 ? 'warning' : 'normal'}` : ''}`} style={{ left: VX, top: VY }}>
      <span className="jp2-waves" aria-hidden>{[0, 1, 2, 3].map(k => <i key={k} style={{ animationDelay: `${k * 0.55}s` }} />)}</span>
      <div className="jp2-v-flip"><svg className="jp2-v-open" viewBox="-160 -300 320 340" aria-hidden><path d="M 0 30 C 110 -20 170 -200 0 -300 C -170 -200 -110 -20 0 30 Z" /><path className="vein" d="M 0 20 Q 10 -130 0 -280" /></svg></div>
      {n != null && <b className="jp2-v-num">{Math.max(0, n)}</b>}
    </div>
  )
}

function Panel({ reveal, n }: { reveal: boolean; n: number | null }) {
  const t = TH[JP2.open.ti], v = VAL[JP2.open.i]
  return (
    <div className="jp2-panel jp2-pB">
      <div className="jp2-head"><b>{t.name}</b><span>{t.hint ? `${t.hint} · ` : ''}цена <em>{fmtVal(v)}</em> {balla(v)}</span></div>
      {reveal && <div className="jp2-ans jp2-ansB"><span>правильный ответ</span><b>{JP2.correct}</b></div>}
      <div className="jp2-list">
        <div className="jp2-cnt">{reveal ? 'Ответы по скорости' : <>Ответили: {[0, 1, 2, 3, 4].map(k => <em key={k} className={`c${k}`}>{k}</em>)}</>}</div>
        {JP2.answers.map((a, k) => {
          const tm = TEAM(a.team)
          return (
            <div key={a.team} className={`jp2-row ${reveal ? (a.ok ? 'ok' : 'no') : ''}`}>
              <span className="pos">#{k + 1}</span>
              <span className="nm" style={{ color: tm.color }}>{tm.name}</span>
              <span className="dots">• • •</span>
              {reveal && <span className="txt">{a.text}</span>}
              {reveal && <i className="mk">{a.ok ? '✓' : '✗'}</i>}
              {reveal && <span className="pts">{a.ok ? `+${fmtVal(v)}` : '0'}</span>}
            </div>
          )
        })}
      </div>
      {!reveal && n != null && <div className="jp2-hint">звучит трек · ответы видны после «Показать ответ»</div>}
    </div>
  )
}
