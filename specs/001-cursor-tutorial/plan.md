# Implementation Plan: Cursor Tutorial Website

**Branch**: `001-cursor-tutorial` | **Date**: 2026-02-13 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-cursor-tutorial/spec.md`

## Summary

创建一个交互式 Cursor IDE 快速入门网站，包含：
1. 可视化安装指南（Windows/macOS/Linux）
2. 模拟代码编辑器环境，支持 Tab、Ctrl+K、Ctrl+L、@-mentions 等核心命令练习
3. .cursorrules 文件生成器，通过表单引导用户创建个性化规则
4. 项目式学习路径，通过微型项目整合所有学习内容

技术方案：React + TypeScript 单页应用，使用 localStorage 存储进度，无需后端。

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 19.2.0
**Primary Dependencies**: React, React Router DOM 7.13.0, @monaco-editor/react 4.7.0 (代码编辑器模拟), Framer Motion 12.34.0 (动画), Tailwind CSS 4.1.18
**Build Tool**: Vite 7.3.1
**Storage**: localStorage (用户进度、教程状态)
**Testing**: Vitest 3.2.4 + React Testing Library
**Target Platform**: Web browsers (Chrome 90+, Firefox 90+, Edge 90+, Safari 15+) - Desktop-first
**Project Type**: Single-page web application
**Performance Goals**: First contentful paint < 2s, Time to interactive < 3s, 100 concurrent users 下页面响应时间 < 500ms
**Constraints**: Desktop-first (min 768px), No real LLM, localStorage 5MB limit (浏览器标准上限)
**Scale/Scope**: Single user, static deployment, 100 concurrent users target
**Dependency Version Strategy**: 使用 package.json 中 `^` (minor) 和 `~` (patch) 语义化版本范围锁定; package-lock.json 精确锁定安装版本

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. React State Management | PASS | Using React Context API + hooks for tutorial state, user progress |
| II. Desktop-First Responsive | PASS | Min viewport 768px, optimal 1280px+ |
| III. Local Storage Persistence | PASS | User progress and tutorial state stored in localStorage |
| IV. China Red UI Theme | PASS | Primary #C41E3A, accent #FFD700, no blue-purple gradients |
| V. Windows Development | PASS | PowerShell scripts, Windows-compatible tooling |
| VI. Simplicity & YAGNI | PASS | No backend, no auth, minimal dependencies |

**Gate Result**: ALL CHECKS PASSED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/001-cursor-tutorial/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
cursor-learn/
├── src/
│   ├── components/          # UI components
│   │   ├── common/          # Button, Card, Modal, etc.
│   │   ├── layout/          # Header, Sidebar, Footer
│   │   ├── tutorial/        # Tutorial-specific components
│   │   └── simulator/       # Code editor simulator
│   ├── contexts/            # React Contexts (TutorialContext, ProgressContext)
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Route pages
│   │   ├── Home/
│   │   ├── Installation/
│   │   ├── Commands/
│   │   ├── RulesBuilder/
│   │   └── ProjectTutorial/
│   ├── services/            # localStorage, data persistence
│   ├── types/               # TypeScript interfaces
│   ├── data/                # Static data (tutorials, scenarios)
│   └── utils/               # Helper functions
├── public/                  # Static assets
├── tests/                   # Test files
└── docs/                    # Additional documentation
```

**Structure Decision**: Single-page React application with feature-based folder organization. Components grouped by domain (tutorial, simulator) for maintainability.

## Complexity Tracking

> No Constitution Check violations requiring justification.

<!--
| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
-->

---

## Phase 0: Research & Technology Decisions

**Status**: COMPLETE

### Decision Log

**D1: Code Editor Component**
- **Decision**: Use @monaco-editor/react (Monaco Editor React wrapper)
- **Rationale**: Familiar to Cursor users (Cursor is VS Code-based), supports syntax highlighting, keyboard shortcuts, 与 Cursor 真实编辑器体验一致
- **Alternatives considered**: CodeMirror (lighter but less familiar), custom textarea (too简陋无法模拟真实体验)
- **Implementation**: 所有模拟编辑器场景均使用 Monaco Editor 组件，不使用 textarea 替代

**D2: Animation Library**
- **Decision**: Framer Motion
- **Rationale**: React-native animations, excellent for tutorial step transitions, command highlighting
- **Alternatives considered**: CSS animations (limited interactivity), React Spring (similar, Framer more popular)

**D3: Routing**
- **Decision**: React Router DOM v7
- **Rationale**: Standard for React SPAs, supports tutorial deep-linking
- **Alternatives considered**: TanStack Router (newer, unnecessary for this scope)

**D4: State Persistence**
- **Decision**: localStorage with custom hook
- **Rationale**: Meets Constitution III, simple, no backend needed
- **Migration path**: Future backend can sync localStorage data
- **Degradation strategy**: 当 localStorage 写入失败 (QuotaExceededError) 时，显示提示信息建议用户清理浏览器数据; 进度数据优先级高于偏好设置，空间不足时仅保留进度数据; 预估总数据量 ~15KB，远低于 5MB 上限

**D5: Styling Approach**
- **Decision**: Tailwind CSS + custom CSS variables for theme
- **Rationale**: Rapid development, easy theme switching (China Red), Constitution compatible
- **Alternatives considered**: CSS-in-JS (heavier), plain CSS (slower development)

**D6: Visual Resources Strategy**
- **Decision**: 使用 SVG 图标 + CSS 动画模拟视觉指示器，不使用实际截图
- **Rationale**: spec 中 US1 提到 "screenshots or visual indicators"，选择 visual indicators 方案; 截图维护成本高且容易过时; SVG + 动画更轻量且可交互
- **Implementation**: 安装步骤使用图标 + 文字描述; 命令演示使用 Monaco Editor 实时模拟; 操作系统选择使用 OS 图标

### Open Questions Resolved

None - all technical decisions made based on Constitution constraints and feature requirements.

---

## Phase 1: Design & Contracts

**Status**: COMPLETE

### Data Model

See [data-model.md](data-model.md) for full entity definitions.

**Key Entities**:
- `Tutorial`: Learning module metadata
- `TutorialStep`: Individual steps within a tutorial
- `UserProgress`: Completion tracking
- `SimulationScenario`: Pre-defined practice scenarios
- `CursorRule`: Rule template definitions

### API Contracts

See `/contracts/` directory:
- `tutorial-api.yaml`: Tutorial CRUD operations (local)
- `progress-api.yaml`: Progress tracking operations
- `simulator-api.yaml`: Simulation scenario loading

### Quick Start

See [quickstart.md](quickstart.md) for development setup.

### Constitution Re-check

**Post-Design Verification**: ALL PRINCIPLES MAINTAINED

| Principle | Design Compliance |
|-----------|-------------------|
| I. React State | TutorialContext + ProgressContext using Context API |
| II. Desktop-First | Breakpoints: 768px (tablet), 1280px+ (desktop) |
| III. Local Storage | progress-service.ts handles all persistence |
| IV. China Red Theme | tailwind.config.ts defines color tokens |
| V. Windows Dev | package.json scripts use cross-env |
| VI. Simplicity | No unnecessary abstractions, flat component hierarchy |

---

## Next Steps

1. Run `/speckit.tasks` to generate implementation tasks
2. Begin development following task priority order
