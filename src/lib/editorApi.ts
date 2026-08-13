// ═══ CRUD редактора + журнал правок ═══
import { supabase } from './supabase'
import type { Pack, RoundBase, Question, MechanicKey } from '../types/quiz'

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
export async function createRound(pack_id: string, position: number, mechanic: MechanicKey, title: string) {
  const defaults: Record<string, unknown> = mechanic === 'stakes_unique'
    ? { stakesValues: [0, 1, 2, 3, 4, 5] }
    : mechanic === 'stakes_free' ? { stakesValues: [0, 2] }
    : mechanic === 'jeopardy' ? { themes: [] }
    : mechanic === 'crossword' ? { grid: null }
    : mechanic === 'sprint'
      ? { pointsPerQuestion: 2, allCorrectBonus: 5, startDelaySec: 5, afterTimerSec: 5 }
    : mechanic === 'melody'
      ? { themes: [], spinSec: 10, bidSec: 10, answerSec: 30, passAnswerSec: 10 }
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
