# Cursor Tutorial

交互式 Cursor IDE 快速入门网站，帮助开发者通过可视化安装指南、模拟代码编辑器和项目式学习路径快速掌握 Cursor 的核心功能。

## Git 双仓库推送 - 知识漫画

用哆啦A梦风格的漫画讲解 Git 双远程仓库配置, 从 "任意门" 隐喻理解 remote 概念。

| | |
|:---:|:---:|
| ![封面](comic/git-dual-remote/00-cover-git-dual-remote.png) | ![大雄的烦恼](comic/git-dual-remote/01-page-problem.png) |
| ![查看远程仓库](comic/git-dual-remote/02-page-remote-check.png) | ![添加新远程](comic/git-dual-remote/03-page-remote-add.png) |
| ![首次推送](comic/git-dual-remote/04-page-first-push.png) | ![日常操作](comic/git-dual-remote/05-page-daily-ops.png) |
| ![总结](comic/git-dual-remote/06-page-summary.png) | |

## 功能

- 可视化安装指南（支持 Windows / macOS / Linux）
- 模拟代码编辑器，支持 Tab、Ctrl+K、Ctrl+L、@-mentions 命令练习
- .cursorrules 文件生成器
- 项目式学习路径（Todo App 实战）

## 技术栈

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM

## 开发

```powershell
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 代码检查
npm run lint

# 运行测试
npm run test
```

## 项目结构

```
src/
├── components/     # UI 组件
│   ├── common/     # 通用组件 (Button, Card, ProgressBar)
│   ├── layout/     # 布局组件 (Header, Sidebar)
│   ├── tutorial/   # 教程组件
│   ├── simulator/  # 代码模拟器
│   └── rules/      # 规则生成器
├── contexts/       # React Context
├── hooks/          # 自定义 Hooks
├── pages/          # 路由页面
├── services/       # 业务逻辑
├── types/          # TypeScript 类型
├── data/           # 静态数据
└── utils/          # 工具函数
```
