import { Page, expect } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';

export class TestUtils {
  static async waitForTableToLoad(page: Page, timeout: number = 10000) {
    await page.waitForSelector('table tbody tr', { timeout });
    await page.waitForLoadState('networkidle');
  }

  static async generateUniqueTestName(prefix: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return `${prefix}-${timestamp}`;
  }

  static async takeScreenshotOnFailure(page: Page, testName: string) {
    try {
      await page.screenshot({ 
        path: `test-results/screenshots/${testName}-failure.png`,
        fullPage: true 
      });
    } catch (error) {
      console.warn(`Failed to take screenshot: ${error}`);
    }
  }

  static async waitForApiResponse(page: Page, apiPath: string, timeout: number = 30000) {
    return page.waitForResponse(
      response => response.url().includes(apiPath) && response.status() === 200,
      { timeout }
    );
  }

  static async handleDialogs(page: Page, acceptDialog: boolean = true) {
    page.on('dialog', async dialog => {
      if (acceptDialog) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }

  static async scrollElementIntoView(page: Page, selector: string) {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }

  static async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        console.log(`Operation failed, retrying in ${delay}ms... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error('Max retries exceeded');
  }

  static async clearAndFill(page: Page, selector: string, text: string) {
    const input = page.locator(selector);
    await input.clear();
    await input.fill(text);
  }

  static getRandomTestId(): string {
    return Math.random().toString(36).substring(7);
  }

  static async waitForSpinnerToDisappear(page: Page, timeout: number = 10000) {
    try {
      await page.waitForSelector('.spinner, .loading, progressbar', { 
        state: 'detached', 
        timeout 
      });
    } catch {
      // Spinner might not exist, continue
    }
  }

  static async verifyElementNotExists(page: Page, selector: string, timeout: number = 5000): Promise<boolean> {
    try {
      await page.waitForSelector(selector, { state: 'detached', timeout });
      return true;
    } catch {
      return false;
    }
  }

  static async getCurrentTimestamp(): Promise<string> {
    return new Date().toISOString();
  }

  static formatTestName(category: string, operation: string, detail?: string): string {
    const parts = [category, operation];
    if (detail) parts.push(detail);
    return parts.join(' - ');
  }

  // Authentication-related utilities for shared storage state
  
  /**
   * Check if the authentication state file exists and is valid
   */
  static async isAuthStateValid(): Promise<boolean> {
    try {
      const authStatePath = path.join(__dirname, '..', '..', 'auth-state.json');
      const stats = await fs.stat(authStatePath);
      
      // Check if file exists and was created recently (within last 24 hours)
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      return stats.mtime.getTime() > oneDayAgo;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Verify that a page is properly authenticated
   */
  static async verifyPageAuthentication(page: Page): Promise<boolean> {
    try {
      // Check for welcome message
      const welcomeElement = page.locator('text=Welcome,');
      await expect(welcomeElement).toBeVisible({ timeout: 10000 });
      
      // Check for logout button
      const logoutButton = page.getByRole('button', { name: 'Logout' });
      await expect(logoutButton).toBeVisible({ timeout: 5000 });
      
      return true;
    } catch (error) {
      console.warn('Page authentication verification failed:', error);
      return false;
    }
  }
  
  /**
   * Get the current user information from the page
   */
  static async getCurrentUser(page: Page): Promise<string | null> {
    try {
      const userElement = page.locator('text=Welcome,').locator('+ a');
      const userText = await userElement.textContent({ timeout: 5000 });
      return userText?.trim() || null;
    } catch (error) {
      try {
        // Fallback to look for specific user name
        const userText = await page.getByText('Schroeder, XanderX').textContent({ timeout: 5000 });
        return userText?.trim() || null;
      } catch (fallbackError) {
        console.warn('Could not retrieve current user information');
        return null;
      }
    }
  }
  
  /**
   * Wait for page to be fully loaded and authenticated
   */
  static async waitForAuthenticatedPage(page: Page, timeout: number = 30000): Promise<void> {
    // Wait for main SMS header
    await page.waitForSelector('h2:has-text("SMS")', { timeout });
    
    // Wait for authentication indicators
    await page.waitForSelector('text=Welcome,', { timeout });
    
    // Wait for any loading indicators to disappear
    await page.waitForFunction(() => {
      const progressBars = document.querySelectorAll('progressbar');
      return progressBars.length === 0;
    }, { timeout: 10000 }).catch(() => {
      // Continue if no progress bars found
    });
  }
  
  /**
   * Handle navigation with authentication verification
   */
  static async navigateWithAuth(page: Page, url: string): Promise<void> {
    await page.goto(url, { 
      waitUntil: 'load',
      timeout: 30000 
    });
    
    // Verify we're still authenticated after navigation
    const isAuthenticated = await this.verifyPageAuthentication(page);
    if (!isAuthenticated) {
      throw new Error('Authentication lost during navigation');
    }
  }
}
