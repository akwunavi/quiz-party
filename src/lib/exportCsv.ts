import type { LoadedPack } from './packLoader'

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

  const rows: string[][] = [[
    'Раунд', '№ раунда', 'Механика', 'Таймер, сек',
    '№ вопроса', 'Текст вопроса', 'Ответ', 'Пояснение',
    'Медиа вопроса', 'Медиа ответа', 'Озвучка', 'Есть озвучка',
    'Оценка', 'Голосов', 'Скрыт',
  ]]
  pack.rounds.forEach((r, ri) => {
    r.questions.forEach((q, qi) => {
      const link = (paths: string[] | undefined) =>
        (paths ?? []).map(p => mediaUrls.get(p) ?? p).join('\n')
      rows.push([
        r.title_lines.join(' '), String(ri + 1), r.mechanic, String(r.timer_seconds),
        String(qi + 1), q.question_text, answerText(q), q.answer_note ?? '',
        link(q.media.question), link(q.media.answer),
        // Две колонки нарочно: по ссылке видно ЧТО озвучено, а по «нет»
        // удобно отфильтровать в Excel и увидеть все дыры разом.
        q.media.voice ? (mediaUrls.get(q.media.voice) ?? q.media.voice) : '',
        q.media.voice ? 'да' : 'нет',
        // оценки команд: пусто, если раунд ещё не играли
        ratings?.get(`q-${q.id}`)?.avg.toFixed(1) ?? '',
        String(ratings?.get(`q-${q.id}`)?.votes ?? ''),
        q.hidden ? 'да' : '',
      ])
    })
  })
  // разделитель «;» — Excel с русской локалью ждёт именно его
  return '\uFEFF' + rows.map(r => r.map(esc).join(';')).join('\r\n')
}
