// ═══ RoomTransport поверх Supabase — сегодняшний код, перенесённый как есть ═══
//
// Никакой новой логики. Каждый метод — это ровно тот запрос, что раньше
// стоял прямо в gameActions.ts/hooks/*.ts/blitzApi.ts и т.д., просто
// собранный в одном файле. `onConflict` скопирован дословно из живого кода
// (см. комментарий у types.ts) — НЕ трогать без сверки с реальным
// уникальным индексом в supabase/migrations.
//
// Все методы идут через `withNetResilience` (таймаут + один ретрай на
// сетевую ошибку), НЕ через `callTransport`/actionStatus: часть операций
// вызывается автопереходами и фоновыми проверками (patchSession — из
// таймеров и авто-раскрытия ответа, patchAnswer — из автопроверки на
// HostScreen, heartbeat — раз в 5 сек с телефона игрока), а не только по
// клику ведущего. Если завести их в общую шину статуса, индикатор «идёт
// запрос»/«нет связи» на проекторе и в админке замигает на каждом таком
// фоновом вызове — это уже видимое изменение поведения экрана, которого в
// этом шаге НЕТ. Явные действия ведущего (кнопки в AdminPage.tsx) как и
// раньше сами оборачивают вызов в `runAction` на своей стороне — это не
// менялось. `callTransport` в net.ts остаётся точкой, через которую можно
// подключить статус-бар точечно для новых write-путей в будущем.
import { supabase } from '../supabase'
import { withNetResilience } from './net'
import type { Answer, GameState, Team } from '../../types/quiz'
import type { BlitzState } from '../blitzState'
import type {
  AnswerPatch, AnswerUpsert, DeleteAnswersBy, RoomTransport, SessionPatch, TeamPatch, TeamUpsert,
} from './types'

export const supabaseTransport: RoomTransport = {
  async readSession(roomId) {
    if (!roomId) return null
    const { data } = await withNetResilience(signal =>
      supabase.from('game_sessions').select('*').eq('id', roomId).abortSignal(signal).maybeSingle())
    return (data as GameState) ?? null
  },

  async patchSession(roomId, patch: SessionPatch) {
    await withNetResilience(async signal => {
      const { error } = await supabase.from('game_sessions')
        .update(patch as never).eq('id', roomId).abortSignal(signal)
      if (error) throw error
    })
  },

  async listTeams(gameId) {
    // Бросаем на error (а не молча отдаём []): хук useTeams различает
    // «пришёл пустой список» (перезаписать состояние) и «запрос не
    // получился» (оставить прежний список, как было в коде до переноса,
    // где на это же решение работала проверка `if (data)`).
    const { data, error } = await withNetResilience(signal =>
      supabase.from('teams').select('*').eq('game_id', gameId).abortSignal(signal))
    if (error) throw error
    return (data as Team[]) ?? []
  },

  async upsertTeam(row: TeamUpsert) {
    const { data, error } = await withNetResilience(signal =>
      supabase.from('teams').upsert(row as never, { onConflict: 'name' })
        .abortSignal(signal).select().single())
    if (error) throw error
    return data as Team
  },

  async patchTeam(id, patch: TeamPatch) {
    await withNetResilience(async signal => {
      const { error } = await supabase.from('teams').update(patch as never)
        .eq('id', id).abortSignal(signal)
      if (error) throw error
    })
  },

  async deleteTeam(id) {
    await withNetResilience(async signal => {
      const { error } = await supabase.from('teams').delete().eq('id', id).abortSignal(signal)
      if (error) throw error
    })
  },

  async listAnswers(gameId, roundNumber) {
    // Тот же смысл, что у listTeams выше: error бросаем, чтобы хук мог
    // оставить прежние ответы вместо того, чтобы затереть их пустым списком.
    const { data, error } = await withNetResilience(signal => {
      let q = supabase.from('answers').select('*').eq('game_id', gameId)
      if (roundNumber !== undefined) q = q.eq('round_number', roundNumber)
      return q.abortSignal(signal)
    })
    if (error) throw error
    return (data as Answer[]) ?? []
  },

  async upsertAnswers(rows: AnswerUpsert[]) {
    await withNetResilience(async signal => {
      const { error } = await supabase.from('answers')
        .upsert(rows as never, { onConflict: 'team_id,question_ref' }).abortSignal(signal)
      if (error) throw error
    })
  },

  async patchAnswer(id, patch: AnswerPatch) {
    await withNetResilience(async signal => {
      const { error } = await supabase.from('answers').update(patch as never)
        .eq('id', id).abortSignal(signal)
      if (error) throw error
    })
  },

  async deleteAnswers(by: DeleteAnswersBy) {
    return await withNetResilience(async signal => {
      if ('game_id' in by) {
        await supabase.from('answers').delete().eq('game_id', by.game_id).abortSignal(signal)
        const { count } = await supabase.from('answers')
          .select('id', { count: 'exact', head: true }).eq('game_id', by.game_id).abortSignal(signal)
        return count ?? 0
      }
      await supabase.from('answers').delete().in('team_id', by.team_id_in).abortSignal(signal)
      const { count } = await supabase.from('answers')
        .select('id', { count: 'exact', head: true }).in('team_id', by.team_id_in).abortSignal(signal)
      return count ?? 0
    })
  },

  async readBlitz(gameId, roundNumber) {
    const { data } = await withNetResilience(signal =>
      supabase.from('blitz_state').select('state')
        .eq('game_id', gameId).eq('round_number', roundNumber).abortSignal(signal).maybeSingle())
    const st = (data as { state?: BlitzState } | null)?.state
    return st && Array.isArray(st.order) ? st : null
  },

  async writeBlitz(gameId, roundNumber, state) {
    await withNetResilience(async signal => {
      const { error } = await supabase.from('blitz_state').upsert({
        game_id: gameId, round_number: roundNumber,
        state, updated_at: new Date().toISOString(),
      }, { onConflict: 'game_id,round_number' }).abortSignal(signal)
      if (error) throw error
    })
  },

  async markQuestionShown(row) {
    // Не блокирует игру, если не записалось — тайминг это аналитика,
    // а не то, без чего раунд не может продолжаться (см. gameActions.ts
    // startTimer до переноса).
    try {
      await withNetResilience(async signal => {
        const { error } = await supabase.from('question_shown').upsert({
          game_id: row.gameId, round_number: row.roundNumber,
          question_ref: row.questionRef, shown_at: row.shownAt,
        }, { onConflict: 'game_id,question_ref' }).abortSignal(signal)
        if (error) throw error
      })
    } catch (err) {
      console.error('время показа вопроса не записалось', err)
    }
  },

  async setPackStatus(packId, status) {
    await withNetResilience(async signal => {
      const { error } = await supabase.from('packs').update({ status })
        .eq('id', packId).abortSignal(signal)
      if (error) throw error
    })
  },
}
