import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

describe('QA: answer queue game isolation', () => {
  it('does not deduplicate answers from different games solely by team and question', async () => {
    const source = await readFile('src/lib/answerQueue.ts', 'utf8')
    const filter = source.match(/const q = read\(\)\.filter\([\s\S]*?\n/)?.[0] ?? ''
    expect(filter).toContain('game_id')
  })

  it('database conflict key includes game identity when question refs can repeat', async () => {
    const source = await readFile('src/lib/answerQueue.ts', 'utf8')
    expect(source).toMatch(/onConflict:\s*['"][^'"]*game_id[^'"]*team_id[^'"]*question_ref[^'"]*['"]/)
  })
})
