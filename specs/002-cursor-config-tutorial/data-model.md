# Data Model: Cursor 配置教程 + Agent 教程模块

**Date**: 2026-02-13
**Feature**: 002-cursor-config-tutorial

## Type Extensions

### TutorialCategory (修改)

```typescript
// src/types/tutorial.ts
// 现有: 'installation' | 'commands' | 'rules' | 'project'
// 新增: 'config' | 'agents'
export type TutorialCategory =
  | 'installation' | 'commands' | 'rules' | 'project'
  | 'config' | 'agents';
```

### AgentExample (新增)

```typescript
// src/types/tutorial.ts
export interface AgentExample {
  id: string;
  prompt: string;           // 用户输入的 prompt 文本
  response: string;         // Agent 模拟响应 (Markdown)
  type: 'vague' | 'constrained'; // 示例类型
  tutorialId: string;       // 关联教程 ID
  fileRefs?: string[];      // prompt 中引用的文件路径
}
```

### BeginnerTip (新增)

```typescript
// src/types/tutorial.ts
export interface BeginnerTip {
  id: string;
  title: string;            // 提示标题
  content: string;          // 通俗类比内容 (Markdown)
  concept: string;          // 关联的专业概念名称
  tutorialId: string;       // 关联教程 ID
}
```

### KeyboardShortcut (新增)

```typescript
// src/types/tutorial.ts
export type ShortcutCategory =
  | 'general' | 'chat' | 'inline-edit'
  | 'code-selection' | 'tab' | 'terminal';

export interface KeyboardShortcut {
  id: string;
  description: string;      // 功能描述
  windowsKey: string;       // Windows 快捷键
  macKey: string;            // macOS 快捷键
  category: ShortcutCategory;
}
```

### IgnorePattern (新增)

```typescript
// src/types/tutorial.ts
export interface IgnorePattern {
  pattern: string;           // 忽略模式字符串
  description: string;       // 说明
  matchExamples: string[];   // 匹配的示例文件路径
  noMatchExamples: string[]; // 不匹配的示例文件路径
}
```

## Entity Relationships

```
Tutorial (category: 'agents')
  ├── TutorialStep (type: 'content' | 'quiz')
  │   └── QuizQuestion (已有类型)
  ├── AgentExample[] (通过 tutorialId 关联)
  └── BeginnerTip[] (通过 tutorialId 关联)

Tutorial (category: 'config')
  ├── TutorialStep
  ├── KeyboardShortcut[] (仅快捷键教程)
  └── IgnorePattern[] (仅忽略文件教程)

UserProgress (不变)
  └── TutorialProgress[] (通过 tutorialId 关联所有教程)
```

## Data Files Structure

### 配置教程数据 (6 个文件)

每个文件导出一个 `Tutorial` 对象, 遵循现有模式:

```typescript
// src/data/tutorials/config-ignore.ts
export const configIgnoreTutorial: Tutorial = {
  id: 'config-ignore',
  title: '忽略文件配置',
  category: 'config',
  difficulty: 'beginner',
  order: 100,  // config 教程从 100 开始
  // ...
};
```

| 文件 | ID | order |
|------|-----|-------|
| config-ignore.ts | config-ignore | 100 |
| config-shortcuts.ts | config-shortcuts | 101 |
| config-extensions.ts | config-extensions | 102 |
| config-themes.ts | config-themes | 103 |
| config-shell.ts | config-shell | 104 |
| config-worktrees.ts | config-worktrees | 105 |

### Agent 教程数据 (7 个文件)

```typescript
// src/data/tutorials/agent-working.ts
export const agentWorkingTutorial: Tutorial = {
  id: 'agent-working',
  title: '使用 Agent',
  category: 'agents',
  difficulty: 'beginner',
  order: 200,  // agent 教程从 200 开始
  // ...
};
```

| 文件 | ID | order | 课程序号 |
|------|-----|-------|---------|
| agent-working.ts | agent-working | 200 | 1 |
| agent-codebase.ts | agent-codebase | 201 | 2 |
| agent-features.ts | agent-features | 202 | 3 |
| agent-bugs.ts | agent-bugs | 203 | 4 |
| agent-review.ts | agent-review | 204 | 5 |
| agent-customize.ts | agent-customize | 205 | 6 |
| agent-together.ts | agent-together | 206 | 7 |

### Agent 示例对话数据

```typescript
// src/data/agents/agent-examples.ts
export const agentExamples: AgentExample[] = [
  {
    id: 'vague-settings-page',
    prompt: 'Add a user settings page',
    response: '...',  // Markdown 格式的模拟响应
    type: 'vague',
    tutorialId: 'agent-working',
  },
  // ...
];
```

### 小白提示数据

```typescript
// src/data/agents/beginner-tips.ts
export const beginnerTips: BeginnerTip[] = [
  {
    id: 'tip-agent-harness',
    title: 'Agent Harness 是什么?',
    content: '想象你雇了一个助手...',
    concept: 'Agent Harness',
    tutorialId: 'agent-working',
  },
  // ...
];
```

### 快捷键数据

```typescript
// src/data/shortcuts/keyboard-shortcuts.ts
export const keyboardShortcuts: KeyboardShortcut[] = [
  {
    id: 'general-command-palette',
    description: '打开命令面板',
    windowsKey: 'Ctrl+Shift+P',
    macKey: 'Cmd+Shift+P',
    category: 'general',
  },
  // ...
];
```

## State Management

不引入新的 Context。所有新教程复用现有:
- `ProgressContext`: 进度追踪
- `TutorialContext`: 当前教程状态

快捷键平台切换状态复用 `UserPreferences.os` 字段。

## localStorage Schema (不变)

键: `cursor-tutorial:progress`
值: `UserProgress` JSON (现有结构不变, 新教程的进度自动追加到 `tutorials` 数组)
