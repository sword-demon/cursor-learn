import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBlock } from '../common/CodeBlock';
import type { SkillComparison } from '../../types';

interface ComparisonViewProps {
  comparison: SkillComparison;
}

type ViewMode = 'without' | 'with';

export function ComparisonView({ comparison }: ComparisonViewProps) {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState<ViewMode>('without');

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="space-y-6">
      {/* Title and Description */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {comparison.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {comparison.description}
        </p>
        <div className="inline-block px-4 py-1.5 bg-[#C41E3A]/10 dark:bg-[#C41E3A]/20 rounded-full">
          <span className="text-sm font-medium text-[#C41E3A] dark:text-[#FFD700]">
            Skill: {comparison.skillName}
          </span>
        </div>
      </div>

      {/* Comparison Panels */}
      {isWideScreen ? (
        <div className="grid grid-cols-2 gap-6">
          <ComparisonPanel
            title="Without Skill"
            prompt={comparison.withoutSkill.prompt}
            code={comparison.withoutSkill.code}
            screenshotUrl={comparison.withoutSkill.screenshotUrl}
            variant="without"
          />
          <ComparisonPanel
            title="With Skill"
            prompt={comparison.withSkill.prompt}
            code={comparison.withSkill.code}
            screenshotUrl={comparison.withSkill.screenshotUrl}
            variant="with"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Tab Buttons */}
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setActiveTab('without')}
              className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'without'
                  ? 'bg-[#C41E3A] text-white'
                  : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Without Skill
            </button>
            <button
              onClick={() => setActiveTab('with')}
              className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'with'
                  ? 'bg-[#C41E3A] text-white'
                  : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              With Skill
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'without' ? (
              <motion.div
                key="without"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <ComparisonPanel
                  title="Without Skill"
                  prompt={comparison.withoutSkill.prompt}
                  code={comparison.withoutSkill.code}
                  screenshotUrl={comparison.withoutSkill.screenshotUrl}
                  variant="without"
                />
              </motion.div>
            ) : (
              <motion.div
                key="with"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <ComparisonPanel
                  title="With Skill"
                  prompt={comparison.withSkill.prompt}
                  code={comparison.withSkill.code}
                  screenshotUrl={comparison.withSkill.screenshotUrl}
                  variant="with"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Highlights Section */}
      <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Key Differences
        </h3>
        <ul className="space-y-3">
          {comparison.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C41E3A]/10 dark:bg-[#C41E3A]/20 flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-[#C41E3A] dark:text-[#FFD700]">
                  {index + 1}
                </span>
              </span>
              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface ComparisonPanelProps {
  title: string;
  prompt: string;
  code: string;
  screenshotUrl: string;
  variant: 'without' | 'with';
}

function ComparisonPanel({
  title,
  prompt,
  code,
  screenshotUrl,
  variant,
}: ComparisonPanelProps) {
  const headerBgClass =
    variant === 'without'
      ? 'bg-gray-100 dark:bg-gray-700/50'
      : 'bg-green-50 dark:bg-green-900/20';

  const headerTextClass =
    variant === 'without'
      ? 'text-gray-700 dark:text-gray-300'
      : 'text-green-700 dark:text-green-300';

  return (
    <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className={`px-6 py-4 ${headerBgClass}`}>
        <h3 className={`text-lg font-semibold ${headerTextClass}`}>{title}</h3>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Prompt */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Prompt
          </h4>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {prompt}
            </p>
          </div>
        </div>

        {/* Code */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Generated Code
          </h4>
          <CodeBlock code={code} language="typescript" maxHeight="400px" />
        </div>

        {/* Screenshot */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Result
          </h4>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <img
              src={screenshotUrl}
              alt={`${title} result`}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
