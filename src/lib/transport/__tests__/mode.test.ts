import { describe, it, expect, afterEach } from 'vitest'
import { isLocalMode, transportMode } from '../mode'

// Тестовое окружение — обычный node (см. vite.config.ts, jsdom в проекте не
// подключён), поэтому вместо настоящего document подставляем минимальную
// заглушку с единственным методом, который реально вызывает isLocalMode().
const realDocument = (globalThis as { document?: unknown }).document

function stubDocument(hasMeta: boolean) {
  (globalThis as { document?: unknown }).document = {
    querySelector: (sel: string) => (hasMeta && sel === 'meta[name="qp-local"]' ? {} : null),
  }
}

describe('isLocalMode / transportMode', () => {
  afterEach(() => {
    (globalThis as { document?: unknown }).document = realDocument
  })

  it('распознаёт метку локального сервера в <head>', () => {
    stubDocument(true)
    expect(isLocalMode()).toBe(true)
    expect(transportMode()).toBe('local')
  })

  it('без метки — обычный облачный режим', () => {
    stubDocument(false)
    expect(isLocalMode()).toBe(false)
    expect(transportMode()).toBe('cloud')
  })

  it('без document вообще (SSR/тестовая среда) — считается облаком', () => {
    (globalThis as { document?: unknown }).document = undefined
    expect(isLocalMode()).toBe(false)
  })
})
