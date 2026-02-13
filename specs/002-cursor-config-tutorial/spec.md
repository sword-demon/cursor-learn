# Feature Specification: Cursor 配置教程模块

**Feature Branch**: `002-cursor-config-tutorial`
**Created**: 2026-02-13
**Status**: Draft
**Input**: User description: "继续根据 [https://cursor.com/cn/docs/context/ignore-files](https://cursor.com/cn/docs/context/ignore-files) 文档往下的文档内容继续做成教程并让用户容易理解。" + "根据 https://cursor.com/cn/learn/working-with-agents 往下的页面的一些教程, 再新增这部分让小白容易理解"

## Clarifications

### Session 2026-02-13

- Q: 7 个 Agent 教程页面全部纳入还是只选取部分? → A: 全部 7 个页面都做成教程 (使用 Agent、理解代码库、构建功能、修复 Bug、审查测试、自定义代理、综合运用)
- Q: Agent 教程页面需要哪种交互形式? → A: 复刻官方核心交互: 可展开的 Agent 示例对话 + 选择题测验 + 代码示例高亮
- Q: Agent 教程的路由结构如何组织? → A: 独立路由 `/agents`, 与 `/config` 并列, 在首页作为单独的学习模块展示
- Q: 小白用户的内容改编策略? → A: 在官方内容基础上增加通俗类比、场景化示例和 "小白提示" 卡片, 降低理解门槛
- Q: 7 个 Agent 教程的优先级? → A: 前 3 个 (使用 Agent、理解代码库、构建功能) 为 P1, 中间 2 个 (修复 Bug、审查测试) 为 P2, 后 2 个 (自定义代理、综合运用) 为 P3

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 忽略文件配置教程 (Priority: P1)

用户作为 Cursor 新手, 需要学习如何通过 `.cursorignore` 和 `.cursorindexingignore` 文件控制 Cursor 对项目文件的访问权限, 保护敏感信息并优化大型项目的索引性能。

教程页面展示:

- `.cursorignore` 的作用和语法 (与 `.gitignore` 相同)
- 全局忽略 vs 项目级忽略的区别
- `.cursorindexingignore` 仅限制索引但不限制 AI 访问的特性
- 常用忽略模式 (环境文件、凭据、密钥)
- 否定模式的限制和变通方案
- 交互式模式编辑器, 让用户练习编写忽略规则

**Why this priority**: 文件忽略是安全性的基础配置, 直接关系到 API 密钥和凭据的保护, 是所有 Cursor 用户都应该首先了解的配置项。

**Independent Test**: 用户可以独立访问忽略文件教程页面, 阅读说明并在交互式编辑器中练习编写 `.cursorignore` 规则, 完成后进度被记录。

**Acceptance Scenarios**:

1. **Given** 用户进入忽略文件教程页面, **When** 页面加载完成, **Then** 显示 `.cursorignore` 的概览说明、语法参考和交互式练习区域
2. **Given** 用户在交互式编辑器中输入忽略模式, **When** 输入 `**/.env` 等模式, **Then** 实时预览哪些文件会被忽略
3. **Given** 用户完成所有教程步骤, **When** 点击完成按钮, **Then** 进度被保存到 localStorage 并显示完成状态

---

### User Story 2 - 键盘快捷键速查教程 (Priority: P1)

用户需要一个分类清晰的键盘快捷键速查表, 涵盖 Cursor 的常规操作、Chat 聊天、行内编辑、代码选择、Tab 补全和终端等六大类快捷键, 并支持 Windows/macOS 双平台切换显示。

教程页面展示:

- 按功能分类的快捷键表格 (常规、Chat、行内编辑、代码选择、Tab、终端)
- Windows/macOS 平台切换按钮, 自动替换 Cmd/Ctrl 等修饰键
- 每个快捷键附带简短功能说明
- 搜索/筛选功能, 快速定位特定快捷键
- 可打印的速查卡片视图

**Why this priority**: 键盘快捷键是日常使用频率最高的功能, 掌握快捷键能显著提升开发效率, 与忽略文件同为 P1 优先级。

**Independent Test**: 用户可以独立访问快捷键页面, 切换平台查看对应快捷键, 使用搜索功能查找特定操作。

**Acceptance Scenarios**:

