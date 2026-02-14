# Feature Specification: Claude Code Skill 交互式教程

**Feature Branch**: `004-skill-tutorial`
**Created**: 2026-02-14
**Status**: Draft
**Input**: User description: "再新增一个交互式教程: skill 的使用以及安装以及插件安装和自定义技能介绍,可以着重介绍一下 anthropic 的官方的 skill,以及使用以下 frontend-design 前端 skill 带来的好处"

## Assumptions

- Skill 教程内容基于 Claude Code CLI 的 Skill 系统
- 教程以概念讲解 + 交互式演示为主, 不需要实际执行 Claude Code 命令
- 目标用户为已有基础编程经验、了解 Claude Code 基本操作但未接触过 Skill 系统的开发者
- 交互形式复用现有项目的组件模式: 可展开示例、选择题测验、代码高亮、步骤指引、模拟终端
- 所有 AI 响应为预设模拟内容, 不调用实际 AI 模型
- Skill 通过 `/skill-name` 语法调用, 类似 slash command
- 插件 (Plugin) 是包含多个 skill 的集合, 可通过配置文件安装
- frontend-design skill 是社区提供的前端设计辅助 skill, 能生成高质量 UI 代码

## Clarifications

### Session 2026-02-14

- Q: "官方 Skill" 的范围定义 - 内置 slash command 还是可安装 skill? → A: 仅覆盖可安装的 skill (如 frontend-design, speckit 系列, oh-my-claudecode 等), 不包含内置 slash command
- Q: frontend-design 案例的效果展示方式? → A: 静态截图/图片, 预先通过实际测试 frontend-design skill 生成 UI 后截图保存

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Skill 概念入门与基础使用 (Priority: P1)

开发者第一次接触 Claude Code 的 Skill 系统, 需要理解什么是 Skill、Skill 与普通对话的区别, 以及如何在日常开发中使用 Skill 提升效率。

教程页面展示:
- Skill 的核心概念: 预定义的专业化提示词模板, 通过 `/` 前缀触发
- Skill 与普通对话的区别: Skill 携带专业上下文和工作流, 普通对话是通用问答
- Skill 的分类: 官方可安装 skill、社区插件 skill、自定义 skill (不包含内置 slash command 如 /help, /clear, /init)
- 基础使用方式: 在 Claude Code 中输入 `/skill-name` 触发, 支持传参
- 常用 skill 速查表: 列出 10-15 个最实用的 skill 及其用途
- 交互式模拟终端, 让用户体验输入 `/commit`、`/review-pr` 等 skill 的执行过程
- "小白提示" 卡片: 用类比解释 Skill 概念

**Why this priority**: 概念理解和基础使用是 Skill 系统的入门门槛, 不理解 Skill 是什么就无法进行后续学习。

**Independent Test**: 用户可以独立访问 Skill 入门教程页面, 理解 Skill 概念, 在模拟终端中体验基础 skill 调用, 完成选择题测验后进度被记录。

**Acceptance Scenarios**:

1. **Given** 用户进入 Skill 教程首页, **When** 页面加载完成, **Then** 显示 Skill 概念介绍、分类说明和常用 skill 速查表
2. **Given** 用户在模拟终端中输入 `/commit`, **When** 按下回车, **Then** 模拟显示 commit skill 的执行过程和输出结果
3. **Given** 用户完成概念学习, **When** 进入测验环节, **Then** 显示选择题验证对 Skill 基础概念的理解

---

### User Story 2 - Skill 安装与插件管理 (Priority: P1)

开发者需要学习如何安装和管理 Skill, 包括从官方仓库安装、通过插件系统批量安装、以及管理已安装的 skill 列表。

教程页面展示:
- Skill 的安装方式: 通过 `.claude/` 目录配置安装
- 插件 (Plugin) 的概念: 一个插件包含多个相关 skill 的集合
- 官方插件仓库的浏览和搜索
- 安装步骤的交互式演示: 从发现 skill 到配置安装的完整流程
- 已安装 skill 的查看和管理: 列出、启用、禁用、卸载
- 全局安装 vs 项目级安装的区别和适用场景
- 常见安装问题的排查指南

**Why this priority**: 安装是使用 Skill 的前提, 与概念入门同等重要, 用户理解概念后需要立即知道如何获取和安装 skill。

**Independent Test**: 用户可以独立访问安装教程页面, 在模拟终端中体验 skill 安装流程, 理解全局和项目级安装的区别, 完成后进度被记录。

**Acceptance Scenarios**:

1. **Given** 用户进入 Skill 安装教程页面, **When** 页面加载完成, **Then** 显示安装方式概览和分步骤指南
2. **Given** 用户在模拟终端中执行安装命令, **When** 按下回车, **Then** 模拟显示安装过程和成功确认
3. **Given** 用户查看已安装 skill 列表, **When** 点击管理按钮, **Then** 显示 skill 的启用/禁用状态和操作选项

