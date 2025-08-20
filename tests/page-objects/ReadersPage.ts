import { Page, expect, Locator } from '@playwright/test';
import { InfrastructureManagerPage } from './InfrastructureManagerPage';

export class ReadersPage extends InfrastructureManagerPage {
  // Search page locators
  readonly searchNameInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly readersTable: Locator;
  readonly addReaderButton: Locator;
  readonly moreSearchOptionsButton: Locator;
  
  // Reader Details page locators
  readonly readerNameInput: Locator;
  readonly enabledStateDropdown: Locator;
  readonly logicalIdInput: Locator;
  readonly readerTypeDropdown: Locator;
  readonly descriptionInput: Locator;
  readonly readerModelDropdown: Locator;
  readonly managedCheckbox: Locator;
  readonly locationInput: Locator;
  readonly floorDropdown: Locator;
  
  // Reader Control buttons
  readonly enableButton: Locator;
  readonly disableButton: Locator;
  readonly unlockMomentaryButton: Locator;
  readonly unlockAndHoldButton: Locator;
  readonly lockButton: Locator;
  readonly deleteReaderButton: Locator;
  
  // Status indicators
  readonly stateIndicator: Locator;
  readonly statusIndicator: Locator;
  readonly doorStatusIndicator: Locator;
  readonly refreshButton: Locator;
  
  // Configuration tabs
  readonly configurationTab: Locator;
  readonly eventConfigurationTab: Locator;
  readonly accessAreasTab: Locator;
  readonly accessCategoriesTab: Locator;
  readonly readerOwnershipTab: Locator;
  readonly commentsTab: Locator;
  readonly deviceHistoryTab: Locator;
  readonly tagsTab: Locator;
  
  // Configuration sections
  readonly generalSection: Locator;
  readonly doorIOSection: Locator;
  readonly durationsSection: Locator;
  readonly eventSettingsSection: Locator;
  readonly schedulesSection: Locator;
  
  // Reader Configuration fields
  readonly readerNumberDropdown: Locator;
  readonly keypadPresentCheckbox: Locator;
  readonly keyCodeInput: Locator;
  readonly readerUsageDropdown: Locator;
  readonly apbDurationInput: Locator;
  readonly timeAttendanceUsageDropdown: Locator;
  readonly twoCarrierUsageDropdown: Locator;
  readonly enforceCheckbox: Locator;
  readonly timeoutInput: Locator;
  
  // Door I/O fields
  readonly doorBypassInput: Locator;
  readonly doorSensorInput: Locator;
  readonly doorStrikeRelayInput: Locator;
  readonly doorShuntRelayInput: Locator;
  readonly enforceDefaultsCheckbox: Locator;
  
  // Duration fields
  readonly doorStrikeActivationDurationInput: Locator;
  readonly doorForcedAlarmDelayInput: Locator;
  readonly interactiveRequestTimeoutInput: Locator;
  readonly doorAjarAlarmDelayInput: Locator;
  
  // Event Settings fields
  readonly suppressDoorAjarCheckbox: Locator;
  readonly suppressDoorAjarAlertCheckbox: Locator;
  readonly reportBypassCheckbox: Locator;
  readonly unlockOnBypassCheckbox: Locator;
  
  // Schedule fields
  readonly carrierOnlyScheduleInput: Locator;
  readonly carrierPinScheduleInput: Locator;
  readonly pinOnlyScheduleInput: Locator;
  readonly freeAccessScheduleInput: Locator;
  
  // Save and Cancel buttons
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Search page locators
    this.searchNameInput = page.getByRole('textbox', { name: 'Name or Database ID' });
    this.searchButton = page.getByTestId('searchBtn');
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.readersTable = page.locator('table');
    this.addReaderButton = page.getByRole('link', { name: 'Add Reader' });
    this.moreSearchOptionsButton = page.getByRole('button', { name: 'More Search Options' });
    
