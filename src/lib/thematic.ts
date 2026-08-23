// ═══ ФИНАЛЬНЫЙ ВОПРОС ТЕМАТИЧЕСКОГО РАУНДА ═══
// Он не приносит своих баллов — он решает, удваивать ли весь раунд.
//
// Важная деталь: галочку «это финальный вопрос» в редакторе легко не
// поставить, и тогда удвоение молча не срабатывало никогда. Поэтому если
// флага нет ни у одного вопроса, финальным считается ПОСЛЕДНИЙ вопрос
// раунда — по смыслу механики он и есть вопрос про связь.
export function finalQuestionOf<T extends { is_final_question?: boolean; hidden?: boolean }>(
  questions: T[],
): T | undefined {
  const flagged = questions.find(q => q.is_final_question)
  if (flagged) return flagged
  const visible = questions.filter(q => !q.hidden)
  return visible[visible.length - 1]
}

/** Вопросы, приносящие баллы: всё, кроме финального. */
export function scoringQuestionsOf<T extends { is_final_question?: boolean; hidden?: boolean }>(
  questions: T[],
): T[] {
  const fin = finalQuestionOf(questions)
  return questions.filter(q => q !== fin)
}
