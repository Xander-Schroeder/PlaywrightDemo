# Shared Authentication State Implementation

This implementation provides shared browser storage (cookies, local storage, session storage) across all test workers to solve authentication issues when running tests in parallel.

## How It Works

### 1. Global Setup (`tests/global-setup.ts`)
- Runs **once** before all tests start
- Authenticates with the SMS system
- Saves authentication state to `auth-state.json`
- All test workers will reuse this authenticated state

### 2. Shared Storage State (`playwright.config.ts`)
```typescript
use: {
  storageState: './auth-state.json'
}
```
- All browser contexts automatically load the saved authentication state
- Includes cookies, localStorage, sessionStorage
- Workers don't need to authenticate individually

### 3. Authentication Verification (`BasePage.ts` & `TestUtils.ts`)
- Pages verify authentication status before proceeding
- Helpful utilities to check authentication state
- Graceful error handling if authentication expires

## Benefits

✅ **Eliminates Authentication Race Conditions**: Only one authentication happens globally  
✅ **Faster Test Execution**: No per-worker authentication delays  
✅ **Parallel Test Support**: Works reliably with multiple workers  
✅ **UI Mode Compatible**: Solves Playwright UI parallelization issues  
✅ **Corporate Auth Friendly**: Reduces load on Intel's authentication system  

## File Structure

```
tests/
├── global-setup.ts          # Global authentication setup
├── utils/TestUtils.ts       # Authentication verification utilities
├── page-objects/BasePage.ts # Enhanced with auth verification
└── ...                      # Your existing test files

auth-state.json              # Generated authentication state (gitignored)
```

## Usage

Tests automatically use the shared authentication state. No changes needed to existing test code.

### Optional: Verify Authentication in Tests
```typescript
import { TestUtils } from '../utils/TestUtils';

test('my test', async ({ page }) => {
  // Verify authentication before proceeding
  const isAuthenticated = await TestUtils.verifyPageAuthentication(page);
  if (!isAuthenticated) {
    throw new Error('Authentication required');
  }
  
  // Your test code here...
});
```

## Troubleshooting

### Authentication State Expired
If tests start failing with authentication errors:
1. Delete `auth-state.json`
2. Run tests again - global setup will re-authenticate

### Still Getting Parallel Issues
If you still experience parallel execution issues:
1. Reduce workers in `playwright.config.ts`: `workers: 2`
2. Consider using `fullyParallel: false` for specific test files

### For UI Mode Issues
Add this to `playwright.config.ts` to detect UI mode:
```typescript
workers: process.env.PWTEST_HTML_REPORT_OPEN ? 1 : undefined
```

## Security Notes

- `auth-state.json` contains session data - it's added to `.gitignore`
- State expires after 24 hours (configurable in `TestUtils.isAuthStateValid()`)
- No credentials are stored, only session cookies/tokens
