import { useState } from 'react';
import type { TutorialStep } from '../../types';
import { Button } from '../common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';

/**
 * 项目步骤组件
 * 显示单个项目步骤的详细内容和操作
 */

interface ProjectStepProps {
  step: TutorialStep;
  stepNumber: number;
  totalSteps: number;
  isCompleted: boolean;
  onComplete: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
}

export function ProjectStep({
  step,
  stepNumber,
  totalSteps,
  isCompleted,
  onComplete,
  onPrevious,
  canGoPrevious,
}: ProjectStepProps) {
  const [showHint, setShowHint] = useState(false);

  // 根据步骤类型获取图标和颜色
  const getStepTypeInfo = () => {
    switch (step.type) {
      case 'simulation':
        return {
          icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          label: '练习',
          color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
        };
      case 'practice':
        return {
          icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
          label: '实践',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        };
      case 'quiz':
        return {
          icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          label: '测验',
          color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
        };
      default:
        return {
          icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
          label: '学习',
          color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        };
    }
  };

  const typeInfo = getStepTypeInfo();

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded text-xs font-medium ${typeInfo.color}`}>
              {typeInfo.label}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              步骤 {stepNumber} / {totalSteps}
            </span>
          </div>
          {isCompleted && (
            <span className="flex items-center gap-1 text-green-500 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              已完成
            </span>
          )}
        </div>
        <CardTitle className="mt-2">{step.title}</CardTitle>
      </CardHeader>

      <CardContent>
        {/* 步骤内容 */}
        <div className="prose dark:prose-invert max-w-none mb-6">
          <div className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
            {step.content}
          </div>
        </div>

        {/* 模拟步骤的提示 */}
        {(step.type === 'simulation' || step.type === 'practice') && (
          <div className="mb-6 p-4 bg-[#C41E3A]/5 border border-[#C41E3A]/20 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#C41E3A] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-[#C41E3A] mb-1">练习提示</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  在右侧编辑器中按照说明操作，使用 Cursor 命令完成练习。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 测验步骤 */}
        {step.type === 'quiz' && step.quiz && (
          <div className="mb-6 space-y-4">
            <p className="font-medium text-gray-900 dark:text-white">{step.quiz.question}</p>
            <div className="space-y-2">
              {step.quiz.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <input
                    type={step.quiz?.type === 'multiple' ? 'checkbox' : 'radio'}
                    name="quiz"
                    value={option.id}
                    className="w-4 h-4 text-[#C41E3A] focus:ring-[#C41E3A]"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 提示按钮 */}
        <div className="mb-6">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-[#C41E3A] hover:underline flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {showHint ? '隐藏提示' : '查看提示'}
          </button>

          {showHint && (
            <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-400">
                {step.type === 'simulation'
                  ? '仔细阅读说明，按照步骤操作。如果遇到困难，可以尝试使用 Tab 或 Ctrl+K 命令。'
                  : '思考题目要求，选择最合适的答案。可以参考之前学过的内容。'}
              </p>
            </div>
          )}
        </div>

        {/* 导航按钮 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            }
          >
            上一步
          </Button>

          {/* 非模拟步骤显示完成按钮 */}
          {step.type === 'content' && (
            <Button
              onClick={onComplete}
              disabled={isCompleted}
              rightIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              {isCompleted ? '已完成' : stepNumber === totalSteps ? '完成项目' : '下一步'}
            </Button>
          )}

          {/* 模拟步骤显示帮助文本 */}
          {(step.type === 'simulation' || step.type === 'practice') && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              在右侧编辑器中完成练习
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectStep;
