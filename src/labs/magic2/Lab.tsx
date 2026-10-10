// ═══ Magic 2.0 Concept Lab · Фаза 2 ═══
// Пять миров одной ДНК Magic × 18 настоящих состояний игры. Переключение
// концепта НЕ сбрасывает состояние, подсостояние и таймер — сравнение «яблоко
// к яблоку». Игровой движок не подключается: только чистые функции
// (lib/anagram.ts, lib/crossword.ts) и тестовые данные в формах продакшна.
import { useEffect, useRef, useState } from 'react'
import { Stage } from './common'
import { TIMER_LEFT, timerPhase, type TimerState } from './data'
import { CONCEPTS } from './concepts'
import { Screen } from './screens'
import type { StateId } from './kit'

/** Аварийная навигация на проекторе. По умолчанию ВЫКЛЮЧЕНА: в игре проектор без кнопок. */
export const showProjectorNavigation = false

type Sub = { id: string; label: string }
type Def = { id: StateId; n: string; label: string; subs: Sub[]; timer?: boolean; seq?: [string, number][]; count?: boolean }
const S = (...a: [string, string][]): Sub[] => a.map(([id, label]) => ({ id, label }))
const BEA = S(['before', 'ДО'], ['event', 'СОБЫТИЕ'], ['after', 'ПОСЛЕ'])
export const STATES: Def[] = [
  { id: 'lobby', n: '01', label: 'Лобби', subs: S(['idle', 'IDLE'], ['join', 'КОМАНДА ВОШЛА']), seq: [['idle', 0], ['join', 900]] },
  { id: 'randomizer', n: '02', label: 'Лобби → составы', subs: S(['before', 'ДО'], ['event', 'ПРЕВРАЩЕНИЕ'], ['ready', 'ГОТОВО']), seq: [['before', 0], ['event', 600], ['ready', 3200]] },
  { id: 'rules', n: '03', label: 'Переход к правилам', subs: BEA, seq: [['before', 0], ['event', 500], ['after', 3000]] },
  { id: 'cw', n: '04', label: 'Акт I · кроссворд', subs: [...BEA, { id: 'question', label: 'ВОПРОС' }], seq: [['before', 0], ['event', 500], ['after', 3600], ['question', 7600]], timer: true },
  { id: 'match', n: '05', label: 'Сопоставление · вопрос', subs: [], timer: true },
  { id: 'one', n: '06', label: 'Одна картинка', subs: [], timer: true },
  { id: 'dense', n: '07', label: '2 картинки + варианты', subs: [], timer: true },
  { id: 'text', n: '08', label: 'Вопрос без вариантов', subs: [], timer: true },
  { id: 'jp', n: '09', label: 'Своя игра', subs: S(['board', 'ДОСКА'], ['select', 'ВЫБОР'], ['open', 'ВОПРОС'], ['answer', 'ОТВЕТ']), seq: [['board', 0], ['select', 900], ['open', 2600], ['answer', 6200]] },
  { id: 'melody', n: '10', label: 'Угадай мелодию', subs: S(['board', 'ДОСКА'], ['chosen', 'ТРЕК ВЫБРАН'], ['bids', 'СТАВКИ'], ['reveal', 'ОТВЕТ']), seq: [['board', 0], ['chosen', 900], ['bids', 4200], ['reveal', 7600]] },
  { id: 'blitz', n: '11', label: 'Блиц', subs: S(['active', 'ОТВЕЧАЕТ'], ['verdict', 'ВЕРДИКТ']), seq: [['active', 0], ['verdict', 1800]] },
  { id: 'scramble', n: '12', label: 'Скрэмбл', subs: S(['shuffled', 'ПЕРЕМЕШАНО'], ['hints', 'ПОДСКАЗКИ'], ['solved', 'СОБРАНО']), seq: [['shuffled', 0], ['hints', 1600], ['solved', 4200]], timer: true },
  { id: 'matchA', n: '13', label: 'Сопоставление · ответ', subs: S(['before', 'ДО'], ['reveal', 'РАЗБОР'], ['solved', 'РЕШЕНО']), seq: [['before', 0], ['reveal', 700], ['solved', 4200]] },
  { id: 'orderA', n: '14', label: 'Порядок · ответ', subs: S(['before', 'ДО'], ['reveal', 'ПЕРЕСТАНОВКА'], ['solved', 'ИТОГ']), seq: [['before', 0], ['reveal', 700], ['solved', 3800]] },
  { id: 'timer', n: '15', label: 'Таймер в вопросе', subs: S(['sparse', 'РЕДКИЙ'], ['dense', 'ПЛОТНЫЙ']), timer: true },
  { id: 'board', n: '16', label: 'Табло', subs: S(['before', 'ДО'], ['reorder', 'ПЕРЕСТАНОВКА'], ['after', 'ПОСЛЕ']), seq: [['before', 0], ['reorder', 900], ['after', 3400]] },
  { id: 'roundT', n: '17', label: 'Переход между раундами', subs: BEA, seq: [['before', 0], ['event', 600], ['after', 2600]] },
  { id: 'final', n: '18', label: 'Финал', subs: S(['last', 'ПОСЛЕДНИЙ ОТВЕТ'], ['transition', 'ПЕРЕХОД'], ['winner', 'ПОБЕДИТЕЛЬ'], ['results', 'ИТОГИ']), seq: [['last', 0], ['transition', 1800], ['winner', 5200], ['results', 10200]] },
]
const TIMER_TOTAL: Partial<Record<StateId, number>> = { cw: 45, scramble: 60 }

