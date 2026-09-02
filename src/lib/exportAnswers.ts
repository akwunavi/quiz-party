import type { LoadedPack } from './packLoader'
import type { Answer, Team } from '../types/quiz'

// ═══ ВЫГРУЗКА ОТВЕТОВ КОМАНД ПО РАУНДАМ (для апелляций) ═══
// Отдельно от exportCsv.ts (тот выгружает СОДЕРЖИМОЕ пакета — вопросы и
// правильные ответы, без игры) — здесь то, что реально прислали команды
// за конкретную игру: кто что ответил, что решил ведущий, когда. Нужна
// сразу после спорного момента, поэтому доступна в любой фазе игры (см.
// AdminPage.tsx:ResultsPanel), а не только в финале.
//
// Полного маппинга «ref → вопрос» нет только у нестандартных механик
// («Своя игра», мелодия, блиц, скачки, бумага, ручная коррекция) — там
// ответы не привязаны к question_id, а к плитке/треку/раунду целиком.
// Такие строки остаются в выгрузке (это тоже часть истории начисления
// баллов), просто с читаемой пометкой вместо текста вопроса.

function correctAnswerText(q: LoadedPack['rounds'][number]['questions'][number]): string {
  const a = q.answer as unknown as Record<string, unknown>
  const d = a.display ?? a.correct ?? a.word ?? a.correct_choice ?? a.correct_order
    ?? (Array.isArray(a.correct_pairs) ? (a.correct_pairs as string[]).join(' ') : '—')
  return Array.isArray(d) ? d.join(' · ') : String(d)
}

function describeSpecialRef(ref: string): string {
  if (ref === 'q-blitz') return 'Блиц — итог раунда'
  if (ref.startsWith('q-paper-')) return 'Бумажные баллы'
  if (ref.startsWith('q-adjust-')) return 'Ручная коррекция'
  if (ref.startsWith('q-race-')) return 'Скачки — ставка'
  if (ref.startsWith('q-mel-') && ref.endsWith('-bid')) return 'Мелодия — заявка (сек.)'
  if (ref.startsWith('q-mel-')) return 'Мелодия — трек'
  if (/^q-t\d/.test(ref)) return 'Своя игра — плитка'
  return ref
}

function verdictText(v: boolean | null): string {
  return v === true ? 'верно' : v === false ? 'неверно' : 'не оценено'
}

export function exportAnswersCsv(pack: LoadedPack, teams: Team[], answers: Answer[]): string {
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const teamName = new Map(teams.map(t => [t.id, t.name]))

  const questionByRef = new Map<string,
    { text: string; correct: string; roundLabel: string; roundIndex: number }>()
  pack.rounds.forEach((r, ri) => {
    const roundLabel = r.title_lines.join(' ') || `Раунд ${ri + 1}`
    r.questions.forEach(q => {
      questionByRef.set(`q-${q.id}`,
        { text: q.question_text, correct: correctAnswerText(q), roundLabel, roundIndex: ri })
    })
  })
  const roundLabelByIndex = new Map(
    pack.rounds.map((r, ri) => [ri, r.title_lines.join(' ') || `Раунд ${ri + 1}`]))

  // По раунду, затем по команде — апелляцию по конкретному раунду ищут
  // именно так, а не листают всю выгрузку подряд.
  const sorted = [...answers].sort((x, y) => {
    const rx = questionByRef.get(x.question_ref)?.roundIndex ?? x.round_number
    const ry = questionByRef.get(y.question_ref)?.roundIndex ?? y.round_number
    if (rx !== ry) return rx - ry
    return (teamName.get(x.team_id) ?? '').localeCompare(teamName.get(y.team_id) ?? '')
  })

  const rows: string[][] = [[
    '№ раунда', 'Раунд', 'Команда', 'Вопрос', 'Ответ команды',
    'Правильный ответ', 'Ставка', 'Вердикт', 'Обновлено',
  ]]
  for (const a of sorted) {
    const q = questionByRef.get(a.question_ref)
    const roundIndex = q?.roundIndex ?? a.round_number
    const roundLabel = q?.roundLabel ?? roundLabelByIndex.get(a.round_number) ?? `Раунд ${a.round_number + 1}`
    rows.push([
      String(roundIndex + 1), roundLabel, teamName.get(a.team_id) ?? '—',
      q?.text ?? describeSpecialRef(a.question_ref),
      a.answer_text || '—', q?.correct ?? '',
      a.stake != null ? String(a.stake) : '',
      verdictText(a.is_correct),
      a.updated_at ?? '',
    ])
  }
  // разделитель «;» — Excel с русской локалью ждёт именно его
  return '\uFEFF' + rows.map(r => r.map(esc).join(';')).join('\r\n')
}
