import { useEffect, useRef, useState } from 'react'
import { useEditorUser, signIn, signOut, type EditorUser } from '../../lib/auth'
import { Hint, useHint } from '../../components/Hint'
import { canEditPack, isLiveNow, whyReadOnly } from '../../lib/packRights'
import { listPacks, loadPack, type LoadedPack } from '../../lib/packLoader'
import { estimateRoundMinutes } from '../../lib/duration'
import {
  createPack, renamePack, setPackStatus, setPackTheme, setPackSettings, duplicatePack,
  createRound, swapRounds, deleteRound,
  getOrCreateBank, exportPackJson, exportPackCsv,
} from '../../lib/editorApi'
import { MediaSlot } from './QuestionForm'
import { ratingsByQuestion } from '../../lib/ratings'
import { packMediaSize, findOrphans, deleteOrphans, mediaLinks, findMissing, type Orphan } from '../../lib/mediaUpload'
import { supabase, signupClient } from '../../lib/supabase'
import { validatePack, type Problem } from '../../lib/validate'
import { RoundScreen } from './RoundScreen'
import type { Pack, MechanicKey } from '../../types/quiz'
import { InfoSlidesModal } from './InfoSlidesModal'


/** Уборка осиротевших файлов.
 *  Удаление вопроса стирает строку в базе, но файл в хранилище остаётся —
 *  Supabase не отслеживает ссылки. Эта кнопка находит такие файлы и удаляет. */
function MediaCleanup({ pack, onDone }: { pack: LoadedPack; onDone: () => void }) {
  const [found, setFound] = useState<Orphan[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const [missing, setMissing] = useState<string[] | null>(null)

  const scan = async () => {
    setBusy(true); setErr('')
    try {
      setFound(await findOrphans(pack))
      // заодно проверяем обратное: ссылки, для которых файла УЖЕ НЕТ.
      // Это и есть «звук пропал»: путь в базе остался, файла нет.
      setMissing(await findMissing(pack))
    }
    catch (e) { setErr(e instanceof Error ? e.message : 'не удалось проверить') }
    finally { setBusy(false) }
  }
  const wipe = async () => {
    if (!found?.length) return
    const mb = (found.reduce((n, o) => n + o.size, 0) / 1048576).toFixed(1)
    if (!confirm(`Удалить ${found.length} файл(ов) на ${mb} МБ?\n\n`
      + 'Это файлы, на которые не ссылается ни один вопрос пакета. '
      + 'Действие необратимо.')) return
    setBusy(true)
    try { await deleteOrphans(found); setFound([]); onDone() }
    catch (e) { setErr(e instanceof Error ? e.message : 'не удалось удалить') }
    finally { setBusy(false) }
  }

  return (
    <span className="media-clean">
      {found === null
        ? <button onClick={() => void scan()} disabled={busy}
            title="Файлы удалённых вопросов остаются в хранилище — здесь их можно найти">
            {busy ? 'ищу…' : 'Проверить мусор'}
          </button>
        : found.length === 0
          ? <span className="ed-row-meta">мусора нет</span>
          : <button className="danger" onClick={() => void wipe()} disabled={busy}>
              Удалить {found.length} лишних ·{' '}
              {(found.reduce((n, o) => n + o.size, 0) / 1048576).toFixed(1)} МБ
            </button>}
      {err && <span className="ed-row-meta" style={{ color: 'var(--danger)' }}>{err}</span>}
      {missing && missing.length > 0 && (
        <button className="media-missing"
          onClick={() => alert('НЕТ В ХРАНИЛИЩЕ (' + missing.length + '):\n\n'
            + missing.map(m => m.split('/').pop()).join('\n')
            + '\n\nЭти файлы надо загрузить заново в соответствующие вопросы и плитки.')}>
          ⚠ файлов нет в хранилище: {missing.length} — показать список
        </button>
      )}
      {missing && missing.length === 0 && found !== null &&
        <span className="ed-row-meta">все файлы на месте</span>}
    </span>
  )
}


/** Выгрузка пакета: JSON со всеми вопросами + список медиа со ссылками.
 *  Нужна как страховка перед удалением медиа или раунда: место в хранилище
 *  кончается незаметно, а вопросы должны пережить чистку. */
function PackExport({ pack }: { pack: LoadedPack }) {
  const [busy, setBusy] = useState(false)

  const download = (name: string, text: string, type = 'application/json') => {
    const url = URL.createObjectURL(new Blob([text], { type }))
    const a = document.createElement('a')
    a.href = url; a.download = name; a.click()
    URL.revokeObjectURL(url)
  }

  const exportAll = async () => {
    setBusy(true)
    try {
      const stamp = new Date().toISOString().slice(0, 10)
      const safe = pack.name.replace(/[^\wА-Яа-яЁё-]+/g, '_').slice(0, 40)
      const links = await mediaLinks(pack)
      const map = new Map(links.map(l => [l.path, l.url]))
      // основной формат — таблица: открывается в Excel двойным кликом,
      // ссылки на медиа лежат прямо в ячейках, качать можно по клику
      // Оценки собираем по ВСЕМ играм этого пакета: интересна не одна
      // вечеринка, а то, какие вопросы стабильно проседают.
      const rated = await ratingsByQuestion()
      download(`${safe}_${stamp}.csv`, exportPackCsv(pack, map, rated), 'text/csv;charset=utf-8')
      // резервный слепок: из него можно восстановить структуру целиком
      download(`${safe}_${stamp}_резерв.json`, exportPackJson(pack))
    } finally { setBusy(false) }
  }

  return (
    <button className="ghost" disabled={busy} onClick={() => void exportAll()}
      title="Таблица CSV для Excel: все вопросы, ответы и ссылки на медиа">
      {busy ? 'готовлю…' : '⬇ Выгрузить в Excel'}
    </button>
  )
}

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
  blitz: 'Блиц «100 вопросов»',
  race: 'Скачки бульдогов (финал-лотерея)',
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
  bank: 'БАНК ВОПРОСОВ',
}