1. **Given** 用户进入快捷键教程页面, **When** 页面加载完成, **Then** 显示按功能分类的快捷键表格, 默认显示当前操作系统对应的快捷键
2. **Given** 用户点击平台切换按钮, **When** 从 Windows 切换到 macOS, **Then** 所有快捷键中的 Ctrl 替换为 Cmd, Alt 替换为 Opt
3. **Given** 用户在搜索框输入关键词, **When** 输入 "chat", **Then** 筛选出所有 Chat 相关的快捷键

---

### User Story 3 - 扩展管理教程 (Priority: P2)

用户需要了解 Cursor 的扩展生态系统, 包括如何安装、管理和配置扩展, 以及 Cursor 与 VS Code 扩展的兼容性说明。

教程页面展示:

- Cursor 使用 Open VSX 注册表 (非 VS Code Marketplace) 的说明
- 两种安装方式: 扩展面板搜索安装 和 URL 模式安装
- 扩展管理操作: 查看已安装、禁用、卸载、配置
- 发布者验证徽章的含义
- 从 VS Code 迁移扩展的方法

**Why this priority**: 扩展是增强 Cursor 功能的重要途径, 但不如安全配置和快捷键紧急。

**Independent Test**: 用户可以独立访问扩展教程页面, 了解安装和管理扩展的完整流程。

**Acceptance Scenarios**:

1. **Given** 用户进入扩展教程页面, **When** 页面加载完成, **Then** 显示扩展安装的两种方式和管理操作说明
2. **Given** 用户阅读 URL 安装方式, **When** 查看示例, **Then** 显示 `cursor:extension/发布者.扩展名` 格式说明和使用场景

---

### User Story 4 - 主题与外观配置教程 (Priority: P3)

用户需要了解如何更改 Cursor 的主题, 包括使用内置主题、安装第三方主题和创建自定义主题。

教程页面展示:

- 通过命令面板更改主题的步骤
- VS Code 主题完全兼容的说明
- 创建自定义主题的方法

**Why this priority**: 主题配置是个性化需求, 不影响核心功能使用, 优先级较低。

**Independent Test**: 用户可以独立访问主题教程页面, 了解更改主题的操作步骤。

**Acceptance Scenarios**:

1. **Given** 用户进入主题教程页面, **When** 页面加载完成, **Then** 显示更改主题的步骤说明和截图示意

---

### User Story 5 - Shell 命令行工具教程 (Priority: P3)

用户需要了解如何安装和使用 `cursor` 和 `code` 命令行工具, 从终端快速打开文件和文件夹。

教程页面展示:

- 通过命令面板安装 shell 命令的步骤
- `cursor` 和 `code` 两个命令的区别
- 常用命令选项 (`-n`, `-w`)
- 基本用法示例

**Why this priority**: Shell 命令是进阶用法, 对新手来说不是必需的。

**Independent Test**: 用户可以独立访问 Shell 命令教程页面, 了解安装和使用命令行工具的方法。

**Acceptance Scenarios**:

1. **Given** 用户进入 Shell 命令教程页面, **When** 页面加载完成, **Then** 显示安装步骤和命令用法示例

---

### User Story 6 - 并行 Agent (Worktrees) 教程 (Priority: P3)

用户需要了解 Cursor 的并行 Agent 功能, 包括如何在独立的 Git worktree 中同时运行多个 Agent, 以及 Best-of-N 功能。

教程页面展示:

- 并行 Agent 的核心概念 (每个 Agent 在独立 worktree 中运行)
- Best-of-N 功能: 同一提示词在多个模型上同时运行
- Apply 流程: 将 worktree 中的更改合并回主工作树
- `.cursor/worktrees.json` 初始化脚本配置
- 自动清理机制

**Why this priority**: 并行 Agent 是高级功能, 适合有经验的用户, 新手教程中优先级最低。

**Independent Test**: 用户可以独立访问并行 Agent 教程页面, 了解功能概念和配置方法。

**Acceptance Scenarios**:

1. **Given** 用户进入并行 Agent 教程页面, **When** 页面加载完成, **Then** 显示功能概述、使用流程和配置说明
2. **Given** 用户查看配置示例, **When** 展开 Node.js 或 Python 配置示例, **Then** 显示对应的 `worktrees.json` 配置代码

---

### User Story 7 - 使用 Agent 教程 (Priority: P1)

用户作为 Cursor 新手, 需要理解什么是 Agent harness (指令 + 工具 + 消息), 学会编写高效的 prompt, 以及管理对话上下文的策略。

