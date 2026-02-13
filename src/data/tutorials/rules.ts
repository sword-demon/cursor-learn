import type { Tutorial } from '../../types';

export const rulesTutorial: Tutorial = {
  id: 'rules',
  title: '.cursorrules 编写指南',
  description: '学习如何编写 .cursorrules 文件来自定义 AI 行为',
  difficulty: 'intermediate',
  estimatedTime: 15,
  category: 'rules',
  order: 6,
  prerequisites: ['commands-at'],
  isPublished: true,
  steps: [
    {
      id: 'intro',
      order: 1,
      title: '什么是 .cursorrules',
      content: `
# .cursorrules 文件

.cursorrules 是一个配置文件，你可以在其中定义 AI 的行为规则。它放在项目根目录，Cursor 会自动读取。

## 为什么需要它？

- 统一团队的代码风格
- 让 AI 了解项目规范
- 减少重复说明
- 提高 AI 回答的准确性

## 文件位置

在项目根目录创建：
｠｠｠
your-project/
  ├── .cursorrules  ← 在这里
  ├── src/
  └── package.json
｠｠｠
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'basic-structure',
      order: 2,
      title: '基本结构',
      content: `
# 基本结构

.cursorrules 使用纯文本格式，每行一个规则：

｠｠｠
# 代码风格
- 使用 2 空格缩进
- 使用单引号
- 省略分号

# React 规范
- 使用函数组件
- Props 需要类型定义
- 使用 hooks 而不是类组件

# 注释规范
- JSDoc 格式
- 解释 "为什么" 而不是 "做了什么"
｠｠｠

规则越详细，AI 越能按照你的期望工作。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'code-style',
      order: 3,
      title: '代码风格规则',
      content: `
# 代码风格示例

｠｠｠
# JavaScript/TypeScript 风格
- 优先使用 const，必要时使用 let，从不使用 var
- 使用模板字符串而不是字符串拼接
- 使用箭头函数作为回调
- 异步代码使用 async/await

# 命名规范
- 变量和函数使用 camelCase
- 常量使用 UPPER_SNAKE_CASE
- 类和组件使用 PascalCase
- 私有方法使用 _ 前缀

# 代码组织
- 每个文件一个默认导出
- 相关功能放在同一目录
- 工具函数放在 utils/ 目录
｠｠｠
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'framework',
      order: 4,
      title: '框架特定规则',
      content: `
# 框架规则示例

｠｠｠
# React
- 使用函数组件和 hooks
- Props 使用 TypeScript 接口定义
- 使用 React.FC 类型
- 事件处理函数以 handle 开头

# Vue
- 使用 Composition API
- 使用 <script setup> 语法
- 组件名使用 PascalCase

# 样式
- 优先使用 Tailwind CSS
- 自定义样式使用 CSS Modules
- 颜色使用设计系统的变量
｠｠｠
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'builder',
      order: 5,
      title: '规则生成器',
      content: `
# 使用规则生成器

我们提供了一个可视化工具来生成 .cursorrules 文件。

在下一页，你可以选择：
- 代码风格偏好
- 使用的框架
- 命名规范
- 注释风格

然后一键生成配置文件！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'testing',
      order: 6,
      title: '测试规则',
      content: `
# 测试你的规则

编写完 .cursorrules 后，让 AI 生成一些代码来测试：

"创建一个用户认证的 React 组件"

检查生成的代码是否符合你的规则。如果不符合，回到 .cursorrules 添加更具体的说明。

## 迭代优化

.cursorrules 是一个持续优化的过程：
1. 添加基础规则
2. 测试 AI 生成
3. 发现不符合的地方
4. 添加更具体的规则
5. 重复直到满意
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'complete',
      order: 7,
      title: '完成',
      content: `
# 完成！

你已经了解了 .cursorrules 文件的作用和编写方法。

## 复习要点

- .cursorrules 在项目根目录
- 定义代码风格和规范
- 可以针对特定框架
- 需要迭代优化

## 下一步

使用规则生成器创建你自己的 .cursorrules 文件！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
  ],
};
