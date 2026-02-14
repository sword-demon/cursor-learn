import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { CodeBlock } from '../../components/common/CodeBlock';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import {
  speckitCaseTutorial,
  caseStudySteps,
} from '../../data/tutorials/speckit-case';
import { PageSEO } from '../../components/common/PageSEO';

export function SpecKitCasePage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial =
    getTutorialById('speckit-case') ?? speckitCaseTutorial;
  const tutorialProgress = getTutorialProgress('speckit-case');
  const [activeStep, setActiveStep] = useState(0);
  const [activeCaseStep, setActiveCaseStep] = useState(0);
  const [viewedCaseSteps, setViewedCaseSteps] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('speckit-case');
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
    completeStep('speckit-case', stepId);
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
    completeTutorial('speckit-case');
  };

  const handleCaseStepChange = (index: number) => {
    setActiveCaseStep(index);
    setViewedCaseSteps((prev) => new Set(prev).add(index));
    // 当用户浏览了所有案例步骤时, 标记分步演练完成
    if (viewedCaseSteps.size >= caseStudySteps.length - 1) {
      handleCompleteStep('case-walkthrough');
    }
  };

  const prevTutorialProgress = getTutorialProgress('speckit-workflow');
  const showPrerequisiteBanner = !prevTutorialProgress || prevTutorialProgress.status !== 'completed';

  const currentCase = caseStudySteps[activeCaseStep];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="Spec-Kit 实战案例"
        description="通过任务管理应用案例, 逐步体验 spec-kit 全流程。"
        path="/spec-kit/case"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/spec-kit" className="hover:text-[#C41E3A]">Spec-Kit 教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">实战案例</span>
        </nav>

        {showPrerequisiteBanner && (
          <div className="mb-4">
            <BeginnerTipCard title="建议先完成前置步骤">
              建议先完成{' '}
              <Link to="/spec-kit/workflow" className="text-[#C41E3A] underline hover:no-underline">
                核心工作流
              </Link>{' '}
              教程, 以获得更好的学习体验。
            </BeginnerTipCard>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Spec-Kit 实战案例
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            通过一个任务管理应用, 从零体验 spec-kit 的完整开发流程
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
            {/* Step 1: 案例背景 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  案例背景
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  我们将使用 spec-kit 从零开始开发一个任务管理应用 (Task Manager)。
                  通过这个案例, 你将亲身体验 Spec-Driven Development 的完整流程。
                </p>

                <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10 mb-6">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
                    案例目标: 任务管理应用
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>● 创建、编辑、删除任务</li>
                    <li>● 支持优先级 (高/中/低) 和截止日期</li>
                    <li>● 按状态和优先级筛选</li>
                    <li>● 数据保存在 localStorage</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mb-6">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    我们将经历 6 个步骤
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {caseStudySteps.map((step) => (
                      <div
                        key={step.id}
                        className="px-3 py-2 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm"
                      >
                        <span className="text-[#C41E3A] font-mono text-xs">
                          Step {step.order}
                        </span>
                        <div className="text-gray-800 dark:text-gray-200 font-medium">
                          {step.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <BeginnerTipCard title="学习建议">
                  建议按顺序逐步浏览每个步骤, 重点关注每步生成的文档内容。
                  这些文档就是 spec-kit 帮你 "想清楚" 的成果。
                </BeginnerTipCard>
              </div>
            )}

            {/* Step 2: 分步演练 */}
            {activeStep === 1 && currentCase && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  分步演练
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                  已浏览 {viewedCaseSteps.size} / {caseStudySteps.length} 个步骤
                  {viewedCaseSteps.size >= caseStudySteps.length && ' - 全部浏览完成!'}
                </p>

                {/* 案例步骤导航 */}
                <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
                  {caseStudySteps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => handleCaseStepChange(index)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                        index === activeCaseStep
                          ? 'bg-[#C41E3A] text-white'
                          : viewedCaseSteps.has(index)
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {viewedCaseSteps.has(index) && index !== activeCaseStep
                        ? '✓ '
                        : ''}
                      Step {step.order}: {step.title}
                    </button>
                  ))}
                </div>

                {/* 当前案例步骤内容 */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-[#C41E3A] text-white text-xs font-mono">
                        Step {currentCase.order}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {currentCase.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {currentCase.description}
                    </p>

                    {/* 命令显示 */}
                    <div className="mb-4">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                        执行命令
                      </div>
                      <div className="font-mono text-sm px-4 py-2 rounded bg-gray-900 text-green-400">
                        $ {currentCase.command}
                      </div>
                    </div>

                    {/* 命令输入 (如果有) */}
                    {currentCase.commandInput && (
                      <div className="mb-4">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          输入说明
                        </div>
                        <div className="text-sm px-4 py-2 rounded bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                          {currentCase.commandInput}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 生成的文档内容 */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      生成的文档: {currentCase.generatedFileName}
                    </div>
                    <CodeBlock
                      code={currentCase.generatedContent}
                      language="markdown"
                      title={currentCase.generatedFileName}
                      maxHeight="400px"
                    />
                  </div>

                  {/* 关键内容高亮 */}
                  {currentCase.highlights && currentCase.highlights.length > 0 && (
                    <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800">
                      <div className="text-xs font-medium text-yellow-700 dark:text-yellow-400 mb-1">
                        关键内容
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentCase.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 案例步骤底部导航 */}
                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleCaseStepChange(Math.max(0, activeCaseStep - 1))
                      }
                      disabled={activeCaseStep === 0}
                    >
                      上一步
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        handleCaseStepChange(
                          Math.min(caseStudySteps.length - 1, activeCaseStep + 1)
                        )
                      }
                      disabled={activeCaseStep === caseStudySteps.length - 1}
                    >
                      下一步
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: 流程回顾 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  流程回顾
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回顾整个案例, 看看 spec-kit 如何帮助我们从模糊的想法到清晰的实现计划。
                </p>

                <div className="space-y-3 mb-6">
                  {caseStudySteps.map((step) => (
                    <div
                      key={step.id}
                      className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C41E3A] text-white flex items-center justify-center text-sm font-bold">
                        {step.order}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {step.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-mono text-xs">{step.command}</span>
                          {' → '}
                          {step.generatedFileName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mb-6">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    最终产出物
                  </h4>
                  <div className="font-mono text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div>specs/001-task-manager/</div>
                    <div className="pl-4">├── constitution.md</div>
                    <div className="pl-4">├── spec.md</div>
                    <div className="pl-4">├── plan.md</div>
                    <div className="pl-4">├── data-model.md</div>
                    <div className="pl-4">└── tasks.md</div>
                  </div>
                </div>

                <BeginnerTipCard title="从文档到代码">
                  有了这些文档, 接下来只需运行 /speckit.implement,
                  AI 就能按照 tasks.md 中的任务列表逐步实现代码。
                  每一步都有充分的上下文, 大幅减少 AI 的 "幻觉" 和返工。
                </BeginnerTipCard>
              </div>
            )}

            {/* Step 4: 测验 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对 spec-kit 实战流程的理解。
                </p>
                {tutorial.steps[3]?.quiz && (
                  <QuizCard
                    quiz={tutorial.steps[3].quiz}
                    onComplete={(correct) => {
                      if (correct) handleCompleteStep('case-quiz');
                    }}
                  />
                )}
              </div>
            )}

            {/* Step 5: 完成 */}
            {activeStep === 4 && (
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
                  你已经通过实战案例掌握了 spec-kit 的完整流程。
                  接下来可以了解辅助命令和进阶技巧。
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {tutorialProgress?.status !== 'completed' && (
                    <Button variant="primary" onClick={handleFinish}>
                      标记完成
                    </Button>
                  )}
                  <Link to="/spec-kit/advanced">
                    <Button variant="outline">进阶技巧</Button>
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
        {activeStep < 4 && (
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
