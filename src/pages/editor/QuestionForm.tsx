import { useEffect, useState } from 'react'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import { updateQuestion } from '../../lib/editorApi'
import { uploadMedia } from '../../lib/mediaUpload'
import { rebusExpected } from '../../lib/answerCheck'
import { mediaUrl } from '../HostScreen'
import type { AnswerSpec, ChoiceOption, Question } from '../../types/quiz'

// ═══ Форма вопроса: контент · ответ · превью ═══
// Автосохранение при каждом изменении (с дебаунсом через кнопку «Сохранить» + on-blur).

const MODE_NAMES: Record<AnswerSpec['mode'], string> = {
  free_text: 'Свободный текст',
  choice: 'Варианты А-Г',
  order: 'Порядок',
  match: 'Сопоставление',
  crossword_word: 'Слово кроссворда',
  none: 'Без автопроверки',
}

export function QuestionForm({ pack, round, qIdx, onBack, onChanged }: {
  pack: LoadedPack; round: LoadedRound; qIdx: number
  onBack: () => void; onChanged: () => void
}) {
  const original = round.questions[qIdx]
  const [q, setQ] = useState<Question>(original)
  const [saving, setSaving] = useState(false)

  useEffect(() => setQ(original), [original])

  // Локальный буфер: НИЧЕГО не уходит в БД до кнопки «Сохранить».
  // Исключение: загрузка медиа-файлов сохраняется сразу (файл уже в Storage).
  const save = (patch: Partial<Question>) => setQ(prev => ({ ...prev, ...patch }))
  const persistAll = async (close: boolean) => {
    setSaving(true)
    try {
      const { id: _id, round_id: _r, position: _p, ...fields } = q
      await updateQuestion(q.id, fields)
      onChanged()
      if (close) onBack()
    } finally { setSaving(false) }
  }

  const setAnswer = (answer: AnswerSpec) => save({ answer })
  const media = q.media

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Вопрос {qIdx + 1}</h3>
        <div style={{ display: 'flex', gap: 6 }}>
          <button disabled={saving} style={{ background: '#dcfce7' }}
            onClick={() => void persistAll(true)}>💾 Сохранить и закрыть</button>
          <button disabled={saving} onClick={() => void persistAll(false)}>Сохранить</button>
          <button onClick={onBack}>✕ Закрыть без сохранения</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* ── Контент ── */}
        <div>
          <label><b>Текст вопроса</b></label>
          <textarea value={q.question_text} rows={5} style={{ width: '100%', padding: 8 }}
            onChange={e => save({ question_text: e.target.value })} />

          <MediaSlot label="Медиа вопроса (до 4)" packId={pack.id}
            paths={media.question ?? []} max={4}
            onChange={paths => save({ media: { ...media, question: paths } })} />
          {(media.question ?? []).some(m => /\.(mp4|webm)$/i.test(m)) && (
            <label style={{ display: 'block' }}>
              <input type="checkbox" checked={!!media.hidden}
                onChange={e => save({ media: { ...media, hidden: e.target.checked } })} />
              {' '}видео скрыто — только звук
            </label>
          )}
          <MediaSlot label="Озвучка вопроса (mp3)" packId={pack.id}
            paths={media.voice ? [media.voice] : []} max={1} accept="audio/*"
            onChange={paths => save({ media: { ...media, voice: paths[0] ?? null } })} />
          <MediaSlot label="Медиа ответа" packId={pack.id}
            paths={media.answer ?? []} max={4}
            onChange={paths => save({ media: { ...media, answer: paths } })} />

          <label><b>Пояснение к ответу</b> (answer_note)</label>
          <input value={q.answer_note ?? ''} style={{ width: '100%', padding: 6 }}
            onChange={e => save({ answer_note: e.target.value || null })} />

          {round.mechanic === 'rebus' && <RebusService q={q} onSave={save} />}
          {round.mechanic === 'thematic_x2' && (
            <label style={{ display: 'block', marginTop: 8 }}>
              <input type="checkbox" checked={q.is_final_question}
                onChange={e => save({ is_final_question: e.target.checked })} />
              {' '}это финальный вопрос-тема (×2)
            </label>
          )}
        </div>

        {/* ── Ответ ── */}
        <div>
          <label><b>Тип ответа</b>{' '}
            <select value={q.answer.mode}
              onChange={e => setAnswer(defaultAnswer(e.target.value as AnswerSpec['mode']))}>
              {(Object.keys(MODE_NAMES) as AnswerSpec['mode'][]).map(m =>
                <option key={m} value={m}>{MODE_NAMES[m]}</option>)}
            </select>
          </label>
          <AnswerEditor spec={q.answer} onChange={setAnswer} />

          <Preview q={q} />

        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        Статус:{' '}
        <button onClick={() => save({ status: q.status === 'ready' ? 'draft' : 'ready' })}
          style={{ background: q.status === 'ready' ? '#dcfce7' : '#fef9c3' }}>
          {q.status === 'ready' ? '✅ Готов (нажми, чтобы вернуть в черновик)' : '🟡 Черновик (нажми, чтобы отметить готовым)'}
        </button>
        <span style={{ opacity: .5 }}> — полная валидация запускается на пакете кнопкой «Проверить готовность»</span>
      </div>
    </div>
  )
}

