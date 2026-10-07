// ═══ New Year Mockup Lab · Фаза 2 ═══
// Три мира (Concept 2 / 3 / 4) × 14 настоящих состояний игры. Логика и
// содержимое — общие и сверены с продакшном (game/states.ts), визуальный
// слой — свой у каждого мира. Игровой движок не подключается: только чистые
// функции и типы (кроссворд, «Скрэмбл», рулетка, раскладка блица).
import { useEffect, useState } from 'react'
import { CONCEPTS } from './concepts'
import { STATES } from './game/states'
import { KitProvider } from './game/kit'
import { TimerModeCtx, demoSpeed, type TimerMode } from './game/timer'
import { Stage } from './engine/stage'

function useSystemReducedMotion() {
  const q = '(prefers-reduced-motion: reduce)'
  const [v, setV] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(q).matches)
  useEffect(() => {
    const m = matchMedia(q)
    const on = () => setV(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return v
}

const readHash = () => {
  const m = /^#c([234])s(\d\d)$/.exec(location.hash)
  const c = m ? CONCEPTS.findIndex(x => x.meta.num === Number(m[1])) : 0
  const s = m ? STATES.findIndex(x => x.n === m[2]) : 0
  return { c: Math.max(0, c), s: Math.max(0, s) }
}

const TIMER_MODES: { id: TimerMode; label: string }[] = [
  { id: 'run', label: '▶ Ход' }, { id: 'start', label: 'START' }, { id: 'warn', label: 'WARNING' }, { id: 'zero', label: 'ZERO' },
]

export function Lab() {
  const init = readHash()
  const [ci, setCi] = useState(init.c)
  const [si, setSi] = useState(init.s)
  const [playKey, setPlayKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedToggle, setReducedToggle] = useState(false)
  const [tmode, setTmode] = useState<TimerMode>('run')
  const sysReduced = useSystemReducedMotion()
  const reduced = reducedToggle || sysReduced
  const concept = CONCEPTS[ci]
  const st = STATES[si]
  const C = st.C

  const go = (c: number, s: number) => {
    setCi(c); setSi(s); setPaused(false); setTmode('run'); setPlayKey(k => k + 1)
    try { history.replaceState(null, '', `#c${CONCEPTS[c].meta.num}s${STATES[s].n}`) } catch { /* предпросмотр без истории */ }
  }
  const replay = () => { setPaused(false); setTmode('run'); setPlayKey(k => k + 1) }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return
      if (/^[234]$/.test(e.key)) go(CONCEPTS.findIndex(x => x.meta.num === Number(e.key)), si)
      else if (e.key === 'ArrowRight') go(ci, (si + 1) % STATES.length)
      else if (e.key === 'ArrowLeft') go(ci, (si - 1 + STATES.length) % STATES.length)
      else if (e.key === ' ') { e.preventDefault(); setPaused(p => !p) }
      else if (e.key.toLowerCase() === 'r' || e.key.toLowerCase() === 'к') replay()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const m = concept.meta
  return (
    <div className="nyl-lab">
      <header className="nyl-head">
        <div className="nyl-brand">
          <span className="nyl-brand-mark" aria-hidden="true">✳</span>
          <div>
            <div className="nyl-brand-name">Quiz Party · New Year · Фаза 2</div>
            <div className="nyl-brand-sub">Три мира × 14 настоящих состояний игры. Логика и содержимое — как в продакшне, меняется только визуальный слой</div>
          </div>
        </div>
        <nav className="nyl-concepts is-three" aria-label="Концепции">
          {CONCEPTS.map((c, i) => (
            <button key={c.meta.id} type="button" className={`nyl-concept${i === ci ? ' is-on' : ''}`} aria-pressed={i === ci} onClick={() => go(i, si)}>
              <span className="nyl-concept-num">Concept {c.meta.num}</span>
              <span className="nyl-concept-name">{c.meta.name}</span>
            </button>
          ))}
        </nav>
      </header>

      <nav className="nyl-states" aria-label="Состояния игры">
        {STATES.map((s, i) => (
          <button key={s.id} type="button" className={`nyl-state${i === si ? ' is-on' : ''}`} aria-pressed={i === si} onClick={() => go(ci, i)}>
            <span className="nyl-state-n">{s.n}</span>{s.label}
          </button>
        ))}
      </nav>

      <div className="nyl-bar">
        <div className="nyl-transport">
          <button type="button" className="nyl-tp" onClick={() => setPaused(p => !p)}>{paused ? '▶ Play' : '❚❚ Pause'}</button>
          <button type="button" className="nyl-tp" onClick={replay}>↻ Replay</button>
          <label className={`nyl-tp nyl-toggle${reduced ? ' is-on' : ''}`}>
            <input id="nyl-reduced" type="checkbox" checked={reduced} disabled={sysReduced} onChange={e => setReducedToggle(e.target.checked)} />
            Без движения{sysReduced ? ' (системная настройка)' : ''}
          </label>
        </div>
        {st.timer && (
          <div className="nyl-timerdemo" role="group" aria-label="Состояние таймера (только показ)">
            <span className="nyl-timerdemo-cap">Таймер: {st.timer.seconds} с — {st.timer.what} · показ ×{demoSpeed(st.timer.seconds)}</span>
            {TIMER_MODES.map(x => (
              <button key={x.id} type="button" className={`nyl-tm${tmode === x.id ? ' is-on' : ''}`} aria-pressed={tmode === x.id}
                onClick={() => { setTmode(x.id); if (x.id === 'run') setPlayKey(k => k + 1) }}>{x.label}</button>
            ))}
          </div>
        )}
      </div>

      <main className="nyl-main">
        <KitProvider value={concept.kit}>
          <TimerModeCtx.Provider value={tmode}>
            <Stage key={`${ci}-${si}-${playKey}-${reduced}`} paused={paused} reduced={reduced} className={`nyl-c${m.num} nyl-s-${st.id}`}>
              <C />
            </Stage>
          </TimerModeCtx.Provider>
        </KitProvider>
        <p className="nyl-keys">Клавиши: 2 / 3 / 4 — мир, ← → — состояние, пробел — пауза, R — повтор. Таймеры проигрываются ускоренно; логика (целые секунды, «мало времени» с 10 с, ноль) — как в игре.</p>
      </main>

      <section className="nyl-notes" aria-label="Описание состояния">
        <div className="nyl-notes-state">
          <div className="nyl-notes-kicker">{st.n} · {st.label} · как в игре</div>
          <p className="nyl-notes-real">{st.real}</p>
          <p className="nyl-notes-src">Сверено с: {st.src}</p>
        </div>
        <div className="nyl-notes-concept">
          <div className="nyl-notes-kicker">Concept {m.num} · {m.name} · в этом состоянии</div>
          <p className="nyl-notes-here">{m.states[st.id]}</p>
        </div>
        <dl className="nyl-notes-grid">
          <div><dt>Контейнеры</dt><dd>{m.containers}</dd></div>
          <div><dt>Медиа</dt><dd>{m.media}</dd></div>
          <div><dt>Варианты</dt><dd>{m.options}</dd></div>
          <div><dt>Таймер</dt><dd>{m.timer}</dd></div>
          <div><dt>Переходы</dt><dd>{m.transitions}</dd></div>
          <div><dt>Разбор ответа</dt><dd>{m.reveal}</dd></div>
          <div><dt>Плотные / пустые экраны</dt><dd>{m.density}</dd></div>
          <div><dt>Ели</dt><dd>{m.trees}</dd></div>
        </dl>
        <div className="nyl-hier">
          <div><span>1 · Игра</span>{m.hierarchy.primary}</div>
          <div><span>2 · Состояние / таймер</span>{m.hierarchy.secondary}</div>
          <div><span>3 · Атмосфера</span>{m.hierarchy.atmosphere}</div>
        </div>
      </section>
    </div>
  )
}
