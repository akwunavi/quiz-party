// ═══ Service Worker: кеш самого приложения (офлайн-устойчивость, шаг 8) ═══
//
// Шаги 1–7 плана (issue #4/#5, см. HANDOFF.md, раздел про офлайн-
// устойчивость) закрыли медиа и данные игры (IndexedDB, `packCache.ts`,
// локальный сервер бара). Этот файл — последний кусок: чтобы сама
// страница (HTML/JS/CSS/шрифты) открывалась даже без сети, а не только
// то, что она умеет показать после открытия.
//
// БЕЗ workbox / vite-plugin-pwa — эти инструменты переписывают сборку и
// конфликтуют с ручными `manualChunks` в vite.config.ts (см. CLAUDE.md).
// Файл лежит в `public/` и копируется Vite как есть, без обработки — то
// есть весь код ниже реально исполняется браузером, никакой транспиляции.
//
// ⚠ САМОЕ ВАЖНОЕ ПРАВИЛО ФАЙЛА, читай перед любой правкой стратегии:
// `index.html` — ТОЛЬКО network-first (сеть, и только при провале — кеш).
// Если сделать для него cache-first, то после каждого деплоя браузер
// продолжит отдавать СТАРЫЙ index.html — тот ссылается на уже не
// существующие хеш-чанки (`assets/HostScreen-<старый-хеш>.js`). Экран
// пробует их загрузить → падает → `ChunkBoundary` (`src/App.tsx`) ловит
// ошибку загрузки чанка и через 1.5 сек делает `location.reload()` →
// браузер СНОВА получает тот же старый index.html из кеша → снова падает.
// Бесконечный цикл перезагрузок на проекторе прямо посреди игры, без
// единого шанса на восстановление кнопкой пользователя. Не «оптимизируй»
// это в cache-first ради лишних миллисекунд — цена ошибки тут неприемлема.
//
// ⚠ ВТОРОЕ ПРАВИЛО: НЕ вызывать self.skipWaiting() автоматически. Если
// вызвать его сразу при получении новой версии SW, у уже открытой вкладки
// проектора/админки код подменится под ногами ПРЯМО ПОСРЕДИ ИГРЫ — новый
// SW начнёт перехватывать запросы раньше, чем страница готова к новому
// поведению. Новая версия подхватывается только на следующей ручной
// перезагрузке страницы (обычное поведение SW без skipWaiting) — ничего
// сверх этого специально не делаем.
//
// ⚠ ВЕРСИЯ ОБЯЗАНА СОВПАДАТЬ С src/version.ts. При каждом бампе версии в
// src/version.ts — синхронно бампай и константу ниже (см. CLAUDE.md,
// раздел 4). Разъедутся — старый кеш не инвалидируется, и на проде долго
// живёт версия, которую уже никто не собирал.
const VERSION = '9.07'
const CACHE = 'qp-' + VERSION
const BASE = '/quiz-party/'
const NETWORK_TIMEOUT_MS = 3500

// ─── classifyRequest — БУКВАЛЬНАЯ копия src/lib/swStrategy.ts ───
// sw.js не входит в сборку Vite (public/ копируется как есть) и намеренно
// без бандлера — импортировать TS-модуль отсюда нельзя. Канонический,
// протестированный текст этой функции лежит в `src/lib/swStrategy.ts`;
// тест `src/lib/__tests__/swStrategy.test.ts` читает ЭТОТ файл и гоняет
// те же кейсы по копии ниже — расхождение красит прогон красным. Меняешь
// стратегию — меняй сначала `swStrategy.ts`, потом копируй сюда СЛОВО В
// СЛОВО (порядок веток тоже важен, тест сверяет их построчно).
const MEDIA_EXT = /\.(mp3|mp4|ogg|wav|webm|png|jpe?g|webp|gif|svg|ico|woff2?|ttf)$/i

function classifyRequest(url, origin, base, mode) {
  let u
  try {
    u = new URL(url, origin)
  } catch {
    return 'bypass'
  }

  if (u.origin !== origin) return 'bypass'

  if (u.pathname.startsWith(base + 'api/') || u.pathname.startsWith('/api/')) return 'bypass'

  if (mode === 'navigate' || u.pathname === base || u.pathname === base + 'index.html' || u.pathname === '/') {
    return 'network-first'
  }

  if (u.pathname.includes('/assets/')) return 'cache-first'

  if (u.pathname.startsWith(base + 'fonts/')) return 'cache-first'
  if (MEDIA_EXT.test(u.pathname)) return 'cache-first'

  return 'network-first'
}
// ─── конец копии ───

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE))
})

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Удалить все кеши прежних версий — иначе они копятся вечно на диске
    // проектора/телефона ведущего.
    const keys = await caches.keys()
    await Promise.all(
      keys.filter(k => k !== CACHE && k.startsWith('qp-')).map(k => caches.delete(k)),
    )
    await self.clients.claim()
  })())
})

async function networkFirst(request) {
  const cache = await caches.open(CACHE)
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), NETWORK_TIMEOUT_MS)
    let response
    try {
      response = await fetch(request, { signal: controller.signal })
    } finally {
      clearTimeout(timer)
    }
    if (response && response.ok) {
      // Не ждём запись в кеш — страница не должна тормозить об это.
      cache.put(request, response.clone()).catch(() => {})
    }
    return response
  } catch {
    // Сеть недоступна или не успела за NETWORK_TIMEOUT_MS — фолбэк в кеш.
    const cached = await cache.match(request)
    if (cached) return cached
    // Ни сети, ни кеша (самый первый заход без интернета вообще) — честная
    // сетевая ошибка наружу, а не тихая заглушка.
    throw new Error('офлайн, и в кеше ничего нет: ' + request.url)
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE)
  const cached = await cache.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response && response.ok) {
    cache.put(request, response.clone()).catch(() => {})
  }
  return response
}

self.addEventListener('fetch', event => {
  const req = event.request
  // Только чтение: POST/PATCH/PUT/DELETE (запись очков, ответов и т.д.)
  // вообще не проходят через классификацию ниже — и так не должны, это
  // либо другой origin (Supabase/локальный сервер), либо не GET.
  if (req.method !== 'GET') return

  const strategy = classifyRequest(req.url, self.location.origin, BASE, req.mode)
  if (strategy === 'bypass') return // не вызываем respondWith — запрос идёт мимо SW как обычно

  if (strategy === 'network-first') {
    event.respondWith(networkFirst(req))
    return
  }
  event.respondWith(cacheFirst(req))
})

// «Прогрев»: страница просит закешировать то, что уже успела загрузить
// сама (ссылка на существующий, реально скачанный ответ — здесь не нужно
// заново дёргать сеть, если браузер уже это отдал по HTTP-кешу/сети).
self.addEventListener('message', event => {
  const data = event.data
  if (!data || data.type !== 'warm') return
  const urls = Array.isArray(data.urls) ? data.urls : []
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    await Promise.all(urls.map(async u => {
      try {
        const already = await cache.match(u)
        if (already) return
        const res = await fetch(u)
        if (res && res.ok) await cache.put(u, res)
      } catch {
        // лучшая попытка — один неудачный файл не должен ронять остальные
      }
    }))
  })())
})
