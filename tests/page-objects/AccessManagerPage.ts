import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccessManagerPage extends BasePage {
  // Access-related locators
  readonly categoriesMenuItem: Locator;
  readonly defaultAccessMenuItem: Locator;
  readonly accessGroupMenuItem: Locator;
  readonly accessAreaMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    
    // Access section
    this.categoriesMenuItem = page.getByTestId('AM:CATEGORY-DETAILS-Btn');
    this.defaultAccessMenuItem = page.getByTestId('AM:DEFAULT-DETAILS-Btn');
    this.accessGroupMenuItem = page.getByTestId('AM:GROUP-DETAILS-Btn');
    this.accessAreaMenuItem = page.getByTestId('AM:AREA-DETAILS-Btn');
  }

  async navigateToCategories() {
    await this.navigateToAccessManager();
    await this.categoriesMenuItem.click();
    await this.page.waitForURL('**/access-manager/categories/search');
    await this.waitForPageLoad();
  }

  async navigateToDefaultAccess() {
    await this.navigateToAccessManager();
    await this.defaultAccessMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToAccessGroup() {
    await this.navigateToAccessManager();
    await this.accessGroupMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToAccessArea() {
    await this.navigateToAccessManager();
    await this.accessAreaMenuItem.click();
    await this.waitForPageLoad();
  }
}
