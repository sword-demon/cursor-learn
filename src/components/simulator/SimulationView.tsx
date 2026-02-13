import { useState, useEffect, useCallback } from 'react';
import type { SimulationScenario, SimulationStep } from '../../types';
import { CodeEditor } from './CodeEditor';
import { SimulatedResponse } from './SimulatedResponse';
import { HintPanel } from './HintPanel';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useKeyboardShortcuts, type ShortcutType } from '../../hooks/useKeyboardShortcuts';

interface SimulationViewProps {
  scenario: SimulationScenario;
  onComplete: (success: boolean) => void;
  onExit?: () => void;
}

/**
 * 模拟器主视图
 * 协调编辑器、响应、提示等组件
 */
export function SimulationView({ scenario, onComplete, onExit }: SimulationViewProps) {
  const [currentStepOrder, setCurrentStepOrder] = useState(1);
  const [currentStep, setCurrentStep] = useState<SimulationStep | undefined>();
  const [code, setCode] = useState(scenario.initialCode);
  const [showResponse, setShowResponse] = useState(false);
  const [responseContent, setResponseContent] = useState('');
  const [, setHintsUsed] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [] = useState(Date.now());

  // 加载当前步骤
  useEffect(() => {
    const step = scenario.steps.find((s) => s.order === currentStepOrder);
    setCurrentStep(step);
    setShowResponse(false);
    setResponseContent('');
  }, [currentStepOrder, scenario.steps]);

  // 处理用户操作
  const handleAction = useCallback(
    (action: { type: ShortcutType; value: string }) => {
      if (!currentStep) return;

      const matchesTrigger =
        (currentStep.trigger.type === 'keystroke' && action.type === 'tab') ||
        (currentStep.trigger.type === 'command' &&
          ((action.type === 'ctrl-k' && currentStep.trigger.value === 'Ctrl+K') ||
            (action.type === 'ctrl-l' && currentStep.trigger.value === 'Ctrl+L')));

      if (matchesTrigger) {
        // 显示响应
        setResponseContent(currentStep.response.content);
        setShowResponse(true);

        // 标记步骤完成
        if (!completedSteps.includes(currentStep.order)) {
          setCompletedSteps([...completedSteps, currentStep.order]);
        }
      }
    },
    [currentStep, completedSteps]
  );

  // 处理响应完成
  const handleResponseComplete = useCallback(() => {
    // 检查是否有下一步
    const hasNext = scenario.steps.some((s) => s.order > currentStepOrder);
    if (hasNext) {
      // 自动进入下一步（可选）
    } else {
      // 所有步骤完成
      onComplete(true);
    }
  }, [currentStepOrder, scenario.steps, onComplete]);

  // 进入下一步
  const goToNextStep = () => {
    const nextStep = scenario.steps.find((s) => s.order > currentStepOrder);
    if (nextStep) {
      setCurrentStepOrder(nextStep.order);
    } else {
      onComplete(true);
    }
  };

  // 记录提示使用
  const handleUseHint = () => {
    setHintsUsed((prev) => prev + 1);
  };

  // 全局快捷键
  useKeyboardShortcuts([
    { type: 'escape', handler: () => onExit?.(), enabled: true },
  ]);

  if (!currentStep) {
    return (
      <Card className="p-8 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          练习完成！
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          你已经完成了所有步骤
        </p>
        <Button onClick={() => onComplete(true)}>完成</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 场景标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {scenario.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {scenario.description}
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          步骤 {currentStep.order} / {scenario.steps.length}
        </div>
      </div>

      {/* 步骤说明 */}
      <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800" padding="md">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C41E3A] text-white flex items-center justify-center font-semibold">
            {currentStep.order}
          </div>
          <p className="text-gray-800 dark:text-gray-200 pt-1">{currentStep.instruction}</p>
        </div>
      </Card>

      {/* 代码编辑器 */}
      <CodeEditor
        initialCode={code}
        language={scenario.language}
        onCodeChange={setCode}
        onTriggerAction={handleAction}
        height="300px"
      />

      {/* AI 响应 */}
      {showResponse && (
        <SimulatedResponse
          content={responseContent}
          type={currentStep.response.type}
          delay={currentStep.response.delay || 300}
          onComplete={handleResponseComplete}
          onApply={goToNextStep}
          onDismiss={() => setShowResponse(false)}
        />
      )}

      {/* 提示面板 */}
      <HintPanel
        hints={scenario.hints}
        currentStep={currentStep.order}
        onUseHint={handleUseHint}
      />

      {/* 操作按钮 */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onExit}>
          退出练习
        </Button>

        {showResponse && (
          <Button onClick={goToNextStep}>
            {currentStep.order < scenario.steps.length ? '下一步' : '完成练习'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default SimulationView;
