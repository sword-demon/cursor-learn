import type { BeginnerTip } from '../../types';

// US7: 使用 Agent 教程 - 小白提示数据
export const beginnerTips: BeginnerTip[] = [
  {
    id: 'tip-agent-harness',
    title: 'Agent Harness 是什么?',
    content:
      '想象你雇了一个非常聪明的助手, 但他刚来你的公司, 对项目一无所知。' +
      'Agent Harness 就是你给这个助手的 "工作手册" - 告诉他项目结构在哪、' +
      '用什么技术栈、遵循什么规范。手册越详细, 助手干活越靠谱。',
    concept: 'Agent Harness',
    tutorialId: 'agent-working',
  },
  {
    id: 'tip-prompt-specificity',
    title: '为什么要写具体的 Prompt?',
    content:
      '就像你去餐厅点菜: 说 "来点吃的" 服务员会很困惑, ' +
      '但说 "一份宫保鸡丁, 微辣, 不要花生" 就很清楚。' +
      '给 Agent 的指令也一样 - 越具体, 结果越符合预期。' +
      '包含文件路径、技术要求、参考示例, Agent 就能精准执行。',
    concept: 'Prompt Engineering',
    tutorialId: 'agent-working',
  },
  {
    id: 'tip-context-window',
    title: '上下文窗口是什么?',
    content:
      'Agent 的 "记忆" 是有限的, 就像一张桌子 - 桌面大小固定, ' +
      '放太多文件就会把旧的挤掉。这就是上下文窗口。' +
      '所以要精选最相关的文件给 Agent 看, 而不是把整个项目都丢给它。' +
      '用 @ 引用具体文件, 比让 Agent 自己找效率高得多。',
    concept: 'Context Window',
    tutorialId: 'agent-working',
  },
  {
    id: 'tip-iterative-approach',
    title: '为什么要分步骤给指令?',
    content:
      '盖房子不会一口气从地基盖到屋顶 - 先打地基, 再砌墙, 最后装修。' +
      '让 Agent 写代码也一样: 先搭框架, 再实现核心逻辑, 最后处理边界情况。' +
      '每一步都检查结果, 发现问题及时纠正, 比一次性给一大堆需求效果好得多。',
    concept: 'Iterative Development',
    tutorialId: 'agent-working',
  },
  // US8: 理解代码库 - 小白提示
  {
    id: 'tip-semantic-search',
    title: '语义搜索是什么?',
    content:
      "普通搜索是 '按关键词找' - 你搜 '登录', 只能找到包含 '登录' 两个字的文件。" +
      "语义搜索是 '按意思找' - 你搜 '用户认证', 它能找到 login、auth、session 相关的代码, " +
      "即使这些文件里没有 '用户认证' 这四个字。就像搜索引擎能理解你想找什么, 而不只是匹配关键词。",
    concept: 'Semantic Search',
    tutorialId: 'agent-codebase',
  },
  {
    id: 'tip-codebase-indexing',
    title: '代码索引是什么?',
    content:
      '想象一本书的目录 - 你不需要翻遍整本书就能找到某个章节。' +
      "代码索引就是 Agent 为你的项目建的 '目录'。" +
      '它会分析每个文件的结构、函数、变量, 建立一个快速查找表。' +
      '索引越完整, Agent 找代码就越快越准。这就是为什么 .cursorignore 很重要 - ' +
      '排除无关文件能让索引更精准。',
    concept: 'Code Indexing',
    tutorialId: 'agent-codebase',
  },
  // US9: 快速构建功能 - 小白提示
  {
    id: 'tip-requirement-splitting',
    title: '为什么要拆分需求?',
    content:
      '想象你要搬家: 不会把所有东西一次性塞进一辆车, 而是分类打包 - ' +
      '先装厨房用品, 再装卧室物品, 最后装客厅家具。' +
      '开发功能也一样: 把一个大功能拆成数据模型、核心逻辑、UI 界面三步, ' +
      '每步完成后检查一下, 比一口气写完所有代码靠谱得多。',
    concept: 'Requirement Splitting',
    tutorialId: 'agent-features',
  },
  {
    id: 'tip-iterative-dev',
    title: '什么是迭代开发?',
    content:
      '画画的时候, 画家不会先把左上角画到完美再画右下角 - ' +
      '而是先画整体轮廓, 再逐步细化每个部分。' +
      '迭代开发就是这个思路: 先让功能 "能跑", 再让它 "好用", 最后让它 "完美"。' +
      '每一轮都是可工作的状态, 随时可以停下来交付。',
    concept: 'Iterative Development',
    tutorialId: 'agent-features',
  },
  {
    id: 'tip-tdd-basics',
    title: 'TDD 是什么?',
    content:
      'TDD (测试驱动开发) 就像先写考试题再写答案。' +
      '你先告诉 Agent: "这个函数输入 A 应该返回 B", 写成测试代码。' +
      '然后让 Agent 写实现代码, 直到所有测试通过。' +
      '好处是: 你清楚知道功能该做什么, Agent 也有明确的目标, 写出来的代码更可靠。',
    concept: 'Test-Driven Development',
    tutorialId: 'agent-features',
  },
  // US12: 自定义代理 - 小白提示
  {
    id: 'tip-cursor-rules',
    title: 'Cursor Rules 是什么?',
    content:
      '想象你有一个新同事, 每次写代码都要提醒他: "我们用 Tailwind, 不用 CSS Modules"、' +
      '"组件用 function, 不用 class"。Cursor Rules 就是把这些规矩写成文件, ' +
      '放在 .cursor/rules/ 目录下。Agent 每次干活前都会先看这些规矩, ' +
      '就不用你反复提醒了。',
    concept: 'Cursor Rules',
    tutorialId: 'agent-customize',
  },
  {
    id: 'tip-mcp-tools',
    title: 'MCP 工具是什么?',
    content:
      'MCP (Model Context Protocol) 就像给 Agent 装 "外挂"。' +
      '默认情况下 Agent 只能读写文件和运行命令, 但通过 MCP 你可以让它直接查数据库、' +
      '搜文档、调 API。就像给手机装 App - 手机本身功能有限, 但装了 App 就能做更多事。',
    concept: 'MCP (Model Context Protocol)',
    tutorialId: 'agent-customize',
  },
  {
    id: 'tip-rules-vs-prompt',
    title: 'Rules 和 Prompt 有什么区别?',
    content:
      'Prompt 是 "一次性指令", 每次对话都要重新说。' +
      'Rules 是 "永久规矩", 写一次就一直生效。' +
      '比如你每次都要说 "用中文回复", 不如写进 Rules 里, 以后每次对话 Agent 都会自动用中文。' +
      '简单说: Prompt 管 "这次做什么", Rules 管 "一直怎么做"。',
    concept: 'Rules vs Prompt',
    tutorialId: 'agent-customize',
  },
  // US13: 综合运用 - 小白提示
  {
    id: 'tip-workflow-overview',
    title: '完整工作流是什么样的?',
    content:
      '用 Agent 开发就像指挥一个团队: ' +
      '1) 先用 Rules 定好规矩 (团队规范), ' +
      '2) 用精确 Prompt 分配任务 (需求文档), ' +
      '3) 分阶段交付并检查 (代码审查), ' +
      '4) 最后让 Agent 写测试 (质量保证)。' +
      '掌握这个流程, 你就能高效地和 Agent 协作了。',
    concept: 'Development Workflow',
    tutorialId: 'agent-together',
  },
  {
    id: 'tip-common-mistakes',
    title: '新手最常犯的错误是什么?',
    content:
      '三个最常见的错误: ' +
      '1) 一次给太多需求 - Agent 容易遗漏细节, 应该分阶段; ' +
      '2) 不提供上下文 - 不用 @ 引用文件, Agent 只能猜; ' +
      '3) 不检查结果就继续 - 错误会像滚雪球一样越来越大。' +
      '记住: 小步快跑, 每步检查。',
    concept: 'Common Mistakes',
    tutorialId: 'agent-together',
  },
  {
    id: 'tip-when-to-stop',
    title: '什么时候该自己动手?',
    content:
      'Agent 不是万能的。遇到这些情况最好自己来: ' +
      '1) 涉及敏感数据和密钥的操作; ' +
      '2) 需要理解复杂业务逻辑的决策; ' +
      '3) Agent 连续 3 次没给出满意结果。' +
      'Agent 是工具, 不是替代品 - 最终的代码质量由你负责。',
    concept: 'Human Judgment',
    tutorialId: 'agent-together',
  },
];

// 按教程 ID 获取提示
export function getTipsByTutorialId(tutorialId: string): BeginnerTip[] {
  return beginnerTips.filter((t) => t.tutorialId === tutorialId);
}
