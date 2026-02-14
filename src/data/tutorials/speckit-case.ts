import type { Tutorial } from '../../types';

// 案例步骤定义
export interface CaseStudyStep {
  id: string;
  order: number;
  title: string;
  description: string;
  command: string;
  commandInput?: string;
  generatedContent: string;
  generatedFileName: string;
  workflowNodeId: string;
  highlights?: string[];
}

// 实战案例: 任务管理应用的 6 个步骤
export const caseStudySteps: CaseStudyStep[] = [
  {
    id: 'case-step-1',
    order: 1,
    title: '初始化项目',
    description:
      '使用 specify init 创建一个新的 spec-kit 项目, 选择 Claude 作为 AI 代理。',
    command: 'specify init task-manager --ai claude',
    generatedContent: `task-manager/
├── .specify/
│   ├── config.yaml          # spec-kit 配置
│   ├── scripts/             # 辅助脚本
│   └── templates/           # 文档模板
├── specs/
│   └── (your features here) # 功能规格目录
├── CLAUDE.md                # AI 上下文文档
└── .gitignore`,
    generatedFileName: '项目目录结构',
    workflowNodeId: 'init',
    highlights: ['.specify/', 'specs/', 'CLAUDE.md'],
  },
  {
    id: 'case-step-2',
    order: 2,
    title: '建立项目宪法',
    description:
      '通过交互式问答定义项目的核心原则和技术约束, 确保后续所有决策都遵循这些原则。',
    command: '/speckit.constitution',
    commandInput: '通过交互式问答回答项目相关问题',
    generatedContent: `# Project Constitution

## Core Principles

I. React + TypeScript
   - 使用 React 19 + TypeScript 构建前端
   - 严格模式, 禁止 any 类型

II. 本地存储优先
   - 所有数据存储在 localStorage
   - 无需后端服务器

III. 简洁设计
   - 最小化依赖, 避免过度工程
   - 组件职责单一

## Technical Constraints

- 最小视口宽度: 768px
- 目标浏览器: Chrome 90+, Firefox 90+
- 构建工具: Vite
- 样式方案: Tailwind CSS`,
    generatedFileName: 'constitution.md',
    workflowNodeId: 'constitution',
    highlights: ['Core Principles', 'Technical Constraints'],
  },
  {
    id: 'case-step-3',
    order: 3,
    title: '编写功能规格',
    description:
      '将 "开发一个任务管理应用" 的自然语言需求转化为结构化的规格文档。',
    command: '/speckit.specify',
    commandInput:
      'Build a task management app where users can create, edit, and delete tasks with priority levels and due dates',
    generatedContent: `# Feature Specification: Task Manager

## User Scenarios

### US1 - 创建任务 (Priority: P1)
用户可以创建新任务, 包含标题、描述、优先级和截止日期。

**Acceptance Scenarios**:
1. Given 用户点击 "新建任务", When 填写表单并提交,
   Then 任务出现在列表中
2. Given 用户未填写标题, When 点击提交,
   Then 显示验证错误

### US2 - 管理任务 (Priority: P1)
用户可以编辑和删除已有任务, 标记任务完成状态。

### US3 - 筛选和排序 (Priority: P2)
用户可以按优先级、状态、截止日期筛选和排序任务。

## Functional Requirements

- FR-001: 系统必须支持创建包含标题、描述、优先级、截止日期的任务
- FR-002: 系统必须支持编辑和删除任务
- FR-003: 任务必须支持 high/medium/low 三个优先级
- FR-004: 系统必须支持标记任务为完成/未完成
- FR-005: 系统必须支持按优先级和状态筛选任务

## Success Criteria

- SC-001: 用户可以在 30 秒内创建一个新任务
- SC-002: 任务数据在页面刷新后仍然保留`,
    generatedFileName: 'spec.md',
    workflowNodeId: 'specify',
    highlights: ['User Scenarios', 'Functional Requirements', 'Success Criteria'],
  },
  {
    id: 'case-step-4',
    order: 4,
    title: '澄清模糊需求',
    description:
      'AI 分析 spec.md 中的模糊点并提出问题, 你的回答会让规格更加精确。',
    command: '/speckit.clarify',
    commandInput: '自动分析 spec.md 并提出澄清问题',
    generatedContent: `Found 3 areas that need clarification:

1. 任务标题长度限制
   Q: 任务标题的最大长度是多少?
   → 回答: 100 个字符

2. 过期任务处理
   Q: 超过截止日期的任务应该如何显示?
   → 回答: 用红色高亮显示, 不自动归档

3. 删除确认
   Q: 删除任务是否需要确认对话框?
   → 回答: 是, 显示确认对话框

---

spec.md 已更新, 新增内容:

## Edge Cases (新增)

- 任务标题最大 100 字符, 超出时截断并提示
- 过期任务以红色边框标识, 保留在列表中
- 删除操作需要用户确认, 防止误删`,
    generatedFileName: 'spec.md (updated)',
    workflowNodeId: 'clarify',
    highlights: ['Edge Cases', '任务标题最大 100 字符', '删除操作需要用户确认'],
  },
  {
    id: 'case-step-5',
    order: 5,
    title: '生成实现计划',
    description:
      '基于完善后的规格, 生成技术实现计划、数据模型和项目结构。',
    command: '/speckit.plan',
    commandInput: '基于 spec.md 和 constitution.md 生成技术方案',
    generatedContent: `# Implementation Plan: Task Manager

## Technical Context

Language: TypeScript 5.x
Framework: React 19
Build Tool: Vite
Storage: localStorage
Styling: Tailwind CSS

## Project Structure

src/
├── components/
│   ├── TaskCard.tsx        # 任务卡片
│   ├── TaskForm.tsx        # 新建/编辑表单
│   ├── TaskList.tsx        # 任务列表
│   └── TaskFilter.tsx      # 筛选控件
├── services/
│   └── task-service.ts     # 任务 CRUD 逻辑
├── types/
│   └── task.ts             # Task 类型定义
└── App.tsx                 # 路由和布局

## Data Model (data-model.md)

interface Task {
  id: string;
  title: string;          // max 100 chars
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'done';
  dueDate: string | null;  // ISO date
  createdAt: string;
  updatedAt: string;
}

## Constitution Check: ALL PASSED`,
    generatedFileName: 'plan.md + data-model.md',
    workflowNodeId: 'plan',
    highlights: ['Project Structure', 'Data Model', 'Constitution Check'],
  },
  {
    id: 'case-step-6',
    order: 6,
    title: '生成任务列表',
    description:
      '将实现计划拆分为有依赖关系的可执行任务, 按阶段分组。',
    command: '/speckit.tasks',
    commandInput: '基于 plan.md 生成任务列表',
    generatedContent: `# Tasks: Task Manager

## Phase 1: Setup
- [ ] T001 Create Task type in src/types/task.ts
- [ ] T002 [P] Create task-service in src/services/task-service.ts

## Phase 2: Core Components
- [ ] T003 Create TaskCard component
- [ ] T004 Create TaskForm component (create + edit)
- [ ] T005 Create TaskFilter component
- [ ] T006 Create TaskList page with CRUD integration

## Phase 3: Polish
- [ ] T007 Add overdue task highlighting (red border)
- [ ] T008 Add delete confirmation dialog
- [ ] T009 [P] Write unit tests for task-service
- [ ] T010 [P] Write component tests for TaskForm
- [ ] T011 Verify responsive layout at 768px

## Summary
- Total tasks: 11
- Parallel opportunities: 3 groups
- Estimated phases: 3`,
    generatedFileName: 'tasks.md',
    workflowNodeId: 'tasks',
    highlights: ['Phase 1: Setup', 'Phase 2: Core', 'Phase 3: Polish'],
  },
];