---

### User Story 3 - Anthropic 官方 Skill 介绍 (Priority: P1)

开发者需要了解 Anthropic 官方提供的 skill 有哪些, 每个 skill 的功能和适用场景, 以便选择最适合自己工作流的 skill 组合。

教程页面展示:
- 官方 skill 全景图: 按功能分类展示所有官方 skill
- 每个官方 skill 的详细介绍卡片: 名称、功能描述、使用场景、示例命令
- 重点 skill 深度讲解 (均为可安装 skill, 非内置命令):
  - `speckit` 系列 - Spec-Driven Development 工作流
  - `oh-my-claudecode` 系列 - 代码审查、自动化、TDD 等开发增强
  - `frontend-design` - 前端 UI/UX 设计辅助
  - 其他热门可安装 skill 的功能概览
- 每个 skill 配有可展开的使用示例和模拟输出
- Skill 组合推荐: 针对不同开发场景推荐 skill 搭配方案
- 交互式 skill 选择器: 用户选择开发场景, 系统推荐适合的 skill 组合

**Why this priority**: 官方 skill 是最稳定可靠的选择, 了解官方 skill 能帮助用户快速获得价值。

**Independent Test**: 用户可以独立访问官方 skill 介绍页面, 浏览所有官方 skill, 查看使用示例, 通过交互式选择器获得个性化推荐。

**Acceptance Scenarios**:

1. **Given** 用户进入官方 Skill 介绍页面, **When** 页面加载完成, **Then** 显示按功能分类的官方 skill 全景图
2. **Given** 用户点击某个 skill 卡片, **When** 展开详情, **Then** 显示该 skill 的功能描述、使用场景和模拟示例
3. **Given** 用户使用 skill 选择器选择 "前端开发" 场景, **When** 提交选择, **Then** 显示推荐的 skill 组合和使用建议

---

### User Story 4 - frontend-design Skill 深度体验 (Priority: P2)

开发者需要深入了解 frontend-design skill 的功能和优势, 通过实际案例体验该 skill 如何帮助快速生成高质量的前端 UI 代码。

教程页面展示:
- frontend-design skill 的核心能力: 50 种设计风格、21 种配色方案、50 种字体搭配、20 种布局模式
- 与普通 Claude Code 对话生成 UI 的对比: 展示同一需求下有无 skill 的输出差异
- 实际案例演示:
  - Case 1: 使用 frontend-design 生成一个登录页面
  - Case 2: 使用 frontend-design 生成一个数据仪表盘
  - Case 3: 使用 frontend-design 优化现有页面的视觉效果
- 每个案例展示: 输入提示词 → skill 处理过程 → 生成的代码 → 静态截图效果预览
- 前后对比展示: 不使用 skill vs 使用 skill 的代码质量和视觉效果差异 (均为预先截图)
- "小白提示" 卡片: 解释为什么专业化 skill 能产出更好的结果

**Why this priority**: frontend-design 是用户特别关注的 skill, 但需要先理解基础概念和安装方式 (Story 1-3)。

**Independent Test**: 用户可以独立访问 frontend-design 深度体验页面, 查看案例对比, 理解该 skill 的优势, 完成后进度被记录。

**Acceptance Scenarios**:

1. **Given** 用户进入 frontend-design 体验页面, **When** 页面加载完成, **Then** 显示 skill 能力概览和案例列表
2. **Given** 用户查看登录页面案例, **When** 点击 "查看对比", **Then** 并排显示有无 skill 的代码和渲染效果差异
3. **Given** 用户浏览完所有案例, **When** 进入总结环节, **Then** 显示 frontend-design skill 的核心优势总结和使用建议

---

### User Story 5 - 自定义 Skill 创建 (Priority: P3)

开发者需要学习如何创建自己的自定义 skill, 将团队的最佳实践和工作流封装为可复用的 skill。

教程页面展示:
- 自定义 skill 的文件结构和配置格式
- Skill 定义文件的核心字段: name、description、prompt template、parameters
- 从零创建一个简单 skill 的分步骤教程
- Skill 提示词模板的编写技巧和最佳实践
- 测试和调试自定义 skill 的方法
- 将自定义 skill 分享给团队的方式
- 交互式 skill 编辑器: 用户可以在模拟环境中编写和预览 skill 定义

**Why this priority**: 自定义 skill 是进阶功能, 用户掌握基础使用和官方 skill 后再学习效果更好。

**Independent Test**: 用户可以独立访问自定义 skill 教程页面, 在模拟编辑器中编写 skill 定义, 预览效果, 完成后进度被记录。

