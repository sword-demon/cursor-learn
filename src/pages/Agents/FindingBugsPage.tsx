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
import { agentBugsTutorial } from '../../data/tutorials/agent-bugs';
import { getExamplesByTutorialId } from '../../data/agents/agent-examples';
import { getTipsByTutorialId } from '../../data/agents/beginner-tips';
import { PageSEO } from '../../components/common/PageSEO';

export function FindingBugsPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial = getTutorialById('agent-bugs') ?? agentBugsTutorial;
  const tutorialProgress = getTutorialProgress('agent-bugs');
  const [activeStep, setActiveStep] = useState(0);

  const examples = getExamplesByTutorialId('agent-bugs');
  const tips = getTipsByTutorialId('agent-bugs');

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('agent-bugs');
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
    completeStep('agent-bugs', stepId);
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
    completeTutorial('agent-bugs');
  };

  const vagueExamples = examples.filter((e) => e.type === 'vague');
  const constrainedExamples = examples.filter((e) => e.type === 'constrained');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="查找 Bug"
        description="使用 AI Agent 高效定位和修复代码中的 Bug。"
        path="/agents/finding-bugs"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/agents" className="hover:text-[#C41E3A]">
            Agent 教程
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">查找并修复 Bug</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold">
              4
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              查找并修复 Bug
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            学习如何向 Agent 描述 Bug 并使用调试策略, 高效定位和修复代码问题
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
            {/* Step 1: Bug 描述技巧 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  如何向 Agent 描述 Bug
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Bug 描述的质量直接决定 Agent 能否快速定位问题。一个好的 Bug 描述包含四个要素。
                </p>

                {tips[0] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[0].title}>
                      {tips[0].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  四要素法
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">要素</th>
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">说明</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">示例</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { key: '现象', desc: '实际发生了什么', example: '页面加载后冻结, 浏览器标签无响应' },
                        { key: '预期', desc: '应该发生什么', example: '页面正常显示仪表盘数据' },
                        { key: '复现步骤', desc: '怎么触发这个问题', example: '登录后导航到 /dashboard' },
                        { key: '错误信息', desc: '控制台或日志中的报错', example: '"Maximum update depth exceeded"' },
                      ].map((row) => (
                        <tr key={row.key} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4 font-medium">{row.key}</td>
                          <td className="py-2 pr-4">{row.desc}</td>
                          <td className="py-2">{row.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step 2: Agent 调试流程 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Agent 调试流程
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Agent 修复 Bug 的过程和人类开发者类似, 遵循一个系统化的流程。
                </p>

                {tips[1] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[1].title}>
                      {tips[1].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  五步调试法
                </h3>
                <div className="space-y-3 mb-6">
                  {[
                    { num: 1, title: '定位文件', desc: '根据错误信息和堆栈追踪找到出问题的文件', color: 'bg-red-500' },
                    { num: 2, title: '理解上下文', desc: '阅读相关代码, 理解函数的输入输出和调用关系', color: 'bg-orange-500' },
                    { num: 3, title: '分析原因', desc: '找到 Bug 的根本原因, 而不只是表面现象', color: 'bg-yellow-500' },
                    { num: 4, title: '编写修复', desc: '用最小改动修复问题, 避免引入新 Bug', color: 'bg-green-500' },
                    { num: 5, title: '验证结果', desc: '确认修复有效, 检查是否影响其他功能', color: 'bg-blue-500' },
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${item.color} text-white text-xs font-bold flex-shrink-0`}>
                        {item.num}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">给 Agent 提供的关键信息</h3>
                  <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                    <li>- 出错的文件路径和行号</li>
                    <li>- 完整的错误信息或堆栈追踪</li>
                    <li>- 相关的输入数据 (什么值导致了崩溃)</li>
                    <li>- 用 @ 引用相关文件, 让 Agent 看到完整上下文</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: Prompt 模板与示例 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Prompt 模板与示例
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  展开下方的示例对话, 对比模糊描述和精确描述的效果差异。
                </p>

                <div className="space-y-3 mb-6">
                  {vagueExamples[0] && (
                    <AgentExampleDialog
                      example={vagueExamples[0]}
                      label="模糊: 'My app is broken, please fix it'"
                    />
                  )}
                  {constrainedExamples[0] && (
                    <AgentExampleDialog
                      example={constrainedExamples[0]}
                      label="精确: 指明文件 + 错误信息 + 复现步骤"
                    />
                  )}
                  {constrainedExamples[1] && (
                    <AgentExampleDialog
                      example={constrainedExamples[1]}
                      label="精确: 堆栈追踪 + 输入数据 + @ 引用文件"
                    />
                  )}
                </div>

                <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                    精确 Bug 报告的关键要素
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>- 指明出错的文件路径和行号</li>
                    <li>- 粘贴完整的错误信息</li>
                    <li>- 描述输入数据和边界条件</li>
                    <li>- 用 @ 引用相关文件提供上下文</li>
                    <li>- 说明预期行为和实际行为的差异</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 4: 常见 Bug 类型 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  常见 Bug 类型及调试策略
                </h2>

                {tips[2] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[2].title}>
                      {tips[2].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">Bug 类型</th>
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">典型表现</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">调试策略</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { type: '空值错误', symptom: '"Cannot read properties of undefined"', strategy: '检查变量是否可能为 null/undefined, 添加空值保护' },
                        { type: '无限循环', symptom: '页面冻结, "Maximum update depth exceeded"', strategy: '检查 useEffect 依赖数组和状态更新' },
                        { type: '类型错误', symptom: '"xxx is not a function"', strategy: '检查变量类型, 确认 API 返回的数据结构' },
                        { type: '异步问题', symptom: '数据显示为空或闪烁', strategy: '检查 async/await 使用和数据加载时序' },
                        { type: '样式问题', symptom: '布局错乱, 元素重叠', strategy: '检查 CSS 优先级和 Flexbox/Grid 属性' },
                      ].map((row) => (
                        <tr key={row.type} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4 font-medium">{row.type}</td>
                          <td className="py-2 pr-4 font-mono text-xs">{row.symptom}</td>
                          <td className="py-2">{row.strategy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">调试 Prompt 模板</h3>
                  <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
{`修复 [文件路径] 中的 [Bug 类型]:
- 错误信息: [完整错误文本]
- 出错位置: [函数名] 第 [行号] 行
- 触发条件: [什么操作/数据导致了问题]
- 预期行为: [应该怎样]
- @[相关文件1] @[相关文件2]`}
                  </pre>
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
                  回答以下问题, 测试你对 Agent 调试策略的掌握。
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
                  你已经掌握了向 Agent 描述 Bug 和调试的核心策略。接下来学习如何让 Agent 帮你审查和测试代码。
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
                    title: '快速构建功能',
                    path: '/agents/features',
                  }}
                  next={{
                    title: '审查和测试代码',
                    path: '/agents/review',
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
