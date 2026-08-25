import { test, expect } from '@playwright/test'

test('app starts and player route renders without database writes', async ({ page }) => {
  const blockedWrites: string[] = []

  await page.route('**/rest/v1/**', async route => {
    const method = route.request().method()
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      blockedWrites.push(`${method} ${route.request().url()}`)
      await route.abort('blockedbyclient')
      return
    }
    await route.continue()
  })

  await page.route('**/storage/v1/**', async route => {
    const method = route.request().method()
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      blockedWrites.push(`${method} ${route.request().url()}`)
      await route.abort('blockedbyclient')
      return
    }
    await route.continue()
  })

  await page.goto('/#/player')
  await expect(page.locator('#root')).toBeVisible()
  await expect(page).toHaveTitle('Quiz Party')
  await expect(page.locator('body')).not.toContainText('404')
  expect(blockedWrites, `The smoke test attempted a Supabase write: ${blockedWrites.join(', ')}`).toEqual([])
})
