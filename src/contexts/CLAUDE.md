[根目录](../../CLAUDE.md) > [src](../) > **contexts**

---

# Contexts 模块

**职责**: React Contexts，管理全局状态

---

## Context 列表

### TutorialContext

**文件**: `TutorialContext.tsx`

**职责**: 管理当前教程的状态和导航

**Provider**: `TutorialProvider`

**Hook**: `useTutorial()`

**State**:
- `currentTutorial: Tutorial | null` - 当前加载的教程
- `currentStepId: string | null` - 当前步骤 ID
- `isLoading: boolean` - 加载状态
- `error: string | null` - 错误信息

**Actions**:
- `loadTutorial(tutorialId: string)` - 加载教程
- `goToStep(stepId: string)` - 跳转到指定步骤
- `goToNextStep()` - 下一步
- `goToPreviousStep()` - 上一步
- `markStepComplete()` - 标记当前步骤完成

**Computed**:
- `currentStep: TutorialStep | null` - 当前步骤对象
- `canGoNext: boolean` - 是否可以前进
- `canGoPrevious: boolean` - 是否可以后退
- `isStepCompleted(stepId): boolean` - 步骤是否完成
- `progressPercentage: number` - 进度百分比

**Dependencies**: ProgressContext, tutorial-service

---

### ProgressContext

**文件**: `ProgressContext.tsx`

**职责**: 管理用户学习进度和偏好设置

**Provider**: `ProgressProvider`

**Hook**: `useProgress()`

**State**:
- `progress: UserProgress | null` - 用户进度数据
- `isLoading: boolean` - 加载状态

**Actions**:
- `startTutorial(tutorialId: string)` - 开始教程
- `completeStep(tutorialId, stepId)` - 完成步骤
- `completeTutorial(tutorialId)` - 完成教程
- `recordSimulationResult(tutorialId, result)` - 记录模拟结果
- `updatePreferences(preferences)` - 更新偏好设置
- `getTutorialProgress(tutorialId)` - 获取教程进度
- `refreshProgress()` - 刷新进度

**Dependencies**: progress-service

**Storage**: localStorage (`cursor-tutorial:progress`)

---

## 使用示例

```tsx
// 在组件中使用 TutorialContext
function TutorialPage() {
  const {
    currentTutorial,
    currentStep,
    goToNextStep,
    markStepComplete,
    progressPercentage
  } = useTutorial();

  return (
    <div>
      <h1>{currentTutorial?.title}</h1>
      <p>进度: {progressPercentage}%</p>
      <div>{currentStep?.content}</div>
      <button onClick={() => {
        markStepComplete();
        goToNextStep();
      }}>
        下一步
      </button>
    </div>
  );
}

// 在组件中使用 ProgressContext
function ProgressBar() {
  const { progress, completeStep } = useProgress();

  return (
    <div>
      <p>已完成教程: {progress?.stats.totalTutorialsCompleted}</p>
      <p>已完成步骤: {progress?.stats.totalStepsCompleted}</p>
    </div>
  );
}
```

---

## Context 层级

```
App.tsx
└── ProgressProvider
    └── TutorialProvider
        └── Routes/Pages
```

---

## 注意事项

1. **必须在 Provider 内使用**: 使用 `useTutorial()` 和 `useProgress()` 的组件必须包裹在对应的 Provider 内
2. **初始化时机**: ProgressContext 在挂载时自动从 localStorage 加载数据
3. **数据持久化**: 所有进度变更自动保存到 localStorage

---

## 变更记录

### 2026-02-13 - 初始版本

- 创建 contexts 模块文档
- 记录 TutorialContext 和 ProgressContext 的接口
