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
import { agentTogetherTutorial } from '../../data/tutorials/agent-together';
import { getExamplesByTutorialId } from '../../data/agents/agent-examples';
import { getTipsByTutorialId } from '../../data/agents/beginner-tips';

export function PuttingTogetherPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial = getTutorialById('agent-together') ?? agentTogetherTutorial;
  const tutorialProgress = getTutorialProgress('agent-together');
  const [activeStep, setActiveStep] = useState(0);

  const examples = getExamplesByTutorialId('agent-together');
  const tips = getTipsByTutorialId('agent-together');

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('agent-together');
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
    completeStep('agent-together', stepId);
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
    completeTutorial('agent-together');
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
          <span className="text-gray-900 dark:text-white">综合运用</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white text-sm font-bold">
              7
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              综合运用
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            整合所有 Agent 技巧, 通过完整案例掌握从零开始的开发工作流
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
            {/* Step 1: 完整工作流回顾 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  从零到一: 完整开发工作流
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  前面 6 课你学到了 Agent 的各项技能, 现在把它们串联成一个完整的工作流。
                </p>

                {tips[0] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[0].title}>
                      {tips[0].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  开发流程四步法
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">步骤</th>
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">技能</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">对应课程</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { step: '1. 定规矩', skill: 'Cursor Rules + MCP 配置', lesson: '第 6 课' },
                        { step: '2. 理解现有代码', skill: '代码库搜索 + @ 引用', lesson: '第 2 课' },
                        { step: '3. 分阶段开发', skill: '精确 Prompt + 迭代交付', lesson: '第 1/3 课' },
                        { step: '4. 质量保障', skill: '代码审查 + 测试 + Bug 修复', lesson: '第 4/5 课' },
                      ].map((row) => (
                        <tr key={row.step} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4 font-medium">{row.step}</td>
                          <td className="py-2 pr-4">{row.skill}</td>
                          <td className="py-2">{row.lesson}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step 2: 实战案例演示 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  实战案例: 为项目添加任务管理功能
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  假设你要为一个 React 项目添加任务管理功能, 看看完整流程是怎样的。
                </p>

                {tips[1] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[1].title}>
                      {tips[1].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <div className="space-y-4">
                  {[
                    {
                      title: 'Step 1: 定规矩',
                      desc: '创建 Rules 文件确保 Agent 遵循项目规范',
                      code: '---\ndescription: React component conventions\nglobs: src/**/*.tsx\n---\n- Named exports only\n- Props use interface\n- Tailwind CSS for styling',
                    },
                    {
                      title: 'Step 2: 理解现有代码',
                      desc: '用 @ 引用关键文件让 Agent 了解项目结构',
                      code: 'Explain the state management pattern.\n@src/contexts/AuthContext.tsx\n@src/hooks/useLocalStorage.ts',
                    },
                    {
                      title: 'Step 3: 分阶段开发',
                      desc: '把需求拆成小阶段, 每阶段完成后检查',
                      code: 'Phase 1: Create TaskItem type and TaskContext\nPhase 2: Implement CRUD operations\nPhase 3: Build TaskBoard UI component\nPhase 4: Add tests',
                    },
                    {
                      title: 'Step 4: 质量保障',
                      desc: '让 Agent 审查代码并编写测试',
                      code: 'Review src/contexts/TaskContext.tsx for:\n- Memory leaks in useEffect\n- Missing error handling\n- Accessibility issues',
                    },
                  ].map((item) => (
                    <div key={item.title} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.desc}</p>
                      <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">
                        {item.code}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: 最佳实践总结 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  最佳实践总结
                </h2>

                {tips[2] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[2].title}>
                      {tips[2].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  高效协作的 5 个原则
                </h3>
                <div className="space-y-2 mb-6">
                  {[
                    { num: 1, title: '上下文为王', desc: '用 @ 引用文件, 用 Rules 定规矩, 让 Agent 有足够信息' },
                    { num: 2, title: '小步快跑', desc: '把大任务拆成小阶段, 每步检查结果' },
                    { num: 3, title: '精确表达', desc: '包含文件路径、行号、技术要求, 避免模糊描述' },
                    { num: 4, title: '先测后写', desc: '用 TDD 思路, 先定义预期行为再让 Agent 实现' },
                    { num: 5, title: '信任但验证', desc: 'Agent 的输出需要你审查, 特别是安全相关的代码' },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C41E3A] text-white text-xs font-bold flex-shrink-0">
                        {item.num}
                      </span>
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400"> - {item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  常见误区
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">误区</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">正确做法</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { mistake: '一次给所有需求', correct: '分阶段交付, 每步检查' },
                        { mistake: '不提供参考文件', correct: '用 @ 引用现有代码作为模式参考' },
                        { mistake: '盲目信任输出', correct: '审查每次生成的代码' },
                        { mistake: '反复重试相同 Prompt', correct: '换个角度描述, 提供更多上下文' },
                        { mistake: '忽略 Rules 配置', correct: '项目初期就建立 Rules' },
                      ].map((row) => (
                        <tr key={row.mistake} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4 text-red-600 dark:text-red-400">{row.mistake}</td>
                          <td className="py-2 text-green-600 dark:text-green-400">{row.correct}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step 4: Prompt 示例对比 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Prompt 示例对比
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  展开下方的示例对话, 对比模糊请求和精确请求在完整工作流中的效果差异。
                </p>

                <div className="space-y-3 mb-6">
                  {vagueExamples[0] && (
                    <AgentExampleDialog
                      example={vagueExamples[0]}
                      label="模糊: 'Build me a todo app'"
                    />
                  )}
                  {constrainedExamples[0] && (
                    <AgentExampleDialog
                      example={constrainedExamples[0]}
                      label="精确: 分阶段计划 + @ 引用 + Rules 约束"
                    />
                  )}
                </div>

                <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                    精确工作流请求的关键
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>- 明确分阶段计划, 每阶段有清晰的交付物</li>
                    <li>- 用 @ 引用现有代码作为模式参考</li>
                    <li>- 指定 Rules 文件确保一致性</li>
                    <li>- 要求 Agent 在每阶段完成后等待审查</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 5: 最终测验 */}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  最终测验
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 检验你对 Agent 完整工作流的掌握。
                </p>
                {tutorial.steps[4]?.quiz && (
                  <QuizCard
                    quiz={tutorial.steps[4].quiz}
                    onComplete={(correct) => {
                      if (correct) handleCompleteStep('final-quiz');
                    }}
                  />
                )}
              </div>
            )}

            {/* Step 6: 课程完成 */}
            {activeStep === 5 && (
              <div className="text-center py-8">
                {/* 完成徽章 */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C41E3A] to-[#FFD700] flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {tutorialProgress?.status === 'completed'
                    ? '课程已完成!'
                    : '恭喜你完成了全部 Agent 教程!'}
                </h2>
                <p className="text-sm text-[#C41E3A] font-semibold mb-3">
                  Agent 达人
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  你已经掌握了 Cursor Agent 的全部核心技巧。现在可以在实际项目中运用这些知识了。
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
                    title: '自定义你的代理',
                    path: '/agents/customize',
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
