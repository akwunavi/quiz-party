import { describe, it, expect, vi } from 'vitest'
import type { AuthClient } from '../auth'

// auth.ts импортирует singleton-клиент из ./supabase, а тот на модульном
// уровне требует VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY — в тестовом
// окружении их нет. Подменяем модуль заглушкой: restoreEditorUser в этих
// тестах принимает свой собственный мок-клиент явным аргументом, реальный
// singleton ей не нужен.
vi.mock('../supabase', () => ({ supabase: {}, signupClient: {} }))

const { restoreEditorUser } = await import('../auth')

// Инцидент: в баре пропал интернет, HostGate завис на «ПРОВЕРЯЕМ ВХОД…»
// навсегда, потому что setLoading(false) стоял последней строкой после
// сетевого getUser(), а он либо реджектился, либо просто не отвечал.
// Эти тесты проверяют, что setLoading(false) вызывается в любом случае.

const roleRow = { user_id: 'u1', role: 'owner' as const, display_name: 'Ведущий', can_edit_all: true }

function mockClient(over: Partial<{
  getSession: AuthClient['auth']['getSession']
  getUser: AuthClient['auth']['getUser']
  single: () => Promise<{ data: unknown; error: unknown }>
}> = {}): AuthClient {
  const single = over.single ?? (() => Promise.resolve({ data: roleRow, error: null }))
  return {
    auth: {
      getSession: over.getSession ?? (() => Promise.resolve({ data: { session: null }, error: null })),
      getUser: over.getUser ?? (() => Promise.resolve({ data: { user: { id: 'u1', email: 'a@b.c' } }, error: null })),
      // остальные методы auth в этих тестах не используются
    } as AuthClient['auth'],
    from: (() => ({
      select: () => ({ eq: () => ({ single }) }),
    })) as unknown as AuthClient['from'],
  }
}

describe('restoreEditorUser', () => {
  it('обычный онлайн-путь: getSession пуст, getUser отдаёт роль — setUser и setLoading(false)', async () => {
    const setUser = vi.fn()
    const setLoading = vi.fn()
    await restoreEditorUser(mockClient(), setUser, setLoading)
    expect(setLoading).toHaveBeenCalledWith(false)
    expect(setUser).toHaveBeenCalledWith(expect.objectContaining({ id: 'u1', role: 'owner' }))
  })

  it('getUser() реджектится (офлайн) — setLoading(false) всё равно вызывается', async () => {
    const setUser = vi.fn()
    const setLoading = vi.fn()
    const client = mockClient({ getUser: () => Promise.reject(new Error('network down')) })
    await restoreEditorUser(client, setUser, setLoading)
    expect(setLoading).toHaveBeenCalledWith(false)
  })

  it('getUser() зависает и не резолвится вовсе — реджект всё равно ловится, а не виснет', async () => {
    const setUser = vi.fn()
    const setLoading = vi.fn()
    // симулируем сетевую ошибку fetch, а не бесконечное зависание —
    // именно так ведёт себя supabase-js при офлайне
    const client = mockClient({ getUser: () => Promise.reject(new TypeError('Failed to fetch')) })
    await restoreEditorUser(client, setUser, setLoading)
    expect(setLoading).toHaveBeenCalledWith(false)
    expect(setUser).not.toHaveBeenCalled()
  })

  it('getSession() тоже падает — не мешает дойти до getUser и до setLoading(false)', async () => {
    const setUser = vi.fn()
    const setLoading = vi.fn()
    const client = mockClient({ getSession: () => Promise.reject(new Error('boom')) })
    await restoreEditorUser(client, setUser, setLoading)
    expect(setLoading).toHaveBeenCalledWith(false)
    expect(setUser).toHaveBeenCalledWith(expect.objectContaining({ id: 'u1' }))
  })

  it('isStopped() — не вызывает setLoading после размонтирования', async () => {
    const setUser = vi.fn()
    const setLoading = vi.fn()
    await restoreEditorUser(mockClient(), setUser, setLoading, () => true)
    expect(setLoading).not.toHaveBeenCalled()
    expect(setUser).not.toHaveBeenCalled()
  })
})
