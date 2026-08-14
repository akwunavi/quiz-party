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

      {(race.stage === 'running' || done) && <div className="race-track hud-frame">
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
      </div>}

      {(!race.stage || race.stage === 'betting') && (
        <div className="race-panel">
          <div className="mono-tag">ВЫБЕРИТЕ СВОЕГО БУЛЬДОГА · СТАВКИ ТАЙНЫЕ</div>
          <div className="race-lineup">
            {dogs.map((name, i) => (
              <div key={i} className="race-candidate">
                <SittingBulldog color={DOG_COLORS[i]} n={i + 1} />
                <span className="race-tag"><b>№{i + 1}</b> {name}</span>
              </div>
            ))}
          </div>
          {/* никто не видит, КТО на кого поставил — только счётчик готовности */}
          <div className="mono-tag" style={{ color: bets.length === teams.length && teams.length > 0
            ? 'var(--answer)' : undefined }}>
            СТАВКИ СДЕЛАЛИ: {bets.length} / {teams.length}
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

/** Сидящий французик (фас): для экрана выбора. Уши-локаторы, брыли, грудка. */
function SittingBulldog({ color, n }: { color: typeof DOG_COLORS[number]; n: number }) {
  return (
    <svg viewBox="0 0 120 150" className="bulldog-sit">
      {/* задние бёдра */}
      <ellipse cx="34" cy="122" rx="20" ry="16" fill={color.body} />
      <ellipse cx="86" cy="122" rx="20" ry="16" fill={color.body} />
      {/* тело-груша */}
      <path d="M60,58 C90,58 96,96 92,124 C90,136 30,136 28,124 C24,96 30,58 60,58 Z" fill={color.body} />
      {/* белая грудка */}
      <path d="M60,72 C72,72 76,100 74,126 C73,132 47,132 46,126 C44,100 48,72 60,72 Z" fill="#fbf7ef" />
      {/* передние лапки-колонны */}
      <rect x="43" y="98" width="12" height="38" rx="6" fill={color.body} />
      <rect x="65" y="98" width="12" height="38" rx="6" fill={color.body} />
      <ellipse cx="49" cy="137" rx="8" ry="5" fill="#fbf7ef" />
      <ellipse cx="71" cy="137" rx="8" ry="5" fill="#fbf7ef" />
      <path d="M46,135 v4 M49,136 v4 M52,135 v4 M68,135 v4 M71,136 v4 M74,135 v4"
        stroke={color.mask} strokeWidth="1.2" opacity=".55" />
      {/* уши-локаторы: широкие, скруглённые, розовые внутри */}
      <path d="M28,44 C18,20 22,6 34,4 C44,3 50,20 48,40 C40,46 32,46 28,44 Z" fill={color.body} />
      <path d="M92,44 C102,20 98,6 86,4 C76,3 70,20 72,40 C80,46 88,46 92,44 Z" fill={color.body} />
      <path d="M32,40 C26,22 28,12 35,10 C41,9 45,22 43,38 Z" fill="#eeb6c6" opacity=".8" />
      <path d="M88,40 C94,22 92,12 85,10 C79,9 75,22 77,38 Z" fill="#eeb6c6" opacity=".8" />
      {/* голова: широкая, чуть шире плеч */}
      <ellipse cx="60" cy="48" rx="34" ry="28" fill={color.body} />
      {/* лобная морщина */}
      <path d="M48,32 Q60,28 72,32" fill="none" stroke={color.mask} strokeWidth="2" opacity=".5" strokeLinecap="round" />
      {/* глаза: круглые, широко посаженные, блик */}
      <circle cx="46" cy="46" r="6.4" fill="#241d22" />
      <circle cx="74" cy="46" r="6.4" fill="#241d22" />
      <circle cx="48" cy="44" r="2" fill="#fff" />
      <circle cx="76" cy="44" r="2" fill="#fff" />
      {/* морда-маска с брылями */}
      <path d="M44,54 C44,46 76,46 76,54 C76,68 68,74 60,74 C52,74 44,68 44,54 Z" fill={color.mask} opacity=".92" />
      <path d="M52,62 C50,70 54,73 60,73 M68,62 C70,70 66,73 60,73"
        fill="none" stroke="#241d22" strokeWidth="1.6" opacity=".6" />
      {/* нос широкий + перегородка */}
      <ellipse cx="60" cy="55" rx="7" ry="5" fill="#241d22" />
      <path d="M60,58 v7" stroke="#241d22" strokeWidth="1.6" />
      {/* язычок */}
      <ellipse cx="60" cy="72" rx="5" ry="4" fill="#ff8da1" />
      {/* номер на груди */}
      <circle cx="60" cy="96" r="11" fill={color.mask} />
      <text x="60" y="101" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">{n}</text>
    </svg>
  )
}

/** Бегущий французик (профиль): мощная грудь и голова, компактная попа — как в жизни. */
function Bulldog({ color, running }: { color: typeof DOG_COLORS[number]; running: boolean }) {
  return (
    <svg viewBox="0 0 140 90" className={`bulldog${running ? ' run' : ''}`}>
      {/* компактная попа: заметно меньше груди, чуть ниже холки */}
      <ellipse className="bd-butt" cx="40" cy="50" rx="15" ry="12" fill={color.body} />
      <circle cx="27" cy="42" r="3.6" fill={color.mask} />
      {/* заднее бедро — мускулистое, но небольшое */}
      <ellipse cx="42" cy="56" rx="10" ry="9" fill={color.mask} opacity=".28" />
      {/* тело: клин от узкой талии к МОЩНОЙ груди */}
      <path d="M40,40 C62,30 88,30 104,42 C110,52 106,64 90,68 C68,72 46,64 40,52 Z" fill={color.body} />
      {/* глубокая грудина */}
      <ellipse cx="94" cy="58" rx="16" ry="13" fill={color.body} />
      <path d="M82,66 C90,72 100,72 106,64 C102,72 86,74 82,66 Z" fill="#fbf7ef" />
      {/* лапы: короткие, передние мощнее */}
      <rect className="bd-leg a" x="34" y="58" width="8" height="19" rx="4" fill={color.body} />
      <rect className="bd-leg b" x="48" y="60" width="8" height="18" rx="4" fill={color.body} />
      <rect className="bd-leg b" x="82" y="64" width="10" height="17" rx="4.5" fill={color.body} />
      <rect className="bd-leg a" x="98" y="62" width="10" height="18" rx="4.5" fill={color.body} />
      {/* складка на холке */}
      <path d="M88,36 Q96,32 103,38" fill="none" stroke={color.mask} strokeWidth="2.4" opacity=".5" strokeLinecap="round" />
      {/* голова: крупная, почти как грудь */}
      <circle cx="114" cy="34" r="24" fill={color.body} />
      {/* уши-локаторы */}
      <path className="bd-ear l" d="M98,18 C92,0 98,-4 106,0 C112,4 110,14 106,20 Z" fill={color.body} />
      <path className="bd-ear r" d="M120,14 C122,-4 130,-4 134,2 C137,8 132,16 126,20 Z" fill={color.body} />
      <path d="M100,15 C97,4 101,1 105,4 C108,7 107,12 104,16 Z" fill="#eeb6c6" opacity=".8" />
      <path d="M123,12 C124,2 129,2 131,6 C133,9 130,14 126,16 Z" fill="#eeb6c6" opacity=".8" />
      {/* лобная морщина */}
      <path d="M104,24 Q114,20 124,25" fill="none" stroke={color.mask} strokeWidth="2" opacity=".5" strokeLinecap="round" />
      {/* глаз */}
      <circle cx="108" cy="32" r="4.4" fill="#241d22" />
      <circle cx="109.5" cy="30.5" r="1.4" fill="#fff" />
      {/* морда-маска, брыль, нос */}
      <path d="M118,36 C132,34 138,42 134,50 C130,56 120,56 115,50 C112,44 112,38 118,36 Z"
        fill={color.mask} opacity=".92" />
      <ellipse cx="133" cy="43" rx="4.6" ry="3.8" fill="#241d22" />
      <path d="M122,52 Q126,56 131,52" fill="none" stroke="#241d22" strokeWidth="1.6" opacity=".6" />
      {/* язык на бегу */}
      <ellipse className="bd-tongue" cx="126" cy="58" rx="4" ry="6.4" fill="#ff8da1" />
    </svg>
  )
}
