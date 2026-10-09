// ═══ Этап 3 · «Сопоставление» — утверждённое направление «Слияние в живое растение» ═══
// Механика (answer.mode 'match'): слева нумерованные элементы (в паке — картинки вопроса по порядку 1, 2, 3…
// либо текст), справа варианты с буквами и подписями (right_labels); команды присылают пары «1Б 2В…».
// Показ ответа — все верные пары.
// Образ: картинки — крупным рядом наверху (чем больше картинка, тем лучше — это главная информация).
// Подписи-листья лежат ниже на «поляне» отдельной россыпью: порядок и высота не совпадают с порядком
// картинок, чтобы расположение не намекало на пару. Под каждой картинкой — крошечный бутон: сюда
// прирастёт её подпись. На показе по одной картинке: от бутона вниз прорастает стебель, лист-подпись
// взлетает по дуге и прирастает на его конец — картинка и подпись становятся одним растением.
// Связь читается без цвета: стебель + номер картинки на подписи + сводка «1 — Б» внизу.
// Рисунок и куски таймлайна общие: лаборатория (labs/forest/matchLab.tsx) — тестовые наборы, игра
// (forest/stage4/ReviewGame.tsx) — настоящий вопрос и ответы команд.
import { S1Screen } from '../stage1/common'
import type { Rect } from '../stage1/env'
import type { MItem } from './data'
import { head, Timer } from './common3'
import { TeamStrip, type TeamPhase, type TeamRow } from '../stage4/TeamStrip'
import type { StripLay } from '../stage4/teamLayout'

export type MatchData = {
  title: string; qn: number; qcount: number; text: string; timer: number
  items: MItem[]; right: string[]; right_labels: string[]; correct_pairs: string[]
}
const GAP = 60, TXT_W = 290, X_MID = 960, Y_IMG = 226
type Box = { x: number; y: number; w: number; h: number }
export const pairOf = (S: MatchData, l: string) => S.correct_pairs.find(p => p.startsWith(l))?.slice(l.length) ?? ''
/** для каждого элемента слева — индекс его подписи справа (−1 — пары нет) */
export const matchIdx = (S: MatchData) => S.items.map((_, k) => S.right.indexOf(pairOf(S, String(k + 1))))
/** высота листа-подписи (оценка по длине текста; кегль — как в CSS по lenCls) */
export function labelH(text: string, w: number, n: number): number {
  const fs = n > 4 ? 26 : text.length > 60 ? 25 : text.length > 40 ? 27 : 30
  const lines = Math.ceil((text.length * 0.5 * fs) / Math.max(80, w - (n > 4 ? 86 : 100)))
  return Math.max(n > 4 ? 100 : 120, Math.round(lines * fs * 1.14 + 26))
}
/** Раскладка. long — длинные подписи (у лаборатории — набор long); lift — сцена выше на столько (полоса команд выше
 *  лабораторной); stripTop — верх полосы ответов команд, если она есть уже на вопросе (игра): россыпь подписей над ней. */
