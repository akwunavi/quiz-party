import { useEffect, useState } from 'react'
import { useEditorUser, signIn, signOut, type EditorUser } from '../../lib/auth'
import { listPacks, loadPack, type LoadedPack } from '../../lib/packLoader'
import {
  createPack, renamePack, setPackStatus, setPackTheme, duplicatePack,
  createRound, swapRounds, deleteRound,
} from '../../lib/editorApi'
import { validatePack, type Problem } from '../../lib/validate'
import { RoundScreen } from './RoundScreen'
import type { Pack, MechanicKey } from '../../types/quiz'

// ═══ Редактор: вход → пакеты → пакет → раунд → вопрос ═══

export const MECHANIC_NAMES: Record<MechanicKey, string> = {
  standard: 'Обычный',
  test_stop: 'Тест со стопом (О, счастливчик)',
  rebus: 'Ребусы (2 картинки, 3+3)',
  jeopardy: 'Музыкальные темы × плитки',
  stakes_unique: 'Ставки уникальные (0–5)',
  stakes_free: 'Ставки финальные (0|2)',
  thematic_x2: 'Тематический ×2',
  crossword: 'Кроссворд',
}

export function EditorApp() {
  const { user, setUser, loading } = useEditorUser()
  if (loading) return <div className="cyber" style={{ padding: 24, minHeight: '100vh' }}>Загрузка…</div>
  if (!user) return <div className="cyber" style={{ minHeight: '100vh' }}><Login onDone={setUser} /></div>
  return <EditorMain user={user} onLogout={async () => { await signOut(); setUser(null) }} />
}

function Login({ onDone }: { onDone: (u: EditorUser) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  return (
    <div style={{ maxWidth: 340, margin: '15vh auto', display: 'grid', gap: 8 }}>
      <h2>Вход в редактор</h2>
      <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)}
        style={{ padding: 8 }} autoComplete="username" />
      <input placeholder="пароль" type="password" value={password}
        onChange={e => setPassword(e.target.value)} style={{ padding: 8 }}
        autoComplete="current-password" />
      {err && <div style={{ color: '#f43f5e' }}>{err}</div>}
      <button disabled={busy || !email || !password} style={{ padding: 10 }}
        onClick={async () => {
          setBusy(true); setErr('')
          try { onDone(await signIn(email, password)) }
          catch (e) { setErr(e instanceof Error ? e.message : 'Ошибка входа') }
          finally { setBusy(false) }
        }}>Войти</button>
    </div>
  )
}

