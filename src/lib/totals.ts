// ═══ Подсчёт итогов по пакету (общий для админки и финала) ═══
import { jeopardyTile } from './jeopardyRef'
import type { Answer, Team, JeopardyTheme } from '../types/quiz'
import type { LoadedPack } from './packLoader'
import { finalQuestionOf, scoringQuestionsOf } from './thematic'
import { autocheck } from './autocheck'
import {
  scoreStandard, scoreTestStop, scoreStakesUnique, scoreStakesFree,
  scoreThematic, scoreSprint, scoreMelody, scoreRace, type ScoredAnswer,
} from './scoring'

// ── «Своя игра» (jeopardy) ───────────────────────────────────────────────
// ПРАВИЛО ОДНО: балл = ЦЕНА ПЛИТКИ. Ни скорость ответа, ни ставки, ни
// секунды заявки на него не влияют — порядок ответов в модалке нужен только
// ведущему, чтобы понимать, кто успел раньше, и в баллы он не попадает.
//
// Ответы лежат по ключу `q-t<раунд>-<плитка>` (старые игры — `q-t<плитка>`,
// он читается тоже, см. lib/jeopardyRef.ts): нумерация плиток идёт по темам
// слева направо, внутри темы — сверху вниз (тот же расчёт, что в проекторе и
// на телефоне игрока). Раунд отбирается по round_number.
//
// Засчитывается только явная оценка ведущего is_correct === true. Не
// проверенный ответ (null) даёт 0 — ровно как во всех остальных раундах,
// автопроверку тут никто не включал.
function scoreJeopardyRound(
  round: LoadedPack['rounds'][number], ri: number, teamId: string, answers: Answer[],
): number {
  const themes = (round.settings as { themes?: JeopardyTheme[] }).themes ?? []
  // сквозной номер → цена плитки
  const values: number[] = []
  for (const t of themes) for (const tile of t.tiles ?? []) values.push(Number(tile.value) || 0)

  let total = 0
  for (const a of answers) {
    if (a.team_id !== teamId) continue
    if (a.round_number !== ri) continue
    if (a.is_correct !== true) continue
    const tile = jeopardyTile(a.question_ref, ri)
    if (tile == null) continue
    total += values[tile] ?? 0
  }
  return total
}

// ── Блиц «100 вопросов» ──────────────────────────────────────────────────
// В раунде две валюты: ОЧКИ внутри раунда и БАЛЛЫ за место, которые уходят
// в общий зачёт. Считать очки здесь нельзя — они живут в blitz_state, а не
// в answers. Поэтому при завершении раунда пульт ведущего записывает уже
// готовый результат строкой `q-blitz` со ставкой, равной баллам за место.
// Тут остаётся только прочитать её.
function scoreBlitzRound(ri: number, teamId: string, answers: Answer[]): number {
  const row = answers.find(a =>
    a.team_id === teamId && a.round_number === ri && a.question_ref === 'q-blitz')
  return Number(row?.stake ?? 0)
}

export function computeTotals(
  pack: LoadedPack, teams: Team[], answers: Answer[],
  doubledByTeam: Record<string, boolean> = {}, doubledRoundIdx: number | null = null,
): Map<string, number> {
  const map = new Map<string, number>()
  for (const t of teams) {
    let total = 0
    pack.rounds.forEach((round, ri) => {
      if (round.off_scoreboard) return
      // «бумажный» режим: админ вводит баллы вручную — они лежат отдельной записью
      const paper = answers.find(x => x.team_id === t.id && x.question_ref === `q-paper-${ri}`)
      if (paper) { total += Number(paper.stake ?? 0); return }
      // мелодия: ответы живут не в вопросах, а по ключам q-mel-* (ставки -bid не считаем)
      if (round.mechanic === 'melody') {
        const rows: ScoredAnswer[] = answers
          .filter(x => x.team_id === t.id && x.round_number === ri
            && x.question_ref.startsWith('q-mel-') && !x.question_ref.endsWith('-bid'))
          .map((a, qi) => {
            // секунды заявки лежат в парной записи «…-bid»: они спасают балл,
            // если ответ отметили верным, а ставку не проставили
            const bidRow = answers.find(x => x.team_id === t.id
              && x.question_ref === `${a.question_ref}-bid`)
            const bidSeconds = bidRow ? Number(bidRow.answer_text) || null : null
            return { questionIndex: qi, isCorrect: a.is_correct,
                     stake: a.stake ?? null, bidSeconds }
          })
        total += scoreMelody(rows)
        return
      }
      // своя игра: балл = цена плитки, см. scoreJeopardyRound
      if (round.mechanic === 'jeopardy') {
        total += scoreJeopardyRound(round, ri, t.id, answers)
        return
      }
      if (round.mechanic === 'blitz') {
        total += scoreBlitzRound(ri, t.id, answers)
        return
      }
      if (round.mechanic === 'race') {
        const rows: ScoredAnswer[] = answers
          .filter(x => x.team_id === t.id && x.question_ref === `q-race-${ri}`)
          .map((a, qi) => ({ questionIndex: qi, isCorrect: a.is_correct, stake: a.stake ?? null }))
        total += scoreRace(rows)
        return
      }
      // Финальный вопрос тематического раунда — НЕ обычный вопрос: он лишь
      // решает, удваивать ли раунд. Раньше он и сам приносил баллы, и потом
      // всё удваивалось — отсюда 18 очков там, где максимум 10.
      const scoringQuestions = round.mechanic === 'thematic_x2'
        ? scoringQuestionsOf(round.questions)
        : round.questions

      const rows: ScoredAnswer[] = scoringQuestions.map((q, qi) => {
        const a = answers.find(x => x.team_id === t.id && x.question_ref === `q-${q.id}`)
        return {
          questionIndex: qi,
          isCorrect: a ? (a.is_correct ?? autocheck(q.answer, a.answer_text)) : null,
          stake: a?.stake ?? null,
        }
      })
      const s = round.settings as Record<string, unknown>
      switch (round.mechanic) {
        case 'test_stop': total += scoreTestStop(rows); break
        case 'stakes_unique': total += scoreStakesUnique(rows); break
        case 'stakes_free': total += scoreStakesFree(rows); break
        case 'thematic_x2': {
          // удвоение решает ответ команды на финальный вопрос раунда:
          // отдельного «ручного удвоения» в игре нет, флаг никто не передавал
          const fin = finalQuestionOf(round.questions)
          const finAns = fin
            ? answers.find(x => x.team_id === t.id && x.question_ref === `q-${fin.id}`)
            : undefined
          const doubled = fin
            ? (finAns ? (finAns.is_correct ?? autocheck(fin.answer, finAns.answer_text)) === true : false)
            : (ri === doubledRoundIdx ? !!doubledByTeam[t.id] : false)
          total += scoreThematic(rows, doubled)
          break
        }
        case 'sprint':
          total += scoreSprint(rows,
            (s.pointsPerQuestion as number | undefined) ?? 2,
            (s.allCorrectBonus as number | undefined) ?? 5); break
        default:
          total += scoreStandard(rows, (s.pointsPerQuestion as number | undefined) ?? 1)
      }
    })
    map.set(t.id, total)
  }
  return map
}

