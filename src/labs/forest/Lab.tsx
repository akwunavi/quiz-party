// ═══ Forest Lab — Зачарованный лес ═══
// Утверждено: вопросы с фото (Концепт C), «120 секунд», «Блиц», «Три попытки», «Своя игра»,
// «Угадай мелодию», «Скрэмбл» (Семена над поляной), «Сопоставление» (Слияние в живое растение),
// «Порядок» (Лоза-путь) — по одной композиции на механику. Этап 3 (в работе): «Кроссворд» —
// три новых концепта A/B/C до выбора ведущего (в каждом: активный кроссворд + разбор ответов команд).
// Управление: любой выбор сразу проигрывает анимацию с начала; ползунок — ручная
// перемотка; главы — переход к моменту. Сцена сама убирает свой таймлайн при
// размонтировании — оболочка ничего не убивает (иначе гасила бы УЖЕ новую сцену:
// эффекты смены ключа срабатывают после монтажа следующей сцены).
import { useCallback, useEffect, useRef, useState } from 'react'
import { Stage } from '../magic2/common'
import type { SceneApi, Mode } from '../../forest/Scene'
import { SceneLab } from './sceneLab'
import { Sprint, SPRINT_STATES, SPRINT_VARIANTS } from '../../forest/stage1/Sprint'
import { Blitz, BLITZ_STATES, BLITZ_VARIANTS } from '../../forest/stage1/Blitz'
import { Reveal3, REVEAL_STATES, REVEAL_VARIANTS } from '../../forest/stage1/Reveal3'
import type { S1Props, Variant } from '../../forest/stage1/common'
import { JeopardyLab, JP_STATES, JP_VARIANTS } from './jeopardyLab'
import { MelodyLab, MEL_STATES, MEL_VARIANTS } from './melodyLab'
import { Scramble, SCR_STATES, SCR_VARIANTS } from './scrambleLab'
import { Match, MATCH_STATES, MATCH_VARIANTS } from './matchLab'
import { Order, ORDER_STATES, ORDER_VARIANTS } from './orderLab'
import { Crossword, CW_STATES, CW_VARIANTS } from './crosswordLab'
import { Std, STD_STATES, STD_VARIANTS } from './stdLab'
import { LobbyLab, LB_STATES, LB_VARIANTS } from './lobbyLab'
import { Rules, RULES_STATES, RULES_VARIANTS } from '../../forest/stage5/Rules'
import { Intro5, RINT_STATES, RINT_VARIANTS } from '../../forest/stage5/Intro5'
import { Board, BOARD_STATES, BOARD_VARIANTS } from '../../forest/stage5/Board'
import { Finale, FIN_STATES, FIN_VARIANTS } from '../../forest/stage5/Finale'
import { Trans, TRANS_STATES, TRANS_VARIANTS } from '../../forest/stage5/Trans'

