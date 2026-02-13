import type { Tutorial } from '../../types';

export const commandsAtTutorial: Tutorial = {
  id: 'commands-at',
  title: '@ 提及功能',
  description: '学习如何使用 @ 符号引用代码、文件和文档',
  difficulty: 'intermediate',
  estimatedTime: 8,
  category: 'commands',
  order: 5,
  prerequisites: ['commands-ctrl-l'],
  isPublished: true,
  steps: [
    {
      id: 'intro',
      order: 1,
      title: '@ 符号简介',
      content: `
# @ 提及功能

在 Cursor 的 AI 聊天中，你可以使用 **@** 符号引用各种上下文：

- **@file**: 引用整个文件
- **@code**: 引用代码块
- **@docs**: 引用文档
- **@web**: 搜索网页

这让 AI 能够访问更精确的上下文，给出更准确的回答。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'at-file',
      order: 2,
      title: '@file 引用文件',
      content: `
# @file 引用文件

在聊天中输入 @file，然后选择文件：

"请检查 @file:utils.ts 中的错误"

AI 会读取整个文件内容并回答你的问题。
      `,
      type: 'simulation',
      simulationId: 'at-file',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'at-code',
      order: 3,
      title: '@code 引用代码',
      content: `
# @code 引用代码块

在编辑器中选中代码，然后在聊天中输入 @code：

"解释 @code 这段代码的作用"

AI 会知道你指的是当前选中的代码。
      `,
      type: 'simulation',
      simulationId: 'at-code',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'at-docs',
      order: 4,
      title: '@docs 引用文档',
      content: `
# @docs 引用文档

@docs 让 AI 可以访问官方文档：

"@docs:React useEffect 的工作原理是什么？"

AI 会基于官方文档回答，而不是依赖训练数据。
      `,
      type: 'simulation',
      simulationId: 'at-docs',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'combined',
      order: 5,
      title: '组合使用',
      content: `
# 组合使用

你可以在一个问题中组合多个 @ 引用：

"@file:api.ts 和 @file:types.ts 是否一致？"

"基于 @docs:TypeScript，优化 @code 的类型定义"

这让 AI 能够进行跨文件分析和比较。
      `,
      type: 'simulation',
      simulationId: 'at-combined',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'tips',
      order: 6,
      title: '使用技巧',
      content: `
# @ 提及技巧

## 1. 精确引用
尽量引用最小的必要上下文，避免发送过多无关代码。

## 2. 多个文件
可以一次引用多个文件进行比较或分析。

## 3. 结合命令
- 用 Ctrl+L 打开聊天
- 用 @ 引用上下文
- 用 Ctrl+K 应用结果

## 4. 文档搜索
@docs 会自动搜索最新的官方文档。

## 5. 历史记录
之前使用过的 @ 引用会显示在建议列表中。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'complete',
      order: 7,
      title: '完成',
      content: `
# 完成！

你已经掌握了 @ 提及功能。

## 复习要点

- @file 引用文件
- @code 引用选中代码
- @docs 引用官方文档
- 可以组合多个引用

## 下一步

学习如何编写 .cursorrules 文件来自定义 AI 行为！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
  ],
};
