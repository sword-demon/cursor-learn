import type { Tutorial } from '../../types';

export const skillsCustomTutorial: Tutorial = {
  id: 'skills-custom',
  title: '自定义 Skill 创建',
  description:
    '学习自定义 skill 的文件结构和创建流程, 在模拟编辑器中编写 skill 定义',
  difficulty: 'intermediate',
  estimatedTime: 15,
  category: 'skills',
  order: 5,
  prerequisites: ['skills-install'],
  isPublished: true,
  steps: [
    {
      id: 'file-structure',
      order: 1,
      title: 'Skill 文件结构',
      content:
        '了解自定义 skill 的目录结构和 SKILL.md 入口文件的格式要求',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'core-fields',
      order: 2,
      title: '核心字段详解',
      content:
        '学习 SKILL.md 的核心字段: name, description, prompt template, parameters',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'step-by-step',
      order: 3,
      title: '从零创建 Skill',
      content: '跟随分步骤教程, 从零创建一个代码审查 skill',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'editor-practice',
      order: 4,
      title: '模拟编辑器实践',
      content:
        '在模拟编辑器中编写自己的 skill 定义, 实时预览效果',
      type: 'practice',
      completionCriteria: { type: 'action' },
    },
    {
      id: 'best-practices',
      order: 5,
      title: '最佳实践与分享',
      content:
        '提示词编写技巧、测试调试方法和团队分享方式',
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'quiz',
      order: 6,
      title: '知识检测',
      content: '测试你对自定义 Skill 创建的理解',
      type: 'quiz',
      quiz: {
        question:
          '创建一个自定义 skill 的最小必要条件是什么?',
        type: 'single',
        options: [
          {
            id: 'a',
            text: '在 .claude/skills/<name>/ 目录下创建 SKILL.md 文件',
          },
          {
            id: 'b',
            text: '在 package.json 中注册 skill 名称',
          },
          {
            id: 'c',
            text: '安装 Claude Code SDK 并运行初始化命令',
          },
          {
            id: 'd',
            text: '在 settings.json 中配置 skill 路径',
          },
        ],
        correctAnswer: 'a',
        explanation:
          '创建自定义 skill 只需要在 .claude/skills/<name>/ 目录下放置一个 SKILL.md 文件。Claude Code 会自动发现并注册这个 skill, 无需额外配置。SKILL.md 是唯一的入口文件, 包含 frontmatter 元数据和 Markdown 格式的提示词内容。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 7,
      title: '自定义 Skill 创建完成',
      content: '恭喜完成自定义 Skill 创建教程',
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
