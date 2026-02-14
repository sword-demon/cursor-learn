import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { CodeBlock } from '../../components/common/CodeBlock';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { TerminalSimulator } from '../../components/speckit/TerminalSimulator';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { skillsInstallTutorial } from '../../data/tutorials/skills-install';
import { installTerminalCommands } from '../../data/skills/terminal-commands';
import { PageSEO } from '../../components/common/PageSEO';

export function SkillsInstallPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial = getTutorialById('skills-install') ?? skillsInstallTutorial;
  const tutorialProgress = getTutorialProgress('skills-install');
  const [activeStep, setActiveStep] = useState(0);

  const prevTutorialProgress = getTutorialProgress('skills-intro');
  const showPrerequisiteBanner = !prevTutorialProgress || prevTutorialProgress.status !== 'completed';

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('skills-install');
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

  const handleCompleteStep = (stepId: string) => {
    completeStep('skills-install', stepId);
  };

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
    completeTutorial('skills-install');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="Skill 安装与插件管理"
        description="学习 Claude Code Skill 安装方式, 理解全局 vs 项目级安装, 掌握插件管理。"
        path="/skills/install"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/skills" className="hover:text-[#C41E3A]">Skills 教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">安装与管理</span>
        </nav>

        {showPrerequisiteBanner && (
          <div className="mb-4">
            <BeginnerTipCard title="建议先完成前置步骤">
              建议先完成{' '}
              <Link to="/skills/intro" className="text-[#C41E3A] underline hover:no-underline">
                Skill 概念入门
              </Link>{' '}
              教程, 以获得更好的学习体验。
            </BeginnerTipCard>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Skill 安装与插件管理
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            学习如何安装、管理和配置 Skill
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
            {activeStep === 0 && <StepInstallOverview />}
            {activeStep === 1 && <StepPluginConcept />}
            {activeStep === 2 && <StepGlobalVsProject />}
            {activeStep === 3 && (
              <StepInstallPractice
                onComplete={() => handleCompleteStep('install-practice')}
              />
            )}
            {activeStep === 4 && <StepTroubleshooting />}
            {activeStep === 5 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对 Skill 安装的理解。
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

function StepInstallOverview() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Skill 安装方式概览
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Claude Code 的 Skill 通过 <code>.claude/skills/</code> 目录进行管理。
        每个 skill 是一个包含 <code>SKILL.md</code> 入口文件的目录。
      </p>

      <div className="space-y-4 mb-6">
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            目录结构
          </h4>
          <CodeBlock
            code={`.claude/\n├── settings.json              # Claude Code 配置\n├── CLAUDE.md                  # 项目指令文件\n└── skills/                    # Skill 定义目录\n    ├── frontend-design/       # 单个 skill\n    │   └── SKILL.md           # 入口文件 (必需)\n    └── speckit/               # 插件 (包含多个 skill)\n        └── skills/\n            ├── specify/\n            │   └── SKILL.md\n            ├── plan/\n            │   └── SKILL.md\n            └── tasks/\n                └── SKILL.md`}
            language="text"
            title=".claude/ 目录结构"
          />
        </div>

        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            创建 Skill
          </h4>
          <CodeBlock
            code={`# 1. 创建 skill 目录\nmkdir -p .claude/skills/my-skill\n\n# 2. 编写 SKILL.md (入口文件)\ncat > .claude/skills/my-skill/SKILL.md << 'EOF'\n---\nname: my-skill\ndescription: 这个 skill 做什么\n---\n# My Skill\n你的 skill 指令内容...\nEOF\n\n# 3. 重启 Claude Code 会话, 即可通过 /my-skill 调用`}
            language="bash"
            title="创建 Skill 的步骤"
          />
        </div>
      </div>

      <BeginnerTipCard title="通俗理解">
        安装 Skill 就像在手机上安装 App。<code>.claude/skills/</code> 目录就是你的 "应用目录",
        每个子目录里的 <code>SKILL.md</code> 就是一个 "App"。放进去后, Claude Code 会自动发现并使用。
      </BeginnerTipCard>
    </div>
  );
}

function StepPluginConcept() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        插件 (Plugin) 的概念
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        插件是包含多个相关 skill 的集合, 通过目录结构组织。安装一个插件, 就能获得一组配套的功能。
      </p>

      <div className="space-y-4 mb-6">
        <div className="p-5 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold rounded-md">
              独立 Skill
            </span>
            <h4 className="font-semibold text-gray-900 dark:text-white">frontend-design</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            一个目录 + SKILL.md = 一个 skill = 一个 /command
          </p>
          <CodeBlock
            code={`.claude/skills/frontend-design/\n└── SKILL.md`}
            language="text"
            title="独立 skill 结构"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            调用方式: <code className="text-[#C41E3A]">/frontend-design</code>
          </div>
        </div>

        <div className="p-5 rounded-lg border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-xs font-bold rounded-md">
              插件
            </span>
            <h4 className="font-semibold text-gray-900 dark:text-white">oh-my-claudecode</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            一个插件目录, 内含 skills/ 子目录 = 多个 skill = 多个 /command
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <div>安装后可用:</div>
            <div className="ml-4 space-y-0.5">
              <div><code className="text-[#C41E3A]">/oh-my-claudecode:code-review</code></div>
              <div><code className="text-[#C41E3A]">/oh-my-claudecode:autopilot</code></div>
              <div><code className="text-[#C41E3A]">/oh-my-claudecode:tdd</code></div>
              <div className="text-gray-400">... 共 15+ 个命令</div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs font-bold rounded-md">
              插件
            </span>
            <h4 className="font-semibold text-gray-900 dark:text-white">speckit</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Spec-Driven Development 完整工作流
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <div>安装后可用:</div>
            <div className="ml-4 space-y-0.5">
              <div><code className="text-[#C41E3A]">/speckit.specify</code> - 编写规格</div>
              <div><code className="text-[#C41E3A]">/speckit.plan</code> - 制定计划</div>
              <div><code className="text-[#C41E3A]">/speckit.tasks</code> - 拆分任务</div>
              <div><code className="text-[#C41E3A]">/speckit.implement</code> - 执行实现</div>
            </div>
          </div>
        </div>
      </div>

      <BeginnerTipCard title="Skill vs 插件">
        Skill 是单个功能, 插件是功能套装。就像买单曲和买专辑的区别。
        如果你需要某个领域的完整工具链, 安装插件更方便。
      </BeginnerTipCard>
    </div>
  );
}

