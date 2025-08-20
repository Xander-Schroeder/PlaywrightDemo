# Playwright Test Framework Setup

- I am running this on Windows 11. Run all command line commands as powershell-compatible commands.
- **Follow all instructions in order**.
- Target: Build a comprehensive cross-browser Playwright test suite that achieves 100% pass rate.
- There is a logging system at 'test-runner.js'
- When you run into an issue or have failing tests to fix use the mcp server and reevaluate how the site works to fix them
- Read the full prompt before you start executing to have an idea of the full task
- When executing... check to see if parts of the prompt were already executed in previous runs... do this by checking the file structure, test success rate, and existing tests. Run tests if neccessary to check status
- NEVER MAKE INFORMATION UP -> if you are implementing pages or tests make sure the parts of the sites you are referencing (buttons, tables, fields, etc.) make sure the things you are referencing are either in your indicators file or backed up by exploration using the mcp server to reference the correct things
- **CRITICAL**: Do not proceed to next phase until current phase is complete and validated
- **FAIL FAST**: If basic navigation doesn't work, stop and fix it before building complex tests
- **MCP FIRST**: Use MCP browser to validate every interaction before coding it
- **CSV COMPLIANCE**: Each CSV requirement must map to a specific test - no generic tests allowed
- **100% PASS RATE REQUIRED**: Do not stop until all tests pass - iterate until success

## Phase 1: Project Structure Setup

1. **Create Playwright Test Structure**: Set up the following directory structure directly in the project root:

```console
tests/
├── e2e/                    # End-to-end test files
├── page-objects/           # Page Object Model classes
├── utils/                  # Utilities and helpers
└── test-data/              # Test data files
```

2. **Essential Configuration Files**:
   - `playwright.config.ts` - Cross-browser configuration with projects for chromium, firefox, webkit, Mobile Chrome, Mobile Safari
   - Global setup/teardown for test environment management
   - Proper timeout configurations (60s test timeout, 10s expect timeout)
   - Any package.lock files or other project files that are needed to be able to run these tests

## Phase 2: Exploration

1. **Visit the site**: <https://azsqsmsls300.amr.corp.intel.com:4012/sms-dashboard>
    - You should use the playwright mcp server to access the site

2. **Record your findings**
    - Make a file called 'indicators.md' where you can record the names and references of all the buttons and actions you can take on the site
    - Make sure to thoroughly explore this site all the difference panels menus and pages you can and record as much about it as you can

## Phase 3: Testing Setup

1. **Look at the acceptance criteria**
    - The file 'Master_Test_Sheet_DIS_3.2.csv' contains all of our testing that we want to fulfill
    - For now just focus on the first sheet in this file and ignore the rest of them

2. **Run through acceptance criteria using MCP server**
    - Go back and compare the acceptance criteria for these tests to the site and see if you can execute these workflows
    - Make any notes or adjustments you need to to your references in 'indicators.md'

3. **MANDATORY: Map CSV Requirements to Tests**
    - **Reader - Creation**: Must test both successful creation with normal values AND failure with unallowed values
    - **Reader - Configuration**: Must access and verify all tabs: Reader Settings, Door I/O, Duration Settings, Event Settings, Schedules, Other
    - **Reader - Control Reader**: Must test all state changes: Disable->Enable->Unlock Momentary->Unlock and Hold->Lock, verify State/Status/Door Status changes and SMS events
    - **Reader - Badge Testing**: Must test allowed/denied badges, two badge settings, anti-pass back, keypad settings, ADA extended strike time
    - **Reader - Event Configuration**: Must add events with alarm actions including Subscriber Group, Action Message, and "Enable During Schedule" testing
    - **Reader - Alarms**: Must confirm alarm routing for Door Ajar and Door Closed events, verify SA/SAM consistency
    - **Reader - Deletion**: Must successfully delete readers and verify removal

