[根目录](../../CLAUDE.md) > [src](../) > **services**

---

# Services 模块

**职责**: 业务逻辑服务层，处理数据获取、状态管理和业务规则

---

## Service 列表

### tutorial-service

**文件**: `tutorial-service.ts`

**职责**: 教程数据管理和查询

**Data**: 内置教程注册表
- installationTutorial
- commandsTabTutorial
- commandsCtrlKTutorial
- commandsCtrlLTutorial
- commandsAtTutorial
- rulesTutorial
- projectTodoTutorial

**Functions**:
```typescript
// 获取所有已发布的教程
getAllTutorials(): Tutorial[]

// 获取教程摘要（不含步骤详情）
getTutorialSummaries(): TutorialSummary[]

// 根据 ID 获取教程
getTutorialById(id: string): Tutorial | undefined

// 按类别筛选
getTutorialsByCategory(category: string): Tutorial[]

// 按难度筛选
getTutorialsByDifficulty(difficulty: string): Tutorial[]

// 获取下一步 ID
getNextStepId(tutorial: Tutorial, currentStepId: string): string | null

// 获取上一步 ID
getPreviousStepId(tutorial: Tutorial, currentStepId: string): string | null

// 计算进度百分比
calculateProgress(tutorial: Tutorial, completedStepIds: string[]): number
```

---

### progress-service

**文件**: `progress-service.ts`

**职责**: 用户进度管理和 localStorage 持久化

**Storage Keys**:
- `cursor-tutorial:progress` - 用户进度数据

**Functions**:
```typescript
// 初始化新用户进度
initUserProgress(): UserProgress

// 从 localStorage 获取进度
getUserProgress(): UserProgress | null

// 保存进度到 localStorage
saveUserProgress(progress: UserProgress): void

// 获取或初始化进度
getOrInitUserProgress(): UserProgress

// 获取特定教程进度
getTutorialProgress(progress: UserProgress, tutorialId: string): TutorialProgress | undefined

// 开始教程
startTutorial(progress: UserProgress, tutorialId: string): UserProgress

// 更新教程进度
updateTutorialProgress(
  progress: UserProgress,
  tutorialId: string,
  updates: Partial<TutorialProgress>
): UserProgress

// 标记步骤完成
completeStep(progress: UserProgress, tutorialId: string, stepId: string): UserProgress

// 标记教程完成
completeTutorial(progress: UserProgress, tutorialId: string): UserProgress

// 记录模拟结果
recordSimulationResult(
  progress: UserProgress,
  tutorialId: string,
  result: SimulationResult
): UserProgress

// 更新用户偏好设置
updatePreferences(
  progress: UserProgress,
  preferences: Partial<UserPreferences>
): UserProgress
```

**Default Values**:
```typescript
const defaultPreferences: UserPreferences = {
  os: null,
  theme: 'system',
  editorFontSize: 14,
  reduceMotion: false,
};

const defaultStats = {
  totalTutorialsCompleted: 0,
  totalStepsCompleted: 0,
  totalTimeSpent: 0,
};
```

---

### simulator-service

**文件**: `simulator-service.ts`

**职责**: 模拟场景管理和交互验证

**Data**: 所有模拟场景集合
- tabScenarios
- ctrlKScenarios
- ctrlLScenarios
- atScenarios

**Functions**:
```typescript
// 获取所有场景
getAllScenarios(): SimulationScenario[]

// 根据 ID 获取场景
getScenarioById(id: string): SimulationScenario | undefined

// 按命令类型获取场景
getScenariosByCommandType(
  commandType: 'tab' | 'ctrl-k' | 'ctrl-l' | 'at-mention'
): SimulationScenario[]

// 获取当前步骤
getCurrentStep(scenario: SimulationScenario, stepOrder: number): SimulationStep | undefined

// 验证用户操作
validateUserAction(
  step: SimulationStep,
  actionType: string,
  actionValue: string
): boolean

// 检查是否有下一步
hasNextStep(scenario: SimulationScenario, currentStepOrder: number): boolean

// 获取下一步
getNextStep(scenario: SimulationScenario, currentStepOrder: number): SimulationStep | undefined

// 计算模拟结果
calculateSimulationResult(
  scenario: SimulationScenario,
  completedSteps: number[],
  hintsUsed: number,
  startTime: number
): SimulationResult

// 获取提示
getHint(scenario: SimulationScenario, stepOrder: number, hintIndex: number): string | undefined

// 获取所有提示
getAllHints(scenario: SimulationScenario): string[]

// 搜索场景
searchScenarios(query: string): SimulationScenario[]
```

---

## 数据流

```
UI Components
    |
    v
Contexts (TutorialContext, ProgressContext)
    |
    v
Services (tutorial-service, progress-service, simulator-service)
    |
    v
Data / localStorage
```

---

## 使用示例

```tsx
// 在 Context 中使用 service
import { getTutorialById, getAllTutorials } from '../services/tutorial-service';
import { getOrInitUserProgress, completeStep } from '../services/progress-service';

// 加载教程
const tutorial = getTutorialById('installation');

// 获取所有教程
const tutorials = getAllTutorials();

// 获取或初始化进度
const progress = getOrInitUserProgress();

// 标记步骤完成
const updatedProgress = completeStep(progress, 'installation', 'step-1');
```

---

## 变更记录

### 2026-02-13 - 初始版本

- 创建 services 模块文档
- 记录 tutorial-service、progress-service、simulator-service 接口
