import type { SimulationScenario } from '../../types';

export const tabScenarios: SimulationScenario[] = [
  {
    id: 'tab-function-completion',
    title: '函数补全练习',
    description: '使用 Tab 完成一个函数定义',
    initialCode: `function calculateSum(a, b) {
  // 在这里开始输入
}`,
    language: 'javascript',
    targetCommand: {
      type: 'tab',
      shortcut: 'Tab',
      description: '自动补全代码',
    },
    steps: [
      {
        order: 1,
        instruction: '在第2行输入 "return a +" 然后按 Tab 键',
        trigger: { type: 'keystroke', value: 'Tab' },
        response: {
          type: 'code-completion',
          content: 'return a + b;',
          delay: 300,
        },
      },
    ],
    hints: [
      '先输入 "return a +" 触发 AI 建议',
      '当看到灰色提示时，按 Tab 接受',
    ],
  },
  {
    id: 'tab-variable-completion',
    title: '变量补全练习',
    description: '使用 Tab 完成变量名',
    initialCode: `const greeting = "Hello";
const name = "Cursor";
console.log(gree`,
    language: 'javascript',
    targetCommand: {
      type: 'tab',
      shortcut: 'Tab',
      description: '自动补全变量名',
    },
    steps: [
      {
        order: 1,
        instruction: '在第3行末尾按 Tab 键完成 "greeting"',
        trigger: { type: 'keystroke', value: 'Tab' },
        response: {
          type: 'code-completion',
          content: 'greeting',
          delay: 200,
        },
      },
    ],
    hints: [
      '输入 "gree" 后按 Tab',
      'AI 会建议 "greeting" 变量',
    ],
  },
  {
    id: 'tab-multi-line',
    title: '多行补全练习',
    description: '使用 Tab 接受多行代码建议',
    initialCode: `function fibonacci(n) {
  if (n <= 1) return n;
  // AI 可能建议完整的递归实现`,
    language: 'javascript',
    targetCommand: {
      type: 'tab',
      shortcut: 'Tab',
      description: '接受多行建议',
    },
    steps: [
      {
        order: 1,
        instruction: '在第3行按 Tab 接受多行建议',
        trigger: { type: 'keystroke', value: 'Tab' },
        response: {
          type: 'code-completion',
          content: `  return fibonacci(n - 1) + fibonacci(n - 2);`,
          delay: 500,
        },
      },
    ],
    hints: [
      '多行建议可能需要更长的延迟',
      'Tab 会一次性接受所有建议行',
    ],
  },
  {
    id: 'tab-practice-mixed',
    title: '综合 Tab 练习',
    description: '综合运用 Tab 完成各种代码',
    initialCode: `// 完成以下函数
function formatUser(name, age) {

}`,
    language: 'javascript',
    targetCommand: {
      type: 'tab',
      shortcut: 'Tab',
      description: 'Tab 自动补全',
    },
    steps: [
      {
        order: 1,
        instruction: '输入 "return {" 然后按 Tab',
        trigger: { type: 'keystroke', value: 'Tab' },
        response: {
          type: 'code-completion',
          content: `  return {
    name: name,
    age: age,
    formatted: \`\${name} (\${age}岁)\`
  };`,
          delay: 400,
        },
      },
    ],
    hints: [
      '尝试输入函数返回值的开始',
      'AI 会建议完整的对象结构',
    ],
  },
];

export function getTabScenarioById(id: string): SimulationScenario | undefined {
  return tabScenarios.find(s => s.id === id);
}
