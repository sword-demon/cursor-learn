import { useState } from 'react';
import { Card } from '../common/Card';

interface HintPanelProps {
  hints: string[];
  currentStep?: number;
  onUseHint?: (hintIndex: number) => void;
  maxHints?: number;
}

/**
 * 提示面板组件
 * 当用户卡住时提供上下文提示
 */
export function HintPanel({
  hints,
  onUseHint,
  maxHints = 3,
}: HintPanelProps) {
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const revealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
      onUseHint?.(index);
    }
  };

  // 获取当前步骤的提示
  const currentHints = hints.slice(0, maxHints);
  const hasMoreHints = revealedHints.length < currentHints.length;
  const remainingHints = currentHints.length - revealedHints.length;

  if (currentHints.length === 0) return null;

  return (
    <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800" padding="md">
      {/* 头部 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span className="font-medium text-yellow-800 dark:text-yellow-200">
            需要帮助？
          </span>
          {hasMoreHints && (
            <span className="text-xs text-yellow-600 dark:text-yellow-400">
              （还有 {remainingHints} 个提示）
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-yellow-600 dark:text-yellow-400 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 展开的提示列表 */}
      {isExpanded && (
        <div className="mt-4 space-y-3">
          {currentHints.map((hint, index) => {
            const isRevealed = revealedHints.includes(index);

            return (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  isRevealed
                    ? 'bg-white dark:bg-gray-800'
                    : 'bg-yellow-100/50 dark:bg-yellow-800/30'
                }`}
              >
                {isRevealed ? (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                        提示 {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{hint}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => revealHint(index)}
                    className="w-full flex items-center justify-center gap-2 text-sm text-yellow-700 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    显示提示 {index + 1}
                  </button>
                )}
              </div>
            );
          })}

          {/* 鼓励信息 */}
          {revealedHints.length === currentHints.length && (
            <p className="text-xs text-center text-yellow-600 dark:text-yellow-400 italic">
              你已经查看了所有提示，再试一次吧！
            </p>
          )}
        </div>
      )}
    </Card>
  );
}

export default HintPanel;