export function matchLayout(S: MatchData, o: { long?: boolean; lift?: number; stripTop?: number } = {}) {
  const long = !!o.long, lift = o.lift ?? 0
  const n = S.items.length
  const ratios = S.items.map(it => (it.kind === 'img' ? it.w / it.h : 0))
  const nTxt = S.items.filter(i => i.kind === 'txt').length, tw = n > 4 ? 250 : TXT_W
  const sumR = ratios.reduce((a, b) => a + b, 0)
  const h = Math.round(Math.min((n > 4 ? 300 : 380) - lift, sumR ? (1800 - GAP * (n - 1) - tw * nTxt) / sumR : 380))
  const ws = S.items.map((it, i) => (it.kind === 'img' ? Math.round(ratios[i] * h) : tw))
  const total = ws.reduce((a, b) => a + b, 0) + GAP * (n - 1)
  let x = X_MID - total / 2
  const img: Box[] = ws.map(w => { const r = { x, y: Y_IMG, w, h }; x += w + GAP; return r })
  const minW = n > 4 ? 250 : long ? 400 : 330
  const fin: Box[] = img.map(r => { const w = Math.max(minW, Math.min(470, Math.round(r.w * 0.97))); return { x: r.x + r.w / 2 - w / 2, y: Y_IMG + h + 56, w, h: 0 } })
  // россыпь подписей на поляне: порядок букв, шахматно по высоте
  const m = S.right.length, span = 1450, step = span / Math.max(1, m)
  const bank = S.right.map((_, i) => ({ cx: 400 + step * (i + 0.5) + (i % 2 ? 14 : -14), y: (n > 4 ? (i % 2 ? 790 : 640) : i % 2 ? 936 : (long ? 796 : 806)) - lift }))
  // полоса команд уже на экране вопроса — россыпь поднимается так, чтобы нижний лист не заходил на неё
  if (o.stripTop != null) {
    const idx = matchIdx(S), wOf = (i: number) => { const k = idx.indexOf(i); return k >= 0 ? fin[k].w : minW }
    const low = Math.max(...bank.map((b, i) => b.y + labelH(S.right_labels[i] ?? '', wOf(i), n)))
    const up = Math.max(0, low - (o.stripTop - 52))
    const topMin = Y_IMG + h + 40
    bank.forEach(b => { b.y = Math.max(topMin, b.y - up) })
  }
  return { img, fin, bank, h, lift, minW }
}
export type MatchLayout = ReturnType<typeof matchLayout>
const lenCls = (t: string) => (t.length > 60 ? ' xl' : t.length > 40 ? ' lg' : '')

