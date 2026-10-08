// ═══ Этап 3 · «Скрэмбл» — три концепта ═══
// Механика (AnagramRound.tsx + lib/anagram.ts): определение (текст вопроса) сверху, буквы фразы
// перемешаны на плитках, под ними — пустые клетки слов. Пока идёт таймер, подсказки открываются по
// одной каждые N секунд (первая буква не подсказывается никогда, минимум две остаются закрытыми):
// плитка подсказки сама перелетает в свою клетку. На показе ответа перелетают все плитки, ниже —
// кто угадал. Перемешивание, порядок подсказок — те же функции, что в игре.
// A «Семена» — буквы на семенах одуванчика парят над поляной, клетки — чашечки цветов в траве.
// B «Корни под землёй» — разрез земли: буквы на узлах спутанных корней, ответ — прямой стержневой корень.
// C «Грибной круг» — буквы на рунных камнях по кругу ведьминого кольца, ответ — тропа из камней внутри.
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { SCR, SCR_HINTS, TEAM3 } from './data'
import { head, Timer, timer3 } from './common3'

export const SCR_STATES = [
  { id: 'question', name: 'Вопрос: буквы перемешаны, идёт время' },
  { id: 'hints', name: 'Подсказки: две буквы уже на месте, последние секунды' },
  { id: 'reveal', name: 'Показ ответа: все буквы встают на место' },
]
export const SCR_VARIANTS = [
  { id: 'A', name: 'A · Семена над поляной', note: 'Буквы — на семенах одуванчика, которые неподвижно висят в воздухе над поляной. Клетки ответа — раскрытые чашечки цветов в траве. Подсказка: одно семя медленно планирует в свою чашечку. Ответ: все семена опускаются по очереди, чашечки распускаются цветами, слово светится по стеблю.' },
  { id: 'B', name: 'B · Корни под землёй', note: 'Экран разрезан по линии земли: сверху лес и определение, снизу — земля в разрезе. Буквы — деревянные узлы на спутанных корнях. Ответ — прямой стержневой корень с гнёздами. Подсказка: узел скользит по корню вниз и встаёт в гнездо. Ответ: корни распутываются, все узлы садятся в стержень, по нему бежит свет.' },
  { id: 'C', name: 'C · Грибной круг', note: 'Ведьмино кольцо: буквы — на рунных камнях по кругу между светящимися грибами, внутри круга — тропа из плоских камней (два слова — две строки). Подсказка: камень поднимается и перелетает на тропу. Ответ: все камни взлетают по очереди, руны на тропе загораются золотом, грибы вспыхивают.' },
]

type P = { x: number; y: number }
const L = SCR.letters, ORD = SCR.order, N = L.length
const words = SCR.template.words
/** клетки ответа: координаты центра клетки каждой буквы (индекс буквы в letters) */
function slots(rowsOf: (wi: number) => { y: number }, cell: number, gap: number, wgap: number, cx: number, oneRow: boolean): P[] {
  const out: P[] = []
  if (oneRow) {
    const total = words.reduce((a, w) => a + w.length * (cell + gap) - gap, 0) + wgap * (words.length - 1)
    let x = cx - total / 2 + cell / 2
    words.forEach((w, wi) => { w.forEach(c => { if (c.kind === 'letter') out[c.idx] = { x, y: rowsOf(wi).y }; x += cell + gap }); x += wgap - gap })
  } else {
    words.forEach((w, wi) => { const tw = w.length * (cell + gap) - gap; let x = cx - tw / 2 + cell / 2; w.forEach(c => { if (c.kind === 'letter') out[c.idx] = { x, y: rowsOf(wi).y }; x += cell + gap }) })
  }
  return out
}
const jit = (p: number, k: number) => Math.sin(p * 12.9898 + k * 78.233) * 0.5 // детерминированный «разброс» без случайности
type Lay = { slot: P[]; home: P[]; cell: number; tile: number }
function layout(v: string): Lay {
  if (v === 'A') return { cell: 78, tile: 96, slot: slots(() => ({ y: 862 }), 78, 10, 56, 1040, true), home: ORD.map((_, p) => ({ x: 380 + (p % 8) * 175 + jit(p, 1) * 70, y: (p < 8 ? 360 : 570) + jit(p, 2) * 60 })) }
  if (v === 'B') return { cell: 76, tile: 88, slot: slots(() => ({ y: 912 }), 76, 10, 50, 1040, true), home: ORD.map((_, p) => ({ x: 400 + (p % 8) * 172 + jit(p, 3) * 60, y: (p < 8 ? 600 : 735) + jit(p, 4) * 34 })) }
  const R = 380
  return { cell: 64, tile: 84, slot: slots(wi => ({ y: wi === 0 ? 556 : 650 }), 64, 8, 0, 1040, false), home: ORD.map((_, p) => { const a = ((-90 + p * (360 / N)) * Math.PI) / 180; return { x: 1040 + Math.cos(a) * R, y: 600 + Math.sin(a) * R } }) }
}

