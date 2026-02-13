import type { Tutorial } from '../../types';

export const commandsCtrlKTutorial: Tutorial = {
  id: 'commands-ctrl-k',
  title: 'Ctrl+K 内联编辑',
  description: '学习如何使用 Ctrl+K 让 AI 直接编辑你的代码',
  difficulty: 'beginner',
  estimatedTime: 5,
  category: 'commands',
  order: 3,
  prerequisites: ['commands-tab'],
  isPublished: true,
  steps: [
    {
      id: 'intro',
      order: 1,
      title: 'Ctrl+K 简介',
      content: `
# Ctrl+K：AI 内联编辑

Ctrl+K 是 Cursor 的 AI 内联编辑功能。你可以选中代码，然后让 AI 帮你修改、重构或解释它。

## 使用方法

1. 选中要编辑的代码
2. 按 **Ctrl+K** (Windows/Linux) 或 **Cmd+K** (Mac)
3. 输入你的需求
4. AI 会直接在编辑器中修改代码

这比复制粘贴到聊天窗口更高效！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'basic-edit',
      order: 2,
      title: '基础编辑',
      content: `
# 基础编辑示例

试试选中以下函数，然后按 Ctrl+K，输入 "添加类型注解"：

｠｠｠javascript
function add(a, b) {
  return a + b;
}
｠｠｠

AI 会直接在编辑器中添加 TypeScript 类型注解。
      `,
      type: 'simulation',
      simulationId: 'ctrl-k-add-types',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'refactor',
      order: 3,
      title: '代码重构',
      content: `
# 代码重构

Ctrl+K 也可以帮你重构代码：

｠｠｠javascript
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}
｠｠｠

选中函数，按 Ctrl+K，输入 "使用 reduce 重构"。
      `,
      type: 'simulation',
      simulationId: 'ctrl-k-refactor',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'explain',
      order: 4,
      title: '解释代码',
      content: `
# 解释代码

你可以让 AI 解释选中的代码：

｠｠｠javascript
const result = data
  .filter(x => x.active)
  .map(x => x.value)
  .reduce((a, b) => a + b, 0);
｠｠｠

选中代码，按 Ctrl+K，输入 "解释这段代码"。
      `,
      type: 'simulation',
      simulationId: 'ctrl-k-explain',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'tips',
      order: 5,
      title: '使用技巧',
      content: `
# Ctrl+K 使用技巧

## 1. 精确描述
描述越具体，结果越好。与其说 "优化"，不如说 "优化性能，减少时间复杂度"。

## 2. 多轮对话
可以在同一选中区域连续使用 Ctrl+K 进行多轮修改。

## 3. 撤销修改
如果不满意结果，按 **Ctrl+Z** 撤销。

## 4. 接受/拒绝
按 **Ctrl+Enter** 接受修改，**Escape** 取消。

## 5. 无选中使用
不选中代码直接按 Ctrl+K，AI 会根据光标位置提供建议。
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

你已经掌握了 Ctrl+K 内联编辑。

## 复习要点

- 选中代码 + Ctrl+K 开始编辑
- 输入自然语言描述需求
- AI 直接在编辑器中修改
- 可以撤销或取消修改

## 下一步

学习 Ctrl+L 开始 AI 聊天对话！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
  ],
};