教程页面展示:
- Agent harness 三要素的通俗类比解释 (如: 指令=工作说明书, 工具=工具箱, 消息=对话)
- 模糊 prompt vs 精确 prompt 的对比示例 (可展开查看 Agent 响应)
- 上下文管理技巧: 何时开新对话、如何引用历史对话
- 常见失败模式: 需求膨胀的识别和应对
- "小白提示" 卡片: 关键概念的简化解释
- 选择题测验: 验证用户对 prompt 编写策略的理解

**Why this priority**: 使用 Agent 是整个代码代理课程的入门基础, 理解 prompt 编写和上下文管理是后续所有教程的前提。

**Independent Test**: 用户可以独立访问使用 Agent 教程页面, 展开示例对话查看 Agent 响应, 完成选择题测验, 进度被记录。

**Acceptance Scenarios**:

1. **Given** 用户进入使用 Agent 教程页面, **When** 页面加载完成, **Then** 显示 Agent harness 概念说明、prompt 对比示例和上下文管理技巧
2. **Given** 用户点击 "查看 Agent 响应" 按钮, **When** 展开示例, **Then** 显示模拟的 Agent 响应内容, 支持收起/展开切换
3. **Given** 用户完成选择题测验, **When** 选择正确答案并点击检查, **Then** 显示正确/错误反馈和解释

---

### User Story 8 - 理解你的代码库教程 (Priority: P1)

用户需要了解 Agent 如何搜索和理解代码库, 包括语义搜索、代码索引和上下文获取机制。

教程页面展示:
- Agent 如何通过工具搜索代码库的流程说明
- 语义搜索的通俗解释 (如: 像搜索引擎一样理解代码含义)
- 如何帮助 Agent 更好地理解代码: 提供文件路径、描述架构
- 实际场景示例: 让 Agent 解释一段不熟悉的代码
- "小白提示" 卡片和选择题测验

**Why this priority**: 理解 Agent 如何读懂代码是高效协作的关键, 直接影响用户能否给出有效的指令。

**Independent Test**: 用户可以独立访问教程页面, 阅读说明并完成测验。

**Acceptance Scenarios**:

1. **Given** 用户进入理解代码库教程页面, **When** 页面加载完成, **Then** 显示 Agent 搜索代码库的流程说明和场景示例
2. **Given** 用户完成选择题测验, **When** 提交答案, **Then** 显示反馈并记录进度

---

### User Story 9 - 快速构建功能教程 (Priority: P1)

用户需要学习如何利用 Agent 快速构建新功能, 包括需求拆分、规格编写和迭代开发的策略。

教程页面展示:
- 功能开发的完整流程: 需求描述 → 规格编写 → 分步实现 → 验证
- 如何将大功能拆分为小任务的通俗指导
- 引用现有代码模式的 prompt 示例 (可展开查看 Agent 响应)
- 迭代开发策略: 小步快跑而非一次性完成
- "小白提示" 卡片和选择题测验

**Why this priority**: 构建功能是开发者使用 Agent 最核心的场景, 掌握正确方法能大幅提升开发效率。

**Independent Test**: 用户可以独立访问教程页面, 查看示例并完成测验。

**Acceptance Scenarios**:

1. **Given** 用户进入构建功能教程页面, **When** 页面加载完成, **Then** 显示功能开发流程说明和 prompt 示例
2. **Given** 用户展开 prompt 示例, **When** 点击查看 Agent 响应, **Then** 显示模拟的分步实现过程

---

### User Story 10 - 查找并修复 Bug 教程 (Priority: P2)

用户需要学习如何利用 Agent 定位和修复代码中的 Bug, 包括错误描述技巧和调试策略。

教程页面展示:
- 如何向 Agent 描述 Bug: 提供错误信息、复现步骤、预期行为
- Agent 调试流程的可视化说明
- 常见 Bug 类型的 prompt 模板
- "小白提示" 卡片和选择题测验

**Why this priority**: Bug 修复是日常开发的重要场景, 但相比基础 Agent 使用和功能构建, 属于进阶技能。

**Independent Test**: 用户可以独立访问教程页面, 阅读调试策略并完成测验。

**Acceptance Scenarios**:

