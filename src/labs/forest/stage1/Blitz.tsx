// ═══ Этап 1 · «Блиц» — три композиции ═══
// Механика (BlitzBoard/blitzState): у каждой команды свои часы, тикают только у той,
// чей ход; три попытки на вопрос; скип −1; порядок ходов один раз задаёт кубик;
// между ходами — пауза с правильным ответом; сверху — сколько вопросов осталось в банке.
// A «Пни по кругу» — команды на спилах пней вокруг поляны, вопрос в центре; корни от пня
//   играющей команды светятся к вопросу.
// B «Тропа ходов» — играющая команда крупно слева с одуванчиком-часами, вопрос большой,
//   внизу тропа фонарей-грибов в порядке ходов.
// C «Деревца-часы» — у каждой команды деревце: высота кроны = оставшееся время,
//   листья облетают; плоды на ветвях = очки; на итоге кроны вырастают по очкам.
import { BLITZ, type BzTeam } from './data'
import { Dandelion, tphase } from './timers'
import { RoundIntro, S1Screen, introTl, useEntrance, type S1Props } from './common'

export const BLITZ_STATES = [
  { id: 'intro', name: 'Вступление раунда' }, { id: 'dice', name: 'Кубик: кто начинает' }, { id: 'question', name: 'Вопрос, идёт время команды' },
  { id: 'wrong', name: 'Неверно — попытки ещё есть' }, { id: 'right', name: 'Верно' }, { id: 'between', name: 'Пауза: правильный ответ, ход дальше' },
  { id: 'warning', name: 'У команды последние 10 секунд' }, { id: 'timeout', name: 'Время команды вышло' }, { id: 'complete', name: 'Итог раунда' },
]
export const BLITZ_VARIANTS = [
  { id: 'A', name: 'A · Пни по кругу', note: 'Команды — на спилах пней вокруг поляны: имя, свои часы, очки. Вопрос — в центре, главный. Пень играющей команды освещён, от него к вопросу бегут светящиеся корни. Отыгравшие пни зарастают мхом.' },
  { id: 'B', name: 'B · Тропа ходов', note: 'Играющая команда крупно слева: имя её цветом и её одуванчик-часы. Вопрос — самый крупный текст экрана. Внизу тропа из фонарей-грибов в порядке ходов: кто отыграл — погас, кто следующий — теплится.' },
  { id: 'C', name: 'C · Деревца-часы', note: 'У каждой команды деревце: высота кроны — сколько времени осталось, с каждой секундой облетает лист. Плоды — очки. Сравнить команды можно одним взглядом. На итоге кроны вырастают по набранным очкам.' },
]

type View = { teams: BzTeam[]; active: string | null; attempts: number; verdict: 'ok' | 'no' | null; q: string; answer: string; asking: string; between: boolean }
function viewOf(state: string): View {
  const base = BLITZ.teams.map(t => ({ ...t }))
  const v: View = { teams: base, active: BLITZ.active, attempts: 0, verdict: null, q: BLITZ.question.text, answer: BLITZ.question.answer, asking: '', between: false }
  if (state === 'dice') { v.teams = base.map(t => ({ ...t, left: 60, correct: 0, missed: 0, done: false })); v.active = null }
  if (state === 'wrong') { v.attempts = 1; v.verdict = 'no' }
  if (state === 'right') { v.verdict = 'ok'; v.teams = base.map(t => t.id === 't1' ? { ...t, correct: 4 } : t) }
  if (state === 'between') { v.between = true; v.active = 't5'; v.teams = base.map(t => t.id === 't1' ? { ...t, correct: 4, left: 31 } : t) }
  if (state === 'warning') v.teams = base.map(t => t.id === 't1' ? { ...t, left: 9 } : t)
  if (state === 'timeout') { v.teams = base.map(t => t.id === 't1' ? { ...t, left: 0 } : t); v.attempts = 2 }
  if (state === 'complete') { v.active = null; v.teams = base.map(t => { const f = BLITZ.final.find(x => x.id === t.id)!; return { ...t, left: 0, done: true, correct: f.correct, missed: f.missed } }) }
  return v
}
const pts = (t: BzTeam) => t.correct - t.missed
const fmtPts = (p: number) => (p > 0 ? `+${p}` : String(p))

function timerFor(state: string) {
  if (state === 'question') return { start: 38, from: 1.0, run: 8 }
  if (state === 'warning') return { start: 9, from: 0.3, run: 6 }
  return null
}

