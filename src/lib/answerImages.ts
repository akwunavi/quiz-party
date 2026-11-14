// ═══ Картинки на экране показа ответа — ЧИСТОЕ правило (общее для всех тем) ═══
// Есть своя картинка у ответа → показываем ТОЛЬКО её, картинки вопроса на экране ответа убираются (мешали и перекрывали ответ, 14.11).
// Своей нет → на разборе показываем картинки вопроса (они нужнее текста вопроса, который уже прозвучал). Звук/видео сюда не входят.
const NOT_PICTURE = /\.(mp3|mp4|webm|wav)$/i
export function answerScreenImages(media: { question?: string[]; answer?: string[] } | undefined): { answerImgs: string[]; questionImgs: string[]; revealImgs: string[] } {
  const answerImgs = (media?.answer ?? []).filter(m => !NOT_PICTURE.test(m))
  const questionImgs = (media?.question ?? []).filter(m => !NOT_PICTURE.test(m))
  const revealImgs = answerImgs.length ? answerImgs : questionImgs
  return { answerImgs, questionImgs, revealImgs }
}
