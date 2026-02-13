import React, { useState, useCallback, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useKeyboardShortcuts, type ShortcutType } from '../../hooks/useKeyboardShortcuts';

interface ProjectEditorProps {
  initialCode: string;
  language: string;
  onCodeChange?: (code: string) => void;
  onTriggerAction?: (action: { type: ShortcutType; value: string }) => void;
  readOnly?: boolean;
  height?: string;
  projectContext?: {
    fileName: string;
    files?: string[];
  };
}

/**
 * 项目编辑器组件
 * 增强版代码编辑器，支持项目上下文和文件切换
 */
export function ProjectEditor({
  initialCode,
  language,
  onCodeChange,
  onTriggerAction,
  readOnly = false,
  height = '400px',
  projectContext,
}: ProjectEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [activeFile, setActiveFile] = useState(projectContext?.fileName || 'App.tsx');
  const [openFiles, setOpenFiles] = useState<string[]>([projectContext?.fileName || 'App.tsx']);
  const [showSidebar, setShowSidebar] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // 项目文件结构
  const projectFiles = projectContext?.files || [
    'src/App.tsx',
    'src/components/TodoList.tsx',
    'src/components/TodoItem.tsx',
    'src/components/TodoInput.tsx',
    'src/types/todo.ts',
    'src/hooks/useLocalStorage.ts',
    'package.json',
    'tailwind.config.js',
  ];

  // 监听代码变化
  useEffect(() => {
    onCodeChange?.(code);
  }, [code, onCodeChange]);

  // 处理代码变化
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  }, []);

  // 处理光标位置
  const handleSelect = useCallback((e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const lines = target.value.substring(0, target.selectionStart).split('\n');
    setCursorPosition({
      line: lines.length,
      col: lines[lines.length - 1].length + 1,
    });
  }, []);

  // 处理 Tab 键
  const handleTab = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || readOnly) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const indent = '  ';
    const newCode = code.substring(0, start) + indent + code.substring(end);
    setCode(newCode);

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + indent.length;
    }, 0);

    onTriggerAction?.({ type: 'tab', value: 'Tab' });
  }, [code, readOnly, onTriggerAction]);

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

  // 打开文件
  const openFile = (fileName: string) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles([...openFiles, fileName]);
    }
    setActiveFile(fileName);
  };

  // 关闭文件
  const closeFile = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter(f => f !== fileName);
    setOpenFiles(newOpenFiles);

    if (activeFile === fileName && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[newOpenFiles.length - 1]);
    }
  };

  // 计算行号
  const lineNumbers = code.split('\n').map((_, i) => i + 1);

  // 语法高亮（简化版）
  const highlightCode = (text: string) => {
    const keywords = ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'interface', 'type'];
    const strings = text.match(/"[^"]*"|'[^']*'/g) || [];

    let highlighted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

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

    // 高亮 JSX 标签
    highlighted = highlighted.replace(
      /(&lt;\/?)([\w]+)/g,
      '$1<span class="text-blue-600 dark:text-blue-400">$2</span>'
    );

    return highlighted;
  };

  // 获取文件图标
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) {
      return (
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    }
    if (fileName.endsWith('.css') || fileName.endsWith('.scss')) {
      return (
        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      );
    }
    if (fileName.endsWith('.json')) {
      return (
        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  };

  return (
    <Card className="overflow-hidden" padding="none">
      {/* 编辑器头部 - 工具栏 */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
            className="ml-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{activeFile}</span>
          <span>|</span>
          <span>{code.split('\n').length} 行</span>
          <span>{cursorPosition.line}:{cursorPosition.col}</span>
        </div>
      </div>

      {/* 打开的文件标签 */}
      <div className="flex items-center bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {openFiles.map((file) => (
          <div
            key={file}
            onClick={() => setActiveFile(file)}
            className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer border-r border-gray-200 dark:border-gray-700 whitespace-nowrap ${
              activeFile === file
                ? 'bg-white dark:bg-gray-800 text-[#C41E3A]'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {getFileIcon(file)}
            <span>{file.split('/').pop()}</span>
            <button
              onClick={(e) => closeFile(file, e)}
              className="ml-1 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* 编辑器主体 */}
      <div className="flex" style={{ height }}>
        {/* 侧边栏 - 文件树 */}
        {showSidebar && (
          <div className="flex-none w-48 bg-gray-50 dark:bg-gray-900/30 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-2">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1">
                项目文件
              </p>
              {projectFiles.map((file) => (
                <button
                  key={file}
                  onClick={() => openFile(file)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    activeFile === file
                      ? 'bg-gray-200 dark:bg-gray-800 text-[#C41E3A]'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {getFileIcon(file)}
                  <span className="truncate">{file}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 代码区域 */}
        <div className="flex-1 flex flex-col">
          {/* 行号和代码 */}
          <div className="flex flex-1 overflow-hidden">
            {/* 行号 */}
            <div className="flex-none w-12 py-3 text-right bg-gray-50 dark:bg-gray-900/50 text-gray-400 select-none">
              {lineNumbers.map((num) => (
                <div key={num} className="px-2 leading-6 text-xs">
                  {num}
                </div>
              ))}
            </div>

            {/* 代码编辑区 */}
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
                className="absolute inset-0 w-full h-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 leading-6 font-mono text-sm pointer-events-none overflow-auto"
                dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
              />
            </div>
          </div>

          {/* 底部状态栏 */}
          <div className="flex items-center justify-between px-3 py-1 bg-[#C41E3A] text-white text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {language.toUpperCase()}
              </span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Tab: 2 空格
              </span>
              <span>Ln {cursorPosition.line}, Col {cursorPosition.col}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProjectEditor;
