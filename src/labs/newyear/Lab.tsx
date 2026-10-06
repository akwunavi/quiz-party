// ═══ New Year Mockup Lab ═══
// Изолированный визуальный эксперимент: пять миров × восемь экранов.
// Игровой движок не импортируется вообще — только демо-содержимое.
import { useEffect, useState } from 'react'
import { SCREENS, type ScreenId } from './content'
import { CONCEPTS } from './concepts'
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
  const m = /^#c([1-5])-?([a-z]+)?$/.exec(location.hash)
  const c = m ? Number(m[1]) - 1 : 0
  const s = (m?.[2] && SCREENS.some(x => x.id === m[2]) ? m[2] : 'lobby') as ScreenId
  return { c, s }
}

export function Lab() {
  const init = readHash()
  const [ci, setCi] = useState(init.c)
  const [screen, setScreen] = useState<ScreenId>(init.s)
  const [playKey, setPlayKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedToggle, setReducedToggle] = useState(false)
  const sysReduced = useSystemReducedMotion()
  const reduced = reducedToggle || sysReduced
  const concept = CONCEPTS[ci]
  const C = concept.Screen

  const go = (c: number, s: ScreenId) => {
    setCi(c); setScreen(s); setPaused(false); setPlayKey(k => k + 1)
    try { history.replaceState(null, '', `#c${c + 1}${s}`) } catch { /* предпросмотр без истории */ }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return
      const idx = SCREENS.findIndex(s => s.id === screen)
      if (/^[1-5]$/.test(e.key)) go(Number(e.key) - 1, screen)
      else if (e.key === 'ArrowRight') go(ci, SCREENS[(idx + 1) % SCREENS.length].id)
      else if (e.key === 'ArrowLeft') go(ci, SCREENS[(idx - 1 + SCREENS.length) % SCREENS.length].id)
      else if (e.key === ' ') { e.preventDefault(); setPaused(p => !p) }
      else if (e.key.toLowerCase() === 'r' || e.key.toLowerCase() === 'к') { setPaused(false); setPlayKey(k => k + 1) }
      else return
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
            <div className="nyl-brand-name">Quiz Party · New Year</div>
            <div className="nyl-brand-sub">Mockup Lab — пять миров, восемь экранов, не для продакшна</div>
          </div>
        </div>
        <nav className="nyl-concepts" aria-label="Концепции">
          {CONCEPTS.map((c, i) => (
            <button key={c.meta.id} type="button" className={`nyl-concept${i === ci ? ' is-on' : ''}`}
              aria-pressed={i === ci} onClick={() => go(i, screen)}>
              <span className="nyl-concept-num">Concept {c.meta.num}</span>
              <span className="nyl-concept-name">{c.meta.name}</span>
            </button>
          ))}
        </nav>
      </header>

      <div className="nyl-bar">
        <nav className="nyl-screens" aria-label="Экраны">
          {SCREENS.map(s => (
            <button key={s.id} type="button" className={`nyl-screen-btn${s.id === screen ? ' is-on' : ''}`}
              aria-pressed={s.id === screen} onClick={() => go(ci, s.id)}>{s.label}</button>
          ))}
        </nav>
        <div className="nyl-transport">
          <button type="button" className="nyl-tp" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Play' : 'Pause'}>
            {paused ? '▶ Play' : '❚❚ Pause'}
          </button>
          <button type="button" className="nyl-tp" onClick={() => { setPaused(false); setPlayKey(k => k + 1) }}>↻ Replay</button>
          <label className={`nyl-tp nyl-toggle${reduced ? ' is-on' : ''}`} title="Как экран выглядит у тех, кто отключил анимацию в системе">
            <input id="nyl-reduced" type="checkbox" checked={reduced} disabled={sysReduced}
              onChange={e => setReducedToggle(e.target.checked)} />
            Без движения{sysReduced ? ' (системная настройка)' : ''}
          </label>
        </div>
      </div>

      <main className="nyl-main">
        <Stage key={`${ci}-${screen}-${playKey}-${reduced}`} paused={paused} reduced={reduced} className={`nyl-c${m.num}`}>
          <C screen={screen} />
        </Stage>
        <p className="nyl-keys">Клавиши: 1–5 — концепция, ← → — экран, пробел — пауза, R — повтор</p>
      </main>

      <section className="nyl-notes" aria-label="Описание концепции">
        <div className="nyl-notes-head">
          <div className="nyl-notes-kicker">Concept {m.num}</div>
          <h2 className="nyl-notes-title">{m.name}</h2>
          <p className="nyl-notes-tag">{m.tagline}</p>
          <p className="nyl-notes-idea">{m.idea}</p>
        </div>
        <dl className="nyl-notes-grid">
          <div><dt>Метафора</dt><dd>{m.metaphor}</dd></div>
          <div><dt>Композиция</dt><dd>{m.composition}</dd></div>
          <div><dt>Свет</dt><dd>{m.light}</dd></div>
          <div><dt>Материалы</dt><dd>{m.materials}</dd></div>
          <div><dt>Ели</dt><dd>{m.trees}</dd></div>
          <div><dt>Язык движения</dt><dd>{m.motion}</dd></div>
          <div><dt>Переходы</dt><dd>{m.transitions}</dd></div>
          <div><dt>Special</dt><dd>{m.special}</dd></div>
        </dl>
        <div className="nyl-hier">
          <div><span>Primary</span>{m.hierarchy.primary}</div>
          <div><span>Secondary</span>{m.hierarchy.secondary}</div>
          <div><span>Atmosphere</span>{m.hierarchy.atmosphere}</div>
        </div>
      </section>
    </div>
  )
}
