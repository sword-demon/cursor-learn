[根目录](../../CLAUDE.md) > [src](../) > **components**

---

# Components 模块

**职责**: UI 组件库，包含通用组件、布局组件、教程组件、模拟器组件和规则生成器组件

---

## 子模块结构

```
components/
├── common/          # 通用 UI 组件
├── layout/          # 布局组件
├── tutorial/        # 教程相关组件
├── simulator/       # 代码编辑器模拟器
└── rules/           # 规则生成器组件
```

---

## Common 组件

### Button.tsx
- **职责**: 通用按钮组件
- **Props**: variant, size, disabled, onClick, children
- **Variants**: primary, secondary, outline, ghost
- **Sizes**: sm, md, lg

### Card.tsx
- **职责**: 卡片容器组件
- **Props**: padding, hover, className, children
- **Features**: 支持悬停效果、自定义内边距

### ProgressBar.tsx
- **职责**: 进度条组件
- **Props**: percentage, size, color, showLabel
- **Features**: 支持不同尺寸和颜色主题

---

## Layout 组件

### Header.tsx
- **职责**: 顶部导航栏
- **Features**:
  - Logo 和网站标题
  - 主导航菜单
  - 总体进度显示（CircularProgress）
  - 移动端菜单按钮
- **Dependencies**: ProgressContext, react-router-dom

### Sidebar.tsx
- **职责**: 侧边栏导航
- **Features**:
  - 按类别分组的教程列表
  - 完成状态指示器
  - 学习统计面板
- **Dependencies**: ProgressContext, tutorial-service

---

## Tutorial 组件

### CommandTutorial.tsx
- **职责**: 命令教程主组件
- **Features**:
  - 教程内容展示
  - 步骤导航
  - 模拟器集成
- **Dependencies**: TutorialContext

### InstallationSteps.tsx
- **职责**: 安装步骤指南
- **Features**:
  - OS 检测和特定指南
  - 下载按钮
  - 故障排除面板

---

## Simulator 组件

### CodeEditor.tsx
- **职责**: 简化的代码编辑器（使用 textarea 模拟）
- **Features**:
  - 语法高亮（简化版）
  - 行号显示
  - Tab 键支持
  - AI 建议提示
- **Props**: initialCode, language, onCodeChange, onTriggerAction, readOnly

### SimulationView.tsx
- **职责**: 模拟器主视图，协调编辑器、响应、提示等组件
- **Features**:
  - 场景加载和步骤管理
  - 用户操作处理
  - AI 响应显示
  - 提示面板
- **Dependencies**: CodeEditor, SimulatedResponse, HintPanel

### SimulatedResponse.tsx
- **职责**: 模拟 AI 响应显示
- **Features**:
  - 打字机效果
  - 代码高亮
  - 应用/关闭操作

### HintPanel.tsx
- **职责**: 提示面板
- **Features**:
  - 渐进式提示显示
  - 使用统计

---

## Rules 组件

### RuleBuilderForm.tsx
- **职责**: 规则生成表单
- **Features**:
  - 模板选择
  - 动态表单字段
  - 实时预览

### RulePreview.tsx
- **职责**: 规则预览
- **Features**:
  - 生成的 .cursorrules 内容显示
  - 复制功能

### RuleTemplateSelector.tsx
- **职责**: 规则模板选择器
- **Features**:
  - 分类显示模板
  - 模板描述和示例

---

## 使用示例

```tsx
// Button 使用
<Button variant="primary" size="md" onClick={handleClick}>
  点击我
</Button>

// Card 使用
<Card hover padding="lg">
  <CardContent>
    <h3>标题</h3>
    <p>内容</p>
  </CardContent>
</Card>

// ProgressBar 使用
<ProgressBar percentage={75} size="md" showLabel={true} />
```

---

## 依赖关系

```
common/ -> 无外部依赖
layout/ -> common/, contexts/
tutorial/ -> common/, simulator/, contexts/
simulator/ -> common/, hooks/
rules/ -> common/, data/
```

---

## 变更记录

### 2026-02-13 - 初始版本

- 创建组件模块文档
- 记录主要组件职责和接口
