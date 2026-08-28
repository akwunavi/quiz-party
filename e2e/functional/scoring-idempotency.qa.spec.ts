import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

const read = (path: string) => readFile(path, 'utf8')

describe('QA: scoring idempotency and duplicate-answer guards', () => {
  it('answer persistence uses a stable team/question conflict key', async () => {
    const source = await read('src/lib/answerQueue.ts')
    expect(source).toContain("onConflict: 'team_id,question_ref'")
    expect(source).toContain('upsert(row')
  })

  it('answer queue does not create an unconditional second answer for the same question', async () => {
    const source = await read('src/lib/answerQueue.ts')
    expect(source).not.toContain('.insert(row)')
  })

  it('scoring functions are pure and do not persist scores themselves', async () => {
    const source = await read('src/lib/scoring.ts')
    expect(source).not.toContain("supabase.from('scores')")
    expect(source).not.toContain('.insert(')
    expect(source).not.toContain('.update(')
    expect(source).not.toContain('.delete(')
  })
})
