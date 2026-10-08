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
import { BLITZ, BLITZ_EXTRA, BLITZ_EXTRA_FINAL, type BzTeam } from './data'
// итоги — той же чистой функцией, что проектор и пульт в игре (очки → штраф → бонус за время → места → баллы)
import { blitzResults, type BlitzResultRow } from '../../../lib/blitz'
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
/** Команды в порядке ходов (как выпал кубик). 3 — первые три, 8 — пять основных + три. */
function teamsFor(count: number): BzTeam[] {
  const all = [...BLITZ.teams, ...BLITZ_EXTRA]
  return (count <= 3 ? all.slice(0, 3) : count >= 8 ? all.slice(0, 8) : all.slice(0, 5)).map(t => ({ ...t }))
}
const FINAL = [...BLITZ.final, ...BLITZ_EXTRA_FINAL]
function viewOf(state: string, count = 5): View {
  const base = teamsFor(count)
  const v: View = { teams: base, active: BLITZ.active, attempts: 0, verdict: null, q: BLITZ.question.text, answer: BLITZ.question.answer, asking: '', between: false }
  if (state === 'dice') { v.teams = base.map(t => ({ ...t, left: 60, correct: 0, missed: 0, done: false })); v.active = null }
  if (state === 'wrong') { v.attempts = 1; v.verdict = 'no' }
  if (state === 'right') { v.verdict = 'ok'; v.teams = base.map(t => t.id === 't1' ? { ...t, correct: 4 } : t) }
  if (state === 'between') { v.between = true; v.active = 't5'; v.teams = base.map(t => t.id === 't1' ? { ...t, correct: 4, left: 31 } : t) }
  if (state === 'warning') v.teams = base.map(t => t.id === 't1' ? { ...t, left: 9 } : t)
  if (state === 'timeout') { v.teams = base.map(t => t.id === 't1' ? { ...t, left: 0 } : t); v.attempts = 2 }
  if (state === 'complete') { v.active = null; v.teams = base.map(t => { const f = FINAL.find(x => x.id === t.id)!; return { ...t, left: f.left, correct: f.correct, missed: f.missed } }) }
  return v
}
const pts = (t: BzTeam) => t.correct - t.missed
function resultsOf(teams: BzTeam[]): Map<string, BlitzResultRow & { timedOut: boolean; left: number }> {
  const rows = blitzResults(teams.map(t => { const f = FINAL.find(x => x.id === t.id)!; return { teamId: t.id, correct: f.correct, missed: f.missed, timedOut: !!f.timedOut, leftMs: f.left * 1000 } }), BLITZ.timeoutPenalty)
  return new Map(rows.map(r => { const f = FINAL.find(x => x.id === r.teamId)!; return [r.teamId, { ...r, timedOut: !!f.timedOut, left: f.left }] }))
}
const ballov = (n: number) => { const a = Math.abs(n) % 100, b = a % 10; return a > 10 && a < 20 ? 'баллов' : b === 1 ? 'балл' : b >= 2 && b <= 4 ? 'балла' : 'баллов' }
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
    const names = [...v.teams, ...v.teams, ...v.teams].map(t => t.name)
    return (
      <div className={`bz-center ${cls}`}>
        <div className="bz-asking">кто начинает</div>
        <div className="bz-reel"><div className="bz-reel-in">{names.map((nm, i) => <div key={i} className="bz-reel-name">{nm}</div>)}<div className="bz-reel-name pick">{v.teams[0].name}</div></div></div>
        <div className="bz-dice-cap">порядок ходов дальше — по кругу</div>
      </div>
    )
  }
  if (state === 'complete') return <div className={`bz-center ${cls}`}><div className="bz-asking">блиц окончен</div><div className="bz-qtext">Итоги раунда</div>
    <div className="bz-rule">очки за ответы · у кого первым кончилось время — штраф −{BLITZ.timeoutPenalty} · за оставшиеся секунды +3 / +2 / +1 · места → баллы 10 / 7 / 5 / 3</div></div>
  if (v.between) return (
    <div className={`bz-center ${cls}`}>
      <div className="bz-asking">ответили верно!</div>
      <div className="bz-qsmall">{BLITZ.question.text}</div>
      <div className="bz-sign"><i className="bz-rope l" /><i className="bz-rope r" /><span>правильный ответ</span><b>{BLITZ.question.answer}</b></div>
      <div className="bz-next">следующий ход — <b style={{ color: at?.color }}>{at?.name}</b></div>
    </div>
  )
  return (
    <div className={`bz-center ${cls}`}>
      <div className="bz-asking"><svg className="bz-lamp-ico" viewBox="0 0 24 34" aria-hidden><path d="M12 0 V6" /><rect x="5" y="6" width="14" height="20" rx="5" /><circle cx="12" cy="16" r="4" /></svg>отвечают: <b style={{ color: at?.color }}>{at?.name}</b></div>
      <div className="bz-qtext">{v.q}</div>
      {state === 'timeout' ? <div className="bz-verdict no">Время команды вышло — вопрос доигрывается</div> : <Verdict v={v} answer={v.answer} />}
      {(state === 'question' || state === 'wrong' || state === 'warning' || state === 'timeout') && <Attempts used={v.attempts} />}
    </div>
  )
}

