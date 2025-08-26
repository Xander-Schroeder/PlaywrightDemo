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