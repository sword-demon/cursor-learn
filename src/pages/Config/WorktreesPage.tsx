import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { configWorktreesTutorial } from '../../data/tutorials/config-worktrees';
import { PageSEO } from '../../components/common/PageSEO';

export function WorktreesPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } = useProgress();
  const tutorial = getTutorialById('config-worktrees') ?? configWorktreesTutorial;
  const tutorialProgress = getTutorialProgress('config-worktrees');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('config-worktrees');
    }
  }, [tutorialProgress, startTutorial]);

  const steps = tutorial.steps;
  const currentProgress = steps.length
    ? Math.round(((tutorialProgress?.completedStepIds.length ?? 0) / steps.length) * 100)
    : 0;

  const isStepCompleted = (stepId: string) =>
    tutorialProgress?.completedStepIds.includes(stepId) ?? false;

  const handleCompleteStep = (stepId: string) => {
    completeStep('config-worktrees', stepId);
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
    completeTutorial('config-worktrees');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="Worktrees 配置"
        description="学习使用 Git Worktrees 在 Cursor 中高效管理多分支开发。"
        path="/config/worktrees"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/config" className="hover:text-[#C41E3A]">配置教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">并行 Agent (Worktrees)</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            并行 Agent (Worktrees)
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            使用 Git Worktrees 让多个 Agent 并行工作
          </p>
        </div>

        {/* 进度条 */}
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
            {/* Step 0: 概览 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  并行 Agent 概览
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Cursor 支持在独立的 Git worktree 中同时运行多个 Agent, 每个 Agent 有自己的工作目录, 互不干扰。
                </p>

                <BeginnerTipCard title="通俗理解">
                  并行 Agent 就像同时雇了几个助手, 每个人在自己的办公桌上工作, 互不打扰。做完后你挑选最好的成果采用。
                </BeginnerTipCard>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    适用场景
                  </h3>
                  <ul className="space-y-2">
                    {[
                      '对比不同模型的输出质量',
                      '同时尝试多种实现方案',
                      '并行处理多个独立任务',
                      '提高复杂任务的成功率',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10">
                  <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
                    注意事项
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    这是高级功能, 适合有 Git 经验的用户。建议先熟悉基础 Agent 功能后再使用。
                  </p>
                </div>
              </div>
            )}

            {/* Step 1: 核心概念 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  核心概念
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Git worktree 是 Git 的原生功能, 允许同一仓库有多个工作目录。每个 worktree 可以独立切换分支、修改文件, 而不影响其他 worktree。
                </p>

                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                    工作流程
                  </h3>
                  <ol className="space-y-2">
                    {[
                      '用户启动多个 Agent 任务',
                      'Cursor 为每个 Agent 创建独立的 worktree',
                      'Agent 在各自的 worktree 中并行工作',
                      '用户预览每个 Agent 的结果',
                      '选择最佳方案 Apply 到主工作树',
                    ].map((step, i) => (
                      <li key={step} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Cursor 中的实现
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { label: '独立文件系统', desc: '每个 Agent 在独立的 worktree 中运行' },
                      { label: '互不干扰', desc: 'Agent A 的修改不会影响 Agent B 的工作环境' },
                      { label: '共享 Git 历史', desc: '所有 worktree 共享同一个 .git 目录和提交历史' },
                      { label: '自动管理', desc: 'Cursor 自动创建和清理 worktree, 无需手动操作' },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-1.5" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                          <span className="text-gray-600 dark:text-gray-400">: {item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Step 2: Best-of-N 功能 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Best-of-N 功能
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Best-of-N 允许你用同一个 prompt 同时在多个模型上运行 Agent, 系统会展示所有结果, 由你选择最佳方案。
                </p>

                <div className="mb-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    工作原理
                  </h3>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 font-mono leading-relaxed">
{`用户输入 prompt
    ↓
Cursor 创建 N 个 worktree
    ↓
在每个 worktree 中运行不同模型
    ↓
展示所有结果供用户选择
    ↓
用户 Apply 最佳方案到主工作树`}
                    </pre>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                    使用场景
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { label: '复杂任务', desc: '对于难度较高的任务, 不同模型可能有不同的解决思路' },
                      { label: '质量对比', desc: '直观对比 GPT-4、Claude、Gemini 等模型的输出质量' },
                      { label: '方案选择', desc: '从多个可行方案中选择最符合需求的' },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                          <span className="text-gray-600 dark:text-gray-400">: {item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                    优势
                  </h3>
                  <ul className="space-y-2">
                    {[
                      '提高复杂任务的成功率',
                      '发现不同模型的优势领域',
                      '节省反复尝试的时间',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: Apply 流程 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Apply 流程
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Agent 在 worktree 中完成工作后, Cursor 会展示更改预览。通过 "Apply" 操作将 worktree 中的更改合并回主工作树。
                </p>

                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                    操作步骤
                  </h3>
                  <ol className="space-y-2">
                    {[
                      '查看 Agent 的工作结果',
                      '检查文件更改是否符合预期',
                      '点击 "Apply" 按钮',
                      'Cursor 自动将更改合并到主工作树',
                      'Worktree 被自动清理',
                    ].map((step, i) => (
                      <li key={step} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mb-6 p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
                  <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    预览更改
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
                    Cursor 会展示更改预览:
                  </p>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                      修改的文件列表
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                      每个文件的 diff 对比
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                      新增或删除的文件
                    </li>
                  </ul>
                </div>

                <div className="mb-6 p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10">
                  <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
                    冲突处理
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    如果主工作树在 Agent 工作期间发生了更改, Apply 时可能出现冲突。Cursor 会提示你手动解决冲突。
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    放弃更改
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    如果 Agent 的结果不满意, 可以直接关闭预览, Cursor 会自动清理该 worktree, 不会影响主工作树。
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: 配置说明 */}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  配置说明
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  <span className="font-mono font-semibold">.cursor/worktrees.json</span> 文件用于配置 worktree 的初始化行为。
                </p>

                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                    初始化脚本
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    初始化脚本在创建新 worktree 时自动运行, 用于安装依赖或执行其他准备工作。
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Node.js 项目配置
                      </h4>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-sm text-gray-300 font-mono">
{`{
  "initScript": "npm install"
}`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Python 项目配置
                      </h4>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-sm text-gray-300 font-mono">
{`{
  "initScript": "pip install -r requirements.txt"
}`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        多命令配置
                      </h4>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-sm text-gray-300 font-mono">
{`{
  "initScript": "npm install && npm run build"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    自动清理
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    不再使用的 worktree 会被 Cursor 自动清理, 无需手动删除。清理时机:
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                      Apply 操作完成后
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                      用户关闭预览窗口
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                      Cursor 重启时检查未使用的 worktree
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                    配置建议
                  </h3>
                  <ul className="space-y-2">
                    {[
                      '初始化脚本应该快速完成, 避免长时间等待',
                      '如果项目依赖较多, 考虑使用缓存加速安装',
                      '确保初始化脚本在所有平台上都能正常运行',
                    ].map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-1.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Step 5: 测验 */}
            {activeStep === 5 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对并行 Agent 功能的掌握程度。
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

            {/* Step 6: 完成 */}
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
                  你已经了解了 Cursor 并行 Agent 功能的核心知识, 可以在实际项目中尝试使用这个高级功能了。
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {tutorialProgress?.status !== 'completed' && (
                    <Button variant="primary" onClick={handleFinish}>
                      标记完成
                    </Button>
                  )}
                  <Link to="/config">
                    <Button variant="outline">返回配置教程</Button>
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
