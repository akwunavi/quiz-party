// ═══ БАНК ВОПРОСОВ ═══
// Банк — пакет со статусом 'bank'. Его раунды играют роль рубрик («кино»,
// «музыка», «про город»), а вопросы КОПИРУЮТСЯ в рабочий пакет: оригинал
// остаётся в банке и переиспользуется на следующих играх.
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { getOrCreateBank, copyQuestionTo, moveQuestionToBank } from '../../lib/editorApi'
import { loadPack, type LoadedPack } from '../../lib/packLoader'
import { answerSnippet } from './RoundScreen'

export function BankPicker({ targetRoundId, onClose, onAdded }: {
  targetRoundId: string
  onClose: () => void
  onAdded: () => void
}) {
  const [bank, setBank] = useState<LoadedPack | null>(null)
  const [err, setErr] = useState('')
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<Set<string>>(new Set())
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let alive = true
    void (async () => {
      try {
        const p = await getOrCreateBank()
        const full = await loadPack(p.id)
        if (alive) setBank(full)
      } catch (e) { if (alive) setErr(e instanceof Error ? e.message : 'не удалось открыть банк') }
    })()
    return () => { alive = false }
  }, [])

  const toggle = (id: string) => setPicked(s => {
    const n = new Set(s)
    if (n.has(id)) n.delete(id); else n.add(id)
    return n
  })

  const add = async () => {
    if (picked.size === 0 || busy) return
    setBusy(true)
    try {
      // порядок сохраняем: копируем по одному, каждый встаёт в конец раунда
      for (const id of picked) await copyQuestionTo(id, targetRoundId)
      onAdded(); onClose()
    } catch (e) { setErr(e instanceof Error ? e.message : 'ошибка копирования') }
    finally { setBusy(false) }
  }

  const q = query.trim().toLowerCase()
  const rubrics = (bank?.rounds ?? []).map(r => ({
    r,
    items: r.questions.filter(x => !x.hidden && (!q
      || x.question_text.toLowerCase().includes(q)
      || (answerSnippet(x) ?? '').toLowerCase().includes(q))),
  })).filter(x => x.items.length > 0)

  const total = (bank?.rounds ?? []).reduce((n, r) => n + r.questions.filter(x => !x.hidden).length, 0)

  return createPortal(
    <div className="cyber qm-backdrop" onClick={onClose}>
      <div className="qm-window" onClick={e => e.stopPropagation()}>
        <div className="qm-head">
          <div>
            <div className="ed-h">Банк вопросов</div>
            <div className="ed-sub">{total > 0 ? `${total} вопросов · выбрано ${picked.size}` : 'банк пуст'}</div>
          </div>
          <button className="ico" data-tip="Закрыть" onClick={onClose}>✕</button>
        </div>

        {err && <div className="qm-alert">{err}</div>}

        <div className="bank-body">
          <input className="bank-search" placeholder="Поиск по тексту и ответу"
            value={query} onChange={e => setQuery(e.target.value)} />

          {!bank && !err && <div className="ed-hint">загружаю…</div>}

          {bank && total === 0 && (
            <div className="ed-hint">
              Банк пока пуст. Открой пакет «{bank.name}» из списка пакетов, заведи
              в нём раунды-рубрики («кино», «музыка», «про город») и складывай туда
              вопросы — отсюда их можно будет брать в любую игру.
            </div>
          )}

          {rubrics.map(({ r, items }) => (
            <div key={r.id} className="bank-rubric">
              <div className="bank-rubric-name">{r.title_lines.join(' ') || 'Без названия'}</div>
              {items.map(x => (
                <label key={x.id} className={`bank-item${picked.has(x.id) ? ' on' : ''}`}>
                  <input type="checkbox" checked={picked.has(x.id)} onChange={() => toggle(x.id)} />
                  <span className="bank-item-main">
                    <span className="bank-item-text">
                      {x.question_text || <i style={{ opacity: .5 }}>(только медиа)</i>}
                    </span>
                    <span className="ed-answer-chip">✓ <span>{answerSnippet(x) || '—'}</span></span>
                  </span>
                </label>
              ))}
            </div>
          ))}

          {bank && total > 0 && rubrics.length === 0 &&
            <div className="ed-hint">Ничего не нашлось по запросу «{query}»</div>}
        </div>

        <div className="qm-foot">
          <button className="ghost" onClick={onClose}>Отмена</button>
          <button className="save" disabled={picked.size === 0 || busy} onClick={() => void add()}>
            {busy ? 'копирую…' : `Добавить в раунд (${picked.size})`}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}


/** Выбор рубрики банка при отправке вопроса. Одним действием: выбрал — перенёс. */
export function BankSend({ questionId, canDelete, onClose, onDone }: {
  questionId: string; canDelete: boolean
  onClose: () => void; onDone: () => void
}) {
  const [bank, setBank] = useState<LoadedPack | null>(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let alive = true
    void (async () => {
      try {
        const p = await getOrCreateBank()
        const full = await loadPack(p.id)
        if (alive) setBank(full)
      } catch (e) { if (alive) setErr(e instanceof Error ? e.message : 'не удалось открыть банк') }
    })()
    return () => { alive = false }
  }, [])

  const send = async (roundId: string) => {
    if (busy) return
    setBusy(true)
    try { await moveQuestionToBank(questionId, roundId, canDelete); onDone(); onClose() }
    catch (e) { setErr(e instanceof Error ? e.message : 'не удалось перенести'); setBusy(false) }
  }

  return createPortal(
    <div className="cyber qm-backdrop" onClick={onClose}>
      <div className="qm-window bank-send" onClick={e => e.stopPropagation()}>
        <div className="qm-head">
          <div>
            <div className="ed-h">Перенести в банк</div>
            <div className="ed-sub">вопрос уйдёт из раунда и ляжет в выбранную рубрику</div>
          </div>
          <button className="ico" data-tip="Закрыть" onClick={onClose}>✕</button>
        </div>
        {err && <div className="qm-alert">{err}</div>}
        <div className="bank-body">
          {!bank && !err && <div className="ed-hint">загружаю…</div>}
          {bank && bank.rounds.length === 0 && (
            <div className="ed-hint">
              В банке нет ни одной рубрики. Открой пакет «{bank.name}» и создай раунд —
              он и будет рубрикой («кино», «музыка», «про город»).
            </div>
          )}
          {(bank?.rounds ?? []).map(r => (
            <button key={r.id} className="bank-rubric-btn" disabled={busy}
              onClick={() => void send(r.id)}>
              <span>{r.title_lines.join(' ') || 'Без названия'}</span>
              <span className="ed-row-meta">{r.questions.filter(q => !q.hidden).length}</span>
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}
