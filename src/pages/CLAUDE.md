[根目录](../../CLAUDE.md) > [src](../) > **pages**

---

# Pages 模块

**职责**: 路由页面组件

---

## 文件结构

```
pages/
├── Home/
│   └── HomePage.tsx
├── Installation/
│   └── InstallationPage.tsx
├── Commands/
│   └── CommandsPage.tsx
├── ProjectTutorial/
│   └── ProjectTutorialPage.tsx
└── RulesBuilder/
    └── RulesBuilderPage.tsx
```

---

## 路由映射

| 路径 | 组件 | 布局 | 描述 |
|------|------|------|------|
| `/` | HomePage | SimpleLayout | 首页和学习路径概览 |
| `/installation` | InstallationPage | TutorialLayout | 安装指南 |
| `/commands` | CommandsPage | TutorialLayout | 命令教程列表 |
| `/commands/:commandId` | CommandTutorial | TutorialLayout | 具体命令教程 |
| `/rules` | RulesBuilderPage | TutorialLayout | .cursorrules 生成器 |
| `/project` | ProjectTutorialPage | TutorialLayout | 项目实战教程 |

---

## HomePage

**文件**: `Home/HomePage.tsx`

**职责**: 网站首页，展示学习路径和总体进度

**Features**:
- Hero 区域（欢迎信息和 CTA 按钮）
- 学习统计概览（已完成教程、步骤、时长）
- 学习路径卡片（安装指南、命令教程、规则生成器、项目实战）
- 所有教程列表

**Dependencies**:
- ProgressContext
- tutorial-service
- common/Button, common/Card, common/ProgressBar

---

## InstallationPage

**文件**: `Installation/InstallationPage.tsx`

**职责**: Cursor 安装指南页面

**Features**:
- OS 检测和自动选择
- 分步骤安装指导
- 下载按钮
- 故障排除面板
- LLM 配置说明

**Dependencies**:
- TutorialContext
- tutorial/InstallationSteps, tutorial/OSDetector

---

## CommandsPage

**文件**: `Commands/CommandsPage.tsx`

**职责**: 命令教程列表页面

**Features**:
- 命令分类展示
- 教程卡片网格
- 进度显示
- 难度筛选

**Dependencies**:
- tutorial-service
- common/Card, common/ProgressBar

---

## CommandTutorial

**文件**: `components/tutorial/CommandTutorial.tsx`

**职责**: 具体命令教程页面（组件级别）

**Features**:
- 教程内容展示
- 步骤导航
- 模拟器集成
- 完成状态跟踪

**Dependencies**:
- TutorialContext
- simulator/SimulationView

---

## RulesBuilderPage

**文件**: `RulesBuilder/RulesBuilderPage.tsx`

**职责**: .cursorrules 文件生成器页面

**Features**:
- 模板选择器
- 动态表单（根据模板）
- 实时预览
- 复制生成的规则
- 使用示例

**Dependencies**:
- data/cursor-rule-templates
- rules/RuleTemplateSelector, rules/RuleBuilderForm, rules/RulePreview

---

## ProjectTutorialPage

**文件**: `ProjectTutorial/ProjectTutorialPage.tsx`

**职责**: 项目实战教程页面

**Features**:
- 项目介绍
- 分步骤指导
- 代码示例
- 模拟器练习

**Dependencies**:
- TutorialContext
- tutorial/ProjectTutorial

---

## 布局组件

### TutorialLayout

**位置**: `App.tsx`

**结构**:
```tsx
<div className="min-h-screen">
  <Header />
  <div className="flex">
    <Sidebar />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
</div>
```

### SimpleLayout

**位置**: `App.tsx`

**结构**:
```tsx
<div className="min-h-screen">
  <Header />
  <main>
    <Outlet />
  </main>
</div>
```

---

## 页面开发指南

### 创建新页面

1. 在 `pages/` 下创建新目录
2. 创建 `XXXPage.tsx` 文件
3. 在 `App.tsx` 中添加路由
4. 在 `Header.tsx` 中添加导航项（如需要）

### 页面模板

```tsx
import { useProgress } from '../../contexts/ProgressContext';

export function NewPage() {
  const { progress } = useProgress();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">页面标题</h1>
      {/* 页面内容 */}
    </div>
  );
}
```

---

## 变更记录

### 2026-02-13 - 初始版本

- 创建 pages 模块文档
- 记录所有页面组件和路由映射
