import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { CodeBlock } from '../../components/common/CodeBlock';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { skillsCustomTutorial } from '../../data/tutorials/skills-custom';
import { PageSEO } from '../../components/common/PageSEO';
import Editor from '@monaco-editor/react';

const TUTORIAL_ID = 'skills-custom';

export function SkillsCustomPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial = getTutorialById(TUTORIAL_ID) ?? skillsCustomTutorial;
  const tutorialProgress = getTutorialProgress(TUTORIAL_ID);
  const [activeStep, setActiveStep] = useState(0);

  const prevTutorialProgress = getTutorialProgress('skills-install');
  const showPrerequisiteBanner = !prevTutorialProgress || prevTutorialProgress.status !== 'completed';

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial(TUTORIAL_ID);
    }
  }, [tutorialProgress, startTutorial]);

  const steps = tutorial.steps;
  const currentProgress = steps.length
    ? Math.round(
        ((tutorialProgress?.completedStepIds.length ?? 0) / steps.length) * 100
      )
    : 0;

  const isStepCompleted = (stepId: string) =>
    tutorialProgress?.completedStepIds.includes(stepId) ?? false;

  const handleCompleteStep = useCallback(
    (stepId: string) => {
      completeStep(TUTORIAL_ID, stepId);
    },
    [completeStep]
  );

  const handleNext = () => {
    const currentStepId = steps[activeStep]?.id;
    if (currentStepId && !isStepCompleted(currentStepId)) {
      handleCompleteStep(currentStepId);
    }
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleFinish = () => {
    const lastStepId = steps[steps.length - 1]?.id;
    if (lastStepId) handleCompleteStep(lastStepId);
    completeTutorial(TUTORIAL_ID);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="自定义 Skill 创建"
        description="学习自定义 skill 的文件结构和创建流程, 在模拟编辑器中编写 skill 定义。"
        path="/skills/custom"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/skills" className="hover:text-[#C41E3A]">Skills 教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">自定义 Skill</span>
        </nav>

        {showPrerequisiteBanner && (
          <div className="mb-4">
            <BeginnerTipCard title="建议先完成前置步骤">
              建议先完成{' '}
              <Link to="/skills/install" className="text-[#C41E3A] underline hover:no-underline">
                Skill 安装与管理
              </Link>{' '}
              教程, 以获得更好的学习体验。
            </BeginnerTipCard>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            自定义 Skill 创建
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            学习如何创建自己的 skill, 将团队最佳实践封装为可复用的工具
          </p>
        </div>

        <div className="mb-8">
          <ProgressBar percentage={currentProgress} />
        </div>

        {/* 步骤导航 */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                index === activeStep
                  ? 'bg-[#C41E3A] text-white'
                  : isStepCompleted(step.id)
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {isStepCompleted(step.id) && index !== activeStep ? '✓ ' : ''}
              {step.title}
            </button>
          ))}
        </div>

        {/* 步骤内容 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {activeStep === 0 && <StepFileStructure />}
            {activeStep === 1 && <StepCoreFields />}
            {activeStep === 2 && <StepByStep />}
            {activeStep === 3 && (
              <StepEditorPractice
                onComplete={() => handleCompleteStep('editor-practice')}
              />
            )}
            {activeStep === 4 && <StepBestPractices />}
            {activeStep === 5 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对自定义 Skill 创建的理解。
                </p>
                {tutorial.steps[5]?.quiz && (
                  <QuizCard
                    quiz={tutorial.steps[5].quiz}
                    onComplete={(correct) => {
                      if (correct) handleCompleteStep('quiz');
                    }}
                  />
                )}
              </div>
            )}
            {activeStep === 6 && (
              <StepComplete
                isCompleted={tutorialProgress?.status === 'completed'}
                onFinish={handleFinish}
              />
            )}
          </CardContent>
        </Card>

        {/* 底部导航 */}
        {activeStep < 6 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={activeStep === 0}
            >
              上一步
            </Button>
            <Button variant="primary" onClick={handleNext}>
              {activeStep === steps.length - 2 ? '完成' : '下一步'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepFileStructure() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Skill 文件结构
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        每个自定义 skill 是一个目录, 包含一个 <code>SKILL.md</code> 入口文件。
        Claude Code 通过扫描 <code>.claude/skills/</code> 目录自动发现所有 skill。
      </p>

      <div className="space-y-4 mb-6">
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            最小结构 (单个 Skill)
          </h4>
          <CodeBlock
            code={`.claude/skills/\n└── my-skill/\n    └── SKILL.md          # 入口文件 (必需)`}
            language="text"
            title="最小 skill 结构"
          />
        </div>

        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            完整结构 (带辅助文件)
          </h4>
          <CodeBlock
            code={`.claude/skills/\n└── code-reviewer/\n    ├── SKILL.md          # 入口文件 (必需)\n    ├── templates/        # 可选: 模板文件\n    │   └── review.md\n    └── examples/         # 可选: 示例文件\n        └── sample.md`}
            language="text"
            title="完整 skill 结构"
          />
        </div>
      </div>

      <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10 mb-6">
        <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
          关键规则
        </h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>1. 目录名即 skill 名称, 用于 <code>/skill-name</code> 调用</li>
          <li>2. <code>SKILL.md</code> 是唯一必需的文件, 大小写敏感</li>
          <li>3. 目录名建议使用小写字母和连字符, 如 <code>code-reviewer</code></li>
          <li>4. 新增或修改 skill 后需要重启 Claude Code 会话</li>
        </ul>
      </div>

      <BeginnerTipCard title="通俗理解">
        创建 skill 就像写一份 "工作手册"。目录名是手册的名字,
        SKILL.md 是手册的内容。Claude Code 读到这份手册后,
        就知道在你调用 /skill-name 时该怎么做了。
      </BeginnerTipCard>
    </div>
  );
}

function StepCoreFields() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        SKILL.md 核心字段
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        SKILL.md 由两部分组成: YAML frontmatter (元数据) 和 Markdown 正文 (提示词内容)。
      </p>

      <div className="mb-6">
        <CodeBlock
          code={`---\nname: code-reviewer\ndescription: 专业代码审查, 检查代码质量、安全性和可维护性\n---\n\n# Code Reviewer\n\n你是一个专业的代码审查专家。请按照以下步骤审查代码:\n\n## 审查维度\n\n1. **代码质量**: 命名规范、函数长度、复杂度\n2. **安全性**: 输入验证、SQL 注入、XSS 防护\n3. **可维护性**: 注释、模块化、测试覆盖\n\n## 输出格式\n\n对每个问题, 给出:\n- 严重程度: 高/中/低\n- 问题描述\n- 修复建议和代码示例`}
          language="markdown"
          title="SKILL.md 完整示例"
          maxHeight="400px"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Frontmatter (元数据)
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>
              <code className="text-[#C41E3A]">name</code> - Skill 名称, 用于 /name 调用
            </li>
            <li>
              <code className="text-[#C41E3A]">description</code> - 功能描述, 显示在 skill 列表中
            </li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
            Markdown 正文 (提示词)
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>角色定义 - 告诉 AI 扮演什么角色</li>
            <li>工作流程 - 分步骤的执行指令</li>
            <li>输出格式 - 期望的输出结构</li>
            <li>约束条件 - 限制和注意事项</li>
          </ul>
        </div>
      </div>

      <BeginnerTipCard title="核心理解">
        Frontmatter 是 skill 的 "身份证", 告诉 Claude Code 这个 skill 叫什么、做什么。
        Markdown 正文是 skill 的 "工作指南", 定义了 AI 在被调用时应该如何行动。
        写好正文是创建高质量 skill 的关键。
      </BeginnerTipCard>
    </div>
  );
}

function StepByStep() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        从零创建一个 Skill
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        跟随以下步骤, 创建一个 "commit-message" skill, 用于生成规范的 Git 提交信息。
      </p>

      <div className="space-y-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C41E3A] text-white flex items-center justify-center text-sm font-bold">
            1
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              创建目录
            </h4>
            <CodeBlock
              code={`mkdir -p .claude/skills/commit-message`}
              language="bash"
              title="创建 skill 目录"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C41E3A] text-white flex items-center justify-center text-sm font-bold">
            2
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              编写 SKILL.md
            </h4>
            <CodeBlock
              code={`---\nname: commit-message\ndescription: 根据 git diff 生成规范的 Conventional Commit 信息\n---\n\n# Commit Message Generator\n\n你是一个 Git 提交信息专家。请根据当前的代码变更生成规范的提交信息。\n\n## 规则\n\n1. 使用 Conventional Commits 格式: type(scope): description\n2. type 包括: feat, fix, docs, style, refactor, test, chore\n3. description 使用英文, 首字母小写, 不加句号\n4. 如果变更较大, 添加 body 说明详细内容\n\n## 步骤\n\n1. 运行 git diff --staged 查看暂存的变更\n2. 分析变更的性质和范围\n3. 生成 1-3 个候选提交信息\n4. 推荐最合适的一个`}
              language="markdown"
              title="SKILL.md"
              maxHeight="400px"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C41E3A] text-white flex items-center justify-center text-sm font-bold">
            3
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              使用 Skill
            </h4>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                重启 Claude Code 会话后, 在终端中输入:
              </p>
              <code className="text-[#C41E3A] dark:text-[#FFD700] text-sm">
                /commit-message
              </code>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Claude Code 会自动读取 git diff, 按照你定义的规则生成提交信息。
              </p>
            </div>
          </div>
        </div>
      </div>

      <BeginnerTipCard title="小技巧">
        创建 skill 时, 先想清楚 "我希望 AI 在什么场景下做什么事"。
        然后把这个期望写成清晰的步骤和规则。越具体, skill 的输出质量越高。
      </BeginnerTipCard>
    </div>
  );
}