export function Blitz({ variant, state, nOv, onReady, teams: count = 5 }: S1Props) {
  const tc = variant === 'C' ? count : 5 // A и B рассчитаны на пять мест — число команд проверяется на выбранной C
  const v = viewOf(state, tc)
  const tm = timerFor(state)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (state === 'intro') return introTl(tl, q)
    tl.fromTo(q('.bz-team'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(1.4)' }, 0)
    tl.fromTo(q('.bz-center > *'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' }, 0.15)
    if (state === 'dice') {
      const rows = v.teams.length * 3
      tl.fromTo(q('.bz-reel-in'), { y: 0 }, { y: -rows * 96, duration: 2.6, ease: 'power3.out' }, 0.4)
        .fromTo(q('.bz-team.first'), { scale: 1 }, { scale: 1.08, duration: 0.3, yoyo: true, repeat: 1 }, 3.0)
    }
    if (state === 'question' || state === 'warning') tl.fromTo(q('.bz-root-glow'), { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, 0.2)
    // верно: ответ вспыхивает, от него к дереву команды летит светящееся семя — и на ветке завязывается плод
    if (state === 'right') {
      tl.fromTo(q('.bz-verdict'), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, 0.5)
      const sp = q('.bz-spark')[0] as HTMLElement | undefined
      if (sp) {
        const dx = Number(sp.dataset.dx), dy = Number(sp.dataset.dy)
        tl.fromTo(sp, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.25 }, 1.0)
          .fromTo(sp, { x: 0 }, { x: dx, duration: 1.1, ease: 'power1.inOut' }, 1.1)
          .fromTo(sp, { y: 0 }, { y: dy, duration: 1.1, ease: 'back.in(1.6)' }, 1.1)
          .to(sp, { opacity: 0, scale: 2.2, duration: 0.3 }, 2.2)
      }
      tl.fromTo(q('.bz-fruit.new'), { scale: 0 }, { scale: 1, duration: 0.6, ease: 'back.out(2.4)', transformOrigin: '50% 0%' }, sp ? 2.15 : 0.9)
        .fromTo(q('.bz-team.on .bz-pts'), { scale: 1 }, { scale: 1.4, duration: 0.3, yoyo: true, repeat: 1 }, sp ? 2.25 : 0.9)
    }
    if (state === 'wrong') tl.fromTo(q('.bz-verdict'), { x: -10 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }, 0.5)
      .fromTo(q('.bz-att i.used'), { scale: 1.6 }, { scale: 1, duration: 0.5 }, 0.6)
    // пауза: табличка с правильным ответом спускается на двух лианах и раскачивается
    if (state === 'between') tl.fromTo(q('.bz-sign'), { rotationX: -90, y: -40, opacity: 0 }, { rotationX: 0, y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.8)', transformPerspective: 700, transformOrigin: '50% 0%' }, 0.5)
      .fromTo(q('.bz-sign'), { rotation: -3 }, { rotation: 0, duration: 1.6, ease: 'elastic.out(1, 0.35)' }, 1.2)
      .fromTo(q('.bz-team.on'), { scale: 0.94 }, { scale: 1, duration: 0.6, ease: 'back.out(2)' }, 1.0)
    // итог: кроны отрастают заново, плоды вызревают по очкам, у таблички появляется место
    // (листья растут каждый из своей точки: GSAP крутит CSS-переменную --g, а не transform SVG-группы —
    //  трансформ вложенной в масштабированную группу <g> сдвигал крону вверх)
    // итог: под табличками по очереди проступает расчёт (ответы → штраф/бонус за время → очки),
    // потом вспыхивают места и баллы в зачёт; у первого места крона зацветает
    if (state === 'complete') tl.fromTo(q('.bzC-calc > *'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 }, 0.5)
      .fromTo(q('.bz-rank'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }, 1.6)
      .fromTo(q('.bzC-score'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }, 1.9)
      .fromTo(q('.bzC-blossom i'), { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.03, ease: 'back.out(2.4)' }, 2.3)
  }, tm, [variant, state, tc])
  const live = state === 'question' || state === 'warning'
  const nActive = nOv ?? (live ? nLive : v.teams.find(t => t.id === BLITZ.active)?.left ?? 0)
  const leftOf = (t: BzTeam) => (t.id === BLITZ.active && state !== 'between' && state !== 'complete' && state !== 'dice' ? nActive : t.left)
  const rank = [...v.teams].sort((a, b) => pts(b) - pts(a))
  const place = (t: BzTeam) => 1 + v.teams.filter(x => pts(x) > pts(t)).length
  const mood = state === 'intro' ? 'calm' : undefined
  // банк вопросов — только число (как счётчик remainingCount в углу экрана игры)
  const bank = <div className="bz-bank" aria-label={`Осталось вопросов: ${BLITZ.bank}`}><b>{BLITZ.bank}</b></div>
  const ph = (t: BzTeam) => tphase(leftOf(t))

  if (state === 'intro') return (
    <S1Screen rects={[{ x: 460, y: 300, w: 1000, h: 520 }]} n={null} rootRef={root} cls={`bz bz${variant}`} moodOverride={mood}>
      <RoundIntro intro={BLITZ.intro} emblem={<svg viewBox="0 0 160 160" width="190"><circle cx="80" cy="80" r="60" fill="#4b331d" /><circle cx="80" cy="80" r="50" fill="#8a6a42" />{[40, 30, 20, 10].map(r => <circle key={r} cx="80" cy="80" r={r} fill="none" stroke="#5a3f22" strokeWidth="2" />)}<path d="M 86 20 L 64 84 L 84 84 L 70 140 L 104 66 L 84 66 Z" fill="#ffe3a0" /></svg>} />
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
  const N = v.teams.length, M0 = 60, cw = (1920 - 2 * M0) / N
  const tw = Math.min(cw - 14, 320), sc = tw / 320, th = 440 * sc
  const plaqueH = state === 'complete' ? (N >= 7 ? 250 : 226) : N >= 7 ? 212 : 190, ground = 1062 - plaqueH - 10, treeTop = ground + 20 * sc - th
  const rightT = v.teams.find(t => t.id === 't1')
  const fr = rightT ? FRUITS[Math.min(Math.max(0, pts(rightT)), FRUITS.length) - 1] : undefined
  const ti = v.teams.findIndex(t => t.id === 't1')
  const res = state === 'complete' ? resultsOf(v.teams) : null
  const fp = fr ? crownPt(fr) : null
  const spark = state === 'right' && fp && ti >= 0 ? { x: 960, y: 300, dx: M0 + cw * (ti + 0.5) - (160 - fp[0]) * sc - 960, dy: treeTop + fp[1] * sc - 300 } : null
  return (
    <S1Screen rects={[{ x: 300, y: 50, w: 1320, h: Math.max(260, treeTop - 80) }]} n={live ? nActive : null} rootRef={root} cls={`bz bzC st-${state} n${N >= 7 ? 'many' : N <= 3 ? 'few' : 'mid'}`}>
      <div className="bzC-round">Блиц</div>
      {bank}
      <Center state={state} v={v} cls="bzC-center" />
      {v.teams.map((t, i) => {
        const left = leftOf(t), on = t.id === v.active
        const r = res?.get(t.id)
        const k = state === 'dice' ? 1 : Math.max(0, Math.min(1, left / BLITZ.perTeam))
        const fruits = Math.max(0, pts(t))
        const phase = on ? ph(t) : r?.timedOut ? 'zero' : 'normal'
        const status = r ? (r.timedOut ? 'время вышло' : null) : on ? (phase === 'zero' ? 'время вышло' : 'отвечают') : null
        return (
          <div key={t.id} className={`bz-team bzC-unit${on ? ' on' : ''}${t.done && state !== 'complete' ? ' done' : ''}${i === 0 && state === 'dice' ? ' first' : ''} ph-${phase}`}
            style={{ left: M0 + cw * i, width: cw, ['--tc' as string]: t.color, ['--sc' as string]: sc }}>
            {on && <i className="bzC-beam" style={{ height: ground + 10 }} aria-hidden />}
            <div className="bzC-treebox" style={{ top: treeTop, width: tw, height: th }}>
              <ClockTree k={k} fruits={fruits} seed={i + 1} lantern={on} newFruit={state === 'right' && t.id === 't1'} />
              {on && phase !== 'zero' && <span className="bzC-flies" aria-hidden>{Array.from({ length: 7 }, (_, j) => <i key={j} style={{ left: `${8 + j * 13}%`, top: `${12 + ((j * 37) % 60)}%`, animationDelay: `${-j * 0.6}s` }} />)}</span>}
              <div className="bzC-disc"><b className="bz-time">{left}</b>{r && <span className={`bz-rank${r.place === 1 ? ' gold' : ''}`}>{r.place}{r.shared ? '=' : ''}</span>}</div>
              {r?.place === 1 && <span className="bzC-blossom" aria-hidden>{Array.from({ length: 9 }, (_, j) => <i key={j} style={{ left: `${18 + ((j * 37) % 64)}%`, top: `${8 + ((j * 23) % 36)}%` }} />)}</span>}
            </div>
            <div className={`bzC-plaque${r ? ' fin' : ''}`} style={{ bottom: 14, height: plaqueH, width: Math.min(cw - 16, 440) }}>
              {status && <div className="bzC-status">{on && <svg className="bz-lamp-ico" viewBox="0 0 24 34" aria-hidden><path d="M12 0 V6" /><rect x="5" y="6" width="14" height="20" rx="5" /><circle cx="12" cy="16" r="4" /></svg>}{status}</div>}
              <div className="bzC-name">{t.name}</div>
              {r ? <>
                <div className="bzC-calc">
                  <span>ответы <b>{fmtPts(r.raw)}</b></span>
                  {r.timedOut ? <span className="pen">штраф <b>−{BLITZ.timeoutPenalty}</b></span>
                    : <span>{r.left} с → <b>{r.bonus ? `+${r.bonus}` : '0'}</b></span>}
                  <span className="sum">= {r.points} {ochk(r.points)}</span>
                </div>
                <div className="bzC-score"><b>+{r.score}</b> {ballov(r.score)} в зачёт</div>
              </> : <div className="bzC-pts"><i className="bzC-fruit-ico" aria-hidden /><span className="bz-pts">{fmtPts(pts(t))}</span><small>{ochk(pts(t))}</small></div>}
            </div>
          </div>
        )
      })}
      {spark && <i className="bz-spark" data-dx={spark.dx} data-dy={spark.dy} style={{ left: spark.x, top: spark.y }} aria-hidden />}
    </S1Screen>
  )
}

const ochk = (p: number) => { const a = Math.abs(p) % 100, b = a % 10; return a > 10 && a < 20 ? 'очков' : b === 1 ? 'очко' : b >= 2 && b <= 4 ? 'очка' : 'очков' }

// ── Деревце-часы ──────────────────────────────────────────────────────────────
// Рисунок 320×440, земля на y=420. Ствол с корневым наплывом, три главные ветви и веточки
// (видны всегда — голое дерево на нуле остаётся деревом), крона — три слоя листьев
// (дальний тёмный, средний, ближний светлый; свет луны слева сверху). Листья облетают по
// одному: доля оставшихся = доля оставшегося времени. Плоды на веточках = очки команды.
const BRANCHES: [string, number][] = [
  ['M 154 262 C 138 236 116 208 96 178 C 88 166 80 156 70 146', 13], ['M 168 252 C 186 226 206 200 224 174 C 232 162 240 152 250 142', 13],
  ['M 160 206 C 160 172 158 140 156 110 C 155 96 152 84 148 72', 10], ['M 130 222 C 116 212 100 206 84 206', 6], ['M 190 216 C 206 210 222 208 238 210', 6],
  ['M 96 178 C 84 176 72 178 60 184', 5], ['M 112 198 C 108 178 110 158 116 138', 5], ['M 224 174 C 236 176 250 180 262 186', 5],
  ['M 212 190 C 212 170 208 150 202 130', 5], ['M 157 132 C 168 118 178 104 190 90', 5], ['M 156 122 C 146 110 136 100 124 92', 5],
  ['M 70 146 C 66 136 64 126 64 114', 4], ['M 250 142 C 254 132 256 122 256 110', 4], ['M 148 72 C 146 62 146 54 148 44', 4],
]
const CLUSTERS: [number, number, number, 0 | 1 | 2][] = [
  [96, 122, 44, 0], [160, 78, 48, 0], [224, 120, 44, 0], [128, 98, 40, 0], [194, 98, 40, 0],
  [70, 150, 34, 1], [250, 150, 34, 1], [118, 146, 40, 1], [204, 146, 40, 1], [160, 120, 44, 1],
  [100, 172, 28, 2], [220, 172, 28, 2], [160, 162, 32, 2], [138, 66, 26, 2], [184, 68, 26, 2],
]
/** Точки, где висят плоды (на концах веточек, по краю кроны). */
const FRUITS: [number, number][] = [[62, 190], [264, 192], [116, 182], [206, 186], [160, 178], [86, 158], [238, 160], [138, 150]]
function rng(seed: number) { let x = seed * 9301 + 49297; return () => { x = (x * 9301 + 49297) % 233280; return x / 233280 } }
type Leaf = { x: number; y: number; r: number; s: number; layer: 0 | 1 | 2; lit: boolean; order: number; cl: number; slot: number }
const LEAVES: Leaf[] = (() => {
  const r = rng(7), out: Leaf[] = []
  CLUSTERS.forEach(([cx, cy, R, layer], cl) => { for (let j = 0; j < 12; j++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * R
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * 0.8
    out.push({ x, y, r: r() * 180, s: 1.8 + r() * 1.0, layer, lit: x + y < 250 && layer > 0, order: r(), cl, slot: j })
  } })
  return out
})()
/** Крона, ветви, плоды и фонарь крупнее ствола: масштаб вокруг развилки (160, 262). */
const CROWN_K = 1.18, CROWN_T = `translate(160 262) scale(${CROWN_K}) translate(-160 -262)`
const crownPt = ([x, y]: [number, number]) => [160 + (x - 160) * CROWN_K, 262 + (y - 262) * CROWN_K] as const
const LEAF_D = 'M 0 -9 C 6 -5 6.5 3 0 10 C -6.5 3 -6 -5 0 -9 Z'

/** Порядок облетания (индексы листьев, первыми — дольше всех держащиеся). Листья снимаются ПО
 *  ОЧЕРЕДИ из каждого пучка кроны (а внутри пучка — в своём перемешанном порядке), поэтому на любой
 *  секунде крона редеет равномерно и сохраняет силуэт. Зависит только от номера дерева: перемотка к
 *  8 секундам даёт тот же набор листьев, что честный отсчёт до 8. */
const FALL = new Map<number, number[]>()
function fallOrder(seed: number): number[] {
  const hit = FALL.get(seed); if (hit) return hit
  const h = (n: number) => { let t = (n + seed * 0x9E3779B9) >>> 0; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  const byCl = CLUSTERS.map((_, c) => LEAVES.map((l, i) => ({ l, i })).filter(x => x.l.cl === c).sort((a, b) => h(a.i) - h(b.i)).map(x => x.i))
  const clOrder = CLUSTERS.map((_, c) => c).sort((a, b) => h(1000 + a) - h(1000 + b))
  const out: number[] = []
  for (let round = 0; round < 12; round++) for (const c of clOrder) if (byCl[c][round] !== undefined) out.push(byCl[c][round])
  FALL.set(seed, out); return out
}
/** Земля дерева в координатах кроны (крона увеличена CROWN_T вокруг развилки). */
const GROUND_IN_CROWN = 262 + (414 - 262) / 1.18

function ClockTree({ k, fruits, seed, lantern, newFruit }: { k: number; fruits: number; seed: number; lantern: boolean; newFruit: boolean }) {
  const keep = Math.round(k * LEAVES.length)
  const goneSet = new Set(fallOrder(seed).slice(keep))
  const pile = Math.round((1 - k) * 10)
  return (
    <svg className="bzC-tree" viewBox="0 0 320 440" aria-hidden>
      <ellipse className="bzC-shadow" cx="160" cy="424" rx="118" ry="16" />
      <path className="bzC-roots" d="M 142 418 C 130 424 116 428 98 430 M 180 418 C 194 424 208 428 226 430 M 152 422 C 150 428 146 432 140 436 M 170 422 C 174 428 180 432 188 434" />
      <path className="bzC-trunk" d="M 134 424 C 146 414 150 392 151 360 C 152 320 148 272 152 226 C 153 214 156 204 158 196 L 166 196 C 168 206 170 216 171 230 C 174 272 170 322 172 360 C 173 392 178 414 192 424 Z" />
      <path className="bzC-bark" d="M 157 410 C 159 360 155 300 159 240 M 166 402 C 166 350 168 300 165 252 M 152 380 C 154 372 154 364 153 356" />
      <path className="bzC-trunk-rim" d="M 151 360 C 152 320 148 272 152 226 C 153 214 156 204 158 196" />
      <g transform={CROWN_T}>
      {BRANCHES.map(([d, w], j) => <path key={j} className="bzC-branch" d={d} style={{ strokeWidth: w }} />)}
      {BRANCHES.slice(0, 3).map(([d], j) => <path key={j} className="bzC-branch-rim" d={d} transform="translate(-1.6 -1.2)" />)}
      </g>
      <path className="bzC-moss" d="M 112 426 C 124 414 140 418 150 422 C 160 412 176 414 186 422 C 198 416 212 420 218 428 Z" />
      {Array.from({ length: pile }, (_, j) => { const rr = rng(seed * 31 + j); const x = 70 + rr() * 180, y = 422 + rr() * 12; return <path key={j} className={`bzC-fallen f${j % 3}`} d={LEAF_D} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(rr() * 180).toFixed(0)}) scale(1.3 0.7)`} /> })}
      <g transform={CROWN_T}>
      {[0, 1, 2].map(layer => (
        <g key={layer} className={`bzC-crown l${layer}`}>
          {LEAVES.map((l, j) => l.layer !== layer ? null : (
            // три уровня: точка крепления (атрибут, не меняется никогда) → движение (CSS: облетание,
            // дрожь; начало отсчёта = точка крепления) → форма листа (поворот/размер, атрибут)
            <g key={j} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)})`}>
              <g className={`lf${goneSet.has(j) ? ' gone' : ''}${l.lit ? ' lit' : ''}`} style={{ ['--fx' as string]: `${((l.order - 0.5) * 70).toFixed(0)}px`, ['--fy' as string]: `${(GROUND_IN_CROWN - l.y).toFixed(0)}px`, ['--fr' as string]: `${(40 + l.order * 110).toFixed(0)}deg`, ['--d' as string]: `${(l.order * 0.5).toFixed(2)}s` }}>
                <path d={LEAF_D} transform={`rotate(${l.r.toFixed(0)}) scale(${l.s.toFixed(2)})`} />
              </g>
            </g>
          ))}
        </g>
      ))}
      {FRUITS.slice(0, Math.min(fruits, FRUITS.length)).map(([x, y], j) => (
        <g key={j} className={`bz-fruit${newFruit && j === Math.min(fruits, FRUITS.length) - 1 ? ' new' : ''}`}>
          <path className="bz-fruit-stalk" d={`M ${x} ${y - 14} L ${x} ${y - 6}`} />
          <circle cx={x} cy={y} r="8.5" /><circle className="bz-fruit-hi" cx={x - 2.6} cy={y - 2.8} r="2.6" />
        </g>
      ))}
      {lantern && <g className="bzC-lantern">
        <path className="bzC-lantern-rope" d="M 240 158 L 240 196" />
        <circle className="bzC-lantern-glow" cx="240" cy="210" r="30" />
        <rect className="bzC-lantern-body" x="232" y="196" width="16" height="24" rx="6" />
        <circle className="bzC-lantern-fire" cx="240" cy="208" r="4.5" />
      </g>}
      </g>
    </svg>
  )
}
