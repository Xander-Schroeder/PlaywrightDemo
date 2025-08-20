import { Page, expect, Locator } from '@playwright/test';
import { InfrastructureManagerPage } from './InfrastructureManagerPage';

export interface PanelSearchResult {
  logicalId: string;
  name: string;
  panelState: string;
  controllerState: string;
  enabled: string;
  modelType: string;
  ipAddress: string;
  port: string;
  dis: string;
  manufacturer: string;
  location: string;
  databaseId: string;
}

export class PanelsPage extends InfrastructureManagerPage {
  // Search and filter elements
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly moreSearchOptionsButton: Locator;
  readonly addPanelLink: Locator;
  readonly enableButton: Locator;
  readonly disableButton: Locator;
  readonly exportWorkspaceButton: Locator;
  readonly enableLiveUpdatesButton: Locator;

  // Table elements
  readonly panelTable: Locator;
  readonly panelRows: Locator;

  // Filter dropdowns
  readonly statusFilter: Locator;
  readonly modelTypeFilter: Locator;
  readonly manufacturerFilter: Locator;
  readonly panelTypeFilter: Locator;

  constructor(page: Page) {
    super(page);
    
    // Search elements
    this.searchInput = page.getByRole('textbox', { name: 'Name or Database ID' });
    this.searchButton = page.getByTestId('searchBtn');
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.moreSearchOptionsButton = page.getByRole('button', { name: 'More Search Options' });
    
    // Action buttons
    this.addPanelLink = page.getByTestId('addPanelBtn');
    this.enableButton = page.getByTestId('EnableBtn');
    this.disableButton = page.getByTestId('DisableBtn');
    this.exportWorkspaceButton = page.getByRole('button', { name: 'Export Workspace' });
    this.enableLiveUpdatesButton = page.getByRole('button', { name: 'Enable Live Updates' });

    // Table elements
    this.panelTable = page.locator('table').first();
    this.panelRows = page.locator('tbody tr');

    // Filter elements (these may need to be adjusted based on actual implementation)
    this.statusFilter = page.locator('select').first();
    this.modelTypeFilter = page.locator('select').nth(1);
    this.manufacturerFilter = page.locator('select').nth(2);
    this.panelTypeFilter = page.locator('select').nth(3);
  }

  async searchPanels(searchTerm: string = '') {
    await this.navigateToPanels();
    
    if (searchTerm) {
      await this.searchInput.fill(searchTerm);
    }
    
    await this.searchButton.click();
    
    // Wait for search results to load
    await this.page.waitForSelector('table tbody tr', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  async getAllPanels(): Promise<PanelSearchResult[]> {
    await this.searchPanels();
    
    const panels: PanelSearchResult[] = [];
    const rows = await this.panelRows.all();
    
    // Skip the first row (header/filter row)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cells = await row.locator('td').all();
      
      if (cells.length >= 12) {
        panels.push({
          logicalId: await cells[1].textContent() || '',
          name: await cells[2].textContent() || '',
          panelState: await cells[3].textContent() || '',
          controllerState: await cells[4].textContent() || '',
          enabled: await cells[5].textContent() || '',
          modelType: await cells[6].textContent() || '',
          ipAddress: await cells[8].textContent() || '',
          port: await cells[9].textContent() || '',
          dis: await cells[10].textContent() || '',
          manufacturer: await cells[11].textContent() || '',
          location: await cells[12].textContent() || '',
          databaseId: await cells[13].textContent() || ''
        });
      }
    }
    
    return panels;
  }

  async getPanelByName(panelName: string): Promise<PanelSearchResult | null> {
    await this.searchPanels(panelName);
    
    const panelLink = this.page.getByRole('link', { name: panelName });
    if (await panelLink.count() > 0) {
      const row = panelLink.locator('..').locator('..');
      const cells = await row.locator('td').all();
      
      if (cells.length >= 12) {
        return {
          logicalId: await cells[1].textContent() || '',
          name: await cells[2].textContent() || '',
          panelState: await cells[3].textContent() || '',
          controllerState: await cells[4].textContent() || '',
          enabled: await cells[5].textContent() || '',
          modelType: await cells[6].textContent() || '',
          ipAddress: await cells[8].textContent() || '',
          port: await cells[9].textContent() || '',
          dis: await cells[10].textContent() || '',
          manufacturer: await cells[11].textContent() || '',
          location: await cells[12].textContent() || '',
          databaseId: await cells[13].textContent() || ''
        };
      }
    }
    
    return null;
  }

  async openPanelDetails(panelName: string) {
    await this.searchPanels(panelName);
    
    const panelLink = this.page.getByRole('link', { name: panelName });
    await expect(panelLink).toBeVisible();
    await panelLink.click();
    
    // Wait for panel details page to load
    await this.page.waitForURL('**/infrastructure/panels/details/**');
    await this.waitForPageLoad();
  }

  async createNewPanel() {
    await this.navigateToPanels();
    await this.addPanelLink.click();
    
    // Wait for create panel page to load
    await this.page.waitForURL('**/infrastructure/panels/details/create');
    await this.waitForPageLoad();
  }

  async selectPanelsForBulkOperation(panelNames: string[]) {
    await this.searchPanels();
    
    for (const panelName of panelNames) {
      const panelRow = this.page.getByRole('link', { name: panelName }).locator('..').locator('..');
      const checkbox = panelRow.locator('input[type="checkbox"]');
      await checkbox.check();
    }
  }

  async enableSelectedPanels() {
    await this.enableButton.click();
    // Wait for operation to complete
    await this.page.waitForLoadState('networkidle');
  }

  async disableSelectedPanels() {
    await this.disableButton.click();
    // Wait for operation to complete
    await this.page.waitForLoadState('networkidle');
  }

  async exportWorkspace() {
    await this.exportWorkspaceButton.click();
    // Wait for export to complete
    await this.page.waitForLoadState('networkidle');
  }

  async enableLiveUpdates() {
    await this.enableLiveUpdatesButton.click();
    // Wait for live updates to be enabled
    await this.page.waitForTimeout(1000);
  }

  async verifyPanelExists(panelName: string): Promise<boolean> {
    await this.searchPanels(panelName);
    const panelLink = this.page.getByRole('link', { name: panelName });
    return await panelLink.count() > 0;
  }

  async verifyPanelState(panelName: string, expectedState: string): Promise<boolean> {
    const panel = await this.getPanelByName(panelName);
    return panel?.panelState.includes(expectedState) || false;
  }

  async verifyPanelEnabled(panelName: string): Promise<boolean> {
    const panel = await this.getPanelByName(panelName);
    return panel?.enabled === 'Enabled';
  }

  async verifyPanelDisabled(panelName: string): Promise<boolean> {
    const panel = await this.getPanelByName(panelName);
    return panel?.enabled === 'Disabled';
  }

  // Filter operations
  async filterByStatus(status: string) {
    await this.moreSearchOptionsButton.click();
    // Implementation depends on actual dropdown structure
    await this.page.selectOption('select', status);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async filterByManufacturer(manufacturer: string) {
    await this.moreSearchOptionsButton.click();
    // Implementation depends on actual dropdown structure
    await this.page.selectOption('select', manufacturer);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