type Q = (s: string) => Element[]
export function matchWordsTl(tl: gsap.core.Timeline, q: Q) {
  tl.fromTo(q('.s3-q .w'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.04 }, 0.1)
}
/** вход вопроса: картинки, бутоны, подписи */
export function matchQuestionTl(tl: gsap.core.Timeline, q: Q) {
  tl.fromTo(q('.mt-img'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 0.3)
    .fromTo(q('.mtC-bud'), { scale: 0 }, { scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 0.8)
    .fromTo(q('.mt-lab'), { opacity: 0, y: 40, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)' }, 0.9)
}
/** показ: подписи по одной прирастают к картинкам; t0 — первая, step — шаг, pairsAt — сводка пар, stripAt — полоса команд (лаборатория) */
export function matchRevealTl(tl: gsap.core.Timeline, q: Q, S: MatchData, Ly: MatchLayout, t: { t0: number; step: number; pairsAt: number; stripAt: number | null }) {
  const IDX = matchIdx(S)
  S.items.forEach((_, k) => {
    const at = t.t0 + k * t.step, el = IDX[k] >= 0 ? q(`.mt-lab[data-k="${IDX[k]}"]`)[0] : undefined, from = Ly.bank[IDX[k]], to = Ly.fin[k]
    tl.fromTo(q(`.mtC-img[data-k="${k}"]`), { '--hl': 0 }, { '--hl': 1, duration: 0.3, yoyo: true, repeat: 1 }, at)
      .fromTo(q(`.mtC-stalk[data-k="${k}"]`), { strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, at + 0.1)
      .fromTo(q(`.mtC-leaf[data-k="${k}"]`), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.12 }, at + 0.35)
    if (el && from) tl.fromTo(el, { x: 0, y: 0, rotation: IDX[k] % 2 ? 3 : -3 }, { keyframes: [{ y: -60, rotation: 0, duration: 0.3, ease: 'power2.out' }, { x: to.x + to.w / 2 - from.cx, y: to.y - from.y, duration: 0.6, ease: 'power2.inOut' }] }, at + 0.35)
    tl.fromTo(q(`.mt-num[data-k="${k}"]`), { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2.2)' }, at + 1.0)
  })
  tl.fromTo(q('.mt-pairs > *'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 }, t.pairsAt)
  if (t.stripAt != null) tl.fromTo(q('.s4-sl'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 }, t.stripAt)
}

/** Сцена. rev — показ (подписи летят к картинкам таймлайном); done — итог (подписи уже на местах, без таймлайна);
 *  strip — полоса ответов команд (null — нет). */
export function MatchScene({ S, Ly, rev, done, n, rootRef, strip, cls = '' }: {
  S: MatchData; Ly: MatchLayout; rev: boolean; done: boolean; n: number | null
  rootRef: React.RefObject<HTMLDivElement>; cls?: string
  strip: { rows: TeamRow[]; top?: number; phase?: TeamPhase; judged?: boolean; lay?: StripLay; count?: string } | null
}) {
  const IDX = matchIdx(S), N = S.items.length, lift = Ly.lift
  const rects: Rect[] = [...Ly.img, { x: 300, y: (N > 4 ? 620 : 780) - lift, w: 1500, h: 280 }, { x: 360, y: 40, w: 1200, h: 90 }]
  return (
    <S1Screen rects={rects} n={n} rootRef={rootRef} cls={`s3 mt mtC st-${rev ? 'reveal' : 'question'}${done ? ' done' : ''} n${N}${cls}`}>
      {head(S.title, S.qn, S.qcount)}
      <div className="s3-q mt-q">{S.text.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}</div>
      <svg className="mtC-svg" viewBox="0 0 1920 1080" aria-hidden>
        <ellipse className="mtC-meadow" cx="1040" cy={(N > 4 ? 740 : 900) - lift} rx="900" ry="170" />
        {rev && S.items.map((_, k) => {
          const r = Ly.img[k], f = Ly.fin[k], cx = r.x + r.w / 2, y0 = r.y + r.h + 4, y1 = f.y + 2
          return <g key={k}>
            <path className="mtC-stalk" data-k={k} d={`M ${cx} ${y0} C ${cx - 10} ${y0 + 18} ${cx + 10} ${y1 - 18} ${cx} ${y1}`} />
            <g transform={`translate(${cx} ${(y0 + y1) / 2})`}><path className="mtC-leaf" data-k={k} d="M 0 0 C 16 -14 34 -12 40 -4 C 28 4 12 6 0 0 Z" /><path className="mtC-leaf" data-k={k} d="M 0 4 C -16 -8 -34 -6 -40 2 C -28 10 -12 12 0 4 Z" /></g>
          </g>
        })}
      </svg>
      {Ly.img.map((r, k) => {
        const it = S.items[k]
        return <div key={k} className={`mt-img mtC-img${it.kind === 'txt' ? ' txtcard' : ''}`} data-k={k} style={{ left: r.x, top: r.y, width: r.w, height: r.h }}>
          {it.kind === 'img' ? <img src={it.src} alt="" /> : <span className={`mtC-itxt${lenCls(it.text)}`}>{it.text}</span>}
          <b className="mt-imgno">{k + 1}</b>
          {!rev && <i className="mtC-bud" style={{ left: r.w / 2 - 14 }} />}
        </div>
      })}
      {S.right.map((key, i) => {
        const k = IDX.indexOf(i), w = k >= 0 ? Ly.fin[k].w : Ly.minW, P = done && k >= 0 ? Ly.fin[k] : { x: Ly.bank[i].cx - w / 2, y: Ly.bank[i].y }
        return (
          <div key={key} className={`mt-lab mtC-lab${lenCls(S.right_labels[i] ?? '')}`} data-k={i} style={{ left: P.x, top: P.y, width: w }}>
            <svg className="mt-labbg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z" /></svg>
            <span className="key">{key}</span><span className="txt">{S.right_labels[i] ?? ''}</span>
            {rev && k >= 0 && <b className="mt-num" data-k={k}>{k + 1}</b>}
          </div>
        )
      })}
      {strip && <TeamStrip {...strip} />}
      {rev && <div className="mt-pairs" style={lift ? { top: 884 - lift } : undefined}>{S.items.map((_, k) => <span key={k}><b>{k + 1}</b> — <b>{S.right[IDX[k]] ?? '—'}</b></span>)}</div>}
      <Timer n={n} total={S.timer} />
    </S1Screen>
  )
}
