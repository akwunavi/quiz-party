// ═══ ОЧЕРЕДЬ ПРЕДЗАГРУЗКИ ОЗВУЧЕК (10.75) ═══
// Симптом с живой игры: озвучка вопроса «заглохла на ~15 с и продолжила с
// того же места» — звук стримился с сервера в момент проигрывания и
// остановился по буферу. Лечение: все озвучки пака качаются в память
// заранее (пока читают правила), а играют из blob-URL.
//
// Модуль ЧИСТЫЙ: сеть, blob-URL, пауза и «играет ли элемент» приходят
// снаружи (`LoaderDeps`) — очередь, повторы, вытеснение и счётчики
// проверяются тестами без браузера. Рабочая обвязка — `voicePreload.ts`.
//
// Правила:
//  • ограниченная параллельность (по умолчанию 2) — канал бара узкий, а
//    текущий звук не должен голодать;
//  • повтор с нарастающей паузой; «файла нет в хранилище» не повторяем;
//  • файл больше потолка в память не кладём (`skipped` — доиграет потоком);
//  • память ограничена: при превышении вытесняются ОТЫГРАННЫЕ (самые давние),
//    никогда — играющие сейчас (revoke на играющем элементе рвёт звук) и
//    никогда — ещё не отыгранные: на них остаётся запасной путь «поток»;
//  • порядок очереди задаёт вызывающий (`setList`): сначала то, что нужно
//    раньше всего.

export type VoiceItemState = 'pending' | 'loading' | 'done' | 'failed' | 'skipped'

export interface LoaderDeps {
  fetchBlob(path: string): Promise<Blob>
  createUrl(b: Blob): string
  revokeUrl(u: string): void
  sleep(ms: number): Promise<void>
  /** blob-URL сейчас стоит в src у живого элемента */
  inUse(blobUrl: string): boolean
  /** сетевой адрес пути — для поиска по адресу (`getByUrl`) */
  urlOf(path: string): string
}

export interface LoaderOpts {
  concurrency?: number
  retryDelaysMs?: number[]
  maxFileBytes?: number
  maxTotalBytes?: number
}

export interface VoiceStatus {
  total: number
  /** скачано в память (или осознанно оставлено потоком) */
  done: number
  failed: number
  loading: number
}

interface Item {
  path: string
  state: VoiceItemState
  blobUrl?: string
  bytes: number
  played: boolean
  lastUsed: number
  attempts: number
}

export const NOT_FOUND_MSG = 'ФАЙЛА НЕТ В ХРАНИЛИЩЕ'

export function createVoiceLoader(deps: LoaderDeps, opts: LoaderOpts = {}) {
  const concurrency = opts.concurrency ?? 2
  const retryDelays = opts.retryDelaysMs ?? [500, 1500, 4000]
  const maxFile = opts.maxFileBytes ?? 40 * 1024 * 1024
  const maxTotal = opts.maxTotalBytes ?? 250 * 1024 * 1024

  const items = new Map<string, Item>()
  let order: string[] = []
  let active = 0
  let tick = 0
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach(fn => { try { fn() } catch { /* подписчик не роняет загрузку */ } })

  function release(it: Item) {
    if (it.blobUrl) { try { deps.revokeUrl(it.blobUrl) } catch { /* уже отозван */ } it.blobUrl = undefined }
  }

  function totalBytes() {
    let n = 0
    items.forEach(it => { if (it.blobUrl) n += it.bytes })
    return n
  }

  /** Освободить место: сначала отыгранные (самые давние), играющие не трогаем. */
  function enforceBudget() {
    if (totalBytes() <= maxTotal) return
    const played = [...items.values()]
      .filter(it => it.blobUrl && it.played && !deps.inUse(it.blobUrl))
      .sort((a, b) => a.lastUsed - b.lastUsed)
    for (const it of played) {
      if (totalBytes() <= maxTotal) break
      release(it)
    }
    if (totalBytes() > maxTotal) {
      // места нет и вытеснять нечего — остальное доиграет потоком
      items.forEach(it => { if (it.state === 'pending') it.state = 'skipped' })
    }
  }

  async function load(it: Item) {
    it.state = 'loading'
    notify()
    for (let attempt = 0; attempt <= retryDelays.length; attempt++) {
      if (items.get(it.path) !== it) return            // убрали из списка — бросаем
      try {
        const blob = await deps.fetchBlob(it.path)
        if (items.get(it.path) !== it) return
        it.attempts = attempt + 1
        if (blob.size > maxFile) { it.state = 'skipped'; return }
        it.bytes = blob.size
        it.blobUrl = deps.createUrl(blob)
        it.lastUsed = ++tick
        it.state = 'done'
        enforceBudget()
        return
      } catch (e) {
        it.attempts = attempt + 1
        const permanent = e instanceof Error && e.message === NOT_FOUND_MSG
        if (permanent || attempt >= retryDelays.length) break
        await deps.sleep(retryDelays[attempt])
      }
    }
    if (items.get(it.path) === it) it.state = 'failed'
  }

  function pump() {
    while (active < concurrency) {
      const key = order.find(p => items.get(p)?.state === 'pending')
      if (!key) break
      const it = items.get(key)!
      active++
      void load(it).finally(() => { active--; notify(); pump() })
    }
  }

  function get(path: string): string | undefined {
    const it = items.get(path)
    if (!it?.blobUrl) return undefined
    it.played = true
    it.lastUsed = ++tick
    return it.blobUrl
  }

  return {
    /** Список путей В ПОРЯДКЕ ВАЖНОСТИ. Новые встают в очередь, порядок
     *  ожидающих меняется, выпавшие из списка освобождаются (если их не
     *  играет элемент). Уже скачанное не качается повторно. */
    setList(paths: string[]) {
      const next = [...new Set(paths.filter(Boolean))]
      const keep = new Set(next)
      for (const [p, it] of items) {
        if (keep.has(p)) continue
        if (it.blobUrl && deps.inUse(it.blobUrl)) continue     // доиграет — уберём в следующий раз
        release(it)
        items.delete(p)
      }
      for (const p of next) {
        if (!items.has(p)) items.set(p, { path: p, state: 'pending', bytes: 0, played: false, lastUsed: 0, attempts: 0 })
      }
      order = next
      notify()
      pump()
    },
    /** Заново поставить в очередь упавшие. */
    retryFailed() {
      let any = false
      items.forEach(it => { if (it.state === 'failed') { it.state = 'pending'; any = true } })
      if (any) { notify(); pump() }
    },
    /** Подтолкнуть очередь (вкладка снова видна, сеть вернулась). */
    kick() { pump() },
    /** blob-URL скачанной озвучки; вызов считается началом проигрывания. */
    get,
    getByUrl(url: string): string | undefined {
      for (const p of order) if (deps.urlOf(p) === url) return get(p)
      return undefined
    },
    status(): VoiceStatus {
      let done = 0, failed = 0, loading = 0
      for (const p of order) {
        const s = items.get(p)?.state
        if (s === 'done' || s === 'skipped') done++
        else if (s === 'failed') failed++
        else if (s === 'loading') loading++
      }
      return { total: order.length, done, failed, loading }
    },
    subscribe(fn: () => void): () => void {
      listeners.add(fn)
      return () => { listeners.delete(fn) }
    },
    /** Только для тестов. */
    _bytes: totalBytes,
    _state: (p: string) => items.get(p)?.state,
    _hasBlob: (p: string) => !!items.get(p)?.blobUrl,
  }
}

export type VoiceLoader = ReturnType<typeof createVoiceLoader>
