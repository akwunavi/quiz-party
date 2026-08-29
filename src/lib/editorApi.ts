// ═══ CRUD редактора + журнал правок ═══
import { supabase } from './supabase'
import type { Pack, RoundBase, Question, MechanicKey } from '../types/quiz'
import type { LoadedPack } from './packLoader'

async function log(entity: string, entity_id: string, action: string, diff?: unknown) {
  const { data } = await supabase.auth.getUser()
  if (!data.user) return
  await supabase.from('edit_log').insert({
    editor: data.user.id, entity, entity_id, action, diff: diff ?? null,
  })
}

// ── Пакеты ──
export async function createPack(name: string): Promise<Pack> {
  const { data, error } = await supabase.from('packs')
    .insert({ name }).select().single()
  if (error) throw error
  void log('pack', data.id, 'create', { name })
  return data as Pack
}

export async function renamePack(id: string, name: string) {
  const { error } = await supabase.from('packs').update({ name }).eq('id', id)
  if (error) throw error
  void log('pack', id, 'update', { name })
}

export async function setPackStatus(id: string, status: Pack['status']) {
  const { error } = await supabase.from('packs').update({ status }).eq('id', id)
  if (error) throw error
  void log('pack', id, 'status', { status })
}

export async function setPackSettings(id: string, settings: Record<string, unknown>) {
  const { error } = await supabase.from('packs').update({ settings }).eq('id', id)
  if (error) throw error
  void log('pack', id, 'update', { settings: Object.keys(settings) })
}

export async function setPackTheme(id: string, theme: string) {
  const { error } = await supabase.from('packs').update({ theme }).eq('id', id)
  if (error) throw error
}

/** Дублирование пакета целиком (раунды + вопросы). */
export async function duplicatePack(id: string): Promise<Pack> {
  const { data: src } = await supabase.from('packs').select('*').eq('id', id).single()
  const { data: rounds } = await supabase.from('pack_rounds')
    .select('*').eq('pack_id', id).order('position')
  const copy = await createPack(`${src!.name} (копия)`)
  for (const r of rounds ?? []) {
    const { data: newRound, error } = await supabase.from('pack_rounds').insert({
      ...stripIds(r), pack_id: copy.id,
    }).select().single()
    if (error) throw error
    const { data: qs } = await supabase.from('pack_questions')
      .select('*').eq('round_id', r.id).order('position')
    for (const q of qs ?? []) {
      await supabase.from('pack_questions').insert({ ...stripIds(q), round_id: newRound.id })
    }
  }
  void log('pack', copy.id, 'duplicate', { from: id })
  return copy
}

function stripIds<T extends { id?: string }>(row: T): Omit<T, 'id'> {
  const { id: _id, ...rest } = row
  return rest
}

// ── Раунды ──
/** Создать раунд.
 *
 *  Позицию считаем ЗДЕСЬ, как максимум + 1, а не берём количество раундов
 *  из интерфейса. Позиции не обязаны начинаться с нуля и идти подряд:
 *  после удалений и перестановок в реальных пакетах встречается [1,2] и
 *  [1..6]. При двух раундах с позициями [1,2] «количество» давало 2 —
 *  позиция занята, и вставка падала с 409 duplicate key.
 *
 *  Аргумент position оставлен для совместимости с вызовами, но
 *  игнорируется: единственный источник истины — сама таблица. */
