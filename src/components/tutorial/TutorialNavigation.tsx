import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';

interface TutorialNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isStepComplete: boolean;
  onCompleteStep?: () => void;
}

/**
 * 教程导航组件
 * 上一步/下一步按钮和进度显示
 */
export function TutorialNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  isStepComplete,
  onCompleteStep,
}: TutorialNavigationProps) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="space-y-4">
      {/* 进度条 */}
      <div className="flex items-center gap-4">
        <ProgressBar percentage={progress} size="sm" className="flex-1" />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {currentStep} / {totalSteps}
        </span>
      </div>

      {/* 导航按钮 */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          }
        >
          上一步
        </Button>

        {/* 完成当前步骤按钮 */}
        {!isStepComplete && onCompleteStep && (
          <Button variant="secondary" onClick={onCompleteStep}>
            标记完成
          </Button>
        )}

        <Button
          variant="primary"
          onClick={onNext}
          disabled={!canGoNext}
          rightIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          }
        >
          {currentStep >= totalSteps ? '完成' : '下一步'}
        </Button>
      </div>
    </div>
  );
}

export default TutorialNavigation;
