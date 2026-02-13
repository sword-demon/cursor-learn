import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { PageSEO } from '../../components/common/PageSEO';

const configCards = [
  {
    id: 'config-ignore',
    title: '忽略文件配置',
    description: '学习 .cursorignore 语法, 保护敏感信息不被 AI 读取',
    path: '/config/ignore',
    icon: 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21',
    color: 'bg-red-500',
  },
  {
    id: 'config-shortcuts',
    title: '键盘快捷键速查',
    description: '按分类查看快捷键, 支持 Windows/macOS 平台切换',
    path: '/config/shortcuts',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707',
    color: 'bg-blue-500',
  },
  {
    id: 'config-extensions',
    title: '扩展管理',
    description: '了解 Cursor 扩展安装、管理和 VS Code 兼容性',
    path: '/config/extensions',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    color: 'bg-purple-500',
  },
  {
    id: 'config-themes',
    title: '主题与外观',
    description: '更改 Cursor 主题, 安装第三方主题',
    path: '/config/themes',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    color: 'bg-pink-500',
  },
  {
    id: 'config-shell',
    title: 'Shell 命令集成',
    description: '配置终端 Shell 集成, 提升命令行体验',
    path: '/config/shell',
    icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    color: 'bg-green-500',
  },
  {
    id: 'config-worktrees',
    title: '并行 Agent (Worktrees)',
    description: '使用 Git Worktrees 让多个 Agent 并行工作',
    path: '/config/worktrees',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    color: 'bg-orange-500',
  },
];

export function ConfigPage() {
  const { getTutorialProgress } = useProgress();

  const getTutorialCompletion = (tutorialId: string) => {
    const tutorialProgress = getTutorialProgress(tutorialId);
    const tutorial = getTutorialById(tutorialId);
    if (!tutorialProgress || !tutorial) return 0;
    return Math.round(
      (tutorialProgress.completedStepIds.length / tutorial.steps.length) * 100
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="配置教程"
        description="掌握 Cursor IDE 的忽略文件、快捷键、主题、扩展等配置技巧。"
        path="/config"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cursor 配置教程
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            掌握 Cursor 的各项配置, 打造个性化的开发环境
          </p>
        </div>

        {/* 教程卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configCards.map((card) => {
            const completion = getTutorialCompletion(card.id);
            const isCompleted = completion === 100;

            return (
              <Card key={card.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {card.description}
                      </p>
                      <ProgressBar percentage={completion} size="sm" showLabel={false} />
                      <div className="mt-3">
                        <Link to={card.path}>
                          <Button variant={isCompleted ? 'outline' : 'primary'} size="sm">
                            {isCompleted ? '复习' : completion > 0 ? '继续学习' : '开始学习'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}