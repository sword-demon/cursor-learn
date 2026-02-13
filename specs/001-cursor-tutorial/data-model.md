# Data Model: Cursor Tutorial Website

**Date**: 2026-02-13
**Storage**: localStorage (client-side only)

---

## Entity Overview

```
Tutorial (1) ───< (*) TutorialStep
    │
    └──< (*) SimulationScenario

UserProgress (1) ───< (*) TutorialProgress

CursorRuleTemplate (1) ───< (*) RuleExample
```

---

## Entity Definitions

### Tutorial

A learning module containing multiple steps.

```typescript
interface Tutorial {
  id: string;                    // Unique identifier: 'installation', 'commands-tab', etc.
  title: string;                 // Display title
  description: string;           // Short description
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;         // Minutes
  category: 'installation' | 'commands' | 'rules' | 'project';
  order: number;                 // Display order
  prerequisites: string[];       // Tutorial IDs that should be completed first
  steps: TutorialStep[];         // Ordered steps
  isPublished: boolean;          // Visibility flag
}
```

**Example**:
```json
{
  "id": "commands-tab",
  "title": "Tab 自动补全",
  "description": "学习如何使用 Tab 键快速完成代码",
  "difficulty": "beginner",
  "estimatedTime": 5,
  "category": "commands",
  "order": 1,
  "prerequisites": ["installation"],
  "steps": [...],
  "isPublished": true
}
```

---

### TutorialStep

Individual step within a tutorial.

```typescript
interface TutorialStep {
  id: string;                    // Unique within tutorial
  order: number;                 // Step sequence
  title: string;                 // Step title
  content: string;               // Markdown content
  type: 'content' | 'simulation' | 'practice' | 'quiz';

  // For simulation/practice steps
  simulationId?: string;         // Reference to SimulationScenario

  // For quiz steps
  quiz?: QuizQuestion;

  // Navigation
  nextStepId?: string;           // Override default next
  previousStepId?: string;       // Override default previous

  // Completion criteria
  completionCriteria: {
    type: 'view' | 'action' | 'success' | 'time';
    params?: Record<string, any>;
  };
}
```

**Example**:
```json
{
  "id": "tab-intro",
  "order": 1,
  "title": "Tab 键简介",
  "content": "Tab 键是 Cursor 最核心的功能...",
  "type": "content",
  "completionCriteria": { "type": "view" }
}
```

---

### SimulationScenario

Pre-defined coding scenario for practice.

```typescript
interface SimulationScenario {
  id: string;
  title: string;
  description: string;

  // Initial state
  initialCode: string;           // Starting code in editor
  language: string;              // 'javascript', 'typescript', 'python', etc.

  // Command to practice
  targetCommand: {
    type: 'tab' | 'ctrl-k' | 'ctrl-l' | 'at-mention';
    shortcut: string;            // Display shortcut
    description: string;
  };

  // Expected interaction
  steps: SimulationStep[];

  // Hints for stuck users
  hints: string[];
}

interface SimulationStep {
  order: number;
  instruction: string;           // What user should do
  trigger: {                     // What triggers this step
    type: 'keystroke' | 'command' | 'click';
    value: string;               // e.g., 'Tab', 'Ctrl+K'
  };
  response: {                    // Simulated AI response
    type: 'code-completion' | 'inline-edit' | 'chat-message' | 'context-menu';
    content: string;
    delay?: number;              // Simulate thinking time (ms)
  };
  validation?: {                 // Optional validation
    expectedInput?: string;
    expectedCodeChange?: string;
  };
}
```

**Example**:
```json
{
  "id": "tab-function-completion",
  "title": "函数补全练习",
  "description": "使用 Tab 完成一个函数定义",
  "initialCode": "function calculateSum(a, b) {\n  // 在这里开始输入\n}",
  "language": "javascript",
  "targetCommand": {
    "type": "tab",
    "shortcut": "Tab",
    "description": "自动补全代码"
  },
  "steps": [
    {
      "order": 1,
      "instruction": "在第2行输入 'return a +' 然后按 Tab 键",
      "trigger": { "type": "keystroke", "value": "Tab" },
      "response": {
        "type": "code-completion",
        "content": "return a + b;",
        "delay": 300
      }
    }
  ],
  "hints": [
    "先输入 'return a +' 触发 AI 建议",
    "当看到灰色提示时，按 Tab 接受"
  ]
}
```

---

### UserProgress

Overall user progress across all tutorials.

