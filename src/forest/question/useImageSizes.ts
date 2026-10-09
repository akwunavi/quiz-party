// Натуральные размеры картинок вопроса: раскладка зависит от пропорций, поэтому сцена ждёт загрузки.
// Картинка не загрузилась за `limit` мс или с ошибкой — берём 4:3, чтобы вопрос всё равно появился.
import { useEffect, useState } from 'react'

export type Size = { w: number; h: number }
export function useImageSizes(urls: string[], limit = 4000): Size[] | null {
  const key = urls.join('\n')
  const [res, setRes] = useState<{ key: string; sizes: Size[] } | null>(null)
  useEffect(() => {
    if (!urls.length) { setRes({ key, sizes: [] }); return }
    let dead = false
    const out: Size[] = urls.map(() => ({ w: 0, h: 0 }))
    let left = urls.length
    const done = () => { if (!dead && --left === 0) setRes({ key, sizes: out.map(s => (s.w > 0 && s.h > 0 ? s : { w: 1200, h: 900 })) }) }
    const ims = urls.map((u, i) => {
      const im = new Image()
      im.onload = () => { out[i] = { w: im.naturalWidth, h: im.naturalHeight }; done() }
      im.onerror = done
      im.src = u
      return im
    })
    const t = setTimeout(() => { if (!dead && left > 0) { left = 1; done() } }, limit)
    return () => { dead = true; clearTimeout(t); ims.forEach(im => { im.onload = null; im.onerror = null }) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, limit])
  return res && res.key === key ? res.sizes : null
}
