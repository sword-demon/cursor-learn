import type { Tutorial } from '../../types';

export const skillsFrontendDesignTutorial: Tutorial = {
  id: 'skills-frontend-design',
  title: 'frontend-design Skill 深度体验',
  description:
    '通过 3 个案例对比, 直观感受 frontend-design skill 带来的设计质量提升',
  difficulty: 'beginner',
  estimatedTime: 12,
  category: 'skills',
  order: 4,
  prerequisites: ['skills-official'],
  isPublished: true,
  steps: [
    {
      id: 'capability-overview',
      order: 1,
      title: 'Skill 能力概览',
      content:
        '了解 frontend-design skill 的核心能力: 50 种设计风格、21 种配色方案、专业视觉层次',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'case-login',
      order: 2,
      title: '案例 1: 登录页面',
      content: '对比普通提示词和 skill 提示词生成的登录页面效果',
      type: 'comparison',
      completionCriteria: { type: 'action' },
    },
    {
      id: 'case-dashboard',
      order: 3,
      title: '案例 2: 数据仪表盘',
      content: '对比普通提示词和 skill 提示词生成的数据仪表盘效果',
      type: 'comparison',
      completionCriteria: { type: 'action' },
    },
    {
      id: 'case-pricing',
      order: 4,
      title: '案例 3: 定价页面',
      content: '对比普通提示词和 skill 提示词生成的 SaaS 定价页面效果',
      type: 'comparison',
      completionCriteria: { type: 'action' },
    },
    {
      id: 'quiz',
      order: 5,
      title: '知识检测',
      content: '测试你对 frontend-design skill 的理解',
      type: 'quiz',
      quiz: {
        question:
          'frontend-design skill 相比普通提示词, 最核心的优势是什么?',
        type: 'single',
        options: [
          { id: 'a', text: '生成代码更短更简洁' },
          { id: 'b', text: '内置专业设计知识, 自动应用视觉层次、配色和交互细节' },
          { id: 'c', text: '支持更多编程语言' },
          { id: 'd', text: '运行速度更快' },
        ],
        correctAnswer: 'b',
        explanation:
          'frontend-design skill 的核心价值在于内置了 50 种设计风格、21 种配色方案等专业设计知识。它会自动应用视觉层次、品牌感、交互动画等设计最佳实践, 让非设计师也能生成专业级 UI。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 6,
      title: 'frontend-design 体验完成',
      content: '恭喜完成 frontend-design skill 深度体验',
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