function PackList({ packs, user, onOpen, onChanged }: {
  packs: Pack[]; user: EditorUser
  onOpen: (id: string) => void; onChanged: () => void
}) {
  const [name, setName] = useState('')
  const [showEditors, setShowEditors] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const hint = useHint()
  return (
    <div>
      {user.role === 'owner' && (
        <div style={{ margin: '12px 0' }}>
          <button className="ghost" onClick={() => setShowEditors(v => !v)}>
            {showEditors ? '▾ Скрыть редакторов' : '▸ Редакторы (доступы)'}
          </button>
          {showEditors && <EditorsPanel me={user} />}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
        <input ref={nameRef} placeholder="Название нового пакета" value={name}
          onChange={e => { setName(e.target.value); hint.clear() }} style={{ padding: 8, flex: 1 }} />
        {/* Кнопка не серая, а говорящая: раньше она молча не срабатывала, и
            связь «сначала название — потом кнопка» приходилось угадывать. */}
        <button onClick={async () => {
          if (!name.trim()) return hint.show(
            'Сначала впиши название пакета в поле слева — по нему ты найдёшь его в списке.',
            nameRef.current)
          hint.clear()
          const p = await createPack(name.trim()); setName(''); onChanged(); onOpen(p.id)
        }}>+ Новый пакет</button>
        {/* банк один на всех: кнопка либо создаст его, либо просто откроет */}
        <button onClick={async () => { const b = await getOrCreateBank(); onChanged(); onOpen(b.id) }}
          title="Хранилище вопросов для будущих игр">📚 Банк</button>
      </div>
      <Hint text={hint.text} />
      {packs.length === 0 && <p style={{ opacity: .6 }}>Пакетов пока нет — создай первый.</p>}
      {/* строка пакета: название во всю ширину, под ним состояние,
          под ними кнопки — иначе на 390px кнопки вылезали за экран */}
      {packs.filter(p => user.role === 'owner' || !p.is_private).map(p => (
        <div key={p.id} className={`pack-row${p.status === 'archived' ? ' archived' : ''}`}>
          <div className="pack-name">{p.name}</div>
          <div className="pack-meta">
            <span className={`pack-status st-${p.status}`}>{STATUS_RU[p.status]}</span>
            <span className="pack-theme">тема: {p.theme}</span>
          </div>
          <div className="pack-acts">
            <button onClick={() => onOpen(p.id)}>Открыть</button>
            <button onClick={async () => { await duplicatePack(p.id); onChanged() }}>Дублировать</button>
            {user.role === 'owner' && (p.status === 'archived'
              ? <button onClick={async () => { await setPackStatus(p.id, 'draft'); onChanged() }}>
                  Вернуть из архива</button>
              : <button onClick={async () => {
                  if (!confirm(`Убрать «${p.name}» в архив?\n\nПакет НЕ удаляется: он просто пропадает из выбора на игре. Вернуть можно в любой момент.`)) return
                  await setPackStatus(p.id, 'archived'); onChanged()
                }}>В архив</button>)}
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
  const [slidesOpen, setSlidesOpen] = useState(false)

  const reload = () => void loadPack(packId, true, true).then(setPack).catch(() => {})
  useEffect(reload, [packId])

  // суммарный объём медиа пакета в Storage
  const [mediaSizeMb, setMediaSizeMb] = useState<number | null>(null)
  useEffect(() => {
    void packMediaSize(packId).then(mb => setMediaSizeMb(mb)).catch(() => setMediaSizeMb(null))
  }, [packId, pack?.updated_at])

  if (!pack) return <div>Загрузка пакета…</div>
  // Право правки считает общий модуль — то же условие, что в политиках базы.
  // Раньше здесь стояло `pack.status === 'active' && user.role !== 'owner'`:
  // у редактора пропадали кнопки удаления, стрелки порядка и «добавить
  // вопрос», как только пакет попадал в статус «идёт игра» — а он залипает
  // и после игры. Человек видел свой пакет и не мог с ним ничего сделать.
  const locked = !canEditPack(user, pack)
  const liveNow = isLiveNow(pack)
  const readOnlyWhy = whyReadOnly(user, pack)
  // банк — хранилище, а не игра: игровые настройки в нём бессмысленны
  const isBank = pack.status === 'bank'

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
      {/* Молчаливой серости больше нет: если правки закрыты — сказано, почему.
          Если пакет прямо сейчас играется — предупреждение, а не блокировка. */}
      {readOnlyWhy && <div className="ed-note ed-note-lock">🔒 {readOnlyWhy}</div>}
      {!readOnlyWhy && liveNow &&
        <div className="ed-note ed-note-live">▶ Пакет сейчас в игре. Правки видны на
          проекторе сразу — если игра идёт, лучше дождаться её конца.</div>}
      <div className="ed-card"><h4>Пакет · медиа {mediaSizeMb === null ? '…' : `${mediaSizeMb} МБ`}
        <span className="pack-tools"><PackExport pack={pack} /><MediaCleanup pack={pack} onDone={reload} /></span>
      </h4>
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
          {user.role === 'owner' && (
            <div className="ed-field"><label>Доступ</label>
              <label className="ed-check" style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
                <input type="checkbox" checked={!!pack.is_private}
                  onChange={async ev => {
                    await supabase.from('packs').update({ is_private: ev.target.checked })
                      .eq('id', pack.id)
                    reload()
                  }} />
                приватный пакет
              </label>
              <div className="ed-hint">Виден только владельцам; редакторы его не увидят в списке
                и не откроют. Жёсткое серверное ограничение (RLS) добавим вместе со входом хоста</div>
            </div>
          )}
          <div className="ed-field"><label>Тема оформления</label>
            <select value={pack.theme} disabled={locked}
              onChange={async e => { await setPackTheme(pack.id, e.target.value); reload() }}>
              <option value="classic">Классика</option>
              <option value="new_year">Новый год</option>
              <option value="potter">Волшебная школа</option>
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
          {slidesOpen && (
            <InfoSlidesModal pack={pack} loaded={pack} reload={reload}
              onClose={() => setSlidesOpen(false)} />
          )}
          <div className="ed-field"><label>Слайды-брифинги</label>
            <button className="ghost" onClick={() => setSlidesOpen(true)}>
              Открыть редактор ({(pack.settings?.info_slides ?? []).length})
            </button>
            <div className="ed-hint">
              Правила, туториал, реклама. Показываются кнопкой из админки
              в любой момент игры — к раундам не привязаны
            </div>
          </div>
          <div className="ed-field"><label>Музыка в лобби</label>
            <MediaSlot label="" packId={pack.id} accept="audio/*" max={1}
              paths={pack.settings?.lobby_music ? [pack.settings.lobby_music] : []}
              onChange={async paths => {
                await setPackSettings(pack.id, { ...(pack.settings ?? {}), lobby_music: paths[0] })
                reload()
              }} />
            <div className="ed-hint">
              Играет на экране ожидания, пока собираются команды.
              Если пусто — играет общая фоновая музыка выше
            </div>
          </div>
          <div className="ed-field"><label>Как играем</label>
            <select value={pack.settings?.play_mode ?? 'phones'}
              onChange={async ev => { await setPackSettings(pack.id, { ...(pack.settings ?? {}), play_mode: ev.target.value as never }); reload() }}>
              <option value="phones">на телефонах</option>
              <option value="paper">на бумаге</option>
            </select>
            <div className="ed-hint">Бумага: блок «ответы команд» скрыт, баллы вводит ведущий
              вручную в админке; раунды «Своя игра» и «Угадай мелодию» в этом режиме
              пропускаются (им нужны телефоны)</div>
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

      <div className="ed-card"><h4>{isBank ? 'Рубрики' : 'Раунды'}
        {(() => {
          const total = pack.rounds.reduce((n, r) => n + estimateRoundMinutes(r), 0)
          return total > 0
            ? <span className="round-time" title="Сумма по раундам, без перерывов и финала">
                вся игра ≈ {total} мин
              </span>
            : null
        })()}
      </h4>
      {pack.rounds.map((r, i) => (
        <div key={r.id} className="ed-row">
          <div className="ed-num">{i + 1}</div>
          <div className="ed-row-main">
            <div className="ed-row-title">{r.title_lines.join(' ') || '(без названия)'}</div>
            <div className="ed-row-meta">
              {MECHANIC_NAMES[r.mechanic]}{r.off_scoreboard && ' · разогрев, вне зачёта'}
              {estimateRoundMinutes(r) > 0 && ` · ≈ ${estimateRoundMinutes(r)} мин`}
            </div>
          </div>
          <span className="ed-count" title={
            r.mechanic === 'melody' ? 'Количество треков в раунде'
            : r.mechanic === 'jeopardy' ? 'Количество плиток в раунде'
            : 'Количество вопросов в раунде'}>
            {r.mechanic === 'melody'
              ? ((r.settings as { themes?: { tracks: unknown[] }[] }).themes ?? [])
                  .reduce((s, th) => s + th.tracks.length, 0)
              : r.mechanic === 'jeopardy'
                ? ((r.settings as { themes?: { tiles: unknown[] }[] }).themes ?? [])
                    .reduce((s, th) => s + th.tiles.length, 0)
                : r.questions.filter(q => !q.hidden).length}
          </span>
          <div className="ed-actions">
            <button className="ico" data-tip="Выше" disabled={i === 0 || locked}
              onClick={async () => { await swapRounds(pack.rounds[i], pack.rounds[i - 1]); reload() }}>↑</button>
            <button className="ico" data-tip="Ниже" disabled={i === pack.rounds.length - 1 || locked}
              onClick={async () => { await swapRounds(pack.rounds[i], pack.rounds[i + 1]); reload() }}>↓</button>
            <button className="ico" data-tip="Редактировать" onClick={() => setOpenRoundIdx(i)}>✏️</button>
            {!locked &&
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
  const titleRef = useRef<HTMLInputElement>(null)
  const hint = useHint()
  return (
    <div className="ed-addround" style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
      <select value={mechanic} onChange={e => setMechanic(e.target.value as MechanicKey)}>
        {(Object.keys(MECHANIC_NAMES) as MechanicKey[]).map(k =>
          <option key={k} value={k}>{MECHANIC_NAMES[k]}</option>)}
      </select>
      <input ref={titleRef} placeholder="Название раунда" value={title}
        onChange={e => { setTitle(e.target.value); hint.clear() }} style={{ padding: 6 }} />
      <button onClick={async () => {
        if (!title.trim()) return hint.show(
          'У раунда должно быть название — оно показывается залу на заставке.', titleRef.current)
        await createRound(packId, nextPos, mechanic, title.trim()); onDone()
      }}>Создать</button>
      <button onClick={onDone}>Отмена</button>
      <Hint text={hint.text} />
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


// ── Управление редакторами (только владелец) ──
// Добавление без SQL: аккаунт создаётся отдельным клиентом (signupClient),
// чтобы не подменить сессию владельца, затем строка прав пишется в editor_roles.
interface RoleRow {
  user_id: string; role: 'owner' | 'editor'; display_name: string
  email: string; can_edit_all: boolean
}

function EditorsPanel({ me }: { me: EditorUser }) {
  const [rows, setRows] = useState<RoleRow[]>([])
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [dname, setDname] = useState('')
  const [canAll, setCanAll] = useState(false)
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const hint = useHint()

  const load = async () => {
    const { data } = await supabase.from('editor_roles').select('*').order('role')
    setRows((data ?? []) as RoleRow[])
  }
  useEffect(() => { void load() }, [])

  const add = async () => {
    setBusy(true); setMsg('')
    try {
      const { data, error } = await signupClient.auth.signUp({
        email: email.trim(), password: pass,
      })
      if (error) throw error
      const uid = data.user?.id
      if (!uid) throw new Error('Аккаунт не создался — проверь настройки Auth')
      const { error: e2 } = await supabase.from('editor_roles').insert({
        user_id: uid, role: 'editor', display_name: dname.trim() || email.trim(),
        email: email.trim(), can_edit_all: canAll,
      })
      if (e2) throw e2
      setMsg(`Готово: ${email.trim()} добавлен. Передай ему пароль лично.`)
      setEmail(''); setPass(''); setDname(''); setCanAll(false)
      void load()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Не получилось')
    } finally { setBusy(false) }
  }

  const toggleAll = async (r: RoleRow) => {
    await supabase.from('editor_roles')
      .update({ can_edit_all: !r.can_edit_all }).eq('user_id', r.user_id)
    void load()
  }
  const remove = async (r: RoleRow) => {
    if (!confirm(`Убрать доступ у «${r.display_name}»? Аккаунт останется, но в редактор он не войдёт.`)) return
    await supabase.from('editor_roles').delete().eq('user_id', r.user_id)
    void load()
  }

  return (
    <div className="ed-card" style={{ marginTop: 10 }}>
      <h4>Редакторы и права</h4>
      <table className="ed-table" style={{ width: '100%' }}>
        <thead><tr><th>Имя</th><th>Email</th><th>Роль</th>
          <th>Чужие пакеты</th><th /></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.user_id}>
              <td>{r.display_name}</td>
              <td style={{ opacity: .7 }}>{r.email || '—'}</td>
              <td>{r.role === 'owner' ? 'владелец' : 'редактор'}</td>
              <td>
                {r.role === 'owner' ? 'все' : (
                  <label style={{ display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={r.can_edit_all}
                      onChange={() => void toggleAll(r)} />
                    {r.can_edit_all ? 'может править' : 'только свои'}
                  </label>
                )}
              </td>
              <td>{r.role !== 'owner' && r.user_id !== me.id &&
                <button className="ico danger" data-tip="Убрать доступ"
                  onClick={() => void remove(r)}>🗑</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 style={{ marginTop: 16 }}>Добавить редактора</h4>
      <div className="ed-grid2">
        <div className="ed-field"><label>Email</label>
          <input ref={emailRef} value={email} onChange={ev => { setEmail(ev.target.value); hint.clear() }}
            placeholder="name@mail.ru" /></div>
        <div className="ed-field"><label>Временный пароль</label>
          <input ref={passRef} value={pass} onChange={ev => { setPass(ev.target.value); hint.clear() }}
            placeholder="минимум 6 символов" /></div>
        <div className="ed-field"><label>Имя (видно в списке)</label>
          <input value={dname} onChange={ev => setDname(ev.target.value)} placeholder="Толян" /></div>
        <div className="ed-field"><label>Права</label>
          <label className="ed-check" style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
            <input type="checkbox" checked={canAll} onChange={ev => setCanAll(ev.target.checked)} />
            может править чужие пакеты (иначе — только созданные им)
          </label></div>
      </div>
      {msg && <div className="ed-hint" style={{ marginTop: 8 }}>{msg}</div>}
      <Hint text={hint.text} />
      <button disabled={busy} onClick={() => {
        // Требования к паролю знает только Supabase — скажем о них до отправки,
        // иначе кнопка просто серая и непонятно, чего ей не хватает.
        if (!email.trim()) return hint.show('Нужен email — на него редактор будет входить.', emailRef.current)
        if (pass.length < 6) return hint.show('Временный пароль — минимум 6 символов. Редактор сменит его сам.', passRef.current)
        hint.clear()
        void add()
      }}>
        {busy ? 'Создаём…' : '+ Добавить редактора'}
      </button>
      <div className="ed-hint" style={{ marginTop: 8 }}>
        Приватные пакеты в любом случае видит только владелец. Если в Supabase
        включено подтверждение почты, новому редактору придёт письмо — до
        подтверждения он не войдёт (можно выключить: Auth → Email → Confirm email).
      </div>
    </div>
  )
}

