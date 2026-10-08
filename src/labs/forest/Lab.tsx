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
import { Scene as SceneV6 } from './SceneV6'
import { Sprint, SPRINT_STATES, SPRINT_VARIANTS } from './stage1/Sprint'
import { Blitz, BLITZ_STATES, BLITZ_VARIANTS } from './stage1/Blitz'
import { Reveal3, REVEAL_STATES, REVEAL_VARIANTS } from './stage1/Reveal3'
import type { S1Props, Variant } from './stage1/common'

type Sec = 'media' | 'sprint' | 'blitz' | 'reveal'
type Mech = { name: string; C: (p: S1Props) => JSX.Element; states: { id: string; name: string }[]; variants: { id: string; name: string; note: string }[]; normal: number; /** выбранная ведущим композиция — основная */ pick: Variant }
const MECHS: Record<Exclude<Sec, 'media'>, Mech> = {
  sprint: { name: '120 секунд', C: Sprint, states: SPRINT_STATES, variants: SPRINT_VARIANTS, normal: 87, pick: 'A' },
  blitz: { name: 'Блиц', C: Blitz, states: BLITZ_STATES, variants: BLITZ_VARIANTS, normal: 38, pick: 'C' },
  reveal: { name: 'Три попытки', C: Reveal3, states: REVEAL_STATES, variants: REVEAL_VARIANTS, normal: 24, pick: 'A' },
}
const SECS: [Sec, string][] = [['media', 'Вопросы с фото · утверждено'], ['sprint', 'Этап 1 · 120 секунд'], ['blitz', 'Этап 1 · Блиц'], ['reveal', 'Этап 1 · Три попытки']]
function readMech() {
  const m = /^#s1-(sprint|blitz|reveal)-([ABC])-(\w+?)(?:-n(\d+))?(?:-(end|[\d.]+))?$/.exec(location.hash)
  return m ? { sec: m[1] as Sec, mv: m[2] as Variant, ms: m[3], teams: Number(m[4] ?? 5), at: m[5] ?? '' } : null
}
import { STATES, TOTAL, phaseOf, type StateId } from './content'

const CHAPTERS: Record<string, string> = { A: 'Лес', B: 'Лес прислушивается', C: 'Ветви прорастают', D: 'Открывается вопрос', E: 'Вопрос на экране', R: 'Ответ' }
const CHAPTERS_S1: Record<string, string> = { A: 'Начало', E: 'Устойчивый кадр' }
type Ver = 'new' | 'old'
function readHash() {
  const m = /^#(?:(new|old|ans)-)?(quick|full)-(\w+)(?:-(end|[\d.]+))?$/.exec(location.hash)
  return { ver: (m?.[1] === 'old' ? 'old' : 'new') as Ver, ans: m?.[1] === 'ans', v: (m?.[2] ?? 'quick') as Mode, s: (STATES.some(x => x.id === m?.[3]) ? m![3] : 'two') as StateId, at: m?.[4] ?? '' }
}

