import type { Tutorial } from '../../types';

export const skillsOfficialTutorial: Tutorial = {
  id: 'skills-official',
  title: 'Anthropic 官方 Skill 介绍',
  description: '浏览 anthropics/skills 仓库中的 16 个官方 skill, 通过交互式选择器获得个性化推荐',
  difficulty: 'beginner',
  estimatedTime: 15,
  category: 'skills',
  order: 3,
  prerequisites: ['skills-intro'],
  isPublished: true,
  steps: [
    {
      id: 'skill-overview',
      order: 1,
      title: '官方 Skill 全景',
      content: '浏览 anthropics/skills 仓库中的 16 个官方 skill',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'skill-categories',
      order: 2,
      title: '分类浏览',
      content: '按功能分类浏览 skill 卡片, 了解每个 skill 的用途',
      type: 'practice',
      completionCriteria: { type: 'action' },
    },
    {
      id: 'skill-recommender',
      order: 3,
      title: '个性化推荐',
      content: '选择你的使用场景, 获取推荐的 skill 组合',
      type: 'practice',
      completionCriteria: { type: 'action' },
    },
    {
      id: 'quiz',
      order: 4,
      title: '知识检测',
      content: '测试你对官方 Skill 的了解',
      type: 'quiz',
      quiz: {
        question: '以下哪个 skill 可以帮你构建 MCP (Model Context Protocol) 服务器?',
        type: 'single',
        options: [
          { id: 'a', text: 'web-artifacts-builder' },
          { id: 'b', text: 'mcp-builder' },
          { id: 'c', text: 'skill-creator' },
          { id: 'd', text: 'webapp-testing' },
        ],
        correctAnswer: 'b',
        explanation:
          'mcp-builder 是专门用于构建 MCP 服务器的 skill, 推荐 TypeScript 技术栈, 覆盖 API 设计、工具命名和错误处理等最佳实践。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 5,
      title: '官方 Skill 介绍完成',
      content: '恭喜完成官方 Skill 介绍',
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
