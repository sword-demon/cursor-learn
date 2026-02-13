import { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

export function CodeBlock({
  code,
  language = 'typescript',
  title,
  showLineNumbers = true,
  maxHeight = '300px',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const lineCount = code.split('\n').length;
  const height = Math.min(lineCount * 20 + 16, parseInt(maxHeight));

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {title || language}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="复制代码"
        >
          {copied ? '已复制' : '复制'}
        </button>
      </div>

      {/* Monaco Editor */}
      <Editor
        height={`${height}px`}
        language={language}
        value={code}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: showLineNumbers ? 'on' : 'off',
          fontSize: 13,
          padding: { top: 8, bottom: 8 },
          renderLineHighlight: 'none',
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          scrollbar: { vertical: 'hidden', horizontal: 'auto' },
          folding: false,
          contextmenu: false,
          domReadOnly: true,
        }}
      />
    </div>
  );
}