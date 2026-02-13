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
];

// 按教程 ID 获取提示
export function getTipsByTutorialId(tutorialId: string): BeginnerTip[] {
  return beginnerTips.filter((t) => t.tutorialId === tutorialId);
}
