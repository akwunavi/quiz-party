// ═══ RoomTransport — узкий интерфейс над «связью с комнатой» ═══
//
// Шаг 4 плана офлайн-устойчивости (issue #4/#5). Единственная цель этого
// файла и его реализаций — собрать в одном месте ВСЕ обращения к Supabase,
// которые происходят во время живой игры (проектор/админка/телефон), чтобы
// шаг 6 мог подставить вторую реализацию (локальный сервер бара) не трогая
// вызывающий код. Сегодня это НЕ меняет поведение приложения — сюда просто
// перенесён сегодняшний код без изменений (см. supabaseTransport.ts).
//
// Список операций (13, а не 8 — архитектор специально пересчитал, чтобы
// адаптер не оказался дырявым):
//   readSession, patchSession — game_sessions одной комнаты
//   listTeams, upsertTeam, patchTeam, deleteTeam — teams
//   listAnswers, upsertAnswers, patchAnswer, deleteAnswers — answers
//   readBlitz, writeBlitz — blitz_state
//   markQuestionShown — question_shown (запись; аналитика)
//   setPackStatus — packs.status (единственное поле packs, нужное в игре)
//
// СОЗНАТЕЛЬНО ВНЕ АДАПТЕРА (редакторские/административные операции —
// локальный сервер бара их не поддерживает и не обязан):
//   src/lib/editorApi.ts   — CRUD пакетов/раундов/вопросов в редакторе
//   src/lib/mediaUpload.ts — загрузка картинок/аудио в Storage
//   src/lib/aiReview.ts    — ИИ-ревью вопросов
//   src/lib/auth.ts        — вход редакторов, роли
//   src/lib/ratings.ts     — оценки вопросов командами (question_ratings)
//   purgeOldGames (в gameActions.ts) — чистка осиротевших игр, служебное
//   listPacks / чтение содержимого пакета (packLoader.ts) — список и состав
//     пакетов сам по себе, не игровое состояние комнаты
// Если после этого шага «пропала оценка» или «не грузится пак» — это НЕ
// баг адаптера, эти пути и не должны были через него идти.
import type { Answer, GameState, Team } from '../../types/quiz'
import type { BlitzState } from '../blitzState'

/** game_sessions хранит и поля, не описанные в типе GameState (random_groups,
 *  jeopardy_opened, name...) — существующий код пишет их через `as never`.
 *  Патч транспорта такой же «дырявый» намеренно, чтобы не плодить каскад
 *  правок типов в этом страховочном шаге. */
export type SessionPatch = Partial<GameState> & Record<string, unknown>

export type TeamUpsert = {
  name: string
  color: string
  icon?: string | null
  game_id: string | null
  last_seen_at?: string | null
}

export type TeamPatch = Partial<Omit<Team, 'id'>>

export type AnswerUpsert = {
  team_id: string
  game_id: string
  question_ref: string
  round_number: number
  answer_text: string
  stake?: number | null
  is_correct?: boolean | null
  updated_at: string
}

export type AnswerPatch = Partial<Omit<Answer, 'id' | 'team_id' | 'game_id'>>

/** Критерии удаления ответов — оба места, где это сегодня нужно:
 *  полная очистка игры (по game_id) и очистка сида-репетиции (по списку
 *  team_id). */
export type DeleteAnswersBy =
  | { game_id: string }
  | { team_id_in: string[] }

export interface RoomTransport {
  readSession(roomId: string | null): Promise<GameState | null>
  patchSession(roomId: string | null, patch: SessionPatch): Promise<void>

  listTeams(gameId: string): Promise<Team[]>
  upsertTeam(row: TeamUpsert): Promise<Team>
  patchTeam(id: string, patch: TeamPatch): Promise<void>
  deleteTeam(id: string): Promise<void>

  listAnswers(gameId: string, roundNumber?: number): Promise<Answer[]>
  upsertAnswers(rows: AnswerUpsert[]): Promise<void>
  patchAnswer(id: string, patch: AnswerPatch): Promise<void>
  /** Возвращает число строк, реально оставшихся ПОСЛЕ удаления (не то,
   *  сколько удалено) — resetGameHard сверяет этим числом, что RLS не
   *  съел удаление молча (см. HANDOFF §5, «Проверка должна быть
   *  независимой» и разбор resetGameHard). Ожидание — 0. */
  deleteAnswers(by: DeleteAnswersBy): Promise<number>

  readBlitz(gameId: string, roundNumber: number): Promise<BlitzState | null>
  writeBlitz(gameId: string, roundNumber: number, state: BlitzState): Promise<void>

  markQuestionShown(row: {
    gameId: string; roundNumber: number; questionRef: string; shownAt: string
  }): Promise<void>

  setPackStatus(packId: string, status: 'active' | 'ready' | 'played'): Promise<void>
}