```typescript
interface UserProgress {
  userId: string;                // Anonymous ID (generated)
  startedAt: string;             // ISO date
  lastActiveAt: string;          // ISO date

  // Tutorial progress
  tutorials: TutorialProgress[];

  // Global stats
  stats: {
    totalTutorialsCompleted: number;
    totalStepsCompleted: number;
    totalTimeSpent: number;      // Minutes
    favoriteCommand?: string;
  };

  // User preferences
  preferences: {
    os: 'windows' | 'macos' | 'linux' | null;
    theme: 'light' | 'dark' | 'system';
    editorFontSize: number;
    reduceMotion: boolean;
  };
}
```

---

### TutorialProgress

Progress for a specific tutorial.

```typescript
interface TutorialProgress {
  tutorialId: string;
  status: 'not-started' | 'in-progress' | 'completed';

  // Step tracking
  currentStepId: string | null;
  completedStepIds: string[];

  // Timing
  startedAt: string | null;      // ISO date
  completedAt: string | null;    // ISO date
  lastAccessedAt: string;        // ISO date

  // Simulation results
  simulationResults: SimulationResult[];
}

interface SimulationResult {
  scenarioId: string;
  attempts: number;
  successful: boolean;
  completedAt: string;
  timeSpent: number;             // Seconds
  hintsUsed: number;
}
```

---

### CursorRuleTemplate

Template for generating .cursorrules files.

```typescript
interface CursorRuleTemplate {
  id: string;
  category: 'coding-style' | 'framework' | 'communication' | 'custom';
  name: string;
  description: string;

  // Form fields for user input
  fields: RuleField[];

  // Template for generating rule text
  template: string;              // Template string with placeholders

  // Examples
  examples: RuleExample[];

  // Priority order in UI
  order: number;
}

interface RuleField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'boolean';
  placeholder?: string;
  options?: { value: string; label: string }[];  // For select types
  required: boolean;
  defaultValue?: any;
}

interface RuleExample {
  id: string;
  title: string;
  description: string;
  ruleContent: string;           // Example .cursorrules content
  beforeExample?: string;        // Code before applying rule
  afterExample?: string;         // Code after applying rule
}
```

**Example**:
```json
{
  "id": "coding-style",
  "category": "coding-style",
  "name": "代码风格",
  "description": "定义你的代码格式偏好",
  "fields": [
    {
      "id": "indentation",
      "label": "缩进风格",
      "type": "select",
      "options": [
        { "value": "spaces-2", "label": "2个空格" },
        { "value": "spaces-4", "label": "4个空格" },
        { "value": "tabs", "label": "Tab" }
      ],
      "required": true,
      "defaultValue": "spaces-2"
    },
    {
      "id": "semicolons",
      "label": "使用分号",
      "type": "boolean",
      "required": true,
      "defaultValue": true
    }
  ],
  "template": "Always use {{indentation}} for indentation.{{#if semicolons}} Always use semicolons.{{else}} Omit semicolons when possible.{{/if}}",
  "examples": [...],
  "order": 1
}
```

---

### QuizQuestion (Embedded in TutorialStep)

```typescript
interface QuizQuestion {
  question: string;
  type: 'single' | 'multiple' | 'true-false';
  options: QuizOption[];
  correctAnswer: string | string[];
  explanation: string;           // Explanation after answering
}

interface QuizOption {
  id: string;
  text: string;
}
```

---

## localStorage Schema

### Keys

```typescript
// Main storage keys
const STORAGE_KEYS = {
  USER_PROGRESS: 'cursor-tutorial:progress',
  USER_PREFERENCES: 'cursor-tutorial:preferences',
  ANONYMOUS_ID: 'cursor-tutorial:anonymous-id'
} as const;
```

### Data Size Estimates

| Entity | Estimated Size | Max Items | Total |
|--------|---------------|-----------|-------|
| Tutorial (static) | 5KB | 20 | 100KB |
| UserProgress | 2KB | 1 | 2KB |
| TutorialProgress | 500B | 20 | 10KB |
| Preferences | 500B | 1 | 500B |
| **Total** | - | - | **~15KB** |

Well within localStorage limits (5-10MB).

---

## Data Migration Strategy

### Versioning

```typescript
interface StorageSchema {
  version: number;               // Current schema version
  data: UserProgress;
}

const CURRENT_VERSION = 1;

// Migration example for future updates
function migrateData(stored: any): UserProgress {
  const version = stored.version || 0;

  if (version < 1) {
    // Migrate from v0 to v1
    stored.data.preferences = { ...defaultPreferences, ...stored.data.preferences };
  }

  return stored.data;
}
```

---

## TypeScript Type Exports

```typescript
// types/index.ts
export type {
  Tutorial,
  TutorialStep,
  SimulationScenario,
  SimulationStep,
  UserProgress,
  TutorialProgress,
  SimulationResult,
  CursorRuleTemplate,
  RuleField,
  RuleExample,
  QuizQuestion
} from './tutorial';

export type { CompletionCriteria, SimulationResponse } from './simulation';
export type { UserPreferences } from './user';
```
