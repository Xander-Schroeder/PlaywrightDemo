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