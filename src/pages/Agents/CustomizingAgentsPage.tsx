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
import { agentCustomizeTutorial } from '../../data/tutorials/agent-customize';
import { getExamplesByTutorialId } from '../../data/agents/agent-examples';
import { getTipsByTutorialId } from '../../data/agents/beginner-tips';
import { PageSEO } from '../../components/common/PageSEO';

export function CustomizingAgentsPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial = getTutorialById('agent-customize') ?? agentCustomizeTutorial;
  const tutorialProgress = getTutorialProgress('agent-customize');
  const [activeStep, setActiveStep] = useState(0);

  const examples = getExamplesByTutorialId('agent-customize');
  const tips = getTipsByTutorialId('agent-customize');

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('agent-customize');
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
    completeStep('agent-customize', stepId);
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
    completeTutorial('agent-customize');
  };

  const vagueExamples = examples.filter((e) => e.type === 'vague');
  const constrainedExamples = examples.filter((e) => e.type === 'constrained');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="自定义 Agent"
        description="学习如何自定义和配置 AI Agent 以适应你的工作流程。"
        path="/agents/customizing-agents"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/agents" className="hover:text-[#C41E3A]">
            Agent 教程
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">自定义你的代理</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-500 text-white text-sm font-bold">
              6
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              自定义你的代理
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            学习如何通过 Cursor Rules 和 MCP 工具自定义 Agent 行为, 使其更符合项目需求
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
            {/* Step 1: Cursor Rules 入门 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Cursor Rules: 给 Agent 定规矩
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  每次和 Agent 对话都要重复说 "用 TypeScript"、"用 Tailwind" 很烦? Cursor Rules 帮你解决这个问题。
                </p>

                {tips[0] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[0].title}>
                      {tips[0].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Rules 的三种类型
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">类型</th>
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">触发方式</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">适用场景</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { type: 'Always', trigger: '每次对话自动加载', scenario: '项目通用规范 (技术栈、代码风格)' },
                        { type: 'Auto Attached', trigger: '匹配文件 glob 时加载', scenario: '特定文件类型的规则 (如 *.tsx)' },
                        { type: 'Agent Requested', trigger: 'Agent 判断相关时加载', scenario: '特定领域知识 (如数据库操作规范)' },
                      ].map((row) => (
                        <tr key={row.type} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4 font-medium">{row.type}</td>
                          <td className="py-2 pr-4">{row.trigger}</td>
                          <td className="py-2">{row.scenario}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step 2: 编写 Rules 文件 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  编写 Rules 文件
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Rules 文件使用 .mdc 格式 (Markdown + 元数据), 放在 .cursor/rules/ 目录下。
                </p>

                {tips[1] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[1].title}>
                      {tips[1].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Rules 文件结构</h3>
                  <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
{`---
description: 这条规则的用途说明
globs: src/**/*.tsx, src/**/*.ts
---

## 你的规则内容

- 使用 function 组件, 不用 class 组件
- Props 用 interface 定义, 不用 type
- 所有交互元素必须有 aria-label`}
                  </pre>
                </div>

                <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                    实用建议
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>- 每个规则文件聚焦一个主题</li>
                    <li>- 规则要具体可执行, 避免模糊描述</li>
                    <li>- 用代码示例说明 "应该" 和 "不应该"</li>
                    <li>- description 字段要清晰, Agent 用它判断是否加载</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: MCP 工具入门 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  MCP: 给 Agent 装 "外挂"
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  MCP (Model Context Protocol) 让 Agent 能使用外部工具, 比如查数据库、搜文档、调 API。
                </p>

                {tips[2] && (
                  <div className="mb-6">
                    <BeginnerTipCard title={tips[2].title}>
                      {tips[2].content}
                    </BeginnerTipCard>
                  </div>
                )}

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">MCP 配置示例</h3>
                  <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
{`// .cursor/mcp.json
{
  "mcpServers": {
    "postgres-dev": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "\${DATABASE_URL}"
      }
    }
  }
}`}
                  </pre>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  常用 MCP 服务器
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">服务器</th>
                        <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">用途</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      {[
                        { name: 'server-postgres', purpose: '查询 PostgreSQL 数据库' },
                        { name: 'server-fetch', purpose: '抓取网页内容' },
                        { name: 'server-filesystem', purpose: '访问指定目录的文件' },
                        { name: 'server-github', purpose: '操作 GitHub Issues/PRs' },
                      ].map((row) => (
                        <tr key={row.name} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 pr-4 font-mono text-xs">{row.name}</td>
                          <td className="py-2">{row.purpose}</td>
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
                  展开下方的示例对话, 对比模糊请求和精确请求在自定义 Agent 时的效果差异。
                </p>

                <div className="space-y-3 mb-6">
                  {vagueExamples[0] && (
                    <AgentExampleDialog
                      example={vagueExamples[0]}
                      label="模糊: 'Make the AI work better'"
                    />
                  )}
                  {constrainedExamples[0] && (
                    <AgentExampleDialog
                      example={constrainedExamples[0]}
                      label="精确: Rules 文件 + 技术栈 + 具体规则"
                    />
                  )}
                  {constrainedExamples[1] && (
                    <AgentExampleDialog
                      example={constrainedExamples[1]}
                      label="精确: MCP 配置 + 工具用途 + 环境变量"
                    />
                  )}
                </div>

                <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                    精确自定义请求的关键
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>- 明确项目技术栈和约定</li>
                    <li>- 列出具体的规则条目</li>
                    <li>- 用 @ 引用现有代码作为参考</li>
                    <li>- 指定文件路径和 glob 匹配范围</li>
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
                  回答以下问题, 测试你对 Cursor Rules 和 MCP 的掌握。
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
                  你已经掌握了 Cursor Rules 和 MCP 工具的配置方法。接下来学习最后一课: 综合运用。
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
                    title: '审查和测试代码',
                    path: '/agents/review',
                  }}
                  next={{
                    title: '综合运用',
                    path: '/agents/together',
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
