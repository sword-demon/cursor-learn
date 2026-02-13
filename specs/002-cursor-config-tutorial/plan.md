# Implementation Plan: Cursor 配置教程 + Agent 教程模块

**Branch**: `002-cursor-config-tutorial` | **Date**: 2026-02-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-cursor-config-tutorial/spec.md`

## Summary

在现有 Cursor 教程网站基础上新增两个教程模块:
1. **配置教程** (`/config`): 6 个子教程 (忽略文件、快捷键、扩展、主题、Shell 命令、并行 Agent)
2. **Agent 教程** (`/agents`): 7 个子教程 (使用 Agent、理解代码库、构建功能、修复 Bug、审查测试、自定义代理、综合运用)

技术方案: 复用现有 Tutorial 类型体系和进度追踪机制, 扩展 TutorialCategory 类型, 新增 Agent 教程专用交互组件 (可展开示例对话、选择题测验、小白提示卡片)。

## Technical Context

**Language/Version**: TypeScript 5.9.3 + React 19.2.0
**Primary Dependencies**: Vite 7.3.1, Tailwind CSS 4.1.18, React Router DOM 7.13.0, Framer Motion 12.34.0, Monaco Editor 4.7.0
**Storage**: localStorage (键: `cursor-tutorial:progress`)
**Testing**: Vitest 3.2.4 + React Testing Library
**Target Platform**: Web (Desktop-First, 最小视口 768px)
**Project Type**: Single SPA (前端纯静态)
**Performance Goals**: 教程页面首次加载 < 2s, 搜索筛选即时响应
**Constraints**: 无后端, 纯前端静态数据, localStorage 5-10MB 限制
**Scale/Scope**: 13 个教程页面 (6 配置 + 7 Agent), ~30 个新组件/数据文件

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. React State Management | PASS | 复用现有 ProgressContext + TutorialContext, 不引入新状态库 |
| II. Desktop-First | PASS | 所有新页面遵循 768px 最小视口, 复用现有 TutorialLayout |
| III. localStorage Persistence | PASS | 进度数据复用现有 `cursor-tutorial:progress` 键, 无后端依赖 |
| IV. China Red Theme | PASS | 新组件遵循 #C41E3A 主色 + #FFD700 强调色 |
| V. Windows Dev Environment | PASS | 所有脚本和命令使用 PowerShell 兼容语法 |
| VI. Simplicity & YAGNI | PASS | 复用现有 Tutorial 类型体系, 仅扩展必要字段; 新组件最小化实现 |

## Project Structure

### Documentation (this feature)

```text
specs/002-cursor-config-tutorial/
├── plan.md              # 本文件
├── research.md          # Phase 0: 研究决策
├── data-model.md        # Phase 1: 数据模型
├── quickstart.md        # Phase 1: 开发快速开始
└── tasks.md             # Phase 2: 任务分解 (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── types/
│   └── tutorial.ts              # [修改] 扩展 TutorialCategory, 新增 AgentExample/BeginnerTip 类型
├── data/
│   ├── tutorials/
│   │   ├── config-ignore.ts     # [新增] 忽略文件教程数据
│   │   ├── config-shortcuts.ts  # [新增] 快捷键教程数据
│   │   ├── config-extensions.ts # [新增] 扩展管理教程数据
│   │   ├── config-themes.ts     # [新增] 主题配置教程数据
│   │   ├── config-shell.ts      # [新增] Shell 命令教程数据
│   │   ├── config-worktrees.ts  # [新增] 并行 Agent 教程数据
│   │   ├── agent-working.ts     # [新增] 使用 Agent 教程数据
│   │   ├── agent-codebase.ts    # [新增] 理解代码库教程数据
│   │   ├── agent-features.ts    # [新增] 构建功能教程数据
│   │   ├── agent-bugs.ts        # [新增] 修复 Bug 教程数据
│   │   ├── agent-review.ts      # [新增] 审查测试教程数据
│   │   ├── agent-customize.ts   # [新增] 自定义代理教程数据
│   │   └── agent-together.ts    # [新增] 综合运用教程数据
│   ├── shortcuts/
│   │   └── keyboard-shortcuts.ts # [新增] 快捷键静态数据 (6 分类)
│   └── agents/
│       ├── agent-examples.ts    # [新增] Agent 示例对话数据
│       └── beginner-tips.ts     # [新增] 小白提示卡片数据
├── components/
│   ├── common/
│   │   ├── ExpandableExample.tsx # [新增] 可展开/收起的示例对话组件
│   │   ├── QuizCard.tsx         # [新增] 选择题测验组件
│   │   ├── BeginnerTip.tsx      # [新增] 小白提示卡片组件
│   │   └── CodeBlock.tsx        # [新增] 代码示例高亮组件 (带复制)
│   ├── config/
│   │   ├── IgnorePatternEditor.tsx  # [新增] 交互式忽略模式编辑器
│   │   ├── ShortcutTable.tsx        # [新增] 快捷键表格 (支持平台切换/搜索)
│   │   └── PlatformSwitch.tsx       # [新增] Windows/macOS 平台切换按钮
│   └── agents/
│       ├── AgentExampleDialog.tsx   # [新增] Agent 示例对话展示组件
│       └── LessonNavigation.tsx     # [新增] 上一课/下一课导航组件
├── pages/
│   ├── Config/
│   │   ├── ConfigPage.tsx           # [新增] 配置教程主页 (6 个子教程入口)
│   │   ├── IgnoreFilesPage.tsx      # [新增] 忽略文件教程页
│   │   ├── ShortcutsPage.tsx        # [新增] 快捷键教程页
│   │   ├── ExtensionsPage.tsx       # [新增] 扩展管理教程页
│   │   ├── ThemesPage.tsx           # [新增] 主题配置教程页
│   │   ├── ShellPage.tsx            # [新增] Shell 命令教程页
│   │   └── WorktreesPage.tsx        # [新增] 并行 Agent 教程页
│   └── Agents/
│       ├── AgentsPage.tsx           # [新增] Agent 教程主页 (7 个子教程入口)
│       ├── WorkingWithAgentsPage.tsx # [新增] 使用 Agent 教程页
│       ├── UnderstandCodebasePage.tsx # [新增] 理解代码库教程页
│       ├── CreatingFeaturesPage.tsx  # [新增] 构建功能教程页
│       ├── FindingBugsPage.tsx       # [新增] 修复 Bug 教程页
│       ├── ReviewingTestingPage.tsx  # [新增] 审查测试教程页
│       ├── CustomizingAgentsPage.tsx # [新增] 自定义代理教程页
│       └── PuttingTogetherPage.tsx   # [新增] 综合运用教程页
├── services/
│   └── tutorial-service.ts      # [修改] 注册新教程到 tutorials 数组
└── App.tsx                      # [修改] 新增 /config 和 /agents 路由
```

**Structure Decision**: 沿用现有单 SPA 结构, 在 `src/` 下按职责分目录。新增 `components/config/` 和 `components/agents/` 存放模块专用组件, `pages/Config/` 和 `pages/Agents/` 存放页面组件。数据文件遵循现有 `data/tutorials/` 模式, 每个教程一个独立文件。

## Complexity Tracking

> 无 Constitution 违规, 无需填写。