type Sec = 'media' | 'sprint' | 'blitz' | 'reveal' | 'jp' | 'mel' | 'scr' | 'match' | 'order' | 'cw' | 'std' | 'lobby3' | 'rules' | 'rint' | 'board' | 'fin' | 'trans'
type Mech = { name: string; C: (p: S1Props) => JSX.Element; states: { id: string; name: string }[]; variants: { id: string; name: string; note: string }[]; normal: number; /** с какого состояния открывать раздел */ start: number }
const MECHS: Record<Exclude<Sec, 'media'>, Mech> = {
  sprint: { name: '120 секунд', C: Sprint, states: SPRINT_STATES, variants: SPRINT_VARIANTS, normal: 87, start: 2 },
  blitz: { name: 'Блиц', C: Blitz, states: BLITZ_STATES, variants: BLITZ_VARIANTS, normal: 38, start: 2 },
  reveal: { name: 'Три попытки', C: Reveal3, states: REVEAL_STATES, variants: REVEAL_VARIANTS, normal: 24, start: 1 },
  jp: { name: 'Своя игра', C: JeopardyLab, states: JP_STATES, variants: JP_VARIANTS, normal: 24, start: 1 },
  mel: { name: 'Угадай мелодию', C: MelodyLab, states: MEL_STATES, variants: MEL_VARIANTS, normal: 24, start: 1 },
  scr: { name: 'Скрэмбл', C: Scramble, states: SCR_STATES, variants: SCR_VARIANTS, normal: 24, start: 0 },
  match: { name: 'Сопоставление', C: Match, states: MATCH_STATES, variants: MATCH_VARIANTS, normal: 24, start: 0 },
  order: { name: 'Порядок', C: Order, states: ORDER_STATES, variants: ORDER_VARIANTS, normal: 24, start: 0 },
  cw: { name: 'Кроссворд', C: Crossword, states: CW_STATES, variants: CW_VARIANTS, normal: 30, start: 0 },
  std: { name: 'Обычные вопросы и разборы', C: Std, states: STD_STATES, variants: STD_VARIANTS, normal: 30, start: 0 },
  lobby3: { name: 'Лобби и рандомайзер', C: LobbyLab, states: LB_STATES, variants: LB_VARIANTS, normal: 0, start: 0 },
  rules: { name: 'Правила', C: Rules, states: RULES_STATES, variants: RULES_VARIANTS, normal: 0, start: 0 },
  rint: { name: 'Вступления раундов', C: Intro5, states: RINT_STATES, variants: RINT_VARIANTS, normal: 0, start: 0 },
  board: { name: 'Табло', C: Board, states: BOARD_STATES, variants: BOARD_VARIANTS, normal: 0, start: 0 },
  trans: { name: 'Переходы', C: Trans, states: TRANS_STATES, variants: TRANS_VARIANTS, normal: 0, start: 0 },
  fin: { name: 'Финал', C: Finale, states: FIN_STATES, variants: FIN_VARIANTS, normal: 0, start: 0 },
}
const GROUPS: [string, [Sec, string][]][] = [
  ['Утверждено', [['media', 'Вопросы с фото'], ['sprint', '120 секунд'], ['blitz', 'Блиц'], ['reveal', 'Три попытки'], ['jp', 'Своя игра'], ['mel', 'Угадай мелодию'], ['scr', 'Скрэмбл'], ['match', 'Сопоставление'], ['order', 'Порядок']]],
  ['Этап 3 — в работе', [['cw', 'Кроссворд']]],
  ['Этап 4 — в работе', [['std', 'Обычные вопросы и разборы']]],
  ['Этап 5 — в работе', [['lobby3', 'Лобби и рандомайзер'], ['rules', 'Правила'], ['rint', 'Вступления раундов'], ['board', 'Табло'], ['fin', 'Финал'], ['trans', 'Переходы']]],
]
function readMech() {
  const m = /^#s1-(sprint|blitz|reveal|jp|mel|scr|match|order|cw|std|lobby3|rules|rint|board|fin|trans)-([ABC])-(\w+?)(?:-n(\d+))?(?:-(end|[\d.]+))?$/.exec(location.hash)
  return m ? { sec: m[1] as Sec, mv: m[2] as Variant, ms: m[3], teams: Number(m[4] ?? 5), at: m[5] ?? '' } : null
}
import { STATES, TOTAL, phaseOf, type StateId } from '../../forest/content'

/** Карта этапа 4: что покрывает вопросы и где лежит разбор каждой механики (прыжок на готовый экран) */
const MAP_Q: [string, string][] = [['Текст и варианты', 'mc'], ['Фото без вариантов', 'img1open'], ['Фото и варианты', 'img1opt'], ['Вертикальное фото', 'port'], ['Два фото', 'two'], ['Три фото-варианта', 'three'], ['Четыре фото-варианта', 'four'], ['Слово из 6 букв', 'six'], ['Длинный текст + фото', 'long'], ['Длинный текст, два фото', 'long2']]
const MAP_R: [string, Sec, string][] = [['Текст (открытый ответ)', 'std', 'revtext'], ['Варианты с текстом', 'std', 'revmc'], ['Фото', 'std', 'revimg'], ['Фото-варианты', 'std', 'revimgopt'], ['Три попытки', 'reveal', 'review'], ['120 секунд', 'sprint', 'reveal'], ['Блиц', 'blitz', 'between'], ['Своя игра', 'jp', 'reveal'], ['Угадай мелодию', 'mel', 'reveal'], ['Скрэмбл', 'scr', 'reveal'], ['Сопоставление', 'match', 'reveal'], ['Порядок', 'order', 'reveal'], ['Кроссворд', 'cw', 'review']]

const CHAPTERS: Record<string, string> = { A: 'Лес', B: 'Лес прислушивается', C: 'Ветви прорастают', D: 'Открывается вопрос', E: 'Вопрос на экране', R: 'Ответ' }
const CHAPTERS_S1: Record<string, string> = { A: 'Начало', E: 'Устойчивый кадр', P: 'Ответ ещё закрыт', R: 'Правильный ответ', T: 'Ответы команд', N: 'Следующее слово' }
function readHash() {
  const m = /^#(?:(new|ans)-)?(quick|full)-(\w+)(?:-(end|[\d.]+))?$/.exec(location.hash)
  return { ans: m?.[1] === 'ans', v: (m?.[2] ?? 'quick') as Mode, s: (STATES.some(x => x.id === m?.[3]) ? m![3] : 'two') as StateId, at: m?.[4] ?? '' }
}

