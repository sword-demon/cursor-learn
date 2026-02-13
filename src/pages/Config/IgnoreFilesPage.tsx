import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { CodeBlock } from '../../components/common/CodeBlock';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { IgnorePatternEditor } from '../../components/config/IgnorePatternEditor';
import { PRESET_PATTERNS } from '../../components/config/ignore-presets';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { configIgnoreTutorial, ignorePatternExamples } from '../../data/tutorials/config-ignore';
import { PageSEO } from '../../components/common/PageSEO';

export function IgnoreFilesPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } = useProgress();
  const tutorial = getTutorialById('config-ignore') ?? configIgnoreTutorial;
  const tutorialProgress = getTutorialProgress('config-ignore');
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // 自动开始教程
  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('config-ignore');
    }
  }, [tutorialProgress, startTutorial]);

  const steps = tutorial.steps;
  const currentProgress = steps.length
    ? Math.round(((tutorialProgress?.completedStepIds.length ?? 0) / steps.length) * 100)
    : 0;

  const isStepCompleted = (stepId: string) =>
    tutorialProgress?.completedStepIds.includes(stepId) ?? false;

  const handleCompleteStep = (stepId: string) => {
    completeStep('config-ignore', stepId);
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
    completeTutorial('config-ignore');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="忽略文件配置"
        description="学习如何配置 Cursor 的忽略文件, 优化 AI 上下文和项目索引。"
        path="/config/ignore-files"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/config" className="hover:text-[#C41E3A]">配置教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">忽略文件配置</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            忽略文件配置
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            学习如何通过 .cursorignore 控制 Cursor 对项目文件的访问, 保护敏感信息
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
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  为什么需要忽略文件?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  当你使用 Cursor 编写代码时, AI 会读取你的项目文件来理解上下文。但有些文件你不希望 AI 看到:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A] mt-1">●</span>
                    <span>环境变量文件 (.env) - 包含 API 密钥和数据库密码</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A] mt-1">●</span>
                    <span>凭据文件 (credentials.json) - 包含认证信息</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A] mt-1">●</span>
                    <span>密钥文件 (secrets/) - 包含加密密钥</span>
                  </li>
                </ul>

                <BeginnerTipCard title="通俗理解">
                  想象 Cursor AI 是你的编程助手, 它可以看到你桌面上所有的文件。
                  .cursorignore 就像一个 "请勿查看" 的标签 - 贴上标签的文件, 助手完全看不到。
                </BeginnerTipCard>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    两种忽略文件
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-1">.cursorignore</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">AI 完全无法读取被忽略的文件</p>
                    </div>
                    <div className="p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-1">.cursorindexingignore</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">AI 不索引但仍可手动引用</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: 语法 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  .cursorignore 语法
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  .cursorignore 使用与 .gitignore 完全相同的语法:
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">基本规则</h3>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>● 每行一个模式</li>
                      <li>● # 开头的行是注释</li>
                      <li>● 空行被忽略</li>
                      <li>● / 结尾表示目录</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">常用模式</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-2 pr-4 text-gray-700 dark:text-gray-300">模式</th>
                            <th className="text-left py-2 text-gray-700 dark:text-gray-300">含义</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 dark:text-gray-400">
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2 pr-4 font-mono text-[#C41E3A]">file.txt</td>
                            <td className="py-2">匹配名为 file.txt 的文件</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2 pr-4 font-mono text-[#C41E3A]">*.log</td>
                            <td className="py-2">匹配所有 .log 文件</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2 pr-4 font-mono text-[#C41E3A]">dir/</td>
                            <td className="py-2">忽略整个目录</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2 pr-4 font-mono text-[#C41E3A]">**/temp</td>
                            <td className="py-2">匹配任意层级下的 temp</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-mono text-[#C41E3A]">!important.log</td>
                            <td className="py-2">否定模式 (取消忽略)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">通配符</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-2 pr-4 text-gray-700 dark:text-gray-300">符号</th>
                            <th className="text-left py-2 text-gray-700 dark:text-gray-300">含义</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 dark:text-gray-400">
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2 pr-4 font-mono text-[#C41E3A]">*</td>
                            <td className="py-2">匹配任意字符 (不含 /)</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-2 pr-4 font-mono text-[#C41E3A]">**</td>
                            <td className="py-2">匹配任意层级目录</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-mono text-[#C41E3A]">?</td>
                            <td className="py-2">匹配单个字符</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: 两种忽略文件的区别 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  .cursorignore vs .cursorindexingignore
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card padding="none">
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                        .cursorignore - 完全隐藏
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>● AI 无法读取文件内容</li>
                        <li>● 不会出现在 AI 的上下文中</li>
                        <li>● 即使你用 @ 引用也无法访问</li>
                        <li className="font-medium text-gray-900 dark:text-white">适合: API 密钥、密码、凭据</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card padding="none">
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-3">
                        .cursorindexingignore - 仅跳过索引
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>● 不会被自动索引</li>
                        <li>● 但你可以手动用 @ 引用</li>
                        <li>● AI 在你主动引用时可以读取</li>
                        <li className="font-medium text-gray-900 dark:text-white">适合: 大型生成文件、第三方代码</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">如何选择?</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 pr-4 text-gray-700 dark:text-gray-300">场景</th>
                        <th className="text-left py-2 text-gray-700 dark:text-gray-300">推荐</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-400">
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 pr-4">API 密钥、密码</td>
                        <td className="py-2 font-medium text-red-600 dark:text-red-400">.cursorignore</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 pr-4">大型数据文件</td>
                        <td className="py-2 font-medium text-yellow-600 dark:text-yellow-400">.cursorindexingignore</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 pr-4">第三方生成代码</td>
                        <td className="py-2 font-medium text-yellow-600 dark:text-yellow-400">.cursorindexingignore</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">凭据和证书</td>
                        <td className="py-2 font-medium text-red-600 dark:text-red-400">.cursorignore</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6">
                  <BeginnerTipCard title="简单记忆法">
                    涉及安全的文件 (密码、密钥) 用 .cursorignore;
                    只是不想被搜索到的大文件用 .cursorindexingignore。
                  </BeginnerTipCard>
                </div>
              </div>
            )}

            {/* Step 4: 常用模式 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  常用忽略模式
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      安全相关 (强烈推荐)
                    </h3>
                    <CodeBlock
                      code={`# 环境变量\n.env\n.env.*\n.env.local\n.env.production\n\n# 凭据和密钥\ncredentials.json\n*.pem\n*.key\nsecrets/`}
                      language="gitignore"
                      title=".cursorignore"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      构建产物
                    </h3>
                    <CodeBlock
                      code={`# 构建输出\ndist/\nbuild/\nout/\ncoverage/`}
                      language="gitignore"
                      title=".cursorignore"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      依赖和缓存
                    </h3>
                    <CodeBlock
                      code={`# 依赖\nnode_modules/\nvendor/\n\n# 缓存\n.cache/\ntmp/\n*.tmp`}
                      language="gitignore"
                      title=".cursorignore"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      模式匹配示例
                    </h3>
                    <div className="space-y-3">
                      {ignorePatternExamples.slice(0, 4).map((example) => (
                        <div
                          key={example.pattern}
                          className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-sm font-mono text-[#C41E3A]">{example.pattern}</code>
                            <span className="text-xs text-gray-500">- {example.description}</span>
                          </div>
                          <div className="flex gap-4 text-xs">
                            <span className="text-green-600 dark:text-green-400">
                              匹配: {example.matchExamples.join(', ')}
                            </span>
                            <span className="text-red-500 dark:text-red-400">
                              不匹配: {example.noMatchExamples.join(', ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: 交互式练习 */}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  动手练习
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  在编辑器中输入忽略规则, 右侧实时预览哪些文件会被忽略。
                </p>

                {/* 预设模式快捷按钮 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {PRESET_PATTERNS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setSelectedPreset(preset.patterns)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        selectedPreset === preset.patterns
                          ? 'border-[#C41E3A] bg-[#C41E3A]/10 text-[#C41E3A]'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-[#C41E3A]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <IgnorePatternEditor
                  initialPatterns={selectedPreset ?? undefined}
                  height="280px"
                />

                <div className="mt-4">
                  <BeginnerTipCard title="练习目标">
                    试试输入以下模式, 观察右侧文件列表的变化:
                    .env, .env.*, node_modules/, dist/, credentials.json, secrets/, *.log
                  </BeginnerTipCard>
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
                  回答以下问题, 测试你对忽略文件配置的掌握程度。
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

            {/* Step 7: 全局忽略 */}
            {activeStep === 6 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  全局 vs 项目级忽略
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card padding="none">
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        项目级 (推荐)
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        在项目根目录创建 .cursorignore, 仅对当前项目生效
                      </p>
                      <CodeBlock
                        code={`my-project/\n├── .cursorignore  ← 项目级\n├── .env\n├── src/\n└── ...`}
                        language="text"
                        title="项目结构"
                        maxHeight="120px"
                      />
                    </CardContent>
                  </Card>

                  <Card padding="none">
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        全局级
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        在用户主目录创建, 对所有项目生效
                      </p>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p><span className="font-mono text-[#C41E3A]">macOS/Linux:</span> ~/.cursorignore</p>
                        <p><span className="font-mono text-[#C41E3A]">Windows:</span> %USERPROFILE%\.cursorignore</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
                  <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">注意事项</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>● 项目级和全局级规则会合并生效</li>
                    <li>● 否定模式 (!) 有限制, 无法取消上级目录的忽略</li>
                    <li>● 建议优先使用项目级配置, 更加明确和可控</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 8: 完成 */}
            {activeStep === 7 && (
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
                  你已经学会了 .cursorignore 的语法和使用方法, 可以保护项目中的敏感信息了。
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
        {activeStep < 7 && (
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
