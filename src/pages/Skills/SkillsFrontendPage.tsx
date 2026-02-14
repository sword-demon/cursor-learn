import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { ComparisonView } from '../../components/skills/ComparisonView';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { skillsFrontendDesignTutorial } from '../../data/tutorials/skills-frontend-design';
import { skillComparisons } from '../../data/skills/skill-comparisons';
import { PageSEO } from '../../components/common/PageSEO';

const TUTORIAL_ID = 'skills-frontend-design';

export function SkillsFrontendPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial = getTutorialById(TUTORIAL_ID) ?? skillsFrontendDesignTutorial;
  const tutorialProgress = getTutorialProgress(TUTORIAL_ID);
  const [activeStep, setActiveStep] = useState(0);

  const prevTutorialProgress = getTutorialProgress('skills-official');
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

  const handleCompleteStep = (stepId: string) => {
    completeStep(TUTORIAL_ID, stepId);
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
    completeTutorial(TUTORIAL_ID);
  };

  // Map comparison IDs to step indices (steps 1-3 are comparisons)
  const comparisonMap: Record<number, string> = {
    1: 'login-page',
    2: 'dashboard',
    3: 'pricing-page',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="frontend-design Skill 深度体验"
        description="通过 3 个案例对比, 直观感受 frontend-design skill 带来的设计质量提升。"
        path="/skills/frontend-design"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/skills" className="hover:text-[#C41E3A]">Skills 教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">frontend-design</span>
        </nav>

        {showPrerequisiteBanner && (
          <div className="mb-4">
            <BeginnerTipCard title="建议先完成前置步骤">
              建议先完成{' '}
              <Link to="/skills/official" className="text-[#C41E3A] underline hover:no-underline">
                官方 Skill 介绍
              </Link>{' '}
              教程, 以获得更好的学习体验。
            </BeginnerTipCard>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            frontend-design Skill 深度体验
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            通过 3 个真实案例对比, 感受 skill 带来的设计质量飞跃
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
            {activeStep === 0 && <StepCapabilityOverview />}
            {activeStep >= 1 && activeStep <= 3 && (() => {
              const compId = comparisonMap[activeStep];
              const comparison = skillComparisons.find(c => c.id === compId);
              if (!comparison) return null;
              return (
                <StepComparison
                  comparison={comparison}
                  onComplete={() => handleCompleteStep(steps[activeStep].id)}
                />
              );
            })()}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对 frontend-design skill 的理解。
                </p>
                {tutorial.steps[4]?.quiz && (
                  <QuizCard
                    quiz={tutorial.steps[4].quiz}
                    onComplete={(correct) => {
                      if (correct) handleCompleteStep('quiz');
                    }}
                  />
                )}
              </div>
            )}
            {activeStep === 5 && (
              <StepComplete
                isCompleted={tutorialProgress?.status === 'completed'}
                onFinish={handleFinish}
              />
            )}
          </CardContent>
        </Card>

        {/* 底部导航 */}
        {activeStep < 5 && (
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

function StepCapabilityOverview() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        frontend-design Skill 能力概览
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        frontend-design 是一个专注于前端 UI/UX 设计的 skill。它内置了专业设计知识,
        能让 AI 生成的界面从 "能用" 提升到 "好看且专业"。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/10">
          <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
            50 种设计风格
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            从极简主义到 glassmorphism, 覆盖主流设计趋势
          </p>
        </div>
        <div className="p-4 rounded-lg border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/10">
          <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">
            21 种配色方案
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            专业配色体系, 自动处理明暗模式和对比度
          </p>
        </div>
        <div className="p-4 rounded-lg border border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-900/10">
          <h4 className="font-semibold text-pink-700 dark:text-pink-400 mb-2">
            专业视觉层次
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            自动应用排版节奏、间距系统和信息层级
          </p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          使用方式
        </h4>
        <code className="text-sm text-[#C41E3A] dark:text-[#FFD700]">
          /frontend-design 你的设计需求描述
        </code>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          在 Claude Code 中输入 /frontend-design 加上你的需求, skill 会自动注入设计专业知识。
        </p>
      </div>

      <BeginnerTipCard title="对比体验">
        接下来的 3 个案例会展示同一个需求, 分别用普通提示词和 /frontend-design skill 生成的效果对比。
        重点关注: 视觉层次、配色方案、交互细节和代码结构的差异。
      </BeginnerTipCard>
    </div>
  );
}

function StepComparison({
  comparison,
  onComplete,
}: {
  comparison: (typeof skillComparisons)[number];
  onComplete: () => void;
}) {
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    if (!hasViewed) {
      const timer = setTimeout(() => {
        setHasViewed(true);
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasViewed, onComplete]);

  return <ComparisonView comparison={comparison} />;
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
        你已经通过 3 个案例对比, 直观感受了 frontend-design skill 带来的设计质量提升。
        现在你可以在自己的项目中使用这个 skill 了。
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {!isCompleted && (
          <Button variant="primary" onClick={onFinish}>
            标记完成
          </Button>
        )}
        <Link to="/skills/custom">
          <Button variant="outline">学习自定义 Skill</Button>
        </Link>
        <Link to="/skills">
          <Button variant="outline">返回 Skills 教程</Button>
        </Link>
      </div>
    </div>
  );
}
