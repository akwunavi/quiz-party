// ═══ Загрузчик пакетов: Supabase → игровой конфиг ═══
// Тянет пакет один раз при старте, кеширует в память и IndexedDB (страховка
// от мигания сети во время игры и офлайн-старт — шаг 5 плана
// офлайн-устойчивости, Part A).
//
// Порядок чтения: память (рантайм-кеш) → сеть (с учётом `force`) →
// IndexedDB (`packCache`, кладётся туда кнопкой «Скачать пакет для
// офлайна» и при каждой успешной загрузке из сети) → localStorage —
// ТОЛЬКО как legacy-фолбэк на ЧТЕНИЕ для пакетов, сохранённых версией до
// 8.93 (там писали в localStorage; лимит ~5-10 МБ на источник тихо резал
// большие пакеты, поэтому НОВЫХ записей в localStorage больше не делаем).

import { supabase } from './supabase'
import { savePack, readPack } from './packCache'
import type { Pack, RoundBase, Question } from '../types/quiz'
// Чистые хелперы (без сети) переехали в roundMeta.ts (9.43) — pptxExport.ts
// (слой А, документированно «без сети») их тоже импортирует, а этот файл
// безусловно тянет ./supabase, что в тестах роняет billing без env. Реэкспорт
// ниже — чтобы существующие `import { metaLine } from '../lib/packLoader'`
// (HostScreen/PlayerPage/AdminPage/RoundScreen) не трогать.
export type { LoadedRound, LoadedPack } from './roundMeta'
export { roundSetting, scoredRounds, metaLine, displayRoundNumber } from './roundMeta'
import type { LoadedPack } from './roundMeta'

const memCache = new Map<string, LoadedPack>()
const LS_KEY = (id: string) => `qp-pack-${id}`

/** `forPlayer` — телефон игрока: вопросы приходят урезанными (без правильных ответов, миграция 0018);
 *  до миграции функции в базе нет — тогда берём прямым чтением, как раньше. */
export async function loadPack(packId: string, force = false, includeHidden = false, forPlayer = false): Promise<LoadedPack> {
  const cacheKey = includeHidden ? `${packId}:h` : forPlayer ? `${packId}:p` : packId
  const storeId = forPlayer && !includeHidden ? `${packId}:p` : packId
  if (!force && memCache.has(cacheKey)) return memCache.get(cacheKey)!

  try {
    const [{ data: pack, error: e1 }, { data: rounds, error: e2 }] = await Promise.all([
      supabase.from('packs').select('*').eq('id', packId).single(),
      supabase.from('pack_rounds').select('*').eq('pack_id', packId).order('position'),
    ])
    if (e1 || !pack) throw e1 ?? new Error('pack not found')
    if (e2) throw e2

    const roundIds = (rounds ?? []).map(r => r.id)
    let questions: unknown[] | null = null
    if (forPlayer && !includeHidden && roundIds.length) {
      const { data: rpcData, error: rpcErr } = await supabase.rpc('player_pack_questions', { p_pack_id: packId })
      if (!rpcErr && Array.isArray(rpcData)) questions = rpcData
    }
    if (questions === null) {
      let qQuery = supabase.from('pack_questions').select('*')
        .in('round_id', roundIds).order('position')
      if (!includeHidden) qQuery = qQuery.eq('hidden', false)
      const { data, error: e3 } = roundIds.length
        ? await qQuery : { data: [], error: null }
      if (e3) throw e3
      questions = data
      // после миграции 0018 телефону прямое чтение возвращает пусто БЕЗ ошибки — пустой пакет не кешируем, берём офлайн-копию
      if (forPlayer && !includeHidden && roundIds.length && (data ?? []).length === 0) throw new Error('player pack: вопросы недоступны')
    }

    const loaded: LoadedPack = {
      ...(pack as Pack),
      rounds: (rounds ?? []).map(r => ({
        ...(r as RoundBase),
        questions: ((questions ?? []) as Question[]).filter(q => q.round_id === r.id),
      })),
    }
    memCache.set(cacheKey, loaded)
    // Пишем ТОЛЬКО в IndexedDB — она без лимита в несколько МБ, в отличие
    // от localStorage (см. шапку файла). includeHidden-снимок (превью
    // редактора со скрытыми вопросами) в офлайн-кеш не кладём: офлайн нужен
    // ведущему в игре, а там includeHidden всегда false.
    if (!includeHidden) { try { await savePack(storeId, loaded) } catch { /* IndexedDB недоступен */ } }
    return loaded
  } catch (err) {
    // сеть мигнула — пробуем IndexedDB, потом legacy localStorage
    if (!includeHidden) {
      try {
        const cached = await readPack<LoadedPack>(storeId)
        if (cached) { memCache.set(cacheKey, cached); return cached }
      } catch { /* IndexedDB недоступен — пробуем localStorage ниже */ }
    }
    const cachedLs = localStorage.getItem(LS_KEY(packId))
    if (cachedLs) {
      const loaded = JSON.parse(cachedLs) as LoadedPack
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
    .neq('status', 'bank')          // банк — хранилище, а не игровой пакет
    .order('updated_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Pack[]
}
