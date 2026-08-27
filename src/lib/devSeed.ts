import { supabase } from './supabase'
import { registerTeam } from './gameActions'
import { computeTotals } from './totals'
import type { LoadedPack } from './packLoader'
import type { Answer, Question, Team, JeopardyTheme } from '../types/quiz'

// ═══ СИД ДЛЯ РЕПЕТИЦИЙ (только с ?dev=1 в адресе) ═══
//
// Перенос devSeed из старого проекта под новую схему. Идея та же: прогнать
// любой раунд за минуту, без регистрации с телефонов и ручного ввода.
// Переписан, а не скопирован: там были ключи вида `r4-q0-1`, номер раунда
// зашит числом, а тип вопроса определялся по наличию полей. У нас ключи
// `q-<uuid>` и `q-t<номер плитки>`, тип лежит в `answer.mode`, механик
// больше, добавились кроссворд и ребусы.
//
// Что сохранено из старого по смыслу:
//  • ответы форматно-осознанные — под каждый mode валидный ответ;
//  • перекос ~65% в сторону верного: проверяются обе ветки, ✓ и ✗;
//  • ставки по правилам механики;
//  • upsert пачками, повторный запуск перезаписывает и не плодит дублей;
//  • трогаются ТОЛЬКО демо-команды, отобранные по именам.
//
// Данные пишутся в боевую базу с текущим game_id — значит уезжают вместе с
// игрой при полном сбросе (resetGameHard удаляет answers и teams по game_id).

const DEMO_NAMES = ['Тест-1', 'Тест-2', 'Тест-3']
const DEMO_COLORS = ['#14b8a6', '#f43f5e', '#eab308']
const BATCH = 50

export const isDevMode = () =>
  typeof window !== 'undefined' && window.location.href.includes('dev=1')

export const isDemoTeam = (t: { name: string }) => DEMO_NAMES.includes(t.name)

/** Создать демо-команды, которых ещё нет в этой игре. */
export async function seedTeams(gameId: string): Promise<number> {
  const { data: existing } = await supabase.from('teams')
    .select('name').eq('game_id', gameId)
  const have = new Set((existing ?? []).map(t => t.name))
  let created = 0
  for (let i = 0; i < DEMO_NAMES.length; i++) {
    if (have.has(DEMO_NAMES[i])) continue
    await registerTeam(DEMO_NAMES[i], DEMO_COLORS[i], gameId)
    created++
  }
  return created
}

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)]
const shuffle = <T,>(a: T[]): T[] => [...a].sort(() => Math.random() - 0.5)
/** «Скорее верно»: смесь, а не «все правильно» и не «всё наугад». */
const lucky = () => Math.random() < 0.65

const WRONG_TEXT = ['не знаем', 'вариант наугад', 'тестовый ответ', '42']

/** Ответ под формат вопроса. Возвращает и текст, и признак «задумано верным» —
 *  второй нужен, чтобы независимо посчитать ожидаемые баллы. */
function genAnswer(q: Question, correct: boolean): string {
  const a = q.answer
  switch (a.mode) {
    case 'choice':
      if (correct) return a.correct_choice
      return pick(a.choices.filter(c => c.key !== a.correct_choice).map(c => c.key))
        ?? a.correct_choice
    case 'order':
      if (correct) return a.correct_order
      return shuffle(a.correct_order.split('')).join('')
    case 'match':
      if (correct) return a.correct_pairs.join(',')
      return shuffle(a.correct_pairs).join(',')
    case 'crossword_word':
      return correct ? a.word : shuffle(a.word.split('')).join('')
    case 'free_text': {
      const first = (a.correct ?? '').split(' / ')[0]?.trim()
      if (correct && first && first !== '—') return first
      return pick(WRONG_TEXT)
    }
    default:
      return pick(WRONG_TEXT)
  }
}

type Row = {
  team_id: string; game_id: string; question_ref: string
  round_number: number; answer_text: string; is_correct?: boolean | null
  stake?: number; updated_at: string
}

/** Заполнить ответы демо-команд для указанного раунда.
 *  Возвращает строки — по ним же считается ожидаемая сумма. */
