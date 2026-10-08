// ═══ Этап 2 · «Своя игра» — три подхода к доске выбора ═══
// Механика (JeopardyRound.tsx): темы — колонками (1…6), в каждой плитки с ценой; плитка — звук.
// Клик по плитке → она открывается: клип 30 с (обратный отсчёт), команды отвечают с телефонов,
// ответы идут по скорости (#1, #2 …) — до «Показать ответ» видно только факт ответа; потом
// правильный ответ и ✓/✗ ведущего; «Закрыть плитку» → плитка гаснет; балл = цена при ✓.
// A «Лианы со стручками» — тема = лиана с крон, цены = семенные стручки; сыгранный — пустая шелуха.
// B «Цветы цен» — тема = цветок, четыре лепестка = четыре цены; сыгранный лепесток опадает.
// C «Фонари на ветвях» — тема = ветвь (строкой), цены = фонари; сыгранный фонарь гаснет.
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { JP2, TEAM, fmtVal, balla } from './data'

export const JP_STATES = [
  { id: 'board', name: 'Доска: часть плиток сыграна' }, { id: 'select', name: 'Выбор плитки' },
  { id: 'question', name: 'Плитка открыта: звучит трек, ответы идут' }, { id: 'reveal', name: 'Показан ответ, оценки ✓/✗' },
  { id: 'back', name: 'Возврат к доске: плитка гаснет' }, { id: 'complete', name: 'Доска сыграна целиком' },
]
export const JP_VARIANTS = [
  { id: 'A', name: 'A · Лианы со стручками', note: 'С крон спускаются пять лиан — пять тем, имя темы на деревянной бирке. На лиане висят семенные стручки, на каждом цена: чем ниже, тем дороже. Выбранный стручок срывается, подлетает к зрителю и раскрывается — внутри звучит трек и идёт отсчёт. Ответ выходит из стручка свитком листа. Сыгранный стручок остаётся пустой раскрытой шелухой.' },
  { id: 'B', name: 'B · Цветы цен', note: 'Пять больших цветов — пять тем, имя на листе под цветком. Четыре лепестка — четыре цены, по часовой стрелке от верхнего левого. Выбранный лепесток отрывается и вырастает в огромный лепесток с отсчётом; на ответе он переворачивается — на изнанке написан правильный ответ. Сыгранный лепесток опадает; когда тема сыграна вся, остаётся сердцевина.' },
  { id: 'C', name: 'C · Фонари на ветвях', note: 'Темы — горизонтальные ветви одна под другой, имя темы вырезано у ствола. На ветвях висят фонари с ценой на стекле, дешёвые ближе к стволу. Выбранный фонарь снимается с ветки и вырастает слева — в его пламени отсчёт; ответ спускается на табличке. Сыгранный фонарь гаснет: холодное тёмное стекло.' },
]

const TH = JP2.themes, VAL = JP2.values, OPEN = `${JP2.open.ti}-${JP2.open.i}`
const key = (ti: number, i: number) => `${ti}-${i}`
/** центр плитки на экране — нужен, чтобы выбранная плитка летела со своего места */
function tilePos(v: string, ti: number, i: number) {
  if (v === 'A') return { x: 960 + (ti - 2) * 340, y: 388 + i * 168 }
  if (v === 'B') {
    const cx = 960 + (ti - 2) * 352, cy = [560, 536, 524, 536, 560][ti], a = ([-135, -45, 45, 135][i] * Math.PI) / 180
    return { x: cx + Math.cos(a) * 92, y: cy + Math.sin(a) * 92 }
  }
  return { x: 700 + i * 300, y: 228 + ti * 172 + 64 }
}
const VX = 430, VY = 600 // где стоит открытая плитка

function timerFor(state: string) { return state === 'question' ? { start: JP2.clip, from: 1.6, run: 8 } : null }

