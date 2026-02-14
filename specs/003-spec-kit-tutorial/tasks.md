# Tasks: Spec-Kit 交互式教程

**Input**: Design documents from `/specs/003-spec-kit-tutorial/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Unit tests for new components (TerminalSimulator, WorkflowDiagram) included in Phase 7.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 类型扩展和目录结构创建

- [x] T001 Add 'spec-kit' to TutorialCategory union type in src/types/tutorial.ts
- [x] T002 [P] Create speckit component directory src/components/speckit/
- [x] T003 [P] Create SpecKit page directory src/pages/SpecKit/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 新增专用组件, 所有教程页面依赖这些组件

- [ ] T004 Create TerminalSimulator component in src/components/speckit/TerminalSimulator.tsx (div + input, 预定义命令映射, 逐行输出动画, 命令历史, 非预期命令提示)
- [ ] T005 [P] Create WorkflowDiagram component in src/components/speckit/WorkflowDiagram.tsx (CSS Grid + Framer Motion, 7 节点线性排列, 点击展开详情, 响应式水平/垂直切换)
- [ ] T006 Add spec-kit lazy route imports and route definitions in src/App.tsx (/spec-kit, /spec-kit/install, /spec-kit/workflow, /spec-kit/case, /spec-kit/advanced)
- [ ] T007 Add spec-kit module entry in Sidebar navigation in src/components/layout/Sidebar.tsx

**Checkpoint**: Foundation ready - 专用组件和路由就绪, 可开始各教程页面开发

---

## Phase 3: User Story 1 - Spec-Kit 概念入门与安装指南 (Priority: P1) MVP

**Goal**: 用户理解 Spec-Driven Development 概念, 在模拟终端中体验 spec-kit 安装流程

**Independent Test**: 访问 /spec-kit/install, 阅读概念介绍, 在模拟终端输入 `specify init my-project --ai claude` 看到模拟输出, 完成测验, 进度被记录

### Implementation for User Story 1

- [ ] T008 [P] [US1] Create install tutorial data with SDD concepts, prerequisites, install commands, terminal commands, quiz questions in src/data/tutorials/speckit-install.ts
- [ ] T009 [P] [US1] Create SpecKitPage module overview page with tutorial cards and progress display in src/pages/SpecKit/SpecKitPage.tsx
- [ ] T010 [US1] Create SpecKitInstallPage with SDD intro, OS selector, install steps, TerminalSimulator integration, BeginnerTip cards, QuizCard in src/pages/SpecKit/SpecKitInstallPage.tsx
- [ ] T011 [US1] Add spec-kit module card with progress to HomePage learning path in src/pages/Home/HomePage.tsx

**Checkpoint**: US1 完成 - 用户可独立访问安装教程, 体验模拟终端, 完成测验

---

## Phase 4: User Story 2 - 核心工作流教程 (Priority: P1)

**Goal**: 用户通过可视化流程图学习 spec-kit 完整工作流, 理解每个命令的作用

**Independent Test**: 访问 /spec-kit/workflow, 查看流程图, 点击每个节点查看详情和示例, 完成工作流排序测验

### Implementation for User Story 2

- [ ] T012 [P] [US2] Create workflow tutorial data with 7 WorkflowNode definitions (constitution/specify/clarify/plan/analyze/tasks/implement), example inputs/outputs, quiz questions in src/data/tutorials/speckit-workflow.ts
- [ ] T013 [US2] Create SpecKitWorkflowPage with WorkflowDiagram integration, node detail panels with ExpandableExample, BeginnerTip cards, QuizCard in src/pages/SpecKit/SpecKitWorkflowPage.tsx

**Checkpoint**: US1 + US2 完成 - 用户可独立学习安装和工作流

---

## Phase 5: User Story 3 - 实战案例演练 (Priority: P2)

**Goal**: 用户通过任务管理应用案例, 逐步体验 spec-kit 全流程

**Independent Test**: 访问 /spec-kit/case, 逐步跟随 6 个案例步骤, 查看每步生成的文档内容, 完成后获得课程完成标记

### Implementation for User Story 3

- [ ] T014 [P] [US3] Create case study tutorial data with 6 CaseStudyStep definitions (init/constitution/specify/clarify/plan/tasks), generated document content for each step, quiz questions in src/data/tutorials/speckit-case.ts
- [ ] T015 [US3] Create SpecKitCasePage with step-by-step navigation, command display, generated document viewer (CodeBlock), diff comparison, completion badge in src/pages/SpecKit/SpecKitCasePage.tsx

**Checkpoint**: US1 + US2 + US3 完成 - 核心教程内容全部就绪

---

## Phase 6: User Story 4 - 辅助命令与进阶技巧 (Priority: P3)

**Goal**: 用户了解 spec-kit 辅助命令 (analyze/checklist/taskstoissues) 和最佳实践

**Independent Test**: 访问 /spec-kit/advanced, 阅读辅助命令说明, 查看示例报告, 完成测验

### Implementation for User Story 4

- [ ] T016 [P] [US4] Create advanced tutorial data with auxiliary commands (analyze/checklist/taskstoissues), branch naming conventions, best practices, quiz questions in src/data/tutorials/speckit-advanced.ts
- [ ] T017 [US4] Create SpecKitAdvancedPage with command sections, ExpandableExample for analyze report, BeginnerTip cards, QuizCard in src/pages/SpecKit/SpecKitAdvancedPage.tsx

**Checkpoint**: 所有 4 个教程页面完成

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 跨页面优化和集成验证

- [ ] T018 Add PageSEO metadata for all spec-kit pages in each SpecKit page component
- [ ] T019 Verify progress tracking works across all 4 spec-kit tutorials (localStorage read/write via ProgressContext)
- [ ] T020 Verify responsive layout: WorkflowDiagram vertical mode at 768px, TerminalSimulator horizontal scroll for long commands
- [ ] T021 Run `npm run build` to verify production build succeeds with no errors
- [ ] T022 Add prerequisite step check to sub-tutorial pages: display "建议先完成前置步骤" banner when previous tutorial incomplete (check ProgressContext, use BeginnerTipCard, non-blocking)
- [ ] T023 [P] Write unit tests for TerminalSimulator: command matching, output rendering, non-expected command hint in src/components/speckit/__tests__/TerminalSimulator.test.tsx
- [ ] T024 [P] Write unit tests for WorkflowDiagram: node rendering, click expand/collapse, responsive layout switch in src/components/speckit/__tests__/WorkflowDiagram.test.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on T001 (type extension) - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - US1 and US2 are both P1, can proceed in parallel
  - US3 depends on TerminalSimulator (from Phase 2), no dependency on US1/US2
  - US4 has no dependency on other stories
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 (TerminalSimulator) - No dependencies on other stories
- **US2 (P1)**: Depends on Phase 2 (WorkflowDiagram) - No dependencies on other stories
- **US3 (P2)**: Depends on Phase 2 (TerminalSimulator, CodeBlock) - Independently testable
- **US4 (P3)**: Depends on Phase 2 (ExpandableExample) - Independently testable

### Parallel Opportunities

- T002 + T003: Directory creation in parallel
- T004 + T005: Two new components in parallel (different files)
- T008 + T009: Data file + overview page in parallel
- T012 + T014 + T016: All data files can be created in parallel
- US1 + US2: Both P1 stories can be developed in parallel after Phase 2

---

## Parallel Example: User Story 1 + User Story 2

```bash
# After Phase 2 completes, launch US1 and US2 in parallel:

