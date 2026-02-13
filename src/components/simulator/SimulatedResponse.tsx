import { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import type { ResponseType } from '../../types';

interface SimulatedResponseProps {
  content: string;
  type: ResponseType;
  delay?: number;
  onComplete?: () => void;
  onApply?: () => void;
  onDismiss?: () => void;
}

/**
 * 模拟 AI 响应组件
 * 带打字机效果的响应显示
 */
export function SimulatedResponse({
  content,
  type,
  delay = 0,
  onComplete,
  onApply,
  onDismiss,
}: SimulatedResponseProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // 打字机效果
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (delay > 0) {
      timeout = setTimeout(() => {
        startTyping();
      }, delay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeout);
  }, [content, delay]);

  const startTyping = () => {
    setIsTyping(true);
    setDisplayedContent('');

    let index = 0;
    const chars = content.split('');

    const typeNextChar = () => {
      if (index < chars.length) {
        setDisplayedContent((prev) => prev + chars[index]);
        index++;
        // 随机打字速度，模拟真实效果
        const randomDelay = 20 + Math.random() * 30;
        setTimeout(typeNextChar, randomDelay);
      } else {
        setIsTyping(false);
        setShowActions(true);
        onComplete?.();
      }
    };

    typeNextChar();
  };

  // 跳过打字效果
  const skipTyping = () => {
    setDisplayedContent(content);
    setIsTyping(false);
    setShowActions(true);
    onComplete?.();
  };

  // 获取响应类型的样式
  const getTypeStyles = () => {
    switch (type) {
      case 'code-completion':
        return {
          border: 'border-l-4 border-l-green-500',
          bg: 'bg-green-50 dark:bg-green-900/10',
          icon: '💡',
          title: '代码建议',
        };
      case 'inline-edit':
        return {
          border: 'border-l-4 border-l-blue-500',
          bg: 'bg-blue-50 dark:bg-blue-900/10',
          icon: '✏️',
          title: '内联编辑',
        };
      case 'chat-message':
        return {
          border: 'border-l-4 border-l-purple-500',
          bg: 'bg-purple-50 dark:bg-purple-900/10',
          icon: '💬',
          title: 'AI 助手',
        };
      case 'context-menu':
        return {
          border: 'border-l-4 border-l-yellow-500',
          bg: 'bg-yellow-50 dark:bg-yellow-900/10',
          icon: '📋',
          title: '上下文菜单',
        };
      default:
        return {
          border: '',
          bg: '',
          icon: '🤖',
          title: 'AI',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <Card className={`${styles.border} ${styles.bg}`} padding="md">
      {/* 头部 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{styles.icon}</span>
        <span className="font-medium text-gray-900 dark:text-white">{styles.title}</span>
        {isTyping && (
          <button
            onClick={skipTyping}
            className="ml-auto text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            跳过
          </button>
        )}
      </div>

      {/* 内容 */}
      <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono text-sm">
        {displayedContent}
        {isTyping && (
          <span className="inline-block w-2 h-4 bg-[#C41E3A] animate-pulse ml-1" />
        )}
      </div>

      {/* 操作按钮 */}
      {showActions && (onApply || onDismiss) && (
        <div className="flex gap-2 mt-4">
          {onApply && (
            <Button variant="primary" size="sm" onClick={onApply}>
              应用
            </Button>
          )}
          {onDismiss && (
            <Button variant="outline" size="sm" onClick={onDismiss}>
              忽略
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}

export default SimulatedResponse;
