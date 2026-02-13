import { useEffect, useCallback } from 'react';

interface TutorialKeyNavOptions {
  onNext: () => void;
  onPrevious: () => void;
  onEscape?: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  enabled?: boolean;
}

/**
 * 教程步骤键盘导航 Hook
 * 支持方向键、Enter、Escape 导航教程步骤
 */
export function useTutorialKeyNav({
  onNext,
  onPrevious,
  onEscape,
  canGoNext,
  canGoPrevious,
  enabled = true,
}: TutorialKeyNavOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      // 忽略输入框内的按键
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          if (canGoNext) {
            e.preventDefault();
            onNext();
          }
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          if (canGoPrevious) {
            e.preventDefault();
            onPrevious();
          }
          break;
        case 'Escape':
          onEscape?.();
          break;
      }
    },
    [enabled, canGoNext, canGoPrevious, onNext, onPrevious, onEscape]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
