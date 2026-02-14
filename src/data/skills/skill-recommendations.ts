import type { SkillRecommendation } from '../../types';

export const skillRecommendations: SkillRecommendation[] = [
  {
    id: 'frontend-dev',
    scenario: '前端开发',
    scenarioIcon: '🎨',
    description: '构建用户界面、页面布局和交互效果',
    recommendedSkills: [
      {
        skillId: 'frontend-design',
        reason: '生成独特的生产级前端界面, 避免千篇一律的 AI 美学',
      },
      {
        skillId: 'webapp-testing',
        reason: '用 Playwright 自动化测试 Web 应用, 截图验证 UI',
      },
      {
        skillId: 'theme-factory',
        reason: '快速应用专业主题, 统一视觉风格',
      },
    ],
  },
  {
    id: 'content-creator',
    scenario: '内容创作',
    scenarioIcon: '✍️',
    description: '文档撰写、演示文稿和视觉内容制作',
    recommendedSkills: [
      {
        skillId: 'doc-coauthoring',
        reason: '结构化协作写文档, 三阶段工作流确保质量',
      },
      {
        skillId: 'pptx',
        reason: '创建专业演示文稿, 支持从头创建和模板编辑',
      },
      {
        skillId: 'canvas-design',
        reason: '生成精美的视觉海报和封面设计',
      },
      {
        skillId: 'brand-guidelines',
        reason: '确保所有产出物符合品牌规范',
      },
    ],
  },
  {
    id: 'mcp-dev',
    scenario: 'MCP 开发',
    scenarioIcon: '🔧',
    description: '构建 MCP 服务器, 扩展 Claude 的工具能力',
    recommendedSkills: [
      {
        skillId: 'mcp-builder',
        reason: '从零构建 MCP 服务器, TypeScript 最佳实践',
      },
      {
        skillId: 'skill-creator',
        reason: '创建自定义 Skill 并分享给团队',
      },
      {
        skillId: 'webapp-testing',
        reason: '用 Playwright 测试 MCP 服务器的 Web 界面',
      },
    ],
  },
  {
    id: 'office-automation',
    scenario: '办公自动化',
    scenarioIcon: '📊',
    description: '批量处理文档、表格和演示文稿',
    recommendedSkills: [
      {
        skillId: 'pdf',
        reason: 'PDF 全能操作: 提取、合并、拆分、加密、OCR',
      },
      {
        skillId: 'docx',
        reason: '创建和编辑 Word 文档, 支持批量处理',
      },
      {
        skillId: 'xlsx',
        reason: '电子表格操作, 金融模型和数据分析',
      },
      {
        skillId: 'pptx',
        reason: '演示文稿创建和模板编辑',
      },
    ],
  },
  {
    id: 'team-comms',
    scenario: '团队沟通',
    scenarioIcon: '💬',
    description: '项目更新、内部通讯和文档协作',
    recommendedSkills: [
      {
        skillId: 'internal-comms',
        reason: '专业的 3P 更新、状态报告和事故报告模板',
      },
      {
        skillId: 'doc-coauthoring',
        reason: '结构化协作撰写 PRD、设计文档和 RFC',
      },
      {
        skillId: 'slack-gif-creator',
        reason: '制作团队沟通用的趣味 Slack emoji 和 GIF',
      },
    ],
  },
  {
    id: 'creative-design',
    scenario: '创意设计',
    scenarioIcon: '🎭',
    description: '视觉艺术、算法生成和主题定制',
    recommendedSkills: [
      {
        skillId: 'algorithmic-art',
        reason: '用 p5.js 创建独特的算法艺术作品',
      },
      {
        skillId: 'canvas-design',
        reason: '设计哲学驱动的视觉海报和封面',
      },
      {
        skillId: 'theme-factory',
        reason: '10 个预设主题, 快速统一视觉风格',
      },
      {
        skillId: 'brand-guidelines',
        reason: '应用 Anthropic 品牌规范到任何产出物',
      },
    ],
  },
];
