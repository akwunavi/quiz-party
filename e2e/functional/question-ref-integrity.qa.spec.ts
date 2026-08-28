import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

const read = (path: string) => readFile(path, 'utf8')

describe('QA: question reference integrity', () => {
  it('player answer submissions always carry game and round identity', async () => {
    const source = await read('src/pages/PlayerPage.tsx')
    expect(source).toContain('game_id: gameState.game_id')
    expect(source).toContain('round_number: gameState.round_number')
    expect(source).toContain('question_ref:')
  })

  it('Jeopardy question refs are derived from the active tile index', async () => {
    const source = await read('src/pages/PlayerPage.tsx')
    expect(source).toContain('question_ref: `q-t${gameState.question_index}`')
  })

  it('Melody bids and answers use the active track identity', async () => {
    const source = await read('src/pages/PlayerPage.tsx')
    expect(source).toContain('q-mel-${m.key}-bid')
    expect(source).toContain('question_ref: ref')
  })

  it('projector answer hook scopes results to the active game and round', async () => {
    const source = await read('src/hooks/useAnswers.ts')
    expect(source).toContain(".eq('game_id', gameId!)")
    expect(source).toContain("q = q.eq('round_number', roundNumber)")
  })
})
