# Playwright Test Framework Setup

- I am running this on Windows 11. Run all command line commands as powershell-compatible commands.
- **Follow all instructions in order**. : prompts are all under the /prompt folder and are labeled as phase*.md follow them in numerical order and feel free to use any of the other files in this directory and the tools provided to you in them
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
