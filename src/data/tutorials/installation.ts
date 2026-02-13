import type { Tutorial } from '../../types';

export const installationTutorial: Tutorial = {
  id: 'installation',
  title: 'Cursor 安装指南',
  description: '学习如何在 Windows、macOS 或 Linux 上安装和配置 Cursor IDE',
  difficulty: 'beginner',
  estimatedTime: 10,
  category: 'installation',
  order: 1,
  prerequisites: [],
  isPublished: true,
  steps: [
    {
      id: 'intro',
      order: 1,
      title: '欢迎使用 Cursor',
      content: `
# 欢迎使用 Cursor

Cursor 是一个基于 VS Code 的 AI 驱动代码编辑器，它集成了先进的 AI 功能，帮助开发者更高效地编写代码。

## 本教程将指导你完成：

1. 下载 Cursor 安装包
2. 安装 Cursor 到你的系统
3. 配置初始设置
4. 连接 AI 模型

让我们开始吧！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'download',
      order: 2,
      title: '下载 Cursor',
      content: `
# 下载 Cursor

请选择你的操作系统，然后点击下载按钮获取最新版本的 Cursor。

## 系统要求

- **Windows**: Windows 10 或更高版本
- **macOS**: macOS 10.15 或更高版本
- **Linux**: Ubuntu 18.04+ / Debian 10+ / Fedora 32+

下载完成后，继续下一步进行安装。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'install-windows',
      order: 3,
      title: 'Windows 安装步骤',
      content: `
# Windows 安装步骤

1. 运行下载的 .exe 安装程序
2. 按照安装向导提示进行操作
3. 选择安装位置（建议使用默认位置）
4. 勾选"添加到 PATH"选项（推荐）
5. 点击"安装"完成安装

安装完成后，你可以在开始菜单中找到 Cursor，或者在命令行中输入 <code>cursor</code> 启动。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'install-macos',
      order: 4,
      title: 'macOS 安装步骤',
      content: `
# macOS 安装步骤

1. 打开下载的 .dmg 文件
2. 将 Cursor 图标拖动到 Applications 文件夹
3. 首次启动时，右键点击 Cursor 选择"打开"（可能需要允许来自未认证开发者的应用）
4. 按照提示完成初始化设置

你也可以使用 Homebrew 安装：
<code>brew install --cask cursor</code>
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'install-linux',
      order: 5,
      title: 'Linux 安装步骤',
      content: `
# Linux 安装步骤

## Ubuntu/Debian
下载 .deb 包并安装：
<code>sudo dpkg -i cursor-*.deb
sudo apt-get install -f</code>

## Fedora
下载 .rpm 包并安装：
<code>sudo rpm -i cursor-*.rpm</code>

## AppImage
下载 AppImage 文件，赋予执行权限：
<code>chmod +x cursor-*.AppImage</code>
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'initial-setup',
      order: 6,
      title: '初始设置',
      content: `
# 初始设置

首次启动 Cursor 时，你需要完成以下设置：

1. **导入 VS Code 设置**（可选）
   - Cursor 可以自动导入你的 VS Code 设置和扩展

2. **登录 Cursor 账号**
   - 使用 GitHub 或 Google 账号登录

3. **选择 AI 模型**
   - 选择默认的 AI 模型（推荐 Claude 或 GPT-4）
   - 或者使用免费的有限额度模型

完成设置后，你就可以开始使用 Cursor 了！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'llm-setup',
      order: 7,
      title: '配置 LLM',
      content: `
# 配置 AI 模型

Cursor 支持多种 AI 模型，你可以根据需要选择：

## 免费选项
- **Cursor 免费版**: 每月有限的快速请求额度

## 付费选项
- **Claude**: Anthropic 的 Claude 模型
- **GPT-4**: OpenAI 的 GPT-4 模型
- **自定义 API 密钥**: 使用你自己的 OpenAI/Anthropic API 密钥

## 配置方法

1. 打开 Cursor 设置 (Ctrl+,)
2. 进入 "Cursor" 选项卡
3. 选择 "AI Model"
4. 选择你喜欢的模型或输入 API 密钥

配置完成后，你就可以在编辑器中使用 AI 功能了！
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'troubleshooting',
      order: 8,
      title: '常见问题',
      content: `
# 常见问题

## 启动失败
- 确保系统满足最低要求
- 尝试以管理员/超级用户权限运行
- 检查是否有其他程序占用端口

## 无法连接 AI
- 检查网络连接
- 验证 API 密钥是否正确
- 尝试切换不同的 AI 模型

## 性能问题
- 关闭不需要的扩展
- 增加内存限制
- 禁用不必要的功能

更多帮助请访问 [Cursor 官方文档](https://cursor.com/docs)
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'complete',
      order: 9,
      title: '安装完成',
      content: `
# 恭喜！安装完成

你已经成功安装并配置了 Cursor！

## 下一步

现在你可以：

1. **学习核心命令** - 了解 Tab、Ctrl+K、Ctrl+L 等快捷键
2. **编写 .cursorrules** - 自定义 AI 行为
3. **开始项目** - 使用 Cursor 完成一个实际项目

点击下方按钮标记此教程完成，继续你的 Cursor 学习之旅！
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
