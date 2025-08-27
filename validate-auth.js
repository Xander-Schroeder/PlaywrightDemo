#!/usr/bin/env node

/**
 * Test Authentication Validation Script
 * 
 * This script validates that the authentication setup is working correctly
 * by checking the auth-state.json file and testing basic connectivity
 */

const fs = require('fs');
const path = require('path');

function validateAuthState() {
  console.log('🔍 Validating Authentication Setup...\n');
  
  // Check if auth-state.json exists
  const authStatePath = path.join(__dirname, 'auth-state.json');
  if (!fs.existsSync(authStatePath)) {
    console.error('❌ auth-state.json not found!');
    console.log('Please run authentication setup first.');
    return false;
  }
  
  try {
    // Parse and validate auth state
    const authState = JSON.parse(fs.readFileSync(authStatePath, 'utf8'));
    
    console.log('✅ auth-state.json found and valid');
    
    // Check structure
    if (!authState.origins || !Array.isArray(authState.origins)) {
      console.error('❌ Invalid auth state structure - missing origins array');
      return false;
    }
    
    console.log(`📊 Found ${authState.origins.length} origin(s) in auth state`);
    
    // Check for SMS-related origins
    const smsOrigins = authState.origins.filter(origin => 
      origin.origin && origin.origin.includes('amr.corp.intel.com')
    );
    
    if (smsOrigins.length === 0) {
      console.warn('⚠️  No SMS-related origins found in auth state');
      console.log('Current origins:', authState.origins.map(o => o.origin));
    } else {
      console.log(`✅ Found ${smsOrigins.length} SMS origin(s):`);
      smsOrigins.forEach(origin => {
        console.log(`   - ${origin.origin}`);
        if (origin.localStorage) {
          console.log(`     Local storage items: ${origin.localStorage.length}`);
        }
      });
    }
    
    // Check for authentication tokens
    let hasAuthTokens = false;
    authState.origins.forEach(origin => {
      if (origin.localStorage) {
        const authItems = origin.localStorage.filter(item => 
          item.name.includes('msal') || 
          item.name.includes('SMS') ||
          item.name.includes('TOKEN') ||
          item.name.includes('login.windows.net')
        );
        if (authItems.length > 0) {
          hasAuthTokens = true;
          console.log(`✅ Found ${authItems.length} authentication-related items in ${origin.origin}`);
        }
      }
    });
    
    if (!hasAuthTokens) {
      console.warn('⚠️  No authentication tokens found in auth state');
      console.log('This may indicate the authentication was not properly captured');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Error parsing auth-state.json:', error.message);
    return false;
  }
}

function checkEnvironmentVariables() {
  console.log('\n🌍 Checking Environment Variables...\n');
  
  const requiredEnvVars = [
    { name: 'TEST_BASE_URL', default: 'https://azsqsmsls300.amr.corp.intel.com:4012' },
    { name: 'QA_BASE_URL', default: 'https://AZVQSMSWEB360.amr.corp.intel.com:4012' }
  ];
  
  requiredEnvVars.forEach(envVar => {
    const value = process.env[envVar.name];
    if (value) {
      console.log(`✅ ${envVar.name}: ${value}`);
    } else {
      console.log(`ℹ️  ${envVar.name}: Not set (will use default: ${envVar.default})`);
    }
  });
  
  const optionalEnvVars = ['AUTH_STATE_JSON'];
  optionalEnvVars.forEach(envVar => {
    const value = process.env[envVar];
    if (value) {
      console.log(`✅ ${envVar}: Set (${value.length} characters)`);
    } else {
      console.log(`ℹ️  ${envVar}: Not set (will use local auth-state.json)`);
    }
  });
}

function generateSecretsTemplate() {
  console.log('\n📋 GitHub Secrets Template...\n');
  
  const authStatePath = path.join(__dirname, 'auth-state.json');
  if (fs.existsSync(authStatePath)) {
    const authState = fs.readFileSync(authStatePath, 'utf8');
    
    console.log('Copy the following values to your GitHub repository secrets:\n');
    
    console.log('Secret Name: AUTH_STATE_JSON');
    console.log('Secret Value:');
    console.log('```');
    console.log(authState);
    console.log('```\n');
    
    console.log('Secret Name: TEST_BASE_URL');
    console.log('Secret Value: https://azsqsmsls300.amr.corp.intel.com:4012\n');
    
    console.log('Secret Name: QA_BASE_URL'); 
    console.log('Secret Value: https://AZVQSMSWEB360.amr.corp.intel.com:4012\n');
    
    console.log('📖 For detailed setup instructions, see: .github/SECRETS_SETUP.md');
  }
}

function main() {
  console.log('🎭 Playwright SMS Authentication Validator\n');
  
  const isValid = validateAuthState();
  checkEnvironmentVariables();
  
  if (isValid) {
    generateSecretsTemplate();
    console.log('\n🎉 Authentication setup appears to be valid!');
    console.log('\n📝 Next steps:');
    console.log('1. Copy the GitHub secrets values shown above');
    console.log('2. Add them to your GitHub repository secrets');
    console.log('3. Run the CI/CD workflows to test');
  } else {
    console.log('\n❌ Authentication setup needs attention');
    console.log('\n📝 Next steps:');
    console.log('1. Run: npm run test:local to set up authentication');
    console.log('2. Or manually create/update auth-state.json');
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateAuthState, checkEnvironmentVariables };
