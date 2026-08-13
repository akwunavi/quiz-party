// ═══ Загрузчик пакетов: Supabase → игровой конфиг ═══
// Тянет пакет один раз при старте, кеширует в память и localStorage
// (страховка от мигания сети во время игры).

import { supabase } from './supabase'
import type { Pack, RoundBase, Question } from '../types/quiz'

export interface LoadedRound extends RoundBase {
  questions: Question[]
}
export interface LoadedPack extends Pack {
  rounds: LoadedRound[]         // отсортированы по position; нумерация = позиция в игре
}

const memCache = new Map<string, LoadedPack>()
const LS_KEY = (id: string) => `qp-pack-${id}`

export async function loadPack(packId: string, force = false, includeHidden = false): Promise<LoadedPack> {
  const cacheKey = includeHidden ? `${packId}:h` : packId
  if (!force && memCache.has(cacheKey)) return memCache.get(cacheKey)!

  try {
    const [{ data: pack, error: e1 }, { data: rounds, error: e2 }] = await Promise.all([
      supabase.from('packs').select('*').eq('id', packId).single(),
      supabase.from('pack_rounds').select('*').eq('pack_id', packId).order('position'),
    ])
    if (e1 || !pack) throw e1 ?? new Error('pack not found')
    if (e2) throw e2

    const roundIds = (rounds ?? []).map(r => r.id)
    let qQuery = supabase.from('pack_questions').select('*')
      .in('round_id', roundIds).order('position')
    if (!includeHidden) qQuery = qQuery.eq('hidden', false)
    const { data: questions, error: e3 } = roundIds.length
      ? await qQuery : { data: [], error: null }
    if (e3) throw e3

    const loaded: LoadedPack = {
      ...(pack as Pack),
      rounds: (rounds ?? []).map(r => ({
        ...(r as RoundBase),
        questions: (questions ?? []).filter(q => q.round_id === r.id) as Question[],
      })),
    }
    memCache.set(cacheKey, loaded)
    if (!includeHidden) { try { localStorage.setItem(LS_KEY(packId), JSON.stringify(loaded)) } catch { /* full */ } }
    return loaded
  } catch (err) {
    // сеть мигнула — пробуем localStorage-копию
    const cached = localStorage.getItem(LS_KEY(packId))
    if (cached) {
      const loaded = JSON.parse(cached) as LoadedPack
      memCache.set(cacheKey, loaded)
      return loaded
    }
    throw err
  }
}

/** Список пакетов для выбора на HostScreen. */
export async function listPacks(): Promise<Pack[]> {
  const { data, error } = await supabase
    .from('packs').select('*')
    .neq('status', 'archived')
    .order('updated_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Pack[]
}

/** Значение настройки раунда с фолбэком на общие настройки пакета. */
export function roundSetting<T>(pack: LoadedPack, round: LoadedRound, key: string, fallback: T): T {
  const rs = round.settings as Record<string, unknown>
  if (rs[key] !== undefined && rs[key] !== null) return rs[key] as T
  const ps = (pack.settings ?? {}) as Record<string, unknown>
  if (ps[key] !== undefined && ps[key] !== null) return ps[key] as T
  return fallback
}

/** Раунды, участвующие в зачёте (для табло/финала). */
export function scoredRounds(pack: LoadedPack): LoadedRound[] {
  return pack.rounds.filter(r => !r.off_scoreboard)
}

/** Автогенерация metaLine: «10 ВОПРОСОВ · 30 СЕК · 1 БАЛЛ» */
export function metaLine(round: LoadedRound): string {
  if (round.meta_line_override) return round.meta_line_override
  const n = round.questions.filter(q => !q.hidden).length
  const parts = [`${n} ВОПРОС${n % 10 === 1 && n % 100 !== 11 ? '' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'А' : 'ОВ'}`,
    `${round.timer_seconds} СЕК`]
  const s = round.settings as Record<string, unknown>
  if (round.mechanic === 'stakes_unique' || round.mechanic === 'stakes_free') {
    const vals = (s.stakesValues as number[] | undefined) ?? []
    parts.push(`СТАВКИ ${Math.min(...vals)}–${Math.max(...vals)}`)
  } else if (round.mechanic === 'test_stop') {
    parts.push('СТОП ПОСЛЕ ОШИБКИ')
  } else if (round.mechanic === 'thematic_x2') {
    parts.push('×2 ЗА ТЕМУ')
  } else {
    parts.push(`${(s.pointsPerQuestion as number | undefined) ?? 1} БАЛЛ`)
  }
  return parts.join(' · ')
}