export async function createRound(pack_id: string, _position: number, mechanic: MechanicKey, title: string) {
  const { data: maxRow } = await supabase.from('pack_rounds')
    .select('position').eq('pack_id', pack_id)
    .order('position', { ascending: false }).limit(1).maybeSingle()
  const position = ((maxRow as { position?: number } | null)?.position ?? -1) + 1

  const defaults: Record<string, unknown> = mechanic === 'stakes_unique'
    ? { stakesValues: [0, 1, 2, 3, 4, 5] }
    : mechanic === 'stakes_free' ? { stakesValues: [0, 2] }
    : mechanic === 'jeopardy' ? { themes: [] }
    : mechanic === 'crossword' ? { grid: null }
    : mechanic === 'sprint'
      ? { pointsPerQuestion: 2, allCorrectBonus: 5, startDelaySec: 5, afterTimerSec: 5 }
    : mechanic === 'race'
      ? { dogs: ['Френк', 'Батон', 'Пельмень', 'Турбо', 'Ракета'], betSec: 30, raceSec: 18 }
    : mechanic === 'melody'
      ? { themes: [], spinSec: 5, bidSec: 10, answerSec: 30, passAnswerSec: 10 }
    : mechanic === 'blitz'
      ? { teamSeconds: 60, timeoutPenalty: 10 }
    : {}
  const { data, error } = await supabase.from('pack_rounds').insert({
    pack_id, position, mechanic, title_lines: [title.toUpperCase()],
    rules: [], settings: defaults,
    timer_seconds: mechanic === 'sprint' ? 120 : 30,
    answers_reveal: 'after_round',
  }).select().single()
  if (error) throw error
  void log('round', data.id, 'create', { mechanic })
  return data as RoundBase
}

export async function updateRound(id: string, patch: Partial<RoundBase>) {
  const { error } = await supabase.from('pack_rounds').update(patch).eq('id', id)
  if (error) throw error
  void log('round', id, 'update', patch)
}

export async function swapRounds(a: RoundBase, b: RoundBase) {
  // unique(pack_id, position): через временную позицию
  await updateRound(a.id, { position: -1 })
  await updateRound(b.id, { position: a.position })
  await updateRound(a.id, { position: b.position })
}

export async function deleteRound(id: string) {  // только owner (RLS)
  const { error } = await supabase.from('pack_rounds').delete().eq('id', id)
  if (error) throw error
}

// ── Вопросы ──
export type NewQuestionMode = 'free_text' | 'crossword_word' | 'choice'

export function defaultModeFor(mechanic: string): NewQuestionMode {
  if (mechanic === 'crossword') return 'crossword_word'
  if (mechanic === 'test_stop' || mechanic === 'stakes_unique') return 'choice'
  return 'free_text'
}

export async function createQuestion(round_id: string, mode: NewQuestionMode = 'free_text') {
  // позиция: max по всем (включая скрытые) + 1 — иначе конфликт unique(round_id, position)
  const { data: maxRow } = await supabase.from('pack_questions')
    .select('position').eq('round_id', round_id)
    .order('position', { ascending: false }).limit(1).maybeSingle()
  const position = (maxRow?.position ?? -1) + 1
  const answer = mode === 'crossword_word'
    ? { mode, word: '' }
    : mode === 'choice'
      ? { mode, choices: ['А', 'Б', 'В', 'Г'].map(k => ({ key: k, text: '' })), correct_choice: '', display: '' }
      : { mode, correct: '', display: '' }
  const { data, error } = await supabase.from('pack_questions').insert({
    round_id, position, answer,
  }).select().single()
  if (error) throw error
  void log('question', data.id, 'create')
  return data as Question
}

export async function deleteQuestion(id: string) {  // только owner (RLS)
  const { error } = await supabase.from('pack_questions').delete().eq('id', id)
  if (error) throw error
  void log('question', id, 'update', { deleted: true })
}

export async function updateQuestion(id: string, patch: Partial<Question>) {
  const { error } = await supabase.from('pack_questions').update(patch).eq('id', id)
  if (error) throw error
  void log('question', id, 'update', { fields: Object.keys(patch) })
}

export async function hideQuestion(id: string, hidden: boolean) {
  const { error } = await supabase.from('pack_questions').update({ hidden }).eq('id', id)
  if (error) throw error
  void log('question', id, hidden ? 'hide' : 'restore')
}

// ═══ БАНК ВОПРОСОВ ═══
// Банк — пакет со статусом 'bank'. Его раунды работают как рубрики
// («кино», «музыка», «про город»), а вопросы копируются в рабочие пакеты.
// Копируются, а НЕ переносятся: вопрос должен остаться в банке для будущих игр.

