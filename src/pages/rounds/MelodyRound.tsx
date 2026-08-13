// ═══ «УГАДАЙ МЕЛОДИЮ»: аукцион секунд ═══
// Стадии (живут в game_state.melody, чтобы телефоны видели то же самое):
// idle → spinning (10с рандом) → listen (1 сек трека) → bidding (10с ставки 2–10)
// → bids (показ ставок) → answering (30с первой команде, фоновая музыка)
// → passed (вторая по ставке слушает трек целиком + 10с) → done
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { mediaUrl } from '../HostScreen'
import { useAnswers } from '../../hooks/useAnswers'
import { useTeams } from '../../hooks/useTeams'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { GameState, MelodySettings, MelodyState, MelodyTheme } from '../../types/quiz'

export async function setMelody(patch: MelodyState) {
  await supabase.from('game_state').update({ melody: patch }).eq('id', 1)
}

export function MelodyBoard({ pack, round, gameState }: {
  pack: LoadedPack; round: LoadedRound; gameState: GameState
}) {
  const s = round.settings as MelodySettings
  const themes = s.themes ?? []
  const m: MelodyState = gameState.melody ?? {}
  const teams = useTeams(gameState.game_id)
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const played = m.played ?? []

  if (themes.length === 0) return (
    <div className="host-screen grid-bg">
      <div className="mono-tag">УГАДАЙ МЕЛОДИЮ</div>
      <p>Темы не заполнены — добавь их в редакторе раунда</p>
    </div>
  )

  const allKeys = themes.flatMap((t, ti) => t.tracks.map((_, i) => `${ti}-${i}`))
  const freeKeys = allKeys.filter(k => !played.includes(k))

  return (
    <div className="host-screen grid-bg mel-screen">
      <h1 className="neon-title mel-title">{round.title_lines.join(' ') || 'УГАДАЙ МЕЛОДИЮ'}</h1>
      <div className="mel-board" style={{ gridTemplateColumns: `repeat(${themes.length}, minmax(0,1fr))` }}>
        {themes.map((t, ti) => (
          <div key={`h${ti}`} className="mel-theme">{t.name || `Тема ${ti + 1}`}</div>
        ))}
        {themes.map((t, ti) => t.tracks.map((_, i) => {
          const key = `${ti}-${i}`
          const done = played.includes(key)
          const spinning = m.stage === 'spinning' && m.key === key
          return (
            <div key={key} className={`mel-tile${done ? ' done' : ''}${spinning ? ' spin' : ''}`}
              style={{ gridColumn: ti + 1, gridRow: i + 2 }}>{done ? '·' : i + 1}</div>
          )
        }))}
      </div>

      {(!m.stage || m.stage === 'idle' || m.stage === 'done') && (
        <div className="host-actions">
          {freeKeys.length > 0
            ? <button onClick={() => void startSpin(freeKeys, s)}>
                {played.length === 0 ? 'Стартуем!' : 'Следующий трек'}</button>
            : <div className="mono-tag">ВСЕ ТРЕКИ ОТЫГРАНЫ</div>}
        </div>
      )}

      {m.stage && m.stage !== 'idle' && m.stage !== 'done' && (
        <MelodyStage pack={pack} round={round} gameState={gameState} m={m}
          themes={themes} settings={s} teams={teams} answers={answers} />
      )}
    </div>
  )
}

async function startSpin(freeKeys: string[], s: MelodySettings) {
  const target = freeKeys[Math.floor(Math.random() * freeKeys.length)]
  await setMelody({ stage: 'spinning', key: target, startedAt: new Date().toISOString(),
    played: undefined })
  // визуальный «барабан» крутится на проекторе, по окончании — стадия listen
  setTimeout(() => { void setMelody({ stage: 'listen', key: target, startedAt: new Date().toISOString() }) },
    (s.spinSec ?? 10) * 1000)
}

