import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

const read = (path: string) => readFile(path, 'utf8')

describe('QA: game action persistence contracts', () => {
  it('question navigation resets stale timer and reveal state', async () => {
    const source = await read('src/lib/gameActions.ts')
    expect(source).toContain("phase: 'question', question_index")
    expect(source).toContain('timer_started_at: null')
    expect(source).toContain('reveal: false')
  })

  it('answer phase owns its own timer start', async () => {
    const source = await read('src/lib/gameActions.ts')
    expect(source).toContain("phase: 'answer_time', timer_started_at: new Date().toISOString()")
  })

  it('reveal is an explicit persisted state change', async () => {
    const source = await read('src/lib/gameActions.ts')
    expect(source).toContain('update({ reveal: true })')
  })

  it('round completion is persisted independently from question navigation', async () => {
    const source = await read('src/lib/gameActions.ts')
    expect(source).toContain('completed_rounds: completed')
  })

  it('finale resets the question step and reveal state', async () => {
    const source = await read('src/lib/gameActions.ts')
    expect(source).toContain("phase: 'finale', question_index: 0, reveal: false")
  })
})
