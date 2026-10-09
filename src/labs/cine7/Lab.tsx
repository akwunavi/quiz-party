// ═══ Cinematic Direction Lab ═══
// Семь миров, по одной непрерывной последовательности на мир. Содержимое
// вопроса одинаковое. Можно играть, переигрывать, ставить на паузу, прыгать
// на устойчивый финальный кадр и по главам A–E. Прод не трогаем.
import { useCallback, useEffect, useRef, useState } from 'react'
import { Stage } from '../magic2/common'
import { WORLDS } from './worlds'
import { QUESTION, phaseOf, type SceneApi } from './kit'

const CH = [['A', 'Общий план'], ['B', 'Событие'], ['C', 'Перестройка'], ['D', 'Вопрос'], ['E', 'Итог']] as const

function readHash() {
  const m = /^#w(\d)(?:-([a-z0-9.]+))?$/.exec(location.hash)
  return { wi: m ? Math.max(0, Math.min(WORLDS.length - 1, Number(m[1]) - 1)) : 0, at: m?.[2] ?? '' }
}

export function Lab() {
  const init = readHash()
  const [wi, setWi] = useState(init.wi)
  const [run, setRun] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [override, setOverride] = useState<number | null>(null)
  const api = useRef<SceneApi | null>(null)
  const bar = useRef<HTMLDivElement>(null)
  const ov = useRef<number | null>(null)
  const embed = /[?&]embed=1/.test(location.search)
  const W = WORLDS[wi]

  const paintTimer = useCallback(() => {
    const a = api.current; if (!a) return
    const d = a.tl.labels.D ?? 0
    const n = ov.current ?? Math.max(0, Math.min(QUESTION.total, QUESTION.total - Math.floor(Math.max(0, a.tl.time() - d))))
    a.setTimer(n)
  }, [])
  const onReady = useCallback((a: SceneApi) => {
    api.current = a
    a.tl.eventCallback('onUpdate', () => { paintTimer(); if (bar.current) bar.current.style.transform = `scaleX(${a.tl.progress()})` })
    a.tl.eventCallback('onComplete', () => setPlaying(false))
    const at = readHash().at
    if (at === 'end') a.tl.progress(1).pause()
    else if (at && /^[A-E]$/.test(at)) a.tl.seek(at).pause()
    else if (at && !isNaN(Number(at))) a.tl.seek(Number(at)).pause()
    else if (!embed) { a.tl.play(); setPlaying(true) }
    paintTimer()
    ;(window as unknown as { __seek: (t: number | string) => void }).__seek = t => { a.tl.seek(t as number).pause(); paintTimer() }
  }, [embed, paintTimer])
  // убирать таймлайн здесь НЕЛЬЗЯ: эффект смены ключа срабатывает уже после монтажа
  // новой сцены и гасил бы её (кнопки «Сначала»/смена мира замораживали кадр). Сцена убирает себя сама.
  useEffect(() => { try { history.replaceState(null, '', `${location.search}#w${wi + 1}`) } catch { /* превью */ } }, [wi])

  const replay = () => { ov.current = null; setOverride(null); setRun(r => r + 1) }
  const toggle = () => { const a = api.current; if (!a) return; if (a.tl.isActive()) { a.tl.pause(); setPlaying(false) } else { if (a.tl.progress() >= 1) a.tl.restart(); else a.tl.play(); setPlaying(true) } }
  const toEnd = () => { const a = api.current; if (!a) return; a.tl.progress(1).pause(); setPlaying(false); paintTimer() }
  const seek = (l: string) => { const a = api.current; if (!a) return; a.tl.seek(l).pause(); setPlaying(false); paintTimer() }
  const setOv = (n: number | null) => { ov.current = n; setOverride(n); paintTimer() }

  const scene = <div className={`c7 c7-${W.num}`} key={`${wi}-${run}`}><W.Scene onReady={onReady} /></div>
  if (embed) return <div className="m2-embed"><Stage>{scene}</Stage></div>
  return (
    <div className="m2-lab">
      <header className="m2-head">
        <div className="m2-brand"><span className="m2-brand-q">◐</span><div><b>Magic 2.0 · Cinematic Direction Lab</b><span>Четыре мира по одной непрерывной сцене: общий план, чудо, перестройка, вопрос, итог</span></div></div>
      </header>
      <nav className="m2-concepts c7-worlds" aria-label="Мир">
        {WORLDS.map((w, i) => (
          <button key={w.num} type="button" className={`m2-concept${i === wi ? ' is-on' : ''}`} onClick={() => { setWi(i); ov.current = null; setOverride(null); setPlaying(false) }} aria-pressed={i === wi}>
            <span className="m2-concept-n">0{w.num}{w.num === 3 ? ' · образец' : ' · заново'}</span><span className="m2-concept-name">{w.name}</span>
          </button>
        ))}
      </nav>
      <div className="m2-transport">
        <div className="m2-seg">
          <button type="button" className="is-play" onClick={replay}>↻ Сначала</button>
          <button type="button" onClick={toggle}>{playing ? '❚❚ Пауза' : '▶ Играть'}</button>
          <button type="button" onClick={toEnd}>⏭ Итоговый кадр</button>
        </div>
        <div className="m2-seg" role="group" aria-label="Главы">{CH.map(([k, l]) => <button key={k} type="button" onClick={() => seek(k)}>{k} · {l}</button>)}</div>
        <div className="m2-seg" role="group" aria-label="Таймер">
          {([[null, 'живой'], [24, '24 с'], [7, '7 с'], [0, '0']] as const).map(([v, l]) => <button key={l} type="button" className={override === v ? 'is-on' : ''} onClick={() => setOv(v)}>{l}</button>)}
          <span className="m2-left">{override === null ? 'таймер от метки D' : phaseOf(override)}</span>
        </div>
      </div>
      <main className="m2-preview"><div className="c7-progress"><div ref={bar} /></div><Stage>{scene}</Stage></main>
      <section className="m2-card" aria-label="О мире">
        <div className="m2-card-head"><span>МИР 0{W.num}</span><h1>{W.name}</h1><p>{W.law}</p></div>
        <dl>
          <div><dt>Событие</dt><dd>{W.event}</dd></div>
          <div><dt>Перестройка</dt><dd>{W.transform}</dd></div>
          <div><dt>Как появляется вопрос</dt><dd>{W.question}</dd></div>
          <div><dt>Таймер</dt><dd>{W.timer}</dd></div>
          <div><dt>Свет, цвет, материал</dt><dd>{W.look}</dd></div>
          <div><dt>Шрифт</dt><dd>{W.type}</dd></div>
        </dl>
      </section>
    </div>
  )
}
