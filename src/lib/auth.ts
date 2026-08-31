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
  return {
    id: user.id, email: user.email ?? '',
    role: roleRow.role, display_name: roleRow.display_name,
    can_edit_all: !!roleRow.can_edit_all,
  }
}

export async function signOut() { await supabase.auth.signOut() }

/** Текущий пользователь (восстанавливает сессию после перезагрузки). */
export function useEditorUser() {
  const [user, setUser] = useState<EditorUser | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let stop = false
    async function restore() {
      const { data } = await supabase.auth.getUser()
      if (stop) return
      if (data.user) {
        const { data: roleRow } = await supabase
          .from('editor_roles').select('*').eq('user_id', data.user.id).single()
        if (roleRow) {
          setUser({
            id: data.user.id, email: data.user.email ?? '',
            role: roleRow.role, display_name: roleRow.display_name,
            can_edit_all: !!roleRow.can_edit_all,
          })
        }
      }
      setLoading(false)
    }
    void restore()
    return () => { stop = true }
  }, [])
  return { user, setUser, loading }
}
