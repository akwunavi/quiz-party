// ═══ CONCEPT 3 · «Ночная оранжерея» ═══
// Викторианская оранжерея ночью: чугунные рёбра, запотевшее стекло, луна за
// крышей. Закон мира: ВСЁ РАСТЁТ. Слова разворачиваются, как побеги; картинки
// распускаются; пары связывает лоза; предметы порядка уходят в почву и
// прорастают на новом месте; буквы скрэмбла — семена, которые всходят в своих
// лунках. Сад растёт весь вечер: лоза под крышей с каждым состоянием длиннее.
import { useMemo, type CSSProperties } from 'react'
import { rng } from '../../../lib/anagram'
import type { Kit, StateId, TimerProps, WorldProps } from '../kit'

const cv = (o: Record<string, string | number>) => o as CSSProperties
const ORDER: StateId[] = ['lobby', 'randomizer', 'rules', 'cw', 'match', 'one', 'dense', 'text', 'timer', 'jp', 'melody', 'blitz', 'scramble', 'matchA', 'orderA', 'board', 'roundT', 'final']

/** Чугунный каркас оранжереи: рёбра свода и переплёт стекла. */
function Glasshouse() {
  const ribs = Array.from({ length: 9 }, (_, i) => 120 + i * 210)
  return (
    <svg className="k3-iron" viewBox="0 0 1920 1080" aria-hidden>
      {ribs.map(x => <path key={x} d={`M ${x} 1080 L ${x} 260 Q ${x} 120 ${960 + (x - 960) * 0.55} 30`} />)}
      {[400, 640, 880].map(y => <line key={y} x1="0" y1={y} x2="1920" y2={y} className="bar" />)}
      <path d="M -40 300 Q 960 -110 1960 300" className="arch" />
    </svg>
  )
}
/** Листва по углам: силуэты, которые реагируют на время (сворачиваются к нулю). */
function Leaves() {
  const leaf = (x: number, y: number, r: number, s: number, k: number) => (
    <g key={k} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} className="k3-leaf" style={cv({ '--k': k })}>
      <path d="M 0 0 C 60 -40 160 -40 240 0 C 160 40 60 40 0 0 Z" /><path d="M 0 0 L 230 0" className="vein" />
    </g>
  )
  return (
    <svg className="k3-leaves" viewBox="0 0 1920 1080" aria-hidden>
      <g className="k3-clump l">{[[-40, 1060, -70, 1.3], [0, 1080, -40, 1.1], [-20, 1000, -95, 0.9], [40, 1090, -15, 1.2], [-60, 900, -60, 0.8]].map((a, i) => leaf(a[0], a[1], a[2], a[3], i))}</g>
      <g className="k3-clump r">{[[1960, 1060, -110, 1.3], [1920, 1080, -140, 1.1], [1940, 990, -85, 0.9], [1880, 1090, -165, 1.2], [1980, 900, -120, 0.8]].map((a, i) => leaf(a[0], a[1], a[2], a[3], i + 5))}</g>
    </svg>
  )
}
/** Лоза под крышей: растёт через весь вечер. */
function Vine({ g }: { g: number }) {
  const leaves = useMemo(() => { const r = rng(77); return Array.from({ length: 26 }, (_, i) => ({ t: (i + 1) / 27, s: 0.5 + r() * 0.5, f: i % 2 ? 1 : -1 })) }, [])
  const P = (t: number) => ({ x: -20 + t * 1960, y: 64 + Math.sin(t * 9) * 26 })
  const d = Array.from({ length: 61 }, (_, i) => { const p = P(i / 60); return `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}` }).join(' ')
  return (
    <svg className="k3-vine" viewBox="0 0 1920 1080" style={cv({ '--g': g })} aria-hidden>
      <path d={d} pathLength={1} className="stem" />
      {leaves.map((l, i) => { const p = P(l.t); return <path key={i} className={`vl${l.t <= g ? ' on' : ''}`} d="M 0 0 C 10 -8 26 -8 34 0 C 26 8 10 8 0 0 Z" transform={`translate(${p.x} ${p.y}) rotate(${l.f * 50 - 20}) scale(${l.s})`} style={cv({ '--t': l.t })} /> })}
    </svg>
  )
}
/** Цереус — ночной цветок финала: бутон весь вечер спит за стеклом, в финале раскрывается. */
function Cereus({ st, sub }: { st: StateId; sub: string }) {
  const mode = st !== 'final' ? 'hidden' : sub === 'last' ? 'bud' : sub === 'transition' ? 'swell' : sub === 'winner' ? 'open' : 'rest'
  return (
    <svg className={`k3-cereus m-${mode}`} viewBox="-300 -300 600 600" aria-hidden>
      {Array.from({ length: 14 }, (_, i) => <path key={i} className="pt" style={cv({ '--a': `${(i * 360) / 14}deg`, '--i': i })} d="M 0 0 C 40 -40 50 -170 0 -260 C -50 -170 -40 -40 0 0 Z" />)}
      {Array.from({ length: 10 }, (_, i) => <path key={`s${i}`} className="pt in" style={cv({ '--a': `${(i * 36) + 18}deg`, '--i': i })} d="M 0 0 C 26 -30 30 -110 0 -170 C -30 -110 -26 -30 0 0 Z" />)}
      <circle r="34" className="heart" />
    </svg>
  )
}

