// ═══ Этап 3 · «Порядок» — три концепта ═══
// Механика (answer.mode 'order'): варианты с буквами (choices), команды присылают последовательность
// букв («БВГА»); показ ответа — элементы в правильном порядке с позицией 1…N.
// A «Лоза-путь» — внизу лоза от семени («раньше») к цветку («позже») с четырьмя бутонами-местами;
//   варианты висят листьями сверху; на ответе листья по очереди спускаются на свои бутоны.
// B «Стадии роста» — четыре места = семя → росток → деревце → дерево: порядок читается без цифр;
//   на ответе каждый вариант встаёт над своей стадией, растение под ним вырастает.
// C «Ступени-спилы» — лестница из пней поднимается слева направо; варианты висят на ветке;
//   на ответе они падают на ступени снизу вверх, по ступеням поднимается свет.
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { ORDER } from './data'
import { head, Timer, timer3 } from './common3'

export const ORDER_STATES = [
  { id: 'question', name: 'Вопрос: варианты вразнобой, идёт время' },
  { id: 'reveal', name: 'Показ ответа: правильный порядок' },
]
export const ORDER_VARIANTS = [
  { id: 'A', name: 'A · Лоза-путь', note: 'Внизу от края до края тянется лоза: слева — семя и подпись «раньше», справа — распустившийся цветок и «позже». На ней четыре бутона с номерами мест. Варианты — листья с буквой и названием, висят сверху по алфавиту. На ответе листья по очереди опускаются на свои бутоны, по лозе бежит свет от семени к цветку — направление видно сразу.' },
  { id: 'B', name: 'B · Стадии роста', note: 'Четыре места — это четыре стадии одного растения: семя, росток, деревце, дерево. Порядок понятен без цифр (номер места всё равно подписан). Варианты сначала лежат в ряд по алфавиту на камнях; на ответе каждый поднимается и встаёт над своей стадией, а растение под ним дорастает.' },
  { id: 'C', name: 'C · Ступени-спилы', note: 'Лестница из четырёх пней поднимается слева направо — «раньше» внизу, «позже» наверху. Варианты висят на ветке под кроной. На ответе они по одному падают на ступени снизу вверх, на срезе пня проступает номер, свет поднимается по лестнице.' },
]

type P = { x: number; y: number }
const KEYS = ORDER.choices.map(c => c.key)
const POS = (key: string) => ORDER.correct_order.indexOf(key) // место варианта (0…3)
const CARD = { w: 360, h: 132 }
function layout(v: string): { home: P[]; slot: P[] } {
  // home[i] — где вариант i (по алфавиту) стоит во время вопроса; slot[j] — центр места j
  if (v === 'A') return { home: [480, 860, 1240, 1620].map((x, i) => ({ x, y: 330 + (i % 2) * 36 })), slot: [480, 860, 1240, 1620].map(x => ({ x, y: 760 })) }
  if (v === 'B') return { home: [480, 860, 1240, 1620].map(x => ({ x, y: 268 })), slot: [480, 860, 1240, 1620].map(x => ({ x, y: 548 })) }
  return { home: [520, 900, 1280, 1660].map((x, i) => ({ x, y: 318 + (i % 2) * 26 })), slot: [[520, 820], [900, 720], [1280, 620], [1660, 520]].map(([x, y]) => ({ x, y })) }
}
const leaf = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'

