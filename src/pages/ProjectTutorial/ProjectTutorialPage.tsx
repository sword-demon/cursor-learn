import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar, StepProgress } from '../../components/common/ProgressBar';
import { useProgress } from '../../contexts/ProgressContext';
import { PageSEO } from '../../components/common/PageSEO';

interface ProjectStep {
  id: string;
  title: string;
  description: string;
  task: string;
  hint: string;
  codeExample?: string;
}

export function ProjectTutorialPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { completeStep, completeTutorial } = useProgress();

  const projectSteps: ProjectStep[] = [
    {
      id: 'project-setup',
      title: '项目初始化',
      description: '创建一个新的 React 项目，设置开发环境',
      task: '使用 Vite 创建一个新的 React + TypeScript 项目',
      hint: '运行命令: npm create vite@latest todo-app -- --template react-ts',
      codeExample: 'npm create vite@latest todo-app -- --template react-ts',
    },
    {
      id: 'project-structure',
      title: '项目结构',
      description: '设计合理的项目文件结构',
      task: '创建 components、hooks、types 目录',
      hint: '在 src 目录下创建三个文件夹：components、hooks、types',
    },
    {
      id: 'todo-types',
      title: '类型定义',
      description: '定义 Todo 应用的数据类型',
      task: '在 types 目录创建 todo.ts 文件，定义 Todo 接口',
      hint: '定义 id、title、completed、createdAt 字段',
      codeExample: `export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}`,
    },
    {
      id: 'todo-component',
      title: 'Todo 组件',
      description: '创建单个 Todo 项的展示组件',
      task: '创建 TodoItem 组件，支持完成状态切换',
      hint: '使用 useState 管理本地状态，添加 checkbox 和删除按钮',
    },
    {
      id: 'todo-list',
      title: 'Todo 列表',
      description: '创建 Todo 列表组件',
      task: '创建 TodoList 组件，展示所有 Todo 项',
      hint: '使用 map 函数渲染 TodoItem 列表，支持空状态显示',
    },
    {
      id: 'add-todo',
      title: '添加功能',
      description: '实现添加新 Todo 的功能',
      task: '创建 AddTodo 组件，支持输入和添加',
      hint: '使用受控组件管理输入，按 Enter 或点击按钮添加',
    },
    {
      id: 'filter-todos',
      title: '筛选功能',
      description: '添加筛选功能（全部/进行中/已完成）',
      task: '创建筛选按钮，支持切换显示不同状态的 Todo',
      hint: '使用状态保存当前筛选条件，根据条件过滤列表',
    },
    {
      id: 'persist-data',
      title: '数据持久化',
      description: '使用 localStorage 保存 Todo 数据',
      task: '实现 localStorage 读写，刷新页面后数据不丢失',
      hint: '使用 useEffect 在数据变化时保存到 localStorage',
    },
  ];

  const totalSteps = projectSteps.length;
  const progress = Math.round((completedSteps.length / totalSteps) * 100);

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
      completeStep('project-todo', projectSteps[currentStep - 1].id);
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setShowHint(false);
    }
  };

  const handleProjectComplete = () => {
    completeTutorial('project-todo');
  };

  const currentStepData = projectSteps[currentStep - 1];
  const isLastStep = currentStep === totalSteps;
  const isStepDone = completedSteps.includes(currentStep);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="项目实战"
        description="通过微型实战项目整合所学内容, 在真实场景中练习 Cursor IDE 的核心功能。"
        path="/project"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            项目实战：Todo 应用
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            通过构建一个完整的 Todo 应用，综合运用所学的 Cursor 命令
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar percentage={progress} />
          <div className="mt-4 flex justify-center">
            <StepProgress
              totalSteps={totalSteps}
              currentStep={currentStep}
              completedSteps={completedSteps}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Step */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      步骤 {currentStep} / {totalSteps}
                    </p>
                    <CardTitle>{currentStepData.title}</CardTitle>
                  </div>
                  {isStepDone && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      已完成
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {currentStepData.description}
                </p>

                <div className="bg-[#C41E3A]/5 border border-[#C41E3A]/20 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-[#C41E3A] mb-2">任务</h4>
                  <p className="text-gray-700 dark:text-gray-300">{currentStepData.task}</p>
                </div>

                {currentStepData.codeExample && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">代码示例</h4>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-gray-300 font-mono">{currentStepData.codeExample}</pre>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleStepComplete}
                    disabled={isStepDone && !isLastStep}
                  >
                    {isLastStep ? '完成项目' : isStepDone ? '已完成' : '标记完成'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowHint(!showHint)}
                  >
                    {showHint ? '隐藏提示' : '查看提示'}
                  </Button>
                </div>

                {showHint && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">提示</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-400">{currentStepData.hint}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentStep > 1) {
                    setCurrentStep(currentStep - 1);
                    setShowHint(false);
                  }
                }}
                disabled={currentStep === 1}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                }
              >
                上一步
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (!isLastStep) {
                    setCurrentStep(currentStep + 1);
                    setShowHint(false);
                  }
                }}
                disabled={isLastStep}
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                下一步
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Steps List */}
            <Card>
              <CardHeader>
                <CardTitle>所有步骤</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {projectSteps.map((step, index) => {
                    const stepNum = index + 1;
                    const isCompleted = completedSteps.includes(stepNum);
                    const isCurrent = stepNum === currentStep;

                    return (
                      <li
                        key={step.id}
                        onClick={() => {
                          setCurrentStep(stepNum);
                          setShowHint(false);
                        }}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          isCurrent
                            ? 'bg-[#C41E3A]/10 border border-[#C41E3A]/30'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              isCompleted
                                ? 'bg-green-500 text-white'
                                : isCurrent
                                ? 'bg-[#C41E3A] text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                            }`}
                          >
                            {isCompleted ? (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              stepNum
                            )}
                          </span>
                          <span
                            className={`text-sm ${
                              isCurrent ? 'font-medium text-[#C41E3A]' : 'text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {step.title}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>练习提示</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A]">•</span>
                    <span>使用 Tab 快速补全代码</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A]">•</span>
                    <span>用 Ctrl+K 重构代码</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A]">•</span>
                    <span>用 Ctrl+L 询问问题</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A]">•</span>
                    <span>用 @ 引用相关文件</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Complete Project */}
            {progress === 100 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    恭喜完成项目！
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    你已经成功构建了一个完整的 Todo 应用
                  </p>
                  <Button onClick={handleProjectComplete}>标记项目完成</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
