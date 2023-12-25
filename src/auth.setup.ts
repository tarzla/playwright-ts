import { test as setup, expect } from '@playwright/test';
import { testConfig } from 'testConfig';
const authFile = './user.json';
const ENV = process.env.npm_config_ENV;

setup('authenticate', async ({ page }) => {
  //Perform authentication steps. Replace these actions with your own.
  await page.goto(testConfig[ENV]);
  await page.locator('#UserName').fill(testConfig.username);
  await page.locator('#Password').fill(testConfig.password);
  await page.getByText('Log in').click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL(testConfig[ENV]);
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByText('DASHBOARD_AAT_HOME').first()).toBeVisible({ timeout : 30000 });

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
