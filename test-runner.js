#!/usr/bin/env node

/**
 * Test Runner Script
 * 
 * This script provides alternative ways to run tests when npm/yarn installation fails
 */

const fs = require('fs');
const path = require('path');

console.log('🎭 SMS Dashboard Test Framework');
console.log('================================');

// Check if Playwright is available
function checkPlaywrightInstallation() {
  try {
    require('@playwright/test');
    console.log('✅ Playwright is available');
    return true;
  } catch (error) {
    console.log('❌ Playwright not found');
    return false;
  }
}

// Check test files
function checkTestFiles() {
  const testDir = path.join(__dirname, 'tests');
  const testFiles = [];
  
  function findTestFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findTestFiles(filePath);
      } else if (file.endsWith('.spec.ts') || file.endsWith('.test.ts')) {
        testFiles.push(filePath);
      }
    });
  }
  
  try {
    findTestFiles(testDir);
    console.log(`📁 Found ${testFiles.length} test files:`);
    testFiles.forEach(file => {
      console.log(`   - ${path.relative(__dirname, file)}`);
    });
    return testFiles;
  } catch (error) {
    console.log('❌ Error checking test files:', error.message);
    return [];
  }
}

// Check page objects
function checkPageObjects() {
  const pageObjectDir = path.join(__dirname, 'tests', 'page-objects');
  try {
    const files = fs.readdirSync(pageObjectDir);
    const pageObjects = files.filter(file => file.endsWith('.ts'));
    console.log(`🏗️  Found ${pageObjects.length} page objects:`);
    pageObjects.forEach(file => {
      console.log(`   - ${file}`);
    });
    return pageObjects;
  } catch (error) {
    console.log('❌ Error checking page objects:', error.message);
    return [];
  }
}

// Check configuration
function checkConfiguration() {
  const configFile = path.join(__dirname, 'playwright.config.ts');
  try {
    if (fs.existsSync(configFile)) {
      console.log('✅ Playwright configuration found');
      return true;
    } else {
      console.log('❌ Playwright configuration not found');
      return false;
    }
  } catch (error) {
    console.log('❌ Error checking configuration:', error.message);
    return false;
  }
}

// Installation suggestions
function printInstallationSuggestions() {
  console.log('\n🔧 Installation Suggestions:');
  console.log('============================');
  console.log('1. Try using a different package manager:');
  console.log('   - yarn install');
  console.log('   - pnpm install');
  console.log('');
  console.log('2. Configure npm proxy settings:');
  console.log('   - npm config set proxy http://proxy.company.com:port');
  console.log('   - npm config set https-proxy http://proxy.company.com:port');
  console.log('');
  console.log('3. Install Playwright globally:');
  console.log('   - npm install -g @playwright/test');
  console.log('   - npx playwright install');
  console.log('');
  console.log('4. Use offline installation:');
  console.log('   - Download packages manually');
  console.log('   - Use npm pack and npm install <tarball>');
  console.log('');
  console.log('5. Alternative: Use Docker:');
  console.log('   - docker run -it --rm mcr.microsoft.com/playwright:latest');
}

// Manual test validation
function validateTestStructure() {
  console.log('\n🔍 Validating Test Structure:');
  console.log('=============================');
  
  const errors = [];
  
  // Check critical files
  const criticalFiles = [
    'tests/page-objects/BasePage.ts',
    'tests/page-objects/ProfileManagerPage.ts',
    'tests/page-objects/AccessManagerPage.ts',
    'tests/utils/TestUtils.ts',
    'tests/e2e/sms-dashboard.spec.ts',
    'playwright.config.ts',
    'global-setup.ts',
    'global-teardown.ts'
  ];
  
  criticalFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - MISSING`);
      errors.push(file);
    }
  });
  
  // Check directory structure
  const directories = [
    'tests/e2e',
    'tests/page-objects', 
    'tests/utils',
    'tests/test-data',
    'tests/test-data/screenshots'
  ];
  
  directories.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`📁 ${dir}/`);
    } else {
      console.log(`❌ ${dir}/ - MISSING`);
      errors.push(dir);
    }
  });
  
  if (errors.length === 0) {
    console.log('\n✅ Test structure validation passed!');
  } else {
    console.log(`\n❌ Test structure validation failed: ${errors.length} issues found`);
  }
  
  return errors.length === 0;
}

// Main function
function main() {
  console.log('\n🚀 Running Test Framework Validation...\n');
  
  const playwrightAvailable = checkPlaywrightInstallation();
  const testFiles = checkTestFiles();
  const pageObjects = checkPageObjects();
  const configExists = checkConfiguration();
  const structureValid = validateTestStructure();
  
  console.log('\n📊 Summary:');
  console.log('===========');
  console.log(`Playwright Available: ${playwrightAvailable ? '✅ Yes' : '❌ No'}`);
  console.log(`Test Files Found: ${testFiles.length}`);
  console.log(`Page Objects Found: ${pageObjects.length}`);
  console.log(`Configuration Valid: ${configExists ? '✅ Yes' : '❌ No'}`);
  console.log(`Structure Valid: ${structureValid ? '✅ Yes' : '❌ No'}`);
  
  if (!playwrightAvailable) {
    printInstallationSuggestions();
  } else {
    console.log('\n🎉 Ready to run tests!');
    console.log('Commands:');
    console.log('- npx playwright test');
    console.log('- npx playwright test --headed');
    console.log('- npx playwright test --debug');
    console.log('- npx playwright show-report');
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  checkPlaywrightInstallation,
  checkTestFiles,
  checkPageObjects,
  checkConfiguration,
  validateTestStructure
};
