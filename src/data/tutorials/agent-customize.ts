import type { Tutorial } from '../../types';

export const agentCustomizeTutorial: Tutorial = {
  id: 'agent-customize',
  title: '自定义你的代理',
  description: '学习如何通过 Cursor Rules 和 MCP 工具自定义 Agent 行为, 使其更符合项目需求',
  difficulty: 'beginner',
  estimatedTime: 15,
  category: 'agents',
  order: 205,
  prerequisites: ['agent-working'],
  isPublished: true,
  steps: [
    {
      id: 'rules-intro',
      order: 1,
      title: 'Cursor Rules 入门',
      content: `
# Cursor Rules: 给 Agent 定规矩

每次和 Agent 对话都要重复说 "用 TypeScript"、"用 Tailwind" 很烦? Cursor Rules 帮你解决这个问题。

## 什么是 Cursor Rules?

Rules 是存放在项目 \`.cursor/rules/\` 目录下的 \`.mdc\` 文件, Agent 每次工作时都会自动读取。

## Rules 的三种类型

| 类型 | 触发方式 | 适用场景 |
|------|----------|----------|
| Always | 每次对话自动加载 | 项目通用规范 (技术栈、代码风格) |
| Auto Attached | 匹配文件 glob 时加载 | 特定文件类型的规则 (如 *.tsx 用 React 规范) |
| Agent Requested | Agent 判断相关时加载 | 特定领域知识 (如数据库操作规范) |
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'rules-writing',
      order: 2,
      title: '编写 Rules 文件',
      content: `
# 编写 Rules 文件

Rules 文件使用 \`.mdc\` 格式 (Markdown + 元数据), 放在 \`.cursor/rules/\` 目录下。

## 文件结构

\`\`\`markdown
---
description: 这条规则的用途说明
globs: src/**/*.tsx, src/**/*.ts
---

## 你的规则内容

- 使用 function 组件, 不用 class 组件
- Props 用 interface 定义, 不用 type
- 所有交互元素必须有 aria-label
\`\`\`

## 元数据字段

- \`description\`: 规则用途, Agent 用它判断是否需要加载
- \`globs\`: 文件匹配模式, 决定 Auto Attached 规则的触发范围

## 实用建议

- 每个规则文件聚焦一个主题 (如 "React 规范"、"API 规范")
- 规则要具体可执行, 避免模糊描述
- 用代码示例说明 "应该怎么做" 和 "不应该怎么做"
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'mcp-intro',
      order: 3,
      title: 'MCP 工具入门',
      content: `
# MCP: 给 Agent 装 "外挂"

MCP (Model Context Protocol) 让 Agent 能使用外部工具, 比如查数据库、搜文档、调 API。

## 为什么需要 MCP?

默认情况下 Agent 只能:
- 读写项目文件
- 运行终端命令
- 搜索代码

有了 MCP, Agent 还能:
- 直接查询数据库
- 搜索内部文档
- 调用第三方 API
- 操作云服务

## 配置方式

在项目根目录创建 \`.cursor/mcp.json\`:

\`\`\`json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-xxx"],
      "env": {
        "API_KEY": "\${API_KEY}"
      }
    }
  }
}
\`\`\`

## 常用 MCP 服务器

| 服务器 | 用途 |
|--------|------|
| server-postgres | 查询 PostgreSQL 数据库 |
| server-fetch | 抓取网页内容 |
| server-filesystem | 访问指定目录的文件 |
| server-github | 操作 GitHub Issues/PRs |
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'customize-examples',
      order: 4,
      title: 'Prompt 示例对比',
      content: `
# Prompt 示例对比

展开下方的示例对话, 对比模糊请求和精确请求在自定义 Agent 时的效果差异。

## 精确自定义请求的关键

- 明确项目技术栈和约定
- 列出具体的规则条目
- 用 @ 引用现有代码作为参考
- 指定 Rules 文件的存放路径和 glob 匹配范围
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

回答以下问题, 测试你对 Cursor Rules 和 MCP 的掌握。
      `,
      type: 'quiz',
      quiz: {
        question: '关于 Cursor Rules, 以下哪个说法是正确的?',
        type: 'single',
        options: [
          { id: 'a', text: 'Rules 文件必须放在项目根目录' },
          { id: 'b', text: 'Rules 只能用 JSON 格式编写' },
          {
            id: 'c',
            text: 'Rules 文件使用 .mdc 格式, 放在 .cursor/rules/ 目录下, 可以通过 globs 指定匹配的文件范围',
          },
          { id: 'd', text: 'Rules 每次对话都需要手动加载' },
        ],
        correctAnswer: 'c',
        explanation:
          'Cursor Rules 使用 .mdc 格式 (Markdown + 元数据), 存放在 .cursor/rules/ 目录下。' +
          '通过 globs 字段可以指定规则自动应用的文件范围, ' +
          '还可以设置为 Always (始终加载)、Auto Attached (匹配文件时加载) 或 Agent Requested (Agent 判断需要时加载)。',
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

- Cursor Rules 的三种类型和编写方法
- .mdc 文件格式和元数据配置
- MCP 工具的概念和配置方式
- 常用 MCP 服务器的用途

## 下一步

- 为你的项目创建第一个 Rules 文件
- 探索 MCP 服务器生态, 找到适合你项目的工具
- 继续学习最后一课: 综合运用
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
