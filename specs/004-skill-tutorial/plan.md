# Implementation Plan: Claude Code Skill 交互式教程

**Branch**: `004-skill-tutorial` | **Date**: 2026-02-14 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-skill-tutorial/spec.md`

## Summary

新增 Claude Code Skill 交互式教程模块, 涵盖 Skill 概念入门、安装与插件管理、官方可安装 Skill 介绍、frontend-design Skill 深度体验 (静态截图对比) 和自定义 Skill 创建。复用现有组件体系 (BeginnerTip, CodeBlock, QuizCard, ExpandableExample), 复用 003 的 TerminalSimulator 组件, 新增 SkillCardGrid (Skill 分类卡片网格) 和 ComparisonView (代码/效果对比展示) 组件。

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 19.2.0
**Primary Dependencies**: React, React Router DOM 7.13.0, Framer Motion 12.34.0, Tailwind CSS 4.1.18
**Build Tool**: Vite 7.3.1
**Storage**: localStorage (用户进度)
**Testing**: Vitest 3.2.4 + React Testing Library
**Target Platform**: Web browsers (Chrome 90+, Firefox 90+, Edge 90+, Safari 15+) - Desktop-first
**Project Type**: Single-page web application (已有项目扩展)
**Performance Goals**: FCP < 2s, TTI < 3s
**Constraints**: Desktop-first (min 768px), 无实际 Claude Code 命令执行, localStorage 持久化, frontend-design 案例使用静态截图
**Scale/Scope**: 5 个子教程页面 + 1 个模块首页

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. React State Management | PASS | 复用现有 ProgressContext + TutorialContext |
| II. Desktop-First Responsive | PASS | 复用现有布局, min 768px |
| III. Local Storage Persistence | PASS | 复用现有 progress-service |
| IV. China Red UI Theme | PASS | 复用现有主题 tokens |
| V. Windows Development | PASS | 无新 shell 脚本需求 |
| VI. Simplicity & YAGNI | PASS | 复用现有组件 + 003 的 TerminalSimulator, 仅新增 2 个专用组件 |

**Gate Result**: ALL CHECKS PASSED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/004-skill-tutorial/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── components/
│   └── skills/                        # skill 专用组件
│       ├── SkillCardGrid.tsx          # Skill 分类卡片网格组件
│       ├── ComparisonView.tsx         # 代码/效果对比展示组件
│       └── SkillRecommender.tsx       # 交互式 Skill 推荐选择器
├── pages/
│   └── Skills/                        # skill 教程页面
│       ├── SkillsPage.tsx             # 模块首页 (/skills)
│       ├── SkillsIntroPage.tsx        # 概念入门 (/skills/intro)
│       ├── SkillsInstallPage.tsx      # 安装管理 (/skills/install)
│       ├── SkillsOfficialPage.tsx     # 官方 Skill (/skills/official)
│       ├── SkillsFrontendPage.tsx     # frontend-design 体验 (/skills/frontend-design)
│       └── SkillsCustomPage.tsx       # 自定义 Skill (/skills/custom)
├── data/
│   ├── tutorials/
│   │   ├── skills-intro.ts            # 概念入门教程数据
│   │   ├── skills-install.ts          # 安装管理教程数据
│   │   ├── skills-official.ts         # 官方 Skill 教程数据
│   │   ├── skills-frontend-design.ts  # frontend-design 教程数据
│   │   └── skills-custom.ts           # 自定义 Skill 教程数据
│   └── skills/
│       ├── skill-cards.ts             # Skill 介绍卡片数据
│       ├── skill-comparisons.ts       # 对比案例数据
│       ├── skill-recommendations.ts   # 推荐方案数据
│       └── terminal-commands.ts       # 终端模拟命令数据
└── types/
    └── tutorial.ts                    # 扩展 TutorialCategory 类型

public/
└── images/
    └── skill-tutorial/                # frontend-design 对比截图
        ├── case1-without-skill-preview.png
        ├── case1-with-skill-preview.png
        ├── case2-without-skill-preview.png
        ├── case2-with-skill-preview.png
        ├── case3-without-skill-preview.png
        └── case3-with-skill-preview.png
```

**Structure Decision**: 遵循现有项目的 feature-based 目录组织, 新增 `skills/` 组件目录和 `Skills/` 页面目录, 与 `speckit/` 和 `agents/` 模式一致。复用 003 的 TerminalSimulator 组件。

## Complexity Tracking

