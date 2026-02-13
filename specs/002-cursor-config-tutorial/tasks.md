# Tasks: Cursor 配置教程 + Agent 教程模块

**Input**: Design documents from `/specs/002-cursor-config-tutorial/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 未在 spec 中明确要求, 本任务列表不包含测试任务。

**Organization**: 任务按用户故事分组, 优先级顺序: P1 → P2 → P3。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行 (不同文件, 无依赖)
- **[Story]**: 所属用户故事 (US1-US13)
- 包含精确文件路径

---

## Phase 1: Setup (项目初始化)

**Purpose**: 安装新依赖, 确认开发环境就绪

- [x] T001 安装 minimatch 依赖: `npm install minimatch && npm install -D @types/minimatch`
- [x] T002 确认开发服务器正常启动: `npm run dev`

---

## Phase 2: Foundational (基础设施)

**Purpose**: 类型扩展 + 共享组件 + 路由配置, 所有用户故事的前置依赖

**CRITICAL**: 所有用户故事必须等此阶段完成后才能开始

### 类型扩展

- [x] T003 扩展 TutorialCategory 类型, 新增 'config' | 'agents' 在 src/types/tutorial.ts
- [x] T004 [P] 新增 AgentExample 接口定义在 src/types/tutorial.ts
- [x] T005 [P] 新增 BeginnerTip 接口定义在 src/types/tutorial.ts
- [x] T006 [P] 新增 KeyboardShortcut 和 ShortcutCategory 类型在 src/types/tutorial.ts
- [x] T007 [P] 新增 IgnorePattern 接口定义在 src/types/tutorial.ts
- [x] T008 更新类型导出聚合在 src/types/index.ts

### 共享组件

- [x] T009 [P] 创建 CodeBlock 代码高亮组件 (Monaco 只读模式 + 复制按钮) 在 src/components/common/CodeBlock.tsx
- [x] T010 [P] 创建 QuizCard 选择题测验组件 (单选 + 校验 + 反馈动画) 在 src/components/common/QuizCard.tsx
- [x] T011 [P] 创建 ExpandableExample 可展开/收起组件 (Framer Motion AnimatePresence) 在 src/components/common/ExpandableExample.tsx
- [x] T012 [P] 创建 BeginnerTip 小白提示卡片组件 (灯泡图标 + 金色背景) 在 src/components/common/BeginnerTip.tsx

### 路由与导航

- [x] T013 新增 /config 和 /agents 路由配置 (lazy + Suspense) 在 src/App.tsx
- [x] T014 更新 Sidebar 组件, 新增 config 和 agents 分类图标和标签在 src/components/layout/Sidebar.tsx
- [x] T015 更新首页, 新增配置教程和 Agent 教程模块入口卡片在 src/pages/Home/HomePage.tsx

**Checkpoint**: 基础设施就绪, 用户故事可以开始实现

---

## Phase 3: US1 - 忽略文件配置教程 (Priority: P1) MVP

**Goal**: 用户可以学习 .cursorignore 语法并在交互式编辑器中练习

**Independent Test**: 访问 /config/ignore, 在编辑器中输入忽略模式, 实时预览匹配结果, 完成后进度被记录

- [x] T016 [P] [US1] 创建 IgnorePatternEditor 交互式编辑器组件 (Monaco + minimatch 实时匹配) 在 src/components/config/IgnorePatternEditor.tsx
- [x] T017 [P] [US1] 创建忽略文件教程数据 (步骤、忽略模式示例、练习题) 在 src/data/tutorials/config-ignore.ts
- [x] T018 [US1] 创建忽略文件教程页面 (概览 + 语法参考 + 交互式练习) 在 src/pages/Config/IgnoreFilesPage.tsx
- [x] T019 [US1] 创建配置教程主页 (6 个子教程入口卡片) 在 src/pages/Config/ConfigPage.tsx
- [x] T020 [US1] 注册 config-ignore 教程到 tutorial-service 在 src/services/tutorial-service.ts

**Checkpoint**: US1 完成, 用户可以独立访问忽略文件教程并完成交互式练习

---

## Phase 4: US2 - 键盘快捷键速查教程 (Priority: P1)

**Goal**: 用户可以按分类查看快捷键, 支持平台切换和搜索筛选

**Independent Test**: 访问 /config/shortcuts, 切换 Windows/macOS, 搜索 "chat" 筛选结果

- [x] T021 [P] [US2] 创建快捷键静态数据 (6 分类, 双平台键值) 在 src/data/shortcuts/keyboard-shortcuts.ts
- [x] T022 [P] [US2] 创建 PlatformSwitch 平台切换按钮组件在 src/components/config/PlatformSwitch.tsx
- [x] T023 [US2] 创建 ShortcutTable 快捷键表格组件 (分类显示 + 搜索筛选 + 平台切换) 在 src/components/config/ShortcutTable.tsx
- [x] T024 [US2] 创建快捷键教程数据在 src/data/tutorials/config-shortcuts.ts
- [x] T025 [US2] 创建快捷键教程页面在 src/pages/Config/ShortcutsPage.tsx
- [x] T026 [US2] 注册 config-shortcuts 教程到 tutorial-service 在 src/services/tutorial-service.ts

**Checkpoint**: US2 完成, 快捷键页面支持平台切换和搜索

---

## Phase 5: US7 - 使用 Agent 教程 (Priority: P1)

**Goal**: 用户理解 Agent harness 概念, 学会编写高效 prompt, 掌握上下文管理

**Independent Test**: 访问 /agents/working, 展开示例对话, 完成选择题测验, 进度被记录

- [x] T027 [P] [US7] 创建 Agent 示例对话数据 (模糊 vs 精确 prompt 对比) 在 src/data/agents/agent-examples.ts
- [x] T028 [P] [US7] 创建小白提示数据 (Agent harness 类比等) 在 src/data/agents/beginner-tips.ts
- [x] T029 [P] [US7] 创建 AgentExampleDialog 示例对话展示组件在 src/components/agents/AgentExampleDialog.tsx
- [x] T030 [P] [US7] 创建 LessonNavigation 上一课/下一课导航组件在 src/components/agents/LessonNavigation.tsx
- [x] T031 [US7] 创建使用 Agent 教程数据 (harness 概念 + prompt 技巧 + 上下文管理 + 测验) 在 src/data/tutorials/agent-working.ts
- [x] T032 [US7] 创建 Agent 教程主页 (7 个子教程入口, 线性学习路径) 在 src/pages/Agents/AgentsPage.tsx
- [x] T033 [US7] 创建使用 Agent 教程页面在 src/pages/Agents/WorkingWithAgentsPage.tsx
- [x] T034 [US7] 注册 agent-working 教程到 tutorial-service 在 src/services/tutorial-service.ts

**Checkpoint**: US7 完成, Agent 教程模块入口和第一个教程可用

---

## Phase 6: US8 - 理解你的代码库教程 (Priority: P1)

**Goal**: 用户了解 Agent 如何搜索和理解代码库

**Independent Test**: 访问 /agents/codebase, 阅读说明并完成测验

- [x] T035 [P] [US8] 补充 Agent 示例对话数据 (代码库搜索场景) 在 src/data/agents/agent-examples.ts
- [x] T036 [P] [US8] 补充小白提示数据 (语义搜索类比) 在 src/data/agents/beginner-tips.ts
- [x] T037 [US8] 创建理解代码库教程数据在 src/data/tutorials/agent-codebase.ts
- [x] T038 [US8] 创建理解代码库教程页面在 src/pages/Agents/UnderstandCodebasePage.tsx
- [x] T039 [US8] 注册 agent-codebase 教程到 tutorial-service 在 src/services/tutorial-service.ts

**Checkpoint**: US8 完成

---

## Phase 7: US9 - 快速构建功能教程 (Priority: P1)

**Goal**: 用户学会利用 Agent 拆分需求、编写规格、迭代开发

**Independent Test**: 访问 /agents/features, 查看 prompt 示例并完成测验

- [x] T040 [P] [US9] 补充 Agent 示例对话数据 (功能构建 + TDD 场景) 在 src/data/agents/agent-examples.ts
- [x] T041 [P] [US9] 补充小白提示数据 (需求拆分类比) 在 src/data/agents/beginner-tips.ts
- [x] T042 [US9] 创建构建功能教程数据在 src/data/tutorials/agent-features.ts
- [x] T043 [US9] 创建构建功能教程页面在 src/pages/Agents/CreatingFeaturesPage.tsx
- [x] T044 [US9] 注册 agent-features 教程到 tutorial-service 在 src/services/tutorial-service.ts

**Checkpoint**: 所有 P1 用户故事完成, MVP 可交付

---

## Phase 8: US3 - 扩展管理教程 (Priority: P2)

**Goal**: 用户了解 Cursor 扩展安装和管理流程

**Independent Test**: 访问 /config/extensions, 查看安装方式和管理操作说明

- [x] T045 [P] [US3] 创建扩展管理教程数据在 src/data/tutorials/config-extensions.ts
- [x] T046 [US3] 创建扩展管理教程页面在 src/pages/Config/ExtensionsPage.tsx
- [x] T047 [US3] 注册 config-extensions 教程到 tutorial-service 在 src/services/tutorial-service.ts

**Checkpoint**: US3 完成

---

## Phase 9: US10 - 查找并修复 Bug 教程 (Priority: P2)

**Goal**: 用户学会向 Agent 描述 Bug 并使用调试策略

**Independent Test**: 访问 /agents/bugs, 阅读调试策略并完成测验

- [x] T048 [P] [US10] 补充 Agent 示例对话数据 (Bug 描述场景) 在 src/data/agents/agent-examples.ts
- [x] T049 [US10] 创建修复 Bug 教程数据在 src/data/tutorials/agent-bugs.ts
- [x] T050 [US10] 创建修复 Bug 教程页面在 src/pages/Agents/FindingBugsPage.tsx
- [x] T051 [US10] 注册 agent-bugs 教程到 tutorial-service 在 src/services/tutorial-service.ts

**Checkpoint**: US10 完成

---

## Phase 10: US11 - 审查和测试代码教程 (Priority: P2)

**Goal**: 用户学会让 Agent 审查代码和编写测试

**Independent Test**: 访问 /agents/review, 学习审查策略并完成测验

- [x] T052 [P] [US11] 补充 Agent 示例对话数据 (代码审查场景) 在 src/data/agents/agent-examples.ts
- [x] T053 [US11] 创建审查测试教程数据在 src/data/tutorials/agent-review.ts
- [x] T054 [US11] 创建审查测试教程页面在 src/pages/Agents/ReviewingTestingPage.tsx
- [x] T055 [US11] 注册 agent-review 教程到 tutorial-service 在 src/services/tutorial-service.ts

**Checkpoint**: 所有 P2 用户故事完成

---

## Phase 11: P3 配置教程 (US4 + US5 + US6)

**Goal**: 完成剩余 3 个配置教程 (主题、Shell 命令、并行 Agent)

- [x] T056 [P] [US4] 创建主题配置教程数据在 src/data/tutorials/config-themes.ts
- [x] T057 [P] [US4] 创建主题配置教程页面在 src/pages/Config/ThemesPage.tsx
- [x] T058 [P] [US5] 创建 Shell 命令教程数据在 src/data/tutorials/config-shell.ts
- [x] T059 [P] [US5] 创建 Shell 命令教程页面在 src/pages/Config/ShellPage.tsx
- [x] T060 [P] [US6] 创建并行 Agent 教程数据在 src/data/tutorials/config-worktrees.ts
- [x] T061 [P] [US6] 创建并行 Agent 教程页面在 src/pages/Config/WorktreesPage.tsx
- [x] T062 注册 config-themes, config-shell, config-worktrees 教程到 tutorial-service 在 src/services/tutorial-service.ts

**Checkpoint**: 所有配置教程完成

---

## Phase 12: P3 Agent 教程 (US12 + US13)

**Goal**: 完成剩余 2 个 Agent 教程 (自定义代理、综合运用)

- [x] T063 [P] [US12] 补充 Agent 示例对话和小白提示数据 (Rules/MCP 场景) 在 src/data/agents/agent-examples.ts 和 src/data/agents/beginner-tips.ts
- [x] T064 [P] [US12] 创建自定义代理教程数据在 src/data/tutorials/agent-customize.ts
- [x] T065 [P] [US12] 创建自定义代理教程页面在 src/pages/Agents/CustomizingAgentsPage.tsx
- [x] T066 [P] [US13] 创建综合运用教程数据 (含最终测验和完成徽章) 在 src/data/tutorials/agent-together.ts
- [x] T067 [P] [US13] 创建综合运用教程页面在 src/pages/Agents/PuttingTogetherPage.tsx
- [x] T068 注册 agent-customize, agent-together 教程到 tutorial-service 在 src/services/tutorial-service.ts

**Checkpoint**: 所有 13 个教程完成

---

## Phase 13: Polish & Cross-Cutting Concerns

**Purpose**: 跨故事优化和收尾

- [x] T069 验证所有 13 个教程页面的进度追踪正确保存到 localStorage
- [x] T070 [P] 验证 Sidebar 正确显示所有教程分类和进度状态
- [x] T071 [P] 验证首页学习路径正确展示配置和 Agent 模块入口
- [x] T072 运行 TypeScript 类型检查: `npx tsc --noEmit`
- [x] T073 运行 ESLint 检查: `npm run lint`
- [x] T074 运行生产构建验证: `npm run build`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖, 立即开始
- **Foundational (Phase 2)**: 依赖 Phase 1 完成, 阻塞所有用户故事
- **P1 Stories (Phase 3-7)**: 依赖 Phase 2 完成, 可按顺序或并行执行
- **P2 Stories (Phase 8-10)**: 依赖 Phase 2 完成, 可与 P1 并行
- **P3 Stories (Phase 11-12)**: 依赖 Phase 2 完成, 可与其他优先级并行
- **Polish (Phase 13)**: 依赖所有用户故事完成

### User Story Dependencies

- **US1 (忽略文件)**: Phase 2 完成后即可开始, 无跨故事依赖
- **US2 (快捷键)**: Phase 2 完成后即可开始, 无跨故事依赖
- **US7 (使用 Agent)**: Phase 2 完成后即可开始, 创建 AgentsPage 和 Agent 共享数据
- **US8 (理解代码库)**: 依赖 US7 (AgentsPage + Agent 共享组件已创建)
- **US9 (构建功能)**: 依赖 US7
- **US10 (修复 Bug)**: 依赖 US7
- **US11 (审查测试)**: 依赖 US7
- **US12 (自定义代理)**: 依赖 US7
- **US13 (综合运用)**: 依赖 US7
- **US3-US6 (配置教程)**: 依赖 US1 (ConfigPage 已创建), 彼此无依赖

### Parallel Opportunities

```text
Phase 2 内部并行:
  T004 + T005 + T006 + T007 (类型定义)
  T009 + T010 + T011 + T012 (共享组件)

