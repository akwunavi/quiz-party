import { useEffect, useMemo, useState } from 'react'
import { useGameState } from '../hooks/useGameState'
import { loadPack, type LoadedPack } from '../lib/packLoader'
import { registerTeam, heartbeat } from '../lib/gameActions'
import { enqueueAnswer } from '../lib/answerQueue'
import { ConnectionDot } from '../components/ConnectionDot'
import { Timer } from '../components/Timer'
import type { AnswerSpec, Team } from '../types/quiz'

// ═══ Экран игрока (телефон) ═══
// Регистрация команды → ответы по типам (free_text/choice/order/match).
// Drag&drop для order/match — тапами (надёжнее на телефонах): tap-tap связка.
// Кроссворд-экран приедет на этапе 5.

const TEAM_LS = 'qp-team'

export function PlayerPage() {
  const { gameState } = useGameState()
  const [pack, setPack] = useState<LoadedPack | null>(null)
  const [team, setTeam] = useState<Team | null>(() => {
    try { return JSON.parse(localStorage.getItem(TEAM_LS) ?? 'null') } catch { return null }
  })

  useEffect(() => {
    if (gameState?.pack_id) void loadPack(gameState.pack_id).then(setPack).catch(() => {})
  }, [gameState?.pack_id])

  // heartbeat: раз в 5 сек, чтобы админ видел «живость»
  useEffect(() => {
    if (!team) return
    const t = setInterval(() => { void heartbeat(team.id) }, 5000)
    return () => clearInterval(t)
  }, [team])

  if (!gameState) return <P>Загрузка…</P>

  if (!team) return <Register onDone={t => {
    localStorage.setItem(TEAM_LS, JSON.stringify(t)); setTeam(t)
  }} gameId={gameState.game_id} />

  if (!pack || gameState.phase === 'lobby')
    return <P><ConnectionDot />Ждём начала игры… Вы: <b style={{ color: team.color }}>{team.name}</b></P>

  const round = pack.rounds[gameState.round_number]
  const q = round?.questions[gameState.question_index]

  if (gameState.phase === 'round_intro')
    return <P><ConnectionDot />Раунд скоро начнётся — смотрите на экран</P>

  if (gameState.phase === 'question' && round && q) {
    return (
      <div style={{ padding: 16, maxWidth: 480, margin: '0 auto' }}>
        <ConnectionDot />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: team.color, fontWeight: 700 }}>{team.name}</span>
          <Timer startedAt={gameState.timer_started_at} seconds={round.timer_seconds} />
        </div>
        <p style={{ whiteSpace: 'pre-wrap' }}>{q.question_text}</p>
        <AnswerForm
          key={q.id}
          spec={q.answer}
          stakes={stakesFor(round.mechanic, round.settings)}
          onSubmit={(text, stake) => void enqueueAnswer({
            team_id: team.id, game_id: gameState.game_id,
            question_ref: `q-${q.id}`, round_number: gameState.round_number,
            answer_text: text, stake,
          })}
        />
      </div>
    )
  }

  if (gameState.phase === 'finale') return <P>Игра окончена — итоги на экране!</P>
  return <P><ConnectionDot />Смотрите на экран</P>
}

function stakesFor(mechanic: string, settings: unknown): number[] | null {
  if (mechanic !== 'stakes_unique' && mechanic !== 'stakes_free') return null
  const s = settings as { stakesValues?: number[] }
  return s.stakesValues ?? null
}

// ── Регистрация ──
const COLORS = ['#14b8a6', '#f43f5e', '#eab308', '#8b5cf6', '#3b82f6', '#f97316']

function Register({ onDone, gameId }: { onDone: (t: Team) => void; gameId: string }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [busy, setBusy] = useState(false)
  return (
    <P>
      <h2>Регистрация команды</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Название команды"
        style={{ fontSize: '1.2rem', padding: 8, width: '90%', maxWidth: 320 }} />
      <div style={{ display: 'flex', gap: 8 }}>
        {COLORS.map(c => (
          <button key={c} onClick={() => setColor(c)} style={{
            width: 36, height: 36, borderRadius: 18, background: c,
            border: color === c ? '3px solid #000' : '1px solid #ccc',
          }} />
        ))}
      </div>
      <button disabled={!name.trim() || busy} style={{ fontSize: '1.1rem', padding: '8px 24px' }}
        onClick={async () => {
          setBusy(true)
          try { onDone(await registerTeam(name.trim(), color, gameId) as Team) }
          finally { setBusy(false) }
        }}>Играть!</button>
    </P>
  )
}

