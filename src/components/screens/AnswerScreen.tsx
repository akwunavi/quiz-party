// ═══ Экран ПРАВИЛЬНОГО ОТВЕТА для обычных вопросов (свободный ответ) — ОДИН компонент для проектора и предпросмотра ═══
// Чистая вёрстка: игровая логика (автораскрытие 3 с, автопроверка, запись is_correct) остаётся в HostScreen.ShowAnswers и сюда не входит.
// Авто-вид — прежняя разметка (пиксель-в-пиксель, доказано сравнением кадров); при валидном layout.answer подложка/картинки/пояснение
// рисуются ManualAnswer в рабочей области темы, а вопрос и колонка ответов команд остаются штатными.
import type { ReactNode } from 'react'
import { FitImg } from '../FitImg'
import { ManualAnswer } from '../ManualLayout'
import { BookNote } from '../../ny/book/BookNote'
import { BookTeamCard } from '../../ny/book/BookTeamCard'
import { displayAnswer } from './QuestionScreen'
import { lenClass, mediaUrl } from '../../lib/media'
import { answerScreenImages } from '../../lib/answerImages'
import { answerLayoutUnsupportedReason, screenLayout } from '../../lib/layoutRects'
import { themeHasFold } from '../../lib/layoutArea'
import { displayRoundNumber } from '../../lib/roundMeta'
import { noteClass } from '../../lib/questionLayout'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { Answer, Question } from '../../types/quiz'

export interface AnswerTeam { id: string; name: string; color: string }

export function AnswerScreen({ pack, round, q, step, total, roundIdx, paper, rows, teamOf, checked, revealLive, shownOf, actions, extra }: {
  pack: LoadedPack; round: LoadedRound; q: Question; step: number; total: number; roundIdx: number
  paper: boolean
  rows: Answer[]
  teamOf: (id: string) => AnswerTeam | undefined
  /** вердикт по строке ответа (null — ещё нет) */
  shownOf: (a: Answer) => boolean | null | undefined
  checked: boolean; revealLive: boolean
  actions: ReactNode
  /** звук ответа и прочие эффекты — управление игрой, не вёрстка */
  extra?: ReactNode
}) {
  const isBook = pack.theme === 'ny_book'
  const { answerImgs, revealImgs } = answerScreenImages(q.media)
  const manual = answerLayoutUnsupportedReason(pack.theme, round.mechanic, q) === null
    ? screenLayout(q.service, 'answer', revealImgs, themeHasFold(pack.theme)) : null
  const noteNode = (t: string) => isBook ? <BookNote text={t} className={noteClass(t).trim()} /> : <div className={`answer-note${noteClass(t)}`}>{t}</div>
  return (
    <div className={`host-screen grid-bg${paper ? ' paper-answers' : ''}`} style={{ justifyContent: 'flex-start' }}>
      <div className="host-topbar">
        <span className="mono-tag">РАУНД {displayRoundNumber(pack, roundIdx)} :: ОТВЕТЫ</span>
        <span className="qnum">ВОПРОС <b>{step + 1}</b> / {total}</span>
      </div>
      <div className="answers-layout revealed" style={{ marginTop: 60 }}>
        <div className="answers-main revealed" style={{ flex: 1.4, minHeight: 0 }}>
          {q.question_text.trim() && <p className={`q-recall${lenClass(q.question_text)}`}>{q.question_text}</p>}
          {manual ? (
            <>{extra}</>
          ) : (
            <div className={`answer-block reveal-in${revealLive ? ' bk-live' : ''}${isBook && (q.answer_note ?? '').length <= 160 ? ' bk-shortnote' : ''}`}>
              <div className="answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
              {extra}
              <div className={`answer-main${displayAnswer(q).length > 70 ? ' am-xl' : displayAnswer(q).length > 36 ? ' am-l' : ''}`}>{displayAnswer(q)}</div>
              {revealImgs.length > 0 && (
                <div className={`q-media-grid answer-media n${Math.min(revealImgs.length, 4)}${revealImgs.length > 1 ? ' eq-row' : ''}${revealImgs.length > 4 ? ' wrap2' : ''}${answerImgs.length ? ' is-own' : ' is-recall'}`}>
                  {revealImgs.map((m, i) => <FitImg key={i} src={mediaUrl(m)} />)}
                </div>
              )}
              {checked && q.answer_note && noteNode(q.answer_note)}
            </div>
          )}
        </div>
        {!paper && <div className="team-answers" data-n={rows.length}>
          <div className="mono-tag">ОТВЕТЫ КОМАНД</div>
          {rows.length === 0 && <div style={{ color: 'var(--dim)' }}>нет ответов</div>}
          {rows.map(a => {
            const team = teamOf(a.team_id)
            const shown = checked ? shownOf(a) : null
            return isBook
              ? <div key={a.id} className="team-answer bk-ta">
                  <BookTeamCard name={team?.name ?? '—'} ch={rows.length > 12 ? 40 : rows.length > 8 ? 46 : 56} color={team?.color} />
                  <span className="text">{a.answer_text || '—'}
                    {a.stake != null && a.stake !== 0 && <span style={{ color: 'var(--accent)', fontSize: '.7em' }}> · {a.stake}</span>}</span>
                  <span className={`bk-ball is-${!a.answer_text?.trim() ? 'none' : shown === true ? 'ok' : shown === false ? 'no' : 'wait'}`} aria-hidden="true">
                    <i>{!a.answer_text?.trim() ? '' : shown === true ? '✓' : shown === false ? '✗' : ''}</i></span>
                </div>
              : <div key={a.id} className="team-answer" style={{ borderLeft: `5px solid ${shown === true ? 'var(--ok)' : shown === false ? 'var(--danger)' : 'var(--dim)'}` }}>
                  <span className="name" style={{ color: team?.color }}>{team?.name ?? '—'}</span>
                  <span className="text">{a.answer_text || '—'}
                    {a.stake != null && a.stake !== 0 && <span style={{ color: 'var(--accent)', fontSize: '.7em' }}> · {a.stake}</span>}</span>
                  {shown != null && <span className="mark" style={{ color: shown ? 'var(--ok)' : 'var(--danger)' }}>{shown ? '✓' : '✗'}</span>}
                </div>
          })}
        </div>}
      </div>
      {manual && <ManualAnswer theme={pack.theme} answer={displayAnswer(q)} note={checked ? q.answer_note : null} urls={revealImgs.map(mediaUrl)} rects={manual} noteNode={noteNode} />}
      {actions}
    </div>
  )
}
