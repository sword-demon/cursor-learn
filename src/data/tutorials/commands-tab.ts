import type { Tutorial } from '../../types';

export const commandsTabTutorial: Tutorial = {
  id: 'commands-tab',
  title: 'Tab 自动补全',
  description: '学习如何使用 Tab 键让 AI 自动完成你的代码',
  difficulty: 'beginner',
  estimatedTime: 5,
  category: 'commands',
  order: 2,
  prerequisites: ['installation'],
  isPublished: true,
  steps: [
    {
      id: 'intro',
      order: 1,
      title: 'Tab 键简介',
      content: `
# Tab 键：AI 自动补全

Tab 是 Cursor 最核心的功能。当你在编写代码时，AI 会根据上下文预测你想输入的内容，并以灰色建议的形式显示。

## 使用方法

1. 开始输入代码
2. 当看到灰色建议时
3. 按 **Tab** 键接受建议

就这么简单！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'basic-example',
      order: 2,
      title: '基础示例',
      content: `
# 基础示例

试试在编辑器中输入：

｠｠｠javascript
function calculate
｠｠｠

当你输入 "calculate" 后，AI 可能会建议完整的函数名和参数，比如 "calculateSum(a, b)"。

按 **Tab** 接受建议！
      `,
      type: 'simulation',
      simulationId: 'tab-function-completion',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'partial-line',
      order: 3,
      title: '部分行补全',
      content: `
# 部分行补全

Tab 也可以完成当前行的剩余部分：

｠｠｠javascript
const greeting = "Hello";
console.log(gree
｠｠｠

AI 会建议 ｠｠｠greeting｠｠｠，按 Tab 完成单词。
      `,
      type: 'simulation',
      simulationId: 'tab-variable-completion',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'multi-line',
      order: 4,
      title: '多行补全',
      content: `
# 多行补全

Cursor 甚至可以建议多行代码：

｠｠｠javascript
function fibonacci(n) {
  if (n <= 1) return n;
  // AI 可能建议完整的递归实现
｠｠｠

当 AI 建议多行代码时，按 **Tab** 接受整个建议。
      `,
      type: 'simulation',
      simulationId: 'tab-multi-line',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'tips',
      order: 5,
      title: '使用技巧',
      content: `
# Tab 使用技巧

## 1. 灰色表示建议
建议内容以灰色显示，不会实际输入到文件中。

## 2. 继续输入忽略建议
如果你不想接受建议，继续输入即可，建议会自动消失。

## 3. 部分接受
按 **Ctrl + →** (Windows/Linux) 或 **Cmd + →** (Mac) 可以逐字接受建议。

## 4. 接受整行
按 **Tab** 接受整行或整个建议块。

## 5. 多光标支持
在使用多个光标时，每个光标位置都会独立获得建议。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'practice',
      order: 6,
      title: '练习时间',
      content: `
# 练习时间

现在来练习使用 Tab 完成代码！

试着让 AI 帮你完成以下代码：
- 函数定义
- 变量声明
- 条件语句
- 循环结构

记住：看到灰色建议时，按 **Tab**！
      `,
      type: 'practice',
      simulationId: 'tab-practice-mixed',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 7,
      title: '完成',
      content: `
# 恭喜完成！

你已经学会了 Tab 自动补全，这是 Cursor 最常用的功能。

## 复习要点

- Tab 接受 AI 建议
- 灰色文字表示建议内容
- 可以逐字或整行接受
- 继续输入可以忽略建议

## 下一步

继续学习其他命令：
- Ctrl+K：AI 内联编辑
- Ctrl+L：AI 聊天
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
  ],
};
