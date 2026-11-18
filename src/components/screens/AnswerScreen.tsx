// ═══ Экран ПРАВИЛЬНОГО ОТВЕТА для обычных вопросов (свободный ответ) — ОДИН компонент для проектора и предпросмотра ═══
// Чистая вёрстка: игровая логика (автораскрытие 3 с, автопроверка, запись is_correct) остаётся в HostScreen.ShowAnswers и сюда не входит.
// Авто-вид — прежняя разметка (пиксель-в-пиксель, доказано сравнением кадров); при валидном layout.answer подложка/картинки/пояснение
// рисуются ManualAnswer в рабочей области темы, а вопрос и колонка ответов команд остаются штатными.
import type { ReactNode } from 'react'
import { FitImg } from '../FitImg'
import { ManualAnswer } from '../ManualLayout'
import { BookNote } from '../../ny/book/BookNote'
import { TeamAnswers, type AnswerTeam } from './TeamAnswers'
import { displayAnswer } from './QuestionScreen'
import { lenClass, mediaUrl } from '../../lib/media'
import { answerScreenImages, answerLayoutImgs } from '../../lib/answerImages'
import { answerLayoutUnsupportedReason, answerTileCount, isStagedAnswer, screenLayout } from '../../lib/layoutRects'
import { stagedAnswerBody } from './AnswerBody'
import { displayRoundNumber } from '../../lib/roundMeta'
import { noteClass } from '../../lib/questionLayout'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { Answer, Question } from '../../types/quiz'

export type { AnswerTeam }

export function AnswerScreen({ pack, round, q, step, total, roundIdx, paper, rows, teamOf, checked, revealLive, shownOf, actions, extra, final }: {
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
  /** предпросмотр редактора: варианты сразу в конечной ступени (без таймеров показа) */
  final?: boolean
}) {
  const isBook = pack.theme === 'ny_book'
  const { answerImgs, revealImgs } = answerScreenImages(q.media)
  const manual = answerLayoutUnsupportedReason(pack.theme, round.mechanic, q) === null
    ? screenLayout(q.service, 'answer', answerLayoutImgs(q.media, isStagedAnswer(q)), pack.theme, answerTileCount(q)) : null
  const noteNode = (t: string) => isBook ? <BookNote text={t} className={noteClass(t).trim()} /> : <div className={`answer-note${noteClass(t)}`}>{t}</div>
  // варианты / порядок / пары — то же тело, что на проекторе (AnswerBody), своё место в раскладке — по рамкам layout.answer.tiles
  const mode = q.answer.mode
  const staged = isStagedAnswer(q)
  const stagedBody = (tileRects?: import('../../lib/layoutRects').Rect[]) => stagedAnswerBody(q, { theme: pack.theme, tileRects, final })
  const recallOn = !!q.question_text.trim() && mode !== 'match'
  const teamsNode = !paper ? <TeamAnswers rows={rows} isBook={isBook} teamOf={teamOf} shownOf={shownOf} checked={checked} /> : null
  return (
    <div className={`host-screen grid-bg${paper ? ' paper-answers' : ''}`} style={{ justifyContent: 'flex-start' }}>
      <div className="host-topbar">
        <span className="mono-tag">РАУНД {displayRoundNumber(pack, roundIdx)} :: ОТВЕТЫ</span>
        <span className="qnum">ВОПРОС <b>{step + 1}</b> / {total}</span>
      </div>
      <div className="answers-layout revealed" style={{ marginTop: 60 }}>
        <div className="answers-main revealed" style={{ flex: 1.4, minHeight: 0 }}>
          {recallOn && !manual?.recall && <p className={`q-recall${lenClass(q.question_text)}`}>{q.question_text}</p>}
          {manual ? (
            <>{extra}{staged && !manual.tiles && <div className="answer-block reveal-in lay-flow">{stagedBody()}</div>}</>
          ) : (
            <div className={`answer-block reveal-in${revealLive ? ' bk-live' : ''}${isBook && (q.answer_note ?? '').length <= 160 ? ' bk-shortnote' : ''}`}>
              <div className="answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
              {extra}
              {staged ? stagedBody() : <div className={`answer-main${displayAnswer(q).length > 70 ? ' am-xl' : displayAnswer(q).length > 36 ? ' am-l' : ''}`}>{displayAnswer(q)}</div>}
              {!staged && revealImgs.length > 0 && (
                <div className={`q-media-grid answer-media n${Math.min(revealImgs.length, 4)}${revealImgs.length > 1 ? ' eq-row' : ''}${revealImgs.length > 4 ? ' wrap2' : ''}${answerImgs.length ? ' is-own' : ' is-recall'}`}>
                  {revealImgs.map((m, i) => <FitImg key={i} src={mediaUrl(m)} />)}
                </div>
              )}
              {checked && q.answer_note && noteNode(q.answer_note)}
            </div>
          )}
        </div>
        {!paper && !manual?.teams && teamsNode}
      </div>
      {manual && <ManualAnswer theme={pack.theme} answer={displayAnswer(q)} note={checked ? q.answer_note : null} urls={isStagedAnswer(q) ? [] : revealImgs.map(mediaUrl)} rects={isStagedAnswer(q) ? { ...manual, text: undefined } : manual} noteNode={noteNode}
        recallText={recallOn ? q.question_text : undefined} recallCls={lenClass(q.question_text)} tiles={staged && manual.tiles ? stagedBody(manual.tiles) : undefined}
        teamsNode={teamsNode} teamsWidth={isBook ? 'calc(620 * var(--u))' : 'min(34vw, 420px)'} />}
      {actions}
    </div>
  )
}
