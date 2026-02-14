import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { PageSEO } from '../../components/common/PageSEO';

const specKitCards = [
  {
    id: 'speckit-install',
    title: '概念入门与安装',
    description: '理解 Spec-Driven Development 理念, 安装并初始化 spec-kit',
    path: '/spec-kit/install',
    icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
    color: 'bg-blue-500',
  },
  {
    id: 'speckit-workflow',
    title: '核心工作流',
    description: '学习 specify → clarify → plan → tasks → implement 完整流程',
    path: '/spec-kit/workflow',
    icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7',
    color: 'bg-[#C41E3A]',
  },
  {
    id: 'speckit-case',
    title: '实战案例演练',
    description: '通过任务管理应用案例, 逐步体验 spec-kit 全流程',
    path: '/spec-kit/case',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    color: 'bg-emerald-500',
  },
  {
    id: 'speckit-advanced',
    title: '辅助命令与进阶',
    description: '了解 analyze、checklist、taskstoissues 等辅助命令',
    path: '/spec-kit/advanced',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: 'bg-purple-500',
  },
];

export function SpecKitPage() {
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
        title="Spec-Kit 教程"
        description="学习 Spec-Driven Development, 用规格驱动 AI 编码。包含概念入门、安装指南、核心工作流、实战案例和进阶技巧。"
        path="/spec-kit"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Spec-Kit 教程
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            学习 Spec-Driven Development, 用规格驱动 AI 编码, 告别 vibe coding
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specKitCards.map((card) => {
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