function World({ st, sub }: WorldProps) {
  const i = ORDER.indexOf(st)
  const g = 0.12 + (i / (ORDER.length - 1)) * 0.86
  const sprout = st === 'lobby' && sub === 'join'
  const veil = st === 'rules' && sub === 'event'
  return (
    <div className={`x-world k3-world`}>
      <div className="k3-night" />
      <div className={`k3-moon${(st === 'cw' && sub !== 'before') || i > ORDER.indexOf('cw') ? ' up' : ''}`} />
      <div className="k3-shaft" />
      <Glasshouse />
      <div className="k3-fog" />
      <Vine g={g} />
      <Cereus st={st} sub={sub} />
      <Leaves />
      {sprout && <svg className="k3-sprout x-front" viewBox="0 0 1920 1080" aria-hidden><path pathLength={1} d="M 1492 1090 C 1470 1040 1520 1000 1494 960 C 1480 935 1486 915 1492 902" /><path className="lf" d="M 1494 990 C 1514 974 1536 976 1548 988 C 1534 998 1512 1000 1494 990 Z" /></svg>}
      {veil && <svg className="k3-veil x-front" viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden>
        {Array.from({ length: 24 }, (_, k) => <path key={k} style={cv({ '--k': k })} d={`M ${k * 84 + 20} -10 C ${k * 84 + 60} 300 ${k * 84 - 20} 600 ${k * 84 + 30} 1100`} />)}
      </svg>}
    </div>
  )
}

/** Таймер: цветок о 30 лепестках. Лепестки опадают; на 10 с оставшиеся тлеют; на нуле сердцевина закрывается. */
function Timer({ left, total, phase, size }: TimerProps) {
  const N = 30
  const p = Math.max(0, Math.min(1, 1 - left / total))
  return (
    <div className={`k3-timer ts-${size} ph-${phase}`}>
      <svg viewBox="-110 -110 220 220">
        {Array.from({ length: N }, (_, i) => (
          <path key={i} className={`k3-petal${i / N < p ? ' fell' : ''}`} style={cv({ '--a': `${(i * 360) / N}deg`, '--j': i })} d="M 0 -40 C 9 -58 9 -84 0 -100 C -9 -84 -9 -58 0 -40 Z" />
        ))}
        <circle r="36" className="k3-heart" />
        <g className="k3-sepals">{[0, 72, 144, 216, 288].map(a => <path key={a} style={cv({ '--a': `${a}deg` })} d="M 0 0 C 22 -10 30 -34 0 -48 C -30 -34 -22 -10 0 0 Z" />)}</g>
      </svg>
      <b>{left}</b>
    </div>
  )
}

export const kit: Kit = {
  cls: 'k3',
  link: 'vine',
  World, Timer,
  meta: {
    num: 3,
    name: 'Ночная оранжерея',
    idea: 'Ночная оранжерея, в которой всё растёт: вопросы разворачиваются побегами, ответы распускаются, а сад становится гуще с каждым раундом.',
    world: 'Викторианская оранжерея ночью: чугунные рёбра свода, переплёт запотевшего стекла, луна за крышей и её холодный столб, тёмная листва по нижним углам, лоза под самой крышей.',
    laws: 'Всё растёт. Слово разворачивается, как побег, и светлеет из зелени в слоновую кость. Картинка распускается звездой лепестков. Пару связывает лоза. Предмет порядка уходит в почву и прорастает на своём месте. Буквы скрэмбла — семена: падают в лунку и всходят буквой. Команда входит ростком из земли. Время — цветок, который роняет лепестки.',
    materials: [
      ['Слоновая кость с лунным холодом', 'всё, что читают: вопросы, варианты, имена'],
      ['Живая зелень', 'рост и связи: лоза, побеги, ростки; цвет «ещё растёт» — до того как слово дозрело'],
      ['Чугун', 'каркас: рёбра свода, рамки, лунки'],
      ['Пыльца (старое золото)', 'единственный тёплый акцент: верное, номера, победитель'],
    ],
    persists: 'Каркас, луна и листва — всегда. Лоза под крышей растёт через весь вечер: в лобби это тонкий росток, к финалу — она через всю крышу в листьях. Луна встаёт один раз, на первом акте, и потом светит до конца. Бутон цереуса спит за стеклом и раскрывается только в финале.',
    transitions: 'Событие (правила) — с крыши падает завеса лиан, задёргивает экран и отступает уже с другим содержимым. Акт (раунд 1) — старое увядает и оседает в почву, встаёт луна, сетка кроссворда прорастает клетками-мхом. Обычный переход — экран складывается, как лист мимозы, и раскрывается новым.',
    reveals: 'Связь — это лоза, которая дорастает от картинки до подписи. Предметы не переезжают, а перерастают на новые места. Верный ответ распускается цветком, неверный вянет и клонится.',
    timer: 'Цветок о 30 лепестках: каждую секунду опадает лепесток. 10 с — оставшиеся тлеют медью, листва по углам начинает сворачиваться. Ноль — чашелистики закрывают сердцевину, цветок становится бутоном, слова вопроса холодеют.',
    teams: 'Команда — бутон её цвета (цвет только в бутоне, имя — слоновой костью). Новая команда вырастает ростком из земли, и бутон раскрывается рядом с именем.',
    type: 'EB Garamond (+ фрактурная Q). Растущие слова сначала зелёные, дозревают до слоновой кости. Цифры маюскульные табличные.',
  },
}
