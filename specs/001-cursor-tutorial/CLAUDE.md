[根目录](../../CLAUDE.md) > [specs](../) > **001-cursor-tutorial**

---

# 001-cursor-tutorial 规格文档

**职责**: Cursor Tutorial Website 功能规格和实现文档

---

## 文档列表

| 文件 | 描述 |
|------|------|
| [spec.md](spec.md) | 功能规格说明书 - 用户故事、需求、验收标准 |
| [plan.md](plan.md) | 实现计划 - 技术决策、项目结构、阶段规划 |
| [data-model.md](data-model.md) | 数据模型定义 - 实体、关系、存储方案 |
| [quickstart.md](quickstart.md) | 开发环境快速开始指南 |
| [research.md](research.md) | 技术调研和决策记录 |
| [tasks.md](tasks.md) | 实现任务列表 |

---

## API 契约

| 文件 | 描述 |
|------|------|
| [contracts/tutorial-api.yaml](contracts/tutorial-api.yaml) | 教程 API 契约 |
| [contracts/progress-api.yaml](contracts/progress-api.yaml) | 进度 API 契约 |
| [contracts/simulator-api.yaml](contracts/simulator-api.yaml) | 模拟器 API 契约 |

---

## 功能规格摘要

### 用户故事

1. **交互式安装指南** (P1)
   - 支持 Windows/macOS/Linux
   - OS 自动检测
   - 分步骤安装指导
   - 故障排除

2. **命令教程与模拟练习** (P1)
   - Tab 自动补全
   - Ctrl+K 内联编辑
   - Ctrl+L 聊天面板
   - @-mentions 上下文引用

3. **Rules 编写工坊** (P2)
   - .cursorrules 文件生成器
   - 表单引导
   - 实时预览

4. **项目式学习路径** (P3)
   - 微型项目实战
   - 综合练习

---

## 技术栈

- **框架**: React 19.2.0 + TypeScript 5.9.3
- **构建**: Vite 7.3.1
- **样式**: Tailwind CSS 4.1.18
- **路由**: React Router DOM 7.13.0
- **动画**: Framer Motion 12.34.0
- **编辑器**: Monaco Editor 4.7.0
- **存储**: localStorage
- **测试**: Vitest + React Testing Library

---

## 架构原则

1. React State: Context API + hooks (no Redux)
2. Desktop-First: 最小视口 768px
3. localStorage: 所有持久化客户端完成
4. China Red Theme: 主色 #C41E3A，强调色 #FFD700
5. Windows Dev: PowerShell 兼容命令
6. Simplicity: 无不必要的抽象

---

## 数据模型

### 核心实体

- **Tutorial** - 学习模块
- **TutorialStep** - 单个步骤
- **SimulationScenario** - 练习场景
- **UserProgress** - 进度跟踪
- **CursorRuleTemplate** - 规则模板

### 存储方案

- 使用 localStorage 存储用户进度
- 静态 TypeScript 文件存储教程数据
- 估算总数据量: ~15KB

---

## 路由结构

| 路径 | 描述 |
|------|------|
| `/` | 首页 |
| `/installation` | 安装指南 |
| `/commands` | 命令教程列表 |
| `/commands/:commandId` | 具体命令教程 |
| `/rules` | 规则生成器 |
| `/project` | 项目实战 |

---

## 变更记录

### 2026-02-13 - 初始版本

- 创建规格文档目录
- 完成所有规格文档编写
