# Quick Start: Claude Code Skill 交互式教程开发

**Date**: 2026-02-14

---

## 前置条件

- Node.js 18+
- npm 9+
- 项目已 clone 并安装依赖

## 开发启动

```powershell
# 安装依赖 (如果尚未安装)
npm install

# 启动开发服务器
npm run dev
```

## 开发顺序

### Step 1: 类型扩展

在 `src/types/tutorial.ts` 中为 `TutorialCategory` 添加 `'skills'`。

### Step 2: 新增组件

1. 创建 `src/components/skills/SkillCardGrid.tsx`
2. 创建 `src/components/skills/ComparisonView.tsx`
3. 创建 `src/components/skills/SkillRecommender.tsx`

### Step 3: 准备静态资源

将 frontend-design 对比截图放入 `public/images/skill-tutorial/` 目录:
- case1-without-skill-preview.png
- case1-with-skill-preview.png
- case2-without-skill-preview.png
- case2-with-skill-preview.png
- case3-without-skill-preview.png
- case3-with-skill-preview.png

### Step 4: 新增数据文件

1. 创建 `src/data/skills/skill-cards.ts`
2. 创建 `src/data/skills/skill-comparisons.ts`
3. 创建 `src/data/skills/skill-recommendations.ts`
4. 创建 `src/data/skills/terminal-commands.ts`
5. 创建 `src/data/tutorials/skills-intro.ts`
6. 创建 `src/data/tutorials/skills-install.ts`
7. 创建 `src/data/tutorials/skills-official.ts`
8. 创建 `src/data/tutorials/skills-frontend-design.ts`
9. 创建 `src/data/tutorials/skills-custom.ts`

### Step 5: 新增页面

1. 创建 `src/pages/Skills/SkillsPage.tsx` (模块首页)
2. 创建 `src/pages/Skills/SkillsIntroPage.tsx`
3. 创建 `src/pages/Skills/SkillsInstallPage.tsx`
4. 创建 `src/pages/Skills/SkillsOfficialPage.tsx`
5. 创建 `src/pages/Skills/SkillsFrontendPage.tsx`
6. 创建 `src/pages/Skills/SkillsCustomPage.tsx`

### Step 6: 路由注册

在 `src/App.tsx` 中添加 skills 相关路由:
- `/skills` → SkillsPage
- `/skills/intro` → SkillsIntroPage
- `/skills/install` → SkillsInstallPage
- `/skills/official` → SkillsOfficialPage
- `/skills/frontend-design` → SkillsFrontendPage
- `/skills/custom` → SkillsCustomPage

### Step 7: 导航集成

在 Sidebar 和 HomePage 中添加 skills 教程模块入口。

## 验证

```powershell
# 运行测试
npm run test

# 代码检查
npm run lint

# 生产构建验证
npm run build
```

## 关键文件参考

- 现有教程页面模式: `src/pages/Agents/WorkingWithAgentsPage.tsx`
- 通用组件: `src/components/common/`
- 教程数据格式: `src/data/tutorials/agent-working.ts`
- 进度追踪: `src/contexts/ProgressContext.tsx`
- 类型定义: `src/types/tutorial.ts`
- 终端模拟器 (复用): `src/components/speckit/TerminalSimulator.tsx`
- Sidebar 集成: `src/components/layout/Sidebar.tsx`
- 教程服务: `src/services/tutorial-service.ts`