const DEFAULT_SKILL_CODE = `---
name: my-skill
description: 描述你的 skill 功能
---

# My Skill

你是一个专业的助手。请按照以下步骤工作:

## 步骤

1. 分析用户的需求
2. 提供解决方案
3. 给出代码示例

## 输出格式

- 简洁明了
- 包含代码示例
- 附带解释说明
`;

function StepEditorPractice({ onComplete }: { onComplete: () => void }) {
  const [code, setCode] = useState(DEFAULT_SKILL_CODE);
  const [showPreview, setShowPreview] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      if (!hasEdited && value !== DEFAULT_SKILL_CODE) {
        setHasEdited(true);
      }
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
    if (hasEdited) {
      onComplete();
    }
  };

  // Parse frontmatter
  const parseFrontmatter = (md: string) => {
    const match = md.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return { name: 'unknown', description: '' };
    const lines = match[1].split('\n');
    const data: Record<string, string> = {};
    for (const line of lines) {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) {
        data[key.trim()] = rest.join(':').trim();
      }
    }
    return data;
  };

  const meta = parseFrontmatter(code);
  const bodyMatch = code.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  const body = bodyMatch ? bodyMatch[1].trim() : '';

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        模拟编辑器实践
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        在下方编辑器中编写你自己的 skill 定义。修改模板内容, 然后点击 "预览效果" 查看解析结果。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* 编辑器 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              SKILL.md 编辑器
            </span>
            <Button variant="primary" onClick={handlePreview}>
              预览效果
            </Button>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Editor
              height="360px"
              language="markdown"
              value={code}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 13,
                lineNumbers: 'on',
                padding: { top: 8, bottom: 8 },
                wordWrap: 'on',
                tabSize: 2,
              }}
            />
          </div>
        </div>

        {/* 预览 */}
        <div>
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              解析预览
            </span>
          </div>
          {showPreview ? (
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 h-[360px] overflow-y-auto">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-[#C41E3A] text-white text-xs font-bold rounded">
                    Skill
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    /{meta.name || 'unknown'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {meta.description || '(无描述)'}
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  提示词内容
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 rounded p-3">
                  {body || '(无内容)'}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 h-[360px] flex items-center justify-center">
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                编辑左侧内容后, 点击 "预览效果" 查看解析结果
              </p>
            </div>
          )}
        </div>
      </div>

      <BeginnerTipCard title="动手试试">
        修改 name 字段为你想要的 skill 名称, 然后在正文中写下你希望 AI 执行的具体指令。
        好的 skill 提示词应该包含: 角色定义、工作步骤和输出格式。
      </BeginnerTipCard>
    </div>
  );
}

