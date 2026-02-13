import type { SimulationScenario } from '../../types';

export const atScenarios: SimulationScenario[] = [
  {
    id: 'at-file',
    title: '@file 引用文件',
    description: '学习使用 @file 引用项目文件',
    initialCode: `// 当前文件: main.ts
import { calculate } from './utils';

const result = calculate(10, 20);
console.log(result);`,
    language: 'typescript',
    targetCommand: {
      type: 'at-mention',
      shortcut: '@',
      description: '@file 引用',
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
        instruction: '输入 "检查 @file:utils.ts 的实现"',
        trigger: { type: 'keystroke', value: 'Enter' },
        response: {
          type: 'chat-message',
          content: `@file:utils.ts 的内容：

\`\`\`typescript
export function calculate(a: number, b: number): number {
  // 当前实现只是简单相加
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}
\`\`\`

分析：
- calculate 函数正确实现了加法
- 还提供了 multiply 乘法函数
- 两个函数都有完整的类型注解

你可以使用 multiply 函数来扩展功能。`,
          delay: 1500,
        },
      },
    ],
    hints: [
      '@file:文件名 引用整个文件',
      'AI 会读取文件内容作为上下文',
    ],
  },
  {
    id: 'at-code',
    title: '@code 引用代码',
    description: '学习使用 @code 引用选中代码',
    initialCode: `function processData(items) {
  return items
    .filter(item => item.active)
    .map(item => ({
      id: item.id,
      name: item.name.toUpperCase(),
      value: item.price * item.quantity
    }));
}`,
    language: 'javascript',
    targetCommand: {
      type: 'at-mention',
      shortcut: '@',
      description: '@code 引用',
    },
    steps: [
      {
        order: 1,
        instruction: '选中 processData 函数，按 Ctrl+L',
        trigger: { type: 'command', value: 'Ctrl+L' },
        response: {
          type: 'chat-message',
          content: '聊天面板已打开。已检测到选中的代码。',
          delay: 200,
        },
      },
      {
        order: 2,
        instruction: '输入 "解释 @code 的作用"',
        trigger: { type: 'keystroke', value: 'Enter' },
        response: {
          type: 'chat-message',
          content: `@code 的处理流程分析：

1. **filter**: 筛选出 active = true 的项
   - 移除非活跃项目

2. **map**: 转换数据结构
   - id: 保留原始 ID
   - name: 转为大写
   - value: 计算总价 (price × quantity)

3. **返回值**: 新的对象数组

复杂度：O(n) - 两次遍历合并为一次

建议：如果数据量大，可以考虑添加错误处理。`,
          delay: 1500,
        },
      },
    ],
    hints: [
      '先选中代码再打开聊天',
      '@code 会自动引用选中内容',
    ],
  },
  {
    id: 'at-docs',
    title: '@docs 引用文档',
    description: '学习使用 @docs 获取官方文档',
    initialCode: `import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return <div>{/* 渲染用户列表 */}</div>;
}`,
    language: 'typescript',
    targetCommand: {
      type: 'at-mention',
      shortcut: '@',
      description: '@docs 引用',
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
        instruction: '输入 "@docs:React useEffect 的依赖数组用法"',
        trigger: { type: 'keystroke', value: 'Enter' },
        response: {
          type: 'chat-message',
          content: `根据 React 官方文档：

**useEffect 依赖数组**：

1. **空数组 []**: 只在挂载时执行
   \`\`\`javascript
   useEffect(() => { ... }, []);
   \`\`\`

2. **有依赖**: 依赖变化时重新执行
   \`\`\`javascript
   useEffect(() => { ... }, [userId]);
   \`\`\`

3. **无数组**: 每次渲染都执行
   \`\`\`javascript
   useEffect(() => { ... });
   \`\`\`

**当前代码分析**：
你的代码使用了空数组，所以 fetchUsers 只在组件挂载时调用一次。这是正确的数据获取模式。`,
          delay: 1800,
        },
      },
    ],
    hints: [
      '@docs:文档名 搜索官方文档',
      'AI 会基于最新文档回答',
    ],
  },
  {
    id: 'at-combined',
    title: '@ 组合使用',
    description: '学习组合多个 @ 引用',
    initialCode: `// api.ts
export async function fetchUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

// types.ts
interface User {
  id: string;
  name: string;
  email: string;
}`,
    language: 'typescript',
    targetCommand: {
      type: 'at-mention',
      shortcut: '@',
      description: '组合 @ 引用',
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
        instruction: '输入 "@file:api.ts 和 @file:types.ts 是否一致？"',
        trigger: { type: 'keystroke', value: 'Enter' },
        response: {
          type: 'chat-message',
          content: `比较两个文件的一致性：

**@file:api.ts**:
- fetchUser 返回 Promise<any>
- 没有类型约束

**@file:types.ts**:
- 定义了 User 接口
- 有完整的类型定义

**问题发现**：
⚠️ api.ts 没有使用 types.ts 中的 User 类型！

**建议修改**：
\`\`\`typescript
import { User } from './types';

export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}
\`\`\`

这样 API 和类型定义就一致了。`,
          delay: 2000,
        },
      },
    ],
    hints: [
      '可以在一句话中引用多个 @',
      'AI 会综合分析所有引用',
    ],
  },
];

export function getAtScenarioById(id: string): SimulationScenario | undefined {
  return atScenarios.find(s => s.id === id);
}