1. **Given** 用户进入修复 Bug 教程页面, **When** 页面加载完成, **Then** 显示 Bug 描述技巧和调试流程说明
2. **Given** 用户完成选择题测验, **When** 提交答案, **Then** 显示反馈并记录进度

---

### User Story 11 - 审查和测试代码教程 (Priority: P2)

用户需要学习如何利用 Agent 进行代码审查和编写测试, 提升代码质量。

教程页面展示:
- 让 Agent 审查代码的 prompt 技巧
- 如何让 Agent 编写单元测试和集成测试
- 代码审查的关注点: 安全性、性能、可读性
- "小白提示" 卡片和选择题测验

**Why this priority**: 代码审查和测试是保障代码质量的重要环节, 与 Bug 修复同为 P2。

**Independent Test**: 用户可以独立访问教程页面, 学习审查和测试策略并完成测验。

**Acceptance Scenarios**:

1. **Given** 用户进入审查测试教程页面, **When** 页面加载完成, **Then** 显示代码审查技巧和测试编写指导
2. **Given** 用户完成选择题测验, **When** 提交答案, **Then** 显示反馈并记录进度

---

### User Story 12 - 自定义代理教程 (Priority: P3)

用户需要了解如何通过 Rules、MCP 工具等方式自定义 Agent 的行为, 使其更符合项目需求。

教程页面展示:
- Cursor Rules 的作用和配置方法
- MCP (Model Context Protocol) 工具的概念介绍
- 自定义 Agent 行为的实际场景示例
- "小白提示" 卡片和选择题测验

**Why this priority**: 自定义代理是高级功能, 需要先掌握基础 Agent 使用后才有意义。

**Independent Test**: 用户可以独立访问教程页面, 了解自定义方法并完成测验。

**Acceptance Scenarios**:

1. **Given** 用户进入自定义代理教程页面, **When** 页面加载完成, **Then** 显示 Rules 配置和 MCP 工具说明
2. **Given** 用户完成选择题测验, **When** 提交答案, **Then** 显示反馈并记录进度

---

### User Story 13 - 综合运用所学教程 (Priority: P3)

用户需要通过一个综合案例将前面学到的所有 Agent 技能串联起来, 形成完整的工作流认知。

教程页面展示:
- 从零开始的完整项目开发流程回顾
- 各技能的组合运用场景
- 最佳实践总结和常见误区
- "小白提示" 卡片和最终测验

**Why this priority**: 综合运用是课程收尾, 需要前面所有教程作为基础。

**Independent Test**: 用户可以独立访问教程页面, 回顾完整流程并完成最终测验。

**Acceptance Scenarios**:

1. **Given** 用户进入综合运用教程页面, **When** 页面加载完成, **Then** 显示完整开发流程回顾和最佳实践总结
2. **Given** 用户完成最终测验, **When** 提交答案, **Then** 显示反馈、记录进度并展示课程完成徽章

---

### Edge Cases

