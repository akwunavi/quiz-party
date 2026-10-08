// ═══ «120 секунд» — Поляна с одуванчиком (утверждено, заморожено) ═══
// Механика (SprintBoard): все вопросы сразу на одном слайде → «читаем вопросы» (5 с) →
// таймер 120 с с музыкой → время вышло → разбор по одному вопросу (как ShowAnswers).
// Две колонки вопросов на листьях вдоль лиан, в центре — одуванчик-часы на своём стебле.
import { SPRINT, SPRINT_TEAM_ANS, type SprintQ } from './data'
import { Dandelion } from './timers'
import { RoundIntro, S1Screen, introTl, useEntrance, type S1Props } from './common'
import type { Rect } from './env'

export const SPRINT_STATES = [
  { id: 'intro', name: 'Вступление раунда' }, { id: 'read', name: 'Читаем вопросы (5 с)' }, { id: 'active', name: 'Идёт время' },
  { id: 'warning', name: 'Последние 10 секунд' }, { id: 'over', name: 'Время вышло' },
  { id: 'review', name: 'Разбор: вопрос 3, ответы скрыты' }, { id: 'reveal', name: 'Разбор: ответ и ответы команд' }, { id: 'reveal7', name: 'Разбор: вопрос с картинкой' },
]
export const SPRINT_VARIANTS = [
  { id: 'A', name: 'A · Поляна с одуванчиком', note: 'Две колонки вопросов висят на лианах, в центре — крупный одуванчик: 24 семени по 5 секунд. Разбор — один вопрос крупно по центру, внизу 8 семян-меток прогресса.' },
]

const QS = SPRINT.questions
/** Лист-подложка: основание у номера, острый кончик справа; растягивается под любую высоту вопроса. */
const LEAF = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'

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
const fixedN = (state: string) => (state === 'over' ? 0 : state === 'intro' || state === 'review' || state === 'reveal' || state === 'reveal7' ? null : undefined)

