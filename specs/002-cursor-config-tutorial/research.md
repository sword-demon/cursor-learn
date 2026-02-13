# Research: Cursor 配置教程 + Agent 教程模块

**Date**: 2026-02-13
**Feature**: 002-cursor-config-tutorial

## Research Tasks

### R1: TutorialCategory 类型扩展策略

**Decision**: 扩展现有 `TutorialCategory` 联合类型, 新增 `'config'` 和 `'agents'` 两个值。

**Rationale**: 现有类型 `TutorialCategory = 'installation' | 'commands' | 'rules' | 'project'` 是联合类型, 直接追加新值是最简单的扩展方式。不需要引入泛型或映射类型。

**Alternatives considered**:
- 创建独立的 `ConfigTutorialCategory` 和 `AgentTutorialCategory` 类型 → 拒绝: 增加不必要的类型复杂度, 现有 service 层按 category 筛选的逻辑无法复用
- 使用 string 枚举替代联合类型 → 拒绝: 与现有代码风格不一致

### R2: Agent 示例对话组件实现方案

**Decision**: 使用 Framer Motion 的 `AnimatePresence` + `motion.div` 实现展开/收起动画, 内容为静态 Markdown 渲染。

**Rationale**: 项目已依赖 Framer Motion 12.34.0, 无需引入新动画库。`AnimatePresence` 天然支持进入/退出动画, 适合展开/收起场景。

**Alternatives considered**:
- CSS transition + max-height → 拒绝: max-height 需要硬编码值, 内容高度不固定时体验差
- Headless UI Disclosure → 拒绝: 引入新依赖, 违反 YAGNI 原则

### R3: 选择题测验组件实现方案

**Decision**: 复用现有 `QuizQuestion` 类型 (已在 `tutorial.ts` 中定义), 新建 `QuizCard` 组件处理 UI 和校验逻辑。

**Rationale**: 现有类型已包含 `question`, `type`, `options`, `correctAnswer`, `explanation` 字段, 完全满足需求。`TutorialStep` 已有 `type: 'quiz'` 和 `quiz?: QuizQuestion` 字段。

**Alternatives considered**:
- 创建独立的 Quiz 类型体系 → 拒绝: 现有类型已足够, 重复定义违反 DRY

### R4: 快捷键平台切换实现方案

**Decision**: 快捷键数据同时存储 Windows 和 macOS 两套键值, 通过 `UserPreferences.os` 字段控制显示。切换时仅改变渲染, 不修改数据。

**Rationale**: 数据层存储双平台信息, UI 层根据偏好筛选显示, 职责清晰。复用现有 `UserPreferences.os` 字段保持一致性。

**Alternatives considered**:
- 运行时字符串替换 (Ctrl→Cmd) → 拒绝: 不是所有快捷键都是简单替换 (如 macOS 的 Option 键), 容易遗漏
- 两套独立数据文件 → 拒绝: 数据冗余, 维护成本高

### R5: 交互式忽略模式编辑器实现方案

**Decision**: 使用 Monaco Editor (已有依赖) 作为编辑器, 配合前端 glob 匹配库 `minimatch` 实现实时预览。

**Rationale**: Monaco Editor 已是项目依赖, 提供语法高亮和编辑体验。`minimatch` 是轻量级 glob 匹配库 (~5KB gzipped), 可在浏览器端模拟 `.gitignore` 匹配逻辑。

**Alternatives considered**:
- 纯文本 textarea + 自定义匹配 → 拒绝: 体验差, 无语法高亮
- 自实现 glob 匹配 → 拒绝: `.gitignore` 语法复杂 (否定模式、目录匹配等), 自实现容易出错

**New dependency**: `minimatch` (npm, ~5KB gzipped, MIT license)

### R6: 小白提示卡片设计方案

**Decision**: 使用 `Card` 组件变体, 左侧带灯泡图标, 背景使用 #FFD700 (金色) 的 10% 透明度, 内容为通俗类比文本。

**Rationale**: 复用现有 `Card` 组件, 通过 variant prop 区分样式。金色背景与 China Red 主题互补, 视觉上突出但不喧宾夺主。

**Alternatives considered**:
- 使用 tooltip/popover → 拒绝: 需要用户主动触发, 小白用户可能不会注意到
- 使用 alert/banner 样式 → 拒绝: 过于醒目, 打断阅读流

### R7: 代码示例高亮方案

**Decision**: 使用 Monaco Editor 的只读模式作为代码展示组件, 配合复制按钮。

**Rationale**: 项目已依赖 Monaco Editor, 无需引入 Prism.js 或 highlight.js 等额外语法高亮库。Monaco 的只读模式提供完整的语法高亮和主题支持。

**Alternatives considered**:
- Prism.js / highlight.js → 拒绝: 引入新依赖, 且 Monaco 已能满足需求
- 纯 `<pre><code>` + CSS → 拒绝: 无语法高亮, 体验差

### R8: 路由组织和代码分割策略

**Decision**: `/config` 和 `/agents` 使用 TutorialLayout, 所有子页面使用 `React.lazy()` 懒加载, 与现有路由模式一致。

**Rationale**: 现有路由已使用 lazy + Suspense 模式, 保持一致性。13 个新页面的懒加载确保首屏不加载不必要的代码。

**Alternatives considered**:
- 按模块打包 (config bundle / agents bundle) → 拒绝: Vite 的自动代码分割已足够, 手动分割增加配置复杂度
