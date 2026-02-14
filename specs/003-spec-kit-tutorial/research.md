# Research: Spec-Kit 交互式教程

**Date**: 2026-02-14
**Feature**: 003-spec-kit-tutorial

---

## Decision: 终端模拟器实现方案

**Decision**: 自定义轻量终端模拟器 (TerminalSimulator)

**Rationale**: spec-kit 教程仅需模拟有限命令集 (约 10 个), 不需要完整终端仿真。自定义组件可精确控制输入验证、输出动画和错误提示, 且不引入新依赖。

**Alternatives considered**:
- xterm.js: 功能完整但体积大 (~200KB gzipped), 对本场景过度设计
- Monaco Editor 终端模式: 不够直观, 用户体验偏向代码编辑而非终端交互

**Implementation details**:
- 预定义命令映射: `{ "specify init": outputFn, "/speckit.specify": outputFn, ... }`
- 输出逐行动画 (Framer Motion), 模拟真实终端输出效果
- 支持命令历史 (上下箭头), 仅在当前会话内有效
- 非预期命令显示: "命令未识别, 请尝试: specify init my-project --ai claude"

---

## Decision: 工作流流程图实现方案

**Decision**: CSS Grid + Framer Motion 自定义流程图

**Rationale**: 工作流为固定的 7 节点线性结构, 不需要通用图表库。CSS Grid 提供灵活的响应式布局, Framer Motion 处理节点展开/收起动画。

**Alternatives considered**:
- React Flow: 功能强大但引入 ~150KB 新依赖, 对线性流程过度设计
- Mermaid.js: 渲染为 SVG, 交互性有限, 无法实现点击展开详情
- D3.js: 学习曲线陡峭, 团队不熟悉

**Implementation details**:
- 水平布局 (>=768px): 7 个节点卡片 + 箭头连接线, CSS Grid 一行排列
- 垂直布局 (<768px): 节点纵向排列, 连接线变为垂直
- 每个节点: 图标 + 命令名 + 简短描述, 点击展开详情面板 (AnimatePresence)
- 当前激活节点高亮 (China Red #C41E3A), 已完成节点显示勾选标记

---

## Decision: 教程内容来源

**Decision**: 基于 github/spec-kit 官方文档和 Context7 API 获取的最新信息

**Rationale**: spec-kit 是 GitHub 官方的 Spec-Driven Development 工具包, doggy8088/spec-kit 为其衍生版本。教程内容以官方文档为准, 确保准确性。

**Key facts gathered**:
- 安装方式: `uvx --from git+https://github.com/github/spec-kit.git specify init <PROJECT_NAME>`
- 全局安装: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`
- 支持 17+ AI 代理: claude, gemini, copilot, cursor-agent, qwen, opencode, codex, windsurf 等
- 核心工作流: init → constitution → specify → clarify → plan → analyze → tasks → implement
- 分支命名: NNN-feature-name (如 001-photo-albums)
- 目录结构: specs/NNN-feature-name/ 下包含 spec.md, plan.md, tasks.md 等

---

## Decision: 复用现有组件策略

**Decision**: 最大化复用现有通用组件

**Rationale**: 项目已有成熟的教程组件体系, 复用可减少开发量并保持 UI 一致性。

**Reusable components**:
- `BeginnerTip`: 小白提示卡片 - 用于解释 SDD 概念
- `CodeBlock`: 代码高亮 + 复制 - 用于展示 spec-kit 命令和输出
- `ExpandableExample`: 可展开示例 - 用于展示命令输入/输出对比
- `QuizCard`: 选择题测验 - 用于验证工作流理解
- `ProgressBar`: 进度条 - 用于教程完成进度

**New components needed**:
- `TerminalSimulator`: 终端模拟器 (spec-kit 特有需求)
- `WorkflowDiagram`: 工作流流程图 (spec-kit 特有需求)