function StepBestPractices() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        最佳实践与分享
      </h2>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        提示词编写技巧
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
            推荐做法
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
            <li>- 明确角色定义: "你是一个 X 专家"</li>
            <li>- 分步骤描述工作流程</li>
            <li>- 定义清晰的输出格式</li>
            <li>- 包含具体的示例</li>
            <li>- 设置约束条件和边界</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
            避免的做法
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
            <li>- 模糊的指令: "帮我写好代码"</li>
            <li>- 过长的提示词 (超过 2000 字)</li>
            <li>- 相互矛盾的规则</li>
            <li>- 缺少输出格式定义</li>
            <li>- 没有错误处理指引</li>
          </ul>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        测试与调试
      </h3>
      <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mb-6">
        <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li>1. 创建 skill 后重启 Claude Code 会话</li>
          <li>2. 输入 <code className="text-[#C41E3A]">/skill-name</code> 测试基本调用</li>
          <li>3. 用不同的输入场景测试, 检查输出是否符合预期</li>
          <li>4. 根据测试结果迭代优化提示词</li>
          <li>5. 让团队成员试用, 收集反馈</li>
        </ol>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        分享给团队
      </h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">方式</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">操作</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2.5 px-4 font-medium text-gray-900 dark:text-white">Git 提交</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">
                将 <code>.claude/skills/</code> 提交到仓库
              </td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">项目团队共享</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2.5 px-4 font-medium text-gray-900 dark:text-white">复制目录</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">
                复制 skill 目录到其他项目
              </td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">跨项目复用</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2.5 px-4 font-medium text-gray-900 dark:text-white">个人全局</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">
                放入 <code>~/.claude/skills/</code>
              </td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">个人所有项目通用</td>
            </tr>
          </tbody>
        </table>
      </div>

      <BeginnerTipCard title="迭代优化">
        好的 skill 不是一次写成的。先写一个基础版本, 在实际使用中发现问题,
        然后不断优化提示词。通常 3-5 次迭代就能得到一个高质量的 skill。
      </BeginnerTipCard>
    </div>
  );
}

function StepComplete({
  isCompleted,
  onFinish,
}: {
  isCompleted: boolean | undefined;
  onFinish: () => void;
}) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {isCompleted ? '教程已完成!' : '恭喜完成!'}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        你已经掌握了自定义 Skill 的创建方法。现在可以为自己的团队和项目创建专属 skill 了。
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {!isCompleted && (
          <Button variant="primary" onClick={onFinish}>
            标记完成
          </Button>
        )}
        <Link to="/skills">
          <Button variant="outline">返回 Skills 教程</Button>
        </Link>
      </div>
    </div>
  );
}