function Attempts({ used, max = 3 }: { used: number; max?: number }) {
  return <div className="bz-att" aria-label={`Использовано попыток: ${used} из ${max}`}>{Array.from({ length: max }, (_, i) => <i key={i} className={i < used ? 'used' : ''} />)}<span>{max - used === 1 ? 'последняя попытка' : `попыток: ${max - used}`}</span></div>
}
function Verdict({ v, answer }: { v: View; answer: string }) {
  if (!v.verdict) return null
  return <div className={`bz-verdict ${v.verdict}`}>{v.verdict === 'ok' ? <>Верно <b>{answer}</b></> : <>Неверно — пробуйте ещё</>}</div>
}
/** Центр экрана: вопрос / кубик / пауза между ходами / итог. Общий для всех трёх композиций по смыслу, разный по месту. */
function Center({ state, v, cls }: { state: string; v: View; cls: string }) {
  const at = v.teams.find(t => t.id === v.active)
  if (state === 'dice') {
    const names = [...BLITZ.teams, ...BLITZ.teams, ...BLITZ.teams].map(t => t.name)
    return (
      <div className={`bz-center ${cls}`}>
        <div className="bz-asking">кто начинает</div>
        <div className="bz-reel"><div className="bz-reel-in">{names.map((nm, i) => <div key={i} className="bz-reel-name">{nm}</div>)}<div className="bz-reel-name pick">{BLITZ.teams[0].name}</div></div></div>
        <div className="bz-dice-cap">порядок ходов дальше — по кругу</div>
      </div>
    )
  }
  if (state === 'complete') return <div className={`bz-center ${cls}`}><div className="bz-asking">блиц окончен</div><div className="bz-qtext">Итоги раунда</div></div>
  if (v.between) return (
    <div className={`bz-center ${cls}`}>
      <div className="bz-asking">ответили верно!</div>
      <div className="bz-qsmall">{BLITZ.question.text}</div>
      <div className="bz-verdict ok">Правильный ответ: <b>{BLITZ.question.answer}</b></div>
      <div className="bz-next">следующий ход — <b style={{ color: at?.color }}>{at?.name}</b></div>
    </div>
  )
  return (
    <div className={`bz-center ${cls}`}>
      <div className="bz-asking">отвечают: <b style={{ color: at?.color }}>{at?.name}</b></div>
      <div className="bz-qtext">{v.q}</div>
      {state === 'timeout' ? <div className="bz-verdict no">Время команды вышло — вопрос доигрывается</div> : <Verdict v={v} answer={v.answer} />}
      {(state === 'question' || state === 'wrong' || state === 'warning' || state === 'timeout') && <Attempts used={v.attempts} />}
    </div>
  )
}

