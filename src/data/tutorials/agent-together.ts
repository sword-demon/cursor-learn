import type { Tutorial } from '../../types';

export const agentTogetherTutorial: Tutorial = {
  id: 'agent-together',
  title: '综合运用',
  description: '整合所有 Agent 技巧, 通过完整案例掌握从零开始的开发工作流',
  difficulty: 'beginner',
  estimatedTime: 15,
  category: 'agents',
  order: 206,
  prerequisites: ['agent-working'],
  isPublished: true,
  steps: [
    {
      id: 'workflow-overview',
      order: 1,
      title: '完整工作流回顾',
      content: `
# 从零到一: 完整开发工作流

前面 6 课你学到了 Agent 的各项技能, 现在把它们串联成一个完整的工作流。

## 开发流程四步法

| 步骤 | 技能 | 对应课程 |
|------|------|----------|
| 1. 定规矩 | Cursor Rules + MCP 配置 | 第 6 课: 自定义代理 |
| 2. 理解现有代码 | 代码库搜索 + @ 引用 | 第 2 课: 理解代码库 |
| 3. 分阶段开发 | 精确 Prompt + 迭代交付 | 第 1/3 课: 使用 Agent + 构建功能 |
| 4. 质量保障 | 代码审查 + 测试 + Bug 修复 | 第 4/5 课: 修复 Bug + 审查测试 |
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'real-world-example',
      order: 2,
      title: '实战案例演示',
      content: `
# 实战案例: 为项目添加任务管理功能

假设你要为一个 React 项目添加任务管理功能, 看看完整流程是怎样的。

## Step 1: 定规矩

先创建 Rules 文件, 确保 Agent 遵循项目规范:

\`\`\`markdown
---
description: React component conventions
globs: src/**/*.tsx
---
- Named exports only
- Props use interface
- Tailwind CSS for styling
\`\`\`

## Step 2: 理解现有代码

用 @ 引用关键文件, 让 Agent 了解项目结构:

\`\`\`
Explain the state management pattern in this project.
@src/contexts/AuthContext.tsx
@src/hooks/useLocalStorage.ts
\`\`\`

## Step 3: 分阶段开发

把需求拆成小阶段, 每阶段完成后检查:

\`\`\`
Phase 1: Create TaskItem type and TaskContext
Phase 2: Implement CRUD operations
Phase 3: Build TaskBoard UI component
Phase 4: Add tests
\`\`\`

## Step 4: 质量保障

让 Agent 审查代码并编写测试:

\`\`\`
Review src/contexts/TaskContext.tsx for:
- Memory leaks in useEffect
- Missing error handling
- Accessibility issues
\`\`\`
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'best-practices',
      order: 3,
      title: '最佳实践总结',
      content: `
# 最佳实践总结

## 高效协作的 5 个原则

1. 上下文为王 - 用 @ 引用文件, 用 Rules 定规矩, 让 Agent 有足够信息
2. 小步快跑 - 把大任务拆成小阶段, 每步检查结果
3. 精确表达 - 包含文件路径、行号、技术要求, 避免模糊描述
4. 先测后写 - 用 TDD 思路, 先定义预期行为再让 Agent 实现
5. 信任但验证 - Agent 的输出需要你审查, 特别是安全相关的代码

## 常见误区

| 误区 | 正确做法 |
|------|----------|
| 一次给所有需求 | 分阶段交付, 每步检查 |
| 不提供参考文件 | 用 @ 引用现有代码作为模式参考 |
| 盲目信任输出 | 审查每次生成的代码, 特别是边界情况 |
| 遇到问题反复重试相同 Prompt | 换个角度描述, 提供更多上下文 |
| 忽略 Rules 配置 | 项目初期就建立 Rules, 减少重复沟通 |
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'prompt-examples',
      order: 4,
      title: 'Prompt 示例对比',
      content: `
# Prompt 示例对比

展开下方的示例对话, 对比模糊请求和精确请求在完整工作流中的效果差异。

## 精确工作流请求的关键

- 明确分阶段计划, 每阶段有清晰的交付物
- 用 @ 引用现有代码作为模式参考
- 指定 Rules 文件确保一致性
- 要求 Agent 在每阶段完成后等待你的审查
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'final-quiz',
      order: 5,
      title: '最终测验',
      content: `
# 最终测验

回答以下问题, 检验你对 Agent 完整工作流的掌握。
      `,
      type: 'quiz',
      quiz: {
        question: '以下哪种做法最能提高 Agent 协作效率?',
        type: 'single',
        options: [
          { id: 'a', text: '一次性把所有需求写在一个 Prompt 里, 让 Agent 一口气完成' },
          {
            id: 'b',
            text: '先配置 Rules 定好规矩, 再用 @ 引用现有代码, 分阶段给出需求并在每阶段检查结果',
          },
          { id: 'c', text: '不需要提供任何上下文, Agent 会自动理解项目结构' },
          { id: 'd', text: '只要 Prompt 写得够长, Agent 就能完美执行' },
        ],
        correctAnswer: 'b',
        explanation:
          '高效的 Agent 协作需要: 1) Rules 定好项目规范; 2) @ 引用提供上下文; ' +
          '3) 分阶段交付避免遗漏; 4) 每步检查确保质量。' +
          '这个流程结合了前面所有课程的核心技巧, 是最可靠的工作方式。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 6,
      title: '课程完成',
      content: `
# 恭喜你完成了全部 Agent 教程!

你已经掌握了:

- Agent 的工作原理和 Prompt 技巧
- 代码库搜索和上下文管理
- 分阶段构建功能的方法
- Bug 调试和代码审查策略
- Cursor Rules 和 MCP 工具配置
- 完整的开发工作流

## 你获得了 "Agent 达人" 徽章!

现在你可以:
- 在实际项目中运用这些技巧
- 为团队建立 Cursor Rules 规范
- 探索更多 MCP 工具扩展 Agent 能力
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
