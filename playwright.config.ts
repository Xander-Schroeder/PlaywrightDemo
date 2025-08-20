import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Global setup for authentication */
  globalSetup: './tests/global-setup.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : process.env.PWTEST_HTML_REPORT_OPEN ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://azsqsmsls300.amr.corp.intel.com:4012',
    
    /* Use shared authentication state across all tests */
    storageState: './auth-state.json',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
    
    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,
    
    /* Global timeout settings */
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  /* Global test timeout */
  timeout: 100000,
  expect: {
    timeout: 10000
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Additional Chrome-specific settings
        launchOptions: {
          args: ['--ignore-certificate-errors', '--ignore-ssl-errors']
        },
      },
    }

    // {
    //   name: 'firefox',
    //   use: { 
    //   ...devices['Desktop Firefox'],
    //   // Firefox-specific retry logic for connection issues
    //   launchOptions: {
    //     firefoxUserPrefs: {
    //     'security.tls.insecure_fallback_hosts': 'azsqsmsls300.amr.corp.intel.com'
    //     }
    //   }
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: { 
    //   ...devices['Desktop Safari'],
    //   },
    // },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { 
    //   ...devices['Pixel 5'],
    //   launchOptions: {
    //     args: ['--ignore-certificate-errors', '--ignore-ssl-errors']
    //   }
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { 
    //   ...devices['iPhone 12'],
    //   },
    // },

    // /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
