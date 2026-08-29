import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

const read = (path: string) => readFile(path, 'utf8')

describe('QA: player ↔ projector integration contracts', () => {
  it('answer queue model contains the identity needed by the projector', async () => {
    const source = await read('src/lib/answerQueue.ts')
    expect(source).toContain('game_id: string')
    expect(source).toContain('team_id: string')
    expect(source).toContain('round_number: number')
    expect(source).toContain('question_ref: string')
    expect(source).toContain('answer_text: string')
  })

  it('answer persistence writes to answers with an explicit conflict key', async () => {
    const source = await read('src/lib/answerQueue.ts')
    expect(source).toContain("supabase.from('answers')")
    expect(source).toContain("onConflict: 'team_id,question_ref'")
  })

  it('projector reads answers for the active game and optional active round', async () => {
    const source = await read('src/hooks/useAnswers.ts')
    expect(source).toContain("supabase.from('answers').select('*').eq('game_id', gameId!)")
    expect(source).toContain("q = q.eq('round_number', roundNumber)")
    expect(source).toContain('setAnswers(data as Answer[])')
  })

  it('projector refreshes answers and cleans up its polling timer', async () => {
    const source = await read('src/hooks/useAnswers.ts')
    expect(source).toContain('const t = setInterval(load, 2000)')
    expect(source).toContain('clearInterval(t)')
    expect(source).toContain('stopped = true')
  })

  it('player and projector use the same question identity field', async () => {
    const player = await read('src/pages/PlayerPage.tsx')
    const queue = await read('src/lib/answerQueue.ts')
    const projector = await read('src/hooks/useAnswers.ts')
    expect(player).toContain('question_ref')
    expect(queue).toContain('question_ref: string')
    expect(projector).toContain("'answers'")
  })
})