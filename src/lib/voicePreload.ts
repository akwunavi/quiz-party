// ═══ ПРЕДЗАГРУЗКА ОЗВУЧЕК: рабочая обвязка (10.75) ═══
// Чистая очередь — `voiceLoader.ts` (тесты без браузера). Здесь она
// подключена к настоящей сети (`fetchMediaBlob`), офлайн-кешу IndexedDB и
// реестру живых плееров. Один общий загрузчик на вкладку проектора.
//
// Единый путь проигрывания: `voiceSrc(path)` / `voiceSrcFromUrl(url)` —
// «из памяти, если скачано, иначе прежний сетевой адрес» (поток, как было).
// Скачивание упало или ещё не закончилось — поведение ровно прежнее.

import { createVoiceLoader } from './voiceLoader'
import { fetchMediaBlob, mediaUrl } from './media'
import { readMedia } from './packCache'
import { isBlobInUse } from './audioSource'

export const voiceLoader = createVoiceLoader({
  async fetchBlob(path) {
    try {
      const cached = await readMedia(path)        // скачан кнопкой «для офлайна» — сеть не нужна
      if (cached) return cached
    } catch { /* IndexedDB недоступен — идём в сеть */ }
    return fetchMediaBlob(path)
  },
  createUrl: b => URL.createObjectURL(b),
  revokeUrl: u => URL.revokeObjectURL(u),
  sleep: ms => new Promise(r => setTimeout(r, ms)),
  inUse: isBlobInUse,
  urlOf: mediaUrl,
})

/** Адрес для `<audio>.src`: скачанное в память, иначе прежний сетевой. */
export function voiceSrc(path: string): string {
  const url = mediaUrl(path)
  if (url.startsWith('blob:')) return url
  return voiceLoader.get(path) ?? url
}

/** То же по готовому адресу (`mediaUrl(path)`), когда пути под рукой нет. */
export function voiceSrcFromUrl(url: string): string {
  if (!url || url.startsWith('blob:')) return url
  return voiceLoader.getByUrl(url) ?? url
}

/** Запасной путь при ошибке самого элемента: если играли из памяти и
 *  файл не пошёл — один раз переключаемся на прямой адрес. Возвращает
 *  `true`, если переключили (вызывающий НЕ считает это отказом). */
export function fallbackToStream(el: HTMLAudioElement, path: string): boolean {
  if (!el.src.startsWith('blob:')) return false
  const url = mediaUrl(path)
  if (url.startsWith('blob:')) return false
  el.src = url
  void el.play().catch(() => {})
  return true
}

/** `play()` отклонён потому, что не загрузился blob из памяти (а не
 *  «автозапуск запрещён»): решать будет `onerror` — он переключит на поток.
 *  Иначе вопрос пошёл бы дальше при живой озвучке. */
export function loadFailedFromMemory(el: HTMLAudioElement, err: unknown, wasBlob: boolean = el.src.startsWith('blob:')): boolean {
  // wasBlob запоминают ДО play(): к моменту отказа onerror мог уже переставить src на сетевой адрес
  return wasBlob && err instanceof Error && err.name === 'NotSupportedError'
}
