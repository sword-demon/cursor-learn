import type { Tutorial } from '../../types';

// 辅助命令定义
export interface AuxiliaryCommand {
  id: string;
  command: string;
  title: string;
  description: string;
  useCases: string[];
  exampleOutput: string;
  tips?: string[];
}

// 辅助命令数据
export const auxiliaryCommands: AuxiliaryCommand[] = [
  {
    id: 'analyze',
    command: '/speckit.analyze',
    title: '跨文档一致性分析',
    description:
      '对 spec.md、plan.md、data-model.md 等所有文档进行交叉检查, ' +
      '找出不一致、遗漏或矛盾的地方。',
    useCases: [
      '修改 spec.md 后, 检查 plan.md 是否需要同步更新',
      '新增功能需求后, 验证数据模型是否覆盖',
      '提交代码前, 确认实现与规格一致',
    ],
    exampleOutput:
      'Cross-document Analysis Report\n' +
      '================================\n\n' +
      'Analyzed: spec.md, plan.md, data-model.md, tasks.md\n\n' +
      'Status: 2 issues found, 1 suggestion\n\n' +
      '[WARNING] Inconsistency detected:\n' +
      '  spec.md FR-003 mentions "due date filtering"\n' +
      '  but plan.md has no DatePicker component\n' +
      '  → Suggestion: Add DatePicker to component list\n\n' +
      '[WARNING] Missing coverage:\n' +
      '  data-model.md Task entity missing "createdAt" field\n' +
      '  referenced in spec.md Success Criteria SC-002\n' +
      '  → Suggestion: Add timestamp fields to Task entity\n\n' +
      '[INFO] Optimization opportunity:\n' +
      '  tasks.md T003 and T004 can be parallelized [P]\n' +
      '  They modify different files with no dependencies',
    tips: [
      '每次修改规格文档后都建议运行一次 analyze',
      'analyze 不会修改任何文件, 只生成报告',
      '关注 WARNING 级别的问题, INFO 级别可以后续处理',
    ],
  },
  {
    id: 'checklist',
    command: '/speckit.checklist',
    title: '生成自定义检查清单',
    description:
      '根据当前功能的需求和上下文, 生成针对性的检查清单, ' +
      '帮助在实现前后验证质量。',
    useCases: [
      '实现前生成检查清单, 确保不遗漏关键点',
      '代码审查时作为检查依据',
      '上线前的最终验证',
    ],
    exampleOutput:
      '# Specification Quality Checklist: Task Manager\n\n' +
      '## Content Quality\n\n' +
      '- [x] No implementation details in spec\n' +
      '- [x] Focused on user value\n' +
      '- [x] Written for non-technical stakeholders\n' +
      '- [x] All mandatory sections completed\n\n' +
      '## Requirement Completeness\n\n' +
      '- [x] No [NEEDS CLARIFICATION] markers remain\n' +
      '- [x] Requirements are testable and unambiguous\n' +
      '- [ ] Success criteria are measurable\n' +
      '- [x] All acceptance scenarios defined\n\n' +
      '## Feature Readiness\n\n' +
      '- [x] All FRs have clear acceptance criteria\n' +
      '- [x] User scenarios cover primary flows\n' +
      '- [ ] Edge cases are identified',
    tips: [
      'checklist 会根据你的具体功能生成定制化的检查项',
      '未通过的检查项会阻止 /speckit.implement 执行',
      '可以手动标记检查项为完成 [x]',
    ],
  },
  {
    id: 'taskstoissues',
    command: '/speckit.taskstoissues',
    title: '任务转 GitHub Issues',
    description:
      '将 tasks.md 中的任务自动转换为 GitHub Issues, ' +
      '包含标签、里程碑和依赖关系。',
    useCases: [
      '团队协作时, 将任务分配给不同成员',
      '使用 GitHub Projects 进行项目管理',
      '跟踪任务进度和阻塞关系',
    ],
    exampleOutput:
      'Converting tasks to GitHub Issues...\n\n' +
      'Created 11 issues in repo owner/task-manager:\n\n' +
      '  #1  [Setup] Create Task type          labels: setup, phase-1\n' +
      '  #2  [Setup] Create task-service        labels: setup, phase-1\n' +
      '  #3  [Core] Create TaskCard component   labels: core, phase-2\n' +
      '  #4  [Core] Create TaskForm component   labels: core, phase-2\n' +
      '  #5  [Core] Create TaskList page        labels: core, phase-2\n' +
      '  #6  [Polish] Add overdue highlighting  labels: polish, phase-3\n' +
      '  ...\n\n' +
      'Dependencies set:\n' +
      '  #3 blocked by #1\n' +
      '  #4 blocked by #1\n' +
      '  #5 blocked by #3, #4\n\n' +
      'Milestone: v1.0-task-manager',
    tips: [
      '需要 GitHub CLI (gh) 已登录',
      '自动根据 Phase 设置标签和里程碑',
      '依赖关系通过 Issue 引用 (#N) 体现',
    ],
  },
];

