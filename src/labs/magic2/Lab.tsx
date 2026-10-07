// ═══ Magic 2.0 Concept Lab ═══
// Три мира одной ДНК Magic × одни и те же настоящие состояния игры.
// Переключение концепта НЕ сбрасывает состояние, подсостояние и таймер —
// сравнение «яблоко к яблоку». Игровой движок не подключается: только
// чистые функции (lib/anagram.ts) и тестовые данные в формах продакшна.
import { useEffect, useRef, useState } from 'react'
import { Stage, type SceneId } from './common'
import { TIMER_LEFT, timerPhase, type TimerState } from './data'
import { CONCEPTS } from './concepts'

type SceneDef = { id: SceneId; n: string; label: string; subs?: { id: string; label: string }[]; timer?: boolean; seq?: [string, number][] }
const SCENES: SceneDef[] = [
  { id: 'lobby', n: '01', label: 'Лобби · 12 команд · QR', subs: [{ id: 'idle', label: 'IDLE' }, { id: 'join', label: 'КОМАНДА ПОДКЛЮЧИЛАСЬ' }], seq: [['idle', 0], ['join', 700]] },
  { id: 'text', n: '02', label: 'Текстовый вопрос', timer: true },
  { id: 'dense', n: '03', label: '2 картинки + 4 варианта', timer: true },
  { id: 'match', n: '04', label: 'Сопоставление · ответ', subs: [{ id: 'before', label: 'ДО ПОКАЗА' }, { id: 'solved', label: 'РЕШЕНО' }], seq: [['before', 0], ['solved', 900]] },
  { id: 'jp', n: '05', label: 'Своя игра', subs: [{ id: 'board', label: 'BOARD' }, { id: 'open', label: 'OPEN TILE' }, { id: 'answer', label: 'ANSWER' }], seq: [['board', 0], ['open', 1500], ['answer', 4200]] },
  { id: 'final', n: '06', label: 'Финал', subs: [{ id: 'last', label: 'LAST ANSWER' }, { id: 'transition', label: 'TRANSITION' }, { id: 'winner', label: 'WINNER' }, { id: 'results', label: 'RESULTS' }], seq: [['last', 0], ['transition', 1800], ['winner', 4300], ['results', 8800]] },
  { id: 'scramble', n: '07', label: 'Скрэмбл · движение', subs: [{ id: 'shuffle', label: 'ПЕРЕМЕШАНО' }, { id: 'hints', label: 'ПОДСКАЗКИ' }, { id: 'solved', label: 'СОБРАНО' }], seq: [['shuffle', 0], ['hints', 1400], ['solved', 3600]] },
]
const TOUR: [SceneId, string][] = [['lobby', 'join'], ['text', ''], ['dense', ''], ['match', 'solved'], ['jp', 'answer'], ['final', 'results']]

function readHash() {
  const m = /^#c(\d)-([a-z]+)-?([a-z]*)-?(\d*)$/.exec(location.hash)
  const ci = m ? Math.max(0, Math.min(CONCEPTS.length - 1, Number(m[1]) - 1)) : 0
  const sc = SCENES.find(s => s.id === m?.[2]) ?? SCENES[0]
  return { ci, scene: sc.id, sub: m?.[3] || sc.subs?.[0].id || '', left: m?.[4] ? Number(m[4]) : TIMER_LEFT.normal }
}

