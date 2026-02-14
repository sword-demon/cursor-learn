import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { CodeBlock } from '../../components/common/CodeBlock';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { TerminalSimulator } from '../../components/speckit/TerminalSimulator';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { skillsIntroTutorial } from '../../data/tutorials/skills-intro';
import { skillTerminalCommands } from '../../data/skills/terminal-commands';
import { PageSEO } from '../../components/common/PageSEO';

// 常用 Skill 速查表数据
const quickReferenceSkills = [
  { name: '/frontend-design', category: '社区', desc: 'UI/UX 设计辅助, 50 种风格 + 21 种配色' },
  { name: '/commit', category: '官方', desc: '自动分析改动, 生成 conventional commit' },
  { name: '/speckit.specify', category: '社区', desc: '编写结构化功能规格文档' },
  { name: '/speckit.plan', category: '社区', desc: '生成技术实现计划' },
  { name: '/speckit.tasks', category: '社区', desc: '拆分任务列表' },
  { name: '/speckit.implement', category: '社区', desc: '按任务列表逐步实现' },
  { name: '/oh-my-claudecode:code-review', category: '社区', desc: '全面代码审查' },
  { name: '/oh-my-claudecode:tdd', category: '社区', desc: '测试驱动开发工作流' },
  { name: '/oh-my-claudecode:autopilot', category: '社区', desc: '全自动从想法到代码' },
  { name: '/oh-my-claudecode:security-review', category: '社区', desc: '安全漏洞检测' },
  { name: '/skill-creator', category: '社区', desc: '创建自定义 skill 的向导' },
  { name: '/canvas-design', category: '社区', desc: '生成 PNG/PDF 视觉设计' },
];

