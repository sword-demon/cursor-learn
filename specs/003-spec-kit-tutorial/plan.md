# Implementation Plan: Spec-Kit 交互式教程

**Branch**: `003-spec-kit-tutorial` | **Date**: 2026-02-14 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/003-spec-kit-tutorial/spec.md`

## Summary

新增 spec-kit 交互式教程模块, 涵盖 Spec-Driven Development 概念入门、安装指南、核心工作流 (specify → clarify → plan → tasks → implement) 教程、实战案例演练和进阶技巧。复用现有组件体系 (BeginnerTip, CodeBlock, QuizCard, ExpandableExample), 新增终端模拟器和工作流流程图组件。

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 19.2.0
**Primary Dependencies**: React, React Router DOM 7.13.0, Framer Motion 12.34.0, Tailwind CSS 4.1.18
**Build Tool**: Vite 7.3.1
**Storage**: localStorage (用户进度)
**Testing**: Vitest 3.2.4 + React Testing Library
**Target Platform**: Web browsers (Chrome 90+, Firefox 90+, Edge 90+, Safari 15+) - Desktop-first
**Project Type**: Single-page web application (已有项目扩展)
**Performance Goals**: FCP < 2s, TTI < 3s
**Constraints**: Desktop-first (min 768px), 无实际 spec-kit 命令执行, localStorage 持久化
**Scale/Scope**: 4 个子教程页面 + 1 个模块首页

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. React State Management | PASS | 复用现有 ProgressContext + TutorialContext |
| II. Desktop-First Responsive | PASS | 复用现有布局, min 768px |
| III. Local Storage Persistence | PASS | 复用现有 progress-service |
| IV. China Red UI Theme | PASS | 复用现有主题 tokens |
| V. Windows Development | PASS | 无新 shell 脚本需求 |
| VI. Simplicity & YAGNI | PASS | 复用现有组件, 仅新增 2 个专用组件 |

**Gate Result**: ALL CHECKS PASSED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/003-spec-kit-tutorial/
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
│   └── speckit/                    # spec-kit 专用组件
│       ├── TerminalSimulator.tsx   # 终端模拟器组件
│       └── WorkflowDiagram.tsx     # 工作流流程图组件
├── pages/
│   └── SpecKit/                    # spec-kit 教程页面
│       ├── SpecKitPage.tsx         # 模块首页 (/spec-kit)
│       ├── SpecKitInstallPage.tsx  # 安装指南 (/spec-kit/install)
│       ├── SpecKitWorkflowPage.tsx # 工作流教程 (/spec-kit/workflow)
│       ├── SpecKitCasePage.tsx     # 实战案例 (/spec-kit/case)
│       └── SpecKitAdvancedPage.tsx # 进阶技巧 (/spec-kit/advanced)
├── data/
│   └── tutorials/
│       ├── speckit-install.ts      # 安装教程数据
│       ├── speckit-workflow.ts     # 工作流教程数据
│       ├── speckit-case.ts         # 实战案例数据
│       └── speckit-advanced.ts     # 进阶教程数据
└── types/
    └── tutorial.ts                 # 扩展 TutorialCategory 类型
```

**Structure Decision**: 遵循现有项目的 feature-based 目录组织, 新增 `speckit/` 组件目录和 `SpecKit/` 页面目录, 与 `agents/` 和 `config/` 模式一致。

## Complexity Tracking

> No Constitution Check violations requiring justification.

---

## Phase 0: Research & Technology Decisions

**Status**: COMPLETE

### Decision Log

**D1: 终端模拟器组件**
- **Decision**: 自定义轻量终端模拟器组件 (TerminalSimulator)
- **Rationale**: 仅需模拟有限的 spec-kit 命令 (specify init, /speckit.* 等), 不需要完整终端功能; 自定义组件更轻量且可控
- **Alternatives considered**: xterm.js (过重, 引入不必要的依赖), Monaco Editor 终端模式 (不够直观)
- **Implementation**: 基于 div + input 实现, 预定义命令映射表, 支持命令输入和模拟输出动画

**D2: 工作流流程图组件**
- **Decision**: 使用 CSS + Framer Motion 自定义流程图
- **Rationale**: 流程图结构固定 (7 个节点线性排列), 不需要通用图表库; Framer Motion 已在项目中使用, 可实现节点点击展开动画
- **Alternatives considered**: React Flow (过重), Mermaid.js (不够交互), D3.js (学习成本高)
- **Implementation**: 水平排列的节点卡片 + 连接线, 每个节点可点击展开详情面板; 768px 以下切换为垂直布局

**D3: 教程数据组织**
- **Decision**: 复用现有 Tutorial 类型, 新增 'spec-kit' category
- **Rationale**: 与现有教程系统完全兼容, 进度追踪无需额外开发
- **Alternatives considered**: 独立数据结构 (增加维护成本, 进度追踪需要额外适配)

**D4: 路由结构**
- **Decision**: `/spec-kit` 作为模块首页, 子路由 `/spec-kit/install`, `/spec-kit/workflow`, `/spec-kit/case`, `/spec-kit/advanced`
- **Rationale**: 与 `/config` 和 `/agents` 路由模式一致
- **Alternatives considered**: 嵌套在 `/config` 下 (spec-kit 不是 Cursor 配置, 语义不符)

### Open Questions Resolved

None - all technical decisions based on existing project patterns and feature requirements.

---

## Phase 1: Design & Contracts

**Status**: COMPLETE

### Data Model

See [data-model.md](data-model.md) for full entity definitions.

**Key Entities**:
- `Tutorial` (扩展): 新增 'spec-kit' category
- `WorkflowNode`: 工作流节点定义
- `TerminalCommand`: 终端模拟命令映射
- `CaseStudyStep`: 案例步骤定义

### Quick Start

See [quickstart.md](quickstart.md) for development setup.

### Constitution Re-check

**Post-Design Verification**: ALL PRINCIPLES MAINTAINED

| Principle | Design Compliance |
|-----------|-------------------|
| I. React State | 复用 ProgressContext + TutorialContext |
| II. Desktop-First | 流程图响应式: 水平 (>=768px) / 垂直 (<768px) |
| III. Local Storage | 复用 progress-service.ts |
| IV. China Red Theme | 复用现有 Tailwind 主题 tokens |
| V. Windows Dev | 无新 shell 脚本 |
| VI. Simplicity | 仅 2 个新组件, 4 个新页面, 4 个数据文件 |

---

## Next Steps

1. Run `/speckit.tasks` to generate implementation tasks
2. Begin development following task priority order