function MelodyStage({ pack, round, gameState, m, themes, settings, teams, answers }: {
  pack: LoadedPack; round: LoadedRound; gameState: GameState
  m: MelodyState; themes: MelodyTheme[]; settings: MelodySettings
  teams: { id: string; name: string; color: string }[]
  answers: { id: string; team_id: string; question_ref: string; answer_text: string; is_correct: boolean | null; updated_at: string }[]
}) {
  const [ti, i] = (m.key ?? '0-0').split('-').map(Number)
  const track = themes[ti]?.tracks[i]
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [left, setLeft] = useState(0)
  const bgMusic = (round.settings as { bg_music?: string }).bg_music ?? pack.settings?.bg_music

  // общий обратный отсчёт стадии
  const stageSec = m.stage === 'spinning' ? (settings.spinSec ?? 10)
    : m.stage === 'bidding' ? (settings.bidSec ?? 10)
    : m.stage === 'answering' ? (settings.answerSec ?? 30)
    : m.stage === 'passed' ? (settings.passAnswerSec ?? 10) : 0
  useEffect(() => {
    if (!m.startedAt || !stageSec) return
    const tick = () => setLeft(Math.max(0, Math.round(
      stageSec - (Date.now() - new Date(m.startedAt!).getTime()) / 1000)))
    tick()
    const t = setInterval(tick, 250)
    return () => clearInterval(t)
  }, [m.startedAt, m.stage])

  // 1 секунда трека на стадии listen → сразу ставки
  useEffect(() => {
    if (m.stage !== 'listen' || !track?.audio || document.hidden) return
    const a = new Audio(mediaUrl(track.audio))
    audioRef.current = a
    a.play().catch(() => {})
    const stop = setTimeout(() => {
      a.pause()
      void setMelody({ ...m, stage: 'bidding', startedAt: new Date().toISOString() })
    }, 1000)
    return () => { clearTimeout(stop); a.pause() }
  }, [m.stage])

  // ставки закончились → показываем и определяем очередь
  useEffect(() => {
    if (m.stage !== 'bidding' || !m.startedAt || document.hidden) return
    const ms = new Date(m.startedAt).getTime() + (settings.bidSec ?? 10) * 1000 - Date.now()
    const t = setTimeout(() => {
      const bids = answers.filter(a => a.question_ref === `q-mel-${m.key}-bid`)
        .map(a => ({ team: a.team_id, sec: Number(a.answer_text) || 99, at: a.updated_at }))
        .sort((x, y) => x.sec - y.sec || +new Date(x.at) - +new Date(y.at))
      void setMelody({ ...m, stage: 'bids', order: bids.map(b => b.team), turn: 0,
        startedAt: new Date().toISOString() })
    }, Math.max(0, ms))
    return () => clearTimeout(t)
  }, [m.stage, answers.length])

  // отыгрыш выбранного интервала → таймер на ответ + фоновая музыка
  const playSnippet = (sec: number) => {
    if (!track?.audio || document.hidden) return
    const a = new Audio(mediaUrl(track.audio))
    audioRef.current = a
    a.play().catch(() => {})
    setTimeout(() => {
      a.pause()
      void setMelody({ ...m, stage: 'answering', startedAt: new Date().toISOString() })
    }, sec * 1000)
  }
  useEffect(() => {
    if (m.stage !== 'answering' || !bgMusic || document.hidden) return
    const a = new Audio(mediaUrl(bgMusic))
    a.loop = true; a.volume = .5
    a.play().catch(() => {})
    return () => a.pause()
  }, [m.stage])

  // вторая команда: полный трек, потом окно на ответ
  useEffect(() => {
    if (m.stage !== 'passed' || !track?.audio || document.hidden) return
    const a = new Audio(mediaUrl(track.audio))
    audioRef.current = a
    a.play().catch(() => {})
    a.onended = () => void setMelody({ ...m, stage: 'passed', startedAt: new Date().toISOString() })
    return () => { a.pause() }
  }, [m.stage])

  const bids = answers.filter(a => a.question_ref === `q-mel-${m.key}-bid`)
  const current = m.order?.[m.turn ?? 0]
  const currentTeam = teams.find(t => t.id === current)
  const bidSec = Number(bids.find(b => b.team_id === current)?.answer_text) || 0
  const ans = answers.find(a => a.question_ref === `q-mel-${m.key}` && a.team_id === current)

  const grade = async (correct: boolean) => {
    if (!ans) return
    // баллы: 1-я команда 2 (ставка 2–5) / 1 (6–10), 2-я команда 0.5
    const isFirst = (m.turn ?? 0) === 0
    const pts = correct ? (isFirst ? (bidSec <= 5 ? 2 : 1) : 0.5) : 0
    await supabase.from('answers').update({ is_correct: correct, stake: pts }).eq('id', ans.id)
    if (correct) {
      await setMelody({ ...m, stage: 'done', played: [...(m.played ?? []), m.key!], chooser: current })
    }
  }
  const pass = async () => {
    if ((m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1) {
      await setMelody({ ...m, stage: 'passed', turn: 1, startedAt: new Date().toISOString() })
    } else {
      await setMelody({ ...m, stage: 'done', played: [...(m.played ?? []), m.key!], chooser: undefined })
    }
  }

  return (
    <div className="mel-overlay">
      <div className="mel-modal hud-frame">
        <div className="mel-modal-head">
          <div className="mel-modal-theme">{themes[ti]?.name} · трек {i + 1}</div>
          {stageSec > 0 && <div className="mel-count">{left}</div>}
        </div>

        {m.stage === 'spinning' && <div className="mel-big">ВЫБИРАЕМ ТРЕК…</div>}
        {m.stage === 'listen' && <div className="mel-big">СЛУШАЕМ 1 СЕКУНДУ</div>}
        {m.stage === 'bidding' && (
          <>
            <div className="mel-big">ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?</div>
            <div className="mel-bids">
              {teams.map(t => {
                const b = bids.find(x => x.team_id === t.id)
                return <span key={t.id} className={`mel-bid${b ? ' set' : ''}`}
                  style={{ color: t.color }}>{t.name}{b ? ' ✓' : ' …'}</span>
              })}
            </div>
          </>
        )}
        {m.stage === 'bids' && (
          <>
            <div className="mono-tag">СТАВКИ КОМАНД</div>
            <div className="mel-bids">
              {(m.order ?? []).map((id, pos) => {
                const t = teams.find(x => x.id === id)
                const b = bids.find(x => x.team_id === id)
                return (
                  <div key={id} className={`mel-bid-row${pos === 0 ? ' win' : ''}`}>
                    <span style={{ color: t?.color }}>{t?.name}</span>
                    <b>{b?.answer_text} сек</b>
                    {pos === 0 && <span className="mel-win-tag">ИГРАЕТ</span>}
                  </div>
                )
              })}
            </div>
            <div className="mel-actions">
              <button onClick={() => playSnippet(bidSec || 5)}>Играем {bidSec || 5} сек →</button>
            </div>
          </>
        )}
        {(m.stage === 'answering' || m.stage === 'passed') && (
          <>
            <div className="mel-big" style={{ color: currentTeam?.color }}>
              {m.stage === 'passed' ? 'ХОД ПЕРЕДАН · ' : ''}{currentTeam?.name}
            </div>
            <div className="mel-answer">{ans?.answer_text
              ? <>Ответ: <b>{ans.answer_text}</b></>
              : <span style={{ opacity: .6 }}>ждём ответ…</span>}</div>
            {ans?.is_correct === true && (
              <div className="answer-reveal hud-frame">
                <div className="answer-label">ВЕРНО ✓</div>
                <div className="answer-main">{track?.correct}</div>
              </div>
            )}
            <div className="mel-actions">
              <button onClick={() => void grade(true)}>✓ Верно</button>
              <button className="ghost" onClick={() => void grade(false)}>✗ Неверно</button>
              <button className="ghost dark" onClick={() => void pass()}>Передать ход →</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
