// ═══ «120 СЕКУНД»: все вопросы на одном слайде ═══
// Поток: слайд → пауза startDelaySec → таймер + фоновая музыка →
// таймер вышел → пауза afterTimerSec → фаза разбора (по одному вопросу).
import { useEffect, useState } from 'react'
import { mediaUrl } from '../HostScreen'
import { startTimer, gotoAnswers } from '../../lib/gameActions'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { GameState, SprintSettings, Question } from '../../types/quiz'

export function SprintBoard({ pack, round, gameState, timerNode }: {
  pack: LoadedPack; round: LoadedRound; gameState: GameState
  timerNode: React.ReactNode
}) {
  const s = round.settings as SprintSettings
  const startDelay = s.startDelaySec ?? 5
  const afterTimer = s.afterTimerSec ?? 5
  const questions = round.questions.filter(q => !q.hidden)
  const bgMusic = (round.settings as { bg_music?: string }).bg_music ?? pack.settings?.bg_music

  useEffect(() => {
    if (gameState.timer_started_at || document.hidden) return
    const t = setTimeout(() => { void startTimer() }, startDelay * 1000)
    return () => clearTimeout(t)
  }, [gameState.timer_started_at])

  useEffect(() => {
    if (!gameState.timer_started_at || !bgMusic || document.hidden) return
    const a = new Audio(mediaUrl(bgMusic))
    a.loop = true; a.volume = .6
    a.play().catch(() => {})
    return () => a.pause()
  }, [gameState.timer_started_at, bgMusic])

  useEffect(() => {
    if (!gameState.timer_started_at || document.hidden) return
    const endsAt = new Date(gameState.timer_started_at).getTime() + round.timer_seconds * 1000
    const ms = endsAt - Date.now() + afterTimer * 1000
    const t = setTimeout(() => { void gotoAnswers(0) }, Math.max(0, ms))
    return () => clearTimeout(t)
  }, [gameState.timer_started_at])

  const [countdown, setCountdown] = useState(startDelay)
  useEffect(() => {
    if (gameState.timer_started_at) return
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000)
    return () => clearInterval(t)
  }, [gameState.timer_started_at])

  // нечётное число вопросов: первый — «герой» на всю ширину над таймером
  const hero = questions.length % 2 === 1 ? questions[0] : null
  const rest = hero ? questions.slice(1) : questions
  const half = Math.ceil(rest.length / 2)
  return (
    <div className={`sprint-screen${hero ? ' with-hero' : ''}`}>
      {hero && (
        <div className="sprint-hero sprint-card">
          <span className="sprint-num">1</span>
          <div className="sprint-text">{hero.question_text}</div>
        </div>
      )}
      <div className="host-topbar sprint-topbar">
        <span className="qnum">{round.title_lines.join(' ')}</span>
      </div>
      <div className="sprint-col">
        {rest.slice(0, half).map((q, i) => <SprintCard key={q.id} n={(hero ? 2 : 1) + i} q={q} />)}
      </div>
      <div className="sprint-center">
        {gameState.timer_started_at
          ? <div className="sprint-timer">{timerNode}</div>
          : <div className="sprint-pre"><div className="sprint-pre-num">{countdown}</div>
              <div className="mono-tag">ЧИТАЕМ ВОПРОСЫ</div></div>}
      </div>
      <div className="sprint-col">
        {rest.slice(half).map((q, i) => <SprintCard key={q.id} n={(hero ? 2 : 1) + half + i} q={q} />)}
      </div>
    </div>
  )
}

function SprintCard({ n, q }: { n: number; q: Question }) {
  const img = (q.media.question ?? []).find(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  return (
    <div className="sprint-card">
      <span className="sprint-num">{n}</span>
      <div className="sprint-text">{q.question_text}</div>
      {img && <img src={mediaUrl(img)} alt="" className="sprint-img" />}
    </div>
  )
}
