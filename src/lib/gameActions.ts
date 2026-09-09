// ═══ Действия ведущего/игры (перенос модели старого проекта) ═══
import { getRoomId } from '../lib/room'
import { room } from './transport'
import { supabase } from './supabase'
import { uuid } from './uuid'

export async function selectPackAndStart(packId: string) {
  const game_id = uuid()
  await room.patchSession(getRoomId(), {
    game_id, pack_id: packId, phase: 'lobby',
    round_number: 0, question_index: 0,
    timer_started_at: null, reveal: false, completed_rounds: [],
    // разбивка команд показывается ОДИН раз: на следующей игре она не нужна
    random_groups: [], jeopardy_opened: [],
  })
  await room.setPackStatus(packId, 'active')
  return game_id
}

export async function setPhase(phase: string) {
  await room.patchSession(getRoomId(), { phase })
}

/** Перейти к раунду.
 *  Если на это место в игре назначен слайд-брифинг, сначала показываем его:
 *  ведущему не надо помнить про кнопку, слайд выходит сам там, где задуман.
 *  Индекс слайда кладём в question_index — как на экране финала. */
export async function gotoRound(round_number: number, slideIndex?: number) {
  await room.patchSession(getRoomId(), {
    phase: slideIndex == null ? 'round_intro' : 'info',
    round_number,
    question_index: slideIndex ?? 0,
    timer_started_at: null, reveal: false,
  })
}

// Правила размещения слайдов живут в отдельном модуле без клиента базы —
// так их можно покрыть тестами. Реэкспорт, чтобы места вызова не менялись.
export { slideForRound, slideBeforeFinale } from './slides'

/** Заставка «Интро» перед первым раундом — см. HostScreen phase 'intro'.
 *  Сама заставка, доиграв, вызывает gotoRound(0, ...) — тот же переход,
 *  что случился бы по кнопке «К первому раунду», если бы интро не было. */
export async function startIntro() {
  await room.patchSession(getRoomId(), {
    phase: 'intro', timer_started_at: null, reveal: false,
  })
}

/** Показать слайд-брифинг, не трогая номер раунда. */
export async function showSlide(slideIndex: number) {
  await room.patchSession(getRoomId(), { phase: 'info', question_index: slideIndex, reveal: false })
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
  await room.patchSession(getRoomId(), {
    phase: 'question', question_index,
    timer_started_at: null, reveal: false,
  })
}

/** Старт таймера (вызывается хостом после озвучки вопроса).
 *  Момент старта — это и есть «вопрос показан залу» для тайминга ответов
 *  (см. миграцию 0009): до этого момента отвечать формально можно, но
 *  реально команды ждут именно этой команды. question — необязательный:
 *  таймер используется и там, где посекундный анализ вопросов не нужен
 *  (например, обратный отсчёт «время ответов» между раундами) — тогда
 *  запись в question_shown просто не делается. */
export async function startTimer(question?: {
  gameId: string; roundNumber: number; questionRef: string
}) {
  const now = new Date().toISOString()
  await room.patchSession(getRoomId(), { timer_started_at: now })
  if (question) {
    // не блокируем игру, если это не записалось — markQuestionShown сама
    // логирует ошибку и не бросает (тайминг это аналитика, а не то, без
    // чего раунд не может продолжаться)
    await room.markQuestionShown({
      gameId: question.gameId, roundNumber: question.roundNumber,
      questionRef: question.questionRef, shownAt: now,
    })
  }
}

/** «Время ответов»: минута на подумать перед разбором (как в старом проекте). */
export async function startAnswerTime() {
  await room.patchSession(getRoomId(), {
    phase: 'answer_time', timer_started_at: new Date().toISOString(), reveal: false,
  })
}

/** Фаза показа ответов раунда: по одному, как в старом проекте. */
export async function gotoAnswers(question_index: number, revealed = false) {
  await room.patchSession(getRoomId(), {
    phase: 'show_answers', question_index, reveal: revealed, timer_started_at: null,
  })
}

