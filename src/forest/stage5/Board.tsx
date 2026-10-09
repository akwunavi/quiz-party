// ═══ Этап 5 · Табло ═══
// Настоящее табло (HostScreen.ScoreboardScreen): строка на команду — место, название, очки по каждому сыгранному
// раунду, сумма; раскрывается с ПОСЛЕДНЕГО места к первому (по строке за раз); после раунда строки один раз «переезжают» со
// своих прежних мест на новые (FLIP); место считается плотно — у двух команд с равной суммой одно место, следующее
// на единицу больше, а выше стоит та, чей поздний раунд сильнее (lib/ranking.ts). Здесь — те же правила на тех же данных.
// Лес: табло — листья-плашки на ветвях; место — медальон (золото, серебро, бронза — тёплые, без неона), очки раундов — ягоды
// (лучшая в раунде светится), сумма — плод справа. Длинные названия переносятся на две строки и не обрезаются.
import { useMemo } from 'react'
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { ALL, rank, tot } from './data'

export const BOARD_STATES = [
  { id: 'regular', name: 'Обычное табло: 8 команд после раунда 2' },
  { id: 'many', name: 'Много команд: 12, длинные названия, после раунда 4' },
  { id: 'rank', name: 'Смена мест: после раунда 2 строки переезжают' },
  { id: 'tie', name: 'Ничья по сумме: итог шести раундов' },
  { id: 'final', name: 'Итоги игры: полная таблица с разбивкой по раундам' },
]
export const BOARD_VARIANTS = [{ id: 'A', name: 'Листья на ветви', note: 'Строка — лист-плашка: место (медальон), название, очки каждого сыгранного раунда (ягоды, лучшая в раунде светится), сумма. Раскрытие — с последнего места к первому. После раунда строки переезжают на новые места, у сдвинувшихся — стрелка ▲ / ▼ с числом мест. Ничья: одно место у обеих команд, их соединяет узелок лозы, выше стоит та, у кого сильнее поздний раунд.' }]
const LEAF = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'
const MED = ['', 'gold', 'silver', 'bronze']

