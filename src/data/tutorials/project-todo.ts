import type { Tutorial } from '../../types';

export const projectTodoTutorial: Tutorial = {
  id: 'project-todo',
  title: '项目：待办事项应用',
  description: '使用 Cursor 完成一个完整的待办事项应用项目',
  difficulty: 'intermediate',
  estimatedTime: 30,
  category: 'project',
  order: 7,
  prerequisites: ['rules'],
  isPublished: true,
  steps: [
    {
      id: 'intro',
      order: 1,
      title: '项目介绍',
      content: `
# 待办事项应用项目

在这个项目中，你将使用 Cursor 完成一个完整的 React 待办事项应用。

## 项目目标

- 创建可添加/删除/标记完成的待办事项
- 使用 localStorage 持久化数据
- 添加过滤功能（全部/进行中/已完成）
- 使用 Tailwind CSS 美化界面

## 技术栈

- React + TypeScript
- Tailwind CSS
- localStorage

准备好了吗？让我们开始！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'setup',
      order: 2,
      title: '项目初始化',
      content: `
# 项目初始化

第一步：创建项目结构

在 Cursor 中：
1. 创建新文件夹 todo-app
2. 初始化 Vite React + TypeScript 项目
3. 安装 Tailwind CSS

试试用 Ctrl+K 让 AI 帮你完成项目初始化：

选中这段文字，按 Ctrl+K，输入 "生成项目初始化代码"
      `,
      type: 'simulation',
      simulationId: 'project-setup',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'data-model',
      order: 3,
      title: '定义数据模型',
      content: `
# 定义数据模型

定义待办事项的数据结构：

｠｠｠typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}
｠｠｠

使用 Ctrl+K 让 AI 帮你：
1. 创建 types 文件夹
2. 定义 Todo 接口
3. 添加 CRUD 操作类型
      `,
      type: 'simulation',
      simulationId: 'project-data-model',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'components',
      order: 4,
      title: '创建组件',
      content: `
# 创建组件

分解应用为多个组件：

- **TodoApp**: 主组件
- **TodoInput**: 输入框
- **TodoList**: 待办列表
- **TodoItem**: 单个待办项
- **TodoFilter**: 过滤器

使用 Ctrl+K，输入 "创建 TodoInput 组件，包含输入框和添加按钮"
      `,
      type: 'simulation',
      simulationId: 'project-components',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'state',
      order: 5,
      title: '状态管理',
      content: `
# 状态管理

实现待办事项的状态管理：

1. 使用 useState 管理待办列表
2. 实现添加/删除/切换完成状态
3. 添加过滤状态

按 Ctrl+K，选中主组件，输入 "添加状态管理和处理函数"
      `,
      type: 'simulation',
      simulationId: 'project-state',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'persistence',
      order: 6,
      title: '数据持久化',
      content: `
# 数据持久化

使用 localStorage 保存数据：

1. 页面加载时读取 localStorage
2. 待办列表变化时保存到 localStorage
3. 处理序列化和反序列化

使用 Ctrl+K，输入 "添加 localStorage 持久化功能"
      `,
      type: 'simulation',
      simulationId: 'project-persistence',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'styling',
      order: 7,
      title: '界面美化',
      content: `
# 界面美化

使用 Tailwind CSS 美化界面：

- 添加圆角和阴影
- 设置合适的间距
- 添加悬停效果
- 使用主题色

按 Ctrl+K，输入 "使用 Tailwind 美化待办应用界面"
      `,
      type: 'simulation',
      simulationId: 'project-styling',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'debug',
      order: 8,
      title: '调试与优化',
      content: `
# 调试与优化

测试应用，修复问题：

1. 测试添加/删除功能
2. 测试过滤功能
3. 测试数据持久化
4. 测试空列表状态

遇到问题时，选中问题代码，按 Ctrl+K 询问 AI 如何修复。
      `,
      type: 'simulation',
      simulationId: 'project-debug',
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 9,
      title: '项目完成',
      content: `
# 恭喜完成项目！

你已经使用 Cursor 完成了一个完整的待办事项应用！

## 项目回顾

你学习了：
- 项目初始化和配置
- 组件设计和实现
- 状态管理
- 数据持久化
- 界面美化
- 调试技巧

## 下一步

- 添加更多功能（编辑、拖拽排序）
- 学习更复杂的项目
- 探索 Cursor 的高级功能

你已经准备好用 Cursor 开发真实项目了！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
  ],
};
