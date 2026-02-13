import type { Tutorial } from '../../types';

export const agentWorkingTutorial: Tutorial = {
  id: 'agent-working',
  title: '使用 Agent',
  description: '理解 Agent harness 概念, 学会编写高效 prompt, 掌握上下文管理技巧',
  difficulty: 'beginner',
  estimatedTime: 15,
  category: 'agents',
  order: 200,
  prerequisites: [],
  isPublished: true,
  steps: [
    {
      id: 'what-is-agent',
      order: 1,
      title: 'Agent 是什么?',
      content: `
# Cursor Agent 是什么?

Cursor 的 Agent 模式是一个能够自主完成编程任务的 AI 助手。与普通的 AI 对话不同, Agent 可以:

- **读取和搜索** 你的代码库文件
- **创建和编辑** 代码文件
- **运行终端命令** (如 npm install, git commit)
- **自主决策** 下一步该做什么

## 普通对话 vs Agent 模式

| 特性 | 普通对话 (Ctrl+L) | Agent 模式 |
|------|-------------------|------------|
| 读取文件 | 需要你手动 @ 引用 | 自动搜索相关文件 |
| 修改代码 | 给出建议, 你手动修改 | 直接修改文件 |
| 运行命令 | 给出命令, 你手动执行 | 自动执行 (需确认) |
| 多步骤任务 | 每步都需要你指导 | 自主规划和执行 |

## 如何开启 Agent 模式?

1. 按 **Ctrl+L** 打开对话面板
2. 在输入框左下角, 点击模式切换按钮
3. 选择 **Agent** 模式
4. 或者直接按 **Ctrl+.** 快速切换
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'agent-harness',
      order: 2,
      title: 'Agent Harness 概念',
      content: `
# Agent Harness: 给 AI 一本工作手册

## 什么是 Agent Harness?

Agent Harness 是指你为 Agent 准备的 "工作环境" - 包括项目规则、上下文信息和工作约束。

就像新员工入职需要一本员工手册, Agent 也需要了解:
- 项目用什么技术栈
- 代码风格是什么样的
- 有哪些约定和规范

## 三个关键文件

### 1. .cursorrules (项目规则)

告诉 Agent 你的项目规范:

\`\`\`
You are working on a React + TypeScript project.
- Use functional components with hooks
- Use Tailwind CSS for styling
- Follow the existing file structure in src/
\`\`\`

### 2. .cursorignore (忽略文件)

告诉 Agent 哪些文件不要碰:

\`\`\`
.env
credentials.json
node_modules/
\`\`\`

### 3. 项目文档 (README, CLAUDE.md 等)

Agent 会自动读取项目文档来理解上下文。好的文档 = 更好的 Agent 表现。

## 为什么 Harness 很重要?

没有 Harness 的 Agent 就像没有地图的导游 - 可能带你去错误的方向。
配置好 Harness 后, Agent 的输出质量会显著提升。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'prompt-techniques',
      order: 3,
      title: 'Prompt 编写技巧',
      content: `
# 编写高效 Prompt 的 5 个技巧

## 1. 明确目标

不要说 "改一下这个组件", 而是说:
- 具体要改什么
- 改成什么样
- 为什么要改

## 2. 提供文件路径

Agent 可以自己搜索文件, 但直接告诉它路径更高效:

\`\`\`
修改 src/components/Header.tsx 中的导航菜单,
新增一个 "设置" 链接, 指向 /settings
\`\`\`

## 3. 指定技术约束

\`\`\`
使用 React Router 的 Link 组件 (不要用 <a> 标签)
样式使用 Tailwind CSS
遵循现有的 Header 组件模式
\`\`\`

## 4. 给出参考示例

\`\`\`
参考 src/pages/Profile.tsx 的布局模式,
创建一个类似结构的 Settings 页面
\`\`\`

## 5. 分步骤拆分

复杂任务拆成小步骤:

\`\`\`
第一步: 创建 Settings 页面的基本结构
第二步: 添加主题切换功能
第三步: 添加字体大小调节
\`\`\`

每完成一步, 检查结果后再继续下一步。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'context-management',
      order: 4,
      title: '上下文管理',
      content: `
# 上下文管理: 让 Agent 看到正确的信息

## 上下文窗口的限制

Agent 的 "记忆" 是有限的 (上下文窗口)。放入太多无关信息会:
- 降低回答质量
- 让 Agent "忘记" 重要信息
- 增加响应时间

## 使用 @ 引用精准提供上下文

在对话中使用 @ 符号引用:

| 引用方式 | 用途 |
|----------|------|
| @file | 引用整个文件 |
| @folder | 引用整个目录 |
| @code | 引用选中的代码片段 |
| @docs | 引用文档 |
| @web | 搜索网络信息 |
| @git | 引用 Git 历史 |

## 最佳实践

### 精选相关文件

\`\`\`
@src/types/user.ts  <- 类型定义
@src/services/auth.ts  <- 现有认证逻辑
请在 auth.ts 中添加 refreshToken 功能
\`\`\`

### 避免过度引用

不要一次引用 10 个文件。通常 2-3 个最相关的文件就够了。

### 利用 .cursorrules

把通用规范写在 .cursorrules 中, 这样每次对话都会自动加载, 不需要重复说明。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'vague-vs-precise',
      order: 5,
      title: '对比: 模糊 vs 精确 Prompt',
      content: `
# 实战对比: 模糊 Prompt vs 精确 Prompt

下面展示两组对比示例, 看看 Prompt 的质量如何影响 Agent 的输出。

## 示例 1: 添加功能

展开下方的示例对话, 对比模糊和精确 Prompt 的效果差异。

## 示例 2: 修复 Bug

同样的 Bug, 不同的描述方式会得到完全不同的响应速度和质量。

## 关键区别

| 维度 | 模糊 Prompt | 精确 Prompt |
|------|------------|------------|
| 文件路径 | 不提供 | 明确指定 |
| 技术要求 | 不说明 | 详细列出 |
| 参考示例 | 没有 | 指向现有代码 |
| 预期结果 | 模糊 | 具体可验证 |
| Agent 效率 | 需要多轮确认 | 一次到位 |
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

回答以下问题, 测试你对 Agent 使用技巧的掌握程度。
      `,
      type: 'quiz',
      quiz: {
        question: '以下哪个 Prompt 最可能让 Agent 产出高质量代码?',
        type: 'single',
        options: [
          { id: 'a', text: '"帮我写一个登录页面"' },
          { id: 'b', text: '"修复 bug"' },
          {
            id: 'c',
            text: '"在 src/pages/Login.tsx 创建登录页面, 使用现有的 Card 和 Button 组件, 参考 src/pages/Register.tsx 的布局, 表单包含邮箱和密码字段, 使用 react-hook-form 做校验"',
          },
          { id: 'd', text: '"写个好看的页面"' },
        ],
        correctAnswer: 'c',
        explanation:
          '选项 C 提供了明确的文件路径、技术约束、参考示例和具体需求, ' +
          '这让 Agent 能够精准理解你的意图并一次性产出符合预期的代码。' +
          '其他选项都太模糊, Agent 需要多轮确认才能开始工作。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 7,
      title: '教程完成',
      content: `
# 恭喜完成!

你已经学会了:

- Agent 模式与普通对话的区别
- Agent Harness 的概念和三个关键文件
- 编写高效 Prompt 的 5 个技巧
- 上下文管理的最佳实践
- 模糊 vs 精确 Prompt 的效果对比

## 下一步

- 在你的项目中配置 .cursorrules 文件
- 尝试用精确 Prompt 让 Agent 完成一个小任务
- 继续学习下一课: 理解你的代码库
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
