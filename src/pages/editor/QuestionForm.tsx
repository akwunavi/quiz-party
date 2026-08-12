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
  const [savedAt, setSavedAt] = useState<number | null>(null)

  useEffect(() => setQ(original), [original])

  const save = async (patch: Partial<Question>) => {
    const next = { ...q, ...patch }
    setQ(next)
    setSaving(true)
    try {
      await updateQuestion(q.id, patch)
      setSavedAt(Date.now())
    } finally { setSaving(false) }
  }

  const setAnswer = (answer: AnswerSpec) => void save({ answer })
  const media = q.media

  return (
    <div>
      <p><button onClick={() => { onBack(); onChanged() }}>← Раунд</button>{' '}
        <span style={{ opacity: .5 }}>
          {saving ? 'сохраняю…' : savedAt ? 'сохранено ✓' : ''}
        </span></p>
      <h3>Вопрос {qIdx + 1}</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* ── Контент ── */}
        <div>
          <label><b>Текст вопроса</b></label>
          <textarea value={q.question_text} rows={5} style={{ width: '100%', padding: 8 }}
            onChange={e => setQ({ ...q, question_text: e.target.value })}
            onBlur={() => void save({ question_text: q.question_text })} />

          <MediaSlot label="Медиа вопроса (до 4)" packId={pack.id}
            paths={media.question ?? []} max={4}
            onChange={paths => void save({ media: { ...media, question: paths } })} />
          {(media.question ?? []).some(m => /\.(mp4|webm)$/i.test(m)) && (
            <label style={{ display: 'block' }}>
              <input type="checkbox" checked={!!media.hidden}
                onChange={e => void save({ media: { ...media, hidden: e.target.checked } })} />
              {' '}видео скрыто — только звук
            </label>
          )}
          <MediaSlot label="Озвучка вопроса (mp3)" packId={pack.id}
            paths={media.voice ? [media.voice] : []} max={1} accept="audio/*"
            onChange={paths => void save({ media: { ...media, voice: paths[0] ?? null } })} />
          <MediaSlot label="Медиа ответа" packId={pack.id}
            paths={media.answer ?? []} max={4}
            onChange={paths => void save({ media: { ...media, answer: paths } })} />

          <label><b>Пояснение к ответу</b> (answer_note)</label>
          <input value={q.answer_note ?? ''} style={{ width: '100%', padding: 6 }}
            onChange={e => setQ({ ...q, answer_note: e.target.value })}
            onBlur={() => void save({ answer_note: q.answer_note || null })} />

          {round.mechanic === 'rebus' && <RebusService q={q} onSave={save} />}
          {round.mechanic === 'thematic_x2' && (
            <label style={{ display: 'block', marginTop: 8 }}>
              <input type="checkbox" checked={q.is_final_question}
                onChange={e => void save({ is_final_question: e.target.checked })} />
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

          {/* ── Превью ── */}
          <div style={{ marginTop: 16, padding: 10, background: '#f9fafb', borderRadius: 8 }}>
            <b>Превью (игрок):</b>
            <PlayerPreview q={q} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        Статус:{' '}
        <button onClick={() => void save({ status: q.status === 'ready' ? 'draft' : 'ready' })}
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
        <label>Правильный ответ <span style={{ opacity: .5 }}>(варианты через « / »)</span></label>
        <input value={spec.correct} style={{ width: '100%', padding: 6 }}
          onChange={e => onChange({ ...spec, correct: e.target.value })} />
        <label>Как показать на проекторе</label>
        <input value={typeof spec.display === 'string' ? spec.display : spec.display.join(' / ')}
          style={{ width: '100%', padding: 6 }}
          onChange={e => onChange({ ...spec, display: e.target.value })} />
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
function MediaSlot({ label, packId, paths, max, accept, onChange }: {
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
          <input type="file" accept={accept} disabled={busy}
            onChange={async e => {
              const f = e.target.files?.[0]
              if (!f) return
              setBusy(true); setErr('')
              try { onChange([...paths, await uploadMedia(packId, f)]) }
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

// ── Превью телефона ──
function PlayerPreview({ q }: { q: Question }) {
  const a = q.answer
  return (
    <div style={{ maxWidth: 300, border: '1px solid #ddd', borderRadius: 12, padding: 10, background: '#fff' }}>
      <p style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{q.question_text || '(текст вопроса)'}</p>
      {(q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m)).map((m, i) =>
        <img key={i} src={mediaUrl(m)} alt="" style={{ maxWidth: '100%', borderRadius: 6 }} />)}
      {a.mode === 'choice' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {a.choices.map(c => <button key={c.key}>{c.key}</button>)}
        </div>
      )}
      {a.mode === 'free_text' && <input placeholder="Ваш ответ" style={{ width: '100%' }} readOnly />}
      {a.mode === 'order' && <div style={{ fontSize: 12, opacity: .6 }}>[порядок тапами: {a.choices.map(c => c.key).join(' ')}]</div>}
      {a.mode === 'match' && <div style={{ fontSize: 12, opacity: .6 }}>[сопоставление {a.left.join(',')} ↔ {a.right.join(',')}]</div>}
    </div>
  )
}
