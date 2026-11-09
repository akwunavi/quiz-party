// Встроенный набор файлов собак для автономных демо (file://: fetch запрещён) — data/*.js кладут их в window.__BD.
import { setAssetSource } from '../../src/lib/bulldog/engine'

export function installEmbeddedAssets() {
  // ── встроенный набор файлов (data/*.js кладут их в window.__BD), вместо fetch, который file:// запрещает
  const BD = ((window as unknown as { __BD?: Record<string, unknown> }).__BD ??= {})
  const key = (u: string) => u.replace(/^.*?bulldog\//, '').replace(/\?.*$/, '')
  const blobs = new Map<string, Blob>()
  setAssetSource({
    prefetch: false,
    async json<T>(u: string) { const v = BD[key(u)]; if (v === undefined) throw new Error('нет в демо-наборе: ' + u); return v as T },
    async blob(u: string) {
      const k = key(u); let b = blobs.get(k)
      if (!b) {
        const s = BD[k]; if (typeof s !== 'string') throw new Error('нет в демо-наборе: ' + u)
        const bin = atob(s), a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i)
        b = new Blob([a], { type: 'image/webp' }); blobs.set(k, b)
      }
      return b
    },
  })


}
