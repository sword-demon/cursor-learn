import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SkillCard, SkillCategory } from '../../types';

interface SkillCardGridProps {
  cards: SkillCard[];
  onCardClick?: (cardId: string) => void;
}

const categoryLabels: Record<SkillCategory, string> = {
  'creative-design': '创意与设计',
  development: '开发与技术',
  communication: '企业与沟通',
  document: '文档处理',
};

const categoryColors: Record<SkillCategory, string> = {
  'creative-design': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  development: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  communication: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  document: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

export function SkillCardGrid({ cards, onCardClick }: SkillCardGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const categories: SkillCategory[] = Array.from(
    new Set(cards.map((card) => card.category))
  );

  const filteredCards = selectedCategory === 'all'
    ? cards
    : cards.filter((card) => card.category === selectedCategory);

  const handleCardClick = (cardId: string) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
    onCardClick?.(cardId);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedCategory === 'all'
              ? 'bg-[#C41E3A] text-white shadow-md'
              : 'bg-white dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#C41E3A] dark:hover:border-[#C41E3A]'
          }`}
        >
          全部
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-[#C41E3A] text-white shadow-md'
                : 'bg-white dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#C41E3A] dark:hover:border-[#C41E3A]'
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredCards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              <div
                onClick={() => handleCardClick(card.id)}
                className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-200 dark:hover:border-gray-600/50"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {card.displayName}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${categoryColors[card.category]}`}>
                      {categoryLabels[card.category]}
                    </span>
                  </div>
                  {card.isOfficial && (
                    <span className="ml-2 px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-xs font-medium rounded-md">
                      官方
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                  {card.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expand Indicator */}
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center justify-center text-xs text-gray-400 dark:text-gray-500">
                    {expandedCardId === card.id ? '点击收起详情' : '点击查看详情'}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedCardId === card.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5 space-y-4">
                      {/* Use Cases */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          使用场景
                        </h4>
                        <ul className="space-y-1.5">
                          {card.useCases.map((useCase, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                            >
                              <span className="text-[#C41E3A] mr-2">•</span>
                              <span>{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Example Command */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          示例命令
                        </h4>
                        <pre className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 text-xs text-gray-800 dark:text-gray-200 overflow-x-auto">
                          {card.exampleCommand}
                        </pre>
                      </div>

                      {/* Example Output */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          示例输出
                        </h4>
                        <pre className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 text-xs text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap">
                          {card.exampleOutput}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
