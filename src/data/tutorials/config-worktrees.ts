import type { Tutorial } from '../../types';

export const configWorktreesTutorial: Tutorial = {
  id: 'config-worktrees',
  title: '并行 Agent (Worktrees)',
  description: '使用 Git Worktrees 让多个 Agent 并行工作',
  difficulty: 'intermediate',
  estimatedTime: 8,
  category: 'config',
  order: 105,
  prerequisites: [],
  isPublished: true,
  steps: [
    {
      id: 'overview',
      order: 1,
      title: '并行 Agent 概览',
      content: `
# 并行 Agent 概览

Cursor 支持在独立的 Git worktree 中同时运行多个 Agent, 每个 Agent 有自己的工作目录, 互不干扰。

## 什么是并行 Agent

并行 Agent 是 Cursor 的高级功能, 允许你同时运行多个 AI Agent 处理不同的任务。每个 Agent 在独立的 Git worktree 中工作, 拥有独立的文件系统。

## 适用场景

- 对比不同模型的输出质量
- 同时尝试多种实现方案
- 并行处理多个独立任务
- 提高复杂任务的成功率

## 注意事项

这是高级功能, 适合有 Git 经验的用户。建议先熟悉基础 Agent 功能后再使用。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'concept',
      order: 2,
      title: '核心概念',
      content: `
# 核心概念

## Git Worktree 是什么

Git worktree 是 Git 的原生功能, 允许同一仓库有多个工作目录。每个 worktree 可以独立切换分支、修改文件, 而不影响其他 worktree。

## Cursor 中的实现

- **独立文件系统**: 每个 Agent 在独立的 worktree 中运行
- **互不干扰**: Agent A 的修改不会影响 Agent B 的工作环境
- **共享 Git 历史**: 所有 worktree 共享同一个 .git 目录和提交历史
- **自动管理**: Cursor 自动创建和清理 worktree, 无需手动操作

## 工作流程

1. 用户启动多个 Agent 任务
2. Cursor 为每个 Agent 创建独立的 worktree
3. Agent 在各自的 worktree 中并行工作
4. 用户预览每个 Agent 的结果
5. 选择最佳方案 Apply 到主工作树
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'best-of-n',
      order: 3,
      title: 'Best-of-N 功能',
      content: `
# Best-of-N 功能

## 什么是 Best-of-N

Best-of-N 允许你用同一个 prompt 同时在多个模型上运行 Agent, 系统会展示所有结果, 由你选择最佳方案。

## 使用场景

- **复杂任务**: 对于难度较高的任务, 不同模型可能有不同的解决思路
- **质量对比**: 直观对比 GPT-4、Claude、Gemini 等模型的输出质量
- **方案选择**: 从多个可行方案中选择最符合需求的

## 工作原理

\`\`\`
用户输入 prompt
    ↓
Cursor 创建 N 个 worktree
    ↓
在每个 worktree 中运行不同模型
    ↓
展示所有结果供用户选择
    ↓
用户 Apply 最佳方案到主工作树
\`\`\`

## 优势

- 提高复杂任务的成功率
- 发现不同模型的优势领域
- 节省反复尝试的时间
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'apply-flow',
      order: 4,
      title: 'Apply 流程',
      content: `
# Apply 流程

## 预览更改

Agent 在 worktree 中完成工作后, Cursor 会展示更改预览:

- 修改的文件列表
- 每个文件的 diff 对比
- 新增或删除的文件

## Apply 操作

通过 "Apply" 操作将 worktree 中的更改合并回主工作树。这类似 Git merge, 但由 Cursor 自动处理。

## 操作步骤

1. 查看 Agent 的工作结果
2. 检查文件更改是否符合预期
3. 点击 "Apply" 按钮
4. Cursor 自动将更改合并到主工作树
5. Worktree 被自动清理

## 冲突处理

如果主工作树在 Agent 工作期间发生了更改, Apply 时可能出现冲突。Cursor 会提示你手动解决冲突。

## 放弃更改

如果 Agent 的结果不满意, 可以直接关闭预览, Cursor 会自动清理该 worktree, 不会影响主工作树。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'config',
      order: 5,
      title: '配置说明',
      content: `
# 配置说明

## 配置文件位置

\`.cursor/worktrees.json\` 文件用于配置 worktree 的初始化行为。

## 初始化脚本

初始化脚本在创建新 worktree 时自动运行, 用于安装依赖或执行其他准备工作。

### Node.js 项目配置

\`\`\`json
{
  "initScript": "npm install"
}
\`\`\`

### Python 项目配置

\`\`\`json
{
  "initScript": "pip install -r requirements.txt"
}
\`\`\`

### 多命令配置

\`\`\`json
{
  "initScript": "npm install && npm run build"
}
\`\`\`

## 自动清理

不再使用的 worktree 会被 Cursor 自动清理, 无需手动删除。清理时机:

- Apply 操作完成后
- 用户关闭预览窗口
- Cursor 重启时检查未使用的 worktree

## 配置建议

- 初始化脚本应该快速完成, 避免长时间等待
- 如果项目依赖较多, 考虑使用缓存加速安装
- 确保初始化脚本在所有平台上都能正常运行
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'quiz',
      order: 6,
      title: '知识检测',
      content: `
# 检验你的理解

回答以下问题, 测试你对并行 Agent 功能的掌握程度。
      `,
      type: 'quiz',
      quiz: {
        question: '并行 Agent 中每个 Agent 在什么环境中运行?',
        type: 'single',
        options: [
          { id: 'a', text: '共享的主工作目录' },
          { id: 'b', text: '独立的 Git worktree' },
          { id: 'c', text: '临时的内存文件系统' },
          { id: 'd', text: '远程服务器环境' },
        ],
        correctAnswer: 'b',
        explanation:
          '每个 Agent 在独立的 Git worktree 中运行。Worktree 是 Git 的原生功能, 允许同一仓库有多个工作目录, 每个 worktree 有独立的文件系统, Agent 的修改不会影响主工作树。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 7,
      title: '教程完成',
      content: `
# 恭喜完成!

你已经了解了 Cursor 并行 Agent 功能的核心知识:

- 并行 Agent 基于 Git worktree 实现
- Best-of-N 功能可以对比多个模型的输出
- Apply 流程将 worktree 更改合并回主工作树
- 通过 .cursor/worktrees.json 配置初始化脚本

## 下一步

- 在实际项目中尝试并行 Agent 功能
- 对比不同模型在不同任务上的表现
- 继续学习其他高级配置
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};