export async function showScoreboard() {
  await room.patchSession(getRoomId(), { phase: 'scoreboard' })
}

export async function startBreak() {
  await room.patchSession(getRoomId(), {
    phase: 'break', timer_started_at: new Date().toISOString(),
  })
}

export async function revealAnswer() {
  await room.patchSession(getRoomId(), { reveal: true })
}

export async function markRoundCompleted(completed: number[]) {
  await room.patchSession(getRoomId(), { completed_rounds: completed })
}

/** Экран «считаем баллы» — игра в баре.
 *  Ведущий закрыл последний раунд и сводит бланки: залу нужен экран, который
 *  честно говорит, чего ждать, и не оставляет тишину на пять минут. Отдельная
 *  фаза, а не перерыв: из перерыва маршрут ведёт в следующий раунд, а отсюда —
 *  только к итогам, и уводит с неё ведущий, когда закончит считать. */
export async function startCounting() {
  await room.patchSession(getRoomId(), {
    phase: 'counting', timer_started_at: new Date().toISOString(), reveal: false,
  })
}

/** @param bar Сценарий финала: true — сразу «награждение» (ручной, по
 *  команде ведущего), false/не задан — «шоу» (авто). На бумаге сценарий
 *  всегда нужен ручной — ведущий стоит с микрофоном и вручает места сам,
 *  выбирать «шоу» там просто нет смысла, поэтому вызовы из бара передают
 *  bar: true явно, а не оставляют ведущему выбор перед каждой игрой. */
export async function finishGame(packId: string | null, bar = false) {
  // финал всегда начинается с нулевого шага, иначе подхватится индекс вопроса
  await room.patchSession(getRoomId(), { phase: 'finale', question_index: 0, reveal: bar })
  if (packId) {
    await room.setPackStatus(packId, 'played')
    // last_game_id — для выгрузки статистики из редактора (issue #3): там
    // нет доступа к активной комнате, только к пакету, поэтому запоминаем
    // сюда id игры, которая только что доиграла. game_id ещё не сброшен —
    // resetGame() перезапишет его отдельным, более поздним действием.
    // Вне 13 операций транспорта: это поле packs, не game_sessions, и
    // отдельного метода под него сознательно нет (см. transport/types.ts) —
    // прямой вызов Supabase остаётся здесь, как редакторская мелочь на
    // стыке с игровым потоком.
    const session = await room.readSession(getRoomId())
    if (session?.game_id) {
      await supabase.from('packs').update({ last_game_id: session.game_id }).eq('id', packId)
    }
  }
}

export async function registerTeam(name: string, color: string, game_id: string, icon: string | null = null) {
  return room.upsertTeam({ name, color, icon, game_id, last_seen_at: new Date().toISOString() })
}

/** Heartbeat игрока — раз в полинг обновляем last_seen_at. */
export async function heartbeat(teamId: string) {
  await room.patchTeam(teamId, { last_seen_at: new Date().toISOString() })
}

/** Полный сброс игры: активный пакет возвращается в ready, состояние — в лобби без пакета. */
export async function resetGame() {
  // Единственное место, где статус пакета переводится НАЗАД в ready по
  // условию «status = active», а не по конкретному id — оставлено прямым
  // вызовом Supabase: setPackStatus в транспорте принимает id пакета, а тут
  // мы его сознательно не знаем (могло смениться несколько активных за
  // историю комнаты, чистим всё, что осталось активным).
  await supabase.from('packs').update({ status: 'ready' }).eq('status', 'active')
  await room.patchSession(getRoomId(), {
    game_id: uuid(), pack_id: null, phase: 'lobby',
    round_number: 0, question_index: 0,
    timer_started_at: null, reveal: false, completed_rounds: [],
    // разбивка команд показывается ОДИН раз: на следующей игре она не нужна
    random_groups: [], jeopardy_opened: [], melody: {},
  })
}

