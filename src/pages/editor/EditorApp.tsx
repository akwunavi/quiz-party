import { useEffect, useState } from 'react'
import { useEditorUser, signIn, signOut, type EditorUser } from '../../lib/auth'
import { listPacks, loadPack, type LoadedPack } from '../../lib/packLoader'
import {
  createPack, renamePack, setPackStatus, setPackTheme, setPackSettings, duplicatePack,
  createRound, swapRounds, deleteRound,
} from '../../lib/editorApi'
import { MediaSlot } from './QuestionForm'
import { packMediaSize } from '../../lib/mediaUpload'
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
  sprint: '120 секунд (все вопросы на слайде)',
  melody: 'Угадай мелодию (аукцион секунд)',
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
    <div className="ed-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontFamily: 'Rajdhani, sans-serif' }}>
          {openPackId ? '' : 'Редактор пакетов'}</h2>
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
          <div style={{ display: 'flex', gap: 10 }}>
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

  // суммарный объём медиа пакета в Storage
  const [mediaSizeMb, setMediaSizeMb] = useState<number | null>(null)
  useEffect(() => {
    void packMediaSize(packId).then(mb => setMediaSizeMb(mb)).catch(() => setMediaSizeMb(null))
  }, [packId, pack?.updated_at])

  if (!pack) return <div>Загрузка пакета…</div>
  const locked = pack.status === 'active' && user.role !== 'owner'

  if (openRoundIdx !== null && pack.rounds[openRoundIdx]) {
    return <RoundScreen pack={pack} roundIdx={openRoundIdx} user={user}
      onBack={() => { setOpenRoundIdx(null); reload() }} onChanged={reload} />
  }

  return (
    <div>
      <div className="ed-crumb">
        <button className="ico" data-tip="К списку пакетов" onClick={onBack}>←</button>
        <div className="ed-h">
          <EditableText value={pack.name} disabled={locked}
            onSave={async v => { await renamePack(pack.id, v); reload() }} />
        </div>
      </div>
      <div className="ed-card"><h4>Пакет · медиа {mediaSizeMb === null ? '…' : `${mediaSizeMb} МБ`}</h4>
        <div className="ed-grid2">
          <div className="ed-field"><label>Статус</label>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <b>{STATUS_RU[pack.status]}</b>
              {user.role === 'owner' && <>
                <button onClick={async () => {
                  const probs = validatePack(pack)
                  setProblems(probs)
                  if (probs.length === 0 && pack.status === 'draft') { await setPackStatus(pack.id, 'ready'); reload() }
                }}>Проверить</button>
                {pack.status !== 'draft' &&
                  <button onClick={async () => { await setPackStatus(pack.id, 'draft'); reload() }}>
                    В черновик</button>}
              </>}
            </div>
            <div className="ed-hint">«Проверить» ищет проблемы в любой момент, даже если пакет готов</div>
          </div>
          <div className="ed-field"><label>Тема оформления</label>
            <select value={pack.theme} disabled={locked}
              onChange={async e => { await setPackTheme(pack.id, e.target.value); reload() }}>
              <option value="classic">Классика</option>
              <option value="new_year">Новый год</option>
            </select>
          </div>
          <div className="ed-field"><label>Финальная музыка (табло/финал)</label>
            <MediaSlot label="" packId={pack.id} accept="audio/*" max={1}
              paths={pack.settings?.finale_music ? [pack.settings.finale_music] : []}
              onChange={async paths => {
                await setPackSettings(pack.id, { ...(pack.settings ?? {}), finale_music: paths[0] })
                reload()
              }} />
            <div className="ed-hint">Если пусто — играет общая фоновая музыка</div>
          </div>
          <div className="ed-field"><label>Общая фоновая музыка вопросов</label>
            <MediaSlot label="" packId={pack.id} accept="audio/*" max={1}
              paths={pack.settings?.bg_music ? [pack.settings.bg_music] : []}
              onChange={async paths => {
                await setPackSettings(pack.id, { ...(pack.settings ?? {}), bg_music: paths[0] })
                reload()
              }} />
            <div className="ed-hint">Один трек на весь пакет — экономит место. Раунд может переопределить</div>
          </div>
          <div className="ed-field"><label>Показ ответов (по умолчанию)</label>
            <select value={pack.settings?.answers_reveal ?? 'after_round'}
              onChange={async ev => { await setPackSettings(pack.id, { ...(pack.settings ?? {}), answers_reveal: ev.target.value as never }); reload() }}>
              <option value="after_question">сразу после вопроса</option>
              <option value="after_round">в конце раунда</option>
              <option value="never">не показывать</option>
            </select>
          </div>
          <div className="ed-field"><label>Правок ответа (по умолчанию)</label>
            <select value={pack.settings?.max_edits ?? 2}
              onChange={async ev => { await setPackSettings(pack.id, { ...(pack.settings ?? {}), max_edits: Number(ev.target.value) }); reload() }}>
              <option value={0}>без правок</option><option value={1}>1</option>
              <option value={2}>2</option><option value={3}>3</option>
              <option value={-1}>без ограничений</option>
            </select>
          </div>
          <div className="ed-field"><label>Музыка титульного экрана</label>
            <MediaSlot label="" packId={pack.id} accept="audio/*" max={1}
              paths={pack.settings?.title_music ? [pack.settings.title_music] : []}
              onChange={async paths => {
                await setPackSettings(pack.id, { ...(pack.settings ?? {}), title_music: paths[0] })
                reload()
              }} />
          </div>
        </div>
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

      <div className="ed-card"><h4>Раунды</h4>
      {pack.rounds.map((r, i) => (
        <div key={r.id} className="ed-row">
          <div className="ed-num">{i + 1}</div>
          <div className="ed-row-main">
            <div className="ed-row-title">{r.title_lines.join(' ') || '(без названия)'}</div>
            <div className="ed-row-meta">
              {MECHANIC_NAMES[r.mechanic]}{r.off_scoreboard && ' · разогрев, вне зачёта'}
            </div>
          </div>
          <span className="ed-count" title="Количество вопросов в раунде">
            {r.questions.filter(q => !q.hidden).length}
          </span>
          <div className="ed-actions">
            <button className="ico" data-tip="Выше" disabled={i === 0 || locked}
              onClick={async () => { await swapRounds(pack.rounds[i], pack.rounds[i - 1]); reload() }}>↑</button>
            <button className="ico" data-tip="Ниже" disabled={i === pack.rounds.length - 1 || locked}
              onClick={async () => { await swapRounds(pack.rounds[i], pack.rounds[i + 1]); reload() }}>↓</button>
            <button className="ico" data-tip="Редактировать" onClick={() => setOpenRoundIdx(i)}>✏️</button>
            {user.role === 'owner' &&
              <button className="ico danger" data-tip="Удалить раунд"
                onClick={async () => {
                  if (confirm(`Удалить раунд «${r.title_lines.join(' ')}» со всеми вопросами?`)) {
                    await deleteRound(r.id); reload()
                  }
                }}>🗑</button>}
          </div>
        </div>
      ))}

      {!locked && (adding
        ? <AddRound packId={pack.id} nextPos={pack.rounds.length}
            onDone={() => { setAdding(false); reload() }} />
        : <button style={{ marginTop: 6 }} onClick={() => setAdding(true)}>+ Добавить раунд</button>)}
      </div>
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
