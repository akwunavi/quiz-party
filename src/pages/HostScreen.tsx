import { useEffect, useMemo, useState } from 'react'
import { useGameState } from '../hooks/useGameState'
import { listPacks, loadPack, metaLine, type LoadedPack } from '../lib/packLoader'
import { selectPackAndStart, gotoRound, gotoQuestion, revealAnswer, finishGame, resetGame } from '../lib/gameActions'
import { Timer } from '../components/Timer'
import type { Pack, Question } from '../types/quiz'

// ═══ Экран хоста (проектор) ═══
// До старта: выбор пакета. После: титулы раундов → вопросы → reveal → финал.
// Управление продублировано здесь же (клавиши/кнопки), полное — в /admin.

export function HostScreen() {
  const { gameState } = useGameState()
  const [packs, setPacks] = useState<Pack[]>([])
  const [pack, setPack] = useState<LoadedPack | null>(null)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => { void listPacks().then(setPacks).catch(() => setPacks([])) }, [])
  useEffect(() => {
    if (gameState?.pack_id) void loadPack(gameState.pack_id).then(setPack).catch(() => {})
  }, [gameState?.pack_id])

  const playerUrl = useMemo(() => {
    const base = `${location.origin}${location.pathname}#/player`
    return gameState?.pack_id ? `${base}?pack=${gameState.pack_id}` : base
  }, [gameState?.pack_id])

  if (!gameState) return <Center>Загрузка…</Center>

  // ── Лобби / выбор пакета ──
  if (gameState.phase === 'lobby' || !gameState.pack_id || !pack) {
    return (
      <Center>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>QUIZ PARTY</h1>
        {!gameState.pack_id ? (
          <div style={{ marginTop: 24 }}>
            <select value={selectedId} onChange={e => setSelectedId(e.target.value)}
              style={{ fontSize: '1.2rem', padding: 8 }}>
              <option value="">— выбрать пакет —</option>
              {packs.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.status === 'ready' ? 'готов' : p.status === 'played' ? 'сыгран' : p.status})
                </option>
              ))}
            </select>
            <button
              disabled={!selectedId}
              onClick={() => {
                const p = packs.find(x => x.id === selectedId)
                if (p && p.status === 'draft' &&
                    !confirm('Пакет — черновик (валидатор не пройден). Играть как есть?')) return
                void selectPackAndStart(selectedId)
              }}
              style={{ fontSize: '1.2rem', padding: '8px 24px', marginLeft: 12 }}>
              Начать игру
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '1.5rem' }}>Пакет: {pack?.name ?? '…'}</p>
            <p>Подключение игроков:</p>
            <img alt="QR для игроков" width={220} height={220}
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(playerUrl)}`} />
            <p style={{ opacity: .7, wordBreak: 'break-all' }}>{playerUrl}</p>
            {pack && (
              <button style={{ fontSize: '1.2rem', padding: '8px 24px' }}
                onClick={() => void gotoRound(0)}>
                К первому раунду →
              </button>
            )}
            <button style={{ opacity: .7 }} onClick={() => {
              if (confirm('Сбросить игру и выбрать другой пакет?')) void resetGame()
            }}>⟲ Сменить пакет</button>
          </>
        )}
      </Center>
    )
  }

  const round = pack.rounds[gameState.round_number]
  if (!round) return <Center>Раунд не найден — проверь пакет</Center>
  const q = round.questions[gameState.question_index]

  // ── Титул раунда ──
  if (gameState.phase === 'round_intro') {
    return (
      <Center>
        <div style={{ opacity: .6 }}>РАУНД {displayRoundNumber(pack, gameState.round_number)}</div>
        {round.title_lines.map((l, i) => (
          <h1 key={i} style={{ fontSize: '4rem', margin: 0 }}>{l}</h1>
        ))}
        <p style={{ letterSpacing: 2 }}>{metaLine(round)}</p>
        <ul style={{ textAlign: 'left', fontSize: '1.2rem' }}>
          {round.rules.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <button onClick={() => void gotoQuestion(0)}>Первый вопрос →</button>
      </Center>
    )
  }

  // ── Вопрос ──
  if (gameState.phase === 'question' && q) {
    const media = q.media.question ?? []
    return (
      <div style={{ padding: 40, minHeight: '100vh', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Р{displayRoundNumber(pack, gameState.round_number)} · Вопрос {gameState.question_index + 1}/{round.questions.length}</div>
          <Timer startedAt={gameState.timer_started_at} seconds={round.timer_seconds} />
        </div>
        <h2 style={{ fontSize: '2rem', whiteSpace: 'pre-wrap' }}>{q.question_text}</h2>
        {!q.media.hidden && media.length > 0 && (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {media.map((m, i) => <MediaItem key={i} src={m} />)}
          </div>
        )}
        {q.media.hidden && media[0] && <MediaItem src={media[0]} audioOnly />}
        {gameState.reveal && (
          <div style={{ marginTop: 24, padding: 16, border: '2px solid #22c55e' }}>
            <b>Ответ:</b> {displayAnswer(q)}
            {q.answer_note && <div style={{ opacity: .7 }}>{q.answer_note}</div>}
            {(q.media.answer ?? []).map((m, i) => <MediaItem key={i} src={m} />)}
          </div>
        )}
        <div style={{ position: 'fixed', bottom: 20, right: 20, display: 'flex', gap: 8 }}>
          {round.answers_reveal === 'after_question' && !gameState.reveal &&
            <button onClick={() => void revealAnswer()}>Показать ответ</button>}
          {gameState.question_index + 1 < round.questions.length
            ? <button onClick={() => void gotoQuestion(gameState.question_index + 1)}>Следующий →</button>
            : gameState.round_number + 1 < pack.rounds.length
              ? <button onClick={() => void gotoRound(gameState.round_number + 1)}>Следующий раунд →</button>
              : <button onClick={() => void finishGame(gameState.pack_id)}>Финал →</button>}
        </div>
      </div>
    )
  }

  if (gameState.phase === 'finale') {
    return <Center><h1 style={{ fontSize: '4rem' }}>ФИНАЛ</h1>
      <p>Итоги — в админке; экран финала с фейерверком приедет с темами (этап 5а).</p>
      <button onClick={() => { if (confirm('Начать новую игру?')) void resetGame() }}>⟲ Новая игра</button>
    </Center>
  }

  return <Center>Фаза: {gameState.phase}</Center>
}

/** Видимый номер раунда: зачётные нумеруются с 1, вне зачёта — «Разогрев». */
function displayRoundNumber(pack: LoadedPack, idx: number): string {
  const r = pack.rounds[idx]
  if (r.off_scoreboard) return '0'
  let n = 0
  for (let i = 0; i <= idx; i++) if (!pack.rounds[i].off_scoreboard) n++
  return String(n)
}

function displayAnswer(q: Question): string {
  const a = q.answer as unknown as Record<string, unknown>
  const d = a.display
  if (Array.isArray(d)) return d.join(' · ')
  if (typeof d === 'string' && d) return d
  if (typeof a.correct === 'string') return a.correct
  return '—'
}

function MediaItem({ src, audioOnly }: { src: string; audioOnly?: boolean }) {
  const url = mediaUrl(src)
  if (/\.(mp3|wav|ogg)$/i.test(src) || audioOnly)
    return <audio controls src={url} />
  if (/\.(mp4|webm)$/i.test(src))
    return <video controls src={url} style={{ maxHeight: '50vh' }} />
  return <img src={url} alt="" style={{ maxHeight: '45vh', maxWidth: '45vw' }} />
}

/** Пути: Storage-пути превращаем в публичные URL; абсолютные — как есть. */
export function mediaUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  const base = import.meta.env.VITE_SUPABASE_URL
  return `${base}/storage/v1/object/public/quiz-media/${path.replace(/^\//, '')}`
}

function Center({ children }: { children: React.ReactNode }) {
  return <div style={{
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 12, padding: 24,
  }}>{children}</div>
}