function StepGlobalVsProject() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        个人 vs 项目级安装
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Skill 可以放在两个位置, 影响范围不同:
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">对比项</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">个人 (全局)</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">项目级</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2.5 px-4 font-medium text-gray-900 dark:text-white">存放位置</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">~/.claude/skills/&lt;name&gt;/SKILL.md</code>
              </td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">.claude/skills/&lt;name&gt;/SKILL.md</code>
              </td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2.5 px-4 font-medium text-gray-900 dark:text-white">生效范围</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">你的所有项目</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">仅当前项目</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2.5 px-4 font-medium text-gray-900 dark:text-white">Git 追踪</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">不会被 Git 追踪</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">可以提交到仓库, 团队共享</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2.5 px-4 font-medium text-gray-900 dark:text-white">适用场景</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">个人常用工具</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">项目特定工具, 团队协作</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2.5 px-4 font-medium text-gray-900 dark:text-white">优先级</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">低 (被项目级覆盖)</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">高 (同名时优先)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">个人 (全局) 安装</h4>
          <CodeBlock
            code={`# 创建个人 skill\nmkdir -p ~/.claude/skills/code-review\n\n# 编写 SKILL.md\nvim ~/.claude/skills/code-review/SKILL.md\n\n# 所有项目都能使用 /code-review`}
            language="bash"
            title="个人安装"
          />
        </div>
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">项目级安装</h4>
          <CodeBlock
            code={`# 创建项目 skill\nmkdir -p .claude/skills/deploy\n\n# 编写 SKILL.md\nvim .claude/skills/deploy/SKILL.md\n\n# 仅当前项目可用 /deploy\n# 可提交到 Git, 团队共享`}
            language="bash"
            title="项目级安装"
          />
        </div>
      </div>

      <BeginnerTipCard title="推荐策略">
        通用工具 (如 code-review) 放在个人目录 <code>~/.claude/skills/</code>, 到处都能用。
        项目专属工具 (如 deploy, speckit) 放在项目目录 <code>.claude/skills/</code>, 方便团队协作。
        项目级 skill 会覆盖同名的个人 skill。
      </BeginnerTipCard>
    </div>
  );
}

function StepInstallPractice({ onComplete }: { onComplete: () => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        模拟安装体验
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        在下方模拟终端中体验 skill 安装流程。
      </p>

      <BeginnerTipCard title="试试这些命令">
        输入 <code>mkdir -p .claude/skills/frontend-design</code> 创建 skill 目录,
        或输入 <code>ls .claude/skills/</code> 查看项目级 skill,
        也可以输入 <code>ls ~/.claude/skills/</code> 查看个人全局 skill。
      </BeginnerTipCard>

      <div className="mt-4">
        <TerminalSimulator
          commands={installTerminalCommands}
          welcomeMessage="欢迎体验 Skill 安装流程! 输入 help 查看可用命令。"
          onCommandComplete={(cmdId) => {
            if (['install-skill', 'install-plugin', 'list-skills'].includes(cmdId)) {
              onComplete();
            }
          }}
        />
      </div>
    </div>
  );
}

function StepTroubleshooting() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        常见问题排查
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        安装 skill 时可能遇到的问题和解决方案:
      </p>

      <div className="space-y-4 mb-6">
        <div className="p-4 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            Skill 创建后无法使用
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>1. 检查目录结构: 必须是 <code>skills/&lt;name&gt;/SKILL.md</code> 格式</li>
            <li>2. 确认 SKILL.md 文件存在且格式正确</li>
            <li>3. 重启 Claude Code 会话让新 skill 生效</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            全局和项目级 skill 冲突
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>1. 项目级 skill 优先级高于个人 (全局) skill</li>
            <li>2. 同名 skill 以项目级为准</li>
            <li>3. 如需使用个人版本, 删除项目级的同名目录</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            插件部分 skill 不可用
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>1. 检查插件目录下的 skills/ 子目录是否包含完整的 SKILL.md</li>
            <li>2. 确认每个 skill 目录中都有 SKILL.md 入口文件</li>
            <li>3. 查看 Claude Code 日志获取详细错误信息</li>
          </ul>
        </div>
      </div>

      <BeginnerTipCard title="调试技巧">
        遇到问题时, 先检查目录结构是否正确: <code>ls .claude/skills/</code>。
        确认每个 skill 目录下都有 <code>SKILL.md</code> 文件。
        如果列表中没有对应目录, 说明文件位置有问题。
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
        你已经掌握了 Skill 的安装方式、插件概念和全局/项目级安装的区别。
        接下来可以浏览官方可安装的 Skill。
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {!isCompleted && (
          <Button variant="primary" onClick={onFinish}>
            标记完成
          </Button>
        )}
        <Link to="/skills/official">
          <Button variant="outline">浏览官方 Skill</Button>
        </Link>
        <Link to="/skills">
          <Button variant="outline">返回 Skills 教程</Button>
        </Link>
      </div>
    </div>
  );
}