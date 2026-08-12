import { useEffect, useMemo, useState } from 'react'
import { useGameState } from '../hooks/useGameState'
import { useTeams, isAlive } from '../hooks/useTeams'
import { useAnswers } from '../hooks/useAnswers'
import { loadPack, scoredRounds, type LoadedPack } from '../lib/packLoader'
import { gotoRound, gotoQuestion, revealAnswer, finishGame } from '../lib/gameActions'
import { autocheck } from '../lib/autocheck'
import { supabase } from '../lib/supabase'
import {
  scoreStandard, scoreTestStop, scoreStakesUnique, scoreStakesFree,
  scoreThematic, type ScoredAnswer,
} from '../lib/scoring'
import type { Answer, Question } from '../types/quiz'

// ═══ Админка (телефон ведущего) ═══
// Управление игрой + проверка ответов (автопроверка → финальное слово ✓/✗)
// + живость команд + табло. Удвоение thematic_x2 — ручная кнопка.

export function AdminPage() {
  const { gameState } = useGameState()
  const [pack, setPack] = useState<LoadedPack | null>(null)
  const teams = useTeams(gameState?.game_id ?? null)
  const answers = useAnswers(gameState?.game_id ?? null, gameState?.round_number)
  const [doubled, setDoubled] = useState<Record<string, boolean>>({}) // teamId → x2 текущего раунда

  useEffect(() => {
    if (gameState?.pack_id) void loadPack(gameState.pack_id).then(setPack).catch(() => {})
  }, [gameState?.pack_id])

  if (!gameState || !pack) return <div style={{ padding: 16 }}>Загрузка… (игра не начата?)</div>
  const round = pack.rounds[gameState.round_number]
  const q = round?.questions[gameState.question_index]

  return (
    <div style={{ padding: 12, maxWidth: 640, margin: '0 auto', fontSize: 14 }}>
      <h3>Админка · {pack.name}</h3>

      {/* Живость команд */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
        {teams.map(t => (
          <span key={t.id} style={{
            padding: '2px 8px', borderRadius: 12, color: '#fff',
            background: isAlive(t) ? t.color : '#9ca3af',
          }}>{isAlive(t) ? '●' : '○'} {t.name}</span>
        ))}
      </div>

      {/* Навигация */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {pack.rounds.map((r, i) => (
          <button key={r.id} onClick={() => void gotoRound(i)} style={{
            fontWeight: i === gameState.round_number ? 700 : 400,
          }}>Р{i}</button>
        ))}
        <button onClick={() => void finishGame(gameState.pack_id)}>Финал</button>
      </div>
      {round && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {round.questions.map((_, i) => (
            <button key={i} onClick={() => void gotoQuestion(i)} style={{
              fontWeight: i === gameState.question_index ? 700 : 400,
            }}>{i + 1}</button>
          ))}
          <button onClick={() => void revealAnswer()}>Показать ответ</button>
        </div>
      )}

      {/* Шпаргалка ведущего */}
      {q && (
        <div style={{ padding: 8, border: '1px solid #ccc', marginBottom: 12 }}>
          <div style={{ opacity: .6 }}>Вопрос {gameState.question_index + 1}: {q.question_text.slice(0, 120)}…</div>
          <b>Ответ: {displayCorrect(q)}</b>
          {q.answer_note && <div style={{ opacity: .7 }}>{q.answer_note}</div>}
        </div>
      )}

      {/* Проверка ответов текущего вопроса */}
      {q && <AnswersReview q={q} answers={answers} teams={teams} />}

      {/* Удвоение thematic_x2 */}
      {round?.mechanic === 'thematic_x2' && (
        <div style={{ margin: '12px 0', padding: 8, border: '1px dashed #999' }}>
          <b>×2 за тему (ручное решение):</b>
          {teams.map(t => (
            <label key={t.id} style={{ display: 'inline-block', margin: 6 }}>
              <input type="checkbox" checked={!!doubled[t.id]}
                onChange={e => setDoubled(d => ({ ...d, [t.id]: e.target.checked }))} />
              {' '}{t.name}
            </label>
          ))}
        </div>
      )}

      {/* Табло */}
      <Scoreboard pack={pack} gameId={gameState.game_id} teams={teams} doubled={doubled}
        currentRound={gameState.round_number} />
    </div>
  )
}

function displayCorrect(q: Question): string {
  const a = q.answer as unknown as Record<string, unknown>
  const d = a.display ?? a.correct ?? a.correct_choice ?? a.correct_order ??
    (Array.isArray(a.correct_pairs) ? (a.correct_pairs as string[]).join(', ') : '—')
  return Array.isArray(d) ? d.join(' · ') : String(d)
}

// ── Проверка ответов: автопроверка + финальное слово ✓/✗ ──
function AnswersReview({ q, answers, teams }:
  { q: Question; answers: Answer[]; teams: { id: string; name: string; color: string }[] }) {
  const ref = `q-${q.id}`
  const rows = answers.filter(a => a.question_ref === ref)

  const setCorrect = async (a: Answer, v: boolean | null) => {
    await supabase.from('answers').update({ is_correct: v }).eq('id', a.id)
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        {teams.map(t => {
          const a = rows.find(r => r.team_id === t.id)
          const auto = a ? autocheck(q.answer, a.answer_text) : null
          const shown = a?.is_correct ?? auto      // финальное слово админа приоритетно
          return (
            <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ color: t.color, fontWeight: 700 }}>{t.name}</td>
              <td>{a ? a.answer_text : <i style={{ opacity: .5 }}>нет ответа</i>}</td>
              <td>{a?.stake != null && `ставка ${a.stake}`}</td>
              <td>
                {a && (
                  <>
                    <button onClick={() => void setCorrect(a, true)}
                      style={{ background: shown === true ? '#22c55e' : undefined }}>✓</button>
                    <button onClick={() => void setCorrect(a, false)}
                      style={{ background: shown === false ? '#f43f5e' : undefined }}>✗</button>
                  </>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// ── Табло: собирает счёт по всем зачётным раундам ──
function Scoreboard({ pack, gameId, teams, doubled, currentRound }: {
  pack: LoadedPack; gameId: string
  teams: { id: string; name: string; color: string }[]
  doubled: Record<string, boolean>
  currentRound: number
}) {
  const allAnswers = useAnswers(gameId)
  const totals = useMemo(() => {
    const map = new Map<string, number>()
    for (const t of teams) {
      let total = 0
      pack.rounds.forEach((round, ri) => {
        if (round.off_scoreboard) return
        const rows: ScoredAnswer[] = round.questions.map((q, qi) => {
          const a = allAnswers.find(x => x.team_id === t.id && x.question_ref === `q-${q.id}`)
          return {
            questionIndex: qi,
            isCorrect: a ? (a.is_correct ?? autocheck(q.answer, a.answer_text)) : null,
            stake: a?.stake ?? null,
          }
        })
        const s = round.settings as Record<string, unknown>
        switch (round.mechanic) {
          case 'test_stop': total += scoreTestStop(rows); break
          case 'stakes_unique': total += scoreStakesUnique(rows); break
          case 'stakes_free': total += scoreStakesFree(rows); break
          case 'thematic_x2':
            total += scoreThematic(rows, ri === currentRound ? !!doubled[t.id] : false); break
          default:
            total += scoreStandard(rows, (s.pointsPerQuestion as number | undefined) ?? 1)
        }
      })
      map.set(t.id, total)
    }
    return map
  }, [pack, teams, allAnswers, doubled, currentRound])

  const ranked = [...teams].sort((a, b) => (totals.get(b.id) ?? 0) - (totals.get(a.id) ?? 0))
  return (
    <div style={{ marginTop: 12 }}>
      <b>Табло ({scoredRounds(pack).length} зачётных раундов):</b>
      <ol>
        {ranked.map(t => (
          <li key={t.id}><span style={{ color: t.color }}>{t.name}</span> — {totals.get(t.id) ?? 0}</li>
        ))}
      </ol>
    </div>
  )
}
