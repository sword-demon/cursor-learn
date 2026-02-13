import type { SimulationScenario } from '../../types';

export const ctrlLScenarios: SimulationScenario[] = [
  {
    id: 'ctrl-l-basic-chat',
    title: '基础 AI 对话',
    description: '使用 Ctrl+L 与 AI 进行基本对话',
    initialCode: `function slowCalculation(n) {
  let result = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result += i * j;
    }
  }
  return result;
}`,
    language: 'javascript',
    targetCommand: {
      type: 'ctrl-l',
      shortcut: 'Ctrl+L',
      description: 'AI 聊天面板',
    },
    steps: [
      {
        order: 1,
        instruction: '按 Ctrl+L 打开聊天面板',
        trigger: { type: 'command', value: 'Ctrl+L' },
        response: {
          type: 'chat-message',
          content: 'AI 聊天面板已打开。当前文件上下文已加载。',
          delay: 200,
        },
      },
      {
        order: 2,
        instruction: '输入 "如何优化这个函数？"',
        trigger: { type: 'keystroke', value: 'Enter' },
        response: {
          type: 'chat-message',
          content: `这个函数的时间复杂度是 O(n²)，可以尝试以下优化：

1. **数学公式**: 使用数学公式替代嵌套循环
   \`\`\`javascript
   function fastCalculation(n) {
     const sum = (n * (n - 1)) / 2;
     return sum * sum;
   }
   \`\`\`

2. **缓存结果**: 如果 n 值重复出现，可以使用 memoization

3. **Web Worker**: 对于大数值计算，考虑移到后台线程

需要我帮你实现其中任何一种吗？`,
          delay: 1500,
        },
      },
    ],
    hints: [
      'Ctrl+L 打开/关闭聊天面板',
      'AI 会自动包含当前文件内容',
    ],
  },
  {
    id: 'ctrl-l-context',
    title: '上下文感知对话',
    description: '体验 Cursor 的上下文感知功能',
    initialCode: `class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  validate() {
    // TODO: 实现验证逻辑
  }
}`,
    language: 'javascript',
    targetCommand: {
      type: 'ctrl-l',
      shortcut: 'Ctrl+L',
      description: '上下文聊天',
    },
    steps: [
      {
        order: 1,
        instruction: '按 Ctrl+L 打开聊天',
        trigger: { type: 'command', value: 'Ctrl+L' },
        response: {
          type: 'chat-message',
          content: '聊天面板已打开。已加载 User 类上下文。',
          delay: 200,
        },
      },
      {
        order: 2,
        instruction: '输入 "完善 validate 方法"',
        trigger: { type: 'keystroke', value: 'Enter' },
        response: {
          type: 'chat-message',
          content: `基于 User 类，我来帮你完善 validate 方法：

\`\`\`javascript
validate() {
  const errors = [];

  // 验证名称
  if (!this.name || this.name.trim().length < 2) {
    errors.push('名称至少需要 2 个字符');
  }

  // 验证邮箱
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!this.email || !emailRegex.test(this.email)) {
    errors.push('邮箱格式不正确');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
\`\`\`

点击 Apply 按钮可直接应用到代码中。`,
          delay: 1800,
        },
      },
    ],
    hints: [
      'Cursor 自动包含当前文件',
      '可以直接引用代码中的元素',
    ],
  },
  {
    id: 'ctrl-l-apply-code',
    title: '应用 AI 代码',
    description: '学习如何应用 AI 建议的代码',
    initialCode: `function greetUser(name) {
  return "Hello " + name;
}`,
    language: 'javascript',
    targetCommand: {
      type: 'ctrl-l',
      shortcut: 'Ctrl+L',
      description: '应用代码建议',
    },
    steps: [
      {
        order: 1,
        instruction: '按 Ctrl+L 打开聊天',
        trigger: { type: 'command', value: 'Ctrl+L' },
        response: {
          type: 'chat-message',
          content: '聊天面板已打开。',
          delay: 200,
        },
      },
      {
        order: 2,
        instruction: '输入 "使用模板字符串优化"',
        trigger: { type: 'keystroke', value: 'Enter' },
        response: {
          type: 'chat-message',
          content: `建议使用模板字符串：

\`\`\`javascript
function greetUser(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

[Apply] [Copy] [Dismiss]`,
          delay: 1200,
        },
      },
    ],
    hints: [
      'AI 回答中的代码块可以一键应用',
      '也可以复制或忽略建议',
    ],
  },
];

export function getCtrlLScenarioById(id: string): SimulationScenario | undefined {
  return ctrlLScenarios.find(s => s.id === id);
}
