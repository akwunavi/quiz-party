// ═══ Колонка «ОТВЕТЫ КОМАНД» экрана ответа — ОДНА разметка для обычных вопросов (AnswerScreen) и разбора «3 попыток» (RevealRound) ═══
// «Книга»: карточка команды + ответ + статус-шар; остальные темы: имя, ответ, отметка с цветной полосой слева. Вёрстка — прежние классы (.team-answers/.team-answer),
// ничего нового здесь не стилизуется: вынесено из AnswerScreen без изменения разметки, чтобы два экрана не разошлись.
import { BookTeamCard } from '../../ny/book/BookTeamCard'
import type { Answer } from '../../types/quiz'

export interface AnswerTeam { id: string; name: string; color: string; icon?: string | null }

export function TeamAnswers({ rows, isBook, teamOf, shownOf, checked, showStake = true }: {
  rows: Answer[]; isBook: boolean
  teamOf: (id: string) => AnswerTeam | undefined
  /** вердикт по строке ответа (null — ещё нет) */
  shownOf: (a: Answer) => boolean | null | undefined
  /** вердикты показывать (до проверки — только «ждём») */
  checked: boolean
  /** «· ставка» после ответа: у «3 попыток» поле stake — номер фазы, на экране разбора оно не нужно */
  showStake?: boolean
}) {
  return (
    <div className="team-answers" data-n={rows.length}>
      <div className="mono-tag">ОТВЕТЫ КОМАНД</div>
      {rows.length === 0 && <div style={{ color: 'var(--dim)' }}>нет ответов</div>}
      {rows.map(a => {
        const team = teamOf(a.team_id)
        const shown = checked ? shownOf(a) : null
        const stake = showStake && a.stake != null && a.stake !== 0
          ? <span style={{ color: 'var(--accent)', fontSize: '.7em' }}> · {a.stake}</span> : null
        return isBook
          ? <div key={a.id} className="team-answer bk-ta">
              <BookTeamCard name={team?.name ?? '—'} ch={rows.length > 12 ? 44 : rows.length > 8 ? 52 : 62} color={team?.color} icon={team?.icon} />
              <span className="text">{a.answer_text || '—'}{stake}</span>
              <span className={`bk-ball is-${!a.answer_text?.trim() ? 'none' : shown === true ? 'ok' : shown === false ? 'no' : 'wait'}`} aria-hidden="true">
                <i>{!a.answer_text?.trim() ? '' : shown === true ? '✓' : shown === false ? '✗' : ''}</i></span>
            </div>
          : <div key={a.id} className="team-answer" style={{ borderLeft: `5px solid ${shown === true ? 'var(--ok)' : shown === false ? 'var(--danger)' : 'var(--dim)'}` }}>
              <span className="name" style={{ color: team?.color }}>{team?.name ?? '—'}</span>
              <span className="text">{a.answer_text || '—'}{stake}</span>
              {shown != null && <span className="mark" style={{ color: shown ? 'var(--ok)' : 'var(--danger)' }}>{shown ? '✓' : '✗'}</span>}
            </div>
      })}
    </div>
  )
}
