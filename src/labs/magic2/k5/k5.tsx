// ═══ CONCEPT 5 · «Витражная мастерская» ═══
// Мастерская стекольщика ночью: во всю стену — свинцовое окно, за ним
// фонари, и цветной свет ложится на пол. Закон мира: СТЕКЛО БЬЁТСЯ И
// СРАСТАЕТСЯ, А СВЕТ СКВОЗЬ ЦВЕТНОЕ СТЕКЛО НЕСЁТ СМЫСЛ. Экран раскалывается
// на осколки и собирается следующим; буквы — осколки, которые спаиваются в
// клетке; пары сваривает свинцовая жилка; стёкла ездят по пазам.
import { useMemo, type CSSProperties } from 'react'
import { rng } from '../../../lib/anagram'
import type { Kit, TimerProps, WorldProps } from '../kit'

const cv = (o: Record<string, string | number>) => o as CSSProperties
const GLASS = ['#7d1b2b', '#1d3f8a', '#b9822a', '#1f6b4a', '#5a2a7a', '#2a6f86']

/** Свинцовое окно во всю стену: неровные стёкла, подсвеченные сзади. */
function Window() {
  const panes = useMemo(() => {
    const r = rng(4242), out: { d: string; c: string; o: number }[] = []
    const cols = 12, rows = 7, W = 1920 / cols, H = 1080 / rows
    const jx = (i: number, j: number) => i * W + (i > 0 && i < cols ? (rng(i * 31 + j)() - 0.5) * 50 : 0)
    const jy = (i: number, j: number) => j * H + (j > 0 && j < rows ? (rng(i * 17 + j * 7)() - 0.5) * 40 : 0)
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const p = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([a, b]) => `${jx(a, b).toFixed(0)},${jy(a, b).toFixed(0)}`)
      out.push({ d: `M ${p.join(' L ')} Z`, c: GLASS[Math.floor(r() * GLASS.length)], o: 0.1 + r() * 0.22 })
    }
    return out
  }, [])
  return (
    <svg className="k5-window" viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden>
      {panes.map((p, i) => <path key={i} d={p.d} fill={p.c} style={cv({ '--o': p.o, '--i': i })} />)}
    </svg>
  )
}
/** Роза: большое круглое окно финала — собирается по стеклу. */
function Rose({ st, sub }: { st: string; sub: string }) {
  const m = st !== 'final' || sub === 'last' ? 'off' : sub
  return (
    <svg className={`k5-rose m-${m}`} viewBox="-300 -300 600 600" aria-hidden>
      {Array.from({ length: 24 }, (_, i) => {
        const a0 = (i / 24) * Math.PI * 2, a1 = ((i + 1) / 24) * Math.PI * 2, R0 = i % 2 ? 140 : 110, R1 = 280
        const P = (r: number, a: number) => `${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`
        return <path key={i} className="rp" style={cv({ '--i': i, fill: GLASS[i % GLASS.length] })} d={`M ${P(R0, a0)} L ${P(R1, a0)} A ${R1} ${R1} 0 0 1 ${P(R1, a1)} L ${P(R0, a1)} Z`} />
      })}
      <circle r="100" className="rc" />
    </svg>
  )
}

function World({ st, sub }: WorldProps) {
  return (
    <div className="x-world k5-world">
      <div className="k5-dark" />
      <Window />
      <div className="k5-glow" />
      <Rose st={st} sub={sub} />
      <div className="k5-floor" />
      <div className="k5-bench" />
    </div>
  )
}

/** Таймер: роза из 30 стёкол. Стёкла гаснут; на 10 с — оставшиеся тлеют; на нуле по розе идут трещины. */
function Timer({ left, total, phase, size }: TimerProps) {
  const N = 30, p = Math.max(0, Math.min(1, 1 - left / total))
  const P = (r: number, a: number) => `${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`
  return (
    <div className={`k5-timer ts-${size} ph-${phase}`}>
      <svg viewBox="-110 -110 220 220">
        {Array.from({ length: N }, (_, i) => {
          const a0 = -Math.PI / 2 + (i / N) * Math.PI * 2, a1 = -Math.PI / 2 + ((i + 1) / N) * Math.PI * 2
          return <path key={i} className={`k5-tp${i / N < p ? ' out' : ''}`} style={cv({ fill: GLASS[i % GLASS.length] })}
            d={`M ${P(56, a0)} L ${P(100, a0)} A 100 100 0 0 1 ${P(100, a1)} L ${P(56, a1)} A 56 56 0 0 0 ${P(56, a0)} Z`} />
        })}
        <circle r="54" className="k5-tc" />
        <path className="k5-crack" d="M -30 -96 L -12 -40 L -40 10 L -8 60 L -20 98 M -12 -40 L 30 -20 L 70 -70 M -40 10 L -96 30 M 30 -20 L 40 30 L 96 40 M -8 60 L 40 30" />
      </svg>
      <b>{left}</b>
    </div>
  )
}

export const kit: Kit = {
  cls: 'k5',
  link: 'lead',
  shards: 6,
  World, Timer,
  meta: {
    num: 5,
    name: 'Витражная мастерская',
    idea: 'Мастерская стекольщика ночью: экран — это стекло, которое бьётся и срастается, а цветной свет сквозь него приносит ответы.',
    world: 'Тёмная мастерская, во всю стену — свинцовое окно из неровных цветных стёкол, подсвеченное фонарями снаружи. На полу лежат цветные пятна света, внизу — край верстака.',
    laws: 'Стекло бьётся и срастается. Экран раскалывается на осколки и собирается следующим. Слово проявляется как гравировка с бликом. Картинка собирается из осколков и теряет цвет стекла. Буквы скрэмбла — осколки, которые спаиваются в клетке в прозрачное стекло. Пару сваривает свинцовая жилка. Стёкла ходят только по пазам: строки порядка и табло сначала выезжают в сторону, потом вдоль, потом встают на место.',
    materials: [
      ['Опаловое стекло', 'всё, что читают: тёплое молочное стекло, текст — тёмной гравировкой или светлым на тёмном'],
      ['Цветное стекло', 'команды, время, акценты; цвет — только на стекле, никогда на тексте'],
      ['Свинец', 'структура: рамки, связи пар, пазы'],
      ['Свет из-за окна', 'смысл: куда он падает, там важное'],
    ],
    persists: 'Свинцовое окно и верстак — всегда. Окно разгорается на акте и гаснет на нуле таймера. Цветной свет на полу живёт весь вечер. В финале из стекла окна собирается большая роза.',
    transitions: 'Событие (правила) — экран раскалывается на шесть осколков, они разлетаются, следующий экран срастается из центра. Акт (раунд 1) — то же, но окно за спиной вспыхивает и сетка кроссворда спаивается клеткой за клеткой. Обычный переход — стекло уезжает по пазу, следующее въезжает по тому же пазу.',
    reveals: 'Пары сваривает свинцовая жилка, и подпись съезжает по пазу под свою картинку. Предметы порядка ходят по пазам углом. Верный ответ — стекло наливается светом, неверный — трескается и тускнеет.',
    timer: 'Роза из 30 стёкол: каждую секунду гаснет одно. 10 с — оставшиеся стёкла тлеют красным, окно за спиной тускнеет. Ноль — по розе бегут трещины.',
    teams: 'Команда — цветное стёклышко в свинцовой оправе (цвет только в стекле, имя — опаловым). Новая команда влетает осколком и спаивается в своё стёклышко.',
    type: 'EB Garamond (+ фрактурная Q). Гравировка — с узким бликом при появлении. Цифры маюскульные табличные.',
  },
}