/** Баллы по каждому раунду отдельно (для табло с разбивкой). */
export function computeRoundScores(
  pack: LoadedPack, teams: Team[], answers: Answer[],
): Map<string, number[]> {
  const map = new Map<string, number[]>()
  for (const t of teams) {
    const per: number[] = []
    pack.rounds.forEach((round, ri) => {
      const paper = answers.find(x => x.team_id === t.id && x.question_ref === `q-paper-${ri}`)
      if (paper) { per.push(Number(paper.stake ?? 0)); return }
      if (round.mechanic === 'melody') {
        const rows: ScoredAnswer[] = answers
          .filter(x => x.team_id === t.id && x.round_number === ri
            && x.question_ref.startsWith('q-mel-') && !x.question_ref.endsWith('-bid'))
          .map((a, qi) => {
            // секунды заявки лежат в парной записи «…-bid»: они спасают балл,
            // если ответ отметили верным, а ставку не проставили
            const bidRow = answers.find(x => x.team_id === t.id
              && x.question_ref === `${a.question_ref}-bid`)
            const bidSeconds = bidRow ? Number(bidRow.answer_text) || null : null
            return { questionIndex: qi, isCorrect: a.is_correct,
                     stake: a.stake ?? null, bidSeconds }
          })
        per.push(scoreMelody(rows))
        return
      }
      // своя игра: балл = цена плитки, см. scoreJeopardyRound
      if (round.mechanic === 'jeopardy') {
        per.push(scoreJeopardyRound(round, ri, t.id, answers))
        return
      }
      if (round.mechanic === 'blitz') {
        per.push(scoreBlitzRound(ri, t.id, answers))
        return
      }
      if (round.mechanic === 'race') {
        const rows: ScoredAnswer[] = answers
          .filter(x => x.team_id === t.id && x.question_ref === `q-race-${ri}`)
          .map((a, qi) => ({ questionIndex: qi, isCorrect: a.is_correct, stake: a.stake ?? null }))
        per.push(scoreRace(rows))
        return
      }
      // Финальный вопрос тематического раунда — НЕ обычный вопрос: он лишь
      // решает, удваивать ли раунд. Раньше он и сам приносил баллы, и потом
      // всё удваивалось — отсюда 18 очков там, где максимум 10.
      const scoringQuestions = round.mechanic === 'thematic_x2'
        ? scoringQuestionsOf(round.questions)
        : round.questions

      const rows: ScoredAnswer[] = scoringQuestions.map((q, qi) => {
        const a = answers.find(x => x.team_id === t.id && x.question_ref === `q-${q.id}`)
        return {
          questionIndex: qi,
          isCorrect: a ? (a.is_correct ?? autocheck(q.answer, a.answer_text)) : null,
          stake: a?.stake ?? null,
        }
      })
      const s = round.settings as Record<string, unknown>
      let v = 0
      switch (round.mechanic) {
        case 'test_stop': v = scoreTestStop(rows); break
        case 'stakes_unique': v = scoreStakesUnique(rows); break
        case 'stakes_free': v = scoreStakesFree(rows); break
        case 'thematic_x2': {
          // раньше колонка раунда показывала базу БЕЗ удвоения, а в Σ удвоение
          // уже входило — строка не сходилась сама с собой. Логика та же, что
          // в computeTotals: удваивает ответ на финальный вопрос раунда.
          const fin = finalQuestionOf(round.questions)
          const finAns = fin
            ? answers.find(x => x.team_id === t.id && x.question_ref === `q-${fin.id}`)
            : undefined
          const doubled = fin && finAns
            ? (finAns.is_correct ?? autocheck(fin.answer, finAns.answer_text)) === true
            : false
          v = scoreThematic(rows, doubled)
          break
        }
        case 'sprint': v = scoreSprint(rows,
          (s.pointsPerQuestion as number | undefined) ?? 2,
          (s.allCorrectBonus as number | undefined) ?? 5); break
        default: v = scoreStandard(rows, (s.pointsPerQuestion as number | undefined) ?? 1)
      }
      per.push(v)
    })
    map.set(t.id, per)
  }
  return map
}
