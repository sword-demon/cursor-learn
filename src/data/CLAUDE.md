[根目录](../../CLAUDE.md) > [src](../) > **data**

---

# Data 模块

**职责**: 静态数据和教程内容

---

## 文件结构

```
data/
├── cursor-rule-templates.ts    # CursorRules 模板定义
├── tutorials/                  # 教程数据
│   ├── installation.ts
│   ├── commands-tab.ts
│   ├── commands-ctrl-k.ts
│   ├── commands-ctrl-l.ts
│   ├── commands-at.ts
│   ├── rules.ts
│   └── project-todo.ts
└── scenarios/                  # 模拟场景数据
    ├── tab-scenarios.ts
    ├── ctrl-k-scenarios.ts
    ├── ctrl-l-scenarios.ts
    └── at-scenarios.ts
```

---

## cursor-rule-templates.ts

**职责**: 定义 .cursorrules 文件生成器的模板

**导出**:
```typescript
cursorRuleTemplates: CursorRuleTemplate[]
getAllTemplates(): CursorRuleTemplate[]
getTemplateById(id: string): CursorRuleTemplate | undefined
getDefaultTemplate(): CursorRuleTemplate
```

**模板类别**:

1. **coding-style** - 代码风格
   - 缩进风格（2空格/4空格/Tab）
   - 分号使用
   - 引号风格
   - 最大行长度
   - 尾随逗号

2. **framework** - 框架偏好
   - 前端框架（React/Vue/Angular/Svelte）
   - CSS方案（Tailwind/CSS Modules/Styled Components）
   - 状态管理（Redux/Zustand/Context/Pinia）
   - 主要语言（TypeScript/JavaScript/Python/Go/Rust）

3. **communication** - 沟通风格
   - 沟通语气（专业/轻松/简洁/详细）
   - 代码注释级别
   - 是否解释推理过程
   - 是否提供替代方案
   - 是否包含示例

4. **custom** - 自定义规则
   - 完全自定义的 .cursorrules 内容

---

## tutorials/

### installation.ts

**ID**: `installation`

**描述**: Cursor 安装指南

**步骤**:
1. 欢迎使用 Cursor
2. 下载 Cursor
3. Windows 安装步骤
4. macOS 安装步骤
5. Linux 安装步骤
6. 初始设置
7. 配置 LLM
8. 常见问题
9. 安装完成

---

### commands-tab.ts

**ID**: `commands-tab`

**描述**: Tab 自动补全教程

**内容**: Tab 键的使用方法和练习场景

---

### commands-ctrl-k.ts

**ID**: `commands-ctrl-k`

**描述**: Ctrl+K 内联编辑教程

**内容**: 内联编辑功能的使用方法

---

### commands-ctrl-l.ts

**ID**: `commands-ctrl-l`

**描述**: Ctrl+L 聊天面板教程

**内容**: AI 聊天功能的使用方法

---

### commands-at.ts

**ID**: `commands-at`

**描述**: @-mentions 上下文引用教程

**内容**: 如何使用 @ 符号引用文件、代码、文档

---

### rules.ts

**ID**: `rules`

**描述**: .cursorrules 编写教程

**内容**: 如何编写和配置 .cursorrules 文件

---

### project-todo.ts

**ID**: `project-todo`

**描述**: 待办事项项目实战

**内容**: 通过实际项目练习所有学习内容

---

## scenarios/

### tab-scenarios.ts

**导出**:
```typescript
tabScenarios: SimulationScenario[]
getTabScenarioById(id: string): SimulationScenario | undefined
```

**场景示例**:
- 函数补全练习
- 变量命名补全
- 代码块补全

---

### ctrl-k-scenarios.ts

**导出**:
```typescript
ctrlKScenarios: SimulationScenario[]
getCtrlKScenarioById(id: string): SimulationScenario | undefined
```

**场景示例**:
- 代码重构
- 添加注释
- 修复错误

---

### ctrl-l-scenarios.ts

**导出**:
```typescript
ctrlLScenarios: SimulationScenario[]
getCtrlLScenarioById(id: string): SimulationScenario | undefined
```

**场景示例**:
- 代码解释
- 功能建议
- 调试帮助

---

### at-scenarios.ts

**导出**:
```typescript
atScenarios: SimulationScenario[]
getAtScenarioById(id: string): SimulationScenario | undefined
```

**场景示例**:
- 引用文件
- 引用代码块
- 引用文档

---

## 数据格式示例

### Tutorial 结构

```typescript
export const installationTutorial: Tutorial = {
  id: 'installation',
  title: 'Cursor 安装指南',
  description: '学习如何在 Windows、macOS 或 Linux 上安装和配置 Cursor IDE',
  difficulty: 'beginner',
  estimatedTime: 10,
  category: 'installation',
  order: 1,
  prerequisites: [],
  isPublished: true,
  steps: [
    {
      id: 'intro',
      order: 1,
      title: '欢迎使用 Cursor',
      content: '...',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    // ...
  ],
};
```

### SimulationScenario 结构

```typescript
export const tabFunctionCompletion: SimulationScenario = {
  id: 'tab-function-completion',
  title: '函数补全练习',
  description: '使用 Tab 完成一个函数定义',
  initialCode: 'function calculateSum(a, b) {\n  // 在这里开始输入\n}',
  language: 'javascript',
  targetCommand: {
    type: 'tab',
    shortcut: 'Tab',
    description: '自动补全代码',
  },
  steps: [
    {
      order: 1,
      instruction: '在第2行输入 "return a +" 然后按 Tab 键',
      trigger: { type: 'keystroke', value: 'Tab' },
      response: {
        type: 'code-completion',
        content: 'return a + b;',
        delay: 300,
      },
    },
  ],
  hints: [
    '先输入 "return a +" 触发 AI 建议',
    '当看到灰色提示时，按 Tab 接受',
  ],
};
```

---

## 变更记录

### 2026-02-13 - 初始版本

- 创建 data 模块文档
- 记录教程和场景数据结构
