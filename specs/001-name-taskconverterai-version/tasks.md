# Tasks: TaskConverterAI Service Gateway - Minimal MVP

**Input**: Design documents from `/specs/001-name-taskconverterai-version/`
**Prerequisites**: plan.md (✓), spec.md (✓), research.md (✓), data-model.md (✓), contracts/ (✓)

**Tests**: No test tasks included per user request - manual testing only
**MVP Scope**: User Story 1 (P1) only - View Service Directory with single test service

**Organization**: Tasks focused on minimal viable product with one service card and local development capability.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1 = User Story 1)
- Include exact file paths in descriptions

## Path Conventions
Static web application structure - files directly servable by local HTTP server.

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create basic project structure and development environment

- [x] T001 [P] [Setup] Create root project directory `taskconverterai/` with subdirectories: `assets/`, `css/`, `js/`, `services/`, `services/openapi/`
- [x] T002 [P] [Setup] Set up local development server capability (Python http.server or Node.js http-server documentation)
- [x] T003 [P] [Setup] Create `.gitignore` file for static web project (exclude OS files, editor files)

---

## Phase 2: Core Infrastructure (MVP Foundation)

**Purpose**: Essential files and structure for minimal working application

**⚠️ CRITICAL**: Must complete before User Story implementation

- [x] T004 [US1] Create `index.html` with basic HTML5 structure, header, main content area, and service cards container
- [x] T005 [US1] Create `css/styles.css` with base styling for layout, header, service cards grid, and responsive design
- [x] T006 [US1] Create `js/main.js` with service configuration object containing single test service definition

---

## Phase 3: User Story 1 - View Service Directory (Priority P1)

**Goal**: Display single test service card on main page with basic styling and local server capability

**Independent Test**: Open `index.html` in browser via local server, verify test service card displays with correct information

**MVP Implementation**: One service card only for demonstration

- [x] T007 [US1] Implement service card HTML template generation in `js/main.js` using template literals
- [x] T008 [US1] Implement DOM manipulation to render service cards from configuration data in `js/main.js`
- [x] T009 [US1] Style service cards with hover effects, typography, and grid layout in `css/styles.css`
- [x] T010 [P] [US1] Add application header with title "TaskConverterAI" and basic styling in `index.html` and `css/styles.css`
- [x] T011 [P] [US1] Implement loading state display and error handling for service configuration in `js/main.js`

---

## Phase 4: Test Service Documentation Setup

**Goal**: Create functional OpenAPI documentation page for the test service

**Implementation**: Single test service with working Swagger UI integration

- [x] T012 [US1] Create `services/test-service.html` with Swagger UI integration using CDN links
- [x] T013 [US1] Create sample OpenAPI specification `services/openapi/test-service-openapi.yml` with basic API endpoints
- [x] T014 [US1] Implement navigation from service card to documentation page in `js/main.js`
- [x] T015 [P] [US1] Add back navigation link from service page to main page in `services/test-service.html`
- [x] T016 [P] [US1] Style service documentation page header and navigation in `services/test-service.html`

---

## Phase 5: Local Development & Polish

**Goal**: Ensure application runs smoothly locally and has basic error handling

- [x] T017 [Setup] Document local server setup commands in README.md or quickstart documentation
- [x] T018 [US1] Test complete user flow: main page → service card → documentation → back navigation
- [x] T019 [P] [US1] Add basic error handling for missing OpenAPI files in service pages
- [x] T020 [P] [US1] Verify responsive behavior on mobile/desktop (basic responsive design)

---

## Implementation Strategy

### MVP Definition
- **Single service card** displaying test service information
- **Functional navigation** from card to OpenAPI documentation
- **Local development server** capability for testing
- **No testing infrastructure** - manual verification only
- **Static file delivery** - no build process required

### Delivery Checkpoints
1. **After Phase 2**: Basic HTML structure loads in browser
2. **After Phase 3**: Service card displays correctly on main page  
3. **After Phase 4**: Navigation to Swagger UI documentation works
4. **After Phase 5**: Complete MVP ready for local use

### Parallel Execution Opportunities

**Phase 1 (All parallel)**:
- T001, T002, T003 can be done simultaneously

**Phase 2**: 
- T004, T005, T006 are sequential (HTML → CSS relies on HTML structure → JS relies on DOM elements)

**Phase 3**:
- T010, T011 can be done in parallel with T007-T009 (different concerns)

**Phase 4**:
- T015, T016 can be done in parallel with T012-T014 (styling vs functionality)

**Phase 5**:
- T017, T019, T020 can be done in parallel with T018 (documentation and error handling vs testing)

### File Dependencies
- `index.html` → required for `css/styles.css` selectors
- `css/styles.css` → required for proper `js/main.js` DOM manipulation  
- `js/main.js` → required for service card functionality
- `services/test-service.html` → independent of main page files
- `services/openapi/test-service-openapi.yml` → required for Swagger UI in service page

## Local Development Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x OR Node.js (for local HTTP server)

### Quick Start Commands
```bash
# Option 1: Node.js  
npx http-server taskconverterai
# Visit http://localhost:8080
```

### Validation Criteria
- [ ] Main page loads without errors
- [ ] Test service card displays with correct information
- [ ] Service card click navigates to documentation page
- [ ] Swagger UI loads and displays test API specification
- [ ] Back navigation returns to main page
- [ ] Application works in mobile and desktop browsers

**Total Tasks**: 20 tasks focused on minimal viable product
**Estimated Implementation**: 4-6 hours for basic working MVP
**MVP Scope**: Single service demonstration with full navigation flow
