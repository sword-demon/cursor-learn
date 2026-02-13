# Quickstart: Cursor 配置教程 + Agent 教程模块

**Date**: 2026-02-13
**Feature**: 002-cursor-config-tutorial

## 环境准备

```powershell
# 确认 Node.js 版本
node --version  # 需要 18+

# 安装依赖
npm install

# 安装新依赖 (忽略模式匹配)
npm install minimatch
npm install -D @types/minimatch

# 启动开发服务器
npm run dev
```

## 开发顺序 (推荐)

### Phase 1: 基础设施 (类型 + 共享组件)

1. 扩展 `src/types/tutorial.ts` - 新增类型定义
2. 创建 `src/components/common/CodeBlock.tsx` - 代码高亮组件
3. 创建 `src/components/common/QuizCard.tsx` - 选择题测验组件
4. 创建 `src/components/common/ExpandableExample.tsx` - 展开/收起组件
5. 创建 `src/components/common/BeginnerTip.tsx` - 小白提示卡片

### Phase 2: 配置教程 (P1 优先)

6. 创建快捷键数据 `src/data/shortcuts/keyboard-shortcuts.ts`
7. 创建 `src/components/config/ShortcutTable.tsx` + `PlatformSwitch.tsx`
8. 创建 `src/components/config/IgnorePatternEditor.tsx`
9. 创建配置教程数据文件 (6 个)
10. 创建配置教程页面 (ConfigPage + 6 个子页面)
11. 注册路由和更新 Sidebar

### Phase 3: Agent 教程 (P1 优先)

12. 创建 Agent 示例对话数据 `src/data/agents/agent-examples.ts`
13. 创建小白提示数据 `src/data/agents/beginner-tips.ts`
14. 创建 `src/components/agents/AgentExampleDialog.tsx`
15. 创建 `src/components/agents/LessonNavigation.tsx`
16. 创建 Agent 教程数据文件 (7 个)
17. 创建 Agent 教程页面 (AgentsPage + 7 个子页面)
18. 注册路由和更新首页

## 关键文件参考

开发新教程时, 参考以下现有实现:

| 需要做的 | 参考文件 |
|---------|---------|
| 教程数据结构 | `src/data/tutorials/installation.ts` |
| 页面组件模式 | `src/pages/Commands/CommandsPage.tsx` |
| 路由配置 | `src/App.tsx` (lazy + Suspense) |
| 进度追踪 | `src/contexts/ProgressContext.tsx` |
| 通用组件 | `src/components/common/Card.tsx` |
| Sidebar 分类 | `src/components/layout/Sidebar.tsx` |

## 验证检查

```powershell
# 类型检查
npx tsc --noEmit

# 代码检查
npm run lint

# 运行测试
npm run test

# 生产构建
npm run build
```

## 路由配置参考

```typescript
// src/App.tsx 中新增路由
// TutorialLayout 下:
<Route path="/config" element={<ConfigPage />} />
<Route path="/config/ignore" element={<IgnoreFilesPage />} />
<Route path="/config/shortcuts" element={<ShortcutsPage />} />
<Route path="/config/extensions" element={<ExtensionsPage />} />
<Route path="/config/themes" element={<ThemesPage />} />
<Route path="/config/shell" element={<ShellPage />} />
<Route path="/config/worktrees" element={<WorktreesPage />} />

<Route path="/agents" element={<AgentsPage />} />
<Route path="/agents/working" element={<WorkingWithAgentsPage />} />
<Route path="/agents/codebase" element={<UnderstandCodebasePage />} />
<Route path="/agents/features" element={<CreatingFeaturesPage />} />
<Route path="/agents/bugs" element={<FindingBugsPage />} />
<Route path="/agents/review" element={<ReviewingTestingPage />} />
<Route path="/agents/customize" element={<CustomizingAgentsPage />} />
<Route path="/agents/together" element={<PuttingTogetherPage />} />
```
