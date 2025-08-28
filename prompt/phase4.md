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

    **CRITICAL: Implement ALL CSV Panel Requirements**
    - **Panel - Creation**: "Create a new panel with normal values. Save and confirm data saved. Test for failure with unallowed values."
    - **Panel - Configuration**: "Edit or Adjust: General, Interactivity, Command Settings, Communication, Readers, Inputs, Outputs, Panel IO Links."
    - **Panel - Control Panel**: "Test panel status visibility, Reader/Input/Output tabs, execute Download and Controller commands (Download Data, Update Panel, Download Firmware, Reboot Panel, Start, Stop, Pause), and test refresh functionality."
    - **Panel - Event Configuration**: "Add events to Event Configuration tab, add Alarm Actions (Subscriber Group, Action Message), add Global Activity Link Actions, and test 'Enable During Schedule'."
    - **Panel - Alarms**: "Confirm alarm routing for event types and Action Messages, verify SA/SAM consistency, test Panel Connected/Disconnected and manual panel/firmware download events."
    - **Panel - Search and Filter**: "Verify search by name, filter by status, and confirm key panel information columns (Logical ID, Model Type, IP Address)."
    - **Panel - Bulk Operations**: "Verify bulk operation buttons (Enable, Disable, Export), and test selection via checkboxes."
    - **Panel - Live Updates**: "Test live updates toggle and verify state change/confirmation."

   **Implement Infrastructure Manager and System Manager Tests**
    - **Infrastructure Manager - Navigation and Menu Access**: "Verify access to all Infrastructure Manager menu items and navigation to each major section (Panels, Readers, Inputs, Outputs, Reader Groups, Input Groups, Output Groups, Global Activity Links, Panel IO Links)."
    - **Infrastructure Manager - Cross-functional Testing**: "Verify basic functionality across device types (Panels, Readers, Groups) and confirm interface elements."
    - **System Manager - Schedule and Message Testing**: "Access and verify schedule-related functions (Holidays, Schedules, Schedule Spans) and message processing functions (Subscriber Groups, Action Messages)."
    - **Access Manager - Access Area Testing**: "Access and verify Access Area management functions (Access Areas, Categories, Access Groups)."
    - **Integration Testing - Cross-Manager Functionality**: "Verify system integration between managers (tab switching, consistent UI elements, navigation consistency)."
    - **Performance and Reliability**: "Measure page load and navigation performance, test error handling (network delays, browser navigation), and confirm resilience."

3. **MANDATORY: Fix Navigation Issues First**
    - Before implementing CSV requirements, ensure basic navigation to readers page works
    - Test authentication persistence and page load timing
    - Verify all testIds and selectors work in the current browser state
    - Use MCP browser to validate navigation path to readers functionality