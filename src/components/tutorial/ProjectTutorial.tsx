import { useState, useEffect } from 'react';
import type { Tutorial, TutorialStep } from '../../types';
import { getTutorialById } from '../../services/tutorial-service';
import { useProgress } from '../../contexts/ProgressContext';
import { SimulationView } from '../simulator/SimulationView';
import { ProjectStep } from './ProjectStep';
import { ProjectCompletion } from './ProjectCompletion';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { getProjectScenarioById } from '../../data/scenarios/project-scenarios';

/**
 * 项目教程主组件
 * 多步骤项目指导，结合讲解和模拟练习
 */

interface ProjectTutorialProps {
  tutorialId?: string;
}

export function ProjectTutorial({ tutorialId = 'project-todo' }: ProjectTutorialProps) {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } = useProgress();

  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<TutorialStep | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // 加载教程数据
  useEffect(() => {
    const tutorialData = getTutorialById(tutorialId);
    if (!tutorialData) {
      setIsLoading(false);
      return;
    }

    setTutorial(tutorialData);

    // 获取进度并恢复状态
    const progress = getTutorialProgress(tutorialId);
    if (progress?.currentStepId) {
      const stepIndex = tutorialData.steps.findIndex(
        (s) => s.id === progress.currentStepId
      );
      if (stepIndex >= 0) {
        setCurrentStepIndex(stepIndex);
      }
    }

    if (progress?.completedStepIds) {
      setCompletedSteps(progress.completedStepIds);
    }

    // 开始教程
    startTutorial(tutorialId);
    setIsLoading(false);
  }, [tutorialId, startTutorial, getTutorialProgress]);

  // 更新当前步骤
  useEffect(() => {
    if (tutorial) {
      setCurrentStep(tutorial.steps[currentStepIndex]);
    }
  }, [tutorial, currentStepIndex]);

  // 处理步骤完成
  const handleStepComplete = () => {
    if (!tutorial || !currentStep) return;

    completeStep(tutorial.id, currentStep.id);

    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id]);
    }

    // 检查是否还有更多步骤
    if (currentStepIndex < tutorial.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // 完成整个教程
      setShowCompletion(true);
    }
  };

  // 处理项目完成
  const handleProjectComplete = () => {
    if (!tutorial) return;
    completeTutorial(tutorial.id);
    setShowCompletion(false);
  };

  // 处理上一步
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // 跳转到指定步骤
  const goToStep = (index: number) => {
    if (index >= 0 && index < (tutorial?.steps.length || 0)) {
      setCurrentStepIndex(index);
    }
  };

  // 处理模拟完成
  const handleSimulationComplete = (success: boolean) => {
    if (success) {
      handleStepComplete();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C41E3A] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (!tutorial || !currentStep) {
    return (
      <Card className="text-center p-8">
        <p className="text-gray-600 dark:text-gray-400">教程未找到</p>
      </Card>
    );
  }

  // 显示完成页面
  if (showCompletion) {
    return (
      <ProjectCompletion
        tutorial={tutorial}
        completedSteps={completedSteps}
        onComplete={handleProjectComplete}
        onReview={() => setShowCompletion(false)}
      />
    );
  }

  const progress = Math.round((completedSteps.length / tutorial.steps.length) * 100);

  return (
    <div className="space-y-6">
      {/* 项目标题和进度 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {tutorial.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {tutorial.description}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#C41E3A]">{progress}%</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {completedSteps.length} / {tutorial.steps.length} 步骤
          </p>
        </div>
      </div>

      {/* 进度条 */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-[#C41E3A] h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 步骤导航 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tutorial.steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = index === currentStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isCurrent
                  ? 'bg-[#C41E3A] text-white'
                  : isCompleted
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                isCurrent
                  ? 'bg-white text-[#C41E3A]'
                  : isCompleted
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
              <span className="text-sm font-medium whitespace-nowrap">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* 当前步骤内容 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：步骤说明 */}
        <div>
          <ProjectStep
            step={currentStep}
            stepNumber={currentStepIndex + 1}
            totalSteps={tutorial.steps.length}
            isCompleted={completedSteps.includes(currentStep.id)}
            onComplete={handleStepComplete}
            onPrevious={handlePrevious}
            canGoPrevious={currentStepIndex > 0}
          />
        </div>

        {/* 右侧：模拟/练习区域 */}
        <div>
          {currentStep.type === 'simulation' || currentStep.type === 'practice' ? (
            currentStep.simulationId ? (
              <SimulationView
                scenario={getProjectScenarioById(currentStep.simulationId)!}
                onComplete={handleSimulationComplete}
                onExit={() => {}}
              />
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">模拟练习加载中...</p>
              </Card>
            )
          ) : (
            <Card className="p-8">
              <div className="prose dark:prose-invert max-w-none">
                <div className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {currentStep.content}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={handleStepComplete}>
                  {currentStepIndex === tutorial.steps.length - 1 ? '完成项目' : '下一步'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectTutorial;
