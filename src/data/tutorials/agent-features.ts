import type { Tutorial } from '../../types';

export const agentFeaturesTutorial: Tutorial = {
  id: 'agent-features',
  title: '快速构建功能',
  description: '学习如何利用 Agent 拆分需求、编写规格、迭代开发, 高效构建新功能',
  difficulty: 'beginner',
  estimatedTime: 15,
  category: 'agents',
  order: 202,
  prerequisites: ['agent-working'],
  isPublished: true,
  steps: [
    {
      id: 'dev-workflow',
      order: 1,
      title: '功能开发流程',
      content: `
# 用 Agent 构建功能的完整流程

开发一个新功能不是一步到位的事。和 Agent 协作时, 遵循清晰的流程能大幅提升效率:

## 四步流程

1. **需求描述** - 告诉 Agent 你要做什么, 包括功能目标和约束条件
2. **规格编写** - 让 Agent 帮你定义数据模型、接口和文件结构
3. **分步实现** - 按模块逐步实现, 每步检查结果
4. **验证测试** - 确认功能正常工作, 处理边界情况
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'splitting-requirements',
      order: 2,
      title: '拆分需求',
      content: `
# 如何将大功能拆分为小任务

大功能直接丢给 Agent 往往效果不好。学会拆分是关键技能。

## 拆分策略: 三层法

| 层级 | 内容 | 示例 |
|------|------|------|
| 数据层 | 类型定义、数据模型 | CartItem 接口、CartState 类型 |
| 逻辑层 | 核心业务逻辑 | addItem、removeItem、getTotal |
| 展示层 | UI 组件和交互 | CartIcon、CartDrawer、CartPage |

## 拆分原则

- 每个任务只做一件事
- 每个任务完成后都是可工作的状态
- 后面的任务依赖前面的结果
- 每步完成后检查, 发现问题及时纠正
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'prompt-examples',
      order: 3,
      title: 'Prompt 示例对比',
      content: `
# 构建功能的 Prompt 对比

展开下方的示例对话, 对比模糊请求和精确请求的效果差异。

精确的 prompt 包含:
- 明确的分步计划 (Phase 1, 2, 3)
- 具体的文件路径和类型定义
- 参考现有代码模式
- 每步完成后暂停等待确认
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'iterative-dev',
      order: 4,
      title: '迭代开发策略',
      content: `
# 小步快跑: 迭代开发策略

## 为什么不要一次性完成?

一次性给 Agent 太多需求会导致:
- 上下文窗口被占满, 后面的代码质量下降
- 出错时难以定位问题
- 修改一处可能影响其他部分

## 迭代开发的节奏

| 阶段 | 做什么 | 检查什么 |
|------|--------|----------|
| 第 1 轮 | 数据模型 + 类型定义 | 类型是否完整, 字段是否合理 |
| 第 2 轮 | 核心逻辑 + 单元测试 | 逻辑是否正确, 测试是否通过 |
| 第 3 轮 | UI 组件 + 交互 | 界面是否正常, 交互是否流畅 |
| 第 4 轮 | 边界情况 + 优化 | 异常处理, 性能, 用户体验 |

## TDD 方法

让 Agent 先写测试, 再写实现:

1. 描述函数的输入和预期输出
2. 让 Agent 生成测试代码
3. 让 Agent 写实现代码通过测试
4. 所有测试通过 = 功能完成
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'quiz',
      order: 5,
      title: '知识检测',
      content: `
# 检验你的理解

回答以下问题, 测试你对 Agent 构建功能策略的掌握。
      `,
      type: 'quiz',
      quiz: {
        question: '使用 Agent 构建新功能时, 以下哪种做法最有效?',
        type: 'single',
        options: [
          { id: 'a', text: '"一次性把所有需求写在一个 prompt 里, 让 Agent 全部完成"' },
          { id: 'b', text: '"只告诉 Agent 功能名称, 让它自己决定怎么实现"' },
          {
            id: 'c',
            text: '"将功能拆分为数据层、逻辑层、展示层, 分步实现并逐步检查"',
          },
          { id: 'd', text: '"先让 Agent 写完所有代码, 最后再一起测试"' },
        ],
        correctAnswer: 'c',
        explanation:
          '选项 C 是最有效的方法。将功能拆分为小任务, 分步实现并逐步检查, ' +
          '能确保每一步都是正确的, 出错时容易定位问题。' +
          '选项 A 会导致上下文窗口溢出, 选项 B 缺乏约束导致结果不可控, ' +
          '选项 D 最后才测试会让问题积累到难以修复。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 6,
      title: '教程完成',
      content: `
# 恭喜完成!

你已经学会了:

- 用 Agent 构建功能的四步流程
- 将大功能拆分为小任务的三层法
- 精确 prompt 的编写技巧
- 迭代开发和 TDD 的基本策略

## 下一步

- 在你的项目中尝试用三层法拆分一个功能需求
- 让 Agent 先写测试再写实现
- 继续学习下一课: 查找并修复 Bug
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