// 最佳实践
export interface BestPractice {
  id: string;
  title: string;
  description: string;
  example?: string;
}

export const bestPractices: BestPractice[] = [
  {
    id: 'branch-naming',
    title: '分支命名规范',
    description:
      'spec-kit 推荐使用 NNN-feature-name 格式命名分支, ' +
      '其中 NNN 是三位数字编号, 与 specs/ 目录下的功能目录对应。',
    example:
      '001-user-auth        → specs/001-user-auth/\n' +
      '002-payment-system   → specs/002-payment-system/\n' +
      '003-notification     → specs/003-notification/',
  },
  {
    id: 'parallel-features',
    title: '多功能并行开发',
    description:
      '每个功能在独立分支上开发, specs/ 目录下各功能互不干扰。' +
      '团队成员可以同时在不同分支上使用 spec-kit 工作流。',
    example:
      'main\n' +
      '├── 001-user-auth      (Alice)\n' +
      '├── 002-payment        (Bob)\n' +
      '└── 003-notification   (Charlie)',
  },
  {
    id: 'iterative-refinement',
    title: '迭代式完善',
    description:
      '不需要一次写出完美的规格。先用 /speckit.specify 生成初版, ' +
      '再用 /speckit.clarify 逐步完善, 最后用 /speckit.analyze 验证一致性。',
  },
  {
    id: 'ai-agent-choice',
    title: 'AI 代理选择',
    description:
      'spec-kit 支持多种 AI 代理: Claude Code, Gemini CLI, GitHub Copilot, ' +
      'Cursor Agent 等。初始化时通过 --ai 参数选择, 后续可在配置中修改。',
    example:
      'specify init my-project --ai claude    # Claude Code\n' +
      'specify init my-project --ai gemini    # Gemini CLI\n' +
      'specify init my-project --ai copilot   # GitHub Copilot\n' +
      'specify init my-project --ai cursor    # Cursor Agent',
  },
];

// 教程数据
export const speckitAdvancedTutorial: Tutorial = {
  id: 'speckit-advanced',
  title: 'Spec-Kit 进阶技巧',
  description: '了解 spec-kit 辅助命令和最佳实践, 提升开发效率',
  difficulty: 'intermediate',
  estimatedTime: 10,
  category: 'spec-kit',
  order: 4,
  prerequisites: ['speckit-install', 'speckit-workflow'],
  isPublished: true,
  steps: [
    {
      id: 'advanced-commands',
      order: 1,
      title: '辅助命令',
      content: '了解 analyze、checklist、taskstoissues 三个辅助命令',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'advanced-practices',
      order: 2,
      title: '最佳实践',
      content: '学习分支命名、并行开发和迭代完善等最佳实践',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'advanced-quiz',
      order: 3,
      title: '知识检测',
      content: '测试你对辅助命令和最佳实践的理解',
      type: 'quiz',
      quiz: {
        question: '/speckit.analyze 的主要作用是什么?',
        type: 'single',
        options: [
          { id: 'a', text: '分析代码的性能瓶颈' },
          { id: 'b', text: '跨文档检查规格、计划和数据模型的一致性' },
          { id: 'c', text: '分析 Git 提交历史' },
          { id: 'd', text: '生成代码覆盖率报告' },
        ],
        correctAnswer: 'b',
        explanation:
          '/speckit.analyze 会对 spec.md、plan.md、data-model.md 等文档进行交叉检查, ' +
          '找出不一致、遗漏或矛盾的地方, 并生成分析报告。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'advanced-complete',
      order: 4,
      title: '进阶学习完成',
      content: '恭喜完成所有 spec-kit 教程',
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
