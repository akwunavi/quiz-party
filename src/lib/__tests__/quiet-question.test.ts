// ═══ «Вопрос перед зачитыванием ответа» (10.75): без плашки «Ответили» и без эффектов появления ═══
// Вёрстку этот тест не проверяет (её меряет e2e/book/quiet-check.cjs в браузере) — он держит договорённости,
// на которых вёрстка стоит: класс `.qs-quiet` вешается при `quiet`, CSS его гасит, плашки больше нет нигде.
import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const src = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const read = (...p: string[]) => readFileSync(join(src, ...p), 'utf8')

describe('quiet-экран вопроса', () => {
  it('QuestionScreen вешает qs-quiet при quiet', () => {
    expect(read('components', 'screens', 'QuestionScreen.tsx')).toMatch(/quiet \? ' qs-quiet' : ''/)
  })
  it('CSS гасит анимации внутри .qs-quiet и возвращает словам opacity 1', () => {
    const css = read('styles', 'parts', '38-round-reveal.css')
    expect(css).toMatch(/\.host-screen\.qs-quiet \*[^{]*\{[^}]*animation: none !important/)
    expect(css).toMatch(/\.host-screen\.qs-quiet \.q-word[^{]*\{[^}]*opacity: 1 !important/)
  })
  it('плашки «Ответили N из M» (.answered-chip) нет ни в разметке, ни в стилях', () => {
    const walk = (d: string): string[] => readdirSync(d, { withFileTypes: true }).flatMap(e =>
      e.isDirectory() ? (e.name === '__tests__' ? [] : walk(join(d, e.name)))
        : /\.(tsx?|css)$/.test(e.name) ? [join(d, e.name)] : [])
    const bad = walk(src).filter(f => readFileSync(f, 'utf8').includes('answered-chip'))
    expect(bad).toEqual([])
  })
  it('ветка проектора до раскрытия не рисует плашку и остаётся quiet', () => {
    const h = read('pages', 'HostScreen.tsx')
    expect(h).not.toMatch(/Ответили <b>/)
    expect(h).toMatch(/timerStartedAt=\{null\} quiet timerSlot=\{null\}/)
  })
})
