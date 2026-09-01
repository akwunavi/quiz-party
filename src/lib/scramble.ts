// ═══ «ВЗЛОМ ТЕРМИНАЛА»: посимвольная дешифровка заголовка (классика) ═══
//
// Чистая функция без побочных эффектов — не тянет за собой HostScreen.tsx
// (импорт оттуда утаскивает весь чанк проектора, см. HANDOFF §1a).
//
// Длина результата ОБЯЗАНА совпадать с длиной входа посимвольно: кегль
// заставки и логотипа лобби считается формулой от `--longest`
// (`24-round-intro.css`, `28-theme-cyber.css`) — другая длина строки даст
// скачок кегля на глазах у зала. Пробелы и переносы сохраняются как есть,
// иначе слово «QUIZ PARTY» на миг слипалось бы в один блок.

const NOISE = '01#$%&/\\<>[]{}ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/** Простой детерминированный ГПСЧ (mulberry32) — тот же seed даёт тот же
 *  «шум», иначе кадры дешифровки дёргались бы случайно между рендерами. */
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * @param text исходная строка
 * @param progress доля «дешифрованных» символов слева направо, 0…1
 * @param seed фиксирует случайный «шум» на нерасшифрованных позициях
 */
export function scramble(text: string, progress: number, seed = 1): string {
  const p = Math.max(0, Math.min(1, progress))
  if (p >= 1) return text
  const rand = rng(seed)
  const revealTo = Math.floor(text.length * p)
  let out = ''
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (i < revealTo || /\s/.test(ch)) { out += ch; continue }
    out += NOISE[Math.floor(rand() * NOISE.length)]
  }
  return out
}
