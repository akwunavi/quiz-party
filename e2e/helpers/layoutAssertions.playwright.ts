import { expect, type Page, type TestInfo } from '@playwright/test'

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

export async function assertNoTextClipping(page: Page) {
  const clipped = await page.evaluate(() => {
    const selectors = ['.q-text', '.q-title', '.q-subtitle', '.answer-text', '.pl-question', '.pl-answer', '.pl-match', '.pl-slot']
    const out: string[] = []
    for (const el of Array.from(document.querySelectorAll<HTMLElement>(selectors.join(',')))) {
      const style = getComputedStyle(el)
      if (style.display === 'none' || style.visibility === 'hidden') continue
      const clipsX = ['hidden', 'clip'].includes(style.overflowX)
      const clipsY = ['hidden', 'clip'].includes(style.overflowY)
      if (clipsX && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2) out.push(`${el.tagName}.${String(el.className)}: horizontal ${el.scrollWidth}/${el.clientWidth}`)
      if (clipsY && el.clientHeight > 0 && el.scrollHeight > el.clientHeight + 2) out.push(`${el.tagName}.${String(el.className)}: vertical ${el.scrollHeight}/${el.clientHeight}`)
    }
    return out
  })
  expect(clipped, `semantic content clipping detected: ${clipped.join('; ')}`).toEqual([])
}

export async function assertImagesAreNotAncestorClipped(page: Page, selector = '.q-media-grid img, .img-answers img') {
  const result = await page.locator(selector).evaluateAll((els) => {
    const viewport = { width: window.innerWidth, height: window.innerHeight }
    const images = els.map((element, index) => {
      const img = element as HTMLImageElement
      const r = img.getBoundingClientRect()
      const ancestors: Array<Record<string, unknown>> = []
      let node: HTMLElement | null = img.parentElement
      while (node) {
        const style = getComputedStyle(node)
        const clips = style.overflowX === 'hidden' || style.overflowY === 'hidden' || style.overflow === 'hidden' || style.clipPath !== 'none'
        if (clips) {
          const a = node.getBoundingClientRect()
          ancestors.push({
            tag: node.tagName,
            className: String(node.className),
            rect: { left: a.left, top: a.top, right: a.right, bottom: a.bottom, width: a.width, height: a.height },
            overflow: { x: style.overflowX, y: style.overflowY, clipPath: style.clipPath },
            exceeds: r.left < a.left - 1 || r.top < a.top - 1 || r.right > a.right + 1 || r.bottom > a.bottom + 1,
          })
        }
        node = node.parentElement
      }
      return {
        index: index + 1,
        src: img.currentSrc,
        natural: { width: img.naturalWidth, height: img.naturalHeight },
        rect: { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height },
        computed: { width: getComputedStyle(img).width, height: getComputedStyle(img).height, objectFit: getComputedStyle(img).objectFit },
        ancestors,
        outsideViewport: r.left < -1 || r.top < -1 || r.right > viewport.width + 1 || r.bottom > viewport.height + 1,
      }
    })
    return { viewport, images }
  })

  const problems: string[] = []
  for (const image of result.images as any[]) {
    const exceeded = image.ancestors.find((a: any) => a.exceeds)
    if (exceeded) problems.push(`image ${image.index} exceeds clipping ancestor ${exceeded.tag}.${exceeded.className}`)
    if (image.outsideViewport) problems.push(`image ${image.index} exceeds viewport`)
  }

  if (problems.length) {
    throw new Error(`image layout diagnostics\n${JSON.stringify(result, null, 2)}\nPROBLEMS: ${problems.join('; ')}`)
  }

  expect(problems).toEqual([])
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
