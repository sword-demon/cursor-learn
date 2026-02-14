import type { SkillCard } from '../../types';

export const skillCards: SkillCard[] = [
  // === 创意与设计 ===
  {
    id: 'algorithmic-art',
    name: 'algorithmic-art',
    displayName: 'Algorithmic Art',
    description:
      '使用 p5.js 创建算法艺术, 带种子随机性和交互参数探索',
    category: 'creative-design',
    useCases: [
      '生成独特的算法艺术作品',
      '创建可交互的参数化视觉效果',
      '探索数学与美学的结合',
    ],
    exampleCommand:
      '使用 algorithmic-art skill 创建一个基于分形的艺术作品',
    exampleOutput:
      '生成 philosophy.md, viewer.html, generator.js 三个文件',
    isOfficial: true,
    tags: ['p5.js', '生成艺术', '交互'],
  },
  {
    id: 'brand-guidelines',
    name: 'brand-guidelines',
    displayName: 'Brand Guidelines',
    description:
      '应用 Anthropic 品牌颜色和排版规范, 包含完整颜色体系和字体 (Poppins + Lora)',
    category: 'creative-design',
    useCases: [
      '确保产出物符合品牌规范',
      '快速应用统一的颜色和排版',
      '创建品牌一致的文档和页面',
    ],
    exampleCommand: '按照 brand-guidelines 创建一个产品介绍页面',
    exampleOutput:
      '使用 Dark #141413, Orange #d97757 等品牌色, Poppins + Lora 字体',
    isOfficial: true,
    tags: ['品牌', '配色', '排版'],
  },
  {
    id: 'canvas-design',
    name: 'canvas-design',
    displayName: 'Canvas Design',
    description:
      '使用设计哲学创建 .png 和 .pdf 视觉艺术。两步流程: 设计哲学 + 视觉表达',
    category: 'creative-design',
    useCases: [
      '创建精美的视觉海报和封面',
      '生成 PDF 格式的设计作品',
      '将抽象概念转化为视觉表达',
    ],
    exampleCommand: '使用 canvas-design 为项目创建一张宣传海报',
    exampleOutput: '两步完成: 1) 设计哲学文档 2) 输出 .png/.pdf 作品',
    isOfficial: true,
    tags: ['视觉设计', 'PNG', 'PDF'],
  },
  {
    id: 'frontend-design',
    name: 'frontend-design',
    displayName: 'Frontend Design',
    description:
      '创建独特的生产级前端界面, 避免通用 AI 美学。强调排版、色彩、动效和空间构图',
    category: 'creative-design',
    useCases: [
      '生成高质量的前端 UI 界面',
      '创建独特设计风格而非千篇一律',
      '优化排版、色彩和动效细节',
    ],
    exampleCommand: '使用 frontend-design 创建一个 SaaS 落地页',
    exampleOutput: '生成完整 HTML/CSS/JS, 包含独特排版、配色和微交互',
    isOfficial: true,
    tags: ['UI', '前端', '设计'],
  },
  {
    id: 'slack-gif-creator',
    name: 'slack-gif-creator',
    displayName: 'Slack GIF Creator',
    description:
      '创建 Slack 优化的动画 GIF。支持 emoji (128x128) 和消息 (480x480) 尺寸',
    category: 'creative-design',
    useCases: [
      '制作 Slack 自定义 emoji 动画',
      '创建团队沟通用的趣味 GIF',
      '生成符合 Slack 尺寸规范的动图',
    ],
    exampleCommand: '使用 slack-gif-creator 创建一个庆祝部署成功的 emoji',
    exampleOutput: '生成 128x128 动画 GIF, 帧率和颜色数量已优化',
    isOfficial: true,
    tags: ['GIF', 'Slack', '动画'],
  },
  {
    id: 'theme-factory',
    name: 'theme-factory',
    displayName: 'Theme Factory',
    description:
      '10 个预设主题样式工具包, 可应用于幻灯片、文档、报告和 HTML 页面',
    category: 'creative-design',
    useCases: [
      '快速为文档应用专业主题',
      '统一团队产出物的视觉风格',
      '在多种主题间切换和预览',
    ],
    exampleCommand: '使用 theme-factory 的 Ocean Depths 主题美化报告',
    exampleOutput: '应用 Ocean Depths 主题: 深蓝色调、专业排版、统一视觉',
    isOfficial: true,
    tags: ['主题', '样式', '模板'],
  },
  // === 开发与技术 ===
  {
    id: 'mcp-builder',
    name: 'mcp-builder',
    displayName: 'MCP Builder',
    description:
      'MCP 服务器开发指南。推荐 TypeScript, 覆盖 API 设计、工具命名和错误处理',
    category: 'development',
    useCases: [
      '从零构建 MCP 服务器',
      '设计规范的 MCP 工具接口',
      '遵循最佳实践处理错误和边界情况',
    ],
    exampleCommand: '使用 mcp-builder 创建一个连接 Jira 的 MCP 服务器',
    exampleOutput: '生成 TypeScript MCP 项目: 工具定义、错误处理、测试用例',
    isOfficial: true,
    tags: ['MCP', 'TypeScript', 'API'],
  },
  {
    id: 'webapp-testing',
    name: 'webapp-testing',
    displayName: 'Webapp Testing',
    description:
      '使用 Playwright 测试本地 Web 应用。包含服务器生命周期管理和截图验证',
    category: 'development',
    useCases: [
      '自动化 Web 应用端到端测试',
      '通过截图验证 UI 正确性',
      '管理测试服务器的启停生命周期',
    ],
    exampleCommand: '使用 webapp-testing 测试登录页面流程',
    exampleOutput: '启动服务器 → 侦察截图 → 模拟操作 → 验证结果截图',
    isOfficial: true,
    tags: ['Playwright', '测试', 'E2E'],
  },
  {
    id: 'web-artifacts-builder',
    name: 'web-artifacts-builder',
    displayName: 'Web Artifacts Builder',
    description:
      '用 React + TypeScript + Tailwind + shadcn/ui 构建 claude.ai HTML artifacts',
    category: 'development',
    useCases: [
      '构建可在 claude.ai 中运行的交互式 artifact',
      '使用 React 生态创建复杂 Web 组件',
      '打包和部署 artifact 到 Claude 对话',
    ],
    exampleCommand: '使用 web-artifacts-builder 创建数据可视化 artifact',
    exampleOutput: '初始化 React 项目 → 开发组件 → 打包为单文件 HTML',
    isOfficial: true,
    tags: ['React', 'Artifact', 'shadcn'],
  },
  {
    id: 'skill-creator',
    name: 'skill-creator',
    displayName: 'Skill Creator',
    description:
      '创建新 Skill 的指南。包含核心原则、结构规范和 YAML frontmatter 要求',
    category: 'development',
    useCases: [
      '创建自定义 Skill 并分享给团队',
      '遵循 Agent Skills 规范编写 SKILL.md',
      '设计 Skill 的脚本和参考资源',
    ],
    exampleCommand: '使用 skill-creator 创建一个代码审查 skill',
    exampleOutput: '生成 SKILL.md, scripts/ 目录, references/ 目录',
    isOfficial: true,
    tags: ['创建', '自定义', '规范'],
  },
  // === 企业与沟通 ===
  {
    id: 'doc-coauthoring',
    name: 'doc-coauthoring',
    displayName: 'Doc Co-authoring',
    description:
      '结构化文档协作工作流。三阶段: 上下文收集 → 细化结构 → 读者测试',
    category: 'communication',
    useCases: [
      '协作撰写 PRD 和设计文档',
      '通过读者测试验证文档质量',
      '结构化地收集和组织文档内容',
    ],
    exampleCommand: '使用 doc-coauthoring 帮我写一份技术设计文档',
    exampleOutput: '阶段 1: 收集上下文 → 阶段 2: 细化结构 → 阶段 3: 读者测试',
    isOfficial: true,
    tags: ['文档', '协作', 'PRD'],
  },
  {
    id: 'internal-comms',
    name: 'internal-comms',
    displayName: 'Internal Comms',
    description:
      '内部沟通写作: 3P 更新、公司通讯、FAQ、状态报告、事故报告等模板',
    category: 'communication',
    useCases: [
      '撰写专业的项目状态更新',
      '编写公司内部通讯和 FAQ',
      '生成事故报告和领导力更新',
    ],
    exampleCommand: '使用 internal-comms 写一份本周项目进展更新',
    exampleOutput: '生成 3P 格式: Progress, Plans, Problems',
    isOfficial: true,
    tags: ['沟通', '报告', '通讯'],
  },
  // === 文档处理 ===
  {
    id: 'pdf',
    name: 'pdf',
    displayName: 'PDF',
    description:
      'PDF 全能操作: 读取/提取、合并、拆分、旋转、水印、创建、填表、加密、OCR',
    category: 'document',
    useCases: [
      '从 PDF 中提取文本和表单数据',
      '合并、拆分和旋转 PDF 页面',
      '创建带水印和加密的 PDF 文档',
    ],
    exampleCommand:
      'Use the PDF skill to extract form fields from contract.pdf',
    exampleOutput: '提取 15 个表单字段, 包含签名区域、日期和文本输入框',
    isOfficial: true,
    tags: ['PDF', '提取', '合并'],
  },
  {
    id: 'docx',
    name: 'docx',
    displayName: 'DOCX',
    description:
      'Word 文档创建、读取和编辑。使用 docx-js 创建, XML 解包/重打包编辑',
    category: 'document',
    useCases: [
      '从零创建格式化的 Word 文档',
      '读取和编辑现有 .docx 文件',
      '批量处理 Word 文档内容',
    ],
    exampleCommand: 'Use the DOCX skill to create a project proposal',
    exampleOutput: '生成 proposal.docx: 标题页、目录、正文章节和页脚',
    isOfficial: true,
    tags: ['Word', '文档', '编辑'],
  },
  {
    id: 'pptx',
    name: 'pptx',
    displayName: 'PPTX',
    description:
      'PowerPoint 创建、读取和编辑。使用 pptxgenjs 创建, XML 操作编辑模板',
    category: 'document',
    useCases: [
      '创建专业的演示文稿',
      '编辑现有 PPT 模板内容',
      '批量生成幻灯片',
    ],
    exampleCommand: 'Use the PPTX skill to create a quarterly review deck',
    exampleOutput: '生成 20 页演示文稿: 数据图表、要点列表和总结页',
    isOfficial: true,
    tags: ['PPT', '演示', '幻灯片'],
  },
  {
    id: 'xlsx',
    name: 'xlsx',
    displayName: 'XLSX',
    description:
      '电子表格打开、读取、编辑和创建。包含金融模型规范、公式规则和颜色编码',
    category: 'document',
    useCases: [
      '创建和编辑 Excel 电子表格',
      '构建金融模型和数据分析表',
      '应用公式规则和条件格式',
    ],
    exampleCommand: 'Use the XLSX skill to create a budget tracking sheet',
    exampleOutput: '生成 budget.xlsx: 收支分类、公式汇总、条件格式高亮',
    isOfficial: true,
    tags: ['Excel', '表格', '数据'],
  },
];

export function getSkillCardById(id: string): SkillCard | undefined {
  return skillCards.find((card) => card.id === id);
}

export function getSkillCardsByCategory(
  category: SkillCard['category']
): SkillCard[] {
  return skillCards.filter((card) => card.category === category);
}
