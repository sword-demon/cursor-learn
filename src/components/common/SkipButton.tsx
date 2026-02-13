import { Button } from './Button';

interface SkipButtonProps {
  onSkip: () => void;
  label?: string;
  className?: string;
}

/**
 * 跳过按钮组件
 * 允许用户跳过当前教程步骤
 */
export function SkipButton({ onSkip, label = '跳过此步骤', className = '' }: SkipButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onSkip}
      className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ${className}`}
      rightIcon={
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      }
    >
      {label}
    </Button>
  );
}
