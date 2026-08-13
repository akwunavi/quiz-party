// ═══ «УГАДАЙ МЕЛОДИЮ»: аукцион секунд ═══
// Состояние — в game_state.melody, единый автомат с ДЕДЛАЙНАМИ (не setTimeout),
// поэтому проектор и телефоны всегда в одной стадии, даже после перезагрузки.
//
// spinning (барабан по плиткам, БЕЗ модалки) → listen (1 сек трека)
// → bidding (ставки 2–10) → bids (показ, кто играет) → snippet (интервал играет)
// → answering (ответ + фоновая музыка) → passed (вторая слушает трек целиком)
// → done (трек закрыт)
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { mediaUrl } from '../HostScreen'
import { useAnswers } from '../../hooks/useAnswers'
import { useTeams } from '../../hooks/useTeams'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { GameState, MelodySettings, MelodyState, MelodyTheme } from '../../types/quiz'

async function saveMelody(next: MelodyState) {
  await supabase.from('game_state').update({ melody: next }).eq('id', 1)
}
const inSec = (s: number) => new Date(Date.now() + s * 1000).toISOString()

export function MelodyBoard({ pack, round, gameState }: {
  pack: LoadedPack; round: LoadedRound; gameState: GameState
}) {
  const s = round.settings as MelodySettings
  const themes = s.themes ?? []
  const m: MelodyState = gameState.melody ?? {}
  const teams = useTeams(gameState.game_id)
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const played = m.played ?? []
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 200); return () => clearInterval(t) }, [])

  const deadline = m.deadline ? new Date(m.deadline).getTime() : 0
  const left = deadline ? Math.max(0, Math.ceil((deadline - now) / 1000)) : 0
  const expired = !!deadline && now >= deadline

  const [ti, i] = (m.key ?? '0-0').split('-').map(Number)
  const track = themes[ti]?.tracks[i]
  const bidRef = `q-mel-${m.key}-bid`
  const ansRef = `q-mel-${m.key}`
  const bids = answers.filter(a => a.question_ref === bidRef)

  // выбор трека командой: игрок пишет ключ в melody.pick → сразу слушаем
  useEffect(() => {
    if (!m.pick || document.hidden) return
    void saveMelody({ ...m, key: m.pick, pick: undefined, stage: 'listen',
      deadline: inSec(3), order: undefined, turn: 0, chooser: undefined })
  }, [m.pick])

  // ── единственный обработчик переходов: сработал дедлайн — двигаем стадию ──
  useEffect(() => {
    if (!expired || document.hidden) return
    if (m.stage === 'spinning') {
      void saveMelody({ ...m, stage: 'listen', deadline: inSec(2) })
    } else if (m.stage === 'bidding') {
      const order = bids
        .map(a => ({ id: a.team_id, sec: Number(a.answer_text) || 99, at: a.updated_at }))
        .sort((x, y) => x.sec - y.sec || +new Date(x.at) - +new Date(y.at))
        .map(b => b.id)
      void saveMelody({ ...m, stage: 'bids', order, turn: 0, deadline: undefined })
    } else if (m.stage === 'snippet') {
      void saveMelody({ ...m, stage: 'answering', deadline: inSec(s.answerSec ?? 30) })
    } else if (m.stage === 'answering' || m.stage === 'passed') {
      void saveMelody({ ...m, deadline: undefined })   // время вышло — судит ведущий
    }
  }, [expired, m.stage])

  // ── 1 секунда трека на стадии listen ──
  useEffect(() => {
    if (m.stage !== 'listen' || !track?.audio || document.hidden) return
    const a = new Audio(mediaUrl(track.audio))
    audioRef.current = a
    let stop: number | undefined
    // отсчёт секунды начинается, когда звук РЕАЛЬНО пошёл (иначе съедается буферизацией)
    a.addEventListener('playing', () => {
      stop = window.setTimeout(() => {
        a.pause()
        void saveMelody({ ...m, stage: 'bidding', deadline: inSec(s.bidSec ?? 10) })
      }, 1000)
    }, { once: true })
    a.play().catch(() => {
      void saveMelody({ ...m, stage: 'bidding', deadline: inSec(s.bidSec ?? 10) })
    })
    return () => { if (stop) clearTimeout(stop); a.pause() }
  }, [m.stage, m.key])

  // ── выбранный интервал ──
  useEffect(() => {
    if (m.stage !== 'snippet' || !track?.audio || document.hidden) return
    const a = new Audio(mediaUrl(track.audio))
    audioRef.current = a
    a.play().catch(() => {})
    return () => a.pause()
  }, [m.stage, m.key])

  // ── фоновая музыка на время размышления ──
  useEffect(() => {
    const bg = (round.settings as { bg_music?: string }).bg_music ?? pack.settings?.bg_music
    if (m.stage !== 'answering' || !bg || document.hidden) return
    const a = new Audio(mediaUrl(bg))
    a.loop = true; a.volume = .45
    a.play().catch(() => {})
    return () => a.pause()
  }, [m.stage])

  // ── вторая команда: трек целиком, по окончании — окно на ответ ──
  useEffect(() => {
    if (m.stage !== 'passed' || m.deadline || !track?.audio || document.hidden) return
    const a = new Audio(mediaUrl(track.audio))
    audioRef.current = a
    a.play().catch(() => {})
    a.onended = () => void saveMelody({ ...m, deadline: inSec(s.passAnswerSec ?? 10) })
    return () => a.pause()
  }, [m.stage])

  if (themes.length === 0) return (
    <div className="host-screen grid-bg">
      <div className="mono-tag">УГАДАЙ МЕЛОДИЮ</div>
      <p>Темы не заполнены — добавь их в редакторе раунда</p>
    </div>
  )

  const allKeys = themes.flatMap((t, x) => t.tracks.map((_, y) => `${x}-${y}`))
  const freeKeys = allKeys.filter(k => !played.includes(k))
  const idle = !m.stage || m.stage === 'idle' || m.stage === 'done'
  const chooserTeam = teams.find(t => t.id === m.chooser)

  const startSpin = () => {
    const target = freeKeys[Math.floor(Math.random() * freeKeys.length)]
    void saveMelody({ ...m, key: target, stage: 'spinning', deadline: inSec(s.spinSec ?? 10),
      order: undefined, turn: 0, chooser: undefined })
  }

  const currentId = m.order?.[m.turn ?? 0]
  const currentTeam = teams.find(t => t.id === currentId)
  const bidSec = Number(bids.find(b => b.team_id === currentId)?.answer_text) || 0
  const ans = answers.find(a => a.question_ref === ansRef && a.team_id === currentId)

  const grade = async (correct: boolean) => {
    if (!ans) return
    const isFirst = (m.turn ?? 0) === 0
    const pts = correct ? (isFirst ? (bidSec <= 5 ? 2 : 1) : 0.5) : 0
    await supabase.from('answers').update({ is_correct: correct, stake: pts }).eq('id', ans.id)
    if (correct) await saveMelody({ ...m, stage: 'done', deadline: undefined,
      played: [...played, m.key!], chooser: currentId })
    else await saveMelody({ ...m, deadline: undefined })  // время стоп, ждём передачи хода
  }
  const pass = async () => {
    if ((m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1) {
      await saveMelody({ ...m, stage: 'passed', turn: 1, deadline: undefined })
    } else {
      await saveMelody({ ...m, stage: 'done', deadline: undefined, played: [...played, m.key!] })
    }
  }

  return (
    <div className="host-screen grid-bg mel-screen">
      <h1 className="neon-title mel-title">{round.title_lines.join(' ') || 'УГАДАЙ МЕЛОДИЮ'}</h1>
      <MelodyGrid themes={themes} played={played} spinning={m.stage === 'spinning'}
        spinKey={m.key} spinLeft={left} spinTotal={s.spinSec ?? 10} />

      {idle && freeKeys.length > 0 && m.chooser && (
        <div className="mel-choosing">
          <div className="mel-big" style={{ color: chooserTeam?.color }}>
            {chooserTeam?.name} выбирает следующий трек на телефоне
          </div>
          <button className="ghost dark" onClick={() =>
            void saveMelody({ ...m, chooser: undefined })}>Выбрать рулеткой</button>
        </div>
      )}
      {idle && !m.chooser && (
        <div className="host-actions">
          {freeKeys.length > 0
            ? <button onClick={startSpin}>{played.length === 0 ? 'Стартуем!' : 'Следующий трек'}</button>
            : <div className="mono-tag">ВСЕ ТРЕКИ ОТЫГРАНЫ</div>}
        </div>
      )}

      {/* модалка появляется только с момента прослушивания, на барабане её нет */}
      {m.stage && !idle && m.stage !== 'spinning' && (
        <div className="mel-overlay">
          <div className="mel-modal hud-frame">
            <div className="mel-modal-head">
              <div className="mel-modal-theme">{themes[ti]?.name} · трек {i + 1}</div>
              {!!deadline && <div className="mel-count">{left}</div>}
            </div>

            {m.stage === 'listen' && <div className="mel-big">СЛУШАЕМ 1 СЕКУНДУ…</div>}

            {m.stage === 'bidding' && (<>
              <div className="mel-big">ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?</div>
              <div className="mel-bids">
                {teams.map(t => {
                  const b = bids.find(x => x.team_id === t.id)
                  return <div key={t.id} className={`mel-bid-row${b ? ' win' : ''}`}>
                    <span style={{ color: t.color }}>{t.name}</span>
                    <b>{b ? 'ставка принята ✓' : '…'}</b><span /></div>
                })}
              </div>
            </>)}

            {m.stage === 'bids' && (<>
              <div className="mono-tag">СТАВКИ КОМАНД</div>
              <div className="mel-bids">
                {(m.order ?? []).map((id, pos) => {
                  const t = teams.find(x => x.id === id)
                  const b = bids.find(x => x.team_id === id)
                  return (
                    <div key={id} className={`mel-bid-row${pos === 0 ? ' win' : ''}`}>
                      <span style={{ color: t?.color }}>{t?.name}</span>
                      <b>{b?.answer_text} сек</b>
                      {pos === 0 ? <span className="mel-win-tag">ИГРАЕТ</span> : <span />}
                    </div>
                  )
                })}
                {(m.order ?? []).length === 0 && <div style={{ opacity: .6 }}>ставок нет</div>}
              </div>
              <div className="mel-actions">
                <button disabled={!currentId}
                  onClick={() => void saveMelody({ ...m, stage: 'snippet', deadline: inSec(bidSec || 5) })}>
                  Играем {bidSec || 5} сек →
                </button>
                <button className="ghost dark"
                  onClick={() => void saveMelody({ ...m, stage: 'done', deadline: undefined,
                    played: [...played, m.key!] })}>Пропустить трек</button>
              </div>
            </>)}

            {m.stage === 'snippet' && (
              <div className="mel-big" style={{ color: currentTeam?.color }}>
                {currentTeam?.name} · играет {bidSec} сек
              </div>
            )}

            {(m.stage === 'answering' || m.stage === 'passed') && (<>
              <div className="mel-big" style={{ color: currentTeam?.color }}>
                {m.stage === 'passed' ? 'ХОД ПЕРЕДАН · ' : ''}{currentTeam?.name ?? '—'}
              </div>
              <div className="mel-answer">
                {ans?.answer_text ? <>Ответ: <b>{ans.answer_text}</b></>
                  : <span style={{ opacity: .6 }}>ждём ответ…</span>}
              </div>
              {ans?.is_correct === true && (
                <div className="answer-reveal hud-frame">
                  <div className="answer-label">ВЕРНО ✓</div>
                  <div className="answer-main">{track?.correct}</div>
                </div>
              )}
              {ans?.is_correct === false && (
                <div className="mel-wrong">
                  ✗ НЕВЕРНО · ответ не раскрываем
                  {(m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1
                    ? ' — передайте ход второй команде' : ' — трек закрывается'}
                </div>
              )}
              <div className="mel-actions">
                <button disabled={!ans} onClick={() => void grade(true)}>✓ Верно</button>
                <button className="ghost" disabled={!ans} onClick={() => void grade(false)}>✗ Неверно</button>
                <button className={ans?.is_correct === false ? '' : 'ghost dark'}
                  onClick={() => void pass()}>
                  {(m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1 ? 'Передать ход →' : 'Закрыть трек'}
                </button>
              </div>
            </>)}
          </div>
        </div>
      )}
    </div>
  )
}

/** Барабан: подсветка бежит по плиткам и замедляется к концу. */
function MelodyGrid({ themes, played, spinning, spinKey, spinLeft, spinTotal }: {
  themes: MelodyTheme[]; played: string[]
  spinning: boolean; spinKey?: string; spinLeft: number; spinTotal: number
}) {
  const keys = themes.flatMap((t, ti) => t.tracks.map((_, i) => `${ti}-${i}`))
  const free = keys.filter(k => !played.includes(k))
  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    if (!spinning || free.length === 0) return
    let stop = false
    const step = () => {
      if (stop) return
      // прыгаем в случайную плитку, а не по порядку
      setCursor(Math.floor(Math.random() * free.length))
      const p = 1 - Math.max(0, spinLeft) / Math.max(1, spinTotal)
      setTimeout(step, 60 + p * p * 420)
    }
    const t = setTimeout(step, 60)
    return () => { stop = true; clearTimeout(t) }
  }, [spinning, spinLeft <= 1])

  const highlighted = spinning
    ? (spinLeft <= 1 ? spinKey : free[cursor % Math.max(1, free.length)])
    : undefined

  return (
    <div className="mel-board" style={{ gridTemplateColumns: `repeat(${themes.length}, minmax(0,1fr))` }}>
      {themes.map((t, ti) => (
        <div key={`h${ti}`} className="mel-theme">{t.name || `Тема ${ti + 1}`}</div>
      ))}
      {themes.map((t, ti) => t.tracks.map((_, i) => {
        const key = `${ti}-${i}`
        const done = played.includes(key)
        const hot = highlighted === key
        return (
          <div key={key} className={`mel-tile${done ? ' done' : ''}${hot ? ' spin' : ''}`}
            style={{ gridColumn: ti + 1, gridRow: i + 2 }}>{done ? '·' : i + 1}</div>
        )
      }))}
    </div>
  )
}
