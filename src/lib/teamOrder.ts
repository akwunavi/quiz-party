import type { Team } from '../types/quiz'

/** Стабильный порядок команд для экрана лобби.
 *
 *  `useTeams` делает `select('*')` без `.order()` — Postgres/PostgREST не
 *  гарантирует порядок строк без ORDER BY. Набор команд между двумя
 *  соседними поллингами (раз в 2 сек) не менялся, а порядок в массиве иногда
 *  менялся — список подключившихся команд на экране лобби «прыгал».
 *
 *  Сортируем по времени регистрации (`created_at`), а не по алфавиту — так
 *  команды остаются в порядке подключения, как их и озвучивает ведущий.
 *  `created_at` есть в базе с первой миграции (0001_init.sql), просто не
 *  был нужен в типе `Team` до этой сортировки. Если он всё же пуст (совсем
 *  старая строка без миграции задним числом) — фолбэк на `id`, лишь бы
 *  порядок был детерминированным и не менялся между опросами. */
export function sortTeamsForLobby<T extends Pick<Team, 'id' | 'created_at'>>(teams: T[]): T[] {
  return [...teams].sort((a, b) => {
    const ta = a.created_at ? Date.parse(a.created_at) : 0
    const tb = b.created_at ? Date.parse(b.created_at) : 0
    if (ta !== tb) return ta - tb
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
  })
}
