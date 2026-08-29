import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

const source = () => readFile('src/lib/gameActions.ts', 'utf8')

describe('QA: game action contract', () => {
  it('keeps the complete host/game state transition API exported', async () => {
    const text = await source()
    const required = [
      'selectPackAndStart', 'setPhase', 'gotoRound', 'gotoQuestion',
      'startTimer', 'startAnswerTime', 'gotoAnswers', 'showScoreboard',
      'startBreak', 'revealAnswer', 'markRoundCompleted', 'finishGame',
      'setFinaleStep', 'setFinaleMode',
    ] as const
    for (const name of required) {
      expect(text, `${name} must remain exported`).toMatch(new RegExp(`export async function ${name}\\b`))
    }
  })

  it('keeps the question transition contract explicit: timer is not started by gotoQuestion', async () => {
    const text = await source()
    const fn = text.match(/export async function gotoQuestion[\s\S]*?\n}\n/)
    expect(fn?.[0]).toBeTruthy()
    expect(fn?.[0]).toContain("phase: 'question'")
    expect(fn?.[0]).toContain('question_index')
    expect(fn?.[0]).toContain('timer_started_at: null')
    expect(fn?.[0]).not.toContain('startTimer()')
  })

  it('keeps the answer-time transition contract: phase and timer start together', async () => {
    const text = await source()
    const fn = text.match(/export async function startAnswerTime[\s\S]*?\n}\n/)
    expect(fn?.[0]).toBeTruthy()
    expect(fn?.[0]).toContain("phase: 'answer_time'")
    expect(fn?.[0]).toContain('timer_started_at: new Date().toISOString()')
    expect(fn?.[0]).toContain('reveal: false')
  })

  it('keeps answer reveal separate from entering the answers phase', async () => {
    const text = await source()
    const answers = text.match(/export async function gotoAnswers[\s\S]*?\n}\n/)
    const reveal = text.match(/export async function revealAnswer[\s\S]*?\n}\n/)
    expect(answers?.[0]).toContain("phase: 'show_answers'")
    expect(answers?.[0]).toContain('question_index')
    expect(answers?.[0]).toContain('reveal: revealed')
    expect(reveal?.[0]).toContain('reveal: true')
  })
})
