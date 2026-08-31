import { useEffect, useState } from 'react'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import { updateQuestion } from '../../lib/editorApi'
import { uploadMedia } from '../../lib/mediaUpload'
import { rebusExpected } from '../../lib/answerCheck'
import { mediaUrl } from '../../lib/media'
import { questionFields } from '../../lib/questionFields'
import type { AnswerSpec, ChoiceOption, Question } from '../../types/quiz'
import { AiQuestionReview } from './AiReview'

// ═══ Форма вопроса: контент · ответ · превью ═══
// Автосохранение при каждом изменении (с дебаунсом через кнопку «Сохранить» + on-blur).

const MODE_NAMES: Record<AnswerSpec['mode'], string> = {
  free_text: 'Текстовый вопрос',
  choice: 'Вопрос с вариантами',
  order: 'Порядок',
  match: 'Сопоставление',
  crossword_word: 'Кроссворд',
  none: 'Ручная проверка',
}

const MODE_HINTS: Record<AnswerSpec['mode'], string> = {
  free_text: 'Игрок пишет ответ словом. Можно указать несколько принимаемых вариантов через « / » — проверка автоматическая, с допуском на опечатки.',
  choice: 'Игрок жмёт букву А–Г. Варианты могут быть текстом или картинками (тогда тексты оставь пустыми — буква = картинка по порядку).',
  order: 'Игрок расставляет варианты в правильной последовательности тапами.',
  match: 'Игрок соединяет номера (картинки/треки на экране) с буквами вариантов.',
  crossword_word: 'Слово вписывается в общую сетку кроссворда. Текст вопроса = определение.',
  none: 'Автопроверки нет: ответ показывается на экране, а верность каждой команды ты отмечаешь вручную в админке. Для вопросов, где ответ нельзя сверить машинально.',
}