- 用户在不同教程页面之间快速切换时, 进度保存不应丢失
- 用户在移动设备上访问时, 键盘快捷键表格应有合理的响应式布局 (项目最小视口 768px)
- 用户浏览器不支持 localStorage 时, 教程内容仍可正常浏览, 仅进度追踪不可用
- 快捷键平台切换状态应与用户在其他页面选择的操作系统偏好保持一致
- Agent 教程中可展开的示例对话在快速连续点击时不应出现动画错乱
- 选择题测验在用户未选择任何选项时, "检查" 按钮应保持禁用状态
- Agent 教程的 "小白提示" 卡片在窄屏下应自适应宽度, 不溢出容器

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统必须提供配置教程的导航入口, 包含忽略文件、扩展、键盘快捷键、主题、Shell 命令、并行 Agent 六个子教程
- **FR-002**: 忽略文件教程必须包含交互式模式编辑器, 用户输入忽略模式后实时预览匹配结果
- **FR-003**: 键盘快捷键教程必须支持 Windows/macOS 双平台切换, 自动替换修饰键显示
- **FR-004**: 键盘快捷键教程必须提供搜索/筛选功能, 支持按关键词和分类筛选
- **FR-005**: 每个教程页面必须记录用户的阅读/完成进度到 localStorage
- **FR-006**: 教程页面必须与现有教程系统 (001-cursor-tutorial) 的进度追踪机制保持一致
- **FR-007**: 所有教程内容必须基于 Cursor 官方文档, 确保准确性
- **FR-008**: 教程页面必须遵循现有项目的 China Red 主题设计 (主色 #C41E3A, 强调色 #FFD700)
- **FR-009**: 配置教程必须在现有路由结构中新增 `/config` 路径及子路由
- **FR-010**: 系统必须在首页学习路径中展示配置教程模块和 Agent 教程模块的入口和进度
- **FR-011**: Agent 教程必须在现有路由结构中新增独立的 `/agents` 路径及子路由, 与 `/config` 并列
- **FR-012**: Agent 教程必须包含可展开/收起的 Agent 示例对话组件, 点击后显示模拟的 Agent 响应
- **FR-013**: Agent 教程必须包含选择题测验组件, 支持单选、答案校验和正确/错误反馈
- **FR-014**: Agent 教程必须包含代码示例高亮组件, 支持语法高亮和复制功能
- **FR-015**: Agent 教程必须包含 "小白提示" 卡片组件, 用通俗类比解释关键概念
- **FR-016**: Agent 教程内容必须在官方文档基础上增加场景化示例和通俗类比, 降低小白用户理解门槛
- **FR-017**: 7 个 Agent 教程必须按顺序编号 (1-7), 支持线性学习路径导航 (上一课/下一课)

### Key Entities

- **ConfigTutorial**: 配置教程实体, 包含 id、标题、描述、难度、分类 (config)、步骤列表、所属配置主题 (ignore-files/extensions/kbd/themes/shell/worktrees)
- **KeyboardShortcut**: 快捷键实体, 包含 id、功能描述、Windows 快捷键、macOS 快捷键、所属分类 (general/chat/inline-edit/code-selection/tab/terminal)
- **IgnorePattern**: 忽略模式实体, 包含模式字符串、说明、匹配示例文件列表
- **AgentTutorial**: Agent 教程实体, 包含 id、标题、描述、难度、分类 (agents)、课程序号 (1-7)、步骤列表、所属主题 (working-with-agents/understanding-codebase/creating-features/finding-bugs/reviewing-testing/customizing-agents/putting-together)
- **AgentExample**: Agent 示例对话实体, 包含 id、prompt 文本、Agent 响应内容、示例类型 (vague/constrained)、关联教程 id
- **QuizQuestion**: 选择题测验实体, 包含 id、题目文本、选项列表 (2-5 个)、正确答案索引、解释文本、关联教程 id
- **BeginnerTip**: 小白提示实体, 包含 id、标题、通俗类比内容、关联概念名称、关联教程 id

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 用户可以在 5 分钟内完成任意一个配置教程的阅读
- **SC-002**: 90% 的用户能在忽略文件教程中成功编写出正确的 `.cursorignore` 模式
- **SC-003**: 键盘快捷键页面的搜索功能能在输入后即时 (感知无延迟) 返回筛选结果
- **SC-004**: 所有 6 个配置教程页面和 7 个 Agent 教程页面在首次访问时均可正常加载和交互
- **SC-005**: 用户的教程完成进度在页面刷新和重新访问后仍然保留
- **SC-006**: 平台切换功能正确替换所有快捷键中的修饰键, 无遗漏
- **SC-007**: Agent 教程的可展开示例对话组件在展开/收起时动画流畅, 无卡顿
- **SC-008**: Agent 教程的选择题测验正确校验答案并显示反馈, 无逻辑错误
- **SC-009**: Agent 教程的 "小白提示" 卡片内容通俗易懂, 不包含未解释的专业术语

## Assumptions

- 教程内容基于 2026 年 2 月 Cursor 官方文档版本, 后续文档更新需手动同步
- 交互式忽略模式编辑器使用前端模拟匹配, 不需要实际文件系统访问
- 键盘快捷键数据以静态数据文件形式维护, 不需要从外部 API 获取
- 用户操作系统偏好复用现有 UserProgress.preferences.os 字段
- 并行 Agent 教程以概念说明为主, 不需要实际的 worktree 模拟环境
- Agent 教程内容基于 Cursor 官方 Learn 课程 (https://cursor.com/cn/learn/working-with-agents 及后续页面), 在官方内容基础上增加通俗类比和场景化示例
- Agent 示例对话为静态模拟内容, 不需要实际调用 AI 模型
- 选择题测验为前端校验, 不需要后端服务
- "小白提示" 卡片内容以静态数据文件形式维护

