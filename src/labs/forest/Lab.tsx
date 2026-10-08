// ═══ Forest Refinement Lab ═══
// Сравнение: Оригинал (лес из Cinematic Lab как есть) и три доработки A / B / C
// на одном и том же содержимом, в пяти состояниях. Прод не трогаем.
// Управление: любой выбор сразу проигрывает анимацию с начала; ползунок — ручная
// перемотка; главы — переход к моменту. Сцена сама убирает свой таймлайн при
// размонтировании — оболочка ничего не убивает (иначе гасила бы УЖЕ новую сцену:
// эффекты смены ключа срабатывают после монтажа следующей сцены).
import { useCallback, useEffect, useRef, useState } from 'react'
import { Stage } from '../magic2/common'
import { Scene, type SceneApi, type Mode } from './Scene'
import { STATES, TOTAL, phaseOf, type StateId } from './content'

const CHAPTERS: Record<string, string> = { A: 'Лес', B: 'Лес прислушивается', C: 'Ветви прорастают', D: 'Открывается вопрос', E: 'Покой' }
function readHash() {
  const m = /^#(quick|full)-(\w+)(?:-(end|[\d.]+))?$/.exec(location.hash)
  return { v: (m?.[1] ?? 'quick') as Mode, s: (STATES.some(x => x.id === m?.[2]) ? m![2] : 'img1opt') as StateId, at: m?.[3] ?? '' }
}

export function Lab() {
  const init = readHash()
  const [v, setV] = useState<Mode>(init.v)
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
    const a = raw
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
  }, [embed, paint])
  useEffect(() => { try { history.replaceState(null, '', `${location.search}#${v}-${s}`) } catch { /* превью */ } }, [v, s])

  const fresh = () => { ov.current = null; setOvr(null); setRun(r => r + 1) } // новая сцена → играет с начала
  const toggle = () => { const a = api.current; if (!a) return; if (a.tl.isActive()) { a.tl.pause(); setPlaying(false) } else { if (a.tl.progress() >= 1) a.tl.restart(); else a.tl.play(); setPlaying(true) } }
  const jump = (t: number, keepPlaying = false) => { const a = api.current; if (!a) return; a.tl.seek(t); if (keepPlaying) { a.tl.play(); setPlaying(true) } else { a.tl.pause(); setPlaying(false) } paint() }
  const setOv = (n: number | null) => { ov.current = n; setOvr(n); paint() }
  const scene = <div className="c7 fr" key={`${v}-${s}-${run}`}><Scene state={s} mode={v} onReady={onReady} /></div>
  if (embed) return <div className="m2-embed"><Stage>{scene}</Stage></div>
  return (
    <div className="m2-lab">
      <header className="m2-head">
        <div className="m2-brand"><span className="m2-brand-q">❦</span><div><b>Зачарованный лес · Концепт C</b><span>Выберите экран — анимация запустится сама. Ползунок под кадром — ручная перемотка.</span></div></div>
      </header>
      <div className="fr-pick">
        <span className="fr-cap">Появление</span>
        <div className="m2-seg" role="group" aria-label="Появление">
          {([['quick', 'Обычный вопрос — быстро'], ['full', 'Первый вопрос раунда — лес просыпается']] as const).map(([id, name]) => <button key={id} type="button" className={id === v ? 'is-on' : ''} aria-pressed={id === v} onClick={() => { setV(id); fresh() }}>{name}</button>)}
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
      <section className="m2-card" aria-label="Как устроено">
        <div className="m2-card-head"><h1>Концепт C · Живой лес</h1><p>Каждый вопрос появляется одной последовательностью: лес затихает, по ветви бежит свет, ветвь прорастает и выпускает лианы, вокруг кадра вырастает рама, листва в кадре расходится живым краем — и всё замирает. Фото не закрывает ничего: ни ветки, ни светлячки, ни затемнение.</p></div>
        <dl>
          <div><dt>Обычный вопрос</dt><dd>Лес уже проснулся; до читаемого кадра около трёх секунд.</dd></div>
          <div><dt>Первый вопрос раунда</dt><dd>Полное пробуждение: волна света по корням, деревья расступаются, крона раскрывается — потом то же появление вопроса.</dd></div>
          <div><dt>3 попытки</dt><dd>Как в игре в фазе 1: две картинки, клетки слова (закрытые — «?», открытые — буквой), номер фазы. Текста вопроса в этой механике нет.</dd></div>
          <div><dt>Таймер</dt><dd>Одуванчик у древнего дерева: каждую секунду улетает семечко. 10 секунд — янтарные семена и число. Ноль — голый стебель.</dd></div>
        </dl>
      </section>
    </div>
  )
}
