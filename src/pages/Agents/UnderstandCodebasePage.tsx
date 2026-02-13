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
import { agentCodebaseTutorial } from '../../data/tutorials/agent-codebase';
import { getExamplesByTutorialId } from '../../data/agents/agent-examples';
import { getTipsByTutorialId } from '../../data/agents/beginner-tips';

export function UnderstandCodebasePage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial = getTutorialById('agent-codebase') ?? agentCodebaseTutorial;
  const tutorialProgress = getTutorialProgress('agent-codebase');
  const [activeStep, setActiveStep] = useState(0);

  const examples = getExamplesByTutorialId('agent-codebase');
  const tips = getTipsByTutorialId('agent-codebase');

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('agent-codebase');
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
    completeStep('agent-codebase', stepId);
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
    completeTutorial('agent-codebase');
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
          <span className="text-gray-900 dark:text-white">理解你的代码库</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold">
              2
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              理解你的代码库
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            了解 Agent 如何搜索和理解代码库, 学会帮助 Agent 更高效地导航项目
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
            {/* Step 1: Agent 如何读懂代码 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Agent 如何读懂你的代码?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  当你让 Agent 处理代码任务时, 它不是一次性读取整个项目。Agent
                  使用一套工具来搜索和理解代码:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">
                          工具
                        </th>
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">
                          作用
                        </th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">
                          类比
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        {
                          tool: '文件搜索',
                          action: '按文件名查找',
                          analogy: '在文件夹里找文件',
                        },
                        {
                          tool: '代码搜索',
                          action: '按内容搜索代码',
                          analogy: '在书里搜关键词',
                        },
                        {
                          tool: '语义搜索',
                          action: '按含义理解代码',
                          analogy: '理解一段话的意思',
                        },
                        {
                          tool: '目录浏览',
                          action: '查看项目结构',
                          analogy: '看书的目录',
                        },
                      ].map((row) => (
                        <tr
                          key={row.tool}
                          className="border-b border-gray-100 dark:border-gray-800"
                        >
                          <td className="py-2 pr-4 font-medium">{row.tool}</td>
                          <td className="py-2 pr-4">{row.action}</td>
                          <td className="py-2">{row.analogy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Agent 的搜索流程
                  </h3>
                  <div className="space-y-2">
                    {[
                      { num: 1, text: '接收任务 - 分析你的 prompt, 理解需要做什么' },
                      { num: 2, text: '定位文件 - 根据任务内容搜索相关文件' },
                      { num: 3, text: '阅读代码 - 读取找到的文件, 理解代码逻辑' },
                      {
                        num: 4,
                        text: '建立关联 - 追踪 import/export, 理解模块间的依赖',
                      },
                      { num: 5, text: '执行任务 - 基于理解开始修改或创建代码' },
                    ].map((item) => (
                      <div key={item.num} className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#C41E3A] text-white text-xs font-bold flex-shrink-0 mt-0.5">
                          {item.num}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: 语义搜索 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  语义搜索的力量
                </h2>

                {tips[0] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[0].title}>
                      {tips[0].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  传统搜索只能匹配关键词, 语义搜索能理解代码的含义:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">
                          你的描述
                        </th>
                        <th className="text-left py-2 pr-4 text-orange-500 font-medium">
                          关键词搜索
                        </th>
                        <th className="text-left py-2 text-green-500 font-medium">
                          语义搜索
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        {
                          desc: '用户登录',
                          keyword: '包含 "登录" 的文件',
                          semantic: 'login, auth, session 相关代码',
                        },
                        {
                          desc: '数据验证',
                          keyword: '包含 "验证" 的文件',
                          semantic: 'validate, schema, zod 相关代码',
                        },
                        {
                          desc: '错误处理',
                          keyword: '包含 "错误" 的文件',
                          semantic: 'try/catch, ErrorBoundary, toast 相关代码',
                        },
                      ].map((row) => (
                        <tr
                          key={row.desc}
                          className="border-b border-gray-100 dark:border-gray-800"
                        >
                          <td className="py-2 pr-4 font-medium">{row.desc}</td>
                          <td className="py-2 pr-4 text-orange-600 dark:text-orange-400">
                            {row.keyword}
                          </td>
                          <td className="py-2 text-green-600 dark:text-green-400">
                            {row.semantic}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {tips[1] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[1].title}>
                      {tips[1].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10">
                  <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
                    .cursorignore 的作用
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    排除 node_modules、dist 等目录能让索引更精准。无关文件越少,
                    Agent 搜索效率越高。
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: 帮助 Agent 理解代码 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  帮助 Agent 更好地理解你的代码
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Agent 越了解你的项目, 输出质量越高。以下是 4 个实用技巧:
                </p>

                <div className="space-y-4">
                  {[
                    {
                      num: 1,
                      title: '提供文件路径, 减少搜索时间',
                      bad: '"修改用户列表组件的排序功能"',
                      good: '"修改 src/components/UserList.tsx 中的 sortUsers 函数, 改为按注册时间降序排列"',
                      color:
                        'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10',
                    },
                    {
                      num: 2,
                      title: '描述项目架构, 建立全局视角',
                      bad: '"在项目里加个 API"',
                      good: '"项目结构: src/pages/ 是路由页面, src/services/ 是 API 调用层。请在 services 层添加一个新的 API 调用"',
                      color:
                        'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10',
                    },
                    {
                      num: 3,
                      title: '指向参考文件, 保持风格一致',
                      bad: '"写一个订单服务"',
                      good: '"参考 src/services/user-service.ts 的模式, 创建 src/services/order-service.ts"',
                      color:
                        'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/10',
                    },
                    {
                      num: 4,
                      title: '说明依赖关系, 避免遗漏',
                      bad: '"修改 UserProfile 组件"',
                      good: '"UserProfile 依赖 useAuth() hook 和 user-service.ts 的 updateProfile() 方法, 请添加编辑功能"',
                      color:
                        'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/10',
                    },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className={`p-4 rounded-lg border ${item.color}`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C41E3A] text-white text-xs font-bold">
                          {item.num}
                        </span>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-orange-500 font-medium flex-shrink-0">
                            X
                          </span>
                          <code className="text-gray-600 dark:text-gray-400">
                            {item.bad}
                          </code>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 font-medium flex-shrink-0">
                            O
                          </span>
                          <code className="text-gray-600 dark:text-gray-400">
                            {item.good}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: 实战场景 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  实战场景: 让 Agent 理解陌生代码
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  你刚加入团队, 需要理解项目的认证流程。展开下方的示例对话,
                  对比两种不同的请求方式。
                </p>

                <div className="space-y-3 mb-6">
                  {vagueExamples[0] && (
                    <AgentExampleDialog
                      example={vagueExamples[0]}
                      label="模糊: 'Explain this codebase to me'"
                    />
                  )}
                  {constrainedExamples[0] && (
                    <AgentExampleDialog
                      example={constrainedExamples[0]}
                      label="精确: 指定文件路径和追踪链路"
                    />
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">
                          原则
                        </th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">
                          说明
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        {
                          principle: '给起点',
                          desc: '告诉 Agent 从哪个文件开始追踪',
                        },
                        {
                          principle: '画路径',
                          desc: '描述你想了解的调用链路',
                        },
                        {
                          principle: '定范围',
                          desc: '明确你关心的是哪个层面 (UI? API? 数据?)',
                        },
                        {
                          principle: '问具体',
                          desc: '"这个函数做了什么" 比 "解释这个项目" 有效得多',
                        },
                      ].map((row) => (
                        <tr
                          key={row.principle}
                          className="border-b border-gray-100 dark:border-gray-800"
                        >
                          <td className="py-2 pr-4 font-medium">
                            {row.principle}
                          </td>
                          <td className="py-2">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step 5: 测验 */}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对 Agent 代码库理解能力的掌握。
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
                  你已经了解了 Agent 如何搜索和理解代码库。接下来学习如何让
                  Agent 帮你快速构建功能。
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
                    title: '使用 Agent',
                    path: '/agents/working',
                  }}
                  next={{
                    title: '快速构建功能',
                    path: '/agents/features',
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
