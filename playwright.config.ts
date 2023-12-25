import { PlaywrightTestConfig, devices } from '@playwright/test';
import { WaitForLoadStateOptions } from './src/setup/optional-parameter-types';
import { testConfig } from './testConfig';
import { ACTION_TIMEOUT, EXPECT_TIMEOUT, NAVIGATION_TIMEOUT, TEST_TIMEOUT } from 'src/utils/timeout-constants';
const ENV = process.env.npm_config_ENV;

if (!ENV || !['QAEnv', 'devApi'].includes(ENV)) {
  console.log('Please provide a correct environment value like "npx cross-env ENV=QAEnv|devApi"');
  process.exit();
}

export const STORAGE_STATE = './user.json';

/**
 * Default load state to be used while loading a URL or performing a click and navigate operation.
 * The load state is set to 'domcontentloaded', which means the action will wait until the 'DOMContentLoaded' event is fired.
 */
export const LOADSTATE: WaitForLoadStateOptions = 'domcontentloaded';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {

  //Global Setup to run before all tests
  globalSetup: require.resolve('./global-setup'),

  //Global Teardown to run after all tests
  globalTeardown: require.resolve('./global-teardown'),

  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
 //Reporters
  reporter: [['./CustomReporterConfig.ts'], ['allure-playwright'], ['html', { outputFolder: 'html-report', open: 'never' }]],

  timeout: TEST_TIMEOUT,
  expect: {
    timeout: EXPECT_TIMEOUT,
  },
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    storageState: './user.json',
    /* Sets a timeout for actions like click, fill, select to prevent long-running operations. */
    actionTimeout: ACTION_TIMEOUT,
    /* Sets a timeout for page loading navigations like goto URL, go back, reload, waitForNavigation to prevent long page loads. */
    navigationTimeout: NAVIGATION_TIMEOUT,
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { 
      name: 'setup', 
      testMatch: /.*\.setup\.ts/ 
    },
    {
      name: 'chromium',
      use: {
        //Picks Base Url based on User input
        baseURL: testConfig[ENV],

        //Browser Mode
        headless: false,

        // Use prepared auth state.
        storageState: './user.json',

        //Browser height and width
        viewport: null,
        ignoreHTTPSErrors: true,

        //Enable File Downloads in Chrome
        acceptDownloads: true,

        //Artifacts
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',

        //Slows down execution by ms
        launchOptions: {
          slowMo: 0,
          args: ['--start-maximized']
        }
      },
      //dependencies: ['setup'],
    },

    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        baseURL: testConfig[ENV],
        headless: true,
        viewport: null,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: 1000
        }
      },
    },

    {
      name: 'Edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        baseURL: testConfig[ENV],
        headless: false,
        viewport: null,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: 0
        }
      },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
        baseURL: testConfig[ENV],
        headless: true,
        viewport: null,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: 1000
        }
      },
    },
    {
      name: 'Device',
      use: {
        ...devices['Pixel 4a (5G)'],
        browserName: 'chromium',
        channel: 'chrome',
        baseURL: testConfig[ENV],
        headless: true,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: 0
        }
      },
    },
    {
      name: 'DB'
    },
    {
      name: 'API',
      use: {
        baseURL: testConfig[ENV],
      }
    }
  ],
};

export default config;