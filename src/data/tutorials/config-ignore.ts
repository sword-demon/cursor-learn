import type { Tutorial, IgnorePattern } from '../../types';

// 常用忽略模式示例
export const ignorePatternExamples: IgnorePattern[] = [
  {
    pattern: '.env',
    description: '匹配根目录下的 .env 文件',
    matchExamples: ['.env'],
    noMatchExamples: ['src/.env', '.env.example'],
  },
  {
    pattern: '.env*',
    description: '匹配所有以 .env 开头的文件',
    matchExamples: ['.env', '.env.local', '.env.production'],
    noMatchExamples: ['src/.env', 'env.ts'],
  },
  {
    pattern: '**/.env',
    description: '匹配任意目录下的 .env 文件',
    matchExamples: ['.env', 'src/.env', 'config/.env'],
    noMatchExamples: ['.env.local', 'env.ts'],
  },
  {
    pattern: 'node_modules/',
    description: '忽略 node_modules 目录及其所有内容',
    matchExamples: ['node_modules/react/index.js', 'node_modules/package.json'],
    noMatchExamples: ['src/node_modules.ts'],
  },
  {
    pattern: '*.log',
    description: '匹配所有 .log 文件',
    matchExamples: ['error.log', 'access.log'],
    noMatchExamples: ['logs/error.log', 'logger.ts'],
  },
  {
    pattern: '**/*.log',
    description: '匹配任意目录下的 .log 文件',
    matchExamples: ['error.log', 'logs/error.log', 'logs/sub/access.log'],
    noMatchExamples: ['logger.ts'],
  },
  {
    pattern: 'dist/',
    description: '忽略 dist 构建输出目录',
    matchExamples: ['dist/bundle.js', 'dist/index.html'],
    noMatchExamples: ['src/dist.ts'],
  },
];

