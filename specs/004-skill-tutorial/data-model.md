# Data Model: Claude Code Skill 交互式教程

**Date**: 2026-02-14
**Storage**: localStorage (client-side only, 复用现有 progress-service)

---

## Entity Overview

```
Tutorial (1) ───< (*) TutorialStep

SkillCard (独立)
SkillComparison (独立)
SkillRecommendation (独立)
TerminalCommand (复用 003, 独立)
```

---

## Type Extensions

### TutorialCategory 扩展

```typescript
// 在 src/types/tutorial.ts 中扩展
export type TutorialCategory =
  | 'installation' | 'commands' | 'rules'
  | 'project' | 'config' | 'agents'
  | 'spec-kit'
  | 'skills';  // 新增
```

---

## New Entity Definitions

### SkillCard

Skill 介绍卡片, 用于官方 Skill 介绍页面的卡片网格展示。

```typescript
interface SkillCard {
  id: string;
  name: string;              // skill 名称, 如 'frontend-design'
  displayName: string;       // 显示名称, 如 'Frontend Design'
  description: string;       // 功能描述
  category: SkillCategory;   // 分类
  useCases: string[];        // 使用场景列表
  exampleCommand: string;    // 示例命令
  exampleOutput: string;     // 示例输出
  isOfficial: boolean;       // 是否官方 skill
  tags: string[];            // 标签
}

type SkillCategory =
  | 'development'     // 开发工具
  | 'code-quality'    // 代码质量
  | 'project-mgmt'    // 项目管理
  | 'ui-ux'           // UI/UX 设计
  | 'devops'          // DevOps
  | 'documentation';  // 文档
```

**Example**:
```json
{
  "id": "frontend-design",
  "name": "frontend-design",
  "displayName": "Frontend Design",
  "description": "前端 UI/UX 设计辅助, 支持 50 种设计风格和 21 种配色方案",
  "category": "ui-ux",
  "useCases": ["生成登录页面", "设计数据仪表盘", "优化现有页面视觉效果"],
  "exampleCommand": "/frontend-design 生成一个现代风格的登录页面",
  "exampleOutput": "...",
  "isOfficial": false,
  "tags": ["UI", "设计", "前端"]
}
```

---

### SkillComparison

对比案例, 用于 frontend-design 体验页面展示有无 skill 的差异。

```typescript
interface SkillComparison {
  id: string;
  title: string;                // 案例标题
  description: string;          // 案例描述
  skillName: string;            // 关联的 skill 名称
  withoutSkill: {
    prompt: string;             // 不用 skill 的提示词
    code: string;               // 生成的代码
    screenshotUrl: string;      // 效果截图路径
  };
  withSkill: {
    prompt: string;             // 用 skill 的提示词
    code: string;               // 生成的代码
    screenshotUrl: string;      // 效果截图路径
  };
  highlights: string[];         // 关键差异点
}
```

---

### SkillRecommendation

推荐方案, 用于交互式 Skill 推荐选择器。

```typescript
interface SkillRecommendation {
  id: string;
  scenario: string;             // 开发场景名称
  scenarioIcon: string;         // 场景图标
  description: string;          // 场景描述
  recommendedSkills: {
    skillId: string;            // 关联的 SkillCard id
    reason: string;             // 推荐理由
  }[];
}
```

---

## Storage Strategy

- 教程数据: 静态 TypeScript 文件 (src/data/tutorials/skills-*.ts, src/data/skills/*.ts)
- 用户进度: 复用现有 localStorage 方案 (ProgressContext)
- 静态截图: public/images/skill-tutorial/ (6 张截图, 预估 ~500KB)
- 预估新增数据量: ~25KB (5 个教程数据文件 + 4 个 skill 数据文件)

---

## Relationships

```
Tutorial (skills category)
  └── TutorialStep[]
        ├── type: 'content' → 文本内容
        ├── type: 'simulation' → 引用 TerminalCommand
        ├── type: 'practice' → 引用 SkillCard (卡片网格交互)
        ├── type: 'comparison' → 引用 SkillComparison (对比展示)
        └── type: 'quiz' → 内嵌 QuizQuestion

SkillRecommendation → SkillCard (多对多)
```