export function Lab() {
  const init = readHash()
  const [v, setV] = useState<Mode>(init.v)
  const [answer, setAnswer] = useState(init.ans)
  const startAt = useRef('')
  const im = readMech()
  const [sec, setSec] = useState<Sec>(im?.sec ?? 'media')
  const [mv, setMv] = useState<Variant>(im?.mv ?? 'A')
  const [ms, setMs] = useState<string>(im?.ms ?? 'active')
  const [teams, setTeams] = useState<number>(im?.teams ?? 5)
  const [fromMap, setFromMap] = useState(false) // пришли по карте этапа 4 — карта остаётся на экране, чтобы листать дальше
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
  useEffect(() => { try { history.replaceState(null, '', `${location.search}#${sec === 'media' ? `new-${v}-${s}` : `s1-${sec}-${mv}-${ms}${sec === 'blitz' && teams !== 5 ? `-n${teams}` : ''}`}`) } catch { /* превью */ } }, [v, s, sec, mv, ms, teams])

  const fresh = (keepAnswer = false) => { ov.current = null; setOvr(null); if (!keepAnswer) setAnswer(false); setRun(r => r + 1) } // новая сцена → играет с начала
  const showAnswer = () => { startAt.current = 'E'; setAnswer(true); fresh(true) }
  /** прыжок на готовый экран другой механики (карта этапа 4) */
  const go = (to: Sec, st: string, answerOn = false) => {
    setFromMap(true); setSec(to)
    if (to === 'media') { setS(st as StateId); if (answerOn) { startAt.current = 'E'; setAnswer(true); fresh(true) } else fresh() }
    else { setMs(st); setMv(MECHS[to].variants[0].id as Variant); fresh() }
  }
  const toggle = () => { const a = api.current; if (!a) return; if (a.tl.isActive()) { a.tl.pause(); setPlaying(false) } else { if (a.tl.progress() >= 1) a.tl.restart(); else a.tl.play(); setPlaying(true) } }
  const jump = (t: number, keepPlaying = false) => { const a = api.current; if (!a) return; a.tl.seek(t); if (keepPlaying) { a.tl.play(); setPlaying(true) } else { a.tl.pause(); setPlaying(false) } paint() }
  const setOv = (n: number | null) => { ov.current = n; setOvr(n); paint() }
  const M = sec === 'media' ? null : MECHS[sec]
  const scene = M ? <div className="c7 fr theme-enchanted_forest" key={`${sec}-${mv}-${ms}-${teams}-${run}`}><M.C variant={mv} state={ms} nOv={null} onReady={onReady} teams={teams} /></div>
    : <div className="c7 fr theme-enchanted_forest" key={`${v}-${s}-${run}`}><SceneLab state={s} mode={v} answer={answer} onReady={onReady} /></div>
  if (embed) return <div className="m2-embed"><Stage>{scene}</Stage></div>
  return (
    <div className="m2-lab">
      <header className="m2-head">
        <div className="m2-brand"><span className="m2-brand-q">❦</span><div><b>Зачарованный лес · Концепт C</b><span>Выберите экран — анимация запустится сама. Ползунок под кадром — ручная перемотка.</span></div></div>
      </header>
      <div className="fr-pick">
        {GROUPS.map(([g, items]) => <div key={g} className="fr-group">
          <span className="fr-cap">{g}</span>
          <div className="m2-seg" role="group" aria-label={g}>
            {items.map(([id, name]) => <button key={id} type="button" className={id === sec ? 'is-on' : ''} aria-pressed={id === sec} onClick={() => { setFromMap(false); setSec(id); if (id !== 'media') { setMs(MECHS[id].states[MECHS[id].start].id); setMv(MECHS[id].variants[0].id as Variant) } fresh() }}>{name}</button>)}
          </div>
        </div>)}
        {M && <>
          {M.variants.length > 1 && <>
            <span className="fr-cap">Концепт</span>
            <div className="m2-seg" role="group" aria-label="Концепт">
              {M.variants.map(x => <button key={x.id} type="button" className={x.id === mv ? 'is-on' : ''} aria-pressed={x.id === mv} onClick={() => { setMv(x.id as Variant); fresh() }}>{x.name}</button>)}
            </div>
          </>}
          {sec === 'blitz' && <>
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
      {(sec === 'std' || fromMap) && <div className="fr-pick">
        <span className="fr-cap">Вопросы: что покрыто (утверждено)</span>
        <div className="m2-seg" role="group" aria-label="Покрытие вопросов">
          {MAP_Q.map(([l, st]) => <button key={st} type="button" onClick={() => go('media', st)}>{l}</button>)}
        </div>
        <span className="fr-cap">Разборы по механикам</span>
        <div className="m2-seg" role="group" aria-label="Разборы по механикам">
          {MAP_R.map(([l, to, st]) => <button key={l} type="button" onClick={() => go(to, st)}>{l}</button>)}
        </div>
      </div>}
      {!M && <div className="fr-pick">
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
          {!M && <button type="button" onClick={showAnswer}>✦ Показать правильный ответ</button>}
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
        <div className="m2-card-head"><h1>{M.name}{M.variants.length > 1 ? ` · ${M.variants.find(x => x.id === mv)?.name ?? ''}` : ' · утверждено'}</h1><p>{M.variants.find(x => x.id === mv)?.note}</p></div>
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
