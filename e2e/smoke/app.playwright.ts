import { test, expect } from '@playwright/test'

test('app starts and player route renders without database writes', async ({ page }) => {
  const blockedWrites: string[] = []

  const blockSupabaseWrites = async (route: import('@playwright/test').Route) => {
    const method = route.request().method()
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      blockedWrites.push(`${method} ${route.request().url()}`)
      await route.abort('blockedbyclient')
      return
    }
    await route.continue()
  }

  await page.route('**/rest/v1/**', blockSupabaseWrites)
  await page.route('**/storage/v1/**', blockSupabaseWrites)
  await page.route('**/auth/v1/**', blockSupabaseWrites)
  await page.route('**/functions/v1/**', blockSupabaseWrites)

  await page.goto('/#/player')
  await expect(page.locator('#root')).toBeVisible()
  await expect(page).toHaveTitle('Quiz Party')
  await expect(page.locator('body')).not.toContainText('404')
  expect(blockedWrites, `The smoke test attempted a Supabase write: ${blockedWrites.join(', ')}`).toEqual([])
})
