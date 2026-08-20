// ═══ ПРОВЕРКА ВОПРОСОВ ИИ ═══
// Edge Function: браузер шлёт сюда текст вопроса или всего раунда, функция
// ходит к DeepSeek и возвращает разбор. Ключ живёт в секретах Supabase и
// в браузер НЕ ПОПАДАЕТ — это единственная причина, по которой нужна
// серверная прослойка, а не прямой вызов из приложения.
//
// Установка:
//   1. supabase secrets set DEEPSEEK_API_KEY=<ключ>
//   2. supabase functions deploy review-question
//
// Смена провайдера (на Gemini или другой) — это правка BASE и MODEL ниже
// плюс имя секрета; формат запроса у DeepSeek совместим с OpenAI.

const BASE = 'https://api.deepseek.com/chat/completions'
// основная и запасная модели: если основной ID отключат, разбор не встанет колом
const MODELS = ['deepseek-v4-flash', 'deepseek-chat']

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// ── Промпт для ОДНОГО вопроса ──
// Просим строгий JSON: свободный текст пришлось бы парсить регулярками,
// а это ломается на первом же неожиданном ответе модели.
const ONE_SYSTEM = `Ты — редактор квизов с многолетним опытом. Проверяешь вопросы
перед игрой в баре или на дружеской вечеринке.

Оцени вопрос по пунктам и верни СТРОГО JSON без markdown и без пояснений вокруг:
{
  "verdict": "ok" | "warn" | "bad",
  "difficulty": 1..5,
  "difficulty_note": "кратко, почему такая сложность",
  "solve_seconds": число,
  "solve_path": "как команда дойдёт до ответа",
  "issues": [{"kind": "...", "text": "..."}],
  "suggestion": "как переформулировать, если нужно; иначе пустая строка"
}

Что искать (kind):
- "ambiguous"  — возможен другой верный ответ, формулировка допускает толкования
- "outdated"   — факт мог устареть; укажи, что именно проверить
- "hint"       — формулировка подсказывает ответ
- "wrong"      — ответ похож на фактическую ошибку
- "narrow"     — вопрос на редкое узкоспециальное знание, зал не возьмёт
- "wording"    — тяжёлая или путаная формулировка, плохо звучит вслух
- "answer"     — проблема в поле ответа: слишком длинный, неоднозначная запись

ВРЕМЯ РАСКРУТКИ. Отдельно прикинь, сколько СЕКУНД команде нужно, чтобы дойти
до ответа: не «вспомнить», а именно рассуждать — разобрать формулировку,
перебрать варианты, договориться внутри команды. Считай как реальная команда
из четырёх человек в шумном баре, а не как эрудит-одиночка.

Верни это в "solve_seconds". Ориентиры:
- знают сразу, остаётся записать: 10-20 сек
- надо вспомнить, но путь очевиден: 25-45 сек
- нужна цепочка рассуждений в 2-3 шага: 50-90 сек
- длинная раскрутка, спор в команде: 100-180 сек

В "solve_path" опиши ход рассуждения в одну-две фразы — по нему видно,
откуда взялась оценка, и можно спорить с ней предметно.

Шкала сложности: 1 — знают почти все, 3 — возьмёт половина зала,
5 — возьмёт одна команда из десяти.

verdict "bad" ставь только при реальной проблеме: неверный ответ, двусмысленность,
подсказка в тексте. Стилистика — это "warn". Если вопрос хороший, issues пустой.
Отвечай по-русски.`

// ── Промпт для ЦЕЛОГО раунда ──
// Здесь смысл другой: не придирки к каждому вопросу, а раунд как целое —
// кривая сложности, повторы тем, темп.
const ROUND_SYSTEM = `Ты — редактор квизов. Перед тобой РАУНД целиком.
Оцени его как единое целое, а не как список отдельных вопросов.

Верни СТРОГО JSON без markdown:
{
  "summary": "2-3 предложения: как раунд играется целиком",
  "difficulty_curve": "оценка порядка вопросов: раунд должен начинаться легче и усложняться",
  "balance": "разброс тем и форматов: нет ли перекоса",
  "questions": [{"n": номер, "solve_seconds": число, "verdict": "fits" | "tight" | "over"}],
  "over_timer": ["номера вопросов, где раскрутка НЕ уложится в таймер"],
  "issues": [{"kind": "...", "text": "...", "question": номер вопроса или null}],
  "recommendations": ["конкретное действие", "..."]
}

ГЛАВНАЯ ПРОВЕРКА — ВРЕМЯ. Для каждого вопроса прикинь, сколько СЕКУНД команде
нужно на раскрутку (рассуждать, а не вспоминать: разобрать формулировку,
перебрать варианты, договориться). Считай как реальная команда из четырёх
человек в шумном баре.

Сравни с таймером раунда, он указан во входных данных:
- "fits"  — раскрутка укладывается с запасом
- "tight" — впритык, меньше 20% запаса
- "over"  — НЕ УКЛАДЫВАЕТСЯ: такой вопрос считается сложным

Вопросы из "over" — это и есть перебор по сложности. Если их больше трети
раунда, прямо скажи в summary, что раунд перегружен, и предложи, какие
именно вопросы упростить, заменить или дать им больше времени.

Что искать:
- "order"      — сложный вопрос в начале или лёгкий в конце, кривая сложности сломана
- "duplicate"  — два вопроса про одно и то же, пересекающиеся темы или ответы
- "monotony"   — все вопросы одного формата подряд, раунд однообразный
- "bias"       — перекос: половина раунда про кино, или всё про одно десятилетие
- "length"     — раунд слишком длинный или короткий для своего места в игре
- "gap"        — заметная дыра: например, ни одного вопроса на визуальное восприятие

recommendations — конкретные действия («поменять местами 1 и 4»,
«заменить вопрос 6, дублирует 2»), а не общие советы. Отвечай по-русски.`

