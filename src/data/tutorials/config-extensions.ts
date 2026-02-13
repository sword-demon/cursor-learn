import type { Tutorial } from '../../types';

export const configExtensionsTutorial: Tutorial = {
  id: 'config-extensions',
  title: '扩展管理',
  description: '了解 Cursor 扩展安装、管理和 VS Code 兼容性',
  difficulty: 'beginner',
  estimatedTime: 8,
  category: 'config',
  order: 102,
  prerequisites: [],
  isPublished: true,
  steps: [
    {
      id: 'overview',
      order: 1,
      title: '扩展概览',
      content: `
# Cursor 扩展生态

Cursor 支持丰富的扩展生态系统, 可以通过安装扩展来增强编辑器功能。

## 关键区别

Cursor 使用 **Open VSX 注册表** 而非 VS Code Marketplace。大多数流行的 VS Code 扩展都可以在 Open VSX 上找到。

## 你将学到

- 两种安装扩展的方式
- 如何管理已安装的扩展
- 发布者验证徽章的含义
- 从 VS Code 迁移扩展的方法
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'install-methods',
      order: 2,
      title: '安装方式',
      content: `
# 两种安装方式

## 方式一: 扩展面板搜索安装

1. 点击左侧活动栏的扩展图标 (或按 Ctrl+Shift+X / Cmd+Shift+X)
2. 在搜索框中输入扩展名称
3. 找到目标扩展后点击 "Install" 按钮

这是最常用的安装方式, 适合浏览和发现新扩展。

## 方式二: URL 模式安装

在浏览器地址栏输入特定格式的 URL, 可以直接触发 Cursor 安装扩展:

\`\`\`
cursor:extension/发布者.扩展名
\`\`\`

例如安装 ESLint 扩展:

\`\`\`
cursor:extension/dbaeumer.vscode-eslint
\`\`\`

这种方式适合从文档或教程中快速安装推荐扩展。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'management',
      order: 3,
      title: '扩展管理',
      content: `
# 管理已安装的扩展

## 查看已安装扩展

在扩展面板中, 点击 "已安装" 筛选器查看所有已安装的扩展。

## 常用管理操作

| 操作 | 说明 |
|------|------|
| 禁用 | 暂时关闭扩展, 不卸载 |
| 卸载 | 完全移除扩展 |
| 配置 | 打开扩展的设置项 |
| 更新 | 安装扩展的最新版本 |

## 禁用 vs 卸载

- **禁用**: 扩展文件保留, 可以随时重新启用。适合临时不需要的扩展
- **卸载**: 完全删除扩展文件。适合确定不再使用的扩展

## 工作区级别控制

你可以针对特定工作区禁用某些扩展, 而在其他工作区保持启用。这对于不同项目使用不同技术栈时很有用。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'verification',
      order: 4,
      title: '发布者验证',
      content: `
# 发布者验证徽章

在扩展列表中, 你可能会看到发布者名称旁边的验证徽章。

## 徽章含义

- **蓝色对勾**: 发布者已通过身份验证, 表示扩展来源可信
- **无徽章**: 发布者未验证, 不代表扩展有问题, 但建议额外留意

## 安全建议

1. 优先选择有验证徽章的扩展
2. 查看扩展的下载量和评分
3. 阅读扩展的权限说明
4. 定期检查和更新已安装的扩展
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'migration',
      order: 5,
      title: '从 VS Code 迁移',
      content: `
# 从 VS Code 迁移扩展

如果你之前使用 VS Code, 可以将扩展迁移到 Cursor。

## 迁移方式

Cursor 在首次启动时会提供从 VS Code 导入设置和扩展的选项。如果你跳过了这一步, 也可以手动安装需要的扩展。

## 兼容性说明

- 大多数 VS Code 扩展与 Cursor 完全兼容
- 少数依赖 VS Code 专有 API 的扩展可能不可用
- Open VSX 上的扩展版本可能略滞后于 VS Code Marketplace

## 推荐扩展

以下是一些常用的开发扩展:

| 扩展 | 用途 |
|------|------|
| ESLint | JavaScript/TypeScript 代码检查 |
| Prettier | 代码格式化 |
| GitLens | Git 增强功能 |
| Error Lens | 内联显示错误信息 |
| Auto Rename Tag | 自动重命名 HTML 标签 |
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'quiz',
      order: 6,
      title: '知识检测',
      content: `
# 检验你的理解

回答以下问题, 测试你对 Cursor 扩展管理的掌握程度。
      `,
      type: 'quiz',
      quiz: {
        question: 'Cursor 使用哪个扩展注册表来安装扩展?',
        type: 'single',
        options: [
          { id: 'a', text: 'VS Code Marketplace' },
          { id: 'b', text: 'Open VSX 注册表' },
          { id: 'c', text: 'npm registry' },
          { id: 'd', text: 'GitHub Marketplace' },
        ],
        correctAnswer: 'b',
        explanation:
          'Cursor 使用 Open VSX 注册表而非 VS Code Marketplace。大多数流行的 VS Code 扩展都可以在 Open VSX 上找到。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 7,
      title: '教程完成',
      content: `
# 恭喜完成!

你已经了解了 Cursor 扩展管理的核心知识:

- 通过扩展面板或 URL 模式安装扩展
- 禁用、卸载、配置已安装的扩展
- 识别发布者验证徽章
- 从 VS Code 迁移扩展

## 下一步

- 根据你的开发需求安装合适的扩展
- 继续学习其他配置教程
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
