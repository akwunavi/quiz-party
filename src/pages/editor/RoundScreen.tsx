import { useRef, useState } from 'react'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import { metaLine } from '../../lib/packLoader'
import { updateRound, createQuestion, hideQuestion, deleteQuestion, defaultModeFor } from '../../lib/editorApi'
import { generateCrossword, type CrosswordInput } from '../../lib/crossword'
import { QuestionForm } from './QuestionForm'
import { QuestionPreview } from './QuestionPreview'
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
  const [previewIdx, setPreviewIdx] = useState<number | null>(null)
  const backdropDown = useRef(false)
  const locked = pack.status === 'active' && user.role !== 'owner'


  const isJeopardy = round.mechanic === 'jeopardy'

  const patch = async (p: Parameters<typeof updateRound>[1]) => {
    await updateRound(round.id, p); onChanged()
  }

  return (
    <div>
      {openQIdx !== null && round.questions[openQIdx] && (
        <div className="qm-backdrop"
          onMouseDown={e => { backdropDown.current = e.target === e.currentTarget }}
          onClick={e => {
            // закрываем только если и нажатие, и отпускание были на фоне
            // (иначе выделение текста, закончившееся на фоне, закрывало модалку)
            if (e.target === e.currentTarget && backdropDown.current) setOpenQIdx(null)
            backdropDown.current = false
          }}>
          <div className="qm-window">
            <QuestionForm pack={pack} round={round} qIdx={openQIdx}
              onBack={() => { setOpenQIdx(null); onChanged() }} onChanged={onChanged}
              onPreview={() => { setPreviewIdx(openQIdx); }} />
          </div>
        </div>
      )}
      {previewIdx !== null && round.questions[previewIdx] && (
        <QuestionPreview pack={pack} round={round} q={round.questions[previewIdx]}
          onClose={() => setPreviewIdx(null)} />
      )}
      <div className="ed-crumb">
        <button className="ico" data-tip="К пакету" onClick={onBack}>←</button>
        <div>
          <div className="ed-h">Раунд {roundIdx + 1} · {round.title_lines.join(' ') || 'без названия'}</div>
          <div className="ed-sub">{MECHANIC_NAMES[round.mechanic]}</div>
        </div>
      </div>

      <div className="ed-card"><h4>Настройки раунда</h4><div className="ed-grid2">
        <table style={{ display: 'none' }}><tbody>
          <tr><td>Заголовок (проектор):</td><td>
            <EditableText value={round.title_lines.join(' / ')} disabled={locked}
              onSave={v => void patch({ title_lines: v.split('/').map(s => s.trim()).filter(Boolean) })} />
            <span style={{ opacity: .5 }}> (строки через /)</span>
          </td></tr>
          {!isJeopardy && <tr><td>Таймер:</td><td>
            <input type="number" min={5} max={600} value={round.timer_seconds} disabled={locked}
              onChange={e => void patch({ timer_seconds: Number(e.target.value) || 30 })} />
            <div className="ed-hint">Секунды, можно ввести с клавиатуры</div>
          </td></tr>}
          {!isJeopardy && <tr><td>Показ ответов:</td><td>
            <select value={round.answers_reveal} disabled={locked}
              onChange={e => void patch({ answers_reveal: e.target.value as LoadedRound['answers_reveal'] })}>
              <option value="after_question">сразу после вопроса</option>
              <option value="after_round">в конце раунда</option>
              <option value="never">не показывать</option>
            </select>
          </td></tr>}
          {!isJeopardy && <tr><td>Правок ответа:</td><td>
            <select value={(round.settings as { maxEdits?: number }).maxEdits ?? 2} disabled={locked}
              onChange={e => void patch({ settings: { ...round.settings, maxEdits: Number(e.target.value) } as never })}>
              <option value={0}>без правок</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={-1}>без ограничений</option>
            </select>
            <span style={{ opacity: .5 }}> (стереть ответ можно всегда)</span>
          </td></tr>}
          <tr><td>metaLine:</td><td>
            <EditableText value={round.meta_line_override ?? metaLine(round)} disabled={locked}
              onSave={v => void patch({ meta_line_override: v.trim() === metaLine(round) ? null : (v.trim() || null) })} />
            <span style={{ opacity: .5 }}> (правишь текущий текст; сотри всё = автогенерация)</span>
          </td></tr>
          <tr><td style={{ verticalAlign: 'top' }}>Правила:</td><td>
            <RulesEditor rules={round.rules} disabled={locked}
              onSave={rules => void patch({ rules })} />
          </td></tr>
          {!isJeopardy && <tr><td>Музыка/озвучка правил:</td><td>
            <MediaSlot label="" packId={pack.id} accept="audio/*"
              paths={round.rules_audio ? [round.rules_audio] : []} max={1}
              onChange={paths => void patch({ rules_audio: paths[0] ?? null })} />
          </td></tr>}
          <tr><td>Фоновая музыка вопросов:</td><td>
            <MediaSlot label="" packId={pack.id} accept="audio/*"
              paths={(round.settings as { bg_music?: string }).bg_music ? [(round.settings as { bg_music: string }).bg_music] : []} max={1}
              onChange={paths => void patch({ settings: { ...round.settings, bg_music: paths[0] ?? undefined } as never })} />
            <span style={{ opacity: .5 }}>играет во время таймера, если у вопроса нет своего аудио/видео</span>
          </td></tr>
          <tr><td>После раунда:</td><td>
            <label><input type="checkbox"
              checked={!!(round.settings as { show_scoreboard_after?: boolean }).show_scoreboard_after}
              disabled={locked}
              onChange={e => void patch({ settings: { ...round.settings, show_scoreboard_after: e.target.checked } as never })} />
              {' '}показать табло</label>
            {'  '}
            <label style={{ marginLeft: 16 }}>перерыв, мин:{' '}
              <input type="number" min={0} max={60} style={{ width: 64 }}
                value={(round.settings as { break_after_minutes?: number }).break_after_minutes ?? 0}
                disabled={locked}
                onChange={e => void patch({ settings: { ...round.settings, break_after_minutes: Number(e.target.value) || undefined } as never })} />
              {' '}(0 = без перерыва)</label>
          </td></tr>
          {!isJeopardy && <tr><td>Вне зачёта:</td><td>
            <input type="checkbox" checked={round.off_scoreboard} disabled={locked}
              onChange={e => void patch({ off_scoreboard: e.target.checked })} />
            <span style={{ opacity: .5 }}> (разогрев: баллы не идут в табло)</span>
          </td></tr>}
        </tbody></table>

        <div className="ed-field"><label>Заголовок на проекторе</label>
          <EditableText value={round.title_lines.join(' / ')} disabled={locked}
            onSave={v => void patch({ title_lines: v.split('/').map(s => s.trim()).filter(Boolean) })} />
          <div className="ed-hint">Несколько строк — через « / »</div>
        </div>

        <div className="ed-field"><label>Разогрев</label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
            <input type="checkbox" checked={round.off_scoreboard} disabled={locked}
              onChange={e => void patch({ off_scoreboard: e.target.checked })} />
            баллы не идут в общий зачёт
          </label>
        </div>

        {!isJeopardy && <>
          <div className="ed-field"><label>Таймер на вопрос</label>
            <input type="number" min={5} max={600} value={round.timer_seconds} disabled={locked}
              onChange={e => void patch({ timer_seconds: Number(e.target.value) || 30 })} />
            <div className="ed-hint">Секунды, можно ввести с клавиатуры</div>
          </div>
          <div className="ed-field"><label>Автопролистывание</label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
              через
              <input type="number" min={0} max={60} style={{ width: 70 }} disabled={locked}
                value={(round.settings as { autoAdvanceSec?: number }).autoAdvanceSec ?? 0}
                onChange={e => void patch({ settings: { ...round.settings, autoAdvanceSec: Number(e.target.value) || undefined } as never })} />
              сек после таймера
            </label>
            <div className="ed-hint">0 — листает ведущий вручную</div>
          </div>
          <div className="ed-field"><label>Музыка правил</label>
            <MediaSlot label="" packId={pack.id} accept="audio/*"
              paths={round.rules_audio ? [round.rules_audio] : []} max={1}
              onChange={paths => void patch({ rules_audio: paths[0] ?? null })} />
          </div>

        </>}

        <div className="ed-field"><label>Короткая подсказка (на проекторе)</label>
          <EditableText value={round.meta_line_override ?? metaLine(round)} disabled={locked}
            onSave={v => void patch({ meta_line_override: v.trim() === metaLine(round) ? null : (v.trim() || null) })} />
          <div className="ed-hint">Строка под заголовком раунда. Сотри всё — вернётся автотекст</div>
        </div>

        <div className="ed-field"><label>После раунда</label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
            <input type="checkbox" disabled={locked}
              checked={!!(round.settings as { show_scoreboard_after?: boolean }).show_scoreboard_after}
              onChange={e => void patch({ settings: { ...round.settings, show_scoreboard_after: e.target.checked } as never })} />
            показать табло
          </label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
            перерыв, мин:
            <input type="number" min={0} max={60} style={{ width: 70 }} disabled={locked}
              value={(round.settings as { break_after_minutes?: number }).break_after_minutes ?? 0}
              onChange={e => void patch({ settings: { ...round.settings, break_after_minutes: Number(e.target.value) || undefined } as never })} />
          </label>
        </div>

        <div className="ed-field" style={{ gridColumn: '1 / -1' }}><label>Правила раунда</label>
          <RulesEditor rules={round.rules} disabled={locked} onSave={rules => void patch({ rules })} />
        </div>
      </div></div>

      {round.mechanic === 'crossword' &&
        <CrosswordEditor round={round} locked={locked} onChanged={onChanged} />}
      {round.mechanic === 'jeopardy' &&
        <JeopardyEditor pack={pack} round={round} locked={locked} onChanged={onChanged} />}

      {round.mechanic !== 'jeopardy' && <>
        <div className="ed-card"><h4>Вопросы · {round.questions.filter(q => !q.hidden).length}</h4>
        {round.questions.map((q, i) => (
          <div key={q.id} className={`ed-row${q.hidden ? ' hidden-row' : ''}`}>
            <div className="ed-num">{i + 1}</div>
            <div className="ed-row-main">
              <div className="ed-row-text">
                {q.question_text || <i style={{ opacity: .5 }}>(текст не задан — только медиа)</i>}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                {answerSnippet(q)
                  ? <span className="ed-answer-chip">✓ <span>{answerSnippet(q)}</span></span>
                  : <span className="ed-answer-chip empty">ответ не задан</span>}
                {(q.media.question ?? []).length > 0 &&
                  <span className="ed-row-meta">🖼 {(q.media.question ?? []).length}</span>}
                {q.hidden && <span className="ed-row-meta">скрыт из игры</span>}
              </div>
            </div>
            <div className="ed-actions">
              <button className="ico" data-tip="Предпросмотр" onClick={() => setPreviewIdx(i)}>👁‍🗨</button>
              {!q.hidden && <button className="ico" data-tip="Редактировать"
                onClick={() => setOpenQIdx(i)}>✏️</button>}
              {!locked && (q.hidden
                ? <button className="ico" data-tip="Вернуть в игру"
                    onClick={async () => { await hideQuestion(q.id, false); onChanged() }}>👁</button>
                : <button className="ico" data-tip="Скрыть из игры"
                    onClick={async () => { await hideQuestion(q.id, true); onChanged() }}>🚫</button>)}
              {user.role === 'owner' && <button className="ico danger" data-tip="Удалить"
                onClick={async () => {
                  if (confirm('Удалить вопрос безвозвратно?')) { await deleteQuestion(q.id); onChanged() }
                }}>🗑</button>}
            </div>
          </div>
        ))}
        {!locked && <button style={{ marginTop: 6 }} onClick={async () => {
          await createQuestion(round.id, defaultModeFor(round.mechanic))
          onChanged()
          setOpenQIdx(round.questions.length)
        }}>+ Добавить вопрос</button>}
        </div>
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
          style={{ marginLeft: 6 }}>Сохранить правила</button>}
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
        }}>Зафиксировать</button>}
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
function JeopardyEditor({ pack, round, locked, onChanged }: {
  pack: LoadedPack; round: LoadedRound; locked: boolean; onChanged: () => void
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
      <b>Темы × плитки.</b> Механика раунда: таймера нет, ведущий открывает плитку,
      играет трек, ответ показывается сразу по кнопке, баллы = цена плитки.
      Аудио загружай кнопкой в строке плитки — файл уходит в Storage (не в Codespace).
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
                  <td><MediaSlot label="" packId={pack.id} accept="audio/*" max={1}
                    paths={tile.audio ? [tile.audio] : []}
                    onChange={paths => upd(ts => ts.map((x, xi) => xi === ti ? {
                      ...x, tiles: x.tiles.map((tl, tli) => tli === i ? { ...tl, audio: paths[0] ?? '' } : tl),
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
        {dirty && <button style={{ marginLeft: 6 }}
          onClick={async () => {
            await updateRound(round.id, { settings: { themes } })
            setDirty(false); onChanged()
          }}>Сохранить темы</button>}
      </>}
    </div>
  )
}