export function Order({ variant, state, nOv, onReady }: S1Props) {
  const Ly = layout(variant), rev = state === 'reveal'
  const tm = timer3(state, ORDER.timer)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    tl.fromTo(q('.s3-q .w'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.04 }, 0.1)
    if (state === 'question') {
      if (variant === 'A') tl.fromTo(q('.orA-vine'), { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, 0.1)
        .fromTo(q('.orA-bud'), { scale: 0 }, { scale: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 0.5)
      if (variant === 'B') tl.fromTo(q('.orB-stage'), { '--g': 0 }, { '--g': 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.6)' }, 0.2)
      if (variant === 'C') tl.fromTo(q('.orC-step'), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' }, 0.1)
        .fromTo(q('.orC-branch'), { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 1.0 }, 0.2)
      tl.fromTo(q('.or-card'), { opacity: 0, y: -30, rotation: -4 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' }, 0.8)
    }
    if (rev) {
      ORDER.correct_order.split('').forEach((key, j) => {
        const i = KEYS.indexOf(key), el = q(`.or-card[data-i="${i}"]`)[0], h = Ly.home[i], s = Ly.slot[j], at = 0.4 + j * 0.8
        if (!el) return
        if (variant === 'A') tl.fromTo(el, { x: 0, y: 0, rotation: i % 2 ? 3 : -3 }, { keyframes: [{ x: (s.x - h.x) * 0.5 + 20, y: (s.y - h.y) * 0.5, rotation: 8, duration: 0.45, ease: 'sine.inOut' }, { x: s.x - h.x, y: s.y - h.y, rotation: 0, duration: 0.45, ease: 'power2.out' }] }, at)
        if (variant === 'B') tl.fromTo(el, { x: 0, y: 0 }, { keyframes: [{ y: -40, duration: 0.25 }, { x: s.x - h.x, duration: 0.45, ease: 'power2.inOut' }, { y: s.y - h.y, duration: 0.35, ease: 'back.out(1.8)' }] }, at)
          .fromTo(q(`.orB-stage[data-j="${j}"]`), { '--g': 0.6 }, { '--g': 1, duration: 0.5, ease: 'back.out(2)' }, at + 0.8)
        if (variant === 'C') tl.fromTo(el, { x: 0, y: 0, rotation: i % 2 ? 4 : -4 }, { x: s.x - h.x, y: s.y - h.y, rotation: 0, duration: 0.7, ease: 'bounce.out' }, at)
        tl.fromTo(q(`.or-place[data-j="${j}"]`), { '--lit': 0 }, { '--lit': 1, duration: 0.3 }, at + 0.8)
      })
      if (variant === 'A') tl.fromTo(q('.orA-light'), { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 3.2, ease: 'none' }, 0.4)
      if (variant === 'C') tl.fromTo(q('.orC-glow'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.8 }, 1.1)
    }
  }, tm, [variant, state])
  const n = nOv ?? (tm ? nLive : null)
  const rects: Rect[] = [...Ly.home, ...Ly.slot].map(p => ({ x: p.x - CARD.w / 2, y: p.y - CARD.h / 2, w: CARD.w, h: CARD.h })).concat([{ x: 360, y: 40, w: 1200, h: 90 }])
  const vineD = 'M 200 800 C 360 740 380 820 480 790 S 700 760 860 790 S 1100 820 1240 790 S 1500 760 1620 790 S 1760 800 1830 770'
  return (
    <S1Screen rects={rects} n={n} rootRef={root} cls={`s3 or or${variant} st-${state}`}>
      {head(ORDER.title, ORDER.qn, ORDER.qcount)}
      <div className="s3-q or-q">{ORDER.text.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}</div>
      {variant === 'A' && <svg className="orA-back" viewBox="0 0 1920 1080" aria-hidden>
        <path className="orA-vine" d={vineD} /><path className="orA-light" d={vineD} />
        <g className="orA-seed" transform="translate(200 800)"><ellipse rx="22" ry="15" /><path d="M -6 -12 C -2 -26 8 -30 14 -28" /></g>
        <g className="orA-flower" transform="translate(1830 770)">{Array.from({ length: 7 }, (_, k) => <ellipse key={k} cx="0" cy="-22" rx="11" ry="22" transform={`rotate(${k * 51.4})`} />)}<circle r="10" /></g>
        <text className="orA-end" x="200" y="870" textAnchor="middle">раньше</text><text className="orA-end" x="1830" y="840" textAnchor="middle">позже</text>
      </svg>}
      {variant === 'B' && <svg className="orB-back" viewBox="0 0 1920 1080" aria-hidden>
        <path className="orB-ground" d="M 0 905 C 400 895 900 915 1920 900 L 1920 1080 L 0 1080 Z" />
        {Ly.slot.map((s, j) => <g key={j} transform={`translate(${s.x} 905)`}><g className="orB-stage" data-j={j}><Plant stage={j} /></g></g>)}
        <path className="orB-arrow" d="M 380 1000 L 1720 1000" /><path className="orB-arrowhead" d="M 1700 988 L 1724 1000 L 1700 1012" />
      </svg>}
      {variant === 'C' && <svg className="orC-back" viewBox="0 0 1920 1080" aria-hidden>
        <path className="orC-branch" d="M 230 226 C 700 206 1300 240 1860 214" />
        {KEYS.map((_, i) => { const h = Ly.home[i]; return <path key={i} className="orC-cord" d={`M ${h.x} ${222 + Math.sin(i) * 8} L ${h.x} ${h.y - CARD.h / 2}`} /> })}
        {Ly.slot.map((s, j) => <g key={j} transform={`translate(${s.x} ${s.y + CARD.h / 2})`}><g className="orC-step">
          <path className="side" d={`M -170 0 L -160 ${1080 - s.y} L 160 ${1080 - s.y} L 170 0 Z`} />
          <ellipse className="top" cx="0" cy="0" rx="170" ry="34" />{[120, 84, 50].map(r => <ellipse key={r} className="ring" cx="0" cy="0" rx={r} ry={r * 0.2} />)}
          <ellipse className="orC-glow" cx="0" cy="0" rx="190" ry="44" />
        </g></g>)}
      </svg>}
      {Ly.slot.map((s, j) => <b key={j} className={`or-place or-place${variant}`} data-j={j} style={{ left: s.x, top: variant === 'C' ? s.y + CARD.h / 2 + 4 : variant === 'B' ? 930 : s.y + CARD.h / 2 + 30 }}>{j + 1}</b>)}
      {variant === 'A' && Ly.slot.map((s, j) => <i key={j} className="orA-bud" style={{ left: s.x, top: 790 }} />)}
      {ORDER.choices.map((c, i) => {
        const h = Ly.home[i]
        return <div key={c.key} className={`or-card or-card${variant}${rev ? ' placed' : ''}`} data-i={i} style={{ left: h.x - CARD.w / 2, top: h.y - CARD.h / 2, width: CARD.w, height: CARD.h }}>
          <svg className="or-cardbg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={leaf} /></svg>
          <span className="key">{c.key}</span><span className="txt">{c.text}</span>
          {rev && <em className="or-pos">{POS(c.key) + 1}</em>}
        </div>
      })}
      {variant === 'A' && <Timer n={n} total={ORDER.timer} x={1800} base={250} size={120} rooted={30} />}
      {variant === 'B' && <Timer n={n} total={ORDER.timer} x={140} base={905} size={150} rooted={60} />}
      {variant === 'C' && <Timer n={n} total={ORDER.timer} x={150} base={1012} size={160} />}
    </S1Screen>
  )
}

/** Стадия роста: 0 — семя в земле, 1 — росток, 2 — деревце, 3 — дерево. Земля — y=0. */
function Plant({ stage }: { stage: number }) {
  if (stage === 0) return <g className="pl"><ellipse className="seed" cx="0" cy="-8" rx="22" ry="14" /><path className="st" d="M 4 -18 C 8 -34 18 -40 26 -42" /></g>
  if (stage === 1) return <g className="pl"><path className="st" d="M 0 0 C -4 -40 6 -70 0 -110" /><path className="lf" d="M 0 -96 C -40 -120 -56 -100 -60 -86 C -36 -84 -16 -90 0 -96 Z" /><path className="lf" d="M 0 -106 C 34 -136 54 -120 60 -104 C 36 -100 16 -102 0 -106 Z" /></g>
  if (stage === 2) return <g className="pl"><path className="trunk" d="M -8 0 C -6 -80 -10 -150 -4 -210 L 6 -210 C 10 -150 6 -80 8 0 Z" />{[[-50, -230, 60], [40, -240, 62], [0, -290, 70], [-30, -180, 46], [36, -186, 46]].map(([x, y, r], k) => <circle key={k} className={`cr c${k % 3}`} cx={x} cy={y} r={r} />)}</g>
  return <g className="pl"><path className="trunk" d="M -16 0 C -12 -120 -18 -220 -8 -300 L 10 -300 C 18 -220 12 -120 16 0 Z" />{[[-90, -330, 80], [80, -340, 84], [0, -410, 96], [-60, -260, 62], [64, -266, 62], [0, -320, 80]].map(([x, y, r], k) => <circle key={k} className={`cr c${k % 3}`} cx={x} cy={y} r={r} />)}</g>
}