**Acceptance Scenarios**:

1. **Given** 用户进入自定义 Skill 教程页面, **When** 页面加载完成, **Then** 显示 skill 文件结构说明和分步骤创建指南
2. **Given** 用户在模拟编辑器中编写 skill 定义, **When** 点击预览, **Then** 显示该 skill 的预期行为和输出示例
3. **Given** 用户完成所有步骤, **When** 到达最后一步, **Then** 显示完整的 skill 定义文件和课程完成标记

---

### Edge Cases

- 用户在模拟终端中输入不存在的 skill 名称时, 显示友好的错误提示和建议
- 用户跳过前置教程直接访问后续内容时, 教程仍可正常浏览, 但显示建议先完成前置步骤的提示
- Skill 速查表和分类卡片在窄屏 (768px) 下应切换为单列布局
- 代码对比展示在小屏幕上应支持切换查看 (而非并排), 避免水平滚动
- 模拟终端的输入历史在页面刷新后不保留 (仅保留进度状态)
- 用户在 skill 选择器中未选择任何场景时, 显示通用推荐方案

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统必须提供 Skill 教程的导航入口, 包含 1 个模块首页和 5 个子教程 (概念入门、安装管理、官方 skill、frontend-design 体验、自定义 skill)
- **FR-002**: 概念入门页面必须包含 Skill 分类说明和常用 skill 速查表 (至少 10 个 skill)
- **FR-003**: 概念入门页面必须包含模拟终端组件, 用户可输入 skill 命令并看到模拟输出
- **FR-004**: 安装教程必须展示全局安装和项目级安装两种方式的区别和操作步骤
- **FR-005**: 官方 Skill 介绍页面必须按功能分类展示可安装的官方 skill (不含内置 slash command), 每个 skill 配有详细介绍卡片
- **FR-006**: 官方 Skill 页面必须包含交互式 skill 选择器, 根据用户选择的开发场景推荐 skill 组合
- **FR-007**: frontend-design 体验页面必须包含至少 3 个实际案例, 每个案例展示输入、处理过程和输出
- **FR-008**: frontend-design 体验页面必须包含有无 skill 的代码和效果对比展示 (使用预先准备的静态截图)
- **FR-009**: 自定义 Skill 教程必须包含模拟编辑器, 用户可编写 skill 定义并预览效果
- **FR-010**: 每个教程页面必须包含选择题测验, 验证用户对关键概念的理解
- **FR-011**: 每个教程页面必须记录用户的阅读/完成进度到 localStorage
- **FR-012**: 教程页面必须与现有教程系统的进度追踪机制保持一致
- **FR-013**: 教程页面必须遵循现有项目的 China Red 主题设计 (主色 #C41E3A, 强调色 #FFD700)
- **FR-014**: Skill 教程必须在现有路由结构中新增 `/skills` 路径及子路由
- **FR-015**: 系统必须在首页学习路径中展示 Skill 教程模块的入口和进度
- **FR-016**: 代码示例必须支持语法高亮和一键复制功能

### Key Entities

- **SkillTutorial**: 教程实体, 包含 id、标题、描述、难度、分类 (skill)、课程序号 (1-5)、步骤列表、所属主题 (intro/install/official/frontend-design/custom)
- **SkillCard**: Skill 介绍卡片实体, 包含 id、skill 名称、功能描述、使用场景、示例命令、分类标签、是否官方
- **SkillComparison**: 对比展示实体, 包含 id、场景描述、无 skill 的代码/效果、有 skill 的代码/效果、关联 skill 名称
- **SkillRecommendation**: 推荐方案实体, 包含 id、开发场景名称、推荐 skill 列表、使用建议

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 用户可以在 8 分钟内完成概念入门教程的阅读和测验
- **SC-002**: 90% 的用户在完成概念入门后能正确区分 Skill 的三种分类 (通过测验验证)
- **SC-003**: 用户可以在模拟终端中成功执行至少 3 个不同的 skill 命令并看到预期输出
- **SC-004**: frontend-design 对比案例能清晰展示有无 skill 的差异, 用户可以直观感受到 skill 的价值
- **SC-005**: 用户的教程完成进度在页面刷新和重新访问后仍然保留
- **SC-006**: Skill 速查表和分类卡片在 768px 及以上宽度的屏幕上正常显示, 所有卡片可交互
- **SC-007**: 用户可以在自定义 skill 教程中成功编写一个完整的 skill 定义并预览效果

---

## Out of Scope (MVP)

- 实际执行 Claude Code skill 命令 (所有交互为前端模拟)
- Skill 的源码分析或内部实现原理
- 第三方社区 skill 的完整目录和评测
- Skill 的版本管理和自动更新机制
- 多语言版本 (仅提供中文)