export function Sprint({ state, nOv, onReady }: S1Props) {
  const tm = timerFor(state)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (state === 'intro') return introTl(tl, q)
    const items = q('.sp-q')
    if (state === 'read' || state === 'active') {
      // A: с кроны спускаются лианы, по ним раскрываются листья-подложки, на листьях проступают вопросы;
      // одуванчик поднимается из своей розетки (стебель растёт от земли)
      tl.fromTo(q('.spA-vine'), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, stagger: 0.1, ease: 'power2.out' }, 0)
          .fromTo(q('.sp-leaf'), { scaleX: 0.2, scaleY: 0.6, opacity: 0, rotation: -6 }, { scaleX: 1, scaleY: 1, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.08, ease: 'back.out(1.3)', transformOrigin: '6% 50%' }, 0.3)
          .fromTo(q('.sp-n'), { scale: 0 }, { scale: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(2.2)' }, 0.35)
          .fromTo(q('.sp-q .sp-body, .sp-q .sp-img'), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' }, 0.6)
          .fromTo(q('.spA-timer'), { clipPath: 'inset(100% -40% 0 -40%)' }, { clipPath: 'inset(0% -40% 0 -40%)', duration: 1.3, ease: 'power2.out' }, 0.1)
    }
    if (state === 'warning') tl.fromTo(q('.sp-tm'), { scale: 1 }, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0)
    if (state === 'over') tl.fromTo(q('.sp-over'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.6)' }, 0.4).to(items, { opacity: 0.55, duration: 0.8 }, 0.3)
    if (state === 'reveal' || state === 'reveal7') {
      // показ ответа: из бутона раскрывается цветок, буквы ответа поднимаются из сердцевины;
      // когда ответ целиком на экране — открываются ответы команд, потом вердикты (как в игре:
      // автопроверка срабатывает после полного показа ответа)
      tl.fromTo(q('.spA-rq'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 0)
        .fromTo(q('.spA-ta'), { opacity: 0, scaleX: 0.3 }, { opacity: 1, scaleX: 1, duration: 0.4, stagger: 0.05, transformOrigin: '0% 50%' }, 0.1)
        .fromTo(q('.spA-bloom'), { scale: 0, rotation: -70, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.5)' }, 0.4)
        .fromTo(q('.spA-fa-t .ch'), { opacity: 0, y: 26, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.035, ease: 'back.out(2)' }, 0.7)
        .fromTo(q('.spA-aimg'), { opacity: 0, clipPath: 'circle(0% at 50% 50%)' }, { opacity: 1, clipPath: 'circle(75% at 50% 50%)', duration: 0.8 }, 1.0)
        .fromTo(q('.spA-ta .dots'), { opacity: 1 }, { opacity: 0, duration: 0.25, stagger: 0.06 }, 1.7)
        .fromTo(q('.spA-ta .txt'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 }, 1.8)
        .fromTo(q('.spA-ta .mk'), { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.45, stagger: 0.12, ease: 'back.out(2.2)' }, 2.5)
        .fromTo(q('.spA-ta.no .txt'), { textDecorationColor: 'rgba(255,170,140,0)' }, { textDecorationColor: 'rgba(255,170,140,.8)', duration: 0.3, stagger: 0.12 }, 2.6)
        .fromTo(q('.spA-pod.cur i'), { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 1.0)
    }
    if (state === 'review') {
      // до показа ответа: вопрос как был, справа листья ответивших команд — текст скрыт
      tl.fromTo(q('.spA-rq'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
        .fromTo(q('.spA-ta'), { opacity: 0, scaleX: 0.3 }, { opacity: 1, scaleX: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.3)', transformOrigin: '0% 50%' }, 0.3)
    }
  }, tm, [state])
  const fx = fixedN(state)
  const n = fx === null ? null : nOv ?? (fx === 0 ? 0 : nLive)

  {
    const rects: Rect[] = state === 'review' || state === 'reveal' || state === 'reveal7' ? [{ x: 80, y: 110, w: 1080, h: 820 }, { x: 1220, y: 150, w: 660, h: 780 }] : [{ x: 60, y: 110, w: 740, h: 940 }, { x: 1120, y: 110, w: 740, h: 940 }]
    const dn = n ?? 0, rooted = 237
    return (
      <S1Screen rects={state === 'intro' ? [{ x: 460, y: 300, w: 1000, h: 520 }] : rects} n={n} rootRef={root} cls="spA">
        {state === 'intro' ? <RoundIntro intro={SPRINT.intro} emblem={<Dandelion n={120} total={120} size={170} seeds={24} />} /> : <>
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden><defs>
            <linearGradient id="spLeafG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#174a35" /><stop offset=".55" stopColor="#0f3a2a" /><stop offset="1" stopColor="#0a2c20" /></linearGradient>
          </defs></svg>
          <div className="sp-head">{SPRINT.title}</div>
          {state !== 'review' && state !== 'reveal' && state !== 'reveal7' && <>
            {<div className="spA-timer sp-tm">
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
                {QS.slice(c * 4, c * 4 + 4).map(q => <QItem key={q.n} q={q} leaf />)}
              </div>
            ))}
          </>}
          {(state === 'review' || state === 'reveal' || state === 'reveal7') && (() => {
            const rq = QS[state === 'reveal7' ? 6 : 2], shown = state !== 'review', ans = SPRINT_TEAM_ANS[rq.n] ?? []
            return <>
              <div className="spA-qnum">вопрос <b>{rq.n}</b> / {QS.length}</div>
              <div className={`spA-rq${shown ? ' recall' : ''}`}><span className="sp-n">{rq.n}</span>{rq.text}</div>
              {!shown && rq.img && <img className="spA-rimg" src={rq.img.src} alt="" />}
              {shown && <div className="spA-fa">
                <span className="spA-fa-lbl">правильный ответ</span>
                <svg className="spA-bloom" viewBox="-120 -120 240 240" aria-hidden>
                  {Array.from({ length: 12 }, (_, j) => <ellipse key={j} cx="0" cy="-62" rx="20" ry="52" transform={`rotate(${j * 30})`} className={`p${j % 2}`} />)}
                  <circle r="30" className="core" />
                </svg>
                <span className="spA-fa-t">{rq.answer.split('').map((ch, i) => <span key={i} className="ch">{ch === ' ' ? '\u00a0' : ch}</span>)}</span>
              </div>}
              {shown && rq.img && <img className="spA-aimg" src={rq.img.src} alt="" />}
              <div className="spA-teams">
                <div className="spA-th">{shown ? 'Ответы команд' : <>Ответили: <b>{ans.length}</b></>}</div>
                {ans.map(a => (
                  <div key={a.team} className={`spA-ta ${a.ok ? 'ok' : 'no'}`}>
                    <svg className="spA-ta-leaf" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={LEAF} /></svg>
                    <span className="nm" style={{ color: a.color }}>{a.team}</span>
                    <span className="dots">• • •</span>
                    {shown && <span className="txt">{a.text}</span>}
                    {shown && <i className="mk" aria-label={a.ok ? 'верно' : 'неверно'}>{a.ok ? '✓' : '✗'}</i>}
                  </div>
                ))}
              </div>
              <div className="spA-pods">{QS.map((q, k) => <span key={q.n} className={`spA-pod${q.n === rq.n ? ' cur' : ''}${q.n < rq.n ? ' done' : ''}`} data-k={k}><i />{q.n}</span>)}</div>
            </>
          })()}
        </>}
      </S1Screen>
    )
  }
}
