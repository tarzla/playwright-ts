import { test, expect } from '@playwright/test';

test('Navigate to Main page after login', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('DASHBOARD_AAT_HOME').first()).toBeVisible({ timeout : 30000 });
    expect(await page.screenshot()).toMatchSnapshot('StoryboardPage.png');
});