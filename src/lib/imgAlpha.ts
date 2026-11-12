// ═══ Есть ли у картинки прозрачность (по уже загруженному <img>) ═══
// Прототип «Книги» (этап 2, PLAN §8 В7): подложка-рамка «по форме картинки» для прозрачного PNG/WebP не нужна — иначе
// звезда лежит на белом прямоугольнике. Узнать альфу без декодирования нельзя: после onLoad картинка рисуется в крошечный
// canvas 8×8 (без сети, один раз). Чужой домен без CORS «пачкает» canvas — getImageData бросает, считаем «непрозрачной».

/** Формат вообще может нести альфу? (jpg — нет, проверять незачем) */
export const mayHaveAlpha = (src: string) => /\.(png|webp|gif|avif)(\?|#|$)/i.test(src) || src.startsWith('blob:') || src.startsWith('data:image/png')

/** Хотя бы один из 64 пикселей уменьшенной копии заметно прозрачен (альфа < 0.9). */
export function hasAlpha(img: HTMLImageElement): boolean {
  if (!mayHaveAlpha(img.currentSrc || img.src) || !img.naturalWidth) return false
  try {
    const c = document.createElement('canvas'); c.width = 8; c.height = 8
    const g = c.getContext('2d', { willReadFrequently: true })
    if (!g) return false
    g.drawImage(img, 0, 0, 8, 8)
    const d = g.getImageData(0, 0, 8, 8).data
    for (let i = 3; i < d.length; i += 4) if (d[i] < 230) return true
    return false
  } catch { return false }
}
