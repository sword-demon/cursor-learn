# Tasks: Cursor Tutorial Website

**Input**: Design documents from `/specs/001-cursor-tutorial/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are optional for this feature - not explicitly requested in specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project structure

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize React project with Vite and install all dependencies

- [x] T001 Create Vite React TypeScript project in root directory using `npm create vite@latest . -- --template react-ts`
- [x] T002 Install core dependencies: `npm install react-router-dom framer-motion @monaco-editor/react`
- [x] T003 [P] Install dev dependencies: `npm install -D tailwindcss postcss autoprefixer @types/node vitest @testing-library/react @testing-library/jest-dom jsdom`
- [x] T004 [P] Initialize Tailwind CSS configuration: `npx tailwindcss init -p`
- [x] T005 Configure Tailwind with China Red theme in `tailwind.config.ts`
- [x] T006 Configure TypeScript path aliases in `tsconfig.json` for `@/*`, `@components/*`, `@hooks/*`, `@types/*`, `@data/*`, `@utils/*`, `@services/*`
- [x] T007 Configure Vite path aliases in `vite.config.ts` matching tsconfig paths
- [x] T008 Set up base CSS styles in `src/index.css` with Tailwind directives and custom components
- [x] T009 Create project folder structure: `src/{components/{common,layout,tutorial,simulator},contexts,hooks,pages/{Home,Installation,Commands,RulesBuilder,ProjectTutorial},services,types,data/{tutorials,scenarios},utils}`
- [x] T010 Create `.env.example` with VITE_APP_NAME and VITE_APP_VERSION variables

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T011 Create TypeScript type definitions in `src/types/index.ts` exporting all entity types (Tutorial, TutorialStep, SimulationScenario, UserProgress, TutorialProgress, CursorRuleTemplate, etc.)
- [x] T012 [P] Create `src/types/tutorial.ts` with Tutorial, TutorialStep, QuizQuestion interfaces per data-model.md
- [x] T013 [P] Create `src/types/simulation.ts` with SimulationScenario, SimulationStep, SimulatedResponse interfaces per data-model.md
- [x] T014 [P] Create `src/types/user.ts` with UserProgress, TutorialProgress, SimulationResult, UserPreferences interfaces per data-model.md
- [x] T015 Create `src/utils/constants.ts` with THEME colors (primary #C41E3A, accent #FFD700) and STORAGE_KEYS constants
- [x] T016 Create `src/utils/helpers.ts` with utility functions (generateId, formatTime, debounce)
- [x] T017 Create `src/utils/os-detection.ts` with detectOS() function returning 'windows' | 'macos' | 'linux'
- [x] T018 Create `src/hooks/useLocalStorage.ts` hook for localStorage with serialization and error handling
- [x] T019 Create `src/services/progress-service.ts` for UserProgress CRUD operations in localStorage
- [x] T020 Create `src/services/tutorial-service.ts` for fetching tutorial data and static content
- [x] T021 Create `src/contexts/ProgressContext.tsx` with Provider and useProgress() hook for global progress state
- [x] T022 Create `src/contexts/TutorialContext.tsx` with Provider and useTutorial() hook for current tutorial state
- [x] T023 [P] Create `src/components/common/Button.tsx` with primary/secondary variants using Tailwind classes
- [x] T024 [P] Create `src/components/common/Card.tsx` for content containers
- [x] T025 [P] Create `src/components/common/ProgressBar.tsx` showing completion percentage
- [x] T026 [P] Create `src/components/layout/Header.tsx` with navigation links and progress indicator
- [x] T027 [P] Create `src/components/layout/Sidebar.tsx` with tutorial navigation menu
- [x] T028 Create `src/App.tsx` with Router setup, route definitions, and Context providers
- [x] T029 Create `src/main.tsx` entry point rendering App with all providers

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Interactive Installation Guide (Priority: P1)

**Goal**: Users can follow OS-specific installation steps to download, install, and configure Cursor

**Independent Test**: A user can visit /installation, select their OS, see step-by-step instructions, and mark the tutorial complete. Progress is saved to localStorage.

- [X] T030 Create `src/data/tutorials/installation.ts` with Tutorial data for Windows, macOS, Linux installation steps
- [X] T031 [P] Create `src/pages/Installation/InstallationPage.tsx` main page component with OS selector
- [X] T032 [P] Create `src/components/tutorial/OSDetector.tsx` auto-detecting user's OS on mount
- [X] T033 [P] Create `src/components/tutorial/InstallationSteps.tsx` displaying OS-specific step-by-step guide
- [X] T034 Create `src/components/tutorial/DownloadButton.tsx` linking to official Cursor download for selected OS
- [X] T035 Create `src/components/tutorial/TroubleshootingPanel.tsx` with common installation issues and solutions
- [X] T036 Create `src/components/tutorial/SetupGuide.tsx` for LLM provider configuration (OpenAI, Anthropic, free alternatives)
- [X] T037 Create `src/components/tutorial/TutorialCompletion.tsx` button marking tutorial complete and updating progress
- [X] T038 Add Installation route to `src/App.tsx` at path `/installation`
- [X] T039 Update `src/pages/Home/HomePage.tsx` with prominent link to Installation tutorial

**Checkpoint**: User Story 1 complete - users can install Cursor following the guide

---

## Phase 4: User Story 2 - Command Tutorial with Simulated Practice (Priority: P1)

**Goal**: Users learn Cursor commands (Tab, Ctrl+K, Ctrl+L, @-mentions) through interactive simulation

**Independent Test**: A user can visit /commands, select a command tutorial, read explanations, practice in simulated editor with pre-scripted responses. Progress saves independently of other tutorials.

- [X] T040 Create `src/data/tutorials/commands-tab.ts` with Tutorial data for Tab auto-completion
- [X] T041 [P] Create `src/data/tutorials/commands-ctrl-k.ts` with Tutorial data for Ctrl+K inline edit
- [X] T042 [P] Create `src/data/tutorials/commands-ctrl-l.ts` with Tutorial data for Ctrl+L chat
- [X] T043 [P] Create `src/data/tutorials/commands-at.ts` with Tutorial data for @-mentions
- [X] T044 [P] Create `src/data/scenarios/tab-scenarios.ts` with SimulationScenario data for Tab practice
- [X] T045 [P] Create `src/data/scenarios/ctrl-k-scenarios.ts` with SimulationScenario data for Ctrl+K practice
- [X] T046 [P] Create `src/data/scenarios/ctrl-l-scenarios.ts` with SimulationScenario data for Ctrl+L practice
- [X] T047 Create `src/data/scenarios/at-scenarios.ts` with SimulationScenario data for @-mentions practice
- [X] T048 Create `src/services/simulator-service.ts` for loading scenarios and validating user actions
- [X] T049 [P] Create `src/components/simulator/CodeEditor.tsx` integrating Monaco Editor with command interception
- [X] T050 [P] Create `src/components/simulator/CommandOverlay.tsx` showing available keyboard shortcuts
- [X] T051 Create `src/components/simulator/SimulationView.tsx` orchestrating editor, instructions, and responses
- [X] T052 Create `src/components/simulator/HintPanel.tsx` displaying contextual hints when user is stuck
- [X] T053 Create `src/components/simulator/SimulatedResponse.tsx` component for AI response display with typing animation
- [X] T054 Create `src/components/tutorial/CommandTutorial.tsx` combining explanation and simulation practice
- [X] T055 Create `src/components/tutorial/TutorialNavigation.tsx` for Previous/Next step buttons with progress tracking
- [X] T056 Create `src/hooks/useKeyboardShortcuts.ts` for detecting Tab, Ctrl+K, Ctrl+L, @ key combinations
- [X] T057 Create `src/pages/Commands/CommandsPage.tsx` listing all command tutorials
- [X] T058 [P] Add individual command tutorial routes to `src/App.tsx` at paths `/commands/:commandId`
- [X] T059 Update `src/pages/Home/HomePage.tsx` with links to Command tutorials

**Checkpoint**: User Story 2 complete - users can learn and practice core Cursor commands

---

## Phase 5: User Story 3 - Rules Writing Workshop (Priority: P2)

**Goal**: Users can create .cursorrules files through a guided form with live preview

**Independent Test**: A user can visit /rules, use the form builder to specify preferences, see generated .cursorrules file, and copy it. Can test rules in simulator to see mock responses.

- [x] T059 Create `src/data/tutorials/rules.ts` with Tutorial data for .cursorrules introduction
- [x] T060 Create `src/data/cursor-rule-templates.ts` with CursorRuleTemplate definitions (coding-style, framework, communication)
- [x] T061 [P] Create `src/components/rules/RuleBuilderForm.tsx` dynamic form based on template fields
- [x] T062 [P] Create `src/components/rules/RulePreview.tsx` live preview of generated .cursorrules content
- [x] T063 [P] Create `src/components/rules/RuleTemplateSelector.tsx` for choosing rule category
- [x] T064 Create `src/components/rules/RuleExamples.tsx` showing before/after code examples
- [x] T065 Create `src/components/rules/CopyButton.tsx` for copying generated rules to clipboard
- [x] T066 Create `src/components/rules/RuleTester.tsx` for testing rules in simulated environment
- [x] T067 Create `src/pages/RulesBuilder/RulesBuilderPage.tsx` main rules builder page
- [x] T068 Add Rules route to `src/App.tsx` at path `/rules`
- [x] T069 Update `src/pages/Home/HomePage.tsx` with link to Rules Builder

**Checkpoint**: User Story 3 complete - users can create and test .cursorrules files

---

## Phase 6: User Story 4 - Project-Based Learning Path (Priority: P3)

**Goal**: Users complete a mini-project (Todo App) using learned Cursor commands and rules

**Independent Test**: A user can visit /project, follow step-by-step project guide, use simulated Cursor features to generate/edit/refactor code, complete the Todo App.

- [X] T070 Create `src/data/tutorials/project-todo.ts` with Tutorial data for Todo App project
- [X] T071 Create `src/data/scenarios/project-scenarios.ts` with project-specific simulation scenarios
- [X] T072 [P] Create `src/components/tutorial/ProjectTutorial.tsx` multi-step project guide component
- [X] T073 [P] Create `src/components/tutorial/ProjectStep.tsx` individual project step with instructions
- [X] T074 Create `src/components/simulator/ProjectEditor.tsx` enhanced editor with project context
- [X] T075 Create `src/components/tutorial/ErrorFixingDemo.tsx` demonstrating Cursor error-fixing workflow
- [X] T076 Create `src/components/tutorial/ProjectCompletion.tsx` showing project summary and achievements
- [X] T077 Create `src/pages/ProjectTutorial/ProjectTutorialPage.tsx` main project page
- [X] T078 Add Project route to `src/App.tsx` at path `/project`
- [X] T079 Update `src/pages/Home/HomePage.tsx` with link to Project Tutorial

**Checkpoint**: User Story 4 complete - users can complete a guided mini-project

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T080 [P] Create mobile detection in `src/components/common/MobileWarning.tsx` showing "desktop recommended" notice
- [X] T081 [P] Add browser compatibility check in `src/utils/browser-check.ts`
- [X] T082 [P] Create `src/components/common/SkipButton.tsx` for skipping tutorial steps
- [X] T083 Add smooth scroll behavior and scroll-to-top on route change
- [X] T084 Add loading states and error boundaries for Monaco Editor
- [X] T085 Add keyboard navigation support (arrow keys, Enter, Escape) for tutorial steps
- [X] T086 Optimize bundle size with route-based code splitting using React.lazy()
- [X] T087 Add meta tags and SEO optimization in index.html
- [X] T088 Create README.md with project description, setup instructions, and contribution guidelines
- [X] T089 Run production build and verify all routes work correctly
- [X] T090 Verify all Constitution compliance points (China Red theme, desktop-first, localStorage, no blue-purple gradients)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
  - Can be developed in parallel with US1
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Uses simulator from US2
  - Soft dependency: US2 simulator should be stable
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Uses commands from US2
  - Soft dependency: US2 commands should be complete

### Within Each User Story

- Models/Static Data before Components
- Components before Page integration
- Page integration before Route setup
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes:
  - US1 and US2 can start in parallel (both P1)
  - US3 and US4 can start after US2 simulator is stable
- All components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```powershell
# Launch all static data tasks together:
Task: "Create installation tutorial data in src/data/tutorials/installation.ts"

# Launch all page components together:
Task: "Create InstallationPage component in src/pages/Installation/InstallationPage.tsx"
Task: "Create OSDetector component in src/components/tutorial/OSDetector.tsx"
Task: "Create InstallationSteps component in src/components/tutorial/InstallationSteps.tsx"

# Then integrate:
Task: "Add Installation route to src/App.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1-2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Installation Guide)
4. Complete Phase 4: User Story 2 (Command Tutorial)
5. **STOP and VALIDATE**: Test both stories independently
6. Deploy/demo if ready

**MVP Scope**: Installation guide + Command tutorials (Tab, Ctrl+K, Ctrl+L, @)
This delivers core value: users can install Cursor and learn basic commands.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP v0.1!)
3. Add User Story 2 → Test independently → Deploy/Demo (MVP v0.2!)
4. Add User Story 3 → Test independently → Deploy/Demo (v1.0)
5. Add User Story 4 → Test independently → Deploy/Demo (v1.1)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Installation)
   - Developer B: User Story 2 (Commands)
3. Stories complete and integrate independently
4. Then:
   - Developer A: User Story 3 (Rules)
   - Developer B: User Story 4 (Project)

---

## Task Summary

| Phase | Tasks | Story | Description |
|-------|-------|-------|-------------|
| 1 | 10 | - | Setup & Project Initialization |
| 2 | 19 | - | Foundational Infrastructure |
| 3 | 10 | US1 | Installation Guide (P1) |
| 4 | 19 | US2 | Command Tutorial (P1) |
| 5 | 11 | US3 | Rules Workshop (P2) |
| 6 | 10 | US4 | Project Tutorial (P3) |
| 7 | 11 | - | Polish & Cross-Cutting |
| **Total** | **90** | | |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
