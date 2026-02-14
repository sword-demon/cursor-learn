# Data Model: Spec-Kit 交互式教程

**Date**: 2026-02-14
**Storage**: localStorage (client-side only, 复用现有 progress-service)

---

## Entity Overview

```
Tutorial (1) ───< (*) TutorialStep
    │
    └──< (*) WorkflowNode

TerminalCommand (独立)
CaseStudyStep (独立, 引用 WorkflowNode)
```

---

## Type Extensions

### TutorialCategory 扩展

```typescript
// 在 src/types/tutorial.ts 中扩展
export type TutorialCategory =
  | 'installation' | 'commands' | 'rules'
  | 'project' | 'config' | 'agents'
  | 'spec-kit';  // 新增
```

---

## New Entity Definitions

### WorkflowNode

工作流流程图中的单个节点, 代表 spec-kit 的一个命令/阶段。

```typescript
interface WorkflowNode {
  id: string;                    // 'constitution', 'specify', 'clarify', etc.
  command: string;               // '/speckit.constitution', '/speckit.specify', etc.
  title: string;                 // 显示标题
  description: string;           // 简短描述
  detailContent: string;         // 展开后的详细说明 (Markdown)
  exampleInput: string;          // 示例输入命令
  exampleOutput: string;         // 示例输出内容
  outputFiles: string[];         // 该阶段生成的文件列表
  order: number;                 // 在流程中的顺序 (1-7)
  icon: string;                  // 节点图标标识
}
```

**Example**:
```json
{
  "id": "specify",
  "command": "/speckit.specify",
  "title": "创建规格",
  "description": "将自然语言需求转化为结构化规格文档",
  "detailContent": "...",
  "exampleInput": "/speckit.specify Build a task management app...",
  "exampleOutput": "# Feature Specification: Task Manager\n...",
  "outputFiles": ["spec.md"],
  "order": 2,
  "icon": "document"
}
```

---

### TerminalCommand

终端模拟器中的预定义命令映射。

```typescript
interface TerminalCommand {
  id: string;                    // 唯一标识
  command: string;               // 用户输入的命令 (支持正则匹配)
  output: string[];              // 模拟输出行
  outputDelay: number;           // 每行输出延迟 (ms)
  tutorialStepId: string;        // 关联的教程步骤 ID
  successMessage?: string;       // 命令成功后的提示
}
```

**Example**:
```json
{
  "id": "init-project",
  "command": "specify init my-project --ai claude",
  "output": [
    "Creating new project: my-project",
    "Initializing git repository...",
    "Setting up spec-kit for Claude...",
    "Copying templates...",
    "Project created successfully!",
    "",
    "Next steps:",
    "  cd my-project",
    "  /speckit.specify <your feature description>"
  ],
  "outputDelay": 100,
  "tutorialStepId": "install-step-3",
  "successMessage": "项目初始化完成"
}
```

---

### CaseStudyStep

实战案例中的单个步骤。

```typescript
interface CaseStudyStep {
  id: string;                    // 唯一标识
  order: number;                 // 步骤序号
  title: string;                 // 步骤标题
  description: string;           // 步骤说明
  command: string;               // 执行的命令
  commandInput?: string;         // 命令的输入参数
  generatedContent: string;      // 该步骤生成的文档内容 (Markdown)
  generatedFileName: string;     // 生成的文件名
  workflowNodeId: string;        // 关联的工作流节点 ID
  highlights?: string[];         // 需要高亮的关键内容
}
```

**Example**:
```json
{
  "id": "case-step-3",
  "order": 3,
  "title": "编写功能规格",
  "description": "使用 /speckit.specify 将需求转化为结构化规格",
  "command": "/speckit.specify",
  "commandInput": "Build a task management app where users can create tasks...",
  "generatedContent": "# Feature Specification: Task Manager\n\n## User Scenarios...",
  "generatedFileName": "spec.md",
  "workflowNodeId": "specify",
  "highlights": ["User Story 1", "Functional Requirements", "Success Criteria"]
}
```

---

## Storage Strategy

- 教程数据: 静态 TypeScript 文件 (src/data/tutorials/speckit-*.ts)
- 用户进度: 复用现有 localStorage 方案 (ProgressContext)
- 预估新增数据量: ~20KB (4 个教程数据文件)
- 总数据量仍远低于 localStorage 5MB 上限

---

## Relationships

```
Tutorial (spec-kit category)
  └── TutorialStep[]
        ├── type: 'content' → 文本内容
        ├── type: 'simulation' → 引用 TerminalCommand
        ├── type: 'practice' → 引用 WorkflowNode (交互式流程图)
        └── type: 'quiz' → 内嵌 QuizQuestion

CaseStudyStep → WorkflowNode (多对一)
```
