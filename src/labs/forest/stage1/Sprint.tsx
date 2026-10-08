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
/** Лист-подложка: основание у номера, острый кончик справа; растягивается под любую высоту вопроса. */
const LEAF = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'
const REVIEW_AT = 3 // в B/C «ответ за ответом» показываем, как открываются 1…3 (в A — все восемь)

function QItem({ q, cls = '', answer, leaf }: { q: SprintQ; cls?: string; answer?: boolean; leaf?: boolean }) {
  return (
    <div className={`sp-q ${cls}`} data-n={q.n}>
      {leaf && <svg className="sp-leaf" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <path className="sp-leaf-under" d="M 30 62 C 50 104 80 104 104 86 C 92 68 66 58 30 62 Z" />
        <path className="sp-leaf-main" d={LEAF} />
        <path className="sp-leaf-rib" d="M 1 50 Q 50 46 99 50 M 18 49 Q 25 30 34 13 M 38 48 Q 46 28 55 9 M 58 48 Q 67 30 77 15 M 18 51 Q 25 70 34 87 M 38 52 Q 46 72 55 91 M 58 52 Q 67 70 77 85" />
      </svg>}
      <i className="sp-mark" />
      <span className="sp-n">{q.n}</span>
      <div className="sp-body">
        <div className="sp-t">{q.text}</div>
        {answer && <div className="sp-a"><i className="sp-a-leaf" aria-hidden />{q.answer}</div>}
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
      // A: с кроны спускаются лианы, по ним раскрываются листья-подложки, на листьях проступают вопросы;
      // одуванчик поднимается из своей розетки (стебель растёт от земли)
      if (variant === 'A') tl.fromTo(q('.spA-vine'), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, stagger: 0.1, ease: 'power2.out' }, 0)
          .fromTo(q('.sp-leaf'), { scaleX: 0.2, scaleY: 0.6, opacity: 0, rotation: -6 }, { scaleX: 1, scaleY: 1, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.08, ease: 'back.out(1.3)', transformOrigin: '6% 50%' }, 0.3)
          .fromTo(q('.sp-n'), { scale: 0 }, { scale: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(2.2)' }, 0.35)
          .fromTo(q('.sp-q .sp-body, .sp-q .sp-img'), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' }, 0.6)
          .fromTo(q('.spA-timer'), { clipPath: 'inset(100% -40% 0 -40%)' }, { clipPath: 'inset(0% -40% 0 -40%)', duration: 1.3, ease: 'power2.out' }, 0.1)
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
        // ответ «распускается»: из бутона раскрывается золотой цветок, буквы ответа поднимаются из его
        // сердцевины, семя-метка внизу вызревает; прошлый вопрос уносит ветром, как семечко
        for (let k = 0; k < QS.length; k++) {
          const at = k * 2.3, f = `.spA-focus[data-k="${k}"]`
          tl.fromTo(q(`${f}`), { opacity: 0 }, { opacity: 1, duration: 0.01 }, at)
            .fromTo(q(`${f} .spA-fq`), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, at)
            .fromTo(q(`${f} .spA-bloom`), { scale: 0, rotation: -70, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.5)' }, at + 0.7)
            .fromTo(q(`${f} .spA-fa .ch`), { opacity: 0, y: 26, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.035, ease: 'back.out(2)' }, at + 1.0)
            .fromTo(q(`.spA-pod[data-k="${k}"]`), { scale: 1 }, { scale: 1.25, duration: 0.25, yoyo: true, repeat: 1 }, at + 1.0)
            .fromTo(q(`.spA-pod[data-k="${k}"] i`), { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, at + 1.05)
          if (k < QS.length - 1) tl.to(q(f), { opacity: 0, y: -40, x: 60, rotation: 3, duration: 0.45, ease: 'power2.in' }, at + 2.0)
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
    // все ответы: из-под каждого листа разворачивается второй, маленький лист-ответ
    if (state === 'summary') tl.fromTo(q('.sp-a'), { opacity: 0, clipPath: 'inset(0 100% 0 0 round 30px)' }, { opacity: 1, clipPath: 'inset(0 0% 0 0 round 30px)', duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 0.2)
        .fromTo(q('.sp-a-leaf'), { rotation: -50, scale: 0.3 }, { rotation: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(2)' }, 0.25)
  }, tm, [variant, state])
  const fx = fixedN(state)
  const n = fx === null ? null : nOv ?? (fx === 0 ? 0 : nLive)
  const showAns = state === 'summary' || state === 'review'

  // ── A
  if (variant === 'A') {
    const rects: Rect[] = state === 'review' ? [{ x: 360, y: 230, w: 1200, h: 560 }] : [{ x: 60, y: 110, w: 740, h: 940 }, { x: 1120, y: 110, w: 740, h: 940 }]
    const dn = n ?? 0, rooted = 237
    return (
      <S1Screen rects={state === 'intro' ? [{ x: 460, y: 300, w: 1000, h: 520 }] : rects} n={n} rootRef={root} cls="spA">
        {state === 'intro' ? <RoundIntro num="Раунд 3" title={SPRINT.title} rules={SPRINT.rules} emblem={<Dandelion n={120} total={120} size={170} seeds={24} />} /> : <>
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden><defs>
            <linearGradient id="spLeafG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#174a35" /><stop offset=".55" stopColor="#0f3a2a" /><stop offset="1" stopColor="#0a2c20" /></linearGradient>
          </defs></svg>
          <div className="sp-head">{SPRINT.title}</div>
          {state !== 'review' && <>
            {state !== 'summary' && <div className="spA-timer sp-tm">
              <Dandelion n={state === 'read' ? 120 : dn} total={SPRINT.total} size={330} seeds={24} rooted={rooted} hideNum={state === 'read'} />
              {state === 'read' && <><b className="spA-count">{n}</b><span className="spA-under">читаем вопросы</span></>}
              {state === 'over' && <div className="sp-over spA-under">Время вышло</div>}
            </div>}
            {[0, 1].map(c => (
              <div key={c} className={`spA-col c${c}`}>
                <svg className="spA-vine" viewBox="0 0 64 1060" preserveAspectRatio="none" aria-hidden>
                  <path className="spA-vine-s" d="M 30 0 C 44 120 18 240 32 360 S 20 600 31 720 S 40 900 31 1000" />
                  {Array.from({ length: 9 }, (_, k) => { const y = 60 + k * 112, sd = k % 2 ? 1 : -1; return <path key={k} className="spA-vine-l" d={`M 31 ${y} c ${sd * 10} -10 ${sd * 26} -8 ${sd * 30} 4 c ${-sd * 10} 6 ${-sd * 22} 6 ${-sd * 30} -4 z`} /> })}
                </svg>
                {QS.slice(c * 4, c * 4 + 4).map(q => <QItem key={q.n} q={q} answer={showAns} leaf />)}
              </div>
            ))}
          </>}
          {state === 'review' && <>
            {QS.map((q, k) => (
              <div key={q.n} className="spA-focus" data-k={k}>
                <div className="spA-fq"><span className="sp-n">{q.n}</span>{q.text}</div>
                <div className="spA-fa">
                  <svg className="spA-bloom" viewBox="-120 -120 240 240" aria-hidden>
                    {Array.from({ length: 12 }, (_, j) => <ellipse key={j} cx="0" cy="-62" rx="20" ry="52" transform={`rotate(${j * 30})`} className={`p${j % 2}`} />)}
                    <circle r="30" className="core" />
                  </svg>
                  <span className="spA-fa-t">{q.answer.split('').map((ch, i) => <span key={i} className="ch">{ch === ' ' ? '\u00a0' : ch}</span>)}</span>
                </div>
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
