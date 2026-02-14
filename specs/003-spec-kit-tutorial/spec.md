# Feature Specification: Spec-Kit 交互式教程

**Feature Branch**: `003-spec-kit-tutorial`
**Created**: 2026-02-14
**Status**: Draft
**Input**: User description: "根据 spec-kit 的仓库 https://github.com/doggy8088/spec-kit 以及文档地址:https://doggy8088.github.io/spec-kit/, 新增 spec-kit 交互式教程,从安装步骤到 Spec-Driven Development 的开发的流程介绍以及使用案例"

## Assumptions

- spec-kit 教程内容基于 github/spec-kit (doggy8088/spec-kit 为其衍生版本) 的官方文档和仓库
- 教程以概念讲解 + 交互式流程演示为主, 不需要实际执行 spec-kit 命令
- 目标用户为已有基础编程经验但未接触过 Spec-Driven Development 的开发者
- 教程内容覆盖 spec-kit 的安装、初始化、核心工作流 (specify → clarify → plan → tasks → implement) 和实际案例
- 交互形式复用现有项目的组件模式: 可展开示例、选择题测验、代码高亮、步骤指引
- 所有 AI 响应为预设模拟内容, 不调用实际 AI 模型
- spec-kit 支持多种 AI 代理 (Claude, Gemini, Copilot, Cursor Agent 等), 教程以 Claude Code 为主要示例

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Spec-Kit 概念入门与安装指南 (Priority: P1)

开发者第一次接触 Spec-Driven Development, 需要理解什么是 spec-kit、为什么需要它, 以及如何在自己的项目中安装和初始化。

教程页面展示:
- Spec-Driven Development 的核心理念: 先写规格再写代码, 用规格驱动 AI 编码
- spec-kit 解决的问题: vibe coding 的局限性, 需求不清导致的返工
- 安装前置条件: Python 3.10+, uv 包管理器, Git
- 两种安装方式: `uvx` 一次性运行 和 `uv tool install` 全局安装
- `specify init` 命令的使用: 项目名称、AI 代理选择 (--ai claude/gemini/copilot 等)
- 初始化后的目录结构预览: `.specify/` 目录、`specs/` 目录、模板文件
- 交互式终端模拟器, 让用户体验 `specify init` 的执行过程

**Why this priority**: 安装和概念理解是使用 spec-kit 的第一步, 没有成功安装就无法进行后续任何操作。

**Independent Test**: 用户可以独立访问安装教程页面, 理解 Spec-Driven Development 概念, 在模拟终端中体验安装流程, 完成后进度被记录。

**Acceptance Scenarios**:

1. **Given** 用户进入 spec-kit 教程首页, **When** 页面加载完成, **Then** 显示 Spec-Driven Development 概念介绍和 spec-kit 工具概览
2. **Given** 用户查看安装步骤, **When** 选择操作系统和 AI 代理类型, **Then** 显示对应的安装命令和配置说明
3. **Given** 用户在模拟终端中输入 `specify init my-project --ai claude`, **When** 按下回车, **Then** 模拟显示初始化过程和生成的目录结构

---

### User Story 2 - 核心工作流教程 (Priority: P1)

开发者需要学习 spec-kit 的完整开发工作流: 从创建规格到生成任务, 理解每个阶段的作用和产出物。

教程页面展示:
- 工作流全景图: constitution → specify → clarify → plan → analyze → tasks → implement
- 每个命令的作用、输入和输出的可视化流程图
- `/speckit.constitution`: 建立项目原则和约束
- `/speckit.specify`: 将自然语言需求转化为结构化规格 (spec.md)
- `/speckit.clarify`: 识别规格中的模糊点并交互式澄清
- `/speckit.plan`: 生成技术实现计划 (plan.md, data-model.md, research.md)
- `/speckit.analyze`: 跨文档一致性检查
- `/speckit.tasks`: 生成依赖排序的任务列表 (tasks.md)
- `/speckit.implement`: 按任务执行实现
- 每个阶段配有可展开的示例输入/输出对比

**Why this priority**: 工作流是 spec-kit 的核心价值, 理解完整流程才能有效使用工具。

**Independent Test**: 用户可以独立访问工作流教程页面, 逐步了解每个命令的作用, 查看示例输入输出, 完成选择题测验。

**Acceptance Scenarios**:

1. **Given** 用户进入工作流教程页面, **When** 页面加载完成, **Then** 显示完整工作流的可视化流程图, 每个节点可点击查看详情
2. **Given** 用户点击某个工作流节点 (如 /speckit.specify), **When** 展开详情, **Then** 显示该命令的说明、示例输入和模拟输出
3. **Given** 用户完成所有工作流节点的学习, **When** 进入测验环节, **Then** 显示选择题验证对工作流顺序和各阶段作用的理解

---

### User Story 3 - 实战案例演练 (Priority: P2)

开发者需要通过一个完整的实战案例, 从零开始体验 spec-kit 的全流程, 加深对 Spec-Driven Development 的理解。

教程页面展示:
- 案例背景: 使用 spec-kit 开发一个任务管理应用
- 分步骤演示完整流程:
  - Step 1: `specify init task-manager --ai claude` 初始化项目
  - Step 2: `/speckit.constitution` 建立项目原则
  - Step 3: `/speckit.specify` 编写功能规格
  - Step 4: `/speckit.clarify` 澄清模糊需求
  - Step 5: `/speckit.plan` 生成实现计划
  - Step 6: `/speckit.tasks` 生成任务列表
- 每个步骤展示实际的命令输入和生成的文档内容
- 用户可以在模拟环境中逐步跟随操作
- 步骤间的文档变化对比 (如 spec.md 在 clarify 前后的差异)

