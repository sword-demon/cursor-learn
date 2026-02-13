import { useState, useMemo, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { minimatch } from 'minimatch';

// 模拟项目文件树
const SAMPLE_FILE_TREE = [
  'src/index.ts',
  'src/App.tsx',
  'src/utils/helpers.ts',
  'src/components/Button.tsx',
  '.env',
  '.env.local',
  '.env.production',
  'node_modules/react/index.js',
  'node_modules/react/package.json',
  'dist/bundle.js',
  'dist/index.html',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  '.git/config',
  '.git/HEAD',
  'docs/README.md',
  'docs/api.md',
  'tests/app.test.ts',
  'tests/utils.test.ts',
  '.cursorignore',
  'credentials.json',
  'secrets/api-key.txt',
  'build/output.js',
  'coverage/lcov.info',
  'logs/error.log',
  'logs/access.log',
  'tmp/cache.json',
];

interface IgnorePatternEditorProps {
  /** 预设的忽略模式 (可选) */
  initialPatterns?: string;
  /** 模式变化回调 */
  onPatternsChange?: (patterns: string[]) => void;
  /** 编辑器高度 */
  height?: string;
  /** 是否只读 */
  readOnly?: boolean;
}

/** 解析编辑器内容为有效的忽略模式列表 */
function parsePatterns(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
}

/** 检查文件是否被任一模式匹配 */
function isFileIgnored(filePath: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    try {
      // 处理目录模式: pattern/ 匹配目录下所有文件
      if (pattern.endsWith('/')) {
        const dirPattern = pattern.slice(0, -1);
        return filePath.startsWith(dirPattern + '/') || filePath === dirPattern;
      }
      return minimatch(filePath, pattern, { dot: true });
    } catch {
      return false;
    }
  });
}

export function IgnorePatternEditor({
  initialPatterns = '# 在这里输入忽略模式, 每行一个\n# 例如:\n# .env\n# node_modules/\n# dist/\n',
  onPatternsChange,
  height = '200px',
  readOnly = false,
}: IgnorePatternEditorProps) {
  const [editorValue, setEditorValue] = useState(initialPatterns);

  const patterns = useMemo(() => parsePatterns(editorValue), [editorValue]);

  // 计算匹配结果
  const matchResults = useMemo(() => {
    return SAMPLE_FILE_TREE.map((file) => ({
      path: file,
      ignored: isFileIgnored(file, patterns),
    }));
  }, [patterns]);

  const ignoredCount = matchResults.filter((r) => r.ignored).length;

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      const newValue = value ?? '';
      setEditorValue(newValue);
      onPatternsChange?.(parsePatterns(newValue));
    },
    [onPatternsChange]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 编辑器区域 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            .cursorignore 编辑器
          </h4>
          <span className="text-xs text-gray-500">
            {patterns.length} 条有效规则
          </span>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <Editor
            height={height}
            language="gitignore"
            value={editorValue}
            theme="vs-dark"
            onChange={handleEditorChange}
            options={{
              readOnly,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              fontSize: 13,
              padding: { top: 8, bottom: 8 },
              renderLineHighlight: 'line',
              overviewRulerLanes: 0,
              scrollbar: { vertical: 'auto', horizontal: 'auto' },
              folding: false,
              wordWrap: 'on',
            }}
          />
        </div>
      </div>

      {/* 文件匹配预览 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            文件匹配预览
          </h4>
          <span className="text-xs text-gray-500">
            {ignoredCount}/{SAMPLE_FILE_TREE.length} 个文件被忽略
          </span>
        </div>
        <div
          className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-900 p-3 overflow-y-auto font-mono text-xs"
          style={{ height }}
        >
          {matchResults.map(({ path, ignored }) => (
            <div
              key={path}
              className={`py-0.5 flex items-center gap-2 ${
                ignored
                  ? 'text-red-400 line-through opacity-60'
                  : 'text-green-400'
              }`}
            >
              <span className="w-3 text-center">
                {ignored ? '✕' : '✓'}
              </span>
              <span>{path}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
