import { useState } from 'react';
import { CopyButton } from './CopyButton';

interface RulePreviewProps {
  content: string;
  fileName?: string;
}

export function RulePreview({ content, fileName = '.cursorrules' }: RulePreviewProps) {
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  const lines = content.split('\n');

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{fileName}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className="text-xs text-gray-400 hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
          >
            {showLineNumbers ? '隐藏行号' : '显示行号'}
          </button>
          <CopyButton content={content} />
        </div>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-300 font-mono whitespace-pre">
          {showLineNumbers ? (
            <code>
              {lines.map((line, index) => (
                <div key={index} className="table-row">
                  <span className="table-cell text-gray-600 select-none pr-4 text-right w-10">
                    {index + 1}
                  </span>
                  <span className="table-cell">
                    {line || ' '}
                  </span>
                </div>
              ))}
            </code>
          ) : (
            <code>{content}</code>
          )}
        </pre>
      </div>
    </div>
  );
}