export function Lab() {
  const init = readHash()
  const [v, setV] = useState<Mode>(init.v)
  const [ver, setVer] = useState<Ver>(init.ver)
  const [answer, setAnswer] = useState(init.ans)
  const startAt = useRef('')
  const im = readMech()
  const [sec, setSec] = useState<Sec>(im?.sec ?? 'media')
  const [mv, setMv] = useState<Variant>(im?.mv ?? 'A')
  const [ms, setMs] = useState<string>(im?.ms ?? 'active')
  const [teams, setTeams] = useState<number>(im?.teams ?? 5)
  const secRef = useRef(sec); secRef.current = sec
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
  const firstAt = useRef(readMech()?.at ?? init.at)

  const paint = useCallback(() => {
    const a = api.current; if (!a) return
    const d = a.tl.labels.D
    if (secRef.current !== 'media') a.setTimer(ov.current ?? 999) // механики этапа 1 ведут свой таймер; 999 — без подмены
    else a.setTimer(ov.current ?? (d === undefined ? TOTAL : Math.max(0, Math.min(TOTAL, TOTAL - Math.floor(Math.max(0, a.tl.time() - d))))))
    const t = a.tl.time(), dur = a.tl.duration()
    if (range.current) range.current.value = String(dur ? t / dur : 0)
    if (clock.current) {
      const cur = Object.entries(a.tl.labels).filter(([, at]) => at <= t + 0.01).sort((x, y) => y[1] - x[1])[0]?.[0]
      clock.current.textContent = `${cur ? ((secRef.current === 'media' ? CHAPTERS : CHAPTERS_S1)[cur] ?? cur) + ' · ' : ''}${t.toFixed(1)} из ${dur.toFixed(0)} с`
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
    else if (startAt.current && a.tl.labels[startAt.current] !== undefined) { a.tl.play(startAt.current); setPlaying(true) }
    else if (!embed) { a.tl.restart(); setPlaying(true) }
    startAt.current = ''
    paint()
    ;(window as unknown as { __seek: (t: number) => void }).__seek = t => { a.tl.seek(Math.min(t, a.tl.duration())).pause(); paint() }
    ;(window as unknown as { __setN: (n: number) => void }).__setN = n => { ov.current = n; paint() } // для съёмки состояний таймера
  }, [embed, paint])
  useEffect(() => { try { history.replaceState(null, '', `${location.search}#${sec === 'media' ? `${ver}-${v}-${s}` : `s1-${sec}-${mv}-${ms}${sec === 'blitz' && mv === 'C' && teams !== 5 ? `-n${teams}` : ''}`}`) } catch { /* превью */ } }, [ver, v, s, sec, mv, ms, teams])

  const fresh = (keepAnswer = false) => { ov.current = null; setOvr(null); if (!keepAnswer) setAnswer(false); setRun(r => r + 1) } // новая сцена → играет с начала
  const showAnswer = () => { startAt.current = 'E'; setAnswer(true); fresh(true) }
  const toggle = () => { const a = api.current; if (!a) return; if (a.tl.isActive()) { a.tl.pause(); setPlaying(false) } else { if (a.tl.progress() >= 1) a.tl.restart(); else a.tl.play(); setPlaying(true) } }
  const jump = (t: number, keepPlaying = false) => { const a = api.current; if (!a) return; a.tl.seek(t); if (keepPlaying) { a.tl.play(); setPlaying(true) } else { a.tl.pause(); setPlaying(false) } paint() }
  const setOv = (n: number | null) => { ov.current = n; setOvr(n); paint() }
  const M = sec === 'media' ? null : MECHS[sec]
  const scene = M ? <div className="c7 fr" key={`${sec}-${mv}-${ms}-${teams}-${run}`}><M.C variant={mv} state={ms} nOv={null} onReady={onReady} teams={teams} /></div>
    : <div className="c7 fr" key={`${ver}-${v}-${s}-${run}`}>{ver === 'old' ? <SceneV6 state={s} mode={v} onReady={onReady} /> : <Scene state={s} mode={v} answer={answer} onReady={onReady} />}</div>
  if (embed) return <div className="m2-embed"><Stage>{scene}</Stage></div>
  return (
    <div className="m2-lab">
      <header className="m2-head">
        <div className="m2-brand"><span className="m2-brand-q">❦</span><div><b>Зачарованный лес · Концепт C</b><span>Выберите экран — анимация запустится сама. Ползунок под кадром — ручная перемотка.</span></div></div>
      </header>
      <div className="fr-pick">
        <span className="fr-cap">Раздел</span>
        <div className="m2-seg" role="group" aria-label="Раздел">
          {SECS.map(([id, name]) => <button key={id} type="button" className={id === sec ? 'is-on' : ''} aria-pressed={id === sec} onClick={() => { setSec(id); if (id !== 'media') { setMs(MECHS[id].states[2].id); setMv(MECHS[id].pick) } fresh() }}>{name}</button>)}
        </div>
        {M && <>
          <span className="fr-cap">Композиция</span>
          <div className="m2-seg" role="group" aria-label="Композиция">
            {[...M.variants].sort((a, b) => Number(b.id === M.pick) - Number(a.id === M.pick)).map(x => <button key={x.id} type="button" className={`${x.id === mv ? 'is-on' : ''}${x.id === M.pick ? '' : ' fr-old'}`} aria-pressed={x.id === mv} onClick={() => { setMv(x.id as Variant); fresh() }}>{x.id === M.pick ? `★ ${x.name} — выбрана` : `${x.name} (для сравнения)`}</button>)}
          </div>
          {sec === 'blitz' && mv === 'C' && <>
            <span className="fr-cap">Команд</span>
            <div className="m2-seg" role="group" aria-label="Число команд">
              {[3, 5, 8].map(c => <button key={c} type="button" className={c === teams ? 'is-on' : ''} aria-pressed={c === teams} onClick={() => { setTeams(c); fresh() }}>{c}</button>)}
            </div>
          </>}
          <span className="fr-cap">Состояние</span>
          <div className="m2-seg" role="group" aria-label="Состояние">
            {M.states.map(x => <button key={x.id} type="button" className={x.id === ms ? 'is-on' : ''} aria-pressed={x.id === ms} onClick={() => { setMs(x.id); fresh() }}>{x.name}</button>)}
          </div>
        </>}
      </div>
      {!M && <div className="fr-pick">
        <span className="fr-cap">Версия</span>
        <div className="m2-seg" role="group" aria-label="Версия">
          {([['new', 'Доработанная (10.07)'], ['old', 'Прежняя (10.06) — для сравнения']] as const).map(([id, name]) => <button key={id} type="button" className={id === ver ? 'is-on' : ''} aria-pressed={id === ver} onClick={() => { setVer(id); fresh() }}>{name}</button>)}
        </div>
        <span className="fr-cap">Появление</span>
        <div className="m2-seg" role="group" aria-label="Появление">
          {([['quick', 'Обычный вопрос — быстро'], ['full', 'Первый вопрос раунда — лес просыпается']] as const).map(([id, name]) => <button key={id} type="button" className={id === v ? 'is-on' : ''} aria-pressed={id === v} onClick={() => { setV(id); fresh() }}>{name}</button>)}
        </div>
        <span className="fr-cap">Экран</span>
        <div className="m2-seg" role="group" aria-label="Экран">
          {STATES.map(x => <button key={x.id} type="button" className={x.id === s ? 'is-on' : ''} aria-pressed={x.id === s} onClick={() => { setS(x.id); fresh() }}>{x.name}</button>)}
        </div>
      </div>}
      <main className="m2-preview">
        <Stage>{scene}</Stage>
        <div className="fr-player">
          <button type="button" className="fr-main" onClick={() => fresh()}>▶ Смотреть с начала</button>
          {!M && ver === 'new' && <button type="button" onClick={showAnswer}>✦ Показать правильный ответ</button>}
          <button type="button" onClick={toggle}>{playing ? '❚❚ Пауза' : '▶ Продолжить'}</button>
          <input ref={range} className="fr-range" type="range" min={0} max={1} step={0.001} defaultValue={0} aria-label="Перемотка"
            onInput={e => { const a = api.current; if (a) jump(Number((e.target as HTMLInputElement).value) * a.tl.duration()) }} />
          <span ref={clock} className="fr-clock" />
        </div>
        <div className="fr-chapters">
          <span className="fr-cap">Перейти к моменту</span>
          {labels.map(([k, at]) => <button key={k} type="button" onClick={() => jump(at, true)}>{(M ? CHAPTERS_S1 : CHAPTERS)[k] ?? k}</button>)}
          <button type="button" title="Без анимации: сразу последний кадр, как он будет стоять во время вопроса" onClick={() => { const a = api.current; if (a) jump(a.tl.duration()) }}>Сразу результат</button>
        </div>
        <div className="fr-chapters">
          <span className="fr-cap">Проверить таймер</span>
          {([[null, 'как идёт'], [M ? M.normal : 24, `${M ? M.normal : 24} с`], [7, '7 с — тревога'], [0, '0 — время вышло']] as const).map(([n, l]) => <button key={l} type="button" className={ovr === n ? 'is-on' : ''} onClick={() => setOv(n)}>{l}</button>)}
          <span className="fr-hint">{ovr === null ? 'таймер стартует, когда появляется вопрос' : `зафиксировано: ${ovr} с (${phaseOf(ovr) === 'zero' ? 'ноль' : phaseOf(ovr) === 'warning' ? 'последние 10 секунд' : 'обычный'})`}</span>
        </div>
      </main>
      {M && <section className="m2-card" aria-label="О композиции">
        <div className="m2-card-head"><h1>{M.name} · {M.variants.find(x => x.id === mv)!.name}</h1><p>{M.variants.find(x => x.id === mv)!.note}</p></div>
        <dl>{M.variants.filter(x => x.id !== mv).map(x => <div key={x.id}><dt>{x.name}</dt><dd>{x.note}</dd></div>)}</dl>
      </section>}
      {!M && <section className="m2-card" aria-label="Как устроено">
        <div className="m2-card-head"><h1>Концепт C · Живой лес</h1><p>Каждый вопрос появляется одной последовательностью: лес затихает, по ветви бежит свет, ветвь прорастает и выпускает лианы, вокруг кадра вырастает рама, листва в кадре расходится живым краем — и всё замирает. Фото не закрывает ничего: ни ветки, ни светлячки, ни затемнение.</p></div>
        <dl>
          <div><dt>Обычный вопрос</dt><dd>Лес уже проснулся; до читаемого кадра около трёх секунд.</dd></div>
          <div><dt>Первый вопрос раунда</dt><dd>Полное пробуждение: волна света по корням, деревья расступаются, крона раскрывается — потом то же появление вопроса.</dd></div>
          <div><dt>3 попытки</dt><dd>Как в игре в фазе 1: две картинки, клетки слова (закрытые — «?», открытые — буквой), номер фазы. Текста вопроса в этой механике нет.</dd></div>
          <div><dt>Таймер</dt><dd>Одуванчик у древнего дерева: каждую секунду улетает семечко. 10 секунд — янтарные семена и число. Ноль — голый стебель.</dd></div>
        </dl>
      </section>}
    </div>
  )
}
