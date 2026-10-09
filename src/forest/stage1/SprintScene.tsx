// ═══ «120 секунд» — Поляна с одуванчиком: сцена (утверждено, заморожено) ═══
// Механика (SprintBoard): все вопросы сразу на одном слайде → «читаем вопросы» (5 с) →
// таймер 120 с с музыкой → время вышло → разбор по одному вопросу (как ShowAnswers).
// Две колонки вопросов на листьях вдоль лиан, в центре — одуванчик-часы на своём стебле.
// Сцена только рисует то, что ей дали (пропсы): лаборатория подставляет тестовый вечер (stage1/Sprint.tsx),
// игра — настоящий раунд (forest/rounds/ForestSprint.tsx). Вписывание длинных текстов — замером, только если
// не влезает (на лабораторных данных ничего не меняется).
import { Fragment, useLayoutEffect, type ReactNode } from 'react'
import { Dandelion } from './timers'
import { RoundIntro, S1Screen, introTl } from './common'
import type { RoundIntroData } from './data'
import type { Rect, Mood } from './env'
import { sprintColumns, fitRow, type Size } from './layout'
import { shrinkToFit, useFontsReady } from './gameHooks'

export type SprintImg = { src: string; w: number; h: number }
export type SprintQ = { n: number; text: string; answer: string; img?: SprintImg }
/** Ответ команды в разборе: до показа — только имя и «• • •», после — текст; ok — вердикт (null — ещё нет / не проверить). */
export type TeamAns = { team: string; color: string; text: string; ok: boolean | null }
export type SprintReview = {
  q: SprintQ
  /** правильный ответ показан */
  shown: boolean
  /** вердикты уже можно показывать (в игре — когда ответ целиком на экране, как ShowAnswers) */
  verdicts: boolean
  /** null — игра на бумаге: колонки ответов команд нет */
  answers: TeamAns[] | null
  /** картинки вопроса (до показа) и ответа (после показа) */
  qImgs: SprintImg[]
  aImgs: SprintImg[]
  note?: string
}
export type SprintState = 'intro' | 'read' | 'active' | 'warning' | 'over' | 'review' | 'reveal' | 'reveal7'

/** Лист-подложка: основание у номера, острый кончик справа; растягивается под любую высоту вопроса. */
export const LEAF = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'

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

/** Анимации состояния (общие для лаборатории и игры). `board` — входить ли вопросам и одуванчику (в игре — только
 *  при появлении экрана, а не при переходе «читаем → время пошло»); `marks` — вердикты в разборе. */
