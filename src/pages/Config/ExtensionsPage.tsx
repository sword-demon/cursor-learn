import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { configExtensionsTutorial } from '../../data/tutorials/config-extensions';

export function ExtensionsPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } = useProgress();
  const tutorial = getTutorialById('config-extensions') ?? configExtensionsTutorial;
  const tutorialProgress = getTutorialProgress('config-extensions');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('config-extensions');
    }
  }, [tutorialProgress, startTutorial]);

  const steps = tutorial.steps;
  const currentProgress = steps.length
    ? Math.round(((tutorialProgress?.completedStepIds.length ?? 0) / steps.length) * 100)
    : 0;

  const isStepCompleted = (stepId: string) =>
    tutorialProgress?.completedStepIds.includes(stepId) ?? false;

  const handleCompleteStep = (stepId: string) => {
    completeStep('config-extensions', stepId);
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
    completeTutorial('config-extensions');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/config" className="hover:text-[#C41E3A]">配置教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">扩展管理</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            扩展管理
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            了解 Cursor 扩展安装、管理和 VS Code 兼容性
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
                  Cursor 扩展生态
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Cursor 支持丰富的扩展生态系统, 可以通过安装扩展来增强编辑器功能。
                </p>

                <BeginnerTipCard title="通俗理解">
                  扩展就像手机上的 App - 编辑器本身提供基础功能,
                  而扩展可以按需添加代码检查、格式化、主题等额外能力。
                </BeginnerTipCard>

                <div className="mt-6 p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10">
                  <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
                    关键区别
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Cursor 使用 <span className="font-mono font-semibold">Open VSX 注册表</span> 而非 VS Code Marketplace。
                    大多数流行的 VS Code 扩展都可以在 Open VSX 上找到。
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    你将学到
                  </h3>
                  <ul className="space-y-2">
                    {[
                      '两种安装扩展的方式',
                      '如何管理已安装的扩展',
                      '发布者验证徽章的含义',
                      '从 VS Code 迁移扩展的方法',
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

            {/* Step 2: 安装方式 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  两种安装方式
                </h2>

                <div className="space-y-6">
                  {/* 方式一 */}
                  <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
                    <h3 className="text-base font-semibold text-blue-800 dark:text-blue-300 mb-3">
                      方式一: 扩展面板搜索安装
                    </h3>
                    <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                      <li className="flex gap-2">
                        <span className="font-semibold flex-shrink-0">1.</span>
                        <span>点击左侧活动栏的扩展图标 (或按 <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 text-xs font-mono border border-gray-300 dark:border-gray-600">Ctrl+Shift+X</kbd>)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold flex-shrink-0">2.</span>
                        <span>在搜索框中输入扩展名称</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold flex-shrink-0">3.</span>
                        <span>找到目标扩展后点击 "Install" 按钮</span>
                      </li>
                    </ol>
                    <p className="mt-3 text-xs text-blue-600 dark:text-blue-500">
                      这是最常用的安装方式, 适合浏览和发现新扩展。
                    </p>
                  </div>

                  {/* 方式二 */}
                  <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                    <h3 className="text-base font-semibold text-green-800 dark:text-green-300 mb-3">
                      方式二: URL 模式安装
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                      在浏览器地址栏输入特定格式的 URL, 直接触发 Cursor 安装扩展:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-3 mb-2">
                      <code className="text-sm text-green-400 font-mono">
                        cursor:extension/发布者.扩展名
                      </code>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-500 mb-2">
                      例如安装 ESLint:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <code className="text-sm text-green-400 font-mono">
                        cursor:extension/dbaeumer.vscode-eslint
                      </code>
                    </div>
                    <p className="mt-3 text-xs text-green-600 dark:text-green-500">
                      适合从文档或教程中快速安装推荐扩展。
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: 扩展管理 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  管理已安装的扩展
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  在扩展面板中, 点击 "已安装" 筛选器查看所有已安装的扩展。
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">操作</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { action: '禁用', desc: '暂时关闭扩展, 不卸载' },
                        { action: '卸载', desc: '完全移除扩展' },
                        { action: '配置', desc: '打开扩展的设置项' },
                        { action: '更新', desc: '安装扩展的最新版本' },
                      ].map((row) => (
                        <tr key={row.action} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 px-3 font-medium text-gray-900 dark:text-white">{row.action}</td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <BeginnerTipCard title="禁用 vs 卸载">
                  禁用就像把 App 放进文件夹 - 还在手机上, 随时可以打开。
                  卸载就是彻底删除 - 需要时得重新下载安装。
                </BeginnerTipCard>

                <div className="mt-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    工作区级别控制
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    你可以针对特定工作区禁用某些扩展, 而在其他工作区保持启用。
                    这对于不同项目使用不同技术栈时很有用。
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: 发布者验证 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  发布者验证徽章
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  在扩展列表中, 你可能会看到发布者名称旁边的验证徽章。
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">蓝色对勾</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        发布者已通过身份验证, 表示扩展来源可信
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-gray-500 dark:text-gray-400">?</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">无徽章</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        发布者未验证, 不代表扩展有问题, 但建议额外留意
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  安全建议
                </h3>
                <ol className="space-y-2">
                  {[
                    '优先选择有验证徽章的扩展',
                    '查看扩展的下载量和评分',
                    '阅读扩展的权限说明',
                    '定期检查和更新已安装的扩展',
                  ].map((tip, i) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                        {i + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Step 5: 从 VS Code 迁移 */}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  从 VS Code 迁移扩展
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  如果你之前使用 VS Code, 可以将扩展迁移到 Cursor。
                </p>

                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">迁移方式</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cursor 在首次启动时会提供从 VS Code 导入设置和扩展的选项。
                    如果你跳过了这一步, 也可以手动安装需要的扩展。
                  </p>
                </div>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  兼容性说明
                </h3>
                <ul className="space-y-2 mb-6">
                  {[
                    '大多数 VS Code 扩展与 Cursor 完全兼容',
                    '少数依赖 VS Code 专有 API 的扩展可能不可用',
                    'Open VSX 上的扩展版本可能略滞后于 VS Code Marketplace',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  推荐扩展
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">扩展</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">用途</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'ESLint', desc: 'JavaScript/TypeScript 代码检查' },
                        { name: 'Prettier', desc: '代码格式化' },
                        { name: 'GitLens', desc: 'Git 增强功能' },
                        { name: 'Error Lens', desc: '内联显示错误信息' },
                        { name: 'Auto Rename Tag', desc: '自动重命名 HTML 标签' },
                      ].map((ext) => (
                        <tr key={ext.name} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 px-3 font-medium font-mono text-purple-700 dark:text-purple-400">{ext.name}</td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{ext.desc}</td>
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
                  回答以下问题, 测试你对 Cursor 扩展管理的掌握程度。
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
                  你已经了解了 Cursor 扩展管理的核心知识, 可以根据开发需求安装合适的扩展了。
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