export async function seedRoundAnswers(
  pack: LoadedPack, roundNumber: number, gameId: string,
): Promise<{ rows: number; teams: number }> {
  const round = pack.rounds[roundNumber]
  if (!round) return { rows: 0, teams: 0 }

  const { data: allTeams } = await supabase.from('teams')
    .select('*').eq('game_id', gameId)
  const demo = ((allTeams ?? []) as Team[]).filter(isDemoTeam)
  if (demo.length === 0) return { rows: 0, teams: 0 }

  const rows: Row[] = []
  const now = () => new Date().toISOString()

  if (round.mechanic === 'jeopardy') {
    // «Своя игра»: ответ на каждую плитку, ключ — сквозной номер.
    // Оценку ведущего проставляем сразу: без is_correct балл равен нулю,
    // и проверять было бы нечего.
    const themes = (round.settings as { themes?: JeopardyTheme[] }).themes ?? []
    let flat = 0
    for (const theme of themes) {
      for (const tile of theme.tiles ?? []) {
        for (const team of demo) {
          const ok = lucky()
          rows.push({
            team_id: team.id, game_id: gameId,
            question_ref: `q-t${flat}`, round_number: roundNumber,
            answer_text: ok ? (tile.correct ?? 'ответ') : pick(WRONG_TEXT),
            is_correct: ok, updated_at: now(),
          })
        }
        flat++
      }
    }
  } else {
    const stakesPool = (round.settings as { stakesValues?: number[] }).stakesValues
    const questions = round.questions.filter(q => !q.hidden)
    for (const team of demo) {
      // уникальные ставки — своя перетасовка на команду
      const uniq = round.mechanic === 'stakes_unique' && stakesPool
        ? shuffle(stakesPool) : null
      questions.forEach((q, qi) => {
        const ok = lucky()
        const row: Row = {
          team_id: team.id, game_id: gameId,
          question_ref: `q-${q.id}`, round_number: roundNumber,
          answer_text: genAnswer(q, ok), is_correct: ok, updated_at: now(),
        }
        if (uniq) row.stake = uniq[qi % uniq.length]
        // свободные ставки: команды ставят не всегда
        else if (stakesPool && Math.random() < 0.4) {
          row.stake = pick(stakesPool.filter(v => v > 0))
        }
        rows.push(row)
      })
    }
  }

  for (let i = 0; i < rows.length; i += BATCH) {
    const { error } = await supabase.from('answers')
      .upsert(rows.slice(i, i + BATCH), { onConflict: 'team_id,question_ref' })
    if (error) throw error
  }
  return { rows: rows.length, teams: demo.length }
}

// ── Сверка начислений ───────────────────────────────────────────────────
// Главное, чего в старом devSeed не было. Считаем ожидаемую сумму
// НЕЗАВИСИМО от totals.ts — прямо по правилам механики — и сравниваем.
// Если расчёт разъедется, это видно здесь, а не на игре при гостях.

export type CheckRow = {
  team: string; expected: number; actual: number; diff: number
}

