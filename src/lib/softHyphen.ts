// ═══ Мягкие переносы русских слов (U+00AD) — ЧИСТАЯ функция, без DOM ═══
// Заголовок раунда в «Книге» вписывается замером; очень длинное слово («НОВОГОДНЕРОЖДЕСТВЕНСКАЯ») при этом не должно ужиматься до мелкого кегля — ему даётся
// возможность перенестись по слогам. hyphens:auto в Chromium на Linux/Windows зависит от скачиваемого словаря, поэтому переносы расставляем сами.
// Правила (упрощённая русская слогоделимость): слог держится на гласной; между гласными — перенос перед согласной (V|CV); между двумя согласными — после первой (VC|CV);
// не отрываем «й», «ь», «ъ» от предыдущей буквы; на каждой стороне не меньше 3 букв; слова короче 9 букв не трогаем.
const VOWELS = new Set('аеёиоуыэюяАЕЁИОУЫЭЮЯ'.split(''))
const SOFT = '­'
const isV = (c: string) => VOWELS.has(c)
const isLetter = (c: string) => /[А-Яа-яЁё]/.test(c)

export function syllableBreaks(word: string, minSide = 3): number[] {
  const w = [...word]
  if (w.length < 9 || !w.every(isLetter)) return []
  const out: number[] = []
  for (let i = 1; i < w.length; i++) {
    const prev = w[i - 1], cur = w[i]
    if ('йьъЙЬЪ'.includes(cur)) continue            // не отрываем от предыдущей буквы
    let ok = false
    if (isV(prev) && !isV(cur)) {
      // V|C…: перенос перед согласной, если за ней гласная (V|CV); если две согласные подряд — после первой (VC|CV)
      ok = i + 1 < w.length && isV(w[i + 1])
    } else if (!isV(prev) && !isV(cur) && i >= 2 && isV(w[i - 2]) && !'ьъЬЪ'.includes(prev)) {
      // VC|CV и VC|CCV: после первой согласной кластера, если дальше (через ≤3 согласных) идёт гласная
      let j = i; while (j < w.length && !isV(w[j]) && j - i < 3) j++
      ok = j < w.length && isV(w[j])
    } else if (isV(prev) && isV(cur)) {
      ok = true                                        // V|V
    }
    if (ok && i >= minSide && w.length - i >= minSide) out.push(i)
  }
  // не больше одного места на каждые ~4 буквы — иначе слово рвётся на огрызки
  const thin: number[] = []
  for (const i of out) if (!thin.length || i - thin[thin.length - 1] >= 4) thin.push(i)
  return thin
}

/** Вставляет U+00AD в длинные слова текста. */
export function softHyphenate(text: string): string {
  return text.replace(/[А-Яа-яЁё]{9,}/g, w => {
    const br = new Set(syllableBreaks(w))
    return [...w].map((c, i) => (br.has(i) ? SOFT + c : c)).join('')
  })
}
