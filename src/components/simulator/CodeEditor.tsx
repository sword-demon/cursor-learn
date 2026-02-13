import React, { useState, useCallback, useEffect } from 'react';
import { Card } from '../common/Card';
import { useKeyboardShortcuts, type ShortcutType } from '../../hooks/useKeyboardShortcuts';

interface CodeEditorProps {
  initialCode: string;
  language: string;
  onCodeChange?: (code: string) => void;
  onTriggerAction?: (action: { type: ShortcutType; value: string }) => void;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  height?: string;
  expectedInput?: string;
}

/**
 * 简化的代码编辑器组件
 * 使用 textarea 模拟 Monaco Editor 的基础功能
 */
export function CodeEditor({
  initialCode,
  language,
  onCodeChange,
  onTriggerAction,
  readOnly = false,
  showLineNumbers = true,
  height = '300px',
  expectedInput,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [, setCursorPosition] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // 监听代码变化
  useEffect(() => {
    onCodeChange?.(code);

    // 检查是否触发建议
    if (expectedInput && code.includes(expectedInput)) {
      setShowSuggestion(true);
      // 根据语言生成简单的建议
      generateSuggestion(code);
    }
  }, [code, expectedInput, language, onCodeChange]);

  // 生成简单的代码建议（模拟 AI）
  const generateSuggestion = (currentCode: string) => {
    const suggestions: Record<string, string> = {
      'return a +': ' b;',
      'gree': 'ting',
      'function calculate': 'Sum(a, b) {',
    };

    for (const [prefix, completion] of Object.entries(suggestions)) {
      if (currentCode.includes(prefix) && !currentCode.includes(prefix + completion)) {
        setSuggestion(completion);
        return;
      }
    }
    setSuggestion('');
  };

  // 处理代码变化
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  }, []);

  // 处理光标位置
  const handleSelect = useCallback((e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setCursorPosition(target.selectionStart);
  }, []);

  // 处理 Tab 键
  const handleTab = useCallback(() => {
    if (showSuggestion && suggestion) {
      // 接受建议
      const newCode = code + suggestion;
      setCode(newCode);
      setShowSuggestion(false);
      onTriggerAction?.({ type: 'tab', value: 'Tab' });
    } else {
      // 插入缩进
      const indent = '  ';
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newCode = code.substring(0, start) + indent + code.substring(end);
        setCode(newCode);
        // 恢复光标位置
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + indent.length;
        }, 0);
      }
    }
  }, [code, showSuggestion, suggestion, onTriggerAction]);

  // 键盘快捷键
  useKeyboardShortcuts([
    { type: 'tab', handler: handleTab, enabled: !readOnly },
    {
      type: 'ctrl-k',
      handler: () => onTriggerAction?.({ type: 'ctrl-k', value: 'Ctrl+K' }),
      enabled: true,
    },
    {
      type: 'ctrl-l',
      handler: () => onTriggerAction?.({ type: 'ctrl-l', value: 'Ctrl+L' }),
      enabled: true,
    },
  ]);

  // 计算行号
  const lineNumbers = code.split('\n').map((_, i) => i + 1);

  // 语法高亮（简化版）
  const highlightCode = (text: string) => {
    const keywords = ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while'];
    const strings = text.match(/"[^"]*"|'[^']*'/g) || [];

    let highlighted = text;

    // 高亮关键字
    keywords.forEach((kw) => {
      highlighted = highlighted.replace(
        new RegExp(`\\b${kw}\\b`, 'g'),
        `<span class="text-purple-600 dark:text-purple-400">${kw}</span>`
      );
    });

    // 高亮字符串
    strings.forEach((str) => {
      highlighted = highlighted.replace(
        str,
        `<span class="text-green-600 dark:text-green-400">${str}</span>`
      );
    });

    // 高亮注释
    highlighted = highlighted.replace(
      /(\/\/.*$)/gm,
      '<span class="text-gray-400 dark:text-gray-500">$1</span>'
    );

    return highlighted;
  };

  return (
    <Card className="overflow-hidden font-mono text-sm" padding="none">
      {/* 编辑器头部 */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="ml-3 text-xs text-gray-500 dark:text-gray-400">
            {language.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{code.split('\n').length} 行</span>
          <span>{code.length} 字符</span>
        </div>
      </div>

      {/* 编辑器主体 */}
      <div className="flex" style={{ height }}>
        {/* 行号 */}
        {showLineNumbers && (
          <div className="flex-none w-12 py-3 text-right bg-gray-50 dark:bg-gray-900/50 text-gray-400 select-none">
            {lineNumbers.map((num) => (
              <div key={num} className="px-2 leading-6 text-xs">
                {num}
              </div>
            ))}
          </div>
        )}

        {/* 代码区域 */}
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleChange}
            onSelect={handleSelect}
            readOnly={readOnly}
            className="absolute inset-0 w-full h-full p-3 bg-transparent text-transparent caret-gray-900 dark:caret-white resize-none focus:outline-none leading-6 font-mono text-sm z-10"
            spellCheck={false}
            style={{ tabSize: 2 }}
          />
          <pre
            className="absolute inset-0 w-full h-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 leading-6 font-mono text-sm pointer-events-none overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: highlightCode(code) + (showSuggestion ? `<span class="text-gray-400">${suggestion}</span>` : ''),
            }}
          />

          {/* AI 建议提示 */}
          {showSuggestion && suggestion && (
            <div className="absolute bottom-3 left-3 right-3 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs text-blue-700 dark:text-blue-300">
              <span className="font-medium">AI 建议:</span> 按 Tab 接受 &quot;{suggestion}&quot;
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default CodeEditor;
