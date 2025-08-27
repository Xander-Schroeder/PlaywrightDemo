import { defineConfig, devices } from '@playwright/test';

/**
 * CI-specific Playwright configuration with mock authentication
 * This config is used in CI environments where Intel SSO is not available
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Skip global setup in CI when using mock auth */
  globalSetup: process.env.MOCK_AUTH ? undefined : './tests/global-setup.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Limit workers in CI */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['github']
  ],
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to your application */
    baseURL: process.env.TEST_BASE_URL || 'https://azsqsmsls300.amr.corp.intel.com:4012',
    
    /* Use shared authentication state across all tests */
    storageState: './auth-state.json',
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
    
    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,
    
    /* Global timeout settings - more aggressive in CI */
    actionTimeout: process.env.CI ? 5000 : 10000,
    navigationTimeout: process.env.CI ? 15000 : 30000,
  },

  /* Global test timeout - shorter in CI */
  timeout: process.env.CI ? 60000 : 100000,
  expect: {
    timeout: process.env.CI ? 5000 : 10000
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--ignore-certificate-errors', 
            '--ignore-ssl-errors',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
          ]
        },
      },
    }
  ],

  /* Remove CI-specific web server configuration */
});
