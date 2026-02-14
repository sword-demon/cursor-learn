import type { Tutorial } from '../../types';

export const skillsInstallTutorial: Tutorial = {
  id: 'skills-install',
  title: 'Skill 安装与插件管理',
  description:
    '学习创建 Skill 目录和 SKILL.md、理解个人 vs 项目级安装范围, 掌握插件管理',
  difficulty: 'beginner',
  estimatedTime: 15,
  category: 'skills',
  order: 2,
  prerequisites: ['skills-intro'],
  isPublished: true,
  steps: [
    {
      id: 'install-overview',
      order: 1,
      title: '两种添加方式',
      content:
        '独立 Skill (目录 + SKILL.md) vs 插件 (包含多个 skill 的集合), 各自适用场景',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'plugin-marketplace',
      order: 2,
      title: '插件与市场',
      content:
        '插件 (Plugin) 是包含多个 skill 的目录集合, 通过 skills/ 子目录组织',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'install-scopes',
      order: 3,
      title: '安装范围对比',
      content:
        '个人 (~/.claude/skills/) vs 项目 (.claude/skills/) vs 插件 (用户/项目/本地)',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'install-practice',
      order: 4,
      title: '模拟安装体验',
      content: '在模拟终端中体验 skill 目录创建和查看流程',
      type: 'simulation',
      completionCriteria: { type: 'action' },
    },
    {
      id: 'troubleshooting',
      order: 5,
      title: '常见问题排查',
      content: '安装过程中的常见问题和解决方案',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'quiz',
      order: 6,
      title: '知识检测',
      content: '测试你对 Skill 安装的理解',
      type: 'quiz',
      quiz: {
        question:
          '安装插件后, 插件中的 skill 命令格式是什么?',
        type: 'single',
        options: [
          { id: 'a', text: '/skill-name (直接使用 skill 名称)' },
          { id: 'b', text: '/plugin-name:skill-name (插件名:skill 名)' },
          { id: 'c', text: 'claude run skill-name' },
          { id: 'd', text: '@skill-name' },
        ],
        correctAnswer: 'b',
        explanation:
          '插件的 skill 命令使用命名空间格式: /plugin-name:skill-name。例如 /oh-my-claudecode:code-review。命名空间防止多个插件的同名 skill 冲突。独立配置的 skill 则直接使用 /skill-name。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 7,
      title: '安装教程完成',
      content: '恭喜完成 Skill 安装与插件管理教程',
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
