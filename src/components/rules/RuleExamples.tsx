import { useState } from 'react';
import type { RuleExample } from '../../types';

interface RuleExamplesProps {
  examples: RuleExample[];
}

export function RuleExamples({ examples }: RuleExamplesProps) {
  const [selectedExample, setSelectedExample] = useState<RuleExample | null>(
    examples.length > 0 ? examples[0] : null
  );

  if (examples.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Example Selector */}
      {examples.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example.id}
              onClick={() => setSelectedExample(example)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedExample?.id === example.id
                  ? 'bg-[#C41E3A] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>
      )}

      {/* Selected Example */}
      {selectedExample && (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {selectedExample.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedExample.description}
            </p>
          </div>

          {/* Rule Content */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
              规则内容
            </h5>
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {selectedExample.ruleContent}
            </pre>
          </div>

          {/* Before/After Comparison */}
          {(selectedExample.beforeExample || selectedExample.afterExample) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedExample.beforeExample && (
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-4">
                  <h5 className="text-xs font-medium text-red-600 dark:text-red-400 uppercase mb-2">
                    应用前
                  </h5>
                  <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                    <code>{selectedExample.beforeExample}</code>
                  </pre>
                </div>
              )}
              {selectedExample.afterExample && (
                <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
                  <h5 className="text-xs font-medium text-green-600 dark:text-green-400 uppercase mb-2">
                    应用后
                  </h5>
                  <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                    <code>{selectedExample.afterExample}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
