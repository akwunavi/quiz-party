import type { LoadedPack } from './packLoader'
import type { Answer } from '../types/quiz'

// ═══ ВЫГРУЗКА ПАКЕТА В ТАБЛИЦУ ═══
// Вынесена из editorApi НАРОЧНО: там инициализируется клиент Supabase, и
// импорт этого модуля в тестах падал на отсутствии ключей. Здесь чистая
// функция без сети — её можно проверять напрямую.
//
// ВНИМАНИЕ: список колонок в шапке и порядок значений в строке живут
// рядом, но это два разных места. Добавил поле в одно и забыл в другое —
// таблица молча уезжает вправо. На это есть тест export-csv.test.ts.

export function exportPackCsv(
  pack: LoadedPack,
  mediaUrls: Map<string, string>,
  /** Средние оценки по вопросам: ключ — question_ref. Необязательный:
   *  выгрузка пакета до игры делается без оценок. */
  ratings?: Map<string, { avg: number; votes: number }>,
  /** Ответы и тайминг ПОСЛЕДНЕЙ игры пакета (issue #3: раньше это была
   *  отдельная выгрузка exportAnswersCsv, доступная только из админки во
   *  время живой игры — здесь те же данные, но по вопросу целиком, а не
   *  по командам, и доступны из редактора в любой момент). Необязательный
   *  по той же причине, что и ratings — выгрузка до игры делается без
   *  ответов. */
  gameData?: { answers: Answer[]; shownAt?: Map<string, string> },
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

  const rows: string[][] = [[
    'Раунд', '№ раунда', 'Механика', 'Таймер, сек',
    '№ вопроса', 'Текст вопроса', 'Ответ', 'Пояснение',
    'Медиа вопроса', 'Медиа ответа', 'Озвучка', 'Есть озвучка',
    'Оценка', 'Голосов', 'Скрыт',
    'Ответов (последняя игра)', '% верных', 'Средняя скорость, сек',
    'Распределение по вариантам',
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
      // ответа (created_at), как в exportAnswersCsv; без обеих меток пусто
      const shown = gameData?.shownAt?.get(ref)
      const speeds = qAnswers
        .map(a => shown && a.created_at
          ? (new Date(a.created_at).getTime() - new Date(shown).getTime()) / 1000 : null)
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
        qAnswers.length ? String(qAnswers.length) : '',
        correctPct != null ? String(correctPct) : '',
        avgSpeed != null ? String(avgSpeed) : '',
        distribution,
      ])
    })
  })
  // разделитель «;» — Excel с русской локалью ждёт именно его
  return '\uFEFF' + rows.map(r => r.map(esc).join(';')).join('\r\n')
}
