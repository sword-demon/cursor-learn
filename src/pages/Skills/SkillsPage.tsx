import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { PageSEO } from '../../components/common/PageSEO';

const skillsCards = [
  {
    id: 'skills-intro',
    title: 'Skill 概念入门',
    description: '理解 Skill 概念, 区分三种分类, 在模拟终端中体验 skill 调用',
    path: '/skills/intro',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: 'bg-[#C41E3A]',
  },
  {
    id: 'skills-install',
    title: 'Skill 安装与管理',
    description: '学习 skill 安装方式, 理解全局 vs 项目级安装, 掌握插件管理',
    path: '/skills/install',
    icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
    color: 'bg-blue-500',
  },
  {
    id: 'skills-official',
    title: '官方 Skill 介绍',
    description: '浏览官方可安装 skill 全景图, 获得个性化推荐',
    path: '/skills/official',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    color: 'bg-emerald-500',
  },
  {
    id: 'skills-frontend-design',
    title: 'frontend-design 深度体验',
    description: '通过 3 个案例对比, 直观感受 frontend-design skill 的价值',
    path: '/skills/frontend-design',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    color: 'bg-pink-500',
  },
  {
    id: 'skills-custom',
    title: '自定义 Skill 创建',
    description: '学习自定义 skill 的文件结构和创建流程',
    path: '/skills/custom',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    color: 'bg-purple-500',
  },
];

export function SkillsPage() {
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
        title="Skills 教程"
        description="学习 Claude Code Skill 系统, 掌握 skill 调用、安装、官方推荐和自定义创建。"
        path="/skills"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Skills 教程
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            学习 Claude Code Skill 系统, 用 skill 扩展 AI 编码能力
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsCards.map((card) => {
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
