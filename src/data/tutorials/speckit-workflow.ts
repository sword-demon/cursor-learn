import type { Tutorial } from '../../types';
import type { WorkflowNode } from '../../components/speckit/WorkflowDiagram';

// 工作流节点定义
export const workflowNodes: WorkflowNode[] = [
  {
    id: 'constitution',
    command: '/speckit.constitution',
    title: '建立项目宪法',
    description: '定义项目的核心原则、技术约束和架构决策',
    detailContent:
      'Constitution 是项目的 "宪法", 定义了不可违反的原则和约束。\n\n' +
      '它回答这些问题:\n' +
      '- 项目使用什么技术栈?\n' +
      '- 有哪些架构原则必须遵守?\n' +
      '- 性能、安全等非功能性要求是什么?\n\n' +
      '所有后续的规格和实现都必须符合 Constitution 中定义的原则。',
    exampleInput: '/speckit.constitution\n# 通过交互式问答建立项目原则',
    exampleOutput:
      '# Project Constitution\n\n' +
      '## Core Principles\n' +
      'I. React State Management - Use Context API + hooks\n' +
      'II. Desktop-First Responsive - Min viewport 768px\n' +
      'III. Local Storage Persistence - Client-side only\n\n' +
      '## Technical Constraints\n' +
      '- TypeScript strict mode\n' +
      '- No external state management libraries',
    outputFiles: ['constitution.md'],
    order: 1,
    icon: 'shield',
  },
  {
    id: 'specify',
    command: '/speckit.specify',
    title: '创建功能规格',
    description: '将自然语言需求转化为结构化的规格文档',
    detailContent:
      'Specify 是 spec-kit 的核心命令, 将模糊的需求描述转化为结构化的规格文档。\n\n' +
      '生成的 spec.md 包含:\n' +
      '- 用户场景 (User Stories) 和优先级\n' +
      '- 功能需求 (Functional Requirements)\n' +
      '- 验收标准 (Acceptance Scenarios)\n' +
      '- 边界情况 (Edge Cases)\n' +
      '- 成功指标 (Success Criteria)',
    exampleInput:
      '/speckit.specify Build a task management app where users can\n' +
      'create, edit, and delete tasks with priority levels and due dates',
    exampleOutput:
      '# Feature Specification: Task Manager\n\n' +
      '## User Scenarios\n' +
      '### US1 - Create Task (P1)\n' +
      'User can create a new task with title, description,\n' +
      'priority (high/medium/low), and due date.\n\n' +
      '## Functional Requirements\n' +
      '- FR-001: System must allow creating tasks\n' +
      '- FR-002: Tasks must have priority levels\n' +
      '- FR-003: Tasks must support due dates',
    outputFiles: ['spec.md'],
    order: 2,
    icon: 'document',
  },
  {
    id: 'clarify',
    command: '/speckit.clarify',
    title: '澄清模糊需求',
    description: '识别规格中的模糊点, 通过交互式问答完善需求',
    detailContent:
      'Clarify 会分析 spec.md, 找出不够明确的地方并提出问题。\n\n' +
      '常见的澄清方向:\n' +
      '- 边界条件: 任务标题最大长度?\n' +
      '- 业务规则: 过期任务如何处理?\n' +
      '- 用户体验: 删除需要确认吗?\n\n' +
      '回答这些问题后, spec.md 会自动更新, 需求变得更加精确。',
    exampleInput: '/speckit.clarify\n# 自动分析 spec.md 并提出问题',
    exampleOutput:
      'Found 3 areas that need clarification:\n\n' +
      '1. Task title - What is the maximum length?\n' +
      '   → User answer: 100 characters\n\n' +
      '2. Overdue tasks - Should they be auto-archived?\n' +
      '   → User answer: No, just highlight in red\n\n' +
      '3. Delete confirmation - Required for all deletes?\n' +
      '   → User answer: Yes, show confirmation dialog',
    outputFiles: ['spec.md (updated)'],
    order: 3,
    icon: 'chat',
  },
  {
    id: 'plan',
    command: '/speckit.plan',
    title: '生成实现计划',
    description: '基于规格生成技术实现计划、数据模型和架构决策',
    detailContent:
      'Plan 读取 spec.md 和 constitution.md, 生成完整的技术实现方案。\n\n' +
      '输出包含:\n' +
      '- plan.md: 技术栈选择、架构设计、项目结构\n' +
      '- data-model.md: 实体定义、关系图、存储策略\n' +
      '- research.md: 技术调研结果和决策记录\n\n' +
      '计划会自动检查是否符合 Constitution 中的原则。',
    exampleInput: '/speckit.plan\n# 基于 spec.md 生成技术方案',
    exampleOutput:
      '# Implementation Plan: Task Manager\n\n' +
      '## Technical Context\n' +
      'Language: TypeScript, Framework: React\n' +
      'Storage: localStorage\n\n' +
      '## Project Structure\n' +
      'src/\n' +
      '├── components/\n' +
      '│   ├── TaskList.tsx\n' +
      '│   ├── TaskForm.tsx\n' +
      '│   └── TaskCard.tsx\n' +
      '├── services/\n' +
      '│   └── task-service.ts\n' +
      '└── types/\n' +
      '    └── task.ts',
    outputFiles: ['plan.md', 'data-model.md', 'research.md'],
    order: 4,
    icon: 'blueprint',
  },
  {
    id: 'analyze',
    command: '/speckit.analyze',
    title: '一致性分析',
    description: '跨文档检查规格、计划和数据模型的一致性',
    detailContent:
      'Analyze 对所有已生成的文档进行交叉检查, 确保一致性。\n\n' +
      '检查内容:\n' +
      '- spec.md 中的需求是否都在 plan.md 中有对应实现\n' +
      '- data-model.md 的实体是否覆盖所有功能需求\n' +
      '- 是否存在矛盾或遗漏\n\n' +
      '发现问题后会生成报告, 建议修复方向。',
    exampleInput: '/speckit.analyze\n# 检查所有文档的一致性',
    exampleOutput:
      'Cross-document Analysis Report\n\n' +
      'Status: 2 issues found\n\n' +
      '1. [WARNING] FR-003 (due dates) mentioned in spec.md\n' +
      '   but no date picker component in plan.md\n' +
      '   → Suggestion: Add DatePicker to component list\n\n' +
      '2. [INFO] data-model.md Task entity missing\n' +
      '   "createdAt" field referenced in spec.md\n' +
      '   → Suggestion: Add timestamp fields',
    outputFiles: ['analysis report (console output)'],
    order: 5,
    icon: 'search',
  },
  {
    id: 'tasks',
    command: '/speckit.tasks',
    title: '生成任务列表',
    description: '将实现计划拆分为有依赖关系的可执行任务',
    detailContent:
      'Tasks 读取 plan.md 和 data-model.md, 生成按依赖排序的任务列表。\n\n' +
      '任务特点:\n' +
      '- 按阶段分组 (Setup → Tests → Core → Integration → Polish)\n' +
      '- 标注并行机会 [P]\n' +
      '- 包含具体文件路径和实现描述\n' +
      '- 依赖关系清晰, 可按顺序执行',
    exampleInput: '/speckit.tasks\n# 基于 plan.md 生成任务列表',
    exampleOutput:
      '# Tasks: Task Manager\n\n' +
      '## Phase 1: Setup\n' +
      '- [ ] T001 Create Task type in src/types/task.ts\n' +
      '- [ ] T002 [P] Create task-service in src/services/\n\n' +
      '## Phase 2: Core\n' +
      '- [ ] T003 Create TaskCard component\n' +
      '- [ ] T004 Create TaskForm component\n' +
      '- [ ] T005 Create TaskList page\n\n' +
      '## Phase 3: Polish\n' +
      '- [ ] T006 Add unit tests\n' +
      '- [ ] T007 Verify responsive layout',
    outputFiles: ['tasks.md'],
    order: 6,
    icon: 'list',
  },
  {
    id: 'implement',
    command: '/speckit.implement',
    title: '执行实现',
    description: '按任务列表逐步执行实现, 自动跟踪进度',
    detailContent:
      'Implement 读取 tasks.md, 按依赖顺序逐个执行任务。\n\n' +
      '执行流程:\n' +
      '- 检查前置任务是否完成\n' +
      '- 读取任务描述和相关文档\n' +
      '- AI 按照规格实现代码\n' +
      '- 完成后标记任务为 [x]\n' +
      '- 自动进入下一个任务\n\n' +
      '支持并行任务 [P] 的同时执行。',
    exampleInput: '/speckit.implement\n# 按 tasks.md 顺序执行实现',
    exampleOutput:
      'Starting implementation...\n\n' +
      '[T001] Creating Task type... DONE\n' +
      '[T002] Creating task-service... DONE\n' +
      '[T003] Creating TaskCard component... DONE\n' +
      '[T004] Creating TaskForm component... DONE\n' +
      '[T005] Creating TaskList page... DONE\n\n' +
      'Phase 2 complete. Starting Phase 3...',
    outputFiles: ['source code files', 'tasks.md (updated)'],
    order: 7,
    icon: 'code',
  },
];

