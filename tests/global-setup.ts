import { chromium, FullConfig } from '@playwright/test';
import path from 'path';

/**
 * Global setup for Playwright tests
 * This function runs once before all tests and handles authentication
 * saving the browser state for reuse across all test workers
 */
async function globalSetup(config: FullConfig) {
  console.log('🔐 Starting global authentication setup...');
  
  const browser = await chromium.launch({
    args: ['--ignore-certificate-errors', '--ignore-ssl-errors']
  });
  
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  });
  
  const page = await context.newPage();
  
  try {
    console.log('🌐 Navigating to SMS Dashboard for authentication...');
    
    // Navigate to the application
    await page.goto('https://azsqsmsls300.amr.corp.intel.com:4012/sms-dashboard', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Wait for authentication to complete
    // The page should automatically handle Intel SSO authentication
    console.log('⏳ Waiting for authentication to complete...');
    
    // Wait for the main dashboard to load with user info
    await page.waitForSelector('text=Welcome,', { timeout: 60000 });
    
    // Verify we're successfully authenticated by checking for user info
    const userElement = await page.locator('text=Welcome,').first();
    const isVisible = await userElement.isVisible();
    
    if (!isVisible) {
      throw new Error('Authentication failed - user welcome message not found');
    }
    
    console.log('✅ Authentication successful! Saving browser state...');
    
    // Save the authenticated state
    const storageStatePath = path.join(__dirname, '..', 'auth-state.json');
    await context.storageState({ path: storageStatePath });
    
    console.log(`📁 Browser state saved to: ${storageStatePath}`);
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
  
  console.log('🎉 Global setup completed successfully!');
}

export default globalSetup;