function readHash() {
  const m = /^#c(\d)-([a-zA-Z]+)-?([a-z]*)-?(\d*)$/.exec(location.hash)
  const ci = m ? Math.max(0, Math.min(CONCEPTS.length - 1, Number(m[1]) - 1)) : 0
  const d = STATES.find(s => s.id === m?.[2]) ?? STATES[0]
  const sub = d.subs.some(x => x.id === m?.[3]) ? m![3] : d.subs[0]?.id ?? ''
  return { ci, st: d.id, sub, left: m?.[4] ? Number(m[4]) : TIMER_LEFT.normal }
}

export function Lab() {
  const init = readHash()
  const [ci, setCi] = useState(init.ci)
  const [st, setSt] = useState<StateId>(init.st)
  const [sub, setSub] = useState(init.sub)
  const [left, setLeft] = useState(init.left)
  const [play, setPlay] = useState(0)
  const [nav, setNav] = useState(showProjectorNavigation)
  const timers = useRef<number[]>([])
  const embed = /[?&]embed=1/.test(location.search)
  const def = STATES.find(s => s.id === st)!
  const C = CONCEPTS[ci]
  const timed = !!def.timer && (st !== 'cw' || sub === 'question')

  const stop = () => { timers.current.forEach(t => clearTimeout(t)); timers.current = [] }
  const later = (ms: number, f: () => void) => { timers.current.push(window.setTimeout(f, ms)) }
  useEffect(() => () => stop(), [])
  useEffect(() => {
    try { history.replaceState(null, '', `${location.search}#c${ci + 1}-${st}${sub ? '-' + sub : ''}${def.timer ? '-' + left : ''}`) } catch { /* предпросмотр без истории */ }
  }, [ci, st, sub, left, def.timer])

  const goState = (id: StateId) => { stop(); const d = STATES.find(s => s.id === id)!; setSt(id); setSub(d.subs[0]?.id ?? ''); setLeft(TIMER_LEFT.normal); setPlay(p => p + 1) }
  const runPlay = () => {
    stop(); setPlay(p => p + 1)
    if (def.seq) def.seq.forEach(([s, t]) => later(t, () => setSub(s)))
    if (timed || (def.timer && !def.seq)) { // живой отсчёт 12 → 0 в реальном времени
      setLeft(12)
      for (let i = 1; i <= 12; i++) later(i * 1000, () => setLeft(12 - i))
    }
  }

  const screen = <Screen kit={C} st={st} sub={sub} left={left} timer={timerPhase(left)} play={play} nav={nav} />
  if (embed) return <div className="m2-embed"><Stage>{screen}</Stage></div>

  return (
    <div className="m2-lab">
      <header className="m2-head">
        <div className="m2-brand"><span className="m2-brand-q">Q</span><div><b>Magic 2.0 · Concept Lab · v2</b><span>пять миров × 18 настоящих состояний · проектор 1920×1080 · прод не тронут</span></div></div>
        <nav className="m2-concepts" aria-label="Концепт">
          {CONCEPTS.map((c, i) => (
            <button key={c.meta.num} type="button" className={`m2-concept${i === ci ? ' is-on' : ''}`} onClick={() => setCi(i)} aria-pressed={i === ci}>
              <span className="m2-concept-n">CONCEPT {c.meta.num}{c.meta.num === 1 ? ' · 1.5' : ' · NEW'}</span><span className="m2-concept-name">{c.meta.name}</span>
            </button>
          ))}
        </nav>
      </header>

      <nav className="m2-scenes" aria-label="Состояние игры">
        {STATES.map(s => (
          <button key={s.id} type="button" className={`m2-scene${s.id === st ? ' is-on' : ''}`} onClick={() => goState(s.id)} aria-pressed={s.id === st}>
            <b>{s.n}</b>{s.label}
          </button>
        ))}
      </nav>

      <div className="m2-transport">
        {def.subs.length > 0 && <div className="m2-seg" role="group" aria-label="Подсостояние">
          {def.subs.map(x => <button key={x.id} type="button" className={x.id === sub ? 'is-on' : ''} onClick={() => { stop(); setSub(x.id) }}>{x.label}</button>)}
        </div>}
        {timed && <div className="m2-seg" role="group" aria-label="Таймер">
          {(['normal', 'warning', 'zero'] as TimerState[]).map(t => <button key={t} type="button" className={timerPhase(left) === t ? 'is-on' : ''} onClick={() => { stop(); setLeft(TIMER_LEFT[t]) }}>{t.toUpperCase()}</button>)}
          <span className="m2-left">{left} с из {TIMER_TOTAL[st] ?? 30}</span>
        </div>}
        <div className="m2-seg">
          <button type="button" className="is-play" onClick={runPlay}>{play ? '↻ REPLAY' : '▶ PLAY'}</button>
          <button type="button" className={nav ? 'is-on' : ''} onClick={() => setNav(n => !n)} title="showProjectorNavigation — аварийные «назад/дальше» на проекторе; по умолчанию выключено">
            аварийная навигация: {nav ? 'ВКЛ' : 'выкл'}</button>
        </div>
      </div>

      <main className="m2-preview"><Stage>{screen}</Stage></main>

      <section className="m2-card" aria-label="Описание концепта">
        <div className="m2-card-head"><span>CONCEPT {C.meta.num}</span><h1>{C.meta.name}</h1><p>{C.meta.idea}</p></div>
        <dl>
          <div><dt>Физический мир</dt><dd>{C.meta.world}</dd></div>
          <div><dt>Законы магии</dt><dd>{C.meta.laws}</dd></div>
          <div><dt>Материалы</dt><dd><ul>{C.meta.materials.map(m => <li key={m[0]}><b>{m[0]}</b> — {m[1]}</li>)}</ul></dd></div>
          <div><dt>Что переживает переходы</dt><dd>{C.meta.persists}</dd></div>
          <div><dt>Грамматика переходов</dt><dd>{C.meta.transitions}</dd></div>
          <div><dt>Грамматика ответа</dt><dd>{C.meta.reveals}</dd></div>
          <div><dt>Таймер</dt><dd>{C.meta.timer}</dd></div>
          <div><dt>Команды</dt><dd>{C.meta.teams}</dd></div>
          <div><dt>Шрифт</dt><dd>{C.meta.type}</dd></div>
        </dl>
      </section>
    </div>
  )
}