4. **Setup testing framework**
    - Install playwright and/or browsers as needed
    - Build playwright pages based on all your notes gathered in the 'indicators.md' file to allow for easier testing
        - Base Page Object: Create a `BasePage.ts` with:
            - Navigation methods (`goto()`)
            - Page load waiting strategies using `domcontentloaded`
            - Cross-browser compatibility with Firefox retry logic for connection issues
            - Common element selectors (navigation, disclaimers)
        - Any other ammount of specialized pages as needed

## Phase 4: Testing implementation

1. **Implement tests for the criteria**
    - View all your notes and the criteria in the `Master_Test_Sheet_DIS_3.2.csv` file and write tests to encapsulate the functionality of the following: Basic site infrastructure, Panel use (adding deleting and everything else), and Reader use (Creation configuration deletion etc.)
    - There are extra  things included in the `Master_Test_Sheet_DIS_3.2.csv` but ignore any of the acceptance criteria for features not listed above
    - Obviously write these tests as playwright tests
    - Make sure they fully encapsulate what we need to be able to check and don't take more than 5 mins

2. **CRITICAL: Implement ALL CSV Reader Requirements**
    - **Reader - Creation**: "Create a new reader on the panel, using normal values. Save, and load reader to confirm data saved. Test for failure with unallowed values."
    - **Reader - Configuration**: "Edit or Adjust: Reader Settings, Door I/O, Duration Settings, Event Settings, Schedules, Other"
    - **Reader - Control Reader**: "Using the Control Reader Function: Disable/Enable/Unlock Momentary/Unlock and Hold/Lock with proper state changes and SMS event verification"
    - **Reader - Badge Testing**: "Test badge swiping with allowed and denied badges. Test with two badge settings. Test anti-pass back settings. Test with Keypad settings. ADA - Extended Strike Time."
    - **Reader - Event Configuration**: "Add any Event to the Event Configuration tab. Add an Alarm Action with Subscriber Group and Action Message. Test 'Enable During Schedule'."
    - **Reader - Alarms**: "Confirm alarms route for event types, and Action Messages are correct. Confirm tests match between SA and SAM. Door Ajar, Door Closed"
    - **Reader - Deletion**: "Delete Reader(s)"

3. **MANDATORY: Fix Navigation Issues First**
    - Before implementing CSV requirements, ensure basic navigation to readers page works
    - Test authentication persistence and page load timing
    - Verify all testIds and selectors work in the current browser state
    - Use MCP browser to validate navigation path to readers functionality

## Phase 5: Check success

1. **Check all tests**
    - Run these tests and confirm they all pass
    - Confirm they run in less than five minutes as well
    - If they do not all pass observe the errors and compare with your acceptance criteria in 'Master_Test_Sheet_DIS_3.2.csv' and fix any tests that need to be fixed

2. **ADDITIONAL SUCCESS CRITERIA**
    Test Implementation Completeness:
        - [ ] **Basic infrastructure**: Dedicated file that explore basic infrastructure of the site
        - [ ] **Panels**: Dedicated test file with Creation, Configuration, Control, Deletion (refer to criteria in  `Master_Test_Sheet_DIS_3.2.csv`)
        - [ ] **Readers**: Dedicated test file with Creation, Configuration, Control, Badge Testing, Events, Alarms, Deletion (refer to criteria in  `Master_Test_Sheet_DIS_3.2.csv`)

3. **MANDATORY COMPLETION CRITERIA**
    - **Must achieve 100% pass rate** - no failing tests allowed
    - **Reader tests MUST match CSV exactly** - each CSV row should have corresponding test
    - **All 7 reader test categories required**: Creation, Configuration, Control, Badge Testing, Event Configuration, Alarms, Deletion
    - **Navigation must work reliably** - no timeout errors on basic page access
    - **Use MCP browser to verify each test step** before implementing the test

4. **DO NOT STOP UNTIL ALL REQUIREMENTS MET**
    - Keep iterating and fixing issues until ALL tests pass
    - Each failure must be debugged using MCP browser exploration
    - Reference the indicators.md file for correct selectors and navigation paths
    - Validate every selector and interaction pattern in the browser before coding

---

## IMPORTANT IMPLEMENTATION NOTES - Read Before Building Tests