export function sprintBuild(tl: gsap.core.Timeline, q: (s: string) => Element[], state: string, opt: { board?: boolean } = {}) {
  if (state === 'intro') return introTl(tl, q)
  const items = q('.sp-q')
  if ((state === 'read' || state === 'active') && opt.board !== false) {
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
    sprintMarksTl(tl, q, 2.5)
      .fromTo(q('.spA-pod.cur i'), { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 1.0)
  }
  if (state === 'review') {
    // до показа ответа: вопрос как был, справа листья ответивших команд — текст скрыт
    tl.fromTo(q('.spA-rq'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
      .fromTo(q('.spA-ta'), { opacity: 0, scaleX: 0.3 }, { opacity: 1, scaleX: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.3)', transformOrigin: '0% 50%' }, 0.3)
  }
}
/** Вердикты команд: галочка/крестик вскакивают по одному, неверный ответ зачёркивается. */
export function sprintMarksTl(tl: gsap.core.Timeline, q: (s: string) => Element[], at: number) {
  return tl.fromTo(q('.spA-ta .mk'), { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.45, stagger: 0.12, ease: 'back.out(2.2)' }, at)
    .fromTo(q('.spA-ta.no .txt'), { textDecorationColor: 'rgba(255,170,140,0)' }, { textDecorationColor: 'rgba(255,170,140,.8)', duration: 0.3, stagger: 0.12 }, at + 0.1)
}

const NBSP = String.fromCharCode(160)
const isReview = (s: string) => s === 'review' || s === 'reveal' || s === 'reveal7'

export function SprintScene({ state, n, rootRef, title, total, questions, intro, review, introEmblem, mood, extra }: {
  state: SprintState
  /** число на одуванчике / обратный отсчёт «читаем вопросы»; null — без таймера */
  n: number | null
  rootRef: React.RefObject<HTMLDivElement>
  title: string
  total: number
  questions: SprintQ[]
  intro?: RoundIntroData
  review?: SprintReview
  introEmblem?: ReactNode
  /** «настроение» леса вместо выводимого из таймера */
  mood?: Mood
  /** дополнительные элементы (звук ответа и т.п.) */
  extra?: ReactNode
}) {
  const fonts = useFontsReady()
  const { cols, rows } = sprintColumns(questions)
  const rv = isReview(state) ? review : undefined
  const qKey = questions.map(q => `${q.n}:${q.text}:${q.img?.src ?? ''}`).join('|')
  const rvKey = rv ? `${rv.q.n}|${rv.q.text}|${rv.q.answer}|${rv.shown}|${rv.verdicts}|${rv.note ?? ''}|${rv.answers?.map(a => a.team + a.text).join(',')}|${rv.qImgs.length}|${rv.aImgs.length}` : ''

  // Вписывание. Поле вопросов: кегль общий для всех, пока самый высокий вопрос не влезет в свою строку.
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || state === 'intro' || isReview(state)) return
    const colH = 934, gapR = 18, cellH = (colH - gapR * (rows - 1)) / rows
    const imgH = Math.min(136, Math.floor(cellH - 30))
    root.querySelectorAll<HTMLElement>('.spA .sp-img').forEach(e => { e.style.height = imgH < 136 ? `${imgH}px` : '' })
    const its = [...root.querySelectorAll<HTMLElement>('.spA-col .sp-q')]
    shrinkToFit([...root.querySelectorAll<HTMLElement>('.spA-col .sp-t')], () => its.every(e => e.offsetHeight <= cellH + 0.5), 22)
  }, [qKey, rows, state, fonts, rootRef])

  // Разбор: вопрос (до показа — крупно, после — «напоминание» сверху), ответ (по ширине, до двух строк),
  // пояснение, картинки — друг под другом; ответы команд — колонкой справа, при многих командах плотнее.
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !rv) return
    const $ = <T extends HTMLElement>(s: string) => root.querySelector<T>(s)
    const rq = $('.spA-rq')
    if (rq) {
      // до показа — до картинки (или до меток внизу), после — одна-две строки над ответом
      const maxB = rv.shown ? 228 : rv.qImgs.length ? 400 : 900
      shrinkToFit([rq], () => rq.offsetTop + rq.offsetHeight <= maxB, rv.shown ? 24 : 34)
    }
    const fa = $('.spA-fa-t')
    if (fa) shrinkToFit([fa], () => fa.offsetHeight <= 210 && fa.scrollWidth <= 1080, 44)
    let y = rv.shown ? 530 : 420
    const note = $('.spA-note')
    if (note) { note.style.top = ''; y = Math.max(y, note.offsetTop + note.offsetHeight + 24) }
    if (!rv.shown && rq) y = Math.max(y, rq.offsetTop + rq.offsetHeight + 30)
    // картинки: высота как в лаборатории (420 до показа / 320 после), но не ниже меток вопросов (низ — 900)
    const imgs = [...root.querySelectorAll<HTMLImageElement>(rv.shown ? '.spA-aimg' : '.spA-rimg')]
    const base = rv.shown ? { top: 540, h: 320 } : { top: 420, h: 420 }
    const top = Math.max(base.top, y), h = Math.max(120, Math.min(base.h, 900 - top))
    if (imgs.length === 1) {
      const im = imgs[0]
      im.style.top = top !== base.top ? `${top}px` : ''; im.style.height = h !== base.h ? `${h}px` : ''
    } else if (imgs.length > 1) {
      const src = rv.shown ? rv.aImgs : rv.qImgs
      const boxes = fitRow(src.map<Size>(m => ({ w: m.w, h: m.h })), top, h, rv.answers ? 630 : 960, 1060, 30)
      imgs.forEach((im, i) => { const b = boxes[i]; if (b) Object.assign(im.style, { left: `${b.x}px`, top: `${b.y}px`, height: `${b.h}px`, width: `${b.w}px` }) })
    }
    // ответы команд: обычные листья → плотнее → в две колонки, пока список не влезет до низа экрана
    const teams = $('.spA-teams')
    if (teams) {
      const steps = ['', 'tight', 'two', 'two tight']
      for (const s of steps) {
        teams.className = `spA-teams${s ? ' ' + s.split(' ').map(x => 'is-' + x).join(' ') : ''}`
        if (teams.offsetTop + teams.offsetHeight <= 1050) break
      }
    }
  }, [rvKey, state, fonts, rootRef])

  if (state === 'intro') {
    return (
      <S1Screen rects={[{ x: 460, y: 300, w: 1000, h: 520 }]} n={null} rootRef={rootRef} cls="spA" moodOverride={mood}>
        {intro && <RoundIntro intro={intro} emblem={introEmblem ?? <Dandelion n={120} total={120} size={170} seeds={24} />} />}
      </S1Screen>
    )
  }
  const rects: Rect[] = isReview(state) ? [{ x: 80, y: 110, w: 1080, h: 820 }, { x: 1220, y: 150, w: 660, h: 780 }] : [{ x: 60, y: 110, w: 740, h: 940 }, { x: 1120, y: 110, w: 740, h: 940 }]
  const dn = n ?? 0, rooted = 237
  return (
    <S1Screen rects={rects} n={n} rootRef={rootRef} cls={`spA${rv && !rv.answers ? " paper" : ""}`} moodOverride={mood}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden><defs>
        <linearGradient id="spLeafG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#174a35" /><stop offset=".55" stopColor="#0f3a2a" /><stop offset="1" stopColor="#0a2c20" /></linearGradient>
      </defs></svg>
      <div className="sp-head">{title}</div>
      {!isReview(state) && <>
        {<div className="spA-timer sp-tm">
          <Dandelion n={state === 'read' ? total : dn} total={total} size={330} seeds={24} rooted={rooted} hideNum={state === 'read'} />
          {state === 'read' && <>{n != null && <b className="spA-count">{n}</b>}<span className="spA-under">читаем вопросы</span></>}
          {state === 'over' && <div className="sp-over spA-under">Время вышло</div>}
        </div>}
        {cols.map((col, c) => (
          <div key={c} className={`spA-col c${c}`} style={rows !== 4 ? { gridTemplateRows: `repeat(${rows}, 1fr)` } : undefined}>
            <svg className="spA-vine" viewBox="0 0 64 1060" preserveAspectRatio="none" aria-hidden>
              <path className="spA-vine-s" d="M 30 0 C 44 120 18 240 32 360 S 20 600 31 720 S 40 900 31 1000" />
              {Array.from({ length: 9 }, (_, k) => { const y = 60 + k * 112, sd = k % 2 ? 1 : -1; return <path key={k} className="spA-vine-l" d={`M 31 ${y} c ${sd * 10} -10 ${sd * 26} -8 ${sd * 30} 4 c ${-sd * 10} 6 ${-sd * 22} 6 ${-sd * 30} -4 z`} /> })}
            </svg>
            {col.map(q => <QItem key={q.n} q={q} leaf />)}
          </div>
        ))}
      </>}
      {rv && (() => {
        const rq = rv.q, shown = rv.shown, ans = rv.answers
        const many = questions.length > 10
        return <>
          <div className="spA-qnum">вопрос <b>{rq.n}</b> / {questions.length}</div>
          <div className={`spA-rq${shown ? ' recall' : ''}`}><span className="sp-n">{rq.n}</span>{rq.text}</div>
          {!shown && rv.qImgs.map((m, i) => <img key={i} className="spA-rimg" src={m.src} alt="" />)}
          {shown && <div className="spA-fa">
            <span className="spA-fa-lbl">правильный ответ</span>
            <svg className="spA-bloom" viewBox="-120 -120 240 240" aria-hidden>
              {Array.from({ length: 12 }, (_, j) => <ellipse key={j} cx="0" cy="-62" rx="20" ry="52" transform={`rotate(${j * 30})`} className={`p${j % 2}`} />)}
              <circle r="30" className="core" />
            </svg>
            <span className="spA-fa-t">{rq.answer.split(' ').map((w, wi, all) => (
              <Fragment key={wi}><span className="w">{w.split('').map((ch, i) => <span key={i} className="ch">{ch}</span>)}</span>{wi < all.length - 1 && <><span className="ch">{NBSP}</span><wbr /></>}</Fragment>
            ))}</span>
          </div>}
          {shown && rv.note && <div className="spA-note">{rv.note}</div>}
          {shown && rv.aImgs.map((m, i) => <img key={i} className="spA-aimg" src={m.src} alt="" />)}
          {ans && <div className="spA-teams">
            <div className="spA-th">{shown ? 'Ответы команд' : <>Ответили: <b>{ans.length}</b></>}</div>
            {shown && ans.length === 0 && <div className="spA-none">нет ответов</div>}
            {ans.map((a, i) => {
              const v = rv.verdicts ? a.ok : null
              return (
                <div key={a.team + i} className={`spA-ta${v === true ? ' ok' : v === false ? ' no' : ''}`}>
                  <svg className="spA-ta-leaf" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={LEAF} /></svg>
                  <span className="nm" style={{ color: a.color }}>{a.team}</span>
                  <span className="dots">• • •</span>
                  {shown && <span className="txt">{a.text}</span>}
                  {shown && v != null && <i className="mk" aria-label={v ? 'верно' : 'неверно'}>{v ? '✓' : '✗'}</i>}
                </div>
              )
            })}
          </div>}
          <div className={`spA-pods${many ? ' many' : ''}${ans ? '' : ' wide'}`}>{questions.map((q, k) => <span key={q.n} className={`spA-pod${q.n === rq.n ? ' cur' : ''}${q.n < rq.n ? ' done' : ''}`} data-k={k}><i />{q.n}</span>)}</div>
        </>
      })()}
      {extra}
    </S1Screen>
  )
}
