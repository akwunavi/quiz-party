// ═══ Forest Refinement Lab ═══
// Сравнение: Оригинал (лес из Cinematic Lab как есть) и три доработки A / B / C
// на одном и том же содержимом, в пяти состояниях. Прод не трогаем.
import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Stage } from '../magic2/common'
import { Scene as Original } from '../cine7/w3'
import { Scene, type SceneApi } from './Scene'
import { STATES, TOTAL, phaseOf, type StateId } from './content'
import type { LookId } from './paint'

type Variant = 'O' | LookId
const VARIANTS: { id: Variant; name: string; note: string }[] = [
  { id: 'O', name: 'Оригинал', note: 'Лес из Cinematic Lab без изменений — для сравнения. Здесь видна ошибка: деревья среднего плана при наклоне отрываются от земли.' },
  { id: 'A', name: 'A · Иллюстрация', note: 'Книжная иллюстрация: тонкий контур, штриховка коры, чёткие листья с прожилками, плоский мягкий свет без размытия.' },
  { id: 'B', name: 'B · Кино', note: 'Кинокадр: дальний план не в фокусе, контровой лунный свет на стволах, сильные лучи и туман, медленный наезд камеры.' },
  { id: 'C', name: 'C · Живой лес', note: 'То же место, но лес действует сильнее: деревья заметно расступаются и пружинят, крона раскрывается и впускает луну, побеги цветов закручиваются.' },
]
function readHash() {
  const m = /^#([OABC])-(\w+)(?:-(end|[\d.]+))?$/.exec(location.hash)
  return { v: (m?.[1] ?? 'B') as Variant, s: (STATES.some(x => x.id === m?.[2]) ? m![2] : 'mc') as StateId, at: m?.[3] ?? '' }
}

