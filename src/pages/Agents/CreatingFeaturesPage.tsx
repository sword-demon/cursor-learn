import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { AgentExampleDialog } from '../../components/agents/AgentExampleDialog';
import { LessonNavigation } from '../../components/agents/LessonNavigation';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { agentFeaturesTutorial } from '../../data/tutorials/agent-features';
import { getExamplesByTutorialId } from '../../data/agents/agent-examples';
import { getTipsByTutorialId } from '../../data/agents/beginner-tips';

export function CreatingFeaturesPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial = getTutorialById('agent-features') ?? agentFeaturesTutorial;
  const tutorialProgress = getTutorialProgress('agent-features');
  const [activeStep, setActiveStep] = useState(0);

  const examples = getExamplesByTutorialId('agent-features');
  const tips = getTipsByTutorialId('agent-features');

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('agent-features');
    }
  }, [tutorialProgress, startTutorial]);

  const steps = tutorial.steps;
  const currentProgress = steps.length
    ? Math.round(
        ((tutorialProgress?.completedStepIds.length ?? 0) / steps.length) * 100
      )
    : 0;

  const isStepCompleted = (stepId: string) =>
    tutorialProgress?.completedStepIds.includes(stepId) ?? false;

  const handleCompleteStep = (stepId: string) => {
    completeStep('agent-features', stepId);
  };

  const handleNext = () => {
    const currentStepId = steps[activeStep]?.id;
    if (currentStepId && !isStepCompleted(currentStepId)) {
      handleCompleteStep(currentStepId);
    }
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleFinish = () => {
    const lastStepId = steps[steps.length - 1]?.id;
    if (lastStepId) handleCompleteStep(lastStepId);
    completeTutorial('agent-features');
  };

  const vagueExamples = examples.filter((e) => e.type === 'vague');
  const constrainedExamples = examples.filter((e) => e.type === 'constrained');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/agents" className="hover:text-[#C41E3A]">
            Agent 教程
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">快速构建功能</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-sm font-bold">
              3
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              快速构建功能
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            学习如何利用 Agent 拆分需求、编写规格、迭代开发, 高效构建新功能
          </p>
        </div>

        {/* 进度条 */}
        <div className="mb-8">
          <ProgressBar percentage={currentProgress} />
        </div>

        {/* 步骤导航 */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                index === activeStep
                  ? 'bg-[#C41E3A] text-white'
                  : isStepCompleted(step.id)
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {isStepCompleted(step.id) && index !== activeStep ? '✓ ' : ''}
              {step.title}
            </button>
          ))}
        </div>

        {/* 步骤内容 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Step 1: 功能开发流程 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  用 Agent 构建功能的完整流程
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  开发一个新功能不是一步到位的事。和 Agent 协作时, 遵循清晰的流程能大幅提升效率。
                </p>

                <div className="space-y-3">
                  {[
                    { num: 1, title: '需求描述', desc: '告诉 Agent 你要做什么, 包括功能目标和约束条件', color: 'bg-blue-500' },
                    { num: 2, title: '规格编写', desc: '让 Agent 帮你定义数据模型、接口和文件结构', color: 'bg-purple-500' },
                    { num: 3, title: '分步实现', desc: '按模块逐步实现, 每步检查结果', color: 'bg-green-500' },
                    { num: 4, title: '验证测试', desc: '确认功能正常工作, 处理边界情况', color: 'bg-orange-500' },
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${item.color} text-white text-xs font-bold flex-shrink-0`}>
                        {item.num}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: 拆分需求 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  如何将大功能拆分为小任务
                </h2>

                {tips[0] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[0].title}>
                      {tips[0].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  大功能直接丢给 Agent 往往效果不好。学会拆分是关键技能。
                </p>

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  三层拆分法
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">层级</th>
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">内容</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">示例</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { layer: '数据层', content: '类型定义、数据模型', example: 'CartItem 接口、CartState 类型' },
                        { layer: '逻辑层', content: '核心业务逻辑', example: 'addItem、removeItem、getTotal' },
                        { layer: '展示层', content: 'UI 组件和交互', example: 'CartIcon、CartDrawer、CartPage' },
                      ].map((row) => (
                        <tr key={row.layer} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4 font-medium">{row.layer}</td>
                          <td className="py-2 pr-4">{row.content}</td>
                          <td className="py-2">{row.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">拆分原则</h3>
                  <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                    <li>- 每个任务只做一件事</li>
                    <li>- 每个任务完成后都是可工作的状态</li>
                    <li>- 后面的任务依赖前面的结果</li>
                    <li>- 每步完成后检查, 发现问题及时纠正</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: Prompt 示例对比 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  构建功能的 Prompt 对比
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  展开下方的示例对话, 对比模糊请求和精确请求的效果差异。
                </p>

                <div className="space-y-3 mb-6">
                  {vagueExamples[0] && (
                    <AgentExampleDialog
                      example={vagueExamples[0]}
                      label="模糊: 'Add a shopping cart to the app'"
                    />
                  )}
                  {constrainedExamples[0] && (
                    <AgentExampleDialog
                      example={constrainedExamples[0]}
                      label="精确: 分阶段计划 + 具体文件路径"
                    />
                  )}
                </div>

                <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                    精确 Prompt 的关键要素
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>- 明确的分步计划 (Phase 1, 2, 3)</li>
                    <li>- 具体的文件路径和类型定义</li>
                    <li>- 参考现有代码模式</li>
                    <li>- 每步完成后暂停等待确认</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 4: 迭代开发策略 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  小步快跑: 迭代开发策略
                </h2>

                {tips[1] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[1].title}>
                      {tips[1].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">阶段</th>
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">做什么</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">检查什么</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { phase: '第 1 轮', action: '数据模型 + 类型定义', check: '类型是否完整, 字段是否合理' },
                        { phase: '第 2 轮', action: '核心逻辑 + 单元测试', check: '逻辑是否正确, 测试是否通过' },
                        { phase: '第 3 轮', action: 'UI 组件 + 交互', check: '界面是否正常, 交互是否流畅' },
                        { phase: '第 4 轮', action: '边界情况 + 优化', check: '异常处理, 性能, 用户体验' },
                      ].map((row) => (
                        <tr key={row.phase} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4 font-medium">{row.phase}</td>
                          <td className="py-2 pr-4">{row.action}</td>
                          <td className="py-2">{row.check}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {tips[2] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[2].title}>
                      {tips[2].content}
                    </BeginnerTipCard>
                  </div>
                )}

                {constrainedExamples[1] && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      TDD 示例: 先写测试再写实现
                    </h3>
                    <AgentExampleDialog
                      example={constrainedExamples[1]}
                      label="TDD: 密码强度验证器"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 5: 测验 */}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对 Agent 构建功能策略的掌握。
                </p>
                {tutorial.steps[4]?.quiz && (
                  <QuizCard
                    quiz={tutorial.steps[4].quiz}
                    onComplete={(correct) => {
                      if (correct) handleCompleteStep('quiz');
                    }}
                  />
                )}
              </div>
            )}

            {/* Step 6: 完成 */}
            {activeStep === 5 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
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
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {tutorialProgress?.status === 'completed'
                    ? '教程已完成!'
                    : '恭喜完成!'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  你已经掌握了用 Agent 构建功能的核心策略。接下来学习如何让 Agent 帮你查找和修复 Bug。
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {tutorialProgress?.status !== 'completed' && (
                    <Button variant="primary" onClick={handleFinish}>
                      标记完成
                    </Button>
                  )}
                  <Link to="/agents">
                    <Button variant="outline">返回 Agent 教程</Button>
                  </Link>
                </div>

                <LessonNavigation
                  parentPath="/agents"
                  parentLabel="Agent 教程"
                  prev={{
                    title: '理解你的代码库',
                    path: '/agents/codebase',
                  }}
                  next={{
                    title: '查找并修复 Bug',
                    path: '/agents/bugs',
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* 底部导航 */}
        {activeStep < 5 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={activeStep === 0}
            >
              上一步
            </Button>
            <Button variant="primary" onClick={handleNext}>
              {activeStep === steps.length - 2 ? '完成' : '下一步'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