### Site Architecture & Navigation Understanding

**SMS Security Management System Structure:**

- **URL:** <https://azsqsmsls300.amr.corp.intel.com:4012/sms-dashboard>
- **Framework:** React/Material-UI based application with complex navigation
- **Manager Tabs:** SMS Dashboard, Profile Manager, Access Manager, Infrastructure Manager, System Manager, Verification Manager
- **Load Times:** Initial page load ~14-15s, navigation between sections 1-3s
- **Authentication:** Uses Intel corporate auth, welcome message shows current user

### Critical TestId Patterns & Naming Conventions

**Navigation TestIds:**

- Main tabs: `SMTopNavBtn`, `AMTopNavBtn`, `IMTopNavBtn`, `PMTopNavBtn`, `VMTopNavBtn`
- System Manager menu items use pattern: `SM:SECTION-DETAILS`
  - Holidays: `SM:HOLIDAY-DETAILS`
  - Schedules: `SM:SCHEDULES-DETAILS` (note: plural)
  - Schedule Spans: `SM:SCHEDULESSPAN-DETAILS` (note: no hyphen)
  - Subscriber Groups: `SM:SUBSCRIBERGROUP-DETAILS` (note: no hyphen)
  - Action Messages: `SM:ACTIONMESSAGES-DETAILS` (note: no hyphen)
- Access Manager menu items: `AM:SECTION-DETAILS-Btn`
  - Access Areas: `AM:AREA-DETAILS-Btn`
  - Access Groups: `AM:GROUP-DETAILS-Btn`
  - Default Access: `AM:DEFAULT-DETAILS-Btn`
- Infrastructure Manager: `IM:SECTION-DETAILS`
  - Panels: `IM:PANEL-DETAILS`

**Form & Button TestIds:**

- Search buttons: `searchBtn` (consistent across all pages)
- Advanced search: `advancedSearch-header` (accordion-style expandable)

### Page Title Patterns

**Actual vs Expected Titles (Common Mistakes):**

- "Reader Group" NOT "Reader Groups"
- "Schedule Span" NOT "Schedule Spans"
- "Access Groups" NOT "Groups"
- "Add Access Group" NOT "Add Group"

**Always verify actual page titles using MCP browser before writing assertions!**

### Playwright Strict Mode Considerations

**Common Strict Mode Violations:**

1. **Search Button Issue:**
   - ❌ `getByRole('button', { name: 'Search' })` - matches both search button AND advanced search accordion
   - ✅ `getByTestId('searchBtn')` - specific and reliable

2. **Input Field Issues:**
   - ❌ `locator('input')` - matches multiple inputs on forms
   - ✅ `getByRole('textbox', { name: 'Name or Database ID' })` - specific by accessibility name

3. **Complex Text Selectors:**
   - ❌ `locator('text=Holiday, button:has-text("Add"), button:has-text("Search")')` - unreliable and error-prone
   - ✅ Individual assertions: `expect(page.locator('h1')).toContainText('Holidays')` + `expect(page.getByTestId('searchBtn')).toBeVisible()`

### Selector Strategy Best Practices

**Priority Order for Element Selection:**

1. **testId** (highest priority) - `getByTestId('searchBtn')`
2. **Accessibility role with name** - `getByRole('textbox', { name: 'Name or Database ID' })`
3. **Link text** - `getByRole('link', { name: 'Add Panel' })`
4. **Heading text** - `page.locator('h1')` with `toContainText()`
5. **CSS selectors** (last resort) - only for unique elements

**Never Use:**

- Combined text selectors with multiple conditions
- Generic selectors like `locator('input')` or `locator('button')`
- Text selectors that might change based on dynamic content

### Error Handling & Debugging

**When Tests Fail:**

1. **Use MCP Playwright Browser** to explore actual page structure
2. **Check Console Output** for JavaScript errors or warnings
3. **Verify testIds** using browser evaluate: `document.querySelectorAll('[data-testid]')`
4. **Screenshot Analysis** - Playwright automatically captures screenshots on failure
5. **MANDATORY: Debug every failure step-by-step** - don't guess, verify in browser
6. **Authentication Issues**: Check browser state, re-authenticate if needed
7. **Navigation Timeouts**: Verify page load timing and element visibility

