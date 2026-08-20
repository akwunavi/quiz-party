// ═══ ПАНЕЛЬ РАЗБОРА ИИ ═══
// Два режима: разбор одного вопроса и разбор раунда целиком.
// Каждое замечание можно принять или отклонить — решения копятся в ai_feedback
// и подмешиваются в следующие запросы как калибровка придирчивости.
import { useEffect, useState } from 'react'
import {
  reviewQuestion, reviewRound, rateIssue, loadReview,
  pingAi, type QuestionReview, type RoundReview, type Issue,
} from '../../lib/aiReview'
import type { LoadedPack } from '../../lib/packLoader'

const KIND_RU: Record<string, string> = {
  ambiguous: 'двусмысленность', outdated: 'мог устареть', hint: 'подсказка в тексте',
  wrong: 'похоже на ошибку', narrow: 'слишком узкий', wording: 'формулировка',
  answer: 'поле ответа', order: 'порядок вопросов', duplicate: 'повтор',
  monotony: 'однообразие', bias: 'перекос темы', length: 'длина раунда', gap: 'пробел',
}

function IssueRow({ issue, questionId }: { issue: Issue; questionId: string | null }) {
  const [done, setDone] = useState<null | boolean>(null)
  return (
    <div className={`ai-issue${done === true ? ' accepted' : done === false ? ' rejected' : ''}`}>
      <div className="ai-issue-head">
        <span className="ai-kind">{KIND_RU[issue.kind] ?? issue.kind}</span>
        {issue.question != null && <span className="ai-qnum">вопрос {issue.question}</span>}
      </div>
      <div className="ai-issue-text">{issue.text}</div>
      {done === null
        ? (
          <div className="ai-issue-acts">
            <button onClick={() => { void rateIssue(questionId, issue, true); setDone(true) }}>
              Учту
            </button>
            <button className="ghost" onClick={() => { void rateIssue(questionId, issue, false); setDone(false) }}>
              Мимо
            </button>
          </div>
        )
        : <div className="ai-issue-done">{done ? '✓ учтено' : '× отклонено — такое больше не предложит'}</div>}
    </div>
  )
}

export function AiQuestionReview({ q, timerSeconds }: {
  q: LoadedPack['rounds'][number]['questions'][number]
  timerSeconds: number
}) {
  const [data, setData] = useState<QuestionReview | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [stale, setStale] = useState(false)

  useEffect(() => {
    void (async () => {
      const saved = await loadReview('question', q.id)
      if (saved) { setData(saved.result as QuestionReview); setStale(true) }
    })()
  }, [q.id])

  const run = async () => {
    setBusy(true); setErr('')
    try { setData(await reviewQuestion(q, timerSeconds)); setStale(false) }
    catch (e) { setErr(e instanceof Error ? e.message : 'не удалось проверить') }
    finally { setBusy(false) }
  }

  const over = data && data.solve_seconds > timerSeconds

  return (
    <div className="ai-panel">
      <div className="ai-head">
        <span className="ai-title">Проверка ИИ</span>
        <button className="adm-btn" disabled={busy} onClick={() => void run()}>
          {busy ? 'думаю…' : data ? 'Проверить заново' : 'Проверить вопрос'}
        </button>
      </div>
      {err && <>
        <div className="ai-err">{err}</div>
        <button className="ghost" onClick={async () => {
          try {
            const p = await pingAi()
            alert(p.ok
              ? `Связь есть. Ключ …${p.key_tail.slice(-4)} принят провайдером.`
              : `Провайдер ответил ${p.status}. Ключ …${p.key_tail.slice(-4)}.\n\n${p.body}`)
          } catch (e) { alert(e instanceof Error ? e.message : 'нет связи с функцией') }
        }}>Проверить связь и ключ</button>
      </>}
      {stale && data && <div className="ed-hint">разбор сохранён с прошлого раза</div>}

      {data && (
        <>
          <div className="ai-metrics">
            <span className={`ai-verdict v-${data.verdict}`}>
              {data.verdict === 'ok' ? 'вопрос в порядке'
                : data.verdict === 'warn' ? 'есть замечания' : 'надо править'}
            </span>
            <span className="ai-metric">сложность {data.difficulty} из 5</span>
            <span className={`ai-metric${over ? ' over' : ''}`}>
              раскрутка ≈ {data.solve_seconds} сек / таймер {timerSeconds} сек
            </span>
          </div>
          {over && (
            <div className="ai-warn">
              Команде нужно больше времени, чем даёт таймер — по этому критерию вопрос сложный.
              Либо упростить, либо добавить секунд.
            </div>
          )}
          {data.solve_path && <div className="ai-note">Как думает команда: {data.solve_path}</div>}
          {data.difficulty_note && <div className="ai-note">{data.difficulty_note}</div>}

          {data.issues?.map((it, i) => <IssueRow key={i} issue={it} questionId={q.id} />)}
          {data.issues?.length === 0 && <div className="ai-ok">Замечаний нет.</div>}

          {data.suggestion && (
            <div className="ai-suggest">
              <div className="ai-kind">как переформулировать</div>
              <div>{data.suggestion}</div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export function AiRoundReview({ round }: { round: LoadedPack['rounds'][number] }) {
  const [data, setData] = useState<RoundReview | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    void (async () => {
      const saved = await loadReview('round', round.id)
      if (saved) setData(saved.result as RoundReview)
    })()
  }, [round.id])

  const run = async () => {
    setBusy(true); setErr('')
    try { setData(await reviewRound(round)) }
    catch (e) { setErr(e instanceof Error ? e.message : 'не удалось проверить') }
    finally { setBusy(false) }
  }

  const overCount = data?.over_timer?.length ?? 0
  const total = round.questions.filter(q => !q.hidden).length
  const overloaded = total > 0 && overCount > total / 3

  return (
    <div className="ai-panel">
      <div className="ai-head">
        <span className="ai-title">Разбор раунда целиком</span>
        <button className="adm-btn" disabled={busy} onClick={() => void run()}>
          {busy ? 'думаю…' : data ? 'Проверить заново' : 'Проверить раунд'}
        </button>
      </div>
      {err && <div className="ai-err">{err}</div>}

      {data && (
        <>
          {data.summary && <div className="ai-note big">{data.summary}</div>}

          {/* время раскрутки против таймера — главный показатель перегруза */}
          {data.questions?.length > 0 && (
            <div className="ai-times">
              {data.questions.map(x => (
                <span key={x.n} className={`ai-time v-${x.verdict}`}
                  title={x.verdict === 'over' ? 'не укладывается в таймер'
                    : x.verdict === 'tight' ? 'впритык' : 'укладывается'}>
                  {x.n}<i>{x.solve_seconds}с</i>
                </span>
              ))}
            </div>
          )}
          {overloaded && (
            <div className="ai-warn">
              Перегруз: {overCount} из {total} вопросов не укладываются в таймер
              ({round.timer_seconds} сек). Раунд будет тяжёлым — стоит упростить часть
              или дать больше времени.
            </div>
          )}

          {data.difficulty_curve && <div className="ai-note">Кривая сложности: {data.difficulty_curve}</div>}
          {data.balance && <div className="ai-note">Баланс: {data.balance}</div>}

          {data.issues?.map((it, i) => <IssueRow key={i} issue={it} questionId={null} />)}

          {data.recommendations?.length > 0 && (
            <div className="ai-suggest">
              <div className="ai-kind">что сделать</div>
              <ul className="ai-recs">
                {data.recommendations.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}
