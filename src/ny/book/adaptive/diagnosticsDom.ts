// ═══ BookLayoutDiagnostics, DOM-часть: снимок геометрии экрана → diagnoseLayout (ADAPTIVE.md) ═══
// Только чтение DOM. В бою включается ?bkdiag=1 или DEV; в стенде/e2e вызывается window.__bkDiagnose(). Игру не меняет.
import { useEffect, type RefObject } from 'react'
import { diagnoseLayout, type DiagInput, type DiagIssue } from './diagnostics'
import { TEXT_ROLES, type TextRole } from './fit'
import { bookRect, bookUnit, contentArea } from './safeArea'

const rectOf = (e: Element) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height } }

export function collectDiag(root: ParentNode): DiagInput {
  const viewport = { w: window.innerWidth, h: window.innerHeight }, u = bookUnit(viewport)
  const texts = [...root.querySelectorAll<HTMLElement>('[data-bk-text]')].map((el, i) => {
    const role = (el.dataset.bkText as TextRole) in TEXT_ROLES ? (el.dataset.bkText as TextRole) : 'plain'
    return { id: `text:${role}#${i}`, fontPx: parseFloat(getComputedStyle(el).fontSize), minPx: TEXT_ROLES[role].min * u,
      rect: rectOf(el), overflow: el.dataset.bkFit === 'overflow' }
  })
  const media = [...root.querySelectorAll<HTMLImageElement>('img[data-bk-photo]')].map((im, i) => ({
    id: `photo#${i}`, rect: rectOf(im), natural: { w: im.naturalWidth, h: im.naturalHeight }, foldOk: !!im.closest('[data-fold]') }))
  const containers = [...root.querySelectorAll<HTMLElement>('[data-bk-container]')].map((el, i) => ({
    id: `${el.dataset.bkContainer}#${i}`, scrollW: el.scrollWidth, clientW: el.clientWidth, scrollH: el.scrollHeight, clientH: el.clientHeight }))
  const q = root.querySelector('.host-topbar .qnum'), slot = root.querySelector('[data-bk-slot="timer"]'), art = slot?.querySelector('.p-ros')
  const crit = [...root.querySelectorAll('.choices-grid')].map((el, i) => ({ id: `choices#${i}`, rect: rectOf(el) }))
  return { viewport, content: contentArea(viewport), book: bookRect(viewport), texts, media, containers,
    qnum: q ? rectOf(q) : null, timer: slot && art ? { slot: rectOf(slot), art: rectOf(art), artRatio: parseFloat((slot as HTMLElement).dataset.artRatio ?? '') || 1 } : null, critical: crit, mediaMayCrossFold: false }
}

declare global { interface Window { __bkDiagnose?: () => DiagIssue[] } }

/** Хук экрана вопроса «Книги»: пересчитывает диагностику после загрузки/ресайза/шрифтов, пишет data-bk-diag на корень экрана
 *  (ok | N замечаний), в консоль — только при ?bkdiag=1 или DEV. Никаких побочных эффектов на игру. */
export function useBookDiagnostics(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const root = ref.current
    if (!enabled || !root) return
    const loud = /[?&]bkdiag=1/.test(location.href) || import.meta.env.DEV
    let t = 0, last = ''
    const run = () => {
      const issues = diagnoseLayout(collectDiag(root))
      root.dataset.bkDiag = issues.length ? String(issues.length) : 'ok'
      root.dataset.bkDiagCodes = [...new Set(issues.map(i => i.code))].join(' ')
      const sig = issues.map(i => `${i.code}:${i.id}`).join(',')
      if (loud && issues.length && sig !== last) console.warn('[book-diag]', issues)
      last = sig
    }
    const soon = () => { clearTimeout(t); t = window.setTimeout(run, 350) }
    window.__bkDiagnose = () => diagnoseLayout(collectDiag(root))
    const ro = new ResizeObserver(soon); ro.observe(root)
    root.addEventListener('load', soon, true)
    void document.fonts?.ready?.then(soon)
    soon()
    return () => { clearTimeout(t); ro.disconnect(); root.removeEventListener('load', soon, true); if (window.__bkDiagnose) delete window.__bkDiagnose }
  }, [ref, enabled])
}
