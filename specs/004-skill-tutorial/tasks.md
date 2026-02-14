# Tasks: Claude Code Skill 交互式教程

**Input**: Design documents from `/specs/004-skill-tutorial/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: 新组件 (SkillCardGrid, ComparisonView, SkillRecommender) 的单元测试包含在 Phase 8。

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 类型扩展和目录结构创建

- [x] T001 Add 'skills' to TutorialCategory union type in src/types/tutorial.ts
- [x] T002 [P] Create skills component directory src/components/skills/
- [x] T003 [P] Create Skills page directory src/pages/Skills/
- [x] T004 [P] Create skills data directory src/data/skills/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 新增专用组件和路由, 所有教程页面依赖这些基础设施

- [x] T005 Create SkillCardGrid component in src/components/skills/SkillCardGrid.tsx (CSS Grid 自适应列数, 分类筛选 Tab, 卡片点击展开详情, Framer Motion 动画)
- [x] T006 [P] Create ComparisonView component in src/components/skills/ComparisonView.tsx (>=1024px 并排展示, <1024px Tab 切换, 代码区 CodeBlock + 效果区 img 截图)
- [x] T007 [P] Create SkillRecommender component in src/components/skills/SkillRecommender.tsx (场景选择按钮组, 推荐 skill 列表展示, 支持多场景选择)
- [x] T008 Add skills lazy route imports and route definitions in src/App.tsx (/skills, /skills/intro, /skills/install, /skills/official, /skills/frontend-design, /skills/custom)
- [x] T009 Add skills module entry in Sidebar navigation in src/components/layout/Sidebar.tsx (categoryLabels, categoryIcons, routing)

**Checkpoint**: Foundation ready - 专用组件和路由就绪, 可开始各教程页面开发

---

## Phase 3: User Story 1 - Skill 概念入门与基础使用 (Priority: P1) MVP

**Goal**: 用户理解 Skill 概念, 区分三种分类, 在模拟终端中体验 skill 调用

**Independent Test**: 访问 /skills/intro, 阅读概念介绍和分类说明, 查看常用 skill 速查表, 在模拟终端输入 `/frontend-design` 看到模拟输出, 完成测验, 进度被记录

### Implementation for User Story 1

- [x] T010 [P] [US1] Create terminal commands data for skill commands (/frontend-design, /speckit.specify, /oh-my-claudecode:code-review etc.) in src/data/skills/terminal-commands.ts
- [x] T011 [P] [US1] Create intro tutorial data with Skill concepts, classification (官方/社区/自定义), usage syntax, quick reference table (10-15 skills), quiz questions in src/data/tutorials/skills-intro.ts
- [x] T012 [P] [US1] Create SkillsPage module overview page with tutorial cards and progress display in src/pages/Skills/SkillsPage.tsx
- [x] T013 [US1] Create SkillsIntroPage with concept intro, classification diagram, quick reference table, TerminalSimulator integration (复用 speckit/TerminalSimulator), BeginnerTip cards, QuizCard in src/pages/Skills/SkillsIntroPage.tsx
- [x] T014 [US1] Add skills module card with progress to HomePage learning path in src/pages/Home/HomePage.tsx

**Checkpoint**: US1 完成 - 用户可独立访问概念入门教程, 体验模拟终端, 完成测验

---

## Phase 4: User Story 2 - Skill 安装与插件管理 (Priority: P1)

**Goal**: 用户学习 skill 安装方式, 理解全局 vs 项目级安装, 掌握插件管理

**Independent Test**: 访问 /skills/install, 阅读安装步骤, 在模拟终端体验安装流程, 理解全局和项目级安装区别, 完成测验

### Implementation for User Story 2

- [x] T015 [P] [US2] Create install tutorial data with installation methods (.claude/ config), plugin concept, global vs project-level install, troubleshooting, quiz questions in src/data/tutorials/skills-install.ts
- [x] T016 [US2] Create SkillsInstallPage with install steps, TerminalSimulator integration, global/project comparison table, BeginnerTip cards, QuizCard in src/pages/Skills/SkillsInstallPage.tsx

**Checkpoint**: US1 + US2 完成 - 用户可独立学习概念和安装

---

## Phase 5: User Story 3 - Anthropic 官方 Skill 介绍 (Priority: P1)

**Goal**: 用户浏览官方可安装 skill 全景图, 通过交互式选择器获得个性化推荐

**Independent Test**: 访问 /skills/official, 查看分类卡片网格, 点击卡片查看详情, 使用场景选择器获得推荐, 完成测验

### Implementation for User Story 3

- [x] T017 [P] [US3] Create skill-cards data with 10-15 SkillCard definitions (speckit series, oh-my-claudecode series, frontend-design, etc.) categorized by function in src/data/skills/skill-cards.ts
- [x] T018 [P] [US3] Create skill-recommendations data with 5-6 development scenarios and recommended skill combinations in src/data/skills/skill-recommendations.ts
- [x] T019 [P] [US3] Create official tutorial data with skill overview, category descriptions, quiz questions in src/data/tutorials/skills-official.ts
- [x] T020 [US3] Create SkillsOfficialPage with SkillCardGrid integration, SkillRecommender integration, BeginnerTip cards, QuizCard in src/pages/Skills/SkillsOfficialPage.tsx

**Checkpoint**: US1 + US2 + US3 完成 - 核心教程内容全部就绪

---

## Phase 6: User Story 4 - frontend-design Skill 深度体验 (Priority: P2)

**Goal**: 用户通过 3 个案例对比, 直观感受 frontend-design skill 的价值

**Independent Test**: 访问 /skills/frontend-design, 查看 3 个案例的代码和截图对比, 理解 skill 带来的差异, 完成测验

### Implementation for User Story 4

- [x] T021 [P] [US4] Create skill-comparisons data with 3 SkillComparison definitions (登录页面/数据仪表盘/定价页面), including prompts, code snippets, screenshot paths, highlights in src/data/skills/skill-comparisons.ts
- [x] T022 [P] [US4] Create frontend-design tutorial data with skill capabilities overview, case study navigation, quiz questions in src/data/tutorials/skills-frontend-design.ts
- [x] T023 [US4] Create SkillsFrontendPage with ComparisonView integration for 3 cases, capability overview, BeginnerTip cards, QuizCard in src/pages/Skills/SkillsFrontendPage.tsx

**Checkpoint**: US1-US4 完成 - 包含 frontend-design 深度体验

---

## Phase 7: User Story 5 - 自定义 Skill 创建 (Priority: P3)

**Goal**: 用户学习自定义 skill 的文件结构和创建流程, 在模拟编辑器中编写 skill 定义

**Independent Test**: 访问 /skills/custom, 阅读文件结构说明, 在模拟编辑器中编写 skill 定义并预览, 完成测验

### Implementation for User Story 5

- [x] T024 [P] [US5] Create custom tutorial data with skill file structure, core fields (name/description/prompt/parameters), step-by-step creation guide, sharing methods, quiz questions in src/data/tutorials/skills-custom.ts
- [x] T025 [US5] Create SkillsCustomPage with file structure diagram, CodeBlock for skill definition examples, simulated editor (Monaco Editor or CodeBlock with editable mode), BeginnerTip cards, QuizCard in src/pages/Skills/SkillsCustomPage.tsx

**Checkpoint**: 所有 5 个教程页面完成

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 跨页面优化和集成验证

- [x] T026 Add PageSEO metadata for all skills pages in each Skills page component
- [x] T027 Register all 5 skills tutorials in tutorial-service.ts (import data files, add to tutorials array) in src/services/tutorial-service.ts
- [x] T028 Verify progress tracking works across all 5 skills tutorials (localStorage read/write via ProgressContext)
- [x] T029 Verify responsive layout: SkillCardGrid column switch at 768px/1024px, ComparisonView mode switch at 1024px
- [x] T030 Add prerequisite step check to sub-tutorial pages: display "建议先完成前置步骤" banner when previous tutorial incomplete
- [x] T031 Run `npm run build` to verify production build succeeds with no errors
- [x] T032 [P] Write unit tests for SkillCardGrid: card rendering, category filter, click expand/collapse in src/components/skills/__tests__/SkillCardGrid.test.tsx
- [x] T033 [P] Write unit tests for ComparisonView: side-by-side mode, tab switch mode, responsive breakpoint in src/components/skills/__tests__/ComparisonView.test.tsx
- [x] T034 [P] Write unit tests for SkillRecommender: scenario selection, recommendation display, multi-select in src/components/skills/__tests__/SkillRecommender.test.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on T001 (type extension) - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - US1, US2, US3 are all P1, can proceed in parallel
  - US4 depends on ComparisonView (from Phase 2), no dependency on US1-US3
  - US5 has no dependency on other stories
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1 概念入门)**: Depends on Phase 2 (TerminalSimulator from 003) - No dependencies on other stories
- **US2 (P1 安装管理)**: Depends on Phase 2 (TerminalSimulator from 003) - No dependencies on other stories
- **US3 (P1 官方 Skill)**: Depends on Phase 2 (SkillCardGrid, SkillRecommender) - No dependencies on other stories
- **US4 (P2 frontend-design)**: Depends on Phase 2 (ComparisonView) + 静态截图准备 - Independently testable
- **US5 (P3 自定义 Skill)**: Depends on Phase 2 (CodeBlock) - Independently testable

### Parallel Opportunities

- T002 + T003 + T004: Directory creation in parallel
- T005 + T006 + T007: Three new components in parallel (different files)
- T010 + T011 + T012: Data files + overview page in parallel
- T015 + T017 + T018 + T019 + T021 + T022 + T024: All data files can be created in parallel
- US1 + US2 + US3: All P1 stories can be developed in parallel after Phase 2
- T032 + T033 + T034: All unit tests in parallel

---

## Parallel Example: User Story 1 + User Story 2 + User Story 3

```bash
# After Phase 2 completes, launch US1, US2, US3 in parallel:

