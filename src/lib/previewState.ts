// ═══ Предпросмотр вопроса в редакторе: фиктивное состояние игры ═══
//
// Один общий пропс `preview?: PreviewCtx` в компонентах раундов — не два
// отдельных (preview + mockTeams), чтобы нельзя было включить предпросмотр
// и забыть подать команды. `undefined` = боевой режим, ничего не меняется.
//
// `previewGameState()` ВСЕГДА возвращает `game_id: ''` — вторая линия
// обороны (первая — гарды `if (preview) return` в каждом эффекте раунда):
// `useTeams('')`/`useAnswers('')` не делают сетевых запросов даже если
// где-то забыт гард (см. hooks/useTeams.ts, hooks/useAnswers.ts — ранний
// `return` в useEffect на falsy gameId).
//
// КРИТИЧНО: `getRoomId()` в редакторе — та же комната браузера, что у
// проектора/админки (localStorage общий на весь origin). Без гардов в
// каждом эффекте компонента раунда открытие предпросмотра могло бы
// записать стадию механики в ЖИВУЮ сессию текущей игры или запустить
// таймер — см. HANDOFF.md.
import { teamColor } from './teamColors'
import type { LoadedPack, LoadedRound } from './packLoader'
import type { Answer, GameState, MechanicKey, MelodyState, Team } from '../types/quiz'

export interface PreviewCtx {
  teams: Team[]
  answers: Answer[]
}

/** Ровно 4 фиктивные команды — без переключателя количества (Р2, решено
 *  ведущим): предпросмотр показывает раскладку экрана, а не тестирует,
 *  как она ведёт себя при другом числе команд. */
export function previewTeams(n = 4): Team[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `pv-${i + 1}`,
    name: `КОМАНДА ${i + 1}`,
    color: teamColor(i),
    icon: null,
    game_id: '',
    last_seen_at: new Date().toISOString(),
  }))
}

/** Стадии предпросмотра по механике: подписи для переключателя `.pv-stages`
 *  (шаг 8 плана) + служебный ключ, который передаётся в `previewGameState`.
 *  Непустой список для КАЖДОЙ механики — забытая здесь новая механика
 *  ловится тестом `previewState.test.ts`. */
export function previewStages(mech: MechanicKey): { key: string; label: string }[] {
  switch (mech) {
    case 'four_pics':
      return [
        { key: 'phase1', label: 'Фаза 1' },
        { key: 'phase2', label: 'Фаза 2' },
        { key: 'phase3', label: 'Фаза 3' },
        { key: 'review', label: 'Разбор' },
      ]
    case 'jeopardy':
      return [
        { key: 'board', label: 'Доска' },
        { key: 'tile', label: 'Плитка' },
        { key: 'answer', label: 'С ответом' },
      ]
    case 'melody':
      return [
        { key: 'board', label: 'Доска' },
        { key: 'listen', label: 'Слушаем' },
        { key: 'bidding', label: 'Ставки' },
        { key: 'bids', label: 'Показ ставок' },
        { key: 'snippet', label: 'Отрывок' },
        { key: 'answering', label: 'Ответ' },
        { key: 'reveal', label: 'Разбор' },
      ]
    case 'race':
      return [
        { key: 'betting', label: 'Ставки' },
        { key: 'running', label: 'Забег' },
        { key: 'done', label: 'Финиш' },
      ]
    // Остальные механики (standard/test_stop/rebus/stakes_unique/
    // stakes_free/thematic_x2/crossword) показывают экран вопроса ровно в
    // одной стадии, без ответа — минимальный предпросмотр раскладки (Р2).
    default:
      return [{ key: 'question', label: 'Вопрос' }]
  }
}

/** Фиктивные ответы команд — только там, где экран их показывает: разбор
 *  «3 попыток», ставки мелодии, счётчик ставок скачек. Текст правдоподобный,
 *  но однозначно ненастоящий — не должен выглядеть как реальный ответ игрока. */
export function previewAnswers(round: LoadedRound, qIndex: number, stage: string, teams: Team[]): Answer[] {
  const now = new Date().toISOString()
  const mk = (ref: string, text: string, i: number): Answer => ({
    id: `pv-a-${i}`, team_id: teams[i % teams.length]?.id ?? `pv-${i + 1}`,
    game_id: '', question_ref: ref, round_number: round.position,
    answer_text: text, stake: null, is_correct: null, updated_at: now, created_at: now,
  })
  if (round.mechanic === 'four_pics' && stage === 'review') {
    const q = round.questions[qIndex]
    return teams.map((_, i) => mk(`q-${q?.id ?? 'pv'}`, 'ПРЕДПРОСМОТР ОТВЕТА', i))
  }
  if (round.mechanic === 'race') {
    return teams.map((_, i) => mk(`q-race-${round.position}`, String((i % 5) + 1), i))
  }
  return []
}

/** Синтетический `GameState` для предпросмотра одной механики/стадии.
 *  Контракт «мешка механик» (melody) — по таблице из плана объединения
 *  предпросмотра (HANDOFF.md): каждая ветка задаёт РОВНО то поле, которое
 *  читает соответствующий Board-компонент, остальное не трогает. */
export function previewGameState(
  pack: LoadedPack, round: LoadedRound, roundIdx: number, qIndex: number, stage?: string,
): GameState {
  const q = round.questions[qIndex]
  const melody = previewMelody(round, q?.id, stage)
  return {
    id: 1,
    game_id: '',
    pack_id: pack.id,
    phase: 'question',
    round_number: roundIdx,
    question_index: qIndex,
    timer_started_at: null,
    reveal: stage === 'answer',
    completed_rounds: [],
    updated_at: new Date().toISOString(),
    melody,
  }
}

function previewMelody(round: LoadedRound, qid: string | undefined, stage?: string): MelodyState {
  if (round.mechanic === 'four_pics') {
    const s = round.settings as { p1Sec?: number }
    const phase = stage === 'phase2' ? 2 : stage === 'phase3' ? 3 : stage === 'review' ? 'review' : 1
    return { rv: { qid, phase, startedAt: undefined, phaseSec: s.p1Sec ?? 30 } }
  }
  if (round.mechanic === 'jeopardy') {
    if (stage === 'tile') return { jp: { tile: 0, answer: false } }
    if (stage === 'answer') return { jp: { tile: 0, answer: true } }
    return { jp: { tile: null } }
  }
  if (round.mechanic === 'race') {
    if (stage === 'running') return { race: { stage: 'running', seed: 12345, startedAt: new Date().toISOString() } }
    if (stage === 'done')
      return { race: { stage: 'done', seed: 12345, startedAt: new Date(Date.now() - 60_000).toISOString() } }
    return { race: { stage: 'betting' } }
  }
  if (round.mechanic === 'melody' && stage && stage !== 'board') {
    const teams = previewTeams()
    return {
      key: '0-0', stage: stage as MelodyState['stage'],
      order: [teams[0].id, teams[1].id], turn: 0, snippetSec: 5, startSec: 0, played: [],
      deadline: new Date(Date.now() + 10_000).toISOString(),
      ...(stage === 'reveal' ? { wonPts: 2, wonTeam: teams[0].id } : {}),
    }
  }
  return {}
}
