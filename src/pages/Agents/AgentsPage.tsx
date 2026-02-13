import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { PageSEO } from '../../components/common/PageSEO';

const agentCards = [
  {
    id: 'agent-working',
    title: '使用 Agent',
    description: '理解 Agent harness 概念, 学会编写高效 prompt',
    path: '/agents/working',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    color: 'bg-blue-500',
    lessonNumber: 1,
  },
  {
    id: 'agent-codebase',
    title: '理解你的代码库',
    description: '了解 Agent 如何搜索和理解代码库',
    path: '/agents/codebase',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    color: 'bg-purple-500',
    lessonNumber: 2,
  },
  {
    id: 'agent-features',
    title: '快速构建功能',
    description: '利用 Agent 拆分需求、编写规格、迭代开发',
    path: '/agents/features',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    color: 'bg-green-500',
    lessonNumber: 3,
  },
  {
    id: 'agent-bugs',
    title: '查找并修复 Bug',
    description: '向 Agent 描述 Bug 并使用调试策略',
    path: '/agents/bugs',
    icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'bg-red-500',
    lessonNumber: 4,
  },
  {
    id: 'agent-review',
    title: '审查和测试代码',
    description: '让 Agent 审查代码质量和编写测试',
    path: '/agents/review',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    color: 'bg-orange-500',
    lessonNumber: 5,
  },
  {
    id: 'agent-customize',
    title: '自定义你的代理',
    description: '通过 Rules 和 MCP 打造专属 Agent',
    path: '/agents/customize',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    color: 'bg-pink-500',
    lessonNumber: 6,
  },
  {
    id: 'agent-together',
    title: '综合运用',
    description: '整合所有技巧, 完成综合练习',
    path: '/agents/together',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    color: 'bg-cyan-500',
    lessonNumber: 7,
  },
];

export function AgentsPage() {
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
        title="Agent 教程"
        description="学习使用 Cursor AI Agent 高效编写代码和管理项目。"
        path="/agents"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cursor Agent 教程
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            从零开始掌握 Cursor Agent, 按顺序学习效果最佳
          </p>
        </div>

        {/* 学习路径提示 */}
        <div className="mb-6 p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              建议按照课程编号顺序学习, 每课内容都建立在前一课的基础上。
            </p>
          </div>
        </div>

        {/* 教程卡片列表 - 线性学习路径 */}
        <div className="space-y-4">
          {agentCards.map((card) => {
            const completion = getTutorialCompletion(card.id);
            const isCompleted = completion === 100;

            return (
              <Card key={card.id} hover>
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    {/* 课程编号 */}
                    <div className={`w-10 h-10 ${card.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-sm">
                        {card.lessonNumber}
                      </span>
                    </div>

                    {/* 图标 */}
                    <div className={`w-10 h-10 ${card.color}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <svg className={`w-5 h-5 ${card.color.replace('bg-', 'text-')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                      </svg>
                    </div>

                    {/* 内容 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        第 {card.lessonNumber} 课: {card.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {card.description}
                      </p>
                    </div>

                    {/* 进度和按钮 */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="w-24 hidden sm:block">
                        <ProgressBar percentage={completion} size="sm" showLabel={false} />
                      </div>
                      <Link to={card.path}>
                        <Button variant={isCompleted ? 'outline' : 'primary'} size="sm">
                          {isCompleted ? '复习' : completion > 0 ? '继续' : '开始'}
                        </Button>
                      </Link>
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
