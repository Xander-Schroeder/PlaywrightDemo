import { chromium, FullConfig } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Global setup for Playwright tests
 * This function runs once before all tests and handles authentication
 * saving the browser state for reuse across all test workers
 */
async function globalSetup(config: FullConfig) {
  console.log('🔐 Starting global authentication setup...');
  
  // Check if we're in CI and have AUTH_STATE_JSON secret
  const authStateJson = process.env.AUTH_STATE_JSON;
  const storageStatePath = path.join(__dirname, '..', 'auth-state.json');
  
  if (authStateJson) {
    console.log('📋 Using pre-configured authentication from GitHub secrets...');
    try {
      // Write the auth state from GitHub secrets to file
      fs.writeFileSync(storageStatePath, authStateJson);
      console.log('✅ Authentication state loaded from GitHub secrets!');
      return;
    } catch (error) {
      console.warn('⚠️ Failed to load auth state from secrets, falling back to interactive auth:', error);
    }
  }
  
  // Check if we already have a valid auth state file
  if (fs.existsSync(storageStatePath)) {
    try {
      const existingAuth = JSON.parse(fs.readFileSync(storageStatePath, 'utf8'));
      if (existingAuth.origins && existingAuth.origins.length > 0) {
        console.log('✅ Using existing authentication state file!');
        return;
      }
    } catch (error) {
      console.warn('⚠️ Existing auth state file is invalid:', error);
    }
  }
  
  // Fall back to interactive authentication
  console.log('🌐 No valid authentication found, starting interactive authentication...');
  
  const browser = await chromium.launch({
    args: ['--ignore-certificate-errors', '--ignore-ssl-errors']
  });
  
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  });
  
  const page = await context.newPage();
  
  try {
    console.log('🌐 Navigating to SMS Dashboard for authentication...');
    
    // Get base URL from environment or use default
    const baseUrl = process.env.TEST_BASE_URL || 'https://azsqsmsls300.amr.corp.intel.com:4012';
    
    // Navigate to the application
    await page.goto(`${baseUrl}/sms-dashboard`, {
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
