import { useState } from 'react'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import { metaLine } from '../../lib/packLoader'
import { updateRound, createQuestion, hideQuestion, deleteQuestion, defaultModeFor } from '../../lib/editorApi'
import { generateCrossword, type CrosswordInput } from '../../lib/crossword'
import { QuestionForm } from './QuestionForm'
import { EditableText, MECHANIC_NAMES } from './EditorApp'
import type { EditorUser } from '../../lib/auth'
import { MediaSlot } from './QuestionForm'
import type { CrosswordGrid, JeopardyTheme } from '../../types/quiz'

// ═══ Экран раунда: настройки механики + вопросы ═══

function answerSnippet(q: { answer: { mode: string } }): string {
  const a = q.answer as Record<string, unknown>
  switch (a.mode) {
    case 'free_text': return String(a.correct ?? '').split('/')[0].trim()
    case 'choice': return String(a.correct_choice ?? '')
    case 'order': return String(a.correct_order ?? '')
    case 'match': return Array.isArray(a.correct_pairs) ? (a.correct_pairs as string[]).join(' ') : ''
    case 'crossword_word': return String(a.word ?? '')
    default: return ''
  }
}

export function RoundScreen({ pack, roundIdx, user, onBack, onChanged }: {
  pack: LoadedPack; roundIdx: number; user: EditorUser
  onBack: () => void; onChanged: () => void
}) {
  const round = pack.rounds[roundIdx]
  const [openQIdx, setOpenQIdx] = useState<number | null>(null)
  const locked = pack.status === 'active' && user.role !== 'owner'


  const patch = async (p: Parameters<typeof updateRound>[1]) => {
    await updateRound(round.id, p); onChanged()
  }

  return (
    <div>
      {openQIdx !== null && round.questions[openQIdx] && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 100,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflow: 'auto',
        }} onClick={e => { if (e.target === e.currentTarget) setOpenQIdx(null) }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--neon)',
            boxShadow: '0 0 30px rgba(0,229,255,.25)',
            borderRadius: 12, padding: 16, margin: '4vh 8px', maxWidth: 860, width: '100%' }}>
            <QuestionForm pack={pack} round={round} qIdx={openQIdx}
              onBack={() => { setOpenQIdx(null); onChanged() }} onChanged={onChanged} />
          </div>
        </div>
      )}
      <p><button onClick={onBack}>← {pack.name}</button></p>
      <h3>Раунд {roundIdx + 1} · {MECHANIC_NAMES[round.mechanic]}</h3>

      <table style={{ borderSpacing: 8 }}>
        <tbody>
          <tr><td>Заголовок (проектор):</td><td>
            <EditableText value={round.title_lines.join(' / ')} disabled={locked}
              onSave={v => void patch({ title_lines: v.split('/').map(s => s.trim()).filter(Boolean) })} />
            <span style={{ opacity: .5 }}> (строки через /)</span>
          </td></tr>
          <tr><td>Таймер:</td><td>
            <select value={round.timer_seconds} disabled={locked}
              onChange={e => void patch({ timer_seconds: Number(e.target.value) })}>
              {[20, 30, 45, 60, 90, 120].map(s => <option key={s} value={s}>{s} сек</option>)}
            </select>
          </td></tr>
          <tr><td>Показ ответов:</td><td>
            <select value={round.answers_reveal} disabled={locked}
              onChange={e => void patch({ answers_reveal: e.target.value as LoadedRound['answers_reveal'] })}>
              <option value="after_question">сразу после вопроса</option>
              <option value="after_round">в конце раунда</option>
              <option value="never">не показывать</option>
            </select>
          </td></tr>
          <tr><td>metaLine:</td><td>
            <code>{metaLine(round)}</code>{' '}
            <EditableText value={round.meta_line_override ?? ''} disabled={locked}
              onSave={v => void patch({ meta_line_override: v.trim() || null })} />
            <span style={{ opacity: .5 }}> (пусто = автогенерация)</span>
          </td></tr>
          <tr><td style={{ verticalAlign: 'top' }}>Правила:</td><td>
            <RulesEditor rules={round.rules} disabled={locked}
              onSave={rules => void patch({ rules })} />
          </td></tr>
          <tr><td>Музыка/озвучка правил:</td><td>
            <MediaSlot label="" packId={pack.id} accept="audio/*"
              paths={round.rules_audio ? [round.rules_audio] : []} max={1}
              onChange={paths => void patch({ rules_audio: paths[0] ?? null })} />
          </td></tr>
          <tr><td>Вне зачёта:</td><td>
            <input type="checkbox" checked={round.off_scoreboard} disabled={locked}
              onChange={e => void patch({ off_scoreboard: e.target.checked })} />
            <span style={{ opacity: .5 }}> (разогрев: баллы не идут в табло)</span>
          </td></tr>
        </tbody>
      </table>

      {round.mechanic === 'crossword' &&
        <CrosswordEditor round={round} locked={locked} onChanged={onChanged} />}
      {round.mechanic === 'jeopardy' &&
        <JeopardyEditor round={round} locked={locked} onChanged={onChanged} />}

      {round.mechanic !== 'jeopardy' && <>
        <h4>Вопросы</h4>
        {round.questions.map((q, i) => (
          <div key={q.id} style={{
            display: 'flex', justifyContent: 'space-between',
            border: '1px solid #22314f', borderRadius: 8, padding: 8, marginBottom: 6,
            opacity: q.hidden ? .45 : 1, background: q.hidden ? '#101827' : undefined,
          }}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
              <b>{i + 1}.</b> {q.question_text || <i style={{ opacity: .5 }}>(пусто)</i>}
              {answerSnippet(q) && <span style={{ color: '#16a34a' }}> → {answerSnippet(q)}</span>}
              {' '}{q.hidden ? '(скрыт)' : q.status === 'ready' ? '✅' : '🟡'}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {!q.hidden && <button onClick={() => setOpenQIdx(i)}>Открыть</button>}
              {!locked && (q.hidden
                ? <button title="Вернуть в игру"
                    onClick={async () => { await hideQuestion(q.id, false); onChanged() }}>↩</button>
                : <button title="Скрыть: остаётся в списке, в игре не показывается"
                    onClick={async () => { await hideQuestion(q.id, true); onChanged() }}>👁</button>)}
              {user.role === 'owner' && <button title="Удалить безвозвратно"
                onClick={async () => {
                  if (confirm('Удалить вопрос безвозвратно?')) { await deleteQuestion(q.id); onChanged() }
                }}>🗑</button>}
            </div>
          </div>
        ))}
        {!locked && <button onClick={async () => {
          await createQuestion(round.id, defaultModeFor(round.mechanic))
          onChanged()
          setOpenQIdx(round.questions.length)  // новый — в конце списка, модалка сразу
        }}>+ Вопрос</button>}
      </>}
    </div>
  )
}

