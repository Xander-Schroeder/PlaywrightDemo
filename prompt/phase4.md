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