/** Найти банк или создать, если его ещё нет. Банк один на всех. */
export async function getOrCreateBank(): Promise<Pack> {
  const { data } = await supabase.from('packs').select('*')
    .eq('status', 'bank').limit(1).maybeSingle()
  if (data) return data as Pack
  const { data: created, error } = await supabase.from('packs')
    .insert({ name: 'Банк вопросов', status: 'bank' }).select().single()
  if (error) throw error
  return created as Pack
}

/** Скопировать вопрос в конец указанного раунда (в любую сторону: банк ⇄ пакет). */
export async function copyQuestionTo(questionId: string, targetRoundId: string) {
  const { data: q, error: e1 } = await supabase.from('pack_questions')
    .select('*').eq('id', questionId).single()
  if (e1) throw e1
  const { data: maxRow } = await supabase.from('pack_questions')
    .select('position').eq('round_id', targetRoundId)
    .order('position', { ascending: false }).limit(1).maybeSingle()
  const src = q as Question & { service?: unknown; is_final_question?: boolean }
  const { data, error } = await supabase.from('pack_questions').insert({
    round_id: targetRoundId,
    position: (maxRow?.position ?? -1) + 1,
    question_text: src.question_text,
    // media копируем ССЫЛКАМИ: файл остаётся в хранилище исходного пакета,
    // повторной загрузки не требуется
    media: src.media,
    answer: src.answer,
    answer_note: src.answer_note,
    service: src.service ?? {},
    is_final_question: src.is_final_question ?? false,
  }).select().single()
  if (error) throw error
  void log('question', data.id, 'duplicate', { from: questionId })
  return data as Question
}

/** ПЕРЕНЕСТИ вопрос в банк: копия в рубрику + удаление из раунда.
 *  Порядок важен: сначала успешная копия, только потом удаление —
 *  иначе при обрыве связи вопрос пропал бы совсем. */
export async function moveQuestionToBank(
  questionId: string, bankRoundId: string, canDelete: boolean,
) {
  await copyQuestionTo(questionId, bankRoundId)
  if (canDelete) await deleteQuestion(questionId)
  else await hideQuestion(questionId, true)   // у редактора нет прав на удаление
}

/** Поменять два вопроса местами. Как и у раундов, через временную позицию:
 *  на паре (round_id, position) висит unique, прямой обмен упрётся в него. */
export async function swapQuestions(
  a: { id: string; position: number }, b: { id: string; position: number },
) {
  await updateQuestion(a.id, { position: -1 } as never)
  await updateQuestion(b.id, { position: a.position } as never)
  await updateQuestion(a.id, { position: b.position } as never)
}

/** Выгрузка пакета в CSV для Excel.
 *  Excel не понимает JSON без плясок, поэтому основной формат — таблица.
 *  BOM в начале обязателен: без него Excel открывает кириллицу кракозябрами. */
export { exportPackCsv } from './exportCsv'

/** Выгрузка пакета в JSON — страховка перед удалением медиа или раунда. */
export function exportPackJson(pack: LoadedPack) {
  return JSON.stringify({
    exported_at: new Date().toISOString(),
    pack: { name: pack.name, theme: pack.theme, settings: pack.settings },
    rounds: pack.rounds.map(r => ({
      title: r.title_lines.join(' '), mechanic: r.mechanic,
      timer_seconds: r.timer_seconds, off_scoreboard: r.off_scoreboard,
      rules: r.rules, settings: r.settings,
      questions: r.questions.map(q => ({
        position: q.position, text: q.question_text, answer: q.answer,
        note: q.answer_note, media: q.media, hidden: q.hidden,
        played_at: q.played_at,
      })),
    })),
  }, null, 2)
}

/** Отметить вопрос отыгранным. Ставится автоматически в момент ПОКАЗА —
 *  так отметка остаётся, даже если игра прервалась на середине.
 *  Ошибку глушим: провал отметки не должен ломать ход раунда. */
export async function markPlayed(id: string): Promise<void> {
  await supabase.from('pack_questions')
    .update({ played_at: new Date().toISOString() }).eq('id', id)
}
