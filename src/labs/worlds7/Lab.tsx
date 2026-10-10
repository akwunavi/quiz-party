// ═══ Seven Worlds · Art Direction Lab ═══
// Семь самостоятельных магических миров × одни и те же сцены игры.
// Переключение мира НЕ сбрасывает сцену, подсостояние и таймер.
// Игровой движок не подключается: только тестовые данные в формах продакшна.
import { useEffect, useRef, useState } from 'react'
import { Stage } from '../magic2/common'
import { QUESTION, phaseOf, type Phase, type SceneId } from './content'
import { WORLDS } from './worlds'

type Def = { id: SceneId; n: string; label: string; subs: [string, string][]; timer?: boolean; left?: number; seq?: [string, number][] }
const SCENES: Def[] = [
  { id: 'lobby0', n: '1', label: 'Лобби · 0 команд', subs: [] },
  { id: 'lobby12', n: '2', label: 'Лобби · 12 команд', subs: [['idle', 'ЖДЁМ'], ['join', 'ВХОДИТ НОВАЯ']], seq: [['idle', 0], ['join', 800]] },
  { id: 'qn', n: '3', label: 'Вопрос · таймер', subs: [], timer: true, left: 24 },
  { id: 'qw', n: '4', label: 'Вопрос · последние 10 с', subs: [], timer: true, left: 7 },
  { id: 'answer', n: '5', label: 'Показ ответа', subs: [['before', 'ДО'], ['reveal', 'ОТВЕТ']], seq: [['before', 0], ['reveal', 900]] },
  { id: 'jp', n: '6', label: '«Своя игра»', subs: [['board', 'ДОСКА'], ['select', 'ВЫБОР'], ['open', 'ВОПРОС']], seq: [['board', 0], ['select', 1000], ['open', 3000]] },
  { id: 'melody', n: '7', label: '«Угадай мелодию»', subs: [['board', 'ТРЕКИ'], ['select', 'ВЫБОР'], ['active', 'ИГРАЕТ']], seq: [['board', 0], ['select', 1000], ['active', 3400]] },
  { id: 'timer', n: 'T', label: 'Таймер · 3 состояния', subs: [['all', 'ВСЕ ТРИ'], ['live', 'ЖИВОЙ']], timer: true, left: 24 },
]

function readHash() {
  const m = /^#w(\d)-([a-z0-9]+)-?([a-z]*)-?(\d*)$/.exec(location.hash)
  const wi = m ? Math.max(0, Math.min(WORLDS.length - 1, Number(m[1]) - 1)) : 0
  const d = SCENES.find(s => s.id === m?.[2]) ?? SCENES[0]
  const sub = d.subs.some(x => x[0] === m?.[3]) ? m![3] : d.subs[0]?.[0] ?? ''
  return { wi, sc: d.id, sub, left: m?.[4] ? Number(m[4]) : d.left ?? 24 }
}

