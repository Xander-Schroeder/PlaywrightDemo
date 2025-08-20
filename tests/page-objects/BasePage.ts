import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseURL: string = 'https://azsqsmsls300.amr.corp.intel.com:4012';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/sms-dashboard') {
    await this.page.goto(`${this.baseURL}${path}`, { 
      waitUntil: 'load',
      timeout: 30000 
    });
    
    // Verify we're still authenticated after navigation
    await this.verifyAuthentication();
  }

  async waitForPageLoad() {
    // Wait for the main SMS heading to be visible
    await this.page.waitForSelector('h2:has-text("SMS")', { timeout: 30000 });
    
    // Wait for any loading indicators to disappear
    await this.page.waitForFunction(() => {
      const progressBars = document.querySelectorAll('progressbar');
      return progressBars.length === 0;
    }, { timeout: 10000 }).catch(() => {
      // Continue if no progress bars found
    });
  }

  /**
   * Verify that the user is still authenticated
   * This is important when using shared storage state across workers
   */
  async verifyAuthentication() {
    try {
      // Look for the welcome message which indicates successful authentication
      await this.page.waitForSelector('text=Welcome,', { timeout: 10000 });
      return true;
    } catch (error) {
      console.warn('Authentication verification failed - user may need to re-authenticate');
      return false;
    }
  }

  async navigateToTab(tabTestId: string) {
    await this.page.getByTestId(tabTestId).click();
    await this.waitForPageLoad();
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }

  async getCurrentUser() {
    try {
      const userElement = await this.page.locator('text=Welcome,').locator('+ a').textContent({ timeout: 5000 });
      return userElement?.trim();
    } catch (error) {
      // Fallback approach if the specific selector fails
      try {
        const userText = await this.page.getByText('Schroeder, XanderX').textContent({ timeout: 5000 });
        return userText?.trim();
      } catch (fallbackError) {
        console.log('Could not find user element');
        return null;
      }
    }
  }

  async getLocation() {
    const locationElement = await this.page.locator('strong:has-text("Location:")').locator('+ text').textContent();
    return locationElement?.trim();
  }

  async getApplicationVersion() {
    const versionElement = await this.page.locator('strong:has-text("Application Version:")').locator('+ text').textContent();
    return versionElement?.trim();
  }

  // Common navigation helpers
  async navigateToInfrastructureManager() {
    await this.navigateToTab('IMTopNavBtn');
  }

  async navigateToSystemManager() {
    await this.navigateToTab('SMTopNavBtn');
  }

  async navigateToAccessManager() {
    await this.navigateToTab('AMTopNavBtn');
  }

  async navigateToProfileManager() {
    await this.navigateToTab('PMTopNavBtn');
  }

  async navigateToVerificationManager() {
    await this.navigateToTab('VMTopNavBtn');
  }

  // Error handling for connection issues (especially Firefox)
  async retryOnConnectionError<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 2000
  ): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('net::ERR_CONNECTION') || 
            errorMessage.includes('net::ERR_SSL') ||
            errorMessage.includes('CONNECTION_REFUSED')) {
          console.log(`Connection attempt ${i + 1} failed, retrying in ${delay}ms...`);
          await this.page.waitForTimeout(delay);
          delay *= 1.5; // Exponential backoff
        } else {
          throw error;
        }
      }
    }
    throw new Error('Max retries exceeded');
  }
}
