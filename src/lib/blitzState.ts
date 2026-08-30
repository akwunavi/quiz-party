// ═══ БЛИЦ: СОСТОЯНИЕ РАУНДА ═══
//
// Здесь ТОЛЬКО чистые переходы состояния: никакой базы, никакого React.
// Так правила можно проверить тестами до того, как появятся экраны, и
// потом не гадать, где именно разъехались проектор и телефон.
//
// Ключевое из спеки (docs-spec/БЛИЦ.md):
//  · таймер идёт только у команды, чей ход;
//  · первые 2 секунды после показа вопроса время не тикает;
//  · три попытки на вопрос, дальше −1 очко и ход дальше;
//  · скип: −1 очко, вопрос сгорает и другим не достаётся;
//  · вопрос сгорает В МОМЕНТ ПОКАЗА;
//  · порядок ходов задан кубиком один раз, дальше по кругу;
//  · открытый вопрос доигрывается: время может кончиться, но ответ
//    засчитывается, и только потом раунд закрывается.

export const GRACE_MS = 2000        // «фора» после показа вопроса
export const MAX_ATTEMPTS = 3

export type BlitzCurrent = {
  questionId: string
  attempts: number
  /** Когда вопрос показан. Время начинает тикать через GRACE_MS. */
  shownAt: number
  /** Пауза на проверку ответа: пока не null, время стоит.
   *  Ставится АВТОМАТИЧЕСКИ, как только команда отправила ответ. */
  pausedAt?: number
  /** Что показала автопроверка последнего ответа. Ведущий может
   *  переопределить, пока идёт окно на исправление. */
  verdict?: 'ok' | 'no'
  /** Текст последнего ответа — чтобы не проверять его дважды. */
  lastAnswer?: string
}

/** Пауза между ходами: команда видит вердикт, зал успевает среагировать,
 *  и только потом выезжает следующий вопрос. */
export const NEXT_DELAY_MS = 5000

export type BlitzState = {
  order: string[]                    // teamId в порядке ходов
  turn: number                       // индекс в order
  left: Record<string, number>       // остаток мс на команду
  correct: Record<string, number>
  missed: Record<string, number>
  used: string[]                     // id сгоревших вопросов
  current: BlitzCurrent | null
  finished: boolean
  timedOutTeam?: string
}

export function initBlitz(order: string[], teamSeconds: number): BlitzState {
  const ms = Math.max(1, teamSeconds) * 1000
  return {
    order: [...order],
    turn: 0,
    left: Object.fromEntries(order.map(id => [id, ms])),
    correct: Object.fromEntries(order.map(id => [id, 0])),
    missed: Object.fromEntries(order.map(id => [id, 0])),
    used: [],
    current: null,
    finished: false,
  }
}

export const currentTeam = (s: BlitzState): string | undefined => s.order[s.turn]

/** Сколько миллисекунд списать за отрезок [shownAt … now].
 *  Фора в 2 секунды и время проверки не считаются. */
export function spentMs(cur: BlitzCurrent, now: number): number {
  const stop = cur.pausedAt ?? now
  return Math.max(0, stop - cur.shownAt - GRACE_MS)
}

/** Остаток времени команды с учётом текущего, ещё не закрытого вопроса.
 *  Нужен экранам: они показывают таймер, пока идёт ход. */
export function liveLeft(s: BlitzState, teamId: string, now: number): number {
  const base = s.left[teamId] ?? 0
  if (!s.current || currentTeam(s) !== teamId) return base
  return Math.max(0, base - spentMs(s.current, now))
}

/** Показать вопрос. Он сразу сгорает — даже если игра прервётся. */
export function showQuestion(s: BlitzState, questionId: string, now: number): BlitzState {
  return {
    ...s,
    used: s.used.includes(questionId) ? s.used : [...s.used, questionId],
    current: { questionId, attempts: 0, shownAt: now },
  }
}

/** Пауза на проверку: время команды замирает.
 *  Вызывается автоматически при поступлении ответа — по спеке таймер
 *  не должен идти, пока идёт проверка. Раньше это делал ведущий кнопкой,
 *  и время команды утекало, пока он тянулся к админке. */
export function pauseForCheck(s: BlitzState, now: number, verdict?: 'ok' | 'no',
  answerText?: string): BlitzState {
  if (!s.current) return s
  const cur = s.current
  return {
    ...s,
    current: {
      ...cur,
      pausedAt: cur.pausedAt ?? now,
      verdict: verdict ?? cur.verdict,
      lastAnswer: answerText ?? cur.lastAnswer,
    },
  }
}

/** Снять паузу: сдвигаем точку отсчёта, чтобы простой не списался. */
export function resumeAfterCheck(s: BlitzState, now: number): BlitzState {
  const cur = s.current
  if (!cur || cur.pausedAt == null) return s
  return { ...s, current: { ...cur, pausedAt: undefined, shownAt: cur.shownAt + (now - cur.pausedAt) } }
}

