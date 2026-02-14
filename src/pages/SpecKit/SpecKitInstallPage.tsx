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
import {
  speckitInstallTutorial,
  installTerminalCommands,
} from '../../data/tutorials/speckit-install';
import { PageSEO } from '../../components/common/PageSEO';

type OSType = 'windows' | 'macos' | 'linux';

export function SpecKitInstallPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial =
    getTutorialById('speckit-install') ?? speckitInstallTutorial;
  const tutorialProgress = getTutorialProgress('speckit-install');
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOS, setSelectedOS] = useState<OSType>('macos');

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('speckit-install');
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
    completeStep('speckit-install', stepId);
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
    completeTutorial('speckit-install');
  };

  const installCommands: Record<OSType, { uvx: string; global: string }> = {
    macos: {
      uvx: 'uvx spec-kit',
      global: 'uv tool install spec-kit',
    },
    linux: {
      uvx: 'uvx spec-kit',
      global: 'uv tool install spec-kit',
    },
    windows: {
      uvx: 'uvx spec-kit',
      global: 'uv tool install spec-kit',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="Spec-Kit 概念入门与安装"
        description="理解 Spec-Driven Development 理念, 安装并初始化 spec-kit 工具。"
        path="/spec-kit/install"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/spec-kit" className="hover:text-[#C41E3A]">Spec-Kit 教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">概念入门与安装</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Spec-Kit 概念入门与安装
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            理解 Spec-Driven Development 理念, 在模拟终端中体验 spec-kit 安装流程
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
            {/* Step 1: SDD 概念介绍 */}
            {activeStep === 0 && (
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  什么是 Spec-Driven Development?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Spec-Driven Development (SDD) 是一种开发方法论: 先写规格, 再写代码。
                  通过结构化的规格文档驱动 AI 编码, 让 AI 准确理解你的需求。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">传统方式 (Vibe Coding)</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>● 直接告诉 AI "帮我写个功能"</li>
                      <li>● 需求模糊, AI 猜测你的意图</li>
                      <li>● 反复修改, 大量返工</li>
                      <li>● 代码质量不可控</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">SDD 方式 (Spec-Kit)</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>● 先写清楚 "要做什么" 的规格</li>
                      <li>● AI 基于规格精确实现</li>
                      <li>● 一次到位, 减少返工</li>
                      <li>● 代码质量有保障</li>
                    </ul>
                  </div>
                </div>

                <BeginnerTipCard title="通俗理解">
                  想象你要装修房子。Vibe Coding 就像直接告诉工人 "帮我装修一下",
                  结果可能和你想的完全不同。SDD 就像先画好设计图, 工人按图施工, 结果更可控。
                </BeginnerTipCard>
              </div>
            )}

            {/* Step 2: 为什么需要 Spec-Kit */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  为什么需要 Spec-Kit?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  spec-kit 是一个 CLI 工具, 帮助你在 AI 编码前建立完整的规格体系。
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <span className="text-[#C41E3A] font-bold text-lg mt-0.5">1</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">结构化需求</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        将模糊的想法转化为结构化的规格文档 (spec.md), 包含用户故事、功能需求、验收标准
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <span className="text-[#C41E3A] font-bold text-lg mt-0.5">2</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">技术规划</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        自动生成实现计划 (plan.md)、数据模型 (data-model.md) 和任务列表 (tasks.md)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <span className="text-[#C41E3A] font-bold text-lg mt-0.5">3</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">AI 驱动实现</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        AI 按照规格和任务列表逐步实现, 每个任务都有明确的输入输出
                      </p>
                    </div>
                  </div>
                </div>

                <BeginnerTipCard title="spec-kit 的核心流程">
                  specify (写规格) → clarify (澄清模糊点) → plan (生成计划) → tasks (拆分任务) → implement (逐步实现)
                </BeginnerTipCard>
              </div>
            )}

            {/* Step 3: 安装前置条件 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  安装前置条件
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  安装 spec-kit 之前, 请确保你的系统已安装以下工具:
                </p>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Python 3.10+</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">必需</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      spec-kit 基于 Python 构建, 需要 Python 3.10 或更高版本
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">uv 包管理器</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">必需</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      uv 是一个极快的 Python 包管理器, 用于安装和运行 spec-kit
                    </p>
                    <CodeBlock
                      code="curl -LsSf https://astral.sh/uv/install.sh | sh"
                      language="bash"
                      title="安装 uv"
                    />
                  </div>
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Git</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">推荐</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      spec-kit 会自动初始化 Git 仓库, 建议提前安装
                    </p>
                  </div>
                </div>

                <BeginnerTipCard title="不确定是否已安装?">
                  在终端中运行 python --version 和 uv --version 检查版本。
                  如果提示 "command not found", 说明还没有安装。
                </BeginnerTipCard>
              </div>
            )}

            {/* Step 4: 安装命令 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  安装 Spec-Kit
                </h2>

                {/* OS 选择器 */}
                <div className="flex gap-2 mb-6">
                  {(['macos', 'linux', 'windows'] as OSType[]).map((os) => (
                    <button
                      key={os}
                      onClick={() => setSelectedOS(os)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedOS === os
                          ? 'bg-[#C41E3A] text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {os === 'macos' ? 'macOS' : os === 'linux' ? 'Linux' : 'Windows'}
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      方式一: 一次性运行 (推荐尝鲜)
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      不需要安装, 直接运行 spec-kit 命令:
                    </p>
                    <CodeBlock
                      code={installCommands[selectedOS].uvx}
                      language="bash"
                      title={selectedOS === 'windows' ? 'PowerShell' : 'Terminal'}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      方式二: 全局安装 (推荐长期使用)
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      安装到系统中, 随时可用:
                    </p>
                    <CodeBlock
                      code={installCommands[selectedOS].global}
                      language="bash"
                      title={selectedOS === 'windows' ? 'PowerShell' : 'Terminal'}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      初始化项目
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      安装完成后, 使用 specify init 创建新项目:
                    </p>
                    <CodeBlock
                      code={`specify init my-project --ai claude\n# 支持的 AI 代理: claude, gemini, copilot, codex`}
                      language="bash"
                      title="初始化命令"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: 模拟终端练习 */}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  模拟终端练习
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  在下方模拟终端中输入命令, 体验 spec-kit 的安装和初始化过程。
                </p>

                <BeginnerTipCard title="试试这些命令">
                  输入 specify init my-project --ai claude 体验项目初始化过程。
                  也可以尝试 uvx spec-kit 或 uv tool install spec-kit。
                </BeginnerTipCard>

                <div className="mt-4">
                  <TerminalSimulator
                    commands={installTerminalCommands}
                    welcomeMessage="欢迎使用 spec-kit 模拟终端! 请输入命令开始体验。"
                    onCommandComplete={(cmdId) => {
                      if (cmdId === 'specify-init') {
                        handleCompleteStep('terminal-practice');
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {/* Step 6: 测验 */}
            {activeStep === 5 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对 Spec-Driven Development 的理解。
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

            {/* Step 7: 完成 */}
            {activeStep === 6 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {tutorialProgress?.status === 'completed' ? '教程已完成!' : '恭喜完成!'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  你已经了解了 Spec-Driven Development 的核心理念, 并学会了如何安装和初始化 spec-kit。
                  接下来可以学习 spec-kit 的核心工作流。
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {tutorialProgress?.status !== 'completed' && (
                    <Button variant="primary" onClick={handleFinish}>
                      标记完成
                    </Button>
                  )}
                  <Link to="/spec-kit/workflow">
                    <Button variant="outline">学习核心工作流</Button>
                  </Link>
                  <Link to="/spec-kit">
                    <Button variant="outline">返回 Spec-Kit 教程</Button>
                  </Link>
                </div>
              </div>
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