/** Ожидаемые баллы команды за раунд, посчитанные «руками». */
function expectedForRound(
  round: LoadedPack['rounds'][number], roundNumber: number,
  teamId: string, answers: Answer[],
): number {
  if (round.off_scoreboard) return 0
  const mine = answers.filter(a => a.team_id === teamId && a.round_number === roundNumber)

  if (round.mechanic === 'jeopardy') {
    const themes = (round.settings as { themes?: JeopardyTheme[] }).themes ?? []
    const values: number[] = []
    for (const t of themes) for (const tile of t.tiles ?? []) values.push(Number(tile.value) || 0)
    let sum = 0
    for (const a of mine) {
      const m = /^q-t(\d+)$/.exec(a.question_ref)
      if (m && a.is_correct === true) sum += values[Number(m[1])] ?? 0
    }
    return sum
  }

  // Правила по механикам записаны СЛОВАМИ из описания раунда, а не срисованы
  // с кода подсчёта — в этом весь смысл сверки. Первая же версия считала
  // «балл за верный ответ» для всех, и тесты сразу показали расхождение:
  // у спринта два балла за вопрос и бонус за полный ответ, у ставок к верной
  // ставке добавляется единица, а неверная вычитается.
  const s = round.settings as {
    stakesValues?: number[]; pointsPerQuestion?: number; allCorrectBonus?: number
  }
  const graded = mine.filter(a => a.is_correct !== null)
  const right = graded.filter(a => a.is_correct === true)

  switch (round.mechanic) {
    case 'sprint': {
      const per = s.pointsPerQuestion ?? 2
      const bonus = s.allCorrectBonus ?? 5
      const total = round.questions.filter(q => !q.hidden).length
      const all = total > 0 && right.length === total && graded.length === total
      return right.length * per + (all ? bonus : 0)
    }
    case 'stakes_unique':
      // верно: ставка + 1, неверно: минус ставка
      return graded.reduce((acc, a) => acc + (a.is_correct
        ? Number(a.stake ?? 0) + 1 : -Number(a.stake ?? 0)), 0)
    case 'stakes_free':
      // со ставкой: верно +3, неверно −2; без ставки: 1 / 0
      return graded.reduce((acc, a) => {
        const st = Number(a.stake ?? 0)
        if (st > 0) return acc + (a.is_correct ? st + 1 : -st)
        return acc + (a.is_correct ? 1 : 0)
      }, 0)
    case 'melody':
      // балл записан в stake при оценке ведущим
      return right.reduce((acc, a) => acc + Number(a.stake ?? 0), 0)
    case 'crossword':
      // по баллу за каждое верно угаданное слово
      return right.length
    case 'thematic_x2': {
      // Финальный вопрос помечен флагом is_final_question в редакторе —
      // «последний по счёту» тут НЕ подходит. Своих баллов он не приносит,
      // он только решает, удваивать ли весь раунд.
      const fin = round.questions.find(q => q.is_final_question)
      const base = right.filter(a => !fin || a.question_ref !== `q-${fin.id}`).length
      const finOk = fin
        ? mine.some(a => a.question_ref === `q-${fin.id}` && a.is_correct === true)
        : false
      return finOk ? base * 2 : base
    }
    default:
      return right.length
  }
}

/** Сверить один раунд: ожидание против того, что даёт боевой подсчёт. */
export async function checkRoundScoring(
  pack: LoadedPack, roundNumber: number, gameId: string,
): Promise<CheckRow[]> {
  const [{ data: teamsData }, { data: answersData }] = await Promise.all([
    supabase.from('teams').select('*').eq('game_id', gameId),
    supabase.from('answers').select('*').eq('game_id', gameId),
  ])
  const teams = ((teamsData ?? []) as Team[]).filter(isDemoTeam)
  const answers = (answersData ?? []) as Answer[]
  const round = pack.rounds[roundNumber]
  if (!round) return []

  // боевой подсчёт по пакету из ОДНОГО этого раунда — так в сумму
  // не попадут баллы остальных раундов
  const onePack = { ...pack, rounds: [round] } as LoadedPack
  const oneRoundAnswers = answers.map(a => ({ ...a, round_number: 0 }))
    .filter((_, i) => answers[i].round_number === roundNumber)
  const actual = computeTotals(onePack, teams, oneRoundAnswers)

  return teams.map(t => {
    const expected = expectedForRound(round, roundNumber, t.id, answers)
    const got = actual.get(t.id) ?? 0
    return { team: t.name, expected, actual: got, diff: +(got - expected).toFixed(2) }
  })
}

/** Удалить ответы и команды сида. Полный сброс игры делает это сам —
 *  кнопка нужна, когда репетируешь несколько раз подряд в одной игре. */
export async function clearSeed(gameId: string): Promise<number> {
  const { data: teams } = await supabase.from('teams').select('*').eq('game_id', gameId)
  const demo = ((teams ?? []) as Team[]).filter(isDemoTeam)
  if (demo.length === 0) return 0
  const ids = demo.map(t => t.id)
  await supabase.from('answers').delete().in('team_id', ids)
  await supabase.from('teams').delete().in('id', ids)
  return demo.length
}
