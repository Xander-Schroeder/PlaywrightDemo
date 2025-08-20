# SMS (Security Management System) Comprehensive Site Map

## Base URL
https://azsqsmsls300.amr.corp.intel.com:4012/sms-dashboard

## Main Navigation Tabs
1. **SMS Dashboard** - Primary dashboard
2. **Profile Manager** (`testId: PMTopNavBtn`) - User/profile management
3. **Access Manager** (`testId: AMTopNavBtn`) - Access control settings
4. **Infrastructure Manager** (`testId: IMTopNavBtn`) - Device management (Primary focus for testing)
5. **System Manager** (`testId: SMTopNavBtn`) - System configuration and settings
6. **Verification Manager** (`testId: VMTopNavBtn`) - Verification workflows

## Header Elements
- **Intel Logo** and **SMS Heading**
- **User Welcome**: "Welcome, Schroeder, XanderX" (clickable link to profile)
- **Logout Button**
- **QA Banner Alert**: "QA - This is the Best Enterprise Banner - QA"

## Footer Information
- **Location**: CH-Security Lab
- **Application Version**: 4.4.544.37975
- **Enterprise Link**: "View on Enterprise"

---

# Infrastructure Manager - PRIMARY TESTING FOCUS

## Menu Structure (`testId: IMTopNavBtn`)

### Field Devices
- **Panels** (`testId: IM:PANEL-DETAILS`)
  - Search interface: `/infrastructure/panels/search`
  - Add Panel: `/infrastructure/panels/details/create`
  - Actions: Enable, Disable, Export Workspace, Enable Live Updates
  - Panel Types: CICP1800, CICP1300, HID VertXEVO V1000, HID VertX V100/V300, CICP1800T
  - Manufacturers: Continental Access, HID, Mercury, Aero, Assa, etc.

- **Readers** (`testId: IM:READER-DETAILS`)
- **Inputs** (`testId: IM:INPUT-DETAILS`)
- **Outputs** (`testId: IM:OUTPUT-DETAILS`)
- **Cameras**
- **Robots**

### Device Groups
- **Reader Groups**
- **Input Groups**
- **Output Groups**

### Device Programs
- **Global Activity Links (GAL)**
- **Panel IO Links**
- **Elevator Control**

### Construction and Service
- **Checklist Manager**
- **Checklist Tests**
- **Checklist Approvals**
- **Checklist Owners**
- **Checklist Project Dashboard**

### Bulk Update
- **Bulk Update Workspaces**

## Panel Search Interface Details

### Search Elements
- **Search Button**: `[data-testid="searchBtn"]`
- **Name or Database ID** textbox
- **More Search Options** button (expandable)
- **Reset** button

### Filter Options
- **Status**: All, Enabled, Disabled, Service, Construction, Retired
- **Model Type**: Various panel models (CICP1800, CICP1300, HID VertXEVO V1000, etc.)
- **Manufacturer**: Aero, Assa, Continental Access, Eagle, HID, LoRaWAN, Mercury, RFID
- **Panel Type**: All, Display only control panels, Display only sub panels

### Panel Table Columns
- Logical ID (sortable)
- Name (sortable, clickable links to panel details)
- Panel State (NORMAL/UNKNOWN with status indicators)
- Controller State (CONNECTED/UNKNOWN with status indicators)
- Enabled (Yes/No, sortable)
- Model Type (sortable)
- Tags (sortable)
- IP Address (sortable)
- Port (sortable)
- DIS (Device Integration Server, sortable)
- Manufacturer Name (sortable)
- Location (sortable)
- Database ID (sortable)
- Serial Number (sortable)
- Host Name (sortable)

### Panel Detail Navigation
- URL pattern: `/infrastructure/panels/details/{panelId}`
- Sub-panels: `/infrastructure/panels/details/{panelId}/{parentPanelId}`

