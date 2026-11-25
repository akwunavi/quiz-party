// ═══ СТАТУС ОЗВУЧЕК ДЛЯ ПУЛЬТА (10.75) — чистые функции ═══
// Проектор считает, сколько озвучек скачано, и пишет итог в общий мешок
// `melody.voice` (отдельного поля в БД не нужно — как `melody.audio`).
// Пульт читает и рисует строку. Здесь — подпись для «писать только при
// изменении», текст строки и условие «чужая запись свежая — не воюем».

import type { MelodyState } from '../types/quiz'

export type VoiceBag = NonNullable<MelodyState['voice']>

export const VOICE_FRESH_MS = 20_000

export function voiceStateOf(done: number, failed: number, total: number): VoiceBag['state'] {
  if (done + failed < total) return 'loading'
  return failed > 0 ? 'error' : 'ready'
}

/** Подпись состояния: изменилась — пишем. Максимум остановки — с точностью
 *  до 0,1 с, иначе растущая остановка давала бы поток записей. */
export function voiceSig(v: VoiceBag | undefined | null): string {
  if (!v) return ''
  return `${v.done}|${v.failed}|${v.total}|${v.stalls ?? 0}|${v.maxStallSec ?? 0}`
}

/** Писать ли свою запись поверх лежащей. Чужая вкладка проектора, писавшая
 *  недавно, не перебивается (иначе вечный пинг-понг двух вкладок). */
export function mayWriteVoice(prev: VoiceBag | undefined, myId: string, nowMs: number): boolean {
  if (!prev || !prev.by || prev.by === myId) return true
  const at = prev.at ? Date.parse(prev.at) : NaN
  return !(nowMs - at < VOICE_FRESH_MS)
}

export interface VoiceChip { cls: 'ok' | 'wait' | 'bad'; text: string; stallText: string | null; retry: boolean }

/** Строка пульта. `null` — озвучек у пака нет, строку не показывать. */
export function voiceChip(v: VoiceBag | undefined | null): VoiceChip | null {
  if (!v || !(v.total > 0)) return null
  const stallText = v.stalls && v.stalls > 0
    ? `были остановки звука: ${v.stalls} (макс. ${String(v.maxStallSec ?? 0).replace('.', ',')} с)` : null
  if (v.state === 'ready') return { cls: 'ok', text: `✓ Озвучка: всё загружено (${v.done} из ${v.total})`, stallText, retry: false }
  if (v.state === 'error') return { cls: 'bad', text: `⚠ Озвучка: не загрузилось ${v.failed} из ${v.total}`, stallText, retry: true }
  return { cls: 'wait', text: `⏳ Озвучка: загружено ${v.done} из ${v.total}`, stallText, retry: false }
}