/** Списать потраченное и передать ход следующей команде.
 *  Если у ходившей команды время вышло — раунд закрывается, и именно она
 *  получает штраф. Открытый вопрос при этом уже доигран: сюда попадаем
 *  только после ответа или скипа. */
function endTurn(s: BlitzState, now: number): BlitzState {
  const team = currentTeam(s)
  if (!team || !s.current) return s
  const rest = Math.max(0, (s.left[team] ?? 0) - spentMs(s.current, now))
  const next: BlitzState = {
    ...s,
    left: { ...s.left, [team]: rest },
    current: null,
    turn: (s.turn + 1) % s.order.length,
  }
  if (rest <= 0) return { ...next, finished: true, timedOutTeam: team }
  return next
}

/** Верный ответ: +1 очко и ход дальше. */
export function answerCorrect(s: BlitzState, now: number): BlitzState {
  const team = currentTeam(s)
  if (!team || !s.current) return s
  return endTurn({ ...s, correct: { ...s.correct, [team]: (s.correct[team] ?? 0) + 1 } }, now)
}

/** Неверный ответ. Пока попытки есть — остаёмся на вопросе.
 *  Кончились — минус очко и ход дальше. */
export function answerWrong(s: BlitzState, now: number): BlitzState {
  const team = currentTeam(s)
  if (!team || !s.current) return s
  const attempts = s.current.attempts + 1
  if (attempts < MAX_ATTEMPTS) {
    // Вердикт ОБЯЗАН сняться вместе с попыткой. Раньше он оставался в
    // состоянии навсегда: на проекторе висело «НЕВЕРНО», у ведущего вместо
    // скипа торчала кнопка «исправить», а телефон не понимал, что можно
    // отвечать снова. Текст ответа оставляем — по нему автопроверка
    // отличает новый ответ от уже проверенного.
    return { ...s, current: { ...s.current, attempts, verdict: undefined } }
  }
  return endTurn({ ...s, missed: { ...s.missed, [team]: (s.missed[team] ?? 0) + 1 } }, now)
}

/** Скип: минус очко, вопрос уже сгорел при показе. */
export function skip(s: BlitzState, now: number): BlitzState {
  const team = currentTeam(s)
  if (!team || !s.current) return s
  return endTurn({ ...s, missed: { ...s.missed, [team]: (s.missed[team] ?? 0) + 1 } }, now)
}

/** Вопросы кончились. Раунд закрывается БЕЗ штрафа — так в спеке. */
export function finishNoQuestions(s: BlitzState): BlitzState {
  return { ...s, finished: true, current: null, timedOutTeam: undefined }
}

/** Итоговые состояния команд для расчёта очков и баллов (см. blitz.ts). */
export function toResults(s: BlitzState) {
  return s.order.map(teamId => ({
    teamId,
    correct: s.correct[teamId] ?? 0,
    missed: s.missed[teamId] ?? 0,
    timedOut: s.timedOutTeam === teamId,
    // остаток времени нужен для бонуса за скорость
    leftMs: Math.max(0, s.left[teamId] ?? 0),
  }))
}

// ── ВЫБОР СЛЕДУЮЩЕГО ВОПРОСА ────────────────────────────────────────────
// Случайный из тех, что ещё не сгорели в этой игре. Скрытые вопросы
// (pack_questions.hidden) не участвуют вовсе — это и есть «убран из банка»
// навсегда, ставится ведущим в админке.
//
// Случайность вынесена аргументом, а не берётся из Math.random(): иначе
// функцию нельзя было бы проверить тестом, а именно здесь легко ошибиться
// и начать повторять вопросы.

export type BlitzQuestion = { id: string; hidden?: boolean }

/** Сколько вопросов ещё доступно — цифра для счётчика в углу экрана. */
export function remainingCount(all: BlitzQuestion[], used: string[]): number {
  return all.filter(q => !q.hidden && !used.includes(q.id)).length
}

/** Следующий вопрос или null, если банк исчерпан. */
export function pickNext(
  all: BlitzQuestion[], used: string[], rnd: number = Math.random(),
): BlitzQuestion | null {
  const pool = all.filter(q => !q.hidden && !used.includes(q.id))
  if (pool.length === 0) return null
  const i = Math.min(pool.length - 1, Math.max(0, Math.floor(rnd * pool.length)))
  return pool[i]
}

/** Метка «команда пропустила вопрос».
 *  Скип приходит обычным ответом с этим текстом: отдельного канала связи
 *  у телефона нет, а вводить его ради одной кнопки — лишняя сложность.
 *  Текст заведомо не совпадёт с настоящим ответом. */
export const SKIP_MARK = '__skip__'