### Test Data Available
- Multiple CICP1800 panels (Continental Access)
- HID VertXEVO V1000 panels
- HID VertX V100/V300 panels
- CICP1300 panels
- Various states: Enabled/Disabled
- DIS servers: HOSDIS200_DIS
- IP ranges: DD_172.19.x.x, DD_172.31.x.x

---

# System Manager - SUPPORTING TESTING FEATURES

## Menu Structure (`testId: SMTopNavBtn`)

### Service Download & Health
- **DIS Deployment**
- **Service Health Check**
- **Worldwide Service Status**

### Enterprise
- **Host Devices**
- **Badge Office**
- **Locations**
- **Facilities**
- **Tag Management**

### Permissions
- **User**
- **Roles**
- **Role Permissions Grid**
- **Role Diagnostics**

### System Configurations
- **Service Edit**
- **Enterprise Configuration**
- **Carrier Print Formats**
- **Card Design**
- **User Diagnostics**

### Schedule (IMPORTANT FOR TESTING)
- **Holidays**
- **Schedules**
- **Schedule Spans**

### Message Processing (IMPORTANT FOR TESTING)
- **Subscriber Groups**
- **Action Messages**

### Integrations
- **Person Export Feed Details**
- **Person Export Queue**
- **Device Service Feed Details**
- **Device Service Queue**
- **Eagle Comm Feed Details**

---

# Access Manager - SUPPORTING TESTING FEATURES

## Menu Structure (`testId: AMTopNavBtn`)

### Access (IMPORTANT FOR TESTING)
- **Categories** (`testId: AM:CATEGORY-DETAILS-Btn`)
- **Default Access**
- **Access Group**
- **Access Area**

---

# Profile Manager - SUPPORTING FEATURES

## Menu Structure (`testId: PMTopNavBtn`)

### Profiles
- **Profile** (`testId: PM:PROFILE-DETAILS-Btn`)
- **Regional Intake Queue**
- **Specialty Carrier**

### Badges
- **Bulk Print Queue**
- **Intake Queue**
- **Intake Queue Log**

---

# Verification Manager - SUPPORTING FEATURES

## Menu Structure (`testId: VMTopNavBtn`)

### Verification
- **Verify**
- **Kiosk Queue**
- **Return Temp Carrier**
- **Badge Reconciliation**
- **Guest Queue**
- **Alarm Monitor**

---

# Key Testing Focus Areas (From Acceptance Criteria)

## Panel Operations (Infrastructure Manager)
1. **Panel Creation**: Add Panel functionality, normal/unallowed values
2. **Panel Configuration**: General, Interactivity, Command Settings, Communication tabs
3. **Panel Control**: Status monitoring, Download Commands, Controller Commands
4. **Panel Event Configuration**: Event types, Alarm Actions, Global Activity Links
5. **Panel Alarms**: Event routing, Action Messages, SA/SAM matching
6. **Panel Deletion**: I/O disconnect, sub-panel disconnect

## Reader Operations (Infrastructure Manager)
1. **Reader Creation**: Add functionality, validation
2. **Reader Configuration**: Settings, Door I/O, Duration, Event, Schedules
3. **Reader Control**: State management, Status monitoring, Door Status
4. **Reader Badge Testing**: Badge swiping, two badge settings, anti-pass back, keypad
5. **Reader Event Configuration**: Events, Alarm Actions, Global Activity Links
6. **Reader Alarms**: Door Ajar, Door Closed events
7. **Reader Deletion**: Cleanup operations

## Device Groups (Infrastructure Manager)
1. **Reader Groups**: Creation, Configuration, Control, Alarms, Deletion
2. **Input Groups**: Creation, Configuration, Control, Alarms, Deletion
3. **Output Groups**: Creation, Configuration, Control, Alarms, Deletion

## Input/Output Operations (Infrastructure Manager)
1. **Input/Output Creation**: Add functionality, validation
2. **Input/Output Configuration**: Settings management
3. **Input/Output Control**: State management, monitoring
4. **Input/Output Event Configuration**: Event setup
5. **Input/Output Alarms**: Event routing
6. **Input/Output Deletion**: Cleanup

