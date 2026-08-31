// ═══ Действия ведущего/игры (перенос модели старого проекта) ═══
import { getRoomId } from '../lib/room'
import { supabase } from './supabase'

export async function selectPackAndStart(packId: string) {
  const game_id = crypto.randomUUID()
  const { error } = await supabase.from('game_sessions').update({
    game_id, pack_id: packId, phase: 'lobby',
    round_number: 0, question_index: 0,
    timer_started_at: null, reveal: false, completed_rounds: [],
    // разбивка команд показывается ОДИН раз: на следующей игре она не нужна
    random_groups: [], jeopardy_opened: [],
  }).eq('id', getRoomId())
  if (error) throw error
  await supabase.from('packs').update({ status: 'active' }).eq('id', packId)
  return game_id
}

export async function setPhase(phase: string) {
  const { error } = await supabase.from('game_sessions').update({ phase }).eq('id', getRoomId())
  if (error) throw error
}

/** Перейти к раунду.
 *  Если на это место в игре назначен слайд-брифинг, сначала показываем его:
 *  ведущему не надо помнить про кнопку, слайд выходит сам там, где задуман.
 *  Индекс слайда кладём в question_index — как на экране финала. */
export async function gotoRound(round_number: number, slideIndex?: number) {
  const { error } = await supabase.from('game_sessions').update({
    phase: slideIndex == null ? 'round_intro' : 'info',
    round_number,
    question_index: slideIndex ?? 0,
    timer_started_at: null, reveal: false,
  }).eq('id', getRoomId())
  if (error) throw error
}

/** Индекс слайда, назначенного на вход в раунд, или null.
 *  'lobby' — перед первым раундом, 'round:N' — перед раундом N (с единицы). */
export function slideForRound(
  slides: { show_at?: string }[] | undefined, roundNumber: number,
): number | null {
  if (!slides?.length) return null
  const want = roundNumber === 0 ? ['lobby', 'round:1'] : [`round:${roundNumber + 1}`]
  const i = slides.findIndex(s => s.show_at && want.includes(s.show_at))
  return i >= 0 ? i : null
}

/** Останавливает звук на ЭТОЙ вкладке. На проекторе то же делает
 *  stopAllMedia в HostScreen — здесь для админки и телефонов. */
function hushLocal() {
  if (typeof document === 'undefined') return
  document.querySelectorAll('audio, video').forEach(el => {
    const m = el as HTMLMediaElement
    try { m.pause() } catch { /* уже недоступен */ }
  })
}

export async function gotoQuestion(question_index: number) {
  hushLocal()
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

/** Экран «считаем баллы» — игра в баре.
 *  Ведущий закрыл последний раунд и сводит бланки: залу нужен экран, который
 *  честно говорит, чего ждать, и не оставляет тишину на пять минут. Отдельная
 *  фаза, а не перерыв: из перерыва маршрут ведёт в следующий раунд, а отсюда —
 *  только к итогам, и уводит с неё ведущий, когда закончит считать. */
export async function startCounting() {
  const { error } = await supabase.from('game_sessions').update({
    phase: 'counting', timer_started_at: new Date().toISOString(), reveal: false,
  }).eq('id', getRoomId())
  if (error) throw error
}

export async function finishGame(packId: string | null) {
  // финал всегда начинается с нулевого шага, иначе подхватится индекс вопроса
  await supabase.from('game_sessions')
    .update({ phase: 'finale', question_index: 0, reveal: false }).eq('id', getRoomId())
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
    timer_started_at: null, reveal: false, completed_rounds: [],
    // разбивка команд показывается ОДИН раз: на следующей игре она не нужна
    random_groups: [], jeopardy_opened: [], melody: {},
  }).eq('id', getRoomId())
  if (error) throw error
}

/** Шаг финала. Хранится в question_index сессии — так им можно рулить
 *  и с проектора, и с телефона ведущего (важно для награждения в баре). */
export async function setFinaleStep(step: number) {
  const { error } = await supabase.from('game_sessions')
    .update({ question_index: step }).eq('id', getRoomId())
  if (error) throw error
}

/** Сценарий финала: 'show' — нарезка раундов, 'bar' — ручное награждение. */
export async function setFinaleMode(mode: 'show' | 'bar') {
  const { error } = await supabase.from('game_sessions')
    .update({ reveal: mode === 'bar', question_index: 0 }).eq('id', getRoomId())
  if (error) throw error
}

/** Удалить команду вместе с её ответами (ведущий ошибся при вводе). */
export async function deleteTeam(teamId: string) {
  await supabase.from('answers').delete().eq('team_id', teamId)
  const { error } = await supabase.from('teams').delete().eq('id', teamId)
  if (error) throw error
}

/** Переименовать команду — на бумаге название часто уточняют по ходу. */
export async function renameTeam(teamId: string, name: string) {
  const { error } = await supabase.from('teams').update({ name }).eq('id', teamId)
  if (error) throw error
}

/** Новая игра С ПОЛНОЙ ОЧИСТКОЙ.
 *  Обычный resetGame просто выдаёт новый game_id — старые ответы и команды
 *  остаются в базе навсегда и копятся от игры к игре. Здесь они удаляются.
 *  Действие необратимо: истории прошлых игр не останется. */
export async function resetGameHard() {
  const room = getRoomId()
  const { data: s } = await supabase.from('game_sessions')
    .select('game_id').eq('id', room).maybeSingle()
  const gameId = s?.game_id
  if (gameId) {
    // ответы удаляем ПЕРВЫМИ: на них ссылаются оценки
    await supabase.from('answers').delete().eq('game_id', gameId)
    await supabase.from('teams').delete().eq('game_id', gameId)

    // ПРОВЕРЯЕМ результат. При запрещающей политике RLS Postgres не отдаёт
    // ошибку — он просто не видит строк, и удаление «проходит», ничего не
    // удалив. Без этой проверки кнопка врала бы об успехе.
    const [{ count: aLeft }, { count: tLeft }] = await Promise.all([
      supabase.from('answers').select('id', { count: 'exact', head: true }).eq('game_id', gameId),
      supabase.from('teams').select('id', { count: 'exact', head: true }).eq('game_id', gameId),
    ])
    if ((aLeft ?? 0) > 0 || (tLeft ?? 0) > 0) {
      throw new Error(
        `Очистка не сработала: осталось ответов ${aLeft ?? '?'}, команд ${tLeft ?? '?'}. `
        + 'База запрещает удаление. Выполни миграцию supabase/migrations/0004_hard_reset.sql '
        + 'в SQL-редакторе Supabase и повтори.')
    }
  }
  // Чистим и ОСИРОТЕВШИЕ данные прошлых игр: обычный сброс лишь выдавал
  // новый game_id, а строки со старыми id оставались в базе навсегда.
  await purgeOldGames()
  await resetGame()
}

/** Удалить ответы и команды игр, которых больше нет ни в одной комнате. */
export async function purgeOldGames() {
  const { data: sessions } = await supabase.from('game_sessions').select('game_id')
  const live = (sessions ?? []).map(r => r.game_id).filter(Boolean) as string[]
  if (live.length === 0) return
  const list = `(${live.map(id => `"${id}"`).join(',')})`
  await supabase.from('answers').delete().not('game_id', 'in', list)
  await supabase.from('teams').delete().not('game_id', 'in', list)
}
