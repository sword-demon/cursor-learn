import React from 'react';

interface ProgressBarProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelPosition?: 'inside' | 'outside';
  color?: 'primary' | 'accent' | 'green';
  className?: string;
}

export function ProgressBar({
  percentage,
  size = 'md',
  showLabel = true,
  labelPosition = 'outside',
  color = 'primary',
  className = '',
}: ProgressBarProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  const heightStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colorStyles = {
    primary: 'bg-[#C41E3A]',
    accent: 'bg-[#FFD700]',
    green: 'bg-green-500',
  };

  const trackStyles = 'bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden';

  return (
    <div className={`w-full ${className}`}>
      {showLabel && labelPosition === 'outside' && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">进度</span>
          <span className="text-sm font-semibold text-[#C41E3A]">{Math.round(clampedPercentage)}%</span>
        </div>
      )}

      <div className={`${trackStyles} ${heightStyles[size]}`}>
        <div
          className={`${colorStyles[color]} ${heightStyles[size]} rounded-full transition-all duration-500 ease-out flex items-center justify-end`}
          style={{ width: `${clampedPercentage}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {showLabel && labelPosition === 'inside' && clampedPercentage > 15 && (
            <span className="text-xs font-medium text-white pr-1.5">
              {Math.round(clampedPercentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: 'primary' | 'accent' | 'green';
  showLabel?: boolean;
  className?: string;
}

export function CircularProgress({
  percentage,
  size = 48,
  strokeWidth = 4,
  color = 'primary',
  showLabel = true,
  className = '',
}: CircularProgressProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (clampedPercentage / 100) * circumference;

  const colorStyles = {
    primary: '#C41E3A',
    accent: '#FFD700',
    green: '#22C55E',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        ></circle>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorStyles[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        ></circle>
      </svg>
      {showLabel && (
        <span className="absolute text-sm font-semibold text-gray-900 dark:text-white">
          {Math.round(clampedPercentage)}%
        </span>
      )}
    </div>
  );
}

interface StepProgressProps {
  totalSteps: number;
  currentStep: number;
  completedSteps?: number[];
  className?: string;
}

export function StepProgress({
  totalSteps,
  currentStep,
  completedSteps = [],
  className = '',
}: StepProgressProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNumber = i + 1;
        const isCompleted = completedSteps.includes(stepNumber);
        const isCurrent = stepNumber === currentStep;

        return (
          <React.Fragment key={stepNumber}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                isCompleted
                  ? 'bg-[#C41E3A] text-white'
                  : isCurrent
                    ? 'bg-[#C41E3A] text-white ring-2 ring-[#C41E3A] ring-offset-2'
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              {isCompleted ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              ) : (
                stepNumber
              )}
            </div>
            {stepNumber < totalSteps && (
              <div
                className={`w-8 h-0.5 transition-all duration-200 ${
                  isCompleted ? 'bg-[#C41E3A]' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