export function Lab() {
  const init = readHash()
  const [wi, setWi] = useState(init.wi)
  const [sc, setSc] = useState<SceneId>(init.sc)
  const [sub, setSub] = useState(init.sub)
  const [left, setLeft] = useState(init.left)
  const [play, setPlay] = useState(0)
  const timers = useRef<number[]>([])
  const embed = /[?&]embed=1/.test(location.search)
  const def = SCENES.find(s => s.id === sc)!
  const W = WORLDS[wi]

  const stop = () => { timers.current.forEach(t => clearTimeout(t)); timers.current = [] }
  const later = (ms: number, f: () => void) => { timers.current.push(window.setTimeout(f, ms)) }
  useEffect(() => () => stop(), [])
  useEffect(() => {
    try { history.replaceState(null, '', `${location.search}#w${wi + 1}-${sc}${sub ? '-' + sub : ''}${def.timer ? '-' + left : ''}`) } catch { /* превью без истории */ }
  }, [wi, sc, sub, left, def.timer])

  const goScene = (id: SceneId) => { stop(); const d = SCENES.find(s => s.id === id)!; setSc(id); setSub(d.subs[0]?.[0] ?? ''); setLeft(d.left ?? 24); setPlay(p => p + 1) }
  const runPlay = () => {
    stop(); setPlay(p => p + 1)
    if (def.seq) def.seq.forEach(([s, t]) => later(t, () => setSub(s)))
    if (def.timer) {
      if (sc === 'timer') setSub('live')
      const from = sc === 'qn' ? 14 : 12
      setLeft(from)
      for (let i = 1; i <= from; i++) later(i * 1000, () => setLeft(from - i))
    }
  }

  const view = <div className={`w7 w7-${W.meta.num}`} key={`${wi}-${play}`}><W.View scene={sc} sub={sub} left={left} phase={phaseOf(left)} play={play} /></div>
  if (embed) return <div className="m2-embed"><Stage>{view}</Stage></div>

  return (
    <div className="m2-lab">
      <header className="m2-head">
        <div className="m2-brand"><span className="m2-brand-q">7</span><div><b>Magic 2.0 · Seven Worlds · Art Direction Lab</b><span>семь миров · одни и те же сцены и данные · проектор 1920×1080 · прод не тронут</span></div></div>
      </header>
      <nav className="m2-concepts w7-worlds" aria-label="Мир">
        {WORLDS.map((w, i) => (
          <button key={w.meta.num} type="button" className={`m2-concept${i === wi ? ' is-on' : ''}`} onClick={() => setWi(i)} aria-pressed={i === wi}>
            <span className="m2-concept-n">WORLD 0{w.meta.num}</span><span className="m2-concept-name">{w.meta.name}</span>
          </button>
        ))}
      </nav>
      <nav className="m2-scenes" aria-label="Сцена">
        {SCENES.map(s => (
          <button key={s.id} type="button" className={`m2-scene${s.id === sc ? ' is-on' : ''}`} onClick={() => goScene(s.id)} aria-pressed={s.id === sc}><b>{s.n}</b>{s.label}</button>
        ))}
      </nav>
      <div className="m2-transport">
        {def.subs.length > 0 && <div className="m2-seg" role="group" aria-label="Подсостояние">
          {def.subs.map(([id, l]) => <button key={id} type="button" className={id === sub ? 'is-on' : ''} onClick={() => { stop(); setSub(id) }}>{l}</button>)}
        </div>}
        {def.timer && <div className="m2-seg" role="group" aria-label="Таймер">
          {([['normal', 24], ['warning', 7], ['zero', 0]] as [Phase, number][]).map(([t, v]) => <button key={t} type="button" className={phaseOf(left) === t ? 'is-on' : ''} onClick={() => { stop(); setLeft(v) }}>{t.toUpperCase()}</button>)}
          <span className="m2-left">{left} с из {QUESTION.total}</span>
        </div>}
        <div className="m2-seg"><button type="button" className="is-play" onClick={runPlay}>{play ? '↻ REPLAY' : '▶ PLAY'}</button></div>
      </div>
      <main className="m2-preview"><Stage>{view}</Stage></main>
      <section className="m2-card" aria-label="О мире">
        <div className="m2-card-head"><span>WORLD 0{W.meta.num}</span><h1>{W.meta.name}</h1><p>{W.meta.idea}</p></div>
        <dl>
          <div><dt>Место</dt><dd>{W.meta.place}</dd></div>
          <div><dt>Законы магии</dt><dd>{W.meta.laws}</dd></div>
          <div><dt>Материалы и свет</dt><dd>{W.meta.materials}</dd></div>
          <div><dt>Таймер</dt><dd>{W.meta.timer}</dd></div>
          <div><dt>«Своя игра»</dt><dd>{W.meta.jp}</dd></div>
          <div><dt>«Угадай мелодию»</dt><dd>{W.meta.melody}</dd></div>
          <div><dt>Команды</dt><dd>{W.meta.teams}</dd></div>
          <div><dt>Шрифт</dt><dd>{W.meta.type}</dd></div>
        </dl>
      </section>
    </div>
  )
}
