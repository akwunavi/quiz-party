import { expect, type Page, type TestInfo } from '@playwright/test'

export async function assertViewportIsClean(page: Page) {
  const metrics = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    viewportHeight: document.documentElement.clientHeight,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
  }))

  expect(metrics.scrollWidth, `horizontal overflow: ${JSON.stringify(metrics)}`).toBeLessThanOrEqual(metrics.viewportWidth + 1)
  expect(metrics.scrollHeight, `vertical overflow: ${JSON.stringify(metrics)}`).toBeLessThanOrEqual(metrics.viewportHeight + 1)
}

export async function assertImagesAreLoadedAndVisible(page: Page, selector = '.q-media-grid img, .img-answers img') {
  const images = page.locator(selector)
  const count = await images.count()
  expect(count, `expected images matching ${selector}`).toBeGreaterThan(0)

  const results = await images.evaluateAll((els) => els.map(el => {
    const img = el as HTMLImageElement
    const r = img.getBoundingClientRect()
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
    }
  }))

  for (const [index, image] of results.entries()) {
    expect(image.complete, `image ${index + 1} did not finish loading`).toBe(true)
    expect(image.naturalWidth, `image ${index + 1} has zero natural width`).toBeGreaterThan(0)
    expect(image.naturalHeight, `image ${index + 1} has zero natural height`).toBeGreaterThan(0)
    expect(image.width, `image ${index + 1} rendered at zero width`).toBeGreaterThan(0)
    expect(image.height, `image ${index + 1} rendered at zero height`).toBeGreaterThan(0)
    expect(image.left, `image ${index + 1} is clipped on the left`).toBeGreaterThanOrEqual(-1)
    expect(image.top, `image ${index + 1} is clipped on the top`).toBeGreaterThanOrEqual(-1)
    expect(image.right, `image ${index + 1} is clipped on the right`).toBeLessThanOrEqual(page.viewportSize()!.width + 1)
    expect(image.bottom, `image ${index + 1} is clipped on the bottom`).toBeLessThanOrEqual(page.viewportSize()!.height + 1)
  }
}

export async function assertNoTextClipping(page: Page) {
  const clipped = await page.evaluate(() => {
    const out: string[] = []
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
      const style = getComputedStyle(el)
      if (style.display === 'none' || style.visibility === 'hidden') continue
      if (style.overflowX === 'auto' || style.overflowX === 'scroll' || style.overflowY === 'auto' || style.overflowY === 'scroll') continue
      if (el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1) out.push(`${el.tagName}.${el.className}: horizontal ${el.scrollWidth}/${el.clientWidth}`)
      if (el.clientHeight > 0 && el.scrollHeight > el.clientHeight + 1) out.push(`${el.tagName}.${el.className}: vertical ${el.scrollHeight}/${el.clientHeight}`)
    }
    return out.slice(0, 30)
  })

  expect(clipped, `text/content clipping detected: ${clipped.join('; ')}`).toEqual([])
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