**Why this priority**: 实战案例将抽象概念具象化, 但需要先理解基础概念和工作流 (Story 1 & 2)。

**Independent Test**: 用户可以独立访问案例教程页面, 逐步跟随案例操作, 查看每步的输入输出, 完成后获得课程完成标记。

**Acceptance Scenarios**:

1. **Given** 用户进入实战案例页面, **When** 页面加载完成, **Then** 显示案例背景介绍和分步骤导航
2. **Given** 用户在某个步骤中查看命令输出, **When** 点击 "查看生成的文档", **Then** 显示该步骤生成的完整文档内容 (如 spec.md)
3. **Given** 用户完成所有步骤, **When** 到达最后一步, **Then** 显示完整项目结构总览和课程完成徽章

---

### User Story 4 - 辅助命令与进阶技巧 (Priority: P3)

开发者需要了解 spec-kit 的辅助命令和进阶使用技巧, 包括一致性分析、检查清单、GitHub Issues 集成等。

教程页面展示:
- `/speckit.analyze`: 跨文档一致性分析的详细说明和示例报告
- `/speckit.checklist`: 生成自定义检查清单
- `/speckit.taskstoissues`: 将任务转换为 GitHub Issues
- 分支命名规范: NNN-feature-name 模式
- 多功能并行开发的分支管理策略
- 常见问题和最佳实践

**Why this priority**: 辅助命令是进阶功能, 用户掌握核心工作流后再学习效果更好。

**Independent Test**: 用户可以独立访问进阶教程页面, 了解辅助命令的用法和最佳实践。

**Acceptance Scenarios**:

1. **Given** 用户进入进阶教程页面, **When** 页面加载完成, **Then** 显示辅助命令列表和使用说明
2. **Given** 用户查看 /speckit.analyze 示例, **When** 展开示例报告, **Then** 显示完整的一致性分析报告内容

---

### Edge Cases

- 用户在模拟终端中输入非预期命令时, 显示友好的提示信息引导正确操作
- 用户跳过前置步骤直接访问后续教程时, 教程内容仍可正常浏览, 但显示建议先完成前置步骤的提示
- 工作流流程图在窄屏 (768px) 下应切换为垂直布局
- 代码示例中的长命令在小屏幕上应支持水平滚动
- 模拟终端的输入历史在页面刷新后不保留 (仅保留进度状态)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统必须提供 spec-kit 教程的导航入口, 包含 1 个模块首页和 4 个子教程 (安装指南含概念入门、核心工作流、实战案例、进阶技巧)
- **FR-002**: 安装指南必须支持操作系统选择 (Windows/macOS/Linux), 显示对应的安装命令
- **FR-003**: 安装指南必须包含模拟终端组件, 用户可输入 `specify init` 等命令并看到模拟输出
- **FR-004**: 工作流教程必须包含可视化流程图, 展示 constitution → specify → clarify → plan → analyze → tasks → implement 的完整流程
- **FR-005**: 工作流流程图的每个节点必须可点击, 展开显示该命令的详细说明和示例
- **FR-006**: 实战案例必须提供分步骤导航, 每步展示命令输入和生成的文档内容
- **FR-007**: 每个教程页面必须包含选择题测验, 验证用户对关键概念的理解
- **FR-008**: 每个教程页面必须记录用户的阅读/完成进度到 localStorage
- **FR-009**: 教程页面必须与现有教程系统的进度追踪机制保持一致
- **FR-010**: 教程页面必须遵循现有项目的 China Red 主题设计 (主色 #C41E3A, 强调色 #FFD700)
- **FR-011**: spec-kit 教程必须在现有路由结构中新增 `/spec-kit` 路径及子路由
- **FR-012**: 系统必须在首页学习路径中展示 spec-kit 教程模块的入口和进度
- **FR-013**: 代码示例必须支持语法高亮和一键复制功能
- **FR-014**: 教程必须包含 "小白提示" 卡片, 用通俗类比解释 Spec-Driven Development 的关键概念

### Key Entities

- **SpecKitTutorial**: 教程实体, 包含 id、标题、描述、难度、分类 (spec-kit)、课程序号 (1-4)、步骤列表、所属主题 (intro-install/workflow/case-study/advanced)
- **WorkflowNode**: 工作流节点实体, 包含 id、命令名称、描述、示例输入、示例输出、在流程中的顺序、前置节点 id
- **TerminalSimulation**: 终端模拟实体, 包含 id、预期命令、模拟输出内容、提示文本、关联教程步骤 id
- **CaseStudyStep**: 案例步骤实体, 包含 id、步骤序号、命令、输入描述、生成文档内容、关联工作流节点 id

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 用户可以在 10 分钟内完成概念入门和安装指南教程的阅读
- **SC-002**: 90% 的用户在完成工作流教程后能正确排列 spec-kit 的工作流顺序 (通过测验验证)
- **SC-003**: 用户可以在模拟终端中成功执行 `specify init` 命令并看到预期输出
- **SC-004**: 实战案例教程的每个步骤都能正常展示命令输入和文档输出
- **SC-005**: 用户的教程完成进度在页面刷新和重新访问后仍然保留
- **SC-006**: 工作流流程图在 768px 及以上宽度的屏幕上正常显示, 所有节点可交互

---

## Out of Scope (MVP)

- 实际执行 spec-kit 命令 (所有交互为前端模拟)
- spec-kit 的源码分析或内部实现原理
- 与其他 Spec-Driven Development 工具的对比评测
- spec-kit 插件开发教程
- 多语言版本 (仅提供中文)
