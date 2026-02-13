import { useState, useEffect } from 'react';
import { detectOS, getCursorDownloadUrl, type OSType } from '../../utils/os-detection';
import { ProgressBar } from '../../components/common/ProgressBar';
import { useProgress } from '../../contexts/ProgressContext';
import { getTutorialById } from '../../services/tutorial-service';
import {
  OSDetector,
  InstallationSteps,
  TroubleshootingPanel,
  SetupGuide,
  TutorialCompletion,
} from '../../components/tutorial';
import { PageSEO } from '../../components/common/PageSEO';

const osOptions: { id: OSType; name: string }[] = [
  { id: 'windows', name: 'Windows' },
  { id: 'macos', name: 'macOS' },
  { id: 'linux', name: 'Linux' },
];

const installationSteps = {
  windows: [
    {
      title: '下载 Cursor',
      content: '点击下载按钮获取 Windows 安装包(.exe 文件)',
      action: true,
    },
    {
      title: '运行安装程序',
      content: '双击下载的 .exe 文件，按照安装向导提示进行安装',
    },
    {
      title: '完成安装',
      content: '安装完成后，Cursor 会自动启动。你也可以在开始菜单中找到它',
    },
    {
      title: '首次启动',
      content: '首次启动时，Cursor 会引导你完成初始设置，包括主题选择和键盘快捷键配置',
    },
  ],
  macos: [
    {
      title: '下载 Cursor',
      content: '点击下载按钮获取 macOS 安装包(.dmg 文件)',
      action: true,
    },
    {
      title: '打开安装包',
      content: '双击下载的 .dmg 文件，将 Cursor 拖拽到 Applications 文件夹',
    },
    {
      title: '启动应用',
      content: '从 Applications 文件夹或 Launchpad 启动 Cursor',
    },
    {
      title: '权限设置',
      content: '如果系统提示"无法打开"，请前往 系统设置 > 隐私与安全性 中允许 Cursor 运行',
    },
  ],
  linux: [
    {
      title: '下载 Cursor',
      content: '点击下载按钮获取 Linux 安装包(.AppImage 或 .deb)',
      action: true,
    },
    {
      title: '安装方式',
      content: '对于 .AppImage: 赋予执行权限后直接运行。对于 .deb: 使用 dpkg -i 命令安装',
    },
    {
      title: '运行 Cursor',
      content: '安装完成后，在终端输入 cursor 或在应用菜单中找到 Cursor',
    },
    {
      title: '依赖检查',
      content: '确保系统已安装必要的依赖，如 libgtk-3-0 和 libnss3',
    },
  ],
};

export function InstallationPage() {
  const [selectedOS, setSelectedOS] = useState<OSType>('windows');
  const { completeStep, completeTutorial, getTutorialProgress } = useProgress();
  const tutorial = getTutorialById('installation');
  const tutorialProgress = getTutorialProgress('installation');

  useEffect(() => {
    const detectedOS = detectOS();
    setSelectedOS(detectedOS);
  }, []);

  const handleDownload = () => {
    window.open(getCursorDownloadUrl(selectedOS), '_blank');
  };

  const handleStepComplete = (stepIndex: number) => {
    if (tutorial) {
      const stepId = tutorial.steps[stepIndex]?.id;
      if (stepId) {
        completeStep('installation', stepId);
      }
    }
  };

  const handleTutorialComplete = () => {
    completeTutorial('installation');
  };

  const isStepCompleted = (stepIndex: number) => {
    if (!tutorialProgress || !tutorial) return false;
    const stepId = tutorial.steps[stepIndex]?.id;
    return stepId ? tutorialProgress.completedStepIds.includes(stepId) : false;
  };

  const currentProgress = tutorial
    ? Math.round(
        ((tutorialProgress?.completedStepIds.length || 0) / tutorial.steps.length) * 100
      )
    : 0;

  const currentSteps = installationSteps[selectedOS];
  const currentOSName = osOptions.find((os) => os.id === selectedOS)?.name || 'Windows';
  const completedStepsArray = currentSteps.map((_, index) => isStepCompleted(index));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="安装指南"
        description="下载、安装并配置 Cursor IDE, 支持 Windows、macOS 和 Linux 系统。"
        path="/installation"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            安装 Cursor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            根据你的操作系统选择相应的安装指南
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar percentage={currentProgress} />
        </div>

        {/* OS Selector */}
        <div className="mb-8">
          <OSDetector
            selectedOS={selectedOS}
            onSelectOS={setSelectedOS}
            autoDetect={false}
          />
        </div>

        {/* Installation Steps */}
        <div className="mb-8">
          <InstallationSteps
            osName={currentOSName}
            steps={currentSteps}
            completedSteps={completedStepsArray}
            onStepComplete={handleStepComplete}
            onDownload={handleDownload}
          />
        </div>

        {/* Setup Guide */}
        <div className="mb-8">
          <SetupGuide />
        </div>

        {/* Troubleshooting */}
        <div className="mb-8">
          <TroubleshootingPanel />
        </div>

        {/* Complete Button */}
        <div className="flex justify-center">
          <TutorialCompletion
            tutorialTitle="安装指南"
            isCompleted={tutorialProgress?.status === 'completed'}
            onComplete={handleTutorialComplete}
            accomplishments={[
              '下载并安装 Cursor IDE',
              '配置初始设置',
              '选择 AI 模型',
              '解决常见问题',
            ]}
          />
        </div>
      </div>
    </div>
  );
}
