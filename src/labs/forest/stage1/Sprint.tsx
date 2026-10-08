// ═══ Этап 1 · «120 секунд» — три композиции ═══
// Механика (SprintBoard): все вопросы сразу на одном слайде → «читаем вопросы» (5 с) →
// таймер 120 с с музыкой → время вышло → разбор по одному вопросу.
// A «Поляна с одуванчиком» — две колонки на лианах, в центре крупный одуванчик-часы.
// B «Берёста» — один большой лист бересты: тёмные чернила на светлой коре, лучшая
//   читаемость с дальнего ряда; время — лоза по верху, листья облетают.
// C «Ярусы» — вопросы по два на четырёх ветвях-ярусах; время — кольцо из 12 цветков
//   в дупле древнего дерева; разбор идёт ярусами.
import { SPRINT, type SprintQ } from './data'
import { Dandelion, BudRing, VineTimer } from './timers'
import { RoundIntro, S1Screen, introTl, useEntrance, type S1Props } from './common'
import type { Rect } from './env'

export const SPRINT_STATES = [
  { id: 'intro', name: 'Вступление раунда' }, { id: 'read', name: 'Читаем вопросы (5 с)' }, { id: 'active', name: 'Идёт время' },
  { id: 'warning', name: 'Последние 10 секунд' }, { id: 'over', name: 'Время вышло' }, { id: 'review', name: 'Разбор: ответ за ответом' }, { id: 'summary', name: 'Разбор: все ответы' },
]
export const SPRINT_VARIANTS = [
  { id: 'A', name: 'A · Поляна с одуванчиком', note: 'Две колонки вопросов висят на лианах, в центре — крупный одуванчик: 24 семени по 5 секунд. Разбор — один вопрос крупно по центру, внизу 8 семян-меток прогресса.' },
  { id: 'B', name: 'B · Берёста', note: 'Все восемь вопросов на одном большом листе бересты между двумя деревьями: тёмные чернила на светлой коре — самый читаемый вариант. Время — лоза по верху, листья облетают от кончика. Разбор — ответы вписываются прямо под вопросами, как красными чернилами.' },
  { id: 'C', name: 'C · Ярусы', note: 'Четыре ветви-яруса, на каждой по два вопроса. Время — кольцо из 12 цветков в дупле древнего дерева: каждые 10 секунд один закрывается в бутон. Разбор идёт ярусами: ветвь светлеет, под вопросами вызревают ответы.' },
]

const QS = SPRINT.questions
const REVIEW_AT = 3 // в разборе «ответ за ответом» показываем, как открываются 1…3

function QItem({ q, cls = '', answer }: { q: SprintQ; cls?: string; answer?: boolean }) {
  return (
    <div className={`sp-q ${cls}`} data-n={q.n}>
      <i className="sp-mark" />
      <span className="sp-n">{q.n}</span>
      <div className="sp-body">
        <div className="sp-t">{q.text}</div>
        {answer && <div className="sp-a">{q.answer}</div>}
      </div>
      {q.img && <img className="sp-img" src={q.img.src} alt="" style={{ aspectRatio: `${q.img.w} / ${q.img.h}` }} />}
    </div>
  )
}

function timerFor(state: string) {
  if (state === 'read') return { start: 5, from: 0.4, run: 5 }
  if (state === 'active') return { start: 87, from: 1.6, run: 12 }
  if (state === 'warning') return { start: 9, from: 0.3, run: 6 }
  return null
}
const fixedN = (state: string) => (state === 'over' ? 0 : state === 'intro' || state === 'review' || state === 'summary' ? null : undefined)