export function SkillsIntroPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial = getTutorialById('skills-intro') ?? skillsIntroTutorial;
  const tutorialProgress = getTutorialProgress('skills-intro');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('skills-intro');
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
    completeStep('skills-intro', stepId);
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
    completeTutorial('skills-intro');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="Skill 概念入门"
        description="理解 Claude Code Skill 概念, 区分三种分类, 在模拟终端中体验 skill 调用。"
        path="/skills/intro"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/skills" className="hover:text-[#C41E3A]">Skills 教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">概念入门</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Skill 概念入门
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            理解 Skill 是什么, 如何分类, 以及如何调用
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
            {/* Step 1: 什么是 Skill */}
            {activeStep === 0 && (
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  什么是 Skill?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Skill 是 Claude Code 的扩展能力系统。每个 Skill 是一组预定义的指令和工作流,
                  让 Claude Code 在特定任务上表现得更专业、更高效。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">没有 Skill</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>● 通用对话, 需要详细描述需求</li>
                      <li>● 每次都要重复说明偏好和规范</li>
                      <li>● 输出质量取决于 prompt 质量</li>
                      <li>● 缺少结构化的工作流程</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">使用 Skill</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>● 一个命令激活专业能力</li>
                      <li>● 内置最佳实践和规范</li>
                      <li>● 输出质量稳定且专业</li>
                      <li>● 结构化工作流, 步骤清晰</li>
                    </ul>
                  </div>
                </div>

                <BeginnerTipCard title="通俗理解">
                  Skill 就像手机上的 App。Claude Code 本身是一部手机, 功能很强但比较通用。
                  安装了 Skill 之后, 就像装了专业 App, 在特定任务上变得更强大。
                  比如 /frontend-design 就像装了一个专业设计 App。
                </BeginnerTipCard>
              </div>
            )}

            {/* Step 2: Skill 三大分类 */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Skill 三大分类
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Claude Code 的 Skill 生态分为三类, 满足不同层次的需求:
                </p>

                <div className="space-y-4 mb-6">
                  <div className="p-5 rounded-lg border-2 border-[#FFD700]/30 bg-[#FFD700]/5 dark:bg-[#FFD700]/5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold rounded-md">官方</span>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Anthropic 官方 Skill</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      由 Anthropic 官方维护, 内置于 Claude Code 中, 无需安装。
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      示例: /commit (Git 提交辅助)
                    </div>
                  </div>

                  <div className="p-5 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold rounded-md">社区</span>
                      <h4 className="font-semibold text-gray-900 dark:text-white">社区可安装 Skill</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      由社区开发者创建和维护, 通过 .claude/ 目录安装。数量最多, 覆盖面最广。
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      示例: /frontend-design, /speckit.specify, /oh-my-claudecode:code-review
                    </div>
                  </div>

                  <div className="p-5 rounded-lg border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-xs font-bold rounded-md">自定义</span>
                      <h4 className="font-semibold text-gray-900 dark:text-white">自定义 Skill</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      你自己编写的 Skill, 针对团队或项目的特定需求定制。
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      示例: 团队代码规范检查、项目特定的部署流程
                    </div>
                  </div>
                </div>

                <BeginnerTipCard title="如何选择?">
                  刚开始使用 Claude Code 时, 先熟悉官方 Skill (如 /commit)。
                  然后根据需要安装社区 Skill (如 /frontend-design)。
                  等你对 Skill 系统足够熟悉后, 再考虑创建自定义 Skill。
                </BeginnerTipCard>
              </div>
            )}

            {/* Step 3: 调用语法 */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Skill 调用语法
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  在 Claude Code 对话中, 使用斜杠 (/) 开头调用 Skill:
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      基本调用
                    </h3>
                    <CodeBlock
                      code={`/skill-name\n\n# 示例\n/frontend-design\n/commit`}
                      language="bash"
                      title="基本语法"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      带参数调用
                    </h3>
                    <CodeBlock
                      code={`/skill-name 参数内容\n\n# 示例\n/frontend-design 创建一个现代风格的登录页面\n/speckit.specify 用户认证功能`}
                      language="bash"
                      title="带参数"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      命名空间语法
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      社区 Skill 通常使用命名空间来组织, 用冒号 (:) 或点号 (.) 分隔:
                    </p>
                    <CodeBlock
                      code={`# 冒号分隔 (插件:功能)\n/oh-my-claudecode:code-review\n/oh-my-claudecode:autopilot\n\n# 点号分隔 (工具.命令)\n/speckit.specify\n/speckit.plan\n/speckit.tasks`}
                      language="bash"
                      title="命名空间"
                    />
                  </div>
                </div>

                <BeginnerTipCard title="小技巧">
                  输入 / 后 Claude Code 会自动提示可用的 Skill 列表, 就像 IDE 的自动补全一样。
                  不需要记住所有 Skill 名称, 输入关键词就能找到。
                </BeginnerTipCard>
              </div>
            )}

            {/* Step 4: 常用 Skill 速查表 */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  常用 Skill 速查表
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  以下是最常用的 Skill, 按使用场景分类:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Skill 命令</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">来源</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">功能说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quickReferenceSkills.map((skill) => (
                        <tr key={skill.name} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2.5 px-4">
                            <code className="text-[#C41E3A] bg-[#C41E3A]/5 px-1.5 py-0.5 rounded text-xs font-mono">
                              {skill.name}
                            </code>
                          </td>
                          <td className="py-2.5 px-4">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              skill.category === '官方'
                                ? 'bg-[#FFD700]/20 text-[#FFD700]'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}>
                              {skill.category}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">{skill.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <BeginnerTipCard title="推荐入门组合">
                  新手推荐先安装这 3 个 Skill: /frontend-design (设计辅助)、
                  /speckit.specify (规格编写)、/oh-my-claudecode:code-review (代码审查)。
                  覆盖了开发中最常见的场景。
                </BeginnerTipCard>
              </div>
            )}

            {/* Step 5: 模拟终端体验 */}
            {activeStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  模拟终端体验
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  在下方模拟终端中输入 Skill 命令, 体验 Skill 的调用效果。
                </p>

                <BeginnerTipCard title="试试这些命令">
                  输入 /frontend-design 体验设计 Skill, 或输入 help 查看所有可用命令。
                  也可以尝试 /speckit.specify 和 /oh-my-claudecode:code-review。
                </BeginnerTipCard>

                <div className="mt-4">
                  <TerminalSimulator
                    commands={skillTerminalCommands}
                    welcomeMessage="欢迎体验 Claude Code Skill 系统! 输入 help 查看可用命令, 或直接输入 /skill-name 体验。"
                    onCommandComplete={(cmdId) => {
                      if (['frontend-design', 'speckit-specify', 'code-review', 'commit'].includes(cmdId)) {
                        handleCompleteStep('terminal-practice');
                      }
                    }}
                  />
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
                  回答以下问题, 测试你对 Skill 概念的理解。
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
                  你已经了解了 Skill 的概念、三大分类和调用语法。
                  接下来可以学习如何安装和管理 Skill。
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {tutorialProgress?.status !== 'completed' && (
                    <Button variant="primary" onClick={handleFinish}>
                      标记完成
                    </Button>
                  )}
                  <Link to="/skills/install">
                    <Button variant="outline">学习 Skill 安装</Button>
                  </Link>
                  <Link to="/skills">
                    <Button variant="outline">返回 Skills 教程</Button>
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
