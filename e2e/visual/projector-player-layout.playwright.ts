import { test, expect } from '@playwright/test'
import { mockQuizBackend, QA_HOST_URL, QA_ROOM_URL } from '../helpers/supabaseMock.playwright'
import { assertImagesAreLoadedAndVisible, assertImagesAreNotAncestorClipped, assertNoTextClipping, assertViewportIsClean, attachLayoutSnapshot } from '../helpers/layoutAssertions.playwright'

const projectorSizes = [
  { name: 'projector-1080p', width: 1920, height: 1080 },
  { name: 'projector-4k', width: 3840, height: 2160 },
  { name: 'laptop', width: 1366, height: 768 },
]

for (const size of projectorSizes) {
  test(`${size.name}: four mixed-aspect images fit on projector`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: size.width, height: size.height })
    await mockQuizBackend(page, { theme: 'classic', answerMode: 'choice' })
    await page.goto(QA_HOST_URL)
    await expect(page.locator('.host-screen')).toBeVisible()
    await expect(page.locator('.img-answers img')).toHaveCount(4)

    try {
      await assertViewportIsClean(page)
      await assertImagesAreLoadedAndVisible(page, '.img-answers img')
      await assertImagesAreNotAncestorClipped(page, '.img-answers img')
      await assertNoTextClipping(page)
    } finally {
      await attachLayoutSnapshot(page, testInfo)
    }
  })
}

test('projector: mixed images stay inside layout in New Year theme', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await mockQuizBackend(page, { theme: 'new_year', answerMode: 'choice' })
  await page.goto(QA_HOST_URL)
  await expect(page.locator('.theme-new_year')).toBeVisible()
  await expect(page.locator('.img-answers img')).toHaveCount(4)

  try {
    await assertViewportIsClean(page)
    await assertImagesAreLoadedAndVisible(page, '.img-answers img')
    await assertImagesAreNotAncestorClipped(page, '.img-answers img')
    await assertNoTextClipping(page)
  } finally {
    await attachLayoutSnapshot(page, testInfo)
  }
})

test('projector: mixed images stay inside layout in Potter theme', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await mockQuizBackend(page, { theme: 'potter', answerMode: 'choice' })
  await page.goto(QA_HOST_URL)
  await expect(page.locator('.theme-potter')).toBeVisible()
  await expect(page.locator('.img-answers img')).toHaveCount(4)

  try {
    await assertViewportIsClean(page)
    await assertImagesAreLoadedAndVisible(page, '.img-answers img')
    await assertImagesAreNotAncestorClipped(page, '.img-answers img')
    await assertNoTextClipping(page)
  } finally {
    await attachLayoutSnapshot(page, testInfo)
  }
})

test('projector: matching images fit without clipping', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await mockQuizBackend(page, { theme: 'classic', answerMode: 'match' })
  await page.goto(QA_HOST_URL)
  await expect(page.locator('.img-answers img')).toHaveCount(4)

  try {
    await assertViewportIsClean(page)
    await assertImagesAreLoadedAndVisible(page, '.img-answers img')
    await assertImagesAreNotAncestorClipped(page, '.img-answers img')
    await expect(page.locator('.img-answers .ia-key')).toHaveCount(4)
    await assertNoTextClipping(page)
  } finally {
    await attachLayoutSnapshot(page, testInfo)
  }
})

test('projector: image ordering question fits without clipping', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await mockQuizBackend(page, { theme: 'classic', answerMode: 'order' })
  await page.goto(QA_HOST_URL)
  await expect(page.locator('.host-screen')).toBeVisible()

  try {
    // Ordering answers are text cards in the current projector implementation;
    // the four mixed-aspect images are the question media, not answer images.
    await expect(page.locator('.q-media-grid img, .img-answers img')).toHaveCount(4)
    await assertViewportIsClean(page)
    await assertImagesAreLoadedAndVisible(page, '.q-media-grid img, .img-answers img')
    await assertImagesAreNotAncestorClipped(page, '.q-media-grid img, .img-answers img')
    await expect(page.locator('.img-answers .ia-key')).toHaveText(['A', 'B', 'C', 'D'])
    await assertNoTextClipping(page)
  } finally {
    await attachLayoutSnapshot(page, testInfo)
  }
})

test('player: standard answer screen fits on phone', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await mockQuizBackend(page, { answerMode: 'choice' })
  await page.goto(QA_ROOM_URL)
  await expect(page.locator('.pl-root')).toBeVisible()

  try {
    await assertViewportIsClean(page)
    await assertNoTextClipping(page)
  } finally {
    await attachLayoutSnapshot(page, testInfo)
  }
})

test('player: matching screen fits on phone', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await mockQuizBackend(page, { answerMode: 'match' })
  await page.goto(QA_ROOM_URL)
  await expect(page.locator('.pl-match')).toBeVisible()

  try {
    await assertViewportIsClean(page)
    await expect(page.locator('.pl-match > div')).toHaveCount(2)
    await assertNoTextClipping(page)
  } finally {
    await attachLayoutSnapshot(page, testInfo)
  }
})

test('player: ordering screen fits on phone', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await mockQuizBackend(page, { answerMode: 'order' })
  await page.goto(QA_ROOM_URL)
  await expect(page.locator('.pl-slot')).toBeVisible()

  try {
    await assertViewportIsClean(page)
    await expect(page.locator('.pl-slot')).toContainText('Тапай по порядку')
    await assertNoTextClipping(page)
  } finally {
    await attachLayoutSnapshot(page, testInfo)
  }
})
