// ═══ Клиентская сторона Service Worker'а (офлайн-устойчивость, шаг 8) ═══
// Сам SW — `public/sw.js` (стратегия объяснена там и в `swStrategy.ts`).
// Этот файл — то, что зовёт браузер: регистрация и «прогрев» кеша по
// сигналу от кнопки предзагрузки пакета (шаг 5, `usePackOffline.ts`).

/** Регистрировать SW только в защищённом контексте. На `http://192.168.x.x`
 *  (локальный режим, шаг 6/Part B) `isSecureContext` будет `false` — SW там
 *  и не должен появляться, это ожидаемо, а не баг: у mixed-content origin
 *  своя история (см. HANDOFF §3aq), к кешу приложения отношения не имеет. */
export function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return
  const url = import.meta.env.BASE_URL + 'sw.js'
  void navigator.serviceWorker.register(url, { scope: import.meta.env.BASE_URL }).catch(() => {
    // Регистрация — best-effort. Игра не должна зависеть от того, встал
    // ли SW: без него всё работает как раньше, просто без офлайн-кеша
    // самого приложения.
  })
}

/** «Прогрев»: попросить SW закешировать всё, что вкладка уже успела
 *  скачать сама (JS/CSS/шрифты — обычные сетевые ресурсы этой же вкладки),
 *  плюс явно дотянуть чанки экранов ведущего (`HostScreen`/`AdminPage`) —
 *  те же два пути, что фоново подгружает `Prefetch` в `App.tsx`. Повторный
 *  `import()` уже загруженного модуля браузер не перекачивает (кеш модулей),
 *  но гарантированно оставляет запись в `performance.getEntriesByType`,
 *  даже если пользователь успел кликнуть кнопку раньше, чем сработал
 *  фоновый Prefetch. */
export async function warmServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return
  const registration = await navigator.serviceWorker.ready.catch(() => null)
  if (!registration) return

  await Promise.allSettled([
    import('../pages/HostScreen'),
    import('../pages/AdminPage'),
  ])

  const controller = navigator.serviceWorker.controller
  if (!controller) return // SW ещё не управляет этой вкладкой (первый заход, до перезагрузки) — прогревать некуда

  const urls = Array.from(new Set(
    performance.getEntriesByType('resource')
      .map(e => e.name)
      .filter(u => u.startsWith(location.origin)),
  ))
  if (urls.length === 0) return
  controller.postMessage({ type: 'warm', urls })
}
