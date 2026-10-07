// ═══ 14 состояний настоящей игры — общая СТРУКТУРА для всех миров ═══
// Каждый экран повторяет, ЧТО показывает продакшн и в КАКОМ порядке
// (сверено с HostScreen.tsx, QuestionScreen.tsx, InfoSlideView.tsx,
// rounds/*.tsx — см. заметки состояний в states.ts). Классы gs-* — общий
// словарь; как они выглядят и как двигаются, решает CSS концепции.
import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useCues, useStage, useTime } from '../engine/stage'
import { useKit, type Density, type TransitionPhase } from './kit'
import { useLabOptions } from './config'
import { useGameTimer, timerAt, demoSpeed } from './timer'
import { Photo } from './Photo'
import {
  BLITZ, CROSSWORD_GRID, CROSSWORD_META, CROSSWORD_ROUND, JEOPARDY, JEOPARDY_ANSWERS, MATCH_TEAM_ANSWERS,
  MELODY, ORDER_TEAM_ANSWERS, Q_MATCH, Q_ORDER, Q_ROUND, RANDOM_GROUPS, RULES_ROUNDS,
  RULES_SLIDE, RULES_STATS, SCRAMBLE, TEAMS, teamById, teamsFor, type DemoAnswer, type DemoQuestion,
} from './data'
import { blockLayout } from '../../../pages/rounds/BlitzRound'
import { anagramQuestion, anagramHintOrder, anagramHintsOpen, anagramHintTile, anagramMaxHints, hashStr } from '../../../lib/anagram'
import { melodySpinPath, melodySpinAt, melodySpinSeed } from '../../../lib/melody'

// ── общие мелочи ──────────────────────────────────────────

/** Кнопки ведущего на проекторе. В обычном виде их НЕТ: проектор — чистый эфир,
 *  ходом игры управляет админка. mech — кнопки самой механики (в окнах плитки/трека)
 *  не навигация и в резервном режиме тоже не рисуются: только Назад / Далее. */
function Actions({ mech }: { items?: unknown; mech?: boolean }) {
  const { nav } = useLabOptions()
  if (!nav || mech) return null
  return (
    <div className="gs-nav" role="group" aria-label="Резервная навигация">
      <span className="gs-nav-btn is-prev">‹ Назад</span>
      <span className="gs-nav-btn is-next">Далее ›</span>
    </div>
  )
}

function Screen({ cls, density, scene, children }: { cls: string; density: Density; scene: string; children: ReactNode }) {
  const { World } = useKit()
  return (
    <World density={density} scene={scene}>
      <div className={`gs ${cls}`}>{children}</div>
    </World>
  )
}

/** Фаза перехода по часам сцены — тайминг даёт концепция. */
function useTransition(start: number): TransitionPhase {
  const { timing } = useKit()
  const t = useTime(30)
  const x = t - start
  if (x < timing.out) return 'before'
  if (x < timing.cover) return 'out'
  if (x < timing.in) return 'cover'
  if (x < timing.done) return 'in'
  return 'done'
}

/** «До» или «после» смены содержимого при переходе. */
const isAfter = (p: TransitionPhase) => p === 'cover' || p === 'in' || p === 'done'

// ── 01 LOBBY (+ рандомайзер) ──────────────────────────────

