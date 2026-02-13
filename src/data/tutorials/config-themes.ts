import type { Tutorial } from '../../types';

export const configThemesTutorial: Tutorial = {
  id: 'config-themes',
  title: '主题与外观',
  description: '更改 Cursor 主题, 安装第三方主题',
  difficulty: 'beginner',
  estimatedTime: 5,
  category: 'config',
  order: 103,
  prerequisites: [],
  isPublished: true,
  steps: [
    {
      id: 'overview',
      order: 1,
      title: '主题概览',
      content: `
# Cursor 主题系统

Cursor 支持丰富的主题系统, 可以自定义编辑器外观, 让你的开发环境更加个性化和舒适。

## 主题类型

- **内置主题**: Cursor 预装了多种浅色和深色主题
- **第三方主题**: 可以从扩展市场安装社区创建的主题
- **自定义主题**: 通过配置文件精细调整颜色

## 你将学到

- 如何快速更改主题
- 如何安装第三方主题
- 如何自定义主题颜色
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'change-theme',
      order: 2,
      title: '更改主题',
      content: `
# 更改主题

## 通过命令面板更改

这是最快速的更改主题方式:

1. 打开命令面板 (Ctrl+Shift+P / Cmd+Shift+P)
2. 输入 "Color Theme" 或 "主题"
3. 从列表中选择主题, 可以实时预览效果
4. 按 Enter 确认应用

## 实时预览

当你在主题列表中上下移动时, 编辑器会实时显示该主题的效果, 无需确认即可预览。这让你可以快速对比不同主题的视觉效果。

## 常用快捷键

| 操作 | Windows/Linux | macOS |
|------|---------------|-------|
| 打开命令面板 | Ctrl+Shift+P | Cmd+Shift+P |
| 快速打开 | Ctrl+P | Cmd+P |

提示: 你也可以在快速打开 (Ctrl+P / Cmd+P) 中输入 ">Color Theme" 来快速访问主题选择器。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'install-themes',
      order: 3,
      title: '安装第三方主题',
      content: `
# 安装第三方主题

Cursor 完全兼容 VS Code 主题, 你可以从扩展市场安装数千种社区创建的主题。

## 安装步骤

1. 点击左侧活动栏的扩展图标 (或按 Ctrl+Shift+X / Cmd+Shift+X)
2. 在搜索框中输入 "theme" 或具体主题名称
3. 浏览主题扩展, 查看预览图
4. 点击 "Install" 按钮安装
5. 安装完成后, 通过命令面板选择新主题

## 热门主题推荐

| 主题名称 | 风格 | 特点 |
|---------|------|------|
| One Dark Pro | 深色 | 流行的 Atom 风格主题 |
| Dracula Official | 深色 | 高对比度, 护眼 |
| GitHub Theme | 浅色/深色 | GitHub 官方风格 |
| Material Theme | 多种 | Material Design 风格 |
| Nord | 深色 | 冷色调, 低对比度 |

## VS Code 兼容性

所有 VS Code 主题扩展都可以在 Cursor 中使用, 无需任何修改。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'custom-theme',
      order: 4,
      title: '自定义主题',
      content: `
# 自定义主题颜色

如果现有主题不完全符合你的需求, 可以通过配置文件自定义颜色。

## 打开设置文件

1. 打开命令面板 (Ctrl+Shift+P / Cmd+Shift+P)
2. 输入 "Preferences: Open User Settings (JSON)"
3. 在 settings.json 中添加自定义配置

## 自定义工作区颜色

使用 \`workbench.colorCustomizations\` 自定义界面元素颜色:

\`\`\`json
{
  "workbench.colorCustomizations": {
    "editor.background": "#1e1e1e",
    "editor.foreground": "#d4d4d4",
    "activityBar.background": "#2c2c2c",
    "sideBar.background": "#252526",
    "statusBar.background": "#007acc"
  }
}
\`\`\`

## 自定义语法高亮

使用 \`editor.tokenColorCustomizations\` 自定义代码颜色:

\`\`\`json
{
  "editor.tokenColorCustomizations": {
    "comments": "#6A9955",
    "strings": "#CE9178",
    "keywords": "#569CD6",
    "functions": "#DCDCAA"
  }
}
\`\`\`

## 针对特定主题自定义

你也可以只针对某个主题进行自定义:

\`\`\`json
{
  "workbench.colorCustomizations": {
    "[One Dark Pro]": {
      "editor.background": "#1e1e1e"
    }
  }
}
\`\`\`

这样可以在不同主题间切换时保持各自的自定义设置。
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

回答以下问题, 测试你对 Cursor 主题配置的掌握程度。
      `,
      type: 'quiz',
      quiz: {
        question: '在 Cursor 中更改主题的最快方式是什么?',
        type: 'single',
        options: [
          { id: 'a', text: '在设置界面中手动选择' },
          { id: 'b', text: '通过命令面板搜索 Color Theme' },
          { id: 'c', text: '编辑 settings.json 文件' },
          { id: 'd', text: '重新安装 Cursor' },
        ],
        correctAnswer: 'b',
        explanation:
          '通过命令面板 (Ctrl+Shift+P / Cmd+Shift+P) 搜索 "Color Theme" 是最快的方式, 并且可以实时预览主题效果。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 6,
      title: '教程完成',
      content: `
# 恭喜完成!

你已经掌握了 Cursor 主题配置的核心知识:

- 通过命令面板快速更改主题并实时预览
- 从扩展市场安装第三方主题
- 通过 settings.json 自定义主题颜色
- 针对特定主题进行个性化配置

## 下一步

- 尝试安装几个不同风格的主题, 找到最适合你的
- 根据个人喜好微调主题颜色
- 继续学习其他配置教程
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};

