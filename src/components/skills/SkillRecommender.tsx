import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SkillRecommendation, SkillCard } from '../../types';

interface SkillRecommenderProps {
  recommendations: SkillRecommendation[];
  skillCards: SkillCard[];
  onSkillClick?: (skillId: string) => void;
}

interface AggregatedSkill {
  skill: SkillCard;
  reasons: string[];
  count: number;
}

export function SkillRecommender({
  recommendations,
  skillCards,
  onSkillClick,
}: SkillRecommenderProps) {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);

  const toggleScenario = (scenarioId: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(scenarioId)
        ? prev.filter((id) => id !== scenarioId)
        : [...prev, scenarioId]
    );
  };

  const aggregatedSkills = useMemo<AggregatedSkill[]>(() => {
    if (selectedScenarios.length === 0) return [];

    const skillMap = new Map<string, { reasons: string[]; count: number }>();

    selectedScenarios.forEach((scenarioId) => {
      const recommendation = recommendations.find((r) => r.id === scenarioId);
      if (!recommendation) return;

      recommendation.recommendedSkills.forEach(({ skillId, reason }) => {
        const existing = skillMap.get(skillId);
        if (existing) {
          existing.reasons.push(reason);
          existing.count += 1;
        } else {
          skillMap.set(skillId, { reasons: [reason], count: 1 });
        }
      });
    });

    return Array.from(skillMap.entries())
      .map(([skillId, { reasons, count }]) => {
        const skill = skillCards.find((s) => s.id === skillId);
        if (!skill) return null;
        return { skill, reasons, count };
      })
      .filter((item): item is AggregatedSkill => item !== null)
      .sort((a, b) => b.count - a.count);
  }, [selectedScenarios, recommendations, skillCards]);

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          找到适合你的 Skill
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          选择你的开发场景, 获取个性化的 Skill 推荐
        </p>
      </div>

      {/* Scenario Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec) => {
          const isSelected = selectedScenarios.includes(rec.id);
          return (
            <motion.button
              key={rec.id}
              onClick={() => toggleScenario(rec.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-6 rounded-xl border-2 transition-all text-left
                ${
                  isSelected
                    ? 'border-[#C41E3A] bg-[#C41E3A]/5 dark:bg-[#C41E3A]/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0">{rec.scenarioIcon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {rec.scenario}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {rec.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Recommended Skills List */}
      <AnimatePresence mode="wait">
        {selectedScenarios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              推荐的 Skills ({aggregatedSkills.length})
            </h3>

            {aggregatedSkills.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                暂无推荐的 Skills
              </p>
            ) : (
              <div className="space-y-4">
                {aggregatedSkills.map(({ skill, reasons, count }) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => onSkillClick?.(skill.id)}
                    className="
                      relative pl-4 border-l-4 border-[#C41E3A]
                      hover:bg-gray-50 dark:hover:bg-gray-700/30
                      rounded-r-lg p-4 transition-colors cursor-pointer
                    "
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {skill.displayName}
                          </h4>
                          {count > 1 && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-[#FFD700] text-gray-900 rounded-full">
                              强烈推荐
                            </span>
                          )}
                          {skill.isOfficial && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                              官方
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {skill.description}
                        </p>

                        <div className="space-y-1">
                          {reasons.map((reason, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                            >
                              <span className="text-[#C41E3A] mt-0.5">•</span>
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>

                        {skill.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {skill.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
