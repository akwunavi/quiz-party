// ═══ CONCEPT 4 · «Самоткущий гобелен» ═══
// Бархатная комната и ткацкий стан во всю стену: сверху навой, снизу товарный
// вал, между ними — основа из тонких нитей. Закон мира: ВСЁ ТКЁТСЯ. Слово
// набирается ряд за рядом снизу вверх, как ткань; пары стягивает нить;
// предметы распускаются и заново ткутся на своих местах; экран сворачивается
// в рулон. Вечер копится: рулон готовой ткани внизу толще с каждым состоянием.
import type { CSSProperties } from 'react'
import type { Kit, StateId, TimerProps, WorldProps } from '../kit'

const cv = (o: Record<string, string | number>) => o as CSSProperties
const ORDER: StateId[] = ['lobby', 'randomizer', 'rules', 'cw', 'match', 'one', 'dense', 'text', 'timer', 'jp', 'melody', 'blitz', 'scramble', 'matchA', 'orderA', 'board', 'roundT', 'final']
const WEAVE_Y: Partial<Record<StateId, number>> = { match: 160, one: 330, dense: 170, text: 420, timer: 420, cw: 360, scramble: 180 }

function Warp() {
  return (
    <svg className="k4-warp" viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden>
      {Array.from({ length: 97 }, (_, i) => <line key={i} x1={i * 20} y1="40" x2={i * 20} y2="1040" />)}
    </svg>
  )
}

function World({ st, sub }: WorldProps) {
  const i = ORDER.indexOf(st)
  const roll = 12 + i * 0.75
  const wy = WEAVE_Y[st]
  const rollTx = (st === 'rules' || st === 'roundT') && sub === 'event'
  const banner = st === 'final' && (sub === 'transition' || sub === 'winner')
  return (
    <div className="x-world k4-world" style={cv({ '--roll': `${roll}px` })}>
      <div className="k4-velvet" />
      <Warp />
      <div className="k4-beam top" />
      <div className="k4-roll" />
      <div className={`k4-banner${banner ? ' on' : ''} s-${sub}`} />
      {st === 'lobby' && sub === 'join' && <div className="k4-newwarp" />}
      {wy !== undefined && (st !== 'cw' || sub === 'question') && <div className="k4-shuttle" key={`${st}-${sub}`} style={cv({ '--wy': `${wy}px` })} />}
      {rollTx && <div className={`k4-roller x-front ${st === 'roundT' ? 'fast' : ''}`} />}
      {st === 'melody' && sub === 'chosen' && <div className="k4-lift x-front" />}
    </div>
  )
}

/** Таймер: катушка. Нить сматывается; на 10 с — краснеет и лохматится; на нуле рвётся. */
function Timer({ left, total, phase, size }: TimerProps) {
  const p = Math.max(0, Math.min(1, left / total))
  const w = 8 + p * 46
  return (
    <div className={`k4-timer ts-${size} ph-${phase}`}>
      <svg viewBox="-110 -110 220 220">
        <rect x="-70" y="-78" width="140" height="14" rx="4" className="k4-flange" />
        <rect x="-70" y="64" width="140" height="14" rx="4" className="k4-flange" />
        <rect x="-16" y="-64" width="32" height="128" className="k4-core" />
        <rect x={-16 - w} y="-62" width={32 + w * 2} height="124" rx="6" className="k4-wound" />
        {Array.from({ length: 14 }, (_, k) => <line key={k} x1={-16 - w} x2={16 + w} y1={-56 + k * 8.6} y2={-52 + k * 8.6} className="k4-turn" />)}
        <g className="k4-thread"><path className="a" d={`M ${16 + w} -10 C ${40 + w} -10 80 30 106 30`} /><path className="b" d="M 106 30 C 120 30 140 40 160 60" /></g>
      </svg>
      <b>{left}</b>
    </div>
  )
}

export const kit: Kit = {
  cls: 'k4',
  link: 'thread',
  World, Timer,
  meta: {
    num: 4,
    name: 'Самоткущий гобелен',
    idea: 'Ткацкий стан во всю стену, который ткёт игру сам: каждое слово набирается рядами, как ткань, а вечер сматывается в рулон.',
    world: 'Бархатная комната, стан во всю стену: сверху латунный навой, снизу товарный вал с рулоном готовой ткани, между ними — основа из тонких золотых нитей. По основе ходит челнок.',
    laws: 'Всё ткётся. Текст набирается рядами снизу вверх, как полотно; челнок пробегает по строке вопроса. Картинка ткётся гуще и медленнее. Пары стягивает нить с натяжением — подпись дёргается и летит к паре. Предмет порядка распускается и заново ткётся на своём месте. Буквы скрэмбла — спутанная пряжа, которая довязывается в клетке. Экран сворачивается в рулон и разворачивается новым.',
    materials: [
      ['Сливочная шерсть', 'всё, что читают: текст и плашки, полотняная фактура'],
      ['Золотая нить', 'связи, время, структура: основа, нити пар, катушка'],
      ['Кармин', 'выделение: верное, номера, выбранное, победитель'],
      ['Бархат и латунь', 'комната и стан: среда, не несёт информации'],
    ],
    persists: 'Стан, основа, навой и вал — всегда. Рулон готовой ткани внизу толще с каждым состоянием: вечер буквально наматывается. Челнок появляется на каждом вопросе и ткёт его строку. В финале этот рулон разворачивается золотым полотном победителя.',
    transitions: 'Событие (правила) — экран сворачивается в рулон снизу вверх, новый разворачивается сверху. Акт (раунд 1) — старое полотно распускается рядами, и новый акт ткётся с нуля; клетки кроссворда вплетаются одна за другой. Обычный переход — тот же рулон, но вдвое быстрее и без паузы.',
    reveals: 'Пара — это нить, которая натягивается и тянет подпись к своей картинке. Предметы порядка распускаются и заново ткутся. Неверный ответ — нить провисает и тускнеет, верный — прошит кармином.',
    timer: 'Катушка: нить сматывается, намотка тает. 10 с — нить краснеет и лохматится. Ноль — нить рвётся, концы отлетают.',
    teams: 'Команда — нить своего цвета (стежок у имени). Новая команда — новая нить основы падает с навоя прямо к своему месту, и имя ткётся рядами.',
    type: 'EB Garamond (+ фрактурная Q). Набранный текст — полотняной фактурой (тонкие поперечные ряды). Цифры маюскульные табличные.',
  },
}
