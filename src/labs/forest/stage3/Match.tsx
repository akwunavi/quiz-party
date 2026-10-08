// ═══ Этап 3 · «Сопоставление» — три концепта ═══
// Механика (answer.mode 'match'): слева нумерованные элементы (в паке — картинки вопроса по порядку
// 1, 2, 3, 4), справа варианты с буквами и подписями (right_labels); команды присылают пары «1Б 2В…».
// Показ ответа — все верные пары. Здесь — картинки + подписи; каждая пара на разборе отмечена
// не только цветом: у подписи появляется номер её картинки.
// A «Лианы» — картинки на левом стволе, подписи — на листьях справа; на ответе лианы прорастают
//   от каждой картинки к её подписи через поляну между колонками (текст и фото не перекрывают).
// B «Корни» — картинки висят на ветви сверху, подписи — на камнях внизу; на ответе от каждой
//   картинки вниз прорастает корень и через землю находит свой камень.
// C «Слияние» — подписи лежат листьями на траве; на ответе каждый лист взлетает и прирастает
//   черешком под свою картинку: пара становится одним растением.
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { MATCH, pairOf } from './data'
import { head, Timer, timer3 } from './common3'

export const MATCH_STATES = [
  { id: 'question', name: 'Вопрос: пары не собраны, идёт время' },
  { id: 'reveal', name: 'Показ ответа: все верные пары' },
]
export const MATCH_VARIANTS = [
  { id: 'A', name: 'A · Лианы между колоннами', note: 'Слева — четыре картинки на стволе древнего дерева, справа — четыре подписи на больших листьях (буква + текст). Середина экрана пустая — это поляна. На ответе от каждой картинки к её подписи прорастает лиана с листьями, на подписи распускается бутон с номером картинки. Лианы идут только по поляне — ни текст, ни фото они не закрывают.' },
  { id: 'B', name: 'B · Корни сквозь землю', note: 'Картинки висят в ряд на ветви, под ними — линия земли, на земле — четыре камня с подписями. На ответе из-под каждой картинки вниз прорастает светящийся корень, проходит сквозь землю (корни могут перекрещиваться — это видно) и упирается в свой камень; на камне проступает номер картинки.' },
  { id: 'C', name: 'C · Слияние в растение', note: 'Картинки крупно сверху, подписи — листьями, разбросанными по траве в порядке букв. На ответе каждый лист поднимается, летит к своей картинке и прирастает к ней черешком: картинка и подпись становятся одним растением. Пары читаются без линий и без цвета — они физически рядом.' },
]

type R = { x: number; y: number; w: number; h: number }
const IDX = MATCH.left.map(l => MATCH.right.indexOf(pairOf(l))) // картинка k → индекс подписи
const imgRow = (h: number, gap: number, cx: number, y: number): R[] => {
  const ws = MATCH.imgs.map(im => Math.round(im.w * h / im.h)), total = ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1)
  let x = cx - total / 2
  return ws.map(w => { const r = { x, y, w, h }; x += w + gap; return r })
}
function layout(v: string) {
  if (v === 'A') {
    const ys = [290, 492, 694, 896], h = 176
    const img = MATCH.imgs.map((im, k) => { const w = Math.round(im.w * h / im.h); return { x: 520 - w, y: ys[k] - h / 2, w, h } })
    const lab = ys.map(y => ({ x: 1160, y: y - 76, w: 640, h: 152 }))
    return { img, lab }
  }
  if (v === 'B') {
    const img = imgRow(250, 90, 960, 214)
    const lab = [0, 1, 2, 3].map(i => ({ x: 140 + i * 420, y: 832, w: 380, h: 150 }))
    return { img, lab }
  }
  const img = imgRow(290, 100, 960, 168)
  const fin = img.map(r => ({ x: r.x + r.w / 2 - 180, y: 520, w: 360, h: 130 }))
  const start = [460, 850, 1240, 1630].map((x, i) => ({ x: x - 180, y: 790 + (i % 2) * 40, w: 360, h: 130 }))
  return { img, lab: start, fin }
}
const curve = (x0: number, y0: number, x1: number, y1: number, h: boolean) => h
  ? `M ${x0} ${y0} C ${x0 + (x1 - x0) * 0.45} ${y0} ${x0 + (x1 - x0) * 0.55} ${y1} ${x1} ${y1}`
  : `M ${x0} ${y0} C ${x0} ${y0 + (y1 - y0) * 0.55} ${x1} ${y0 + (y1 - y0) * 0.45} ${x1} ${y1}`
