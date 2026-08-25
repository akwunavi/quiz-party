import { expect, type Page, type TestInfo } from '@playwright/test'

/**
 * Checks only the viewport itself. Decorative layers are intentionally ignored:
 * a theme may legitimately have an oversized background/frame that is clipped by
 * an overflow-hidden wrapper.
 */
export async function assertViewportIsClean(page: Page) {
  const metrics = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    viewportHeight: document.documentElement.clientHeight,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
  }))

  expect(metrics.scrollWidth, `page horizontal overflow: ${JSON.stringify(metrics)}`).toBeLessThanOrEqual(metrics.viewportWidth + 1)
  expect(metrics.scrollHeight, `page vertical overflow: ${JSON.stringify(metrics)}`).toBeLessThanOrEqual(metrics.viewportHeight + 1)
}

export async function assertImagesAreLoadedAndVisible(page: Page, selector = '.q-media-grid img, .img-answers img') {
  const images = page.locator(selector)
  const count = await images.count()
  expect(count, `expected images matching ${selector}`).toBeGreaterThan(0)

  const results = await images.evaluateAll((els) => els.map(el => {
    const img = el as HTMLImageElement
    const r = img.getBoundingClientRect()
    const style = getComputedStyle(img)
    return {
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      left: r.left,
      top: r.top,
      right: r.right,
      bottom: r.bottom,
      width: r.width,
      height: r.height,
      display: style.display,
      visibility: style.visibility,
    }
  }))

  for (const [index, image] of results.entries()) {
    expect(image.display, `image ${index + 1} is display:none`).not.toBe('none')
    expect(image.visibility, `image ${index + 1} is hidden`).not.toBe('hidden')
    expect(image.complete, `image ${index + 1} did not finish loading`).toBe(true)
    expect(image.naturalWidth, `image ${index + 1} has zero natural width`).toBeGreaterThan(0)
    expect(image.naturalHeight, `image ${index + 1} has zero natural height`).toBeGreaterThan(0)
    expect(image.width, `image ${index + 1} rendered at zero width`).toBeGreaterThan(0)
    expect(image.height, `image ${index + 1} rendered at zero height`).toBeGreaterThan(0)
    expect(image.left, `image ${index + 1} is outside the left viewport edge`).toBeGreaterThanOrEqual(-1)
    expect(image.top, `image ${index + 1} is outside the top viewport edge`).toBeGreaterThanOrEqual(-1)
    expect(image.right, `image ${index + 1} is outside the right viewport edge`).toBeLessThanOrEqual(page.viewportSize()!.width + 1)
    expect(image.bottom, `image ${index + 1} is outside the bottom viewport edge`).toBeLessThanOrEqual(page.viewportSize()!.height + 1)
  }
}

/**
 * Detects clipping only when the semantic element itself uses a clipping
 * overflow mode. A scrollHeight/clientHeight difference alone is not enough:
 * line-height, inline content and fractional pixels can legitimately produce
 * a small difference while all text remains visible.
 */
export async function assertNoTextClipping(page: Page) {
  const clipped = await page.evaluate(() => {
    const selectors = [
      '.q-text',
      '.q-title',
      '.q-subtitle',
      '.answer-text',
      '.pl-question',
      '.pl-answer',
      '.pl-match',
      '.pl-slot',
    ]

    const out: string[] = []
    for (const el of Array.from(document.querySelectorAll<HTMLElement>(selectors.join(',')))) {
      const style = getComputedStyle(el)
      if (style.display === 'none' || style.visibility === 'hidden') continue

      const clipsX = ['hidden', 'clip'].includes(style.overflowX)
      const clipsY = ['hidden', 'clip'].includes(style.overflowY)
      if (clipsX && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2) {
        out.push(`${el.tagName}.${String(el.className)}: horizontal ${el.scrollWidth}/${el.clientWidth}`)
      }
      if (clipsY && el.clientHeight > 0 && el.scrollHeight > el.clientHeight + 2) {
        out.push(`${el.tagName}.${String(el.className)}: vertical ${el.scrollHeight}/${el.clientHeight}`)
      }
    }
    return out
  })

  expect(clipped, `semantic content clipping detected: ${clipped.join('; ')}`).toEqual([])
}

export async function assertImagesAreNotAncestorClipped(page: Page, selector = '.q-media-grid img, .img-answers img') {
  const clipped = await page.locator(selector).evaluateAll((els) => {
    const viewport = { width: window.innerWidth, height: window.innerHeight }
    const out: string[] = []

    for (const [index, element] of els.entries()) {
      const img = element as HTMLImageElement
      const r = img.getBoundingClientRect()
      let node: HTMLElement | null = img.parentElement

      while (node) {
        const style = getComputedStyle(node)
        if (style.overflowX === 'hidden' || style.overflowY === 'hidden' || style.overflow === 'hidden' || style.clipPath !== 'none') {
          const a = node.getBoundingClientRect()
          const outside = r.left < a.left - 1 || r.top < a.top - 1 || r.right > a.right + 1 || r.bottom > a.bottom + 1
          if (outside) {
            out.push(`image ${index + 1} exceeds clipping ancestor ${node.tagName}.${String(node.className)}: image=${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.right)},${Math.round(r.bottom)} ancestor=${Math.round(a.left)},${Math.round(a.top)},${Math.round(a.right)},${Math.round(a.bottom)}`)
            break
          }
        }
        node = node.parentElement
      }

      if (r.left < -1 || r.top < -1 || r.right > viewport.width + 1 || r.bottom > viewport.height + 1) {
        out.push(`image ${index + 1} exceeds viewport`)
      }
    }

    return out
  })

  expect(clipped, `image clipping detected: ${clipped.join('; ')}`).toEqual([])
}

export async function attachLayoutSnapshot(page: Page, testInfo: TestInfo) {
  const data = await page.evaluate(() => ({
    viewport: { width: innerWidth, height: innerHeight },
    body: { scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight },
    images: Array.from(document.images).map(img => {
      const r = img.getBoundingClientRect()
      return { src: img.currentSrc, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, x: r.x, y: r.y, width: r.width, height: r.height }
    }),
  }))
  await testInfo.attach('layout.json', { body: JSON.stringify(data, null, 2), contentType: 'application/json' })
}