function EditorMain({ user, onLogout }: { user: EditorUser; onLogout: () => void }) {
  const [packs, setPacks] = useState<Pack[]>([])
  const [openPackId, setOpenPackId] = useState<string | null>(null)

  const reload = () => void listPacks().then(setPacks).catch(() => {})
  useEffect(reload, [])

  return (
    <div className="cyber" style={{ minHeight: '100vh' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Редактор пакетов</h2>
        <div>
          {user.display_name} ({user.role === 'owner' ? 'владелец' : 'редактор'})
          {' '}<button onClick={onLogout}>Выйти</button>
        </div>
      </div>
      {openPackId
        ? <PackScreen packId={openPackId} user={user}
            onBack={() => { setOpenPackId(null); reload() }} />
        : <PackList packs={packs} user={user} onOpen={setOpenPackId} onChanged={reload} />}
    </div>
    </div>
  )
}

// ── Список пакетов ──
const STATUS_RU: Record<string, string> = {
  draft: 'черновик', ready: 'готов', active: 'ИДЁТ ИГРА', played: 'сыгран', archived: 'архив',
}

function PackList({ packs, user, onOpen, onChanged }: {
  packs: Pack[]; user: EditorUser
  onOpen: (id: string) => void; onChanged: () => void
}) {
  const [name, setName] = useState('')
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
        <input placeholder="Название нового пакета" value={name}
          onChange={e => setName(e.target.value)} style={{ padding: 8, flex: 1 }} />
        <button disabled={!name.trim()} onClick={async () => {
          const p = await createPack(name.trim()); setName(''); onChanged(); onOpen(p.id)
        }}>+ Новый пакет</button>
      </div>
      {packs.length === 0 && <p style={{ opacity: .6 }}>Пакетов пока нет — создай первый.</p>}
      {packs.map(p => (
        <div key={p.id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          border: '1px solid #22314f', borderRadius: 8, padding: 12, marginBottom: 8,
        }}>
          <div>
            <b>{p.name}</b>{' '}
            <span style={{
              padding: '2px 8px', borderRadius: 10, fontSize: 12,
              background: p.status === 'ready' ? '#0f3d2e' : p.status === 'active' ? '#4a1220' : '#1a2440', border: '1px solid #22314f',
            }}>{STATUS_RU[p.status]}</span>
            {' '}<span style={{ opacity: .5, fontSize: 12 }}>тема: {p.theme}</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => onOpen(p.id)}>Открыть</button>
            <button onClick={async () => { await duplicatePack(p.id); onChanged() }}>Дублировать</button>
            {user.role === 'owner' && p.status !== 'archived' &&
              <button onClick={async () => { await setPackStatus(p.id, 'archived'); onChanged() }}>Архив</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Экран пакета ──
function PackScreen({ packId, user, onBack }: {
  packId: string; user: EditorUser; onBack: () => void
}) {
  const [pack, setPack] = useState<LoadedPack | null>(null)
  const [openRoundIdx, setOpenRoundIdx] = useState<number | null>(null)
  const [problems, setProblems] = useState<Problem[] | null>(null)
  const [adding, setAdding] = useState(false)

  const reload = () => void loadPack(packId, true, true).then(setPack).catch(() => {})
  useEffect(reload, [packId])

  if (!pack) return <div>Загрузка пакета…</div>
  const locked = pack.status === 'active' && user.role !== 'owner'

  if (openRoundIdx !== null && pack.rounds[openRoundIdx]) {
    return <RoundScreen pack={pack} roundIdx={openRoundIdx} user={user}
      onBack={() => { setOpenRoundIdx(null); reload() }} onChanged={reload} />
  }

  return (
    <div>
      <p><button onClick={onBack}>← Пакеты</button></p>
      <h3>
        <EditableText value={pack.name} disabled={locked}
          onSave={async v => { await renamePack(pack.id, v); reload() }} />
      </h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        Статус: <b>{STATUS_RU[pack.status]}</b>
        {user.role === 'owner' && <>
          {pack.status === 'draft' && <button onClick={async () => {
            const probs = validatePack(pack)
            setProblems(probs)
            if (probs.length === 0) { await setPackStatus(pack.id, 'ready'); reload() }
          }}>Проверить готовность → Готов</button>}
          {(pack.status === 'ready' || pack.status === 'active') &&
            <button onClick={async () => { await setPackStatus(pack.id, 'draft'); reload() }}>Вернуть в черновик</button>}
        </>}
        Тема:
        <select value={pack.theme} disabled={locked}
          onChange={async e => { await setPackTheme(pack.id, e.target.value); reload() }}>
          <option value="classic">Классика</option>
          <option value="new_year">Новый год</option>
        </select>
      </div>

      {problems && (
        <div style={{ margin: '12px 0', padding: 10, borderRadius: 8,
          background: problems.length ? '#2a1218' : '#0f2b1f' }}>
          {problems.length === 0 ? '✅ Пакет готов — статус переключён.' : <>
            <b>Проблемы ({problems.length}):</b>
            <ul>
              {problems.map((p, i) => (
                <li key={i} style={{ cursor: p.roundIdx >= 0 ? 'pointer' : undefined }}
                  onClick={() => p.roundIdx >= 0 && setOpenRoundIdx(p.roundIdx)}>
                  {p.roundIdx >= 0 && <>Раунд {p.roundIdx + 1}
                    {p.questionIdx !== undefined && <>, вопрос {p.questionIdx + 1}</>}: </>}
                  {p.text}
                </li>
              ))}
            </ul>
          </>}
        </div>
      )}

      <h4>Раунды</h4>
      {pack.rounds.map((r, i) => (
        <div key={r.id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          border: '1px solid #22314f', borderRadius: 8, padding: 10, marginBottom: 6,
        }}>
          <div>
            <b>{i + 1}. {r.title_lines.join(' ') || '(без названия)'}</b>
            {' '}<span style={{ opacity: .6 }}>{MECHANIC_NAMES[r.mechanic]}</span>
            {' '}· {r.questions.length} вопр.
            {r.off_scoreboard && ' · вне зачёта'}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button disabled={i === 0 || locked}
              onClick={async () => { await swapRounds(pack.rounds[i], pack.rounds[i - 1]); reload() }}>↑</button>
            <button disabled={i === pack.rounds.length - 1 || locked}
              onClick={async () => { await swapRounds(pack.rounds[i], pack.rounds[i + 1]); reload() }}>↓</button>
            <button onClick={() => setOpenRoundIdx(i)}>Открыть</button>
            {user.role === 'owner' &&
              <button onClick={async () => {
                if (confirm(`Удалить раунд «${r.title_lines.join(' ')}» со всеми вопросами?`)) {
                  await deleteRound(r.id); reload()
                }
              }}>✕</button>}
          </div>
        </div>
      ))}

      {!locked && (adding
        ? <AddRound packId={pack.id} nextPos={pack.rounds.length}
            onDone={() => { setAdding(false); reload() }} />
        : <button onClick={() => setAdding(true)}>+ Добавить раунд</button>)}
    </div>
  )
}

function AddRound({ packId, nextPos, onDone }: {
  packId: string; nextPos: number; onDone: () => void
}) {
  const [mechanic, setMechanic] = useState<MechanicKey>('standard')
  const [title, setTitle] = useState('')
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
      <select value={mechanic} onChange={e => setMechanic(e.target.value as MechanicKey)}>
        {(Object.keys(MECHANIC_NAMES) as MechanicKey[]).map(k =>
          <option key={k} value={k}>{MECHANIC_NAMES[k]}</option>)}
      </select>
      <input placeholder="Название раунда" value={title} onChange={e => setTitle(e.target.value)}
        style={{ padding: 6 }} />
      <button disabled={!title.trim()} onClick={async () => {
        await createRound(packId, nextPos, mechanic, title.trim()); onDone()
      }}>Создать</button>
      <button onClick={onDone}>Отмена</button>
    </div>
  )
}

export function EditableText({ value, onSave, disabled }: {
  value: string; onSave: (v: string) => void; disabled?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [v, setV] = useState(value)
  useEffect(() => setV(value), [value])
  if (!editing) return <span onClick={() => !disabled && setEditing(true)}
    style={{ cursor: disabled ? undefined : 'pointer', borderBottom: disabled ? undefined : '1px dashed #999' }}>
    {value || '(нажми, чтобы задать)'}</span>
  return (
    <span>
      <input value={v} onChange={e => setV(e.target.value)} style={{ padding: 4 }} />
      <button onClick={() => { onSave(v); setEditing(false) }}>✓</button>
      <button onClick={() => { setV(value); setEditing(false) }}>✕</button>
    </span>
  )
}
