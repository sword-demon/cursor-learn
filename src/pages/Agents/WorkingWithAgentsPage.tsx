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
import { agentWorkingTutorial } from '../../data/tutorials/agent-working';
import { getExamplesByTutorialId } from '../../data/agents/agent-examples';
import { getTipsByTutorialId } from '../../data/agents/beginner-tips';

export function WorkingWithAgentsPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } = useProgress();
  const tutorial = getTutorialById('agent-working') ?? agentWorkingTutorial;
  const tutorialProgress = getTutorialProgress('agent-working');
  const [activeStep, setActiveStep] = useState(0);

  const examples = getExamplesByTutorialId('agent-working');
  const tips = getTipsByTutorialId('agent-working');

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('agent-working');
    }
  }, [tutorialProgress, startTutorial]);

  const steps = tutorial.steps;
  const currentProgress = steps.length
    ? Math.round(((tutorialProgress?.completedStepIds.length ?? 0) / steps.length) * 100)
    : 0;

  const isStepCompleted = (stepId: string) =>
    tutorialProgress?.completedStepIds.includes(stepId) ?? false;

  const handleCompleteStep = (stepId: string) => {
    completeStep('agent-working', stepId);
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
    completeTutorial('agent-working');
  };

  // 按类型分组示例
  const vagueExamples = examples.filter((e) => e.type === 'vague');
  const constrainedExamples = examples.filter((e) => e.type === 'constrained');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/agents" className="hover:text-[#C41E3A]">Agent 教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">使用 Agent</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold">
              1
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              使用 Agent
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            理解 Agent harness 概念, 学会编写高效 prompt, 掌握上下文管理技巧
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
            {/* Step 1: Agent 是什么 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Cursor Agent 是什么?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Cursor 的 Agent 模式是一个能够自主完成编程任务的 AI 助手。
                  与普通的 AI 对话不同, Agent 可以读取代码、修改文件、运行命令。
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">特性</th>
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">普通对话 (Ctrl+L)</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">Agent 模式</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 pr-4">读取文件</td>
                        <td className="py-2 pr-4">需要手动 @ 引用</td>
                        <td className="py-2">自动搜索相关文件</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 pr-4">修改代码</td>
                        <td className="py-2 pr-4">给出建议, 手动修改</td>
                        <td className="py-2">直接修改文件</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 pr-4">运行命令</td>
                        <td className="py-2 pr-4">给出命令, 手动执行</td>
                        <td className="py-2">自动执行 (需确认)</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">多步骤任务</td>
                        <td className="py-2 pr-4">每步都需要指导</td>
                        <td className="py-2">自主规划和执行</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    如何开启 Agent 模式?
                  </h3>
                  <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
                    <li>按 <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-700 text-xs font-mono border border-gray-300 dark:border-gray-600">Ctrl+L</kbd> 打开对话面板</li>
                    <li>在输入框左下角, 点击模式切换按钮</li>
                    <li>选择 Agent 模式</li>
                    <li>或直接按 <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-700 text-xs font-mono border border-gray-300 dark:border-gray-600">Ctrl+.</kbd> 快速切换</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Step 2: Agent Harness */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Agent Harness: 给 AI 一本工作手册
                </h2>

                {tips[0] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[0].title}>
                      {tips[0].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Agent Harness 是你为 Agent 准备的 "工作环境" - 包括项目规则、上下文信息和工作约束。
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: '.cursorrules (项目规则)',
                      desc: '告诉 Agent 你的项目规范',
                      code: 'You are working on a React + TypeScript project.\n- Use functional components with hooks\n- Use Tailwind CSS for styling',
                      color: 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10',
                    },
                    {
                      title: '.cursorignore (忽略文件)',
                      desc: '告诉 Agent 哪些文件不要碰',
                      code: '.env\ncredentials.json\nnode_modules/',
                      color: 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10',
                    },
                    {
                      title: '项目文档 (README, CLAUDE.md)',
                      desc: 'Agent 会自动读取项目文档来理解上下文',
                      code: '# My Project\n\n## Tech Stack\n- React 19 + TypeScript\n- Tailwind CSS',
                      color: 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10',
                    },
                  ].map((item) => (
                    <div key={item.title} className={`p-4 rounded-lg border ${item.color}`}>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.desc}</p>
                      <pre className="text-xs bg-white dark:bg-gray-800 rounded p-2 overflow-x-auto">
                        <code className="text-gray-700 dark:text-gray-300">{item.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Prompt 技巧 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  编写高效 Prompt 的 5 个技巧
                </h2>

                {tips[1] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[1].title}>
                      {tips[1].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <div className="space-y-4">
                  {[
                    { num: 1, title: '明确目标', desc: '不要说 "改一下这个组件", 而是说具体要改什么、改成什么样、为什么要改' },
                    { num: 2, title: '提供文件路径', desc: 'Agent 可以自己搜索文件, 但直接告诉它路径更高效' },
                    { num: 3, title: '指定技术约束', desc: '使用什么库、遵循什么模式、避免什么做法' },
                    { num: 4, title: '给出参考示例', desc: '指向现有代码作为参考, 让 Agent 遵循一致的风格' },
                    { num: 5, title: '分步骤拆分', desc: '复杂任务拆成小步骤, 每步检查结果后再继续' },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="w-8 h-8 rounded-full bg-[#C41E3A] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{item.num}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: 上下文管理 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  上下文管理
                </h2>

                {tips[2] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[2].title}>
                      {tips[2].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  在对话中使用 @ 符号精准提供上下文:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">引用方式</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">用途</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { ref: '@file', use: '引用整个文件' },
                        { ref: '@folder', use: '引用整个目录' },
                        { ref: '@code', use: '引用选中的代码片段' },
                        { ref: '@docs', use: '引用文档' },
                        { ref: '@web', use: '搜索网络信息' },
                        { ref: '@git', use: '引用 Git 历史' },
                      ].map((row) => (
                        <tr key={row.ref} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4">
                            <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700">{row.ref}</code>
                          </td>
                          <td className="py-2">{row.use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10">
                  <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
                    最佳实践
                  </h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                    <li>精选 2-3 个最相关的文件, 不要一次引用太多</li>
                    <li>把通用规范写在 .cursorrules 中, 避免重复说明</li>
                    <li>用 @ 引用具体文件, 比让 Agent 自己搜索效率高</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 5: 模糊 vs 精确 Prompt 对比 */}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  实战对比: 模糊 vs 精确 Prompt
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  展开下方的示例对话, 对比不同 Prompt 风格的效果差异。
                </p>

                <div className="space-y-6">
                  {/* 示例 1: 添加功能 */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                      示例 1: 添加功能
                    </h3>
                    <div className="space-y-3">
                      {vagueExamples[0] && (
                        <AgentExampleDialog example={vagueExamples[0]} label="模糊: 'Add a user settings page'" />
                      )}
                      {constrainedExamples[0] && (
                        <AgentExampleDialog example={constrainedExamples[0]} label="精确: 包含文件路径、组件引用、布局参考" />
                      )}
                    </div>
                  </div>

                  {/* 示例 2: 修复 Bug */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                      示例 2: 修复 Bug
                    </h3>
                    <div className="space-y-3">
                      {vagueExamples[1] && (
                        <AgentExampleDialog example={vagueExamples[1]} label="模糊: 'Fix the bug'" />
                      )}
                      {constrainedExamples[1] && (
                        <AgentExampleDialog example={constrainedExamples[1]} label="精确: 包含文件、行号、错误信息、修复方案" />
                      )}
                    </div>
                  </div>
                </div>

                {/* 关键区别表格 */}
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">维度</th>
                        <th className="text-left py-2 pr-4 text-orange-500 font-medium">模糊 Prompt</th>
                        <th className="text-left py-2 text-green-500 font-medium">精确 Prompt</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { dim: '文件路径', vague: '不提供', precise: '明确指定' },
                        { dim: '技术要求', vague: '不说明', precise: '详细列出' },
                        { dim: '参考示例', vague: '没有', precise: '指向现有代码' },
                        { dim: '预期结果', vague: '模糊', precise: '具体可验证' },
                        { dim: 'Agent 效率', vague: '需要多轮确认', precise: '一次到位' },
                      ].map((row) => (
                        <tr key={row.dim} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4 font-medium">{row.dim}</td>
                          <td className="py-2 pr-4 text-orange-600 dark:text-orange-400">{row.vague}</td>
                          <td className="py-2 text-green-600 dark:text-green-400">{row.precise}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step 6: 测验 */}
            {activeStep === 5 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对 Agent 使用技巧的掌握程度。
                </p>
                {tutorial.steps[5]?.quiz && (
                  <QuizCard
                    quiz={tutorial.steps[5].quiz}
                    onComplete={(correct) => {
                      if (correct) handleCompleteStep('quiz');
                    }}
                  />
                )}
              </div>
            )}

            {/* Step 7: 完成 */}
            {activeStep === 6 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {tutorialProgress?.status === 'completed' ? '教程已完成!' : '恭喜完成!'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  你已经学会了 Agent 的核心概念和使用技巧。接下来可以继续学习如何让 Agent 理解你的代码库。
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
                  next={{ title: '理解你的代码库', path: '/agents/codebase' }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* 底部导航 */}
        {activeStep < 6 && (
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
