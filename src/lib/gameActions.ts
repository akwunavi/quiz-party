// ═══ Действия ведущего/игры (перенос модели старого проекта) ═══
import { getRoomId } from '../lib/room'
import { supabase } from './supabase'

export async function selectPackAndStart(packId: string) {
  const game_id = crypto.randomUUID()
  const { error } = await supabase.from('game_sessions').update({
    game_id, pack_id: packId, phase: 'lobby',
    round_number: 0, question_index: 0,
    timer_started_at: null, reveal: false, completed_rounds: [],
  }).eq('id', getRoomId())
  if (error) throw error
  await supabase.from('packs').update({ status: 'active' }).eq('id', packId)
  return game_id
}

export async function setPhase(phase: string) {
  const { error } = await supabase.from('game_sessions').update({ phase }).eq('id', getRoomId())
  if (error) throw error
}

export async function gotoRound(round_number: number) {
  const { error } = await supabase.from('game_sessions').update({
    phase: 'round_intro', round_number, question_index: 0,
    timer_started_at: null, reveal: false,
  }).eq('id', getRoomId())
  if (error) throw error
}

export async function gotoQuestion(question_index: number) {
  // Таймер НЕ стартует здесь: хост запустит его после окончания озвучки
  const { error } = await supabase.from('game_sessions').update({
    phase: 'question', question_index,
    timer_started_at: null, reveal: false,
  }).eq('id', getRoomId())
  if (error) throw error
}

/** Старт таймера (вызывается хостом после озвучки вопроса). */
export async function startTimer() {
  const { error } = await supabase.from('game_sessions')
    .update({ timer_started_at: new Date().toISOString() }).eq('id', getRoomId())
  if (error) throw error
}

/** «Время ответов»: минута на подумать перед разбором (как в старом проекте). */
export async function startAnswerTime() {
  const { error } = await supabase.from('game_sessions').update({
    phase: 'answer_time', timer_started_at: new Date().toISOString(), reveal: false,
  }).eq('id', getRoomId())
  if (error) throw error
}

/** Фаза показа ответов раунда: по одному, как в старом проекте. */
export async function gotoAnswers(question_index: number, revealed = false) {
  const { error } = await supabase.from('game_sessions').update({
    phase: 'show_answers', question_index, reveal: revealed, timer_started_at: null,
  }).eq('id', getRoomId())
  if (error) throw error
}

export async function showScoreboard() {
  const { error } = await supabase.from('game_sessions').update({ phase: 'scoreboard' }).eq('id', getRoomId())
  if (error) throw error
}

export async function startBreak() {
  const { error } = await supabase.from('game_sessions').update({
    phase: 'break', timer_started_at: new Date().toISOString(),
  }).eq('id', getRoomId())
  if (error) throw error
}

export async function revealAnswer() {
  const { error } = await supabase.from('game_sessions').update({ reveal: true }).eq('id', getRoomId())
  if (error) throw error
}

export async function markRoundCompleted(completed: number[]) {
  const { error } = await supabase.from('game_sessions')
    .update({ completed_rounds: completed }).eq('id', getRoomId())
  if (error) throw error
}

export async function finishGame(packId: string | null) {
  await supabase.from('game_sessions').update({ phase: 'finale' }).eq('id', getRoomId())
  if (packId) await supabase.from('packs').update({ status: 'played' }).eq('id', packId)
}

export async function registerTeam(name: string, color: string, game_id: string) {
  const { data, error } = await supabase.from('teams')
    .upsert({ name, color, game_id, last_seen_at: new Date().toISOString() }, { onConflict: 'name' })
    .select().single()
  if (error) throw error
  return data
}

/** Heartbeat игрока — раз в полинг обновляем last_seen_at. */
export async function heartbeat(teamId: string) {
  await supabase.from('teams')
    .update({ last_seen_at: new Date().toISOString() }).eq('id', teamId)
}

/** Полный сброс игры: активный пакет возвращается в ready, состояние — в лобби без пакета. */
export async function resetGame() {
  await supabase.from('packs').update({ status: 'ready' }).eq('status', 'active')
  const { error } = await supabase.from('game_sessions').update({
    game_id: crypto.randomUUID(), pack_id: null, phase: 'lobby',
    round_number: 0, question_index: 0,
    timer_started_at: null, reveal: false, completed_rounds: [], melody: {},
  }).eq('id', getRoomId())
  if (error) throw error
}
