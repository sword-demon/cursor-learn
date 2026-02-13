import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Tutorial, TutorialStep } from '../../types';
import { getTutorialById } from '../../services/tutorial-service';
import { useProgress } from '../../contexts/ProgressContext';
import { SimulationView } from '../simulator/SimulationView';
import { TutorialNavigation } from './TutorialNavigation';
import { CommandOverlay } from '../simulator/CommandOverlay';
import { Button } from '../common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { getScenarioById } from '../../services/simulator-service';
import { getShortcutDisplay } from '../../hooks/useKeyboardShortcuts';

/**
 * 命令教程组件
 * 结合讲解和模拟练习的完整教程体验
 */
export function CommandTutorial() {
  const { commandId } = useParams<{ commandId: string }>();
  const navigate = useNavigate();
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } = useProgress();

  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<TutorialStep | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 加载教程数据
  useEffect(() => {
    if (!commandId) {
      navigate('/commands');
      return;
    }

    const tutorialData = getTutorialById(commandId);
    if (!tutorialData) {
      navigate('/commands');
      return;
    }

    setTutorial(tutorialData);

    // 获取进度并恢复状态
    const progress = getTutorialProgress(commandId);
    if (progress?.currentStepId) {
      const stepIndex = tutorialData.steps.findIndex(
        (s) => s.id === progress.currentStepId
      );
      if (stepIndex >= 0) {
        setCurrentStepIndex(stepIndex);
      }
    }

    // 开始教程
    startTutorial(commandId);
    setIsLoading(false);
  }, [commandId, navigate, startTutorial, getTutorialProgress]);

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

    // 检查是否还有更多步骤
    if (currentStepIndex < tutorial.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // 完成整个教程
      completeTutorial(tutorial.id);
      navigate('/commands');
    }
  };

  // 处理上一步
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // 处理模拟完成
  const handleSimulationComplete = (success: boolean) => {
    if (success) {
      handleStepComplete();
    }
  };

  // 获取快捷键显示
  const getCommandShortcut = () => {
    if (!commandId) return '';
    if (commandId.includes('tab')) return getShortcutDisplay('tab');
    if (commandId.includes('ctrl-k')) return getShortcutDisplay('ctrl-k');
    if (commandId.includes('ctrl-l')) return getShortcutDisplay('ctrl-l');
    if (commandId.includes('at')) return getShortcutDisplay('at-mention');
    return '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C41E3A] mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!tutorial || !currentStep) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center p-8">
          <p className="text-gray-600">教程未找到</p>
          <Button onClick={() => navigate('/commands')} className="mt-4">
            返回命令列表
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 头部 */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/commands')}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                }
              >
                返回
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {tutorial.title}
                </h1>
                <p className="text-sm text-gray-500">{tutorial.description}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowShortcuts(true)}>
              快捷键
            </Button>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：步骤内容 */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>步骤 {currentStepIndex + 1} / {tutorial.steps.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {currentStep.title}
                </h3>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {currentStep.content}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 快捷键提示 */}
            {currentStep.type === 'simulation' && (
              <Card className="bg-[#C41E3A]/5 border-[#C41E3A]" padding="md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C41E3A] text-white flex items-center justify-center font-mono font-bold">
                    {getCommandShortcut()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">当前命令</p>
                    <p className="text-sm text-gray-500">在编辑器中尝试这个快捷键</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* 右侧：模拟/练习区域 */}
          <div className="lg:col-span-2">
            {currentStep.type === 'simulation' || currentStep.type === 'practice' ? (
              currentStep.simulationId ? (
                <SimulationView
                  scenario={getScenarioById(currentStep.simulationId)!}
                  onComplete={handleSimulationComplete}
                  onExit={() => navigate('/commands')}
                />
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-gray-600">模拟练习加载中...</p>
                </Card>
              )
            ) : (
              <Card className="p-8">
                <div className="prose dark:prose-invert max-w-none">
                  <div className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {currentStep.content}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* 底部导航 */}
        <div className="mt-8 max-w-3xl mx-auto">
          <TutorialNavigation
            currentStep={currentStepIndex + 1}
            totalSteps={tutorial.steps.length}
            onPrevious={handlePrevious}
            onNext={handleStepComplete}
            canGoPrevious={currentStepIndex > 0}
            canGoNext={true}
            isStepComplete={false}
          />
        </div>
      </main>

      {/* 快捷键覆盖层 */}
      <CommandOverlay
        isVisible={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
}

export default CommandTutorial;
