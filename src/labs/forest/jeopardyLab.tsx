// ═══ Лаборатория: «Своя игра» — Цветы цен (утверждено) ═══
// Та же сцена и тот же таймлайн, что в игре (src/forest/stage2/Jeopardy.tsx), но на тестовом вечере и в одном
// перематываемом таймлайне. Здесь нет ни одной строки самой сцены — только «что показать в состоянии».
import { useMemo } from 'react'
import { useEntrance, type S1Props } from '../../forest/stage1/common'
import { JeopardyScene, JpPanel, JpVessel, jpBuild, jpSelPos, JP_NOTE, type JpView } from '../../forest/stage2/Jeopardy'
import { jpLayout } from '../../forest/stage2/layout'
import { JP2, TEAM } from '../../forest/stage2/data'

export const JP_STATES = [
  { id: 'fresh', name: 'Доска: все цены доступны' }, { id: 'board', name: 'Доска: часть цен сыграна' }, { id: 'catdone', name: 'Тема сыграна целиком' }, { id: 'select', name: 'Выбор цены' },
  { id: 'question', name: 'Плитка открыта: звучит трек, ответы идут' }, { id: 'reveal', name: 'Показан ответ, оценки ✓/✗' },
  { id: 'back', name: 'Возврат к доске: плитка гаснет' }, { id: 'complete', name: 'Доска сыграна целиком' },
]
export const JP_VARIANTS = [
  { id: 'B', name: 'B · Цветы цен', note: 'Пять больших цветов — пять тем, имя на листе под цветком. Четыре лепестка — четыре цены, по часовой стрелке от верхнего левого. Выбранный лепесток отрывается и вырастает в огромный лепесток с отсчётом; на ответе он переворачивается — на изнанке написан правильный ответ. Сыгранный лепесток опадает; когда тема сыграна вся, остаётся сердцевина.' },
]

const TH = JP2.themes.map(t => ({ ...t, values: JP2.values })), VAL = JP2.values, OPEN = `${JP2.open.ti}-${JP2.open.i}`
const key = (ti: number, i: number) => `${ti}-${i}`
const viewOf = (s: string): JpView => (s === 'select' || s === 'question' || s === 'reveal' || s === 'back' ? s : 'board')
function timerFor(state: string) { return state === 'question' ? { start: JP2.clip, from: 1.6, run: 8 } : null }

export function JeopardyLab({ state, nOv, onReady }: S1Props) {
  const layout = useMemo(() => jpLayout(TH.map(t => t.values.length)), [])
  const view = viewOf(state)
  const sel = jpSelPos(layout, JP2.open.ti, JP2.open.i)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => jpBuild(tl, q, view, sel, { lab: true }), timerFor(state), [state])

  const n = nOv ?? (state === 'question' ? nLive : null)
  const played = state === 'complete' ? TH.flatMap((_, ti) => VAL.map((_, i) => key(ti, i))) : state === 'fresh' ? [] : state === 'back' ? [...JP2.played, OPEN] : state === 'catdone' ? [...JP2.played, '1-2', '1-3'] : JP2.played
  const stOf = (k: string) => (k === OPEN && state === 'select' ? 'sel' : k === OPEN && (state === 'question' || state === 'reveal') ? 'taken' : played.includes(k) ? `done${k === OPEN && state === 'back' ? ' just' : ''}` : 'av')
  const remain = TH.length * VAL.length - played.length
  const reveal = state === 'reveal'
  const t = TH[JP2.open.ti], v = VAL[JP2.open.i]
  const qn = state === 'question' ? n : null
  const open = <>
    <JpVessel n={qn} playing={state === 'question'} />
    <JpPanel theme={t} value={v} reveal={reveal} correct={JP2.correct} count={0} countSteps={JP2.answers.length}
      rows={JP2.answers.map(a => { const tm = TEAM(a.team); return { key: a.team, name: tm.name, color: tm.color, text: a.text, verdict: a.ok } })}
      note={n != null ? <div className="jp2-hint">{JP_NOTE}</div> : null} />
  </>
  return (
    <JeopardyScene rootRef={root} cls={state} view={view} title={JP2.title} sub={state === 'complete' ? ' · все плитки сыграны' : ` · осталось плиток: ${remain}`}
      themes={TH} layout={layout} stOf={stOf} sel={sel} n={n} open={open} />
  )
}
