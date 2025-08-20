import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InfrastructureManagerPage extends BasePage {
  // Panel-related locators
  readonly panelsMenuItem: Locator;
  readonly readersMenuItem: Locator;
  readonly inputsMenuItem: Locator;
  readonly outputsMenuItem: Locator;
  readonly readerGroupsMenuItem: Locator;
  readonly inputGroupsMenuItem: Locator;
  readonly outputGroupsMenuItem: Locator;
  readonly globalActivityLinksMenuItem: Locator;
  readonly panelIOLinksMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    
    // Menu items
    this.panelsMenuItem = page.getByTestId('IM:PANEL-DETAILS');
    this.readersMenuItem = page.getByTestId('IM:READER-DETAILS');
    this.inputsMenuItem = page.getByText('Inputs').nth(0);
    this.outputsMenuItem = page.getByText('Outputs').nth(0);
    this.readerGroupsMenuItem = page.getByText('Reader Groups');
    this.inputGroupsMenuItem = page.getByText('Input Groups');
    this.outputGroupsMenuItem = page.getByText('Output Groups');
    this.globalActivityLinksMenuItem = page.getByText('Global Activity Links');
    this.panelIOLinksMenuItem = page.getByText('Panel IO Links');
  }

  async navigateToPanels() {
    await this.navigateToInfrastructureManager();
    await this.panelsMenuItem.click();
    await this.page.waitForURL('**/infrastructure/panels/search');
    await this.waitForPageLoad();
  }

  async navigateToReaders() {
    await this.navigateToInfrastructureManager();
    await this.readersMenuItem.click();
    await this.page.waitForURL('**/infrastructure/readers/search');
    await this.waitForPageLoad();
  }

  async navigateToInputs() {
    await this.navigateToInfrastructureManager();
    await this.inputsMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToOutputs() {
    await this.navigateToInfrastructureManager();
    await this.outputsMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToReaderGroups() {
    await this.navigateToInfrastructureManager();
    await this.readerGroupsMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToInputGroups() {
    await this.navigateToInfrastructureManager();
    await this.inputGroupsMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToOutputGroups() {
    await this.navigateToInfrastructureManager();
    await this.outputGroupsMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToGlobalActivityLinks() {
    await this.navigateToInfrastructureManager();
    await this.globalActivityLinksMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToPanelIOLinks() {
    await this.navigateToInfrastructureManager();
    await this.panelIOLinksMenuItem.click();
    await this.waitForPageLoad();
  }
}