export function Blitz({ variant, state, nOv, onReady }: S1Props) {
  const v = viewOf(state)
  const tm = timerFor(state)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (state === 'intro') return introTl(tl, q)
    tl.fromTo(q('.bz-team'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(1.4)' }, 0)
    tl.fromTo(q('.bz-center > *'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' }, 0.15)
    if (state === 'dice') {
      const rows = BLITZ.teams.length * 3
      tl.fromTo(q('.bz-reel-in'), { y: 0 }, { y: -rows * 96, duration: 2.6, ease: 'power3.out' }, 0.4)
        .fromTo(q('.bz-team.first'), { scale: 1 }, { scale: 1.08, duration: 0.3, yoyo: true, repeat: 1 }, 3.0)
    }
    if (state === 'question' || state === 'warning') tl.fromTo(q('.bz-root-glow'), { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, 0.2)
    if (state === 'right') tl.fromTo(q('.bz-verdict'), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, 0.5)
      .fromTo(q('.bz-team.on .bz-pts'), { scale: 1 }, { scale: 1.4, duration: 0.3, yoyo: true, repeat: 1 }, 0.9)
      .fromTo(q('.bz-fruit.new'), { scale: 0 }, { scale: 1, duration: 0.6, ease: 'back.out(2.4)' }, 0.9)
    if (state === 'wrong') tl.fromTo(q('.bz-verdict'), { x: -10 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }, 0.5)
      .fromTo(q('.bz-att i.used'), { scale: 1.6 }, { scale: 1, duration: 0.5 }, 0.6)
    if (state === 'between') tl.fromTo(q('.bz-team.on'), { scale: 0.92 }, { scale: 1, duration: 0.6, ease: 'back.out(2)' }, 0.8)
    if (state === 'complete') tl.fromTo(q('.bz-team'), { '--grow': 0 }, { '--grow': 1, duration: 1.4, stagger: 0.12, ease: 'power2.out' }, 0.4)
      .fromTo(q('.bz-rank'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(2)' }, 1.2)
  }, tm, [variant, state])
  const live = state === 'question' || state === 'warning'
  const nActive = nOv ?? (live ? nLive : v.teams.find(t => t.id === BLITZ.active)?.left ?? 0)
  const leftOf = (t: BzTeam) => (t.id === BLITZ.active && state !== 'between' && state !== 'complete' && state !== 'dice' ? nActive : t.left)
  const rank = [...v.teams].sort((a, b) => pts(b) - pts(a))
  const place = (t: BzTeam) => 1 + v.teams.filter(x => pts(x) > pts(t)).length
  const mood = state === 'intro' ? 'calm' : undefined
  const bank = <div className="bz-bank"><span>в банке</span><b>{BLITZ.bank}</b><span>вопросов</span></div>
  const ph = (t: BzTeam) => tphase(leftOf(t))

  if (state === 'intro') return (
    <S1Screen rects={[{ x: 460, y: 300, w: 1000, h: 520 }]} n={null} rootRef={root} cls={`bz bz${variant}`} moodOverride={mood}>
      <RoundIntro num="Раунд 5" title={BLITZ.title} rules={BLITZ.rules} emblem={<svg viewBox="0 0 160 160" width="190"><circle cx="80" cy="80" r="60" fill="#4b331d" /><circle cx="80" cy="80" r="50" fill="#8a6a42" />{[40, 30, 20, 10].map(r => <circle key={r} cx="80" cy="80" r={r} fill="none" stroke="#5a3f22" strokeWidth="2" />)}<path d="M 86 20 L 64 84 L 84 84 L 70 140 L 104 66 L 84 66 Z" fill="#ffe3a0" /></svg>} />
    </S1Screen>
  )

  // ── A: пни по кругу
  if (variant === 'A') {
    const pos = [{ x: 610, y: 210 }, { x: 1310, y: 210 }, { x: 460, y: 826 }, { x: 960, y: 846 }, { x: 1460, y: 826 }]
    const ai = v.teams.findIndex(t => t.id === v.active)
    return (
      <S1Screen rects={[{ x: 380, y: 380, w: 1160, h: 300 }]} n={live ? nActive : null} rootRef={root} cls="bz bzA">
        {bank}
        {ai >= 0 && <svg className="bz-roots" viewBox="0 0 1920 1080"><path className="bz-root-glow" d={`M ${pos[ai].x} ${pos[ai].y + (pos[ai].y < 500 ? 70 : -70)} C ${pos[ai].x} ${pos[ai].y < 500 ? 330 : 720} 960 ${pos[ai].y < 500 ? 300 : 760} 960 ${pos[ai].y < 500 ? 390 : 680}`} /></svg>}
        <Center state={state} v={v} cls="bzA-center" />
        {v.teams.map((t, i) => (
          <div key={t.id} className={`bz-team bzA-stump${t.id === v.active ? ' on' : ''}${t.done && state !== 'complete' ? ' done' : ''}${i === 0 ? ' first' : ''} ph-${t.id === v.active ? ph(t) : 'normal'}`} style={{ left: pos[i].x, top: pos[i].y, ['--tc' as string]: t.color }}>
            <div className="bzA-name">{t.name}</div>
            <div className="bzA-wood"><b className="bz-time">{state === 'complete' ? fmtPts(pts(t)) : leftOf(t)}</b><span className="bz-pts">{state === 'complete' ? `${t.correct} верно · ${t.missed} мимо` : fmtPts(pts(t))}</span></div>
            {t.id === v.active && <span className="bz-turn">ход</span>}
            {state === 'complete' && <span className="bz-rank">{place(t)}</span>}
          </div>
        ))}
      </S1Screen>
    )
  }
  // ── B: тропа ходов
  if (variant === 'B') {
    const at = v.teams.find(t => t.id === (v.active ?? ''))
    return (
      <S1Screen rects={[{ x: 520, y: 170, w: 1330, h: 520 }, { x: 60, y: 140, w: 400, h: 640 }]} n={live ? nActive : null} rootRef={root} cls="bz bzB">
        {bank}
        {state !== 'complete' && state !== 'dice' && at && (
          <div className="bzB-hero" style={{ ['--tc' as string]: at.color }}>
            <div className="bzB-hname">{at.name}</div>
            <Dandelion n={leftOf(at)} total={BLITZ.perTeam} size={250} seeds={30} />
            <div className="bzB-hpts">{fmtPts(pts(at))} <span>очков</span></div>
          </div>
        )}
        <Center state={state} v={v} cls={`bzB-center${state === 'complete' || state === 'dice' ? ' wide' : ''}`} />
        <svg className="bzB-path" viewBox="0 0 1920 200" preserveAspectRatio="none"><path d="M 120 150 C 500 90 900 170 1300 120 S 1750 100 1880 130" /></svg>
        <div className="bzB-row">
          {(state === 'complete' ? rank : v.teams).map((t, i) => (
            <div key={t.id} className={`bz-team bzB-lamp${t.id === v.active ? ' on' : ''}${t.done && state !== 'complete' ? ' done' : ''}${i === 0 && state === 'dice' ? ' first' : ''}`} style={{ ['--tc' as string]: t.color }}>
              <svg className="bzB-cap" viewBox="0 0 120 80"><path d="M 6 60 Q 60 -10 114 60 Z" /><rect x="50" y="56" width="20" height="24" rx="6" /></svg>
              <div className="bzB-name">{t.name}</div>
              <div className="bzB-meta"><b className="bz-time">{state === 'complete' ? fmtPts(pts(t)) : leftOf(t)}</b>{state !== 'complete' && <span className="bz-pts">{fmtPts(pts(t))}</span>}</div>
              {state === 'complete' && <span className="bz-rank">{place(t)}</span>}
            </div>
          ))}
        </div>
      </S1Screen>
    )
  }
  // ── C: деревца-часы
  const xs = [380, 740, 1100, 1460, 1800].map(x => x - 60)
  return (
    <S1Screen rects={[{ x: 300, y: 60, w: 1560, h: 380 }]} n={live ? nActive : null} rootRef={root} cls="bz bzC">
      {bank}
      <Center state={state} v={v} cls="bzC-center" />
      {v.teams.map((t, i) => {
        const left = leftOf(t), k = state === 'complete' ? Math.max(0.12, pts(t) / 6) : left / BLITZ.perTeam
        const fruits = Math.max(0, pts(t))
        return (
          <div key={t.id} className={`bz-team bzC-tree${t.id === v.active ? ' on' : ''}${t.done && state !== 'complete' ? ' done' : ''}${i === 0 && state === 'dice' ? ' first' : ''} ph-${t.id === v.active ? ph(t) : 'normal'}`} style={{ left: xs[i], ['--tc' as string]: t.color, ['--k' as string]: k }}>
            <svg className="bzC-svg" viewBox="0 0 240 480" preserveAspectRatio="xMidYMax meet">
              <path className="bzC-trunk" d="M 112 480 C 116 420 108 360 116 300 L 124 300 C 132 360 124 420 128 480 Z" />
              <g className="bzC-crown" style={{ transform: `translateY(${(1 - k) * 260}px) scale(${0.35 + 0.65 * k})` }}>
                {Array.from({ length: 22 }, (_, j) => { const a = j * 2.4, d = 20 + (j % 5) * 14; return <ellipse key={j} cx={120 + Math.cos(a) * d} cy={150 + Math.sin(a) * d * 0.8} rx="34" ry="26" className={`bzC-leaf l${j % 3}`} /> })}
                {Array.from({ length: Math.min(fruits, 8) }, (_, j) => <circle key={j} cx={84 + (j % 4) * 24} cy={136 + Math.floor(j / 4) * 30} r="9" className={`bz-fruit${state === 'right' && t.id === 't1' && j === fruits - 1 ? ' new' : ''}`} />)}
              </g>
            </svg>
            <b className="bz-time bzC-time" style={{ bottom: 130 + 260 * (0.35 + 0.65 * k) }}>{state === 'complete' ? fmtPts(pts(t)) : left}</b>
            <div className="bzC-name">{t.name}</div>
            <div className="bzC-pts"><span className="bz-pts">{state === 'complete' ? `${t.correct} верно · ${t.missed} мимо` : `${fmtPts(pts(t))} очк.`}</span></div>
            {t.id === v.active && <span className="bz-turn">ход</span>}
            {state === 'complete' && <span className="bz-rank">{place(t)}</span>}
          </div>
        )
      })}
    </S1Screen>
  )
}
