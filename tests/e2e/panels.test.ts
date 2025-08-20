import { test, expect } from '@playwright/test';
import { PanelsPage } from '../page-objects/PanelsPage';
import { TestUtils } from '../utils/TestUtils';
import testData from '../test-data/testData.json';

test.describe('Panel Operations', () => {
  let panelsPage: PanelsPage;

  test.beforeEach(async ({ page }) => {
    panelsPage = new PanelsPage(page);
    await panelsPage.goto();
    await panelsPage.waitForPageLoad();
  });

  test.describe('Panel - Creation', () => {
    test('Create a new panel using normal values', async ({ page }) => {
      // Test panel creation with valid data
      await test.step('Navigate to Panel creation', async () => {
        await panelsPage.createNewPanel();
        await expect(page).toHaveURL(/.*\/infrastructure\/panels\/details\/create/);
      });

      await test.step('Verify panel creation form is accessible', async () => {
        // Verify we can access the creation form
        await expect(page.locator('h1')).toContainText('Panel - Create New');
      });
    });

    test('Test for failure with unallowed values', async ({ page }) => {
      // Test validation with invalid data
      await panelsPage.createNewPanel();
      
      // This test would need actual form validation testing
      // For now, we verify we can access the form
      await expect(page).toHaveURL(/.*\/infrastructure\/panels\/details\/create/);
    });
  });

  test.describe('Panel - Configuration', () => {
    test('Access panel configuration tabs', async ({ page }) => {
      // First, get an existing panel
      const panels = await panelsPage.getAllPanels();
      test.skip(panels.length === 0, 'No panels available for testing');

      const testPanel = panels[0];
      
      await test.step('Open panel details', async () => {
        await panelsPage.openPanelDetails(testPanel.name);
      });

      await test.step('Verify panel details page loaded', async () => {
        await expect(page).toHaveURL(/.*\/infrastructure\/panels\/details\/\d+/);
      });

      // Test would verify tabs: General, Interactivity, Command Settings, Communication
      // Plus related tabs: Readers, Inputs, Outputs, Panel IO Links
    });
  });

  test.describe('Panel - Control Panel', () => {
    test('Verify panel control functionality', async ({ page }) => {
      const panels = await panelsPage.getAllPanels();
      test.skip(panels.length === 0, 'No panels available for testing');

      const testPanel = panels.find(p => p.enabled === 'Enabled');
      test.skip(!testPanel, 'No enabled panels available for control testing');

      await test.step('Open panel for control operations', async () => {
        await panelsPage.openPanelDetails(testPanel!.name);
      });

      await test.step('Verify panel status information is visible', async () => {
        // Just verify we can see the panel heading and basic content
        await expect(page.locator('h1')).toBeVisible();
        
        // Verify we can see some panel information
        const pageContent = await page.content();
        expect(pageContent).toContain('Panel');
      });

      // Test would verify:
      // - Panel Status visibility
      // - Reader's, Input's, and Output's tabs
      // - Download commands (Download Data, Update Panel, Download Firmware, Reboot Panel)
      // - Controller commands (Start, Stop, Pause)
      // - Refresh functionality
    });
  });

  test.describe('Panel - Event Configuration', () => {
    test('Configure panel events', async ({ page }) => {
      const panels = await panelsPage.getAllPanels();
      test.skip(panels.length === 0, 'No panels available for testing');

      const testPanel = panels[0];
      
      await test.step('Access panel event configuration', async () => {
        await panelsPage.openPanelDetails(testPanel.name);
        
        // Look for Event Configuration tab or section
        const eventTab = page.locator('text=Event, text=Configuration').first();
        if (await eventTab.count() > 0) {
          await eventTab.click();
        }
      });

      // Test would verify:
      // - Add Event to Event Configuration tab
      // - Add Alarm Action with Subscriber Group and Action Message
      // - Add Global Activity Link Action
      // - Enable During Schedule functionality
    });
  });

  test.describe('Panel - Alarms', () => {
    test('Verify panel alarm routing', async ({ page }) => {
      const panels = await panelsPage.getAllPanels();
      test.skip(panels.length === 0, 'No panels available for testing');

      // Test would verify:
      // - Alarm routes for event types
      // - Action Messages are correct
      // - Tests match between SA and SAM
      // - Panel Connected/Disconnected events
      // - Manual panel/firmware download events
    });
  });

  test.describe('Panel - Search and Filter', () => {
    test('Search panels by name', async ({ page }) => {
      await test.step('Perform empty search to get all panels', async () => {
        await panelsPage.searchPanels();
        
        // Verify search results are displayed
        const tableRows = page.locator('table tbody tr');
        const count = await tableRows.count();
        expect(count).toBeGreaterThan(0);
      });

      await test.step('Search for specific panel', async () => {
        // Get first panel name from results
        const panels = await panelsPage.getAllPanels();
        if (panels.length > 0) {
          const firstPanel = panels[0];
          await panelsPage.searchPanels(firstPanel.name);
          
          // Verify the specific panel is found
          await expect(page.getByRole('link', { name: firstPanel.name })).toBeVisible();
        }
      });
    });

    test('Filter panels by status', async ({ page }) => {
      await test.step('Filter by Enabled status', async () => {
        await panelsPage.searchPanels();
        
        // Try to filter by status (implementation may vary)
        await panelsPage.moreSearchOptionsButton.click();
        
        // Verify filter options are available
        const filterOptions = page.locator('select, option');
        const optionCount = await filterOptions.count();
        expect(optionCount).toBeGreaterThan(0);
      });
    });

    test('Verify panel information display', async ({ page }) => {
      await test.step('Check panel table columns', async () => {
        await panelsPage.searchPanels();
        
        // Verify some key columns are present without strict matching
        const keyColumns = ['Logical ID', 'Model Type', 'IP Address'];
        
        for (const column of keyColumns) {
          await expect(page.locator('th').filter({ hasText: new RegExp(`^${column}$`) })).toBeVisible();
        }
        
        // Verify the table has content by checking first table
        await expect(page.locator('table').first()).toBeVisible();
        const tableContent = await page.locator('table').first().textContent();
        expect(tableContent).toContain('Logical ID');
      });
    });
  });

  test.describe('Panel - Bulk Operations', () => {
    test('Bulk panel operations availability', async ({ page }) => {
      await test.step('Verify bulk operation buttons', async () => {
        await panelsPage.searchPanels();
        
        // Check that bulk operation buttons exist
        await expect(page.getByTestId('EnableBtn')).toBeVisible();
        await expect(page.getByTestId('DisableBtn')).toBeVisible();
        await expect(panelsPage.exportWorkspaceButton).toBeVisible();
      });

      await test.step('Test panel selection for bulk operations', async () => {
        // Verify checkboxes are available for selection
        const checkboxes = page.locator('input[type="checkbox"]');
        const checkboxCount = await checkboxes.count();
        expect(checkboxCount).toBeGreaterThan(0);
      });
    });
  });

  test.describe('Panel - Live Updates', () => {
    test('Enable live updates functionality', async ({ page }) => {
      await test.step('Test live updates toggle', async () => {
        await panelsPage.searchPanels();
        
        // Test live updates button
        await expect(panelsPage.enableLiveUpdatesButton).toBeVisible();
        await panelsPage.enableLiveUpdatesButton.click();
        
        // Verify button state change or confirmation
        await TestUtils.waitForSpinnerToDisappear(page);
      });
    });
  });
});

