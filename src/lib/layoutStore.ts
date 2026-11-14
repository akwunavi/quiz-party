// ═══ Запись ручной компоновки: точечно, поверх СВЕЖЕГО service (не снимка формы) ═══
// service — общий jsonb (слова ребуса, открытые буквы «3 попыток»). Читаем свежую строку, меняем ОДИН ключ layout, пишем service назад.
// Так правка компоновки не затирает остальные поля, а сохранение формы вопроса (QuestionForm) берёт layout из базы (mergeServiceKeepLayout).
import { supabase } from './supabase'
import { mergeServiceKeepLayout, withScreenLayout, type LayoutScreen, type Rects } from './layoutRects'

export async function fetchService(questionId: string): Promise<unknown> {
  const { data, error } = await supabase.from('pack_questions').select('service').eq('id', questionId).single()
  if (error) throw error
  return (data as { service?: unknown } | null)?.service ?? {}
}

/** Сохранить (rects) или удалить (null) раскладку экрана вопроса. Возвращает новый service. */
export async function saveScreenLayout(questionId: string, screen: LayoutScreen, rects: Rects | null): Promise<Record<string, unknown>> {
  const next = withScreenLayout(await fetchService(questionId), screen, rects)
  const { error } = await supabase.from('pack_questions').update({ service: next }).eq('id', questionId)
  if (error) throw error
  return next
}

/** service для сохранения формы: поля формы + layout из базы. */
export async function serviceForFormSave(questionId: string, formService: unknown): Promise<Record<string, unknown>> {
  try { return mergeServiceKeepLayout(formService, await fetchService(questionId)) } catch { return mergeServiceKeepLayout(formService, formService) }
}
