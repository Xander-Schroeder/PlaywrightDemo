# CI/CD Setup for Playwright Testing

This document explains the CI/CD implementation using GitHub Actions for the Playwright test suite.

## 🚀 Available Workflows

### 1. Manual Test Run (`manual-test-run.yml`)
- **Trigger:** Manual workflow dispatch
- **Purpose:** Run tests on-demand with customizable options
- **Features:**
  - Choose specific test suites (all, infrastructure, panels, readers)
  - Select browser (chromium, firefox, webkit)
  - Uploads HTML reports and test results as artifacts
  - 30-day artifact retention

### 2. Pull Request Tests (`pr-tests.yml`)
- **Trigger:** Pull requests to main/master branch
- **Purpose:** Automated testing for code changes
- **Features:**
  - Runs on chromium browser
  - Comments test results directly on PR
  - 14-day artifact retention
  - Fails PR if tests don't pass

### 3. CI Tests with Mock Auth (`ci-tests-mock-auth.yml`)
- **Trigger:** Pull requests and pushes to main/master
- **Purpose:** Run tests in CI environment with mock authentication
- **Features:**
  - Uses mock authentication state
  - Optimized for CI environment
  - Uses `playwright.ci.config.ts` configuration

### 4. Comprehensive Test Suite (`comprehensive-test-suite.yml`)
- **Trigger:** Manual workflow dispatch
- **Purpose:** Full-featured testing with environment options
- **Features:**
  - Choose between mock and staging environments
  - Comprehensive test result summaries
  - Flexible test suite and browser selection

## 🔧 Configuration Files

### `playwright.config.ts`
- Main configuration for local development and real authentication
- Uses Intel SSO authentication via global setup
- Full browser support (chromium, firefox, webkit)

### `playwright.ci.config.ts`
- CI-optimized configuration
- Uses mock authentication when `MOCK_AUTH=true`
- Shorter timeouts and aggressive retry policies
- GitHub Actions reporter integration

### `tests/mock-server.js`
- Simple HTTP server for CI testing
- Provides mock responses for main application routes
- Eliminates dependency on real authentication in CI

## 🔐 Authentication Strategy

### Local Development
- Uses `tests/global-setup.ts` with real Intel SSO authentication
- Saves authentication state to `auth-state.json`
- All tests use shared authentication context

### CI Environment
- Uses mock authentication state for Intel SSO-free testing
- Mock server provides realistic UI structure for testing
- Environment variable `MOCK_AUTH=true` enables mock mode

## 📦 Available NPM Scripts

```bash
# Standard test commands
npm run test              # Run all tests locally
npm run test:headed       # Run tests with browser UI
npm run test:ui           # Run tests with Playwright UI
npm run test:debug        # Debug tests
npm run test:report       # Show HTML report

# CI-specific commands
npm run test:ci           # Run tests with CI configuration
npm run test:ci-mock      # Run tests with mock authentication
npm run mock-server       # Start mock server for testing

# Setup
npm run install:browsers  # Install Playwright browsers
```

## 🛠️ Environment Variables

- `CI=true` - Enables CI-specific optimizations
- `MOCK_AUTH=true` - Enables mock authentication mode
- `PORT` - Port for mock server (default: 3000)

## 📊 Test Reporting

### Artifacts Generated
1. **HTML Report** - Interactive test results with traces and screenshots
2. **JSON Results** - Machine-readable test results for parsing
3. **JUnit XML** - Test results in standard JUnit format for CI integration

### GitHub Integration
- Test results are commented on pull requests
- Failed tests block PR merging
- Detailed traces and screenshots available in artifacts
- GitHub Actions summary provides quick overview

## 🔧 Configuration for CI Workers

The CI configuration is optimized for GitHub Actions runners:
- **Workers:** Limited to 2 parallel workers in CI
- **Retries:** 2 retries on failure in CI environments
- **Timeouts:** Reduced timeouts for faster feedback
- **Browser Args:** Additional CI-friendly Chrome arguments

## 🚨 Security Considerations

1. **Authentication State**: Mock authentication used in CI to avoid exposing real credentials
2. **Environment Isolation**: Separate configurations for different environments
3. **Artifact Retention**: Limited retention periods for sensitive test data

## 📈 Future Enhancements

1. **Staging Environment**: Add support for real staging environment testing with proper authentication
2. **Visual Regression Testing**: Add screenshot comparison tests
3. **Performance Testing**: Include performance metrics in CI
4. **Multi-browser Matrix**: Expand CI testing to include Firefox and WebKit
5. **Slack/Teams Integration**: Add notifications for test failures

## 🔍 Troubleshooting

### Common Issues

1. **Authentication Failures in CI**
   - Solution: Ensure `MOCK_AUTH=true` is set for CI runs

2. **Test Timeouts**
   - CI has more aggressive timeouts
   - Check `playwright.ci.config.ts` timeout settings

3. **Browser Installation**
   - GitHub Actions automatically installs browsers
   - For self-hosted runners, ensure browsers are installed

4. **Artifact Upload Failures**
   - Ensure test output directories exist
   - Check artifact naming conflicts

### Debug Commands

```bash
# Local debugging with mock server
npm run mock-server &
npm run test:ci-mock

# Check CI configuration
npx playwright test --dry-run --config=playwright.ci.config.ts

# Generate test report locally
npx playwright show-report
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Documentation](https://playwright.dev/docs/ci)
