import type { Tutorial } from '../../types';

export const agentReviewTutorial: Tutorial = {
  id: 'agent-review',
  title: '审查和测试代码',
  description: '学习如何让 Agent 审查代码质量和编写测试, 关注安全性、性能和可读性',
  difficulty: 'beginner',
  estimatedTime: 12,
  category: 'agents',
  order: 204,
  prerequisites: ['agent-working'],
  isPublished: true,
  steps: [
    {
      id: 'review-basics',
      order: 1,
      title: '代码审查基础',
      content: `
# 让 Agent 审查代码

代码审查是保障代码质量的关键环节。Agent 可以帮你从多个维度审查代码:

## 审查的三个维度

| 维度 | 关注点 | 示例 |
|------|--------|------|
| 安全性 | XSS、SQL 注入、敏感数据泄露 | 用户输入未转义直接渲染到 HTML |
| 性能 | 不必要的重渲染、内存泄漏、大数据处理 | useEffect 缺少依赖导致无限循环 |
| 可读性 | 命名规范、函数长度、代码重复 | 单个函数超过 50 行, 变量名用 a/b/c |
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'review-prompts',
      order: 2,
      title: '审查 Prompt 技巧',
      content: `
# 审查 Prompt 技巧

好的审查请求应该明确范围和关注点, 而不是笼统地说 "帮我看看代码"。

## 审查 Prompt 模板

\`\`\`
Review [文件路径] for [审查维度]:

Focus areas:
- [具体关注的代码区域, 如行号范围]
- [具体关注的问题类型]

Check against [标准/规范, 如 OWASP top 10]
@[相关文件1] @[相关文件2]
\`\`\`

## 关键要素

- 指明要审查的文件路径
- 明确审查维度 (安全/性能/可读性)
- 缩小范围到具体的代码区域
- 用 @ 引用相关的类型定义和依赖文件
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'writing-tests',
      order: 3,
      title: '让 Agent 编写测试',
      content: `
# 让 Agent 编写测试

Agent 可以帮你编写单元测试和集成测试, 但需要提供足够的上下文。

## 测试请求的关键信息

- 要测试的函数和文件路径
- 需要覆盖的场景 (正常流程 + 边界情况)
- 项目使用的测试框架和模式
- 用 @ 引用现有测试文件作为风格参考

## 测试类型

| 类型 | 目的 | 适用场景 |
|------|------|----------|
| 单元测试 | 验证单个函数的输入输出 | 工具函数、计算逻辑、数据转换 |
| 集成测试 | 验证多个模块协作 | API 调用链、表单提交流程 |
| 快照测试 | 检测 UI 意外变化 | 组件渲染结果、样式变更 |

## 测试 Prompt 模板

\`\`\`
Write tests for [文件路径]:

Functions to test:
- [函数名1]: [简要说明]
- [函数名2]: [简要说明]

Cover edge cases: [列出边界情况]
Use patterns from @[现有测试文件]
\`\`\`
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'review-examples',
      order: 4,
      title: 'Prompt 示例对比',
      content: `
# Prompt 示例对比

展开下方的示例对话, 对比模糊审查请求和精确审查请求的效果差异。

## 精确审查请求的关键

- 指明文件路径和代码行号范围
- 明确审查维度和检查标准
- 用 @ 引用相关文件提供上下文
- 要求给出具体的修复建议, 而不只是指出问题
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

回答以下问题, 测试你对代码审查和测试策略的掌握。
      `,
      type: 'quiz',
      quiz: {
        question: '让 Agent 编写测试时, 以下哪种请求最有效?',
        type: 'single',
        options: [
          { id: 'a', text: '"帮我写一些测试"' },
          { id: 'b', text: '"给 src/utils/ 目录下的所有文件写测试"' },
          {
            id: 'c',
            text: '"为 src/utils/cart.ts 的 calculateTotal() 写单元测试, 覆盖空购物车、单件商品、多件商品和折扣场景, 参考 @src/utils/__tests__/format.test.ts 的测试风格"',
          },
          { id: 'd', text: '"写测试, 要求 100% 覆盖率"' },
        ],
        correctAnswer: 'c',
        explanation:
          '选项 C 提供了完整的测试上下文: 具体文件和函数、需要覆盖的场景列表、' +
          '参考的测试风格文件。这让 Agent 能直接编写高质量的测试代码。' +
          '其他选项要么太模糊, 要么范围太大, Agent 无法产出有针对性的测试。',
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

- 代码审查的三个维度 (安全性、性能、可读性)
- 精确审查请求的 Prompt 模板
- 让 Agent 编写单元测试和集成测试的技巧
- 提供测试上下文的关键信息

## 下一步

- 下次提交代码前, 让 Agent 帮你做一次安全审查
- 为核心业务逻辑编写测试, 从最关键的函数开始
- 继续学习下一课: 自定义代理
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