## Device Programs (Infrastructure Manager)
1. **Global Activity Links (GAL)**: Creation, Configuration, Control, Cross Panel/DIS Testing
2. **Panel IO Links**: Creation, Configuration, Control

## System Configuration (System Manager)
1. **Subscriber Groups**: Creation, Configuration, Alarms
2. **Action Messages**: Creation, Configuration, Alarms
3. **Schedules**: Creation, Configuration, Alarms
4. **Schedule Spans**: Creation, Configuration
5. **Holiday Schedules**: Creation, Configuration, Event Configuration

## Access Management (Access Manager)
1. **Access Areas**: Managed and Unmanaged creation, configuration
2. **Access Groups**: Management functionality

---

# Key UI Selectors and Test IDs

## Navigation
- `[data-testid="IMTopNavBtn"]` - Infrastructure Manager tab
- `[data-testid="SMTopNavBtn"]` - System Manager tab
- `[data-testid="AMTopNavBtn"]` - Access Manager tab
- `[data-testid="PMTopNavBtn"]` - Profile Manager tab
- `[data-testid="VMTopNavBtn"]` - Verification Manager tab

## Infrastructure Manager
- `[data-testid="IM:PANEL-DETAILS"]` - Panels menu item
- `[data-testid="searchBtn"]` - Search button in panels interface
- Text "Add Panel" - Link to create new panel
- "Enable" button - Bulk enable panels
- "Disable" button - Bulk disable panels
- "Export Workspace" button - Export functionality

## System Manager
- `[data-testid="SM:SUBSCRIBER-GROUPS"]` - Subscriber Groups menu item
- `[data-testid="SM:ACTION-MESSAGES"]` - Action Messages menu item
- `[data-testid="SM:SCHEDULES"]` - Schedules menu item
- `[data-testid="SM:HOLIDAYS"]` - Holidays menu item

## Access Manager
- `[data-testid="AM:CATEGORY-DETAILS-Btn"]` - Categories menu item
- `[data-testid="AM:ACCESS-AREA"]` - Access Area menu item

---

# CRITICAL TESTING CORRECTIONS BASED ON MCP EXPLORATION

## System Manager - ACTUAL Structure

**Schedule Section:**
- **Holidays** (testId: `SM:HOLIDAY-DETAILS`) → `/systems/holiday/search`
  - Page Structure: heading "Holidays", link "Add Holiday", button "Search"
  - DO NOT use complex selectors like `'text=Holiday, button:has-text("Add"), button:has-text("Search")'`
  - USE: `page.locator('h1')` to find "Holidays", `page.getByRole('link', { name: 'Add Holiday' })`, `page.getByRole('button', { name: 'Search' })`

**Message Processing Section:**
- **Subscriber Groups** (testId: `SM:SUBSCRIBER-GROUPS`)  
  - Page Structure: Similar pattern with heading, add link, search button
  - DO NOT use complex combined text selectors

## Access Manager - ACTUAL Structure

**Access Section:**
- **Access Area** (testId: `AM:AREA-DETAILS-Btn`) → `/access-manager/areas/search`
  - Page Structure: heading "Access Areas", link "Add Access Area", button "Search" 
  - DO NOT use `'text=Access, text=Area, button:has-text("Add"), button:has-text("Search")'`
  - USE: `page.locator('h1')` to find "Access Areas", individual element selectors

## Infrastructure Manager - ACTUAL Structure

**Panels Page:** 
- Page Structure: heading "Panels", link "Add Panel", button "Search"
- DO NOT use `'text=Add Panel, text=Search'` 
- USE: Individual element selectors like `page.getByRole('link', { name: 'Add Panel' })`

## User Element Issues

**Welcome User:**
- Element structure: `<text>Welcome,</text><link>Schroeder, XanderX</link>`
- DO NOT use `page.locator('text=Welcome,').locator('+ a')` with textContent() directly
- USE: More robust selectors or handle timeout exceptions
