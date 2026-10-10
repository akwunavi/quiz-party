// ═══ CONCEPT 1.5 · «Обсерватория» ═══
// Развитие Концепта 1: мы внутри купола, и здесь СВЕТ — ВЕЩЕСТВО. Луч пишет
// слова и остывает в слоновую кость; проекционный конус кладёт картинку на
// холст; лучи тянут подписи к парам; буквы — звёзды, падающие в созвездие.
// Мир переживает все состояния: купол, кольца армиллы (поза = фаза игры),
// створки купола (открываются один раз — на первом акте), горизонт и звёзды
// команд, которые ждут у парапета и поднимаются в финале.
import { useMemo, type CSSProperties } from 'react'
import { rng } from '../../../lib/anagram'
import { TEAMS, RANKED, placeOf, JP } from '../data'
import type { Kit, TimerProps, WorldProps } from '../kit'

const W = 1920, H = 1080
const cv = (o: Record<string, string | number>) => o as CSSProperties

function Sky() {
  const stars = useMemo(() => {
    const r = rng(1913)
    return Array.from({ length: 300 }, () => ({ x: -400 + r() * (W + 800), y: -300 + r() * (H + 200), s: r() < 0.07 ? 1.9 : r() < 0.4 ? 1.2 : 0.7, o: 0.22 + r() * 0.6 }))
  }, [])
  return (
    <svg className="k1-sky" viewBox={`0 0 ${W} ${H}`} aria-hidden>
      {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.s} opacity={s.o} />)}
    </svg>
  )
}
function Dome() {
  const ribs = Array.from({ length: 13 }, (_, i) => -60 + i * 10)
  return (
    <svg className="k1-dome" viewBox={`0 0 ${W} ${H}`} aria-hidden>
      {ribs.map(a => { const x = W / 2 + Math.tan((a * Math.PI) / 180) * 1500; return <path key={a} d={`M ${W / 2} -900 Q ${W / 2 + (x - W / 2) * 0.55} 300 ${x} ${H + 40}`} /> })}
      {[260, 560, 860].map(y => <path key={y} className="par" d={`M -100 ${y + 120} Q ${W / 2} ${y - 160} ${W + 100} ${y + 120}`} />)}
    </svg>
  )
}
/** Армилла: три кольца, поза = фаза игры; в «Своей игре» и мелодии кольцо прицеливается в выбранное. */
function Armilla({ pose, aim }: { pose: string; aim?: [number, number] }) {
  return (
    <div className={`k1-arm pose-${pose}`} style={aim ? cv({ '--ax': `${aim[0] - 960}px`, '--ay': `${aim[1] - 540}px` }) : undefined} aria-hidden>
      <svg viewBox="-600 -600 1200 1200">
        <g className="k1-ring r1"><ellipse rx="560" ry="560" /><g className="k1-notch">{Array.from({ length: 48 }, (_, i) => <line key={i} x1="560" y1="0" x2={i % 4 ? 548 : 532} y2="0" transform={`rotate(${i * 7.5})`} />)}</g></g>
        <g className="k1-ring r2"><ellipse rx="560" ry="560" /></g>
        <g className="k1-ring r3"><ellipse rx="560" ry="560" /></g>
        <circle className="k1-core" r="10" />
      </svg>
    </div>
  )
}
/** Звёзды команд: у парапета весь вечер; в финале встают созвездием вокруг победителя. */
function TeamStars({ st, sub }: { st: string; sub: string }) {
  const fin = st === 'final' && (sub === 'winner')
  const win = RANKED[0].id
  return (
    <div className={`k1-tstars${fin ? ' fin' : ''}${st === 'lobby' || st === 'randomizer' || (st === 'final' && sub === 'results') ? ' off' : ''}`} aria-hidden>
      {TEAMS.map((t, i) => {
        const pl = placeOf(t)
        const a = ((i + 0.5) / 12) * Math.PI * 2
        const fx = t.id === win ? W / 2 : W / 2 + Math.cos(a) * 860, fy = t.id === win ? 100 : 470 + Math.sin(a) * 330
        return <i key={t.id} className={`k1-ts${t.id === win ? ' win' : ''}${t.alive ? '' : ' dim'}`}
          style={cv({ '--x': `${150 + i * 147}px`, '--y': '1040px', '--fx': `${fx}px`, '--fy': `${fy}px`, '--h': t.hue, '--d': `${(12 - pl) * 0.09}s` })} />
      })}
    </div>
  )
}