export function Sprint({ variant, state, nOv, onReady }: S1Props) {
  const tm = timerFor(state)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (state === 'intro') return introTl(tl, q)
    const items = q('.sp-q')
    if (state === 'read' || state === 'active') {
      // перестройка: в A с кроны спускаются лианы, в B береста разворачивается, в C ветви прорастают
      if (variant === 'A') tl.fromTo(q('.spA-vine'), { scaleY: 0 }, { scaleY: 1, duration: 0.7, stagger: 0.05, transformOrigin: '50% 0%' }, 0)
          .fromTo(items, { opacity: 0, y: -24, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.6, stagger: 0.07, ease: 'power3.out' }, 0.35)
          .fromTo(q('.spA-timer'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.5)' }, 0.2)
      if (variant === 'B') tl.fromTo(q('.spB-sheet'), { clipPath: 'inset(0 0 100% 0 round 18px)' }, { clipPath: 'inset(0 0 0% 0 round 18px)', duration: 1.0, ease: 'power3.inOut' }, 0)
          .fromTo(items, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.06 }, 0.6)
          .fromTo(q('.spB-timer'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.3)
      if (variant === 'C') tl.fromTo(q('.spC-bough'), { strokeDashoffset: 1500 }, { strokeDashoffset: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out' }, 0)
          .fromTo(items, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'back.out(1.4)' }, 0.5)
          .fromTo(q('.spC-timer'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }, 0.2)
    }
    if (state === 'warning') tl.fromTo(q('.sp-tm'), { scale: 1 }, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0)
    if (state === 'over') tl.fromTo(q('.sp-over'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.6)' }, 0.4).to(items, { opacity: 0.55, duration: 0.8 }, 0.3)
    if (state === 'review') {
      if (variant === 'A') {
        for (let k = 0; k < REVIEW_AT; k++) {
          const at = k * 2.4
          tl.fromTo(q(`.spA-focus[data-k="${k}"] .spA-fq`), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, at)
            .fromTo(q(`.spA-focus[data-k="${k}"] .spA-fa`), { opacity: 0, scale: 0.7, filter: 'blur(4px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(1.8)' }, at + 0.9)
            .fromTo(q(`.spA-pod[data-k="${k}"]`), { scale: 1 }, { scale: 1.25, duration: 0.25, yoyo: true, repeat: 1 }, at + 0.9)
            .fromTo(q(`.spA-pod[data-k="${k}"] i`), { opacity: 0 }, { opacity: 1, duration: 0.3 }, at + 0.95)
          if (k < REVIEW_AT - 1) tl.to(q(`.spA-focus[data-k="${k}"]`), { opacity: 0, y: -14, duration: 0.4 }, at + 2.1)
        }
      } else {
        for (let k = 0; k < REVIEW_AT; k++) {
          const at = k * 1.6
          tl.fromTo(q(`.sp-q[data-n="${k + 1}"]`), { opacity: 0.42 }, { opacity: 1, duration: 0.4 }, at)
            .fromTo(q(`.sp-q[data-n="${k + 1}"] .sp-mark`), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, at)
            .fromTo(q(`.sp-q[data-n="${k + 1}"] .sp-a`), { opacity: 0, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power1.inOut' }, at + 0.3)
          if (k > 0) tl.to(q(`.sp-q[data-n="${k}"] .sp-mark`), { opacity: 0, duration: 0.3 }, at)
          if (variant === 'C' && k % 2 === 0) tl.fromTo(q(`.spC-tier[data-t="${k / 2}"] .spC-glow`), { opacity: 0 }, { opacity: 1, duration: 0.6 }, at)
        }
      }
    }
    if (state === 'summary') tl.fromTo(q('.sp-a'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.2)
  }, tm, [variant, state])
  const fx = fixedN(state)
  const n = fx === null ? null : nOv ?? (fx === 0 ? 0 : nLive)
  const showAns = state === 'summary' || state === 'review'

  // ── A
  if (variant === 'A') {
    const rects: Rect[] = state === 'review' ? [{ x: 460, y: 250, w: 1000, h: 560 }] : [{ x: 100, y: 120, w: 660, h: 880 }, { x: 1160, y: 120, w: 680, h: 880 }]
    return (
      <S1Screen rects={state === 'intro' ? [{ x: 460, y: 300, w: 1000, h: 520 }] : rects} n={n} rootRef={root} cls="spA">
        {state === 'intro' ? <RoundIntro num="Раунд 3" title={SPRINT.title} rules={SPRINT.rules} emblem={<Dandelion n={120} total={120} size={170} seeds={24} />} /> : <>
          <div className="sp-head">{SPRINT.title}</div>
          {state !== 'review' && <>
            {[0, 1].map(c => (
              <div key={c} className={`spA-col c${c}`}>
                {QS.slice(c * 4, c * 4 + 4).map(q => <div key={q.n} className="spA-cell"><i className="spA-vine" /><QItem q={q} answer={showAns} /></div>)}
              </div>
            ))}
            <div className="spA-timer sp-tm">
              {state === 'read' ? <div className="sp-read"><Dandelion n={120} total={120} size={300} seeds={24} hideNum /><b>{n}</b><span>читаем вопросы</span></div>
                : state === 'summary' ? null : <Dandelion n={n ?? 0} total={SPRINT.total} size={330} seeds={24} />}
              {state === 'over' && <div className="sp-over">Время вышло</div>}
            </div>
          </>}
          {state === 'review' && <>
            {QS.slice(0, REVIEW_AT).map((q, k) => (
              <div key={q.n} className="spA-focus" data-k={k}>
                <div className="spA-fq"><span className="sp-n">{q.n}</span>{q.text}</div>
                <div className="spA-fa">{q.answer}</div>
              </div>
            ))}
            <div className="spA-pods">{QS.map((q, k) => <span key={q.n} className="spA-pod" data-k={k}><i />{q.n}</span>)}</div>
          </>}
        </>}
      </S1Screen>
    )
  }
  // ── B
  if (variant === 'B') {
    return (
      <S1Screen rects={state === 'intro' ? [{ x: 460, y: 300, w: 1000, h: 520 }] : [{ x: 170, y: 150, w: 1580, h: 860 }]} n={n} rootRef={root} cls="spB">
        {state === 'intro' ? <RoundIntro num="Раунд 3" title={SPRINT.title} rules={SPRINT.rules} emblem={<svg viewBox="0 0 200 120" width="260"><path d="M10 70 Q100 30 190 60" stroke="#6b8f5e" strokeWidth="6" fill="none" />{Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${20 + i * 20} ${66 - i * 2} c 4 -14 18 -16 22 -4 c -8 4 -16 6 -22 4 z`} fill="#5fa77a" />)}</svg>} /> : <>
          <div className="sp-head spB-head">{SPRINT.title}</div>
          <div className="spB-timer sp-tm">
            {n != null && <VineTimer n={state === 'read' ? SPRINT.total : n} total={SPRINT.total} width={1180} />}
            {n != null && <b className={`spB-num${state === 'read' ? ' read' : ''}`}>{state === 'read' ? <><small>читаем</small>{n}</> : n}</b>}
            {state === 'over' && <div className="sp-over">Время вышло</div>}
          </div>
          <i className="spB-rope l" /><i className="spB-rope r" />
          <div className="spB-sheet">
            <div className="spB-grid">{QS.map(q => <QItem key={q.n} q={q} answer={showAns} cls={state === 'review' ? 'rv' : ''} />)}</div>
          </div>
        </>}
      </S1Screen>
    )
  }
  // ── C
  const tiers = [0, 1, 2, 3]
  return (
    <S1Screen rects={state === 'intro' ? [{ x: 460, y: 300, w: 1000, h: 520 }] : [{ x: 470, y: 120, w: 1400, h: 840 }, { x: 60, y: 360, w: 340, h: 360 }]} n={n} rootRef={root} cls="spC">
      {state === 'intro' ? <RoundIntro num="Раунд 3" title={SPRINT.title} rules={SPRINT.rules} emblem={<BudRing n={120} total={120} size={200} />} /> : <>
        <div className="sp-head spC-head">{SPRINT.title}</div>
        <div className="spC-timer sp-tm">
          {n != null && <BudRing n={state === 'read' ? 120 : n} total={SPRINT.total} size={350} />}
          {state === 'read' && <div className="spC-read"><b>{n}</b><span>читаем вопросы</span></div>}
          {state === 'over' && <div className="sp-over">Время вышло</div>}
        </div>
        {tiers.map(t => (
          <div key={t} className="spC-tier" data-t={t} style={{ top: 132 + t * 214 }}>
            <i className="spC-glow" />
            <svg className="spC-branch" viewBox="0 0 1400 40" preserveAspectRatio="none"><path className="spC-bough" d={`M 0 ${22 + (t % 2) * 4} C 300 ${8 + t * 3} 700 34 1400 ${16 + (t % 2) * 6}`} /></svg>
            {QS.slice(t * 2, t * 2 + 2).map(q => <QItem key={q.n} q={q} answer={showAns} cls={state === 'review' ? 'rv' : ''} />)}
          </div>
        ))}
      </>}
    </S1Screen>
  )
}
