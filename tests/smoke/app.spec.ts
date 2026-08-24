import { test, expect } from '@playwright/test'

test('app starts and player route renders', async ({ page }) => {
  await page.goto('/#/player')
  await expect(page.locator('#root')).toBeVisible()
  await expect(page).toHaveTitle('Quiz Party')
  await expect(page.locator('body')).not.toContainText('404')
})