// ── Формы ответа по типам ──
function AnswerForm({ spec, stakes, onSubmit }:
  { spec: AnswerSpec; stakes: number[] | null; onSubmit: (text: string, stake: number | null) => void }) {
  const [sent, setSent] = useState<string | null>(null)
  const [edits, setEdits] = useState(0)          // правило: исправить можно 1 раз
  const [stake, setStake] = useState<number | null>(null)

  const submit = (text: string) => {
    onSubmit(text, stake)
    setSent(text)
  }
  const canEdit = edits < 1

  if (sent !== null) {
    return (
      <div>
        <p>Ответ отправлен: <b>{sent}</b>{stake != null && <> · ставка {stake}</>}</p>
        {canEdit && <button onClick={() => { setSent(null); setEdits(e => e + 1) }}>Изменить (1 раз)</button>}
      </div>
    )
  }

  return (
    <div>
      {stakes && (
        <div style={{ marginBottom: 12 }}>
          Ставка:{' '}
          {stakes.map(v => (
            <button key={v} onClick={() => setStake(v)} style={{
              margin: 2, padding: '6px 12px',
              background: stake === v ? '#14b8a6' : undefined,
            }}>{v}</button>
          ))}
        </div>
      )}
      {spec.mode === 'free_text' || spec.mode === 'none' ? <FreeText onSend={submit} />
        : spec.mode === 'choice' ? <Choice options={spec.choices.map(c => c.key)} onSend={submit} />
        : spec.mode === 'order' ? <Order options={spec.choices.map(c => c.key)} onSend={submit} />
        : spec.mode === 'match' ? <Match left={spec.left} right={spec.right} onSend={submit} />
        : <FreeText onSend={submit} /> /* crossword_word — свой экран на этапе 5 */}
    </div>
  )
}

function FreeText({ onSend }: { onSend: (t: string) => void }) {
  const [v, setV] = useState('')
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input value={v} onChange={e => setV(e.target.value)} placeholder="Ваш ответ"
        style={{ flex: 1, fontSize: '1.1rem', padding: 8 }} />
      <button disabled={!v.trim()} onClick={() => onSend(v.trim())}>Отправить</button>
    </div>
  )
}

function Choice({ options, onSend }: { options: string[]; onSend: (t: string) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {options.map(k => (
        <button key={k} style={{ fontSize: '1.4rem', padding: 16 }} onClick={() => onSend(k)}>{k}</button>
      ))}
    </div>
  )
}

/** Порядок: тапаешь варианты в нужной последовательности. */
function Order({ options, onSend }: { options: string[]; onSend: (t: string) => void }) {
  const [seq, setSeq] = useState<string[]>([])
  const left = options.filter(o => !seq.includes(o))
  return (
    <div>
      <div style={{ minHeight: 40, padding: 8, border: '1px dashed #999' }}>
        {seq.length ? seq.join(' → ') : 'Тапайте варианты по порядку'}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {left.map(o => <button key={o} style={{ fontSize: '1.2rem', padding: 12 }}
          onClick={() => setSeq(s => [...s, o])}>{o}</button>)}
        <button onClick={() => setSeq([])}>Сброс</button>
      </div>
      <button disabled={seq.length !== options.length} style={{ marginTop: 8 }}
        onClick={() => onSend(seq.join(''))}>Отправить</button>
    </div>
  )
}

/** Сопоставление: тап по левому, тап по правому — связка. */
function Match({ left, right, onSend }: { left: string[]; right: string[]; onSend: (t: string) => void }) {
  const [pairs, setPairs] = useState<Record<string, string>>({})
  const [selLeft, setSelLeft] = useState<string | null>(null)
  const usedRight = useMemo(() => new Set(Object.values(pairs)), [pairs])
  const done = Object.keys(pairs).length === left.length
  return (
    <div>
      <div style={{ display: 'flex', gap: 24 }}>
        <div>
          {left.map(l => (
            <button key={l} onClick={() => setSelLeft(l)} style={{
              display: 'block', margin: 4, padding: 10, minWidth: 60,
              background: selLeft === l ? '#eab308' : pairs[l] ? '#14b8a6' : undefined,
            }}>{l}{pairs[l] ? ` – ${pairs[l]}` : ''}</button>
          ))}
        </div>
        <div>
          {right.map(r => (
            <button key={r} disabled={!selLeft || usedRight.has(r)} onClick={() => {
              if (!selLeft) return
              setPairs(p => ({ ...p, [selLeft]: r }))
              setSelLeft(null)
            }} style={{ display: 'block', margin: 4, padding: 10, minWidth: 60,
              opacity: usedRight.has(r) ? .4 : 1 }}>{r}</button>
          ))}
        </div>
      </div>
      <button onClick={() => { setPairs({}); setSelLeft(null) }}>Сброс</button>
      <button disabled={!done} style={{ marginLeft: 8 }}
        onClick={() => onSend(left.map(l => `${l}${pairs[l]}`).join(','))}>Отправить</button>
    </div>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <div style={{
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, textAlign: 'center',
  }}>{children}</div>
}