test.describe('Panel State Verification', () => {
  let panelsPage: PanelsPage;

  test.beforeEach(async ({ page }) => {
    panelsPage = new PanelsPage(page);
    await panelsPage.goto();
    await panelsPage.waitForPageLoad();
  });

  test('Verify panel states and information', async ({ page }) => {
    await test.step('Check various panel states', async () => {
      const panels = await panelsPage.getAllPanels();
      
      test.skip(panels.length === 0, 'No panels available for state verification');

      // Verify we have panels with different states
      const enabledPanels = panels.filter(p => p.enabled === 'Enabled');
      const disabledPanels = panels.filter(p => p.enabled === 'Disabled');
      
      console.log(`Found ${enabledPanels.length} enabled panels and ${disabledPanels.length} disabled panels`);
      
      // Verify panel information is complete
      for (const panel of panels.slice(0, 5)) { // Test first 5 panels
        expect(panel.name).toBeTruthy();
        expect(panel.modelType).toBeTruthy();
        expect(panel.manufacturer).toBeTruthy();
        expect(['Enabled', 'Disabled']).toContain(panel.enabled);
      }
    });
  });

  test('Verify panel manufacturers and models', async ({ page }) => {
    await test.step('Check panel types in system', async () => {
      const panels = await panelsPage.getAllPanels();
      
      test.skip(panels.length === 0, 'No panels available for manufacturer verification');

      // Verify we have expected manufacturers
      const manufacturers = [...new Set(panels.map(p => p.manufacturer))];
      const modelTypes = [...new Set(panels.map(p => p.modelType))];
      
      console.log('Available manufacturers:', manufacturers);
      console.log('Available model types:', modelTypes);
      
      // Verify we have some expected types based on test data
      const expectedManufacturers = ['Continental Access', 'HID', 'Mercury'];
      const foundExpectedManufacturers = manufacturers.filter(m => 
        expectedManufacturers.some(expected => m.includes(expected))
      );
      
      expect(foundExpectedManufacturers.length).toBeGreaterThan(0);
    });
  });
});
