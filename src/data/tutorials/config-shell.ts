import type { Tutorial } from '../../types';

export const configShellTutorial: Tutorial = {
  id: 'config-shell',
  title: 'Shell 命令集成',
  description: '配置终端 Shell 集成, 提升命令行体验',
  difficulty: 'beginner',
  estimatedTime: 5,
  category: 'config',
  order: 104,
  prerequisites: [],
  isPublished: true,
  steps: [
    {
      id: 'overview',
      order: 1,
      title: 'Shell 命令概览',
      content: `
# Cursor Shell 命令

Cursor 提供 \`cursor\` 和 \`code\` 两个命令行工具, 可以从终端快速打开文件和项目。

## 为什么需要 Shell 命令

- 从终端快速打开文件或目录
- 与 Git 等工具集成
- 提升命令行工作流效率
- 兼容 VS Code 的 \`code\` 命令习惯

## 你将学到

- 如何安装 Shell 命令
- \`cursor\` 和 \`code\` 命令的用法
- 常用参数和选项
- 实用场景示例
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'install',
      order: 2,
      title: '安装 Shell 命令',
      content: `
# 安装步骤

## 通过命令面板安装

1. 打开命令面板 (Ctrl+Shift+P / Cmd+Shift+P)
2. 搜索 "Install 'cursor' command" 或 "Install 'code' command"
3. 选择对应命令并执行

## 两个命令的区别

| 命令 | 说明 |
|------|------|
| \`cursor\` | Cursor 原生命令 |
| \`code\` | 兼容 VS Code 习惯的别名 |

两个命令功能完全相同, 选择你习惯的即可。

## 验证安装

安装完成后, 在终端运行:

\`\`\`bash
cursor --version
\`\`\`

或

\`\`\`bash
code --version
\`\`\`

如果显示版本号, 说明安装成功。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'commands',
      order: 3,
      title: '命令用法',
      content: `
# 常用命令

## 基础用法

\`\`\`bash
# 打开当前目录
cursor .

# 打开指定文件
cursor file.txt

# 打开指定目录
cursor /path/to/project
\`\`\`

## 常用参数

| 参数 | 说明 | 示例 |
|------|------|------|
| \`-n\` | 在新窗口打开 | \`cursor -n .\` |
| \`-w\` | 等待文件关闭后返回 | \`cursor -w file.txt\` |
| \`--diff\` | 比较两个文件 | \`cursor --diff file1 file2\` |
| \`-r\` | 在最近使用的窗口打开 | \`cursor -r .\` |
| \`-g\` | 打开文件并跳转到指定行 | \`cursor -g file.txt:10\` |

## 参数详解

- **-n (new window)**: 在新窗口打开, 不影响当前窗口
- **-w (wait)**: 适合作为 Git 编辑器, 等待文件关闭后再返回终端
- **--diff**: 并排比较两个文件的差异
- **-r (reuse)**: 复用最近的窗口, 避免打开多个窗口
- **-g (goto)**: 打开文件并跳转到指定行号, 格式为 \`文件名:行号\`
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'use-cases',
      order: 4,
      title: '实用场景',
      content: `
# 实用场景

## 场景一: 设置为 Git 默认编辑器

将 Cursor 设置为 Git 的默认编辑器, 用于编辑提交信息:

\`\`\`bash
git config --global core.editor "cursor -w"
\`\`\`

\`-w\` 参数确保 Git 等待你关闭文件后再继续。

## 场景二: 快速打开项目

从任意目录快速打开项目:

\`\`\`bash
# 打开当前目录
cursor .

# 打开父目录
cursor ..

# 打开指定项目
cursor ~/projects/my-app
\`\`\`

## 场景三: 比较文件差异

比较两个文件的差异:

\`\`\`bash
cursor --diff config.old.json config.new.json
\`\`\`

## 场景四: 从日志跳转到代码

结合 \`-g\` 参数, 从错误日志快速跳转到对应代码行:

\`\`\`bash
# 打开 app.js 并跳转到第 42 行
cursor -g app.js:42
\`\`\`

## 场景五: 在新窗口打开临时文件

不影响当前工作区, 在新窗口打开临时文件:

\`\`\`bash
cursor -n temp.txt
\`\`\`
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

回答以下问题, 测试你对 Cursor Shell 命令的掌握程度。
      `,
      type: 'quiz',
      quiz: {
        question: '如何让 cursor 命令等待文件关闭后再返回终端?',
        type: 'single',
        options: [
          { id: 'a', text: '使用 -n 参数' },
          { id: 'b', text: '使用 -w 参数' },
          { id: 'c', text: '使用 -r 参数' },
          { id: 'd', text: '使用 --wait 参数' },
        ],
        correctAnswer: 'b',
        explanation:
          '使用 -w 参数 (wait) 可以让 cursor 命令等待文件关闭后再返回终端。这在设置为 Git 编辑器时特别有用, 确保 Git 等待你完成编辑。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'complete',
      order: 6,
      title: '教程完成',
      content: `
# 恭喜完成!

你已经掌握了 Cursor Shell 命令的核心知识:

- 通过命令面板安装 \`cursor\` 或 \`code\` 命令
- 使用基础命令打开文件和目录
- 使用 -n, -w, --diff, -g 等参数
- 设置为 Git 默认编辑器等实用场景

## 下一步

- 在终端中尝试使用 \`cursor\` 命令
- 将 Cursor 设置为 Git 编辑器
- 继续学习其他配置教程
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
