// Стенд арены (vite dev: /e2e/bulldog/arena.html). Сегмент: Race V3, seed 328, D=42, окно 8–30 с (22 с). Управление из консоли: window.arena.draw(t)
import { ArenaRenderer } from '../../src/lib/bulldog/arena/arena'
const cv = document.getElementById('cv') as HTMLCanvasElement
const q = new URLSearchParams(location.search)
const r = new ArenaRenderer(cv, { slotBase: `${import.meta.env.BASE_URL}arena/`, guide: q.has('guide') })
;(window as unknown as { arena: ArenaRenderer; ready: boolean }).arena = r
const DUR = 22
r.init({ seed: 328, D: 42 }, 8, DUR).then(() => {
  const sh = Number(q.get('standsH')); if (sh) for (const l of r.slots) if (l.spec.id === 'stands_crowd') { l.spec.tileW = sh * l.spec.tileW / l.spec.tileH; l.spec.tileH = sh }          // стенд: примерка масштаба трибуны
  ;(window as unknown as { ready: boolean }).ready = true
  const t0 = performance.now(); const loop = (now: number) => { if (!q.has('still')) r.draw(((now - t0) / 1000) % DUR); requestAnimationFrame(loop) }; requestAnimationFrame(loop)
})
