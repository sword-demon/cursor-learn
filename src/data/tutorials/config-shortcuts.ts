import type { Tutorial } from '../../types';

export const configShortcutsTutorial: Tutorial = {
  id: 'config-shortcuts',
  title: '键盘快捷键速查',
  description: '按分类查看 Cursor 快捷键, 支持 Windows/macOS 平台切换和搜索筛选',
  difficulty: 'beginner',
  estimatedTime: 5,
  category: 'config',
  order: 101,
  prerequisites: [],
  isPublished: true,
  steps: [
    {
      id: 'overview',
      order: 1,
      title: '快捷键概览',
      content: `
# Cursor 键盘快捷键

Cursor 继承了 VS Code 的快捷键体系, 同时新增了 AI 相关的专属快捷键。

掌握快捷键可以显著提升编码效率, 尤其是 AI 对话和内联编辑相关的快捷键。

## 6 大分类

| 分类 | 说明 |
|------|------|
| 通用 | 命令面板、设置、文件导航 |
| AI 对话 | 打开对话、切换 Agent、添加上下文 |
| 内联编辑 | Ctrl+K 触发、接受/拒绝建议 |
| 代码选择 | 扩展选择、多光标、匹配选择 |
| Tab 补全 | 接受/拒绝补全、逐词接受 |
| 终端 | 新建/拆分/关闭终端 |
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'ai-shortcuts',
      order: 2,
      title: 'AI 核心快捷键',
      content: `
# AI 核心快捷键

这些是 Cursor 最常用的 AI 快捷键:

## 三大核心操作

1. **Ctrl+L / Cmd+L** - 打开 AI 对话面板
2. **Ctrl+K / Cmd+K** - 触发内联编辑
3. **Tab** - 接受 AI 补全建议

## 对话增强

- **@** - 在对话中引用文件、代码、文档
- **Ctrl+. / Cmd+.** - 切换 Agent 模式
- **Shift+Enter** - 对话中换行 (不发送)

记住这 6 个快捷键, 就能覆盖 80% 的 AI 交互场景。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'all-shortcuts',
      order: 3,
      title: '全部快捷键速查',
      content: `
# 全部快捷键速查表

下方展示了 Cursor 的所有常用快捷键, 按分类整理。

- 使用顶部的平台切换按钮查看 Windows 或 macOS 快捷键
- 使用搜索框快速筛选
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'quiz',
      order: 4,
      title: '知识检测',
      content: `
# 检验你的理解

回答以下问题, 测试你对 Cursor 快捷键的掌握程度。
      `,
      type: 'quiz',
      quiz: {
        question: '在 Cursor 中, 哪个快捷键用于触发内联编辑 (Inline Edit)?',
        type: 'single',
        options: [
          { id: 'a', text: 'Ctrl+K / Cmd+K' },
          { id: 'b', text: 'Ctrl+L / Cmd+L' },
          { id: 'c', text: 'Tab' },
          { id: 'd', text: 'Ctrl+Shift+P / Cmd+Shift+P' },
        ],
        correctAnswer: 'a',
        explanation:
          'Ctrl+K (Windows) / Cmd+K (macOS) 用于触发内联编辑。Ctrl+L 打开 AI 对话面板, Tab 接受补全建议, Ctrl+Shift+P 打开命令面板。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 5,
      title: '教程完成',
      content: `
# 恭喜完成!

你已经了解了 Cursor 的核心快捷键:

- AI 对话: Ctrl+L / Cmd+L
- 内联编辑: Ctrl+K / Cmd+K
- Tab 补全: Tab / Escape
- Agent 模式: Ctrl+. / Cmd+.

## 下一步

- 在日常编码中多练习这些快捷键
- 继续学习其他配置教程
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