export const configIgnoreTutorial: Tutorial = {
  id: 'config-ignore',
  title: '忽略文件配置',
  description: '学习如何通过 .cursorignore 控制 Cursor 对项目文件的访问, 保护敏感信息',
  difficulty: 'beginner',
  estimatedTime: 8,
  category: 'config',
  order: 100,
  prerequisites: [],
  isPublished: true,
  steps: [
    {
      id: 'overview',
      order: 1,
      title: '为什么需要忽略文件?',
      content: `
# 为什么需要忽略文件?

当你使用 Cursor 编写代码时, AI 会读取你的项目文件来理解上下文。但有些文件你不希望 AI 看到:

- **环境变量文件** (.env) - 包含 API 密钥和数据库密码
- **凭据文件** (credentials.json) - 包含认证信息
- **密钥文件** (secrets/) - 包含加密密钥

Cursor 提供了两种忽略文件:

| 文件 | 作用 |
|------|------|
| \`.cursorignore\` | AI 完全无法读取被忽略的文件 |
| \`.cursorindexingignore\` | AI 不索引但仍可手动引用 |

\`.cursorignore\` 是安全性更高的选择 - 被忽略的文件对 AI 完全不可见。
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'syntax',
      order: 2,
      title: '忽略文件语法',
      content: `
# .cursorignore 语法

\`.cursorignore\` 使用与 \`.gitignore\` 完全相同的语法:

## 基本规则

- 每行一个模式
- \`#\` 开头的行是注释
- 空行被忽略
- \`/\` 结尾表示目录

## 常用模式

| 模式 | 含义 |
|------|------|
| \`file.txt\` | 匹配名为 file.txt 的文件 |
| \`*.log\` | 匹配所有 .log 文件 |
| \`dir/\` | 忽略整个目录 |
| \`**/temp\` | 匹配任意层级下的 temp |
| \`!important.log\` | 否定模式 (取消忽略) |

## 通配符

| 符号 | 含义 |
|------|------|
| \`*\` | 匹配任意字符 (不含 /) |
| \`**\` | 匹配任意层级目录 |
| \`?\` | 匹配单个字符 |
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'cursorignore-vs-indexingignore',
      order: 3,
      title: '两种忽略文件的区别',
      content: `
# .cursorignore vs .cursorindexingignore

## .cursorignore - 完全隐藏

被 \`.cursorignore\` 忽略的文件:
- AI 无法读取文件内容
- 不会出现在 AI 的上下文中
- 即使你用 @ 引用也无法访问
- 适合: API 密钥、密码、凭据等敏感信息

## .cursorindexingignore - 仅跳过索引

被 \`.cursorindexingignore\` 忽略的文件:
- 不会被自动索引 (不出现在代码库搜索中)
- 但你可以手动用 @ 引用
- AI 在你主动引用时可以读取
- 适合: 大型生成文件、第三方代码等

## 如何选择?

| 场景 | 推荐 |
|------|------|
| API 密钥、密码 | \`.cursorignore\` |
| 大型数据文件 | \`.cursorindexingignore\` |
| 第三方生成代码 | \`.cursorindexingignore\` |
| 凭据和证书 | \`.cursorignore\` |
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'common-patterns',
      order: 4,
      title: '常用忽略模式',
      content: `
# 常用忽略模式

## 安全相关 (强烈推荐)

\`\`\`gitignore
# 环境变量
.env
.env.*
.env.local
.env.production

# 凭据和密钥
credentials.json
*.pem
*.key
secrets/
\`\`\`

## 构建产物

\`\`\`gitignore
# 构建输出
dist/
build/
out/
coverage/
\`\`\`

## 依赖和缓存

\`\`\`gitignore
# 依赖
node_modules/
vendor/

# 缓存
.cache/
tmp/
*.tmp
\`\`\`

## 日志

\`\`\`gitignore
# 日志文件
*.log
logs/
\`\`\`
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'practice',
      order: 5,
      title: '交互式练习',
      content: `
# 动手练习

在下方的编辑器中练习编写忽略规则。右侧会实时显示哪些文件会被忽略。

## 练习目标

1. 忽略所有环境变量文件 (.env 及其变体)
2. 忽略 node_modules 目录
3. 忽略构建输出 (dist/ 和 build/)
4. 忽略凭据文件 (credentials.json 和 secrets/)
5. 忽略日志文件

试试在编辑器中输入这些模式, 观察右侧文件列表的变化。
      `,
      type: 'practice',
      completionCriteria: { type: 'action' },
    },
    {
      id: 'quiz',
      order: 6,
      title: '知识检测',
      content: `
# 检验你的理解

回答以下问题, 测试你对忽略文件配置的掌握程度。
      `,
      type: 'quiz',
      quiz: {
        question: '如果你的项目中有一个包含 API 密钥的 .env 文件, 应该使用哪个忽略文件?',
        type: 'single',
        options: [
          { id: 'a', text: '.cursorignore - AI 完全无法访问' },
          { id: 'b', text: '.cursorindexingignore - 仅跳过索引' },
          { id: 'c', text: '.gitignore - Git 忽略文件' },
          { id: 'd', text: '不需要忽略, AI 不会泄露密钥' },
        ],
        correctAnswer: 'a',
        explanation:
          '.cursorignore 会让 AI 完全无法读取文件内容, 是保护 API 密钥等敏感信息的最安全选择。.cursorindexingignore 仅跳过索引但 AI 仍可通过 @ 引用访问, 安全性不够。',
      },
      completionCriteria: { type: 'success' },
    },
    {
      id: 'global-ignore',
      order: 7,
      title: '全局忽略配置',
      content: `
# 全局 vs 项目级忽略

## 项目级 (推荐)

在项目根目录创建 \`.cursorignore\` 文件, 仅对当前项目生效:

\`\`\`
my-project/
├── .cursorignore    ← 项目级忽略
├── .env
├── src/
└── ...
\`\`\`

## 全局级

在用户主目录创建全局忽略文件, 对所有项目生效:

- **macOS/Linux**: \`~/.cursorignore\`
- **Windows**: \`%USERPROFILE%\\.cursorignore\`

全局忽略适合统一忽略所有项目中的通用敏感文件。

## 注意事项

- 项目级和全局级规则会合并生效
- \`.cursorignore\` 中的否定模式 (\`!\`) 有限制, 无法取消上级目录的忽略
- 建议优先使用项目级配置, 更加明确和可控
      `,
      type: 'content',
      completionCriteria: { type: 'view' },
    },
    {
      id: 'complete',
      order: 8,
      title: '教程完成',
      content: `
# 恭喜完成!

你已经学会了:

- \`.cursorignore\` 和 \`.cursorindexingignore\` 的区别
- 忽略文件的语法规则
- 常用的忽略模式
- 全局和项目级配置的使用场景

## 下一步

- 在你的项目中创建 \`.cursorignore\` 文件
- 确保 \`.env\` 和凭据文件被忽略
- 继续学习其他配置教程
      `,
      type: 'content',
      completionCriteria: { type: 'action' },
    },
  ],
};