Phase 3-4 并行 (P1 配置):
  US1 (忽略文件) || US2 (快捷键) - 不同页面, 无依赖

Phase 5-7 顺序 (P1 Agent):
  US7 → US8 → US9 (US8/US9 依赖 US7 的 AgentsPage)
  但 US8 和 US9 可并行

Phase 8-10 并行 (P2):
  US3 || US10 || US11 - 不同模块, 无依赖

Phase 11-12 并行 (P3):
  US4 || US5 || US6 || US12 || US13 - 全部可并行
```

---

## Implementation Strategy

### MVP First (Phase 1-3, US1 Only)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational
3. 完成 Phase 3: US1 忽略文件教程
4. **STOP and VALIDATE**: 测试忽略文件教程独立可用
5. 可部署/演示

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. US1 + US2 → 配置教程 P1 完成 (MVP)
3. US7 + US8 + US9 → Agent 教程 P1 完成
4. US3 + US10 + US11 → P2 完成
5. US4-US6 + US12-US13 → P3 完成, 全部交付

---

## Notes

- [P] 任务 = 不同文件, 无依赖, 可并行
- [Story] 标签映射到 spec.md 中的用户故事
- 每个用户故事可独立完成和测试
- 每个任务或逻辑组完成后提交
- 在任何 Checkpoint 处停下来验证
