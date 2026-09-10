import type { LoadedPack } from './packLoader'
import type { Answer, Team, PackPlay } from '../types/quiz'

// ═══ ВЫГРУЗКА ПАКЕТА В ТАБЛИЦУ ═══
// Вынесена из editorApi НАРОЧНО: там инициализируется клиент Supabase, и
// импорт этого модуля в тестах падал на отсутствии ключей. Здесь чистая
// функция без сети — её можно проверять напрямую.
//
// ВНИМАНИЕ: список колонок в шапке и порядок значений в строке живут
// рядом, но это два разных места. Добавил поле в одно и забыл в другое —
// таблица молча уезжает вправо. На это есть тест export-csv.test.ts.

/** Ключ карты «когда показали вопрос» — составной, game_id+question_ref.
 *  Один и тот же question_ref может встретиться в НЕСКОЛЬКИХ играх пакета
 *  (пакет доигрывали не раз) — плоский ключ по одному question_ref схлопывал
 *  тайминги разных вечеров, и «последняя показанная» запись затирала
 *  остальные, портя среднюю скорость ответа. */
export const shownKey = (gameId: string, ref: string) => `${gameId}::${ref}`

/** Короткая дата отыгрыша для префикса сырого ответа: «05.09». */
const shortDate = (iso: string) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10)
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function exportPackCsv(
  pack: LoadedPack,
  mediaUrls: Map<string, string>,
  /** Средние оценки по вопросам: ключ — question_ref. Необязательный:
   *  выгрузка пакета до игры делается без оценок. */
  ratings?: Map<string, { avg: number; votes: number }>,
  /** Ответы и тайминг игр пакета (issue #3: раньше это была отдельная
   *  выгрузка exportAnswersCsv, доступная только из админки во время живой
   *  игры — здесь те же данные, но по вопросу целиком, а не по командам, и
   *  доступны из редактора в любой момент). Может покрывать ОДНУ игру или
   *  всю историю пакета (см. fetchPackGameData/pack_plays, миграция 0013) —
   *  необязательный по той же причине, что и ratings: выгрузка до игры
   *  делается без ответов.
   *  ВАЖНО (уточнение ведущего после первой версии): агрегатов (%, скорость,
   *  распределение) недостаточно для разбора качества вопроса — нужен сырой
   *  текст, что именно написала каждая команда, иначе непонятно, ЧТО в
   *  вопросе людей путает. `teams` — только чтобы подписать ответ именем
   *  команды, а не голым id. `shownAt` — ключ shownKey(game_id, ref), не
   *  голый ref (см. комментарий у shownKey). `plays` — список отыгрышей,
   *  представленных в answers: нужен для префикса даты у сырых ответов,
   *  когда игр больше одной, и для колонки «Отыгрышей в статистике». */
  gameData?: { answers: Answer[]; teams?: Team[]; shownAt?: Map<string, string>; plays?: PackPlay[] },
): string {
  const esc = (v: unknown) => {
    const t = String(v ?? '').replace(/"/g, '""')
    return `"${t}"`
  }
  const answerText = (q: LoadedPack['rounds'][number]['questions'][number]) => {
    const a = q.answer as unknown as Record<string, unknown>
    if (a.mode === 'choice') {
      const ch = (a.choices ?? []) as { key: string; text: string }[]
      return ch.map(c => `${c.key}) ${c.text}`).join(' | ')
        + ` → верный: ${String(a.correct_choice ?? '')}`
    }
    if (a.mode === 'match') {
      const l = (a.left ?? []) as string[], r = (a.right_labels ?? []) as string[]
      return l.map((x, i) => `${i + 1}. ${x} → ${r[i] ?? ''}`).join(' | ')
    }
    // режим называется free_text; из-за 'free' ответ выгружался пустым
    if (a.mode === 'free_text') return String(a.correct ?? '')
    if (a.mode === 'crossword_word') return String(a.word ?? '')
    return JSON.stringify(a)
  }

  // Ответы последней игры — по вопросу разом, группировка один раз на всю
  // выгрузку (а не пересчёт фильтром на каждый вопрос по всем ответам).
  const answersByRef = new Map<string, Answer[]>()
  for (const a of gameData?.answers ?? []) {
    const arr = answersByRef.get(a.question_ref)
    if (arr) arr.push(a); else answersByRef.set(a.question_ref, [a])
  }
  const teamName = new Map((gameData?.teams ?? []).map(t => [t.id, t.name]))
  // сколько отыгрышей вошло в статистику: если plays передан явно — берём
  // его длину (может быть сужен выбором одной игры в PackExport), иначе
  // считаем по числу различных game_id среди самих ответов
  const playCount = gameData?.plays
    ? gameData.plays.length
    : new Set((gameData?.answers ?? []).map(a => a.game_id)).size
  // дата отыгрыша по game_id — для префикса сырого ответа
  const playDate = new Map((gameData?.plays ?? []).map(p => [p.game_id, shortDate(p.played_at)]))
  // префиксуем ответы датой только когда в выборке реально больше одной
  // игры — иначе это лишний шум для самого частого случая (одна игра)
  const multiGame = new Set((gameData?.answers ?? []).map(a => a.game_id)).size > 1

  const rows: string[][] = [[
    'Раунд', '№ раунда', 'Механика', 'Таймер, сек',
    '№ вопроса', 'Текст вопроса', 'Ответ', 'Пояснение',
    'Медиа вопроса', 'Медиа ответа', 'Озвучка', 'Есть озвучка',
    'Оценка', 'Голосов', 'Скрыт',
    'Отыгрышей в статистике',
    'Ответов (в выборке)', '% верных', 'Средняя скорость, сек',
    'Распределение по вариантам', 'Ответы команд',
  ]]
  pack.rounds.forEach((r, ri) => {
    r.questions.forEach((q, qi) => {
      const link = (paths: string[] | undefined) =>
        (paths ?? []).map(p => mediaUrls.get(p) ?? p).join('\n')
      const ref = `q-${q.id}`
      const qAnswers = answersByRef.get(ref) ?? []
      // % верных — только по оценённым ответам, null (не проверено) не в счёт
      const graded = qAnswers.filter(a => a.is_correct !== null)
      const correctPct = graded.length
        ? Math.round(100 * graded.filter(a => a.is_correct).length / graded.length) : null
      // скорость — от показа вопроса (question_shown) до первой отправки
      // ответа (created_at), как в exportAnswersCsv; без обеих меток пусто.
      // Момент показа берём ПО ИГРЕ каждого ответа (shownKey = game_id+ref),
      // а не общий на весь вопрос — один question_ref может повторяться в
      // нескольких играх пакета с разным моментом показа.
      const speeds = qAnswers
        .map(a => {
          const shown = gameData?.shownAt?.get(shownKey(a.game_id, ref))
          return shown && a.created_at
            ? (new Date(a.created_at).getTime() - new Date(shown).getTime()) / 1000 : null
        })
        .filter((v): v is number => v != null && v >= 0)
      const avgSpeed = speeds.length
        ? Math.round(speeds.reduce((s, v) => s + v, 0) / speeds.length) : null
      // распределение по вариантам — только у choice-вопросов, у остальных
      // механик ответ не сводится к фиксированному набору букв
      const distribution = q.answer.mode === 'choice'
        ? q.answer.choices
            .map(c => `${c.key}: ${qAnswers.filter(a => a.answer_text === c.key).length}`)
            .join(' | ')
        : ''
      // сырой текст, что именно написала каждая команда — ради этого и
      // затевалась вся статистика: по цифрам «40% верных» непонятно, что
      // именно людей путает, а по конкретным неверным ответам видно сразу
      const rawAnswers = qAnswers.map(a => {
        const verdict = a.is_correct === true ? ' — верно'
          : a.is_correct === false ? ' — неверно' : ''
        // при нескольких играх в выборке ответы разных вечеров иначе
        // сливаются в одну строку неотличимо друг от друга
        const prefix = multiGame ? `${playDate.get(a.game_id) ?? a.game_id.slice(0, 6)} ` : ''
        return `${prefix}${teamName.get(a.team_id) ?? '?'}: ${a.answer_text || '—'}${verdict}`
      }).join(' | ')
      rows.push([
        r.title_lines.join(' '), String(ri + 1), r.mechanic, String(r.timer_seconds),
        String(qi + 1), q.question_text, answerText(q), q.answer_note ?? '',
        link(q.media.question), link(q.media.answer),
        // Две колонки нарочно: по ссылке видно ЧТО озвучено, а по «нет»
        // удобно отфильтровать в Excel и увидеть все дыры разом.
        q.media.voice ? (mediaUrls.get(q.media.voice) ?? q.media.voice) : '',
        q.media.voice ? 'да' : 'нет',
        // оценки команд: пусто, если раунд ещё не играли
        ratings?.get(ref)?.avg.toFixed(1) ?? '',
        String(ratings?.get(ref)?.votes ?? ''),
        q.hidden ? 'да' : '',
        playCount > 0 ? String(playCount) : '',
        qAnswers.length ? String(qAnswers.length) : '',
        correctPct != null ? String(correctPct) : '',
        avgSpeed != null ? String(avgSpeed) : '',
        distribution,
        rawAnswers,
      ])
    })
  })
  // разделитель «;» — Excel с русской локалью ждёт именно его
  return '\uFEFF' + rows.map(r => r.map(esc).join(';')).join('\r\n')
}
