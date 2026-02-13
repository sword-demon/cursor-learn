import type { Tutorial } from '../../types';

export const commandsCtrlLTutorial: Tutorial = {
  id: 'commands-ctrl-l',
  title: 'Ctrl+L AI 聊天',
  description: '学习如何使用 Ctrl+L 与 AI 进行对话，获取代码帮助',
  difficulty: 'beginner',
  estimatedTime: 5,
  category: 'commands',
  order: 4,
  prerequisites: ['commands-ctrl-k'],
  isPublished: true,
  steps: [
    {
      id: 'intro',
      order: 1,
      title: 'Ctrl+L 简介',
      content: `
# Ctrl+L：AI 聊天

Ctrl+L 打开 Cursor 的 AI 聊天面板。你可以在这里与 AI 对话，询问代码问题、获取建议、或者讨论架构设计。

## 使用方法

1. 按 **Ctrl+L** (Windows/Linux) 或 **Cmd+L** (Mac)
2. 在聊天面板输入你的问题
3. AI 会给出详细的回答

## 特色功能

- **@ 提及**: 引用文件、代码块或文档
- **上下文感知**: AI 自动包含当前文件内容
- **代码块**: AI 回答中的代码可以直接应用
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'basic-chat',
      order: 2,
      title: '基础对话',
      content: `
# 基础对话示例

试试在聊天中问：

"如何优化这个函数的性能？"

AI 会分析当前文件中的代码，并给出具体的优化建议。
      `,
      type: 'simulation',
      simulationId: 'ctrl-l-basic-chat',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'context',
      order: 3,
      title: '上下文感知',
      content: `
# 上下文感知

Cursor 会自动将当前打开的文件作为上下文发送给 AI。

这意味着你可以直接问：
- "这段代码有什么问题？"
- "帮我重构这个类"
- "添加错误处理"

不需要手动复制粘贴代码！
      `,
      type: 'simulation',
      simulationId: 'ctrl-l-context',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'apply-code',
      order: 4,
      title: '应用代码',
      content: `
# 应用 AI 建议的代码

当 AI 回复中包含代码块时：

1. 点击代码块下方的 **"Apply"** 按钮
2. 代码会自动插入到编辑器中
3. 或者点击 **"Copy"** 复制代码

这比你手动复制粘贴方便多了！
      `,
      type: 'simulation',
      simulationId: 'ctrl-l-apply-code',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'tips',
      order: 5,
      title: '使用技巧',
      content: `
# Ctrl+L 使用技巧

## 1. 快捷键
- **Ctrl+L**: 打开/关闭聊天面板
- **Escape**: 关闭聊天面板

## 2. 历史记录
Cursor 会保存你的对话历史，可以回顾之前的讨论。

## 3. 多轮对话
在一个话题上连续提问，AI 会记住上下文。

## 4. 结合其他命令
- 在聊天中获得建议
- 用 Ctrl+K 应用修改
- 用 Tab 接受补全

## 5. 导出对话
可以导出对话内容为 Markdown 文件。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'complete',
      order: 6,
      title: '完成',
      content: `
# 完成！

你已经学会了 AI 聊天功能。

## 复习要点

- Ctrl+L 打开聊天面板
- AI 自动包含当前文件上下文
- 可以直接应用 AI 建议的代码
- 支持多轮对话

## 下一步

学习 @ 提及功能，引用代码和文件！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
  ],
};
