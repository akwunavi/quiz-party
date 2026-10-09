// ═══ Разбор ответов в «Волшебном лесу»: настоящий вопрос и ответы команд → данные сцены (чистые функции, без сети) ═══
// Вердикт — ровно та же формула, что в HostScreen.ShowAnswers (is_correct ведущего, иначе autocheck), и только когда
// ShowAnswers объявил проверку (`checked`); до этого ok = null у всех. Ничего не пишется.
import { autocheck } from '../../lib/autocheck'
import { letterEq } from '../../lib/answerCheck'
import type { Answer, Question } from '../../types/quiz'
import { hueOf, tcol } from '../util'
import type { TeamRow } from './TeamStrip'

export type ReviewKind = 'text' | 'mc' | 'img' | 'imgopt' | 'match' | 'order'
/** Какой разбор рисовать. qImgs — картинки вопроса, revealImgs — картинки разбора (ответа или вопроса), video — скрытое видео. */
export function reviewKind(q: Question, mechanic: string, o: { qImgs: number; revealImgs: number; video: boolean }): ReviewKind {
  const a = q.answer
  if (a.mode === 'match') return 'match'
  if (a.mode === 'order') return 'order'
  if (a.mode === 'choice') return o.qImgs > 0 && o.qImgs === a.choices.length ? 'imgopt' : 'mc'
  if (mechanic === 'rebus') return 'img'
  return o.revealImgs > 0 || o.video ? 'img' : 'text'
}

type T = { id: string; name: string; color: string; icon?: string | null }
/** Ответ команды так, как его поймёт зал: у вариантов — «Б · Николай Гоголь», у пар — «1Б 2В 3А». */
export function answerShown(q: Question, text: string): string {
  const a = q.answer, t = text.trim()
  if (a.mode === 'choice') { const c = a.choices.find(x => letterEq(t, x.key)); return c && c.text.trim() ? `${c.key} · ${c.text.trim()}` : t }
  if (a.mode === 'match') return t.split(/[,;]\s*/).map(s => s.trim()).filter(Boolean).join(' ')
  return t
}
/** Строки «Ответы команд»: все команды игры (+ ушедшие из списка, но ответившие на этот вопрос), в порядке списка. */
export function reviewRows(q: Question, teams: T[], allTeams: T[], answers: Answer[], checked: boolean): { rows: TeamRow[]; answered: number } {
  const ref = `q-${q.id}`, rowsQ = answers.filter(a => a.question_ref === ref)
  const list: T[] = [...teams, ...allTeams.filter(t => !teams.some(x => x.id === t.id) && rowsQ.some(a => a.team_id === t.id))]
  let answered = 0
  const rows = list.map(t => {
    const a = rowsQ.find(r => r.team_id === t.id)
    const raw = a?.answer_text?.trim() || ''
    if (raw) answered++
    return {
      key: t.id, name: `${t.icon ? `${t.icon} ` : ''}${t.name}`, color: tcol(hueOf(t.color ?? '')),
      text: raw ? answerShown(q, raw) : null,
      ok: checked && a && raw ? (a.is_correct ?? autocheck(q.answer, a.answer_text)) : null,
      stake: a?.stake ?? null,
    }
  })
  return { rows, answered }
}
export const answeredLine = (answered: number, total: number) => `Ответили: ${answered} из ${total}`

/** Шаг показа «Сопоставления» в игре: последняя подпись прирастает (и номер вспыхивает) до проверки ShowAnswers. */
export function matchStep(n: number, doneS: number, lab: number): number {
  if (n <= 1) return lab
  return Math.max(0.05, Math.min(lab, (doneS - 0.3 - 1.45) / (n - 1)))
}
/** Шаг показа «Порядка» в игре: последний лист сел на место и номер горит до проверки ShowAnswers. */
export function orderStep(n: number, doneS: number, lab: number): number {
  return Math.max(0.35, Math.min(lab, (doneS - 0.3 - 0.4) / Math.max(0.9, n - 0.1)))
}
/** Шаг букв открытого ответа: слово целиком на экране к моменту проверки (букв больше — шаг меньше). */
export const letterStep = (len: number, budget = 0.7) => Math.min(0.14, budget / Math.max(1, len - 1))
