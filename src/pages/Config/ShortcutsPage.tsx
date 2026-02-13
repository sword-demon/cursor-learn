import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { ShortcutTable } from '../../components/config/ShortcutTable';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { configShortcutsTutorial } from '../../data/tutorials/config-shortcuts';

export function ShortcutsPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } = useProgress();
  const tutorial = getTutorialById('config-shortcuts') ?? configShortcutsTutorial;
  const tutorialProgress = getTutorialProgress('config-shortcuts');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('config-shortcuts');
    }
  }, [tutorialProgress, startTutorial]);

  const steps = tutorial.steps;
  const currentProgress = steps.length
    ? Math.round(((tutorialProgress?.completedStepIds.length ?? 0) / steps.length) * 100)
    : 0;

  const isStepCompleted = (stepId: string) =>
    tutorialProgress?.completedStepIds.includes(stepId) ?? false;

  const handleCompleteStep = (stepId: string) => {
    completeStep('config-shortcuts', stepId);
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
    completeTutorial('config-shortcuts');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/config" className="hover:text-[#C41E3A]">配置教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">键盘快捷键速查</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            键盘快捷键速查
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            按分类查看 Cursor 快捷键, 支持 Windows/macOS 平台切换和搜索筛选
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
            {/* Step 1: 概览 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Cursor 键盘快捷键
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Cursor 继承了 VS Code 的快捷键体系, 同时新增了 AI 相关的专属快捷键。
                  掌握快捷键可以显著提升编码效率。
                </p>

                <BeginnerTipCard title="通俗理解">
                  快捷键就像开车时的方向盘和油门 - 你不需要每次都打开菜单找功能,
                  手指直接按组合键就能完成操作, 效率提升数倍。
                </BeginnerTipCard>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    6 大分类
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { label: '通用', desc: '命令面板、设置、导航', color: 'bg-blue-500' },
                      { label: 'AI 对话', desc: '打开对话、Agent、上下文', color: 'bg-purple-500' },
                      { label: '内联编辑', desc: 'Ctrl+K 触发、接受/拒绝', color: 'bg-green-500' },
                      { label: '代码选择', desc: '扩展选择、多光标', color: 'bg-orange-500' },
                      { label: 'Tab 补全', desc: '接受/拒绝、逐词接受', color: 'bg-pink-500' },
                      { label: '终端', desc: '新建/拆分/关闭终端', color: 'bg-cyan-500' },
                    ].map((cat) => (
                      <div
                        key={cat.label}
                        className="p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {cat.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{cat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: AI 核心快捷键 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  AI 核心快捷键
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  记住这 6 个快捷键, 就能覆盖 80% 的 AI 交互场景。
                </p>

                <div className="space-y-4">
                  {[
                    {
                      keys: 'Ctrl+L / Cmd+L',
                      label: '打开 AI 对话面板',
                      desc: '最常用的 AI 入口, 打开侧边对话面板',
                      color: 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/10',
                    },
                    {
                      keys: 'Ctrl+K / Cmd+K',
                      label: '触发内联编辑',
                      desc: '选中代码后按下, 直接在编辑器中修改代码',
                      color: 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10',
                    },
                    {
                      keys: 'Tab',
                      label: '接受 AI 补全建议',
                      desc: '当看到灰色补全提示时, 按 Tab 接受',
                      color: 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10',
                    },
                    {
                      keys: 'Ctrl+. / Cmd+.',
                      label: '切换 Agent 模式',
                      desc: '在对话中切换普通模式和 Agent 模式',
                      color: 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/10',
                    },
                    {
                      keys: '@',
                      label: '添加上下文',
                      desc: '在对话中引用文件、代码、文档等上下文',
                      color: 'border-pink-300 dark:border-pink-700 bg-pink-50 dark:bg-pink-900/10',
                    },
                    {
                      keys: 'Shift+Enter',
                      label: '对话中换行',
                      desc: '在对话输入框中换行而不发送消息',
                      color: 'border-cyan-300 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-900/10',
                    },
                  ].map((item) => (
                    <div
                      key={item.keys}
                      className={`p-4 rounded-lg border ${item.color}`}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <kbd className="inline-flex items-center px-2.5 py-1 rounded bg-white dark:bg-gray-800 text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 shadow-sm">
                          {item.keys}
                        </kbd>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 ml-0.5">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: 全部快捷键速查表 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  全部快捷键速查表
                </h2>
                <ShortcutTable />
              </div>
            )}

            {/* Step 4: 测验 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对 Cursor 快捷键的掌握程度。
                </p>
                {tutorial.steps[3]?.quiz && (
                  <QuizCard
                    quiz={tutorial.steps[3].quiz}
                    onComplete={(correct) => {
                      if (correct) handleCompleteStep('quiz');
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
                  你已经了解了 Cursor 的核心快捷键, 在日常编码中多加练习就能形成肌肉记忆。
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {tutorialProgress?.status !== 'completed' && (
                    <Button variant="primary" onClick={handleFinish}>
                      标记完成
                    </Button>
                  )}
                  <Link to="/config">
                    <Button variant="outline">返回配置教程</Button>
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