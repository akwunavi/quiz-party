// ═══ ПЕРЕХОДЫ ПО ИГРЕ «ОТКУДА ЖМУТ» (9.78) ═══
// Симптом с живой игры: на последнем вопросе раунда ведущий жмёт «Далее»
// (ждёт экран «Отвечайте»), а открывается 7-й/8-й/9-й вопрос — раунд
// откатывается назад.
//
// Причина: пульт на телефоне знает, где игра, только по опросу раз в 2 с,
// а телефон в кармане/с погасшим экраном этот опрос замораживает. Ведущий
// листает вопросы на проекторе, потом берёт телефон и жмёт «Далее» — а
// пульт всё ещё думает, что открыт, скажем, 6-й вопрос, и пишет «перейти
// на 7-й». Та же беда у автопролистывания проектора, если его таймер
// сработал на устаревшем снимке.
//
// Лечение: переход пишется, только если СВЕЖЕЕ состояние в базе всё ещё
// там, откуда жали (та же фаза, тот же раунд, тот же вопрос). Иначе запись
// не делается вовсе, а ведущему говорится, что экран уже ушёл дальше —
// пульт подтянет актуальное состояние за пару секунд. Проверка и запись —
// одной защищённой (CAS) записью по state_rev (миграция 0014): между
// «прочитал» и «записал» никто не успеет вклиниться. Без миграции —
// перечитывание прямо перед записью (окно гонки — доли секунды, а не
// минуты замороженного телефона).
import { getRoomId } from './room'
import { room } from './transport'
import type { GameState } from '../types/quiz'
import type { SessionPatch } from './transport/types'

/** Где была игра, когда ведущий нажал кнопку. Поля, которых нет, не
 *  сравниваются. */
export interface NavFrom {
  phase: string
  round_number?: number
  question_index?: number
}

export function navMatches(s: Pick<GameState, 'phase' | 'round_number' | 'question_index'>,
  from: NavFrom): boolean {
  return s.phase === from.phase
    && (from.round_number == null || s.round_number === from.round_number)
    && (from.question_index == null || s.question_index === from.question_index)
}

/** Снимок экрана → «откуда жмём». */
export function navFrom(gs: Pick<GameState, 'phase' | 'round_number' | 'question_index'>): NavFrom {
  return { phase: gs.phase, round_number: gs.round_number, question_index: gs.question_index }
}

/** Свежее состояние уже совпадает с целью перехода. Время старта таймера
 *  не сравниваем — оно у каждого вызова своё. */
export function targetReached(cur: GameState, patch: SessionPatch): boolean {
  const keys = Object.keys(patch).filter(k => k !== 'timer_started_at' && k !== 'updated_at')
  if (!keys.includes('phase') && !keys.includes('reveal')) return false
  const c = cur as unknown as Record<string, unknown>
  return keys.every(k => JSON.stringify(c[k] ?? null) === JSON.stringify(patch[k] ?? null))
}

export class StaleNavError extends Error {
  constructor() {
    super('экран уже ушёл дальше — подожди пару секунд, пока пульт обновится, и проверь, где игра')
    this.name = 'StaleNavError'
  }
}

/** Записать переход, только если игра всё ещё в `from`. Бросает
 *  StaleNavError, если нет (запись не сделана). */
export async function patchSessionFrom(from: NavFrom, patch: SessionPatch, maxAttempts = 3): Promise<void> {
  const roomId = getRoomId()
  let cur = await room.readSession(roomId)
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Игра уже ровно там, куда ведёт этот переход, — значит, он уже прошёл:
    // повтор после потерянного ответа (слабый Wi-Fi, ретрай по таймауту)
    // или второй тап той же кнопки. Это успех, а не «экран ушёл дальше»:
    // иначе ведущий, поверив надписи, нажал бы ещё раз и перескочил
    // вопрос (ревью 9.78, находка 1).
    if (cur && targetReached(cur, patch)) return
    if (!cur || !navMatches(cur, from)) throw new StaleNavError()
    if (typeof cur.state_rev !== 'number') {        // миграция 0014 не прогнана
      await room.patchSession(roomId, patch)
      return
    }
    const r = await room.casSession(roomId, cur.state_rev, patch)
    if (r.ok) return
    // между чтением и записью кто-то писал (старт таймера, показ ответа…) —
    // если игра всё ещё там же, пробуем на свежей версии
    cur = r.current
  }
  throw new StaleNavError()
}

/** Для кнопок проектора и авто-переходов: устаревший переход просто не
 *  делается (экран сам подтянет актуальное через пару секунд), прочие
 *  ошибки — в консоль, как раньше. */
export function quietStale(err: unknown): void {
  if (err instanceof StaleNavError) return
  console.warn(err instanceof Error ? err.message : err)
}
