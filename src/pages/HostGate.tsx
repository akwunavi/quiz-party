// ═══ Вход хоста: проектор и админка требуют логина (RLS не пустит без него) ═══
// Игроков это не касается — /player работает без входа.
import { useState } from 'react'
import { signIn, useEditorUser } from '../lib/auth'

export function HostGate({ children }: { children: React.ReactNode }) {
  const { user, setUser, loading } = useEditorUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  if (loading) return <div className="gate-screen"><div className="mono-tag">ПРОВЕРЯЕМ ВХОД…</div></div>
  if (user) return <>{children}</>

  return (
    <div className="gate-screen">
      <div className="gate-card">
        <div className="mono-tag">QUIZ PARTY · ВХОД ВЕДУЩЕГО</div>
        <p className="gate-hint">Экран проектора и админка управляют игрой,
          поэтому требуют входа. Игрокам вход не нужен — их ссылка /player.</p>
        <input placeholder="email" value={email} autoComplete="username"
          onChange={e => setEmail(e.target.value)} />
        <input placeholder="пароль" type="password" autoComplete="current-password"
          value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') void go() }} />
        {err && <div className="gate-err">{err}</div>}
        <button disabled={busy || !email || !password} onClick={() => void go()}>
          {busy ? 'Входим…' : 'Войти'}
        </button>
      </div>
    </div>
  )

  async function go() {
    setBusy(true); setErr('')
    try {
      setUser(await signIn(email.trim(), password))
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Не получилось войти')
    } finally {
      setBusy(false)
    }
  }
}
