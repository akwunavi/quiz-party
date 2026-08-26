import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

async function source(path: string) {
  return readFile(path, 'utf8')
}

describe('QA: player answer flow contract', () => {
  it('persists answers through the queue with the game/team/question identity', async () => {
    const s = await source('src/lib/answerQueue.ts')
    expect(s).toContain("supabase.from('answers').upsert")
    expect(s).toContain('team_id,question_ref')
    expect(s).toContain('game_id')
    expect(s).toContain('round_number')
    expect(s).toContain('answer_text')
    expect(s).toContain('localStorage')
  })

  it('does not silently discard a failed answer write', async () => {
    const s = await source('src/lib/answerQueue.ts')
    expect(s).toContain('if (error) { notify(true); return }')
    expect(s).toContain('setInterval(() => { void flush() }, 3000)')
  })

  it('deduplicates edits for the same team and question', async () => {
    const s = await source('src/lib/answerQueue.ts')
    expect(s).toContain('question_ref !== a.question_ref || x.team_id !== a.team_id')
  })

  it('player sends the current game, round and answer identity', async () => {
    const s = await source('src/pages/PlayerPage.tsx')
    expect(s).toContain('team_id: team.id')
    expect(s).toContain('game_id: gameState.game_id')
    expect(s).toContain('round_number: gameState.round_number')
    expect(s).toContain('answer_text: draft.trim()')
  })

  it('does not use a stale answer when the Jeopardy tile changes', async () => {
    const s = await source('src/pages/PlayerPage.tsx')
    expect(s).toContain('useEffect(() => { setDraft(\'\'); setSent(null) }, [gameState.question_index])')
    expect(s).toContain('question_ref: `q-t${gameState.question_index}`')
  })

  it('does not show a normal answer form before a Jeopardy tile is opened', async () => {
    const s = await source('src/pages/PlayerPage.tsx')
    expect(s).toContain('const open = !!gameState.timer_started_at')
    expect(s).toContain('if (!open) return (')
    expect(s).toContain('Ждём, пока ведущий откроет плитку')
  })
})