// 教程数据
export const speckitCaseTutorial: Tutorial = {
  id: 'speckit-case',
  title: 'Spec-Kit 实战案例',
  description: '通过任务管理应用案例, 逐步体验 spec-kit 全流程',
  difficulty: 'intermediate',
  estimatedTime: 20,
  category: 'spec-kit',
  order: 3,
  prerequisites: ['speckit-install', 'speckit-workflow'],
  isPublished: true,
  steps: [
    {
      id: 'case-intro',
      order: 1,
      title: '案例背景',
      content: '了解实战案例的背景和目标',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'case-walkthrough',
      order: 2,
      title: '分步演练',
      content: '逐步跟随 6 个案例步骤, 体验 spec-kit 全流程',
      type: 'practice',
      completionCriteria: { type: 'action' },
    },
    {
      id: 'case-review',
      order: 3,
      title: '流程回顾',
      content: '回顾整个案例流程, 理解各阶段的关联',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'case-quiz',
      order: 4,
      title: '知识检测',
      content: '测试你对 spec-kit 实战流程的理解',
      type: 'quiz',
      quiz: {
        question: '在 spec-kit 工作流中, /speckit.clarify 的主要作用是什么?',
        type: 'single',
        options: [
          { id: 'a', text: '生成项目的目录结构' },
          { id: 'b', text: '识别规格中的模糊点并通过问答完善需求' },
          { id: 'c', text: '将任务拆分为可执行的步骤' },
          { id: 'd', text: '检查代码是否符合规格' },
        ],
        correctAnswer: 'b',
        explanation:
          '/speckit.clarify 会分析 spec.md, 找出不够明确的地方 (如边界条件、业务规则等) 并提出问题。你的回答会自动更新到规格文档中, 让需求更加精确。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'case-complete',
      order: 5,
      title: '案例完成',
      content: '恭喜完成实战案例演练',
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