function RulesEditor({ rules, onSave, disabled }: {
  rules: string[]; onSave: (r: string[]) => void; disabled: boolean
}) {
  const [items, setItems] = useState(rules)
  const [dirty, setDirty] = useState(false)
  return (
    <div>
      {items.map((r, i) => (
        <div key={i} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
          <input value={r} disabled={disabled} style={{ flex: 1, padding: 4 }}
            onChange={e => { const c = [...items]; c[i] = e.target.value; setItems(c); setDirty(true) }} />
          <button disabled={disabled}
            onClick={() => { setItems(items.filter((_, j) => j !== i)); setDirty(true) }}>✕</button>
        </div>
      ))}
      {!disabled && <>
        <button title="Добавить правило" onClick={() => { setItems([...items, '']); setDirty(true) }}>＋</button>
        {dirty && <button title="Сохранить правила"
          onClick={() => { onSave(items.filter(s => s.trim())); setDirty(false) }}
          style={{ marginLeft: 6, background: '#dcfce7' }}>✔</button>}
      </>}
    </div>
  )
}

// ── Кроссворд: слова берутся из вопросов (mode=crossword_word), сетка — в settings ──
function CrosswordEditor({ round, locked, onChanged }: {
  round: LoadedRound; locked: boolean; onChanged: () => void
}) {
  const [result, setResult] = useState<{ grid: CrosswordGrid | null; unplaced: string[] } | null>(null)
  const [seed, setSeed] = useState(1)
  const settings = round.settings as { grid: CrosswordGrid | null }

  const inputs: CrosswordInput[] = round.questions
    .filter(q => !q.hidden && q.answer.mode === 'crossword_word')
    .map(q => ({ word: (q.answer as { word: string }).word, clue: q.question_text }))

  const canGenerate = inputs.length >= 6 && inputs.length <= 10 &&
    inputs.every(i => i.word.trim())

  return (
    <div style={{ margin: '12px 0', padding: 10, border: '1px dashed #3a4a6b', borderRadius: 8 }}>
      <b>Сетка кроссворда</b> — слова добавляй как вопросы (тип «Слово кроссворда»),
      определение = текст вопроса. Сейчас слов: {inputs.length} (нужно 6–10).
      <div style={{ margin: '8px 0', display: 'flex', gap: 6 }}>
        <button disabled={!canGenerate || locked} onClick={() => {
          setResult(generateCrossword(inputs, 2000, seed))
          setSeed(s => s + 1)
        }}>Собрать сетку</button>
        {result?.grid && !locked && <button onClick={async () => {
          await updateRound(round.id, { settings: { grid: result.grid } })
          setResult(null); onChanged()
        }} style={{ background: '#dcfce7' }}>Зафиксировать</button>}
      </div>
      {result && result.unplaced.length > 0 && (
        <div style={{ color: '#f43f5e' }}>
          Не уложились: {result.unplaced.join(', ')} — нет общих букв, замени слово (или «Собрать сетку» ещё раз).
        </div>
      )}
      {(result?.grid ?? settings.grid) && <GridView grid={(result?.grid ?? settings.grid)!} />}
      {settings.grid && !result && <div style={{ opacity: .6 }}>Сетка зафиксирована ✅</div>}
    </div>
  )
}

