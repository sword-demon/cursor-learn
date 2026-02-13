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
import { agentReviewTutorial } from '../../data/tutorials/agent-review';
import { getExamplesByTutorialId } from '../../data/agents/agent-examples';
import { getTipsByTutorialId } from '../../data/agents/beginner-tips';
import { PageSEO } from '../../components/common/PageSEO';

export function ReviewingTestingPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial = getTutorialById('agent-review') ?? agentReviewTutorial;
  const tutorialProgress = getTutorialProgress('agent-review');
  const [activeStep, setActiveStep] = useState(0);

  const examples = getExamplesByTutorialId('agent-review');
  const tips = getTipsByTutorialId('agent-review');

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('agent-review');
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
    completeStep('agent-review', stepId);
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
    completeTutorial('agent-review');
  };

  const vagueExamples = examples.filter((e) => e.type === 'vague');
  const constrainedExamples = examples.filter((e) => e.type === 'constrained');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="代码审查与测试"
        description="学习使用 AI Agent 进行代码审查和自动化测试。"
        path="/agents/reviewing-testing"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/agents" className="hover:text-[#C41E3A]">
            Agent 教程
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">审查和测试代码</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white text-sm font-bold">
              5
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              审查和测试代码
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            学习如何让 Agent 审查代码质量和编写测试, 关注安全性、性能和可读性
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
            {/* Step 1: 代码审查基础 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  让 Agent 审查代码
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  代码审查是保障代码质量的关键环节。Agent 可以帮你从多个维度审查代码。
                </p>

                {tips[0] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[0].title}>
                      {tips[0].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  审查的三个维度
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">维度</th>
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">关注点</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">示例</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { key: '安全性', focus: 'XSS、SQL 注入、敏感数据泄露', example: '用户输入未转义直接渲染到 HTML' },
                        { key: '性能', focus: '不必要的重渲染、内存泄漏、大数据处理', example: 'useEffect 缺少依赖导致无限循环' },
                        { key: '可读性', focus: '命名规范、函数长度、代码重复', example: '单个函数超过 50 行, 变量名用 a/b/c' },
                      ].map((row) => (
                        <tr key={row.key} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4 font-medium">{row.key}</td>
                          <td className="py-2 pr-4">{row.focus}</td>
                          <td className="py-2">{row.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step 2: 审查 Prompt 技巧 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  审查 Prompt 技巧
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  好的审查请求应该明确范围和关注点, 而不是笼统地说 "帮我看看代码"。
                </p>

                {tips[1] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[1].title}>
                      {tips[1].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">审查 Prompt 模板</h3>
                  <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
{`Review [文件路径] for [审查维度]:

Focus areas:
- [具体关注的代码区域, 如行号范围]
- [具体关注的问题类型]

Check against [标准/规范, 如 OWASP top 10]
@[相关文件1] @[相关文件2]`}
                  </pre>
                </div>

                <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                    关键要素
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>- 指明要审查的文件路径</li>
                    <li>- 明确审查维度 (安全/性能/可读性)</li>
                    <li>- 缩小范围到具体的代码区域</li>
                    <li>- 用 @ 引用相关的类型定义和依赖文件</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: 让 Agent 编写测试 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  让 Agent 编写测试
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Agent 可以帮你编写单元测试和集成测试, 但需要提供足够的上下文。
                </p>

                {tips[2] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[2].title}>
                      {tips[2].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  测试类型
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">类型</th>
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">目的</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">适用场景</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { type: '单元测试', purpose: '验证单个函数的输入输出', scenario: '工具函数、计算逻辑、数据转换' },
                        { type: '集成测试', purpose: '验证多个模块协作', scenario: 'API 调用链、表单提交流程' },
                        { type: '快照测试', purpose: '检测 UI 意外变化', scenario: '组件渲染结果、样式变更' },
                      ].map((row) => (
                        <tr key={row.type} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4 font-medium">{row.type}</td>
                          <td className="py-2 pr-4">{row.purpose}</td>
                          <td className="py-2">{row.scenario}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">测试 Prompt 模板</h3>
                  <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
{`Write tests for [文件路径]:

Functions to test:
- [函数名1]: [简要说明]
- [函数名2]: [简要说明]

Cover edge cases: [列出边界情况]
Use patterns from @[现有测试文件]`}
                  </pre>
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
                  展开下方的示例对话, 对比模糊审查请求和精确审查请求的效果差异。
                </p>

                <div className="space-y-3 mb-6">
                  {vagueExamples[0] && (
                    <AgentExampleDialog
                      example={vagueExamples[0]}
                      label="模糊: 'Review my code'"
                    />
                  )}
                  {constrainedExamples[0] && (
                    <AgentExampleDialog
                      example={constrainedExamples[0]}
                      label="精确: 指明文件 + 审查维度 + 检查标准"
                    />
                  )}
                  {constrainedExamples[1] && (
                    <AgentExampleDialog
                      example={constrainedExamples[1]}
                      label="精确: 测试请求 + 覆盖场景 + 参考文件"
                    />
                  )}
                </div>

                <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                    精确审查请求的关键
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>- 指明文件路径和代码行号范围</li>
                    <li>- 明确审查维度和检查标准</li>
                    <li>- 用 @ 引用相关文件提供上下文</li>
                    <li>- 要求给出具体的修复建议</li>
                  </ul>
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
                  回答以下问题, 测试你对代码审查和测试策略的掌握。
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
                  你已经掌握了让 Agent 审查代码和编写测试的核心策略。接下来学习如何自定义代理行为。
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
                    title: '查找并修复 Bug',
                    path: '/agents/bugs',
                  }}
                  next={{
                    title: '自定义代理',
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
