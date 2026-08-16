// ═══ «СКАЧКИ БУЛЬДОГОВ»: финал-лотерея ═══
// Честность: сид генерируется В МОМЕНТ нажатия «Старт!» и пишется в game_state.
// До этой секунды исхода не существует нигде — ведущий не знает победителя.
// Из сида детерминированно считается вся гонка, поэтому любой экран (и даже
// перезагрузка страницы) разыгрывает одинаковый забег.
import { getRoomId } from '../../lib/room'
import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { gotoRound, finishGame, showScoreboard } from '../../lib/gameActions'
import { mediaUrl } from '../HostScreen'
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
  // «бульдожьи отвлечения»: случайные паузы (лужа понюхать, бабочка, прилёг)
  const ICONS = ['🦋', '💤', '🐦', '🍂']
  const pauses = Array.from({ length: 5 }, () => {
    const list: { at: number; dur: number; icon: string }[] = []
    if (rnd() < 0.6) list.push({ at: (0.25 + rnd() * 0.3) * raceSec,
      dur: 0.6 + rnd() * 0.9, icon: ICONS[Math.floor(rnd() * ICONS.length)] })
    if (rnd() < 0.25) list.push({ at: (0.62 + rnd() * 0.22) * raceSec,
      dur: 0.5 + rnd() * 0.7, icon: ICONS[Math.floor(rnd() * ICONS.length)] })
    return list
  })
  const pausedAt = (i: number, t: number) =>
    pauses[i].find(p => t >= p.at && t < p.at + p.dur)
  // эффективное время: реальное минус уже отстоянные паузы
  const effT = (i: number, t: number) => {
    let acc = 0
    for (const p of pauses[i]) acc += Math.min(Math.max(0, t - p.at), p.dur)
    return t - acc
  }
  const progressWithStops = (i: number, t: number) => progress(i, effT(i, t))
  const finishReal = finish.map((f, i) => f + pauses[i].reduce((s, p) => s + p.dur, 0))
  const places = finishReal.map((f, i) => ({ i, f })).sort((a, b) => a.f - b.f).map(x => x.i)
  return { progress: progressWithStops, finish: finishReal, places, pausedAt }
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

  // музыка забега: своя (настройка раунда) или общая фоновая пакета.
  // Жест уже был (клик «Старт!»), поэтому обычный Audio играет без плясок.
  useEffect(() => {
    const src = (round.settings as { race_music?: string }).race_music
      ?? pack.settings?.bg_music
    if (race.stage !== 'running' || !src || document.hidden) return
    const a = new Audio(mediaUrl(src))
    a.loop = true; a.volume = .55
    a.play().catch(() => {})
    return () => a.pause()
  }, [race.stage])

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
      await supabase.from('game_sessions').update({
        melody: { ...gameState.melody, race: { ...race, stage: 'done' } },
      }).eq('id', getRoomId())
    })()
  }, [running, allFinished])

  // ставки открываются сразу с появлением экрана — лишний клик убран
  useEffect(() => {
    if (!race.stage && !document.hidden) void openBets()
  }, [race.stage])

  const start = async () => {
    // сид рождается ЗДЕСЬ — до этого клика исход не существует
    const seed = (crypto.getRandomValues(new Uint32Array(1))[0]) >>> 0
    await supabase.from('game_sessions').update({
      melody: { ...gameState.melody, race: { seed, stage: 'running', startedAt: new Date().toISOString() } },
    }).eq('id', getRoomId())
  }
  const openBets = async () => {
    await supabase.from('game_sessions').update({
      melody: { ...gameState.melody, race: { stage: 'betting' } },
    }).eq('id', getRoomId())
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
          const pause = running && !done ? scenario?.pausedAt(i, t) : undefined
          const finished = !!scenario && t >= scenario.finish[i]
          return (
            <div key={i} className="race-lane">
              <span className="race-num">{i + 1}</span>
              <div className="race-dog" style={{ left: `calc(${6 + p * 82}% )` }}>
                {pause && <span className="race-pause">{pause.icon}</span>}
                <Bulldog color={DOG_COLORS[i]} running={!!running && !allFinished && !pause && !finished} />
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
            <button disabled={bets.length === 0} onClick={() => void start()}>
              🏁 Старт! (ставки закрываются)</button>
          </div>
        </div>
      )}

      {done && scenario && (
        <div className="race-result">
          <div className="host-actions">
            <button className="ghost" onClick={() => void showScoreboard()}>Табло</button>
            <button onClick={() => {
              if (gameState.round_number + 1 < pack.rounds.length)
                void gotoRound(gameState.round_number + 1)
              else void finishGame(gameState.pack_id)
            }}>{gameState.round_number + 1 < pack.rounds.length
              ? 'Следующий раунд →' : 'Финальные итоги →'}</button>
          </div>
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

/** Сидящий французик: приземистый шар-на-шаре, ошейник с медалью-номером. */
function SittingBulldog({ color, n }: { color: typeof DOG_COLORS[number]; n: number }) {
  const b = color.body
  return (
    <svg viewBox="0 0 150 144" className="bulldog-sit">
      <path d="M75,60 C112,60 122,86 118,112 C116,128 34,128 32,112 C28,86 38,60 75,60 Z" fill={b} />
      <ellipse cx="34" cy="112" rx="17" ry="13" fill={b} />
      <ellipse cx="116" cy="112" rx="17" ry="13" fill={b} />
      <path d="M75,72 C89,72 93,96 91,118 C90,123 60,123 59,118 C57,96 61,72 75,72 Z" fill="#fff" opacity=".88" />
      <rect x="54" y="94" width="13" height="34" rx="6.5" fill={b} />
      <rect x="83" y="94" width="13" height="34" rx="6.5" fill={b} />
      <ellipse cx="60.5" cy="129" rx="9" ry="5.5" fill="#fff" />
      <ellipse cx="89.5" cy="129" rx="9" ry="5.5" fill="#fff" />
      <circle cx="75" cy="42" r="34" fill={b} />
      <path d="M43,26 C29,11 33,-4 47,-2 C58,0 63,13 61,28 C56,34 47,34 43,26 Z" fill={b} />
      <path d="M107,26 C121,11 117,-4 103,-2 C92,0 87,13 89,28 C94,34 103,34 107,26 Z" fill={b} />
      <path d="M47,23 C38,12 41,1 49,2 C56,3 58,15 56,24 Z" fill="#f1b8c8" />
      <path d="M103,23 C112,12 109,1 101,2 C94,3 92,15 94,24 Z" fill="#f1b8c8" />
      <ellipse cx="59" cy="40" rx="6.6" ry="7.6" fill="#241d22" />
      <ellipse cx="91" cy="40" rx="6.6" ry="7.6" fill="#241d22" />
      <circle cx="61.4" cy="37.2" r="2.6" fill="#fff" />
      <circle cx="93.4" cy="37.2" r="2.6" fill="#fff" />
      <path d="M53,52 C53,45 97,45 97,52 C97,66 87,73 75,73 C63,73 53,66 53,52 Z" fill="#fff" opacity=".92" />
      <ellipse cx="75" cy="53" rx="7.4" ry="5.2" fill="#3a2e33" />
      <path d="M75,57 v6.5" stroke="#3a2e33" strokeWidth="2" strokeLinecap="round" />
      <path d="M65,64 Q70,69.5 75,65 Q80,69.5 85,64" fill="none" stroke="#3a2e33" strokeWidth="2" strokeLinecap="round" />
      <path d="M51,71 C60,79 90,79 99,71 L99,78 C90,85 60,85 51,78 Z" fill="#e63946" />
      <circle cx="75" cy="83" r="10.5" fill="#f5c542" stroke="#c99a1e" strokeWidth="2" />
      <text x="75" y="88.5" textAnchor="middle" fontSize="14.5" fontWeight="700" fill="#5a4210">{n}</text>
    </svg>
  )
}

/** Бегущий: тот же стикер-стиль в профиль-¾, лапы и голова анимируются. */
function Bulldog({ color, running }: { color: typeof DOG_COLORS[number]; running: boolean }) {
  const b = color.body, mk = color.mask
  return (
    <svg viewBox="0 0 160 112" className={`bulldog${running ? ' run' : ''}`}>
      <g className="bd-dust">
        <circle cx="26" cy="92" r="3.4" fill="#cfd8e3" />
        <circle cx="18" cy="86" r="2.2" fill="#cfd8e3" />
        <circle cx="33" cy="96" r="1.9" fill="#cfd8e3" />
      </g>
      <g className="bd-speed" stroke="#9fc3e8" strokeWidth="2.2" strokeLinecap="round" opacity=".5">
        <line x1="6" y1="46" x2="26" y2="46" />
        <line x1="10" y1="60" x2="28" y2="60" />
      </g>
      <g className="bd-all">
        {/* дальние лапы */}
        <path className="bd-hind h2" d="M64,74 Q60,84 63,92 Q64,96 71,96 L71,92 Q67,90 68,82 Q70,76 71,74 Z" fill={b} />
        <path className="bd-fore f2" d="M101,72 Q106,82 104,90 Q105,94 112,94 L112,90 Q108,88 108,81 Q108,74 107,70 Z" fill={b} />
        {/* тело */}
        <path d="M40,60 C36,42 54,34 74,34 C96,34 108,44 110,56 C112,70 100,81 80,82 C58,83 42,76 40,60 Z" fill={b} />
        <path d="M56,74 C66,80 88,80 100,72 C96,80 66,84 56,74 Z" fill="#fff" opacity=".85" />
        <circle cx="38" cy="52" r="4.5" fill={b} stroke={mk} strokeWidth="1" />
        {/* ближние лапы */}
        <path className="bd-hind h1" d="M50,70 Q44,80 48,89 Q49,94 57,94 L57,89 Q52,88 53,80 Q56,73 58,70 Z" fill={b} />
        <path className="bd-fore f1" d="M90,72 Q94,82 91,90 Q92,95 100,95 L100,90 Q96,88 97,80 Q99,74 98,71 Z" fill={b} />
        {/* голова */}
        <g className="bd-head">
          <circle cx="118" cy="44" r="30" fill={b} />
          <path d="M88,32 C74,14 78,-2 92,-1 C103,0 108,14 106,30 C100,36 92,37 88,32 Z" fill={b} />
          <path d="M148,32 C162,14 158,-2 144,-1 C133,0 128,14 130,30 C136,36 144,37 148,32 Z" fill={b} />
          <path d="M92,28 C83,15 86,3 94,4 C101,5 103,17 101,27 Z" fill="#f1b8c8" />
          <path d="M144,28 C153,15 150,3 142,4 C135,5 133,17 135,27 Z" fill="#f1b8c8" />
          <ellipse cx="105" cy="42" rx="6" ry="7" fill="#241d22" />
          <ellipse cx="131" cy="42" rx="6" ry="7" fill="#241d22" />
          <circle cx="107" cy="39.5" r="2.4" fill="#fff" />
          <circle cx="133" cy="39.5" r="2.4" fill="#fff" />
          <path d="M100,52 C100,45 136,45 136,52 C136,64 128,71 118,71 C108,71 100,64 100,52 Z" fill="#fff" opacity=".92" />
          <ellipse cx="118" cy="53" rx="6.4" ry="4.6" fill="#3a2e33" />
          <path d="M118,56.5 v6" stroke="#3a2e33" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M110,62 Q114,67 118,63 Q122,67 126,62" fill="none" stroke="#3a2e33" strokeWidth="1.9" strokeLinecap="round" />
          <path className="bd-tongue" d="M112,65 Q118,76 124,65 Q122,71 118,71.5 Q114,71 112,65 Z" fill="#ff8da1" />
        </g>
      </g>
    </svg>
  )
}