function defaultAnswer(mode: AnswerSpec['mode']): AnswerSpec {
  const abcd: ChoiceOption[] = ['А', 'Б', 'В', 'Г'].map(k => ({ key: k, text: '' }))
  switch (mode) {
    case 'free_text': return { mode, correct: '', display: '' }
    case 'choice': return { mode, choices: abcd, correct_choice: '', display: '' }
    case 'order': return { mode, choices: abcd, correct_order: '', display: [] }
    case 'match': return { mode, left: ['1', '2', '3', '4'], right: ['А', 'Б', 'В', 'Г'], correct_pairs: [], display: '' }
    case 'crossword_word': return { mode, word: '' }
    case 'none': return { mode, display: '' }
  }
}

// ── Редакторы по типам ──
function AnswerEditor({ spec, onChange }: { spec: AnswerSpec; onChange: (a: AnswerSpec) => void }) {
  switch (spec.mode) {
    case 'free_text': return (
      <div>
        <label>Правильный ответ <span style={{ opacity: .5 }}>(доп. принимаемые варианты — через « / », на экране покажется первый)</span></label>
        <input value={spec.correct} style={{ width: '100%', padding: 6 }}
          onChange={e => onChange({ ...spec, correct: e.target.value, display: e.target.value.split('/')[0].trim() })} />
      </div>
    )
    case 'choice': return (
      <div>
        {spec.choices.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 4, alignItems: 'center' }}>
            <input type="radio" name="correct" checked={spec.correct_choice === c.key}
              title="верный вариант"
              onChange={() => onChange({ ...spec, correct_choice: c.key, display: `${c.key} — ${c.text}` })} />
            <b>{c.key}</b>
            <input value={c.text} style={{ flex: 1, padding: 4 }}
              onChange={e => onChange({
                ...spec,
                choices: spec.choices.map((x, xi) => xi === i ? { ...x, text: e.target.value } : x),
              })} />
            <button onClick={() => onChange({
              ...spec, choices: spec.choices.filter((_, xi) => xi !== i),
            })}>✕</button>
          </div>
        ))}
        <button onClick={() => {
          const key = String.fromCharCode('А'.charCodeAt(0) + spec.choices.length)
          onChange({ ...spec, choices: [...spec.choices, { key, text: '' }] })
        }}>+ вариант</button>
        {!spec.correct_choice && <div style={{ color: '#f43f5e' }}>⚠ отметь верный вариант радиокнопкой</div>}
      </div>
    )
    case 'order': return (
      <div>
        {spec.choices.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
            <b>{c.key}</b>
            <input value={c.text} style={{ flex: 1, padding: 4 }}
              onChange={e => onChange({
                ...spec,
                choices: spec.choices.map((x, xi) => xi === i ? { ...x, text: e.target.value } : x),
              })} />
          </div>
        ))}
        <label>Правильный порядок — тапай по буквам:</label>
        <div>
          {spec.choices.map(c => (
            <button key={c.key} disabled={spec.correct_order.includes(c.key)}
              onClick={() => onChange({ ...spec, correct_order: spec.correct_order + c.key })}
              style={{ margin: 2, padding: '6px 12px' }}>{c.key}</button>
          ))}
          <button onClick={() => onChange({ ...spec, correct_order: '' })}>сброс</button>
        </div>
        <div>Порядок: <b>{spec.correct_order || '—'}</b></div>
      </div>
    )
    case 'match': return (
      <MatchEditor spec={spec} onChange={onChange} />
    )
    case 'crossword_word': return (
      <div>
        <label>Слово (ответ в сетке)</label>
        <input value={spec.word} style={{ width: '100%', padding: 6 }}
          onChange={e => onChange({ ...spec, word: e.target.value })} />
        <div style={{ opacity: .6, fontSize: 13 }}>Определение — это текст вопроса слева.</div>
      </div>
    )
    case 'none': return (
      <div>
        <label>Как показать ответ на проекторе</label>
        <input value={spec.display} style={{ width: '100%', padding: 6 }}
          onChange={e => onChange({ ...spec, display: e.target.value })} />
      </div>
    )
  }
}

