import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';

export function CommandsPage() {
  const { getTutorialProgress } = useProgress();

  const getTutorialCompletion = (tutorialId: string) => {
    const tutorialProgress = getTutorialProgress(tutorialId);
    const tutorial = getTutorialById(tutorialId);
    if (!tutorialProgress || !tutorial) return 0;
    return Math.round(
      (tutorialProgress.completedStepIds.length / tutorial.steps.length) * 100
    );
  };

  const commandCards = [
    {
      id: 'commands-tab',
      title: 'Tab 自动补全',
      description: '学习如何使用 Tab 键快速完成代码，这是 Cursor 最核心的功能',
      shortcut: 'Tab',
      icon: 'M9 5l7 7-7 7',
      color: 'bg-blue-500',
    },
    {
      id: 'commands-ctrl-k',
      title: 'Ctrl+K 内联编辑',
      description: '选中代码后使用 Ctrl+K 进行智能编辑和重构',
      shortcut: 'Ctrl+K',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      color: 'bg-[#C41E3A]',
    },
    {
      id: 'commands-ctrl-l',
      title: 'Ctrl+L 聊天',
      description: '使用 Ctrl+L 打开侧边栏，与 AI 进行对话式编程',
      shortcut: 'Ctrl+L',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      color: 'bg-purple-500',
    },
    {
      id: 'commands-at',
      title: '@-mentions 上下文',
      description: '使用 @ 符号引用文件、代码片段或文档，提供更精确的上下文',
      shortcut: '@',
      icon: 'M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cursor 命令教程
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            掌握 Cursor 的核心命令，提升你的编码效率
          </p>
        </div>

        {/* Command Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {commandCards.map((cmd) => {
            const completion = getTutorialCompletion(cmd.id);
            const isCompleted = completion === 100;

            return (
              <Card key={cmd.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${cmd.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cmd.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {cmd.title}
                        </h3>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-gray-600 dark:text-gray-400">
                          {cmd.shortcut}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {cmd.description}
                      </p>
                      <ProgressBar percentage={completion} size="sm" showLabel={false} />
                      <div className="mt-4">
                        <Link to={`/commands/${cmd.id}`}>
                          <Button variant={isCompleted ? 'outline' : 'primary'} size="sm">
                            {isCompleted ? '复习' : completion > 0 ? '继续学习' : '开始学习'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Learning Path */}
        <Card>
          <CardHeader>
            <CardTitle>推荐学习顺序</CardTitle>
            <CardDescription>按照以下顺序学习，循序渐进掌握 Cursor 命令</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#C41E3A] text-white flex items-center justify-center font-semibold">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">Tab 自动补全</h4>
                  <p className="text-sm text-gray-500">最基础也是最重要的功能，优先掌握</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#C41E3A] text-white flex items-center justify-center font-semibold">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">Ctrl+K 内联编辑</h4>
                  <p className="text-sm text-gray-500">用于代码重构和局部修改</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#C41E3A] text-white flex items-center justify-center font-semibold">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">Ctrl+L 聊天</h4>
                  <p className="text-sm text-gray-500">用于复杂问题和对话式编程</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#C41E3A] text-white flex items-center justify-center font-semibold">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">@-mentions 上下文</h4>
                  <p className="text-sm text-gray-500">进阶功能，提供更精确的上下文控制</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>使用技巧</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">快捷键提示</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]"></span>
                    按 Esc 可以取消当前的 AI 建议
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]"></span>
                    Ctrl+Z 可以撤销 Tab 补全
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]"></span>
                    在聊天中按 Shift+Enter 换行
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">最佳实践</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]"></span>
                    多使用 @ 引用相关文件
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]"></span>
                    给 AI 明确的指令和上下文
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A]"></span>
                    学会判断何时接受建议
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
