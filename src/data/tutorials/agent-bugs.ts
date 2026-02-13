import type { Tutorial } from '../../types';

export const agentBugsTutorial: Tutorial = {
  id: 'agent-bugs',
  title: '查找并修复 Bug',
  description: '学习如何向 Agent 描述 Bug 并使用调试策略, 高效定位和修复代码问题',
  difficulty: 'beginner',
  estimatedTime: 12,
  category: 'agents',
  order: 203,
  prerequisites: ['agent-working'],
  isPublished: true,
  steps: [
    {
      id: 'describe-bug',
      order: 1,
      title: 'Bug 描述技巧',
      content: `
# 如何向 Agent 描述 Bug

Bug 描述的质量直接决定 Agent 能否快速定位问题。一个好的 Bug 描述包含四个要素:

## 四要素法

| 要素 | 说明 | 示例 |
|------|------|------|
| 现象 | 实际发生了什么 | 页面加载后冻结, 浏览器标签无响应 |
| 预期 | 应该发生什么 | 页面正常显示仪表盘数据 |
| 复现步骤 | 怎么触发这个问题 | 登录后导航到 /dashboard |
| 错误信息 | 控制台或日志中的报错 | "Maximum update depth exceeded" |
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'debug-flow',
      order: 2,
      title: 'Agent 调试流程',
      content: `
# Agent 调试流程

Agent 修复 Bug 的过程和人类开发者类似, 遵循一个系统化的流程:

## 五步调试法

1. **定位文件** - 根据错误信息和堆栈追踪找到出问题的文件
2. **理解上下文** - 阅读相关代码, 理解函数的输入输出和调用关系
3. **分析原因** - 找到 Bug 的根本原因, 而不只是表面现象
4. **编写修复** - 用最小改动修复问题, 避免引入新 Bug
5. **验证结果** - 确认修复有效, 检查是否影响其他功能

## 给 Agent 提供的关键信息

- 出错的文件路径和行号
- 完整的错误信息或堆栈追踪
- 相关的输入数据 (什么值导致了崩溃)
- 用 @ 引用相关文件, 让 Agent 看到完整上下文
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'prompt-templates',
      order: 3,
      title: 'Prompt 模板与示例',
      content: `
# 常见 Bug 类型的 Prompt 模板

展开下方的示例对话, 对比模糊描述和精确描述的效果差异。

## 精确 Bug 报告的关键要素

- 指明出错的文件路径和行号
- 粘贴完整的错误信息
- 描述输入数据和边界条件
- 用 @ 引用相关文件提供上下文
- 说明预期行为和实际行为的差异
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'common-bugs',
      order: 4,
      title: '常见 Bug 类型',
      content: `
# 常见 Bug 类型及调试策略

不同类型的 Bug 需要不同的调试策略:

| Bug 类型 | 典型表现 | 调试策略 |
|----------|----------|----------|
| 空值错误 | "Cannot read properties of undefined" | 检查变量是否可能为 null/undefined, 添加空值保护 |
| 无限循环 | 页面冻结, "Maximum update depth exceeded" | 检查 useEffect 依赖数组, 检查状态更新是否触发重渲染 |
| 类型错误 | "xxx is not a function" | 检查变量类型, 确认 API 返回的数据结构 |
| 异步问题 | 数据显示为空或闪烁 | 检查 async/await 使用, 确认数据加载时序 |
| 样式问题 | 布局错乱, 元素重叠 | 检查 CSS 优先级, Flexbox/Grid 属性, 响应式断点 |

## 调试 Prompt 模板

\`\`\`
修复 [文件路径] 中的 [Bug 类型]:
- 错误信息: [完整错误文本]
- 出错位置: [函数名] 第 [行号] 行
- 触发条件: [什么操作/数据导致了问题]
- 预期行为: [应该怎样]
- @[相关文件1] @[相关文件2]
\`\`\`
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

回答以下问题, 测试你对 Agent 调试策略的掌握。
      `,
      type: 'quiz',
      quiz: {
        question: '向 Agent 报告 Bug 时, 以下哪种描述最有效?',
        type: 'single',
        options: [
          { id: 'a', text: '"我的应用坏了, 请修复"' },
          { id: 'b', text: '"页面有个 Bug, 好像是 JavaScript 报错了"' },
          {
            id: 'c',
            text: '"src/utils/format.ts 第 15 行的 formatCurrency() 在 amount 为 null 时抛出 TypeError, 预期应返回 $0.00"',
          },
          { id: 'd', text: '"控制台有红色报错, 帮我看看怎么回事"' },
        ],
        correctAnswer: 'c',
        explanation:
          '选项 C 提供了完整的四要素: 出错文件和行号、具体函数名、触发条件 (amount 为 null)、' +
          '预期行为 ($0.00)。这让 Agent 能直接定位问题并编写修复代码。' +
          '其他选项缺少关键信息, Agent 需要反复追问才能开始工作。',
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

- Bug 描述的四要素法 (现象、预期、复现步骤、错误信息)
- Agent 调试的五步流程
- 常见 Bug 类型的调试策略
- 精确 Bug 报告的 Prompt 模板

## 下一步

- 下次遇到 Bug 时, 用四要素法组织描述
- 记得用 @ 引用相关文件给 Agent 提供上下文
- 继续学习下一课: 审查和测试代码
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