export function Lab() {
  const init = readHash()
  const [v, setV] = useState<Variant>(init.v)
  const [s, setS] = useState<StateId>(init.s)
  const [run, setRun] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [ovr, setOvr] = useState<number | null>(null)
  const api = useRef<SceneApi | null>(null)
  const ov = useRef<number | null>(null)
  const bar = useRef<HTMLDivElement>(null)
  const embed = /[?&]embed=1/.test(location.search)
  const paintTimer = useCallback(() => {
    const a = api.current; if (!a) return
    const d = a.tl.labels.D
    const n = ov.current ?? (d === undefined ? TOTAL : Math.max(0, Math.min(TOTAL, TOTAL - Math.floor(Math.max(0, a.tl.time() - d)))))
    a.setTimer(n)
  }, [])
  const onReady = useCallback((raw: SceneApi) => {
    let a = raw
    // у оригинала нет пустой сцены — показываем его общий план (A→B)
    if (v === 'O' && s !== 'mc') a = { ...raw, tl: gsap.timeline({ paused: true }).add(raw.tl.tweenFromTo(0, raw.tl.labels.B ?? 3)) }
    api.current = a
    a.tl.eventCallback('onUpdate', () => { paintTimer(); if (bar.current) bar.current.style.transform = `scaleX(${a.tl.progress()})` })
    a.tl.eventCallback('onComplete', () => setPlaying(false))
    const at = readHash().at
    if (at === 'end') a.tl.progress(1).pause()
    else if (at) a.tl.seek(Number(at)).pause()
    else if (!embed) { a.tl.play(); setPlaying(true) }
    paintTimer()
    ;(window as unknown as { __seek: (t: number) => void }).__seek = t => { a.tl.seek(Math.min(t, a.tl.duration())).pause(); paintTimer() }
  }, [embed, paintTimer, v, s])
  useEffect(() => () => { api.current?.dispose?.(); api.current?.tl.kill() }, [v, s, run])
  useEffect(() => { try { history.replaceState(null, '', `${location.search}#${v}-${s}`) } catch { /* превью */ } }, [v, s])

  const reset = () => { ov.current = null; setOvr(null); setPlaying(false) }
  const replay = () => { reset(); setRun(r => r + 1) }
  const toggle = () => { const a = api.current; if (!a) return; if (a.tl.isActive()) { a.tl.pause(); setPlaying(false) } else { if (a.tl.progress() >= 1) a.tl.restart(); else a.tl.play(); setPlaying(true) } }
  const toEnd = () => { const a = api.current; if (!a) return; a.tl.progress(1).pause(); setPlaying(false); paintTimer() }
  const setOv = (n: number | null) => { ov.current = n; setOvr(n); paintTimer() }
  const V = VARIANTS.find(x => x.id === v)!
  const scene = (
    <div className={v === 'O' ? 'c7 c7-3' : 'c7 fr'} key={`${v}-${s}-${run}`}>
      {v === 'O' ? <Original onReady={onReady} /> : <Scene look={v} state={s} onReady={onReady} />}
      {v === 'O' && s !== 'mc' && s !== 'empty' && <div className="fr-none">В оригинале экрана с фото не было — сравнивайте A, B и C</div>}
    </div>
  )
  if (embed) return <div className="m2-embed"><Stage>{scene}</Stage></div>
  return (
    <div className="m2-lab">
      <header className="m2-head">
        <div className="m2-brand"><span className="m2-brand-q">❦</span><div><b>Magic 2.0 · Зачарованный лес — доработка</b><span>Оригинал и три обработки на одном содержимом, пять состояний, проектор 1920×1080</span></div></div>
      </header>
      <nav className="m2-concepts fr-variants" aria-label="Обработка">
        {VARIANTS.map(x => (
          <button key={x.id} type="button" className={`m2-concept${x.id === v ? ' is-on' : ''}`} aria-pressed={x.id === v} onClick={() => { setV(x.id); reset() }}>
            <span className="m2-concept-name">{x.name}</span>
          </button>
        ))}
      </nav>
      <div className="m2-transport">
        <div className="m2-seg" role="group" aria-label="Состояние">
          {STATES.map(x => <button key={x.id} type="button" className={x.id === s ? 'is-on' : ''} onClick={() => { setS(x.id); reset() }}>{x.name}</button>)}
        </div>
        <div className="m2-seg">
          <button type="button" className="is-play" onClick={replay}>↻ Сначала</button>
          <button type="button" onClick={toggle}>{playing ? '❚❚ Пауза' : '▶ Играть'}</button>
          <button type="button" onClick={toEnd}>⏭ Итоговый кадр</button>
        </div>
        <div className="m2-seg" role="group" aria-label="Таймер">
          {([[null, 'живой'], [24, '24 с'], [7, '7 с'], [0, '0']] as const).map(([n, l]) => <button key={l} type="button" className={ovr === n ? 'is-on' : ''} onClick={() => setOv(n)}>{l}</button>)}
          <span className="m2-left">{ovr === null ? 'таймер идёт с появления вопроса' : phaseOf(ovr)}</span>
        </div>
      </div>
      <main className="m2-preview"><div className="fr-progress"><div ref={bar} /></div><Stage>{scene}</Stage></main>
      <section className="m2-card" aria-label="Об обработке">
        <div className="m2-card-head"><h1>{V.name}</h1><p>{V.note}</p></div>
        <dl>
          <div><dt>Событие</dt><dd>Лес затихает: ветер стихает, светлячки гаснут. Свет бежит от корней древнего дерева по мху, корням и грибам, светлячки вспыхивают синхронной волной, деревья расступаются и пружинят назад.</dd></div>
          <div><dt>Перестройка</dt><dd>Из земли у ствола вырастают две ветви и переплетаются аркой; листья разворачиваются вслед за ростом, светлячки садятся на арку. Для фото ветвь вырастает перекладиной, на лианах повисают рамы из веток.</dd></div>
          <div><dt>Вопрос</dt><dd>Слова «прорастают» по одному. Цветы-варианты поднимаются из земли, раскрывают два круга лепестков; буква — в сердцевине, подпись под цветком. Фото открываются, когда занавес листьев разлетается наружу.</dd></div>
          <div><dt>Таймер</dt><dd>Одуванчик у древнего дерева: каждую секунду улетает семечко, число — в тёмной сердцевине. 10 секунд — семена и число янтарные. Ноль — голый стебель.</dd></div>
        </dl>
      </section>
    </div>
  )
}
