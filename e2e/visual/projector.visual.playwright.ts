import { test, expect } from '@playwright/test'

const viewports = [
  { name: 'laptop', width: 1366, height: 768 },
  { name: '1080p', width: 1920, height: 1080 },
  { name: '4k', width: 3840, height: 2160 },
]

for (const viewport of viewports) {
  test(`projector layout fits viewport: ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/#/host')
    await expect(page.locator('#root')).toBeVisible()

    const report = await page.locator('body').evaluate(() => {
      const els = Array.from(document.querySelectorAll('*'))
      const overflowing = els.flatMap((el) => {
        const r = el.getBoundingClientRect()
        const style = getComputedStyle(el)
        if (r.width <= 0 || r.height <= 0) return []
        if (r.right > window.innerWidth + 0.5 || r.left < -0.5 || r.bottom > window.innerHeight + 0.5 || r.top < -0.5) {
          return [{ tag: el.tagName, id: el.id, className: String(el.className), left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height, overflowX: style.overflowX, overflowY: style.overflowY }]
        }
        return []
      })
      return { viewport: { width: window.innerWidth, height: window.innerHeight }, overflowing: overflowing.slice(0, 30) }
    })

    expect(report.overflowing, `Elements outside ${viewport.width}x${viewport.height}: ${JSON.stringify(report.overflowing, null, 2)}`).toEqual([])
  })
}

for (const kind of ['mixed-media', 'matching-media', 'ordering-media']) {
  test(`projector ${kind} does not clip media containers`, async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 })
    await page.goto('/#/host')
    await expect(page.locator('#root')).toBeVisible()

    const report = await page.locator('body').evaluate((kind) => {
      const candidates = Array.from(document.querySelectorAll('.q-media-grid, .q-img, .q-media, img, video'))
      return candidates.map((el) => {
        const r = el.getBoundingClientRect()
        return { kind, tag: el.tagName, src: (el as HTMLImageElement).currentSrc || (el as HTMLImageElement).src || '', left: r.left, right: r.right, width: r.width, top: r.top, bottom: r.bottom, height: r.height, naturalWidth: (el as HTMLImageElement).naturalWidth || 0, naturalHeight: (el as HTMLImageElement).naturalHeight || 0 }
      }).filter((x) => x.right > window.innerWidth + 0.5 || x.left < -0.5 || x.bottom > window.innerHeight + 0.5)
    }, kind)

    expect(report, `Clipped/out-of-viewport media for ${kind}: ${JSON.stringify(report, null, 2)}`).toEqual([])
  })
}
