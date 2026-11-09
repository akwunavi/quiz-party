// «Скачки бульдогов» (Race V3): константы раунда. Источник правды по геометрии трассы — dog4-v3-lab/layout.json (1920×1080).
import type { RaceSettings } from '../../types/quiz'
export const DOG_IDS = ['frenk', 'zefir', 'rocky', 'pups', 'luna'] as const
export type DogId = typeof DOG_IDS[number]
export const DOG_NAMES = ['Фрэнк', 'Зефир', 'Рокки', 'Пупс', 'Луна']
const LEGACY_NAMES = ['Френк', 'Батон', 'Пельмень', 'Турбо', 'Ракета']       // старые заглушки редактора — под ними теперь другие собаки
export const LAYOUT = { width: 1920, height: 1080, startX: 406, finishX: 1484, finishControlOffset: 92, laneTop: 260, laneStep: 159,
  spriteWidth: 207, spriteHeight: 116, spriteAnchorX: 148, spriteTopOffset: 110 } as const
/** Время дистанции собаки с обычным темпом, с (в Race V3 было зашито 42). Гонка целиком = эта цифра × темпы собак + окна действий. */
export const DEFAULT_COURSE_SEC = 42
export const COURSE_SEC_MIN = 20, COURSE_SEC_MAX = 120
/** Тайминги сцен ПОСЛЕ нажатия «Старт» (все экраны считают их от одного startedAt, поэтому не расходятся). */
export const T = { transition: 3.2, countdown: 3, finishHold: 3.5, podiumTransition: 2.6, podiumStep: 1.3 } as const
export const BULLDOG_BASE = `${import.meta.env.BASE_URL}bulldog/`
declare const __BULLDOG_V__: string | undefined
/** Версия библиотеки собак (sha MANIFEST.json, подставляется сборкой). Дописывается к адресу файла: `…/idle.webp?v=<версия>`. */
export const BULLDOG_V: string = typeof __BULLDOG_V__ === 'string' ? __BULLDOG_V__ : 'dev'
export const versionedUrl = (u: string) => `${u}${u.includes('?') ? '&' : '?'}v=${BULLDOG_V}`
export function courseSeconds(s: Partial<RaceSettings> | undefined): number {
  const v = Number(s?.courseSec)
  return Number.isFinite(v) && v >= COURSE_SEC_MIN && v <= COURSE_SEC_MAX ? v : DEFAULT_COURSE_SEC
}
/** Клички: берём из пака, если ведущий их менял; заглушки редактора («Френк, Батон…») заменяем настоящими именами собак. */
export function dogNames(s: Partial<RaceSettings> | undefined): string[] {
  const d = s?.dogs
  if (!d || d.length !== 5 || d.every((x, i) => x === LEGACY_NAMES[i])) return DOG_NAMES
  return d.map((x, i) => (x && x.trim()) || DOG_NAMES[i])
}
export const selectSheetUrl = (id: DogId, sheet: string) => `${BULLDOG_BASE}${id}/${sheet}`
export const stillUrl = (id: DogId) => versionedUrl(`${BULLDOG_BASE}${id}/still.webp`)
