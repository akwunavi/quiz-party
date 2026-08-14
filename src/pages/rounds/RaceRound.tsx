// ═══ «СКАЧКИ БУЛЬДОГОВ»: финал-лотерея ═══
// Честность: сид генерируется В МОМЕНТ нажатия «Старт!» и пишется в game_state.
// До этой секунды исхода не существует нигде — ведущий не знает победителя.
// Из сида детерминированно считается вся гонка, поэтому любой экран (и даже
// перезагрузка страницы) разыгрывает одинаковый забег.
import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAnswers } from '../../hooks/useAnswers'
import { useTeams } from '../../hooks/useTeams'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { GameState, RaceSettings } from '../../types/quiz'

const DOG_COLORS = [
  { body: '#f2e3c9', mask: '#b99a7d', name: 'кремовый' },   // Френк — как на фото
  { body: '#8a5a33', mask: '#4c2f17', name: 'тигровый' },
  { body: '#3b3b40', mask: '#232326', name: 'чёрный' },
  { body: '#e8e2d8', mask: '#c96f3b', name: 'бело-рыжий' },
  { body: '#9aa7b5', mask: '#6c7886', name: 'голубой' },
]

/** Детерминированный PRNG: одинаковый сид → одинаковая гонка на всех экранах. */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Сценарий забега: для каждой собаки кусочная скорость по 8 сегментам. */
function buildRace(seed: number, raceSec: number) {
  const rnd = mulberry32(seed)
  const SEG = 8
  const dogs = Array.from({ length: 5 }, () => {
    const speeds = Array.from({ length: SEG }, () => 0.45 + rnd() * 0.9)
    const total = speeds.reduce((s, v) => s + v, 0)
    return { speeds, total }
  })
  // финишное время: нормируем так, чтобы лучший пришёл ровно к raceSec * 0.92,
  // остальные позже пропорционально своей суммарной «скорости»
  const best = Math.max(...dogs.map(d => d.total))
  const finish = dogs.map(d => raceSec * 0.92 * (best / d.total))
  // прогресс собаки в момент t: интеграл её сегментов, масштабированный к финишу
  const progress = (i: number, t: number) => {
    const f = finish[i]
    const x = Math.min(1, Math.max(0, t / f))
    const seg = x * SEG
    const k = Math.floor(seg)
    const frac = seg - k
    let acc = 0
    for (let j = 0; j < k; j++) acc += dogs[i].speeds[j]
    acc += (dogs[i].speeds[Math.min(k, SEG - 1)] ?? 0) * frac
    return Math.min(1, acc / dogs[i].total)
  }
  const places = finish.map((f, i) => ({ i, f })).sort((a, b) => a.f - b.f).map(x => x.i)
  return { progress, finish, places }
}