function World({ st, sub }: WorldProps) {
  const shutterOpen = !(st === 'lobby' || st === 'randomizer' || st === 'rules' || (st === 'cw' && sub === 'before'))
  const pose = st === 'final' ? (sub === 'last' ? 'final' : sub === 'results' ? 'aside' : 'sphere')
    : st === 'jp' && sub !== 'board' ? 'aim' : st === 'melody' && sub === 'chosen' ? 'aim'
    : st === 'cw' && sub !== 'question' ? 'act' : st === 'timer' ? (sub.startsWith('dense') ? 'dense' : 'text') : st
  const aim: [number, number] | undefined = st === 'jp' && sub !== 'board' ? [360 + JP.open.theme * 300, 330 + JP.open.tile * 132]
    : st === 'melody' && sub === 'chosen' ? [960, 540] : undefined
  return (
    <div className="x-world k1-world">
      <div className={`k1-rot${st === 'final' && sub !== 'last' ? ' turned' : ''}`}><Sky /></div>
      <div className={`k1-slit${shutterOpen ? ' open' : ''}`} />
      <Dome />
      <div className={`k1-leaf l${shutterOpen ? ' open' : ''}`} /><div className={`k1-leaf r${shutterOpen ? ' open' : ''}`} />
      <div className="k1-dawn" />
      <Armilla pose={pose} aim={aim} />
      <div className="k1-horizon" />
      <TeamStars st={st} sub={sub} />
      {st === 'lobby' && <div className="k1-meteor x-front" key={sub} data-on={sub === 'join' ? 1 : 0} />}
      {st === 'final' && <div className={`k1-nova x-front n-${sub}`} />}
    </div>
  )
}

/** Таймер: латунный лимб с кометой. Комета гасит деления; на 10 с — тлеющий рассвет; на нуле — заходит в центр. */
function Timer({ left, total, phase, size }: TimerProps) {
  const N = 30, R = 92
  const p = Math.max(0, Math.min(1, 1 - left / total))
  const a = -90 + p * 360
  return (
    <div className={`k1-timer ts-${size} ph-${phase}`}>
      <svg viewBox="-110 -110 220 220">
        <circle className="k1-limb" r={R + 10} />
        {Array.from({ length: N }, (_, i) => {
          const ang = (-90 + (i / N) * 360) * Math.PI / 180
          return <line key={i} className={`k1-tick${i / N < p ? ' out' : ''}`} x1={Math.cos(ang) * (R - 4)} y1={Math.sin(ang) * (R - 4)} x2={Math.cos(ang) * (R + 4)} y2={Math.sin(ang) * (R + 4)} />
        })}
        <g className="k1-comet" style={{ transform: `rotate(${a}deg)` }}><circle cx={R} cy={0} r="15" className="halo" /><circle cx={R} cy={0} r="5.5" className="core" /></g>
        <circle className="k1-set" r="20" />
      </svg>
      <b>{left}</b>
    </div>
  )
}

export const kit: Kit = {
  cls: 'k1',
  link: 'beam',
  World, Timer,
  meta: {
    num: 1,
    name: 'Обсерватория 1.5',
    idea: 'Мы внутри купола обсерватории, и свет здесь — вещество: он пишет, переносит и держит.',
    world: 'Купол изнутри: бархатное небо, латунные рёбра свода, створки щели наверху (открываются один раз — когда начинается первый акт), кольца огромной армиллярной сферы, тёмный парапет-горизонт.',
    laws: 'Свет материален. Луч пишет слово и остывает в слоновую кость. Проекционный конус кладёт картинку на холст. Падающая звезда приносит команду. Лучи тянут подписи к своим парам. Буквы скрэмбла — звёзды, которые падают в созвездие. На табло и в порядке предметы ходят по орбитам, а не по прямой. В финале небо поворачивается, кольца смыкаются в сферу.',
    materials: [
      ['Свет', 'то, что читают сейчас: вопрос, ответ, связи; рождается тёплым, остывает до слоновой кости'],
      ['Латунь', 'структура и время: кольца армиллы, лимб таймера, рамки'],
      ['Слоновая кость', 'то, что «можно взять в руки»: медальоны вариантов, QR, плитки'],
      ['Бархат неба', 'среда — никогда не несёт информацию'],
    ],
    persists: 'Купол, горизонт, звёзды команд у парапета — всегда. Створки щели закрыты до первого акта, потом открыты до конца вечера. Армилла не исчезает: каждая фаза — новая поза колец, в «Своей игре» и мелодии кольцо прицеливается в выбранную клетку.',
    transitions: 'Небо поворачивается: экран уходит за горизонт по дуге, следующий восходит с другой стороны. Событие (правила) — поворот на 24°. Акт (раунд 1) — открываются створки купола, сверху падает лунный столб, поворот на 40°, сетка кроссворда загорается звёздами по порядку. Обычный переход — кольцо проворачивается на одно деление, поворот на 9°.',
    reveals: 'Луч от картинки ловит свою подпись и протаскивает её по воздуху к паре; предметы порядка обходят друг друга по орбитам; верный ответ пишется светом, неверный остывает в пепел.',
    timer: 'Латунный лимб: комета идёт по кругу и гасит деления. 10 с — над горизонтом встаёт тлеющий рассвет, деления краснеют. Ноль — комета заходит в центр, слова вопроса остывают из света в камень.',
    teams: 'Команда — звезда (цвет только в ядре, имя — слоновой костью). Новая команда прилетает падающей звездой и пишется светом. Весь вечер звёзды ждут у парапета; в финале встают кругом и тянут лучи к победителю.',
    type: 'EB Garamond (+ фрактурная Q). Цифры маюскульные табличные; служебное — капитель с разрядкой.',
  },
}
