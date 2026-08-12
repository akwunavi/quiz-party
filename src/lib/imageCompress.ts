// ═══ Сжатие картинок в браузере перед загрузкой ═══
// Ресайз до 1920px по длинной стороне + JPEG 85%. PNG с прозрачностью не трогаем.
export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file
  if (file.type === 'image/gif') return file
  const bitmap = await createImageBitmap(file)
  const MAX = 1920
  const scale = Math.min(1, MAX / Math.max(bitmap.width, bitmap.height))
  if (scale === 1 && file.size < 500_000) return file  // уже маленькая
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const blob: Blob = await new Promise((res, rej) =>
    canvas.toBlob(b => b ? res(b) : rej(new Error('compress failed')), 'image/jpeg', 0.85))
  const name = file.name.replace(/\.[^.]+$/, '') + '.jpg'
  return new File([blob], name, { type: 'image/jpeg' })
}
