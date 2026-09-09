// ═══ Auth редактора: Supabase Auth + роль из editor_roles ═══
import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export interface EditorUser {
  id: string
  email: string
  role: 'owner' | 'editor'
  display_name: string
  /** редактор правит ЛЮБЫЕ непривтные пакеты, а не только свои.
   *  Читается из editor_roles и повторяет условие политик в базе —
   *  без него интерфейс не знает, что человеку разрешено. */
  can_edit_all: boolean
}

/** Кеш роли редактора — переживает офлайн (localStorage читается без сети).
 *  Не замена авторизации: RLS в базе всё равно проверяет реальные права,
 *  это только чтобы UI-гейт не завис вечным лоадером без интернета. */
const ROLE_CACHE_KEY = 'qp-editor-role'

interface CachedRole {
  user_id: string
  role: 'owner' | 'editor'
  display_name: string
  can_edit_all: boolean
}

function readCachedRole(userId: string): CachedRole | null {
  try {
    const raw = localStorage.getItem(ROLE_CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedRole
    return parsed.user_id === userId ? parsed : null
  } catch {
    return null
  }
}

function writeCachedRole(row: CachedRole) {
  try {
    localStorage.setItem(ROLE_CACHE_KEY, JSON.stringify(row))
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — переживём без кеша
  }
}

export async function signIn(email: string, password: string): Promise<EditorUser> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  const user = data.user
  const { data: roleRow, error: e2 } = await supabase
    .from('editor_roles').select('*').eq('user_id', user.id).single()
  if (e2 || !roleRow) {
    await supabase.auth.signOut()
    throw new Error('Нет прав редактора: аккаунт не добавлен в editor_roles')
  }
  writeCachedRole({
    user_id: user.id, role: roleRow.role,
    display_name: roleRow.display_name, can_edit_all: !!roleRow.can_edit_all,
  })
  return {
    id: user.id, email: user.email ?? '',
    role: roleRow.role, display_name: roleRow.display_name,
    can_edit_all: !!roleRow.can_edit_all,
  }
}

export async function signOut() { await supabase.auth.signOut() }

/** Клиент супабейса в объёме, нужном для восстановления сессии — узкий тип,
 *  чтобы в тестах подставлять урезанный мок вместо настоящего клиента. */
export type AuthClient = Pick<typeof supabase, 'auth' | 'from'>

/** Восстанавливает пользователя-редактора по локальной сессии, затем
 *  уточняет роль сетевым запросом. Вынесено из хука отдельной функцией,
 *  чтобы офлайн-ветку (сеть падает/висит) можно было проверить юнит-тестом
 *  без рендера React.
 *
 *  Вход по локальной сессии, а не по сетевому запросу — иначе офлайн вешает
 *  гейт навсегда. Так уже случилось в баре: пропал интернет заведения,
 *  `getUser()` (сетевой GET /auth/v1/user, в отличие от `getSession()`,
 *  который читает localStorage) завис/отклонился, а `setLoading(false)`
 *  стоял последней строкой после него — HostGate рисовал «ПРОВЕРЯЕМ
 *  ВХОД…» и не пускал НИКУДА, включая paper-режим, который вообще не
 *  должен зависеть от сети. */
export async function restoreEditorUser(
  client: AuthClient,
  setUser: (u: EditorUser | null) => void,
  setLoading: (v: boolean) => void,
  isStopped: () => boolean = () => false,
): Promise<void> {
  try {
    // getSession() — локальное чтение из localStorage, не сеть. По нему и
    // пускаем: без него человек с валидной сессией на телефоне без связи
    // не попадёт даже в paper-игру.
    const { data: sessionData } = await client.auth.getSession()
    if (isStopped()) return
    const sessionUser = sessionData.session?.user ?? null
    if (sessionUser) {
      const cached = readCachedRole(sessionUser.id)
      if (cached) {
        setUser({
          id: sessionUser.id, email: sessionUser.email ?? '',
          role: cached.role, display_name: cached.display_name,
          can_edit_all: cached.can_edit_all,
        })
      }
    }
  } catch {
    // офлайн/сломанная сессия — идём дальше без пользователя из локальной сессии
  }
  if (isStopped()) return
  // getUser() уточняет роль по сети — но это не блокирующее условие входа:
  // офлайн он реджектится/висит, и вход должен остаться на том, что уже
  // дала локальная сессия (или кеш роли) выше.
  try {
    const { data } = await client.auth.getUser()
    if (isStopped()) return
    if (data.user) {
      const { data: roleRow } = await client
        .from('editor_roles').select('*').eq('user_id', data.user.id).single()
      if (isStopped()) return
      if (roleRow) {
        writeCachedRole({
          user_id: data.user.id, role: roleRow.role,
          display_name: roleRow.display_name, can_edit_all: !!roleRow.can_edit_all,
        })
        setUser({
          id: data.user.id, email: data.user.email ?? '',
          role: roleRow.role, display_name: roleRow.display_name,
          can_edit_all: !!roleRow.can_edit_all,
        })
      }
    }
  } catch {
    // офлайн — работаем по сохранённой сессии/кешу роли, уже подставленным выше
  } finally {
    if (!isStopped()) setLoading(false)
  }
}

/** Текущий пользователь (восстанавливает сессию после перезагрузки). */
export function useEditorUser() {
  const [user, setUser] = useState<EditorUser | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let stop = false
    void restoreEditorUser(supabase, setUser, setLoading, () => stop)
    return () => { stop = true }
  }, [])
  return { user, setUser, loading }
}
