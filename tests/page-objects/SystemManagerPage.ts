import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SystemManagerPage extends BasePage {
  // Schedule-related locators
  readonly holidaysMenuItem: Locator;
  readonly schedulesMenuItem: Locator;
  readonly scheduleSpansMenuItem: Locator;

  // Message Processing locators
  readonly subscriberGroupsMenuItem: Locator;
  readonly actionMessagesMenuItem: Locator;

  // Other menu items
  readonly disDeploymentMenuItem: Locator;
  readonly serviceHealthCheckMenuItem: Locator;
  readonly hostDevicesMenuItem: Locator;
  readonly locationsMenuItem: Locator;
  readonly userMenuItem: Locator;
  readonly rolesMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    
    // Schedule section
    this.holidaysMenuItem = page.getByTestId('SM:HOLIDAY-DETAILS');
    this.schedulesMenuItem = page.getByTestId('SM:SCHEDULES-DETAILS');
    this.scheduleSpansMenuItem = page.getByTestId('SM:SCHEDULESSPAN-DETAILS');
    
    // Message Processing section
    this.subscriberGroupsMenuItem = page.getByTestId('SM:SUBSCRIBERGROUP-DETAILS');
    this.actionMessagesMenuItem = page.getByTestId('SM:ACTIONMESSAGES-DETAILS');
    
    // Other sections
    this.disDeploymentMenuItem = page.getByText('DIS Deployment');
    this.serviceHealthCheckMenuItem = page.getByText('Service Health Check');
    this.hostDevicesMenuItem = page.getByText('Host Devices');
    this.locationsMenuItem = page.getByText('Locations');
    this.userMenuItem = page.getByText('User');
    this.rolesMenuItem = page.getByText('Roles');
  }

  async navigateToHolidays() {
    await this.navigateToSystemManager();
    await this.holidaysMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToSchedules() {
    await this.navigateToSystemManager();
    await this.schedulesMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToScheduleSpans() {
    await this.navigateToSystemManager();
    await this.scheduleSpansMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToSubscriberGroups() {
    await this.navigateToSystemManager();
    await this.subscriberGroupsMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToActionMessages() {
    await this.navigateToSystemManager();
    await this.actionMessagesMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToDISDeployment() {
    await this.navigateToSystemManager();
    await this.disDeploymentMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToServiceHealthCheck() {
    await this.navigateToSystemManager();
    await this.serviceHealthCheckMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToHostDevices() {
    await this.navigateToSystemManager();
    await this.hostDevicesMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToLocations() {
    await this.navigateToSystemManager();
    await this.locationsMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToUser() {
    await this.navigateToSystemManager();
    await this.userMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToRoles() {
    await this.navigateToSystemManager();
    await this.rolesMenuItem.click();
    await this.waitForPageLoad();
  }
}