function GridView({ grid }: { grid: CrosswordGrid }) {
  const cells = new Map<string, { ch: string; num?: number }>()
  for (const w of grid.words) {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === 'down' ? w.row + i : w.row
      const c = w.dir === 'across' ? w.col + i : w.col
      const key = `${r},${c}`
      const prev = cells.get(key)
      cells.set(key, { ch: w.word[i], num: i === 0 ? w.number : prev?.num })
    }
  }
  return (
    <div>
      <div style={{ display: 'grid', gap: 1, width: 'fit-content',
        gridTemplateColumns: `repeat(${grid.cols}, 26px)` }}>
        {Array.from({ length: grid.rows * grid.cols }, (_, i) => {
          const r = Math.floor(i / grid.cols), c = i % grid.cols
          const cell = cells.get(`${r},${c}`)
          return (
            <div key={i} style={{
              width: 26, height: 26, fontSize: 12, position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: cell ? '#fff' : 'transparent',
              border: cell ? '1px solid #999' : 'none',
            }}>
              {cell?.num && <span style={{ position: 'absolute', top: 0, left: 1, fontSize: 7 }}>{cell.num}</span>}
              {cell?.ch}
            </div>
          )
        })}
      </div>
      <div style={{ fontSize: 13, marginTop: 6 }}>
        {(['across', 'down'] as const).map(dir => (
          <div key={dir}>
            <b>{dir === 'across' ? 'По горизонтали' : 'По вертикали'}:</b>{' '}
            {grid.words.filter(w => w.dir === dir).sort((a, b) => a.number - b.number)
              .map(w => `${w.number}. ${w.clue || w.word}`).join('  ')}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Jeopardy: темы × плитки ──
function JeopardyEditor({ round, locked, onChanged }: {
  round: LoadedRound; locked: boolean; onChanged: () => void
}) {
  const settings = round.settings as { themes: JeopardyTheme[] }
  const [themes, setThemes] = useState<JeopardyTheme[]>(settings.themes ?? [])
  const [dirty, setDirty] = useState(false)
  const VALUES = [0.5, 1, 1.5, 2]

  const upd = (fn: (t: JeopardyTheme[]) => JeopardyTheme[]) => {
    setThemes(fn); setDirty(true)
  }

  return (
    <div style={{ margin: '12px 0', padding: 10, border: '1px dashed #3a4a6b', borderRadius: 8 }}>
      <b>Темы × плитки</b> (аудио — путь в Storage; загрузка файлов плиток — из формы вопроса пока не нужна, вставляй путь после загрузки в любом вопросе или через Supabase Dashboard → Storage)
      {themes.map((t, ti) => (
        <div key={ti} style={{ margin: '8px 0', padding: 8, background: 'var(--panel2)', borderRadius: 6 }}>
          <input value={t.name} placeholder={`Тема ${ti + 1}`} disabled={locked}
            onChange={e => upd(ts => ts.map((x, i) => i === ti ? { ...x, name: e.target.value } : x))}
            style={{ padding: 4, fontWeight: 700 }} />
          <button disabled={locked} onClick={() => upd(ts => ts.filter((_, i) => i !== ti))}>✕ тему</button>
          <table style={{ marginTop: 4, fontSize: 13 }}>
            <tbody>
              {t.tiles.map((tile, i) => (
                <tr key={i}>
                  <td><b>{tile.value}</b></td>
                  <td><input value={tile.audio} placeholder="pack-…/song.mp3" disabled={locked}
                    style={{ width: 240, padding: 3 }}
                    onChange={e => upd(ts => ts.map((x, xi) => xi === ti ? {
                      ...x, tiles: x.tiles.map((tl, tli) => tli === i ? { ...tl, audio: e.target.value } : tl),
                    } : x))} /></td>
                  <td><input value={tile.correct} placeholder="ответ" disabled={locked}
                    style={{ width: 180, padding: 3 }}
                    onChange={e => upd(ts => ts.map((x, xi) => xi === ti ? {
                      ...x, tiles: x.tiles.map((tl, tli) => tli === i ? { ...tl, correct: e.target.value } : tl),
                    } : x))} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {!locked && <>
        <button onClick={() => upd(ts => [...ts, {
          name: '', tiles: VALUES.map(v => ({ value: v, audio: '', correct: '' })),
        }])}>+ Тема</button>
        {dirty && <button style={{ marginLeft: 6, background: '#dcfce7' }}
          onClick={async () => {
            await updateRound(round.id, { settings: { themes } })
            setDirty(false); onChanged()
          }}>Сохранить темы</button>}
      </>}
    </div>
  )
}
