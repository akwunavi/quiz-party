import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

const read = (path: string) => readFile(path, 'utf8')

describe('QA: game flow and persistence contracts', () => {
  it('round navigation resets question-local state', async () => {
    const source = await read('src/lib/gameActions.ts')
    const gotoRound = source.match(/export async function gotoRound[\s\S]*?\n}\n/)?.[0] ?? ''
    expect(gotoRound).toContain("phase: 'round_intro'")
    expect(gotoRound).toContain('question_index: 0')
    expect(gotoRound).toContain('timer_started_at: null')
    expect(gotoRound).toContain('reveal: false')
  })

  it('moving to a question stops local media and does not start timer early', async () => {
    const source = await read('src/lib/gameActions.ts')
    const fn = source.match(/export async function gotoQuestion[\s\S]*?\n}\n/)?.[0] ?? ''
    expect(fn).toContain('hushLocal()')
    expect(fn).toContain("phase: 'question'")
    expect(fn).toContain('timer_started_at: null')
    expect(fn).toContain('reveal: false')
  })

  it('answer-time starts its own timestamp and phase', async () => {
    const source = await read('src/lib/gameActions.ts')
    const fn = source.match(/export async function startAnswerTime[\s\S]*?\n}\n/)?.[0] ?? ''
    expect(fn).toContain("phase: 'answer_time'")
    expect(fn).toContain('timer_started_at: new Date().toISOString()')
    expect(fn).toContain('reveal: false')
  })

  it('showing answers and revealing the answer are separate state transitions', async () => {
    const source = await read('src/lib/gameActions.ts')
    const show = source.match(/export async function gotoAnswers[\s\S]*?\n}\n/)?.[0] ?? ''
    const reveal = source.match(/export async function revealAnswer[\s\S]*?\n}\n/)?.[0] ?? ''
    expect(show).toContain("phase: 'show_answers'")
    expect(show).toContain('question_index')
    expect(show).toContain('reveal: revealed')
    expect(reveal).toContain('update({ reveal: true })')
  })

  it('finishing a game resets finale state and marks the selected pack played', async () => {
    const source = await read('src/lib/gameActions.ts')
    const fn = source.match(/export async function finishGame[\s\S]*?\n}\n/)?.[0] ?? ''
    expect(fn).toContain("phase: 'finale'")
    expect(fn).toContain('question_index: 0')
    expect(fn).toContain('reveal: false')
    expect(fn).toContain("status: 'played'")
  })

  it('player answer writes carry the active game and round identity', async () => {
    const source = await read('src/lib/answerQueue.ts')
    expect(source).toContain('game_id: payload.game_id')
    expect(source).toContain('round_number: payload.round_number')
    expect(source).toContain('question_ref: payload.question_ref')
    expect(source).toContain("upsert(row, { onConflict: 'team_id,question_ref' })")
  })

  it('QA never calls destructive game reset actions', async () => {
    const files = ['e2e/functional/game-flow.qa.spec.ts', 'e2e/functional/media-assets.qa.spec.ts']
    for (const file of files) {
      const source = await read(file)
      expect(source).not.toContain('resetGameHard(')
      expect(source).not.toContain('purgeOldGames(')
      expect(source).not.toContain(".delete()")
      expect(source).not.toContain(".update(")
      expect(source).not.toContain(".insert(")
    }
  })
})
