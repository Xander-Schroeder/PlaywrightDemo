# GitHub Secrets Configuration for SMS Testing

This document outlines the GitHub secrets required for the automated CI/CD testing of the Security Management System (SMS).

## Required Secrets

### Environment URLs

#### `TEST_BASE_URL`
- **Purpose**: Base URL for the test environment
- **Value**: `https://azsqsmsls300.amr.corp.intel.com:4012`
- **Description**: The test environment URL where automated tests will run

#### `QA_BASE_URL`
- **Purpose**: Base URL for the QA environment
- **Value**: `https://AZVQSMSWEB360.amr.corp.intel.com:4012`
- **Description**: The QA environment URL for QA-specific test runs

### Authentication

#### `AUTH_STATE_JSON`
- **Purpose**: Pre-authenticated browser state for bypassing interactive login
- **Value**: JSON string containing authentication tokens and localStorage data
- **Description**: Allows tests to run in headless CI environment without interactive Microsoft OAuth2 login

**Current Value Template:**
```json
{
  "cookies": [],
  "origins": [
    {
      "origin": "https://azsqsmsls300.amr.corp.intel.com:4012",
      "localStorage": [
        {
          "name": "80a4dad6-199b-4a5a-bf78-0c8c362d1423.46c98d88-e344-4ed4-8496-4ed7712e255d-login.windows.net-46c98d88-e344-4ed4-8496-4ed7712e255d",
          "value": "{\"authorityType\":\"MSSTS\",\"clientInfo\":\"...\",\"homeAccountId\":\"80a4dad6-199b-4a5a-bf78-0c8c362d1423.46c98d88-e344-4ed4-8496-4ed7712e255d\",\"environment\":\"login.windows.net\",\"realm\":\"46c98d88-e344-4ed4-8496-4ed7712e255d\",\"idTokenClaims\":{...},\"localAccountId\":\"80a4dad6-199b-4a5a-bf78-0c8c362d1423\",\"username\":\"xanderx.schroeder@intel.com\",\"name\":\"Schroeder, XanderX\"}"
        },
        {
          "name": "msal.cf109acc-1d90-4123-9089-37a344ea58f8.active-account",
          "value": "80a4dad6-199b-4a5a-bf78-0c8c362d1423"
        },
        {
          "name": "msal.account.keys",
          "value": "[\"80a4dad6-199b-4a5a-bf78-0c8c362d1423.46c98d88-e344-4ed4-8496-4ed7712e255d-login.windows.net-46c98d88-e344-4ed4-8496-4ed7712e255d\"]"
        },
        {
          "name": "SMS_UI_KEY",
          "value": "..."
        },
        {
          "name": "page-has-been-force-refreshed",
          "value": "false"
        },
        {
          "name": "appVersion",
          "value": "4.4.569.20686"
        }
      ]
    }
  ]
}
```

### Optional Secrets (for fallback authentication)

#### `TEST_USERNAME`
- **Purpose**: Username for fallback authentication if auth state expires
- **Value**: `xanderx.schroeder@intel.com`
- **Description**: Intel email address for Microsoft OAuth2 authentication

#### `TEST_PASSWORD`
- **Purpose**: Password for fallback authentication if auth state expires
- **Value**: `[USER PROVIDED PASSWORD]`
- **Description**: Password for the Intel account (if automation supports it)

## Setting Up GitHub Secrets

1. Navigate to your GitHub repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the name and value specified above

## Authentication Flow

The authentication system works in the following priority order:

1. **GitHub Secrets (Preferred)**: Uses `AUTH_STATE_JSON` to load pre-authenticated state
2. **Local Auth File**: Uses existing `auth-state.json` if valid
3. **Interactive Login**: Falls back to browser-based Microsoft OAuth2 (development only)

## Token Refresh

Microsoft OAuth2 tokens typically expire after 1-24 hours. The authentication state should be refreshed periodically:

- **Automatic**: The system includes refresh tokens that may extend the session
- **Manual**: Re-run the authentication flow locally and update the `AUTH_STATE_JSON` secret

## Security Notes

- Authentication tokens contain sensitive information and should be treated as passwords
- Tokens are scoped to specific Intel applications and environments
- Regular rotation of authentication secrets is recommended
- Never commit authentication tokens to version control

## Troubleshooting

### Common Issues

1. **Authentication Expired**: Update `AUTH_STATE_JSON` with fresh tokens
2. **Wrong Environment**: Check `TEST_BASE_URL` and `QA_BASE_URL` values
3. **Permission Denied**: Ensure the account has proper SMS permissions

### Verification

To verify secrets are working:
1. Trigger a GitHub Actions workflow
2. Check the logs for authentication success messages
3. Verify tests can access protected SMS endpoints

## Workflow Integration

The secrets are automatically used by:
- `.github/workflows/ci-tests-mock-auth.yml`
- `.github/workflows/comprehensive-test-suite.yml`  
- `.github/workflows/manual-test-run.yml`
- `.github/workflows/pr-tests.yml`

Each workflow uses environment variables that map to these secrets.