function MatchEditor({ spec, onChange }: {
  spec: Extract<AnswerSpec, { mode: 'match' }>; onChange: (a: AnswerSpec) => void
}) {
  const [selLeft, setSelLeft] = useState<string | null>(null)
  const pairOf = (l: string) => spec.correct_pairs.find(p => p.startsWith(l))?.slice(l.length)
  return (
    <div>
      <div style={{ opacity: .6, fontSize: 13 }}>
        Связи: тапни слева (1), потом справа (Б) — пара «1Б» соберётся сама.
        Левые = номера медиа/треков, правые = буквы вариантов из текста вопроса.
      </div>
      <div style={{ display: 'flex', gap: 24, marginTop: 6 }}>
        <div>{spec.left.map(l => (
          <button key={l} onClick={() => setSelLeft(l)} style={{
            display: 'block', margin: 3, padding: 8, minWidth: 56,
            background: selLeft === l ? '#eab308' : pairOf(l) ? '#dcfce7' : undefined,
          }}>{l}{pairOf(l) ? `–${pairOf(l)}` : ''}</button>
        ))}</div>
        <div>{spec.right.map(r => (
          <button key={r} disabled={!selLeft} onClick={() => {
            if (!selLeft) return
            const cleaned = spec.correct_pairs.filter(p => !p.startsWith(selLeft) && !p.endsWith(r))
            onChange({ ...spec, correct_pairs: [...cleaned, `${selLeft}${r}`] })
            setSelLeft(null)
          }} style={{ display: 'block', margin: 3, padding: 8, minWidth: 56 }}>{r}</button>
        ))}</div>
      </div>
      <button onClick={() => onChange({ ...spec, correct_pairs: [] })}>сброс пар</button>
      <div>Пары: <b>{spec.correct_pairs.join(', ') || '—'}</b></div>
    </div>
  )
}

function RebusService({ q, onSave }: { q: Question; onSave: (p: Partial<Question>) => void }) {
  const w1 = q.service.word1 ?? '', w2 = q.service.word2 ?? ''
  const correct = q.answer.mode === 'free_text' ? q.answer.correct.split('/')[0].trim() : ''
  const expected = w1 && w2 ? rebusExpected(w1, w2) : ''
  const ok = expected && correct &&
    expected === correct.toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]/g, '')
  return (
    <div style={{ marginTop: 8, padding: 8, border: '1px dashed #999', borderRadius: 6 }}>
      <b>Ребус (служебное):</b>
      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
        <input placeholder="слово картинки 1" value={w1} style={{ padding: 4 }}
          onChange={e => onSave({ service: { ...q.service, word1: e.target.value } })} />
        <input placeholder="слово картинки 2" value={w2} style={{ padding: 4 }}
          onChange={e => onSave({ service: { ...q.service, word2: e.target.value } })} />
      </div>
      {expected && (
        <div style={{ color: ok ? '#16a34a' : '#f43f5e', marginTop: 4 }}>
          {w1} + {w2} → <b>{expected.toUpperCase()}</b>{' '}
          {correct ? (ok ? '✅ сходится с ответом' : `⚠ не сходится: в ответе «${correct}»`) : '(заполни ответ)'}
        </div>
      )}
    </div>
  )
}

