// ═══ Точка входа transport-слоя ═══
// Шаг 6 плана офлайн-устойчивости: выбор между облаком и локальным
// сервером бара — по метке страницы (`mode.ts`), НЕ по health-check. Это
// архитектурно осознанно: автовыбор по доступности сервера создавал бы
// риск, что вкладка сама решит писать не туда, куда думает пользователь.
// Переключение — только явным переходом по URL/QR на другой origin.
import { supabaseTransport } from './supabaseTransport'
import { localTransport } from './localTransport'
import { isLocalMode, transportMode } from './mode'
import type { RoomTransport } from './types'

export const room: RoomTransport = isLocalMode() ? localTransport : supabaseTransport

export { transportMode }

export type {
  RoomTransport, SessionPatch, TeamUpsert, TeamPatch, AnswerUpsert, AnswerPatch, DeleteAnswersBy,
} from './types'
