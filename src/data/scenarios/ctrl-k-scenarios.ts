import type { SimulationScenario } from '../../types';

export const ctrlKScenarios: SimulationScenario[] = [
  {
    id: 'ctrl-k-add-types',
    title: '添加类型注解',
    description: '使用 Ctrl+K 为函数添加 TypeScript 类型',
    initialCode: `function add(a, b) {
  return a + b;
}`,
    language: 'typescript',
    targetCommand: {
      type: 'ctrl-k',
      shortcut: 'Ctrl+K',
      description: 'AI 内联编辑',
    },
    steps: [
      {
        order: 1,
        instruction: '选中整个函数，然后按 Ctrl+K',
        trigger: { type: 'command', value: 'Ctrl+K' },
        response: {
          type: 'inline-edit',
          content: '添加 TypeScript 类型注解：',
          delay: 300,
        },
      },
      {
        order: 2,
        instruction: '输入 "添加类型注解" 并按 Enter',
        trigger: { type: 'keystroke', value: 'Enter' },
        response: {
          type: 'inline-edit',
          content: `function add(a: number, b: number): number {
  return a + b;
}`,
          delay: 800,
        },
      },
    ],
    hints: [
      '先选中要编辑的代码',
      '按 Ctrl+K 打开编辑框',
      '输入你的需求描述',
    ],
  },
  {
    id: 'ctrl-k-refactor',
    title: '重构为 reduce',
    description: '使用 Ctrl+K 重构循环代码',
    initialCode: `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}`,
    language: 'javascript',
    targetCommand: {
      type: 'ctrl-k',
      shortcut: 'Ctrl+K',
      description: 'AI 重构代码',
    },
    steps: [
      {
        order: 1,
        instruction: '选中整个函数，按 Ctrl+K',
        trigger: { type: 'command', value: 'Ctrl+K' },
        response: {
          type: 'inline-edit',
          content: '使用 reduce 重构这段代码：',
          delay: 300,
        },
      },
      {
        order: 2,
        instruction: '输入 "使用 reduce 重构" 并按 Enter',
        trigger: { type: 'keystroke', value: 'Enter' },
        response: {
          type: 'inline-edit',
          content: `function calculateTotal(items) {
  return items.reduce((total, item) =>
    total + item.price * item.quantity, 0);
}`,
          delay: 1000,
        },
      },
    ],
    hints: [
      '明确告诉 AI 你想要什么',
      '可以要求特定的重构方式',
    ],
  },
  {
    id: 'ctrl-k-explain',
    title: '解释代码',
    description: '使用 Ctrl+K 获取代码解释',
    initialCode: `const result = data
  .filter(x => x.active)
  .map(x => x.value)
  .reduce((a, b) => a + b, 0);`,
    language: 'javascript',
    targetCommand: {
      type: 'ctrl-k',
      shortcut: 'Ctrl+K',
      description: 'AI 代码解释',
    },
    steps: [
      {
        order: 1,
        instruction: '选中代码，按 Ctrl+K',
        trigger: { type: 'command', value: 'Ctrl+K' },
        response: {
          type: 'inline-edit',
          content: '解释这段代码的作用：',
          delay: 300,
        },
      },
      {
        order: 2,
        instruction: '输入 "解释这段代码" 并按 Enter',
        trigger: { type: 'keystroke', value: 'Enter' },
        response: {
          type: 'chat-message',
          content: `这段代码的功能：

1. **filter**: 筛选出 active 为 true 的项
2. **map**: 提取每项的 value 值
3. **reduce**: 将所有 value 求和

整体：计算所有活跃项的数值总和`,
          delay: 1200,
        },
      },
    ],
    hints: [
      '选中代码后按 Ctrl+K',
      '直接输入 "解释这段代码"',
    ],
  },
];

export function getCtrlKScenarioById(id: string): SimulationScenario | undefined {
  return ctrlKScenarios.find(s => s.id === id);
}
