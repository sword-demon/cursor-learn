import type { SimulationScenario } from '../../types';

/**
 * 项目实战场景 - Todo 应用开发
 * 综合练习 Tab、Ctrl+K、Ctrl+L 等命令
 */

export const projectScenarios: SimulationScenario[] = [
  {
    id: 'project-setup',
    title: '项目初始化',
    description: '使用 Cursor 初始化一个新的 React 项目',
    initialCode: `// 在终端中执行以下命令
// 使用 Vite 创建 React + TypeScript 项目`,
    language: 'typescript',
    targetCommand: {
      type: 'ctrl-k',
      shortcut: 'Ctrl+K',
      description: '生成项目初始化代码',
    },
    steps: [
      {
        order: 1,
        instruction: '选中上面的注释，按 Ctrl+K，然后输入"生成 Vite React TypeScript 项目的命令"',
        trigger: { type: 'command', value: 'Ctrl+K' },
        response: {
          type: 'inline-edit',
          content: `npm create vite@latest todo-app -- --template react-ts
cd todo-app
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`,
          delay: 500,
        },
      },
    ],
    hints: [
      '选中注释文字',
      '按 Ctrl+K 打开内联编辑',
      '输入提示让 AI 生成命令',
    ],
  },
  {
    id: 'project-data-model',
    title: '定义数据模型',
    description: '创建 Todo 应用的数据类型定义',
    initialCode: `// src/types/todo.ts
// 定义 Todo 数据接口`,
    language: 'typescript',
    targetCommand: {
      type: 'ctrl-k',
      shortcut: 'Ctrl+K',
      description: '生成 Todo 类型定义',
    },
    steps: [
      {
        order: 1,
        instruction: '选中上面的注释，按 Ctrl+K 输入"生成完整的 Todo 类型定义，包括 id, text, completed, createdAt"',
        trigger: { type: 'command', value: 'Ctrl+K' },
        response: {
          type: 'inline-edit',
          content: `export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';`,
          delay: 400,
        },
      },
    ],
    hints: [
      '使用 Ctrl+K 生成代码',
      '明确指定需要的字段',
    ],
  },
  {
    id: 'project-components',
    title: '创建组件',
    description: '使用 Tab 和 Ctrl+K 快速创建组件',
    initialCode: `// src/components/TodoInput.tsx
import { useState } from 'react';

export function TodoInput() {
  // 实现输入组件
}`,
    language: 'typescript',
    targetCommand: {
      type: 'tab',
      shortcut: 'Tab',
      description: '自动补全组件代码',
    },
    steps: [
      {
        order: 1,
        instruction: '在第5行输入 "const [text, setText] = useState" 然后按 Tab',
        trigger: { type: 'keystroke', value: 'Tab' },
        response: {
          type: 'code-completion',
          content: `  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      // 添加待办
      setText('');
    }
  };`,
          delay: 300,
        },
      },
    ],
    hints: [
      '输入 useState 的开头',
      '按 Tab 接受 AI 建议',
    ],
  },
  {
    id: 'project-state',
    title: '状态管理',
    description: '实现待办列表的状态管理',
    initialCode: `// src/components/TodoApp.tsx
import { useState } from 'react';
import type { Todo } from '../types/todo';

export function TodoApp() {
  // 管理待办列表状态
}`,
    language: 'typescript',
    targetCommand: {
      type: 'ctrl-k',
      shortcut: 'Ctrl+K',
      description: '生成状态管理代码',
    },
    steps: [
      {
        order: 1,
        instruction: '选中 "// 管理待办列表状态"，按 Ctrl+K 输入"添加待办列表状态和增删改方法"',
        trigger: { type: 'command', value: 'Ctrl+K' },
        response: {
          type: 'inline-edit',
          content: `  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    }]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };`,
          delay: 600,
        },
      },
    ],
    hints: [
      '使用 Ctrl+K 生成完整代码',
      'AI 会生成增删改方法',
    ],
  },
  {
    id: 'project-persistence',
    title: '数据持久化',
    description: '添加 localStorage 持久化功能',
    initialCode: `// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 实现 localStorage hook
}`,
    language: 'typescript',
    targetCommand: {
      type: 'tab',
      shortcut: 'Tab',
      description: '补全 localStorage hook',
    },
    steps: [
      {
        order: 1,
        instruction: '在第5行输入 "const [storedValue, setStoredValue]" 然后按 Tab',
        trigger: { type: 'keystroke', value: 'Tab' },
        response: {
          type: 'code-completion',
          content: `  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;`,
          delay: 700,
        },
      },
    ],
    hints: [
      '输入状态声明的开头',
      '按 Tab 接受多行补全',
    ],
  },
  {
    id: 'project-styling',
    title: '界面美化',
    description: '使用 Tailwind CSS 美化界面',
    initialCode: `<!-- TodoItem 组件 -->
<li>
  <input type="checkbox" />
  <span>待办事项文本</span>
  <button>删除</button>
</li>`,
    language: 'html',
    targetCommand: {
      type: 'ctrl-k',
      shortcut: 'Ctrl+K',
      description: '美化组件样式',
    },
    steps: [
      {
        order: 1,
        instruction: '选中整个 li 元素，按 Ctrl+K 输入"添加 Tailwind 样式，使其美观现代"',
        trigger: { type: 'command', value: 'Ctrl+K' },
        response: {
          type: 'inline-edit',
          content: `<li className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
  <input
    type="checkbox"
    className="w-5 h-5 rounded border-gray-300 text-[#C41E3A] focus:ring-[#C41E3A]"
  />
  <span className="flex-1 text-gray-700 dark:text-gray-300 line-clamp-1">
    待办事项文本
  </span>
  <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  </button>
</li>`,
          delay: 800,
        },
      },
    ],
    hints: [
      '选中整个元素',
      '使用 Ctrl+K 批量添加样式',
    ],
  },
  {
    id: 'project-debug',
    title: '调试与优化',
    description: '修复常见错误并优化代码',
    initialCode: `// 有错误的代码
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
}`,
    language: 'typescript',
    targetCommand: {
      type: 'ctrl-k',
      shortcut: 'Ctrl+K',
      description: '修复代码错误',
    },
    steps: [
      {
        order: 1,
        instruction: '选中整个函数，按 Ctrl+K 输入"添加 TypeScript 类型定义并修复缺少的分号"',
        trigger: { type: 'command', value: 'Ctrl+K' },
        response: {
          type: 'inline-edit',
          content: `import type { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
}

function TodoList({ todos }: TodoListProps) {
  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <li key={todo.id} className="p-2 bg-gray-50 rounded">
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`,
          delay: 500,
        },
      },
    ],
    hints: [
      '使用 Ctrl+K 快速修复',
      'AI 会添加类型和修复格式',
    ],
  },
];

/**
 * 获取项目场景
 */
export function getProjectScenarioById(id: string): SimulationScenario | undefined {
  return projectScenarios.find(s => s.id === id);
}

/**
 * 获取所有项目场景
 */
export function getAllProjectScenarios(): SimulationScenario[] {
  return projectScenarios;
}

export default projectScenarios;
