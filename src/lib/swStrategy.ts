// ═══ Классификация запросов для Service Worker — чистая функция ═══
//
// Офлайн-устойчивость, шаг 8 (последний из плана architect, issue #4/#5):
// Service Worker кеширует само приложение (HTML/JS/CSS/шрифты), не только
// медиа/данные пакета (это уже сделано в шагах 1–7, см. HANDOFF.md §3ar и
// выше).
//
// `public/sw.js` НЕ входит в сборку Vite — файлы `public/` копируются как
// есть, TS/Rollup их не видит. Заведён БЕЗ workbox/vite-plugin-pwa
// (конфликтуют с ручными `manualChunks` в vite.config.ts — см. CLAUDE.md).
// Значит `sw.js` физически не может `import` этот модуль в браузере: у
// него нет бандлера, который бы такой импорт разрешил.
//
// Чтобы при этом не плодить логику в двух местах бесконтрольно: этот файл
// — канонический текст решающей функции, `public/sw.js` содержит
// БУКВАЛЬНУЮ копию (скопированную вручную, тем же порядком веток). Тест
// `__tests__/swStrategy.test.ts` не только проверяет эту функцию — он ещё
// читает исходник `public/sw.js`, достаёт оттуда тело `classifyRequest` и
// гоняет ПО НЕМУ те же кейсы, так что расхождение копии с оригиналом
// красит прогон красным, а не остаётся незамеченным. Меняешь стратегию —
// меняй сначала здесь, потом копируй в `sw.js`, потом гоняй тест.
export type Strategy = 'network-first' | 'cache-first' | 'bypass'

const MEDIA_EXT = /\.(mp3|mp4|ogg|wav|webm|png|jpe?g|webp|gif|svg|ico|woff2?|ttf)$/i

/**
 * `url` — запрашиваемый адрес (абсолютный или относительный к `origin`).
 * `origin` — origin самой страницы (`self.location.origin` в SW).
 * `base` — `import.meta.env.BASE_URL` / `vite.config.ts: base` (`/quiz-party/`).
 * `mode` — `request.mode` (`'navigate'` у перехода по адресу/ссылке).
 */
export function classifyRequest(url: string, origin: string, base: string, mode?: string): Strategy {
  let u: URL
  try {
    u = new URL(url, origin)
  } catch {
    return 'bypass'
  }

  // Другой origin — облако Supabase, локальный сервер бара (свой адрес
  // `http://192.168.x.x:7331`, mixed content не даёт им быть одним origin
  // со страницей — см. HANDOFF §3aq), любой внешний ресурс. SW не должен
  // вмешиваться вообще: не отвечать из кеша, не пытаться сохранять.
  if (u.origin !== origin) return 'bypass'

  // На случай, если когда-нибудь `/api/*` появится на ЭТОМ ЖЕ origin —
  // явная проверка path, а не только origin.
  if (u.pathname.startsWith(base + 'api/') || u.pathname.startsWith('/api/')) return 'bypass'

  // index.html — САМОЕ ВАЖНОЕ правило, см. комментарий в sw.js целиком.
  // Кратко: cache-first здесь после деплоя отдал бы страницу со ссылками
  // на уже не существующие хеш-чанки → ChunkBoundary → автоперезагрузка →
  // снова старый index.html из кеша → бесконечный цикл на проекторе.
  if (mode === 'navigate' || u.pathname === base || u.pathname === base + 'index.html' || u.pathname === '/') {
    return 'network-first'
  }

  // `/assets/*` — хешированные Vite-сборкой файлы, значит иммутабельные:
  // хеш в имени сам гарантирует актуальность, кешировать навсегда безопасно.
  if (u.pathname.includes('/assets/')) return 'cache-first'

  // Шрифты (`public/fonts/*.woff2`) и медиа пакета (`public/*.mp3` и т.п.)
  // — статика, которая не меняется между деплоями.
  if (u.pathname.startsWith(base + 'fonts/')) return 'cache-first'
  if (MEDIA_EXT.test(u.pathname)) return 'cache-first'

  // Неизвестный тип запроса на своём origin — по умолчанию как HTML:
  // свежее важнее закешированного, если сеть есть.
  return 'network-first'
}
