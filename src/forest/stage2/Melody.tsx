// ═══ «Угадай мелодию» — Колокольчики (выбрано) ═══
// Механика (MelodyRound.tsx + lib/melody.ts): доска «темы × треки», на плитке — номер трека;
// рулетка (подсветка прыгает по свободным плиткам и встаёт на выбранную — путь из той же
// melodySpinPath, что в игре) → «слушаем 1 секунду» → ставки секундами (10 с; 2–5 с → 2 балла,
// 6–10 с → 1) → очередь по ставкам → отрывок длиной в ставку первой команды → её ответ (30 с) →
// при промахе ход второй: она слушает трек целиком (10 с, 0,5 балла) → ответ на экране (кто
// забрал баллы или «никто не угадал») → трек гаснет на доске.
// Тема = стебель колокольчиков, трек = колокол; отыгранный — завял.
//
// Здесь только КАРТИНКА: всё приходит пропсами — из лаборатории (src/labs/forest/melodyLab.tsx) или из игры
// (pages/rounds/MelodyRound.tsx: стадия, ставки, очередь, ответы — из общего состояния игры). Таймлайн — melBuild.
import type { ReactNode, RefObject } from 'react'
import { Dandelion } from '../stage1/timers'
import { S1Screen } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { fmtVal, balla } from './fmt'
import { listDensity, melBellPos, type MelCol } from './layout'

/** Стадии сцены — те же, что в лаборатории; `idle` — доска (в том числе «всё отыграно»). */
export type MelView = 'idle' | 'spinning' | 'listen' | 'bidding' | 'bids' | 'snippet' | 'answering' | 'wrong' | 'passed' | 'reveal' | 'miss' | 'back'
export const MEL_STAGE = new Set<string>(['listen', 'bidding', 'bids', 'snippet', 'answering', 'wrong', 'passed', 'reveal', 'miss'])
const PLAYING = new Set<string>(['listen', 'snippet', 'passed', 'reveal', 'miss'])
export const VX = 420, VY = 600

/** Фокус на звучащем треке: доска уходит в глубину леса — тусклее, без цвета, мягче; одно и то же
 *  значение у входа в трек и у возврата к доске (ничего не копится между состояниями). */
const DIM = { opacity: 0.14, filter: 'saturate(0.3) brightness(0.65) blur(3px)' }
const UNDIM = { opacity: 1, filter: 'saturate(1) brightness(1) blur(0px)' }

/** Таймлайн входа в состояние. `land` (только лаборатория) — момент остановки рулетки в таймлайне; в игре рулетка
 *  идёт по настоящему времени, и «вспышку» на итоге сцена делает сама. */
