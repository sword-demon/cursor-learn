import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { configThemesTutorial } from '../../data/tutorials/config-themes';

export function ThemesPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } = useProgress();
  const tutorial = getTutorialById('config-themes') ?? configThemesTutorial;
  const tutorialProgress = getTutorialProgress('config-themes');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('config-themes');
    }
  }, [tutorialProgress, startTutorial]);

  const steps = tutorial.steps;
  const currentProgress = steps.length
    ? Math.round(((tutorialProgress?.completedStepIds.length ?? 0) / steps.length) * 100)
    : 0;

  const isStepCompleted = (stepId: string) =>
    tutorialProgress?.completedStepIds.includes(stepId) ?? false;

  const handleCompleteStep = (stepId: string) => {
    completeStep('config-themes', stepId);
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
    completeTutorial('config-themes');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/config" className="hover:text-[#C41E3A]">配置教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">主题与外观</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            主题与外观
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            更改 Cursor 主题, 安装第三方主题
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
            {/* Step 0: 概览 */}
            {activeStep === 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Cursor 主题系统
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Cursor 支持丰富的主题系统, 可以自定义编辑器外观, 让你的开发环境更加个性化和舒适。
                </p>

                <BeginnerTipCard title="通俗理解">
                  主题就像手机壁纸 - 不影响功能, 但能让你的编辑器看起来更舒服。
                  深色主题护眼, 浅色主题明亮, 选择最适合你的就好。
                </BeginnerTipCard>

                <div className="mt-6 p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
                  <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    主题类型
                  </h3>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
                    <li>• 内置主题: Cursor 预装了多种浅色和深色主题</li>
                    <li>• 第三方主题: 可以从扩展市场安装社区创建的主题</li>
                    <li>• 自定义主题: 通过配置文件精细调整颜色</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    你将学到
                  </h3>
                  <ul className="space-y-2">
                    {[
                      '如何快速更改主题',
                      '如何安装第三方主题',
                      '如何自定义主题颜色',
                      '针对特定主题进行个性化配置',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Step 1: 更改主题 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  更改主题
                </h2>

                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 mb-6">
                  <h3 className="text-base font-semibold text-blue-800 dark:text-blue-300 mb-3">
                    通过命令面板更改
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                    这是最快速的更改主题方式:
                  </p>
                  <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">1.</span>
                      <span>打开命令面板 (Ctrl+Shift+P / Cmd+Shift+P)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">2.</span>
                      <span>输入 "Color Theme" 或 "主题"</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">3.</span>
                      <span>从列表中选择主题, 可以实时预览效果</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">4.</span>
                      <span>按 Enter 确认应用</span>
                    </li>
                  </ol>
                </div>

                <div className="mb-6 p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                    实时预览
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    当你在主题列表中上下移动时, 编辑器会实时显示该主题的效果, 无需确认即可预览。
                    这让你可以快速对比不同主题的视觉效果。
                  </p>
                </div>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  常用快捷键
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">操作</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">Windows/Linux</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">macOS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { action: '打开命令面板', windows: 'Ctrl+Shift+P', mac: 'Cmd+Shift+P' },
                        { action: '快速打开', windows: 'Ctrl+P', mac: 'Cmd+P' },
                      ].map((row) => (
                        <tr key={row.action} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 px-3 text-gray-900 dark:text-white">{row.action}</td>
                          <td className="py-2 px-3 font-mono text-purple-700 dark:text-purple-400">{row.windows}</td>
                          <td className="py-2 px-3 font-mono text-purple-700 dark:text-purple-400">{row.mac}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  提示: 你也可以在快速打开 (Ctrl+P / Cmd+P) 中输入 "&gt;Color Theme" 来快速访问主题选择器。
                </p>
              </div>
            )}

            {/* Step 2: 安装第三方主题 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  安装第三方主题
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Cursor 完全兼容 VS Code 主题, 你可以从扩展市场安装数千种社区创建的主题。
                </p>

                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 mb-6">
                  <h3 className="text-base font-semibold text-blue-800 dark:text-blue-300 mb-3">
                    安装步骤
                  </h3>
                  <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">1.</span>
                      <span>点击左侧活动栏的扩展图标 (或按 <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 text-xs font-mono border border-gray-300 dark:border-gray-600">Ctrl+Shift+X</kbd>)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">2.</span>
                      <span>在搜索框中输入 "theme" 或具体主题名称</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">3.</span>
                      <span>浏览主题扩展, 查看预览图</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">4.</span>
                      <span>点击 "Install" 按钮安装</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">5.</span>
                      <span>安装完成后, 通过命令面板选择新主题</span>
                    </li>
                  </ol>
                </div>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  热门主题推荐
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">主题名称</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">风格</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">特点</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'One Dark Pro', style: '深色', feature: '流行的 Atom 风格主题' },
                        { name: 'Dracula Official', style: '深色', feature: '高对比度, 护眼' },
                        { name: 'GitHub Theme', style: '浅色/深色', feature: 'GitHub 官方风格' },
                        { name: 'Material Theme', style: '多种', feature: 'Material Design 风格' },
                        { name: 'Nord', style: '深色', feature: '冷色调, 低对比度' },
                      ].map((theme) => (
                        <tr key={theme.name} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 px-3 font-medium text-gray-900 dark:text-white">{theme.name}</td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{theme.style}</td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{theme.feature}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    VS Code 兼容性
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    所有 VS Code 主题扩展都可以在 Cursor 中使用, 无需任何修改。
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: 自定义主题 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  自定义主题颜色
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  如果现有主题不完全符合你的需求, 可以通过配置文件自定义颜色。
                </p>

                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 mb-6">
                  <h3 className="text-base font-semibold text-blue-800 dark:text-blue-300 mb-3">
                    打开设置文件
                  </h3>
                  <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">1.</span>
                      <span>打开命令面板 (Ctrl+Shift+P / Cmd+Shift+P)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">2.</span>
                      <span>输入 "Preferences: Open User Settings (JSON)"</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">3.</span>
                      <span>在 settings.json 中添加自定义配置</span>
                    </li>
                  </ol>
                </div>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  自定义工作区颜色
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  使用 <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono">workbench.colorCustomizations</code> 自定义界面元素颜色:
                </p>
                <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-100 font-mono">
{`{
  "workbench.colorCustomizations": {
    "editor.background": "#1e1e1e",
    "editor.foreground": "#d4d4d4",
    "activityBar.background": "#2c2c2c",
    "sideBar.background": "#252526",
    "statusBar.background": "#007acc"
  }
}`}
                  </pre>
                </div>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  自定义语法高亮
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  使用 <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono">editor.tokenColorCustomizations</code> 自定义代码颜色:
                </p>
                <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-100 font-mono">
{`{
  "editor.tokenColorCustomizations": {
    "comments": "#6A9955",
    "strings": "#CE9178",
    "keywords": "#569CD6",
    "functions": "#DCDCAA"
  }
}`}
                  </pre>
                </div>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  针对特定主题自定义
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  你也可以只针对某个主题进行自定义:
                </p>
                <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100 font-mono">
{`{
  "workbench.colorCustomizations": {
    "[One Dark Pro]": {
      "editor.background": "#1e1e1e"
    }
  }
}`}
                  </pre>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  这样可以在不同主题间切换时保持各自的自定义设置。
                </p>
              </div>
            )}

            {/* Step 4: 测验 */}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对 Cursor 主题配置的掌握程度。
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

            {/* Step 5: 完成 */}
            {activeStep === 5 && (
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
                  你已经掌握了 Cursor 主题配置的核心知识, 可以根据个人喜好自定义编辑器外观了。
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

