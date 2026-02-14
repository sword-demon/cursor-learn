import { Link } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';
import { getAllTutorials } from '../../services/tutorial-service';
import type { Tutorial } from '../../types';

interface SidebarProps {
  currentTutorialId?: string;
}

export function Sidebar({ currentTutorialId }: SidebarProps) {
  const { progress, getTutorialProgress } = useProgress();
  const tutorials = getAllTutorials();

  // Group tutorials by category
  const groupedTutorials = tutorials.reduce((acc, tutorial) => {
    if (!acc[tutorial.category]) {
      acc[tutorial.category] = [];
    }
    acc[tutorial.category].push(tutorial);
    return acc;
  }, {} as Record<string, Tutorial[]>);

  const categoryLabels: Record<string, string> = {
    installation: '安装指南',
    commands: '命令教程',
    rules: '规则配置',
    project: '项目实战',
    config: '配置教程',
    agents: 'Agent 教程',
    'spec-kit': 'Spec-Kit 教程',
  };

  const categoryIcons: Record<string, string> = {
    installation: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
    commands: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    rules: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    project: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
    config: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    agents: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    'spec-kit': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  };

  const getTutorialStatus = (tutorialId: string) => {
    const tutorialProgress = getTutorialProgress(tutorialId);
    if (!tutorialProgress) return 'not-started';
    return tutorialProgress.status;
  };

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          学习路径
        </h2>

        <nav className="space-y-6">
          {Object.entries(groupedTutorials).map(([category, categoryTutorials]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-2 px-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={categoryIcons[category]}
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {categoryLabels[category]}
                </span>
              </div>

              <ul className="space-y-1">
                {categoryTutorials.map((tutorial) => {
                  const status = getTutorialStatus(tutorial.id);
                  const isActive = currentTutorialId === tutorial.id;
                  const isCompleted = status === 'completed';
                  const isInProgress = status === 'in-progress';

                  // Determine route path based on category
                  let path = '/';
                  if (category === 'installation') path = '/installation';
                  else if (category === 'commands') path = `/commands/${tutorial.id}`;
                  else if (category === 'rules') path = '/rules';
                  else if (category === 'project') path = '/project';
                  else if (category === 'config') {
                    const subPath = tutorial.id.replace('config-', '');
                    path = `/config/${subPath}`;
                  } else if (category === 'agents') {
                    const subPath = tutorial.id.replace('agent-', '');
                    path = `/agents/${subPath}`;
                  } else if (category === 'spec-kit') {
                    const subPath = tutorial.id.replace('speckit-', '');
                    path = subPath === 'overview' ? '/spec-kit' : `/spec-kit/${subPath}`;
                  }

                  return (
                    <li key={tutorial.id}>
                      <Link
                        to={path}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-[#C41E3A]/10 text-[#C41E3A] font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {/* Status Icon */}
                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                          {isCompleted ? (
                            <svg
                              className="w-4 h-4 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : isInProgress ? (
                            <span className="w-2 h-2 rounded-full bg-[#C41E3A]" />
                          ) : (
                            <span className="w-2 h-2 rounded-full border border-gray-300 dark:border-gray-600" />
                          )}
                        </span>

                        <span className="truncate min-w-0">{tutorial.title}</span>

                        {/* Difficulty Badge */}
                        <span
                          className={`flex-shrink-0 ml-auto text-xs px-1.5 py-0.5 rounded whitespace-nowrap ${
                            tutorial.difficulty === 'beginner'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              : tutorial.difficulty === 'intermediate'
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          }`}
                        >
                          {tutorial.difficulty === 'beginner'
                            ? '入门'
                            : tutorial.difficulty === 'intermediate'
                              ? '进阶'
                              : '高级'}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Quick Stats */}
        {progress && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              学习统计
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">已完成教程</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {progress.stats.totalTutorialsCompleted}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">已完成步骤</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {progress.stats.totalStepsCompleted}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">学习时长</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {progress.stats.totalTimeSpent} 分钟
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