> No Constitution Check violations requiring justification.

---

## Phase 0: Research & Technology Decisions

**Status**: COMPLETE

### Decision Log

**D1: 终端模拟器组件**
- **Decision**: 复用 003-spec-kit-tutorial 的 TerminalSimulator 组件
- **Rationale**: 003 已实现完整的终端模拟器, 支持命令映射、输出动画和错误提示。Skill 教程的终端模拟需求 (输入 `/skill-name` 看模拟输出) 与 spec-kit 教程完全一致, 仅需提供不同的命令数据。
- **Alternatives considered**: 新建独立终端组件 (重复开发, 违反 DRY 原则)

**D2: Skill 分类卡片网格组件**
- **Decision**: 新建 SkillCardGrid 组件, 基于 CSS Grid + Framer Motion
- **Rationale**: 需要展示大量 Skill 卡片 (10-15 个), 支持分类筛选和点击展开详情。现有组件中没有类似的卡片网格布局。
- **Alternatives considered**: 复用 Card 组件手动排列 (缺少筛选功能, 代码重复)
- **Implementation**: CSS Grid 自适应列数 (768px: 2 列, 1024px: 3 列), 每个卡片包含 skill 名称、描述、分类标签, 点击展开详情面板

**D3: 代码/效果对比展示组件**
- **Decision**: 新建 ComparisonView 组件, 支持并排和切换两种模式
- **Rationale**: frontend-design 教程的核心交互是展示有无 skill 的差异。需要同时展示代码和截图, 并支持响应式切换。
- **Alternatives considered**: 直接用两个 Card 并排 (缺少切换模式, 小屏体验差)
- **Implementation**: >=1024px 并排展示, <1024px 切换 Tab 展示; 代码区使用 CodeBlock, 效果区使用 img 标签加载静态截图

**D4: 交互式 Skill 推荐选择器**
- **Decision**: 新建 SkillRecommender 组件, 基于场景选择推荐 skill 组合
- **Rationale**: 帮助用户根据自己的开发场景快速找到合适的 skill, 提升教程的实用价值。
- **Implementation**: 预定义 5-6 个开发场景 (前端开发、后端开发、全栈开发、DevOps、代码审查、文档写作), 每个场景映射推荐的 skill 列表

**D5: 路由结构**
- **Decision**: `/skills` 作为模块首页, 子路由 `/skills/intro`, `/skills/install`, `/skills/official`, `/skills/frontend-design`, `/skills/custom`
- **Rationale**: 与 `/spec-kit`, `/config`, `/agents` 路由模式一致
- **Alternatives considered**: 嵌套在 `/commands` 下 (Skill 不是 Cursor 命令, 语义不符)

**D6: 教程内容来源**
- **Decision**: 基于 Claude Code 官方文档和实际 skill 系统的功能描述
- **Rationale**: 确保教程内容准确, 用户学习后能直接应用
- **Key facts**: Skill 通过 `.claude/` 目录配置, 使用 `/skill-name` 语法调用, 支持参数传递

### Open Questions Resolved

None - all technical decisions based on existing project patterns and feature requirements.

---

## Phase 1: Design & Contracts

**Status**: COMPLETE

### Data Model

See [data-model.md](data-model.md) for full entity definitions.

**Key Entities**:
- `Tutorial` (扩展): 新增 'skills' category
- `SkillCard`: Skill 介绍卡片定义
- `SkillComparison`: 对比案例定义
- `SkillRecommendation`: 推荐方案定义
- `TerminalCommand` (复用 003): 终端模拟命令映射

### Quick Start

See [quickstart.md](quickstart.md) for development setup.

### Constitution Re-check

**Post-Design Verification**: ALL PRINCIPLES MAINTAINED

| Principle | Design Compliance |
|-----------|-------------------|
| I. React State | 复用 ProgressContext + TutorialContext |
| II. Desktop-First | 卡片网格响应式: 2 列 (768px) / 3 列 (1024px); 对比视图: 并排 (>=1024px) / Tab 切换 (<1024px) |
| III. Local Storage | 复用 progress-service.ts |
| IV. China Red Theme | 复用现有 Tailwind 主题 tokens |
| V. Windows Dev | 无新 shell 脚本 |
| VI. Simplicity | 复用 TerminalSimulator, 新增 3 个组件, 6 个页面, 5 个数据文件 |

---

## Next Steps

1. Run `/speckit.tasks` to generate implementation tasks
2. Begin development following task priority order