# US1 tasks:
Task: "Create terminal commands data in src/data/skills/terminal-commands.ts"
Task: "Create intro tutorial data in src/data/tutorials/skills-intro.ts"
Task: "Create SkillsPage in src/pages/Skills/SkillsPage.tsx"

# US2 tasks (parallel with US1):
Task: "Create install tutorial data in src/data/tutorials/skills-install.ts"
Task: "Create SkillsInstallPage in src/pages/Skills/SkillsInstallPage.tsx"

# US3 tasks (parallel with US1, US2):
Task: "Create skill-cards data in src/data/skills/skill-cards.ts"
Task: "Create skill-recommendations data in src/data/skills/skill-recommendations.ts"
Task: "Create SkillsOfficialPage in src/pages/Skills/SkillsOfficialPage.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T009)
3. Complete Phase 3: User Story 1 (T010-T014)
4. **STOP and VALIDATE**: 访问 /skills 和 /skills/intro, 验证模拟终端和进度追踪
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. US1 (概念入门) → 验证 → 可部署 (MVP)
3. US2 (安装管理) → 验证 → 可部署
4. US3 (官方 Skill) → 验证 → 可部署
5. US4 (frontend-design) → 验证 → 可部署 (需要截图资源就绪)
6. US5 (自定义 Skill) → 验证 → 可部署
7. Polish → 最终验证 → 完成

---

## Notes

- US4 (frontend-design) 依赖用户提前准备好 6 张对比截图放入 public/images/skill-tutorial/
- TerminalSimulator 组件从 src/components/speckit/TerminalSimulator.tsx 复用, 通过 props 注入不同命令数据
- 所有教程数据文件遵循现有 Tutorial 类型格式, 确保与 progress-service 兼容

---

## Summary

- Total tasks: 34
- Phase 1 (Setup): 4 tasks
- Phase 2 (Foundational): 5 tasks
- US1 (P1 概念入门): 5 tasks
- US2 (P1 安装管理): 2 tasks
- US3 (P1 官方 Skill): 4 tasks
- US4 (P2 frontend-design): 3 tasks
- US5 (P3 自定义 Skill): 2 tasks
- Polish: 9 tasks
- Parallel opportunities: 6 groups
- Suggested MVP: Phase 1 + Phase 2 + Phase 3 (US1 only, 14 tasks)
