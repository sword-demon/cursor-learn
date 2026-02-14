import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { ExpandableExample } from '../../components/common/ExpandableExample';
import { CodeBlock } from '../../components/common/CodeBlock';
import { WorkflowDiagram } from '../../components/speckit/WorkflowDiagram';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import {
  speckitWorkflowTutorial,
  workflowNodes,
} from '../../data/tutorials/speckit-workflow';
import { PageSEO } from '../../components/common/PageSEO';

export function SpecKitWorkflowPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial =
    getTutorialById('speckit-workflow') ?? speckitWorkflowTutorial;
  const tutorialProgress = getTutorialProgress('speckit-workflow');
  const [activeStep, setActiveStep] = useState(0);
  const [exploredNodes, setExploredNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('speckit-workflow');
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
    completeStep('speckit-workflow', stepId);
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
    completeTutorial('speckit-workflow');
  };

  const handleNodeClick = (nodeId: string) => {
    setExploredNodes((prev) => new Set(prev).add(nodeId));
    // 当用户探索了至少 4 个节点时, 标记流程图步骤完成
    if (exploredNodes.size >= 3 && !exploredNodes.has(nodeId)) {
      handleCompleteStep('workflow-diagram');
    }
  };

  const prevTutorialProgress = getTutorialProgress('speckit-install');
  const showPrerequisiteBanner = !prevTutorialProgress || prevTutorialProgress.status !== 'completed';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="Spec-Kit 核心工作流"
        description="学习 spec-kit 的完整开发工作流, 理解每个命令的作用和产出物。"
        path="/spec-kit/workflow"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/spec-kit" className="hover:text-[#C41E3A]">Spec-Kit 教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">核心工作流</span>
        </nav>

        {showPrerequisiteBanner && (
          <div className="mb-4">
            <BeginnerTipCard title="建议先完成前置步骤">
              建议先完成{' '}
              <Link to="/spec-kit/install" className="text-[#C41E3A] underline hover:no-underline">
                概念入门与安装
              </Link>{' '}
              教程, 以获得更好的学习体验。
            </BeginnerTipCard>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Spec-Kit 核心工作流
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            学习 spec-kit 的 7 个核心命令, 理解从需求到实现的完整流程
          </p>
        </div>

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
            {/* Step 1: 工作流全景 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  工作流全景
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  spec-kit 的核心工作流由 7 个命令组成, 从建立项目原则到最终实现,
                  形成一个完整的 Spec-Driven Development 流程。
                </p>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mb-6">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-mono">
                    {workflowNodes.map((node, index) => (
                      <span key={node.id} className="flex items-center gap-2">
                        <span className="px-2 py-1 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">
                          {node.command}
                        </span>
                        {index < workflowNodes.length - 1 && (
                          <span className="text-gray-400">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                      规格阶段 (What)
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>● constitution - 定义项目原则</li>
                      <li>● specify - 编写功能规格</li>
                      <li>● clarify - 澄清模糊需求</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                      实现阶段 (How)
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>● plan - 生成技术方案</li>
                      <li>● analyze - 一致性检查</li>
                      <li>● tasks - 拆分任务列表</li>
                      <li>● implement - 执行实现</li>
                    </ul>
                  </div>
                </div>

                <BeginnerTipCard title="工作流的核心思想">
                  先把 "做什么" 想清楚 (规格阶段), 再决定 "怎么做" (实现阶段)。
                  每个阶段都有明确的输入和输出, AI 在每一步都有充分的上下文。
                </BeginnerTipCard>
              </div>
            )}

            {/* Step 2: 交互式流程图 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  交互式流程图
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  点击下方流程图中的节点, 查看每个命令的详细说明、示例输入和输出。
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                  已探索 {exploredNodes.size} / {workflowNodes.length} 个节点
                  {exploredNodes.size >= 4 && ' - 流程图探索完成!'}
                </p>

                <WorkflowDiagram
                  nodes={workflowNodes}
                  onNodeClick={handleNodeClick}
                />
              </div>
            )}

            {/* Step 3: 命令详解 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  命令详解
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  展开查看每个命令的详细用法和示例。
                </p>

                <div className="space-y-3">
                  {workflowNodes.map((node) => (
                    <ExpandableExample
                      key={node.id}
                      title={`${node.order}. ${node.command} - ${node.title}`}
                    >
                      <div className="space-y-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {node.detailContent}
                        </p>
                        <CodeBlock
                          code={node.exampleInput}
                          language="bash"
                          title="示例输入"
                        />
                        <CodeBlock
                          code={node.exampleOutput}
                          language="markdown"
                          title="示例输出"
                        />
                        {node.outputFiles.length > 0 && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">生成文件: </span>
                            {node.outputFiles.join(', ')}
                          </div>
                        )}
                      </div>
                    </ExpandableExample>
                  ))}
                </div>

                <div className="mt-6">
                  <BeginnerTipCard title="命令执行顺序">
                    虽然工作流是线性的, 但实际使用中你可以根据需要跳过某些步骤。
                    例如小项目可以跳过 constitution, 直接从 specify 开始。
                    但建议初学者按完整流程走一遍。
                  </BeginnerTipCard>
                </div>
              </div>
            )}

            {/* Step 4: 测验 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对 spec-kit 工作流的理解。
                </p>
                {tutorial.steps[3]?.quiz && (
                  <QuizCard
                    quiz={tutorial.steps[3].quiz}
                    onComplete={(correct) => {
                      if (correct) handleCompleteStep('workflow-quiz');
                    }}
                  />
                )}
              </div>
            )}

            {/* Step 5: 完成 */}
            {activeStep === 4 && (
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
                  你已经掌握了 spec-kit 的完整工作流。
                  接下来可以通过实战案例加深理解。
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {tutorialProgress?.status !== 'completed' && (
                    <Button variant="primary" onClick={handleFinish}>
                      标记完成
                    </Button>
                  )}
                  <Link to="/spec-kit/case">
                    <Button variant="outline">实战案例演练</Button>
                  </Link>
                  <Link to="/spec-kit">
                    <Button variant="outline">返回 Spec-Kit 教程</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 底部导航 */}
        {activeStep < 4 && (
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
