import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { CodeBlock } from '../../components/common/CodeBlock';
import { ExpandableExample } from '../../components/common/ExpandableExample';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import {
  speckitAdvancedTutorial,
  auxiliaryCommands,
  bestPractices,
} from '../../data/tutorials/speckit-advanced';
import { PageSEO } from '../../components/common/PageSEO';

export function SpecKitAdvancedPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial =
    getTutorialById('speckit-advanced') ?? speckitAdvancedTutorial;
  const tutorialProgress = getTutorialProgress('speckit-advanced');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('speckit-advanced');
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
    completeStep('speckit-advanced', stepId);
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
    completeTutorial('speckit-advanced');
  };

  const prevTutorialProgress = getTutorialProgress('speckit-case');
  const showPrerequisiteBanner = !prevTutorialProgress || prevTutorialProgress.status !== 'completed';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="Spec-Kit 进阶技巧"
        description="了解 spec-kit 辅助命令 (analyze/checklist/taskstoissues) 和最佳实践。"
        path="/spec-kit/advanced"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/spec-kit" className="hover:text-[#C41E3A]">Spec-Kit 教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">进阶技巧</span>
        </nav>

        {showPrerequisiteBanner && (
          <div className="mb-4">
            <BeginnerTipCard title="建议先完成前置步骤">
              建议先完成{' '}
              <Link to="/spec-kit/case" className="text-[#C41E3A] underline hover:no-underline">
                实战案例演练
              </Link>{' '}
              教程, 以获得更好的学习体验。
            </BeginnerTipCard>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Spec-Kit 进阶技巧
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            辅助命令与最佳实践, 让 spec-kit 工作流更高效
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
            {/* Step 1: 辅助命令 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  辅助命令
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  除了核心工作流命令, spec-kit 还提供三个辅助命令来提升开发质量和团队协作效率。
                </p>

                <div className="space-y-4">
                  {auxiliaryCommands.map((cmd) => (
                    <div
                      key={cmd.id}
                      className="rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-4 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded bg-[#C41E3A] text-white text-xs font-mono">
                            {cmd.command}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {cmd.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          {cmd.description}
                        </p>

                        {/* 使用场景 */}
                        <div className="mb-3">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                            使用场景
                          </div>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {cmd.useCases.map((uc, i) => (
                              <li key={i}>● {uc}</li>
                            ))}
                          </ul>
                        </div>

                        {/* 示例输出 (可展开) */}
                        <ExpandableExample title="查看示例输出">
                          <CodeBlock
                            code={cmd.exampleOutput}
                            language="text"
                            title={`${cmd.command} 输出示例`}
                            maxHeight="300px"
                          />
                        </ExpandableExample>

                        {/* 提示 */}
                        {cmd.tips && cmd.tips.length > 0 && (
                          <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
                            <div className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">
                              提示
                            </div>
                            <ul className="text-xs text-blue-600 dark:text-blue-300 space-y-0.5">
                              {cmd.tips.map((tip, i) => (
                                <li key={i}>● {tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <BeginnerTipCard title="辅助命令的使用时机">
                    辅助命令不是必须的, 但强烈推荐在以下时机使用:
                    修改规格后运行 analyze 检查一致性,
                    实现前运行 checklist 确保不遗漏,
                    团队协作时用 taskstoissues 同步到 GitHub。
                  </BeginnerTipCard>
                </div>
              </div>
            )}

            {/* Step 2: 最佳实践 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  最佳实践
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  掌握这些实践技巧, 让 spec-kit 工作流更加顺畅。
                </p>

                <div className="space-y-4">
                  {bestPractices.map((bp) => (
                    <div
                      key={bp.id}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    >
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                        {bp.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {bp.description}
                      </p>
                      {bp.example && (
                        <CodeBlock
                          code={bp.example}
                          language="text"
                          maxHeight="200px"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <BeginnerTipCard title="循序渐进">
                    不需要一开始就掌握所有技巧。先熟练使用核心工作流
                    (specify → clarify → plan → tasks → implement),
                    再逐步引入辅助命令和最佳实践。
                  </BeginnerTipCard>
                </div>
              </div>
            )}

            {/* Step 3: 测验 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对辅助命令和最佳实践的理解。
                </p>
                {tutorial.steps[2]?.quiz && (
                  <QuizCard
                    quiz={tutorial.steps[2].quiz}
                    onComplete={(correct) => {
                      if (correct) handleCompleteStep('advanced-quiz');
                    }}
                  />
                )}
              </div>
            )}

            {/* Step 4: 完成 */}
            {activeStep === 3 && (
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
                  你已经掌握了 spec-kit 的全部内容, 包括核心工作流、实战案例和进阶技巧。
                  现在可以在自己的项目中实践 Spec-Driven Development 了。
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {tutorialProgress?.status !== 'completed' && (
                    <Button variant="primary" onClick={handleFinish}>
                      标记完成
                    </Button>
                  )}
                  <Link to="/spec-kit">
                    <Button variant="outline">返回 Spec-Kit 教程</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 底部导航 */}
        {activeStep < 3 && (
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
