import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AgentExample } from '../../types';

interface AgentExampleDialogProps {
  example: AgentExample;
  label?: string;
}

export function AgentExampleDialog({ example, label }: AgentExampleDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const typeLabel = example.type === 'vague' ? '模糊 Prompt' : '精确 Prompt';
  const typeBorder =
    example.type === 'vague'
      ? 'border-orange-300 dark:border-orange-700'
      : 'border-green-300 dark:border-green-700';
  const typeBg =
    example.type === 'vague'
      ? 'bg-orange-50 dark:bg-orange-900/10'
      : 'bg-green-50 dark:bg-green-900/10';
  const typeBadge =
    example.type === 'vague'
      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';

  return (
    <div className={`rounded-lg border ${typeBorder} overflow-hidden`}>
      {/* Header - 点击展开 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 ${typeBg} hover:opacity-90 transition-opacity`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeBadge}`}>
            {typeLabel}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label || '查看示例对话'}
          </span>
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* 对话内容 */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-4 bg-white dark:bg-gray-800 space-y-4">
              {/* 用户 Prompt */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">你</p>
                  <div className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 whitespace-pre-wrap">
                    {example.prompt}
                  </div>
                </div>
              </div>

              {/* Agent 响应 */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C41E3A]/10 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#C41E3A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Agent</p>
                  <div className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 whitespace-pre-wrap">
                    {example.response}
                  </div>
                </div>
              </div>

              {/* 文件引用 */}
              {example.fileRefs && example.fileRefs.length > 0 && (
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">引用的文件:</p>
                  <div className="flex flex-wrap gap-1">
                    {example.fileRefs.map((ref) => (
                      <code
                        key={ref}
                        className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      >
                        {ref}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
