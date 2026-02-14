# Quick Start: Spec-Kit 交互式教程开发

**Date**: 2026-02-14

---

## 前置条件

- Node.js 18+
- npm 9+
- 项目已 clone 并安装依赖

## 开发启动

```powershell
# 安装依赖 (如果尚未安装)
npm install

# 启动开发服务器
npm run dev
```

## 开发顺序

### Step 1: 类型扩展

在 `src/types/tutorial.ts` 中为 `TutorialCategory` 添加 `'spec-kit'`。

### Step 2: 新增组件

1. 创建 `src/components/speckit/TerminalSimulator.tsx`
2. 创建 `src/components/speckit/WorkflowDiagram.tsx`

### Step 3: 新增数据文件

1. 创建 `src/data/tutorials/speckit-install.ts`
2. 创建 `src/data/tutorials/speckit-workflow.ts`
3. 创建 `src/data/tutorials/speckit-case.ts`
4. 创建 `src/data/tutorials/speckit-advanced.ts`

### Step 4: 新增页面

1. 创建 `src/pages/SpecKit/SpecKitPage.tsx` (模块首页)
2. 创建 `src/pages/SpecKit/SpecKitInstallPage.tsx`
3. 创建 `src/pages/SpecKit/SpecKitWorkflowPage.tsx`
4. 创建 `src/pages/SpecKit/SpecKitCasePage.tsx`
5. 创建 `src/pages/SpecKit/SpecKitAdvancedPage.tsx`

### Step 5: 路由注册

在 `src/App.tsx` 中添加 spec-kit 相关路由:
- `/spec-kit` → SpecKitPage
- `/spec-kit/install` → SpecKitInstallPage
- `/spec-kit/workflow` → SpecKitWorkflowPage
- `/spec-kit/case` → SpecKitCasePage
- `/spec-kit/advanced` → SpecKitAdvancedPage

### Step 6: 导航集成

在 Sidebar 和 HomePage 中添加 spec-kit 教程模块入口。

## 验证

```powershell
# 运行测试
npm run test

# 代码检查
npm run lint

# 生产构建验证
npm run build
```

## 关键文件参考

- 现有教程页面模式: `src/pages/Agents/AgentsPage.tsx`
- 通用组件: `src/components/common/`
- 教程数据格式: `src/data/tutorials/agent-working.ts`
- 进度追踪: `src/contexts/ProgressContext.tsx`
- 类型定义: `src/types/tutorial.ts`
