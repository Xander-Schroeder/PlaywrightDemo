## Phase 3: Testing Setup

1. **Look at the acceptance criteria**
    - The file 'Master_Test_Sheet_DIS_3.2.csv' contains all of our testing that we want to fulfill
    - For now just focus on the first sheet in this file and ignore the rest of them

2. **Run through acceptance criteria using MCP server**
    - Go back and compare the acceptance criteria for these tests to the site and see if you can execute these workflows
    - Execute all requirement workflows that you intend to make tests for (default to running all unless specified). Follow the steps of these as referred to in the acceptance criteria and make sure you understand how they work.
    - Make any notes or adjustments you need to to your references in 'indicators.md'

3. **MANDATORY: Map CSV Requirements to Tests**
    - **Reader - Creation**: Must test both successful creation with normal values AND failure with unallowed values
    - **Reader - Configuration**: Must access and verify all tabs: Reader Settings, Door I/O, Duration Settings, Event Settings, Schedules, Other
    - **Reader - Control Reader**: Must test all state changes: Disable->Enable->Unlock Momentary->Unlock and Hold->Lock, verify State/Status/Door Status changes and SMS events
    - **Reader - Badge Testing**: Must test allowed/denied badges, two badge settings, anti-pass back, keypad settings, ADA extended strike time
    - **Reader - Event Configuration**: Must add events with alarm actions including Subscriber Group, Action Message, and "Enable During Schedule" testing
    - **Reader - Alarms**: Must confirm alarm routing for Door Ajar and Door Closed events, verify SA/SAM consistency
    - **Reader - Deletion**: Must successfully delete readers and verify removal
    - **Panel - Creation**: Must test both successful creation with normal values AND failure with unallowed values (see "Panel - Creation" in Master_Test_Sheet_DIS_3.2.csv)
    - **Panel - Configuration**: Must access and verify all configuration tabs: General, Interactivity, Command Settings, Communication, and related tabs (Readers, Inputs, Outputs, Panel IO Links)
    - **Panel - Control Panel**: Must test panel status visibility, verify Reader/Input/Output tabs, execute Download and Controller commands (Download Data, Update Panel, Download Firmware, Reboot Panel, Start, Stop, Pause), and test refresh functionality
    - **Panel - Event Configuration**: Must add events to Event Configuration tab, add Alarm Actions (Subscriber Group, Action Message), add Global Activity Link Actions, and test "Enable During Schedule"
    - **Panel - Alarms**: Must confirm alarm routing for event types and Action Messages, verify SA/SAM consistency, test Panel Connected/Disconnected and manual panel/firmware download events
    - **Panel - Search and Filter**: Must verify search by name, filter by status, and confirm key panel information columns (Logical ID, Model Type, IP Address)
    - **Panel - Bulk Operations**: Must verify bulk operation buttons (Enable, Disable, Export), and test selection via checkboxes
    - **Panel - Live Updates**: Must test live updates toggle and verify state change/confirmation

    - **Infrastructure Manager - Navigation and Menu Access**: Must verify access to all Infrastructure Manager menu items and navigation to each major section (Panels, Readers, Inputs, Outputs, Reader Groups, Input Groups, Output Groups, Global Activity Links, Panel IO Links)
    - **Infrastructure Manager - Cross-functional Testing**: Must verify basic functionality across device types (Panels, Readers, Groups) and confirm interface elements
    - **System Manager - Schedule and Message Testing**: Must access and verify schedule-related functions (Holidays, Schedules, Schedule Spans) and message processing functions (Subscriber Groups, Action Messages)
    - **Access Manager - Access Area Testing**: Must access and verify Access Area management functions (Access Areas, Categories, Access Groups)
    - **Integration Testing - Cross-Manager Functionality**: Must verify system integration between managers (tab switching, consistent UI elements, navigation consistency)
    - **Performance and Reliability**: Must measure page load and navigation performance, test error handling (network delays, browser navigation), and confirm resilience

    > For each test case above, ensure the test steps and assertions directly map to the requirements and workflows described in the corresponding sections of 'Master_Test_Sheet_DIS_3.2.csv'. Use the acceptance criteria as the source of truth for what must be covered in each test file.

4. **Setup testing framework**
    - Install playwright and/or browsers as needed
    - Build playwright pages based on all your notes gathered in the 'indicators.md' file to allow for easier testing
        - Base Page Object: Create a `BasePage.ts` with:
            - Navigation methods (`goto()`)
            - Page load waiting strategies using `domcontentloaded`
            - Cross-browser compatibility with Firefox retry logic for connection issues
            - Common element selectors (navigation, disclaimers)
        - Any other ammount of specialized pages as needed