// ═══ ФИНАЛЬНЫЙ ВОПРОС ТЕМАТИЧЕСКОГО РАУНДА ═══
// Он не приносит своих баллов — он решает, удваивать ли весь раунд.
// Определяется ТОЛЬКО флагом is_final_question, который ставит редактор.
// Никаких догадок «наверное, последний» здесь быть не должно: молча
// поменять смысл подсчёта хуже, чем не посчитать вовсе.
export function finalQuestionOf<T extends { is_final_question?: boolean }>(
  questions: T[],
): T | undefined {
  return questions.find(q => q.is_final_question)
}

/** Вопросы, приносящие баллы: всё, кроме финального. */
export function scoringQuestionsOf<T extends { is_final_question?: boolean }>(
  questions: T[],
): T[] {
  return questions.filter(q => !q.is_final_question)
}