const bz = (x0: number, y0: number, x1: number, y1: number, t: number, h: boolean) => {
  const p = h ? [x0, y0, x0 + (x1 - x0) * 0.45, y0, x0 + (x1 - x0) * 0.55, y1, x1, y1] : [x0, y0, x0, y0 + (y1 - y0) * 0.55, x1, y0 + (y1 - y0) * 0.45, x1, y1]
  const u = 1 - t, f = (a: number, b: number, c: number, d: number) => u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d
  return { x: f(p[0], p[2], p[4], p[6]), y: f(p[1], p[3], p[5], p[7]) }
}

export function Match({ variant, state, nOv, onReady }: S1Props) {
  const Ly = layout(variant)
  const rev = state === 'reveal'
  const tm = timer3(state, MATCH.timer)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    tl.fromTo(q('.s3-q .w'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.04 }, 0.1)
    if (state === 'question') {
      if (variant === 'A') tl.fromTo(q('.mtA-trunk'), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.9 }, 0)
      if (variant === 'B') tl.fromTo(q('.mtB-branch'), { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, 0)
      tl.fromTo(q('.mt-img'), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 0.4)
        .fromTo(q('.mt-lab'), { opacity: 0, x: variant === 'A' ? 40 : 0, y: variant === 'A' ? 0 : 30, rotation: variant === 'C' ? -6 : 0 }, { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)' }, 0.7)
    }
    if (rev) {
      MATCH.left.forEach((_, k) => {
        const at = 0.4 + k * 0.9
        if (variant === 'A' || variant === 'B') {
          tl.fromTo(q(`.mt-vine[data-k="${k}"]`), { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, at)
            .fromTo(q(`.mt-vleaf[data-k="${k}"]`), { scale: 0 }, { scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(2)', transformOrigin: '50% 50%' }, at + 0.3)
        } else {
          const el = q(`.mt-lab[data-k="${IDX[k]}"]`)[0], from = Ly.lab[IDX[k]], to = Ly.fin![k]
          if (el) tl.fromTo(el, { x: 0, y: 0, rotation: (IDX[k] % 2 ? 4 : -4) }, { keyframes: [{ y: -60, rotation: 0, duration: 0.35, ease: 'power2.out' }, { x: to.x - from.x, y: to.y - from.y, duration: 0.7, ease: 'power2.inOut' }] }, at)
          tl.fromTo(q(`.mtC-stalk[data-k="${k}"]`), { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: 'power2.out', transformOrigin: '50% 0%' }, at + 0.9)
        }
        tl.fromTo(q(`.mt-num[data-k="${k}"]`), { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2.2)' }, at + 0.95)
          .fromTo(q(`.mt-img[data-k="${k}"]`), { '--hl': 0 }, { '--hl': 1, duration: 0.3, yoyo: true, repeat: 1 }, at)
      })
    }
  }, tm, [variant, state])
  const n = nOv ?? (tm ? nLive : null)
  const rects: Rect[] = [...Ly.img, ...(rev && variant === 'C' ? Ly.fin! : Ly.lab), { x: 360, y: 40, w: 1200, h: 90 }]
  return (
    <S1Screen rects={rects} n={n} rootRef={root} cls={`s3 mt mt${variant} st-${state}`}>
      {head(MATCH.title, MATCH.qn, MATCH.qcount)}
      <div className="s3-q mt-q">{MATCH.text.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}</div>
      {variant === 'A' && <svg className="mtA-trunk" viewBox="0 0 1920 1080" aria-hidden><path d="M 560 1080 C 548 800 572 500 552 160 L 588 160 C 604 500 584 800 602 1080 Z" />{Ly.img.map((r, k) => <path key={k} className="mtA-twig" d={`M 556 ${r.y + r.h / 2} C 545 ${r.y + r.h / 2 - 10} 536 ${r.y + r.h / 2} ${r.x + r.w + 4} ${r.y + r.h / 2}`} />)}</svg>}
      {variant === 'B' && <svg className="mtB-back" viewBox="0 0 1920 1080" aria-hidden>
        <path className="mtB-branch" d="M 120 172 C 600 152 1300 190 1820 164" />
        {Ly.img.map((r, k) => <path key={k} className="mtB-cord" d={`M ${r.x + r.w * 0.3} ${170 + Math.sin(k) * 6} L ${r.x + r.w * 0.3} ${r.y} M ${r.x + r.w * 0.7} ${172 + Math.sin(k + 1) * 6} L ${r.x + r.w * 0.7} ${r.y}`} />)}
        <path className="mtB-soil" d="M 0 560 C 300 548 700 572 1000 556 S 1600 548 1920 562 L 1920 1080 L 0 1080 Z" />
        <path className="mtB-grass" d="M 0 560 C 300 548 700 572 1000 556 S 1600 548 1920 562" />
      </svg>}
      {(variant === 'A' || variant === 'B') && rev && <svg className="mt-vines" viewBox="0 0 1920 1080" aria-hidden>
        {Ly.img.map((r, k) => {
          const L2 = Ly.lab[IDX[k]], h = variant === 'A'
          const x0 = h ? r.x + r.w + 18 : r.x + r.w / 2, y0 = h ? r.y + r.h / 2 : r.y + r.h + 10, x1 = h ? L2.x - 14 : L2.x + L2.w / 2, y1 = h ? L2.y + L2.h / 2 : L2.y - 8
          return <g key={k}>
            <path className={`mt-vine${h ? '' : ' root'}`} data-k={k} d={curve(x0, y0, x1, y1, h)} />
            {[0.18, 0.34, 0.5, 0.66, 0.82].map((t, j) => { const p = bz(x0, y0, x1, y1, t, h); return <ellipse key={j} className="mt-vleaf" data-k={k} cx={p.x} cy={p.y + (j % 2 ? 9 : -9)} rx="11" ry="5" transform={`rotate(${j % 2 ? 30 : -30} ${p.x} ${p.y})`} /> })}
          </g>
        })}
      </svg>}
      {variant === 'C' && Ly.img.map((r, k) => <i key={k} className="mtC-stalk" data-k={k} style={{ left: r.x + r.w / 2 - 4, top: r.y + r.h + 6 }} />)}
      {Ly.img.map((r, k) => (
        <div key={k} className="mt-img" data-k={k} style={{ left: r.x, top: r.y, width: r.w, height: r.h }}>
          <img src={MATCH.imgs[k].src} alt="" /><b className="mt-imgno">{MATCH.left[k]}</b>
        </div>
      ))}
      {MATCH.right.map((key, i) => {
        const k = IDX.indexOf(i), L2 = rev && variant === 'C' ? Ly.fin![k] : Ly.lab[i]
        return (
          <div key={key} className={`mt-lab mt-lab${variant}`} data-k={i} style={{ left: (variant === 'C' ? Ly.lab[i] : L2).x, top: (variant === 'C' ? Ly.lab[i] : L2).y, width: L2.w, height: L2.h }}>
            <svg className="mt-labbg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={variant === 'B' ? 'M 4 30 C 2 10 20 2 50 3 C 80 2 98 12 97 34 C 99 64 92 96 50 97 C 10 98 1 70 4 30 Z' : 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'} /></svg>
            <span className="key">{key}</span><span className="txt">{MATCH.right_labels[i]}</span>
            {rev && <b className="mt-num" data-k={k}>{MATCH.left[k]}</b>}
          </div>
        )
      })}
      {variant === 'A' && <Timer n={n} total={MATCH.timer} x={850} base={1040} size={150} rooted={80} />}
      {variant === 'B' && <Timer n={n} total={MATCH.timer} x={1800} base={562} size={130} rooted={30} />}
      {variant === 'C' && <Timer n={n} total={MATCH.timer} x={150} base={1012} size={160} />}
    </S1Screen>
  )
}
