import { useEffect, useState } from 'react';
import type { Tutorial } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { Button } from '../common/Button';

/**
 * 项目完成组件
 * 显示项目总结和成就
 */

interface ProjectCompletionProps {
  tutorial: Tutorial;
  completedSteps: string[];
  onComplete: () => void;
  onReview?: () => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export function ProjectCompletion({
  tutorial,
  completedSteps,
  onComplete,
  onReview,
}: ProjectCompletionProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // 成就列表
  const achievements: Achievement[] = [
    {
      id: 'first-step',
      title: '初出茅庐',
      description: '完成第一个步骤',
      icon: '🌱',
      unlocked: completedSteps.length >= 1,
    },
    {
      id: 'halfway',
      title: '渐入佳境',
      description: '完成一半步骤',
      icon: '🚀',
      unlocked: completedSteps.length >= tutorial.steps.length / 2,
    },
    {
      id: 'all-steps',
      title: '完美执行',
      description: '完成所有步骤',
      icon: '⭐',
      unlocked: completedSteps.length === tutorial.steps.length,
    },
    {
      id: 'tab-master',
      title: 'Tab 大师',
      description: '熟练使用 Tab 补全',
      icon: '⌨️',
      unlocked: completedSteps.length >= 3,
    },
    {
      id: 'ctrl-k-expert',
      title: '编辑专家',
      description: '使用 Ctrl+K 完成代码生成',
      icon: '🎨',
      unlocked: completedSteps.length >= 5,
    },
    {
      id: 'project-builder',
      title: '项目构建者',
      description: '完成整个项目',
      icon: '🏆',
      unlocked: completedSteps.length === tutorial.steps.length,
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;

  useEffect(() => {
    // 进度动画
    const targetProgress = Math.round((completedSteps.length / tutorial.steps.length) * 100);
    const timer = setInterval(() => {
      setAnimatedProgress(prev => {
        if (prev >= targetProgress) {
          clearInterval(timer);
          return targetProgress;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [completedSteps.length, tutorial.steps.length]);

  return (
    <div className="space-y-8">
      {/* 庆祝头部 */}
      <div className="text-center">
        <div className="inline-block p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          恭喜完成项目！
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          你已经成功完成了 "{tutorial.title}" 项目
        </p>
      </div>

      {/* 进度统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-5xl font-bold text-[#C41E3A] mb-2">
              {animatedProgress}%
            </div>
            <p className="text-gray-600 dark:text-gray-400">项目完成度</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-5xl font-bold text-green-500 mb-2">
              {completedSteps.length}
            </div>
            <p className="text-gray-600 dark:text-gray-400">完成步骤</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-5xl font-bold text-yellow-500 mb-2">
              {unlockedCount}/{totalAchievements}
            </div>
            <p className="text-gray-600 dark:text-gray-400">获得成就</p>
          </CardContent>
        </Card>
      </div>

      {/* 成就展示 */}
      <Card>
        <CardHeader>
          <CardTitle>获得成就</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className={`font-semibold ${
                  achievement.unlocked
                    ? 'text-yellow-800 dark:text-yellow-300'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {achievement.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <span className="inline-flex items-center gap-1 mt-2 text-xs text-green-600 dark:text-green-400">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    已解锁
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 项目回顾 */}
      <Card>
        <CardHeader>
          <CardTitle>项目回顾</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                你学到的技能
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  使用 Tab 进行代码补全
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  使用 Ctrl+K 进行内联编辑
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  使用 Ctrl+L 询问问题
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  构建完整的 React 应用
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                下一步建议
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• 尝试添加更多功能，如编辑待办、拖拽排序</li>
                <li>• 学习使用 @ 符号引用文件和代码</li>
                <li>• 探索 Cursor 的其他高级功能</li>
                <li>• 开始你自己的项目！</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={onReview}
          className="flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          回顾项目
        </Button>
        <Button
          onClick={onComplete}
          className="flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          标记项目完成
        </Button>
      </div>
    </div>
  );
}

export default ProjectCompletion;
