import { describe, it, expect, afterEach, vi } from 'vitest'
import { uuid } from '../uuid'

const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('uuid', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('возвращает строку в формате UUID v4 (нативный путь)', () => {
    const id = uuid()
    expect(id).toMatch(UUID_V4_RE)
  })

  it('уникален на большой выборке', () => {
    const seen = new Set<string>()
    for (let i = 0; i < 10000; i++) {
      seen.add(uuid())
    }
    expect(seen.size).toBe(10000)
  })

  it('фолбэк через getRandomValues работает, если crypto.randomUUID недоступен', () => {
    // insecure context (http://192.168.x.x) — randomUUID отсутствует, но
    // getRandomValues есть. Подменяем randomUUID, чтобы пройти по фолбэку.
    const original = crypto.randomUUID
    // @ts-expect-error — намеренно убираем метод, чтобы проверить фолбэк
    delete crypto.randomUUID
    try {
      const id = uuid()
      expect(id).toMatch(UUID_V4_RE)
    } finally {
      crypto.randomUUID = original
    }
  })

  it('фолбэк даёт уникальные значения тоже', () => {
    const original = crypto.randomUUID
    // @ts-expect-error — намеренно убираем метод
    delete crypto.randomUUID
    try {
      const seen = new Set<string>()
      for (let i = 0; i < 2000; i++) seen.add(uuid())
      expect(seen.size).toBe(2000)
    } finally {
      crypto.randomUUID = original
    }
  })
})