# US1 tasks:
Task: "Create install tutorial data in src/data/tutorials/speckit-install.ts"
Task: "Create SpecKitPage in src/pages/SpecKit/SpecKitPage.tsx"

# US2 tasks (parallel with US1):
Task: "Create workflow tutorial data in src/data/tutorials/speckit-workflow.ts"
Task: "Create SpecKitWorkflowPage in src/pages/SpecKit/SpecKitWorkflowPage.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T007)
3. Complete Phase 3: User Story 1 (T008-T011)
4. **STOP and VALIDATE**: 访问 /spec-kit 和 /spec-kit/install, 验证模拟终端和进度追踪
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. US1 (安装指南) → 验证 → 可部署 (MVP)
3. US2 (工作流教程) → 验证 → 可部署
4. US3 (实战案例) → 验证 → 可部署
5. US4 (进阶技巧) → 验证 → 可部署
6. Polish → 最终验证 → 完成

---

## Summary

- Total tasks: 24
- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundational): 4 tasks
- US1 (P1 安装指南): 4 tasks
- US2 (P1 工作流): 2 tasks
- US3 (P2 实战案例): 2 tasks
- US4 (P3 进阶技巧): 2 tasks
- Polish: 7 tasks
- Parallel opportunities: 6 groups
- Suggested MVP: Phase 1 + Phase 2 + Phase 3 (US1 only, 11 tasks)