export function melBuild(tl: gsap.core.Timeline, q: (s: string) => Element[], view: MelView, sel: { x: number; y: number }, opts: { intro?: boolean; spin?: { from: number; ms: number; land: number; pick: string } } = {}) {
  if (view === 'idle' && opts.intro !== false) {
    tl.fromTo(q('.ml2a-grow'), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.12, ease: 'power2.out' }, 0)
      .fromTo(q('.ml2a-sway'), { '--g': 0 }, { '--g': 1, duration: 0.5, stagger: 0.04, ease: 'back.out(1.8)' }, 0.8)
      .fromTo(q('.ml2-label'), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.4)
  }
  // рулетка: итог проявляется ТОЛЬКО когда подсветка встала окончательно (момент последнего прыжка)
  if (view === 'spinning' && opts.spin) tl.to({}, { duration: opts.spin.ms / 1000 }, opts.spin.from)
    .fromTo(q(`.ml2a-t[data-k="${opts.spin.pick}"] .ml2a-sway`), { '--g': 1 }, { '--g': 1.2, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, opts.spin.land)
  if (view === 'back') {
    // назад к доске: колокол возвращается на свою цветоножку и закрывается (трек отыгран)
    tl.fromTo(q('.ml2-vessel'), { x: 0, y: 0, scale: 1, opacity: 1 }, { x: sel.x - VX, y: sel.y - VY, scale: 0.3, opacity: 0, duration: 0.9, ease: 'power3.inOut' }, 0.1)
      .fromTo(q('.ml2-board'), DIM, { ...UNDIM, duration: 0.8 }, 0.3)
      .fromTo(q('.ml2-focus'), { opacity: 1 }, { opacity: 0, duration: 0.8 }, 0.3)
      .fromTo(q('.ml2a-t.just .ml2a-sway'), { '--g': 1.25, opacity: 0 }, { '--g': 1, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.9)
  }
  if (MEL_STAGE.has(view)) {
    // выбранный трек «выходит к зрителю», доска отступает
    tl.fromTo(q('.ml2-board'), UNDIM, { ...DIM, duration: 0.8, ease: 'power2.inOut' }, 0)
      .fromTo(q('.ml2-focus'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0)
    tl.fromTo(q('.ml2-vessel'), { x: sel.x - VX, y: sel.y - VY, scale: 0.3, opacity: 0.8 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'power3.inOut' }, 0.1)
      .fromTo(q('.ml2-panel > *'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power3.out' }, 0.5)
  }
  if (view === 'bidding') q('.ml2-bid .st').forEach((el, k) => { tl.fromTo(el, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 1.6 + k * 1.1) })
  if (view === 'bids') tl.fromTo(q('.ml2-bid'), { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, stagger: 0.12 }, 0.8)
    .fromTo(q('.ml2-bid.win .tag'), { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 1.6)
  if (view === 'wrong') tl.fromTo(q('.ml2-wrong'), { x: -12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.35)' }, 1.0)
  if (view === 'reveal' || view === 'miss') {
    // ответ: колокол распускается золотом, имя трека разворачивается на листе
    tl.fromTo(q('.ml2-ans'), { clipPath: 'inset(0 100% 0 0 round 30px)' }, { clipPath: 'inset(0 0% 0 0 round 30px)', duration: 0.9, ease: 'power2.inOut' }, 0.8)
      .fromTo(q('.ml2-vessel .gold'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, 0.9)
      .fromTo(q('.ml2-won'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 1.7)
    if (view === 'reveal') tl.fromTo(q('.ml2-seed'), { x: 0, y: 0, opacity: 0, scale: 0.5 }, { x: 600, y: 30, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.inOut' }, 1.9)
      .to(q('.ml2-seed'), { opacity: 0, scale: 2, duration: 0.3 }, 3.1)
      .fromTo(q('.ml2-won b'), { scale: 1 }, { scale: 1.15, duration: 0.25, yoyo: true, repeat: 1 }, 3.0)
  }
}

/** Вся сцена «Угадай мелодию». `stOf` — состояние колокола по ключу «тема-трек» (av / hot / won / taken / done / done just). */
export function MelodyScene({ rootRef, cls, view, title, sub, themes, layout, stOf, sel, pickNo, hot, landed, n, panel, onPick, children }: {
  rootRef: RefObject<HTMLDivElement>
  /** класс состояния (`st-…`): в лаборатории — имя её состояния, в игре — MelView */
  cls: string
  view: MelView
  title: string
  sub: string
  themes: { name: string; tracks: number }[]
  layout: MelCol[]
  stOf: (k: string) => string
  /** центр выбранного колокола на доске */
  sel: { x: number; y: number }
  /** номер выбранного трека на большом колоколе */
  pickNo: number
  /** рулетка: подсвеченный колокол и встала ли подсветка окончательно */
  hot: string | null
  landed: boolean
  n: number | null
  panel?: ReactNode
  /** ручной выбор трека (в игре — «Выбрать вручную») */
  onPick?: (key: string) => void
  children?: ReactNode
}) {
  const inStage = MEL_STAGE.has(view)
  const rects: Rect[] = inStage ? [{ x: 150, y: 250, w: 560, h: 700 }, { x: 860, y: 80, w: 1000, h: 900 }] : [{ x: 120, y: 140, w: 1680, h: 880 }]
  const spot = view === 'spinning' && hot ? (() => { const [a, b] = hot.split('-').map(Number); return layout[a] ? melBellPos(layout[a], b) : null })() : null
  return (
    <S1Screen rects={rects} n={null} rootRef={rootRef} cls={`ml2 ml2A st-${cls}${inStage ? ' stage' : ''}`} moodOverride={n != null && n <= 10 ? (n <= 0 ? 'zero' : 'warning') : 'calm'}>
      <div className="ml2-title">{title}<span>{sub}</span></div>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden><defs>
        <radialGradient id="ml2Bell" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#d9ccff" /><stop offset=".55" stopColor="#8f78d8" /><stop offset="1" stopColor="#3f2a86" /></radialGradient>
        <radialGradient id="ml2BellG" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff3c8" /><stop offset=".55" stopColor="#f0c055" /><stop offset="1" stopColor="#8a5a14" /></radialGradient>
      </defs></svg>
      <div className="ml2-board">
        <BoardA themes={themes} layout={layout} stOf={stOf} onPick={onPick} />
      </div>
      {(inStage || view === 'back') && <i className="ml2-focus" style={{ ['--fx' as string]: `${VX}px`, ['--fy' as string]: `${VY}px` }} aria-hidden />}
      {spot && <i className={`ml2-spot${landed ? ' land' : ''}`} style={{ left: spot.x, top: spot.y }} aria-hidden />}
      {(inStage || view === 'back') && <Vessel n={pickNo} playing={PLAYING.has(view)} gold={view === 'reveal'} />}
      {inStage && panel}
      {view === 'reveal' && <i className="ml2-seed" style={{ left: VX, top: VY - 120 }} aria-hidden />}
      {children}
    </S1Screen>
  )
}

// ── колокольчики: всё растение — один SVG в одних координатах (400×940, земля на y=900);
//    точка крепления каждого колокола считается НА КРИВОЙ стебля (layout.ts: melPlant), колокол висит на конце своей
//    цветоножки и качается вокруг неё.
const BELL = 'M -7 6 C -26 10 -34 36 -38 66 L -48 86 Q -38 80 -30 90 Q -21 81 -11 92 Q 0 83 11 92 Q 21 81 30 90 Q 38 80 48 86 L 38 66 C 34 36 26 10 7 6 Z'
const BELL_IN = 'M -40 82 Q 0 66 40 82 Q 30 92 0 90 Q -30 92 -40 82 Z'
function BellShape({ n, st }: { n: number; st: string }) {
  const done = st.startsWith('done')
  return <>
    <path className="sep" d="M 0 0 L -10 10 M 0 0 L 10 10 M 0 0 L 0 12" />
    {done ? <path className="wilt" d="M -6 6 C -18 14 -20 40 -10 62 Q -2 70 6 62 C 16 40 14 14 6 6 Z" /> : <>
      <path className="cup" d={BELL} /><path className="in" d={BELL_IN} />
      <path className="pist" d="M 0 70 L 0 96" /><circle className="clap" cx="0" cy="98" r="5" />
      <text y="52" textAnchor="middle" dominantBaseline="middle">{n}</text>
    </>}
  </>
}
function Bell({ n, st, big }: { n: number; st: string; big?: boolean }) {
  return (
    <svg className={`ml2a-bell${st.startsWith('done') || st === 'taken' ? ' off' : ''}${big ? ' big' : ''}`} viewBox="-130 -30 260 300" aria-hidden>
      <path className="ped" d="M 0 -30 L 0 0" />
      <g className="ml2a-sway big"><g transform="scale(2.4)"><BellShape n={n} st={st} /></g></g>
    </svg>
  )
}
function BoardA({ themes, layout, stOf, onPick }: { themes: { name: string; tracks: number }[]; layout: MelCol[]; stOf: (k: string) => string; onPick?: (key: string) => void }) {
  return <>{themes.map((t, ti) => {
    const c = layout[ti], P = c.plant, sts = Array.from({ length: t.tracks }, (_, i) => stOf(`${ti}-${i}`)), all = sts.length > 0 && sts.every(x => x.startsWith('done'))
    const plantStyle = c.k === 1 ? { left: c.left, top: c.top } : { left: c.left, top: c.top, width: 400 * c.k, height: 940 * c.k }
    const lx = c.x + (P.tip.x - 200) * c.k
    return (
      <div key={ti} className={`ml2a-col${all ? ' bare' : ''}`}>
        <svg className="ml2a-plant" style={plantStyle} viewBox="0 0 400 940" aria-hidden>
          <ellipse className="shadow" cx="200" cy="906" rx="120" ry="16" />
          <g className="ml2a-grow">
            <path className="root" d="M 200 900 C 190 914 176 922 160 928 M 200 900 C 212 914 226 920 244 926 M 200 900 L 198 932" />
            <path className="stem-back" d={P.stem} /><path className="stem" d={P.stem} />
            {P.leaves.map((l, k) => { const tx = l.p.x + l.side * l.len, ty = l.p.y - l.len * 0.32
              return <path key={k} className={`leaf l${k % 2}`} d={`M ${l.p.x} ${l.p.y} C ${l.p.x + l.side * l.len * 0.3} ${l.p.y - l.len * 0.36} ${tx - l.side * l.len * 0.15} ${ty - 14} ${tx} ${ty} C ${tx - l.side * l.len * 0.25} ${ty + 16} ${l.p.x + l.side * l.len * 0.35} ${l.p.y + 10} ${l.p.x} ${l.p.y} Z`} /> })}
            <path className="bud" d={`M ${P.tip.x} ${P.tip.y} c 10 4 12 22 2 32 c -10 -6 -12 -24 -2 -32 z`} />
            {P.bells.map((b, i) => <path key={i} className="ped" d={b.ped} />)}
          </g>
          {P.bells.map((b, i) => {
            const st = sts[i], pick = onPick && st === 'av'
            return (
              // точка крепления (атрибут) → качание/рост (CSS, начало координат = точка крепления) → цветок
              <g key={i} className={`ml2a-t ${st}${pick ? ' pick' : ''}`} data-k={`${ti}-${i}`} transform={`translate(${b.x.toFixed(1)} ${b.y.toFixed(1)})${c.kb !== 1 ? ` scale(${c.kb.toFixed(3)})` : ''}`}
                onClick={pick ? () => onPick(`${ti}-${i}`) : undefined}>
                <g className="ml2a-sway" style={{ animationDelay: `${-(ti * 0.7 + i * 0.45)}s` }}><BellShape n={i + 1} st={st} /></g>
              </g>
            )
          })}
        </svg>
        <div className="ml2-label ml2a-label" style={c.labelW === 380 ? { left: lx } : { left: lx, width: c.labelW, marginLeft: -c.labelW / 2, fontSize: c.labelW < 300 ? '0.85em' : undefined }}><b>{t.name}</b>{all && <em>отыграна</em>}</div>
      </div>
    )
  })}</>
}
function Vessel({ n, playing, gold }: { n: number; playing: boolean; gold: boolean }) {
  return (
    <div className={`ml2-vessel ml2-vA${playing ? ' playing' : ''}${gold ? ' won' : ''}`} style={{ left: VX, top: VY }}>
      <span className="ml2-notes" aria-hidden>{[0, 1, 2, 3, 4].map(k => <i key={k} style={{ animationDelay: `${k * 0.45}s`, left: `${k * 14 - 30}px` }}>♪</i>)}</span>
      <i className="gold" aria-hidden />
      <div className="ml2-v-in"><Bell n={n} st="av" big /></div>
    </div>
  )
}

// ── панель стадии ─────────────────────────────────────────────────────────
export type MelTeamV = { id: string; name: string; color?: string }
/** Всё, что панель показывает, — уже готовыми значениями (никаких расчётов очков здесь). */
export type MelPanelData = {
  themeName: string
  trackNo: number
  /** таймер: осталось секунд, из скольких (для одуванчика) и сколько семян */
  timer: { n: number; total: number; seeds: number } | null
  /** ставки идут: все команды по алфавиту, принята ли ставка (сами секунды до конца ставок не показываются) */
  bidding?: { team: MelTeamV; has: boolean }[]
  /** ставки собраны: очередь (первая — играет) */
  bids?: { team: MelTeamV; sec: number | null }[]
  /** чей ход и ставка (секунд) */
  cur?: MelTeamV | null
  bidSec?: number
  /** сколько даст верный ответ первой команды */
  winPts?: number
  /** ответ команды, ход которой (или null — ещё не ответила) */
  answer?: string | null
  /** текст «неверно» (если ведущий отметил промах) */
  wrong?: string | null
  /** верно — до перехода к разбору (редкий промежуток) */
  correctNow?: boolean
  /** разбор */
  correct?: string
  wonTeam?: MelTeamV | null
  wonPts?: number
}
export function MelPanel({ view, d }: { view: MelView; d: MelPanelData }) {
  const first = d.cur, won = d.winPts ?? 0
  return (
    <div className="ml2-panel">
      <div className="ml2-head">
        <div><b>{d.themeName}</b><span>трек {d.trackNo}</span></div>
        {d.timer && <div className="ml2-tm"><Dandelion n={d.timer.n} total={d.timer.total} size={190} seeds={d.timer.seeds} /></div>}
      </div>
      {view === 'listen' && <div className="ml2-big">Слушаем 1 секунду…</div>}
      {view === 'bidding' && <>
        <div className="ml2-big">За сколько секунд угадаете?</div>
        <div className="ml2-hint">2–5 сек → 2 балла · 6–10 сек → 1 балл · передача хода → 0,5 балла</div>
        {/* ставки идут — две колонки уже в утверждённой композиции; больше 12 команд — плотнее */}
        <div className={`ml2-bids${(d.bidding?.length ?? 0) > 12 ? ' d2' : ''}`}>{(d.bidding ?? []).map(({ team: t, has }) => <div key={t.id} className="ml2-bid"><span className="nm" style={{ color: t.color }}>{t.name}</span>{has ? <b className="st ok">ставка принята ✓</b> : <b className="wait">…</b>}</div>)}</div>
      </>}
      {view === 'bids' && <>
        <div className="ml2-sub">Ставки команд</div>
        <div className={`ml2-bids${listDensity(d.bids?.length ?? 0)}`}>{(d.bids ?? []).map((b, k) => <div key={b.team.id} className={`ml2-bid${k === 0 ? ' win' : ''}`}><span className="nm" style={{ color: b.team.color }}>{b.team.name}</span><b>{b.sec != null ? `${b.sec} сек` : '—'}</b>{k === 0 && <span className="tag">играет</span>}</div>)}</div>
        {(d.bids ?? []).length === 0 && <div className="ml2-hint">ставок нет</div>}
      </>}
      {view === 'snippet' && <div className="ml2-big" style={{ color: first?.color }}>{first?.name ?? '—'} · играет {d.bidSec} сек</div>}
      {(view === 'answering' || view === 'wrong') && <>
        <div className="ml2-big" style={{ color: first?.color }}>{first?.name ?? '—'}</div>
        <div className="ml2-hint">ставка {d.bidSec} сек → за верный ответ {won} {balla(won)}</div>
        <div className="ml2-answer">{d.answer ? <>Ответ: <b>{d.answer}</b></> : <span className="wait">ждём ответ…</span>}</div>
        {d.wrong && <div className="ml2-wrong">{d.wrong}</div>}
        {d.correctNow && d.correct != null && <div className="ml2-ans"><span>Верно ✓</span><b>{d.correct}</b></div>}
      </>}
      {view === 'passed' && <>
        <div className="ml2-big" style={{ color: first?.color }}><small>ход передан · </small>{first?.name ?? '—'}</div>
        <div className="ml2-hint">трек звучит целиком · за верный ответ — 0,5 балла</div>
        <div className="ml2-answer">{d.answer ? <>Ответ: <b>{d.answer}</b></> : <span className="wait">ждём ответ…</span>}</div>
        {d.wrong && <div className="ml2-wrong">{d.wrong}</div>}
        {d.correctNow && d.correct != null && <div className="ml2-ans"><span>Верно ✓</span><b>{d.correct}</b></div>}
      </>}
      {(view === 'reveal' || view === 'miss') && <>
        <div className="ml2-ans"><span>{view === 'reveal' ? <>Верно ✓ · +{fmtVal(d.wonPts ?? 0)}</> : 'Правильный ответ'}</span><b>{d.correct}</b></div>
        <div className="ml2-won">{view === 'reveal' ? <><b style={{ color: d.wonTeam?.color }}>{d.wonTeam?.name ?? '—'}</b> забирает {fmtVal(d.wonPts ?? 0)} {balla(d.wonPts ?? 0)}</> : 'Никто не угадал'}</div>
      </>}
    </div>
  )
}