// ── Слот медиа ──
export function MediaSlot({ label, packId, paths, max, accept, onChange }: {
  label: string; packId: string; paths: string[]; max: number
  accept?: string; onChange: (paths: string[]) => void
}) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  return (
    <div style={{ margin: '8px 0' }}>
      <label><b>{label}</b></label>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        {paths.map((p, i) => (
          <span key={i} style={{ fontSize: 12, background: '#f3f4f6', padding: '2px 6px', borderRadius: 6 }}>
            {/\.(mp3|wav)$/i.test(p) ? '🎵' : /\.(mp4|webm)$/i.test(p) ? '🎬'
              : <img src={mediaUrl(p)} alt="" style={{ height: 36, verticalAlign: 'middle' }} />}
            {' '}{p.split('/').pop()}
            <button onClick={() => onChange(paths.filter((_, j) => j !== i))}>✕</button>
          </span>
        ))}
        {paths.length < max && (
          <input type="file" accept={accept} disabled={busy} multiple={max > 1}
            onChange={async e => {
              const files = Array.from(e.target.files ?? []).slice(0, max - paths.length)
              if (files.length === 0) return
              setBusy(true); setErr('')
              try {
                const uploaded: string[] = []
                for (const f of files) uploaded.push(await uploadMedia(packId, f))
                onChange([...paths, ...uploaded])
              }
              catch (ex) { setErr(ex instanceof Error ? ex.message : 'ошибка загрузки') }
              finally { setBusy(false); e.target.value = '' }
            }} />
        )}
        {busy && 'загружаю…'}
      </div>
      {err && <div style={{ color: '#f43f5e', fontSize: 12 }}>{err}</div>}
    </div>
  )
}



// ── Превью: проектор и телефон (ровно как в игре) ──
function Preview({ q }: { q: Question }) {
  const [tab, setTab] = useState<'host' | 'player'>('host')
  const a = q.answer
  const imgs = (q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', gap: 4 }}>
        <button onClick={() => setTab('host')}
          style={{ fontWeight: tab === 'host' ? 700 : 400 }}>📺 Проектор</button>
        <button onClick={() => setTab('player')}
          style={{ fontWeight: tab === 'player' ? 700 : 400 }}>📱 Телефон игрока</button>
      </div>
      {tab === 'host' ? (
        <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12,
          background: '#111', color: '#fff' }}>
          <div style={{ fontSize: 16, whiteSpace: 'pre-wrap' }}>
            {q.question_text || '(текст вопроса)'}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {imgs.map((m, i) =>
              <img key={i} src={mediaUrl(m)} alt="" style={{ maxHeight: 90, borderRadius: 4 }} />)}
          </div>
          {a.mode === 'choice' && (
            <div style={{ marginTop: 8 }}>
              {a.choices.map(c => <div key={c.key}>{c.key} — {c.text || '…'}</div>)}
            </div>
          )}
        </div>
      ) : (
        <div style={{ maxWidth: 280, border: '1px solid #ddd', borderRadius: 14, padding: 10, background: '#fff' }}>
          <p style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{q.question_text || '(текст вопроса)'}</p>
          {a.mode === 'free_text' || a.mode === 'none' ? (
            <div style={{ display: 'flex', gap: 4 }}>
              <input placeholder="Ваш ответ" readOnly style={{ flex: 1, padding: 6 }} />
              <button disabled>Отправить</button>
            </div>
          ) : a.mode === 'choice' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {a.choices.map(c => <button key={c.key} disabled style={{ padding: 10 }}>{c.key}</button>)}
            </div>
          ) : a.mode === 'order' ? (
            <div>
              <div style={{ border: '1px dashed #999', padding: 6, fontSize: 12 }}>Тапайте варианты по порядку</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                {a.choices.map(c => <button key={c.key} disabled>{c.key}</button>)}
              </div>
            </div>
          ) : a.mode === 'match' ? (
            <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
              <div>{a.left.map(l => <button key={l} disabled style={{ display: 'block', margin: 2 }}>{l}</button>)}</div>
              <div>{a.right.map(r => <button key={r} disabled style={{ display: 'block', margin: 2 }}>{r}</button>)}</div>
            </div>
          ) : (
            <div style={{ fontSize: 12, opacity: .6 }}>[сетка кроссворда — экран этапа 5]</div>
          )}
        </div>
      )}
    </div>
  )
}
