import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface WorkflowNode {
  id: string;
  command: string;
  title: string;
  description: string;
  detailContent: string;
  exampleInput: string;
  exampleOutput: string;
  outputFiles: string[];
  order: number;
  icon: string;
}

interface WorkflowDiagramProps {
  nodes: WorkflowNode[];
  onNodeClick?: (nodeId: string) => void;
}

export function WorkflowDiagram({ nodes, onNodeClick }: WorkflowDiagramProps) {
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);

  const sortedNodes = [...nodes].sort((a, b) => a.order - b.order);

  const handleNodeClick = (nodeId: string) => {
    setExpandedNodeId(expandedNodeId === nodeId ? null : nodeId);
    onNodeClick?.(nodeId);
  };

  const expandedNode = sortedNodes.find(node => node.id === expandedNodeId);

  return (
    <div className="w-full">
      {/* Workflow Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-2 relative">
        {sortedNodes.map((node, index) => (
          <div key={node.id} className="relative flex flex-col items-center">
            {/* Node Card */}
            <button
              onClick={() => handleNodeClick(node.id)}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left overflow-hidden ${
                expandedNodeId === node.id
                  ? 'border-[#C41E3A] bg-[#C41E3A]/5 dark:bg-[#C41E3A]/10'
                  : 'border-gray-300 dark:border-gray-600 hover:border-[#C41E3A]/50 bg-white dark:bg-gray-800'
              }`}
            >
              {/* Icon Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 text-sm font-bold text-white ${
                  expandedNodeId === node.id ? 'bg-[#C41E3A]' : 'bg-gray-400'
                }`}
              >
                {node.order}
              </div>

              {/* Command Name */}
              <div
                className="font-mono text-xs font-semibold mb-2 text-gray-800 dark:text-gray-200 truncate"
                title={node.command}
              >
                {node.command}
              </div>

              {/* Short Description */}
              <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                {node.description}
              </div>
            </button>

            {/* Arrow Connector (Desktop: Right, Mobile: Down) */}
            {index < sortedNodes.length - 1 && (
              <>
                {/* Desktop Arrow (Right) */}
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 translate-x-full">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="text-gray-400">
                    <path
                      d="M6 4 L10 8 L6 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Mobile Arrow (Down) */}
                <div className="md:hidden mt-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="text-gray-400">
                    <path
                      d="M4 6 L8 10 L12 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {expandedNode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 overflow-hidden"
          >
            <div className="bg-white dark:bg-gray-800 border-2 border-[#C41E3A] rounded-lg p-6">
              {/* Detail Content */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  {expandedNode.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {expandedNode.detailContent}
                </p>
              </div>

              {/* Example Input */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  示例输入
                </h4>
                <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-3 text-sm font-mono overflow-x-auto">
                  {expandedNode.exampleInput}
                </pre>
              </div>

              {/* Example Output */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  示例输出
                </h4>
                <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                  {expandedNode.exampleOutput}
                </pre>
              </div>

              {/* Output Files */}
              {expandedNode.outputFiles.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    生成文件
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {expandedNode.outputFiles.map((file, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