**Debugging Process for Reader Tests:**

1. **Start with MCP Browser**: Navigate manually to readers section first
2. **Verify Each Step**: Every navigation, click, and assertion should be validated in browser
3. **Check testIds**: Use `await page.evaluate(() => Array.from(document.querySelectorAll('[data-testid]')).map(el => el.getAttribute('data-testid')))` to list all available testIds
4. **Test Selectors**: Use browser evaluate to test selectors before writing tests
5. **Authentication State**: Ensure tests handle auth state properly between test runs

**Performance Considerations:**

- Set realistic timeouts: 20s for page loads, 10s for element interactions
- Use `waitForLoadState('networkidle')` for dynamic content
- Consider `waitForPageLoad()` methods in page objects

### Page Object Model Implementation

**BasePage.ts Requirements:**

- `getCurrentUser()` method with timeout handling and fallback logic
- `waitForPageLoad()` with configurable timeout
- `navigateToManager()` methods for each main section
- Error handling for navigation failures

**Specialized Page Classes:**

- Extend BasePage for consistent behavior
- Include specific testId locators as class properties
- Implement navigation methods that wait for page state
- Use descriptive method names that match user actions

### Test Structure Best Practices

**Test Organization:**

- Group related functionality in describe blocks
- Use step-by-step approach with `test.step()`
- Verify individual elements rather than complex combinations
- Include performance validation where specified

**Assertion Patterns:**

```typescript
// ✅ Good - specific and reliable
await expect(page.locator('h1')).toContainText('Expected Title');
await expect(page.getByTestId('searchBtn')).toBeVisible();
await expect(page.getByRole('link', { name: 'Add Item' })).toBeVisible();

// ❌ Bad - prone to strict mode violations
await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
const elements = page.locator('complex, text=selector');
expect(await elements.count()).toBeGreaterThan(0);
```

### Common Pitfalls to Avoid

1. **Assuming TestId Names** - Always verify actual testIds in browser
2. **Generic Selectors** - Be specific to avoid strict mode violations  
3. **Combined Complex Selectors** - Break into individual assertions
4. **Hardcoded Timeouts** - Use realistic values based on actual load times
5. **Text Exact Matches** - Use `toContainText()` instead of exact text matching
6. **Ignoring Console Warnings** - SSL and security warnings are normal for this internal site

### Success Metrics

**Target Achievements:**

- 100% test pass rate (ALL tests must pass - no exceptions)
- Execution time under 5 minutes
- Cross-browser compatibility
- Reliable execution without flaky tests
- Proper error reporting and debugging information

**MANDATORY Reader Test Validation:**

- [ ] All 7 reader CSV categories implemented as separate tests
- [ ] Reader Creation test validates normal values and failure cases
- [ ] Reader Configuration test covers all tabs (Settings, Door I/O, Duration, Event, Schedules, Other)
- [ ] Reader Control test validates state changes for all actions (Disable/Enable/Unlock Momentary/Unlock and Hold/Lock)
- [ ] Reader Badge Testing test covers allowed/denied badges, two badge settings, anti-pass back, keypad, ADA
- [ ] Reader Event Configuration test adds events with alarm actions and schedule testing
- [ ] Reader Alarms test confirms alarm routing for Door Ajar/Door Closed events
- [ ] Reader Deletion test successfully removes readers
- [ ] ALL reader tests pass 100% reliably

**Validation Checklist:**

- [ ] All testIds verified in actual browser using MCP
- [ ] No strict mode violations
- [ ] Individual element assertions used
- [ ] Realistic timeouts set based on actual application performance
- [ ] Page titles match actual content
- [ ] Performance requirements met
- [ ] Error handling implemented
- [ ] Each CSV requirement mapped to working test
- [ ] Navigation works reliably without timeouts
- [ ] Authentication state maintained across tests

```typescript
