import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const read = (path: string) => readFile(path, 'utf8')

describe('QA: agreed regression scope', () => {
  it('has dedicated visual, smoke and functional suites', async () => {
    expect(existsSync('e2e/visual/projector-player-layout.playwright.ts')).toBe(true)
    expect(existsSync('e2e/smoke/app.playwright.ts')).toBe(true)
    expect(existsSync('e2e/functional')).toBe(true)
  })

  it('layout suite includes all agreed viewport sizes', async () => {
    const source = await read('e2e/visual/projector-player-layout.playwright.ts')
    expect(source).toContain('1366')
    expect(source).toContain('768')
    expect(source).toContain('1920')
    expect(source).toContain('1080')
    expect(source).toContain('3840')
    expect(source).toContain('2160')
  })

  it('layout suite covers mixed, matching and ordering media plus themes', async () => {
    const source = await read('e2e/visual/projector-player-layout.playwright.ts')
    for (const term of ['mixed', 'matching', 'ordering', 'New Year', 'Potter']) expect(source).toContain(term)
  })

  it('manual QA exposes all primary suites', async () => {
    const source = await read('.github/workflows/qa-manual.yml')
    for (const term of ['functional', 'visual', 'smoke']) expect(source).toContain(term)
    expect(source).toContain('workflow_dispatch')
  })
})
