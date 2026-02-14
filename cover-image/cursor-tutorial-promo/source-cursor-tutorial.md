---
title: 别再盲目摸索了, 这个交互式教程让你 30 分钟上手 Cursor
author: wjstar
date: 2026-02-14
platform: WeChat
url: https://cursor-tutorial.wjstar.top
---

# 别再盲目摸索了, 这个交互式教程让你 30 分钟上手 Cursor

你是不是也经历过这样的场景: 装好了 Cursor, 打开编辑器, 然后... 不知道该干什么?

Tab 补全在哪触发? Ctrl+K 到底怎么用? .cursorrules 文件写什么? Agent 模式又是什么? 翻了一圈英文文档, 看了几个零散的视频, 还是一头雾水。

这就是我做这个项目的原因。

![交互式学习 Cursor IDE 的概念图](illustrations/cursor-tutorial-promo/01-infographic-interactive-learning.png)

## 一个可以"动手练"的 Cursor 教程

市面上不缺 Cursor 的介绍文章, 但大多数停留在"告诉你有这个功能"的层面。知道和会用之间, 差的是练习。

所以我做了一个交互式的 Cursor 学习网站:

https://cursor-tutorial.wjstar.top

核心思路很简单 -- 不只是看, 而是在浏览器里直接练。

网站内置了一个代码模拟器, 模拟了 Cursor 的核心交互场景。你不需要打开 Cursor, 就能在网页上体验 Tab 补全、Ctrl+K 内联编辑、Ctrl+L 对话、@-mentions 上下文引用这些核心操作。每个操作都有即时反馈和渐进式提示, 卡住了不用慌。

## 网站提供了什么

整个学习路径分成 7 个模块, 从零开始, 逐步深入:

![7 个模块的学习路径](illustrations/cursor-tutorial-promo/02-flowchart-learning-path.png)

### 安装指南

支持 Windows、macOS、Linux 三个平台, 自动检测你的操作系统。从下载安装到 LLM 配置, 每一步都有截图和说明, 还附带了常见问题排查。

### 四大核心命令教程

这是 Cursor 最核心的四个操作, 也是大多数人最先需要掌握的:

- Tab 自动补全 -- Cursor 最基础也最高频的功能, 写代码时 AI 自动给你补全建议
- Ctrl+K 内联编辑 -- 选中一段代码, 用自然语言告诉 AI 怎么改, 直接在原位修改
- Ctrl+L 聊天对话 -- 打开侧边栏和 AI 对话, 问问题、要方案、让它帮你写代码
- @-mentions 上下文引用 -- 在对话中用 @ 引用文件、代码块、文档, 让 AI 理解你的上下文

每个命令都配有模拟练习场景, 不是干巴巴的文字说明。

![四大核心命令功能对比](illustrations/cursor-tutorial-promo/03-infographic-four-commands.png)

### .cursorrules 生成器

很多人不知道 Cursor 可以通过 .cursorrules 文件来定制 AI 的行为。这个生成器提供了 4 种模板:

- 代码风格 (缩进、分号、引号、行长度)
- 框架偏好 (React/Vue/Angular + Tailwind/CSS Modules)
- 沟通风格 (语气、注释级别、解释详细度)
- 自定义规则

填表单, 实时预览, 一键复制, 放到项目根目录就能用。

### 配置教程

6 个实用配置主题: .cursorignore 忽略文件、键盘快捷键速查、扩展管理、主题外观、Shell 命令集成、并行 Agent (Git Worktrees)。都是用了 Cursor 之后迟早要折腾的东西, 提前了解省得踩坑。

### Agent 教程

这是进阶内容, 7 课系统化学习:

1. 理解 Agent 的工作方式
2. 让 Agent 理解你的代码库
3. 用 Agent 快速构建功能
4. 用 Agent 查找和修复 Bug
5. 代码审查和测试
6. 自定义 Agent (Rules + MCP)
7. 综合运用

从"能用"到"用好", 这部分内容帮你建立正确的 AI 协作思维。

### Spec-Kit 教程

告别 vibe coding。这个模块教你用规格驱动的方式和 AI 协作: specify、clarify、plan、tasks、implement, 一套完整的工作流, 让 AI 写出的代码真正符合你的预期。

## 为什么做这个

说实话, 我自己学 Cursor 的时候就走了不少弯路。英文文档虽然全, 但对中文开发者不够友好; 视频教程虽然直观, 但没法动手练; 零散的文章虽然多, 但缺乏系统性。

所以我把自己的学习经验整理成了这个交互式教程网站, 希望能帮后来的人少走一些弯路。

![从零散学习到系统学习的转变](illustrations/cursor-tutorial-promo/04-infographic-before-after.png)

整个学习路径大约 3.5 小时, 但你不需要一口气学完。每个模块独立, 进度自动保存, 随时可以继续。

## 技术栈

如果你对实现感兴趣: React 19 + TypeScript + Vite + Tailwind CSS 4, 纯前端项目, 所有数据存在 localStorage, 没有后端依赖。

## 开始学习

访问 https://cursor-tutorial.wjstar.top , 从安装指南开始, 或者直接跳到你感兴趣的模块。

如果觉得有用, 欢迎分享给同样在学 Cursor 的朋友。

---

Cursor Tutorial -- 交互式 Cursor IDE 快速入门
https://cursor-tutorial.wjstar.top