export const speckitWorkflowTutorial: Tutorial = {
  id: 'speckit-workflow',
  title: 'Spec-Kit 核心工作流',
  description: '学习 spec-kit 的完整开发工作流, 理解每个命令的作用和产出物',
  difficulty: 'beginner',
  estimatedTime: 15,
  category: 'spec-kit',
  order: 2,
  prerequisites: ['speckit-install'],
  isPublished: true,
  steps: [
    {
      id: 'workflow-overview',
      order: 1,
      title: '工作流全景',
      content: '了解 spec-kit 的 7 个核心命令和完整工作流',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'workflow-diagram',
      order: 2,
      title: '交互式流程图',
      content: '通过可视化流程图探索每个命令的详情',
      type: 'practice',
      completionCriteria: { type: 'action' },
    },
    {
      id: 'workflow-details',
      order: 3,
      title: '命令详解',
      content: '深入了解每个命令的输入、输出和使用场景',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'workflow-quiz',
      order: 4,
      title: '知识检测',
      content: '测试你对 spec-kit 工作流的理解',
      type: 'quiz',
      quiz: {
        question: 'spec-kit 工作流中, 哪个命令负责将自然语言需求转化为结构化规格文档?',
        type: 'single',
        options: [
          { id: 'a', text: '/speckit.constitution' },
          { id: 'b', text: '/speckit.specify' },
          { id: 'c', text: '/speckit.plan' },
          { id: 'd', text: '/speckit.tasks' },
        ],
        correctAnswer: 'b',
        explanation:
          '/speckit.specify 是核心命令, 负责将自然语言需求转化为包含用户场景、功能需求和验收标准的结构化规格文档 (spec.md)。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'workflow-complete',
      order: 5,
      title: '工作流学习完成',
      content: '恭喜完成工作流教程',
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