/** Шаг финала. Хранится в question_index сессии — так им можно рулить
 *  и с проектора, и с телефона ведущего (важно для награждения в баре). */
export async function setFinaleStep(step: number) {
  await room.patchSession(getRoomId(), { question_index: step })
}

/** Сценарий финала: 'show' — нарезка раундов, 'bar' — ручное награждение. */
export async function setFinaleMode(mode: 'show' | 'bar') {
  await room.patchSession(getRoomId(), { reveal: mode === 'bar', question_index: 0 })
}

/** Удалить команду вместе с её ответами (ведущий ошибся при вводе). */
export async function deleteTeam(teamId: string) {
  await room.deleteAnswers({ team_id_in: [teamId] })
  await room.deleteTeam(teamId)
}

/** Переименовать команду — на бумаге название часто уточняют по ходу. */
export async function renameTeam(teamId: string, name: string) {
  await room.patchTeam(teamId, { name })
}

/** Новая игра С ПОЛНОЙ ОЧИСТКОЙ.
 *  Обычный resetGame просто выдаёт новый game_id — старые ответы и команды
 *  остаются в базе навсегда и копятся от игры к игре. Здесь они удаляются.
 *  Действие необратимо: истории прошлых игр не останется. */
export async function resetGameHard() {
  const roomId = getRoomId()
  const s = await room.readSession(roomId)
  const gameId = s?.game_id
  if (gameId) {
    // ответы удаляем ПЕРВЫМИ: на них ссылаются оценки.
    // deleteAnswers возвращает число ОСТАВШИХСЯ строк — ей и проверяем.
    const aLeft = await room.deleteAnswers({ game_id: gameId })

    // Команды по game_id массово транспорт не умеет (deleteTeam — по
    // одному id, см. transport/types.ts) — оставлено прямым вызовом
    // Supabase, как и было; проверка «реально ли удалилось» — той же
    // формой count/head, что и раньше. При запрещающей политике RLS
    // Postgres не отдаёт ошибку — он просто не видит строк, и удаление
    // «проходит», ничего не удалив. Без этой проверки кнопка врала бы
    // об успехе.
    await supabase.from('teams').delete().eq('game_id', gameId)
    const { count: tLeft } = await supabase.from('teams')
      .select('id', { count: 'exact', head: true }).eq('game_id', gameId)

    if (aLeft > 0 || (tLeft ?? 0) > 0) {
      throw new Error(
        `Очистка не сработала: осталось ответов ${aLeft}, команд ${tLeft ?? '?'}. `
        + 'База запрещает удаление. Выполни миграцию supabase/migrations/0004_hard_reset.sql '
        + 'в SQL-редакторе Supabase и повтори.')
    }
  }
  // Чистим и ОСИРОТЕВШИЕ данные прошлых игр: обычный сброс лишь выдавал
  // новый game_id, а строки со старыми id оставались в базе навсегда.
  await purgeOldGames()
  await resetGame()
}

/** Удалить ответы и команды игр, которых больше нет ни в одной комнате.
 *  Кросс-игровая чистка по НЕ-списку (`not in`) — вне формы 13 операций
 *  транспорта (deleteAnswers бьёт по одному game_id или списку team_id, не
 *  по отрицанию списка game_id) и вне отдельной комнаты вообще: работает
 *  сразу по всем комнатам. Оставлено прямым Supabase-вызовом. */
export async function purgeOldGames() {
  const { data: sessions } = await supabase.from('game_sessions').select('game_id')
  const live = (sessions ?? []).map(r => r.game_id).filter(Boolean) as string[]
  if (live.length === 0) return
  const list = `(${live.map(id => `"${id}"`).join(',')})`
  await supabase.from('answers').delete().not('game_id', 'in', list)
  await supabase.from('teams').delete().not('game_id', 'in', list)
}