export function QuestionForm({ pack, round, qIdx, onBack, onChanged, onPreview }: {
  pack: LoadedPack; round: LoadedRound; qIdx: number
  onBack: () => void; onChanged: () => void; onPreview?: () => void
}) {
  const original = round.questions[qIdx]
  const [q, setQ] = useState<Question>(original)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => setQ(original), [original])

  // Локальный буфер: НИЧЕГО не уходит в БД до кнопки «Сохранить».
  // Исключение: загрузка медиа-файлов сохраняется сразу (файл уже в Storage).
  const save = (patch: Partial<Question>) => setQ(prev => ({ ...prev, ...patch }))
  const persistAll = async (close: boolean) => {
    setSaving(true)
    try {
      const errs = questionErrors(q)
      const status = errs.length === 0 ? 'ready' as const : 'draft' as const
      const { id: _id, round_id: _r, position: _p, ...fields } = { ...q, status }
      await updateQuestion(q.id, fields)
      setErrors(errs)
      onChanged()
      if (close && errs.length === 0) onBack()   // с ошибками остаёмся: видно, что дозаполнить
    } finally { setSaving(false) }
  }

  const setAnswer = (answer: AnswerSpec) => save({ answer })
  const media = q.media

  // ── Какие поля показывать для этой механики ──
  // Правило: если поле в механике не работает, его не должно быть на экране.
  // Иначе редактор заполняет его и удивляется, что на игре ничего не изменилось.
  const mech = round.mechanic
  const { fixedMode, questionMedia, voice: showVoice,
          mediaLabel, mediaMax, mediaAccept } = questionFields(mech)

  return (
    <div>
      <div className="qm-head">
        <div>
          <div className="ed-h">Вопрос {qIdx + 1}</div>
          <div className="ed-sub">{round.title_lines.join(' ')}</div>
        </div>
        {onPreview && <button className="ico" data-tip="Предпросмотр на весь экран"
          onClick={onPreview}>👁‍🗨</button>}
      </div>
      {errors.length > 0 && (
        <div className="qm-alert">Не заполнено: {errors.join('; ')} — сохранено как черновик.</div>
      )}

      <div className="qm-body">
        {/* ── Контент ── */}
        <div>
          {/* Что показывать — зависит от механики. Поля, которые в ней
              не работают, скрыты: они путают и создают иллюзию настройки. */}
          <div className="ed-field"><label>Текст вопроса</label>
          <textarea value={q.question_text} rows={5} style={{ width: '100%', padding: 8 }}
            onChange={e => save({ question_text: e.target.value })} /></div>

          {questionMedia && (
            <MediaSlot label={mediaLabel} packId={pack.id}
              paths={media.question ?? []} max={mediaMax} accept={mediaAccept}
              onChange={paths => save({ media: { ...media, question: paths } })} />
          )}
          {(media.question ?? []).some(m => /\.(mp4|webm|mp3|wav)$/i.test(m)) && (
            <label className="ed-check" style={{ display: 'block', margin: '4px 0' }}>
              <input type="checkbox" checked={!!media.hidden}
                onChange={e => save({ media: { ...media, hidden: e.target.checked } })} />
              {' '}не показывать видео/обложку на экране — только звук
            </label>
          )}
          {(media.question ?? []).some(m => !/\.(mp4|webm|mp3|wav)$/i.test(m)) && (
            <MediaScale value={media.scale}
              onChange={scale => save({ media: { ...media, scale } })} />
          )}
          {showVoice && <MediaSlot label="Озвучка вопроса (mp3)" packId={pack.id}
            paths={media.voice ? [media.voice] : []} max={1} accept="audio/*"
            onChange={paths => save({ media: { ...media, voice: paths[0] ?? null } })} />}
          <MediaSlot label="Медиа ответа" packId={pack.id}
            paths={media.answer ?? []} max={4}
            onChange={paths => save({ media: { ...media, answer: paths } })} />

          <div className="ed-field"><label>Пояснение к ответу</label>
          <input value={q.answer_note ?? ''} style={{ width: '100%', padding: 6 }}
            onChange={e => save({ answer_note: e.target.value || null })} />
            <div className="ed-hint">Короткий комментарий: почему такой ответ. Показывается на экране под ответом</div></div>

          {round.mechanic === 'rebus' && <RebusService q={q} onSave={save} />}
          {round.mechanic === 'thematic_x2' && (
            <label className="ed-check" style={{ display: 'block', marginTop: 8 }}>
              <input type="checkbox" checked={q.is_final_question}
                onChange={e => save({ is_final_question: e.target.checked })} />
              {' '}это финальный вопрос-тема (×2)
            </label>
          )}
        </div>

        {/* ── Ответ ── */}
        <div>
          {/* у кроссворда и мелодии тип ответа задан механикой — выбор убран */}
          <div className="ed-field" style={{ marginBottom: 18, display: fixedMode ? 'none' : undefined }}>
            <label>Тип вопроса</label>
            <select value={q.answer.mode}
              onChange={e => setAnswer(defaultAnswer(e.target.value as AnswerSpec['mode']))}>
              {(Object.keys(MODE_NAMES) as AnswerSpec['mode'][]).map(m =>
                <option key={m} value={m}>{MODE_NAMES[m]}</option>)}
            </select>
            <div className="ed-hint">{MODE_HINTS[q.answer.mode]}</div>
          </div>
          <AnswerEditor spec={q.answer} onChange={setAnswer}
            imgs={(media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))} />


        </div>
      </div>
      <AiQuestionReview q={q} timerSeconds={round.timer_seconds} />
      <div className="qm-foot">
        <button onClick={onBack}>Закрыть без сохранения</button>
        <button className="save" disabled={saving} onClick={() => void persistAll(true)}>Сохранить</button>
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
function AnswerEditor({ spec, onChange, imgs }: {
  spec: AnswerSpec; onChange: (a: AnswerSpec) => void; imgs: string[]
}) {
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
        <div style={{ opacity: .6, fontSize: 13, marginBottom: 4 }}>
          Если варианты — картинки: тексты оставь пустыми, буква = картинка по порядку (А — первая…).
        </div>
        {spec.choices.map((c, i) => {
          const thumb = imgs.length === spec.choices.length ? imgs[i] : null
          const isCorrect = spec.correct_choice === c.key
          return (
            <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 4, alignItems: 'center' }}>
              <b style={{ width: 18 }}>{c.key}</b>
              {thumb && <img src={mediaUrl(thumb)} alt="" style={{ height: 28, borderRadius: 4 }} />}
              <input value={c.text} placeholder={thumb ? '(картинка)' : 'текст варианта'}
                style={{ flex: 1, padding: 4 }}
                onChange={e => onChange({
                  ...spec,
                  choices: spec.choices.map((x, xi) => xi === i ? { ...x, text: e.target.value } : x),
                })} />
              <button onClick={() => onChange({ ...spec, correct_choice: c.key, display: `${c.key}${c.text ? ' — ' + c.text : ''}` })}
                style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: isCorrect ? '#16a34a' : '#f3f4f6',
                  color: isCorrect ? '#fff' : '#111', fontWeight: isCorrect ? 700 : 400,
                }}>{isCorrect ? '✓ верный' : 'верный?'}</button>
              <button onClick={() => onChange({
                ...spec, choices: spec.choices.filter((_, xi) => xi !== i),
              })}>✕</button>
            </div>
          )
        })}
        <button onClick={() => {
          const key = String.fromCharCode('А'.charCodeAt(0) + spec.choices.length)
          onChange({ ...spec, choices: [...spec.choices, { key, text: '' }] })
        }}>+ вариант</button>
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
      <MatchEditor spec={spec} onChange={onChange} imgs={imgs} />
    )
    case 'crossword_word': return (
      <div>
        <label>Слово (ответ в сетке)</label>
        <input value={spec.word} style={{ width: '100%', padding: 6 }}
          onChange={e => onChange({ ...spec, word: e.target.value })}
          onBlur={e => onChange({ ...spec,
            word: e.target.value.trim().replace(/[\s-]+/g, '') })} />
        <div className="ed-hint">Определение — это текст вопроса слева.
          Пробелы и дефисы убираются автоматически: «Куала-Лумпур» → «КУАЛАЛУМПУР».</div>
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

function MatchEditor({ spec, onChange, imgs }: {
  spec: Extract<AnswerSpec, { mode: 'match' }>; onChange: (a: AnswerSpec) => void; imgs: string[]
}) {
  const [selLeft, setSelLeft] = useState<string | null>(null)
  const pairOf = (l: string) => spec.correct_pairs.find(p => p.startsWith(l))?.slice(l.length)
  return (
    <div>
      <div style={{ opacity: .6, fontSize: 13 }}>
        Связи: тапни слева (1), потом справа (Б) — пара «1Б» соберётся сама.
        Левые = номера медиа/треков, правые = буквы вариантов из текста вопроса.
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ opacity: .7, fontSize: 13, marginBottom: 4 }}>
          Подписи вариантов (показываются на экране вопроса, по одному на строку):
        </div>
        {spec.right.map((r, i) => (
          <div key={r} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
            <b style={{ width: 20 }}>{r}</b>
            <input style={{ flex: 1, padding: 4 }}
              value={(spec.right_labels ?? [])[i] ?? ''}
              placeholder="текст варианта"
              onChange={e => {
                const labels = [...(spec.right_labels ?? spec.right.map(() => ''))]
                labels[i] = e.target.value
                onChange({ ...spec, right_labels: labels })
              }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 24, marginTop: 6 }}>
        <div>{spec.left.map((l, i) => (
          <button key={l} onClick={() => setSelLeft(l)} style={{
            display: 'flex', alignItems: 'center', gap: 6, margin: 3, padding: 8, minWidth: 56,
            background: selLeft === l ? '#eab308' : pairOf(l) ? '#dcfce7' : undefined,
          }}>
            {imgs[i] && <img src={mediaUrl(imgs[i])} alt="" style={{ height: 24, borderRadius: 3 }} />}
            {l}{pairOf(l) ? `–${pairOf(l)}` : ''}
          </button>
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
    <div style={{ marginTop: 8, padding: 8, border: '1px dashed #3a4a6b', borderRadius: 6 }}>
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
  // Телефонный «проводник» игнорирует accept и даёт выбрать что угодно.
  // Поэтому проверяем расширение сами: молча принять видео вместо аудио —
  // значит получить тишину на игре и разбираться уже при гостях.
  const KIND: Record<string, { ext: RegExp; what: string }> = {
    'audio/*': { ext: /\.(mp3|wav|m4a|aac|ogg|opus|flac)$/i, what: 'аудио' },
    'image/*': { ext: /\.(png|jpe?g|webp|gif|avif)$/i, what: 'картинка' },
  }
  const [badFile, setBadFile] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  return (
    <div className="media-slot" style={{ margin: '8px 0' }}>
      <label><b>{label}</b></label>
      <div className="media-slot-row" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        {paths.map((p, i) => (
          <span key={i} className="media-chip" style={{ fontSize: 12, background: 'var(--panel2)', padding: '2px 6px', borderRadius: 6 }}>
            {/\.(mp3|wav)$/i.test(p) ? '🎵' : /\.(mp4|webm)$/i.test(p) ? '🎬'
              : <img src={mediaUrl(p)} alt="" style={{ height: 36, verticalAlign: 'middle' }} />}
            {' '}<span className="media-name" title={p.split('/').pop()}>{p.split('/').pop()}</span>
            <button className="media-del" title="Убрать из вопроса"
              onClick={() => {
                onChange(paths.filter((_, j) => j !== i))
                // Файл остаётся в хранилище: Supabase не отслеживает ссылки.
                // Предупреждаем сразу, иначе место утекает незаметно.
                setBadFile('Файл убран из вопроса, но остался в хранилище. '
                  + 'Освободить место: «Проверить мусор» в шапке пакета.')
              }}>✕</button>
          </span>
        ))}
        {paths.length < max && (
          <input type="file" accept={accept} disabled={busy} multiple={max > 1}
            onChange={async e => {
              const picked = Array.from(e.target.files ?? []).slice(0, max - paths.length)
              if (picked.length === 0) return
              // отсеиваем файлы не того типа: аудио-слот не должен принять видео
              const rule = KIND[accept ?? '']
              const files = rule ? picked.filter(f => rule.ext.test(f.name)) : picked
              const rejected = picked.filter(f => !files.includes(f))
              setBadFile(rejected.length
                ? `Не подходит: ${rejected.map(f => f.name).join(', ')} — нужен ${rule.what}`
                : null)
              if (files.length === 0) { e.target.value = ''; return }
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
      {paths.length < max && <MediaLink onAdd={u => onChange([...paths, u])} />}
      {err && <div style={{ color: '#f43f5e', fontSize: 12 }}>{err}</div>}
      {badFile && <div className="media-bad">{badFile}</div>}
    </div>
  )
}

/** Вставка ГОТОВОЙ ссылки вместо загрузки файла.
 *
 *  Нужна для медиа, которое лежит не в Supabase, а в самом репозитории:
 *  файлы из папки public/ раздаются GitHub Pages по обычному адресу и
 *  места в хранилище не занимают. Раньше вписать такой адрес было некуда —
 *  в слоте была только кнопка выбора файла с компьютера.
 *
 *  mediaUrl пропускает абсолютные ссылки без изменений, поэтому дальше по
 *  коду ничего менять не пришлось. */
function MediaLink({ onAdd }: { onAdd: (url: string) => void }) {
  const [open, setOpen] = useState(false)
  const [val, setVal] = useState('')
  const ok = /^https?:\/\/\S+$/.test(val.trim())
  if (!open) {
    return (
      <button className="ghost media-link-toggle" style={{ fontSize: 12, padding: '2px 8px' }}
        onClick={() => setOpen(true)}>+ вставить ссылку</button>
    )
  }
  return (
    <div className="media-link" style={{ display: 'flex', gap: 6, marginTop: 6 }}>
      <input value={val} placeholder="https://akwunavi.github.io/quiz-party/main.mp3"
        style={{ flex: '1 1 auto', minWidth: 0, fontSize: 12 }}
        onChange={e => setVal(e.target.value)} />
      <button disabled={!ok} onClick={() => { onAdd(val.trim()); setVal(''); setOpen(false) }}>
        Добавить
      </button>
      <button className="ghost" onClick={() => { setVal(''); setOpen(false) }}>✕</button>
    </div>
  )
}





/** Быстрая проверка перед сохранением: что не заполнено. */
function questionErrors(q: Question): string[] {
  const errs: string[] = []
  const a = q.answer
  const hasMedia = (q.media.question ?? []).length > 0
  if (!q.question_text.trim() && !hasMedia) errs.push('текст вопроса (или медиа)')
  switch (a.mode) {
    case 'free_text': if (!a.correct.trim()) errs.push('правильный ответ'); break
    case 'choice':
      if (a.choices.length < 2) errs.push('минимум 2 варианта')
      if (!a.correct_choice) errs.push('верный вариант')
      break
    case 'order': if (a.correct_order.length !== a.choices.length) errs.push('полный правильный порядок'); break
    case 'match': if (a.correct_pairs.length !== a.left.length) errs.push('все пары сопоставления'); break
    case 'crossword_word': if (!a.word.trim()) errs.push('слово кроссворда'); break
    case 'none': if (!a.display.trim()) errs.push('текст правильного ответа'); break
  }
  return errs
}

/** Размер картинки НА ЭКРАНЕ. Осознанно НЕ трогает файл: пережатие
 *  необратимо и портит качество, а тут задача — как крупно картинка
 *  выводится проектором. Значение живёт в media.scale (проценты) и в любой
 *  момент возвращается к 100. Диапазон ограничен 50…130: за этими краями
 *  картинка либо нечитаема, либо начинает наезжать на текст и кнопки. */
function MediaScale({ value, onChange }: {
  value: number | undefined; onChange: (v: number | undefined) => void
}) {
  const on = value != null && value !== 100
  return (
    <div className="ed-field">
      <label className="ed-check" style={{ display: 'block', margin: '4px 0' }}>
        <input type="checkbox" checked={on}
          onChange={e => onChange(e.target.checked ? 80 : undefined)} />
        {' '}задать размер картинки на экране
      </label>
      {on && (
        <div className="ed-scale">
          <input type="range" min={50} max={100} step={5} value={value ?? 100}
            onChange={e => onChange(Number(e.target.value))} />
          <b>{value}%</b>
          <button type="button" className="ghost" onClick={() => onChange(undefined)}>сброс</button>
        </div>
      )}
      <div className="ed-hint">
        Меняется только вывод на проекторе. Файл остаётся как есть — качество не теряется.
      </div>
    </div>
  )
}
