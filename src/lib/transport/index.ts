// ═══ Точка входа transport-слоя ═══
// Сегодня единственная реализация — облако. Шаг 6 плана офлайн-устойчивости
// добавит выбор между 'cloud' и 'local' (локальный сервер бара); эта
// заглушка уже здесь, чтобы вызывающему коду не пришлось меняться дважды.
import { supabaseTransport } from './supabaseTransport'
import type { RoomTransport } from './types'

export const room: RoomTransport = supabaseTransport

/** Заглушка на будущее (шаг 6): выбор режима транспорта. Сейчас всегда 'cloud'. */
export function transportMode(): 'cloud' {
  return 'cloud'
}

export type {
  RoomTransport, SessionPatch, TeamUpsert, TeamPatch, AnswerUpsert, AnswerPatch, DeleteAnswersBy,
} from './types'