export function Lab() {
  const init = readHash()
  const [ci, setCi] = useState(init.ci)
  const [scene, setScene] = useState<SceneId>(init.scene)
  const [sub, setSub] = useState(init.sub)
  const [left, setLeft] = useState(init.left)
  const [play, setPlay] = useState(0)
  const [touring, setTouring] = useState(false)
  const timers = useRef<number[]>([])
  const embed = /[?&]embed=1/.test(location.search)
  const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const def = SCENES.find(s => s.id === scene)!
  const C = CONCEPTS[ci]

  const stop = () => { timers.current.forEach(t => clearTimeout(t)); timers.current = []; setTouring(false) }
  const later = (ms: number, f: () => void) => { timers.current.push(window.setTimeout(f, ms)) }
  useEffect(() => () => stop(), [])
  useEffect(() => {
    try { history.replaceState(null, '', `${location.search}#c${ci + 1}-${scene}${sub ? '-' + sub : ''}${def.timer ? '-' + left : ''}`) } catch { /* предпросмотр без истории */ }
  }, [ci, scene, sub, left, def.timer])

  const goScene = (id: SceneId) => { stop(); const d = SCENES.find(s => s.id === id)!; setScene(id); setSub(d.subs?.[0].id ?? ''); setLeft(TIMER_LEFT.normal) }
  const runPlay = () => {
    stop(); setPlay(p => p + 1)
    if (def.seq) def.seq.forEach(([s, t]) => later(t, () => setSub(s)))
    else if (def.timer) { // живой отсчёт: 12 → 0 в реальном времени, как Timer.tsx
      setLeft(12)
      for (let i = 1; i <= 12; i++) later(i * 1000, () => setLeft(12 - i))
    }
  }
  const runTour = () => {
    stop(); setTouring(true)
    TOUR.forEach(([s, sb], i) => later(i * 5200, () => { setScene(s); setSub(sb); setLeft(s === 'dense' ? 7 : TIMER_LEFT.normal); setPlay(p => p + 1) }))
    later(TOUR.length * 5200, () => setTouring(false))
  }

  const screen = <C.Screen scene={scene} sub={sub} left={left} timer={timerPhase(left)} play={play} reduced={reduced} />
  if (embed) return <div className="m2-embed"><Stage>{screen}</Stage></div>

  return (
    <div className="m2-lab">
      <header className="m2-head">
        <div className="m2-brand"><span className="m2-brand-q">Q</span><div><b>Magic 2.0 · Concept Lab</b><span>три мира одной ДНК · проектор 1920×1080 · прод не тронут</span></div></div>
        <nav className="m2-concepts" aria-label="Концепт">
          {CONCEPTS.map((c, i) => (
            <button key={c.meta.num} type="button" className={`m2-concept${i === ci ? ' is-on' : ''}`} onClick={() => setCi(i)} aria-pressed={i === ci}>
              <span className="m2-concept-n">CONCEPT {c.meta.num}</span><span className="m2-concept-name">{c.meta.name}</span>
            </button>
          ))}
        </nav>
      </header>

      <nav className="m2-scenes" aria-label="Состояние игры">
        {SCENES.map(s => (
          <button key={s.id} type="button" className={`m2-scene${s.id === scene ? ' is-on' : ''}`} onClick={() => goScene(s.id)} aria-pressed={s.id === scene}>
            <b>{s.n}</b>{s.label}
          </button>
        ))}
      </nav>

      <div className="m2-transport">
        {def.subs && <div className="m2-seg" role="group" aria-label="Подсостояние">
          {def.subs.map(x => <button key={x.id} type="button" className={x.id === sub ? 'is-on' : ''} onClick={() => { stop(); setSub(x.id) }}>{x.label}</button>)}
        </div>}
        {def.timer && <div className="m2-seg" role="group" aria-label="Таймер">
          {(['normal', 'warning', 'zero'] as TimerState[]).map(t => <button key={t} type="button" className={timerPhase(left) === t ? 'is-on' : ''} onClick={() => { stop(); setLeft(TIMER_LEFT[t]) }}>{t.toUpperCase()}</button>)}
          <span className="m2-left">{left} с</span>
        </div>}
        <div className="m2-seg">
          <button type="button" className="is-play" onClick={runPlay}>{play ? '↻ REPLAY' : '▶ PLAY'}</button>
          <button type="button" className={touring ? 'is-on' : ''} onClick={touring ? stop : runTour} title="01→06 подряд: что переживает переходы">{touring ? '■ Стоп' : '⇢ Прогон по игре'}</button>
        </div>
      </div>

      <main className="m2-preview"><Stage>{screen}</Stage></main>

      <section className="m2-card" aria-label="Описание концепта">
        <div className="m2-card-head"><span>CONCEPT {C.meta.num}</span><h1>{C.meta.name}</h1><p>{C.meta.idea}</p></div>
        <dl>
          <div><dt>Физический мир</dt><dd>{C.meta.world}</dd></div>
          <div><dt>Материалы</dt><dd><ul>{C.meta.materials.map(m => <li key={m[0]}><b>{m[0]}</b> — {m[1]}</li>)}</ul></dd></div>
          <div><dt>Что переживает переходы</dt><dd>{C.meta.persists}</dd></div>
          <div><dt>Как ведёт себя магия</dt><dd>{C.meta.behaves}</dd></div>
          <div><dt>Таймер</dt><dd>{C.meta.timer}</dd></div>
          <div><dt>Команды</dt><dd>{C.meta.teams}</dd></div>
          <div><dt>Шрифты</dt><dd>{C.meta.type}</dd></div>
        </dl>
      </section>
    </div>
  )
}