export function Board({ state, onReady }: S1Props) {
  const cfg = useMemo(() => {
    if (state === 'regular') return { teams: ALL.filter(t => ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8'].includes(t.id)), upto: 2, flip: false }
    if (state === 'many') return { teams: ALL, upto: 4, flip: false }
    if (state === 'rank') return { teams: ALL, upto: 2, flip: true }
    return { teams: ALL, upto: 6, flip: false }
  }, [state])
  const fin = state === 'final'
  const rows = rank(cfg.teams, cfg.upto), n = rows.length, big = n <= 8
  const before = cfg.flip ? rank(cfg.teams, cfg.upto - 1) : rows
  const bIdx = new Map(before.map((r, i) => [r.t.id, i])), bPlace = new Map(before.map(r => [r.t.id, r.place]))
  const rh = big ? 84 : 66, gap = big ? 9 : 5, y0 = big ? 200 : 168
  const best = Array.from({ length: cfg.upto }, (_, r) => Math.max(...cfg.teams.map(t => t.score[r])))
  const { root } = useEntrance(onReady, (tl, q) => {
    tl.fromTo(q('.bd-title'), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
      .fromTo(q('.bd-colh'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.4)
    if (!cfg.flip) {
      rows.forEach((_, i) => tl.fromTo(q(`.bd-row[data-i="${i}"]`), { opacity: 0, x: -30, clipPath: 'inset(0 100% 0 0 round 40px)' }, { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0 round 40px)', duration: 0.55, ease: 'power2.out' }, 0.7 + (n - 1 - i) * (fin ? 0.24 : 0.34)))
      tl.fromTo(q('.bd-row[data-i="0"] .bd-med'), { scale: 1 }, { scale: 1.25, yoyo: true, repeat: 1, duration: 0.35 }, 0.7 + n * (fin ? 0.24 : 0.34) + 0.2)
    } else {
      // сначала табло как после раунда 1, потом — новая колонка очков, суммы и переезд строк
      tl.fromTo(q('.bd-row'), { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.04 }, 0.5)
      tl.addLabel('M', 2.2)
      rows.forEach((r, i) => {
        const dy = ((bIdx.get(r.t.id) ?? i) - i) * (rh + gap)
        tl.fromTo(q(`.bd-row[data-i="${i}"]`), { y: dy }, { y: 0, duration: 1.3, ease: 'power3.inOut' }, 'M+=0.3')
          .fromTo(q(`.bd-row[data-i="${i}"] .bd-bry.last`), { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(2.2)' }, 'M')
          .fromTo(q(`.bd-row[data-i="${i}"] .bd-tot .a`), { opacity: 1 }, { opacity: 0, duration: 0.3 }, 'M+=0.5')
          .fromTo(q(`.bd-row[data-i="${i}"] .bd-tot .b`), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 'M+=0.6')
        if (bPlace.get(r.t.id) !== r.place) tl.fromTo(q(`.bd-row[data-i="${i}"] .bd-chip`), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, 'M+=1.5')
      })
      tl.fromTo(q('.bd-colh .last'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 }, 'M')
    }
  }, null, [state])
  const rects: Rect[] = [{ x: 200, y: 20, w: 1520, h: 1040 }]
  const tieKnots = rows.map((r, i) => (i > 0 && rows[i - 1].place === r.place ? i : -1)).filter(i => i >= 0)
  return (
    <S1Screen rects={rects} n={null} rootRef={root} cls={`s5 bd bd-${state}${big ? ' big' : ''}`}>
      <div className="bd-title"><b>{fin ? 'Итоги игры' : 'Табло'}</b><span>{fin ? 'разбивка по раундам' : `после раунда ${cfg.upto} из 6`}</span></div>
      <div className="bd-colh" style={{ top: y0 - 40 }}>
        {Array.from({ length: cfg.upto }, (_, r) => <i key={r} className={r === cfg.upto - 1 && cfg.flip ? 'last' : ''} style={{ left: (big ? 790 : 760) + r * (big ? 76 : 58), width: big ? 60 : 46 }}>{r + 1}</i>)}
        <em>Σ</em>
      </div>
      {rows.map((r, i) => {
        const prevTot = cfg.flip ? tot(r.t, cfg.upto - 1) : r.sum
        const delta = cfg.flip ? (bPlace.get(r.t.id) ?? r.place) - r.place : 0
        return <div key={r.t.id} className={`bd-row${r.place <= 3 ? ' pod p' + r.place : ''}`} data-i={i} style={{ top: y0 + i * (rh + gap), height: rh }}>
          <svg className="bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={LEAF} /></svg>
          <span className={`bd-med ${MED[r.place] ?? ''}`}>{r.place}</span>
          <span className="bd-chip" style={delta === 0 ? { visibility: 'hidden' } : undefined}>{delta > 0 ? `▲ ${delta}` : `▼ ${-delta}`}</span>
          <span className="bd-nm" style={{ color: r.t.color }}>{r.t.name}</span>
          <span className="bd-brs">{Array.from({ length: cfg.upto }, (_, k) => {
            const v = r.t.score[k]
            return <i key={k} className={`bd-bry${v === best[k] ? ' best' : ''}${v === 0 ? ' z' : ''}${cfg.flip && k === cfg.upto - 1 ? ' last' : ''}`}>{v}</i>
          })}</span>
          <span className="bd-tot">{cfg.flip ? <><b className="a">{prevTot}</b><b className="b">{r.sum}</b></> : <b>{r.sum}</b>}</span>
        </div>
      })}
      {tieKnots.map(i => <svg key={i} className="bd-knot" style={{ top: y0 + i * (rh + gap) - gap - 12 }} viewBox="0 0 60 30" aria-hidden><path d="M 6 4 C 20 4 18 26 30 26 C 42 26 40 4 54 4" /><circle cx="30" cy="15" r="6" /></svg>)}
    </S1Screen>
  )
}
