import type { Tutorial } from '../../types';

export const agentCodebaseTutorial: Tutorial = {
  id: 'agent-codebase',
  title: '理解你的代码库',
  description: '了解 Agent 如何搜索和理解代码库, 学会帮助 Agent 更高效地导航项目',
  difficulty: 'beginner',
  estimatedTime: 12,
  category: 'agents',
  order: 201,
  prerequisites: ['agent-working'],
  isPublished: true,
  steps: [
    {
      id: 'how-agent-reads-code',
      order: 1,
      title: 'Agent 如何读懂代码?',
      content: `
# Agent 如何读懂你的代码?

当你让 Agent 处理代码任务时, 它不是一次性读取整个项目。Agent 使用一套工具来搜索和理解代码:

## Agent 的搜索工具箱

| 工具 | 作用 | 类比 |
|------|------|------|
| 文件搜索 | 按文件名查找 | 在文件夹里找文件 |
| 代码搜索 | 按内容搜索代码 | 在书里搜关键词 |
| 语义搜索 | 按含义理解代码 | 理解一段话的意思 |
| 目录浏览 | 查看项目结构 | 看书的目录 |

## 搜索流程

1. **接收任务** - Agent 分析你的 prompt, 理解需要做什么
2. **定位文件** - 根据任务内容搜索相关文件
3. **阅读代码** - 读取找到的文件, 理解代码逻辑
4. **建立关联** - 追踪 import/export, 理解模块间的依赖
5. **执行任务** - 基于理解开始修改或创建代码
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'semantic-search',
      order: 2,
      title: '语义搜索的力量',
      content: `
# 语义搜索: Agent 的 "理解力"

## 关键词搜索 vs 语义搜索

传统搜索只能匹配关键词, 语义搜索能理解代码的含义:

| 你的描述 | 关键词搜索找到 | 语义搜索找到 |
|----------|---------------|-------------|
| "用户登录" | 包含 "登录" 的文件 | login, auth, session 相关代码 |
| "数据验证" | 包含 "验证" 的文件 | validate, schema, zod, yup 相关代码 |
| "错误处理" | 包含 "错误" 的文件 | try/catch, ErrorBoundary, toast 相关代码 |

## Cursor 的代码索引

Cursor 会自动为你的项目建立索引:

- **文件结构索引** - 记录每个文件的位置和类型
- **符号索引** - 记录函数名、类名、变量名
- **依赖索引** - 记录 import/export 关系
- **语义索引** - 理解代码的功能和含义

## 索引的影响

索引质量直接影响 Agent 的表现:
- 索引完整 → Agent 能快速找到相关代码
- 索引不完整 → Agent 可能遗漏重要文件
- 无关文件太多 → 索引被 "噪音" 干扰

这就是为什么 .cursorignore 很重要 - 排除 node_modules、dist 等目录能让索引更精准。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'help-agent-understand',
      order: 3,
      title: '帮助 Agent 理解代码',
      content: `
# 如何帮助 Agent 更好地理解你的代码

Agent 越了解你的项目, 输出质量越高。以下是几个实用技巧:

## 1. 提供文件路径, 减少搜索时间

\`\`\`
// 低效: Agent 需要自己搜索
"修改用户列表组件的排序功能"

// 高效: 直接告诉 Agent 在哪里
"修改 src/components/UserList.tsx 中的 sortUsers 函数,
改为按注册时间降序排列"
\`\`\`

## 2. 描述项目架构, 建立全局视角

\`\`\`
"项目结构:
- src/pages/ 是路由页面
- src/components/ 是可复用组件
- src/services/ 是 API 调用层
- src/contexts/ 是全局状态管理

请在 services 层添加一个新的 API 调用"
\`\`\`

## 3. 指向参考文件, 保持风格一致

\`\`\`
"参考 src/services/user-service.ts 的模式,
创建一个新的 src/services/order-service.ts"
\`\`\`

## 4. 说明依赖关系, 避免遗漏

\`\`\`
"UserProfile 组件依赖:
- useAuth() hook 获取当前用户
- user-service.ts 的 updateProfile() 方法
- UserAvatar 子组件

请修改 UserProfile, 添加编辑功能"
\`\`\`
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'real-world-scenarios',
      order: 4,
      title: '实战场景',
      content: `
# 实战场景: 让 Agent 理解陌生代码

## 场景: 接手一个不熟悉的项目

你刚加入团队, 需要理解项目的认证流程。

### 模糊请求 vs 精确请求

展开下方的示例对话, 对比两种不同的请求方式。

模糊请求让 Agent 不知从何下手, 精确请求则给出了明确的起点和追踪路径。

## 关键原则

| 原则 | 说明 |
|------|------|
| 给起点 | 告诉 Agent 从哪个文件开始追踪 |
| 画路径 | 描述你想了解的调用链路 |
| 定范围 | 明确你关心的是哪个层面 (UI? API? 数据?) |
| 问具体 | "这个函数做了什么" 比 "解释这个项目" 有效得多 |
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'quiz',
      order: 5,
      title: '知识检测',
      content: `
# 检验你的理解

回答以下问题, 测试你对 Agent 代码库理解能力的掌握。
      `,
      type: 'quiz',
      quiz: {
        question: '以下哪种做法最能帮助 Agent 理解你的代码库?',
        type: 'single',
        options: [
          { id: 'a', text: '"把整个 src 目录发给 Agent 看"' },
          { id: 'b', text: '"告诉 Agent 项目用了 React"' },
          {
            id: 'c',
            text: '"提供具体文件路径、描述项目架构、指向参考文件, 并说明模块间的依赖关系"',
          },
          { id: 'd', text: '"让 Agent 自己搜索, 不需要提供任何信息"' },
        ],
        correctAnswer: 'c',
        explanation:
          '选项 C 综合了所有帮助 Agent 理解代码库的关键技巧: ' +
          '提供文件路径减少搜索时间, 描述架构建立全局视角, ' +
          '指向参考文件保持风格一致, 说明依赖关系避免遗漏。' +
          '选项 A 会浪费上下文窗口, 选项 B 信息太少, 选项 D 效率最低。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 6,
      title: '教程完成',
      content: `
# 恭喜完成!

你已经学会了:

- Agent 搜索和理解代码的工作流程
- 语义搜索与关键词搜索的区别
- 代码索引的作用和 .cursorignore 的重要性
- 帮助 Agent 理解代码的 4 个实用技巧
- 如何让 Agent 追踪和解释陌生代码

## 下一步

- 在你的项目中检查 .cursorignore 配置是否合理
- 尝试让 Agent 解释你项目中一段不熟悉的代码
- 继续学习下一课: 快速构建功能
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
