import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { QuizCard } from '../../components/common/QuizCard';
import { BeginnerTipCard } from '../../components/common/BeginnerTip';
import { SkillCardGrid } from '../../components/skills/SkillCardGrid';
import { SkillRecommender } from '../../components/skills/SkillRecommender';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import { skillsOfficialTutorial } from '../../data/tutorials/skills-official';
import { skillCards } from '../../data/skills/skill-cards';
import { skillRecommendations } from '../../data/skills/skill-recommendations';
import { PageSEO } from '../../components/common/PageSEO';

export function SkillsOfficialPage() {
  const { startTutorial, completeStep, completeTutorial, getTutorialProgress } =
    useProgress();
  const tutorial = getTutorialById('skills-official') ?? skillsOfficialTutorial;
  const tutorialProgress = getTutorialProgress('skills-official');
  const [activeStep, setActiveStep] = useState(0);

  const prevTutorialProgress = getTutorialProgress('skills-intro');
  const showPrerequisiteBanner = !prevTutorialProgress || prevTutorialProgress.status !== 'completed';

  useEffect(() => {
    if (!tutorialProgress) {
      startTutorial('skills-official');
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
    completeStep('skills-official', stepId);
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
    completeTutorial('skills-official');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="Anthropic 官方 Skill 介绍"
        description="浏览 anthropics/skills 仓库中的 16 个官方 Skill, 通过交互式选择器获得个性化推荐。"
        path="/skills/official"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/skills" className="hover:text-[#C41E3A]">Skills 教程</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">官方 Skill</span>
        </nav>

        {showPrerequisiteBanner && (
          <div className="mb-4">
            <BeginnerTipCard title="建议先完成前置步骤">
              建议先完成{' '}
              <Link to="/skills/intro" className="text-[#C41E3A] underline hover:no-underline">
                Skill 概念入门
              </Link>{' '}
              教程, 以获得更好的学习体验。
            </BeginnerTipCard>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Anthropic 官方 Skill 介绍
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            浏览 anthropics/skills 仓库中的 16 个官方 Skill, 找到适合你的工具组合
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
            {activeStep === 0 && <StepSkillOverview />}
            {activeStep === 1 && (
              <StepSkillCategories
                onComplete={() => handleCompleteStep('skill-categories')}
              />
            )}
            {activeStep === 2 && (
              <StepSkillRecommender
                onComplete={() => handleCompleteStep('skill-recommender')}
              />
            )}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  知识检测
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  回答以下问题, 测试你对官方 Skill 的了解。
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
            {activeStep === 4 && (
              <StepComplete
                isCompleted={tutorialProgress?.status === 'completed'}
                onFinish={handleFinish}
              />
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

function StepSkillOverview() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        官方 Skill 全景
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Anthropic 在{' '}
        <a
          href="https://github.com/anthropics/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C41E3A] hover:underline"
        >
          anthropics/skills
        </a>{' '}
        仓库中提供了 16 个官方 Skill, 覆盖创意设计、开发工具、企业沟通和文档处理四大领域。
        Skills 遵循{' '}
        <a
          href="https://agentskills.io/specification"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C41E3A] hover:underline"
        >
          Agent Skills 开放标准
        </a>
        。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-900/10">
          <h4 className="font-semibold text-pink-700 dark:text-pink-400 mb-1">
            创意与设计
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">6 个 skill</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            algorithmic-art, brand-guidelines, canvas-design, frontend-design, slack-gif-creator, theme-factory
          </p>
        </div>
        <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-1">
            开发与技术
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">4 个 skill</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            mcp-builder, webapp-testing, web-artifacts-builder, skill-creator
          </p>
        </div>
        <div className="p-4 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-1">
            企业与沟通
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">2 个 skill</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            doc-coauthoring, internal-comms
          </p>
        </div>
        <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-1">
            文档处理
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">4 个 skill</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            pdf, docx, pptx, xlsx
          </p>
        </div>
      </div>

      {/* 安装方式 */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          安装方式
        </h4>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Claude Code 中安装
            </p>
            <pre className="bg-gray-900 text-gray-100 rounded-md p-3 text-xs overflow-x-auto">
{`# 注册插件市场
/plugin marketplace add anthropics/skills

# 安装示例 skills (Apache 2.0 开源)
/plugin install example-skills@anthropic-agent-skills

# 安装文档处理 skills (专有许可)
/plugin install document-skills@anthropic-agent-skills`}
            </pre>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Claude.ai 中使用
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              付费用户已内置所有示例 Skills, 直接在对话中提及即可使用。
            </p>
          </div>
        </div>
      </div>

      {/* 许可证说明 */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">
            Apache 2.0 开源
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            12 个 example-skills: 创意设计、开发工具、企业沟通类
          </p>
        </div>
        <div className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            专有许可 (Source-available)
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            4 个 document-skills: pdf, docx, pptx, xlsx
          </p>
        </div>
      </div>

      <BeginnerTipCard title="如何选择">
        不需要一次安装所有 skill。先从你最常用的场景开始, 比如前端开发者可以先装
        frontend-design, 需要处理文档的可以先装 document-skills。
        下一步的 "分类浏览" 和 "个性化推荐" 会帮你找到最合适的组合。
      </BeginnerTipCard>
    </div>
  );
}

function StepSkillCategories({ onComplete }: { onComplete: () => void }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleCardClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      onComplete();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        分类浏览 Skill
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        点击分类标签筛选, 点击卡片查看详情。浏览完成后进入下一步。
      </p>

      <SkillCardGrid cards={skillCards} onCardClick={handleCardClick} />
    </div>
  );
}

function StepSkillRecommender({ onComplete }: { onComplete: () => void }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSkillClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      onComplete();
    }
  };

  return (
    <div>
      <SkillRecommender
        recommendations={skillRecommendations}
        skillCards={skillCards}
        onSkillClick={handleSkillClick}
      />

      <div className="mt-6">
        <BeginnerTipCard title="组合使用">
          很多 skill 配合使用效果更好。比如 speckit 系列负责规划,
          oh-my-claudecode:autopilot 负责执行, 再用 code-review 做质量把关。
          选择多个场景可以看到哪些 skill 被多次推荐 (标记为 "强烈推荐")。
        </BeginnerTipCard>
      </div>
    </div>
  );
}

function StepComplete({
  isCompleted,
  onFinish,
}: {
  isCompleted: boolean | undefined;
  onFinish: () => void;
}) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {isCompleted ? '教程已完成!' : '恭喜完成!'}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        你已经了解了 anthropics/skills 仓库中的 16 个官方 Skill, 并获得了个性化推荐。
        接下来可以深入体验 frontend-design skill 的实际效果。
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {!isCompleted && (
          <Button variant="primary" onClick={onFinish}>
            标记完成
          </Button>
        )}
        <Link to="/skills/frontend-design">
          <Button variant="outline">体验 frontend-design</Button>
        </Link>
        <Link to="/skills">
          <Button variant="outline">返回 Skills 教程</Button>
        </Link>
      </div>
    </div>
  );
}
