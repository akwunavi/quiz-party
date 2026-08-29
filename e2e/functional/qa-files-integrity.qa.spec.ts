import { describe, expect, it } from 'vitest'
import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const full = `${dir}/${entry.name}`
    if (entry.isDirectory()) files.push(...await walk(full))
    else files.push(full)
  }
  return files
}

describe('QA: QA infrastructure integrity', () => {
  it('all QA spec files are inside the configured QA suite directory', async () => {
    const files = await walk('e2e')
    const qaSpecs = files.filter((f) => f.endsWith('.qa.spec.ts'))
    expect(qaSpecs.length).toBeGreaterThan(0)
    for (const file of qaSpecs) expect(file).toMatch(/^e2e\/functional\//)
  })

  it('QA config exists and uses the dedicated QA test command', async () => {
    expect(existsSync('vitest.qa.config.ts')).toBe(true)
    const pkg = JSON.parse(await readFile('package.json', 'utf8'))
    expect(pkg.scripts['test:qa']).toBe('vitest run --config vitest.qa.config.ts')
  })

  it('media QA checks source files rather than modifying application files', async () => {
    const files = await walk('e2e/functional')
    for (const file of files.filter((f) => f.endsWith('.qa.spec.ts'))) {
      const source = await readFile(file, 'utf8')
      expect(source).not.toMatch(/supabase\.from\([^)]*\)\.(insert|update|delete)\(/)
    }
  })
})