export function RaceBoard({ pack, round, gameState }: {
  pack: LoadedPack; round: LoadedRound; gameState: GameState
}) {
  const s = round.settings as RaceSettings
  const dogs = (s.dogs ?? []).length === 5 ? s.dogs! : ['Френк', 'Батон', 'Пельмень', 'Турбо', 'Ракета']
  const raceSec = s.raceSec ?? 18
  const race = gameState.melody?.race ?? {}
  const teams = useTeams(gameState.game_id)
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const bets = answers.filter(a => a.question_ref === `q-race-${gameState.round_number}`)
  const graded = useRef(false)

  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 66); return () => clearInterval(t) }, [])

  const scenario = useMemo(
    () => (race.seed != null ? buildRace(race.seed, raceSec) : null),
    [race.seed, raceSec])
  const t = race.startedAt ? (now - new Date(race.startedAt).getTime()) / 1000 : 0
  const running = race.stage === 'running' && scenario
  const done = race.stage === 'done'
  const allFinished = scenario && t >= Math.max(...scenario.finish) + 1

  // финиш: начисляем баллы (5/4/3/2/1 по месту выбранной собаки) — один раз
  useEffect(() => {
    if (!running || !allFinished || graded.current || document.hidden) return
    graded.current = true
    const placeOf = new Map(scenario.places.map((dog, pos) => [dog, pos]))
    void (async () => {
      for (const b of bets) {
        const dog = Number(b.answer_text) - 1
        const pos = placeOf.get(dog)
        const pts = pos != null ? 5 - pos : 0
        await supabase.from('answers').update({ is_correct: true, stake: pts }).eq('id', b.id)
      }
      await supabase.from('game_state').update({
        melody: { ...gameState.melody, race: { ...race, stage: 'done' } },
      }).eq('id', 1)
    })()
  }, [running, allFinished])

  const start = async () => {
    // сид рождается ЗДЕСЬ — до этого клика исход не существует
    const seed = (crypto.getRandomValues(new Uint32Array(1))[0]) >>> 0
    await supabase.from('game_state').update({
      melody: { ...gameState.melody, race: { seed, stage: 'running', startedAt: new Date().toISOString() } },
    }).eq('id', 1)
  }
  const openBets = async () => {
    await supabase.from('game_state').update({
      melody: { ...gameState.melody, race: { stage: 'betting' } },
    }).eq('id', 1)
  }

  return (
    <div className="host-screen grid-bg race-screen">
      <div className="host-topbar"><span className="qnum">{round.title_lines.join(' ') || 'СКАЧКИ БУЛЬДОГОВ'}</span></div>

      <div className="race-track hud-frame">
        {/* трибуны и финиш */}
        <div className="race-stands">{Array.from({ length: 26 }, (_, i) =>
          <span key={i} style={{ animationDelay: `${(i % 5) * .3}s` }}>{['🎉','👏','🙌','⭐','🎊'][i % 5]}</span>)}
        </div>
        <div className="race-finish" />
        {dogs.map((name, i) => {
          const p = running || done ? (scenario ? scenario.progress(i, done ? 999 : t) : 0) : 0
          const pos = scenario && (done || allFinished)
            ? scenario.places.indexOf(i) : null
          return (
            <div key={i} className="race-lane">
              <span className="race-num">{i + 1}</span>
              <div className="race-dog" style={{ left: `calc(${6 + p * 82}% )` }}>
                <Bulldog color={DOG_COLORS[i]} running={!!running && !allFinished} />
                <span className="race-name">{name}{pos != null && ` · ${pos + 1} место`}</span>
              </div>
              <span className="race-treat">🍖</span>
            </div>
          )
        })}
      </div>

      {(!race.stage || race.stage === 'betting') && (
        <div className="race-panel">
          <div className="mono-tag">СТАВКИ КОМАНД · выбери бульдога 1–5 на телефоне</div>
          <div className="mel-bids" style={{ width: 'min(560px, 90vw)' }}>
            {[...teams].sort((a, b) => a.name.localeCompare(b.name)).map(tm => {
              const b = bets.find(x => x.team_id === tm.id)
              return <div key={tm.id} className={`mel-bid-row${b ? ' win' : ''}`}>
                <span style={{ color: tm.color }}>{tm.name}</span>
                <b>{b ? `№${b.answer_text}` : '…'}</b><span /></div>
            })}
          </div>
          <div className="host-actions">
            {!race.stage && <button onClick={() => void openBets()}>Открыть ставки</button>}
            {race.stage === 'betting' &&
              <button disabled={bets.length === 0} onClick={() => void start()}>
                🏁 Старт! (ставки закрываются)</button>}
          </div>
        </div>
      )}

      {done && scenario && (
        <div className="race-result">
          <div className="answer-reveal" style={{ padding: '14px 30px' }}>
            <div className="answer-label">ПОБЕДИТЕЛЬ</div>
            <div className="answer-main">№{scenario.places[0] + 1} {dogs[scenario.places[0]]}</div>
          </div>
          <div className="mono-tag">
            {scenario.places.map((d, pos) => `${pos + 1}. ${dogs[d]}`).join('  ·  ')}
          </div>
        </div>
      )}
    </div>
  )
}

/** Стилизованный французский бульдог: SVG, трясущиеся уши и попа на бегу. */
function Bulldog({ color, running }: { color: typeof DOG_COLORS[number]; running: boolean }) {
  return (
    <svg viewBox="0 0 120 80" className={`bulldog${running ? ' run' : ''}`}>
      {/* хвостик и попа */}
      <ellipse className="bd-butt" cx="30" cy="52" rx="22" ry="16" fill={color.body} />
      <circle cx="12" cy="44" r="5" fill={color.body} />
      {/* тело */}
      <ellipse cx="55" cy="54" rx="28" ry="15" fill={color.body} />
      {/* лапы */}
      <rect className="bd-leg a" x="34" y="60" width="7" height="16" rx="3" fill={color.mask} />
      <rect className="bd-leg b" x="52" y="62" width="7" height="15" rx="3" fill={color.mask} />
      <rect className="bd-leg a" x="70" y="60" width="7" height="16" rx="3" fill={color.mask} />
      {/* голова */}
      <circle cx="88" cy="38" r="20" fill={color.body} />
      {/* уши-локаторы */}
      <path className="bd-ear l" d="M74,24 L70,2 L84,16 Z" fill={color.body} />
      <path className="bd-ear r" d="M96,22 L104,0 L108,20 Z" fill={color.body} />
      <path d="M75,21 L73,9 L81,17 Z" fill="#e8b4c8" opacity=".7" />
      <path d="M98,19 L102,7 L105,18 Z" fill="#e8b4c8" opacity=".7" />
      {/* морда-маска */}
      <ellipse cx="94" cy="44" rx="12" ry="9" fill={color.mask} />
      <circle cx="97" cy="40" r="3.4" fill="#2b2026" />
      <circle cx="82" cy="34" r="3" fill="#2b2026" />
      <circle cx="83" cy="33" r="1" fill="#fff" />
      {/* высунутый язык */}
      <ellipse className="bd-tongue" cx="96" cy="52" rx="4" ry="6" fill="#ff8da1" />
    </svg>
  )
}