/** Калибровка по прошлым решениям редактора.
 *  Модель НЕ дообучается — она стерильна между вызовами. Но мы можем каждый
 *  раз показывать ей, какие прошлые замечания редактор принял, а какие
 *  отклонил. Это подстраивает придирчивость под конкретного человека. */
function calibration(examples: { text: string; accepted: boolean }[] = []) {
  if (examples.length === 0) return ''
  const yes = examples.filter(e => e.accepted).slice(-12)
  const no = examples.filter(e => !e.accepted).slice(-12)
  let out = '\n\nКАЛИБРОВКА ПОД ЭТОГО РЕДАКТОРА (важнее общих правил):'
  if (yes.length) out += '\nЗамечания, которые он ПРИНЯЛ и исправил — ищи такое же:\n'
    + yes.map(e => '- ' + e.text).join('\n')
  if (no.length) out += '\nЗамечания, которые он ОТКЛОНИЛ — НЕ повторяй их:\n'
    + no.map(e => '- ' + e.text).join('\n')
  return out
}

async function ask(system: string, user: string) {
  const key = Deno.env.get('DEEPSEEK_API_KEY')
  if (!key) throw new Error('DEEPSEEK_API_KEY не задан в секретах Supabase')

  let res: Response | null = null
  let lastErr = ''
  for (const model of MODELS) {
    res = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
        temperature: 0.3,             // разбор должен быть стабильным, не творческим
        max_tokens: 1600,
        response_format: { type: 'json_object' },
      }),
    })
    if (res.ok) break
    const body = (await res.text()).slice(0, 400)
    // расшифровываем типовые коды: иначе на экране просто «non-2xx»
    if (res.status === 401) throw new Error(
      'Ключ DeepSeek не принят (401). Проверь, что в секрет DEEPSEEK_API_KEY '
      + 'вставлен полный ключ вида sk-… без пробелов и кавычек.')
    if (res.status === 402) throw new Error(
      'На счёте DeepSeek нет средств (402). Стартовые токены израсходованы '
      + 'или не начислены — пополни баланс в кабинете.')
    if (res.status === 429) throw new Error(
      'Слишком много запросов к DeepSeek (429). Подожди минуту и повтори.')
    lastErr = `${res.status}: ${body}`
    // 400 обычно значит «нет такой модели» — пробуем запасную
    if (res.status !== 400 && res.status !== 404) break
  }
  if (!res || !res.ok) throw new Error(`ИИ вернул ошибку ${lastErr}`)

  const data = await res.json()
  const text: string = data?.choices?.[0]?.message?.content ?? ''
  // на всякий случай снимаем ограждение ```json, если модель его добавила
  const clean = text.replace(/```json|```/g, '').trim()
  try { return JSON.parse(clean) }
  catch { throw new Error('ИИ вернул не JSON: ' + clean.slice(0, 200)) }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  try {
    const body = await req.json()

    // Режим проверки связи: не тратит токены на разбор, только проверяет,
    // что ключ на месте и провайдер отвечает. Нужен, чтобы отличить
    // «сломался ИИ» от «сломалась функция».
    if (body.mode === 'ping') {
      const key = Deno.env.get('DEEPSEEK_API_KEY')
      if (!key) throw new Error('DEEPSEEK_API_KEY не задан в секретах Supabase')
      const r = await fetch('https://api.deepseek.com/models', {
        headers: { Authorization: `Bearer ${key}` },
      })
      const txt = (await r.text()).slice(0, 300)
      return new Response(JSON.stringify({
        ok: r.ok, status: r.status,
        key_tail: '…' + key.slice(-4),
        body: txt,
      }), { headers: { ...CORS, 'Content-Type': 'application/json' } })
    }

    const cal = calibration(body.examples)
    const result = body.mode === 'round'
      ? await ask(ROUND_SYSTEM + cal, body.payload)
      : await ask(ONE_SYSTEM + cal, body.payload)
    return new Response(JSON.stringify(result), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : 'неизвестная ошибка' }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } },
    )
  }
})