    // Reader Details page locators
    this.readerNameInput = page.getByRole('textbox', { name: 'Name' });
    this.enabledStateDropdown = page.getByRole('combobox', { name: 'Enabled State' });
    this.logicalIdInput = page.getByRole('textbox', { name: 'Logical ID' });
    this.readerTypeDropdown = page.getByRole('combobox', { name: 'Reader Type' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.readerModelDropdown = page.getByRole('combobox', { name: 'Reader Model' });
    this.managedCheckbox = page.getByRole('checkbox', { name: 'Managed' });
    this.locationInput = page.getByRole('textbox', { name: 'Location' });
    this.floorDropdown = page.getByRole('combobox', { name: 'Floor' });
    
    // Reader Control buttons - use data-testid for specificity
    this.enableButton = page.getByTestId('EnableBtn');
    this.disableButton = page.getByTestId('DisableBtn');
    this.unlockMomentaryButton = page.getByTestId('UnlockMomentaryBtn');
    this.unlockAndHoldButton = page.getByTestId('UnlockandHoldBtn');
    this.lockButton = page.getByTestId('LockBtn');
    this.deleteReaderButton = page.getByRole('button', { name: 'Delete Reader' });
    
    // Status indicators
    this.stateIndicator = page.locator('div[role="alert"]').nth(0); // First alert after control buttons
    this.statusIndicator = page.locator('div[role="alert"]').nth(1); // Second alert after control buttons
    this.doorStatusIndicator = page.locator('div[role="alert"]').nth(2); // Third alert after control buttons
    this.refreshButton = page.locator('button[aria-label*="refresh"], button[title*="refresh"]').first();
    
    // Configuration tabs
    this.configurationTab = page.getByRole('tab', { name: 'Configuration', exact: true });
    this.eventConfigurationTab = page.getByRole('tab', { name: 'Event Configuration' });
    this.accessAreasTab = page.getByRole('tab', { name: 'Access Areas' });
    this.accessCategoriesTab = page.getByRole('tab', { name: 'Access Categories' });
    this.readerOwnershipTab = page.getByRole('tab', { name: 'Reader Ownership' });
    this.commentsTab = page.getByRole('tab', { name: 'Comments' });
    this.deviceHistoryTab = page.getByRole('tab', { name: 'Device History' });
    this.tagsTab = page.getByRole('tab', { name: 'Tags' });
    
    // Configuration sections
    this.generalSection = page.getByRole('button', { name: 'General' });
    this.doorIOSection = page.getByRole('button', { name: 'Door I/O' });
    this.durationsSection = page.getByRole('button', { name: 'Durations' });
    this.eventSettingsSection = page.getByRole('button', { name: 'Event Settings' });
    this.schedulesSection = page.getByRole('button', { name: 'Schedules' });
    
    // Reader Configuration fields
    this.readerNumberDropdown = page.getByRole('combobox', { name: /Reader Number/ });
    this.keypadPresentCheckbox = page.getByRole('checkbox', { name: /Keypad Present/ });
    this.keyCodeInput = page.getByRole('spinbutton', { name: /Key Code/ });
    this.readerUsageDropdown = page.getByRole('combobox', { name: /Reader Usage/ });
    this.apbDurationInput = page.getByRole('spinbutton', { name: /APB Duration/ });
    this.timeAttendanceUsageDropdown = page.getByRole('combobox', { name: /Time And Attendance Usage/ });
    this.twoCarrierUsageDropdown = page.getByRole('combobox', { name: /Two Carrier Usage/ });
    this.enforceCheckbox = page.getByRole('checkbox', { name: /Enforce/ });
    this.timeoutInput = page.getByRole('spinbutton', { name: /Timeout/ });
    
    // Door I/O fields
    this.doorBypassInput = page.getByRole('spinbutton', { name: /Door Bypass Input/ });
    this.doorSensorInput = page.getByRole('spinbutton', { name: /Door Sensor Input/ });
    this.doorStrikeRelayInput = page.getByRole('spinbutton', { name: /Door Strike Relay/ });
    this.doorShuntRelayInput = page.getByRole('spinbutton', { name: /Door Shunt Relay/ });
    this.enforceDefaultsCheckbox = page.getByRole('checkbox', { name: /Enforce Defaults/ });
    
    // Duration fields
    this.doorStrikeActivationDurationInput = page.getByRole('spinbutton', { name: /Door Strike Activation Duration/ });
    this.doorForcedAlarmDelayInput = page.getByRole('spinbutton', { name: /Door Forced Alarm Delay/ });
    this.interactiveRequestTimeoutInput = page.getByRole('spinbutton', { name: /Interactive Request Timeout/ });
    this.doorAjarAlarmDelayInput = page.getByRole('spinbutton', { name: /Door Ajar Alarm Delay/ });
    
    // Event Settings fields  
    this.suppressDoorAjarCheckbox = page.getByRole('checkbox', { name: 'Suppress Door Ajar (Controls Door Held Open Alerts)' });
    this.suppressDoorAjarAlertCheckbox = page.getByRole('checkbox', { name: 'Suppress Door Ajar Alert for Door Forced Open' });
    this.reportBypassCheckbox = page.getByRole('checkbox', { name: 'Report Bypass' });
    this.unlockOnBypassCheckbox = page.getByRole('checkbox', { name: 'Unlock on Bypass' });    // Schedule fields
    this.carrierOnlyScheduleInput = page.getByRole('textbox', { name: /Carrier Only Schedule/ });
    this.carrierPinScheduleInput = page.getByRole('textbox', { name: /Carrier and PIN Schedule/ });
    this.pinOnlyScheduleInput = page.getByRole('textbox', { name: /PIN Only Schedule/ });
    this.freeAccessScheduleInput = page.getByRole('textbox', { name: /Free Access Schedule/ });
    
    // Save and Cancel buttons
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async navigateToReaders() {
    await this.navigateToReadersSearch();
  }

  async navigateToReadersSearch() {
    await this.page.goto('/infrastructure/readers/search');
    await this.page.waitForLoadState('networkidle');
    await this.waitForPageLoad();
    await expect(this.page.locator('h1')).toContainText('Readers');
  }

  async searchReaders(searchTerm: string = '') {
    if (searchTerm) {
      await this.searchNameInput.fill(searchTerm);
    } else {
      // Clear any existing search terms to show all results
      await this.searchNameInput.clear();
    }
    
    // Wait for any backdrop overlay to disappear and try clicking search
    try {
      // First attempt - normal click
      await this.searchButton.click({ timeout: 2000 });
    } catch (error) {
      // If normal click fails due to backdrop, try force click
      console.log('Normal click failed, trying force click');
      await this.searchButton.click({ force: true });
    }
    
    await this.page.waitForLoadState('networkidle');
    
    // Wait for results to load - either showing results or no results message
    try {
      await this.page.waitForSelector('text=/Showing \\d+ of \\d+ results/', { timeout: 15000 });
    } catch (error) {
      // Check if there are no results or if we're still loading
      const noResults = await this.page.locator('text=No results found').isVisible();
      const hasResults = await this.page.locator('text=/Showing \\d+ of \\d+ results/').isVisible();
      
      if (!noResults && !hasResults) {
        // Try clicking search again as the page may not have loaded properly
        await this.searchButton.click({ force: true });
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('text=/Showing \\d+ of \\d+ results/', { timeout: 10000 });
      }
    }
  }

  async clickReaderByName(readerName: string) {
    // Wait for the search results to be visible
    await this.page.waitForSelector('text=/Showing \\d+ of \\d+ results/', { timeout: 15000 });
    
    const readerLink = this.page.getByRole('link', { name: readerName }).first();
    await readerLink.waitFor({ state: 'visible', timeout: 15000 });
    await readerLink.click();
    await this.waitForPageLoad();
    
    // Additional wait for reader details page
    await this.page.waitForSelector('h1:has-text("Reader -")', { timeout: 10000 });
  }

  async getReaderCount(): Promise<number> {
    // Check if we have search results, if not perform a search first
    const hasResults = await this.page.locator('text=/Showing \\d+ of \\d+ results/').isVisible();
    if (!hasResults) {
      await this.searchReaders(); // Perform search to get results
    }
    
    // Wait for search results to load
    await this.page.waitForSelector('text=/Showing \\d+ of \\d+ results/', { timeout: 15000 });
    
    const resultsText = await this.page.locator('text=/Showing \\d+ of \\d+ results/').textContent();
    if (resultsText) {
      const match = resultsText.match(/Showing \d+ of (\d+) results/);
      return match ? parseInt(match[1]) : 0;
    }
    return 0;
  }

  async getFirstReaderName(): Promise<string | null> {
    const firstReaderLink = this.readersTable.locator('tbody tr:first-child td:nth-child(4) a').first();
    if (await firstReaderLink.count() > 0) {
      return await firstReaderLink.textContent();
    }
    return null;
  }

  async clickControlButton(buttonName: 'Enable' | 'Disable' | 'Unlock Momentary' | 'Unlock and Hold' | 'Lock') {
    const button = this.page.getByRole('button', { name: buttonName });
    await button.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getReaderState(): Promise<string> {
    return await this.stateIndicator.textContent() || '';
  }

  async getReaderStatus(): Promise<string> {
    return await this.statusIndicator.textContent() || '';
  }

  async getDoorStatus(): Promise<string> {
    return await this.doorStatusIndicator.textContent() || '';
  }

  async refreshReaderStatus() {
    await this.refreshButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToConfiguration() {
    await this.configurationTab.click();
    await this.waitForPageLoad();
  }

  async navigateToEventConfiguration() {
    await this.eventConfigurationTab.click();
    await this.waitForPageLoad();
  }

  async expandConfigurationSection(sectionName: 'General' | 'Door I/O' | 'Durations' | 'Event Settings' | 'Schedules') {
    const section = this.page.getByRole('button', { name: sectionName });
    if (await section.getAttribute('aria-expanded') !== 'true') {
      await section.click();
      await this.page.waitForTimeout(500); // Wait for section to expand
    }
  }

  async updateReaderField(field: string, value: string) {
    const fieldLocator = this.page.getByRole('textbox', { name: field }).or(
      this.page.getByRole('combobox', { name: field })
    ).or(
      this.page.getByRole('spinbutton', { name: field })
    );
    
    if (await fieldLocator.count() > 0) {
      await fieldLocator.fill(value);
    }
  }

  async toggleCheckbox(checkboxName: string, checked: boolean) {
    const checkbox = this.page.getByRole('checkbox', { name: new RegExp(checkboxName, 'i') });
    const isChecked = await checkbox.isChecked();
    if (isChecked !== checked) {
      await checkbox.click();
    }
  }

  async saveReaderConfiguration() {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async deleteReader() {
    await this.deleteReaderButton.click();
    // Wait for confirmation dialog if it appears
    const confirmButton = this.page.getByRole('button', { name: /confirm|delete|yes/i });
    if (await confirmButton.isVisible({ timeout: 2000 })) {
      await confirmButton.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async verifyReaderExists(readerName: string): Promise<boolean> {
    await this.searchReaders(readerName);
    const readerLink = this.page.getByRole('link', { name: readerName });
    return await readerLink.count() > 0;
  }

  async createNewReader(readerData: {
    name: string;
    logicalId?: string;
    readerType?: string;
    readerModel?: string;
    description?: string;
    enabledState?: string;
  }) {
    // This method would be implemented if there's an "Add Reader" functionality
    // For now, we'll focus on testing existing readers
    await this.addReaderButton.click();
    await this.waitForPageLoad();
    
    await this.readerNameInput.fill(readerData.name);
    
    if (readerData.logicalId) {
      await this.logicalIdInput.fill(readerData.logicalId);
    }
    
    if (readerData.readerType) {
      await this.readerTypeDropdown.selectOption(readerData.readerType);
    }
    
    if (readerData.readerModel) {
      await this.readerModelDropdown.selectOption(readerData.readerModel);
    }
    
    if (readerData.description) {
      await this.descriptionInput.fill(readerData.description);
    }
    
    if (readerData.enabledState) {
      await this.enabledStateDropdown.selectOption(readerData.enabledState);
    }
    
    await this.saveReaderConfiguration();
  }

  async verifyConfigurationTabs(): Promise<boolean> {
    const expectedTabs = [
      'Configuration',
      'Event Configuration', 
      'Access Areas',
      'Access Categories',
      'Reader Ownership'
    ];
    
    for (const tabName of expectedTabs) {
      const tab = this.page.getByRole('tab', { name: tabName });
      if (await tab.count() === 0) {
        return false;
      }
    }
    return true;
  }

  async verifyConfigurationSections(): Promise<boolean> {
    await this.navigateToConfiguration();
    
    const expectedSections = [
      'General',
      'Door I/O', 
      'Durations',
      'Event Settings',
      'Schedules'
    ];
    
    for (const sectionName of expectedSections) {
      const section = this.page.getByRole('button', { name: sectionName });
      if (await section.count() === 0) {
        return false;
      }
    }
    return true;
  }
}
