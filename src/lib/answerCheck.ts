// ═══ Автопроверка ответов (перенос из старого проекта, TS) ═══
// Нормализация: нижний регистр, ё→е, без пунктуации и лишних пробелов.

export function normalize(text: unknown): string {
  return String(text ?? '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function isMatch(answer: string, correct: string): boolean | null {
  const a = normalize(answer)
  if (!a) return null                       // пусто = пропуск, не ошибка
  return a === normalize(correct)
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  const m = a.length, n = b.length
  if (!m) return n
  if (!n) return m
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    const cur = [i]
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    prev = cur
  }
  return prev[n]
}

function tolerance(len: number): number {
  return len <= 4 ? 1 : len <= 8 ? 2 : 3
}

/** Числа опечаток не прощают: "9" и "19"/"10"/"90" — РАЗНЫЕ ответы, а не
 *  опечатка друг друга, хотя Левенштейн между ними может быть 1 — такой же,
 *  как между "начяло" и "начало". Для чисто цифрового варианта ответа
 *  нужно точное совпадение, не расстояние редактирования. */
const isNumeric = (s: string) => /^\d+$/.test(s)

/** Фаззи: варианты правильного через " / ", допуск на опечатки по длине —
 *  кроме чисто числовых вариантов (см. isNumeric выше), там только точное
 *  совпадение. */
export function isFuzzyMatch(answer: string, correct: string): boolean | null {
  const a = normalize(answer)
  if (!a) return null
  const variants = String(correct ?? '').split('/').map(normalize).filter(Boolean)
  return variants.some(v => isNumeric(v) ? a === v : levenshtein(a, v) <= tolerance(v.length))
}

/** Гомоглифы: А/В/С/Е/К/М/Н/О/Р/Т/Х латиница↔кириллица. */
const HOMOGLYPHS: Record<string, string> = {
  a: 'а', b: 'в', c: 'с', e: 'е', h: 'н', k: 'к',
  m: 'м', o: 'о', p: 'р', t: 'т', x: 'х', y: 'у',
}
export function letterEq(a: string, b: string): boolean {
  const norm = (s: unknown) =>
    String(s ?? '').trim().toLowerCase().split('')
      .map(ch => HOMOGLYPHS[ch] ?? ch).join('')
  return norm(a) !== '' && norm(a) === norm(b)
}

/** Кроссворд: слово верно, если после нормализации буквы совпали. */
export function isCrosswordWordCorrect(input: string, word: string): boolean | null {
  const a = normalize(input).replace(/\s/g, '')
  if (!a) return null
  return a === normalize(word).replace(/\s/g, '')
}

/** Ребус: автовалидация правила «3 последние буквы word1 + 3 первые word2». */
export function rebusExpected(word1: string, word2: string): string {
  const w1 = normalize(word1).replace(/\s/g, '')
  const w2 = normalize(word2).replace(/\s/g, '')
  return w1.slice(-3) + w2.slice(0, 3)
}
export function rebusRuleHolds(word1: string, word2: string, answer: string): boolean {
  return rebusExpected(word1, word2) === normalize(answer).replace(/\s/g, '')
}
