# Research: Claude Code Skill 交互式教程

**Date**: 2026-02-14
**Feature**: 004-skill-tutorial

---

## Decision: 终端模拟器复用方案

**Decision**: 复用 003-spec-kit-tutorial 的 TerminalSimulator 组件

**Rationale**: 003 已实现完整的终端模拟器 (src/components/speckit/TerminalSimulator.tsx), 支持命令映射表、逐行输出动画、命令历史和错误提示。Skill 教程的终端模拟需求完全一致, 仅需提供不同的命令数据集。

**Alternatives considered**:
- 新建独立终端组件: 重复开发, 违反 DRY 原则
- 使用 xterm.js: 过重, 不需要完整终端仿真

**Implementation**: 将 TerminalSimulator 的命令数据通过 props 注入, 使其成为通用组件。Skill 教程提供 `src/data/skills/terminal-commands.ts` 作为命令数据源。

---

## Decision: Skill 分类卡片网格组件

**Decision**: 新建 SkillCardGrid 组件, 基于 CSS Grid + Framer Motion

**Rationale**: 需要展示 10-15 个 Skill 卡片, 支持按分类筛选 (开发工具、代码质量、项目管理、UI/UX 等) 和点击展开详情。现有组件中没有类似的可筛选卡片网格。

**Alternatives considered**:
- 复用 Card 组件手动排列: 缺少筛选功能, 每个页面需要大量重复代码
- 使用第三方网格库: 引入不必要的依赖

**Implementation details**:
- CSS Grid: `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`
- 分类筛选: 顶部 Tab 按钮组, 点击切换显示对应分类的卡片
- 卡片内容: skill 名称、简短描述、分类标签、"官方" 徽章 (如适用)
- 点击展开: AnimatePresence 动画展开详情面板, 显示使用场景、示例命令和模拟输出

---

## Decision: 代码/效果对比展示组件

**Decision**: 新建 ComparisonView 组件, 支持并排和 Tab 切换两种模式

**Rationale**: frontend-design 教程的核心价值是展示有无 skill 的差异。需要同时展示代码片段和 UI 效果截图, 并在不同屏幕尺寸下提供良好体验。

**Alternatives considered**:
- 两个 Card 并排: 缺少响应式切换, 小屏体验差
- iframe 实时渲染: 实现复杂, 且用户已确认使用静态截图

**Implementation details**:
- 大屏 (>=1024px): 左右并排, 左侧 "无 Skill", 右侧 "有 Skill"
- 小屏 (<1024px): Tab 切换, "无 Skill" / "有 Skill" 两个 Tab
- 每侧包含: 代码区 (CodeBlock 组件) + 效果区 (img 标签加载截图)
- 截图路径: `/images/skill-tutorial/case{N}-{with|without}-skill-preview.png`

---

## Decision: 交互式 Skill 推荐选择器

**Decision**: 新建 SkillRecommender 组件

**Rationale**: 帮助用户根据开发场景快速找到合适的 skill 组合, 提升教程实用价值。

**Implementation details**:
- 预定义场景: 前端开发、后端开发、全栈开发、DevOps/CI、代码审查、文档写作
- 每个场景映射 3-5 个推荐 skill
- 选择场景后展示推荐列表, 每个 skill 附带简短说明和使用建议
- 支持多场景选择, 合并推荐结果

---

## Decision: 复用现有组件策略

**Decision**: 最大化复用现有通用组件

**Rationale**: 项目已有成熟的教程组件体系, 复用可减少开发量并保持 UI 一致性。

**Reusable components**:
- `BeginnerTip`: 小白提示卡片 - 用于解释 Skill 概念类比
- `CodeBlock`: 代码高亮 + 复制 - 用于展示 skill 配置和命令
- `ExpandableExample`: 可展开示例 - 用于展示 skill 使用示例
- `QuizCard`: 选择题测验 - 用于验证概念理解
- `ProgressBar`: 进度条 - 用于教程完成进度
- `TerminalSimulator` (from 003): 终端模拟器 - 用于 skill 命令体验

**New components needed**:
- `SkillCardGrid`: Skill 分类卡片网格
- `ComparisonView`: 代码/效果对比展示
- `SkillRecommender`: 交互式 Skill 推荐选择器
