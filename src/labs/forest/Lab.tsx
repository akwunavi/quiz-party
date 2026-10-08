// ═══ Forest Refinement Lab ═══
// Сравнение: Оригинал (лес из Cinematic Lab как есть) и три доработки A / B / C
// на одном и том же содержимом, в пяти состояниях. Прод не трогаем.
// Управление: любой выбор сразу проигрывает анимацию с начала; ползунок — ручная
// перемотка; главы — переход к моменту. Сцена сама убирает свой таймлайн при
// размонтировании — оболочка ничего не убивает (иначе гасила бы УЖЕ новую сцену:
// эффекты смены ключа срабатывают после монтажа следующей сцены).
import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Stage } from '../magic2/common'
import { Scene as Original } from '../cine7/w3'
import { Scene, type SceneApi } from './Scene'
import { STATES, TOTAL, phaseOf, type StateId } from './content'
import type { LookId } from './paint'

type Variant = 'O' | LookId
const VARIANTS: { id: Variant; name: string; note: string }[] = [
  { id: 'O', name: 'Оригинал', note: 'Лес из прошлой лаборатории без изменений — для сравнения. Посмотрите, как деревья среднего плана при наклоне отрываются от земли.' },
  { id: 'A', name: 'A · Иллюстрация', note: 'Книжная иллюстрация: тонкий контур, штриховка коры, листья с прожилками, фактура бумаги, мягкий ровный свет без размытия.' },
  { id: 'B', name: 'B · Кино', note: 'Кинокадр: дальний план не в фокусе, контровой лунный свет на стволах, сильные лучи с пылью, виньетка и плёночное зерно, медленный наезд камеры.' },
  { id: 'C', name: 'C · Живой лес', note: 'То же место, но лес действует сильнее: деревья заметно расступаются и пружинят, крона раскрывается и впускает луну, на арке распускаются цветы, от цветов-вариантов по земле расходятся кольца света.' },
]
const CHAPTERS: Record<string, string> = { A: 'Лес', B: 'Лес отзывается', C: 'Растёт арка', D: 'Вопрос и цветы', E: 'Покой' }
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
  const [labels, setLabels] = useState<[string, number][]>([])
  const api = useRef<SceneApi | null>(null)
  const ov = useRef<number | null>(null)
  const range = useRef<HTMLInputElement>(null)
  const clock = useRef<HTMLSpanElement>(null)
  const embed = /[?&]embed=1/.test(location.search)
  const firstAt = useRef(init.at)

  const paint = useCallback(() => {
    const a = api.current; if (!a) return
    const d = a.tl.labels.D
    a.setTimer(ov.current ?? (d === undefined ? TOTAL : Math.max(0, Math.min(TOTAL, TOTAL - Math.floor(Math.max(0, a.tl.time() - d))))))
    const t = a.tl.time(), dur = a.tl.duration()
    if (range.current) range.current.value = String(dur ? t / dur : 0)
    if (clock.current) {
      const cur = Object.entries(a.tl.labels).filter(([, at]) => at <= t + 0.01).sort((x, y) => y[1] - x[1])[0]?.[0]
      clock.current.textContent = `${cur ? (CHAPTERS[cur] ?? cur) + ' · ' : ''}${t.toFixed(1)} из ${dur.toFixed(0)} с`
    }
  }, [])
  const onReady = useCallback((raw: SceneApi) => {
    let a = raw
    // у оригинала нет пустой сцены — показываем его общий план (до события)
    if (v === 'O' && s !== 'mc') a = { ...raw, tl: gsap.timeline({ paused: true }).add(raw.tl.tweenFromTo(0, raw.tl.labels.B ?? 3)) }
    if (api.current && api.current.tl !== raw.tl && api.current.tl !== a.tl) api.current.tl.kill() // обёртка прошлого оригинала
    api.current = a
    setLabels(Object.entries(a.tl.labels).sort((x, y) => x[1] - y[1]))
    a.tl.eventCallback('onUpdate', () => { if (api.current === a) paint() })
    a.tl.eventCallback('onComplete', () => { if (api.current === a) setPlaying(false) })
    const at = firstAt.current; firstAt.current = ''
    if (at === 'end') { a.tl.progress(1).pause(); setPlaying(false) }
    else if (at) { a.tl.seek(Number(at)).pause(); setPlaying(false) }
    else if (!embed) { a.tl.restart(); setPlaying(true) }
    paint()
    ;(window as unknown as { __seek: (t: number) => void }).__seek = t => { a.tl.seek(Math.min(t, a.tl.duration())).pause(); paint() }
  }, [embed, paint, v, s])
  useEffect(() => { try { history.replaceState(null, '', `${location.search}#${v}-${s}`) } catch { /* превью */ } }, [v, s])

  const fresh = () => { ov.current = null; setOvr(null); setRun(r => r + 1) } // новая сцена → играет с начала
  const toggle = () => { const a = api.current; if (!a) return; if (a.tl.isActive()) { a.tl.pause(); setPlaying(false) } else { if (a.tl.progress() >= 1) a.tl.restart(); else a.tl.play(); setPlaying(true) } }
  const jump = (t: number, keepPlaying = false) => { const a = api.current; if (!a) return; a.tl.seek(t); if (keepPlaying) { a.tl.play(); setPlaying(true) } else { a.tl.pause(); setPlaying(false) } paint() }
  const setOv = (n: number | null) => { ov.current = n; setOvr(n); paint() }
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
        <div className="m2-brand"><span className="m2-brand-q">❦</span><div><b>Зачарованный лес — доработка</b><span>Выберите вариант и экран — анимация запустится сама. Ползунок под кадром — ручная перемотка.</span></div></div>
      </header>
      <div className="fr-pick">
        <span className="fr-cap">Вариант</span>
        <div className="m2-seg" role="group" aria-label="Вариант">
          {VARIANTS.map(x => <button key={x.id} type="button" className={x.id === v ? 'is-on' : ''} aria-pressed={x.id === v} onClick={() => { setV(x.id); fresh() }}>{x.name}</button>)}
        </div>
        <span className="fr-cap">Экран</span>
        <div className="m2-seg" role="group" aria-label="Экран">
          {STATES.map(x => <button key={x.id} type="button" className={x.id === s ? 'is-on' : ''} aria-pressed={x.id === s} onClick={() => { setS(x.id); fresh() }}>{x.name}</button>)}
        </div>
      </div>
      <main className="m2-preview">
        <Stage>{scene}</Stage>
        <div className="fr-player">
          <button type="button" className="fr-main" onClick={fresh}>▶ Смотреть с начала</button>
          <button type="button" onClick={toggle}>{playing ? '❚❚ Пауза' : '▶ Продолжить'}</button>
          <input ref={range} className="fr-range" type="range" min={0} max={1} step={0.001} defaultValue={0} aria-label="Перемотка"
            onInput={e => { const a = api.current; if (a) jump(Number((e.target as HTMLInputElement).value) * a.tl.duration()) }} />
          <span ref={clock} className="fr-clock" />
        </div>
        <div className="fr-chapters">
          <span className="fr-cap">Перейти к моменту</span>
          {labels.map(([k, at]) => <button key={k} type="button" onClick={() => jump(at, true)}>{CHAPTERS[k] ?? k}</button>)}
          <button type="button" title="Без анимации: сразу последний кадр, как он будет стоять во время вопроса" onClick={() => { const a = api.current; if (a) jump(a.tl.duration()) }}>Сразу результат</button>
        </div>
        <div className="fr-chapters">
          <span className="fr-cap">Проверить таймер</span>
          {([[null, 'как идёт'], [24, '24 с'], [7, '7 с — тревога'], [0, '0 — время вышло']] as const).map(([n, l]) => <button key={l} type="button" className={ovr === n ? 'is-on' : ''} onClick={() => setOv(n)}>{l}</button>)}
          <span className="fr-hint">{ovr === null ? 'таймер стартует, когда появляется вопрос' : `зафиксировано: ${ovr} с (${phaseOf(ovr) === 'zero' ? 'ноль' : phaseOf(ovr) === 'warning' ? 'последние 10 секунд' : 'обычный'})`}</span>
        </div>
      </main>
      <section className="m2-card" aria-label="О варианте">
        <div className="m2-card-head"><h1>{V.name}</h1><p>{V.note}</p></div>
        <dl>
          <div><dt>Лес отзывается</dt><dd>Ветер стихает, светлячки гаснут. Свет бежит от корней древнего дерева по мху, корням и грибам, светлячки вспыхивают вслед за волной, деревья расступаются и пружинят назад.</dd></div>
          <div><dt>Растёт арка</dt><dd>Из земли вырастают две ветви и переплетаются аркой, листья разворачиваются вслед за ростом, светлячки садятся на арку. Для фото ветвь растёт перекладиной, на лианах повисают рамы из веток.</dd></div>
          <div><dt>Вопрос и цветы</dt><dd>Слова появляются по одному. Цветы-варианты поднимаются из земли и раскрываются; буква — в сердцевине, подпись под цветком. Фото открываются, когда занавес листьев разлетается.</dd></div>
          <div><dt>Таймер</dt><dd>Одуванчик у древнего дерева: каждую секунду улетает семечко. 10 секунд — семена и число янтарные. Ноль — голый стебель.</dd></div>
        </dl>
      </section>
    </div>
  )
}