function Lobby({ groups, exiting }: { groups?: boolean; exiting?: boolean }) {
  const { Teams, Qr } = useKit()
  const { teams: n } = useLabOptions()
  const teams = teamsFor(n)
  const players = RANDOM_GROUPS.reduce((c, g) => c + g.length, 0)
  return (
    <div className={`gs gs-lobby${groups ? ' is-groups' : ''}${exiting ? ' is-exit' : ''}`}>
      <div className="gs-title"><h1 className="gs-logo">QUIZ PARTY</h1></div>
      <Teams teams={teams} />
      <Qr lit={groups} />
      <Actions />
      {groups && (
        <div className="gs-groups-overlay">
          <div className="gs-groups" data-count={RANDOM_GROUPS.length}>
            <div className="gs-groups-head">
              <span className="gs-tag">СОСТАВЫ КОМАНД · {RANDOM_GROUPS.length} · {players} чел.</span>
              <span className="gs-groups-close">✕</span>
            </div>
            <div className="gs-groups-list">
              {RANDOM_GROUPS.map((g, i) => (
                <div key={i} className="gs-group" style={{ '--tc': TEAMS[i].color, '--i': i } as CSSProperties}>
                  <div className="gs-group-name">Команда {i + 1}</div>
                  <div className="gs-group-players">{g.join(' · ')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function S01Lobby() {
  return <Screen cls="gs-wrap" density="sparse" scene="lobby"><Lobby /></Screen>
}

export function S02Randomizer() {
  const [open, setOpen] = useState(false)
  useCues([[3.4, () => setOpen(true)]])
  return <Screen cls="gs-wrap" density={open ? 'medium' : 'sparse'} scene={open ? 'randomizer' : 'lobby'}><Lobby groups={open} /></Screen>
}

// ── 03 ПРАВИЛА (слайд-брифинг show_at: lobby) ─────────────

function Rules({ exiting }: { exiting?: boolean }) {
  const lines = RULES_SLIDE.body.split('\n')
  const h = Math.floor(RULES_STATS.minutes / 60), m = RULES_STATS.minutes % 60
  return (
    <div className={`gs gs-info${exiting ? ' is-exit' : ''}`}>
      <div className="gs-topbar"><span className="gs-tag">{RULES_SLIDE.title}</span></div>
      <div className="gs-info-stack">
        <div className="gs-rules-band">
          <ul className="gs-rules">
            {lines.map((l, i) => <li key={i} style={{ '--i': i } as CSSProperties}><span className="gs-rule-n">{i + 1}</span>{l}</li>)}
          </ul>
        </div>
        <div className="gs-info-body">
          <div className="gs-ib-label"><span>{RULES_SLIDE.title}</span></div>
          <div className="gs-ib-meta">
            <div className="gs-info-rounds">
              {RULES_ROUNDS.map((r, i) => (
                <div key={r.id} className="gs-info-round" style={{ '--i': i } as CSSProperties}>
                  <span className="gs-ir-num">{i + 1}</span><span className="gs-ir-name">{r.name}</span><span className="gs-ir-count">{r.count} вопр.</span>
                </div>
              ))}
            </div>
            <ul className="gs-info-stats">
              <li>Раундов: {RULES_STATS.roundsCount}</li>
              <li>Вопросов: {RULES_STATS.questionsCount}</li>
              <li>Музыкальных треков: {RULES_STATS.musicTracks} шт</li>
              <li>Примерное время игры: ~{h} ч {m} мин</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="gs-note">{RULES_SLIDE.note}</div>
      <Actions items={['К раунду →']} />
    </div>
  )
}

export function S03Rules() {
  const { Transition } = useKit()
  const ph = useTransition(3.6)
  const after = isAfter(ph)
  return (
    <Screen cls={`gs-wrap gs-tr is-${ph}`} density={after ? 'medium' : 'sparse'} scene={after ? 'rules' : 'lobby'}>
      {after ? <Rules /> : <Lobby exiting={ph === 'out'} />}
      <Transition phase={ph} kind="rules" />
    </Screen>
  )
}

// ── 04 РАУНД 1: КРОССВОРД (титул раунда с пустой сеткой) ─────

function CrosswordGrid() {
  const g = CROSSWORD_GRID
  const cell = Math.max(30, Math.min(60, Math.floor(Math.min(820 / g.cols, 760 / g.rows))))
  const cells = useMemo(() => {
    const m = new Map<string, { num?: number; order: number }>()
    g.words.forEach((w, wi) => {
      for (let i = 0; i < w.word.length; i++) {
        const r = w.dir === 'down' ? w.row + i : w.row
        const c = w.dir === 'across' ? w.col + i : w.col
        const k = `${r},${c}`
        const prev = m.get(k)
        m.set(k, { num: i === 0 ? w.number : prev?.num, order: Math.min(prev?.order ?? 999, wi * 0.6 + i * 0.05) })
      }
    })
    return m
  }, [g])
  return (
    <div className="gs-cw-grid" style={{ gridTemplateColumns: `repeat(${g.cols}, ${cell}px)`, '--cell': `${cell}px` } as CSSProperties}>
      {Array.from({ length: g.rows * g.cols }, (_, i) => {
        const r = Math.floor(i / g.cols), c = i % g.cols
        const x = cells.get(`${r},${c}`)
        if (!x) return <div key={i} className="gs-cw-cell is-empty" />
        return <div key={i} className="gs-cw-cell" style={{ '--o': x.order } as CSSProperties}>{x.num && <span className="gs-cw-num">{x.num}</span>}</div>
      })}
    </div>
  )
}

function CrosswordIntro() {
  const R = CROSSWORD_ROUND
  return (
    <div className="gs gs-round gs-cw">
      <div className="gs-cw-left"><CrosswordGrid /></div>
      <div className="gs-cw-side">
        <div className="gs-tag gs-round-no">РАУНД 1</div>
        <h1 className="gs-round-title">{R.title_lines.map((l, i) => <span key={i} style={{ '--i': i } as CSSProperties}>{l}</span>)}</h1>
        <div className="gs-meta">{CROSSWORD_META}</div>
        {R.rules.map((r, i) => (
          <div key={i} className="gs-rule-item" style={{ '--i': i } as CSSProperties}>
            <span className="gs-rule-idx">{String(i + 1).padStart(2, '0')}</span>{r}
          </div>
        ))}
      </div>
      <Actions items={['Первый вопрос →']} />
    </div>
  )
}

export function S04Crossword() {
  const { Transition } = useKit()
  const ph = useTransition(3.2)
  const after = isAfter(ph)
  return (
    <Screen cls={`gs-wrap gs-tr is-${ph}`} density="medium" scene={after ? 'round' : 'rules'}>
      {after ? <CrosswordIntro /> : <Rules exiting={ph === 'out'} />}
      <Transition phase={ph} kind="round" />
    </Screen>
  )
}

// ── 05–08 ВОПРОС (QuestionScreen) ─────────────────────────

const LONG_TAIL = ' Подсказка: фильм вышел не в один год, смотрите на костюмы, обстановку и музыку за кадром; ответ — одной строкой, учитываются только полные названия без сокращений.'

/** Текст вписывается в рамку замером, как hooks/useFitText в игре: кегль падает,
 *  пока рамка (ближайший .gs-frame / .gs-bz-q) не перестанет переполняться. */
function FitText({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    const box = el?.closest('.gs-frame, .gs-bz-q') as HTMLElement | null
    if (!el || !box) return
    const fit = () => {
      // как useFitText: берём максимум и уменьшаем, пока рамка не перестанет переполняться
      let px = Number(getComputedStyle(box).getPropertyValue('--fit-max')) || 76
      el.style.fontSize = `${px}px`
      for (let k = 0; k < 60 && px > 20 && (box.scrollHeight > box.clientHeight + 1 || box.scrollWidth > box.clientWidth + 1); k++) {
        px = Math.floor(px * 0.95)
        el.style.fontSize = `${px}px`
      }
    }
    fit()
    void document.fonts?.ready.then(fit)
  }, [text])
  return <p ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>{text}</p>
}

function QText({ text }: { text: string }) {
  const cls = text.length > 140 ? ' len-xl' : text.length > 95 ? ' len-l' : text.length > 55 ? ' len-m' : ''
  return <FitText text={text} className={`gs-qtext${cls}`} />
}

export function QuestionView({ q: q0, kind }: { q: DemoQuestion; kind: 'match' | 'image1' | 'image2' | 'open' }) {
  const { Timer } = useKit()
  const { longText } = useLabOptions()
  const q = longText ? { ...q0, text: q0.text + LONG_TAIL } : q0
  const t = useGameTimer(Q_ROUND.timer, 1.0)
  const a = q.answer
  const imgs = q.media
  const splitN = a.mode === 'match' || (a.mode === 'choice' && a.choices.length === imgs.length) ? 1 : 2
  const split = !!q.text.trim() && imgs.length >= 1 && imgs.length <= splitN
  const choices = a.mode === 'choice' || a.mode === 'order' ? a.choices : null
  const lettered = imgs.length > 1 && ((a.mode === 'choice' && a.choices.length === imgs.length) ||
    (a.mode === 'match' && a.left.length === imgs.length))
  const matchLabels = a.mode === 'match' && (a.right_labels ?? []).some(Boolean)
  const hasChoices = (!!choices && !lettered) || matchLabels
  const density: Density = kind === 'open' ? 'sparse' : kind === 'image1' ? 'medium' : 'dense'
  return (
    <Screen cls={`gs-q kind-${kind}${imgs.length ? ' has-media' : ''}${hasChoices ? ' has-choices' : ''}${t.low ? ' is-low' : ''}${t.zero ? ' is-zero' : ''}`}
      density={density} scene={`q-${kind}`}>
      <div className="gs-topbar">
        <span className="gs-qnum">Р{Q_ROUND.number} · ВОПРОС <b>{q.index + 1}</b> / {Q_ROUND.count}</span>
        <Timer t={t} size="top" />
      </div>
      {split ? (
        <div className={`gs-split n${imgs.length}`}>
          <div className="gs-frame"><QText text={q.text} /></div>
          <div className={`gs-media n${imgs.length}`}>
            {imgs.map((m, i) => <figure key={i} className="gs-img" style={{ '--i': i } as CSSProperties}><Photo kind={m.kind} ratio={m.ratio} /></figure>)}
          </div>
        </div>
      ) : (<>
        {q.text.trim() && <div className="gs-frame"><QText text={q.text} /></div>}
        {imgs.length > 0 && (lettered ? (
          <div className={`gs-img-answers n${imgs.length}`}>
            {imgs.map((m, i) => (
              <figure key={i} className="gs-img is-lettered" style={{ '--i': i } as CSSProperties}>
                <Photo kind={m.kind} ratio={m.ratio} />
                <span className="gs-badge">{a.mode === 'match' ? i + 1 : choices?.[i]?.key}</span>
              </figure>
            ))}
          </div>
        ) : (
          <div className={`gs-media n${imgs.length}`}>
            {imgs.map((m, i) => <figure key={i} className="gs-img" style={{ '--i': i } as CSSProperties}><Photo kind={m.kind} ratio={m.ratio} /></figure>)}
          </div>
        ))}
      </>)}
      {matchLabels && a.mode === 'match' && (
        <div className="gs-choices is-match">
          {a.right.map((r, i) => (
            <div key={r} className="gs-choice" style={{ '--i': i } as CSSProperties}><span className="gs-key">{r}</span><span className="gs-ctext">{a.right_labels?.[i]}</span></div>
          ))}
        </div>
      )}
      {choices && !lettered && (
        <div className="gs-choices">
          {choices.map((c, i) => (
            <div key={c.key} className="gs-choice" style={{ '--i': i } as CSSProperties}><span className="gs-key">{c.key}</span><span className="gs-ctext">{c.text}</span></div>
          ))}
        </div>
      )}
      <Actions items={[['← Назад', 'ghost'], 'Дальше →']} />
    </Screen>
  )
}

// ── 09 СВОЯ ИГРА ──────────────────────────────────────────

export function S09Jeopardy() {
  const { Timer } = useKit()
  const [stage, setStage] = useState<'board' | 'pick' | 'open' | 'answer'>('board')
  const [arrived, setArrived] = useState(0)
  useCues([[1.6, () => setStage('pick')], [2.4, () => setStage('open')], [4.2, () => setArrived(1)],
    [5.6, () => setArrived(2)], [7.0, () => setArrived(3)]])
  const clip = useGameTimer(JEOPARDY.clipSeconds, 2.9)
  const shown = stage === 'answer' || clip.zero
  const themes = JEOPARDY.themes
  const rows = Math.max(...themes.map(t => t.tiles.length))
  const pk = JEOPARDY.pick
  const tile = themes[pk.theme].tiles[pk.tile]
  const answers = JEOPARDY_ANSWERS.slice(0, shown ? 3 : arrived)
  return (
    <Screen cls={`gs-jp is-${stage}${shown ? ' is-shown' : ''}`} density="dense" scene="jeopardy">
      <h1 className="gs-jp-title">СВОЯ ИГРА</h1>
      <div className="gs-jp-board" style={{ gridTemplateColumns: `repeat(${themes.length}, minmax(0, 1fr))`, gridTemplateRows: `auto repeat(${rows}, minmax(0, 1fr))` }}>
        {themes.map((t, ti) => (
          <div key={`h${ti}`} className="gs-jp-theme" style={{ gridColumn: ti + 1, gridRow: 1, '--c': ti } as CSSProperties}>
            {t.name}{t.hint && <span className="gs-jp-hint">{t.hint}</span>}
          </div>
        ))}
        {themes.map((t, ti) => t.tiles.map((tl, i) => {
          const done = JEOPARDY.opened.includes(`${ti}-${i}`)
          const isPick = ti === pk.theme && i === pk.tile
          return (
            <div key={`${ti}-${i}`} className={`gs-jp-tile${done ? ' is-done' : ''}${isPick ? ' is-pick' : ''}`}
              style={{ gridColumn: ti + 1, gridRow: i + 2, '--c': ti, '--i': ti * 5 + i } as CSSProperties}>
              <span>{done ? '·' : tl.value}</span>
            </div>
          )
        }))}
      </div>
      <Actions items={[['К табло →', 'ghost']]} />
      {(stage === 'open' || shown) && (
        <div className="gs-jp-overlay" style={{ '--ox': pk.theme, '--oy': pk.tile } as CSSProperties}>
          <div className="gs-jp-modal">
            <div className="gs-jp-head">
              <div>
                <div className="gs-jp-mtheme">{themes[pk.theme].name}</div>
                <div className="gs-tag">ПЛИТКА · {tile.value}</div>
              </div>
              <div className={`gs-jp-count${clip.running ? ' is-on' : ''}`}><Timer t={clip} size="mini" /></div>
            </div>
            {shown && (
              <div className="gs-reveal">
                <div className="gs-reveal-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
                <div className="gs-reveal-main">{tile.correct}</div>
              </div>
            )}
            <div className="gs-jp-answers">
              <div className="gs-tag">{shown ? 'ОТВЕТЫ (ПО СКОРОСТИ)' : `ОТВЕТИЛИ: ${answers.length}`}</div>
              {answers.length === 0 && <div className="gs-dim">ждём ответы…</div>}
              {answers.map((a, pos) => {
                const team = teamById(a.team)
                return (
                  <div key={a.team} className={`gs-jp-answer${shown ? (a.ok ? ' is-ok' : ' is-no') : ''}`} style={{ '--tc': team.color, '--i': pos } as CSSProperties}>
                    <span className="gs-pos">#{pos + 1}</span><span className="gs-name">{team.name}</span>
                    <span className="gs-txt">{shown ? a.text : '• • •'}</span>
                    {shown && <><span className="gs-grade is-ok">✓</span><span className="gs-grade is-no">✗</span></>}
                  </div>
                )
              })}
            </div>
            <Actions mech items={shown ? [['↻ Переслушать', 'ghost'], ['Закрыть плитку', 'ghost']] : ['Показать ответ', ['↻ Переслушать', 'ghost'], ['Закрыть плитку', 'ghost']]} />
          </div>
        </div>
      )}
    </Screen>
  )
}

// ── 10 УГАДАЙ МЕЛОДИЮ ─────────────────────────────────────

type MelStage = 'idle' | 'spinning' | 'listen' | 'bidding' | 'bids' | 'snippet' | 'answering'
const MEL_TIMES: [number, MelStage][] = [[0, 'idle'], [1.2, 'spinning'], [6.2, 'listen'], [7.6, 'bidding'], [17, 'bids'], [19.2, 'snippet'], [23.4, 'answering']]

export function S10Melody() {
  const { Timer } = useKit()
  const t = useTime(30)
  const { reduced } = useStage()
  const stage: MelStage = reduced ? 'bidding' : [...MEL_TIMES].reverse().find(([at]) => t >= at)![1]
  const themes = MELODY.themes
  const keys = themes.flatMap((th, ti) => th.tracks.map((_, i) => `${ti}-${i}`))
  const free = keys.filter(k => !MELODY.played.includes(k))
  const spin = useMemo(() => melodySpinPath(free.length, free.indexOf(MELODY.pick), 5000, melodySpinSeed(MELODY.pick + '|demo')), [free.length])
  const hot = stage === 'spinning' ? free[melodySpinAt(spin, (t - 1.2) * 1000)] : stage === 'idle' ? null : MELODY.pick
  const [pti, pi] = MELODY.pick.split('-').map(Number)
  const bidT = useGameTimer(MELODY.bidSec, 7.6, 1.2)
  const ansT = useGameTimer(MELODY.answerSec, 23.4)
  const placed = Math.min(MELODY.bids.length, Math.max(0, Math.floor((t - 8.4) / 1.7)))
  const order = [...MELODY.bids].sort((a, b) => a.sec - b.sec)
  const lead = teamById(order[0].team)
  const showModal = stage !== 'idle' && stage !== 'spinning'
  return (
    <Screen cls={`gs-mel st-${stage}`} density="dense" scene="melody">
      <div className={`gs-mel-board${stage === 'spinning' ? ' is-spinning' : ''}`} style={{ gridTemplateColumns: `repeat(${themes.length}, minmax(0, 1fr))` }}>
        {themes.map((th, ti) => (
          <div key={th.name} className="gs-mel-col" style={{ '--c': ti } as CSSProperties}>
            <div className="gs-mel-theme">{th.name}</div>
            {th.tracks.map((_, i) => {
              const k = `${ti}-${i}`
              const done = MELODY.played.includes(k)
              return <div key={k} className={`gs-mel-tile${done ? ' is-done' : ''}${hot === k ? ' is-hot' : ''}`} style={{ '--i': i } as CSSProperties}><span>{done ? '' : i + 1}</span></div>
            })}
          </div>
        ))}
      </div>
      {stage === 'idle' && <Actions mech items={[['♪ все треки загружены', 'ghost'], 'Рулетка', ['Выбрать вручную', 'ghost']]} />}
      {showModal && (
        <div className="gs-mel-overlay">
          <div className="gs-mel-modal">
            <div className="gs-mel-head">
              <div className="gs-mel-mtheme">{themes[pti].name} · трек {pi + 1}</div>
              {stage === 'bidding' && <div className="gs-mel-count"><Timer t={bidT} size="mini" /></div>}
              {stage === 'answering' && <div className="gs-mel-count"><Timer t={ansT} size="mini" /></div>}
            </div>
            {stage === 'listen' && <div className="gs-mel-big gs-listen">СЛУШАЕМ 1 СЕКУНДУ…</div>}
            {stage === 'bidding' && (<>
              <div className="gs-mel-big">ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?</div>
              <div className="gs-mel-hint">2–5 сек → 2 балла · 6–10 сек → 1 балл · передача хода → 0.5 балла</div>
              <div className="gs-mel-bids">
                {[...TEAMS.filter(x => x.alive)].sort((a, b) => a.name.localeCompare(b.name)).map(team => {
                  const bi = MELODY.bids.findIndex(b => b.team === team.id)
                  const got = bi >= 0 && bi < placed
                  return <div key={team.id} className={`gs-bid-row${got ? ' is-in' : ''}`} style={{ '--tc': team.color } as CSSProperties}>
                    <span className="gs-name">{team.name}</span><b>{got ? 'ставка принята ✓' : '…'}</b></div>
                })}
              </div>
            </>)}
            {stage === 'bids' && (<>
              <div className="gs-tag">СТАВКИ КОМАНД</div>
              <div className="gs-mel-bids is-order">
                {order.map((b, pos) => {
                  const team = teamById(b.team)
                  return <div key={b.team} className={`gs-bid-row${pos === 0 ? ' is-win' : ''}`} style={{ '--tc': team.color, '--i': pos } as CSSProperties}>
                    <span className="gs-name">{team.name}</span><b>{b.sec} сек</b>{pos === 0 ? <span className="gs-win-tag">ИГРАЕТ</span> : <span />}</div>
                })}
              </div>
              <Actions mech items={[`Играем ${order[0].sec} сек →`, ['Пропустить трек', 'ghost']]} />
            </>)}
            {stage === 'snippet' && (<>
              <div className="gs-mel-big gs-listen" style={{ '--tc': lead.color } as CSSProperties}>{lead.name} · играет {order[0].sec} сек</div>
              <Actions mech items={['Принимаем ответ →']} />
            </>)}
            {stage === 'answering' && (<>
              <div className="gs-mel-big" style={{ '--tc': lead.color } as CSSProperties}>{lead.name}</div>
              <div className="gs-mel-hint">ставка {order[0].sec} сек → за верный ответ 2 балла</div>
              <div className="gs-mel-answer"><span className="gs-dim">ждём ответ…</span></div>
              <Actions mech items={[['✓ Верно', 'primary'], ['✗ Передать ход →', 'ghost']]} />
            </>)}
            <span className="gs-mel-escape">Закрыть</span>
          </div>
        </div>
      )}
    </Screen>
  )
}

// ── 11 БЛИЦ ───────────────────────────────────────────────

const GRACE = 2       // первые 2 секунды после показа вопроса время не тикает
export function S11Blitz() {
  const { Timer } = useKit()
  const t = useTime(20)
  const order = BLITZ.order
  const { topCount } = blockLayout(order.length)
  // ход 1: вопрос показан в 0.6; ответ пришёл в 4.6 (пауза на проверку);
  // вердикт ВЕРНО; через NEXT_DELAY (5 с) — разбор, затем ход 2 в 10.6
  const turn = t < 10.6 ? 0 : 1
  const q = BLITZ.questions[turn]
  const active = q.team
  const shownAt = turn === 0 ? 0.6 : 10.6
  const answeredAt = turn === 0 ? 4.6 : 999
  const speed = 1
  const running = t >= shownAt + GRACE && t < answeredAt
  const spent = Math.max(0, Math.min(t, answeredAt) - shownAt - GRACE) * speed
  const verdict = turn === 0 && t >= 4.6 && t < 9.6 ? 'ok' : undefined
  const between = turn === 0 && t >= 9.6
  const head = order.slice(0, topCount), rest = order.slice(topCount)
  const block = (id: string) => {
    const team = teamById(id)
    const base = BLITZ.left[id]
    const isActive = id === active
    const leftSec = isActive ? base - spent : base - (turn === 1 && id === BLITZ.questions[0].team ? 4.0 - GRACE : 0)
    const tm = timerAt(BLITZ.teamSeconds, BLITZ.teamSeconds - leftSec, 1, isActive && running)
    const corr = BLITZ.correct[id] + (id === BLITZ.questions[0].team && t >= 4.6 ? 1 : 0)
    const pts = corr - BLITZ.missed[id]
    return (
      <div key={id} className={`gs-bz-block${isActive ? ' is-on' : ''}${isActive && tm.low ? ' is-low' : ''}`} style={{ '--tc': team.color } as CSSProperties}>
        {isActive && <span className="gs-bz-turn">ХОД</span>}
        <div className="gs-bz-name">{team.name}</div>
        <div className="gs-bz-timer"><Timer t={tm} size="mini" /></div>
        <div className="gs-bz-meta"><span className="gs-bz-pts">{pts > 0 ? `+${pts}` : pts}</span>
          <span className="gs-bz-qn">вопрос {corr + BLITZ.missed[id] + (isActive ? 1 : 0)}</span></div>
      </div>
    )
  }
  return (
    <Screen cls="gs-bz" density="dense" scene="blitz">
      <div className="gs-topbar"><span className="gs-tag">БЛИЦ</span><span className="gs-bz-bank">{BLITZ.bankLeft - turn}</span></div>
      <div className="gs-bz-row is-top" style={{ '--cols': head.length } as CSSProperties}>{head.map(block)}</div>
      <div className={`gs-bz-q${verdict ? ` v-${verdict}` : ''}`} style={{ '--tc': teamById(active).color } as CSSProperties} key={between ? 'between' : turn}>
        {between ? (<>
          <div className="gs-bz-asking">ответили верно!</div>
          <FitText text={BLITZ.questions[0].q} className="gs-bz-qtext" />
          <div className="gs-bz-verdict is-ok">Правильный ответ: {BLITZ.questions[0].a}</div>
        </>) : (<>
          <div className="gs-bz-asking">отвечают: <b>{teamById(active).name}</b></div>
          <FitText text={q.q} className="gs-bz-qtext" />
          {verdict && <div className="gs-bz-verdict is-ok">ВЕРНО<span className="gs-bz-right"> · {q.a}</span></div>}
        </>)}
      </div>
      <div className="gs-bz-row" style={{ '--cols': rest.length } as CSSProperties}>{rest.map(block)}</div>
    </Screen>
  )
}

// ── 12 СКРЭМБЛ ────────────────────────────────────────────

export function S12Scramble() {
  const { Timer } = useKit()
  const T = SCRAMBLE.timer
  const tm = useGameTimer(T, 1.0)
  const spec = SCRAMBLE.answer
  const { template, letters, order, tiles } = useMemo(() => anagramQuestion(spec.phrase, spec.order), [spec])
  const hintOrder = useMemo(() => anagramHintOrder(letters, hashStr('q-scramble')), [letters])
  // подсказки — от общего старта таймера, как anagramHintsOpen (в демо — со скоростью показа)
  const elapsedMs = (T - tm.frac * T) * 1000
  const open = anagramHintsOpen({ nowMs: 1000 + elapsedMs, startedAtIso: new Date(1000).toISOString(), intervalSec: SCRAMBLE.hintIntervalSec, timerSec: T, maxHints: anagramMaxHints(letters.length) })
  const reveal = tm.zero
  const hinted = hintOrder.slice(0, open)
  const targets = reveal ? tiles.map((_, p) => p) : hinted.map(i => anagramHintTile(order, i)).filter(p => p >= 0)
  const [showResult, setShowResult] = useState(false)
  const boardRef = useRef<HTMLDivElement>(null)
  const landed = useFlights(boardRef, targets, order, () => reveal && setShowResult(true))
  const landedCells = new Map<number, number>()
  landed.forEach(p => landedCells.set(order[p], p))
  const hintedSet = new Set(hinted)
  const all = reveal && tiles.every((_, p) => landed.has(p))
  return (
    <Screen cls={`gs-an${all ? ' is-done' : ''}${tm.low ? ' is-low' : ''}`} density="medium" scene="scramble">
      <div className="gs-topbar">
        <span className="gs-qnum">Р{SCRAMBLE.round} · ВОПРОС <b>{SCRAMBLE.index + 1}</b> / {SCRAMBLE.count}</span>
        <Timer t={tm} size="top" />
      </div>
      <div className="gs-an-clue">{SCRAMBLE.clue}</div>
      <div className="gs-an-wrap">
        <div className={`gs-an-board${all ? ' is-done' : ''}`} ref={boardRef}>
          <div className="gs-an-tiles">
            {tiles.map((ch, p) => <span key={p} data-p={p} className={`gs-an-tile${landed.has(p) ? ' is-used' : ''}`}>{ch}</span>)}
          </div>
          <div className="gs-an-words">
            {template.words.map((w, wi) => (
              <span key={wi} className="gs-an-word">
                {w.map((c, ci) => {
                  if (c.kind === 'fixed') return <span key={ci} className="gs-an-cell is-fixed">{c.ch}</span>
                  const on = landedCells.has(c.idx)
                  const isHint = hintedSet.has(c.idx) && on
                  return <span key={ci} data-i={c.idx} className={`gs-an-cell${isHint ? ' is-hint' : ''}${on && !isHint ? ' is-filled' : ''}`}>{on ? letters[c.idx] : ''}</span>
                })}
              </span>
            ))}
          </div>
        </div>
      </div>
      {(all || showResult) && (
        <div className="gs-an-result">
          <span className="gs-an-label">УГАДАЛИ</span>
          {SCRAMBLE.winners.map(id => { const team = teamById(id); return <span key={id} className="gs-an-chip" style={{ '--tc': team.color } as CSSProperties}>{team.icon ? `${team.icon} ` : ''}{team.name}</span> })}
        </div>
      )}
      <Actions items={[['← Назад', 'ghost'], 'Дальше →']} />
    </Screen>
  )
}

/** Перелёт плиток «Скрэмбла» из пула в клетку — как AnagramBoard:
 *  translate+scale к клетке, по окончании плитка «садится» (клетка
 *  получает букву, плитка в пуле гаснет). Замер — в координатах сцены. */
function useFlights(boardRef: React.RefObject<HTMLDivElement>, targets: number[], order: number[], onAll: () => void) {
  const { reduced } = useStage()
  const [landed, setLanded] = useState<ReadonlySet<number>>(() => new Set())
  const flying = useRef(new Set<number>())
  const key = targets.join(',')
  useLayoutEffect(() => {
    const board = boardRef.current
    if (!board) return
    const want = new Set(targets)
    const start = targets.filter(p => !landed.has(p) && !flying.current.has(p))
    if (reduced) { setLanded(new Set(targets)); return }
    if (!start.length) return
    const stage = board.closest('.nyl-stage') as HTMLElement | null
    const scale = stage ? stage.getBoundingClientRect().width / 1920 : 1
    start.forEach((p, n) => {
      const tile = board.querySelector<HTMLElement>(`.gs-an-tile[data-p="${p}"]`)
      const cell = board.querySelector<HTMLElement>(`.gs-an-cell[data-i="${order[p]}"]`)
      if (!tile || !cell) return
      const a = tile.getBoundingClientRect(), b = cell.getBoundingClientRect()
      const dx = ((b.left + b.width / 2) - (a.left + a.width / 2)) / scale
      const dy = ((b.top + b.height / 2) - (a.top + a.height / 2)) / scale
      flying.current.add(p)
      tile.style.transitionDelay = `${n * 0.06}s`
      tile.classList.add('is-fly')
      tile.style.setProperty('--dx', `${dx}px`)
      tile.style.setProperty('--dy', `${dy}px`)
      tile.style.setProperty('--sx', `${b.width / Math.max(1, a.width)}`)
      const done = () => {
        tile.removeEventListener('transitionend', done)
        flying.current.delete(p)
        setLanded(prev => { const s = new Set(prev); s.add(p); if ([...want].every(x => s.has(x))) onAll(); return s })
      }
      tile.addEventListener('transitionend', done)
      window.setTimeout(done, 1600 + n * 60)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, reduced])
  return landed
}

// ── 13–14 РАЗБОР (ShowAnswers): сопоставление и порядок ────

function TeamAnswers({ rows, revealed, checked }: { rows: DemoAnswer[]; revealed: boolean; checked: boolean }) {
  return (
    <div className="gs-team-answers">
      <div className="gs-tag">{revealed ? 'ОТВЕТЫ КОМАНД' : `ОТВЕТИЛИ: ${rows.length}`}</div>
      {rows.map((a, i) => {
        const team = teamById(a.team)
        return (
          <div key={a.team} className={`gs-ta${checked ? (a.ok ? ' is-ok' : ' is-no') : ''}`} style={{ '--tc': team.color, '--i': i } as CSSProperties}>
            <span className="gs-name">{team.name}</span>
            <span className="gs-txt">{revealed ? a.text : '• • •'}</span>
            {checked && <span className="gs-mark">{a.ok ? '✓' : '✗'}</span>}
          </div>
        )
      })}
    </div>
  )
}

const ITEM_FIRST = 0.1, ITEM_STEP = 0.6, ITEM_ANIM = 0.5     // как в HostScreen (revealDoneMs)

function useAnswerReveal(items: number) {
  // ShowAnswers: через 3 с ответ открывается сам; галочки — когда ответ
  // полностью на экране (revealDoneMs + 0.6 с)
  const [revealed, setRevealed] = useState(false)
  const [checked, setChecked] = useState(false)
  const doneAt = 3 + ITEM_FIRST + ITEM_STEP * Math.max(0, items - 1) + ITEM_ANIM + 0.6
  useCues([[3, () => setRevealed(true)], [doneAt, () => setChecked(true)]])
  return { revealed, checked }
}

export function S13MatchAnswer() {
  const q = Q_MATCH
  const a = q.answer.mode === 'match' ? q.answer : null
  const { revealed, checked } = useAnswerReveal(a?.left.length ?? 0)
  if (!a) return null
  const pairOf = (l: string) => a.correct_pairs.find(p => p.startsWith(l))?.slice(l.length) ?? '—'
  // метка буквы r стоит в колонке своей буквы; после показа — под картинкой пары
  const colOfLetter = (r: string) => a.left.findIndex(l => pairOf(l) === r)
  return (
    <Screen cls={`gs-ans kind-match${revealed ? ' is-revealed' : ''}${checked ? ' is-checked' : ''}`} density="dense" scene="answers">
      <div className="gs-topbar">
        <span className="gs-tag">РАУНД {Q_ROUND.number} :: ОТВЕТЫ</span>
        <span className="gs-qnum">ВОПРОС <b>{q.index + 1}</b> / {Q_ROUND.count}</span>
      </div>
      <div className="gs-ans-layout">
        <div className="gs-ans-main">
          {!revealed && <p className="gs-qtext gs-recall-pre">{q.text}</p>}
          {revealed && <div className="gs-answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>}
          <div className="gs-pairs" style={{ '--n': a.left.length } as CSSProperties}>
            <div className="gs-pairs-imgs">
              {q.media.map((m, i) => (
                <figure key={i} className="gs-img is-lettered" style={{ '--i': i } as CSSProperties}>
                  <Photo kind={m.kind} ratio={m.ratio} /><span className="gs-badge">{a.left[i]}</span>
                </figure>
              ))}
            </div>
            <div className="gs-pairs-labels">
              {a.right.map((r, k) => {
                const col = colOfLetter(r)
                const step = a.left.indexOf(a.left[col])
                return (
                  <div key={r} className="gs-pair-label" style={{ '--from': k, '--to': col, '--d': `${ITEM_FIRST + ITEM_STEP * step}s` } as CSSProperties}>
                    <span className="gs-pair-link">{a.left[col]} → {r}</span>
                    <span className="gs-key">{r}</span><span className="gs-ctext">{a.right_labels?.[k]}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <TeamAnswers rows={MATCH_TEAM_ANSWERS} revealed={revealed} checked={checked} />
      </div>
      <Actions items={revealed ? [['← Назад', 'ghost'], 'Следующий вопрос →'] : [['← Назад', 'ghost'], 'Показать ответ →']} />
    </Screen>
  )
}

export function S14OrderAnswer() {
  const q = Q_ORDER
  const a = q.answer.mode === 'order' ? q.answer : null
  const { revealed, checked } = useAnswerReveal(a?.choices.length ?? 0)
  if (!a) return null
  const correct = a.correct_order.split('')
  return (
    <Screen cls={`gs-ans kind-order${revealed ? ' is-revealed' : ''}${checked ? ' is-checked' : ''}`} density="dense" scene="answers">
      <div className="gs-topbar">
        <span className="gs-tag">РАУНД {Q_ROUND.number} :: ОТВЕТЫ</span>
        <span className="gs-qnum">ВОПРОС <b>{q.index + 1}</b> / {Q_ROUND.count}</span>
      </div>
      <div className="gs-ans-layout">
        <div className="gs-ans-main">
          <p className={`gs-qtext ${revealed ? 'gs-recall' : 'gs-recall-pre'}`}>{q.text}</p>
          {revealed && <div className="gs-answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>}
          <div className="gs-order" style={{ '--n': a.choices.length } as CSSProperties}>
            {a.choices.map((c, k) => {
              const pos = correct.indexOf(c.key)
              return (
                <div key={c.key} className="gs-order-item" style={{ '--from': k, '--to': pos, '--d': `${ITEM_FIRST + ITEM_STEP * pos}s` } as CSSProperties}>
                  <span className="gs-key">{c.key}</span>
                  <span className="gs-order-pos">{pos + 1}</span>
                  <span className="gs-ctext">{c.text}</span>
                </div>
              )
            })}
          </div>
        </div>
        <TeamAnswers rows={ORDER_TEAM_ANSWERS} revealed={revealed} checked={checked} />
      </div>
      <Actions items={revealed ? [['← Назад', 'ghost'], 'Следующий вопрос →'] : [['← Назад', 'ghost'], 'Показать ответ →']} />
    </Screen>
  )
}

export { demoSpeed }