export function Jeopardy({ variant, state, nOv, onReady }: S1Props) {
  const tm = timerFor(state)
  const sel = tilePos(variant, JP2.open.ti, JP2.open.i)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    const tiles = q('.jp2-t')
    if (state === 'board' || state === 'complete') {
      if (variant === 'A') tl.fromTo(q('.jp2a-vine'), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, stagger: 0.1, ease: 'power2.out' }, 0)
        .fromTo(q('.jp2a-tag'), { rotation: -14, y: -30, opacity: 0 }, { rotation: 0, y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'elastic.out(1, 0.5)', transformOrigin: '50% 0%' }, 0.4)
      if (variant === 'B') tl.fromTo(q('.jp2b-stem'), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.9, stagger: 0.08 }, 0)
        .fromTo(q('.jp2b-core'), { scale: 0 }, { scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(2)' }, 0.5)
        .fromTo(q('.jp2b-leaf'), { opacity: 0, rotation: -20 }, { opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08 }, 0.6)
      if (variant === 'C') tl.fromTo(q('.jp2c-bough'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.0, stagger: 0.1, ease: 'power2.out' }, 0)
        .fromTo(q('.jp2c-name'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, 0.3)
      tl.fromTo(tiles, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.025, ease: 'back.out(1.8)' }, 0.7)
    }
    if (state === 'select') {
      // выбранная плитка откликается: лиана качнулась / лепесток приподнялся / фонарь вспыхнул
      tl.fromTo(q('.jp2-t.sel'), { scale: 1 }, { scale: 1.18, duration: 0.35, ease: 'back.out(3)' }, 0.4)
        .fromTo(q('.jp2-t.sel'), { rotation: 0 }, { rotation: 6, duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0.75)
        .fromTo(q('.jp2-selring'), { scale: 0.4, opacity: 0.9 }, { scale: 2.2, opacity: 0, duration: 1.1, ease: 'power2.out' }, 0.5)
    }
    if (state === 'question') {
      // плитка летит с доски к зрителю и раскрывается; доска уходит в полумрак
      tl.fromTo(q('.jp2-board'), { opacity: 1, filter: 'blur(0px)' }, { opacity: 0.32, filter: 'blur(2px)', duration: 0.6 }, 0)
        .fromTo(q('.jp2-vessel'), { x: sel.x - VX, y: sel.y - VY, scale: 0.28, opacity: 0.9 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power3.inOut' }, 0.1)
        .fromTo(q('.jp2-v-open'), { '--o': 0 }, { '--o': 1, duration: 0.7, ease: 'back.out(1.6)' }, 0.9)
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
      tl.fromTo(q('.jp2-ans'), { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0.3)
      if (variant === 'A') tl.fromTo(q('.jp2-ans'), { clipPath: 'inset(0 100% 0 0 round 30px)', rotation: -3 }, { clipPath: 'inset(0 0% 0 0 round 30px)', rotation: 0, duration: 1.0, ease: 'power2.inOut' }, 0.3)
      if (variant === 'B') tl.fromTo(q('.jp2-v-flip'), { rotationY: 0 }, { rotationY: 180, duration: 1.0, ease: 'power2.inOut', transformPerspective: 900 }, 0.2)
        .fromTo(q('.jp2-ans'), { rotationX: -70, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', transformPerspective: 700, transformOrigin: '50% 0%' }, 0.7)
      if (variant === 'C') tl.fromTo(q('.jp2-ans'), { y: -60, rotationX: -80 }, { y: 0, rotationX: 0, duration: 0.9, ease: 'back.out(1.8)', transformPerspective: 700, transformOrigin: '50% 0%' }, 0.3)
          .fromTo(q('.jp2c-flare'), { scale: 0.6, opacity: 0 }, { scale: 1.4, opacity: 1, duration: 0.4, yoyo: true, repeat: 1 }, 0.2)
      tl.fromTo(q('.jp2-row .dots'), { opacity: 1 }, { opacity: 0, duration: 0.2, stagger: 0.08 }, 1.3)
        .fromTo(q('.jp2-row .txt'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 }, 1.4)
        .fromTo(q('.jp2-row .mk'), { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.45, stagger: 0.15, ease: 'back.out(2.2)' }, 2.1)
        .fromTo(q('.jp2-row .pts'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15 }, 2.3)
    }
    if (state === 'back') {
      // плитка возвращается на место и гаснет (шелуха / опавший лепесток / тёмный фонарь)
      tl.fromTo(q('.jp2-vessel'), { x: 0, y: 0, scale: 1, opacity: 1 }, { x: sel.x - VX, y: sel.y - VY, scale: 0.28, opacity: 0, duration: 0.9, ease: 'power3.inOut' }, 0.1)
        .fromTo(q('.jp2-board'), { opacity: 0.32, filter: 'blur(2px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.7 }, 0.3)
        .fromTo(q('.jp2-t.just'), { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 0.9)
      if (variant === 'B') tl.fromTo(q('.jp2b-fall'), { y: -120, rotation: -40, opacity: 1 }, { y: 0, rotation: 30, opacity: 1, duration: 1.4, ease: 'power1.in' }, 0.9)
    }
  }, tm, [variant, state])

  const n = nOv ?? (state === 'question' ? nLive : null)
  const played = state === 'complete' ? TH.flatMap((_, ti) => VAL.map((_, i) => key(ti, i))) : state === 'back' ? [...JP2.played, OPEN] : JP2.played
  const inQ = state === 'question' || state === 'reveal' || state === 'back'
  const stOf = (k: string) => (k === OPEN && state === 'select' ? 'sel' : k === OPEN && (state === 'question' || state === 'reveal') ? 'taken' : played.includes(k) ? `done${k === OPEN && state === 'back' ? ' just' : ''}` : 'av')
  const rects: Rect[] = inQ && state !== 'back' ? [{ x: 150, y: 220, w: 560, h: 760 }, { x: 860, y: 70, w: 1000, h: 900 }] : variant === 'C' ? [{ x: 60, y: 160, w: 1800, h: 880 }] : [{ x: 120, y: 150, w: 1680, h: 880 }]
  const remain = TH.length * VAL.length - played.length

  return (
    <S1Screen rects={rects} n={null} rootRef={root} cls={`jp2 jp2${variant} st-${state}`} moodOverride={n != null && n <= 10 ? (n <= 0 ? 'zero' : 'warning') : 'calm'}>
      <div className="jp2-title">{JP2.title}{state === 'complete' ? <span> · все плитки сыграны</span> : <span> · осталось плиток: {remain}</span>}</div>
      <div className="jp2-board">
        {variant === 'A' && <BoardA stOf={stOf} />}
        {variant === 'B' && <BoardB stOf={stOf} />}
        {variant === 'C' && <BoardC stOf={stOf} />}
      </div>
      {state === 'select' && <i className="jp2-selring" style={{ left: sel.x, top: sel.y }} aria-hidden />}
      {variant === 'B' && state === 'back' && <span className="jp2b-fall" style={{ left: sel.x - 30, top: 1000 }} aria-hidden><svg viewBox="-40 -60 80 80"><path d={PETAL_S} /></svg></span>}
      {inQ && <Vessel variant={variant} n={state === 'question' ? n : null} playing={state === 'question'} />}
      {(state === 'question' || state === 'reveal') && <Panel variant={variant} reveal={state === 'reveal'} n={n} />}
    </S1Screen>
  )
}

// ── доски ─────────────────────────────────────────────────────────────────
const POD = 'M 0 -62 C 44 -44 50 28 0 66 C -50 28 -44 -44 0 -62 Z'
function Pod({ v, st }: { v: number; st: string }) {
  const done = st.startsWith('done') || st === 'taken'
  return (
    <svg className="jp2a-pod" viewBox="-80 -100 160 190" aria-hidden>
      <path className="stalk" d="M 0 -100 C 4 -86 -4 -74 0 -62" />
      {done ? <>
        <path className="husk" d="M -4 -60 C -40 -44 -60 20 -30 60 C -24 20 -16 -20 -4 -60 Z" />
        <path className="husk r" d="M 4 -60 C 40 -44 60 20 30 60 C 24 20 16 -20 4 -60 Z" />
      </> : <>
        <path className="body" d={POD} /><path className="seam" d="M 0 -58 C 8 -20 8 24 0 62" />
        <path className="calyx" d="M 0 -62 C -20 -66 -30 -54 -34 -44 C -18 -50 -8 -52 0 -58 Z M 0 -62 C 20 -66 30 -54 34 -44 C 18 -50 8 -52 0 -58 Z" />
        <text y="10" textAnchor="middle" dominantBaseline="middle">{fmtVal(v)}</text>
      </>}
    </svg>
  )
}
function BoardA({ stOf }: { stOf: (k: string) => string }) {
  return <>{TH.map((t, ti) => {
    const x = 960 + (ti - 2) * 340
    return (
      <div key={ti} className="jp2a-col">
        <svg className="jp2a-vine" style={{ left: x - 40 }} viewBox="0 0 80 1080" preserveAspectRatio="none" aria-hidden>
          <path d={`M 40 0 C ${52 - ti * 3} 160 26 330 40 500 S 50 800 40 1000`} />
          {Array.from({ length: 8 }, (_, k) => { const y = 70 + k * 125, sd = k % 2 ? 1 : -1; return <path key={k} className="lf" d={`M 40 ${y} c ${sd * 10} -12 ${sd * 30} -10 ${sd * 34} 4 c ${-sd * 12} 8 ${-sd * 26} 8 ${-sd * 34} -4 z`} /> })}
        </svg>
        <div className="jp2a-tag" style={{ left: x }}><b>{t.name}</b>{t.hint && <span>{t.hint}</span>}</div>
        {VAL.map((v, i) => { const p = tilePos('A', ti, i), st = stOf(key(ti, i)); return <div key={i} className={`jp2-t jp2a-t ${st}`} style={{ left: p.x, top: p.y }}><Pod v={v} st={st} /></div> })}
      </div>
    )
  })}</>
}
const PETAL = 'M 0 -18 C 34 -36 54 -104 0 -158 C -54 -104 -34 -36 0 -18 Z'
const PETAL_S = 'M 0 0 C 14 -10 22 -34 0 -54 C -22 -34 -14 -10 0 0 Z'
function BoardB({ stOf }: { stOf: (k: string) => string }) {
  return <>{TH.map((t, ti) => {
    const cx = 960 + (ti - 2) * 352, cy = [560, 536, 524, 536, 560][ti]
    const all = VAL.every((_, i) => stOf(key(ti, i)).startsWith('done'))
    return (
      <div key={ti} className={`jp2b-fl${all ? ' bare' : ''}`}>
        <svg className="jp2b-stem" style={{ left: cx - 60, top: cy }} viewBox={`0 0 120 ${1080 - cy}`} aria-hidden><path d={`M 60 0 C 50 ${(1080 - cy) * 0.4} 70 ${(1080 - cy) * 0.7} 60 ${1080 - cy}`} /></svg>
        <div className="jp2b-leaf" style={{ left: cx, top: cy + 210 }}><b>{t.name}</b>{t.hint && <span>{t.hint}</span>}</div>
        {VAL.map((v, i) => {
          const st = stOf(key(ti, i)), a = [-135, -45, 45, 135][i], p = tilePos('B', ti, i)
          return (
            <div key={i} className={`jp2-t jp2b-t ${st}`} style={{ left: cx, top: cy }}>
              <svg className="jp2b-petal" viewBox="-80 -170 160 180" style={{ transform: `rotate(${a + 90}deg)` }} aria-hidden><path d={PETAL} /><path className="vein" d="M 0 -24 Q 4 -90 0 -150" /></svg>
              {!st.startsWith('done') && st !== 'taken' && <b className="jp2b-val" style={{ left: p.x - cx, top: p.y - cy }}>{fmtVal(v)}</b>}
            </div>
          )
        })}
        <i className="jp2b-core" style={{ left: cx, top: cy }} />
      </div>
    )
  })}</>
}
function Lantern({ v, st, big }: { v?: number; st: string; big?: boolean }) {
  const off = st.startsWith('done') || st === 'taken'
  return (
    <svg className={`jp2c-lan${off ? ' off' : ''}${big ? ' big' : ''}`} viewBox="-60 -110 120 230" aria-hidden>
      <path className="hook" d="M 0 -110 L 0 -86" /><circle className="ring" cx="0" cy="-80" r="7" />
      <path className="cap" d="M -36 -54 L -22 -74 L 22 -74 L 36 -54 Z" />
      <rect className="glass" x="-38" y="-54" width="76" height="118" rx="16" />
      <path className="bars" d="M -14 -54 L -14 64 M 14 -54 L 14 64" />
      {!off && <ellipse className="flame" cx="0" cy="22" rx="12" ry="20" />}
      <path className="base" d="M -40 64 L 40 64 L 30 82 L -30 82 Z" />
      {v != null && !off && <text y="-12" textAnchor="middle" dominantBaseline="middle">{fmtVal(v)}</text>}
    </svg>
  )
}
function BoardC({ stOf }: { stOf: (k: string) => string }) {
  return <>
    <svg className="jp2c-trunk" viewBox="0 0 160 1080" aria-hidden><path d="M 40 0 C 70 300 30 600 70 1080 L 160 1080 C 120 700 150 300 120 0 Z" /></svg>
    {TH.map((t, ti) => {
      const y = 228 + ti * 172
      return (
        <div key={ti} className="jp2c-row">
          <svg className="jp2c-bough" style={{ top: y - 30 }} viewBox="0 0 1800 60" preserveAspectRatio="none" aria-hidden><path d={`M 0 30 C 400 ${18 + ti * 3} 900 44 1800 ${24 + (ti % 2) * 10}`} /></svg>
          <div className="jp2c-name" style={{ top: y + 6 }}><b>{t.name}</b>{t.hint && <span>{t.hint}</span>}</div>
          {VAL.map((v, i) => { const p = tilePos('C', ti, i), st = stOf(key(ti, i)); return <div key={i} className={`jp2-t jp2c-t ${st}`} style={{ left: p.x, top: p.y }}><Lantern v={v} st={st} /></div> })}
        </div>
      )
    })}
  </>
}

// ── открытая плитка: «сосуд» звука с отсчётом ─────────────────────────────
function Vessel({ variant, n, playing }: { variant: string; n: number | null; playing: boolean }) {
  return (
    <div className={`jp2-vessel jp2-v${variant}${playing ? ' playing' : ''}${n != null ? ` is-${n <= 0 ? 'zero' : n <= 10 ? 'warning' : 'normal'}` : ''}`} style={{ left: VX, top: VY }}>
      <span className="jp2-waves" aria-hidden>{[0, 1, 2, 3].map(k => <i key={k} style={{ animationDelay: `${k * 0.55}s` }} />)}</span>
      {variant === 'A' && <svg className="jp2-v-open" viewBox="-200 -260 400 520" aria-hidden>
        <path className="stalk" d="M 0 -260 C 8 -230 -8 -210 0 -190" />
        <g className="half l"><path d="M -6 -186 C -120 -140 -170 70 -90 200 C -70 90 -40 -60 -6 -186 Z" /></g>
        <g className="half r"><path d="M 6 -186 C 120 -140 170 70 90 200 C 70 90 40 -60 6 -186 Z" /></g>
        <circle className="core" cx="0" cy="10" r="96" />
      </svg>}
      {variant === 'B' && <div className="jp2-v-flip"><svg className="jp2-v-open" viewBox="-160 -300 320 340" aria-hidden><path d="M 0 30 C 110 -20 170 -200 0 -300 C -170 -200 -110 -20 0 30 Z" /><path className="vein" d="M 0 20 Q 10 -130 0 -280" /></svg></div>}
      {variant === 'C' && <><i className="jp2c-flare" aria-hidden /><div className="jp2-v-open"><Lantern st="av" big /></div></>}
      {n != null && <b className="jp2-v-num">{Math.max(0, n)}</b>}
    </div>
  )
}

function Panel({ variant, reveal, n }: { variant: string; reveal: boolean; n: number | null }) {
  const t = TH[JP2.open.ti], v = VAL[JP2.open.i]
  return (
    <div className={`jp2-panel jp2-p${variant}`}>
      <div className="jp2-head"><b>{t.name}</b><span>{t.hint ? `${t.hint} · ` : ''}цена <em>{fmtVal(v)}</em> {balla(v)}</span></div>
      {reveal && <div className={`jp2-ans jp2-ans${variant}`}>{variant === 'C' && <><i className="rope l" /><i className="rope r" /></>}<span>правильный ответ</span><b>{JP2.correct}</b></div>}
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
