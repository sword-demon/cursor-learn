import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { configShellTutorial } from '../../data/tutorials/config-shell';
import { PageSEO } from '../../components/common/PageSEO';

export function ShellPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } = useProgress();
  const tutorial = getTutorialById('config-shell') ?? configShellTutorial;
  const tutorialProgress = getTutorialProgress('config-shell');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('config-shell');
    }
  }, [tutorialProgress, startTutorial]);

  const steps = tutorial.steps;
  const currentProgress = steps.length
    ? Math.round(((tutorialProgress?.completedStepIds.length ?? 0) / steps.length) * 100)
    : 0;

  const isStepCompleted = (stepId: string) =>
    tutorialProgress?.completedStepIds.includes(stepId) ?? false;

  const handleCompleteStep = (stepId: string) => {
    completeStep('config-shell', stepId);
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
    completeTutorial('config-shell');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="Shell 配置"
        description="配置 Cursor IDE 的终端和 Shell 环境。"
        path="/config/shell"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/config" className="hover:text-[#C41E3A]">配置教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">Shell 命令集成</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Shell 命令集成
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            配置终端 Shell 集成, 提升命令行体验
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
                  Shell 命令概览
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Cursor 提供 <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono">cursor</code> 和 <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono">code</code> 两个命令行工具, 可以从终端快速打开文件和项目。
                </p>

                <BeginnerTipCard title="通俗理解">
                  Shell 命令就像给 Cursor 装了一个遥控器 - 你可以在终端里远程控制 Cursor 打开文件和项目, 不用每次都手动拖拽。
                </BeginnerTipCard>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    你将学到
                  </h3>
                  <ul className="space-y-2">
                    {[
                      '如何安装 Shell 命令',
                      'cursor 和 code 命令的用法',
                      '常用参数和选项',
                      '实用场景示例',
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

            {/* Step 1: 安装 Shell 命令 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  安装 Shell 命令
                </h2>

                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 mb-6">
                  <h3 className="text-base font-semibold text-blue-800 dark:text-blue-300 mb-3">
                    通过命令面板安装
                  </h3>
                  <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">1.</span>
                      <span>打开命令面板 (<kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 text-xs font-mono border border-gray-300 dark:border-gray-600">Ctrl+Shift+P</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 text-xs font-mono border border-gray-300 dark:border-gray-600">Cmd+Shift+P</kbd>)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">2.</span>
                      <span>搜索 "Install 'cursor' command" 或 "Install 'code' command"</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">3.</span>
                      <span>选择对应命令并执行</span>
                    </li>
                  </ol>
                </div>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  两个命令的区别
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">命令</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 px-3 font-medium font-mono text-purple-700 dark:text-purple-400">cursor</td>
                        <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Cursor 原生命令</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 px-3 font-medium font-mono text-purple-700 dark:text-purple-400">code</td>
                        <td className="py-2 px-3 text-gray-600 dark:text-gray-400">兼容 VS Code 习惯的别名</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  两个命令功能完全相同, 选择你习惯的即可。
                </p>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  验证安装
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  安装完成后, 在终端运行:
                </p>
                <div className="bg-gray-900 rounded-lg p-3 mb-2">
                  <code className="text-sm text-green-400 font-mono">cursor --version</code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">或</p>
                <div className="bg-gray-900 rounded-lg p-3 mb-2">
                  <code className="text-sm text-green-400 font-mono">code --version</code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  如果显示版本号, 说明安装成功。
                </p>
              </div>
            )}

            {/* Step 2: 命令用法 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  命令用法
                </h2>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  基础用法
                </h3>
                <div className="space-y-2 mb-6">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-sm text-green-400 font-mono block mb-1"># 打开当前目录</code>
                    <code className="text-sm text-white font-mono">cursor .</code>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-sm text-green-400 font-mono block mb-1"># 打开指定文件</code>
                    <code className="text-sm text-white font-mono">cursor file.txt</code>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-sm text-green-400 font-mono block mb-1"># 打开指定目录</code>
                    <code className="text-sm text-white font-mono">cursor /path/to/project</code>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  常用参数
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">参数</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">说明</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">示例</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { param: '-n', desc: '在新窗口打开', example: 'cursor -n .' },
                        { param: '-w', desc: '等待文件关闭后返回', example: 'cursor -w file.txt' },
                        { param: '--diff', desc: '比较两个文件', example: 'cursor --diff file1 file2' },
                        { param: '-r', desc: '在最近使用的窗口打开', example: 'cursor -r .' },
                        { param: '-g', desc: '打开文件并跳转到指定行', example: 'cursor -g file.txt:10' },
                      ].map((row) => (
                        <tr key={row.param} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 px-3 font-medium font-mono text-purple-700 dark:text-purple-400">{row.param}</td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{row.desc}</td>
                          <td className="py-2 px-3 font-mono text-xs text-gray-500 dark:text-gray-500">{row.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <BeginnerTipCard title="参数详解">
                  <ul className="space-y-1 text-sm">
                    <li><strong>-n (new window)</strong>: 在新窗口打开, 不影响当前窗口</li>
                    <li><strong>-w (wait)</strong>: 适合作为 Git 编辑器, 等待文件关闭后再返回终端</li>
                    <li><strong>--diff</strong>: 并排比较两个文件的差异</li>
                    <li><strong>-r (reuse)</strong>: 复用最近的窗口, 避免打开多个窗口</li>
                    <li><strong>-g (goto)</strong>: 打开文件并跳转到指定行号, 格式为 文件名:行号</li>
                  </ul>
                </BeginnerTipCard>
              </div>
            )}

            {/* Step 3: 实用场景 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  实用场景
                </h2>

                <div className="space-y-6">
                  <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                    <h3 className="text-base font-semibold text-green-800 dark:text-green-300 mb-2">
                      场景一: 设置为 Git 默认编辑器
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-400 mb-2">
                      将 Cursor 设置为 Git 的默认编辑器, 用于编辑提交信息:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <code className="text-sm text-green-400 font-mono">git config --global core.editor "cursor -w"</code>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-500 mt-2">
                      -w 参数确保 Git 等待你关闭文件后再继续。
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
                    <h3 className="text-base font-semibold text-blue-800 dark:text-blue-300 mb-2">
                      场景二: 快速打开项目
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
                      从任意目录快速打开项目:
                    </p>
                    <div className="space-y-2">
                      <div className="bg-gray-900 rounded-lg p-3">
                        <code className="text-sm text-green-400 font-mono block mb-1"># 打开当前目录</code>
                        <code className="text-sm text-white font-mono">cursor .</code>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-3">
                        <code className="text-sm text-green-400 font-mono block mb-1"># 打开指定项目</code>
                        <code className="text-sm text-white font-mono">cursor ~/projects/my-app</code>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10">
                    <h3 className="text-base font-semibold text-purple-800 dark:text-purple-300 mb-2">
                      场景三: 比较文件差异
                    </h3>
                    <p className="text-sm text-purple-700 dark:text-purple-400 mb-2">
                      比较两个文件的差异:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <code className="text-sm text-green-400 font-mono">cursor --diff file1 file2</code>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10">
                    <h3 className="text-base font-semibold text-amber-800 dark:text-amber-300 mb-2">
                      场景四: 从日志跳转到代码
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mb-2">
                      结合 -g 参数, 从错误日志快速跳转到对应代码行:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <code className="text-sm text-green-400 font-mono block mb-1"># 打开 app.js 并跳转到第 42 行</code>
                      <code className="text-sm text-white font-mono">cursor -g app.js:42</code>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: 测验 */}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对 Cursor Shell 命令的掌握程度。
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
                  你已经掌握了 Cursor Shell 命令的核心知识, 可以在终端中高效使用 Cursor 了。
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
