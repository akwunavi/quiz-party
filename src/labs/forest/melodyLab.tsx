// ═══ Лаборатория: «Угадай мелодию» — Колокольчики (утверждено) ═══
// Та же сцена и тот же таймлайн, что в игре (src/forest/stage2/Melody.tsx), но на тестовом вечере и в одном
// перематываемом таймлайне: рулетка здесь идёт по времени таймлайна (перемотка/пауза работают), в игре — по дедлайну.
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { useEntrance, type S1Props } from '../../forest/stage1/common'
import { MelodyScene, MelPanel, melBuild, MEL_STAGE, type MelView } from '../../forest/stage2/Melody'
import { melLayout, melBellPos } from '../../forest/stage2/layout'
import { melodySpinPath, melodySpinAt, melodyPoints } from '../../lib/melody'
import { MEL2, TEAM, ALL_TEAMS } from '../../forest/stage2/data'

export const MEL_STATES = [
  { id: 'fresh', name: 'Доска: все треки доступны' }, { id: 'idle', name: 'Доска: часть треков отыграна' }, { id: 'catdone', name: 'Тема отыграна целиком' },
  { id: 'spinning', name: 'Рулетка выбирает трек' },
  { id: 'listen', name: 'Слушаем 1 секунду' }, { id: 'bidding', name: 'Ставки: за сколько секунд угадаете' },
  { id: 'bids', name: 'Ставки собраны, очередь' }, { id: 'snippet', name: 'Играет отрывок по ставке' },
  { id: 'answering', name: 'Отвечает первая команда' }, { id: 'wrong', name: 'Неверно — ход второй' },
  { id: 'passed', name: 'Ход передан: трек целиком' }, { id: 'reveal', name: 'Угадали: ответ и баллы' },
  { id: 'miss', name: 'Никто не угадал: ответ' }, { id: 'back', name: 'Назад к доске: трек отыгран' }, { id: 'complete', name: 'Все треки отыграны' },
]
export const MEL_VARIANTS = [
  { id: 'A', name: 'A · Колокольчики', note: 'Четыре стебля колокольчиков — четыре темы, имя темы на листе над стеблем. Колокол — трек, номер на чашечке. Рулетка — светлячок перелетает с цветка на цветок и садится на выбранный. Выбранный колокол вырастает слева и раскачивается, пока звучит музыка; на верном ответе распускается золотом. Отыгранный колокол закрывается и вянет.' },
]

const TH = MEL2.themes, NT = MEL2.tracks
const keys = TH.flatMap((_, ti) => Array.from({ length: NT }, (_, i) => `${ti}-${i}`))
const [PTI, PI] = MEL2.pick.split('-').map(Number)
const SPIN_FROM = 0.4, SPIN_MS = MEL2.spinSec * 1000
const FREE = keys.filter(k => !MEL2.played.includes(k))
/** путь рулетки — та же melodySpinPath, что в игре; LAND — момент последнего прыжка (остановка на итоге) */
const SPIN = melodySpinPath(FREE.length, FREE.indexOf(MEL2.pick), SPIN_MS, 7051)
const LAND = SPIN_FROM + (SPIN.times[SPIN.times.length - 1] ?? SPIN_MS) / 1000
const viewOf = (s: string): MelView => (s === 'fresh' || s === 'catdone' || s === 'complete' ? 'idle' : s as MelView)
function timerFor(state: string) {
  if (state === 'bidding') return { start: MEL2.bidSec, from: 0.8, run: 6 }
  if (state === 'answering') return { start: MEL2.answerSec, from: 1.0, run: 8 }
  if (state === 'passed') return { start: MEL2.passAnswerSec, from: 1.0, run: 6 }
  return null
}

export function MelodyLab({ state, nOv, onReady }: S1Props) {
  const tm = timerFor(state)
  const view = viewOf(state)
  const layout = useMemo(() => melLayout(TH.map(() => NT)), [])
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const sel = melBellPos(layout[PTI], PI)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    tlRef.current = tl
    melBuild(tl, q, view, sel, { spin: { from: SPIN_FROM, ms: SPIN_MS, land: LAND, pick: MEL2.pick } })
  }, tm, [state])

  // рулетка: какая плитка подсвечена — читаем из положения таймлайна (перемотка/пауза работают)
  const spin = useRef(SPIN)
  const [hot, setHot] = useState<string | null>(null)
  useEffect(() => {
    if (state !== 'spinning') { setHot(null); return }
    const tick = () => { const t = tlRef.current?.time() ?? 0; const ms = (t - SPIN_FROM) * 1000; setHot(ms < 0 ? null : ms >= SPIN_MS ? MEL2.pick : FREE[melodySpinAt(spin.current, ms)]) }
    gsap.ticker.add(tick); return () => gsap.ticker.remove(tick)
  }, [state])

  const n = nOv ?? (tm ? nLive : null)
  const played = state === 'complete' ? keys : state === 'fresh' ? [] : state === 'catdone' ? [...MEL2.played, '3-0', '3-1', '3-2'] : state === 'reveal' || state === 'miss' || state === 'back' ? [...MEL2.played, MEL2.pick] : MEL2.played
  // три независимых состояния: временная подсветка рулетки (hot) — итог (won, только после остановки) —
  // отыгран/занят. Выбранный трек ДО остановки ничем не отличается от остальных свободных.
  const landed = state === 'spinning' && hot === MEL2.pick && (tlRef.current?.time() ?? 0) >= LAND
  const stOf = (k: string) => (k === MEL2.pick && MEL_STAGE.has(state) ? 'taken' : played.includes(k) ? `done${k === MEL2.pick && state === 'back' ? ' just' : ''}` : hot === k ? (landed ? 'won' : 'hot') : 'av')

  const first = TEAM(MEL2.bids[0].team), second = TEAM(MEL2.bids[1].team), bid = MEL2.bids[0].sec
  const won = melodyPoints(bid, true)
  const panel = <MelPanel view={view} d={{
    themeName: TH[PTI], trackNo: PI + 1,
    timer: n != null ? { n, total: state === 'answering' ? MEL2.answerSec : 10, seeds: state === 'answering' ? 30 : 10 } : null,
    bidding: [...ALL_TEAMS].sort((a, b) => a.name.localeCompare(b.name)).map(t => ({ team: t, has: MEL2.bidding.includes(t.id) })),
    bids: MEL2.bids.map(b => ({ team: TEAM(b.team), sec: b.sec })),
    cur: state === 'passed' ? second : first, bidSec: bid, winPts: won,
    answer: state === 'passed' ? null : state === 'wrong' ? MEL2.wrongAnswer : MEL2.firstAnswer,
    wrong: state === 'wrong' ? '✗ Неверно · ответ не раскрываем — ход переходит второй команде' : null,
    correct: MEL2.correct, wonTeam: first, wonPts: won,
  }} />
  return (
    <MelodyScene rootRef={root} cls={state} view={view} title={MEL2.title} sub={state === 'complete' ? ' · все треки отыграны' : ` · осталось треков: ${keys.length - played.length}`}
      themes={TH.map(name => ({ name, tracks: NT }))} layout={layout} stOf={stOf} pickNo={PI + 1} hot={hot} landed={landed} n={n} panel={panel} />
  )
}
