[根目录](../../CLAUDE.md) > [src](../) > **types**

---

# Types 模块

**职责**: TypeScript 类型定义

---

## 文件结构

```
types/
├── index.ts        # 类型导出聚合
├── tutorial.ts     # 教程相关类型
├── simulation.ts   # 模拟器相关类型
└── user.ts         # 用户和进度相关类型
```

---

## tutorial.ts

### 核心类型

```typescript
// 难度等级
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// 教程类别
type TutorialCategory = 'installation' | 'commands' | 'rules' | 'project';

// 步骤类型
type StepType = 'content' | 'simulation' | 'practice' | 'quiz';

// 完成标准类型
type CompletionCriteriaType = 'view' | 'action' | 'success' | 'time';
```

### 主要接口

```typescript
interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: number; // 分钟
  category: TutorialCategory;
  order: number;
  prerequisites: string[];
  steps: TutorialStep[];
  isPublished: boolean;
}

interface TutorialStep {
  id: string;
  order: number;
  title: string;
  content: string; // Markdown 内容
  type: StepType;
  simulationId?: string;
  quiz?: QuizQuestion;
  nextStepId?: string;
  previousStepId?: string;
  completionCriteria: CompletionCriteria;
}

interface CompletionCriteria {
  type: CompletionCriteriaType;
  params?: Record<string, any>;
}

interface QuizQuestion {
  question: string;
  type: 'single' | 'multiple' | 'true-false';
  options: QuizOption[];
  correctAnswer: string | string[];
  explanation: string;
}

interface QuizOption {
  id: string;
  text: string;
}

interface TutorialSummary {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: number;
  category: TutorialCategory;
  isCompleted?: boolean;
  progress?: number;
}
```

### CursorRules 相关类型

```typescript
type RuleFieldType = 'text' | 'textarea' | 'select' | 'multiselect' | 'boolean';
type RuleCategory = 'coding-style' | 'framework' | 'communication' | 'custom';

interface RuleField {
  id: string;
  label: string;
  type: RuleFieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required: boolean;
  defaultValue?: any;
}

interface RuleExample {
  id: string;
  title: string;
  description: string;
  ruleContent: string;
  beforeExample?: string;
  afterExample?: string;
}

interface CursorRuleTemplate {
  id: string;
  category: RuleCategory;
  name: string;
  description: string;
  fields: RuleField[];
  template: string;
  examples: RuleExample[];
  order: number;
}
```

---

## simulation.ts

### 核心类型

```typescript
type CommandType = 'tab' | 'ctrl-k' | 'ctrl-l' | 'at-mention';
type ResponseType = 'code-completion' | 'inline-edit' | 'chat-message' | 'context-menu';
type TriggerType = 'keystroke' | 'command' | 'click';
```

### 主要接口

```typescript
interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  language: string;
  targetCommand: TargetCommand;
  steps: SimulationStep[];
  hints: string[];
}

interface TargetCommand {
  type: CommandType;
  shortcut: string;
  description: string;
}

interface SimulationStep {
  order: number;
  instruction: string;
  trigger: Trigger;
  response: SimulatedResponse;
  validation?: StepValidation;
}

interface Trigger {
  type: TriggerType;
  value: string;
}

interface SimulatedResponse {
  type: ResponseType;
  content: string;
  delay?: number; // ms
  metadata?: {
    confidence?: number;
    alternatives?: string[];
  };
}

interface StepValidation {
  expectedInput?: string;
  expectedCodeChange?: string;
}
```

---

## user.ts

### 核心类型

```typescript
type OSType = 'windows' | 'macos' | 'linux';
type ThemeType = 'light' | 'dark' | 'system';
type TutorialStatus = 'not-started' | 'in-progress' | 'completed';
```

### 主要接口

```typescript
interface UserProgress {
  userId: string;
  startedAt: string; // ISO date
  lastActiveAt: string; // ISO date
  tutorials: TutorialProgress[];
  stats: UserStats;
  preferences: UserPreferences;
}

interface TutorialProgress {
  tutorialId: string;
  status: TutorialStatus;
  currentStepId: string | null;
  completedStepIds: string[];
  startedAt: string | null; // ISO date
  completedAt: string | null; // ISO date
  lastAccessedAt: string; // ISO date
  simulationResults: SimulationResult[];
}

interface SimulationResult {
  scenarioId: string;
  attempts: number;
  successful: boolean;
  completedAt: string; // ISO date
  timeSpent: number; // 秒
  hintsUsed: number;
}

interface UserStats {
  totalTutorialsCompleted: number;
  totalStepsCompleted: number;
  totalTimeSpent: number; // 分钟
  favoriteCommand?: string;
}

interface UserPreferences {
  os: OSType | null;
  theme: ThemeType;
  editorFontSize: number;
  reduceMotion: boolean;
}
```

---

## index.ts

聚合导出所有类型：

```typescript
export type {
  Tutorial, TutorialStep, TutorialSummary,
  DifficultyLevel, TutorialCategory, StepType,
  CompletionCriteriaType, CompletionCriteria,
  QuizQuestion, QuizOption,
  CursorRuleTemplate, RuleField, RuleExample,
  RuleFieldType, RuleCategory,
} from './tutorial';

export type {
  SimulationScenario, SimulationStep, SimulatedResponse,
  TargetCommand, CommandType, ResponseType,
  TriggerType, Trigger, StepValidation,
} from './simulation';

export type {
  UserProgress, TutorialProgress, SimulationResult,
  UserStats, UserPreferences,
  OSType, ThemeType, TutorialStatus,
} from './user';
```

---

## 使用示例

```typescript
import type { Tutorial, SimulationScenario, UserProgress } from '../types';

// 使用类型
const tutorial: Tutorial = {
  id: 'installation',
  title: '安装指南',
  // ...
};

// 函数参数类型
function loadTutorial(id: string): Promise<Tutorial | undefined> {
  // ...
}

// 泛型约束
function saveProgress<T extends UserProgress>(progress: T): void {
  // ...
}
```

---

## 变更记录

### 2026-02-13 - 初始版本

- 创建 types 模块文档
- 记录所有类型定义和接口
