import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { useProgress } from '../../contexts/ProgressContext';
import { getAllTutorials, getTutorialSummaries } from '../../services/tutorial-service';

export function HomePage() {
  const { progress, getTutorialProgress } = useProgress();
  const tutorials = getAllTutorials();
  const summaries = getTutorialSummaries();

  const getTutorialCompletion = (tutorialId: string) => {
    const tutorialProgress = getTutorialProgress(tutorialId);
    if (!tutorialProgress) return 0;
    const tutorial = tutorials.find((t) => t.id === tutorialId);
    if (!tutorial) return 0;
    return Math.round(
      (tutorialProgress.completedStepIds.length / tutorial.steps.length) * 100
    );
  };

  const categoryCards = [
    {
      id: 'installation',
      title: '安装指南',
      description: '下载、安装并配置 Cursor IDE',
      icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
      path: '/installation',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'commands',
      title: '命令教程',
      description: '学习 Tab、Ctrl+K、Ctrl+L 等核心命令',
      icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      path: '/commands',
      color: 'from-[#C41E3A] to-[#A01830]',
    },
    {
      id: 'rules',
      title: '规则生成器',
      description: '创建个性化的 .cursorrules 配置文件',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      path: '/rules',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'project',
      title: '项目实战',
      description: '通过实际项目练习所学内容',
      icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
      path: '/project',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      id: 'config',
      title: '配置教程',
      description: '掌握 Cursor 的忽略文件、快捷键、主题等配置',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      path: '/config',
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 'agents',
      title: 'Agent 教程',
      description: '学习使用 AI Agent 高效编写代码和管理项目',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      path: '/agents',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#C41E3A] via-[#B01A33] to-[#7A1025] text-white pt-28 pb-20">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white/90 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
              交互式学习平台
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.1]">
              掌握 Cursor IDE
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              通过交互式教程快速学习 Cursor 的核心功能, 提升你的编码效率
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/installation">
                <Button size="lg" variant="secondary">
                  开始学习
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link to="/commands">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-[#C41E3A]">
                  浏览教程
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      {progress && progress.stats.totalTutorialsCompleted > 0 && (
        <section className="py-10 bg-white dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#C41E3A] tracking-tight">{progress.stats.totalTutorialsCompleted}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">已完成教程</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#C41E3A] tracking-tight">{progress.stats.totalStepsCompleted}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">已完成步骤</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#C41E3A] tracking-tight">{progress.stats.totalTimeSpent}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">学习时长(分钟)</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#FFD700] tracking-tight">
                  {Math.round((progress.stats.totalTutorialsCompleted / 4) * 100)}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">总体进度</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Learning Paths */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              学习路径
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">选择你感兴趣的方向, 开始学习之旅</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCards.map((card) => {
              const completion = getTutorialCompletion(card.id);
              return (
                <Link key={card.id} to={card.path}>
                  <Card hover className="h-full group">
                    <CardContent className="p-6">
                      <div className={`w-11 h-11 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md transition-shadow duration-200`}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                        {card.description}
                      </p>
                      {completion > 0 && (
                        <ProgressBar percentage={completion} size="sm" showLabel={false} />
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tutorial List */}
      <section className="py-16 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">
            所有教程
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {summaries.map((tutorial) => {
              const completion = getTutorialCompletion(tutorial.id);
              const isCompleted = completion === 100;

              return (
                <Card key={tutorial.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 tracking-tight">
                          {tutorial.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {tutorial.description}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          tutorial.difficulty === 'beginner'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : tutorial.difficulty === 'intermediate'
                            ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                            : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                      >
                        {tutorial.difficulty === 'beginner'
                          ? '入门'
                          : tutorial.difficulty === 'intermediate'
                          ? '进阶'
                          : '高级'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>预计时间: {tutorial.estimatedTime} 分钟</span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-emerald-500 font-medium">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          已完成
                        </span>
                      )}
                    </div>

                    <ProgressBar percentage={completion} size="sm" />

                    <div className="mt-4">
                      <Link to={`/commands/${tutorial.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          {completion > 0 ? '继续学习' : '开始学习'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-2 text-gray-300">Cursor Tutorial - 快速入门指南</p>
            <p className="text-sm text-gray-500">使用 React + TypeScript + Tailwind CSS 构建</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
