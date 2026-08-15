import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, key)

// Отдельный клиент ТОЛЬКО для регистрации новых редакторов из UI владельца:
// signUp через основной клиент подменил бы текущую сессию на нового юзера.
export const signupClient = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})