export function Scramble({ variant, state, nOv, onReady }: S1Props) {
  const Ly = layout(variant)
  const hintsOn = state === 'hints' ? SCR_HINTS : state === 'reveal' ? SCR_HINTS : []
  const preLanded = new Set(state === 'hints' ? [SCR_HINTS[0]] : state === 'reveal' ? SCR_HINTS : [])
  const flying = state === 'hints' ? [SCR_HINTS[1]] : state === 'reveal' ? L.map((_, i) => i).filter(i => !preLanded.has(i)) : []
  const tm = timer3(state, SCR.timer)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (state === 'question') {
      // вход: сцена собирается — у каждого концепта своим способом; во время решения ничего не движется
      if (variant === 'A') tl.fromTo(q('.scA-cup'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.03, ease: 'back.out(2)', transformOrigin: '50% 100%' }, 0.2)
        .fromTo(q('.s3-tile'), { y: 260, opacity: 0, rotation: -30 }, { y: 0, opacity: 1, rotation: 0, duration: 1.2, stagger: { each: 0.05, from: 'random' }, ease: 'power2.out' }, 0.3)
      if (variant === 'B') tl.fromTo(q('.scB-soil'), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power2.out' }, 0)
        .fromTo(q('.scB-root'), { strokeDashoffset: 2400 }, { strokeDashoffset: 0, duration: 1.4, stagger: 0.08, ease: 'power2.out' }, 0.3)
        .fromTo(q('.s3-tile'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'back.out(2)' }, 0.9)
        .fromTo(q('.scB-tap'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.out', transformOrigin: '0% 50%' }, 0.6)
      if (variant === 'C') tl.fromTo(q('.scC-mush'), { scale: 0 }, { scale: 1, duration: 0.4, stagger: 0.03, ease: 'back.out(2.4)', transformOrigin: '50% 100%' }, 0.1)
        .fromTo(q('.s3-tile'), { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'bounce.out' }, 0.4)
        .fromTo(q('.scC-step'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03 }, 1.0)
      tl.fromTo(q('.s3-cell'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.02 }, 0.5)
        .fromTo(q('.s3-clue .w'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(1.5)' }, 0.2)
    }
    // перелёты: у каждого концепта своя траектория
    const fly = (i: number, at: number) => {
      const p = ORD.indexOf(i), el = q(`.s3-tile[data-p="${p}"]`)[0]; if (!el) return
      const h = Ly.home[p], s = Ly.slot[i], dx = s.x - h.x, dy = s.y - h.y, k = Ly.cell / Ly.tile
      if (variant === 'A') tl.fromTo(el, { x: 0, y: 0, rotation: 0, scale: 1 }, { keyframes: [{ x: dx * 0.35 + 30, y: dy * 0.45, rotation: 18, duration: 0.55, ease: 'sine.inOut' }, { x: dx * 0.7 - 20, y: dy * 0.8, rotation: -12, duration: 0.5, ease: 'sine.inOut' }, { x: dx, y: dy, rotation: 0, scale: k, duration: 0.45, ease: 'power2.out' }] }, at)
      if (variant === 'B') tl.fromTo(el, { x: 0, y: 0, scale: 1 }, { keyframes: [{ y: dy * 0.55, duration: 0.35, ease: 'power1.in' }, { x: dx, duration: 0.6, ease: 'power2.inOut' }, { y: dy, scale: k, duration: 0.3, ease: 'back.out(2)' }] }, at)
      if (variant === 'C') tl.fromTo(el, { x: 0, y: 0, scale: 1 }, { keyframes: [{ y: -50, scale: 1.15, duration: 0.3, ease: 'power2.out' }, { x: dx, y: dy - 70, duration: 0.6, ease: 'power1.inOut' }, { y: dy, scale: k, duration: 0.35, ease: 'bounce.out' }] }, at)
      tl.fromTo(q(`.s3-cell[data-i="${i}"]`), { '--lit': 0 }, { '--lit': 1, duration: 0.3 }, at + 1.2)
    }
    if (state === 'hints') fly(SCR_HINTS[1], 1.0)
    if (state === 'reveal') {
      flying.forEach((i, k) => fly(i, 0.3 + k * 0.16))
      const end = 0.3 + flying.length * 0.16 + 1.4
      if (variant === 'A') tl.fromTo(q('.scA-petal'), { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.03, ease: 'back.out(2)' }, end)
      if (variant === 'B') tl.fromTo(q('.scB-light'), { strokeDashoffset: 1600 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power1.inOut' }, end - 0.2)
        .to(q('.scB-root'), { opacity: 0.25, duration: 0.8 }, end - 0.4)
      if (variant === 'C') tl.fromTo(q('.scC-mush'), { '--glow': 0 }, { '--glow': 1, duration: 0.4, stagger: { each: 0.03, from: 'center' } }, end)
      tl.fromTo(q('.s3-result > *'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, end + 0.4)
    }
  }, tm, [variant, state])
  const n = nOv ?? (tm ? nLive : state === 'reveal' ? null : null)
  const rects: Rect[] = variant === 'C' ? [{ x: 620, y: 180, w: 840, h: 840 }, { x: 540, y: 50, w: 1000, h: 130 }] : variant === 'B' ? [{ x: 380, y: 120, w: 1320, h: 160 }] : [{ x: 300, y: 100, w: 1480, h: 900 }]
  const landedAt = (i: number) => preLanded.has(i)
  const isHint = (i: number) => hintsOn.includes(i)
  return (
    <S1Screen rects={rects} n={n} rootRef={root} cls={`s3 sc sc${variant} st-${state}`}>
      {head(SCR.title, SCR.qn, SCR.qcount)}
      {variant === 'B' && <BackB />}
      {variant === 'C' && <RingC />}
      <div className={`s3-clue sc-clue${variant}`}>{SCR.clue.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}</div>
      {variant === 'B' && <TapRoot slot={Ly.slot} cell={Ly.cell} />}
      {L.map((_, i) => {
        const s = Ly.slot[i]
        return <div key={i} className={`s3-cell sc-cell${variant}${state === 'reveal' ? ' won' : ''}`} data-i={i} style={{ left: s.x - Ly.cell / 2, top: s.y - Ly.cell / 2, width: Ly.cell, height: Ly.cell }}>
          {variant === 'A' && <CupA />}
          {variant === 'A' && state === 'reveal' && <PetalsA />}
        </div>
      })}
      {ORD.map((li, p) => {
        const h = landedAt(li) ? Ly.slot[li] : Ly.home[p]
        const sz = landedAt(li) ? Ly.cell : Ly.tile
        return <div key={p} className={`s3-tile sc-tile${variant}${isHint(li) ? ' hint' : ''}${landedAt(li) ? ' landed' : ''}`} data-p={p} style={{ left: h.x - sz / 2, top: h.y - sz / 2, width: sz, height: sz }}>
          {variant === 'A' && <svg className="scA-fluff" viewBox="-50 -90 100 100" aria-hidden>{Array.from({ length: 11 }, (_, k) => { const a = (-160 + k * 14) * Math.PI / 180; return <line key={k} x1="0" y1="-30" x2={Math.cos(a) * 46} y2={-30 + Math.sin(a) * 46} /> })}<line x1="0" y1="-30" x2="0" y2="-8" /></svg>}
          <b>{L[li]}</b>
        </div>
      })}
      {state === 'reveal' && <div className={`s3-result sc-res${variant}`}><span>угадали</span>{SCR.guessed.map(k => <em key={k} style={{ color: TEAM3[k].color, borderColor: TEAM3[k].color }}>{TEAM3[k].name}</em>)}</div>}
      {variant === 'B' ? <Timer n={n} total={SCR.timer} x={170} base={482} size={150} rooted={40} /> : <Timer n={n} total={SCR.timer} x={165} base={1010} size={170} />}
    </S1Screen>
  )
}

function CupA() {
  return <svg className="scA-cup" viewBox="-50 -10 100 110" aria-hidden>
    <path className="stem" d="M 0 60 C 4 80 -4 92 0 110" />
    <path className="sep" d="M -46 6 C -40 40 -20 58 0 60 C 20 58 40 40 46 6 C 30 22 14 26 0 26 C -14 26 -30 22 -46 6 Z" />
    <path className="sep2" d="M -46 6 C -34 14 -24 2 -14 14 C -6 2 6 2 14 14 C 24 2 34 14 46 6" />
  </svg>
}
function PetalsA() {
  return <svg className="scA-bloom" viewBox="-70 -70 140 140" aria-hidden>{Array.from({ length: 8 }, (_, k) => <ellipse key={k} className="scA-petal" cx="0" cy="-46" rx="13" ry="24" transform={`rotate(${k * 45})`} />)}</svg>
}
function BackB() {
  // разрез земли: неровный край, слои, спутанные корни (рисунок — детерминированный)
  const roots = Array.from({ length: 7 }, (_, k) => {
    const y0 = 520 + k * 34, a = (k % 2 ? 1 : -1)
    return `M ${120 + k * 40} 480 C ${400 + a * 120} ${y0 + 60} ${700 - a * 140} ${y0 - 40} ${960 + a * 60} ${y0 + 80} S ${1500 - a * 80} ${y0 - 30} ${1820 - k * 30} ${y0 + 120}`
  })
  return <>
    <svg className="scB-soil" viewBox="0 0 1920 1080" aria-hidden>
      <defs><linearGradient id="scSoil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a1c12" stopOpacity=".92" /><stop offset=".4" stopColor="#1e140c" stopOpacity=".95" /><stop offset="1" stopColor="#120c07" stopOpacity=".98" /></linearGradient></defs>
      <path d="M 0 486 C 160 470 300 494 480 480 S 820 470 1000 486 S 1400 474 1600 484 S 1820 476 1920 482 L 1920 1080 L 0 1080 Z" fill="url(#scSoil)" />
      <path className="grass" d="M 0 486 C 160 470 300 494 480 480 S 820 470 1000 486 S 1400 474 1600 484 S 1820 476 1920 482" />
      {[620, 790, 1000].map(y => <path key={y} className="strata" d={`M 0 ${y} C 400 ${y - 14} 900 ${y + 18} 1920 ${y - 6}`} />)}
      {Array.from({ length: 40 }, (_, k) => <circle key={k} className="pebble" cx={(k * 487) % 1900 + 10} cy={520 + ((k * 263) % 540)} r={3 + (k % 4)} />)}
      {roots.map((d, k) => <path key={k} className="scB-root" d={d} />)}
    </svg>
  </>
}
function TapRoot({ slot, cell }: { slot: P[]; cell: number }) {
  const xs = slot.map(s => s.x), x0 = Math.min(...xs) - cell, x1 = Math.max(...xs) + cell, y = slot[0].y
  return <svg className="scB-tapsvg" viewBox="0 0 1920 1080" aria-hidden>
    <path className="scB-tap" d={`M ${x0} ${y} L ${x1} ${y}`} />
    <path className="scB-light" d={`M ${x0} ${y} L ${x1} ${y}`} />
    <path className="scB-tapdrop" d={`M ${(x0 + x1) / 2} 480 C ${(x0 + x1) / 2 + 30} 640 ${(x0 + x1) / 2 - 20} 780 ${(x0 + x1) / 2} ${y}`} />
  </svg>
}
function RingC() {
  return <svg className="scC-ring" viewBox="0 0 1920 1080" aria-hidden>
    <ellipse className="moss" cx="1040" cy="600" rx="430" ry="430" />
    <ellipse className="inner" cx="1040" cy="600" rx="330" ry="330" />
    {Array.from({ length: N }, (_, k) => { const a = ((-90 + (k + 0.5) * (360 / N)) * Math.PI) / 180, x = 1040 + Math.cos(a) * 392, y = 600 + Math.sin(a) * 392
      return <g key={k} className="scC-mush" transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}><path className="st" d="M -4 18 L -3 0 L 3 0 L 4 18 Z" /><path className="cap" d="M -15 2 C -14 -14 14 -14 15 2 Z" /><circle className="dot" cx="-5" cy="-5" r="2" /></g> })}
    {[556, 650].map((y, r) => <rect key={r} className="scC-step" x={1040 - (r ? 345 : 270)} y={y - 40} width={r ? 690 : 540} height="80" rx="40" />)}
  </svg>
}
